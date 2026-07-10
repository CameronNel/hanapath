# AGENTS.md — instructions for AI agents

You are working in **HanaPath**, a **vanilla static Korean-learning PWA**: no
framework, no bundler, **no build step**, no `package.json`. `app.js` is one large
plain browser script loaded via `<script defer>`.

## Start here

**Read [`AI_INSTRUCTIONS.md`](AI_INSTRUCTIONS.md) first.** It is the step-by-step
runbook for continuing this project: orient → find the next task → build →
verify → ship. If the user says "continue the project," follow it top to bottom.

**The current active work is the Sentences section**, built toward the target
defined in [`docs/SENTENCES_TEACHING_SPEC.md`](docs/SENTENCES_TEACHING_SPEC.md)
— the north star (§3–§7 are the design contract, §8 the status scorecard, §9
the milestone sheet). Work is split across two queues:

- **Curriculum/path/hub/runner restructure (owner-approved 2026-07-10):**
  **[`docs/SENTENCES_CURRICULUM_V2_PLAN.md`](docs/SENTENCES_CURRICULUM_V2_PLAN.md)**
  — the Duolingo-style, K-pop-trainee-themed sentence path. If you were asked
  to "do the next task," take the next unchecked box in its §4 queue
  (S2-A…S2-G; one box = one PR).
- **Bank-level and authored-content work (Track H, owner-gated 🔒):**
  **[`docs/SENTENCES_FINAL_ROADMAP.md`](docs/SENTENCES_FINAL_ROADMAP.md)** —
  read its §0 ground rules and §2 runbook first.

The flagship feature is **Translate & Type**: an English sentence is shown and
the learner types the Korean in Hangul, with a tip → word-bank → next-chunk →
reveal helper ladder.

Do not trust a "✅ done" at face value — the Words scorecard was wrong four
times (PRs #50, #51, #54, merge `b385e77`); verify claims against the actual
data (strict audits + spot-checked rows) before building on them. The
**alphabet section is complete and protected**. The **Words section is live on
its v2 curriculum** ([`docs/WORDS_CURRICULUM_V2_PLAN.md`](docs/WORDS_CURRICULUM_V2_PLAN.md))
and is **read-only for Sentences work** — do not regress either (the closed
Words v1 queue was deleted 2026-07-10; recover from git history if needed).

## Hard rules

1. **Stay vanilla/static.** No framework, bundler, or build step. Data files are
   plain browser globals loaded before `app.js`.
2. **Additive, backward-compatible** changes to the Words and Sentences data
   schemas. Existing curated rows and lessons must keep passing the audits.
3. **Run the audits** after touching learning data: `node scripts/audit-words-data.mjs --strict`,
   `node scripts/audit-sentences-data.mjs --strict`,
   and `node scripts/audit-alphabet-audio.mjs --strict`; run
   `node scripts/audit-app-shell.mjs` after touching `index.html`, `sw.js`, or
   any loaded asset version; `node --check` any JS you edit.
4. **Bump caches** when you change `app.js`, `styles.css`, or any loaded data
   file: update `CACHE_NAME` in `sw.js` **and** the `?v=...` query strings in
   both `index.html` and `sw.js`.
5. **Audio:** if you add Korean text, regenerate assets per `.agents/AGENTS.md`
   (`python generate_assets.py`); never hand-edit `audio_map.js`.
6. **Workflow:** branch off `main`, keep changes small and single-purpose, open a
   PR. There is no test framework — verify with `node --check`, the audit
   scripts, and a browser smoke test (`python -m http.server`, open `index.html`;
   state persists in `localStorage` under `hanapath-v1`).

## Document map

| Doc | Purpose |
|---|---|
| **`AI_INSTRUCTIONS.md`** | The "continue the project" runbook — **start here** |
| `CLAUDE.md` | Same rules + doc map (Claude Code entry point) |
| **`docs/SENTENCES_CURRICULUM_V2_PLAN.md`** | Sentences **path restructure** (current active work): K-pop-trainee Duolingo-style curriculum + S2-A…S2-G queue |
| **`docs/SENTENCES_TEACHING_SPEC.md`** | Sentences **north star**: pedagogy, bank schema, pattern tags, bands, drills, scorecard, milestone sheet |
| **`docs/SENTENCES_FINAL_ROADMAP.md`** | Sentences v1 build record + **Track H authored-content queue** (bank-level work) |
| `docs/WORDS_CURRICULUM_V2_PLAN.md` | Words v2 curriculum (live; read-only during Sentences work) |
| `docs/SENTENCES_TEACHING_SPEC_SOURCE.md` | The Sentences research report, verbatim (source of record) |
| `docs/VOCABULARY_TEACHING_SPEC.md` | Words north star (section **shipped**; pedagogy + data-axes reference) |
| `docs/WORDS_SECTION_MASTER_SPEC.md` | Words implementation reference (schema, SRS, lesson flow — engines Sentences reuses) |
| `HANDOVER.md` | Repo snapshot + conventions |
| `.agents/AGENTS.md` | Offline audio-generation pipeline rules |
| `README.md` | Product overview + run instructions |
