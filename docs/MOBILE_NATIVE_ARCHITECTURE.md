# Mobile native architecture record (M0)

> Status: **M5 drafts + M4 scaffolding + Android `free_all` handwriting and
> configuration-gated Google sign-in adapters** on top of
> M1 (reproducible Capacitor Android shell) and M2 code (back contract,
> progress export/import, device-test checklist; the real-device evidence in
> `MOBILE_DEVICE_TEST_CHECKLIST.md` remains open). M3 now has the native
> Korean ML Kit adapter, explicit model-download UX, `$Q` fallback, and shared
> comparison report; provider selection still needs real-device evidence. The app ID
> `io.github.cameronnel.hanapath` is baked into the generated project but is
> **provisional until the owner marks decision #1 confirmed** in
> [`play-store/OWNER_DECISIONS.md`](play-store/OWNER_DECISIONS.md) — it only
> becomes permanent at Play Console app creation (M5), and changing it before
> then is a small mechanical edit. The governing execution brief is
> [`FABLE_MOBILE_PLAY_STORE_HANDOVER.md`](FABLE_MOBILE_PLAY_STORE_HANDOVER.md).

## 1. Architecture in one paragraph

One canonical HanaPath web app (vanilla HTML/CSS/JS at the repository root)
delivered on multiple surfaces: hosted website, installable PWA, and a
Capacitor-packaged Android app (later iOS/iPadOS). Capacitor wraps generated,
allowlisted copies of the audited web assets in `mobile/www/`; it never points
at the repository root. No UI rewrite, no framework, no bundler. Native
capabilities enter through small platform adapters behind explicit runtime and
configuration boundaries. ML Kit handwriting always retains the existing web
fallback. Google Credential Manager can return only an opaque ID token plus
the request nonce; neither the plugin nor the web app treats that response as
authenticated without an owner-operated verifier.

```text
Canonical HanaPath HTML/CSS/JS (repo root — unchanged rules)
├── Hosted website + PWA (GitHub Pages)          ← first-class, never regressed
└── mobile/ (isolated Capacitor project)
    ├── scripts/prepare-web.mjs → generated mobile/www/ (allowlisted copy)
    ├── android/ (tracked Capacitor Android project — M1)
    └── ios/ (later — M6)
```

## 2. Pinned toolchain (re-verified 2026-08-10)

| Component | Version | Notes |
|---|---|---|
| Capacitor (`@capacitor/core`, `cli`, `android`) | **8.4.2** (current stable major 8) | Verified on npm 2026-07-16; pin exact in `mobile/package-lock.json` at M1 |
| Node | **22.x LTS** | v22.22.2 verified in the build environment |
| Java | **21 (OpenJDK)** | 21.0.10 verified; matches Capacitor 8 / current AGP requirements |
| Android target SDK | **API 36 (Android 16)** | Tracked compile/target level for the 2026 release; re-verify Play policy before every release |
| Android min SDK | **24** | Tracked Capacitor 8 project floor; ML Kit Digital Ink itself requires API 23+ |
| Android Studio | Not required for CI builds | Gradle wrapper + command line is the canonical build path; Studio is optional local tooling |

Re-verify all rows against official documentation immediately before each
signed release; none of these versions or policy requirements is authoritative
forever.

## 3. Repository facts (re-measured 2026-08-10)

- `audio/`: **39,116 files**, ~**174.1 MiB** apparent size across the current
  generated audio formats. The release workflow must measure the final AAB;
  old repository-size figures are not release evidence.
- `scripts/`: ~**20 MiB** (down from the handover's 79 MiB measurement;
  still never packaged).
- Fonts and core runtime assets are local. Network use is limited to explicit
  features: ML Kit's first Korean-model download and, only after owner
  activation, Google Identity/Credential Manager plus HanaPath's trusted
  session endpoint. The browser-only Google Identity adapter is removed from
  the generated native payload.
- `manifest.webmanifest`: `display: standalone`, `id: "/"`,
  `start_url: "./index.html"`, `scope: "./"`, 192/512 icons (512 maskable).
- Learner state: synchronous `localStorage` key `hanapath-v1`.
- Handwriting: Canvas 2D + Pointer Events + vendored New-BSD `$Q` recognizer
  (`lib/hangul_q_recognizer.js`); deterministic audit
  `scripts/audit-hangul-recognition.mjs` (post-PR #264 fixture set).

## 4. Standing decisions (delegated to Fable by the handover)

1. **Capacitor 8, no rewrite, no TWA** as primary architecture (handover §2).
2. **`mobile/` isolation**: the only directory with package/build tooling;
   `mobile/www/` is generated and gitignored; keystores/secrets never
   committed (handover §3, §14). Ignore patterns land before any keystore can
   exist (this PR).
3. **Single runtime boundary**: one helper (`isHanaPathNative()` /
   `getHanaPathRuntime()`) in the canonical app; no scattered
   `window.Capacitor` checks. Service-worker registration is skipped in the
   native runtime and unchanged in browsers (handover §6.2).
4. **Audio strategy starts with the parity experiment** (handover §7): bundle
   all mapped audio in a debug build, measure, then decide bundle-all vs
   install-time asset pack. No remote streaming, no hand-edits to
   `audio_map.js`.
5. **Recognition**: `$Q` stays the web implementation and universal fallback.
   ML Kit Digital Ink (`ko`) remains diagnostic-only for free Alphabet writing
   and is the native recognizer for the `free_all` Handwriting Coach
   word/phrase/sentence flow. There is no entitlement or checkout gate. The
   bridge uses
   a narrow `HangulRecognition` Capacitor plugin, on-demand model download,
   real pointer timestamps, writing-area context, and a cancellable JSON report
   containing candidates, target rank, false accepts, latency, and fallback
   rate, plus banked-text context for multi-block recognition. The native
   status check performs a real recognition warm-up before ML Kit is offered;
   failed readiness returns to the local `$Q`/typed fallback without changing
   access.
6. **Minimal permissions**: CI fails on unexpected manifest permissions
   (handover §9.3). The ML Kit dependency transitively contributes
   WorkManager permissions; HanaPath removes those declarations in its app
   manifest. The intentional platform permission allowlist for the `free_all`
   release is `INTERNET`; Play Billing is not compiled or permission-merged.
   The M3 device matrix must therefore cover interrupted and backgrounded
   model downloads.
7. **Milestone PRs M0→M6** as sequenced in handover §16; every native PR
   re-runs the full web audit gate (§12.2).
8. **Handwriting access boundary**: the current release is `free_all` on every
   surface. No Billing library, permission, product ID, purchase state, restore
   action, or store entitlement participates in access. The earlier paid
   Handwriting Coach design remains historical provenance in
   `PREMIUM_HANDWRITING_PLAN.md`; reintroducing it would require a separate
   owner decision, policy update, implementation packet, and store/device
   review.
9. **Google sign-in boundary**: the checked-in adapters are intentionally
   unconfigured. The current release creates no HanaPath account or session and
   does not sync progress. Android requires the public Web/server OAuth client
   ID through `HANAPATH_GOOGLE_SERVER_CLIENT_ID`; browsers require
   `window.HANAPATH_AUTH_CONFIG.webClientId`; both require an HTTPS
   `window.HANAPATH_AUTH_CONFIG.sessionEndpoint` configured before
   `google_auth.js` loads. A future native activation therefore needs an
   explicitly generated, audited packaged config; none exists in the current
   release. The native plugin returns an opaque ID token and its exact generated
   nonce, never a trusted local login.
   Activation is blocked until an owner-controlled service verifies signature,
   issuer, audience, expiry and the single-use nonce before minting a secure
   HanaPath session. See the exact owner setup in
   [`play-store/OWNER_DECISIONS.md`](play-store/OWNER_DECISIONS.md) and
   [`play-store/SIGNING_AND_RELEASE.md`](play-store/SIGNING_AND_RELEASE.md).

## 5. Build and verify (M1)

```bash
cd mobile
npm ci                 # pinned Capacitor 8.4.2 toolchain
npm run prepare:web    # generate allowlisted mobile/www + deterministic manifest
npm run verify:web     # scripts/audit-mobile-package.mjs (www + Android contract)
npx cap sync android   # copy payload into the tracked Android project
cd android && ./gradlew assembleDebug   # requires an Android SDK
```

`.github/workflows/android-build.yml` runs this same pipeline (plus lint,
unit tests, a merged-manifest permission check, and the full web audits) on
every PR that touches mobile or canonical runtime files, and uploads the
debug APK as an artifact. It uses no signing secrets.

`.github/workflows/android-release.yml` (M4) is the protected
`workflow_dispatch` release path: it re-runs the full audit gate from a clean
`main` checkout, injects `versionName`/`versionCode` via
`mobile/scripts/version-android.mjs` (with a monotonic guard backed by
`android-release/<versionCode>` tags), signs the AAB with the owner's upload
key restored from `google-play-release` environment secrets, verifies
signature/identity/permissions, and uploads the AAB + checksums + report as
artifacts. Owner setup and the release runbook live in
[`play-store/SIGNING_AND_RELEASE.md`](play-store/SIGNING_AND_RELEASE.md).

## 6. What blocks the next milestones

- **M2 device evidence + M3 provider decision** — real Android hardware; the
  code-side ML Kit proof of concept is present, but the comparison matrix and
  fallback scenarios in `MOBILE_DEVICE_TEST_CHECKLIST.md` must be executed
  before ML Kit can become authoritative.
- **Google sign-in activation is deferred** — the current release must keep
  the adapters unconfigured and expose no working account/session/sync. A
  later activation needs the Web/server client ID, Android OAuth registrations
  for `io.github.cameronnel.hanapath` with both upload and Play App Signing
  SHA-1/SHA-256 fingerprints, the trusted token-plus-nonce verifier, updated
  privacy/Data Safety/account-deletion contracts, and the device matrix.
- **Superseded paid plan** — Play Billing activation is not a current blocker
  because the selected release is `free_all`. The historical paid plan is not
  permission to restore Billing or a purchase UI.
- **iOS parity** — an iOS Capacitor shell, native recognition adapter, Google
  sign-in adapter if later activated, and device evidence require macOS/Xcode;
  the Windows Android implementation does not satisfy this gate.
- **M4 first signed build** — owner actions in
  [`play-store/SIGNING_AND_RELEASE.md`](play-store/SIGNING_AND_RELEASE.md):
  generate the upload keystore, create the protected `google-play-release`
  environment, add the four `ANDROID_UPLOAD_*` secrets.
- **M5 (Play Console)** — drafts are done (privacy page, Data Safety
  answers, store-listing text, internal-testing runbook in
  [`play-store/`](play-store/)); what remains is owner-only: the decisions
  still marked ⏳ in
  [`play-store/OWNER_DECISIONS.md`](play-store/OWNER_DECISIONS.md) (including
  final confirmation of the provisional package ID), the developer account,
  and executing the runbook.
