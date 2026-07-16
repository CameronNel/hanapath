# Fable handover — mobile-first native shell and Google Play release path

> **Owner direction (2026-07-16):** Make HanaPath straightforward to package,
> test, sign, and upload to Google Play when the product is ready, while keeping
> the same app fully usable and testable in phone and tablet browsers. Fable is
> trusted to own the difficult implementation choices inside the boundaries in
> this document. If native handwriting recognition is materially better, Fable
> is explicitly allowed to use it in the packaged app without removing the web
> fallback.

## 0. Read this before touching anything

Fable: this is an execution handover, not a request for another strategy memo.
Read the repository rules, verify the current branch and data, then implement
the work as a sequence of focused pull requests.

Read these files completely, in this order:

1. [`../AI_INSTRUCTIONS.md`](../AI_INSTRUCTIONS.md)
2. [`../AGENTS.md`](../AGENTS.md)
3. [`../CLAUDE.md`](../CLAUDE.md)
4. [`../HANDOVER.md`](../HANDOVER.md)
5. [`HANGUL_WRITING_PLAN.md`](HANGUL_WRITING_PLAN.md)
6. This document again after inspecting the code
7. [`.agents/AGENTS.md`](../.agents/AGENTS.md) before changing anything that
   adds spoken Korean or touches generated audio

`AGENTS.md` and `CLAUDE.md` are tracked at the repository root and are intended
to be visible on GitHub. Do not replace them with generic mobile-project
instructions. Amend them narrowly when the mobile foundation is merged so they
describe the packaging exception below.

Before beginning:

- Run `git status --short --branch`.
- Start from an up-to-date `main`. The Hangul-recognition fix shipped in PR
  #264 on 2026-07-16; verify it is present before building native adapters.
- Do not absorb unrelated working-tree files or another agent's staged changes.
- Create a focused branch for each phase.
- Open draft PRs. The owner marks them ready and squash-merges them.

## 1. Outcome, stated plainly

HanaPath should have **one product implementation with multiple delivery
surfaces**:

```text
Canonical HanaPath HTML/CSS/JS
├── Hosted website in a normal phone/tablet browser
├── Installable PWA from that website
├── Android app packaged with Capacitor
└── Later: iPhone/iPad app packaged with Capacitor
```

The website must not become a secondary demo. It remains a first-class product
surface and the fastest way for the owner to test on a phone. The Android app
must package the same audited runtime rather than grow an independent UI fork.

The immediate delivery target is an Android App Bundle (`.aab`) that can be
uploaded to Google Play internal testing with minimal manual ceremony. The
architecture must remain compatible with a later iOS/iPadOS shell.

## 2. Decision: use Capacitor, do not rewrite HanaPath

Use the current stable Capacitor major after checking its official support and
upgrade policy. At the time this handover was written, the official docs are
Capacitor 8 and describe Android, iOS, and Web as supported targets:

- [Capacitor overview](https://capacitorjs.com/docs)
- [Installing Capacitor in an existing web app](https://capacitorjs.com/docs/getting-started)
- [Capacitor workflow](https://capacitorjs.com/docs/basics/workflow)
- [Environment requirements](https://capacitorjs.com/docs/getting-started/environment-setup)

Do **not** rewrite the UI in React, React Native, Flutter, Ionic UI, Kotlin
Compose, or another framework. Capacitor is the native container and bridge;
HanaPath remains vanilla HTML, CSS, and browser JavaScript.

Do **not** use a Trusted Web Activity as the primary solution. A TWA is an
Android-only fullscreen browser surface and does not provide the cross-platform
native bridge needed for future handwriting, haptics, storage, and iOS work.
It can remain an emergency fallback, not the target architecture. See the
[official Android TWA overview](https://developer.android.com/develop/ui/views/layout/webapps/trusted-web-activities).

## 3. Owner-approved exception to the static-app rule

The existing rule is correct for the product code: no framework, bundler,
build step, or root `package.json`. Native packaging necessarily requires
tooling, so the owner approves this narrow exception:

- The canonical web app at the repository root remains framework-free and
  build-free.
- A self-contained `mobile/` directory may have its own `package.json`, lock
  file, Capacitor configuration, Android project, packaging scripts, and native
  dependencies.
- Packaging may copy audited web assets into generated `mobile/www/` output.
- Packaging must not transpile, bundle, minify, or otherwise change application
  semantics unless a later, separately approved optimization proves necessary.
- `mobile/www/` is generated and should normally be gitignored.
- Native build artifacts, keystores, signing files, and secrets are never
  committed.

Suggested structure:

```text
hanapath/
├── index.html                  # canonical browser/PWA entry
├── app.js                     # canonical application
├── styles.css
├── sw.js
├── manifest.webmanifest
├── audio/
├── mobile/
│   ├── package.json
│   ├── package-lock.json
│   ├── capacitor.config.json
│   ├── scripts/
│   │   ├── prepare-web.mjs
│   │   ├── verify-web.mjs
│   │   └── version-android.mjs
│   ├── www/                   # generated; ignored
│   ├── android/               # tracked Capacitor Android project
│   └── ios/                   # add in the later iOS phase
├── scripts/
│   └── audit-mobile-package.mjs
└── .github/workflows/
    ├── ci.yml
    ├── android-build.yml
    └── android-release.yml
```

If Capacitor's current tooling makes a slightly different layout materially
cleaner, use it. Preserve the separation between canonical web source and
generated native web assets.

## 4. Current repository facts — verify, do not assume

As measured on 2026-07-16:

- The repository root is the deployable PWA.
- `manifest.webmanifest` already declares `display: "standalone"`.
- `sw.js` caches the app shell and selected sound effects.
- GitHub Pages deploys the app to
  `https://cameronnel.github.io/hanapath/`.
- Learner state is synchronous `localStorage` under `hanapath-v1`.
- The app loads Google Fonts from the network in `index.html`.
- `audio/` contains **35,916 files** and is approximately **154.01 MiB**.
- The whole working tree excluding `.git` and scratch data is approximately
  **242.65 MiB**.
- `scripts/` is approximately **79.26 MiB** and must never be copied wholesale
  into the native application.
- `audio_map.js` maps spoken text to local audio paths.
- Hangul writing uses Canvas 2D, Pointer Events, authored guides, and the
  vendored New-BSD `$Q` recognizer.
- The recognition audit is `node scripts/audit-hangul-recognition.mjs`.
- The service worker is registered near the end of `app.js`.

Measure these again before making packaging decisions. Add an automated report
so future contributors notice major size regressions.

## 5. Non-negotiable product behaviour

The Android build is not acceptable if it weakens the browser/PWA version.

The following must remain true:

- The owner can open the GitHub Pages URL on Android or iOS and test the app in
  the normal browser.
- The hosted app remains installable as a PWA where the platform supports it.
- Existing progress stored in browser `localStorage` remains readable.
- The packaged app works without a content server once installed, except for
  explicitly documented optional model downloads or future account sync.
- Audio, lessons, quizzes, writing, navigation, and progress behave the same
  across web and native surfaces.
- The Alphabet and Words sections remain protected by their existing audits.
- Native-only enhancements always have a web fallback.
- No analytics, ads, account system, tracking SDK, or new dangerous Android
  permission is added as part of the packaging foundation.
- The product remains phone- and tablet-first. Desktop browser support is
  useful but is not the acceptance baseline.

## 6. Packaging the canonical web app safely

### 6.1 Never point Capacitor at the repository root

Capacitor expects a dedicated `webDir` with `index.html` at its root. Pointing
it at the repository root would package documentation, audit scripts, developer
assets, and possibly secrets or scratch files. Generate `mobile/www/` from an
explicit allowlist.

The prepare script should:

1. Delete only the verified generated `mobile/www/` directory.
2. Recreate it.
3. Copy the runtime root files required by `index.html`.
4. Copy `lib/`, `icons/`, and the exact runtime data files.
5. Copy the selected audio payload according to the audio strategy below.
6. Exclude `.git`, `.github`, `.agents`, `.claude`, `docs`, `scripts`, `scratch`,
   Python files, logs, test fixtures, and source-only assets.
7. Fail if `index.html` references a missing local file.
8. Fail if an unexpected remote runtime dependency is introduced.
9. Produce a deterministic manifest containing copied path, byte count, and
   SHA-256 hash.
10. Print total file count and size.

Use native Node filesystem APIs in the packaging script. Do not add a bundler
just to copy files.

### 6.2 Treat service workers differently in native packaging

The hosted PWA needs `sw.js`; the native bundle is already local and versioned
by the installed application. A service-worker update loop inside a native
WebView can create stale or confusing behaviour.

Add a small platform boundary and prove the correct behaviour on actual
devices. The preferred outcome is:

- Browser/PWA: service worker registration remains unchanged.
- Capacitor native runtime: service worker registration is skipped.
- Native updates arrive through an installed app update, not through PWA cache
  replacement.

Do not scatter `window.Capacitor` checks throughout `app.js`. Create one helper
such as `getHanaPathRuntime()` or `isHanaPathNative()` and route all platform
differences through it. Verify the exact Capacitor API for the pinned version.

### 6.3 Remove accidental network dependencies

The only currently identified runtime network dependency is Google Fonts in
`index.html`. Vendor the required Outfit and Noto Sans KR files locally, retain
their license files, update CSS, add them to the PWA app shell, and run the
cache audit. This improves native offline startup and makes the PWA genuinely
offline in a cold font cache.

After preparation, block the network and verify that the first native launch
still renders correctly and every core lesson remains usable.

### 6.4 Browser/PWA install hardening

Audit rather than blindly rewriting the manifest:

- Confirm that manifest `id`, `start_url`, and `scope` resolve correctly under
  the GitHub Pages `/hanapath/` subpath and under a future custom domain.
- Confirm icons, maskable icon behaviour, theme colour, orientation behaviour,
  and standalone display.
- Confirm the service worker controls the intended scope.
- Confirm a fresh install, update, and offline relaunch on Chrome for Android.
- Confirm Add to Home Screen and standalone launch on iOS/iPadOS Safari.
- Keep direct browser navigation working even if native packaging is broken.

Apple documents that sites added to the Home Screen with standalone display
open as Home Screen web apps on iOS/iPadOS:
[Apple web-app overview](https://developer.apple.com/videos/play/wwdc2023/10120/).

## 7. Audio packaging — do not hand-wave this

The audio library is the largest runtime concern: 35,916 files and roughly
154 MiB, already encoded as low-bitrate Opus `.ogg`.

Start with a parity experiment, not an architecture rewrite:

1. Package all currently mapped audio into a debug Android build.
2. Record prepare time, Gradle build time, AAB size, installed size, first
   launch time, and audio latency.
3. Verify every path in `audio_map.js` resolves from the native WebView.
4. Test on a lower-powered phone and an Android tablet.
5. Decide whether the all-audio bundle is acceptable based on measurements.

At the time of writing, Google Play accepts Android App Bundles and reports a
cumulative download-size ceiling far above this payload. That does not mean a
154 MiB language app is automatically a good user experience. Re-check current
limits before release:
[uploading app bundles](https://developer.android.com/studio/publish/upload-bundle).

Preferred order of options:

1. **Bundle all audio** if build/install performance is acceptable. It is the
   simplest and preserves fully offline learning.
2. If the file count or initial install is unacceptable, divide audio into a
   small required core plus an **install-time** Play Asset Delivery pack. Keep
   the app functional while assets are mounting and provide a browser fallback.
3. Use on-demand packs only if a clear download UI, storage management, retry,
   and offline semantics are designed and owner-approved.
4. Do not silently turn all audio into remote streaming.

Never package `scripts/` or the offline generation models. Never hand-edit
`audio_map.js`. Preserve `.agents/AGENTS.md` rules.

## 8. State, persistence, and upgrades

The current state API is synchronous and uses `localStorage` key
`hanapath-v1`. Avoid a broad asynchronous storage rewrite in the foundation PR.

Foundation requirements:

- Prove native WebView `localStorage` survives app restart, device restart,
  ordinary app update, and WebView update on supported Android versions.
- Add an automated or manual upgrade fixture using a real historical
  `hanapath-v1` payload.
- Do not change the state schema unless the change is additive and
  `normalizeState` round-trips old saves.
- Do not assume browser progress and native-app progress are shared. They are
  separate origins/containers.
- Document this separation honestly in the README and release notes.

Strongly recommended before public beta:

- Add explicit Export Progress and Import Progress flows using versioned JSON.
- Validate imports before replacing live state.
- Keep a rollback copy when importing.
- Consider mirroring the state into a native Preferences/file backup, but do
  not make an async native store the source of truth without a designed boot
  migration.
- Treat cross-device account sync as a separate owner decision. Do not invent
  a backend during packaging.

## 9. Android project and platform policy

### 9.1 Permanent decisions Fable must not guess

Ask the owner before the first Play Console app or release keystore is created:

- Permanent application/package ID, for example `com.example.hanapath`.
- Public Play Store app name.
- Personal versus organization developer account.
- Publisher/developer display name.
- Support email and support website.
- Privacy-policy URL.
- Free versus paid initial listing. Google does not make every pricing change
  reversible.
- Target countries/regions and whether children are part of the intended
  audience.

Everything else inside the approved architecture is delegated to Fable. Make
sound choices, document them, and keep moving.

### 9.2 SDK levels

Use the SDK levels supported by the pinned Capacitor version and meeting the
current Play requirement. As of this handover, new apps and updates must target
Android 15 / API 35 or higher:
[Google Play target API requirements](https://support.google.com/googleplay/android-developer/answer/11926878).

Re-check this immediately before every production release. Do not hard-code
this document's number forever.

If ML Kit Digital Ink is used, its Android API currently requires minimum API
23. Prefer `minSdk 23` unless Capacitor itself requires a newer minimum. Do not
lower the minimum through unsupported overrides.

### 9.3 Permissions

The foundation should request no dangerous permissions unless a shipped
feature truly requires one. Specifically avoid broad storage, microphone,
camera, contacts, location, and notification permissions.

- Canvas handwriting needs no Android permission.
- Local packaged audio needs no Android permission.
- Network access may be required for an optional ML Kit model download and the
  hosted/browser product, but native core content should not depend on it.
- If notifications are added later, request permission contextually in a
  separate feature PR.

Inspect the final merged manifest, including permissions introduced by
dependencies. Fail CI on unexpected permissions.

### 9.4 WebView and navigation security

- Keep WebView debugging disabled in release builds.
- Disallow cleartext traffic in release unless a documented local Capacitor
  origin requires a narrowly scoped exception.
- Keep arbitrary remote navigation out of the app WebView.
- Open approved external HTTPS links in the system browser.
- Do not expose a generic native bridge to untrusted remote pages.
- Set an explicit allowlist for navigation and server configuration.
- Keep secrets out of web assets; anything in `www/` is readable by users.

## 10. Handwriting recognition — Fable owns the hard decision

### 10.1 Current contract

The web/PWA implementation uses `$Q` because it is small, offline, New-BSD,
stroke-order agnostic, and compatible with a static browser app. The authored
W2 grading engine separately teaches standard stroke order and direction.
Recognition and pedagogy are intentionally different concerns.

Do not delete the `$Q` implementation or its deterministic audit. It remains
the browser fallback and the native fallback when a model is unavailable.

### 10.2 Native option: Google ML Kit Digital Ink

ML Kit Digital Ink is an appropriate native candidate because it accepts touch
strokes, supports Korean using BCP-47 tag `ko`, runs recognition on-device, and
supports Android and iOS. The language model is downloaded on demand and is
roughly 20 MiB per language according to Google's current Android guide:

- [Digital Ink overview](https://developers.google.com/ml-kit/vision/digital-ink-recognition)
- [Android implementation](https://developers.google.com/ml-kit/vision/digital-ink-recognition/android)
- [iOS implementation](https://developers.google.com/ml-kit/vision/digital-ink-recognition/ios)
- [Supported base models](https://developers.google.com/ml-kit/vision/digital-ink-recognition/base-models)

Create a narrow Capacitor plugin/bridge, not ML Kit calls mixed through the UI.
The JavaScript side should call one recognizer interface and receive normalized
candidates regardless of provider.

Suggested conceptual interface:

```js
recognizeHangulInk({
  target: "한",
  strokes: [
    [{ x: 0.1, y: 0.2, t: 0 }, { x: 0.2, y: 0.2, t: 16 }]
  ],
  writingArea: { width: 480, height: 480 },
  context: "single-syllable-alphabet-practice"
})
// -> { provider, ready, candidates, latencyMs, error? }
```

Use real timestamps from Pointer Events where possible; ML Kit can benefit from
natural stroke order and writing-area context. Preserve the existing normalized
strokes for `$Q` and audits.

### 10.3 Authority to switch

Fable is explicitly authorized to make ML Kit the preferred recognizer **inside
the native app** if measurements show it is materially better. This does not
require another architecture approval.

The switch is justified only if:

- The learner-reported rough `한` fixture passes.
- Existing deterministic positive fixtures do not regress materially.
- Existing negative/confuser fixtures do not gain false accepts.
- Prompted-syllable acceptance remains conservative; recognition must not turn
  random ink into easy progress.
- Warm recognition latency is acceptable on a mid-range Android phone and a
  tablet.
- Model-not-downloaded, download failure, airplane mode, and low-storage states
  fall back cleanly to `$Q`.
- The model download is disclosed before consuming data and the UI does not
  block the learner from writing while it is unavailable.
- Privacy/Data Safety claims remain accurate: stroke recognition stays on the
  device.

Build a comparison harness that runs the same fixtures through `$Q` and the
native provider. Record provider, top candidates, target rank, latency, false
accepts, and fallback rate. Do not choose a provider because one screenshot
looks better.

Keep web behaviour deterministic. Do not attempt to ship ML Kit into the
ordinary browser through a hidden server or giant unofficial model.

## 11. Native interaction work required for a credible mobile app

The wrapper must not feel like a careless website in a frame. Validate and fix:

### 11.1 Phone and tablet layout

Primary viewport/device classes:

- Narrow Android phone: approximately 360 CSS px wide.
- Typical phone: 390–430 CSS px.
- Small tablet/portrait: 768–820 CSS px.
- Large tablet/portrait and landscape: 1024 CSS px and above.
- Android font scaling at 100%, 130%, and 200% where practical.
- System display-size enlargement.

Avoid device-model CSS. Use content-driven breakpoints, safe-area insets, and
responsive constraints.

### 11.2 Insets and system UI

- Respect top, bottom, left, and right safe areas.
- Verify status-bar colour in light/dark app states.
- Verify gesture-navigation bars do not cover primary actions.
- Test cutouts, rounded corners, split-screen, and rotation.
- Decide supported orientations intentionally; do not lock orientation merely
  to hide layout bugs.

### 11.3 Android back button

Define and test a deterministic priority:

1. Close an open modal/overlay.
2. Exit the active lesson to its previous in-app screen after confirmation if
   progress could be lost.
3. Navigate within HanaPath history.
4. At the root screen, require a second back action or system-standard exit
   behaviour rather than unexpectedly killing a lesson.

Do not allow Capacitor's default handling to skip HanaPath navigation state.

### 11.4 Keyboard and text entry

- Test Korean IME composition, suggestions, autocorrect, and Enter handling.
- Ensure Translate & Type fields stay visible above the keyboard.
- Test hardware keyboard and tablet keyboard cases.
- Preserve composition events; never validate incomplete Hangul syllables as
  final input.
- Verify focus after modals, navigation, and app resume.

### 11.5 Audio lifecycle

- Test silent mode, media volume, Bluetooth, wired headphones, interruptions,
  background/foreground, phone calls, and rapid repeated taps.
- Stop audio when the app is backgrounded, matching current browser lifecycle
  intent.
- Verify packaged Opus support on the minimum Android target and later iOS
  target.
- Keep speech-synthesis fallback behaviour explicit; native builds should not
  unexpectedly use a different voice for missing assets.

### 11.6 Touch and stylus

- Set appropriate `touch-action` only on drawing surfaces.
- Use coalesced pointer events when supported without breaking the fallback.
- Verify palm/scroll conflicts on tablets.
- Verify Undo, Clear, Check, and Help targets meet comfortable touch sizes.
- Test with finger, active stylus, passive stylus, and mouse.

### 11.7 Lifecycle and update safety

- Background and resume during every major exercise.
- Kill and restore during a lesson.
- Install a newer debug/release build over an older one and verify state.
- Update native web assets without leaving stale service-worker caches.
- Test low storage and interrupted first launch.

## 12. Verification matrix

No PR is complete because an emulator opened the home screen.

### 12.1 Required surfaces

| Surface | Minimum checks |
|---|---|
| Desktop browser | Existing smoke test and audits; ensure no regression |
| Android Chrome | Browser flow, PWA install/update/offline, drawing, audio, Korean keyboard |
| Android native debug | Fresh install, offline, lifecycle, back, drawing, audio, storage |
| Android native release | Signed-like release build with debugging off and minification settings final |
| Android tablet | Portrait/landscape, stylus, keyboard, safe areas, layout |
| iPhone Safari | Hosted browser and Home Screen PWA remain healthy |
| iPad Safari | Hosted browser/PWA tablet layout and pencil/finger drawing |
| Later iOS native | Same core matrix once a macOS/Xcode environment exists |

Capacitor's current iOS toolchain requires macOS and Xcode. Do not pretend a
Windows-only Android pass validates iOS:
[Capacitor iOS requirements](https://capacitorjs.com/docs/getting-started/environment-setup#ios-requirements).

### 12.2 Existing repository checks

Run checks relevant to touched files, plus the full regression gate before a
native foundation PR is marked ready:

```powershell
node --check app.js
node --check sw.js
node --check scripts/audit-hangul-recognition.mjs
node scripts/audit-hangul-recognition.mjs
node scripts/audit-app-shell.mjs
node scripts/audit-words-data.mjs --strict
node scripts/audit-sentences-data.mjs --strict
node scripts/audit-alphabet-audio.mjs --strict
git diff --check
```

Add mobile checks rather than replacing these:

```powershell
cd mobile
npm ci
npm run prepare:web
npm run verify:web
npx cap sync android
cd android
.\gradlew.bat lint testDebugUnitTest assembleDebug bundleRelease
```

Use the correct Unix Gradle wrapper commands in GitHub Actions.

### 12.3 Add `scripts/audit-mobile-package.mjs`

The audit should fail when:

- Required runtime assets are missing from `mobile/www`.
- Disallowed repository directories appear in `mobile/www`.
- `index.html` references a missing local asset.
- A remote font or unexpected remote script/style is present.
- Service-worker registration is active in the native runtime.
- The package contains source maps, logs, keystores, secrets, or scratch data.
- Android declares an unexpected dangerous permission.
- App ID, version name, version code, target SDK, or minimum SDK is absent.
- The copied asset manifest is not deterministic.
- The package exceeds a documented warning threshold.

Make warnings actionable and print measured size/file counts.

## 13. GitHub Actions and release automation

The goal is a boring, repeatable artifact—not an opaque local Android Studio
ritual.

### 13.1 PR build workflow

Add `.github/workflows/android-build.yml` triggered by changes to mobile or
canonical runtime files. It should:

1. Check out the repository.
2. Set up pinned Node and Java versions compatible with Capacitor/Gradle.
3. Run the existing static audits.
4. Run `npm ci` inside `mobile/`.
5. Generate and audit `mobile/www/`.
6. Run `npx cap sync android` or the reproducible equivalent.
7. Run Android lint and unit tests.
8. Build a debug APK and unsigned/release-test AAB as appropriate.
9. Upload artifacts and the package manifest/size report.
10. Never access signing secrets on pull requests.

Pin GitHub Actions by reviewed major or commit according to repository policy.
Use dependency caching carefully; a warm cache must not hide undeclared files.

### 13.2 Manual signed release workflow

Add `.github/workflows/android-release.yml` using `workflow_dispatch` and a
protected GitHub Environment such as `google-play-release`.

Inputs should include or derive:

- `versionName`
- monotonically increasing `versionCode`
- release channel (`internal` initially)
- optional release-note file

The workflow should:

1. Require an exact git tag or commit on `main`.
2. Re-run all audits from a clean checkout.
3. Rebuild `mobile/www` deterministically.
4. Restore the upload keystore from a base64 GitHub secret into a temporary
   file with restrictive permissions.
5. Inject signing values without printing them.
6. Build the signed AAB.
7. Verify signature, package ID, version, target SDK, permissions, and size.
8. Upload the AAB, checksums, mapping files if any, manifest, and release notes
   as workflow artifacts.
9. Delete temporary signing material even on failure.

Suggested secret names:

- `ANDROID_UPLOAD_KEYSTORE_BASE64`
- `ANDROID_UPLOAD_KEY_ALIAS`
- `ANDROID_UPLOAD_STORE_PASSWORD`
- `ANDROID_UPLOAD_KEY_PASSWORD`

Never place real values in documentation, workflow logs, repository variables,
Gradle files, or example environment files.

### 13.3 Play upload automation

First milestone: produce a verified signed AAB that the owner can drag into the
Play Console internal track.

Second milestone, after the Play developer account and package exist: add an
optional, manually approved upload step using the official Google Play
Developer API or a well-maintained release tool. Scope the service account to
the smallest useful Play Console permissions and protect it behind the release
environment.

Do not auto-promote to production. Automation may upload to internal testing;
production rollout remains an explicit owner action until the release process
has been exercised repeatedly.

## 14. Signing and key custody

Google Play requires new apps to use Play App Signing. The upload key remains
the developer's responsibility:
[Play upload and signing requirements](https://developer.android.com/studio/publish/upload-bundle).

Process:

1. Generate the upload keystore once on a trusted machine.
2. Use a strong, unique store password and key password.
3. Back up the keystore and recovery information in at least two secure,
   owner-controlled locations.
4. Enrol in Play App Signing when creating the first release.
5. Put only the encrypted/base64 representation in GitHub Actions secrets.
6. Never commit the keystore.
7. Document the certificate fingerprints without documenting passwords.
8. Verify release signing in CI.

Add patterns for keystores and generated credentials to `.gitignore` before
creating them.

## 15. Google Play Console readiness

Fable should create a tracked checklist/template in `docs/play-store/`, but
must not fabricate owner declarations. Play policies change; re-check every
official requirement at release time.

### 15.1 Account and app creation

- Complete developer identity verification.
- Create the app with the owner-approved permanent package ID.
- Choose app/game, free/paid, default language, contact email, and declarations.
- Accept Play App Signing terms.
- Record Play Console links and ownership outside source code where appropriate.

Google's current setup overview:
[Create and set up an app](https://support.google.com/googleplay/android-developer/answer/9859152).

### 15.2 App content declarations

Prepare accurate answers for:

- Privacy-policy URL.
- Data Safety.
- App access instructions.
- Ads declaration.
- Target audience and content.
- Content rating questionnaire.
- News, health, financial, or other special declarations only if applicable.

Even an app that collects no data must complete Data Safety and provide a
privacy-policy link once it enters closed/open/production tracks:
[Google Play Data Safety requirements](https://support.google.com/googleplay/android-developer/answer/10787469).

For the foundation, preserve the simplest accurate position: learning state
and handwriting remain on-device, no ads, no analytics, and no accounts. Any
future SDK can change the declaration, so audit dependencies before answering.

### 15.3 Store listing assets

Prepare, version, and retain source assets for:

- 512×512 Play listing icon.
- 1024×500 feature graphic.
- Phone screenshots.
- 7-inch and 10-inch/tablet screenshots where supported/recommended.
- Short description.
- Full description.
- Support contact and privacy links.

Use real product screens, not mockups that promise unavailable features.
Official current asset guidance:
[Google Play preview assets](https://support.google.com/googleplay/android-developer/answer/9866151).

### 15.4 Testing tracks

Release order:

1. Local debug builds.
2. Play internal testing.
3. Closed testing.
4. Production-access application if required.
5. Staged production rollout.

For personal developer accounts created after 13 November 2023, Google
currently requires at least 12 opted-in closed testers for 14 continuous days
before production access can be requested:
[current personal-account testing requirement](https://support.google.com/googleplay/android-developer/answer/14151465).

Do not discover this requirement at launch. Recruit testers and establish the
closed track well before the desired release date.

### 15.5 Release health

After internal/closed releases, inspect Android vitals, pre-launch reports,
crashes, ANRs, startup time, device compatibility, and permission warnings.
Google documents crash and ANR rates as core Android vitals that affect Play
visibility:
[Android vitals](https://developer.android.com/topic/performance/vitals/index.html).

## 16. PR sequence — keep this large project reviewable

Do not submit one enormous implementation PR. This handover is enormous; the
code changes should not be.

### M0 — Decisions and rules

Deliver:

- Confirm owner decisions that cannot be guessed.
- Add the narrowly scoped packaging exception to `AGENTS.md` and `CLAUDE.md`.
- Add a short native architecture record under `docs/`.
- Confirm current Capacitor/Node/Java/Android Studio versions.
- No generated Android project yet if the permanent package ID is unknown.

Acceptance:

- Existing app untouched.
- Owner can see exactly which decisions still block app creation.

### M1 — Reproducible Capacitor Android shell

Deliver:

- `mobile/` package and pinned lock file.
- Capacitor config with approved app ID/name and `webDir: "www"`.
- Generated allowlisted `mobile/www` preparation.
- Android project.
- Native service-worker bypass.
- Local fonts.
- Package audit.
- Debug APK launches the full app offline.

Acceptance:

- Root browser/PWA unchanged except deliberate offline hardening.
- Clean checkout can build without manually copying files.
- No docs/scripts/scratch in packaged assets.
- No dangerous permissions.

### M2 — Mobile integration hardening

Deliver:

- Safe areas/status bar.
- Back-button contract.
- Keyboard/IME fixes.
- lifecycle/audio fixes.
- LocalStorage upgrade tests and progress export/import if feasible.
- Phone/tablet device matrix evidence.

Acceptance:

- Major learning flows complete on phone and tablet.
- Upgrade preserves learner state.
- App feels intentional rather than framed.

### M3 — Recognition provider comparison

Deliver:

- Provider abstraction.
- Native ML Kit proof of concept for Korean `ko`.
- `$Q` fallback retained.
- Shared fixture/measurement report.
- Model download/failure UX.
- Native provider enabled only if the evidence supports it.

Acceptance:

- Rough learner ink improves without permissive false accepts.
- Airplane mode before/after model download behaves correctly.
- Web recognition remains functional and audited.

### M4 — CI and signed artifact

Deliver:

- Android PR workflow.
- Protected manual release workflow.
- Keystore handling instructions.
- Versioning automation.
- Signed AAB artifact and verification report.

Acceptance:

- A clean `main` commit produces a reproducible, signed, upload-ready AAB.
- Secrets never appear in logs or artifacts.

### M5 — Play internal testing readiness

Deliver:

- Store listing draft assets/text.
- Privacy policy and Data Safety draft based on actual behaviour.
- Content declaration checklist.
- Internal track upload runbook or approved automated upload.
- Tester instructions and feedback template.

Acceptance:

- Owner can upload/release to internal testing without reverse-engineering the
  build.
- Play pre-launch report has no untriaged blocker.

### M6 — iOS/iPadOS shell later

Deliver after Android is stable and a Mac/Xcode environment exists:

- Capacitor iOS platform.
- Signing/team/bundle ID decisions.
- iPhone/iPad matrix.
- Native recognition adapter parity if ML Kit won on Android.
- App Store-specific privacy and listing work in a separate handover.

Do not make Android implementation choices that unnecessarily prevent M6.

## 17. Definition of “stress-free Play upload”

This phrase means all of the following are true:

- One documented command builds locally from a clean checkout.
- One protected GitHub workflow produces a signed AAB from `main`.
- The package ID is stable and owner-approved.
- Version code cannot accidentally repeat.
- Signing keys are backed up and never committed.
- Target SDK and permissions are verified automatically.
- Runtime assets are allowlisted and measured.
- Full audits pass before packaging.
- The AAB signature and checksum are recorded.
- Store listing, privacy, Data Safety, and testing requirements have owners.
- Internal testing upload is manual-but-boring or one approved workflow action.
- Production promotion is deliberate, not automatic.
- Rollback means selecting the previous known-good version or shipping a higher
  version code with the revert; it is documented before launch.

It does **not** mean bypassing Play review, hiding policy work, embedding
credentials, or uploading arbitrary dirty local builds.

## 18. Required implementation notes and evidence in every PR

Every mobile PR description must include:

- Problem and user impact.
- Exact scope and non-goals.
- Files/directories added.
- Dependency/version changes and why each dependency exists.
- Android permissions before/after.
- Browser/PWA regression evidence.
- Android phone/tablet evidence.
- Offline evidence.
- State upgrade evidence when storage is touched.
- Asset count and size delta.
- Commands run and results.
- Known limitations and next milestone.
- Screenshots or short recordings for visible/native interaction changes.

Do not claim “works on iOS” because the web code is cross-platform. Claim it
only after an iPhone/iPad native build has been run and tested.

## 19. Things Fable is trusted to decide without asking

Within this handover, Fable may independently decide:

- Exact small-module boundaries for platform detection and native bridges.
- Exact packaging-script implementation.
- Capacitor minor/patch version within the supported pinned major.
- CI caching and artifact layout.
- Whether all audio fits acceptably in the base bundle or requires an
  install-time asset pack, based on recorded measurements.
- Whether native ML Kit should become the preferred native recognizer, based
  on the defined comparison gate.
- Safe-area, back-button, keyboard, lifecycle, and tablet implementation
  details.
- Tests and audits needed to make the release reproducible.

Ask the owner only when the decision is genuinely product-, legal-, account-,
or identity-defining, including permanent package ID, public publisher data,
pricing, target audience, privacy promises, analytics/accounts, or broadening
permissions.

## 20. Final warning: keep one HanaPath

The easiest failure mode is a successful Android wrapper that slowly becomes a
separate application. Prevent that structurally:

- One canonical app source.
- Generated native web assets.
- Tiny platform adapters.
- Shared audits.
- Shared recognition fixtures.
- Shared curriculum and audio.
- Browser/PWA validation in every native PR.

The target is not “HanaPath for Android plus the old website.” The target is
HanaPath everywhere, with native capabilities where the platform earns them.
