# HanaPath handover

> **Start here for current work:**
> [`docs/CORE_APP_COMPLETION_ROADMAP.md`](docs/CORE_APP_COMPLETION_ROADMAP.md)
>
> This file is a concise snapshot, not an execution queue. The roadmap is the
> only active source for task order, packet scope, ownership, and merge gates.

## Repository state

- `main` is the single source of truth.
- The canonical app is vanilla HTML/CSS/JavaScript with no root framework,
  bundler, package system, or build step.
- `mobile/` is the isolated Capacitor/native exception.
- State persists in `localStorage["hanapath-v1"]`.
- Completed work is merged to `main`; all completion-roadmap workers open draft
  PRs and a designated high-intelligence integrator reviews and merges them.

## Current product snapshot, 24 July 2026

### Lessons

- **Alphabet:** complete 8-stage course, writing practice, Drill Lab, audio,
  skill review, and protected progression.
- **Words:** 2,028 curated senses, 75 units, 284 lessons, SRS, inflection,
  pronunciation, authored past/negation production bridge, and 17 Form Checks.
- **Sentences:** 4,177 unique audio-backed rows, 75 curriculum units,
  listen-and-shadow study, Translate & Type, build, dictation, transform,
  checkpoints, SRS, listening, and lesson remediation routes.

No new Words or Sentence expansion is part of core completion. Optional
expansion queues are frozen until the owner creates a new scope after the core
release candidate.

### Examinations

- **Hangul Mastery:** shipped, 200 items, immutable result/provenance binding.
- **Core Words:** shipped, 10 exams, v3 typed past/negation production,
  retention, and frozen-v2 compatibility for valid existing windows.
- **Sentence Mastery:** not shipped. The specification and partial eligibility
  infrastructure exist, but only 20 of 4,177 rows are reviewed. Strict
  eligibility, blueprints, engine, runner, results, and retention remain the
  main core-app work.

### Integrity and testing

- Immutable result records distinguish HanaPath, Practice, and legacy-incomplete
  results.
- Testing overrides create durable taint before progression mutation.
- Backup import validates exam-integrity collections before replacing state.
- Static CI and Android build are green.
- Core CI still permits incomplete Sentence eligibility and lacks one canonical
  full-journey browser gate. Both are explicit roadmap items.

## Hard rules

1. Keep the root app vanilla and static. Native tooling stays under `mobile/`.
2. Make data and state changes additive and backward-compatible.
3. Never trust a historical count or checkmark without re-deriving it from live
   data and running the strict audit.
4. Never hand-edit `audio_map.js`; use `generate_assets.py`.
5. Loaded-file changes require coordinated `CACHE_NAME` and `?v=` updates in
   `index.html` and `sw.js`, plus matching integrity pins where applicable.
6. Preserve Alphabet progression through `getAlphabetProgress()` and existing
   helpers.
7. Preserve valid old saves, qualifiers, retention windows, and immutable result
   history.
8. During the core completion sprint, workers do not merge their own PRs and do
   not create new roadmaps or handovers.

## Required audit families

Use the focused commands for the packet plus the complete matrix in the core
roadmap. The current families are:

- syntax and app shell;
- Words and Sentences data/foundation;
- Alphabet and full audio coverage;
- Hangul recognition and Handwriting Coach;
- Hangul, Core Word, and exam-integrity audits;
- Form Checks and Sentence eligibility;
- browser acceptance and migration fixtures;
- Android package/build gates when packaged assets or native code change.

## Document authority

| Priority | Document | Role |
|---|---|---|
| 1 | `docs/CORE_APP_COMPLETION_ROADMAP.md` | Only active execution queue |
| 2 | `AGENTS.md`, `AI_INSTRUCTIONS.md`, `CLAUDE.md` | Agent entry points and hard rules |
| 3 | Teaching/exam specifications under `docs/` | Binding design contracts |
| 4 | `README.md` | Product overview and run instructions |
| 5 | Older handovers/prompts/queues | Historical only |

## Post-core work

Real-device Android evidence, Play owner decisions, signing/keystore setup,
internal testing, paid Handwriting Coach activation, ML Kit authority selection,
and iOS packaging are intentionally after the core lesson/exam release
candidate. See roadmap section 11.
