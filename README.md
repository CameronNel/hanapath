# HanaPath

HanaPath is a mobile-first Korean learning app built around four learner-first tabs:

- Today
- Path
- Practice
- Library

The app opens with a guided daily action, routes learners based on onboarding answers, and grows through level-based practice with review loops, quizzes, and the 5k vocabulary file.

## What each tab does

- `Today` tells you what to do next.
- `Path` shows the full roadmap through Hangul and beyond.
- `Practice` handles sentence building, speaking-style drills, and listening work.
- `Library` keeps vocabulary, phrases, and reference content close at hand.

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
node scripts/audit-alphabet-audio.mjs --strict
node scripts/audit-app-shell.mjs
```

## Main files

- `index.html`
- `app.js`
- `styles.css`
- `korean_5000_claude_ready.csv`

## Planning & docs

- **[`AI_INSTRUCTIONS.md`](AI_INSTRUCTIONS.md)** — the "continue the project" runbook for an AI/agent (orient → pick next task → build → verify → ship).
- **[`CLAUDE.md`](CLAUDE.md)** — read-this-first guide for contributors and AI agents (rules + document map).
- **[`docs/VOCABULARY_TEACHING_SPEC.md`](docs/VOCABULARY_TEACHING_SPEC.md)** — the governing north star for the Words section (linguistics + pedagogy, status scorecard, roadmap, milestone sheet, and implementation dependency order).
- [`docs/VOCABULARY_TEACHING_SPEC_SOURCE.md`](docs/VOCABULARY_TEACHING_SPEC_SOURCE.md) — the original research spec, verbatim.
- [`docs/WORDS_SECTION_MASTER_SPEC.md`](docs/WORDS_SECTION_MASTER_SPEC.md) — the Words implementation plan.
- [`HANDOVER.md`](HANDOVER.md) — repo snapshot and conventions.

## Notes

- Progress is stored in the browser.
- The repo is meant to be static and easy to deploy to GitHub Pages or another static host.
