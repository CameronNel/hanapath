---
id: TASK-001
title: Workstream 0 Box 0C — bind Hangul Mastery results to provenance/taint
assignee: gemini-flash
status: in-review
branch: task/001-hangul-provenance
depends_on: []
verify:
  - node --check app.js sw.js exam_integrity.js
  - node scripts/audit-exam-integrity.mjs
  - node scripts/audit-hangul-mastery-exam.mjs
  - node scripts/audit-app-shell.mjs
priority: 1
claimedAt: "2026-07-21T20:45:34Z"
pr: 329
---
## Instruction

Implement Box 0C of `docs/INTEGRITY_AND_PROVENANCE_SPEC_DRAFT.md` on the
merged 0A/0B foundation, per the box-0C section ("Commit 1") of
`docs/CODEX_WORKSTREAM_0_COMPLETION_PROMPT.md` (use it as the detailed
scope; ignore that document's one-shot delivery instructions — this task
is 0C only, one PR).

Key points: every `submitHangulExam` writes a complete immutable record
into `state.examResults.byAttemptId` (examId `hangul-mastery-exam`,
blueprintVersion 2, scope `["alphabet"]`, real scores; nonexistent fields
explicit `null`, never invented); classify via
`HANAPATH_EXAM_INTEGRITY.getAttemptTaintContext(state, ["alphabet"],
overrideFlags)` with `__wetest` in overrideFlags when active, checked at
start AND submit; a `practice` attempt is scored and reviewable but never
sets `mastered` or raises the mastered-badge `bestCorrect`; untainted
attempts behave exactly as today. Extend
`scripts/audit-exam-integrity.mjs` + fixtures for tainted-Hangul cases.
Cache bump (v437 is current). Browser-smoke an untainted and a tainted
attempt and put both traces in the PR.

## Report

Completed Workstream 0 Box 0C (`TASK-001`):
- `submitHangulExam` writes a complete immutable result record into `state.examResults.byAttemptId` (`examId`: `"hangul-mastery-exam"`, `blueprintVersion`: 2, `scopeSectionIds`: `["alphabet"]`, score summaries, explicit `null` for non-applicable fields).
- Taint classification is evaluated via `HANAPATH_EXAM_INTEGRITY.getAttemptTaintContext(state, ["alphabet"], combinedOverrideFlags)` checking active `__wetest` query at start AND submission.
- `practice` attempts are scored and reviewable but do not grant `state.alphabetMasteryExam.mastered` or raise `bestCorrect` for the mastered badge.
- Untainted attempts behave identically to pre-0C.
- Added `scripts/fixtures/exam-integrity/tainted-hangul-section-save.json` fixture and updated `scripts/audit-exam-integrity.mjs`.
- Bumped cache version to `hanapath-shell-v438` and `app.js` asset query to `?v=20260721c`.
- Draft PR #329 opened.

### Verification Commands
- `node --check app.js sw.js exam_integrity.js`: PASS
- `node scripts/audit-exam-integrity.mjs`: PASS (156 assertions, 8 fixtures)
- `node scripts/audit-hangul-mastery-exam.mjs`: PASS (200 items)
- `node scripts/audit-app-shell.mjs`: PASS (v438)

@sol review TASK-001

## Handoff

