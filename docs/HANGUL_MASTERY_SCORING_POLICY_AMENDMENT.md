# Hangul Mastery scoring policy amendment

**Status:** Binding product-policy amendment.

**Effective:** 2026-08-10.

This document changes only the **mastery threshold** in
`docs/HANGUL_MASTERY_EXAM_CLAUDE_SPEC.md`. It does not weaken the examination's
coverage, item count, grading strictness, no-aids rules, delayed feedback,
handwriting requirements, navigation restrictions, integrity handling, or
retake behavior.

Where the older Hangul Mastery specification says that mastery requires a
perfect `200/200`, this amendment supersedes that scoring clause with the
following owner-approved policy:

```js
const mastered =
  score.total === 200 &&
  score.correct >= 150;
```

- The formal exam remains **200 items / 200 marks**.
- **150/200 (75%) or better** earns `Hangul mastered` / `한글 완전 습득`.
- **149/200 or below** is `Not yet mastered` / `아직 완전 습득 전`.
- One item remains one mark. There is no partial-credit or compensation rule.
- Unanswered or ungraded items receive no mark; therefore they cannot improve a learner's score toward the 150-mark threshold.
- Practice/tainted attempts remain ineligible to award formal achievement.
- Every other requirement in `docs/HANGUL_MASTERY_EXAM_CLAUDE_SPEC.md` remains binding unless a later explicit amendment says otherwise.

## Runtime source of truth

`hangul_mastery_exam.js` remains the immutable 200-item bank. The current scoring
policy is applied by `hangul_mastery_scoring_policy.js` immediately after the
bank loads and before `app.js` starts. Runtime code and generated status must
read `window.HANGUL_MASTERY_EXAM.requiredCorrect`, not repeat a historical
hard-coded threshold.
