# One-shot prompt — build the Hangul Mastery Exam runner (Opus 4.8)

> **Paste-ready prompt.** Give this file to Opus 4.8 (or Sonnet 5) as its
> task: *"Read `docs/EXAM_RUNNER_ONE_SHOT_PROMPT.md` and execute it fully."*
> Everything below is addressed to that model.

---

You are finishing the **Hangul Mastery Examination** in HanaPath. The entire
structure already exists — Exam tab, exam hub, candidate-instructions screen,
the full 200-item bank, grading helpers, state record, and audit. Your job is
exactly one thing: **replace the `startHangulMasteryExamAttempt()` stub in
`app.js` with the complete exam runner**, plus its styles, and ship it.

## 0. Read first, in this order

1. `CLAUDE.md` — hard rules (vanilla app, no build step, cache bumps, audits).
2. `docs/EXAM_TAB_HANDOVER.md` — what is already built and where.
3. `docs/HANGUL_MASTERY_EXAM_CLAUDE_SPEC.md` — the full exam contract.
4. In `app.js`, the block starting at the comment
   `EXAM HUB · HANGUL MASTERY EXAMINATION` — your insertion point.

## 1. Owner decisions of 2026-07-20 — these OVERRIDE the spec where they conflict

The owner refined the flow after the spec was written. Three spec rules are
**superseded**:

1. **Forward-only navigation — no going back.** The spec's
   `Previous` control, `Flag for review`, editable-until-submission answers,
   and the 답안 확인 revisit screen are **removed**. The exam is one linear
   pass: answer (or skip) → **Next** locks the item permanently. Before the
   final submission there is a single confirm dialog showing how many items
   were left unanswered — but no way to return to them.
2. **Full answer review at the end.** The spec's "do not expose the full
   answer key" rule is dropped. **After** submission, the results flow shows a
   complete per-item review: the prompt, the candidate's answer, the correct
   answer, and a ✓/✗ mark, grouped by part. (Still absolutely nothing —
   no correct/incorrect signal — during the exam itself.)
3. **A polished score screen — "real exam simulation."** Results are a
   proper ceremony, not a plain list (see §4).

Everything else in the spec stands: 6-option MCQs, per-attempt reshuffling of
item order within parts and of MCQ options, audio ≤ 2 plays per item, 90-min
visible countdown, NFC strict typed grading, blank drawing canvases with
hidden targets, no reference/hints/teaching copy while the exam is active,
quit = attempt discarded, and **mastery only at exactly 200/200**
(`correct === 200 && total === 200 && unanswered === 0 && ungraded === 0` —
`unanswered`/skipped items simply score 0 and mastery is impossible).

## 2. Copy the Hangul learn-phase look — do not invent a new visual language

The owner wants the exam to feel exactly as clean as the alphabet lessons.
Reuse these existing patterns (grep them in `app.js` / `styles.css`):

- **Question screens:** the drill-runner shell —
  `.lesson-player-wrap.alphabet-lesson-player` with a `.player-head` progress
  header, the question in the middle, and `.player-actions` at the bottom.
  MCQ options use the existing `.option` button style (prefix them
  ① ② ③ ④ ⑤ ⑥). Follow `renderDrillQuestion()` (~line 11550) as the layout
  reference, minus every teaching affordance.
- **Progress header:** part title (Korean + English) + "Question N of M" +
  the countdown. Model it on `alphabetDrillProgressHtml`/
  `alphabetPracticeProgressHtml` but **without** streaks/accuracy — the exam
  shows position and time only.
- **Results & score screens:** build them with `premiumCompletionHtml()`
  (~line 6141) — the aurora/emblem completion stage used at the end of every
  alphabet lesson. That IS the "nice screen":
  - 200/200 → `tone: "crown"`, confetti, `score: {value: "200/200"}`,
    "한글 완전 습득 · Hangul mastered", `completion-stats` tiles (time used,
    per-skill totals), then actions.
  - <200 → `tone: "neutral"` (sober, no confetti), the score, a per-part
    breakdown (part title · earned/total) highlighting weakest parts, and a
    "Route back to Stage 0X" action per missed skill.
  - Below the completion stage, the full per-item answer review (§1.2) in
    plain cards, collapsible per part.
- **Audio buttons, Korean keyboard input, and the writing canvas:** reuse the
  exact components the drills already use (`renderDrillAudioButtons`-style
  play buttons with a "plays left" counter, the typed-input used by typing
  drills, and the Hangul writing canvas + `HANGUL_STROKES` recognition
  adapter from `renderHangulWriting`). **No parallel engines.**

Neutral exam tone throughout the attempt: no hearts, XP, jokes, encouragement,
or auto-advance. Formality copy comes from the bank itself (`promptKo`,
section `titleKo`/`instructionKo`).

## 3. Runner flow (linear)

```
renderAlphabetExamHub → renderHangulMasteryExamIntro (both exist)
  → startHangulMasteryExamAttempt()          ← you build from here
      1. 소리 확인  audio check (play a sample via speak(); "I can hear it")
      2. 한글 입력 확인  keyboard check (type 한글; normalizeHangulExamInput)
      3. Parts 1–7 in order, each opened by a part title card
         (파트 N · titleKo · instructionKo · item count), then its items
         one at a time, forward-only:
           parts 1–5  six-option MCQ  (select → Next locks)
           part 6     Korean typed input (→ Next locks)
           part 7     blank canvas, Undo/Clear allowed, grade on Next via
                      recognition; only exact glyph + 'great' verdict = 1
                      mark; NEVER render item.target
      4. 최종 제출 confirm (shows unanswered count; no going back)
      5. Score ceremony + per-part breakdown + full answer review
```

Implementation notes:

- Attempt state lives in a module-level object (`hangulExamAttempt`), **not**
  persisted: `{items, answers, verdicts, audioPlays, startedAt, deadline}`.
  Quit/navigation away = attempt discarded — intercept the bottom nav and the
  detail-bar back button with a quit confirmation while `examActive === true`.
- While `examActive`: suppress every reference surface reachable from the
  runner (no All-Hangul board, no hint/reveal routes, no option audio
  previews for MCQ letter options, no tracing guides on the canvas).
- Timer: visible countdown from `bank.timeLimitMinutes`; at 0:00 auto-submit
  whatever is answered (unanswered items score 0).
- Grade Part 6 with `normalizeHangulExamInput(input) === item.answer`.
- On completion update `state.alphabetMasteryExam`
  (`attempts += 1`, `bestCorrect = max`, `mastered`, `completedAt`),
  `saveState()`. Never re-lock previously unlocked content.
- Retake button on the results screen → fresh shuffle, straight to Part 1
  (the intro screen is only required on the first entry).

## 4. Ship checklist (do all of it)

1. `node --check app.js hangul_mastery_exam.js sw.js`
2. `node scripts/audit-hangul-mastery-exam.mjs`
3. `node scripts/audit-alphabet-audio.mjs --strict`
4. `node scripts/audit-hangul-recognition.mjs`
5. `node scripts/audit-premium-handwriting.mjs`
6. `node scripts/audit-app-shell.mjs`
7. Bump `CACHE_NAME` in `sw.js` + matching `?v=` strings in `index.html` and
   `sw.js` for `app.js` and `styles.css` (CLAUDE.md rule 4).
8. Browser smoke test (serve `python -m http.server 8000`, headless Chromium
   is available): full exam pass end-to-end; six options render and reshuffle
   on retake; no Previous control exists; audio counter stops at 2; typed NFC
   grading; blank canvases; 199/200 → not mastered; 200/200 → mastered,
   crown screen, persists after reload; quit confirmation discards the
   attempt; old saves keep unlocked content.
9. Update `docs/EXAM_TAB_HANDOVER.md` §2 to "done" and note any deviations.
10. Branch off `main`, single-purpose PR. Per the README's **AI pull-request
    landing policy**, Opus/Sonnet-family models verify, mark ready, and merge
    automatically.

Done-when: spec §11, as amended by §1 above — the audit is green, the exam
runs end-to-end with zero teaching aids, answers appear only after
submission, and only a perfect 200/200 grants v2 mastery.
