---
id: TASK-002
title: Workstream 0 Box 0D — bind Words results, qualification, retention to provenance/taint
assignee: opus
status: ready
branch: task/002-words-provenance
depends_on: [TASK-001]
verify:
  - node --check app.js sw.js exam_integrity.js
  - node scripts/audit-exam-integrity.mjs
  - node scripts/audit-word-exams.mjs
  - node scripts/audit-app-shell.mjs
priority: 1
claimedAt: null
pr: null
---
## Instruction

Implement Box 0D per `docs/INTEGRITY_AND_PROVENANCE_SPEC_DRAFT.md`
§§5.1–5.3 and 6.2, detailed in the box-0D section ("Commit 2") of
`docs/CODEX_WORKSTREAM_0_COMPLETION_PROMPT.md` (0D only; one PR).

Key points: every `submitWordExamAttempt` (full + confirmation) writes the
immutable record with real seed/blueprint/engine versions and exam scope;
classification via `getAttemptTaintContext(state, exam.scopeSectionIds,
overrideFlags)`, re-checked at submission; `practice` attempts never set
passed/distinguished/bestPct badges/masteryEarnedAt, never open or satisfy
retention, never store qualifyingTargetIds; retention records store
`qualifyingAttemptId` and append a `type: "retention"` relation; pairs
require same examId + blueprint major + both `hanaPath`; a retention
attempt with a tainted or provenance-incomplete qualifier becomes
practice. Full `audit-word-exams.mjs` must stay green. Heed the
acceptance-test trap in the Codex order: `__wetest` taints attempts, so
harness tests needing `hanaPath` status inject state programmatically.
Extend the integrity audit + fixtures (tainted qualifier, practice
retention pairing). Cache bump.

## Report

## Handoff
