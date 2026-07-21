# Exam tab handover — finish the Hangul Mastery Examination in one shot

> **Audience:** the next agent (Opus/Sonnet) finishing the exam runner.
> **Source of truth:** [`HANGUL_MASTERY_EXAM_CLAUDE_SPEC.md`](HANGUL_MASTERY_EXAM_CLAUDE_SPEC.md)
> — the complete product/pedagogy/data/grading contract. This file only tells
> you what is already built and exactly what remains.

## 1. What shipped in the structure PR (2026-07-20)

**Tab restructure (done, no follow-up needed):**

- The bottom nav is now **Learn · Exam · Progress** (`HUBS` in `app.js`,
  nav buttons in `index.html`).
- The old **Practice hub is merged into Learn.** Learn tiles come in two
  kinds: stage items (no flag → `openLearnStageMenu`) and drill items
  (`drill: true` → direct practice surface, the old Practice-hub behaviour).
  New drill item ids: `alphabet-practice`, `vocabulary-quiz`,
  `sentence-studio`, `listening-quiz`, `writing`.
- Old saved routes `{ hub: "practice", item: … }` are migrated in
  `normalizeRoute()` (`PRACTICE_ITEM_MIGRATION`). `LEGACY_ROUTE.practice` →
  `{ hub: "learn", item: "sentence-studio" }`, so every `showTab("practice")`
  call still works. **Note:** the *nav-tab/leaf* named `"practice"` (the
  Sentence Studio screen, `renderPracticeView`) is unrelated to the old hub
  and was intentionally left alone.
- All former Practice sub-screens (alphabet practice hub, writing hub, letter
  review, pronunciation drill, Hangul/premium writing return paths) now set
  `activeHub = "learn"` and back out to the Learn hub.

**Exam section scaffold (done):**

- `hangul_mastery_exam.js` — the complete 200-item bank as the browser global
  `window.HANGUL_MASTERY_EXAM`, generated verbatim from spec §6
  (120 MCQ / 40 typed / 40 draw across 7 sections, metadata per spec §5 plus
  `timeLimitMinutes: 90` and `audioPlayLimit: 2`). Loaded in `index.html`
  before `app.js` and cached in `sw.js` `APP_SHELL`.
- `scripts/audit-hangul-mastery-exam.mjs` — enforces every spec §7 invariant
  (counts, six unique options, answer-appears-once, full jamo coverage in
  Parts 1/6/7, NFC, unique ids, no answer leak in candidate copy, all
  `audioText` values resolve to non-empty files via `AUDIO_MAP`). **Green.**
  Keep it green; run it after any exam change.
- `app.js` exam block (search `EXAM HUB · HANGUL MASTERY EXAMINATION`):
  - `normalizeAlphabetMasteryExam()` + load-time backfill of
    `state.alphabetMasteryExam` (`{version: 2, bestCorrect, mastered,
    completedAt, attempts}` — spec §8; old saves keep unlocked content).
  - `getHangulMasteryExamBank()`, `normalizeHangulExamInput()` (NFC + trim).
  - `renderAlphabetExamHub()` — Exam ▸ Alphabet overview with the v2 result
    record and mastered/not-yet badge.
  - `renderHangulMasteryExamIntro()` — 수험 안내 candidate instructions.
  - `startHangulMasteryExamAttempt()` — **stub**: currently renders an
    "examination hall isn't open yet" placeholder. This is the one function
    you replace.
- `styles.css` — a small neutral `.exam-*` block (entry card, status row,
  rules list). Runner styles are yours to add.

## 2. What you must build (the one shot) — ✅ DONE (2026-07-20)

**Status: shipped.** The `startHangulMasteryExamAttempt()` stub is replaced by
the full forward-only attempt runner in `app.js` (search
`EXAM HUB · HANGUL MASTERY EXAMINATION`), with runner styles under the
`Exam attempt runner (2026-07-20)` block in `styles.css`. Caches bumped
(`sw.js` `CACHE_NAME` → `hanapath-shell-v434`; `app.js` → `?v=20260720j`,
`styles.css` → `?v=20260720h`). All six audits stay green and a headless
Chromium pass exercised the full flow (six options + reshuffle, audio limit
stops at 2, NFC typed grading, blank canvases with no target leak, real
recognizer awards the mark on a clean trace, 199/200 ≠ mastery, 200/200 →
crown + persists across reload, quit discards the attempt).

**Deviations / decisions worth noting:**

- **Pre-checks are gates, not scored items.** 소리 확인 plays a `가` sample via
  `speak()`; 한글 입력 확인 requires typing `한글` (NFC) before continuing.
- **Retake skips the pre-checks** and lands directly on the Part 1 intro card,
  per the one-shot prompt ("straight to Part 1"); the candidate-instructions
  screen is only shown on first entry.
- **Draw grading reuses the shared recognizer** (`getHangulWritingRecognizer` +
  `isHangulFreehandRecognitionMatch` + the `normalizeHangulInkStroke` /
  `cleanHangulInkStroke` ink primitives). The exam keeps its own lightweight
  canvas + pointer binding (id `examDrawCanvas`) so the guided-practice
  auto-check/feedback path never runs mid-exam — no parallel *engine*, just an
  isolated feedback-free capture surface.
- **Failed-attempt routing** maps each part to a representative alphabet stage
  (`EXAM_PART_STAGE`) and opens that stage (or the stage menu if locked); it
  never exposes teaching content while `examActive`.
- **Answer review** (owner override §1.2) is a collapsible per-part list shown
  only after submission; nothing signals correctness during the attempt.

> **⚠ Owner overrides (2026-07-20, after this file was first written):** the
> runner is **forward-only** (no Previous / flags / 답안 확인 revisit — Next
> locks each item), the **full per-item answer review is shown after
> submission** (superseding spec §3's answer-key secrecy), and results are a
> polished `premiumCompletionHtml()` score ceremony in the alphabet-lesson
> visual style. The authoritative, paste-ready build contract is
> **[`EXAM_RUNNER_ONE_SHOT_PROMPT.md`](EXAM_RUNNER_ONE_SHOT_PROMPT.md)** —
> where the list below or the spec conflicts with it, that file wins.

Replace the `startHangulMasteryExamAttempt()` stub with the full attempt
runner. The ordered contract is written as a comment directly above the stub
in `app.js`; it condenses spec §§1–6:

1. **Pre-checks:** 소리 확인 audio check, 한글 입력 확인 keyboard check.
2. **Attempt state (in memory, not persisted):** shuffle item order within
   each part and shuffle each MCQ's six options per attempt; track
   `{answers, flags, audioPlays, startedAt}`. Leaving discards the attempt.
3. **Exam-mode restrictions (spec §4):** an `examActive` flag that suppresses
   every reference/hint/reveal surface and intercepts navigation with a quit
   confirmation. No per-item feedback, no auto-advance, no gamified copy.
4. **Parts 1–5:** six-option MCQs (① – ⑥), explicit Prev/Next, Flag for
   review, Clear answer. 90-minute visible countdown; audio ≤ 2 plays/item.
5. **Part 6:** Korean keyboard input, graded strict-equality after
   `normalizeHangulExamInput`. **Part 7:** blank canvas, reuse the existing
   Hangul writing canvas + `HANGUL_STROKES` recognition adapter; only exact
   glyph + `'great'` verdict earns the mark; never render `target`.
6. **답안 확인 review screen** (unanswered + flagged) → **최종 제출** confirm.
7. **Grading (spec §3):** `mastered ⇔ correct === 200 && total === 200 &&
   unanswered === 0 && ungraded === 0`. No partial credit, no 85% threshold,
   `close` drawings score zero. Update `state.alphabetMasteryExam`
   (`bestCorrect`, `attempts`, `mastered`, `completedAt`), `saveState()`.
   Failed attempt → section-level missed skills + stage routes, never the
   full answer key.

Reuse existing engines only: `speak()`/`AUDIO_MAP` audio path, the Korean
keyboard input used by typing drills, Hangul composition utilities, the
writing canvas + recognition adapter, `getAlphabetProgress()`. Do **not**
create parallel engines (spec §9). How the exam relates to the legacy Stage 08
checkpoint (do not re-lock content) is spec §8.

## 3. Ship checklist for the runner PR

```bash
node --check app.js hangul_mastery_exam.js sw.js
node scripts/audit-hangul-mastery-exam.mjs
node scripts/audit-alphabet-audio.mjs --strict
node scripts/audit-hangul-recognition.mjs
node scripts/audit-premium-handwriting.mjs
node scripts/audit-app-shell.mjs
```

Bump `CACHE_NAME` in `sw.js` and the matching `?v=` strings in `index.html` +
`sw.js` for every file you touch (CLAUDE.md rule 4). Then run the browser
smoke tests in spec §10 (six options render, reshuffle on retake, audio play
limits, NFC grading, blank canvases, 199/200 ≠ mastery, 200/200 persists,
old saves keep unlocked content). Done-when is spec §11.

---

## Core Word Examination Suite (shipped 2026-07-20)

> **Source of truth:** [`CORE_WORD_EXAM_SPECS.md`](CORE_WORD_EXAM_SPECS.md).
> This section records the **actual shipped behaviour** and the deliberate
> deviations. The Suite sits beneath the Hangul Mastery Examination on the Exam
> tab (`HUB_DEFS.exam.items` → tile `corewords`, custom `wordExamHub`).

### Files

- **`word_exam_blueprints.js`** — `window.HANAPATH_WORD_EXAMS` (ten v2
  blueprints: IDs, order, scope, unlocks, item counts, times, macrostrand
  allocations §6.2, coverage floors, scoring bands §7.1, Exam 10 final layers +
  retention contract §7.2) and `window.HANAPATH_WORD_EXAM_COMPETENCIES` (the
  reviewed milestone map). Declarative only — no frozen item IDs.
- **`word_exam_engine.js`** — `window.HANAPATH_WORD_EXAM_ENGINE`: one pure,
  deterministic, seeded generator + grader + band evaluator, used **identically**
  by the browser runner and the audit. Never reads SRS/recent-history/error
  state. Memoized data build; annotated words for speed.
- **`scripts/build-word-exam-competency-map.mjs`** — first-gate report generator;
  re-derives the competency milestones from live data, fails on drift, writes
  `docs/CORE_WORD_EXAM_COMPETENCY_MAP.md`.
- **`scripts/audit-word-exams.mjs`** — implements every §9 hard failure across
  the mandated seed counts (250 section / 500 midterm / 1000 final; 200
  retention seeds), prints the content-validity matrix + exposure summary.
- **`app.js`** exam block (search `CORE WORD EXAMINATION SUITE`): the shared
  runner — `renderWordExamHub`, `renderWordExamIntro`, `startWordExamAttempt`,
  `renderWordExamAttempt` (Prev/Next/flag, two-play audio, no feedback),
  `renderWordExamReview` (pre-submission), `submitWordExamAttempt`,
  `renderWordExamResult` (band, strand profile, weak-unit routes, full
  post-submission review, retake). `normalizeWordExams` gives backward-
  compatible `state.wordExams` v2 persistence; retention windows via
  `wordExamRetentionStatus`. A query-gated (`?__wetest=1`) `window.__wordExamTest`
  hook exists for acceptance tests only.

### Behaviour confirmed by browser acceptance (26/26 checks)

Ten cards gate on section completion; runner opens with a live timer and no
correctness feedback; option select / flag / Prev / Next / review all work; a
perfect attempt passes and shows the full answer review; records persist across
reload; **Exam 10 retention**: a qualifying final opens the 60-item confirmation
only after 7 days, the confirmation avoids qualifying-attempt targets, and a
successful confirmation awards sticky **Core Words mastered**; the Hangul exam is
unchanged; no horizontal overflow at 375 px.

### Deliberate deviations / limitations (documented, not silent)

1. **Past & negation are recognition/context only — never scored typed
   production.** The live v2 path teaches `-았어요/었어요`, 안/못/지 않다/지 못하다 in
   `s3-grammar-u2-l2` with `ko-to-meaning / meaning-to-ko / sentence-blank /
   function-usage` — no typed-production practice. Per spec §3.3 the suite does
   **not** assign scored past/negation production quotas. Enforced by the
   competency gate + audit. See the follow-up curriculum issue.
2. **F "production where supported" is realised as context-driven
   `register-choice`** (scenario → uniquely appropriate produced form), not free
   typed conjugation. The spec forbids instruction-named form prompts ("Use the
   past tense"), which makes unambiguous free typed production impractical;
   typed lemma production supplies the P evidence. All register-choice options
   are inflection-engine outputs, so every tested form is engine-supported.
3. **`words_curriculum_v2.js` does not exist** as a standalone file; the v2
   curriculum lives in `words_lesson_plan.js` (the handover's filename was
   aspirational). The engine reads the live globals from that file.
