# HanaPath — Hangul Mastery Examination

> **Claude implementation handoff.** This document is the complete product, pedagogy, data, grading, and implementation contract for replacing the current short Stage 08 checkpoint with a proper cumulative Hangul examination.

## 0. Owner decision

- Stage 08 becomes a **formal 200-item comprehensive exam** covering Stages 01–07.
- The learner is labelled **Hangul mastered** only at **200/200 (100%)**.
- Every multiple-choice item has **exactly six options**: ① ② ③ ④ ⑤ ⑥.
- The exam includes **120 MCQs, 40 Korean-keyboard responses, and 40 handwriting responses**.
- The full set of **21 modern vowels and 19 modern initial consonants** is tested in recognition, keyboard production, and handwriting.
- No reference board, answer preview, hint, reveal, guide glyph, dictionary, Drill Lab, or lesson link is available while the exam is in progress.
- Do not give correct/incorrect feedback until the complete exam is submitted.

## 1. Intended learner experience

Use a sober Korean-exam presentation rather than a gamified lesson screen:

1. **수험 안내 · Candidate instructions**
2. **소리 확인 · Audio check**
3. **한글 입력 확인 · Korean keyboard check**
4. Seven numbered test parts
5. **답안 확인 · Review unanswered/flagged items**
6. **최종 제출 · Final submission**
7. Results only after submission

Use formal instruction patterns such as:

- `다음을 듣고 알맞은 것을 고르십시오.` — Listen and choose the correct answer.
- `다음 글자의 소리로 알맞은 것을 고르십시오.` — Choose the correct sound for the letter.
- `주어진 자모를 바르게 모아 쓴 것을 고르십시오.` — Choose the correctly assembled block.
- `한국어 키보드로 정확히 입력하십시오.` — Type it accurately with the Korean keyboard.
- `제시된 소리에 맞는 글자를 쓰십시오.` — Write the letter matching the sound.

The interface may show English beneath the Korean instruction, but it must not show teaching copy, mnemonics, romanization charts, or a reference list.

## 2. Exam structure

| Part | Korean title | Skill | Type | Items | Marks | Primary stages |
|---:|---|---|---|---:|---:|---|
| 1 | 자모 식별 | Identify every vowel and consonant from a sound/audio cue | MCQ | 40 | 40 | 01, 02, 04, 05 |
| 2 | 대조와 자모 관계 | Distinguish tense/aspirated families and compound-vowel relationships | MCQ | 20 | 20 | 04, 05 |
| 3 | 글자 짜임 | Block geometry, silent ㅇ, composition, decomposition | MCQ | 20 | 20 | 03 |
| 4 | 받침 | Seven basic final sounds and written batchim identification | MCQ | 20 | 20 | 06 |
| 5 | 낱말 읽기 | Decode short real Korean words directly from blocks | MCQ | 20 | 20 | 07 |
| 6 | 한글 입력 | Produce all 40 jamo through Korean-keyboard syllable entry | Typed | 40 | 40 | 01, 02, 04, 05 |
| 7 | 글자 쓰기 | Draw all 40 modern jamo from memory | Drawing | 40 | 40 | 01, 02, 04, 05 |
| **Total** |  |  |  | **200** | **200** | **All stages** |

Recommended exam time: **90 minutes**, with a visible countdown but no forced per-question timer. Audio prompts may be played **at most twice**. Answers remain editable until final submission.

## 3. Mastery and scoring contract

```js
const mastered =
  score.correct === 200 &&
  score.total === 200 &&
  score.unanswered === 0 &&
  score.ungraded === 0;
```

- **200/200:** `Hangul mastered` / `한글 완전 습득`.
- **Anything below 200:** `Not yet mastered` / `아직 완전 습득 전`.
- Do not round, compensate, average sections, award partial credit, or use an 85% pass threshold.
- One item = one mark. A drawing marked `close` earns zero because this is the mastery exam, not practice.
- After a failed attempt, show section-level missed skills and route back to the relevant stage. Do not expose the full answer key before the next retake.
- A retake must reshuffle question order within each part and reshuffle all six MCQ options. Preserve the same coverage matrix.

## 4. Exam-mode restrictions

While `examActive === true`:

- Hide or disable **All Hangul**, reference buttons, dictionaries, hints, reveals, solution explanations, option audio previews, handwriting guides, tracing overlays, and practice links.
- Do not flash or color an answer as correct/incorrect.
- Do not auto-advance after answering; use explicit `Next` and `Previous` controls.
- Allow `Flag for review`, `Clear answer`, drawing `Undo`, and drawing `Clear`.
- Intercept app navigation and show a quit confirmation. Leaving the exam discards the attempt unless a resumable attempt is deliberately implemented.
- Use neutral exam copy. No hearts, streaks, XP, confetti, jokes, encouragement after individual items, or lesson-completion language.

## 5. Data contract Claude should implement

Recommended new browser-global data file:

```js
// hangul_mastery_exam.js — loaded before app.js
window.HANGUL_MASTERY_EXAM = {
  id: "hangul-mastery-v2",
  version: 2,
  requiredCorrect: 200,
  optionCount: 6,
  referenceAllowed: false,
  feedbackDuringExam: false,
  sections: [/* use the bank below */],
};
```

Question shapes:

```js
{ id, stage, type: 'mcq', promptKo, promptEn, stimulus, audioText, options, answer }
{ id, stage, type: 'type', promptKo, promptEn, audioText, answer, normalization: 'NFC_TRIM' }
{ id, stage, type: 'draw', promptKo, promptEn, audioText, target, requireExactGlyph: true, requireGreatVerdict: true }
```

## 6. Complete 200-item bank

### Part 1 — 자모 식별 · All-jamo identification (40 MCQs)

| ID | Stage | Prompt | Stimulus / audio | ① | ② | ③ | ④ | ⑤ | ⑥ | Answer |
|---|---|---|---|---|---|---|---|---|---|---|
| P1-V01 | Stage 01/04 | Which Hangul vowel represents the sound **a**? | Sound cue: a | ㅏ | ㅓ | ㅑ | ㅕ | ㅐ | ㅔ | ㅏ |
| P1-V02 | Stage 01/04 | Which Hangul vowel represents the sound **ya**? | Sound cue: ya | ㅑ | ㅏ | ㅕ | ㅒ | ㅛ | ㅠ | ㅑ |
| P1-V03 | Stage 01/04 | Which Hangul vowel represents the sound **eo**? | Sound cue: eo | ㅓ | ㅏ | ㅕ | ㅗ | ㅜ | ㅔ | ㅓ |
| P1-V04 | Stage 01/04 | Which Hangul vowel represents the sound **yeo**? | Sound cue: yeo | ㅕ | ㅓ | ㅑ | ㅖ | ㅛ | ㅠ | ㅕ |
| P1-V05 | Stage 01/04 | Which Hangul vowel represents the sound **o**? | Sound cue: o | ㅗ | ㅜ | ㅛ | ㅠ | ㅡ | ㅘ | ㅗ |
| P1-V06 | Stage 01/04 | Which Hangul vowel represents the sound **yo**? | Sound cue: yo | ㅛ | ㅗ | ㅠ | ㅑ | ㅕ | ㅜ | ㅛ |
| P1-V07 | Stage 01/04 | Which Hangul vowel represents the sound **u**? | Sound cue: u | ㅜ | ㅗ | ㅠ | ㅛ | ㅡ | ㅝ | ㅜ |
| P1-V08 | Stage 01/04 | Which Hangul vowel represents the sound **yu**? | Sound cue: yu | ㅠ | ㅜ | ㅛ | ㅑ | ㅕ | ㅣ | ㅠ |
| P1-V09 | Stage 01/04 | Which Hangul vowel represents the sound **eu**? | Sound cue: eu | ㅡ | ㅣ | ㅜ | ㅗ | ㅢ | ㅓ | ㅡ |
| P1-V10 | Stage 01/04 | Which Hangul vowel represents the sound **i / ee**? | Sound cue: i / ee | ㅣ | ㅡ | ㅟ | ㅢ | ㅔ | ㅐ | ㅣ |
| P1-V11 | Stage 01/04 | Which Hangul vowel represents the sound **ae**? | Sound cue: ae | ㅐ | ㅔ | ㅒ | ㅖ | ㅏ | ㅣ | ㅐ |
| P1-V12 | Stage 01/04 | Which Hangul vowel represents the sound **yae**? | Sound cue: yae | ㅒ | ㅖ | ㅐ | ㅔ | ㅑ | ㅕ | ㅒ |
| P1-V13 | Stage 01/04 | Which Hangul vowel represents the sound **e**? | Sound cue: e | ㅔ | ㅐ | ㅖ | ㅒ | ㅓ | ㅣ | ㅔ |
| P1-V14 | Stage 01/04 | Which Hangul vowel represents the sound **ye**? | Sound cue: ye | ㅖ | ㅒ | ㅔ | ㅐ | ㅕ | ㅑ | ㅖ |
| P1-V15 | Stage 01/04 | Which Hangul vowel represents the sound **wa**? | Sound cue: wa | ㅘ | ㅙ | ㅚ | ㅝ | ㅞ | ㅟ | ㅘ |
| P1-V16 | Stage 01/04 | Which Hangul vowel represents the sound **wae**? | Sound cue: wae | ㅙ | ㅘ | ㅚ | ㅞ | ㅔ | ㅐ | ㅙ |
| P1-V17 | Stage 01/04 | Which Hangul vowel represents the sound **oe**? | Sound cue: oe | ㅚ | ㅙ | ㅟ | ㅞ | ㅘ | ㅣ | ㅚ |
| P1-V18 | Stage 01/04 | Which Hangul vowel represents the sound **wo**? | Sound cue: wo | ㅝ | ㅞ | ㅟ | ㅘ | ㅙ | ㅜ | ㅝ |
| P1-V19 | Stage 01/04 | Which Hangul vowel represents the sound **we**? | Sound cue: we | ㅞ | ㅝ | ㅙ | ㅚ | ㅟ | ㅔ | ㅞ |
| P1-V20 | Stage 01/04 | Which Hangul vowel represents the sound **wi**? | Sound cue: wi | ㅟ | ㅚ | ㅞ | ㅢ | ㅣ | ㅜ | ㅟ |
| P1-V21 | Stage 01/04 | Which Hangul vowel represents the sound **ui**? | Sound cue: ui | ㅢ | ㅟ | ㅡ | ㅣ | ㅚ | ㅔ | ㅢ |
| P1-C01 | Stage 02/05 | Listen to the syllable and choose its initial consonant. | Audio syllable: 가 | ㄱ | ㅋ | ㄲ | ㄴ | ㄷ | ㅂ | ㄱ |
| P1-C02 | Stage 02/05 | Listen to the syllable and choose its initial consonant. | Audio syllable: 나 | ㄴ | ㄹ | ㄷ | ㅁ | ㅇ | ㄱ | ㄴ |
| P1-C03 | Stage 02/05 | Listen to the syllable and choose its initial consonant. | Audio syllable: 다 | ㄷ | ㅌ | ㄸ | ㄴ | ㄱ | ㅂ | ㄷ |
| P1-C04 | Stage 02/05 | Listen to the syllable and choose its initial consonant. | Audio syllable: 라 | ㄹ | ㄴ | ㅁ | ㄷ | ㅇ | ㅎ | ㄹ |
| P1-C05 | Stage 02/05 | Listen to the syllable and choose its initial consonant. | Audio syllable: 마 | ㅁ | ㅂ | ㄴ | ㅇ | ㄹ | ㅍ | ㅁ |
| P1-C06 | Stage 02/05 | Listen to the syllable and choose its initial consonant. | Audio syllable: 바 | ㅂ | ㅍ | ㅃ | ㅁ | ㄷ | ㅈ | ㅂ |
| P1-C07 | Stage 02/05 | Listen to the syllable and choose its initial consonant. | Audio syllable: 사 | ㅅ | ㅆ | ㅈ | ㅊ | ㅎ | ㄴ | ㅅ |
| P1-C08 | Stage 02/05 | Listen to the vowel-initial syllable and choose the silent initial placeholder. | Audio syllable: 아 | ㅇ | ㅎ | ㅁ | ㄴ | ㄱ | ㅅ | ㅇ |
| P1-C09 | Stage 02/05 | Listen to the syllable and choose its initial consonant. | Audio syllable: 자 | ㅈ | ㅊ | ㅉ | ㅅ | ㄷ | ㄱ | ㅈ |
| P1-C10 | Stage 02/05 | Listen to the syllable and choose its initial consonant. | Audio syllable: 차 | ㅊ | ㅈ | ㅉ | ㅋ | ㅌ | ㅎ | ㅊ |
| P1-C11 | Stage 02/05 | Listen to the syllable and choose its initial consonant. | Audio syllable: 카 | ㅋ | ㄱ | ㄲ | ㅌ | ㅍ | ㅊ | ㅋ |
| P1-C12 | Stage 02/05 | Listen to the syllable and choose its initial consonant. | Audio syllable: 타 | ㅌ | ㄷ | ㄸ | ㅋ | ㅍ | ㅊ | ㅌ |
| P1-C13 | Stage 02/05 | Listen to the syllable and choose its initial consonant. | Audio syllable: 파 | ㅍ | ㅂ | ㅃ | ㅋ | ㅌ | ㅁ | ㅍ |
| P1-C14 | Stage 02/05 | Listen to the syllable and choose its initial consonant. | Audio syllable: 하 | ㅎ | ㅇ | ㅊ | ㅅ | ㅋ | ㅍ | ㅎ |
| P1-C15 | Stage 02/05 | Listen to the syllable and choose its initial consonant. | Audio syllable: 까 | ㄲ | ㄱ | ㅋ | ㄸ | ㅃ | ㅆ | ㄲ |
| P1-C16 | Stage 02/05 | Listen to the syllable and choose its initial consonant. | Audio syllable: 따 | ㄸ | ㄷ | ㅌ | ㄲ | ㅃ | ㅉ | ㄸ |
| P1-C17 | Stage 02/05 | Listen to the syllable and choose its initial consonant. | Audio syllable: 빠 | ㅃ | ㅂ | ㅍ | ㄲ | ㄸ | ㅉ | ㅃ |
| P1-C18 | Stage 02/05 | Listen to the syllable and choose its initial consonant. | Audio syllable: 싸 | ㅆ | ㅅ | ㅉ | ㄲ | ㅎ | ㅈ | ㅆ |
| P1-C19 | Stage 02/05 | Listen to the syllable and choose its initial consonant. | Audio syllable: 짜 | ㅉ | ㅈ | ㅊ | ㅆ | ㄸ | ㅃ | ㅉ |

### Part 2 — 대조와 자모 관계 · Contrast families and vowel relationships (20 MCQs)

| ID | Stage | Prompt | ① | ② | ③ | ④ | ⑤ | ⑥ | Answer |
|---|---|---|---|---|---|---|---|---|---|
| P2-01 | Stage 05 | Which row is ordered **plain → aspirated → tense** for the ㄱ family? | ㄱ → ㅋ → ㄲ | ㄱ → ㄲ → ㅋ | ㅋ → ㄱ → ㄲ | ㄲ → ㅋ → ㄱ | ㄷ → ㅌ → ㄸ | ㅂ → ㅍ → ㅃ | ㄱ → ㅋ → ㄲ |
| P2-02 | Stage 05 | Which row is ordered **plain → aspirated → tense** for the ㄷ family? | ㄷ → ㅌ → ㄸ | ㄷ → ㄸ → ㅌ | ㅌ → ㄷ → ㄸ | ㄸ → ㅌ → ㄷ | ㄱ → ㅋ → ㄲ | ㅈ → ㅊ → ㅉ | ㄷ → ㅌ → ㄸ |
| P2-03 | Stage 05 | Which row is ordered **plain → aspirated → tense** for the ㅂ family? | ㅂ → ㅍ → ㅃ | ㅂ → ㅃ → ㅍ | ㅍ → ㅂ → ㅃ | ㅃ → ㅍ → ㅂ | ㄷ → ㅌ → ㄸ | ㅈ → ㅊ → ㅉ | ㅂ → ㅍ → ㅃ |
| P2-04 | Stage 05 | Which row is ordered **plain → aspirated → tense** for the ㅈ family? | ㅈ → ㅊ → ㅉ | ㅈ → ㅉ → ㅊ | ㅊ → ㅈ → ㅉ | ㅉ → ㅊ → ㅈ | ㄱ → ㅋ → ㄲ | ㅂ → ㅍ → ㅃ | ㅈ → ㅊ → ㅉ |
| P2-05 | Stage 05 | Which pair is the plain/tense ㅅ family? | ㅅ / ㅆ | ㅅ / ㅈ | ㅈ / ㅉ | ㄷ / ㄸ | ㅂ / ㅃ | ㄱ / ㄲ | ㅅ / ㅆ |
| P2-06 | Stage 05 | Which syllable begins with an **aspirated k** sound? | 카 | 가 | 까 | 타 | 파 | 차 | 카 |
| P2-07 | Stage 05 | Which syllable begins with a **tense tt** sound? | 따 | 다 | 타 | 짜 | 빠 | 까 | 따 |
| P2-08 | Stage 04 | Which vowel is the y-version of ㅏ? | ㅑ | ㅕ | ㅛ | ㅠ | ㅒ | ㅖ | ㅑ |
| P2-09 | Stage 04 | Which vowel is the y-version of ㅓ? | ㅕ | ㅑ | ㅛ | ㅠ | ㅖ | ㅒ | ㅕ |
| P2-10 | Stage 04 | Which vowel is the y-version of ㅗ? | ㅛ | ㅠ | ㅑ | ㅕ | ㅘ | ㅚ | ㅛ |
| P2-11 | Stage 04 | Which vowel is the y-version of ㅜ? | ㅠ | ㅛ | ㅑ | ㅕ | ㅝ | ㅟ | ㅠ |
| P2-12 | Stage 04 | Which compound vowel is built from ㅗ + ㅏ? | ㅘ | ㅙ | ㅚ | ㅝ | ㅞ | ㅟ | ㅘ |
| P2-13 | Stage 04 | Which compound vowel is built from ㅗ + ㅐ? | ㅙ | ㅘ | ㅚ | ㅞ | ㅐ | ㅔ | ㅙ |
| P2-14 | Stage 04 | Which compound vowel is built from ㅗ + ㅣ? | ㅚ | ㅙ | ㅟ | ㅞ | ㅘ | ㅢ | ㅚ |
| P2-15 | Stage 04 | Which compound vowel is built from ㅜ + ㅓ? | ㅝ | ㅞ | ㅟ | ㅘ | ㅙ | ㅚ | ㅝ |
| P2-16 | Stage 04 | Which compound vowel is built from ㅜ + ㅔ? | ㅞ | ㅝ | ㅟ | ㅙ | ㅚ | ㅔ | ㅞ |
| P2-17 | Stage 04 | Which compound vowel is built from ㅜ + ㅣ? | ㅟ | ㅚ | ㅞ | ㅢ | ㅝ | ㅣ | ㅟ |
| P2-18 | Stage 04 | Which compound vowel is built from ㅡ + ㅣ? | ㅢ | ㅟ | ㅚ | ㅞ | ㅡ | ㅣ | ㅢ |
| P2-19 | Stage 04 | Which answer correctly distinguishes the shapes ㅐ and ㅔ? | ㅐ uses ㅏ+ㅣ; ㅔ uses ㅓ+ㅣ | ㅐ uses ㅓ+ㅣ; ㅔ uses ㅏ+ㅣ | Both are ㅏ+ㅣ | Both are ㅓ+ㅣ | ㅐ is ㅗ+ㅣ; ㅔ is ㅜ+ㅣ | ㅐ is ㅡ+ㅣ; ㅔ is ㅜ+ㅓ | ㅐ uses ㅏ+ㅣ; ㅔ uses ㅓ+ㅣ |
| P2-20 | Stage 04 | Which answer correctly distinguishes the y-vowels ㅒ and ㅖ? | ㅒ is based on ㅐ; ㅖ is based on ㅔ | ㅒ is based on ㅔ; ㅖ is based on ㅐ | Both are based on ㅏ | Both are based on ㅓ | ㅒ is ㅛ+ㅣ; ㅖ is ㅠ+ㅣ | ㅒ is ㅘ; ㅖ is ㅝ | ㅒ is based on ㅐ; ㅖ is based on ㅔ |

### Part 3 — 글자 짜임 · Block geometry and composition (20 MCQs)

| ID | Stage | Prompt | ① | ② | ③ | ④ | ⑤ | ⑥ | Answer |
|---|---|---|---|---|---|---|---|---|---|
| P3-01 | Stage 03 | Where does a vertical vowel such as ㅏ sit in a CV block? | To the right of the consonant | Below the consonant | Above the consonant | Inside the consonant | Under a batchim | Outside the block | To the right of the consonant |
| P3-02 | Stage 03 | Where does a horizontal vowel such as ㅗ sit in a CV block? | Below the consonant | To the right of the consonant | Above the consonant | Inside the consonant | Under a batchim | Outside the block | Below the consonant |
| P3-03 | Stage 03 | What fills the initial consonant seat when a syllable begins with a vowel? | ㅇ | ㅎ | ㅁ | ㄴ | ㄱ | ㅅ | ㅇ |
| P3-04 | Stage 03 | Which block is built from ㄱ + ㅏ? | 가 | 거 | 고 | 구 | 까 | 카 | 가 |
| P3-05 | Stage 03 | Which block is built from ㄴ + ㅗ? | 노 | 누 | 너 | 나 | 로 | 도 | 노 |
| P3-06 | Stage 03 | Which block is built from ㅁ + ㅜ? | 무 | 모 | 머 | 마 | 부 | 누 | 무 |
| P3-07 | Stage 03 | Which block is built from ㅂ + ㅓ? | 버 | 바 | 보 | 부 | 퍼 | 머 | 버 |
| P3-08 | Stage 03 | Which block is built from ㅈ + ㅣ? | 지 | 자 | 저 | 주 | 치 | 찌 | 지 |
| P3-09 | Stage 03/05 | Which block is built from ㄲ + ㅘ? | 꽈 | 과 | 콰 | 꿔 | 까 | 꼬 | 꽈 |
| P3-10 | Stage 03/04 | Which block is built from ㅇ + ㅢ? | 의 | 이 | 으 | 위 | 외 | 웨 | 의 |
| P3-11 | Stage 03 | How does 마 split? | ㅁ + ㅏ | ㅂ + ㅏ | ㅁ + ㅓ | ㄴ + ㅏ | ㅁ + ㅗ | ㅁ + ㅏ + ㄴ | ㅁ + ㅏ |
| P3-12 | Stage 03 | How does 모 split? | ㅁ + ㅗ | ㅁ + ㅜ | ㅂ + ㅗ | ㅁ + ㅓ | ㄴ + ㅗ | ㅁ + ㅗ + ㄴ | ㅁ + ㅗ |
| P3-13 | Stage 03/06 | How does 한 split? | ㅎ + ㅏ + ㄴ | ㅎ + ㅓ + ㄴ | ㅇ + ㅏ + ㄴ | ㅎ + ㅏ + ㅇ | ㄱ + ㅏ + ㄴ | ㅎ + ㅏ | ㅎ + ㅏ + ㄴ |
| P3-14 | Stage 03/06 | How does 글 split? | ㄱ + ㅡ + ㄹ | ㄱ + ㅜ + ㄹ | ㅋ + ㅡ + ㄹ | ㄱ + ㅣ + ㄹ | ㄱ + ㅡ + ㄴ | ㄱ + ㅡ | ㄱ + ㅡ + ㄹ |
| P3-15 | Stage 03/06 | How does 밤 split? | ㅂ + ㅏ + ㅁ | ㅂ + ㅓ + ㅁ | ㅃ + ㅏ + ㅁ | ㅂ + ㅏ + ㅂ | ㅁ + ㅏ + ㅁ | ㅂ + ㅏ | ㅂ + ㅏ + ㅁ |
| P3-16 | Stage 03/06 | How does 공 split? | ㄱ + ㅗ + ㅇ | ㄱ + ㅜ + ㅇ | ㅋ + ㅗ + ㅇ | ㄱ + ㅗ + ㄴ | ㅇ + ㅗ + ㅇ | ㄱ + ㅗ | ㄱ + ㅗ + ㅇ |
| P3-17 | Stage 03/06 | Where is the batchim placed in a closed syllable block? | Along the bottom | At the top | To the right of the vowel | To the left of the onset | Outside the block | Between onset and vowel | Along the bottom |
| P3-18 | Stage 03/07 | What is the onset of 집? | ㅈ | ㅣ | ㅂ | ㅉ | ㅊ | ㅅ | ㅈ |
| P3-19 | Stage 03/07 | What is the medial vowel of 물? | ㅜ | ㅡ | ㅗ | ㅓ | ㅠ | ㅣ | ㅜ |
| P3-20 | Stage 03/07 | What is the final consonant of 문? | ㄴ | ㅁ | ㅇ | ㄹ | ㅂ | No final | ㄴ |

### Part 4 — 받침 · Final consonants (20 MCQs)

| ID | Stage | Prompt | ① | ② | ③ | ④ | ⑤ | ⑥ | Answer |
|---|---|---|---|---|---|---|---|---|---|
| P4-01 | Stage 06 | Which list contains the seven basic batchim end sounds? | k, n, t, l, m, p, ng | g, d, b, j, ch, h, s | a, eo, o, u, eu, i, e | k, r, s, h, y, w, ng | n, r, m, s, j, ch, h | k, n, d, r, b, g, h | k, n, t, l, m, p, ng |
| P4-02 | Stage 06 | What basic end sound does final ㄱ make? | k | n | t | l | m | ng | k |
| P4-03 | Stage 06 | What basic end sound does final ㄴ make? | n | k | t | l | m | ng | n |
| P4-04 | Stage 06 | What basic end sound does final ㄷ make? | t | k | n | l | p | ng | t |
| P4-05 | Stage 06 | What basic end sound does final ㄹ make? | l | n | t | m | p | ng | l |
| P4-06 | Stage 06 | What basic end sound does final ㅁ make? | m | n | l | p | k | ng | m |
| P4-07 | Stage 06 | What basic end sound does final ㅂ make? | p | m | t | k | n | ng | p |
| P4-08 | Stage 06 | What basic end sound does final ㅇ make? | ng | n | m | k | t | p | ng |
| P4-09 | Stage 06 | Which written finals collapse to the same **k** end sound? | ㄱ, ㄲ, ㅋ | ㄷ, ㅅ, ㅈ | ㅂ, ㅍ, ㅃ | ㄴ, ㄹ, ㅁ | ㅇ, ㅎ, ㅊ | ㄱ, ㄴ, ㄷ | ㄱ, ㄲ, ㅋ |
| P4-10 | Stage 06 | Which set belongs to the common **t**-sound final group? | ㄷ, ㅅ, ㅆ, ㅈ, ㅊ, ㅌ, ㅎ | ㄱ, ㄲ, ㅋ | ㅂ, ㅍ | ㄴ, ㄹ, ㅁ | ㅇ only | ㄷ, ㄴ, ㄹ | ㄷ, ㅅ, ㅆ, ㅈ, ㅊ, ㅌ, ㅎ |
| P4-11 | Stage 06 | Which written final joins ㅂ in the basic **p** end-sound group? | ㅍ | ㅃ | ㅁ | ㅌ | ㅋ | ㅎ | ㅍ |
| P4-12 | Stage 06 | Which consonant is the batchim in 악? | ㄱ | ㅇ | ㅏ | ㅋ | ㄴ | No final | ㄱ |
| P4-13 | Stage 06 | Which consonant is the batchim in 안? | ㄴ | ㅇ | ㅏ | ㅁ | ㄹ | No final | ㄴ |
| P4-14 | Stage 06 | Which consonant is written as the batchim in 옷? | ㅅ | ㅇ | ㅗ | ㄷ | ㅈ | No final | ㅅ |
| P4-15 | Stage 06 | Which consonant is the batchim in 달? | ㄹ | ㄷ | ㅏ | ㄴ | ㅁ | No final | ㄹ |
| P4-16 | Stage 06 | Which consonant is the batchim in 밤? | ㅁ | ㅂ | ㅏ | ㄴ | ㅇ | No final | ㅁ |
| P4-17 | Stage 06 | Which consonant is the batchim in 밥? | ㅂ | ㅃ | ㅏ | ㅁ | ㅍ | No final | ㅂ |
| P4-18 | Stage 06 | Which consonant is the batchim in 공? | ㅇ | ㄱ | ㅗ | ㄴ | ㅁ | No final | ㅇ |
| P4-19 | Stage 06 | Which block has final ㄴ? | 한 | 하 | 함 | 항 | 할 | 핫 | 한 |
| P4-20 | Stage 06 | Which block is open and has **no batchim**? | 가 | 각 | 간 | 갈 | 감 | 강 | 가 |

### Part 5 — 낱말 읽기 · Real-word decoding (20 MCQs)

| ID | Stage | Prompt | ① | ② | ③ | ④ | ⑤ | ⑥ | Answer |
|---|---|---|---|---|---|---|---|---|---|
| P5-01 | Stage 07 | Which word is built from ㅇ+ㅏ / ㄱ+ㅣ? | 아기 | 오이 | 우유 | 고기 | 아니 | 여기 | 아기 |
| P5-02 | Stage 07 | Which word is built from ㅇ+ㅗ / ㅇ+ㅣ? | 오이 | 아이 | 우유 | 오리 | 이유 | 여우 | 오이 |
| P5-03 | Stage 07 | Which word is built from ㅇ+ㅜ / ㅇ+ㅠ? | 우유 | 오이 | 이유 | 여우 | 아이 | 우비 | 우유 |
| P5-04 | Stage 07 | Which word is built from ㄴ+ㅏ / ㅁ+ㅜ? | 나무 | 나라 | 나비 | 마음 | 너무 | 나물 | 나무 |
| P5-05 | Stage 07 | Which word is built from ㅂ+ㅏ / ㄷ+ㅏ? | 바다 | 보다 | 바지 | 마다 | 파다 | 바닥 | 바다 |
| P5-06 | Stage 07 | Which word is built from ㅁ+ㅗ / ㅈ+ㅏ? | 모자 | 모두 | 마자 | 보자 | 모기 | 무지 | 모자 |
| P5-07 | Stage 07 | Which word is built from ㅅ+ㅏ / ㄹ+ㅏ+ㅁ? | 사람 | 사랑 | 바람 | 나라 | 사슴 | 살다 | 사람 |
| P5-08 | Stage 07 | Which word is built from ㄴ+ㅏ / ㄹ+ㅏ? | 나라 | 나무 | 바다 | 사라 | 노래 | 머리 | 나라 |
| P5-09 | Stage 07 | Which word is built from ㅁ+ㅓ / ㄹ+ㅣ? | 머리 | 미리 | 마리 | 거리 | 허리 | 무리 | 머리 |
| P5-10 | Stage 07 | Which word is built from ㄱ+ㅗ / ㄱ+ㅣ? | 고기 | 거기 | 아기 | 모기 | 고리 | 구기 | 고기 |
| P5-11 | Stage 07 | Which word is built from ㅎ+ㅏ / ㅁ+ㅏ? | 하마 | 하나 | 마마 | 하루 | 호마 | 하늘 | 하마 |
| P5-12 | Stage 07 | Which word is built from ㅅ+ㅏ / ㄱ+ㅘ? | 사과 | 사고 | 과자 | 가사 | 사자 | 소과 | 사과 |
| P5-13 | Stage 07 | Which word is built from ㅎ+ㅏ+ㄴ / ㄱ+ㅜ+ㄱ? | 한국 | 한글 | 한강 | 중국 | 한국어 | 하국 | 한국 |
| P5-14 | Stage 07 | Which word is built from ㅎ+ㅏ+ㄴ / ㄱ+ㅡ+ㄹ? | 한글 | 한국 | 한강 | 하늘 | 글자 | 한굴 | 한글 |
| P5-15 | Stage 07 | How does 밤 split? | ㅂ+ㅏ+ㅁ | ㅂ+ㅓ+ㅁ | ㅃ+ㅏ+ㅁ | ㅂ+ㅏ+ㅂ | ㅁ+ㅏ+ㅁ | ㅂ+ㅏ | ㅂ+ㅏ+ㅁ |
| P5-16 | Stage 07 | How does 문 split? | ㅁ+ㅜ+ㄴ | ㅁ+ㅡ+ㄴ | ㅂ+ㅜ+ㄴ | ㅁ+ㅜ+ㅇ | ㅁ+ㅓ+ㄴ | ㅁ+ㅜ | ㅁ+ㅜ+ㄴ |
| P5-17 | Stage 07 | How does 집 split? | ㅈ+ㅣ+ㅂ | ㅉ+ㅣ+ㅂ | ㅈ+ㅏ+ㅂ | ㅊ+ㅣ+ㅂ | ㅈ+ㅣ+ㅍ | ㅈ+ㅣ | ㅈ+ㅣ+ㅂ |
| P5-18 | Stage 07 | How does 밥 split? | ㅂ+ㅏ+ㅂ | ㅃ+ㅏ+ㅂ | ㅂ+ㅓ+ㅂ | ㅂ+ㅏ+ㅍ | ㅁ+ㅏ+ㅂ | ㅂ+ㅏ | ㅂ+ㅏ+ㅂ |
| P5-19 | Stage 07 | How does 공 split? | ㄱ+ㅗ+ㅇ | ㅋ+ㅗ+ㅇ | ㄱ+ㅜ+ㅇ | ㄱ+ㅗ+ㄴ | ㅇ+ㅗ+ㅇ | ㄱ+ㅗ | ㄱ+ㅗ+ㅇ |
| P5-20 | Stage 07 | Which word contains two open syllables with no batchim? | 바다 | 한글 | 한국 | 사람 | 공원 | 밥 | 바다 |

### Part 6 — 한글 입력 · Korean keyboard production (40 typed responses)

| ID | Stage | Prompt | Audio | Exact answer |
|---|---|---|---|---|
| P6-V01 | Stage 01/04 | Using the Korean keyboard, type the vowel syllable for **a**. | 아 | 아 |
| P6-V02 | Stage 01/04 | Using the Korean keyboard, type the vowel syllable for **ya**. | 야 | 야 |
| P6-V03 | Stage 01/04 | Using the Korean keyboard, type the vowel syllable for **eo**. | 어 | 어 |
| P6-V04 | Stage 01/04 | Using the Korean keyboard, type the vowel syllable for **yeo**. | 여 | 여 |
| P6-V05 | Stage 01/04 | Using the Korean keyboard, type the vowel syllable for **o**. | 오 | 오 |
| P6-V06 | Stage 01/04 | Using the Korean keyboard, type the vowel syllable for **yo**. | 요 | 요 |
| P6-V07 | Stage 01/04 | Using the Korean keyboard, type the vowel syllable for **u**. | 우 | 우 |
| P6-V08 | Stage 01/04 | Using the Korean keyboard, type the vowel syllable for **yu**. | 유 | 유 |
| P6-V09 | Stage 01/04 | Using the Korean keyboard, type the vowel syllable for **eu**. | 으 | 으 |
| P6-V10 | Stage 01/04 | Using the Korean keyboard, type the vowel syllable for **i / ee**. | 이 | 이 |
| P6-V11 | Stage 01/04 | Using the Korean keyboard, type the vowel syllable for **ae**. | 애 | 애 |
| P6-V12 | Stage 01/04 | Using the Korean keyboard, type the vowel syllable for **yae**. | 얘 | 얘 |
| P6-V13 | Stage 01/04 | Using the Korean keyboard, type the vowel syllable for **e**. | 에 | 에 |
| P6-V14 | Stage 01/04 | Using the Korean keyboard, type the vowel syllable for **ye**. | 예 | 예 |
| P6-V15 | Stage 01/04 | Using the Korean keyboard, type the vowel syllable for **wa**. | 와 | 와 |
| P6-V16 | Stage 01/04 | Using the Korean keyboard, type the vowel syllable for **wae**. | 왜 | 왜 |
| P6-V17 | Stage 01/04 | Using the Korean keyboard, type the vowel syllable for **oe**. | 외 | 외 |
| P6-V18 | Stage 01/04 | Using the Korean keyboard, type the vowel syllable for **wo**. | 워 | 워 |
| P6-V19 | Stage 01/04 | Using the Korean keyboard, type the vowel syllable for **we**. | 웨 | 웨 |
| P6-V20 | Stage 01/04 | Using the Korean keyboard, type the vowel syllable for **wi**. | 위 | 위 |
| P6-V21 | Stage 01/04 | Using the Korean keyboard, type the vowel syllable for **ui**. | 의 | 의 |
| P6-C01 | Stage 02/05 | Using the Korean keyboard, type the syllable heard in the audio (**g/k** initial + ㅏ). | 가 | 가 |
| P6-C02 | Stage 02/05 | Using the Korean keyboard, type the syllable heard in the audio (**n** initial + ㅏ). | 나 | 나 |
| P6-C03 | Stage 02/05 | Using the Korean keyboard, type the syllable heard in the audio (**d/t** initial + ㅏ). | 다 | 다 |
| P6-C04 | Stage 02/05 | Using the Korean keyboard, type the syllable heard in the audio (**r/l** initial + ㅏ). | 라 | 라 |
| P6-C05 | Stage 02/05 | Using the Korean keyboard, type the syllable heard in the audio (**m** initial + ㅏ). | 마 | 마 |
| P6-C06 | Stage 02/05 | Using the Korean keyboard, type the syllable heard in the audio (**b/p** initial + ㅏ). | 바 | 바 |
| P6-C07 | Stage 02/05 | Using the Korean keyboard, type the syllable heard in the audio (**s** initial + ㅏ). | 사 | 사 |
| P6-C08 | Stage 02/05 | Using the Korean keyboard, type the syllable made from silent initial ㅇ + ㅏ. | 아 | 아 |
| P6-C09 | Stage 02/05 | Using the Korean keyboard, type the syllable heard in the audio (**j** initial + ㅏ). | 자 | 자 |
| P6-C10 | Stage 02/05 | Using the Korean keyboard, type the syllable heard in the audio (**ch** initial + ㅏ). | 차 | 차 |
| P6-C11 | Stage 02/05 | Using the Korean keyboard, type the syllable heard in the audio (**aspirated k** initial + ㅏ). | 카 | 카 |
| P6-C12 | Stage 02/05 | Using the Korean keyboard, type the syllable heard in the audio (**aspirated t** initial + ㅏ). | 타 | 타 |
| P6-C13 | Stage 02/05 | Using the Korean keyboard, type the syllable heard in the audio (**aspirated p** initial + ㅏ). | 파 | 파 |
| P6-C14 | Stage 02/05 | Using the Korean keyboard, type the syllable heard in the audio (**h** initial + ㅏ). | 하 | 하 |
| P6-C15 | Stage 02/05 | Using the Korean keyboard, type the syllable heard in the audio (**tense kk** initial + ㅏ). | 까 | 까 |
| P6-C16 | Stage 02/05 | Using the Korean keyboard, type the syllable heard in the audio (**tense tt** initial + ㅏ). | 따 | 따 |
| P6-C17 | Stage 02/05 | Using the Korean keyboard, type the syllable heard in the audio (**tense pp** initial + ㅏ). | 빠 | 빠 |
| P6-C18 | Stage 02/05 | Using the Korean keyboard, type the syllable heard in the audio (**tense ss** initial + ㅏ). | 싸 | 싸 |
| P6-C19 | Stage 02/05 | Using the Korean keyboard, type the syllable heard in the audio (**tense jj** initial + ㅏ). | 짜 | 짜 |

Typed-answer normalization:

```js
function normalizeHangulExamInput(value) {
  return String(value || "").normalize("NFC").trim();
}
```

Do not accept romanization, spaces inside a one-syllable answer, compatibility-jamo decomposition, or an answer that only becomes correct after revealing the target.

### Part 7 — 글자 쓰기 · Handwriting from memory (40 drawings)

| ID | Stage | Prompt | Audio | Hidden target | Required grade |
|---|---|---|---|---|---|
| P7-V01 | Stage 01/04 | Draw the Hangul vowel that represents **a**. | 아 | ㅏ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-V02 | Stage 01/04 | Draw the Hangul vowel that represents **ya**. | 야 | ㅑ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-V03 | Stage 01/04 | Draw the Hangul vowel that represents **eo**. | 어 | ㅓ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-V04 | Stage 01/04 | Draw the Hangul vowel that represents **yeo**. | 여 | ㅕ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-V05 | Stage 01/04 | Draw the Hangul vowel that represents **o**. | 오 | ㅗ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-V06 | Stage 01/04 | Draw the Hangul vowel that represents **yo**. | 요 | ㅛ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-V07 | Stage 01/04 | Draw the Hangul vowel that represents **u**. | 우 | ㅜ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-V08 | Stage 01/04 | Draw the Hangul vowel that represents **yu**. | 유 | ㅠ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-V09 | Stage 01/04 | Draw the Hangul vowel that represents **eu**. | 으 | ㅡ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-V10 | Stage 01/04 | Draw the Hangul vowel that represents **i / ee**. | 이 | ㅣ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-V11 | Stage 01/04 | Draw the Hangul vowel that represents **ae**. | 애 | ㅐ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-V12 | Stage 01/04 | Draw the Hangul vowel that represents **yae**. | 얘 | ㅒ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-V13 | Stage 01/04 | Draw the Hangul vowel that represents **e**. | 에 | ㅔ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-V14 | Stage 01/04 | Draw the Hangul vowel that represents **ye**. | 예 | ㅖ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-V15 | Stage 01/04 | Draw the Hangul vowel that represents **wa**. | 와 | ㅘ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-V16 | Stage 01/04 | Draw the Hangul vowel that represents **wae**. | 왜 | ㅙ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-V17 | Stage 01/04 | Draw the Hangul vowel that represents **oe**. | 외 | ㅚ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-V18 | Stage 01/04 | Draw the Hangul vowel that represents **wo**. | 워 | ㅝ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-V19 | Stage 01/04 | Draw the Hangul vowel that represents **we**. | 웨 | ㅞ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-V20 | Stage 01/04 | Draw the Hangul vowel that represents **wi**. | 위 | ㅟ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-V21 | Stage 01/04 | Draw the Hangul vowel that represents **ui**. | 의 | ㅢ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-C01 | Stage 02/05 | Listen to 가 and draw its initial consonant. | 가 | ㄱ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-C02 | Stage 02/05 | Listen to 나 and draw its initial consonant. | 나 | ㄴ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-C03 | Stage 02/05 | Listen to 다 and draw its initial consonant. | 다 | ㄷ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-C04 | Stage 02/05 | Listen to 라 and draw its initial consonant. | 라 | ㄹ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-C05 | Stage 02/05 | Listen to 마 and draw its initial consonant. | 마 | ㅁ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-C06 | Stage 02/05 | Listen to 바 and draw its initial consonant. | 바 | ㅂ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-C07 | Stage 02/05 | Listen to 사 and draw its initial consonant. | 사 | ㅅ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-C08 | Stage 02/05 | Draw the silent initial consonant used before vowels. | 아 | ㅇ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-C09 | Stage 02/05 | Listen to 자 and draw its initial consonant. | 자 | ㅈ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-C10 | Stage 02/05 | Listen to 차 and draw its initial consonant. | 차 | ㅊ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-C11 | Stage 02/05 | Listen to 카 and draw its initial consonant. | 카 | ㅋ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-C12 | Stage 02/05 | Listen to 타 and draw its initial consonant. | 타 | ㅌ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-C13 | Stage 02/05 | Listen to 파 and draw its initial consonant. | 파 | ㅍ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-C14 | Stage 02/05 | Listen to 하 and draw its initial consonant. | 하 | ㅎ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-C15 | Stage 02/05 | Listen to 까 and draw its initial consonant. | 까 | ㄲ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-C16 | Stage 02/05 | Listen to 따 and draw its initial consonant. | 따 | ㄸ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-C17 | Stage 02/05 | Listen to 빠 and draw its initial consonant. | 빠 | ㅃ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-C18 | Stage 02/05 | Listen to 싸 and draw its initial consonant. | 싸 | ㅆ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |
| P7-C19 | Stage 02/05 | Listen to 짜 and draw its initial consonant. | 짜 | ㅉ | Exact glyph recognition AND standard stroke order/direction; only verdict 'great' earns the point. |

The `Hidden target` column is implementation data only. It must never be rendered to the candidate. The drawing canvas must begin blank: no ghost glyph, stroke dots, guide lines, demo animation, or `Help!` control.

## 7. Coverage invariants

Claude must add an audit that fails unless all of these are true:

```text
MCQ count = 120
Typed count = 40
Drawing count = 40
Total count = 200
Every MCQ has exactly 6 unique options
Every MCQ answer appears exactly once in its options
Part 1 targets all 21 vowels and all 19 consonants exactly once
Part 6 contains all 21 vowel demo syllables and all 19 consonant demo syllables
Part 7 targets all 40 modern jamo exactly once
Every Korean answer/target is NFC-normalized
No exam item exposes a reference, hint, reveal, or answer in learner-facing copy
All Korean audioText values exist in AUDIO_MAP or pass the approved audio fallback policy
```

## 8. Progress and migration

- Do not re-lock Words or other already-unlocked content for users who completed the old Stage 08.
- Add a versioned result such as:

```js
state.alphabetMasteryExam = {
  version: 2,
  bestCorrect: 0,
  mastered: false,
  completedAt: null,
  attempts: 0,
};
```

- Existing course completion may remain backward-compatible, but the new **Hangul mastered** badge/certificate must depend only on a clean 200/200 v2 result.
- `normalizeState()` must safely backfill the new key for old saves.

## 9. Suggested file-level implementation

| File | Change |
|---|---|
| `hangul_mastery_exam.js` | New plain browser-global question bank and metadata |
| `index.html` | Load the data file before `app.js`; add no framework/build tooling |
| `app.js` | Stage 08 exam runner, answer state, audio limits, keyboard responses, drawing responses, review screen, scoring, migration |
| `styles.css` | Neutral exam shell, six-option answer grid, question navigator, timer, drawing/input layouts |
| `sw.js` | Add the data file to `APP_SHELL`; bump cache version and matching query strings |
| `scripts/audit-hangul-mastery-exam.mjs` | Enforce all counts, option length, unique IDs, full-jamo coverage, NFC, and no-answer-leak rules |

Reuse the existing audio path, Korean keyboard, Hangul composition utilities, handwriting canvas, `HANGUL_STROKES`, recognition adapter, and `getAlphabetProgress()` rather than creating parallel engines.

## 10. Required verification

```bash
node --check app.js hangul_mastery_exam.js sw.js
node scripts/audit-hangul-mastery-exam.mjs
node scripts/audit-alphabet-audio.mjs --strict
node scripts/audit-hangul-recognition.mjs
node scripts/audit-app-shell.mjs
python -m http.server 8000
```

Browser smoke-test at minimum:

- Start exam from Stage 08.
- Confirm reference/hint routes are inaccessible during the attempt.
- Confirm every MCQ renders exactly six options and options reshuffle on a new attempt.
- Confirm audio play limits and Korean keyboard check.
- Confirm typed NFC grading.
- Confirm all 40 drawing prompts have blank canvases and exact hidden targets.
- Confirm 199/200 does **not** award mastery.
- Confirm 200/200 awards mastery and persists after reload.
- Confirm an old save does not lose previously unlocked content.

## 11. Done-when

This feature is complete only when the new audit passes, the existing alphabet/audio/recognition/app-shell audits remain green, the 200-item exam can be completed end-to-end without teaching aids, and only a perfect score grants the version-2 mastery state.
