# HanaPath Firebase progress sync setup

Status: implementation-ready, deliberately fail-closed until the owner supplies the Firebase project identifiers below.

## Architecture

HanaPath uses managed Google services only:

- Google Identity Services in the PWA and Android Credential Manager in the native app obtain a Google ID token.
- Firebase Authentication REST exchanges that Google credential for a Firebase UID plus renewable Firebase ID/refresh tokens.
- Cloud Firestore REST stores one progress snapshot at `users/{uid}/progress/current`.
- `firestore.rules` allows a signed-in learner to access only that exact UID-owned document.
- Local `hanapath-v1` remains the offline working copy. Cloud sync does not replace manual backup/export.
- No custom HanaPath API server, VPS, Cloud Function, or Firebase Admin service is required.

The intended billing posture is Firebase **Spark**. Do not attach a billing account merely to enable this feature. If a future requirement cannot run on Spark, treat that as a new owner decision rather than silently upgrading the project.

## One-time owner setup

### 1. Create the Firebase project

Create an owner-controlled Firebase project for HanaPath and keep it on the Spark plan.

Record:

- Firebase project ID
- Firebase Web API key

Both values are public client configuration. They are not server secrets; access control comes from Firebase Authentication and Firestore Security Rules.

### 2. Enable Google Authentication

In Firebase Authentication, enable the Google sign-in provider.

Create/confirm the Web OAuth client used by HanaPath. Record its client ID. This same Web/server client identity must remain consistent with the Android Credential Manager configuration already used by `GoogleSignInPlugin`.

For Android, keep the package ID exact:

`io.github.cameronnel.hanapath`

Register both the upload-key and Play App Signing certificate fingerprints when the Play signing certificate exists. A locally signed build working does not prove that a Play-installed build will authenticate.

### 3. Create Cloud Firestore

Create the default Firestore database. The app expects the standard `(default)` database.

Deploy the repository's `firestore.rules` before enabling sign-in for learners. The rule surface intentionally contains only:

`users/{userId}/progress/current`

and requires `request.auth.uid == userId`.

Do not add a broad authenticated-user rule such as `allow read, write: if request.auth != null`; that would permit cross-account progress access.

### 4. Fill the client configuration

In `index.html`, replace the three empty values in `window.HANAPATH_AUTH_CONFIG`:

```js
window.HANAPATH_AUTH_CONFIG = Object.freeze({
  firebaseApiKey: "<Firebase Web API key>",
  firebaseProjectId: "<Firebase project ID>",
  webClientId: "<Google Web OAuth client ID>",
});
```

For Android, also provide the same Web/server OAuth client ID through the existing `HANAPATH_GOOGLE_SERVER_CLIENT_ID` release-build configuration.

Until these values are present, the UI remains disabled and sends no authentication or learner-progress traffic.

## Sync contract

### First sign-in on an existing device

If no cloud document exists, HanaPath uploads the existing local `hanapath-v1` profile. Existing progress is therefore not reset merely because accounts were introduced later.

### Sign-in on a fresh second device

If the second device has no meaningful learner progress and the cloud account does, HanaPath downloads the cloud snapshot, keeps a rollback copy of the replaced local state, and reloads once so the app rehydrates through its normal `loadState()` path.

### Normal saves

Writes to the canonical `hanapath-v1` key schedule a debounced cloud sync. The app remains fully usable offline; reconnecting schedules another sync.

Each cloud snapshot contains:

- schema version
- the serialized canonical learner state
- SHA-256 of that state
- monotonic cloud revision
- device identifier
- client update timestamp

Firestore's document `updateTime` is used as an optimistic-concurrency precondition on writes.

### Conflicts

HanaPath never silently chooses one progress file when both the device and cloud changed since their shared sync base.

Instead it:

1. leaves the cloud copy untouched;
2. keeps the current local copy active;
3. stores a local conflict/rollback record; and
4. offers **Keep this device** or **Use cloud copy** from the account panel.

This intentionally favors no-data-loss over pretending a generic object merge understands SRS/exam semantics.

## Session and account lifecycle

- The raw Google credential is never persisted by HanaPath.
- Firebase ID/refresh tokens are persisted locally so the user remains signed in, matching normal Firebase web-client behavior.
- Firebase ID tokens are refreshed before cloud access when nearing expiry.
- Sign-out removes the Firebase session but keeps local learner progress.
- **Delete cloud account** deletes the user's Firestore progress document first, then deletes the Firebase Authentication account. Local progress remains on that device unless the learner separately clears/uninstalls it.

## Purchase entitlements

Do **not** add fields such as `premium: true` or `entitled: true` to this client-writable Firestore document.

The current release is `free_all` and has no Play Billing surface. If paid products return later:

- same-Play-account restoration should come from Google Play Billing's purchase query/restore flow;
- stronger HanaPath-account-bound entitlements require trusted purchase verification and are a separate security design;
- learner-editable Firestore progress must never be treated as proof of purchase.

## Release checks

Before enabling the three config values in a production release:

1. `node scripts/test-google-auth-contract.mjs`
2. `node scripts/audit-core-release.mjs --quick`
3. `node scripts/audit-core-release.mjs --full`
4. Generate the prepared native payload and confirm browser-only GIS remains absent from Android packaging.
5. Test: existing-progress first sign-in, fresh second-device restore, offline learning then reconnect, simultaneous-device conflict, sign-out/sign-in, and cloud-account deletion.
6. Update the Privacy Policy and Play Data Safety declaration to the enabled-account behavior for the exact release being submitted.

## Files

- `google_auth.js` — Firebase Authentication/session and Firestore sync client
- `google_auth_web.js` — browser-only Google Identity Services adapter
- `firestore.rules` — per-UID database authorization
- `index.html` — fail-closed public Firebase configuration
- `scripts/test-google-auth-contract.mjs` — blocking static security/integration contract
