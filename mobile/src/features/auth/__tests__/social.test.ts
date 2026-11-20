import { ApiError } from '@/api/client';
import { authApi } from '@/api/endpoints/auth';
import { ApiErrorCode } from '@/api/types';
import {
  SOCIAL_PROVIDERS,
  SocialSignInCancelled,
  signInWithProvider,
} from '@/features/auth/social';

jest.mock('@/config/env', () => ({
  env: { apiUrl: 'http://api.test', googleWebClientId: 'web-client.apps.googleusercontent.com' },
}));

jest.mock('@/features/auth/device', () => ({
  getDevicePayload: jest.fn(async () => ({ deviceId: 'device-under-test', platform: 'android' })),
}));

jest.mock('@/api/endpoints/auth', () => ({
  authApi: { signInWithGoogle: jest.fn(async () => ({ user: { id: 'u1' } })) },
}));

const mockCodes = {
  SIGN_IN_CANCELLED: '12501',
  IN_PROGRESS: 'IN_PROGRESS',
  PLAY_SERVICES_NOT_AVAILABLE: 'PLAY_SERVICES_NOT_AVAILABLE',
  SIGN_IN_REQUIRED: 'SIGN_IN_REQUIRED',
};

const mockGoogle = {
  configure: jest.fn(),
  hasPlayServices: jest.fn(async () => true),
  signIn: jest.fn(),
  signOut: jest.fn(async () => null),
};

jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: mockGoogle,
  statusCodes: mockCodes,
  isCancelledResponse: (r: { type: string }) => r.type === 'cancelled',
  isErrorWithCode: (e: unknown) => typeof e === 'object' && e !== null && 'code' in e,
}));

const nativeError = (code: string) => Object.assign(new Error(code), { code });

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Google sign-in on device', () => {
  it('offers Google when the build carries a web client id', () => {
    expect(SOCIAL_PROVIDERS).toEqual(['google']);
  });

  it('sends the ID token to the server and forgets the Google session', async () => {
    mockGoogle.signIn.mockResolvedValueOnce({ type: 'success', data: { idToken: 'the-id-token' } });

    await signInWithProvider('google');

    expect(mockGoogle.configure).toHaveBeenCalledWith(
      expect.objectContaining({ webClientId: 'web-client.apps.googleusercontent.com' }),
    );
    expect(authApi.signInWithGoogle).toHaveBeenCalledWith({
      idToken: 'the-id-token',
      device: { deviceId: 'device-under-test', platform: 'android' },
    });
    expect(mockGoogle.signOut).toHaveBeenCalled();
  });

  it('treats a closed picker as a cancel, not a failure', async () => {
    mockGoogle.signIn.mockResolvedValueOnce({ type: 'cancelled', data: null });
    await expect(signInWithProvider('google')).rejects.toBeInstanceOf(SocialSignInCancelled);

    mockGoogle.signIn.mockRejectedValueOnce(nativeError(mockCodes.SIGN_IN_CANCELLED));
    await expect(signInWithProvider('google')).rejects.toBeInstanceOf(SocialSignInCancelled);

    expect(authApi.signInWithGoogle).not.toHaveBeenCalled();
  });

  it('says so when the phone has no Google Play services', async () => {
    mockGoogle.hasPlayServices.mockRejectedValueOnce(
      nativeError(mockCodes.PLAY_SERVICES_NOT_AVAILABLE),
    );
    await expect(signInWithProvider('google')).rejects.toMatchObject({
      code: ApiErrorCode.GOOGLE_PLAY_SERVICES,
    });
  });

  it('maps a setup error (DEVELOPER_ERROR) to a translatable failure, never a raw native message', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    mockGoogle.signIn.mockRejectedValueOnce(nativeError('10'));

    const failure = await signInWithProvider('google').catch((e: unknown) => e);

    expect(failure).toBeInstanceOf(ApiError);
    expect((failure as ApiError).code).toBe(ApiErrorCode.GOOGLE_SIGN_IN_FAILED);
    warn.mockRestore();
  });

  it('refuses a success with no ID token rather than sending nothing', async () => {
    mockGoogle.signIn.mockResolvedValueOnce({ type: 'success', data: { idToken: null } });
    await expect(signInWithProvider('google')).rejects.toMatchObject({
      code: ApiErrorCode.GOOGLE_SIGN_IN_FAILED,
    });
    expect(authApi.signInWithGoogle).not.toHaveBeenCalled();
  });

  it('has no Facebook or Instagram path to call', async () => {
    await expect(signInWithProvider('facebook')).rejects.toMatchObject({
      code: ApiErrorCode.SOCIAL_LOGIN_UNAVAILABLE,
    });
  });
});
