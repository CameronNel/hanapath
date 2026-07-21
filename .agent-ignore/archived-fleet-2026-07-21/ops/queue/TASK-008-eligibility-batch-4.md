---
id: TASK-008
title: Sentence eligibility classification — batch 4 (s3151–s4177)
assignee: gemini-flash
status: ready
branch: task/008-eligibility-batch-4
depends_on: [TASK-004]
verify:
  - node --check sentence_exam_eligibility.js
  - node scripts/audit-sentence-eligibility.mjs --allow-incomplete
priority: 3
claimedAt: null
pr: null
---
## Instruction

Classify sentence rows `s3151`–`s4177` from `sentences_core.js` into the
eligibility schema shipped by TASK-004, following
`docs/SENTENCE_ELIGIBILITY_AUTHORING.md` and
`docs/SENTENCE_MASTERY_EXAM_SPEC_DRAFT.md` §4 exactly.

For every row: assign `typedClass` (canonical / finite / excluded with
explicit `exclusionReasons`), author a constrained `examPromptEn` for
non-excluded rows (time cue forces tense, addressee/setting forces
register, never name the grammar form), set `acceptedAnswers` (canonical
`korean` + only reviewed `acceptAlso` variants, max four), map
`supportingLessonIds` from `sentences_lesson_plan.js`, set
`minimumSectionOrder`, and set `reviewStatus: "proposed"` — Sol adjudicates
to `approved` at review. Be conservative: when a prompt cannot force a
unique answer, exclude with a reason rather than stretch. Never invent
`acceptAlso` variants that are not in the source row. Keep the additions
append-only; do not touch rows outside your range or any other file
except the eligibility data file.

## Report

## Handoff
