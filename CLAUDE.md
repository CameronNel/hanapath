# CLAUDE.md — read this first

> **Continuing the project?** Start with **[`AI_INSTRUCTIONS.md`](AI_INSTRUCTIONS.md)** —
> the step-by-step runbook (orient → find the next task → build → verify → ship).
> This file is the rules + document map it refers back to.

HanaPath is a **vanilla static Korean-learning PWA**: no framework, no bundler,
**no build step**, no `package.json`. `app.js` is one large plain browser script
loaded via `<script defer>`. Keep it that way unless the owner explicitly asks
otherwise.

## The Sentences section has a governing north star (current active work)

> The **Sentences section** is being rebuilt toward a specific target, defined
> in **[`docs/SENTENCES_TEACHING_SPEC.md`](docs/SENTENCES_TEACHING_SPEC.md)** —
> the source of truth for **what and how** the Sentences section should teach.
> Before doing Sentences work, read its **status scorecard (§8)** and
> **milestone sheet (§9)**, then take the next unchecked box in the execution
> queue **[`docs/SENTENCES_FINAL_ROADMAP.md`](docs/SENTENCES_FINAL_ROADMAP.md)**
> (one box = one PR; owner-gated items are marked 🔒). The flagship feature is
> **Translate & Type**: English prompt → learner types the Korean in Hangul,
> with a tip / word-bank / next-chunk / reveal helper ladder.

The **Alphabet and Words sections are complete and protected** — the Words
finalization queue closed 2026-07-05 (historical record:
`docs/archive/WORDS_FINAL_ROADMAP.md`). Do not regress either; the audits are
the guard.

Do not assume "done" or "not done" from memory or from a checkmark: **verify
scorecard claims against the actual data** (the Words scorecard was wrong four
times: PRs #50, #51, #54, and the b385e77 merge loss).

## Document map (what to read for what)

| Doc | Purpose |
|---|---|
| **`docs/SENTENCES_TEACHING_SPEC.md`** | Sentences **north star**: pedagogy, bank schema, pattern tags, bands, drill modes, status scorecard, milestone sheet |
| **`docs/SENTENCES_FINAL_ROADMAP.md`** | Sentences **execution queue**: checkbox batches, per-PR recipes, model routing — take the next unchecked box |
| `docs/SENTENCES_TEACHING_SPEC_SOURCE.md` | The Sentences research report, **verbatim** (source of record) |
| `docs/VOCABULARY_TEACHING_SPEC.md` | Words north star (section **shipped**; reference for its pedagogy + data axes) |
| `docs/WORDS_SECTION_MASTER_SPEC.md` | Words implementation reference (schema, SRS, lesson flow — reuse these engines for Sentences) |
| `docs/archive/` | Superseded plans (original blueprint, closed Words roadmap, Words research source) — never work from these |
| `HANDOVER.md` | Repo snapshot + conventions for the next contributor |
| `.agents/AGENTS.md` | Offline audio-generation pipeline rules |
| `README.md` | Product overview + run instructions |

## Hard rules for any agent

1. **Stay vanilla/static.** No framework, bundler, or build step. Data files are
   plain browser globals loaded before `app.js`.
2. **Additive, backward-compatible changes** to the Words and Sentences data
   schemas. Existing curated rows and lessons must keep passing the audits.
3. **Run the audits** after touching learning data:
   `node scripts/audit-words-data.mjs --strict`,
   `node scripts/audit-sentences-data.mjs --strict` (once it exists), and
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
