# Google Play Console — what is set, and how

App: **Dhun Live**, `com.dhunlive.dhun`, personal developer account `dev@dhunlive.com`.

## Done by API (Claude, from this laptop)

Access is the keyless service account `play-publisher@dhun-514018` (invited in Play Console ›
Users and permissions). Tools in `~/.claude/tools/`: `play-token.ps1`, `play-upload.mjs`
(an `.aab` to a track, as a draft), `play-listing.mjs` (listing text, details, images).

- Builds: `eas build --profile testing` (talks to `api-dev.dhunlive.com`) → closed testing.
  `--profile production` waits for a production server.
- Store listing in **en-IN** (default) and **hi-IN**: title, short and full description,
  icon, feature graphic, phone screenshots.
- Contact email `support@dhunlive.com`, website `https://dhunlive.com`.

## Console only — Google has no API for these

Play Console › the app › **Policy and programs › App content**. Answers are true of the
testing build against the dev server; revisit each before production.

| Form | Answer |
|---|---|
| **Privacy policy** | `https://dhunlive.com/privacy` |
| **App access** | *All or some functionality is restricted.* Instructions: "Tick the box agreeing to the Terms and Privacy Policy, tap Phone, enter any Indian mobile number (for example 9000000001) and tap Send code. On this test server the 6-digit code is shown on the next screen; enter it. Set a name and a date of birth at least 18 years ago." No username or password needed. |
| **Ads** | No, the app does not contain ads. |
| **Content rating** | Category: **Social, communication or dating** → *Social*. Violence, sexual content, profanity, drugs: **No**. Simulated gambling: **No**. Users can interact or exchange content: **Yes**. Shares the user's current location: **No**. Allows purchases of digital goods: **Yes**. Unrestricted internet / web browsing: **No**. |
| **Target audience** | **18 and over** only. Appeals to children: **No**. |
| **News app** | No. |
| **Government app** | No. |
| **Financial features** | My app doesn't provide any financial features. |
| **Health** | No health features. |
| **Data safety** | See below. |

### Data safety

- Collects or shares any of the required data types: **Yes**.
- All user data encrypted in transit: **Yes**.
- Users can request deletion: **Yes** — `https://dhunlive.com/delete-account`.
- **Shared** with third parties: **none** (every provider is a service provider acting for
  us, which Google does not count as sharing).

Collected (all *required* unless noted; none sold, none for ads):

| Category › type | Purposes | Notes |
|---|---|---|
| Personal info › Name | App functionality, Account management | |
| Personal info › Email address | Account management | Optional |
| Personal info › Phone number | Account management, Fraud prevention and security | Optional if signed in with Google or email |
| Personal info › User IDs | App functionality, Account management | |
| Personal info › Other info | App functionality | Date of birth, gender, bio, languages |
| Financial info › Purchase history | App functionality | Card/UPI details never reach us |
| Messages › Other in-app messages | App functionality | Room chat, DMs |
| Photos and videos › Photos | App functionality, Fraud prevention and security | Optional; profile photo, host face check |
| Photos and videos › Videos | App functionality | Optional; live video, **processed ephemerally** |
| Audio › Voice or sound recordings | App functionality | Optional; live audio, **processed ephemerally**, never recorded |
| App activity › App interactions | Analytics, App functionality | |
| App activity › Other user-generated content | App functionality | Bio, reports |
| App info and performance › Crash logs, Diagnostics | Analytics | Sentry |
| Device or other IDs | App functionality, Fraud prevention and security, Analytics | Random install ID, push token |

Not collected: location, contacts, calendar, files and docs, web history, health, financial
account details.

## Closed testing (personal account rule)

A personal account needs **12 testers opted in for 14 days in a row** on closed testing
before production access can be requested. Testers: Play Console › Test and release ›
Testing › Closed testing › Testers — add an email list, share the opt-in link.
