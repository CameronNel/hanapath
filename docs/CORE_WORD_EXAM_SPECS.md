# HanaPath — Core Word Examination Suite

> **Owner-requested specification and Opus 4.8 handover.**
> This document defines ten formal examinations for the finite Core Words curriculum.
> It is the source of truth for product behaviour, coverage, scoring, generation,
> persistence, auditing, and implementation. All ten exam specifications live here.
>
> **Related prerequisite issue:** [#316 — Clean malformed late Words unit titles before exam diagnostics](https://github.com/CameronNel/hanapath/issues/316).

## 0. Owner decision

HanaPath will add ten formal Core Word examinations to the existing **Exam** tab:

1. Eight section examinations, one for each shipped Words section.
2. One cumulative midterm after Section 4.
3. One cumulative Core Word Mastery Examination after Section 8.

These examinations are **not replacements for unit checkpoints**. Unit checkpoints remain
the ordinary progression mechanism. Formal exams certify cumulative retrieval, reveal weak
areas, and provide a serious closed-book assessment experience.

### 0.1 Locked product decisions

- Keep the existing `Learn · Exam · Progress` information architecture.
- Place the Core Word examination suite beneath the Hangul Mastery Examination in the Exam tab.
- Reuse the existing Hangul exam visual shell and exam-mode restrictions instead of creating a
  second visual language.
- Use one shared Words exam runner and ten declarative blueprints. Do **not** build ten parallel runners.
- Generate attempts from the shipped curriculum and curated word data. Do **not** author ten giant
  static question banks that will drift from `words_curriculum_v2.js`.
- Every retake receives a newly seeded, stratified selection while preserving the same coverage quotas.
- Exams are forward-only: answer or skip, then `Next` permanently locks the item.
- Show no correctness feedback, hint, reveal, reference board, word-bank card, SRS state, or teaching
  explanation during an active attempt.
- Show the full answer review only after final submission.
- Audio may be played at most twice per item.
- Leaving an active exam requires confirmation and discards the in-memory attempt.
- Section progression must never be re-locked because an exam was failed or not attempted.
- Word exams do **not** inherit the Hangul exam's perfect-score mastery rule. Vocabulary is assessed by
  robust thresholds and skill floors, defined below.
- Multiple-choice vocabulary items use **four options**, not six. Vocabulary distractor quality and
  sense safety take priority over copying the Hangul exam's six-option format.
- Issue #316 must be resolved before final acceptance because weak-area diagnostics expose unit titles.

## 1. Verified curriculum contract to re-check before implementation

The expected baseline on `main` is:

- 2,028 curated word senses in `words_curated_core.js`.
- 8 Words sections.
- 75 units.
- 208 content lessons.
- 75 unit checkpoints.
- Every curated word ID allocated exactly once to a content lesson.
- Every unit ending in one checkpoint that reviews that unit's words.
- Existing exercise generators for recognition, audio, recall, typing, sentence context, function words,
  and inflected forms.

These numbers are an **expected baseline, not permission to hard-code stale counts**. The new audit must
derive the current values from the actual browser globals and fail with a clear drift report when a blueprint
cannot satisfy its coverage contract.

Read before implementation:

1. `CLAUDE.md`
2. `docs/WORDS_CURRICULUM_V2_PLAN.md`
3. `docs/VOCABULARY_TEACHING_SPEC.md`
4. `docs/WORDS_SECTION_MASTER_SPEC.md`
5. `docs/HANGUL_MASTERY_EXAM_CLAUDE_SPEC.md`
6. `docs/EXAM_TAB_HANDOVER.md`
7. The `EXAM HUB · HANGUL MASTERY EXAMINATION` block in `app.js`
8. `words_curriculum_v2.js`, `words_curated_core.js`, and `words_inflect.js`

## 2. Shared examination architecture

### 2.1 New data file

Add a plain browser-global file loaded before `app.js`:

```js
// word_exam_blueprints.js
window.HANAPATH_WORD_EXAMS = [
  {
    id: "word-exam-1",
    version: 1,
    order: 1,
    title: "First Words Examination",
    titleKo: "첫 단어 시험",
    scope: { sectionIds: ["s1"] },
    unlock: { completedSectionIds: ["s1"] },
    itemCount: 50,
    timeLimitMinutes: 25,
    pass: { minPct: 80 },
    distinction: { minPct: 90 },
    coverage: { /* declarative quotas */ }
  }
];
```

The blueprints describe **scope and quotas**, never frozen item IDs. The attempt generator resolves eligible
units, lessons, word IDs, senses, forms, examples, and audio from the current data at runtime.

### 2.2 Shared runner

Build one shared Words exam runner. Suggested entry points:

```js
renderWordExamHub()
renderWordExamIntro(examId)
startWordExamAttempt(examId, options)
renderWordExamAttempt()
submitWordExamAttempt()
renderWordExamResult(examId, attemptResult)
```

Names may differ if a cleaner integration already exists, but there must be one runner and one attempt-state
shape for all ten exams.

### 2.3 Attempt state

Attempt state is in memory only:

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
  verdicts,
  audioPlays,
  submitted: false
}
```

- Persist no resumable half-attempt in v1.
- `Next` records the current answer/verdict and advances. There is no Previous button.
- At 0:00, submit all locked answers plus the current item as answered or unanswered.
- Quit/navigation away discards the attempt after confirmation.
- Retake creates a new seed and a fresh stratified selection.

### 2.4 Persistent result record

Add a backward-compatible state record:

```js
state.wordExams = {
  version: 1,
  byExamId: {
    "word-exam-1": {
      blueprintVersion: 1,
      attempts: 0,
      bestCorrect: 0,
      bestPct: 0,
      passed: false,
      distinguished: false,
      mastered: false,
      completedAt: null,
      lastAttemptAt: null,
      lastResult: null
    }
  }
};
```

`lastResult` may retain compact diagnostic totals but must not store the entire generated item bank:

```js
{
  correct,
  total,
  pct,
  unanswered,
  durationSeconds,
  passed,
  distinguished,
  mastered,
  bySection,
  byTrack,
  byUnit,
  byMode,
  weakestUnitIds,
  weakestModes
}
```

Preserve old saves. Missing records backfill safely. Never mutate `vocabSrs`, lesson-completion arrays, or
section unlock state when normalizing exam results.

### 2.5 Question modes

Use existing generation and grading engines wherever possible:

| Mode | Direction | Grading |
|---|---|---|
| `ko-to-meaning` | Korean form → English meaning | four-option MCQ |
| `audio-to-meaning` | Korean audio → English meaning | four-option MCQ, two plays |
| `meaning-to-ko` | English meaning/context → Korean form | four-option MCQ |
| `type-ko` | English meaning/context → typed Korean | normalized strict accepted-form match |
| `sentence-blank` | Korean example with one target blank | typed or four-option according to viability |
| `function-usage` | choose/type the correct particle or connective | reuse existing function-word generator |
| `form-recognition` | inflected form → lemma/meaning/function | reuse inflection recognizer |
| `form-production` | prompt → typed inflected form | reuse inflection generator/accepted forms |
| `sense-disambiguation` | same surface or close contrast in context | context-first four-option MCQ |
| `register-choice` | scenario → appropriate register/honorific form | four-option MCQ |

Do not invent a parallel inflection engine, audio lookup, distractor engine, normalizer, or sentence-blank
engine. Improve shared helpers only when the existing helper cannot satisfy an exam invariant.

### 2.6 Distractor safety

Every MCQ must have exactly four unique options and exactly one defensible answer.

Distractors must be selected in this order:

1. Same learner-facing POS and compatible semantic domain.
2. Similar difficulty/priority band.
3. Different word ID and different accepted answer surface.
4. Exclude duplicate glosses that would make two options defensible.
5. Exclude sibling senses of the same surface unless the item is explicitly a context-rich
   `sense-disambiguation` question.
6. Exclude direct `contrastWith` pairs when the prompt does not provide enough context.
7. Exclude the answer's accepted inflection variants from distractors.

The audit must generate many seeded attempts for every blueprint and hard-fail ambiguity, duplicate options,
answer omission, or more than one option normalizing to an accepted answer.

### 2.7 Typed-answer grading

Typed responses must:

- Normalize Unicode to NFC.
- Trim surrounding whitespace.
- Accept the canonical `voiceText`/surface and deliberately declared accepted forms.
- Reject romanization and English.
- Never silently accept another curated sense merely because its surface is identical.
- Grade inflected production against the existing recognizer/generator rather than string heuristics.
- Record the error axis when derivable: orthography, lexical choice, inflection, particle, or register.

### 2.8 Common result experience

Use the same clean completion language as the alphabet lesson/exam flow:

- Score stage built with `premiumCompletionHtml()`.
- Passed exam: positive but sober completion.
- Distinction/mastery: crown tone and restrained celebration.
- Failed exam: neutral tone, no shame copy.
- Breakdown cards by section, track, unit, and skill mode.
- At most three prominent weak-area routes, each opening the exact Words unit.
- Full per-item answer review below the score stage, collapsible by exam part.
- Review shows prompt, candidate answer, correct answer, and ✓/✗ only after submission.
- Retake creates a new attempt immediately.
- Returning to the Exam hub preserves the score history.

## 3. Global scoring language

### 3.1 Section exams

- **Pass:** at least 80%.
- **Distinction:** at least 90%.
- No skill floor for Exam 1.
- Exams 2–4 and 6–9 additionally require at least 60% in `type-ko`.
- A submitted attempt always increments `attempts`, even when failed.
- Failing never blocks the next Words section.

### 3.2 Midterm

- **Pass:** at least 82%.
- No included section may be below 65%.
- **Distinction:** at least 90%, with no included section below 75%.

### 3.3 Final Core Word Mastery Examination

- **Pass:** at least 85%.
- No tested mode may be below 70%.
- **Core Words mastered:** at least 90%, no tested mode below 80%, and no section below 80%.
- Mastery is sticky once earned.
- A later lower retake updates `lastResult` but must not remove `mastered`.

## 4. Generation rules shared by all exams

1. Resolve eligible units from the blueprint's section scope.
2. Resolve each unit's content-word IDs from `newWordIds`; checkpoint rows add no new scope.
3. Guarantee the blueprint's unit representation before filling discretionary items.
4. Use a seeded PRNG; never use unseeded `Math.random()` for the final item selection.
5. Select item targets without replacement unless a blueprint explicitly requires two different modes for
   one target.
6. A word may appear twice only when the two items test materially different skills and the blueprint allows it.
7. Cap repeated surface forms so polysemy does not dominate an attempt.
8. Shuffle item order within exam parts, not across the entire exam, so the learner sees a coherent progression.
9. Shuffle MCQ option order independently.
10. Preserve the exact quota matrix on every retake.
11. If the generator cannot satisfy a quota, fail loudly in development/audit; do not silently reduce the exam.
12. Do not include words from future sections.
13. Exclude malformed or missing-audio rows; the audit should make their existence a release blocker rather than
    quietly reducing coverage.
14. Results route by stable IDs, never display-name string matching.

## Exam 1 Spec — First Words Examination

### Identity

- `id`: `word-exam-1`
- UI title: **First Words Examination**
- Korean title: **첫 단어 시험**
- Scope: Section 1 (`s1`, First Words)
- Unlock: Section 1 completed
- Length: **50 items**
- Time: **25 minutes**
- Pass: **80%**
- Distinction: **90%**
- Purpose: certify the post-Hangul on-ramp without overwhelming a new learner.

### Coverage

Every Section 1 unit must appear. Test:

- reading and identifying common Hangul words;
- greetings, thanks, apologies, requests, yes/no, and repair expressions;
- people, names, pronouns, and basic identity vocabulary;
- demonstratives and simple question words;
- numbers and other high-utility first exchanges;
- direct typed recall for the most reusable forms.

### Item allocation

| Part | Mode group | Items |
|---:|---|---:|
| 1 | `ko-to-meaning` | 12 |
| 2 | `audio-to-meaning` | 8 |
| 3 | `meaning-to-ko` | 8 |
| 4 | `type-ko` | 8 |
| 5 | `sentence-blank` / simple context | 8 |
| 6 | function, form, or sense distinction | 6 |
| **Total** |  | **50** |

### Special rules

- Avoid obscure inflection families.
- Context prompts must be short and beginner-readable.
- No `type-ko` skill floor.
- Wrong answers route to the exact First Words unit, not back to the Alphabet course unless the failure is
  explicitly orthographic and the existing app already supports that distinction.

## Exam 2 Spec — Daily Life Examination

### Identity

- `id`: `word-exam-2`
- UI title: **Daily Life Examination**
- Korean title: **일상생활 시험**
- Scope: Section 2 (`s2`, Daily Life)
- Unlock: Section 2 completed
- Length: **80 items**
- Time: **40 minutes**
- Pass: **80%**, including at least **60% typed recall**
- Distinction: **90%**

### Coverage

Every Section 2 unit must appear. Test:

- routine action verbs and morning activities;
- food ordering and basic meal vocabulary;
- family introductions and people terms;
- weather and everyday nature;
- shopping and market language;
- classroom/study language;
- everyday devices;
- finding one's way;
- early function words and particles;
- feelings and simple descriptions.

### Item allocation

| Part | Mode group | Items |
|---:|---|---:|
| 1 | `ko-to-meaning` | 16 |
| 2 | `audio-to-meaning` | 12 |
| 3 | `meaning-to-ko` | 12 |
| 4 | `type-ko` | 16 |
| 5 | `sentence-blank` / `function-usage` | 16 |
| 6 | form, register, or sense distinction | 8 |
| **Total** |  | **80** |

### Special rules

- Include at least one assessed item from every eligible unit.
- At least four context items must test location, topic, subject, or object marking.
- At least four audio items must use naturally confusable high-frequency words, but distractors remain
  meaning-safe.

## Exam 3 Spec — Out and About Examination

### Identity

- `id`: `word-exam-3`
- UI title: **Out and About Examination**
- Korean title: **외출과 이동 시험**
- Scope: Section 3 (`s3`, Out and About)
- Unlock: Section 3 completed
- Length: **80 items**
- Time: **40 minutes**
- Pass: **80%**, including at least **60% typed recall**
- Distinction: **90%**

### Coverage

Every Section 3 unit must appear. Test:

- body and movement;
- free-time plans and hobbies;
- workplace basics and meeting people;
- morning action verbs;
- calendar/time language;
- moods and weather-linked descriptions;
- connecting clauses;
- animals and nearby nature;
- study plans;
- transport and movement around town.

### Item allocation

Use the same 80-item allocation as Exam 2.

### Special rules

- At least six items test motion/place vocabulary in context.
- At least four items test connective or sequencing behaviour.
- Include a balanced mix of nouns, verbs, descriptive verbs, and function words.
- Do not allow the work or travel track to dominate merely because it has more viable sentence blanks.

## Exam 4 Spec — People & Plans Examination

### Identity

- `id`: `word-exam-4`
- UI title: **People & Plans Examination**
- Korean title: **사람과 계획 시험**
- Scope: Section 4 (`s4`, People & Plans)
- Unlock: Section 4 completed
- Length: **80 items**
- Time: **40 minutes**
- Pass: **80%**, including at least **60% typed recall**
- Distinction: **90%**

### Coverage

Every Section 4 unit must appear. Test:

- plans in motion;
- meals at home and drinks/dishes;
- room and person descriptions;
- outdoor/nature vocabulary;
- clothing choices;
- paying and transactions;
- reading/study activity;
- station and transport vocabulary;
- jobs and duties.

### Item allocation

Use the same 80-item allocation as Exam 2.

### Special rules

- Include at least six transactional or service-context items.
- Include at least six descriptive-verb items.
- Context must disambiguate clothing/size/payment vocabulary rather than relying on isolated glosses.
- Completion unlocks the Midterm tile but does not require that Exam 4 itself be passed.

## Exam 5 Spec — Core Foundations Midterm

### Identity

- `id`: `word-exam-5`
- UI title: **Core Foundations Midterm**
- Korean title: **핵심 어휘 중간시험**
- Scope: Sections 1–4
- Unlock: Sections 1–4 completed
- Length: **120 items**
- Time: **60 minutes**
- Pass: **82%**, with no included section below **65%**
- Distinction: **90%**, with no included section below **75%**
- Purpose: test transfer across themes after the first half of the Core curriculum.

### Coverage algorithm

- Every included section receives at least 15% of items.
- Remaining items are weighted by the number of eligible curated senses in each section.
- Every included track receives representation where viable.
- At least one item from every included unit when the current unit count permits; otherwise the audit must
  enforce a rotating seeded coverage schedule across three consecutive attempts.
- No more than two items may target the same word ID.

### Item allocation

| Part | Mode group | Items |
|---:|---|---:|
| 1 | `ko-to-meaning` | 20 |
| 2 | `audio-to-meaning` | 20 |
| 3 | `meaning-to-ko` | 20 |
| 4 | `type-ko` | 24 |
| 5 | sentence/function context | 24 |
| 6 | form, register, and sense distinction | 12 |
| **Total** |  | **120** |

### Special rules

- Do not group items by section; mix Sections 1–4 within each part.
- At least 30% of targets must be drawn from words not seen in the learner's most recent three completed
  unit checkpoints, preventing the midterm from becoming a recency quiz.
- Results show both overall skill modes and section-level floors.

## Exam 6 Spec — Getting Things Done Examination

### Identity

- `id`: `word-exam-6`
- UI title: **Getting Things Done Examination**
- Korean title: **일 처리 시험**
- Scope: Section 5 (`s5`, Getting Things Done)
- Unlock: Section 5 completed
- Length: **80 items**
- Time: **40 minutes**
- Pass: **80%**, including at least **60% typed recall**
- Distinction: **90%**

### Coverage

Every Section 5 unit must appear. Test:

- clinic and health-service vocabulary;
- cooking at home;
- register and respect;
- busy-afternoon actions;
- after-work plans;
- positive/negative descriptions;
- seasonal changes;
- school supplies and study;
- city landmarks;
- workday tasks.

### Item allocation

| Part | Mode group | Items |
|---:|---|---:|
| 1 | `ko-to-meaning` | 14 |
| 2 | `audio-to-meaning` | 12 |
| 3 | `meaning-to-ko` | 12 |
| 4 | `type-ko` | 16 |
| 5 | sentence/function context | 16 |
| 6 | form, honorific/register, or sense distinction | 10 |
| **Total** |  | **80** |

### Special rules

- At least six items test register, honorific, or service-context selection.
- Health items must avoid implying medical advice; they assess language only.
- Cooking and workday verbs must include inflected/contextual retrieval rather than isolated lemma matching.

## Exam 7 Spec — Wider World Examination

### Identity

- `id`: `word-exam-7`
- UI title: **Wider World Examination**
- Korean title: **넓은 세상 시험**
- Scope: Section 6 (`s6`, Wider World)
- Unlock: Section 6 completed
- Length: **80 items**
- Time: **40 minutes**
- Pass: **80%**, including at least **60% typed recall**
- Distinction: **90%**

### Coverage

Every Section 6 unit must appear. Test:

- health recovery and describing improvement;
- sports, games, and hobbies;
- desk/technology vocabulary;
- helping and cooperative actions;
- quiet-evening daily life;
- outdoor small talk;
- shopping together;
- project work;
- day trips and travel planning.

### Item allocation

Use the same 80-item allocation as Exam 6.

### Special rules

- At least eight items combine abstract and concrete vocabulary in context.
- At least six items test verbs through generated forms.
- Keep hobbies, technology, and travel balanced even if one track has more high-priority words.

## Exam 8 Spec — Depth & Nuance Examination

### Identity

- `id`: `word-exam-8`
- UI title: **Depth & Nuance Examination**
- Korean title: **깊이와 뉘앙스 시험**
- Scope: Section 7 (`s7`, Depth & Nuance)
- Unlock: Section 7 completed
- Length: **90 items**
- Time: **45 minutes**
- Pass: **80%**, including at least **60% typed recall**
- Distinction: **90%**

### Coverage

Every Section 7 unit must appear. This is the first section exam where morphology and lexical nuance become
a major scoring axis. Test:

- messages, calls, music, games, and movement;
- advanced everyday actions and descriptions;
- noun-modifying and connective forms;
- irregular-family recognition and production;
- function words;
- register/honorific selection;
- same-surface multi-sense rows;
- contrast pairs where context makes one answer uniquely correct.

### Item allocation

| Part | Mode group | Items |
|---:|---|---:|
| 1 | `ko-to-meaning` | 14 |
| 2 | `audio-to-meaning` | 12 |
| 3 | `meaning-to-ko` | 12 |
| 4 | `type-ko` | 18 |
| 5 | sentence/function context | 18 |
| 6 | form, register, and sense distinction | 16 |
| **Total** |  | **90** |

### Special rules

- At least eight items test irregular or generated forms.
- At least six items test function words in full phrase/sentence frames.
- At least six items are explicit sense-disambiguation questions.
- Issue #316 must be resolved before this exam's unit-diagnostic labels are accepted.

## Exam 9 Spec — Finishing the Core Examination

### Identity

- `id`: `word-exam-9`
- UI title: **Finishing the Core Examination**
- Korean title: **핵심 어휘 완주 시험**
- Scope: Section 8 (`s8`, Finishing the Core)
- Unlock: Section 8 completed
- Length: **90 items**
- Time: **45 minutes**
- Pass: **80%**, including at least **60% typed recall**
- Distinction: **90%**

### Coverage

Every Section 8 unit must appear. Test:

- less-common but still core people, shopping, travel, action, and feeling vocabulary;
- final-stage lexical contrasts;
- difficult context selection;
- polysemy and same-surface distinctions;
- productive forms and function words carried into late units;
- typed recall without dependence on recent lesson order.

### Item allocation

Use the same 90-item allocation as Exam 8.

### Special rules

- At least 20% of items must be production or context-heavy items from earlier modes, not simple recognition.
- At least eight items must deliberately contrast plausible near-neighbours.
- Avoid machine-generated unit-title text in all candidate and result copy; stable IDs resolve to cleaned titles
  after issue #316.

## Exam 10 Spec — Core Word Mastery Examination

### Identity

- `id`: `word-exam-10`
- UI title: **Core Word Mastery Examination**
- Korean title: **핵심 어휘 종합시험**
- Scope: Sections 1–8, the complete finite Core curriculum
- Unlock: all eight Words sections completed
- Length: **200 items**
- Time: **90 minutes**
- Pass: **85%**, with no tested mode below **70%**
- Core Words mastered: **90%**, no tested mode below **80%**, and no section below **80%**
- Purpose: provide a serious cumulative certification without demanding impossible perfect recall.

### Fixed coverage matrix

The 200 items are generated in two layers:

#### Layer A — unit anchors: 150 items

- Exactly **two anchor items per current unit** at the expected 75-unit baseline.
- If the unit count changes, the audit must force an explicit blueprint-version update rather than silently
  changing the exam length.
- Each unit contributes one receptive item and one productive/contextual item where viable.
- Unit anchors may use the same word ID twice only when the tasks are materially different and the unit lacks
  enough eligible targets; this must be reported by the audit.

#### Layer B — specialist cumulative items: 50 items

- 20 function-word, inflection, honorific, or register items.
- 15 polysemy, `contrastWith`, or sense-disambiguation items.
- 15 hard audio/context items sampled across sections.

### Mode floors inside the 200 items

The generated attempt must contain at least:

- 30 `ko-to-meaning`;
- 30 `audio-to-meaning`;
- 30 `meaning-to-ko`;
- 40 typed production items, including `type-ko` and `form-production`;
- 40 sentence/function context items;
- 30 morphology/register/sense items.

An item may count toward one primary mode only for scoring-floor purposes.

### Special rules

- Every section and every unit appears on every attempt.
- Item order is mixed within six formal parts; do not present eight mini section tests.
- No more than three targets may share the same Korean surface.
- At least 25 targets must come from multi-sense or contrast-linked data.
- At least 20 targets must test verbs/descriptive verbs in non-citation forms.
- At least 15 targets must test function words or endings in context.
- At least 30 audio targets must be unique.
- The result screen shows section, track, unit, and mode diagnostics, but only the three weakest unit routes
  receive primary action buttons.
- Once `mastered` becomes true it remains true across later retakes and blueprint-compatible migrations.

## 5. Exam hub and unlocking

The Exam hub order is:

1. Hangul Mastery Examination
2. Core Words heading/intro
3. Exam 1 through Exam 10 in numerical order

Each card shows:

- exam number and title;
- scope;
- item count and time limit;
- locked/available/passed/distinction/mastered state;
- best score;
- most recent score when different;
- attempts;
- primary action: `View requirements`, `Start exam`, `Retake`, or `Review result`.

Unlock is based only on section completion. Passing Exam N is never a prerequisite for Exam N+1.
Exam 5 appears after Exam 4 and unlocks when Sections 1–4 are complete.
Exam 10 unlocks when all eight sections are complete.

## 6. Exam-mode restrictions

While a Words exam is active:

- Intercept bottom navigation and detail-bar back navigation with a quit confirmation.
- Suppress all Word Bank detail routes, hints, reveals, translations beyond the current prompt, SRS indicators,
  pronunciation notes, usage notes, and lesson links.
- Do not show correct/incorrect colour states.
- Do not mutate SRS, review queues, streaks, XP, lesson completion, or curriculum progress.
- No auto-advance.
- No Previous, flag, revisit, or editable answer-review screen.
- Allow `Skip` through the same forward-only `Next` action when no response exists.
- Typed and canvas-like controls, if any, may expose only neutral input affordances.
- At final submission, show unanswered count in a confirmation dialog but do not allow returning to items.
- Answer explanations appear only after submission.

## 7. Audit contract

Add `scripts/audit-word-exams.mjs`. It must load the same data globals as the browser and hard-fail:

1. Missing or duplicate exam IDs/orders.
2. Wrong exam count (must be 10 for blueprint version 1).
3. Missing section IDs or unlock references.
4. Item/time/pass values that disagree with this document.
5. Failure to resolve current section/unit/lesson/word scope.
6. Any eligible unit omitted where a blueprint requires every unit.
7. Wrong item totals or mode quotas.
8. Duplicate item IDs within an attempt.
9. Repeated target beyond blueprint caps.
10. MCQ option count other than four.
11. Duplicate MCQ options.
12. Correct answer absent or appearing more than once after normalization.
13. Ambiguous same-gloss or accepted-form options.
14. Missing audio asset for any generated audio item.
15. Typed item with no accepted answer.
16. Form item unsupported by the inflection recognizer/generator.
17. Sentence blank with an empty/multiple/invalid target.
18. Future-section leakage.
19. Non-determinism: same blueprint + seed must produce byte-equivalent item metadata.
20. Insufficient variation: different seeds must produce materially different valid selections.
21. Final exam not covering every unit exactly twice in Layer A.
22. Result routes that cannot resolve stable unit IDs.
23. Candidate-visible answer leakage in prompt/instruction metadata.
24. Malformed unit titles from issue #316 still reachable in result diagnostics.

Audit at least 100 seeds per section exam and 250 seeds for the final exam. Print a concise coverage table on success.

## 8. Browser acceptance tests

Test as a cold learner with a fresh state and with an existing progressed state:

- Locked cards show correct requirements.
- Completing a section unlocks its exam without requiring a page reload.
- Exam 5 unlocks after Section 4; Exam 10 unlocks after Section 8.
- Starting an attempt produces the correct item count and timer.
- Same seed reproduces the attempt; retake uses a different seed.
- MCQs always have four unique choices.
- Audio stops after two plays.
- `Next` locks answers; no Previous/revisit path exists.
- No hints, reference cards, SRS indicators, or answer feedback appear during the exam.
- Quit confirmation discards the attempt and does not increment attempts.
- Timeout submits correctly.
- Typed normalization accepts NFC-equivalent input and rejects romanization.
- Failed exam does not alter section progression or SRS.
- Passed/distinction/mastery states persist after reload.
- A later lower retake does not remove sticky mastery.
- Full answer review appears only after submission.
- Weak-area buttons open the exact unit.
- Existing Hangul exam behaviour remains unchanged.
- Mobile phone and tablet layouts keep question actions reachable without horizontal overflow.

## 9. Ship checklist

When implementing:

```bash
node --check app.js word_exam_blueprints.js sw.js
node scripts/audit-word-exams.mjs
node scripts/audit-words-data.mjs --strict
node scripts/audit-alphabet-audio.mjs --strict
node scripts/audit-hangul-mastery-exam.mjs
node scripts/audit-app-shell.mjs
```

Also:

- run any existing inflection audit if shared inflection helpers change;
- serve with `python -m http.server 8000`;
- complete the browser acceptance matrix above;
- bump `CACHE_NAME` and every matching `?v=` reference for each touched loaded asset;
- update `docs/EXAM_TAB_HANDOVER.md` with the shipped Words exam suite and any deliberate deviations;
- branch from `main`;
- keep the implementation one coherent, single-purpose PR;
- follow the README's model-family landing policy.

## 10. Done-when

The suite is done only when:

- all ten cards exist and unlock correctly;
- all ten blueprints generate audited attempts at their exact lengths;
- one shared forward-only runner handles every exam;
- no teaching aid or correctness feedback leaks during attempts;
- full answer review appears after submission;
- results persist without touching learning progress;
- diagnostics route to stable section/track/unit IDs;
- the final exam covers every unit on every attempt;
- issue #316 is resolved or the implementation PR is explicitly blocked from final acceptance;
- every listed audit and browser acceptance test passes;
- the Hangul exam remains green and behaviourally unchanged.

# Opus 4.8 Handover Prompt

> **Paste-ready prompt.** Give this repository to Opus 4.8 and say:
> **“Read `docs/CORE_WORD_EXAM_SPECS.md` and execute the Opus 4.8 handover fully.”**
> Everything below is addressed to that model.

---

You are implementing the complete **Core Word Examination Suite** in HanaPath.

The owner has approved ten formal Words exams: eight section exams, one midterm, and one final
Core Word Mastery Examination. The complete product, scoring, generation, persistence, audit, and
acceptance contract is in this file. Do not redesign it.

## Your task

Build the entire suite in one coherent implementation PR:

1. Add `word_exam_blueprints.js` with ten declarative blueprints matching **Exam 1 Spec** through
   **Exam 10 Spec** exactly.
2. Add the Core Words section and ten exam cards to the existing Exam hub beneath Hangul.
3. Build one shared forward-only Words exam runner.
4. Reuse existing Words question, distractor, audio, typing, sentence-blank, function-word, and
   inflection engines. Do not create parallel engines.
5. Add backward-compatible `state.wordExams` persistence.
6. Add seeded stratified attempt generation and post-submission diagnostics.
7. Add `scripts/audit-word-exams.mjs` implementing the complete audit contract.
8. Update `docs/EXAM_TAB_HANDOVER.md` after the suite is actually shipped.
9. Resolve or explicitly coordinate with issue #316 before final acceptance; malformed unit titles
   may not appear in diagnostics.
10. Run every check and browser acceptance test in this document, bump caches, and ship according
    to the repository model-family policy.

## Read first, in order

1. `CLAUDE.md`
2. `docs/CORE_WORD_EXAM_SPECS.md` — this file; governing contract
3. `docs/WORDS_CURRICULUM_V2_PLAN.md`
4. `docs/VOCABULARY_TEACHING_SPEC.md`
5. `docs/WORDS_SECTION_MASTER_SPEC.md`
6. `docs/HANGUL_MASTERY_EXAM_CLAUDE_SPEC.md`
7. `docs/EXAM_TAB_HANDOVER.md`
8. `docs/EXAM_RUNNER_ONE_SHOT_PROMPT.md`
9. `words_curriculum_v2.js`
10. `words_curated_core.js`
11. `words_inflect.js`
12. In `app.js`, the blocks for Words lesson question generation and
    `EXAM HUB · HANGUL MASTERY EXAMINATION`

## Non-negotiable owner decisions

- Ten exams exactly.
- One shared runner; no duplicated runner per exam.
- Dynamic seeded generation from shipped curriculum/data; no giant frozen banks.
- Four-option vocabulary MCQs.
- Forward-only; `Next` locks; no Previous, flags, or revisit.
- No correctness feedback or teaching aids until submission.
- Full per-item answer review after submission.
- Audio maximum two plays per item.
- Quit discards the attempt.
- Exams never gate or mutate normal Words progression/SRS.
- Exact lengths, times, thresholds, unit coverage, and mode quotas come from this file.
- The final exam is 200 items and covers every current unit with two Layer-A anchors.
- Core Words mastery is threshold-based, not 200/200.
- Reuse `premiumCompletionHtml()` and the existing alphabet exam/lesson visual language.
- Keep the root app vanilla/static with no framework or build step.

## Implementation discipline

Before editing, re-derive the live counts and map every relevant helper. Prefer small additive helpers
over rewriting stable lesson code. Keep grading pure and deterministic. Use stable IDs throughout.
Never use display-name string matching for scope or routing. Treat same-surface senses as separate
assessment targets and prevent ambiguous distractors.

Do not claim success from one happy-path attempt. The audit must exercise the required seed counts and
the browser test must cover failure, pass, distinction, final mastery, timeout, quit, retake, reload, and
old-save normalization.

## Required checks

```bash
node --check app.js word_exam_blueprints.js sw.js
node scripts/audit-word-exams.mjs
node scripts/audit-words-data.mjs --strict
node scripts/audit-alphabet-audio.mjs --strict
node scripts/audit-hangul-mastery-exam.mjs
node scripts/audit-app-shell.mjs
```

Run additional inflection/recognition checks if shared helpers change. Serve statically and complete the
full acceptance matrix in §8.

## Shipping

- Branch from current `main`.
- Keep the PR single-purpose.
- Bump all required caches and query strings.
- Update the handover with actual shipped details and deviations.
- Follow the README model-family policy for Opus after verification.

Done-when is §10 of this document. Do not leave stubs, placeholders, dead buttons, partial exams, reduced
quotas, silent fallbacks, or unaudited generators.
