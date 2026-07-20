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

## 2. What you must build (the one shot)

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
