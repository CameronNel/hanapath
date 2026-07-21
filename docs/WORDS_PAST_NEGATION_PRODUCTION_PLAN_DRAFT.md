# HanaPath — Words Past and Negation Production Plan Draft

> **Workstream C.** Add explicit typed production teaching for polite past and
> negation, then version the Core Word Examination Suite from blueprint v2 to v3
> without reinterpreting history.
>
> **Status:** Phase 2 planning contract.  
> **Audited baseline:** `55ac88981fdab0eb79cafd1770b25cde25340234`.  
> **Locked Decisions:** 13 and 14 in
> [`EXAM_PROGRAMME_DECISIONS_LOCKED.md`](https://github.com/CameronNel/hanapath/blob/claude/exam-section-audit-fxv6nh/docs/EXAM_PROGRAMME_DECISIONS_LOCKED.md).

## 0. Executive decision

Extend the existing `s3-grammar-u2` **Connecting clauses** unit with a new,
additive lesson:

```text
s3-grammar-u2-l3
Producing past and negation
```

Do not rewrite or repurpose `s3-grammar-u2-l2`.

The live curriculum demonstrates the gap:

- `s3-grammar-u2-l1` already has `form-recognition` and `form-production`;
- `s3-grammar-u2-l2` teaches `안`, `못`, `-지 않다`, `-지 못하다`, and
  `-았/었어요` through `ko-to-meaning`, `meaning-to-ko`, `sentence-blank`,
  and `function-usage`, with no typed production mode;
- `word_exam_blueprints.js` therefore correctly sets past and negation
  `scoredProduction: false`.

The new lesson teaches production. Only after its data, completion migration,
competency map, and full mandated-seed feasibility audit are green may Words
blueprints move from v2 to v3.

## 1. Why add a new lesson

A new lesson is safer than changing `l2` in place:

- existing lesson IDs and historical completion remain stable;
- old records still mean what they meant;
- the new production milestone is explicit and auditable;
- existing learners can be routed directly to the bridge lesson;
- the unit checkpoint can include the new material without pretending earlier
  learners practised typing;
- the competency map gets one unambiguous `firstProductionLessonId`.

### 1.1 Unit order

Update `s3-grammar-u2.lessonIds` additively:

```js
[
  "s3-grammar-u2-l1",
  "s3-grammar-u2-l2",
  "s3-grammar-u2-l3"
]
```

The existing checkpoint remains `s3-grammar-u2-cp`.

### 1.2 Existing learner migration

- never uncrown `s3-grammar-u2`;
- never re-lock Section 3 learning;
- never delete old lesson/checkpoint completion;
- add a separate production milestone for `l3`;
- a learner with an old Section 3 crown sees `Production bridge available`;
- v3 typed-production quotas are available only after `l3` completion;
- until then, the UI may offer the frozen v2 examination form rather than
  testing untaught production;
- normal learning/SRS remains open.

This is exam-readiness gating, not a rollback of curriculum progress.

## 2. Lesson contract

### 2.1 Bilingual learner-facing identity

```text
과거와 부정 만들기 · Producing Past and Negation
```

Goal:

> Produce polite past forms and choose an explicitly taught negation pattern
> from context, then type the complete reviewed answer.

### 2.2 Lesson sequence

1. **Concept card: time forces tense**
   - today/usually → present;
   - yesterday/last week → past;
   - prompts never say `Use the past tense`.
2. **Guided polite-past production**
   - regular vowel stems;
   - `하다`;
   - selected irregular families already supported by the audited engine.
3. **Short negation**
   - `안 + predicate`;
   - `못 + action predicate`;
   - context distinguishes unwilling/not-done from inability.
4. **Long negation**
   - `-지 않아요`;
   - `-지 못해요`;
   - authored frames only.
5. **Mixed retrieval**
   - context chooses past, short negation, or long negation;
   - no rule name in the final prompt.
6. **Checkpoint**
   - typed production dominates;
   - finite accepted answers;
   - exact feedback and route.

### 2.3 Practice allocation

Recommended 16 scored practice items:

```text
4 polite-past typed forms
2 polite-past context sentences
2 안 production
2 못 production
2 -지 않아요 production
2 -지 못해요 production
2 mixed discrimination/context
```

The lesson remains practice, not a formal exam.

## 3. Accepted forms and generation

### 3.1 Past

Use `HANAPATH_INFLECT.conjugate(..., "past")` and
`HANAPATH_INFLECT.recognizeWord()` from `words_inflect.js` for predicates whose
citation form and irregular family are supported.

Eligible target rules:

- verb or adjective;
- clean citation form ending in `다`;
- audited `irregularFamily`;
- generated past differs from citation form;
- generated surface passes strict data audit;
- target was already introduced before the lesson;
- no same-surface sense ambiguity.

### 3.2 Negation

The current inflection engine does **not** expose a general `negation` form
name. Do not pretend it does.

Negation production uses authored pattern builders and reviewed frames:

```text
안 + polite predicate
못 + polite action predicate
stem + 지 않아요
stem + 지 못해요
```

Rules:

- `못` items use semantically compatible action predicates;
- descriptive predicates do not receive impossible inability readings;
- spacing is explicit;
- accepted forms are finite and reviewed;
- no automatic short↔long negation equivalence;
- no automatic `안`↔`못` exchange;
- a prompt's context selects one pattern.

### 3.3 Lesson item shape

```js
{
  competencyId: "past-tense",
  mode: "form-production",
  targetWordId: "w...",
  prompt: "Yesterday, ...",
  answer: "갔어요",
  acceptedAnswers: ["갔어요"],
  supportingLessonId: "s3-grammar-u2-l3",
  acceptedFormsSource: "inflect:past"
}
```

Negation sets `acceptedFormsSource: "authored:pattern"`.

## 4. Competency-map change

After the lesson and audit exist:

```js
"past-tense": {
  scoredProduction: true,
  firstTeachingUnitId: "s3-grammar-u2",
  firstProductionLessonId: "s3-grammar-u2-l3",
  acceptedFormsSource: "inflect:past"
}

"negation": {
  scoredProduction: true,
  firstTeachingUnitId: "s3-grammar-u2",
  firstProductionLessonId: "s3-grammar-u2-l3",
  acceptedFormsSource: "authored:pattern"
}
```

The generated `CORE_WORD_EXAM_COMPETENCY_MAP.md` must list:

- supporting lesson IDs;
- eligible target IDs;
- supported modes;
- accepted-forms source;
- earliest exam;
- excluded target reasons.

`scoredProduction` may not flip in a data-only PR before the production lesson
and milestone audit are present.

## 5. Blueprint v3 proposal

### 5.1 Exact locked minima

Counts are minimum typed items across existing `P` and `F` allocations.

| Paper | Past typed minimum | Negation typed minimum |
|---|---:|---:|
| Word Exams 1–2 | 0 | 0 |
| Word Exam 3 | 2 | 2 |
| Word Exam 4 | 2 | 2 |
| Word Exam 5 midterm | 4 | 4 |
| Word Exam 6 | 2 | 2 |
| Word Exam 7 | 2 | 2 |
| Word Exam 8 | 2 | 2 |
| Word Exam 9 | 2 | 2 |
| Word Exam 10 final | 6 | 6 |
| Retention confirmation | 3 | 3 |

These are proposals pending the full generator feasibility audit. The numbers
are locked as the target proposal; they do not ship if the existing allocations
cannot satisfy every current invariant.

### 5.2 No length or top-level allocation change

- exam item counts remain 40/50/50/50/80/50/50/60/60/150;
- retention remains 60;
- existing `R/C/P/X/F/D` allocation totals remain unchanged;
- typed past/negation items occupy existing `P` or `F` slots;
- no extra paper and no longer timer;
- no quota is taken from a strand below its existing locked floor.

### 5.3 Strand assignment

- `P`: context-controlled production where the task is primarily retrieving the
  taught surface;
- `F`: context-controlled choice/production where tense or negation distinction
  is the primary construct;
- every item has one primary strand;
- both minima count typed items only.

### 5.4 Blueprint version

- `HANAPATH_WORD_EXAM_META.blueprintVersion`: `2 → 3`;
- every affected exam blueprint `version`: `2 → 3`;
- content-bank and competency-map revisions recorded in provenance;
- v2 remains executable only for live v2 retention windows.

## 6. Generator feasibility gate

Before any v3 blueprint is accepted, run the full existing mandated seed audit:

- section exams: 250 seeds each;
- midterm: 500 seeds;
- final: 1,000 seeds;
- retention: 200 seeds or the current governing higher count;
- v2 frozen retention fixtures;
- v3 qualification/retention pairs.

For every seed, prove:

1. exact item and strand totals;
2. exact past and negation minima;
3. teaching milestone complete;
4. no unsupported form;
5. no duplicate target/surface beyond caps;
6. unit and section coverage preserved;
7. POS balance preserved;
8. context uniquely selects past/negation;
9. accepted-answer set finite;
10. same seed byte-equivalent;
11. different seeds materially different;
12. retention avoids qualifier targets;
13. v2 and v3 never mix in one pair.

If any exam cannot fill:

- do not lower a locked minimum;
- do not lengthen the paper;
- do not broaden accepted answers;
- print limiting competency, eligible pool, conflicting floor, and seed;
- return the evidence to the owner.

## 7. v2 to v3 learner migration

### 7.1 Historical records

- never recompute a v2 score;
- never apply v3 quotas or cuts to a v2 result;
- preserve existing pass, distinction, and mastery;
- show stored blueprint version in details;
- new ordinary attempts use v3 only after production readiness.

### 7.2 Live v2 qualifier

A learner holding a valid v2 qualifying final when v3 ships:

1. retains the original v2 due/expiry dates;
2. takes a frozen v2 retention confirmation;
3. uses v2 blueprint allocation, v2 competency eligibility, and compatible bank
   revision;
4. links the v2 retention result to the v2 qualifier;
5. may earn the historical v2 Core Words mastery;
6. never receives a v3 retention form for that qualifier.

### 7.3 Frozen v2 implementation

Retain a version resolver:

```text
resolveWordExamBlueprint(examId, version)
resolveWordExamEngineCompatibility(version)
```

The v2 definition remains only until:

```text
last possible v2 confirmation expiry
+ one release safety window
```

Its removal requires an audit proving no live v2 window remains in all
supported migrated fixtures.

### 7.4 New v3 qualification

- new final attempts after readiness use v3;
- a v3 qualifier links only to v3 retention;
- a failed/expired v2 confirmation requires a new v3 qualifier;
- a v2 qualifier cannot be silently converted to v3.

## 8. Form Check consequence

`form-check-past-negation` keeps its stable ID.

Before `l3`, it uses recognition/context. After `l3` completion and v3
competency activation, it automatically includes typed production. It remains
practice and does not award Words exam progress.

## 9. Data and audit changes

### 9.1 Expected files in execution work

- `words_lesson_plan.js`: append `s3-grammar-u2-l3`;
- content data needed by the lesson, without moving existing words;
- `word_exam_blueprints.js`: version and minima after feasibility proof;
- `word_exam_engine.js`: minimum-competency slot support if needed;
- `docs/CORE_WORD_EXAM_COMPETENCY_MAP.md`: regenerated;
- `scripts/build-word-exam-competency-map.mjs`: production milestone;
- `scripts/audit-word-exams.mjs`: v3 minima and version-pair rules;
- Words curriculum audit: lesson IDs, modes, completion migration;
- Workstream 0 provenance resolver.

No implementation PR may edit all of these at once.

### 9.2 Hard failures

1. existing lesson or unit ID changed;
2. old learner uncrowned or section re-locked;
3. production competency enabled before `l3`;
4. past target unsupported by `words_inflect.js`;
5. negation generated by a nonexistent inflection mode;
6. semantically invalid `못` target;
7. automatic acceptance of short/long negation alternatives;
8. missing finite accepted set;
9. v3 typed minimum missed;
10. top-level strand allocation changed;
11. item count/time changed;
12. form tested before learner completes the production bridge;
13. competency map and blueprint disagree;
14. mandated seed audit failure;
15. historical v2 result recomputed;
16. v2 qualifier linked to v3 retention;
17. v2 retention unavailable during a valid window;
18. frozen v2 logic removed too early;
19. migration loses progress;
20. Form Check production appears early.

## 10. Browser acceptance tests

- old save loads with all crowns intact;
- new lesson appears in `s3-grammar-u2`;
- old crowned learner is not relocked;
- bridge lesson can be opened directly;
- past generated forms match audited engine;
- each negation family uses reviewed frames;
- exact accepted answers grade;
- wrong short/long pattern is rejected where context selects one;
- v2 exam remains available where production readiness is absent, according to
  the version policy;
- completing `l3` activates v3 readiness;
- v3 forms meet exact minima;
- item counts and timers unchanged;
- v2 result display unchanged;
- live v2 qualifier opens frozen v2 retention;
- v2/v3 cross-pair impossible;
- expired v2 path requires new v3 qualification;
- Form Check upgrades without a new card;
- no SRS or ordinary learning regression.

## 11. Ready-to-file GitHub issue

### Title

```text
Words: teach typed past and negation production before v3 exam quotas
```

### Body

```markdown
## Problem

The Words curriculum introduces `안`, `못`, `-지 않다`, `-지 못하다`, and
`-았/었어요` in `s3-grammar-u2-l2`, but that lesson currently practises only
`ko-to-meaning`, `meaning-to-ko`, `sentence-blank`, and `function-usage`.
There is no typed `form-production` milestone.

The Core Word exam competency map therefore correctly keeps `past-tense` and
`negation` at `scoredProduction: false`. The examination suite must not score
production merely because past forms can be generated or negation patterns
exist in data.

## Required change

Add an additive lesson `s3-grammar-u2-l3`:

- Korean/English title: `과거와 부정 만들기 · Producing Past and Negation`;
- teach typed polite-past production;
- teach reviewed typed `안`, `못`, `-지 않아요`, and `-지 못해요` patterns;
- use `HANAPATH_INFLECT` for supported past surfaces;
- use authored finite frames for negation;
- keep all existing IDs, prerequisites, crowns, and historical completion;
- add a production-readiness milestone for existing learners.

## Exam consequence

After the lesson, competency-map, and full mandated-seed feasibility audit are
green:

- flip `past-tense` and `negation` to `scoredProduction: true`;
- bump Words blueprint v2 to v3;
- add typed past/negation minima inside existing P/F allocations:
  - Exams 1–2: 0/0
  - Exam 3: 2/2
  - Exam 4: 2/2
  - Midterm: 4/4
  - Exams 6–9: 2/2 each
  - Final: 6/6
  - Retention: 3/3
- do not change paper lengths;
- do not recompute historical results;
- complete live v2 retention windows with frozen v2 forms;
- never mix blueprint major versions in one mastery pair.

## Acceptance

- curriculum/data audits green;
- competency map proves the new production milestone;
- all mandated Word-exam seed audits green;
- old-save migration preserves every crown and result;
- v2 qualifier/retention fixture passes;
- `form-check-past-negation` upgrades in place after the lesson.
```

## 12. Ship checklist

```bash
node --check words_lesson_plan.js word_exam_blueprints.js word_exam_engine.js app.js sw.js
node scripts/audit-words-data.mjs --strict
node scripts/build-word-exam-competency-map.mjs --check
node scripts/audit-word-exams.mjs
node scripts/audit-exam-integrity.mjs
node scripts/audit-app-shell.mjs
```

Also:

- run old-save fixtures;
- human-review all negation contexts;
- verify no existing ID moves;
- verify bridge readiness UX;
- retain v2 until all live windows expire;
- bump cache/query versions only in implementation PRs.

## 13. One-box-per-PR execution queue

| Box | One draft PR | Gate |
|---|---|---|
| `C1` | Add `s3-grammar-u2-l3`, lesson items, accepted sets, and old-save migration | Curriculum audit and human review green |
| `C2` | Update competency-map generator/report; flip production eligibility behind the new milestone | Map proves exact lesson and pools |
| `C3` | Add v3 proposed minima and generator support without changing lengths | Full mandated-seed feasibility audit green |
| `C4` | Add frozen-v2 resolver and migration fixtures | Live v2 qualifier completes v2 retention |
| `C5` | Activate v3 UI/readiness and Form Check upgrade | Browser acceptance green |
| `C6` | Remove frozen v2 only after expiry proof | No supported fixture has an open v2 window |

Sequence is curriculum → competency map → blueprints → audits/feasibility →
migration/UI. No runner quota ships before its teaching evidence.

## 14. Locked decisions

Decisions 13 and 14 are carried forward unchanged.

## 15. Open questions for the owner

None at drafting time. A generator feasibility failure returns with evidence
and does not silently alter minima, allocations, paper lengths, or migration.

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
