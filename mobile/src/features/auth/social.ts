// Social sign-in.
//
// Google is live: the Google account picker runs ON DEVICE and returns an ID
// token, which goes to POST /v1/auth/social/google. The server verifies it
// against Google's keys and our client id before trusting a single field, and
// returns the same SessionResponse the phone flow returns. A guest is upgraded
// in place, which is why the call is not anonymous.
//
// The Google button appears only when EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID is set
// in the build — a button that can only fail is worse than no button.
//
// ── The other two, and why they are not here ──────────────────────────────
// · Facebook  — needs a Facebook developer app (and Business Verification for
//               anything beyond the default permissions). Add it as another
//               provider here plus a verifier in backend social.service.ts.
// · Instagram — Instagram Basic Display was SHUT DOWN in December 2024. There
//               is no consumer "Log in with Instagram" any more; what remains
//               covers business and creator accounts only, through Facebook.
//               Ordinary viewers could never use the button.

import { ApiError } from '@/api/client';
import { authApi } from '@/api/endpoints/auth';
import { ApiErrorCode, type SessionResponse } from '@/api/types';
import { env } from '@/config/env';
import { getDevicePayload } from '@/features/auth/device';

export type SocialProvider = 'google' | 'facebook' | 'instagram';

/** The providers that can actually sign someone in, in display order. */
export const SOCIAL_PROVIDERS: SocialProvider[] = env.googleWebClientId ? ['google'] : [];

/**
 * The person closed the Google account picker. Not a failure: the screen
 * shows nothing and lets them pick another way in.
 */
export class SocialSignInCancelled extends Error {
  constructor() {
    super('cancelled');
    this.name = 'SocialSignInCancelled';
  }
}

export async function signInWithProvider(provider: SocialProvider): Promise<SessionResponse> {
  if (provider !== 'google' || !env.googleWebClientId) {
    throw new ApiError(ApiErrorCode.SOCIAL_LOGIN_UNAVAILABLE, 'unavailable', 0);
  }
  const idToken = await googleIdToken(env.googleWebClientId);
  return authApi.signInWithGoogle({ idToken, device: await getDevicePayload() });
}

type GoogleSdk = typeof import('@react-native-google-signin/google-signin');

let configured = false;

async function googleIdToken(webClientId: string): Promise<string> {
  // Loaded on first use: the native module only exists in a development or
  // store build, and importing it eagerly would break Expo Go and the tests
  // for every screen that imports this file.
  // (The library calls TurboModuleRegistry.getEnforcing at load, which throws
  // where the native module is absent — the same reason otpWidget.ts and
  // livekit.ts require their SDKs lazily.)
  let sdk: GoogleSdk;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    sdk = require('@react-native-google-signin/google-signin') as GoogleSdk;
  } catch {
    throw new ApiError(ApiErrorCode.SOCIAL_LOGIN_UNAVAILABLE, 'native module missing', 0);
  }
  const { GoogleSignin, isCancelledResponse, isErrorWithCode, statusCodes } = sdk;

  if (!configured) {
    // webClientId is what makes Google return an ID token at all, and it is
    // the `aud` the server checks. No offline access: we want who they are,
    // not a refresh token for their Google account.
    GoogleSignin.configure({ webClientId, offlineAccess: false });
    configured = true;
  }

  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const response = await GoogleSignin.signIn();
    if (isCancelledResponse(response)) throw new SocialSignInCancelled();

    const idToken = response.data.idToken;
    if (!idToken) {
      throw new ApiError(ApiErrorCode.GOOGLE_SIGN_IN_FAILED, 'no id token', 0);
    }
    return idToken;
  } catch (error) {
    if (error instanceof SocialSignInCancelled || error instanceof ApiError) throw error;
    if (isErrorWithCode(error)) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED || error.code === statusCodes.IN_PROGRESS) {
        throw new SocialSignInCancelled();
      }
      if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        throw new ApiError(ApiErrorCode.GOOGLE_PLAY_SERVICES, 'play services', 0);
      }
      // DEVELOPER_ERROR (code 10) lands here: the build's SHA-1 or package is
      // not registered on the Android OAuth client. A setup problem, never the
      // user's — logged so it shows up in development and Sentry.
      console.warn(`[auth] Google sign-in failed with code ${error.code}`);
    }
    throw new ApiError(ApiErrorCode.GOOGLE_SIGN_IN_FAILED, 'google sign-in failed', 0);
  } finally {
    // Forget the Google session on this device straight away. The ID token has
    // done its job; keeping it would make the next tap silently reuse the same
    // Google account instead of offering the picker.
    GoogleSignin.signOut().catch(() => undefined);
  }
}
