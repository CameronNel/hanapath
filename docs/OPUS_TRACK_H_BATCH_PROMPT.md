# Opus Track H batch prompt — Sentences authored expansion

> **Owner unlock (2026-07-16):** the owner unlocked Track H (previously 🔒)
> and assigned the batch queue to **Opus 4.8**. This document is the standing
> record of that unlock and the per-batch work order. Scope of the unlock:
> the priority queue below, at the default batch shape (~40–60 rows per
> batch). Scenario-pack themes beyond the priority queue still need the
> owner's per-theme nod in the PR thread.

## Who you are and what you own

You are Opus, continuing HanaPath's Sentences Phase 2 (authored expansion).
You own **one batch per session**: author original Korean sentences into the
thinnest coverage cells, wire them through the audio + curriculum pipeline,
and ship them as one small PR. You do **not** own UI work, the Words section,
the mobile track, or roadmap re-architecture.

## Read first, in order (do not skip)

1. `CLAUDE.md` — repo rules, cache-bump law, audit gate
2. `docs/SENTENCES_CURRICULUM_V2_PLAN.md` — **§5** (Phase 2 mechanics — your
   job description), **§6** (invariants/do-not-touch), **§7** (verification
   playbook)
3. `docs/SENTENCES_FINAL_ROADMAP.md` §10 (Track H) + §13 progress-log format
4. `docs/SENTENCES_TEACHING_SPEC.md` — bank schema, the closed pattern-tag
   list, band definitions
5. `docs/SENTENCES_GAP_REPORT.md` — the shopping list (regenerate it first;
   see below)
6. `.agents/AGENTS.md` — audio pipeline rules

## Verified repo facts (2026-07-16 — re-derive before building on them)

- Bank: **2,061 rows** in `sentences_core.js` (2,007 `words-core`,
  53 `legacy-app`, **1 `authored`**). Next id: **`s2062`**.
- **`s2061` is the worked example** of an authored row — copy its shape
  exactly: full schema, `grammarTip`, `acceptAlso`, explicit
  `annotationSource` on both axes, `source: "authored"`.
- The committed gap report was derived at 2,007 rows and is stale.
  Regenerate with `node scripts/generate-gap-report.mjs` at the start of
  every batch and commit the refreshed report with the batch.
- `scripts/audit-sentences-data.mjs --strict` **hard-fails any row whose
  `voiceText` lacks playable local audio** — audio generation is
  merge-blocking, not optional.
- Curriculum artifacts are drift-checked: after appending rows, run
  `node scripts/generate_sentences_curriculum_v2.mjs` and commit its
  regenerated outputs (`--check` runs in the test harness and fails on
  drift).

## Priority queue (plan §5 — work top-down)

1. **Thin pattern tags** (~100 rows across ~4 batches). From the stale
   report the critical cells are: `copula-negative-anieyo` (**0 rows**),
   `propositive-eyo` (2), `from-buteo` (5), `but-jiman` (6), `only-man` (7),
   `until-kkaji` (7), `future-geoyeyo` (8), plus the next-thinnest per your
   regenerated matrix (`can-su-itda`, `want-go-sipda`, `neg-mot`,
   `comparison-boda` are all ≤12). Aim rows at bands 1–3 first — that is
   where the cells are emptiest and where drilling needs them.
2. **Grammar-unit fills** — append lessons to the three thin grammar units
   (7/12/15 rows). Crowned units stay crowned; checkpoint
   `reviewSentenceIds` may extend.
3. **Scenario packs** — K-pop-fan-life themed units (practice-room talk,
   fan-sign lines, interview reactions, award-show thanks, live-stream
   chat). Owner picks themes per batch in the PR thread before you author.

## Authoring rules (non-negotiable)

- **Original sentences only.** K-pop *theming* is welcome; **verbatim
  lyrics/subtitles never; no real idol/group/company names of any kind**
  (plan §3.0/§6.5). 해요체-first register; bands ≠ politeness.
- Ids continue the frozen sequence (`s2062`, `s2063`, …) in file order.
- Every row: full schema per `s2061` — `korean`, `english`, `voiceText`
  (= korean), `tokens` (must normalize to `korean` — the audit checks),
  `band`, `patternTags` (closed list only), `focusWordIds`/`sourceWordIds`
  (real ids from `words_curated_core.js`), `speechLevel`, `register`,
  `grammarTip`, `acceptAlso` where a natural variant exists, explicit
  `annotationSource` both axes, `source: "authored"`.
- **Never edit existing rows'** `id/korean/english/tokens` (frozen).
  Additive only.
- Words section is read-only (plan §6.3). Don't touch anything it lists.

## Batch pipeline (one batch = one branch off `main` = one draft PR)

1. `git checkout -B <branch> origin/main`; regenerate the gap report;
   pick the target cells and state them in the PR description.
2. Author the rows; append to `sentences_core.js`.
3. **Audio:** `python generate_assets.py` (needs `edge-tts` + `ffmpeg` on
   PATH). It generates only the new phrases and rewrites `audio_map.js`
   itself — **never hand-edit `audio_map.js`**. If your environment cannot
   run edge-tts (it needs network to Microsoft's TTS endpoint), stop:
   leave the PR as a draft that clearly says "audio pending — owner runs
   `python generate_assets.py`", and do **not** merge red or weaken an
   audit to get green.
4. `node scripts/generate_sentences_curriculum_v2.mjs`; commit regenerated
   artifacts.
5. **Cache bumps** — `sentences_core.js` and `audio_map.js` are loaded
   files: bump `CACHE_NAME` in `sw.js` **and** the matching `?v=` strings
   in **both** `index.html` and `sw.js`.
6. Verify (plan §7): `node --check` on touched JS;
   `audit-sentences-data --strict`; `audit-sentences-foundation`;
   `audit-words-data --strict` (proves Words untouched);
   `audit-alphabet-audio --strict`; `audit-app-shell`; browser smoke on a
   fresh + a legacy profile (one full lesson with a new row, mid-lesson
   reload, zero console errors).
7. Update the roadmap §13 progress log and the regenerated gap report;
   re-derive every count from the data files (the scorecard has been wrong
   four times — never trust a checkbox).
8. Open a **draft PR** (one batch, single-purpose) with the plan-§7
   evidence, target-cell before/after counts, and audio status. The owner
   marks ready and squash-merges (CLAUDE.md rule 7) unless they grant
   auto-merge for the session in their own words.

## Hard stops — ask the owner instead of proceeding

- Any temptation to edit frozen row fields, weaken an audit, or hand-edit
  `audio_map.js`.
- A pattern the closed tag list cannot express (precedent: `-자마자`/`-다가`
  were deliberately left untagged rather than inventing tags).
- Scenario-pack theme selection (owner taste, per batch).
- Anything touching Words, the mobile track, or the Studio engine.
