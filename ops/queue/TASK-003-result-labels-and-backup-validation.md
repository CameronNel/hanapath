---
id: TASK-003
title: Workstream 0 Box 0E — result labels, disclosure copy, backup import validation
assignee: qwen
status: ready
branch: task/003-result-labels
depends_on: [TASK-002]
verify:
  - node --check app.js sw.js exam_integrity.js
  - node scripts/audit-exam-integrity.mjs
  - node scripts/audit-app-shell.mjs
priority: 1
claimedAt: null
pr: null
---
## Instruction

Implement Box 0E per `docs/INTEGRITY_AND_PROVENANCE_SPEC_DRAFT.md` §§7.3,
8, 9 and the box-0E section ("Commit 3") of
`docs/CODEX_WORKSTREAM_0_COMPLETION_PROMPT.md` (0E only; one PR).

Key points: result surfaces (Hangul + Words result screens, exam hub
cards, result details) show exactly `HanaPath result` / `Practice result`
/ `Legacy result · provenance incomplete` where a stored record backs the
display; Practice copy per spec §8.4; prohibited wording (`official`,
`verified`, `certified`, `tamper-proof`, TOPIK/CEFR equivalence)
audit-enforced; result details expose blueprint/engine/bank versions,
seed where present, status; full device-local disclosure one interaction
from every result card and in exam help. Do NOT add Sentence-exam UI.
Backup import validation rejects malformed/duplicate attempt IDs, broken
linkage, impossible statuses before replacing state; export must include
integrity collections (assert). Extend the integrity audit to complete
the full §10 1–32 contract, including copy checks and malformed-import
fixtures. Cache bump. Browser-acceptance the §11 rows that exist after
this box; paste results in the PR.

## Report

## Handoff
