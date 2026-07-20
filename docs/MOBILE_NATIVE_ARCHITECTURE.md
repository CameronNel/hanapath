# Mobile native architecture record (M0)

> Status: **M5 drafts + M4 scaffolding + Android premium-handwriting implementation** on
> top of
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
capability (ML Kit handwriting, if it wins the comparison gate) enters through
tiny platform adapters behind a single runtime-detection helper, always with
the existing web fallback.

```text
Canonical HanaPath HTML/CSS/JS (repo root — unchanged rules)
├── Hosted website + PWA (GitHub Pages)          ← first-class, never regressed
└── mobile/ (isolated Capacitor project)
    ├── scripts/prepare-web.mjs → generated mobile/www/ (allowlisted copy)
    ├── android/ (tracked Capacitor Android project — M1)
    └── ios/ (later — M6)
```

## 2. Pinned toolchain (verified 2026-07-16)

| Component | Version | Notes |
|---|---|---|
| Capacitor (`@capacitor/core`, `cli`, `android`) | **8.4.2** (current stable major 8) | Verified on npm 2026-07-16; pin exact in `mobile/package-lock.json` at M1 |
| Node | **22.x LTS** | v22.22.2 verified in the build environment |
| Java | **21 (OpenJDK)** | 21.0.10 verified; matches Capacitor 8 / current AGP requirements |
| Android target SDK | **API 35+ (Android 15)** | Current Play requirement for new apps; re-verify before every release |
| Android min SDK | **24** | Tracked Capacitor 8 project floor; ML Kit Digital Ink itself requires API 23+ |
| Android Studio | Not required for CI builds | Gradle wrapper + command line is the canonical build path; Studio is optional local tooling |

Re-verify all rows against official docs at M1 before generating the project;
none of these numbers is authoritative forever.

## 3. Repository facts (re-measured 2026-07-16)

- `audio/`: **35,916 files**, ~**155 MiB** apparent size (Opus `.ogg`) —
  matches the handover's 154.01 MiB measurement.
- Working tree excluding `.git`: ~**183 MiB** apparent size.
- `scripts/`: ~**20 MiB** (down from the handover's 79 MiB measurement;
  still never packaged).
- Runtime network dependencies: **Google Fonts only** (three references in
  `index.html`: two preconnects + one stylesheet for Outfit and Noto Sans KR).
  These get vendored locally in M1.
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
   ML Kit Digital Ink (`ko`) remains diagnostic-only for free Alphabet writing,
   but is the explicitly approved recognizer for the separately entitled
   Handwriting Coach word/phrase/sentence flow. Public sale remains blocked on
   the comparison and device gates in `PREMIUM_HANDWRITING_PLAN.md`. The bridge uses
   a narrow `HangulRecognition` Capacitor plugin, on-demand model download,
   real pointer timestamps, writing-area context, and a cancellable JSON report
   containing candidates, target rank, false accepts, latency, and fallback
   rate, plus banked-text context for premium recognition. The native status
   check performs a real recognition warm-up; checkout is unavailable unless
   both model presence and that warm-up succeed.
6. **Minimal permissions**: CI fails on unexpected manifest permissions
   (handover §9.3). The ML Kit dependency transitively contributes
   WorkManager permissions; HanaPath removes those declarations in its app
   manifest. The intentional allowlist is now `INTERNET` plus the normal
   `com.android.vending.BILLING` permission for the optional unlock. The M3 device
   matrix must therefore cover interrupted and backgrounded downloads.
7. **Milestone PRs M0→M6** as sequenced in handover §16; every native PR
   re-runs the full web audit gate (§12.2).
8. **Premium entitlement boundary**: Android uses a one-time, restorable Play
   product. Product ID and Play public key are empty public resources by
   default, so checkout fails closed. A verified, purchased, non-pending store
   transaction is required; local learner state never grants entitlement.
   Client-side signature verification implements the requested no-server
   architecture, but Google recommends server verification and the owner must
   reaffirm this trade-off before public sale. iOS requires a separate StoreKit
   2 adapter built and tested on macOS/Xcode.

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
- **Premium product activation** — owner-created Play product ID, price, Play
  license-test setup, public-key configuration, no-backend trade-off
  reaffirmation, and all recognition/purchase cases in the device checklist.
  Empty configuration intentionally exposes no checkout.
- **iOS parity** — an iOS Capacitor shell, ML Kit adapter, StoreKit 2
  entitlement/restore flow, and device evidence require macOS/Xcode; the
  Windows Android implementation does not satisfy this gate.
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
