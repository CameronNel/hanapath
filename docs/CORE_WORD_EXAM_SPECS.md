# HanaPath — Core Word Examination Suite

> **Research-revised owner specification and Opus 4.8 handover.**
> This document defines ten formal achievement examinations for HanaPath's finite
> Core Words curriculum. It is the source of truth for the construct being tested,
> coverage, form/tense handling, generation, scoring, persistence, auditing,
> validation, and implementation.
>
> **Related prerequisite issue:** [#316 — Clean malformed late Words unit titles before exam diagnostics](https://github.com/CameronNel/hanapath/issues/316).

## 0. Executive decision

HanaPath will keep **ten formal Words examinations**:

1. Eight section achievement examinations, one after each Words section.
2. One cumulative midterm after Section 4.
3. One cumulative Core Words final after Section 8.

The exams remain aligned to the shipped path because they are **curriculum
achievement tests**: they answer *"How securely can the learner recognise,
retrieve, distinguish, and use the words and forms HanaPath has taught so far?"*

They must **not** claim to establish a general Korean proficiency level, TOPIK
level, CEFR level, or complete communicative competence. External proficiency
frameworks assess broader listening, reading, speaking, writing, interaction,
and real-world task performance. A Words exam can provide strong evidence about
lexical achievement, but not all of Korean ability.

### 0.1 The tense/register decision

Do **not** replace the ten exams with separate formal tests named *Present Tense
Exam*, *Past Tense Exam*, *Polite Korean Exam*, and so on.

That design would be weaker because:

- tense, speech level, honorification, negation, and lexical choice interact;
- announcing the tested form cues the answer and inflates performance;
- Korean forms combine, for example polite + past, formal + past, or honorific +
  polite;
- the real skill is choosing the appropriate form from context, not producing a
  form after the test title has already named it;
- HanaPath teaches lexical and grammatical knowledge progressively across
  scenario units rather than as ten isolated grammar silos.

Instead, every relevant exam has **mandatory form-and-register strands and
subscores**. Forms are mixed inside realistic contexts, while short blocked
**Form Checks** are used for practice and diagnosis rather than certification.

### 0.2 Locked product decisions

- Keep `Learn · Exam · Progress`.
- Place the Core Words exams beneath the Hangul Mastery Examination.
- Keep ten exams exactly: eight section exams, one midterm, one final.
- Use one shared runner and ten declarative blueprints.
- Generate attempts from the shipped curriculum and curated data; do not author
  ten giant frozen banks.
- Use seeded, stratified generation independent of a learner's SRS state or
  recent lesson history.
- Use four-option vocabulary MCQs with one defensible answer.
- Separate receptive knowledge, cued selection, productive recall, contextual
  use, form/register control, and lexical depth in scoring.
- Allow navigation and answer review **within the active exam before final
  submission**, without showing correctness. This deliberately differs from the
  forward-only Hangul exam because mobile mistaps and typing corrections should
  not become part of the vocabulary construct.
- Show no hints, answers, teaching notes, SRS state, or correctness feedback
  before submission.
- Audio may be played at most twice per item.
- Leaving an active attempt requires confirmation and discards it in v1.
- Exams never gate, re-lock, or mutate normal Words progression or SRS.
- Passing thresholds are provisional until pilot-calibrated; do not market them
  as psychometrically validated.
- Issue #316 must be resolved before final acceptance because diagnostics expose
  unit titles.

## 1. Why this design is defensible

### 1.1 Curriculum alignment

Good achievement tests align what is taught, practised, and assessed. HanaPath's
Words curriculum already moves from word recognition to audio, typed recall,
context, function words, inflection, register, honorifics, irregular families,
and sense distinctions. The exams should sample those same constructs at higher
retention and transfer demands rather than introduce unrelated full-sentence or
speaking tasks.

The expected baseline on `main` is:

- 2,028 curated word senses;
- 8 Words sections;
- 75 units;
- 208 content lessons;
- 75 unit checkpoints;
- every curated word ID allocated once to a content lesson;
- every unit ending in a checkpoint;
- existing generators for recognition, audio, recall, typing, sentence context,
  function words, form recognition, and form production.

These are expected values, not hard-coded permission. Re-derive them before
implementation and fail clearly on drift.

### 1.2 Vocabulary is not one score

Research distinguishes at least:

- **breadth** — how many words are known;
- **depth** — how well each word is known in context, form, contrast, and use;
- **receptive knowledge** — recognising a form or meaning;
- **productive knowledge** — retrieving or producing the form.

Receptive and productive performance are related but distinct. Multiple-choice
recognition must therefore not masquerade as productive mastery. HanaPath must
report separate macrostrands and include substantial typed/contextual evidence.

### 1.3 Context and mixed discrimination

Official Korean curricula and major language frameworks connect linguistic
knowledge to communicative contexts. Discrete vocabulary or grammar items remain
useful for precise diagnosis, but a credible exam also asks learners to select
and produce words/forms in context.

Research on blocked versus interleaved grammar practice is not perfectly
uniform, but it supports a cautious design conclusion: blocked practice is
useful for initial fluency and remediation, while mixed/interleaved testing is
better suited to determining whether learners can discriminate among competing
forms without being told which rule is active.

Therefore:

- **practice** may block present, past, politeness, or irregular families;
- **formal exams** mix all eligible forms and report form-specific subscores.

### 1.4 Realistic test length

The earlier draft specified 80 items in 40 minutes and 200 items in 90 minutes.
That allowed roughly 30 and 27 seconds per item despite audio, Korean typing, and
context reading. It risked measuring motor speed and fatigue rather than word
knowledge.

The revised lengths below provide approximately 45–50 seconds per item overall,
with more time for cumulative exams. This is still brisk but defensible for a
mobile lexical achievement test.

## 2. Construct being assessed

Each scored item has exactly one **primary macrostrand**. Secondary diagnostic
tags may also be recorded.

| Code | Macrostrand | What it measures | Typical modes |
|---|---|---|---|
| `R` | Receptive breadth | recognise Korean form or heard form and identify meaning | `ko-to-meaning`, `audio-to-meaning` |
| `C` | Cued lexical selection | select Korean from an English/context cue; not counted as productive | `meaning-to-ko` MCQ |
| `P` | Controlled production | retrieve and type a lemma, fixed expression, or eligible taught form | `type-ko`, typed `form-production` |
| `X` | Contextual use | choose or type the word/particle/form that completes a short context | `sentence-blank`, `function-usage` |
| `F` | Form and sociolinguistic control | distinguish or produce tense, negation, speech level, honorific, connective, modifier, or irregular form | `form-recognition`, `form-production`, `register-choice` |
| `D` | Lexical depth | distinguish senses, near-neighbours, collocations, or word-family relations | `sense-disambiguation`, contrast/collocation items |

### 2.1 What this exam does not test

- open-ended speaking ability;
- full-sentence translation competence;
- broad reading comprehension beyond the short context needed for the target;
- essay writing;
- spontaneous interaction;
- Korean proficiency outside HanaPath's taught content.

Those belong to the Sentences, Listening, Writing, or future integrated
proficiency assessments. Words exams should not steal their constructs.

## 3. Form, tense, politeness, and grammar model

### 3.1 Distinct axes — do not collapse them

The runner and diagnostics must keep these axes separate:

1. **Lexeme/form identity** — citation form and the intended sense.
2. **Polite informal present** — `-아요/어요` and supported contractions.
3. **Past** — supported `-았/었어요` forms.
4. **Negation** — eligible `안`, `못`, and `-지 않다` patterns.
5. **Polite formal** — eligible `-(스)ㅂ니다` forms.
6. **Listener politeness** — the speech level chosen for the addressee.
7. **Subject honorification** — `-(으)시-` and honorific predicate forms.
8. **Humble/honorific lexical choice** — for example ordinary versus
   honorific/humble lexemes where explicitly taught.
9. **Connectives/function words** — particles and endings in phrase/sentence
   frames.
10. **Noun modification** — present/past/prospective modifier forms where taught.
11. **Irregular families** — diagnosed by family, not as one undifferentiated
    bucket.

A learner may know past tense but misuse honorifics, or recognise formal endings
but fail to produce them. One combined `morphology` score would hide this.

### 3.2 Verified curriculum milestones

The implementation must re-derive the exact map, but the current path visibly
contains these explicit milestones:

- **Section 1:** verbs and descriptive verbs already appear with polite-present
  examples and fixed polite survival expressions. Test basic recognition and
  limited high-utility production; do not demand broad conjugation mastery.
- **Section 2 — `s2-grammar-u1`, Function words:** core particles and basic
  connective/function items.
- **Section 3 — `s3-grammar-u2`, Connecting clauses:** clause connection and
  sequencing items.
- **Section 5 — `s5-grammar-u3`, Register and respect:** casual/polite/formal
  endings, `-네요`, `-(으)ㄹ까요`, subject honorific `-(으)시-`, and explicit
  honorific vocabulary.
- **Section 7 — `s7-grammar-u4`, Forms and nuance:** noun modifiers,
  irregular-family forms, additional connectives/particles, and protected
  same-surface distinctions.

The curated bank also identifies the original groups `tense-negation`,
`endings-register`, `connectives`, `noun-modification`, `honorifics`, and
`irregular-families`.

### 3.3 Required competency map before coding

Before building exam items, generate and review a machine-readable report that
maps every assessable competency to:

```js
{
  competencyId,
  firstTeachingUnitId,
  supportingLessonIds,
  eligibleWordIds,
  supportedModes,
  acceptedFormsSource
}
```

Do not infer teaching order merely from a field's presence on a word row. A form
may be technically generatable before the curriculum has taught it.

The report must answer, explicitly:

- where past production first becomes eligible;
- where each negation pattern becomes eligible;
- where polite formal production becomes eligible;
- where subject honorific production becomes eligible;
- where modifier and irregular-family production becomes eligible.

**Known audit concern:** the curated schema names a `tense-negation` source group,
but the visible v2 grammar-unit sequence does not, by title alone, establish a
clear dedicated past-and-negation milestone. The implementation must trace those
source rows into their actual v2 lesson/unit placements and inspect the lesson
practice modes. If explicit teaching cannot be demonstrated, past/negation may
not receive scored production quotas merely because `words_inflect.js` can
produce the forms. Open a separate curriculum issue rather than silently
pretending the content was taught.

If a competency cannot be tied to an explicit completed lesson/unit, it may
appear only as an unscored research candidate—not in the released exam.

### 3.4 Eligibility rule

An exam may test a form only when:

1. the exam's unlock scope includes the competency's teaching unit;
2. the target word supports the form through authored `forms`/`inflections` or
   the audited inflection engine;
3. the prompt supplies enough context to make the intended tense/register/sense
   uniquely correct;
4. the accepted-answer set is explicit and finite;
5. the same knowledge has appeared in learning/practice before formal testing.

### 3.5 Optional Form Checks — practice, not formal exams

Add or retain short blocked diagnostics under the relevant Learn/Words practice
surface, not as extra Exam-tab certifications:

- Polite present check;
- Past and negation check;
- Particles and location check;
- Connectives check;
- Register and honorific check;
- Modifier forms check;
- Irregular-family checks by family.

Each Form Check should be 8–15 items, immediately corrective, repeatable, and
route to the exact lesson. These are where blocked practice belongs.

## 4. Shared examination architecture

### 4.1 Blueprint file

Add a plain browser global loaded before `app.js`:

```js
window.HANAPATH_WORD_EXAMS = [ /* ten blueprints */ ];
window.HANAPATH_WORD_EXAM_COMPETENCIES = { /* reviewed milestone map */ };
```

Blueprints define scope, time, quotas, floors, and competency eligibility—not
frozen item IDs.

### 4.2 One shared runner

Suggested entry points:

```js
renderWordExamHub()
renderWordExamIntro(examId)
startWordExamAttempt(examId, options)
renderWordExamAttempt()
renderWordExamReview()
submitWordExamAttempt()
renderWordExamResult(examId, result)
```

Use one runner and one attempt state for all exams.

### 4.3 Attempt state

```js
{
  examId,
  blueprintVersion,
  seed,
  startedAt,
  deadline,
  items,
  index,
  answers,
  audioPlays,
  flaggedItemIds,
  submitted: false
}
```

- The learner may move Previous/Next within the attempt and flag items.
- No correctness or answer reveal appears before final submission.
- At timeout, submit current answers.
- Leaving discards the attempt after confirmation.
- A retake uses a new seed.
- Selection is never personalised from `vocabSrs`, recent checkpoints, error
  history, or lesson recency; that would reduce comparability between attempts.

### 4.4 Persistent result record

```js
state.wordExams = {
  version: 2,
  byExamId: {
    "word-exam-1": {
      blueprintVersion: 2,
      attempts: 0,
      bestPct: 0,
      passed: false,
      distinguished: false,
      masteryEarnedAt: null,
      confirmationDueFrom: null,
      confirmationExpiresAt: null,
      lastAttemptAt: null,
      lastResult: null
    }
  }
};
```

`lastResult` stores compact totals, not the full item bank:

```js
{
  correct,
  total,
  pct,
  unanswered,
  durationSeconds,
  passed,
  distinguished,
  bySection,
  byTrack,
  byUnit,
  byMacrostrand,
  byCompetency,
  byPos,
  weakestUnitIds,
  weakestCompetencyIds
}
```

Never mutate Words SRS, review queues, lesson completion, or section unlocking.

## 5. Question and grading rules

### 5.1 Modes

Use existing audited engines where possible:

| Mode | Primary strand | Grading |
|---|---|---|
| `ko-to-meaning` | `R` | four-option MCQ |
| `audio-to-meaning` | `R` | four-option MCQ, maximum two plays |
| `meaning-to-ko` | `C` | four-option MCQ; never call this productive recall |
| `type-ko` | `P` | NFC-normalised accepted-answer match |
| typed `form-production` | `P` or `F` | inflection-engine accepted forms |
| `sentence-blank` | `X` | typed where reliable; otherwise four-option |
| `function-usage` | `X` | phrase/sentence frame, typed or four-option |
| `form-recognition` | `F` | form → function/meaning/context |
| `register-choice` | `F` | scenario → uniquely appropriate form |
| `sense-disambiguation` | `D` | context-first choice or short typed target |
| `collocation-choice` | `D` | choose target compatible with an authored frame |

Do not create parallel inflection, audio, distractor, normalisation, or sentence
engines.

### 5.2 Context rules

- Context should be short enough that the target remains lexical, not a hidden
  reading-comprehension test.
- The answer must be uniquely defensible from the context.
- Do not ask for a full translated sentence in the Words exams.
- For tense/register items, omit labels such as *Use the past tense*. The
  scenario/time cue should require the form.
- Use authored examples and patterns where possible; generated contexts require
  dedicated audits and human review.

### 5.3 Distractor safety

Every MCQ has exactly four unique options and one defensible answer.

Distractors must:

1. match learner-facing POS/function where appropriate;
2. be close enough to be meaningful but not ambiguous;
3. differ in word ID and accepted surface;
4. exclude duplicate glosses that create multiple correct answers;
5. exclude sibling senses unless the question explicitly supplies sufficient
   disambiguating context;
6. exclude accepted inflection variants of the answer;
7. avoid morphology-only traps when the item claims to test lexical meaning;
8. avoid obviously absurd options that make the item a test-taking trick.

### 5.4 Typed answers

- NFC normalise and trim.
- Reject romanisation and English.
- Accept only canonical/authored forms and audited generated variants.
- Do not accept a different sense merely because the Korean surface matches.
- Record error axis where defensible: orthography, lexical choice, form,
  particle, tense, negation, register, honorific, or sense.
- Minor spacing flexibility is allowed only when the word schema explicitly
  permits it.

## 6. Revised exam lengths and common blueprint

### 6.1 Exact lengths

| Exam | Scope | Items | Time |
|---:|---|---:|---:|
| 1 | Section 1 | 40 | 30 min |
| 2 | Section 2 | 50 | 40 min |
| 3 | Section 3 | 50 | 40 min |
| 4 | Section 4 | 50 | 40 min |
| 5 | Sections 1–4 midterm | 80 | 65 min |
| 6 | Section 5 | 50 | 40 min |
| 7 | Section 6 | 50 | 40 min |
| 8 | Section 7 | 60 | 50 min |
| 9 | Section 8 | 60 | 50 min |
| 10 | Sections 1–8 final | 150 | 120 min |

### 6.2 Item allocation

| Exam | `R` text | `R` audio | `C` | `P` | `X` | `F` | `D` | Total |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | 8 | 6 | 4 | 8 | 8 | 3 | 3 | 40 |
| 2 | 10 | 8 | 4 | 10 | 10 | 5 | 3 | 50 |
| 3 | 10 | 8 | 4 | 10 | 9 | 6 | 3 | 50 |
| 4 | 10 | 8 | 4 | 10 | 9 | 5 | 4 | 50 |
| 5 | 14 | 12 | 6 | 16 | 16 | 10 | 6 | 80 |
| 6 | 9 | 7 | 4 | 10 | 10 | 7 | 3 | 50 |
| 7 | 9 | 7 | 4 | 10 | 10 | 7 | 3 | 50 |
| 8 | 10 | 8 | 4 | 12 | 12 | 9 | 5 | 60 |
| 9 | 10 | 8 | 4 | 12 | 12 | 9 | 5 | 60 |
| 10 | 25 | 20 | 10 | 30 | 30 | 20 | 15 | 150 |

An item receives one primary strand only. `P`, `X`, `F`, and `D` items may carry
secondary competency tags for diagnostics.

### 6.3 Coverage weighting

For section exams:

1. every eligible unit contributes at least one scored item;
2. remaining targets are weighted by eligible sense count;
3. frequency/priority and communicative utility influence selection within a
   unit;
4. enforce POS balance so noun-heavy units do not erase verbs, descriptive
   verbs, function words, and fixed expressions;
5. enforce macrostrand and competency quotas;
6. select without replacement unless a target is deliberately tested in two
   materially different strands;
7. cap same-surface repetitions.

Do not give every unit an equal number of items when unit sizes differ. Equal
unit quotas are useful for diagnostic presence, but proportional sampling is
needed for content representativeness.

## Exam 1 Spec — First Words Achievement Exam

- `id`: `word-exam-1`
- Scope: Section 1
- Unlock: Section 1 complete
- Length/time: 40 items / 30 minutes
- Purpose: certify the post-Hangul lexical on-ramp.

Required coverage:

- all three Section 1 units;
- greetings, courtesy, requests, repair expressions, identity, people,
  demonstratives, question words, numbers, and high-utility fixed forms;
- basic audio recognition;
- typed recall of frequent fixed expressions and simple word forms;
- limited polite-present recognition/production only where clearly taught and
  supported.

Do not demand broad tense, formal-register, honorific, or irregular production.

## Exam 2 Spec — Daily Life Achievement Exam

- `id`: `word-exam-2`
- Scope: Section 2
- Unlock: Section 2 complete
- Length/time: 50 items / 40 minutes

Required coverage:

- every Section 2 unit;
- routine actions, food, family, weather/nature, shopping, study, devices,
  travel, feelings;
- core particles/function words from `s2-grammar-u1`;
- at least five contextual particle/function items;
- polite-present forms only to the level explicitly taught so far.

## Exam 3 Spec — Out and About Achievement Exam

- `id`: `word-exam-3`
- Scope: Section 3
- Unlock: Section 3 complete
- Length/time: 50 items / 40 minutes

Required coverage:

- every Section 3 unit;
- body/movement, hobbies, work, calendar/time, study, transport, nature;
- motion/place contexts;
- connecting-clause/function items from `s3-grammar-u2`;
- mixed word classes and no domination by the largest track;
- any past/negation production only if the competency map proves it has been
  explicitly taught by this point.

## Exam 4 Spec — People & Plans Achievement Exam

- `id`: `word-exam-4`
- Scope: Section 4
- Unlock: Section 4 complete
- Length/time: 50 items / 40 minutes

Required coverage:

- every Section 4 unit;
- actions/plans, meals, descriptions, nature, clothing, payment, study,
  station/travel, jobs;
- at least five transactional/service contexts;
- at least five descriptive-verb targets;
- mixed eligible present/past/negation contexts without naming the required form.

## Exam 5 Spec — Core Foundations Midterm

- `id`: `word-exam-5`
- Scope: Sections 1–4
- Unlock: Sections 1–4 complete
- Length/time: 80 items / 65 minutes

Required coverage:

- every included section;
- at least one item from every included unit when mathematically possible;
- otherwise a documented rotating coverage matrix across official seed forms;
- mixed sections within each part rather than four mini-tests;
- no selection based on the learner's recent lessons or SRS;
- explicit section, macrostrand, and competency subscores.

The midterm is the first strong transfer test: it should mix competing words and
forms from unrelated themes.

## Exam 6 Spec — Getting Things Done Achievement Exam

- `id`: `word-exam-6`
- Scope: Section 5
- Unlock: Section 5 complete
- Length/time: 50 items / 40 minutes

Required coverage:

- every Section 5 unit;
- clinic, cooking, actions, plans, descriptions, seasons, study, city, work;
- `s5-grammar-u3` register and respect content;
- separate items/tags for listener speech level, subject honorific, and lexical
  honorific choice;
- at least seven `F` items, including both recognition and production where
  supported;
- no medical advice—language only.

## Exam 7 Spec — Wider World Achievement Exam

- `id`: `word-exam-7`
- Scope: Section 6
- Unlock: Section 6 complete
- Length/time: 50 items / 40 minutes

Required coverage:

- every Section 6 unit;
- health recovery, hobbies, technology, helping actions, daily life, small talk,
  shopping, projects, travel;
- mixed concrete and abstract lexical contexts;
- continued cumulative register/form sampling from prior grammar units;
- at least six verb/descriptive-verb targets in non-citation forms.

## Exam 8 Spec — Depth & Nuance Achievement Exam

- `id`: `word-exam-8`
- Scope: Section 7
- Unlock: Section 7 complete
- Length/time: 60 items / 50 minutes

Required coverage:

- every Section 7 unit;
- `s7-grammar-u4` modifier forms, irregular families, and extended
  connectives/particles;
- at least nine `F` items;
- at least five `D` items;
- irregular diagnostics separated by family;
- context-rich same-surface and contrast items;
- issue #316 resolved before diagnostic labels ship.

## Exam 9 Spec — Finishing the Core Achievement Exam

- `id`: `word-exam-9`
- Scope: Section 8
- Unlock: Section 8 complete
- Length/time: 60 items / 50 minutes

Required coverage:

- every Section 8 unit;
- late core people, shopping, travel, action, and feeling vocabulary;
- difficult lexical contrasts and polysemy;
- cumulative eligible forms from earlier grammar milestones;
- no dependence on lesson recency or generated unit-title fragments;
- at least 40% of items in `P`, `X`, `F`, or `D` combined.

## Exam 10 Spec — Core Words Final Achievement Exam

- `id`: `word-exam-10`
- Scope: Sections 1–8
- Unlock: all Words sections complete
- Length/time: 150 items / 120 minutes
- Purpose: serious cumulative evidence of Core Words achievement.

### Final coverage layers

#### Layer A — 75 unit anchors

- Exactly one target from every current unit at the 75-unit baseline.
- Anchor strand rotates by deterministic seed schedule so a unit is not always
  tested receptively.
- If the unit count changes, require an explicit blueprint-version review.

#### Layer B — 45 proportional breadth/deployment items

- Weight by eligible sense count, frequency/priority, POS, and communicative
  utility.
- Do not let small units receive the same total weight as units three times
  their size.
- Maintain section and macrostrand balance.

#### Layer C — 30 specialist items

- form/tense/negation/register/honorific/irregular control;
- function words/connectives/modifiers;
- sense, contrast, and collocation depth.

### Final invariants

- every section and unit appears;
- all six macrostrands meet the exact allocation in §6.2;
- at least 30 unique audio targets;
- at least 30 typed production items;
- at least 30 contextual-use items;
- at least 20 form/register items;
- at least 15 depth items;
- at least 20 verbs/descriptive verbs in eligible non-citation forms;
- no more than three targets sharing one Korean surface;
- one primary strand per item for clean score interpretation.

## 7. Scoring, cut scores, and mastery

### 7.1 Provisional score bands

Cut scores cannot become truly defensible merely because they are written in a
spec. They require item data and standard setting. Version 2 launches with these
**provisional achievement bands**:

#### Section exams

- **Pass:** 75% overall, with `R` at least 70%, `P` at least 60%, and combined
  `X+F` at least 60%.
- **Distinction:** 88% overall, with every scored macrostrand at least 75%.

Exam 1 has no separate `F` floor because its form sample is intentionally small;
its context floor uses `X` alone.

#### Midterm

- **Pass:** 75% overall; no section below 60%; `P` and combined `X+F` each at
  least 60%.
- **Distinction:** 88% overall; no section below 75%; every macrostrand at least
  75%.

#### Final

- **Final passed:** 80% overall; `R` at least 75%; `P` at least 65%; `X` at
  least 65%; `F` at least 60%; no section below 60%.
- **Final distinction:** 90% overall; every major macrostrand at least 80%; no
  section below 75%.

### 7.2 Mastery requires delayed confirmation

One good sitting is not enough evidence of retained mastery.

After a learner first earns at least **88% overall**, with `R`, `P`, `X`, and
`F` all at least 75% and every section at least 70%:

1. open a 60-item **retention confirmation** on the same Exam 10 card after 7
   days;
2. allow completion for 21 days;
3. use a new seed and no repeated target from the qualifying attempt where the
   bank permits;
4. require at least 80% overall, `P` and `X+F` at least 65%, and no section
   below 60%;
5. only then award **Core Words mastered**.

This confirmation is part of Exam 10, not an eleventh exam.

Once earned, the historical mastery badge remains. A later lower retake may show
current performance separately but does not erase the earned achievement.

### 7.3 What scores may be called

Allowed:

- Words section passed;
- Core Words final passed;
- Core Words mastered after confirmation;
- receptive/productive/context/form/depth diagnostics.

Not allowed without external validation:

- TOPIK 1/2 equivalent;
- CEFR A1/A2 equivalent;
- fluent Korean;
- general Korean proficiency certified.

## 8. Result experience

Use `premiumCompletionHtml()` and the existing exam visual language.

Show:

- overall score and band;
- macrostrand profile (`R`, `C`, `P`, `X`, `F`, `D` with learner-facing names);
- section and unit diagnostics;
- separate tense/negation/register/honorific/irregular competency rows only when
  enough items were scored to make the row meaningful;
- at most three weak-area routes;
- full answer review after submission;
- candidate answer, correct answer, and concise explanation of the tested
  distinction;
- retake action;
- Exam 10 retention-confirmation status where applicable.

Do not display a percentage subscore based on one or two items. Show
`Not enough evidence this attempt` instead.

## 9. Audit contract

Add `scripts/audit-word-exams.mjs`. It must load the same browser globals and
hard-fail:

1. wrong exam count, IDs, order, lengths, times, or allocations;
2. missing section/unit/lesson/word references;
3. omitted required unit coverage;
4. form tested before its mapped teaching milestone;
5. form target unsupported by authored forms or the inflection engine;
6. wrong macrostrand totals;
7. personalised selection from SRS/recent-history state;
8. duplicate item IDs;
9. repeated targets/surfaces beyond caps;
10. MCQ option count other than four;
11. duplicate or ambiguous options;
12. answer absent or present more than once after normalisation;
13. same-surface sense ambiguity without sufficient context;
14. missing audio;
15. typed item without a finite accepted-answer set;
16. invalid sentence blank or function frame;
17. future-section leakage;
18. candidate-visible answer leakage;
19. same seed not reproducing byte-equivalent metadata;
20. different official seeds not producing materially different valid forms;
21. POS imbalance beyond blueprint tolerances;
22. frequency/priority distribution outside blueprint tolerances;
23. final not covering every unit once in Layer A;
24. final Layer B not proportional to eligible content within tolerance;
25. result route that cannot resolve stable IDs;
26. malformed issue-#316 titles reachable in diagnostics;
27. any subscore displayed from fewer than the configured minimum items;
28. retention confirmation reusing prohibited targets when alternatives exist.

Generate a content-validity matrix on success:

```text
exam × section × unit × POS × macrostrand × competency × difficulty band
```

Audit at least 250 seeds per section exam, 500 for the midterm, and 1,000 for the
final. Print min/max/mean target exposure and coverage deviations.

## 10. Empirical validation before strong claims

Code audits establish integrity and content coverage, not psychometric validity.
Before calling the cut scores validated, pilot with real learners and inspect:

- item difficulty (proportion correct);
- item discrimination, including point-biserial where appropriate;
- distractor functioning;
- completion time by item mode;
- omission rates;
- reliability by macrostrand and total score;
- test–retest/alternate-seed stability;
- differential problems caused by typing speed or device size;
- expert content review against the competency map;
- standard setting for pass/mastery thresholds.

Until that work exists, UI/help copy must describe the thresholds as HanaPath
achievement standards, not externally certified proficiency standards.

## 11. Browser acceptance tests

Test with fresh, progressed, and migrated states:

- unlocks follow section completion only;
- exact item counts and timers;
- same seed reproduces, new seed varies;
- every MCQ has four unique choices;
- audio stops after two plays;
- Previous/Next/flag/review work without correctness feedback;
- final submission confirmation shows unanswered items;
- no hints, word-bank detail, SRS, or answer states leak during the attempt;
- quit discards and does not increment attempts;
- timeout submits;
- NFC typed grading and explicit spacing rules;
- form items never precede their teaching milestone;
- failed/passed exams do not alter SRS or curriculum progress;
- results and diagnostics persist after reload;
- weak-area routes open the correct unit/Form Check;
- final qualification opens retention confirmation only after seven days;
- confirmation expires after 21 days and can be re-earned through another
  qualifying final;
- mastery persists historically;
- Hangul exam remains unchanged;
- phone/tablet layouts allow comfortable typing, review, and submission.

## 12. Ship checklist

```bash
node --check app.js word_exam_blueprints.js sw.js
node scripts/audit-word-exams.mjs
node scripts/audit-words-data.mjs --strict
node scripts/audit-alphabet-audio.mjs --strict
node scripts/audit-hangul-mastery-exam.mjs
node scripts/audit-app-shell.mjs
```

Also:

- generate and human-review the competency milestone report;
- run inflection audits if shared helpers change;
- resolve or coordinate issue #316;
- serve statically and complete §11;
- bump all required cache/query versions;
- update `docs/EXAM_TAB_HANDOVER.md` after actual shipment;
- keep implementation coherent but split into more than one PR if needed to
  preserve reviewability: data/audit first, runner/UI second is acceptable;
- follow repository landing policy.

## 13. Evidence and reference notes

The design is informed by:

- [National Institute for International Education — TOPIK overview](https://www.niied.go.kr/web/NIIED/contents/niiedEng/eng_topikOverview): proficiency tests sample broader language skills and should not be conflated with a lexical achievement test.
- [National Institute of Korean Language — Korean Standard Curriculum resources](https://www.korean.go.kr/front/etcData/etcDataView.do?etc_seq=660&mn_id=208): teaching and assessment align linguistic knowledge with communicative contexts and curriculum achievement.
- [King Sejong Institute beginner workbook 1A](https://nuri.iksi.or.kr/front/cms/contents/layout2/learningsejong/detail.do?csCmsMastrSeq=15227&menuSn=649): vocabulary, grammar, and functions are practised across varied contexts.
- [King Sejong Korean Conversation design](https://www.ksif.or.kr/newsletter_eng/18_06/1-2.html): listening and speaking stages deploy previously learned vocabulary and grammar in everyday dialogues.
- [Council of Europe — CEFR Companion Volume](https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-companion-volume-and-its-language-versions): curriculum, teaching, and assessment should be coherent, with profiles across communicative activities and competences rather than a single decontextualised grammar score.
- [ACTFL Proficiency Guidelines 2024 overview](https://www.actfl.org/proficiency-guidelines-overview): proficiency concerns what learners can do in real-world listening, speaking, reading, and writing; this Words suite is narrower and must say so.
- Webb, S. (2009), “The Effects of Receptive and Productive Learning of Word Pairs on Vocabulary Knowledge,” [`10.1177/0033688209343854`](https://doi.org/10.1177/0033688209343854): receptive and productive learning produce different knowledge gains.
- Edmonds et al. (2022), “Exploring the construct validity of tests used to assess L2 productive vocabulary knowledge,” [`10.1016/j.system.2022.102855`](https://doi.org/10.1016/j.system.2022.102855): receptive and productive vocabulary emerge as distinct constructs.
- Nakata & Suzuki (2019), “Mixing Grammar Exercises Facilitates Long-Term Retention,” [`10.1111/modl.12581`](https://doi.org/10.1111/modl.12581): interleaved grammar practice improved the delayed post-test in that study.
- Pan et al. (2019), “Does Interleaved Practice Enhance Foreign Language Learning?” [`10.1037/edu0000290`](https://doi.org/10.1037/edu0000290): findings on Spanish tense learning were more mixed, supporting a balanced blocked-practice/mixed-assessment policy rather than a simplistic universal claim.

# Opus 4.8 Handover Prompt

> **Paste-ready prompt.** Give this repository to Opus 4.8 and say:
> **“Read `docs/CORE_WORD_EXAM_SPECS.md` and execute the Opus 4.8 handover fully.”**

---

You are implementing the research-revised **Core Word Examination Suite** in
HanaPath.

## Your first responsibility: verify the construct map

Do not begin by drawing ten exam cards. First re-derive the live curriculum and
produce the competency milestone report required by §3.3. In particular, prove
where past, negation, polite formal, listener politeness, subject honorific,
modifier, connective, and irregular-family production are explicitly taught.

A generatable form is not automatically a taught form. Do not test a competency
before its teaching milestone.

## Build contract

1. Add `word_exam_blueprints.js` with ten version-2 blueprints matching §6 and
   Exam 1 Spec through Exam 10 Spec.
2. Add the reviewed `HANAPATH_WORD_EXAM_COMPETENCIES` map.
3. Add the Core Words exam cards beneath Hangul.
4. Build one shared Words exam runner.
5. Allow Previous/Next, flags, and a pre-submission review screen; show no
   correctness before submission.
6. Reuse existing Words/audio/typing/function/inflection engines.
7. Keep receptive, cued, productive, contextual, form, and depth strands
   separate.
8. Add backward-compatible `state.wordExams` version 2 persistence.
9. Add deterministic, non-personalised stratified generation.
10. Implement the 150-item final and its 60-item delayed retention confirmation.
11. Add `scripts/audit-word-exams.mjs` implementing §9.
12. Resolve or coordinate issue #316 before acceptance.
13. Update `docs/EXAM_TAB_HANDOVER.md` only after shipment.
14. Run all checks, cache bumps, and browser acceptance tests.

## Non-negotiable decisions

- Ten exams exactly; the retention confirmation is part of Exam 10.
- Do not create separate formal present/past/polite exams.
- Add form-specific subscores and eligibility gates instead.
- One shared runner, no giant frozen banks.
- Four-option vocabulary MCQs.
- `meaning-to-ko` MCQ is cued selection, not productive recall.
- No full-sentence translation or speaking construct inside Words exams.
- No SRS/recent-history personalisation of formal test forms.
- No hints, teaching aids, or feedback before submission.
- Full review after submission.
- Exams never mutate learning progress.
- Cut scores remain described as provisional HanaPath achievement standards
  until real learner calibration exists.
- Do not claim TOPIK/CEFR equivalence.
- Keep the root app vanilla/static.

## Read first

1. `CLAUDE.md`
2. this file
3. `docs/WORDS_CURRICULUM_V2_PLAN.md`
4. `docs/VOCABULARY_TEACHING_SPEC.md`
5. `docs/WORDS_SECTION_MASTER_SPEC.md`
6. `docs/HANGUL_MASTERY_EXAM_CLAUDE_SPEC.md`
7. `docs/EXAM_TAB_HANDOVER.md`
8. `words_lesson_plan.js`
9. `words_curated_core.js`
10. `words_inflect.js`
11. Words question generators and the Hangul exam runner in `app.js`

## Required checks

```bash
node --check app.js word_exam_blueprints.js sw.js
node scripts/audit-word-exams.mjs
node scripts/audit-words-data.mjs --strict
node scripts/audit-alphabet-audio.mjs --strict
node scripts/audit-hangul-mastery-exam.mjs
node scripts/audit-app-shell.mjs
```

Done-when is §§9–12. Do not ship guessed competency milestones, premature form
items, silent quota reductions, ambiguous distractors, personalised formal test
forms, or unsupported proficiency claims.