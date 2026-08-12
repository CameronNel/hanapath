# Android signing and release — owner setup and runbook (M4)

> Governing brief: [`../FABLE_MOBILE_PLAY_STORE_HANDOVER.md`](../FABLE_MOBILE_PLAY_STORE_HANDOVER.md)
> §13.2 (protected release workflow) and §14 (signing and key custody).
>
> The release pipeline is
> [`.github/workflows/android-release.yml`](../../.github/workflows/android-release.yml).
> Keystore creation, production AdMob identifiers, audience declarations, and
> Play Console actions remain owner-controlled release work.

## How signing works for this app

Google Play App Signing holds the app-signing key used for Play-delivered
builds; the owner holds an upload key and signs each AAB submitted to Play. The
keystore below is the upload key only.

The release build signs with the upload key only when the
`HANAPATH_UPLOAD_*` environment variables are present. PR/debug builds never
receive signing material.

The selected learning-product mode remains `free_all`: all learning and
Handwriting Coach paths are available without a purchase. The Android app is
**ad-supported** and offers one optional monthly Google Play subscription that
suppresses ads while active. No ad or purchase result can lock or unlock
learning content.

## Advertising release configuration

Two public AdMob identifiers are required by the protected release workflow:

- `HANAPATH_ADMOB_APP_ID` — the AdMob Android app ID
  (`ca-app-pub-…~…` format).
- `HANAPATH_ADMOB_INTERSTITIAL_ID` — the production interstitial ad-unit ID
  (`ca-app-pub-…/…` format).

They are public configuration, not cryptographic secrets. Store them as
**environment variables** in the protected `google-play-release` GitHub
environment. Debug/PR builds do not use them: the source build uses Google's
dedicated test AdMob IDs so development cannot generate invalid live-ad
traffic.

Before supplying the production IDs:

1. Apply the confirmed non-child decision in
   [`OWNER_DECISIONS.md`](OWNER_DECISIONS.md): worldwide distribution, Play
   target age `18 and over`, and no Families-only or child-age ad treatment.
2. Create the AdMob app and one interstitial ad unit.
3. Configure the applicable **Privacy & messaging** message(s) in AdMob.
4. Re-check [`DATA_SAFETY.md`](DATA_SAFETY.md) and `privacy.html`.
5. In Play Console, declare **Contains ads = Yes** for the release.

The native integration requests UMP consent information every configured app
launch. Production ads are not requested until UMP reports that ads may be
requested. If UMP requires a privacy-options entry point, the native Settings
screen exposes **Privacy choices**.

## Ad-free subscription release configuration

Play Console must contain subscription `hanapath_ad_free_monthly` with an
auto-renewing monthly base plan named `monthly`, a US$2.00 base price with
regional conversion, and no free trial. The app renders only Google Play's
localized price and terms.

Store the app's Google Play licence public key in the protected environment as
`HANAPATH_PLAY_BILLING_PUBLIC_KEY`. It is public verification configuration,
not a payment credential, but release builds fail closed when it is missing.
The client queries current subscription ownership on startup/resume, verifies
the signed purchase, acknowledges initial completed purchases, grants nothing
for pending purchases, exposes restore/manage controls, and suppresses ads only
while Play reports an active subscription. A secure backend remains Google's
recommended stronger verification model and should be considered before broad
production scale; the current no-account release performs verification on the
device.

## Google sign-in release fingerprints

Firebase Authentication and Firestore progress sync are configured in the
source using public Firebase client identifiers. The committed
`google-services.json` generates Android's Web client ID; no private service
account key is bundled or required.

Before testing a release-signed or Play-delivered build, add both the upload
certificate and Play App Signing certificate SHA-1/SHA-256 fingerprints to the
Firebase Android app. Debug sign-in working does not prove that either release
identity is registered.

## 1. Owner action — generate the upload keystore (once)

On a trusted machine with a JDK installed, create a dedicated upload key:

```powershell
keytool -genkeypair `
  -keystore hanapath-upload.jks `
  -alias hanapath-upload `
  -keyalg RSA -keysize 4096 `
  -validity 10000 `
  -dname "CN=HanaPath Upload"
```

(Same command works on macOS/Linux without the PowerShell backticks.)

Rules:

1. **Never commit the keystore.** `.gitignore` blocks the usual keystore/key
   extensions; keep it that way.
2. Keep at least two secure owner-controlled backups, along with alias and
   passwords in a password manager.
3. Record the public SHA-1/SHA-256 certificate fingerprints:

   ```powershell
   keytool -list -v -keystore hanapath-upload.jks -alias hanapath-upload
   ```

These are upload-key fingerprints, not the distinct Play App Signing
fingerprints users' Play-installed builds will carry.

## 2. Owner action — create the protected GitHub environment

Repo → **Settings → Environments → New environment** named exactly
`google-play-release`.

Add required reviewers, then add these **environment secrets**:

| Secret | Value |
|---|---|
| `ANDROID_UPLOAD_KEYSTORE_BASE64` | Base64-encoded upload keystore |
| `ANDROID_UPLOAD_KEY_ALIAS` | Upload-key alias |
| `ANDROID_UPLOAD_STORE_PASSWORD` | Keystore password |
| `ANDROID_UPLOAD_KEY_PASSWORD` | Key password |
| `ANDROID_UPLOAD_CERT_SHA256` | Upload certificate SHA-256 |

Add these **environment variables** (not secrets):

| Variable | Value |
|---|---|
| `HANAPATH_ADMOB_APP_ID` | Production AdMob Android app ID |
| `HANAPATH_ADMOB_INTERSTITIAL_ID` | Production interstitial ad-unit ID |
| `HANAPATH_PLAY_BILLING_PUBLIC_KEY` | Google Play app licence public key used to verify subscription purchase signatures |

The signed-release workflow fails before building if either AdMob variable or
the Play Billing public key is missing.

Base64 example:

```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("hanapath-upload.jks")) | Set-Clipboard
```

```bash
base64 -w0 hanapath-upload.jks
```

Clear the clipboard after storing the value.

## 3. Owner action — first Play Console enrolment

After the owner decisions are confirmed, create the app, accept Play App
Signing, and upload the first AAB built by the protected workflow. Record both
sets of public signing fingerprints afterward:

- owner upload certificate SHA-1/SHA-256;
- Play App Signing certificate SHA-1/SHA-256.

Keep them distinct. The workflow verifies the upload signature; Play-delivered
identity uses the Play-held certificate.

## 4. Running a release

1. GitHub → **Actions → Android signed release → Run workflow** on `main`.
2. Supply `versionName`, a strictly increasing integer `versionCode`, internal
   release channel, and optional notes.
3. Approve the protected environment prompt.
4. The workflow:
   - requires the exact latest `main` commit;
   - requires all signing secrets, both production AdMob variables, and the
     Play Billing public key;
   - rebuilds the deterministic native web payload;
   - runs the full authoritative release gate;
   - injects the version without editing source;
   - validates the upload keystore and expected SHA-256;
   - runs lint + Android unit tests, including the five-minute ad-cadence test;
   - builds the signed AAB with the configured production AdMob identifiers;
   - verifies the merged manifest: package/version plus only the reviewed
     `INTERNET`, `ACCESS_NETWORK_STATE`, `AD_ID`, `BILLING`, and AndroidX
     signature-level receiver-hardening permissions;
   - verifies Billing is isolated to the ad-free subscription and microphone
     remains absent;
   - verifies Firebase/Google sign-in configuration is packaged;
   - verifies the AAB signature and upload certificate;
   - enforces the project's conservative 190 MiB AAB ceiling;
   - writes `release-report.txt`, which records that AdMob interstitials and the
     five-minute lesson-completion cooldown are configured;
   - uploads the release artifact bundle and records the monotonic release tag.
5. Download and inspect the artifact, then upload the AAB to Play internal
   testing manually. No workflow promotes a build to production.

## 5. What the ad cadence means in a release build

The native app starts a five-minute eligibility window when the app session
starts. Only a **newly completed** Alphabet, Words, or Sentences lesson can ask
for an interstitial. If that completion happens before the window opens, no ad
shows and nothing is queued.

When an interstitial actually appears, the cooldown timestamp is persisted at
`onAdShowedFullScreenContent`. A load failure, no-fill, or failed-to-show event
never advances the cooldown. Therefore:

- lesson completion at minute 4 → no ad;
- newly completed lesson at minute 7 → eligible ad;
- if that ad appears at minute 7, a lesson at minute 11 → no ad;
- a newly completed lesson at minute 12 or later → eligible again.

Startup migrations, bulk state changes, hidden/resumed state restoration,
failed lessons, and replays that do not add a new completion ID are excluded.
The website/PWA does not package the native ad bridge.

## 6. Secret/configuration safety

- Signing secrets are visible only inside the protected release environment and
  are passed as environment variables to the steps that need them.
- The decoded keystore lives in runner temporary storage and is removed even on
  failure.
- PR workflows use no signing secrets and use Google test ad inventory.
- AdMob IDs are public environment variables and may appear in the shipped
  manifest/binary; that is expected.
- No release step prints passwords or private key material.

## 7. Failure cases

- **Missing AdMob IDs** — configure the two protected environment variables;
  the release workflow deliberately refuses to produce a signed AAB without
  them.
- **Missing Play Billing key/product** — configure
  `HANAPATH_PLAY_BILLING_PUBLIC_KEY`, create and activate the exact subscription
  and monthly base plan, upload a Play build, and use a licence tester. A
  sideloaded debug APK cannot prove real subscription product availability.
- **Consent/privacy setup incomplete** — fix AdMob Privacy & messaging and
  re-run device/internal testing; do not bypass UMP in code.
- **Wrong signing password/alias/fingerprint** — correct the protected signing
  environment and re-run.
- **versionCode rejected** — use the next integer after the highest recorded
  `android-release/*` tag.
- **AAB exceeds 190 MiB** — treat it as a package-size review, not permission to
  silently weaken the gate.
- **Keystore lost or compromised** — follow the Play upload-key reset/recovery
  process and rotate the protected signing configuration.
