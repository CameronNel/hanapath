# Android signing and release — owner setup and runbook (M4)

> Governing brief: [`../FABLE_MOBILE_PLAY_STORE_HANDOVER.md`](../FABLE_MOBILE_PLAY_STORE_HANDOVER.md)
> §13.2 (protected release workflow) and §14 (signing and key custody).
>
> The release pipeline itself is
> [`.github/workflows/android-release.yml`](../../.github/workflows/android-release.yml).
> Everything in **§1–§3 below is an owner action** — it involves creating and
> guarding a real cryptographic key, which no agent should (or can) do for
> you. Nothing in this document contains a real secret.

## How signing works for this app

Google Play requires new apps to use **Play App Signing**: Google holds the
*app signing key* and signs what users download; you hold an **upload key**
and sign every AAB you send to the Play Console. If the upload key is ever
lost or leaked, Google can verify your identity and reset it — which is why
Play App Signing is non-negotiable here. The keystore you create below is the
upload key only.

The release build signs with the upload key **only** when the
`HANAPATH_UPLOAD_*` environment variables are present (see the
`signingConfigs` block in `mobile/android/app/build.gradle`). PR builds,
debug builds, and ordinary local builds never see them and are unchanged.

The selected release is `free_all`: signing configuration must not restore a
Billing dependency, billing permission, purchase product, or entitlement.

## Google sign-in configuration is a separate trust boundary

The repository contains fail-closed Google sign-in adapters, but the current
release intentionally has **no configured HanaPath account, session service,
or progress sync**. The signed-release workflow does not inject a Google client
ID or session endpoint. This is deliberate: an OAuth client ID alone cannot
securely authenticate a HanaPath user.

For a later reviewed activation, the owner must complete every item below:

1. Create an owner-controlled Google Cloud project and production OAuth consent
   screen. Create a **Web application OAuth client**; its public client ID is
   both the server/Web client ID and the exact expected `aud` claim in Google ID
   tokens. Android Credential Manager's `setServerClientId` specifically takes
   this Web client ID, not an Android client ID
   ([Credential Manager implementation](https://developer.android.com/identity/sign-in/credential-manager-siwg-implementation)).
2. Create Android OAuth client registrations for package
   `io.github.cameronnel.hanapath`. Record both SHA-1 and SHA-256 for the upload
   certificate and the distinct **Play App Signing** certificate. Use each
   signing certificate's SHA-1 in its Android OAuth client entry, and register
   the SHA-256 too wherever the linked Google/Firebase or Android developer
   configuration requests it. Successful upload-key testing does not validate
   a Play-installed build; Google explicitly requires the Play-held signing
   fingerprint to be registered with API providers
   ([Play App Signing](https://support.google.com/googleplay/android-developer/answer/9842756)).
3. Inject the Web/server client ID into Android with the Gradle property
   `-PHANAPATH_GOOGLE_SERVER_CLIENT_ID=<client-id>` or the matching
   `HANAPATH_GOOGLE_SERVER_CLIENT_ID` environment variable. For CI, add it as a
   protected GitHub environment **variable** and explicitly pass it to the
   Gradle build step in a reviewed workflow change; it is public metadata, not
   a signing secret.
4. Configure `window.HANAPATH_AUTH_CONFIG` before `google_auth.js` loads. The
   hosted browser needs `webClientId` and an HTTPS `sessionEndpoint`; the native
   payload needs that same `sessionEndpoint` through an explicitly generated,
   audited packaged configuration. No such configuration artifact exists in
   the current release. The native payload excludes the browser-only Google
   Identity loader from `mobile/www`.
5. Operate that endpoint on trusted infrastructure. It must verify Google's
   current signature/keys, allowed issuer, exact Web-client audience,
   expiry/timing claims, and the exact outstanding nonce returned with the
   credential. Consume the nonce once to prevent replay before issuing a
   secure HanaPath session. Never trust a token merely because browser code or
   the Android plugin decoded it. Prefer Google's supported server library and
   checks
   ([server-side ID-token verification](https://developers.google.com/identity/gsi/web/guides/verify-google-id-token)).
6. Before activation, update privacy/Data Safety/app-access declarations and
   ship sign-out, revocation, retention, and both in-app and public
   account-deletion paths. Google sign-in still must not imply progress sync;
   sync needs a separate reviewed storage and migration contract.

## 1. Owner action — generate the upload keystore (once)

On a trusted machine with a JDK installed (any Java 17+; `keytool` ships with
it). Pick two strong, unique passwords first (store password and key
password; they may be the same value, but write both down in your password
manager as separate entries).

```powershell
keytool -genkeypair `
  -keystore hanapath-upload.jks `
  -alias hanapath-upload `
  -keyalg RSA -keysize 4096 `
  -validity 10000 `
  -dname "CN=HanaPath Upload"
```

(Same command works on macOS/Linux without the backticks, all on one line.)
`keytool` will prompt for the store password and key password interactively —
that keeps them out of your shell history.

Rules (handover §14):

1. **Never commit the keystore.** `.gitignore` already blocks `*.jks`,
   `*.keystore`, `*.p12`, and `keystore.properties`; keep it that way.
2. **Back it up in at least two secure, owner-controlled places** (e.g.
   password manager attachment + encrypted offline drive), together with the
   alias and both passwords. Losing all copies means a support process with
   Google to reset the upload key.
3. Record the certificate fingerprints (safe to write down; they are public):

   ```powershell
   keytool -list -v -keystore hanapath-upload.jks -alias hanapath-upload
   ```

   Copy the SHA-1 and SHA-256 lines somewhere durable. Never write down the
   passwords next to the keystore file itself. These are the **upload-key**
   fingerprints. They are not the Play App Signing fingerprints that identify
   the certificate on builds users install from Google Play.

## 2. Owner action — create the protected GitHub environment

In the GitHub repo: **Settings → Environments → New environment** named
exactly `google-play-release`.

- Add **Required reviewers** and put yourself in it. Every release run will
  then pause until you approve it in the Actions UI — this is the "protected"
  part; without it any collaborator with write access could mint signed
  builds.
- Add the five **environment secrets** (environment secrets, not repository
  secrets, so only this workflow behind your approval can read them):

| Secret | Value |
|---|---|
| `ANDROID_UPLOAD_KEYSTORE_BASE64` | The keystore file, base64-encoded (below) |
| `ANDROID_UPLOAD_KEY_ALIAS` | `hanapath-upload` (or whatever alias you chose) |
| `ANDROID_UPLOAD_STORE_PASSWORD` | The store password |
| `ANDROID_UPLOAD_KEY_PASSWORD` | The key password |
| `ANDROID_UPLOAD_CERT_SHA256` | The upload certificate's SHA-256 fingerprint from `keytool -list -v` |

Base64-encoding the keystore:

```powershell
# Windows PowerShell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("hanapath-upload.jks")) | Set-Clipboard
```

```bash
# macOS/Linux
base64 -w0 hanapath-upload.jks   # (on macOS: base64 -i hanapath-upload.jks)
```

Paste the single-line output into the secret, then clear your clipboard.

## 3. Owner action — first Play Console enrolment (at M5)

When the app is first created in the Play Console (after the
[`OWNER_DECISIONS.md`](OWNER_DECISIONS.md) items are confirmed ✅), accept the
**Play App Signing** terms and upload the first AAB built by this workflow.
Google derives the accepted upload certificate from that first bundle.
After enrolment, open Play Console's **App integrity / App signing** page and
record the Play App Signing certificate's SHA-1 and SHA-256 beside the upload
certificate fingerprints. Keep both sets: release verification checks the
upload signature, while any later Google sign-in activation must recognize the
Play signing identity used on tester and production devices.

## 4. Running a release (the boring part, by design)

1. GitHub → **Actions → "Android signed release" → Run workflow**, on
   `main`.
2. Fill in:
   - `versionName` — user-visible, e.g. `1.0.0`.
   - `versionCode` — integer, strictly greater than every previous release.
     The workflow enforces this against the `android-release/<versionCode>`
     tags it pushes after each successful build, so an accidental repeat
     fails before anything is signed. (The Play Console independently rejects
     repeats — the tag guard just catches it earlier.)
   - `releaseChannel` — `internal` (the only option until closed testing
     opens; see the internal-testing runbook at M5).
   - `releaseNotes` — optional one-liner stored next to the AAB.
3. Approve the run when the `google-play-release` environment asks.
4. The workflow, from a clean checkout of that `main` commit:
   - fails unless the commit is actually on `main`;
   - re-runs the **full audit gate** (app shell, words/sentences/alphabet
     strict, Hangul recognition, mobile package);
   - rebuilds `mobile/www` deterministically and re-audits it;
   - injects the version via `mobile/scripts/version-android.mjs` (the
     committed `build.gradle` keeps placeholder values; nothing is pushed);
   - restores the keystore from the base64 secret into a `0600` temp file,
     fails fast if the alias/password or protected SHA-256 fingerprint is wrong,
     builds `bundleRelease`, and
     **deletes the temp keystore even on failure**;
   - verifies the merged release manifest: package ID
     `io.github.cameronnel.hanapath`, exact versionName/versionCode, and the
     permission allowlist (INTERNET only, plus the app's own signature-level
     receiver-hardening permission);
   - leaves Google sign-in unconfigured for the current release: no
     `HANAPATH_GOOGLE_SERVER_CLIENT_ID` or trusted session endpoint is injected,
     so the control remains fail-closed and no account/session/sync is created;
   - verifies the AAB signature (`jarsigner -verify -strict`), checks its
     signing certificate against `ANDROID_UPLOAD_CERT_SHA256`, and records the
     public certificate fingerprints;
   - fails if the AAB grows past the conservative 190 MiB release ceiling,
     forcing an audio/package review before Play upload;
   - uploads one artifact `hanapath-android-release-<name>-c<code>`
     containing the signed `.aab`, its `.sha256`, `release-report.txt`,
     `www-manifest.json`, and your release notes;
   - pushes the `android-release/<versionCode>` tag.
5. Download the artifact, check `release-report.txt`, and upload the `.aab`
   to the Play Console internal track yourself. **Nothing auto-uploads to
   Google Play** — automated upload is a separate, later milestone behind
   this same environment (handover §13.3), and production promotion stays a
   deliberate owner action permanently.

## 5. Secret-safety properties of the workflow

- Secrets are referenced only in the steps that need them and are passed
  as environment variables; GitHub masks their values in logs, and no step
  ever `echo`es them.
- The decoded keystore lives only in `$RUNNER_TEMP` with `0600` permissions
  on an ephemeral runner and is shredded in an `if: always()` step.
- Pull-request workflows (`android-build.yml`) use **no** secrets and cannot:
  environment secrets are invisible outside the `google-play-release`
  environment.
- The AAB artifact contains only what users would receive from Play anyway;
  the report records public fingerprints, never key material.

## 6. If something goes wrong

- **Wrong password/alias** — the run fails at "Restore upload keystore"
  before anything is built or signed. Fix the environment secret and re-run.
- **versionCode rejected** — pick the next integer; check the highest
  existing `android-release/*` tag.
- **Keystore lost** — restore from a backup (§1.2). If all copies are gone,
  use the Play Console's upload-key reset process (identity verification
  through Google support); the app signing key held by Google is unaffected.
- **Keystore leaked** — reset the upload key through the Play Console
  immediately and rotate all five secrets, including the expected fingerprint.
