# Mobile native architecture record (M0)

> Status: **M0 — Decisions and rules** (this document). No Android project is
> generated yet; that is M1, gated on the owner confirming the permanent
> package ID in [`play-store/OWNER_DECISIONS.md`](play-store/OWNER_DECISIONS.md).
> The governing execution brief is
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
| Android min SDK | **23** | Capacitor 8 default floor unless higher required; also the ML Kit Digital Ink minimum |
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
   ML Kit Digital Ink (`ko`) may become the preferred *native* recognizer only
   by passing the comparison gate in handover §10.3, measured by a shared
   fixture harness.
6. **No new permissions** in the foundation; CI fails on unexpected manifest
   permissions (handover §9.3).
7. **Milestone PRs M0→M6** as sequenced in handover §16; every native PR
   re-runs the full web audit gate (§12.2).

## 5. What blocks M1

Only the owner decisions marked ⏳ in
[`play-store/OWNER_DECISIONS.md`](play-store/OWNER_DECISIONS.md) — primarily
the **permanent package ID**. Everything else in M1 (prepare script, www
allowlist, service-worker bypass, local fonts, package audit, Android
project) is specified and ready to execute once that ID is confirmed.
