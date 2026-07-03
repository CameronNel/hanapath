# AGENTS.md — instructions for AI agents

You are working in **HanaPath**, a **vanilla static Korean-learning PWA**: no
framework, no bundler, **no build step**, no `package.json`. `app.js` is one large
plain browser script loaded via `<script defer>`.

## Start here

**Read [`AI_INSTRUCTIONS.md`](AI_INSTRUCTIONS.md) first.** It is the step-by-step
runbook for continuing this project: orient → find the next task → build →
verify → ship. If the user says "continue the project," follow it top to bottom.

The **Words (vocabulary) section** is built toward the target defined in
[`docs/VOCABULARY_TEACHING_SPEC.md`](docs/VOCABULARY_TEACHING_SPEC.md) — the north
star. Most of it has shipped; the live remaining-work list is its
**§9 finalization checklist**, and the **batch-by-batch execution queue** for
that checklist is **[`docs/WORDS_FINAL_ROADMAP.md`](docs/WORDS_FINAL_ROADMAP.md)**
— if you were asked to "do the next task" or "work the roadmap," open that
file, read its §2 runbook, and take the next unchecked box (one box = one PR;
Tracks D/E are gated — don't touch them without an explicit owner decision).
**§8** is the status scorecard, **§11** the milestone sheet, **§12** the
how-to for the one open milestone (M2). Do not trust a "✅ done" at face
value — the scorecard has been wrong three times (PRs #50, #51, #54);
verify claims against the actual data (`node scripts/audit-words-data.mjs
--strict`, spot-check rows) before building on them. The **alphabet section
is complete and protected** — do not regress it.

## Hard rules

1. **Stay vanilla/static.** No framework, bundler, or build step. Data files are
   plain browser globals loaded before `app.js`.
2. **Additive, backward-compatible** changes to the Words data schema. Existing
   curated rows and lessons must keep passing the audit.
3. **Run the audits** after touching Words data: `node scripts/audit-words-data.mjs --strict`
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
| **`docs/VOCABULARY_TEACHING_SPEC.md`** | Words **north star**: pedagogy/linguistics, status scorecard, milestone sheet, dependency/implementation order |
| **`docs/WORDS_FINAL_ROADMAP.md`** | Words **execution queue**: checkbox batches, per-PR recipes, curation decision guides — take the next unchecked box |
| `docs/VOCABULARY_TEACHING_SPEC_SOURCE.md` | The original research spec, verbatim (source of record) |
| `docs/WORDS_SECTION_MASTER_SPEC.md` | Words **implementation** plan (schema, SRS, lesson flow); §25 reconciles it with the north star |
| `HANDOVER.md` | Repo snapshot + conventions |
| `.agents/AGENTS.md` | Offline audio-generation pipeline rules |
| `README.md` | Product overview + run instructions |
