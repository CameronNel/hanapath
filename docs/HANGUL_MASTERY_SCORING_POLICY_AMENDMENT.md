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

## Historical records

The new threshold is **prospective for formal achievement**. Existing
compatibility summaries and `legacy-incomplete` result wrappers retain the
achievement state that was actually recorded when those attempts were made. A
historical aggregate such as `bestCorrect: 150–199` is not enough, by itself, to
retroactively create a formal HanaPath mastery result because that compatibility
summary does not carry the complete immutable attempt provenance required by the
current integrity layer.

Existing valid mastered state remains sticky. A learner with only historical
non-mastered/legacy-incomplete evidence earns mastery by completing a new clean
HanaPath attempt under the current 150/200 rule. Practice/tainted history never
becomes achievement-bearing merely because the threshold changed.

## Runtime source of truth

`hangul_mastery_exam.js` remains the immutable 200-item bank. The current scoring
policy is applied by `hangul_mastery_scoring_policy.js` immediately after the
bank loads and before `app.js` starts. Generated status and derived learner-facing
surfaces read `window.HANGUL_MASTERY_EXAM.requiredCorrect`; the formal scoring
branch is regression-locked to the same 150/200 policy until that monolithic
handler is split into the shared scoring-policy layer.
