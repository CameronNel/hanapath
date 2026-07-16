# HanaPath

HanaPath is a mobile-first Korean learning app built around three tabs:

- Learn
- Practice
- Progress

## Delivery targets

HanaPath has one canonical HTML/CSS/JavaScript implementation with multiple
delivery targets:

- A phone- and tablet-first website that remains directly testable in a normal
  browser.
- An installable offline-capable Progressive Web App (PWA).
- A planned Capacitor Android shell for Google Play distribution.
- A later Capacitor iOS/iPadOS shell using the same audited application source.

The native work is a packaging and platform-integration layer, not a rewrite.
The root web app remains vanilla and build-free; native tooling belongs in an
isolated `mobile/` project. Native-only capabilities must retain browser
fallbacks.

[Open the live PWA](https://cameronnel.github.io/hanapath/)

The app teaches Hangul first (a complete 8-stage alphabet course), then a
curated ~1,900-sense Words curriculum with SRS review, an inflection engine,
pronunciation drills, and the 5k frequency word bank as reference.

## What each tab does

- `Learn` holds the study material: the alphabet course, vocabulary lessons and the full Word Bank, sentences, and listening.
- `Practice` handles quizzes, review sessions, and drills.
- `Progress` shows mastery, review analytics, and retention metrics.

## Run locally

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

To test the interface from a phone or tablet on the same local network, bind
the server to the LAN and open the computer's LAN IP from the device:

```bash
python -m http.server 8000 --bind 0.0.0.0
```

```text
http://YOUR-COMPUTER-LAN-IP:8000
```

Use the HTTPS GitHub Pages deployment when testing PWA installation, service
workers, and a true offline relaunch. Plain LAN HTTP is primarily for rapid
layout, touch, drawing, audio, and lesson-flow testing.

## Android and Google Play direction

The approved direction is to preserve the browser/PWA product and add a
Capacitor native shell around the same static runtime. The Android work must
produce a reproducible, audited, signed Android App Bundle while keeping phone
and tablet browser testing first-class.

Fable's complete implementation handover is:
[`docs/FABLE_MOBILE_PLAY_STORE_HANDOVER.md`](docs/FABLE_MOBILE_PLAY_STORE_HANDOVER.md).

That document covers the narrow exception to the no-build rule, repository
layout, asset/audio packaging, service-worker separation, storage and upgrades,
native handwriting recognition, phone/tablet validation, signing, GitHub
Actions, Play Console declarations, testing tracks, and release gates.

Browser/PWA and native-app progress currently use separate storage containers.
Progress export/import or account sync must be designed before promising
cross-install synchronization.

## Verify

```bash
node --check app.js sw.js words_curated_core.js words_inflect.js scripts/audit-words-data.mjs scripts/audit-app-shell.mjs
node scripts/audit-words-data.mjs --strict
node scripts/audit-sentences-foundation.mjs
node scripts/audit-alphabet-audio.mjs --strict
node scripts/audit-app-shell.mjs
```

## Main files

- `index.html`, `app.js`, `styles.css`
- `words_curated_core.js`, `words_lesson_plan.js`, `words_inflect.js` — Words data + inflection engine
- `korean_5000_claude_ready.csv`, `raw_word_meanings.js` — 5k frequency reference
- `audio_map.js`, `audio/` — pre-generated TTS assets
- `sw.js` — service worker (cache-versioned app shell)

## Planning & docs

- **[`AI_INSTRUCTIONS.md`](AI_INSTRUCTIONS.md)** — the "continue the project" runbook for an AI/agent (orient → pick next task → build → verify → ship).
- **[`AGENTS.md`](AGENTS.md)** — repository-wide rules and document routing for AI agents.
- **[`CLAUDE.md`](CLAUDE.md)** — read-this-first guide for contributors and AI agents (rules + document map).
- **[`docs/FABLE_MOBILE_PLAY_STORE_HANDOVER.md`](docs/FABLE_MOBILE_PLAY_STORE_HANDOVER.md)** — owner-approved Android/Capacitor/Google Play execution handover, with later iOS compatibility.
- **[`docs/SENTENCES_TEACHING_SPEC.md`](docs/SENTENCES_TEACHING_SPEC.md)** — the governing north star for the Sentences section, with current path/hub work in [`docs/SENTENCES_CURRICULUM_V2_PLAN.md`](docs/SENTENCES_CURRICULUM_V2_PLAN.md), Track H authored-content work in [`docs/SENTENCES_FINAL_ROADMAP.md`](docs/SENTENCES_FINAL_ROADMAP.md), and research in [`docs/SENTENCES_TEACHING_SPEC_SOURCE.md`](docs/SENTENCES_TEACHING_SPEC_SOURCE.md).
- [`docs/VOCABULARY_TEACHING_SPEC.md`](docs/VOCABULARY_TEACHING_SPEC.md) — the north star for the (shipped) Words section.
- [`docs/WORDS_SECTION_MASTER_SPEC.md`](docs/WORDS_SECTION_MASTER_SPEC.md) — the Words implementation plan (schema/SRS/lesson-flow reference).
- [`HANDOVER.md`](HANDOVER.md) — repo snapshot and conventions.

## Notes

- Progress is stored in the browser.
- The repo is meant to be static and easy to deploy to GitHub Pages or another static host.
