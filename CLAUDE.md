# CLAUDE.md — read this first

> **Continuing the project?** Start with **[`AI_INSTRUCTIONS.md`](AI_INSTRUCTIONS.md)** —
> the step-by-step runbook (orient → find the next task → build → verify → ship).
> This file is the rules + document map it refers back to.

HanaPath is a **vanilla static Korean-learning PWA**: no framework, no bundler,
**no build step**, no `package.json`. `app.js` is one large plain browser script
loaded via `<script defer>`. Keep it that way unless the owner explicitly asks
otherwise.

## The Words section has a governing north star

> The Words (vocabulary) section is being rebuilt toward a specific target. That
> target is defined in **[`docs/VOCABULARY_TEACHING_SPEC.md`](docs/VOCABULARY_TEACHING_SPEC.md)**.
> Treat it as the source of truth for **what and how** the Words section should
> teach. Before doing Words work, read its **status scorecard (§8)**, the
> **roadmap (§9)**, the **milestone reference sheet (§11)**, and the
> **dependency & implementation order (§12)** — §11–§12 tell you *when, where,
> and how* to implement each piece.

Most of the spec is now built (script course, SRS, inflection engine,
pronunciation drills, ~1,900 curated senses, analytics). What remains to
finalize the Words section is listed in the spec's **§9 roadmap** — do not
assume either "done" or "not done" from memory; **check the scorecard, then
verify its claims against the actual data** (the scorecard has been wrong
three times: PRs #50, #51, #54).

## Document map (what to read for what)

| Doc | Purpose |
|---|---|
| **`docs/VOCABULARY_TEACHING_SPEC.md`** | Words **north star**: linguistics + pedagogy, status scorecard, roadmap, milestone sheet, dependency/implementation order |
| `docs/VOCABULARY_TEACHING_SPEC_SOURCE.md` | The original research spec, **verbatim** (source of record) |
| `docs/WORDS_SECTION_MASTER_SPEC.md` | Words **implementation** plan (schema, SRS, lesson flow, screens); §25 reconciles it with the north star |
| `HANDOVER.md` | Repo snapshot + conventions for the next contributor |
| `.agents/AGENTS.md` | Offline audio-generation pipeline rules |
| `README.md` | Product overview + run instructions |

## Hard rules for any agent

1. **Stay vanilla/static.** No framework, bundler, or build step. Data files are
   plain browser globals loaded before `app.js`.
2. **Additive, backward-compatible changes** to the Words data schema. Existing
   curated rows and lessons must keep passing the audit.
3. **Run the audits** after touching Words data:
   `node scripts/audit-words-data.mjs --strict` and
   `node scripts/audit-alphabet-audio.mjs --strict`; run
   `node scripts/audit-app-shell.mjs` after touching `index.html`, `sw.js`, or
   any loaded asset version; `node --check` any JS you edit.
4. **Bump caches** when you change `app.js`, `styles.css`, or any loaded data
   file: update `CACHE_NAME` in `sw.js` **and** the matching `?v=...` query
   strings in both `index.html` and `sw.js`.
5. **Audio:** if you add Korean text, regenerate assets per `.agents/AGENTS.md`
   (`python generate_assets.py`); never hand-edit `audio_map.js`.
6. **Alphabet section is complete and protected** — don't regress it. Go through
   `getAlphabetProgress()` for progression.
7. **Workflow:** branch off `main`, open a **draft PR**, keep it small and
   single-purpose. The owner marks ready and squash-merges.

## Verify like a cold learner

Serve statically (`python -m http.server 8000`) and open `index.html`. There is
no test framework; validate with `node --check`, the audit scripts, and a
browser smoke test (state persists in `localStorage` under `hanapath-v1`).
