# HanaPath

HanaPath is a mobile-first Korean learning app built around three tabs:

- Learn
- Practice
- Progress

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
- **[`CLAUDE.md`](CLAUDE.md)** — read-this-first guide for contributors and AI agents (rules + document map).
- **[`docs/SENTENCES_TEACHING_SPEC.md`](docs/SENTENCES_TEACHING_SPEC.md)** — the governing north star for the Sentences section (current active work), with its execution queue in [`docs/SENTENCES_FINAL_ROADMAP.md`](docs/SENTENCES_FINAL_ROADMAP.md) and the verbatim research source in [`docs/SENTENCES_TEACHING_SPEC_SOURCE.md`](docs/SENTENCES_TEACHING_SPEC_SOURCE.md).
- [`docs/VOCABULARY_TEACHING_SPEC.md`](docs/VOCABULARY_TEACHING_SPEC.md) — the north star for the (shipped) Words section.
- [`docs/WORDS_SECTION_MASTER_SPEC.md`](docs/WORDS_SECTION_MASTER_SPEC.md) — the Words implementation plan (schema/SRS/lesson-flow reference).
- [`docs/archive/`](docs/archive/README.md) — superseded plans (original blueprint, closed Words roadmap, Words research source).
- [`HANDOVER.md`](HANDOVER.md) — repo snapshot and conventions.

## Notes

- Progress is stored in the browser.
- The repo is meant to be static and easy to deploy to GitHub Pages or another static host.
