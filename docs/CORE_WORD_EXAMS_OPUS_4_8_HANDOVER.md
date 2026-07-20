# One-shot handover — build the Core Word Examination Suite (Opus 4.8)

> **Paste-ready implementation prompt.** This file is addressed directly to
> Opus 4.8. The governing product and assessment contract is
> [`CORE_WORD_EXAM_SPECS.md`](CORE_WORD_EXAM_SPECS.md). Where this handover and
> that specification differ, the specification wins.

---

You are implementing the complete, research-revised **Core Word Examination
Suite** in the HanaPath repository.

This is not a brainstorming task and not a request for another plan. Inspect the
live repository, verify the curriculum-to-assessment map, implement the suite,
run the audits and browser checks, document actual deviations, and ship the work
according to the repository's model-family landing policy.

Do not claim completion from static review alone. The work is complete only when
the generated examinations run end-to-end in the browser and every required
audit and acceptance test passes.

## 0. Governing objective

Build ten curriculum-achievement examinations for HanaPath Core Words:

1. Eight section examinations, one after each Words section.
2. One cumulative midterm after Section 4.
3. One cumulative final after Section 8.
4. A delayed retention confirmation attached to Exam 10; it is not an eleventh
   exam.

The suite must measure what HanaPath actually taught: receptive recognition,
cued lexical selection, productive recall, contextual use, form/register
control, and lexical depth.

It must not claim TOPIK, CEFR, ACTFL, fluency, or broad Korean-proficiency
certification.

## 1. Read first, in this exact order

1. `CLAUDE.md`
2. `AI_INSTRUCTIONS.md`
3. `docs/CORE_WORD_EXAM_SPECS.md` — governing contract
4. `docs/WORDS_CURRICULUM_V2_PLAN.md`
5. `docs/VOCABULARY_TEACHING_SPEC.md`
6. `docs/WORDS_SECTION_MASTER_SPEC.md`
7. `docs/HANGUL_MASTERY_EXAM_CLAUDE_SPEC.md`
8. `docs/EXAM_TAB_HANDOVER.md`
9. `docs/EXAM_RUNNER_ONE_SHOT_PROMPT.md`
10. `words_curriculum_v2.js`
11. `words_lesson_plan.js`
12. `words_curated_core.js`
13. `words_inflect.js`
14. The Words lesson/question generators in `app.js`
15. The `EXAM HUB · HANGUL MASTERY EXAMINATION` block in `app.js`
16. Issue `#316`, which must be resolved or explicitly coordinated before final
    acceptance.

Do not trust remembered counts, old scorecards, generated titles, or comments
that say a phase is complete. Re-derive the live data and verify all claims
against the current branch.

## 2. First gate — prove the curriculum-to-competency map

Do **not** begin by drawing exam cards or writing a generic random-question
runner.

First generate a machine-readable competency milestone report for every form or
grammar competency that could enter a Words exam. At minimum cover:

- citation-form lexical identity;
- polite informal present;
- past;
- `안`, `못`, and eligible `-지 않다` negation;
- polite formal speech;
- listener politeness/register choice;
- subject honorification `-(으)시-`;
- honorific and humble lexical choice;
- particles and function words;
- connectives;
- present, past, and prospective noun modifiers;
- every supported irregular family;
- same-surface senses, curated contrasts, and collocations.

Use a reviewed data shape equivalent to:

```js
{
  competencyId,
  learnerLabel,
  firstTeachingUnitId,
  supportingLessonIds,
  eligibleWordIds,
  supportedModes,
  acceptedFormsSource,
  minimumExamSection,
  evidence
}
```

For each competency, prove all of the following:

1. It appears in a specific completed lesson/unit before the exam that tests it.
2. The learner had an actual practice opportunity, not merely an example sentence
   containing the form.
3. The target forms are backed by authored forms/inflections or an audited shared
   engine.
4. Prompts can supply enough context to make the intended form uniquely correct.
5. Accepted answers are explicit, finite, and sense-safe.

A form being technically generatable in `words_inflect.js` does **not** establish
that the curriculum taught it.

### Mandatory past/negation investigation

The curated data has a historical `tense-negation` group, but the visible v2 path
does not by title alone prove a clean past-and-negation teaching milestone.
Trace those rows into the actual v2 units and inspect their practice modes.

If explicit teaching cannot be demonstrated:

- do not assign scored past/negation production quotas before the verified
  milestone;
- do not silently infer eligibility from examples or engine output;
- open a focused curriculum issue describing the missing instruction/practice;
- keep affected exam quotas satisfiable with competencies that are genuinely
  taught;
- document the resulting deliberate limitation in the implementation PR.

This gate is complete only when the report is generated, reviewed against the
live data, and consumed by exam generation rather than left as dead documentation.

## 3. Locked product decisions

These decisions are not open for redesign:

- Keep exactly ten formal Words exams.
- Do not create separate formal Present Tense, Past Tense, Polite Korean, or
  Honorific exams.
- Put blocked form-specific checks under Learn/Words practice when useful; formal
  exams mix eligible forms and report competency subscores.
- Keep `Learn · Exam · Progress`.
- Place the Core Words suite below the Hangul Mastery Examination.
- Use one shared Words exam runner and ten declarative blueprints.
- Generate seeded, stratified attempts from current curriculum/data; do not
  author ten giant frozen banks.
- Do not personalise formal exam forms from SRS state, recent lessons, error
  history, or checkpoint recency.
- Use four-option vocabulary MCQs with exactly one defensible answer.
- Treat English/context → Korean MCQ as **cued selection**, not productive recall.
- Keep receptive, cued, productive, contextual, form/register, and lexical-depth
  scores separate.
- Allow Previous, Next, flagging, and a pre-submission review screen.
- Show no correctness, hints, answers, teaching notes, reference cards, Word Bank
  detail, or SRS state before final submission.
- Limit audio to two plays per item.
- Leaving an active attempt requires confirmation and discards it in v1.
- Exams never gate, re-lock, or mutate Words progression, SRS, review queues,
  streaks, or lesson completion.
- Full answer review appears only after submission.
- Cut scores remain labelled provisional HanaPath achievement standards until
  real learner calibration exists.
- Keep the canonical root app vanilla/static with no framework, bundler, or root
  build step.

## 4. Required implementation

### 4.1 Declarative data

Add `word_exam_blueprints.js`, loaded before `app.js`, containing:

```js
window.HANAPATH_WORD_EXAMS = [/* ten version-2 blueprints */];
window.HANAPATH_WORD_EXAM_COMPETENCIES = {/* reviewed milestone map */};
```

The ten blueprints must match `docs/CORE_WORD_EXAM_SPECS.md` exactly for:

- IDs and order;
- scopes and unlocks;
- item counts and time limits;
- macrostrand allocations;
- unit representation;
- weighting and POS controls;
- competency eligibility;
- pass/distinction/mastery rules;
- Exam 10 retention-confirmation behaviour.

Blueprints define constraints and quotas, not frozen item IDs.

### 4.2 Shared deterministic generator

Build one pure seeded generator that:

1. Resolves scope by stable section/unit/lesson/word IDs.
2. Applies the competency milestone gate before mode selection.
3. Guarantees required unit representation.
4. Fills remaining targets proportionally by eligible sense count while applying
   frequency, priority, POS, macrostrand, and competency tolerances.
5. Selects without replacement unless a deliberate cross-strand repeat is
   permitted.
6. Caps repeated Korean surfaces and same-surface sense exposure.
7. Generates four unique, defensible MCQ options.
8. Uses explicit accepted-answer sets for typed items.
9. Produces byte-equivalent item metadata for the same blueprint and seed.
10. Produces materially different valid forms for different official seeds.
11. Never reads learner SRS/recent-history data when constructing a formal form.
12. Fails loudly in development/audit when a quota cannot be met; never silently
    shrink or substitute an exam.

Keep item generation and grading as pure as practical so the audit and browser
runner use the same contracts.

### 4.3 Question construction

Reuse existing audited helpers for:

- Korean/audio → meaning;
- meaning/context → Korean selection;
- Korean typed recall;
- sentence blanks;
- function-word usage;
- form recognition and production;
- Korean input normalisation;
- audio lookup;
- inflection and accepted-form generation.

Do not create parallel audio, inflection, distractor, normalisation, or
sentence-blank engines.

Every scored item has exactly one primary macrostrand:

- `R` — receptive breadth;
- `C` — cued lexical selection;
- `P` — controlled production;
- `X` — contextual use;
- `F` — form and sociolinguistic control;
- `D` — lexical depth.

Secondary competency tags may diagnose tense, negation, register, honorific role,
particle, connective, modifier, irregular family, sense, or collocation.

For tense/register questions, context—not the instruction—must identify the
required form. Do not write prompts such as “Use the past tense.”

Do not turn Words exams into full-sentence translation, essay writing, broad
reading comprehension, or speaking tests.

### 4.4 Distractor and sense safety

Every MCQ must have four unique choices and exactly one defensible answer after
normalisation.

Hard-fail or reject generation when:

- duplicate glosses create multiple correct answers;
- sibling senses are offered without sufficient context;
- accepted variants of the answer appear as distractors;
- a morphology trap contaminates an item intended to test lexical meaning;
- options are absurd enough to make the answer obvious without word knowledge;
- the correct answer is absent or appears more than once;
- the item depends on an unverified generated context.

Prefer authored examples, patterns, contrasts, forms, and usage metadata.
Generated contexts require a dedicated invariant and human-reviewable audit
output.

### 4.5 Shared runner and UI

Build one runner for all ten exams with entry points equivalent to:

```js
renderWordExamHub()
renderWordExamIntro(examId)
startWordExamAttempt(examId, options)
renderWordExamAttempt()
renderWordExamReview()
submitWordExamAttempt()
renderWordExamResult(examId, result)
```

The exact names may differ if integration is cleaner, but do not build ten
parallel runners.

Required learner flow:

1. Exam card and requirements.
2. Candidate instructions and audio/input check where needed.
3. Timed attempt with Previous/Next and flag controls.
4. Neutral pre-submission review of answered, unanswered, and flagged items.
5. Final submit confirmation.
6. Score ceremony and diagnostics.
7. Full post-submission item review.
8. Retake with a fresh seed.
9. Exam 10 qualification/retention-confirmation state where applicable.

Reuse the existing alphabet exam/lesson visual language and
`premiumCompletionHtml()`. Do not invent a visually unrelated exam product.

During an active Words exam:

- never show correctness colours or answer feedback;
- never expose hints, explanations, Word Bank details, SRS state, or practice
  routes;
- intercept app navigation with a discard confirmation;
- keep the timer visible and auto-submit at zero;
- preserve touch-friendly typing and review controls on phone and tablet.

### 4.6 Persistence

Add backward-compatible `state.wordExams` version 2 persistence matching the
specification.

Persist compact results and diagnostics, including:

- attempts, best and latest score;
- pass/distinction status;
- Exam 10 qualifying and confirmation windows;
- historical mastery timestamp;
- section/track/unit totals;
- macrostrand totals;
- competency totals;
- POS totals;
- weakest stable IDs.

Do not persist a complete generated item bank as ordinary result history. Do not
mutate learning progress or SRS while normalising old saves.

### 4.7 Exam 10 retention confirmation

Implement Exam 10 exactly as specified:

- 150-item final with the required Layer A/B/C coverage model and macrostrand
  allocation;
- qualifying performance opens a 60-item confirmation no earlier than seven days
  later;
- confirmation remains available for the specified 21-day window;
- it uses a new seed and avoids targets from the qualifying attempt where the
  eligible bank permits;
- confirmation is part of Exam 10, not an eleventh card;
- only successful delayed confirmation awards `Core Words mastered`;
- historical mastery remains sticky after later lower retakes.

Do not add fake time travel or production shortcuts to the shipped UI. Browser
tests may inject dates/state through explicit test hooks or controlled fixtures.

## 5. Audit implementation

Add `scripts/audit-word-exams.mjs` using the same globals and generation contracts
as the browser.

Implement every hard failure in §9 of `CORE_WORD_EXAM_SPECS.md`, including:

- exact blueprint IDs/counts/lengths/times/allocations;
- valid stable references;
- required unit coverage;
- no competency before its teaching milestone;
- supported authored/audited forms only;
- exact macrostrand quotas;
- no formal-form personalisation;
- deterministic seed reproduction and sufficient cross-seed variation;
- four unique, unambiguous MCQ options;
- accepted-answer integrity;
- sense-safe context and distractors;
- audio coverage;
- valid sentence/function frames;
- no future-section or answer leakage;
- POS and frequency/priority tolerances;
- correct final Layer A/B/C coverage;
- stable result routes;
- issue-#316 title safety;
- no displayable subscore below the configured evidence minimum;
- retention-confirmation target separation where alternatives exist.

Audit at least:

- 250 seeds per section exam;
- 500 seeds for the midterm;
- 1,000 seeds for the final.

On success print a concise content-validity matrix and exposure summary:

```text
exam × section × unit × POS × macrostrand × competency × difficulty band
```

Include min/max/mean target exposure and coverage deviations. The output must be
useful for human review, not merely `PASS`.

## 6. Browser acceptance

Serve the app statically and test fresh, progressed, and migrated states.

At minimum verify:

- correct unlocks and card states;
- exact item counts and timers for all ten blueprints;
- deterministic same-seed forms and changed retakes;
- four unique options on every MCQ;
- two-play audio limit;
- Previous/Next, flagging, review, and answer editing without feedback;
- unanswered-item final confirmation;
- no teaching/SRS/reference leakage;
- quit/discard behaviour;
- timeout submission;
- NFC typed grading and explicit spacing flexibility only;
- forms never tested before teaching milestones;
- failure/pass/distinction never altering Words progress or SRS;
- persisted results after reload and safe old-save migration;
- stable weak-area routes to the correct unit or Form Check;
- qualification, seven-day delay, 21-day expiry, requalification, and sticky
  mastery for Exam 10;
- unchanged Hangul exam behaviour;
- usable phone/tablet layout without hidden actions or horizontal overflow.

Exercise representative failure, pass, distinction, final qualification,
confirmation failure, confirmation success, timeout, quit, retake, reload, and
migration paths. Do not validate only one happy-path seed.

## 7. Required checks

Run all relevant checks after implementation:

```bash
node --check app.js word_exam_blueprints.js sw.js
node scripts/audit-word-exams.mjs
node scripts/audit-words-data.mjs --strict
node scripts/audit-alphabet-audio.mjs --strict
node scripts/audit-hangul-mastery-exam.mjs
node scripts/audit-app-shell.mjs
```

Also run any existing inflection/recognition audit when shared helpers change.
If Korean text is added, follow `.agents/AGENTS.md` and regenerate/verify audio
through the normal pipeline; never hand-edit `audio_map.js`.

Bump `CACHE_NAME` and every matching `?v=` query for all touched loaded assets.

## 8. Shipping discipline

- Start from current `main`, not an obsolete local branch.
- Keep the work reviewable. A data/competency/audit PR followed by a runner/UI PR
  is acceptable and may be safer than one unreviewable mega-diff.
- Do not weaken quotas or silently drop unsupported competencies to make audits
  green.
- Resolve issue #316 or explicitly block final acceptance on it.
- Open focused follow-up issues for curriculum gaps discovered by the competency
  audit; do not bury them in commit prose.
- Update `docs/EXAM_TAB_HANDOVER.md` only after actual shipped behaviour is known.
- In the PR body state what changed, why, the competency-map findings, deliberate
  exclusions, validation performed, and any remaining empirical-calibration work.
- Follow the README/CLAUDE model-family landing policy after verification.

## 9. Done-when

The suite is complete only when:

- all ten exam cards exist and unlock correctly;
- the competency map proves every scored form was taught first;
- all ten audited blueprints generate their exact forms;
- one shared runner handles every exam;
- scores retain distinct `R/C/P/X/F/D` constructs;
- no answer, hint, or teaching aid leaks before submission;
- post-submission review and diagnostics work;
- results persist without touching learning state;
- issue #316 is resolved or final acceptance remains explicitly blocked;
- Exam 10 delayed confirmation works across real date/state transitions;
- the audit seed counts and content-validity reports pass;
- the full browser matrix passes on desktop and mobile-sized viewports;
- all existing strict Words, audio, Hangul-exam, and app-shell checks remain green;
- caches are correctly bumped;
- the handover records actual shipped behaviour and deviations;
- there are no stubs, dead buttons, placeholder generators, reduced quotas,
  silent fallbacks, or unsupported assessment claims.

Do not stop at a plan. Do not declare success from code inspection. Implement,
verify, document, and ship the complete reviewed scope.