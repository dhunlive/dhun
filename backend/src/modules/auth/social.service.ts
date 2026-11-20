// Social sign-in: Google today, built so Facebook is one more verifier.
//
// The app signs in with the provider ON DEVICE and sends us the provider's ID
// token. Nothing in that token is trusted until it is verified HERE, against
// the provider's published keys: a client can send any string it likes.
//
// What makes a Google ID token valid for us — all five, or it is refused:
//   1. signed by a key in Google's JWKS (RS256 only — no "alg: none", no HMAC)
//   2. iss is Google
//   3. aud is one of OUR client ids (a token minted for another app is a
//      token someone else's app collected; accepting it is account takeover)
//   4. not expired
//   5. email_verified is true
//
// Then the account rules, in this order:
//   · the Google account is already linked       → sign in to that account
//   · an account already holds this email, and
//       its email is CONFIRMED                   → link Google to it, sign in
//       its email is NOT confirmed               → refuse (EMAIL_IN_USE)
//   · a guest is calling                          → upgrade the guest in place
//   · otherwise                                   → create a new account
//
// The unconfirmed-email refusal is the pre-hijacking defence. Email signup lets
// anyone register ANY address with a password, unconfirmed (confirmation is
// deferrable by design). Linking Google into such an account would hand the
// real owner an account whose password someone else set. Refusing costs the
// legitimate owner one step: sign in with the password, confirm the address.

import { createRemoteJWKSet, errors as joseErrors, jwtVerify } from 'jose';
import { uuidv7 } from 'uuidv7';
import { config } from '../../config/index.js';
import { withTransaction } from '../../infra/db.js';
import { AppError } from '../../infra/errors.js';
import { logger } from '../../infra/logger.js';
import { loadSessionUser, recordSignIn, type SessionUser } from './auth.service.js';
import { upsertDevice, type DeviceInfo } from './devices.js';
import { issueTokenPair, type TokenPair } from './tokens.js';

const GOOGLE_JWKS_URL = new URL('https://www.googleapis.com/oauth2/v3/certs');
const GOOGLE_ISSUERS = ['https://accounts.google.com', 'accounts.google.com'];

/**
 * Google's signing keys, fetched on first use and cached. jose refetches on an
 * unknown `kid` (Google rotates keys), with a cooldown so a stream of forged
 * tokens carrying random kids cannot turn us into a request amplifier.
 */
let googleKeys: ReturnType<typeof createRemoteJWKSet> | null = null;
function googleKeySet(): ReturnType<typeof createRemoteJWKSet> {
  googleKeys ??= createRemoteJWKSet(GOOGLE_JWKS_URL, {
    timeoutDuration: 5_000,
    cooldownDuration: 30_000,
    cacheMaxAge: 6 * 60 * 60 * 1000,
  });
  return googleKeys;
}

interface VerifiedIdentity {
  provider: 'google';
  subject: string;
  email: string;
}

export async function verifyGoogleIdToken(idToken: string): Promise<VerifiedIdentity> {
  const audience = config.oauth.googleClientIds;
  if (audience.length === 0) {
    // Unconfigured is OFF, never "accept any audience".
    throw new AppError('SOCIAL_LOGIN_UNAVAILABLE', 'Google sign-in is not available right now', 503);
  }

  let payload;
  try {
    ({ payload } = await jwtVerify(idToken, googleKeySet(), {
      issuer: GOOGLE_ISSUERS,
      audience,
      algorithms: ['RS256'],
      clockTolerance: 30,
    }));
  } catch (err) {
    // A token that fails verification is the CLIENT's problem (401). Failing
    // to reach Google's keys is OURS (503) — reporting that as "invalid token"
    // would send real users round a sign-in loop during a network blip.
    if (err instanceof joseErrors.JOSEError && !(err instanceof joseErrors.JWKSTimeout)) {
      logger.info('google id token rejected', { code: err.code });
      throw new AppError('SOCIAL_TOKEN_INVALID', 'Google sign-in failed. Try again.', 401);
    }
    logger.error('google keys unreachable', { err });
    throw new AppError('SOCIAL_PROVIDER_UNAVAILABLE', 'Google sign-in is not available right now', 503);
  }

  const subject = payload.sub;
  const email = payload.email;
  // Google has sent this as the string "true" in some token versions.
  const emailVerified = payload.email_verified === true || payload.email_verified === 'true';

  if (typeof subject !== 'string' || subject.length === 0 || subject.length > 255) {
    throw new AppError('SOCIAL_TOKEN_INVALID', 'Google sign-in failed. Try again.', 401);
  }
  if (typeof email !== 'string' || email.length > 254 || !emailVerified) {
    throw new AppError(
      'SOCIAL_EMAIL_UNVERIFIED',
      'Your Google account has no confirmed email address',
      422,
    );
  }

  return { provider: 'google', subject, email: email.trim() };
}

export async function signInWithGoogle(input: {
  idToken: string;
  device: DeviceInfo;
  /** From the caller's access token, when they were browsing as a guest. */
  guestUserId?: string;
}): Promise<{ user: SessionUser; isNewUser: boolean } & TokenPair> {
  const identity = await verifyGoogleIdToken(input.idToken);
  const result = await signInWithIdentity(identity, input.device, input.guestUserId);
  recordSignIn(result, 'google', input.device);
  return result;
}

/**
 * Turns a VERIFIED identity into a session. Not exported: a caller that could
 * reach this directly could mint a session for any Google account unproven.
 */
async function signInWithIdentity(
  identity: VerifiedIdentity,
  device: DeviceInfo,
  guestUserId: string | undefined,
): Promise<{ user: SessionUser; isNewUser: boolean } & TokenPair> {
  const email = identity.email.toLowerCase();

  return withTransaction(async (client) => {
    let userId: string;
    let isNewUser = false;

    const linked = await client.query<{ user_id: string; status: string }>(
      `SELECT i.user_id, u.status
         FROM user_identities i JOIN users u ON u.id = i.user_id
        WHERE i.provider = $1 AND i.subject = $2
        FOR UPDATE OF i`,
      [identity.provider, identity.subject],
    );

    if (linked.rows[0]) {
      assertMaySignIn(linked.rows[0].status);
      userId = linked.rows[0].user_id;
      await client.query(
        'UPDATE user_identities SET last_used_at = now() WHERE provider = $1 AND subject = $2',
        [identity.provider, identity.subject],
      );
    } else {
      const byEmail = await client.query<{
        id: string;
        status: string;
        email_verified_at: Date | null;
      }>(
        'SELECT id, status, email_verified_at FROM users WHERE lower(email) = $1 FOR UPDATE',
        [email],
      );
      const existing = byEmail.rows[0];

      if (existing) {
        assertMaySignIn(existing.status);
        if (existing.email_verified_at === null) {
          throw new AppError(
            'EMAIL_IN_USE',
            'An account already uses this email. Sign in with your password, confirm your email, then use Google.',
            409,
          );
        }
        userId = existing.id;
      } else if (guestUserId) {
        // Upgraded IN PLACE, like the phone and email paths, so nothing the
        // guest did before signing up is orphaned.
        const upgraded = await client.query(
          `UPDATE users SET email = $2, email_verified_at = now(), status = 'active'
            WHERE id = $1 AND status = 'guest'`,
          [guestUserId, identity.email],
        );
        if (!upgraded.rowCount) {
          throw new AppError('SESSION_STALE', 'Sign in again to continue', 409);
        }
        userId = guestUserId;
        isNewUser = true;
      } else {
        userId = uuidv7();
        // Google proved the address, so it starts confirmed — the same state
        // an email account reaches after entering its code.
        await client.query(
          `INSERT INTO users (id, status, email, email_verified_at) VALUES ($1, 'active', $2, now())`,
          [userId, identity.email],
        );
        await client.query('INSERT INTO user_profiles (user_id) VALUES ($1)', [userId]);
        isNewUser = true;
      }

      await client.query(
        `INSERT INTO user_identities (id, user_id, provider, subject, email)
              VALUES ($1, $2, $3, $4, $5)`,
        [uuidv7(), userId, identity.provider, identity.subject, identity.email],
      );
    }

    if (guestUserId && guestUserId !== userId) {
      // Left intact, never merged — the same rule as the phone path: merging
      // balances between two identities is how laundering routes appear.
      logger.info('guest signed into an existing account', { guest_id: guestUserId, user_id: userId });
    }

    await upsertDevice(client, userId, device);
    const tokens = await issueTokenPair(client, userId, 'active', device.deviceId);
    const user = await loadSessionUser(client, userId);
    return { user, isNewUser, ...tokens };
  });
}

function assertMaySignIn(status: string): void {
  if (status === 'banned') {
    throw new AppError('ACCOUNT_BANNED', 'This account has been banned', 403);
  }
  if (status === 'suspended') {
    throw new AppError('ACCOUNT_SUSPENDED', 'This account is temporarily suspended', 403);
  }
  if (status !== 'active') {
    // 'deleted' cannot reach here (deletion removes identities and clears the
    // email); refuse rather than resurrect if it ever does.
    throw new AppError('ACCOUNT_UNAVAILABLE', 'This account cannot be used', 403);
  }
}
