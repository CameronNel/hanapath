# QWEN_HANDOVER.md — Words C1: Past & Negation Production Lesson

**Date:** 2026-07-22
**Branch:** `words-c1-past-negation-production` (off fresh `origin/main` at `1f89f4df`)
**Task:** Workstream C, Box C1 — authored typed-production lesson `s3-grammar-u2-l3`

## Original task and intended outcome

Add an additive lesson `s3-grammar-u2-l3` ("과거와 부정 만들기 · Producing Past
and Negation") with 16 authored typed-production items teaching polite past
forms and reviewed negation patterns (안, 못, -지 않아요, -지 못해요). This
unblocks Form Checks B5 and is the last big code piece before the exam
programme is code-complete.

## Work completed

### 1. Authored-item pathway in `app.js` (the architectural blocker)

- **`appendAuthoredItemQuestions(questions, lesson)`** — new function that
  converts per-item `{prompt, answer, acceptedAnswers, ...}` descriptors from
  the lesson plan into question descriptors the word-lesson check renderer
  already handles. Modelled on the Form Checks runner's isolated authored-item
  approach (see `FORM CHECKS · Workstream B` in app.js).
- **`buildWordLessonQuestions`** — restructured from two return paths to
  if/else with a single return, calling `appendAuthoredItemQuestions` before
  `ensureEveryWordTested`.
- **`answerWordLessonTyped`** — now checks `question.acceptedAnswers` (finite
  set from the authored item) when present; falls back to
  `isWordTypedCorrect(typed, word)` for normal items. Also guards
  `view.typedAttempts[question.wordId]` with `if (question.wordId)`.
- **`getSyllableTilesForTarget(target)`** — new helper extracted from
  `getWordSyllableTiles`; the check renderer now uses `question.typeTarget`
  (the authored answer) for syllable tiles instead of the word's base form.

### 2. Lesson data in `words_lesson_plan.js`

Added `authoredItems` array (16 items) to the existing `s3-grammar-u2-l3`
skeleton:

| # | Category | Target | Answer | Source |
|---|----------|--------|--------|--------|
| 1 | polite-past typed | 보다 | 봤어요 | inflect:past |
| 2 | polite-past typed | 쓰다 | 썼어요 | inflect:past |
| 3 | polite-past typed | 읽다 | 읽었어요 | inflect:past |
| 4 | polite-past typed | 듣다 (ㄷ) | 들었어요 | inflect:past |
| 5 | past-context | 보다 | 봤어요 | inflect:past |
| 6 | past-context | 읽다 | 읽었어요 | inflect:past |
| 7 | 안 production | 읽다 | 안 읽어요 | authored:pattern |
| 8 | 안 production | 보다 | 안 봐요 | authored:pattern |
| 9 | 못 production | 쓰다 | 못 써요 | authored:pattern |
| 10 | 못 production | 듣다 | 못 들어요 | authored:pattern |
| 11 | -지 않아요 | 읽다 | 읽지 않아요 | authored:pattern |
| 12 | -지 않아요 | 보다 | 보지 않아요 | authored:pattern |
| 13 | -지 못해요 | 쓰다 | 쓰지 못해요 | authored:pattern |
| 14 | -지 못해요 | 듣다 | 듣지 못해요 | authored:pattern |
| 15 | mixed (past+안) | 읽다 | 안 읽었어요 | authored:pattern |
| 16 | mixed (past+long inability) | 쓰다 | 쓰지 못했어요 | authored:pattern |

**Target constraint:** Only 4 verbs are taught before `s3-grammar-u2`:
읽다, 듣다, 쓰다, 보다 (all in s1–s2). No adjectives. These 4 are reused
across all 16 items — pedagogically sound (same verbs, different grammar).

### 3. Cache bump

- `CACHE_NAME`: `hanapath-shell-v441` → `hanapath-shell-v442`
- Asset revision: `20260722c` → `20260722d`
- Updated in: `sw.js`, `index.html`, `app.js` (EXAM_INTEGRITY constants),
  `scripts/audit-exam-integrity.mjs` (hard-asserted strings)
- `words_lesson_plan.js` version: `20260720w` → `20260722d`

## Files changed and why

| File | Change |
|------|--------|
| `app.js` | Authored-item pathway, syllable tile refactor, answer checking, cache bump |
| `words_lesson_plan.js` | 16 authored items added to `s3-grammar-u2-l3` |
| `index.html` | Version string bumps |
| `sw.js` | Cache name + version string bumps |
| `scripts/audit-exam-integrity.mjs` | Version string assertions updated |

## Architectural / implementation decisions

1. **Authored items bypass `generateWordQuestionFor`** — that function only
   works for `pos: verb|adjective` and generates questions from word data.
   Authored items carry their own `{prompt, answer, acceptedAnswers}` and are
   appended after the normal cross-product.
2. **`acceptedAnswers` is a finite, reviewed set** — no automatic short↔long
   negation equivalence, no automatic 안↔못 exchange. Each prompt's context
   selects exactly one pattern.
3. **Negation frames are authored, not generated** — the inflection engine has
   no negation support (confirmed). Past forms use `inflect:past`; negation
   uses `authored:pattern`.
4. **`scoredProduction` stays `false`** — exam blueprints are untouched
   (that's Box C2/C3).
5. **Old-save migration is implicit** — the skeleton `s3-grammar-u2-l3` was
   already on `main`. Adding `authoredItems` is purely additive. Old learners
   who crowned `s3-grammar-u2` keep their crown; `l3` appears as a new
   available lesson.

## Validation run and results

| Audit | Result |
|-------|--------|
| `node --check app.js sw.js words_lesson_plan.js form_check_blueprints.js` | ✅ PASS |
| `audit-exam-integrity.mjs` | ✅ PASS |
| `audit-app-shell.mjs` | ✅ PASS (v442) |
| `audit-words-data.mjs --strict` | ✅ PASS (2028 words, 284 lessons) |
| `audit-form-checks.mjs` | ✅ PASS (17 checks) |
| `audit-hangul-mastery-exam.mjs` | ✅ PASS (200 items) |
| `build-word-exam-competency-map.mjs --check` | ✅ PASS (13 competencies) |
| `test-thin-lesson-heuristic.mjs` | ✅ PASS |
| `audit-sentences-data.mjs --strict` | ✅ PASS (4177 rows) |
| `audit-sentence-eligibility.mjs --allow-incomplete` | ✅ PASS (20/4177 reviewed) |
| `audit-alphabet-audio.mjs --strict` | ✅ PASS (77/77 tokens) |
| `audit-hangul-recognition.mjs` | ✅ PASS |
| `audit-premium-handwriting.mjs` | ✅ PASS |
| `audit-mobile-package.mjs` | ✅ PASS (after `npm run prepare:web`) |
| `audit-word-exams.mjs` | ⏳ STILL RUNNING (exams 1–9 passed; exam 10 + retention pending) |

## Known issues, unfinished work, risks, assumptions

1. **`audit-word-exams.mjs` was still running** when this handover was written.
   Exams 1–9 (250–500 seeds each) passed. Exam 10 (1000 seeds) and retention
   were still in progress. **This audit must be confirmed green before merging.**
2. **Negation audio missing** — the 10 negation answer strings (안 읽어요, etc.)
   are not in `audio_map.js`. The `speak()` function falls back to
   `speechSynthesis`. The 4 past-tense answers (봤어요, etc.) already have audio.
   `generate_assets.py` does not scan `authoredItems` — a future audio pass
   could add these strings to the manifest.
3. **Only 4 target verbs available** — 읽다, 듣다, 쓰다, 보다 are the only
   verbs taught before `s3-grammar-u2`. No adjectives. The plan's "하다" and
   "selected irregular families" (ㅂ, ㅅ, ㅎ, 르) are taught in s4+. This is
   an honest curriculum constraint, not a bug.
4. **Browser smoke test not run** — Playwright/Chromium path in the handover
   is for Linux CI. On this Windows machine, the browser test was not run.
   CI will cover this.
5. **No exam blueprint changes** — `scoredProduction` stays `false` for
   `past-tense` and `negation`. That's Box C2/C3.

## Next recommended steps

1. **Confirm `audit-word-exams.mjs` passes** (it was still running):
   ```bash
   node scripts/audit-word-exams.mjs
   ```
2. **Run browser smoke test** (on CI or with Playwright):
   - Serve statically, open with `?__wetest=1`
   - Navigate to Learn → Section 3 → Connecting clauses → l3
   - Verify 16 authored items render with typed input
   - Verify past forms grade correctly (봤어요, 썼어요, 읽었어요, 들었어요)
   - Verify negation frames grade correctly (안 읽어요, 못 써요, etc.)
   - Verify wrong answers are rejected
   - Verify old-save crown is preserved
3. **Push and open draft PR** off `main`:
   ```bash
   git push -u origin words-c1-past-negation-production
   ```
4. **Wait for CI green** (both "Validate static app" and "Prepare, audit, and
   build debug Android app"), then mark ready and squash-merge.
5. **After C1 merges:** Box C2 (competency-map flip) and C3 (v3 blueprints)
   become actionable. B5 (Form Checks past-negation upgrade) unblocks after
   C1 + C2.

## Useful commands for continuing

```bash
# Check word-exams audit (the slow one)
node scripts/audit-word-exams.mjs

# Full local gate
node scripts/audit-exam-integrity.mjs
node scripts/audit-app-shell.mjs
node scripts/audit-words-data.mjs --strict
node scripts/audit-form-checks.mjs
node scripts/audit-hangul-mastery-exam.mjs
node scripts/build-word-exam-competency-map.mjs --check
node scripts/test-thin-lesson-heuristic.mjs
node scripts/audit-sentences-data.mjs --strict
node scripts/audit-sentence-eligibility.mjs --allow-incomplete
node scripts/audit-alphabet-audio.mjs --strict
node scripts/audit-hangul-recognition.mjs
node scripts/audit-premium-handwriting.mjs
node scripts/audit-mobile-package.mjs

# Sync mobile/www before mobile audit
cd mobile && npm run prepare:web && cd ..

# Serve locally for browser testing
python -m http.server 8000

# Verify conjugation outputs
node -e "const I = require('./words_inflect.js'); console.log(I.conjugate('보다','verb',undefined,'past'));"
```

## Post-review fixes (2026-07-22)

Codex reviewed PR #337 and resolved every actionable finding before merge:

- Authored grammar-production questions now receive stable per-item attempt
  keys, so the result screen counts all 16 instead of collapsing them into
  four reused verb ids.
- Authored grammar attempts no longer call `recordVocabAttempt`; they remain
  part of the lesson score without promoting, resetting, or marking hard the
  reused verb's lexical SRS record.
- The 못 prompt now matches `못 써요` ("can't write right now").
- The mixed past-negation prompts explicitly request `안` and
  `-지 못했어요`, keeping their finite one-answer sets linguistically fair.
- Cache wiring advanced to `hanapath-shell-v443` / `20260722e`.

The full local gate passed after these changes, including all 10 word exams at
their full seed counts plus the 200-seed retention confirmation. A static
browser smoke test loaded the app and Vocabulary hub with the new asset
versions and no console warnings or errors.

## Original implementation commit

`6d9dc3cae89107e5912d5b8c911b62237b54e407`
