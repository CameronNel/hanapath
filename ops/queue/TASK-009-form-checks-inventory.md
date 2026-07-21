---
id: TASK-009
title: Form Checks B1 — declarative inventory, exact lesson routes, audit
assignee: qwen
status: ready
branch: task/009-form-checks-inventory
depends_on: []
verify:
  - node --check form_check_blueprints.js scripts/audit-form-checks.mjs
  - node scripts/audit-form-checks.mjs
  - node scripts/audit-app-shell.mjs
priority: 2
claimedAt: null
pr: null
---
## Instruction

Implement box B1 of `docs/FORM_CHECKS_PLAN_DRAFT.md`: the declarative
inventory (`form_check_blueprints.js` → `window.HANAPATH_FORM_CHECKS`, all
17 checks from plan §5 with ids, bilingual names, item counts, unlock
lessons, modes, route policies), and `scripts/audit-form-checks.mjs`
implementing plan §9 items 1–8 and 20–24 (the data-level subset; runner
checks come with B2). Binding correction from Claude's verification pass:
derive each irregular-family check's remediation route from the
competency map / per-family lesson data rather than hard-coding
`s7-grammar-u4-l2` for all six, and route later-scope connective errors
to `s7-grammar-u4-l3`/`l4` where those lessons teach the pattern —
verify every route ID against `words_lesson_plan.js` /
`sentences_lesson_plan.js` and fail the audit on unresolvable routes. No
runner, no UI, no Exam-tab changes. Load the file + cache bump.

## Report

## Handoff
