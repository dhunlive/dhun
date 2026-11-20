import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import { exportJWK, generateKeyPair, SignJWT, type CryptoKey, type JWK } from 'jose';
import { buildApp } from '../src/app.js';
import { pool } from '../src/infra/db.js';
import { resetRateLimits } from '../src/middleware/rateLimit.js';
import { closePool } from './helpers.js';

const app = buildApp();
const AUDIENCE = 'dhun-test-web.apps.googleusercontent.com';
const KID = 'test-google-key';

/**
 * Google, replaced by a key made here.
 *
 * The verifier fetches Google's JWKS; fetch is stubbed to serve OUR public key
 * under a known kid, so a token this file signs is one "Google" signed. A
 * second key that is never published plays the forger.
 */
let googleKey: CryptoKey;
let forgerKey: CryptoKey;
let publishedJwk: JWK;

beforeAll(async () => {
  const google = await generateKeyPair('RS256');
  googleKey = google.privateKey;
  forgerKey = (await generateKeyPair('RS256')).privateKey;
  publishedJwk = { ...(await exportJWK(google.publicKey)), kid: KID, alg: 'RS256', use: 'sig' };

  vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
    const url = String(input instanceof Request ? input.url : input);
    if (url.startsWith('https://www.googleapis.com/oauth2/v3/certs')) {
      return new Response(JSON.stringify({ keys: [publishedJwk] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    throw new Error(`unexpected fetch in oauth.test: ${url}`);
  });
});

beforeEach(resetRateLimits);

afterAll(async () => {
  vi.restoreAllMocks();
  await closePool();
});

let counter = 0;
function nextAccount() {
  counter += 1;
  return { sub: `10${Date.now()}${counter}`, email: `g${counter}.${Date.now()}@gmail.test` };
}

async function idToken(
  claims: { sub: string; email: string; email_verified?: unknown },
  opts: { aud?: string; iss?: string; key?: CryptoKey; expiresIn?: string | number } = {},
): Promise<string> {
  return new SignJWT({ email: claims.email, email_verified: claims.email_verified ?? true })
    .setProtectedHeader({ alg: 'RS256', kid: KID })
    .setSubject(claims.sub)
    .setIssuer(opts.iss ?? 'https://accounts.google.com')
    .setAudience(opts.aud ?? AUDIENCE)
    .setIssuedAt()
    .setExpirationTime(opts.expiresIn ?? '1h')
    .sign(opts.key ?? googleKey);
}

const device = (id: string) => ({ deviceId: `social-${id}`.slice(0, 64), platform: 'android' });

function signIn(token: string, bearer?: string) {
  const req = request(app).post('/v1/auth/social/google');
  if (bearer) req.set('Authorization', `Bearer ${bearer}`);
  return req.send({ idToken: token, device: device(String(counter)) });
}

async function identityCount(sub: string): Promise<number> {
  const { rows } = await pool.query<{ n: string }>(
    "SELECT count(*) AS n FROM user_identities WHERE provider = 'google' AND subject = $1",
    [sub],
  );
  return Number(rows[0].n);
}

describe('Google sign-in', () => {
  it('creates an account with the email already confirmed', async () => {
    const who = nextAccount();
    const res = await signIn(await idToken(who)).expect(200);

    expect(res.body.accessToken).toBeTruthy();
    expect(res.body.isNewUser).toBe(true);
    expect(res.body.user.status).toBe('active');
    expect(res.body.user.email).toBe(who.email);
    expect(res.body.user.emailVerified).toBe(true);
    // Name and date of birth are still asked: the 18+ gate is not skipped.
    expect(res.body.user.profileComplete).toBe(false);
  });

  it('signs the same Google account back into the same Dhun account', async () => {
    const who = nextAccount();
    const first = await signIn(await idToken(who)).expect(200);
    const second = await signIn(await idToken(who)).expect(200);

    expect(second.body.user.id).toBe(first.body.user.id);
    expect(second.body.isNewUser).toBe(false);
    expect(await identityCount(who.sub)).toBe(1);
  });

  it('identifies by sub, not email: a changed Google address is still the same account', async () => {
    const who = nextAccount();
    const first = await signIn(await idToken(who)).expect(200);
    const second = await signIn(await idToken({ ...who, email: `changed.${who.email}` })).expect(200);

    expect(second.body.user.id).toBe(first.body.user.id);
  });

  it('upgrades a guest in place, keeping their id', async () => {
    const guest = await request(app)
      .post('/v1/auth/guest')
      .send({ device: device(`guest-${counter}`) })
      .expect(201);

    const res = await signIn(await idToken(nextAccount()), guest.body.accessToken).expect(200);

    expect(res.body.user.id).toBe(guest.body.user.id);
    expect(res.body.isNewUser).toBe(true);
  });

  it('links to an existing email account whose address is confirmed', async () => {
    const who = nextAccount();
    const reg = await request(app)
      .post('/v1/auth/email/register')
      .send({ email: who.email, password: 'correct horse battery', device: device(`reg-${counter}`) })
      .expect(201);
    await pool.query('UPDATE users SET email_verified_at = now() WHERE id = $1', [reg.body.user.id]);

    const res = await signIn(await idToken(who)).expect(200);

    expect(res.body.user.id).toBe(reg.body.user.id);
    expect(res.body.isNewUser).toBe(false);
    expect(await identityCount(who.sub)).toBe(1);
  });

  it('refuses to link to an account whose email nobody has confirmed (pre-hijacking)', async () => {
    const who = nextAccount();
    // Someone registered the victim's address first and never confirmed it.
    await request(app)
      .post('/v1/auth/email/register')
      .send({ email: who.email, password: 'attacker password', device: device(`att-${counter}`) })
      .expect(201);

    const res = await signIn(await idToken(who)).expect(409);

    expect(res.body.error.code).toBe('EMAIL_IN_USE');
    expect(await identityCount(who.sub)).toBe(0);
  });

  it('refuses a banned account', async () => {
    const who = nextAccount();
    const first = await signIn(await idToken(who)).expect(200);
    await pool.query("UPDATE users SET status = 'banned' WHERE id = $1", [first.body.user.id]);

    const res = await signIn(await idToken(who)).expect(403);
    expect(res.body.error.code).toBe('ACCOUNT_BANNED');
  });

  it('a deleted account loses the link, and the same Google account starts afresh', async () => {
    const who = nextAccount();
    const first = await signIn(await idToken(who)).expect(200);

    await request(app)
      .post('/v1/auth/account/delete')
      .set('Authorization', `Bearer ${first.body.accessToken}`)
      .send({})
      .expect(200);
    expect(await identityCount(who.sub)).toBe(0);

    const again = await signIn(await idToken(who)).expect(200);
    expect(again.body.user.id).not.toBe(first.body.user.id);
    expect(again.body.isNewUser).toBe(true);
  });
});

describe('Google ID token verification', () => {
  it('refuses a token minted for another app (wrong audience)', async () => {
    const res = await signIn(
      await idToken(nextAccount(), { aud: 'someone-else.apps.googleusercontent.com' }),
    ).expect(401);
    expect(res.body.error.code).toBe('SOCIAL_TOKEN_INVALID');
  });

  it('refuses a token not issued by Google', async () => {
    await signIn(await idToken(nextAccount(), { iss: 'https://evil.example' })).expect(401);
  });

  it('refuses a token signed by a key Google never published', async () => {
    const who = nextAccount();
    await signIn(await idToken(who, { key: forgerKey })).expect(401);
    expect(await identityCount(who.sub)).toBe(0);
  });

  it('refuses an expired token', async () => {
    const past = Math.floor(Date.now() / 1000) - 3600;
    await signIn(await idToken(nextAccount(), { expiresIn: past })).expect(401);
  });

  it('refuses an unsigned token (alg: none)', async () => {
    const enc = (o: object) => Buffer.from(JSON.stringify(o)).toString('base64url');
    const who = nextAccount();
    const unsigned =
      enc({ alg: 'none', typ: 'JWT' }) +
      '.' +
      enc({
        sub: who.sub,
        email: who.email,
        email_verified: true,
        iss: 'https://accounts.google.com',
        aud: AUDIENCE,
        exp: Math.floor(Date.now() / 1000) + 3600,
      }) +
      '.';
    await signIn(unsigned).expect(401);
  });

  it('refuses a Google account with no confirmed email', async () => {
    const res = await signIn(
      await idToken({ ...nextAccount(), email_verified: false }),
    ).expect(422);
    expect(res.body.error.code).toBe('SOCIAL_EMAIL_UNVERIFIED');
  });

  it('validates the body strictly', async () => {
    await request(app)
      .post('/v1/auth/social/google')
      .send({ idToken: 'x', device: device('v') })
      .expect(422);
    await request(app)
      .post('/v1/auth/social/google')
      .send({ idToken: await idToken(nextAccount()), device: device('v'), extra: 1 })
      .expect(422);
  });
});
