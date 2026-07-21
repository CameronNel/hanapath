# HanaPath — Form Checks Plan Draft

> **Workstream B.** Form Checks are short, blocked, immediately corrective
> practice diagnostics under Learn. They are not examination cards,
> certifications, mastery evidence, or delayed-retention events.
>
> **Status:** Phase 2 planning contract.  
> **Audited baseline:** `55ac88981fdab0eb79cafd1770b25cde25340234`.  
> **Inputs:** [commissioning brief](https://github.com/CameronNel/hanapath/blob/claude/exam-section-audit-fxv6nh/docs/CHATGPT_EXAM_PROGRAMME_RESEARCH_BRIEF.md),
> [locked decisions](https://github.com/CameronNel/hanapath/blob/claude/exam-section-audit-fxv6nh/docs/EXAM_PROGRAMME_DECISIONS_LOCKED.md), and [Phase 1 evidence](https://github.com/CameronNel/hanapath/blob/research/exam-programme-phase-1/docs/EXAM_PROGRAMME_RESEARCH_REPORT.md).

## 0. Executive decision

HanaPath will add one shared Form Check runner and a declarative inventory of
blocked checks. Each check:

- contains 8–15 items;
- uses already taught content only;
- gives immediate per-item feedback;
- routes every error to an exact lesson;
- samples unique targets within one session;
- may reuse targets across later sessions;
- is repeatable without penalty;
- never appears on the Exam tab;
- never awards pass, distinction, retention, or mastery;
- never changes SRS or learning progress except an optional practice-history
  summary;
- reuses existing learning drill surfaces.

Blocked practice belongs here. Formal exams remain mixed.

## 1. Shared architecture

Add a plain declarative global:

```js
window.HANAPATH_FORM_CHECKS = [
  {
    id: "form-check-polite-present",
    titleKo: "해요체 현재형 확인",
    title: "Polite Present Check",
    itemCount: 10,
    unlock: { lessonIds: ["..."] },
    competencies: ["polite-present"],
    modes: ["form-recognition", "form-production", "sentence-blank"],
    routePolicy: "item-supporting-lesson"
  }
];
```

One runner handles:

```text
renderFormChecksHub()
renderFormCheckIntro(checkId)
startFormCheck(checkId, seed)
renderFormCheckItem()
gradeFormCheckItem()
renderFormCheckCompletion()
routeFormCheckError(item)
```

This is a practice engine. It may use a non-persistent random or seeded session
for reproducibility, but no result is a formal exam record.

## 2. Feedback contract

After every answer:

1. mark correct/incorrect immediately;
2. show the canonical form and any reviewed accepted alternatives;
3. identify one concise distinction;
4. play audio where available;
5. offer `Review this lesson`;
6. record the stable supporting lesson ID on the item;
7. move on only after learner action or a short accessible delay.

For typed items, show token/form differences without fractional scoring. For
selected items, explain why the selected option does not fit.

Completion language:

- `Check complete`
- `8 of 12 correct`
- `Review these two forms`
- `Try again`

Prohibited:

- passed;
- failed;
- certified;
- mastered;
- official;
- verified;
- TOPIK/CEFR claims.

## 3. Repeatability and sampling

- unique canonical target key within one session;
- sample with replacement across separate sessions;
- do not use the five-attempt formal-exam freshness contract;
- prioritise unseen targets within the current session only;
- no SRS personalisation in the first release;
- an optional `recentFormCheckTargets[checkId]` may avoid immediate next-session
  repetition, but it must not change difficulty or make results comparable to
  examinations;
- if a pool cannot fill the item count, show the check as unavailable and fail
  its audit rather than duplicate within-session targets.

## 4. Exact lesson-routing rule

Every generated item carries:

```text
supportingLessonId
supportingUnitId
competencyId
targetId
```

The route button opens `supportingLessonId`, not merely the Learn hub.

For Sentence-bank items, eligibility/teaching metadata maps each row to the
earliest exact `HANAPATH_SENTENCE_LESSONS` ID that teaches the pattern. The
audit rejects an item without a resolvable route.

## 5. Inventory

### 5.1 Core Words form checks

| ID | Name | Items | Scope and modes | Unlock | Exact remediation |
|---|---|---:|---|---|---|
| `form-check-polite-present` | 해요체 현재형 확인 · Polite Present Check | 10 | `form-recognition`, typed `form-production`, short `sentence-blank`; regular plus taught contractions | Complete the first Words predicate lesson(s) in Section 1 | Per-target first teaching lesson from the competency map; fallback is the source content lesson, never a generic section |
| `form-check-past-negation` | 과거와 부정 확인 · Past & Negation Check | 12 | v2: `ko-to-meaning`, `meaning-to-ko`, `sentence-blank`, `function-usage`; v3 adds typed past and negation production | `s3-grammar-u2-l2` complete | `s3-grammar-u2-l2`; after Workstream C, typed production routes to new `s3-grammar-u2-l3` |
| `form-check-particles-location` | 조사와 장소 확인 · Particles & Location Check | 12 | typed/selected particles in short contexts: topic, subject, object, `에`, `에서`, direction | matching `s2-grammar-u1` lessons complete | exact supporting lesson in `s2-grammar-u1-l1` or `s2-grammar-u1-l2` |
| `form-check-connectives` | 연결 표현 확인 · Connectives Check | 12 | `sentence-blank`, `function-usage`, typed finite forms | `s3-grammar-u2-l1` complete | `s3-grammar-u2-l1` |
| `form-check-register-honorific` | 격식과 높임 표현 확인 · Register & Honorific Check | 12 | scenario choice and typed production for casual/polite/formal endings and subject honorifics | `s5-grammar-u3-l1` and `l2` complete | ending/register errors → `s5-grammar-u3-l1`; subject/lexical honorific errors → `s5-grammar-u3-l2` |
| `form-check-modifiers` | 관형형 확인 · Modifier Forms Check | 10 | recognition and production of present/past/prospective modifier forms | `s7-grammar-u4-l1` complete | `s7-grammar-u4-l1` |
| `form-check-irregular-d` | ㄷ 불규칙 확인 · ㄷ-Irregular Check | 10 | form recognition and production | `s7-grammar-u4-l2` complete | `s7-grammar-u4-l2` |
| `form-check-irregular-b` | ㅂ 불규칙 확인 · ㅂ-Irregular Check | 10 | form recognition and production | `s7-grammar-u4-l2` complete | `s7-grammar-u4-l2` |
| `form-check-irregular-s` | ㅅ 불규칙 확인 · ㅅ-Irregular Check | 10 | form recognition and production | `s7-grammar-u4-l2` complete | `s7-grammar-u4-l2` |
| `form-check-irregular-h` | ㅎ 불규칙 확인 · ㅎ-Irregular Check | 10 | form recognition and production | `s7-grammar-u4-l2` complete | `s7-grammar-u4-l2` |
| `form-check-irregular-reu` | 르 불규칙 확인 · 르-Irregular Check | 10 | form recognition and production | `s7-grammar-u4-l2` complete | `s7-grammar-u4-l2` |
| `form-check-irregular-rieul` | ㄹ 탈락 확인 · ㄹ-Deletion Check | 10 | form recognition and production | `s7-grammar-u4-l2` complete | `s7-grammar-u4-l2` |

The live curriculum verifies:

- `s3-grammar-u2-l1` already includes `form-recognition` and
  `form-production`;
- `s3-grammar-u2-l2` currently includes recognition/context modes only;
- `s5-grammar-u3-l1` is register/endings;
- `s5-grammar-u3-l2` is subject honorification;
- `s7-grammar-u4-l1` is modifier content;
- `s7-grammar-u4-l2` is the irregular-family production lesson.

### 5.2 Sentence-pattern checks

| ID | Name | Items | Scope and modes | Unlock | Exact remediation |
|---|---|---:|---|---|---|
| `sentence-check-order` | 문장 순서 확인 · Sentence Order Check | 12 | token build, four-option order discrimination, short Translate & Type | Sentences section `sn3` complete | each row's approved `supportingLessonId` in `sn3`; route stored per item |
| `sentence-check-tense` | 문장 시제 확인 · Sentence Tense Check | 12 | present/past/future mixed within a blocked tense practice set; typed and selected | `sn4` complete | row-specific lesson carrying `present-polite`, `past-polite`, or `future-geoyeyo` |
| `sentence-check-negation` | 문장 부정 확인 · Sentence Negation Check | 10 | `안`, `못`, `-지 않다` in typed/selected contexts | `sn4` complete | row-specific lesson carrying the negation tag |
| `sentence-check-connectives` | 문장 연결 확인 · Connected Sentence Check | 12 | and/but/because/if/when clause relations | `sn6` complete | row-specific lesson in `sn6` or earlier |
| `sentence-check-register` | 문장 말높임 확인 · Sentence Register Check | 12 | polite informal, formal, and honorific sentence contexts | `sn8` complete | row-specific section 5–8 supporting lesson |

The check title may name the form because these are blocked practice
diagnostics. Formal exam prompts remain context-driven and do not name the
answering rule.

## 6. Past-and-negation automatic upgrade

`form-check-past-negation` is one stable card and ID.

### v2 state

Before Workstream C:

- 12 items;
- recognition/context only;
- no typed production score;
- copy says `Production practice unlocks after the new lesson is complete`.

### v3 state

When all are true:

```text
past-tense.scoredProduction == true
negation.scoredProduction == true
new production lesson complete
v3 competency map active
```

the same check automatically allocates:

```text
3 typed past
3 typed negation
3 context/blank
3 recognition/discrimination
```

No second card is created. Historical practice summaries are not recomputed.

## 7. Item modes

| Mode | Use | Feedback |
|---|---|---|
| `form-recognition` | choose function/form | identify ending and meaning |
| `form-production` | type one taught form | show canonical form and stem change |
| `sentence-blank` | complete a short authored frame | show full sentence and target role |
| `function-usage` | choose/produce particle or connective | explain contextual function |
| `translate-type` | produce reviewed short sentence | token/form diff |
| `sentence-build` | order reviewed tokens | restore order and explain verb/clause position |
| `register-choice` | choose form for an addressee/situation | identify listener/subject axis |

Four-option selected items have exactly one defensible answer.

## 8. State and analytics boundary

Optional lightweight state:

```js
state.formChecks = {
  version: 1,
  byCheckId: {
    "form-check-polite-present": {
      sessions: 0,
      lastCompletedAt: null,
      lastCorrect: 0,
      lastTotal: 10,
      recentTargetKeys: []
    }
  }
};
```

Rules:

- no pass/mastery field;
- no delayed retention;
- no exam provenance record;
- no effect on SRS, crowns, unlocks, or exam status;
- practice event may record latency, error axis, helper/feedback route, and
  supporting lesson ID;
- no comparison language suggesting a formal score.

## 9. Audit contract

Add `scripts/audit-form-checks.mjs`. Hard-fail on:

1. missing required check;
2. duplicate check ID;
3. item count outside 8–15;
4. unresolved unlock lesson;
5. unresolved remediation lesson;
6. item tested before its lesson;
7. within-session duplicate target key;
8. insufficient pool for the item count;
9. selected item without four unique options;
10. ambiguous selected answer;
11. typed item without finite accepted set;
12. automatic broad grammatical transformation;
13. immediate feedback absent;
14. feedback leaking before answer;
15. a check appearing on the Exam tab;
16. pass, distinction, mastery, retention, official, verified, TOPIK, or CEFR
    wording;
17. practice mutating SRS, crowns, lesson completion, or formal exam records;
18. past/negation typed items appearing before Workstream C conditions;
19. v3 upgrade creating a duplicate card/ID;
20. irregular-family target not matching its family;
21. modifier target routed outside `s7-grammar-u4-l1`;
22. irregular target routed outside `s7-grammar-u4-l2`;
23. register/honorific axis routed to the wrong `s5-grammar-u3` lesson;
24. Sentence item without row-specific supporting lesson;
25. repeat session unable to sample valid targets;
26. missing audio where the mode requires it.

Print a matrix:

```text
check × competency × mode × lesson × target family
```

## 10. Browser acceptance tests

- hub appears under Learn, not Exam;
- locked checks explain the exact lesson needed;
- each check serves the exact item count;
- targets are unique in one session;
- a new session may reuse old targets;
- answer feedback is immediate;
- every wrong answer opens the exact lesson;
- correct answer and explanation are accessible;
- audio works where included;
- no result is called pass/mastery;
- no SRS/crown/formal result changes;
- past/negation v2 has no typed production;
- completing Workstream C lesson upgrades the same card;
- irregular cards stay separated by family;
- Sentence rows route to real `HANAPATH_SENTENCE_LESSONS`;
- phone layout keeps Korean input, feedback, and lesson route visible;
- reload preserves only the lightweight summary, not an active formal attempt.

## 11. Ship checklist

```bash
node --check app.js form_check_blueprints.js sw.js
node scripts/audit-form-checks.mjs
node scripts/audit-word-exams.mjs
node scripts/audit-words-data.mjs --strict
node scripts/audit-sentences-data.mjs --strict
node scripts/audit-app-shell.mjs
```

Also:

- review all bilingual names;
- verify exact route IDs;
- verify no exam-tab card is added;
- serve statically and complete §10;
- bump cache/query versions in implementation PRs only.

## 12. One-box-per-PR execution queue

| Box | One draft PR | Gate |
|---|---|---|
| `B1` | Add declarative inventory, exact lesson routes, and audit | All routes and pools green |
| `B2` | Build shared blocked runner using existing drill surfaces | Immediate feedback and no progress mutation |
| `B3` | Ship core Words checks except production upgrade | Browser tests green |
| `B4` | Ship Sentence-pattern checks using reviewed sentence metadata | Row routes green |
| `B5` | Bind automatic past/negation upgrade after Workstream C | Same card ID, no premature production |

## 13. Locked decisions

This plan preserves the practice-not-certification boundary, mixed formal exams,
and the Workstream C gating decision.

## 14. Open questions for the owner

None at drafting time.

## Repository references

This specification is bound to application baseline
`55ac88981fdab0eb79cafd1770b25cde25340234`. Implementation must re-check every cited symbol before coding
and flag drift rather than silently adapting the contract.

- [`app.js`](https://github.com/CameronNel/hanapath/blob/55ac88981fdab0eb79cafd1770b25cde25340234/app.js): `loadState`, `saveState`, `normalizeWordExams`, `isWordSectionComplete`, `isWordExamUnlocked`, `wordExamRetentionStatus`, the Core Word exam runner, the Sentences Translate & Type path, and the owner-mandated section-completion control.
- [`sentences_core.js`](https://github.com/CameronNel/hanapath/blob/55ac88981fdab0eb79cafd1770b25cde25340234/sentences_core.js): `window.HANAPATH_SENTENCES`, including `korean`, `english`, `tokens`, `band`, `patternTags`, `speechLevel`, `register`, and `acceptAlso`.
- [`sentences_lesson_plan.js`](https://github.com/CameronNel/hanapath/blob/55ac88981fdab0eb79cafd1770b25cde25340234/sentences_lesson_plan.js): `HANAPATH_SENTENCE_SECTIONS`, `HANAPATH_SENTENCE_UNITS`, and `HANAPATH_SENTENCE_LESSONS`.
- [`word_exam_blueprints.js`](https://github.com/CameronNel/hanapath/blob/55ac88981fdab0eb79cafd1770b25cde25340234/word_exam_blueprints.js): `HANAPATH_WORD_EXAMS`, `HANAPATH_WORD_EXAM_COMPETENCIES`, provisional bands, `MIN_SUBSCORE_ITEMS`, and the v2 retention contract.
- [`word_exam_engine.js`](https://github.com/CameronNel/hanapath/blob/55ac88981fdab0eb79cafd1770b25cde25340234/word_exam_engine.js): seeded generation, `competencyEligible`, typed grading, band evaluation, and retention generation.
- [`words_lesson_plan.js`](https://github.com/CameronNel/hanapath/blob/55ac88981fdab0eb79cafd1770b25cde25340234/words_lesson_plan.js): the live Words curriculum and exact grammar lesson IDs.
- [`words_inflect.js`](https://github.com/CameronNel/hanapath/blob/55ac88981fdab0eb79cafd1770b25cde25340234/words_inflect.js): `conjugate`, `recognize`, `recognizeWord`, and `inflect`.
- [`scripts/audit-word-exams.mjs`](https://github.com/CameronNel/hanapath/blob/55ac88981fdab0eb79cafd1770b25cde25340234/scripts/audit-word-exams.mjs) and [`scripts/audit-sentences-data.mjs`](https://github.com/CameronNel/hanapath/blob/55ac88981fdab0eb79cafd1770b25cde25340234/scripts/audit-sentences-data.mjs): established audit patterns.
- [`docs/CORE_WORD_EXAM_SPECS.md`](https://github.com/CameronNel/hanapath/blob/55ac88981fdab0eb79cafd1770b25cde25340234/docs/CORE_WORD_EXAM_SPECS.md) and [`docs/SENTENCES_TEACHING_SPEC.md`](https://github.com/CameronNel/hanapath/blob/55ac88981fdab0eb79cafd1770b25cde25340234/docs/SENTENCES_TEACHING_SPEC.md): sibling contracts and current teaching architecture.
