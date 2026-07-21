---
id: TASK-011
title: Refresh stale root README (Learn · Exam · Progress; current scale)
assignee: gemini-flash
status: merged
branch: task/011-readme-refresh
depends_on: []
verify:
  - node scripts/audit-app-shell.mjs
priority: 4
claimedAt: "2026-07-21T22:22:50+02:00"
pr: 328
---
## Instruction

`README.md` still describes the old Learn · Practice · Progress layout and
older curriculum scale. Update it to reflect reality per `index.html` and
`docs/EXAM_TAB_HANDOVER.md`: the Learn · Exam · Progress tabs, the Exam
tab contents (Hangul Mastery Examination; Core Word Examination Suite),
and current data scale (2,028 curated word senses; 4,177-sentence bank;
8/75/703 sentence curriculum). Keep the run instructions and product tone;
change nothing outside `README.md`. Do not describe unshipped features
(Sentence exams, Form Checks) as existing.

## Report

- Updated `README.md` to reflect the three-tab structure: **Learn · Exam · Progress**.
- Documented Exam tab contents: Hangul Mastery Examination (200 items) and Core Word Examination Suite (10 achievement exams with macrostrand scoring and retention confirmation).
- Updated data scale metrics: 2,028 curated word senses, 4,177-sentence bank, and 8-stage / 75-lesson / 703-item core sentence curriculum.
- Updated audit verification command suite and main files inventory.
- Verification command `node scripts/audit-app-shell.mjs` passed cleanly with 0 errors and 0 warnings.

## Handoff
