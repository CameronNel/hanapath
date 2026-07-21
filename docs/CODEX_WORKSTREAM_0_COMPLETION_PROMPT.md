# Codex execution order — one-shot the rest of Workstream 0 (boxes 0C + 0D + 0E)

> **Owner instructions (not part of the prompt):** send Codex this single
> message, no attachments:
>
> > Look at
> > https://raw.githubusercontent.com/CameronNel/hanapath/main/docs/CODEX_WORKSTREAM_0_COMPLETION_PROMPT.md
> > and execute it fully.

---

You are a frontier coding model finishing **Workstream 0** of the HanaPath
exam programme in **one run**. Boxes `0A` (immutable provenance schemas +
legacy migration) and `0B` (persistent taint events + query-gated testing
controls) are merged into `main` and review-hardened. You deliver the
remaining three boxes — `0C`, `0D`, `0E` — as **one draft PR** with three
logical commits (the owner has explicitly authorised this deviation from
the one-box-one-PR rule for this run). Box `0F` stays deferred; do not do
it.

## Read first, on `main`, completely

1. `CLAUDE.md` and `AI_INSTRUCTIONS.md` — hard repository rules.
2. **`docs/INTEGRITY_AND_PROVENANCE_SPEC_DRAFT.md`** — the governing spec.
   You are implementing §5.2–5.3 (result classification, mastery/retention
   blocking), §6 (provenance records, linkage, indexes), §7.3 (backup
   validation), §8 (labels and claim copy), §9 (checksum rule), the full
   §10 audit contract, and §11 acceptance tests.
3. `docs/EXAM_PROGRAMME_DECISIONS_LOCKED.md` — Decisions 11, 12, 15 bind
   you, including the owner's Decision 15 amendment (short card line, full
   disclosure one interaction away).
4. `docs/CHATGPT_WORKSTREAM_0_EXECUTION_PROMPT.md` — the standing rules
   restated (audits, cache bumps, vanilla app, protected Alphabet).
5. The merged foundation you build on:
   - `exam_integrity.js` — the API you extend, not replace:
     `migrateExamIntegrityState` (one wrapper per legacy source, tracked
     via the migration log), `validateExamIntegrityState`,
     `createTaintEvent` / `appendTaintEvent` / `validateTaintEvent`,
     `getIntersectingTaintEventIds`, **`getAttemptTaintContext(state,
     scopeSectionIds, overrideFlags)`** → `{ overrideEventIds,
     overrideFlags, status: "hanaPath"|"practice", isPractice }`.
   - `app.js` — `saveState()` returns a persistence-verification boolean;
     `isWordExamTestQueryActive()` is the single private gate;
     `persistTaintBeforeCompletion()` shows the taint-before-mutation
     pattern; the Hangul runner is under
     `EXAM HUB · HANGUL MASTERY EXAMINATION` (`submitHangulExam`,
     `normalizeAlphabetMasteryExam`); the Words runner is under
     `CORE WORD EXAMINATION SUITE` (`submitWordExamAttempt`,
     `normalizeWordExams`, `wordExamRetentionStatus`,
     `renderWordExamResult`).
   - `scripts/audit-exam-integrity.mjs` — extend it; keep every existing
     assertion green.

## Commit 1 — Box 0C: bind Hangul Mastery results

On every `submitHangulExam`:

- write a complete immutable result record into
  `state.examResults.byAttemptId` (fresh attempt ID; `examId`
  `"hangul-mastery-exam"`; `blueprintVersion` 2; `scopeSectionIds`
  `["alphabet"]`; itemCount/score/floors from the real attempt; fields
  that genuinely don't exist for this exam stay explicit `null` — the
  Hangul exam has no generation seed; never invent one);
- classify via `getAttemptTaintContext(state, ["alphabet"],
  activeOverrideFlags)` where `activeOverrideFlags` includes the
  `__wetest` query when active (spec §4.4: an active hook taints the
  attempt even if it changed nothing). Check overrides at generation AND
  submission;
- a `practice` attempt is fully scored and reviewable but **must not**
  set `state.alphabetMasteryExam.mastered`, and must not raise
  `bestCorrect` used for the mastered badge — the compatibility summary
  reflects HanaPath results only (attempts count may include practice;
  document what you choose in the PR);
- an untainted attempt behaves **exactly** as today — this is the box
  gate: existing Hangul behaviour observably unchanged for normal use.

## Commit 2 — Box 0D: bind Core Words results, qualification, retention

On every `submitWordExamAttempt` (full and confirmation modes):

- write the immutable record (real seed, blueprint version from
  `HANAPATH_WORD_EXAM_META`, engine version, exam `scopeSectionIds`,
  score/floor summaries, `attemptMode`);
- classify via `getAttemptTaintContext(state, exam.scopeSectionIds,
  activeOverrideFlags)`;
- a `practice` attempt must not set `passed`, `distinguished`,
  `bestPct`-driven badges, `masteryEarnedAt`, must not open
  (`confirmationDueFrom`/`confirmationExpiresAt`) or satisfy retention,
  and must not store `qualifyingTargetIds` — spec §5.3 verbatim;
- retention pairing: a retention record stores `qualifyingAttemptId`; the
  pair is appended to `state.examIntegrity.resultRelations`
  (`type: "retention"`); pairs require same examId, same blueprint major
  version, both status `hanaPath`. A retention attempt whose qualifier is
  tainted or provenance-incomplete becomes practice;
- re-check taint at submission so a taint created mid-attempt is caught
  (spec §5.1);
- untainted flows keep today's outcomes exactly — full
  `scripts/audit-word-exams.mjs` must stay green.

**Acceptance-test trap you must handle:** the existing browser acceptance
hook `window.__wordExamTest` only exists under `?__wetest=1`, and under
§4.4 that query taints every attempt. Tests that need a `hanaPath`-status
attempt must therefore inject state programmatically in the harness (never
writing learner-visible overrides), not run the runner under the live
query. Do not weaken §4.4 to make testing convenient.

## Commit 3 — Box 0E: labels, claim copy, backup validation

- Result surfaces (Hangul result screen, Words result screen, exam hub
  cards, result details) show exactly: **`HanaPath result`**,
  **`Practice result`**, or **`Legacy result · provenance incomplete`**
  where a stored record backs the display. Practice copy per spec §8.4.
  Prohibited words per §8.1 (`official`, `verified`, `certified`,
  `tamper-proof`, TOPIK/CEFR equivalence) — audit-enforced;
- result details expose blueprint/engine/bank versions, seed where it
  exists, and status; the full integrity disclosure ("Results are stored
  on this device. They are not proctored, independently verified, or
  tamper-proof credentials.") is one interaction away from every result
  card and present in exam help. The Sentence-Mastery-specific card copy
  ships later with the Sentence exam — do NOT add Sentence UI now;
- backup import validation (spec §7.3): reject malformed attempt IDs,
  duplicate attempt IDs, broken qualifier/retention linkage, and
  impossible status combinations **before** replacing current state;
  export already includes the integrity collections — assert it;
- checksum stays optional; if you add one, label it `Integrity check`
  only (§9).

## Audit + fixtures (part of the same PR)

Extend `scripts/audit-exam-integrity.mjs` to the **full §10 contract,
items 1–32**, keeping all current assertions. Add fixtures: tainted
Hangul attempt, tainted Words qualifier, practice-retention pairing
attempt, post-0C/0D live-result records, malformed-import payloads.
Print the §10 success summary (counts by exam, status, blueprint,
bank revision, override type, legacy state).

## Non-negotiables (same as every box)

- All audits green:
  `node --check` everything you touch; `audit-exam-integrity`,
  `audit-word-exams` (full seeds), `audit-hangul-mastery-exam`,
  `audit-words-data --strict`, `audit-sentences-data --strict`,
  `audit-alphabet-audio --strict`, `audit-app-shell`.
- Cache bump: new `CACHE_NAME` (v437 shipped with 0B) and matching `?v=`
  strings in `index.html` + `sw.js` for every changed loaded asset.
- Vanilla app, additive state, protected Alphabet, immutable history, no
  reopened locked decisions. If a locked requirement proves infeasible,
  stop and report in the PR — never redesign around it.
- Browser acceptance: run the spec §11 checklist rows that exist after
  this PR (fresh, progressed, tainted, migrated, imported profiles) in a
  statically served headless browser and paste the results.

## Delivery

One **draft** PR off `main`, branch `exec/workstream-0-boxes-0c-0e`,
titled `Workstream 0 · 0C–0E: provenance-bound results, labels, backup
validation`, three logical commits (0C / 0D / 0E), body summarising each
box, deliberate exclusions (0F, Sentence UI), full audit transcripts, and
browser acceptance notes. Then STOP for Claude review. If you cannot push,
deliver the complete diff as per-file code blocks plus transcripts.
