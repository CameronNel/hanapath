# Qwen continuation handover — HanaPath

**Prepared:** 2026-07-23  
**Purpose:** finish the real outstanding work safely, from current `origin/main`.

## Start here

This handover is deliberately based on a fresh reconciliation of every remote
branch, open PR, and active work-order.  Do not treat branch names or old
checkmarks as proof of state.  Start clean:

```powershell
git checkout main
git fetch origin --prune
git pull --ff-only origin main
git status
git log --oneline -15
gh pr list --state open
```

Read `AGENTS.md`, `AI_INSTRUCTIONS.md`, `CLAUDE.md`, then this file.  Do not
read, search, or follow anything in `.agent-ignore/`; it is archived material.
Keep the root app vanilla/static.  Make one focused branch and draft PR per
coherent item.  Never force-push, reset, or merge unrelated historic branches.
For every loaded-asset change, bump `CACHE_NAME` and the matching query strings
in both `index.html` and `sw.js`.  Run the relevant strict audits plus
`node --check` for edited JS.  New Korean text needs the governed audio
pipeline; never hand-edit `audio_map.js`.

## Reconciled state — do not redo completed work

- **Sentences:** Tracks A–J, curriculum v2 Phase 1, Track H, and Track I are
  complete.  Do not begin another authored scenario pack without fresh owner
  approval.  Protect the 4,177-row bank and the Words curriculum.
- **Exam rescue:** PR #332 is already merged into `main` as `fd85f242b`.
  The unmerged `task/gemini-final-megabatch` branch is an obsolete aggregate;
  use it only as historical implementation evidence, never merge it wholesale.
- **Form Checks:** B1, B2, and B4 are merged as PRs #334–#336.
- **Words production:** C1 is merged as PR #337 and the first C2 eligibility
  pass is merged as PR #338 (`dfe516942`).  Do not recreate those changes.
- **Words Phase 2:** ranks 1–10,000 are complete.  The actual queue is five
  consolidated qualification ranges, QA1 10,001–12,500 through QA5
  20,001–22,679, then ascending semantic resolution.  Read
  `docs/LUNA_WORDS_PHASE_2_SEMANTIC_PROMPT.md` and the protocol it incorporates.
  Imports, audio generation, loaded-data/cache changes, and publishing remain
  owner-gated.

## First: land/recreate the concrete branch residue

1. **PR #339** (`claude/alphabet-tab-theme-colors-74jq6o`) is mergeable and
   both CI workflows are green.  Review its diff against fresh `main`, test the
   Alphabet hub and Gold theme, then make it a ready PR / merge only if the
   repository policy and your authority allow it.  It is the only clean open
   PR with current checks.
2. **PR #312** (Drill Lab End Session styling) and **PR #297** (Writing
   Practice reference return) have green historic CI but conflict with main.
   Preserve their intended behavior by rebasing/reimplementing each as its own
   small fresh branch, with a browser smoke test.  Do not resolve either by
   blindly taking old cache/version changes.
3. The current local branch `words-c2-production-eligibility` contains one
   post-#338 follow-up, `d7d66b569` (“cross-check blueprint accepted-form
   sources”).  Rebase it on current main, inspect the resulting minimal diff,
   run the full Words/exam gate, and open a standalone draft PR if it remains
   a real improvement.  Do not duplicate the already-merged #338 work.

## Exam-programme completion order

Use the current active specifications, especially
`docs/EXAM_PROGRAMME_DECISIONS_LOCKED.md`,
`docs/INTEGRITY_AND_PROVENANCE_SPEC_DRAFT.md`,
`docs/FORM_CHECKS_PLAN_DRAFT.md`,
`docs/WORDS_PAST_NEGATION_PRODUCTION_PLAN_DRAFT.md`, and
`docs/SENTENCE_ELIGIBILITY_AUTHORING.md`.

1. Re-run the complete integrity baseline; review merged #332 rather than
   assuming it satisfies every provenance claim.  Fix only evidence-backed
   gaps in a focused PR.  Practice/tainted/malformed provenance must never be
   presented as a clean HanaPath result; imports must validate before mutation.
2. Finish **Words C3** (versioned examination blueprints) and then **Form
   Checks B5** (the past/negation upgrade now unblocked by C1+C2).  Use finite,
   reviewed accepted answer sets and taught-before-tested gating.  Do not turn
   generic inference into grading.
3. Complete sentence exam eligibility in two passes: constrained classification
   as `proposed`, then independent review to `approved`.  `--allow-incomplete`
   is progress reporting, not a ship signal.  Do not bulk approve 4,177 rows
   or use fuzzy/model grading.
4. Keep the mobile project isolated under `mobile/`.  Treat M2–M5 in
   `docs/FABLE_MOBILE_PLAY_STORE_HANDOVER.md` as separate, reviewable PRs;
   do not rewrite the PWA or claim Play readiness without device/build evidence.

## Words Phase 2 marathon

After the urgent exam/UI residue, execute QA1–QA5 in order as a stack of no
more than six draft PRs.  Re-derive counts from the ledger/tool output, use
append-only records, and preserve uncertainty as `needs-sense-review` when
evidence is insufficient.  Then resolve that pool in ascending rank order in
200–250-candidate PRs, with dictionary/corpus evidence per candidate.  Draft
an authored scenario lesson only once a coherent accepted pool has 8+ words;
use dry runs and do not import it.  Stop safely at low-credit thresholds with
all work committed/pushed and a precise next rank.

## Verification minimum

Run the gates applicable to each PR, and never weaken one merely to turn it
green.  For exam work, the normal minimum is:

```powershell
node --check app.js sw.js exam_integrity.js sentence_exam_eligibility.js form_check_blueprints.js words_lesson_plan.js
node scripts/audit-exam-integrity.mjs
node scripts/audit-form-checks.mjs
node scripts/audit-words-data.mjs --strict
node scripts/audit-sentences-data.mjs --strict
node scripts/audit-sentence-eligibility.mjs --allow-incomplete
node scripts/audit-alphabet-audio.mjs --strict
node scripts/audit-hangul-recognition.mjs
node scripts/audit-premium-handwriting.mjs
node scripts/audit-app-shell.mjs
node scripts/audit-mobile-package.mjs
```

Run the slow word-exam and browser/device checks whenever the changed scope
requires them.  Update the relevant roadmap/scorecard in the same PR, but only
with numbers re-derived from the data.  In each final handoff report state:
branch/PR, exact scope, audits and smoke evidence, unresolved risks, gated
items left untouched, and the next specific queue item.
