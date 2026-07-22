---
id: TASK-009
title: Form Checks B1 — declarative inventory, exact lesson routes, audit
assignee: gemini-flash
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

**Status: blocked-owner — plan §5 item count collides with the live curriculum
for the ㅎ-irregular check (and exposes three underspecified design decisions).
No code written; parked before claiming so nothing half-built lands on a branch.**

I re-checked every cited symbol against the live data (baseline drift check the
plan §"Repository references" requires) before coding. The route IDs all resolve
(`s2-grammar-u1-l1/l2`, `s3-grammar-u2-l1/l2`, `s5-grammar-u3-l1/l2`,
`s7-grammar-u4-l1..l4` exist verbatim in `words_lesson_plan.js`; sentence lessons
carry `sentenceIds`, and all 4177 sentence rows already map to a supporting
lesson). The blocker is pool sufficiency (plan §3 + audit §9.8), which B1's gate
(§12 "all routes and pools green") forces me to satisfy.

### Hard blocker — `form-check-irregular-h` cannot reach 10 items

Plan §5 fixes every irregular-family check at **10 items** with unique targets
per session (§3). Measured against `words_curated_core.js` (the loaded global the
check must draw from), the irregular families have this many words:

| family | words in curriculum | unique (word × 5-form) targets |
|---|---:|---:|
| ㄷ (`-d`) | 2 (듣다, 걷다) | 10 (exactly) |
| ㅂ (`-b`) | 8 | 40 |
| ㅅ (`-s`) | 2 (짓다 ×2 senses) | 10 by wordId (5 unique surfaces) |
| **ㅎ (`-h`)** | **1 (빨갛다 only)** | **5** |
| 르 (`-reu`) | 3 | 15 |
| ㄹ-deletion (`-rieul`) | 13 | 65 |

(The 5 forms are the inflect engine's `polite, formal, past, honorific,
attributive`.) There is exactly **one** ㅎ-irregular word in the whole curriculum
(`w1914_ppalgata` 빨갛다; confirmed no 파랗다/노랗다/하얗다/그렇다 etc. exist), so the
ㅎ check can produce at most **5** unique targets — half its mandated 10. Per
plan §3 the audit must fail an insufficient pool rather than duplicate targets,
and §9.8 is in my required subset (items 1–8), so I cannot make B1 green with the
plan's stated count. I will not silently change a plan-§5 item count or drop one
of the "all 17" checks — that is a design call for the owner/Sol.

**Decision needed (pick one):**
1. **Reduce `form-check-irregular-h` itemCount** to the real pool (≤5; note ㄷ and
   ㅅ sit at exactly 10 and are fragile), amending plan §5; or
2. **Add more ㅎ-irregular words** (파랗다/노랗다/하얗다…) to the Words curriculum —
   but that is Track-H/bank work outside B1, touches Words data that is read-only
   for Sentences/Form-Checks work, and needs audio regen; or
3. **Defer the ㅎ check** (ship 16 now, mark ㅎ unavailable until the bank grows).

### Secondary design decisions the instruction leaves open

These I can implement either way, but they change the blueprint/audit shape, so
resolving them together with the above avoids a rework loop:

- **Target-key definition for form checks.** To reach 10 items, irregular checks
  must key targets by `(wordId × formName)`, not by word alone. Confirm this is
  the intended "canonical target key" (§3). (ㅅ then passes only because the two
  짓다 senses are distinct word IDs sharing a surface.)
- **Item-6 granularity ("item tested before its lesson").** Fine-grained
  per-target gating needs generated items (a B2 runner concern). At B1 data level
  I'd enforce a *milestone* proxy (competency `firstTeachingUnitId` ≤ unlock
  section), deferring per-target gating to B2. Confirm.
- **`form-check-connectives` unlock vs pool.** The binding correction routes
  later-scope connectives to `s7-grammar-u4-l3/l4`, but `s3-grammar-u2-l1` teaches
  only 7 connectives (< 12 items); the pool must include l3 (8) + l4 (7) = 22.
  If the pool includes l3/l4 targets, fine-grained item-6 would require the unlock
  to expand beyond the plan's stated `s3-grammar-u2-l1`. Confirm whether to (a)
  keep unlock = l1 and rely on the B1 milestone proxy + B2 per-target gating, or
  (b) expand the unlock to `{l1, l3, l4}` now (deviates from plan §5 unlock).
- **`form-check-polite-present` pool.** Section 1 has only 3 predicates, so a
  10-item check needs sentence-blank frames (present-polite sentence rows) and/or
  predicates taught past the "first Section 1 predicate lesson" unlock. Confirm
  the intended pool source.

I have the data indexes and pool derivations prototyped (discarded, not
committed), so once the four decisions above are settled I can build
`form_check_blueprints.js` + `scripts/audit-form-checks.mjs` and go green quickly.

## Handoff
