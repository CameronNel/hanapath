# Sentences — Night Handover (2026-07-06)

> Cross-PC handover so a fresh session (different machine, no chat history) can
> continue. **First step: `git checkout main && git pull origin main`.**
> Authoritative queue is [`SENTENCES_FINAL_ROADMAP.md`](SENTENCES_FINAL_ROADMAP.md);
> north star is [`SENTENCES_TEACHING_SPEC.md`](SENTENCES_TEACHING_SPEC.md). This
> file is a snapshot + task list, not a substitute for those.

## Delivery constraint (non-negotiable)
Everything must be **on GitHub** — the owner continues from a different PC and
won't have tonight's machine. **One task = one branch off `main` = one draft PR,
pushed to `origin`.** Never leave work only local, never commit to `main`, never
stack unrelated work. After each PR, confirm it exists on GitHub (`gh pr view`).

## Current state (after the s2008–s2060 curation PR)
- Bank `sentences_core.js` = **2,060 rows**. Cache **`v244`** / `?v=20260706e`.
- `band`: explicit on all 2,060 / 0 inferred.
- `patternTags`: explicit on all 2,060 / 0 inferred.
- Tracks **A, B, C, D** done; **H/I** legacy consolidation landed.
- All audits pass `--strict`.

## Tasks (priority order — each its own pushed draft PR)
1. **Pattern-tag accuracy pass (hard).** `counter-phrase` was over-applied; 75
   zero-number rows already corrected. ~40 rows remain where a number is present
   but the head noun is debatable (`두 부서`, `두 사람`) — set a consistent policy
   (§4 = "number **plus counter**"), document it, apply uniformly. Then sweep the
   other tags (highest-risk: `location-e`/`location-eseo`/dative 에, connectives,
   `time-expression`). ~200-row batches, one PR each, with an accuracy report.
2. **Runtime-verify the Listening / survival-phrases tab.** #109 removed legacy
   mini-banks from `app.js`; static audits pass but it was not browser-tested.
   Serve (`python -m http.server 8000`), open that tab, confirm render/playback.
   Fix in a PR if broken.
3. **Track E — pattern micro-lessons** (`app.js`, judgment work) — only after 1–2.

## Rules (every PR)
- Vanilla/static; additive; never reuse/renumber `id`s or touch
  `korean`/`english`/`tokens`. Tags only from the §4 closed set (37).
- **Don't trust `annotationSource:"explicit"` = correct — re-derive from the Korean.**
- Run: `node --check <file>`, `audit-sentences-data.mjs --strict` (0 errors),
  `audit-words-data.mjs --strict`, `audit-app-shell.mjs`,
  `audit-alphabet-audio.mjs --strict`.
- Cache bump on any loaded-file change: `CACHE_NAME` in `sw.js` + `?v=` in **both**
  `index.html` and `sw.js`, kept in sync (monotonic).
- New Korean text → regenerate audio per `.agents/AGENTS.md` (tasks 1–4 need none).

## End-of-night checklist
Every task = a merged-or-open **draft PR on GitHub**; `git status` clean;
`git log origin/main..` empty on each branch (all pushed); `main` left green.
