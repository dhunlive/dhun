# Google sign-in — setup

The code is built end to end (backend `POST /v1/auth/social/google`, migration 041, the
app's Google button). What is left is **two OAuth client ids in Google Cloud** and two
settings that carry one of them. Nothing here is a secret: client ids are public by design.

Project: **`dhun-514018`** (the Firebase project; Google Cloud and Firebase share it).

**Done 2026-11-20.** The quick route, which replaces steps 1–3 below:

1. `firebase apps:android:sha:create <app id> <SHA-1>` — the EAS keystore's SHA-1
   (`97:F6:8E:…:A9:C1`), read from expo.dev › Credentials.
2. Firebase console › Authentication › Sign-in method › **Google › Enable** (console only;
   there is no public API for it). That one save creates the consent screen, the **web
   client** and an **Android client** for every SHA-1 already on the app.
3. `firebase apps:sdkconfig ANDROID <app id>` → the new `google-services.json`; its
   `client_type: 3` entry is the web client id
   (`420866654846-6tmnfsn48lgl5daa2mnhm5o27qkl35kd.apps.googleusercontent.com`). The file goes
   to EAS as the `GOOGLE_SERVICES_JSON` file variable in all three environments.

A new signing key later (Play App Signing) needs only step 1 again with its SHA-1, then a
fresh `google-services.json` uploaded to EAS.

## How it fits together

```
App ── Google account picker (on device) ──► ID token, aud = WEB client id
App ── POST /v1/auth/social/google { idToken } ──► API
API ── checks signature (Google's keys), iss, aud ∈ GOOGLE_OAUTH_CLIENT_IDS, exp,
       email_verified ──► session
```

Two client ids, two jobs:

| Client | Type | What it does |
|---|---|---|
| **Android** | Android | Lets *this* app (package + signing certificate) open the picker. Never configured in code; Google matches it by package and SHA-1. A missing or wrong one is `DEVELOPER_ERROR` (code 10) on the phone. |
| **Web** | Web application | The **audience** of the ID token. The app passes it as `webClientId`; the server accepts only tokens issued to it. |

## 1 · Consent screen (once)

Google Cloud Console › project `dhun-514018` › **APIs & Services › OAuth consent screen**
(called **Google Auth Platform › Branding** in the newer console):

- App name **Dhun**, support email `dev@dhunlive.com`, logo optional.
- Audience: **External**.
- Authorised domain: `dhunlive.com`. Privacy policy URL is required before publishing.
- Scopes: only the defaults (`openid`, `email`, `profile`). These need **no Google
  verification**.
- While the status is **Testing**, only the test users you list can sign in. Add your own
  Google accounts there for now; click **Publish app** before testers outside that list.

## 2 · The Android client — one per signing key

**APIs & Services › Credentials › Create credentials › OAuth client ID › Android**:

- Package name: `com.dhunlive.dhun`
- SHA-1: the signing certificate of the build that will run it.
  - **EAS builds (development, preview):** expo.dev › project **dhun** › **Credentials** ›
    Android › `com.dhunlive.dhun` › the keystore's **SHA-1 fingerprint**.
  - **Play Store builds, later:** Play Console › the app › **Test and release › App
    integrity › App signing** › *App signing key certificate* SHA-1. Google re-signs
    store builds, so this is a DIFFERENT SHA-1 and needs its own Android client.
  - A local `npx expo run:android` debug build: `cd android && ./gradlew signingReport`.

Create one Android client per SHA-1. They all coexist.

## 3 · The web client

**Create credentials › OAuth client ID › Web application**, name `Dhun server`. No origins or
redirect URIs are needed. Copy its **Client ID** (`…apps.googleusercontent.com`).

## 4 · Give the web client id to the server and the app

**Server** (`infra/dev/dev.env` on the droplet; `backend/.env` locally):

```
GOOGLE_OAUTH_CLIENT_IDS=<web client id>
```

then `docker compose up -d` in `/opt/dhun/infra/dev`. Unset, the endpoint answers 503 —
it never falls back to accepting any audience.

**App**: `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=<web client id>` in `mobile/.env` for local work,
and in each `eas.json` build profile's `env` for EAS builds (EAS never reads your `.env`).
Unset, the Google button is hidden.

## 5 · A new development build

`@react-native-google-signin/google-signin` is a native module, so the current dev build
does not contain it. Build a new one (`eas build --profile development --platform android`).
Until then the button, if shown, reports "not available" instead of crashing.

## Account rules (what the server does)

- A Google account is identified by its `sub`, never its email.
- Same Google account again → the same Dhun account.
- An existing account with the same **confirmed** email → Google is linked to it.
- The same email but **unconfirmed** → refused (`EMAIL_IN_USE`). Anyone can register any
  address with a password; linking into that would hand the real owner an account a
  stranger holds the password to. The owner signs in with the password, confirms the
  email, then Google works.
- A guest → upgraded in place, like the phone flow.
- New accounts start with the email confirmed and still go through profile setup, so
  the 18+ date of birth is asked as before.
- Deleting the account deletes the link; the same Google account can sign up again.

## Facebook and Instagram

Not built, and hidden in the app:

- **Facebook** needs a Facebook developer app (Business Verification for anything past
  the default permissions). Then it is one more provider in `social.service.ts`
  (`provider IN ('google', 'facebook')` in a migration) and in `features/auth/social.ts`.
- **Instagram** consumer login no longer exists: Basic Display was shut down in December
  2024, and what remains covers business and creator accounts only.

## Troubleshooting

| On the phone | Cause |
|---|---|
| `DEVELOPER_ERROR` / "Google sign-in did not work" right away | No Android client for this build's SHA-1 + package (step 2) |
| Picker works, then "not available right now" | `GOOGLE_OAUTH_CLIENT_IDS` unset on the server |
| Picker works, then "did not work" | The app's web client id and the server's differ (token `aud` refused) |
| Only some accounts can sign in | Consent screen still in **Testing** (step 1) |
