---
id: TASK-004
title: Sentence exam A1/A2 tooling — eligibility schema, census, and fail-loudly audit
assignee: opus
status: ready
branch: task/004-sentence-eligibility-schema
depends_on: []
verify:
  - node --check sentence_exam_eligibility.js scripts/audit-sentence-eligibility.mjs
  - node scripts/audit-sentence-eligibility.mjs --allow-incomplete
  - node scripts/audit-sentences-data.mjs --strict
  - node scripts/audit-app-shell.mjs
priority: 2
claimedAt: null
pr: null
---
## Instruction

Build the data layer for boxes A1/A2 of
`docs/SENTENCE_MASTERY_EXAM_SPEC_DRAFT.md` §§5–6 — the schema and audit
tooling ONLY; row classification itself is done by gemini-flash in
TASK-005..008 and human-adjudicated by Sol.

Deliver: (1) `sentence_exam_eligibility.js` exposing
`window.HANAPATH_SENTENCE_EXAM_ELIGIBILITY` exactly per spec §5.1
(schemaVersion, revision, `reviewedRows` keyed by row id with typedClass /
examPromptEn / canonicalTargetKey / acceptedAnswers / eligibleModes /
primaryCompetencies / supportingLessonIds / minimumSectionOrder /
exclusionReasons / reviewStatus / reviewedAt / reviewerNote), seeded with
rows `s0001–s0020` fully classified as worked examples; (2)
`scripts/audit-sentence-eligibility.mjs` implementing spec §5.4 approval
requirements and §6 census: per-tag `E_t` computation over approved rows,
the binding `M_t = max(5q_t, q_t + r_t)` floors from §6.2, the 🔒
`E_future < 25` hard-fail message from §6.3, canonical-target
deduplication via `normalizeSentenceExamAnswer` (§4.1), and an
`--allow-incomplete` mode that reports coverage progress without failing
while classification is underway (strict mode is the default and fails on
unreviewed rows); (3) a short authoring guide
`docs/SENTENCE_ELIGIBILITY_AUTHORING.md` for the batch workers: the three
classes with the spec §4.2 decision rules, worked accept/reject/exclude
examples from §4.2's own worked items, and the prompt-design rules table
from spec §3.5 of the Phase 1 research report. Load the new data file in
`index.html`/`sw.js` with cache bump. No runner, no UI.

## Report

## Handoff
