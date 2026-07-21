---
id: TASK-010
title: Words C1 — additive lesson s3-grammar-u2-l3 (typed past & negation production)
assignee: opus
status: ready
branch: task/010-past-negation-lesson
depends_on: []
verify:
  - node --check words_lesson_plan.js app.js sw.js
  - node scripts/audit-words-data.mjs --strict
  - node scripts/build-word-exam-competency-map.mjs --check
  - node scripts/audit-word-exams.mjs
  - node scripts/audit-app-shell.mjs
priority: 2
claimedAt: null
pr: null
---
## Instruction

Implement box C1 of `docs/WORDS_PAST_NEGATION_PRODUCTION_PLAN_DRAFT.md`
§§0–3 and 13: the additive lesson `s3-grammar-u2-l3` (과거와 부정 만들기 ·
Producing Past and Negation) with the §2.2 sequence and §2.3 16-item
allocation; past targets via `HANAPATH_INFLECT.conjugate(..., "past")`
eligibility rules (§3.1); negation via authored finite frames only (§3.2 —
the engine has NO negation form; never pretend it does); old-save
migration per §1.2 (never uncrown, add the production milestone). Do NOT
flip `scoredProduction`, do NOT touch blueprints (those are C2/C3).
IMPORTANT — audio: any new Korean strings normally require the offline
audio pipeline (`.agents/AGENTS.md`), which needs the owner's environment.
Prefer composing items from Korean strings that already exist in
`audio_map.js`; if the lesson genuinely needs new Korean text, stop and
set `status: blocked-owner` listing the exact strings needing generation
rather than shipping silent audio. Cache bump.

## Report

## Handoff
