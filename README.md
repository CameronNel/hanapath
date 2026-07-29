# HanaPath

HanaPath is a mobile-first Korean learning app built around three tabs:

- **Learn**
- **Exam**
- **Progress**

The canonical product is a vanilla HTML/CSS/JavaScript app. It runs as a hosted
website, an installable offline-capable PWA, and inside the tracked Capacitor
Android shell under `mobile/`. The browser/PWA remains first-class; native
packaging is an integration layer, not a rewrite.

[Open the live PWA](https://cameronnel.github.io/hanapath/)

## Current product

### Learn

- Complete 8-stage Hangul course with audio, writing practice, Drill Lab, and
  skill review.
- 2,028 curated Korean word senses organised into a 75-unit Words curriculum,
  with lesson study, typed production, SRS review, pronunciation practice,
  inflection support, a 5k frequency reference bank, and Form Checks.
- 4,177 unique, audio-backed sentences organised into a 75-unit Sentence path,
  with listen-and-shadow study, Translate & Type, sentence building, dictation,
  transform practice, checkpoints, SRS, listening, and exact remediation routes.
- Optional native Handwriting Coach for words, phrases, and sentences. The
  current shipped access mode is `free_all`; billing code remains dormant for a
  later owner decision.

### Exam

- **Hangul Mastery Examination:** 200 items across recognition, typing, and
  drawing.
- **Core Word Examination Suite:** 10 deterministic achievement examinations,
  including the v3 typed past/negation production contract and delayed retention
  confirmation. Valid frozen-v2 retention windows remain supported.
- **Sentence Mastery Examination Suite:** four cumulative stage exams, one
  final, and delayed retention confirmation, driven by the enabled frozen
  independently reviewed curated bank. Deterministic generation, strict typed
  grading, Practice taint, immutable provenance, remediation, qualification,
  and retention are shipped.

### Progress and integrity

- Device-local lesson, SRS, review, mastery, and retention state.
- Progress backup export/import.
- Immutable exam-result provenance, Practice-result tainting for testing
  overrides, legacy-result labelling, and validated qualifier/retention links.

## Authoritative completion roadmap

The repository previously accumulated overlapping handovers and agent queues.
They are no longer active execution sources.

**All core-app finishing work now follows:**

[`docs/CORE_APP_COMPLETION_ROADMAP.md`](docs/CORE_APP_COMPLETION_ROADMAP.md)

It defines the scope freeze, exact packet order, file ownership, review/merge
rules, strict definition of done, and paste-ready agent instructions for
finishing lessons and examinations.

## Delivery targets

- Hosted website and installable PWA: shipped and continuously audited.
- Capacitor Android shell: implemented and built in GitHub Actions; real-device
  evidence, signing setup, and Play execution remain post-core release work.
- iOS/iPadOS shell: intentionally later and requires macOS/Xcode.

Browser/PWA and native-app progress currently live in separate storage
containers. Export/import is the supported transfer path; account sync is not a
shipped feature.

## Run locally

```bash
python -m http.server 8000
```

Open `http://localhost:8000`.

For a phone or tablet on the same LAN:

```bash
python -m http.server 8000 --bind 0.0.0.0
```

Then open `http://YOUR-COMPUTER-LAN-IP:8000` on the device. Use the HTTPS GitHub
Pages deployment for service-worker, installation, and true offline-relaunch
tests.

## Current verification gate

The one-command release gate is `node scripts/audit-core-release.mjs --full`
(also the `core-gate` CI job). It runs the complete core matrix, verifies
`docs/CORE_APP_STATUS.md`, and exits non-zero on any failure. Every step is
blocking. CI first generates the isolated `mobile/www` payload so mobile
package validation cannot skip. Use `--quick` only for faster deterministic
sample sizes and `--write-status` after data changes.

```bash
node mobile/scripts/prepare-web.mjs
node scripts/audit-core-release.mjs --full
```

The full-corpus E1C/E1D eligibility expansion was superseded by the curated
Sentence-exam bank. The release gate instead uses
`--protect-historical-evidence`, which strictly preserves the exact 2,100
approved E1A/E1B records while the frozen curated-bank audits protect the live
exam source.

## Repository shape

- `index.html`, `app.js`, `styles.css`: canonical app shell and runtime.
- `words_curated_core.js`, `words_lesson_plan.js`, `words_inflect.js`: Words
  data, curriculum, and inflection engine.
- `sentences_core.js`, `sentences_lesson_plan.js`: Sentence data and curriculum.
- `hangul_mastery_exam.js`: Hangul examination bank.
- `word_exam_blueprints.js`, `word_exam_engine.js`: Core Word examination suite.
- `exam_integrity.js`: immutable result provenance, taint, and migration layer.
- `sentence_exam_eligibility*.js`: protected 2,100-row historical review
  evidence and its fail-closed shard merger.
- `sentence_exam_curated_bank.js`, `sentence_exam_blueprints.js`,
  `sentence_exam_engine.js`, `sentence_exam_runner*.js`: frozen Sentence
  examination source, deterministic papers, grading, UI, provenance, and
  retention.
- `form_check_blueprints.js`: 17 non-certifying lesson diagnostics.
- `audio_map.js`, `audio/`: generated offline audio assets.
- `mobile/`: isolated Capacitor Android project.
- `.github/workflows/`: static CI, Android build, and protected signed-release
  workflows.

## Documentation authority

1. [`docs/CORE_APP_COMPLETION_ROADMAP.md`](docs/CORE_APP_COMPLETION_ROADMAP.md):
   the only active execution queue.
2. `AGENTS.md`, `AI_INSTRUCTIONS.md`, and `CLAUDE.md`: repository rules and
   dispatch entry points.
3. Teaching and examination specifications under `docs/`: design contracts.
4. `HANDOVER.md`: concise current-state snapshot.
5. Older one-shot prompts, rescue handovers, and expansion queues: historical
   records only unless the owner explicitly reactivates one.

## Notes

- The root app stays static and build-free. Do not add a framework, bundler, or
  root package system.
- State is stored under `localStorage["hanapath-v1"]`.
- Loaded-file changes require coordinated service-worker and asset-query cache
  bumps.
- Audio is generated through `generate_assets.py`; never hand-edit
  `audio_map.js`.
