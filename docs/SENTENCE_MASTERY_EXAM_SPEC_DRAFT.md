# HanaPath — Sentence Mastery Examination Specification Draft

> **Flagship Workstream A.** This is the governing Phase 2 draft for a formal
> Sentence examination programme built on the shipped Translate & Type
> curriculum. It is a sibling of
> [`docs/CORE_WORD_EXAM_SPECS.md`](https://github.com/CameronNel/hanapath/blob/55ac88981fdab0eb79cafd1770b25cde25340234/docs/CORE_WORD_EXAM_SPECS.md).
>
> **Status:** Planning contract, pending Claude repository-binding review and
> the eligibility audit required below.  
> **Audited application baseline:** `55ac88981fdab0eb79cafd1770b25cde25340234`.  
> **Locked input:** [Exam Programme decisions](https://github.com/CameronNel/hanapath/blob/claude/exam-section-audit-fxv6nh/docs/EXAM_PROGRAMME_DECISIONS_LOCKED.md).  
> **Evidence:** [Phase 1 research report](https://github.com/CameronNel/hanapath/blob/research/exam-programme-phase-1/docs/EXAM_PROGRAMME_RESEARCH_REPORT.md).

## 0. Executive decision

HanaPath will ship:

1. four cumulative Sentence stage examinations, unlocked after Sentences
   sections 2, 4, 6, and 8;
2. one cumulative Sentence Mastery Final after all eight sections;
3. one delayed retention confirmation attached to the final.

Every paper is seeded, deterministic, non-personalised, and generated from
reviewed eligible rows in `HANAPATH_SENTENCES`. Full-sentence Korean production
carries 80% of each paper. The existing learning helper ladder is disabled:
no tip, word bank, next chunk, reveal, correctness, or answer feedback appears
before submission.

The exam does not accept arbitrary “grammatically possible” rewrites. Each row
is classified as:

- canonical-only;
- authored finite-variant;
- excluded from typed certification.

The grader performs NFC normalization, trims outer whitespace, and collapses
repeated whitespace. It compares only against the canonical target and at most
four human-reviewed `acceptAlso` strings. It does not delete Korean word
boundaries or generate grammatical transformations.

The cut scores and time limits are **provisional HanaPath achievement
standards** until expert standard setting and learner pilot data exist.

## 1. Locked product decisions

- Four stage exams, one final, one retention mode.
- Stage unlocks are cumulative at Sentences sections 2, 4, 6, and 8.
- Stage/final/retention lengths are 24/50/25.
- Time limits are 40/75/40 minutes.
- Planning assumptions are 90 seconds per typed item and 20 seconds per
  selected item.
- No per-item timer; response-time instrumentation is mandatory.
- Reuse `P/F/X/R/C` with sentence-specific learner labels.
- Pattern tags are secondary diagnostics, not additional primary strands.
- 80% of every paper is typed production.
- Binary item scoring plus non-scoring diagnostic error tags.
- Three accepted-answer classes, maximum four reviewed alternatives.
- Five-attempt disjoint freshness window, `W=5`, `c=1`.
- Retention avoids the qualifying attempt.
- Minimum pool formula: `M_t = max(5q_t, q_t + r_t)`.
- No future-tense authoring. Workstream D is re-triggered only if audited
  `E_future < 25`.
- Stage pass 75%, final pass 75%, mastery qualification 88%, retention 75%
  (75%), 7-day opening, 21-day expiry, sticky mastery.
- Sentence-only graduated subscore guard:
  0–4 no percentage; 5–7 directional plus `n/N`; 8+ percentage; 10+ may carry
  a floor only after pilot review.
- The Words suite remains at `MIN_SUBSCORE_ITEMS = 3` in this workstream.
- Workstream 0 provenance and taint apply from the first Sentence attempt.
- Result-card and disclosure copy are exact as specified in §13.

## 2. Construct

### 2.1 Claim

The programme asks:

> How accurately and consistently can the learner produce the sentence
> patterns, forms, and contextual distinctions explicitly taught in HanaPath's
> finite Sentences curriculum, and retain that performance after delay?

### 2.2 Included competencies

- Korean sentence-final predicate placement;
- topic, subject, object, location, direction, possession, accompaniment, and
  limiting particles;
- present, past, and future polite forms;
- short and long negation;
- polite informal and polite formal listener speech level;
- subject honorification and supported honorific predicates;
- copula and negative copula;
- questions, imperatives, and proposals;
- time and counter phrases;
- connectives and clause relations;
- want, ability, obligation, comparison, and existence patterns;
- choosing a taught sentence pattern from context;
- producing the reviewed Korean target in Hangul.

### 2.3 Excluded constructs

- spontaneous conversation;
- speaking and pronunciation;
- essay writing;
- unrestricted translation quality;
- general Korean proficiency;
- TOPIK or CEFR equivalence;
- vocabulary outside the taught HanaPath scope;
- creativity, stylistic sophistication, or open paraphrase skill;
- Korean IME speed as a target construct.

## 3. Macrostrands

Each item has exactly one primary strand. Tags and error axes are secondary.

| Code | Sentence label | Construct | Typical modes |
|---|---|---|---|
| `P` | Sentence production | Produce a complete reviewed Korean sentence from a constrained English/context cue | `translate-type` |
| `F` | Form & register control | Produce the required tense, negation, ending, speech level, honorific, or modifier inside a complete sentence | typed `form-context` |
| `X` | Contextual integration | Produce a complete sentence whose particle, connective, modality, or clause relationship is forced by context | typed `context-production` |
| `R` | Sentence recognition | Recognise the meaning or contextual fit of a Korean sentence | four-option `sentence-recognition` |
| `C` | Cued discrimination | Choose the uniquely matching Korean sentence or form from four reviewed alternatives | four-option `sentence-choice` |

`R` and `C` support breadth and diagnosis. They may not carry the certification:
`P+F+X` is exactly 80% of each paper.

### 3.1 Exact strand allocations

| Paper | `P` | `F` | `X` | `R` | `C` | Typed | Selected | Total |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Stage 1–4 | 14 | 3 | 3 | 2 | 2 | 20 | 4 | 24 |
| Final | 30 | 6 | 4 | 5 | 5 | 40 | 10 | 50 |
| Retention | 15 | 3 | 2 | 3 | 2 | 20 | 5 | 25 |

An item cannot count toward two primary strands. It may satisfy several pattern
floors.

## 4. Answer normalization and grading

### 4.1 Exam normalization

```js
function normalizeSentenceExamAnswer(value) {
  return String(value == null ? "" : value)
    .normalize("NFC")
    .trim()
    .replace(/\s+/g, " ");
}
```

This deliberately differs from the current learning helper path described in
`SENTENCES_TEACHING_SPEC.md`, which may ignore spaces during supported
practice. Formal examination grading preserves Korean word boundaries.

### 4.2 Accepted-answer classes

#### Class 1: canonical-only

- one reviewed exam prompt;
- one canonical Korean answer;
- `acceptAlso` empty for exam purposes;
- the prompt forces tense, register, lexical choice, discourse role, and
  communicative act.

#### Class 2: authored finite-variant

- one canonical target;
- one to four reviewed alternative strings;
- every alternative is independently stored and reviewed;
- the alternatives remain the same intended response and construct;
- no rule generates an alternative at runtime.

#### Class 3: excluded typed scoring

A row is excluded when:

- the English prompt permits several ordinary lexical choices;
- topic/subject alternation changes or leaves information structure unresolved;
- a particle may legitimately be present or omitted without the prompt
  selecting one;
- several word orders are ordinary and construct-relevant;
- register is unspecified;
- tense is not forced;
- more than four legitimate strings are needed;
- accepted variants form a productive family rather than a finite list;
- the Korean target duplicates another canonical target under normalization;
- the row lacks a stable teaching route;
- the row contains untaught vocabulary or form for the paper scope.

Excluded rows remain available for learning and, where a unique option set can
be authored, `R` or `C`.

### 4.3 Prohibited automatic transformations

The grader must not automatically:

- exchange `은/는` with `이/가`;
- remove or insert particles;
- swap `을/를`, `에/에서`, or other markers;
- reorder tokens or clauses;
- replace words with synonyms;
- convert ordinary and honorific lexemes;
- convert `해요체` and `하십시오체`;
- generate contractions or expansions;
- remove all spaces;
- use edit distance, fuzzy matching, semantic similarity, embeddings, or an
  LLM;
- infer that a misspelling is “close enough”;
- accept a different communicative act.

### 4.4 Binary score

```text
1 point: normalized candidate equals one reviewed accepted string.
0 points: every other submitted candidate, including blank.
```

Diagnostics are computed after submission and do not change the point.

## 5. Eligibility metadata and review queue

### 5.1 Companion data contract

Add a plain browser global loaded after `sentences_core.js` and before the
Sentence exam engine:

```js
window.HANAPATH_SENTENCE_EXAM_ELIGIBILITY = {
  schemaVersion: 1,
  revision: "sentence-eligibility-v1",
  reviewedRows: {
    s0001: {
      typedClass: "canonical", // canonical | finite | excluded
      examPromptEn: "As for Hangul, say that it is fun to a classmate.",
      canonicalTargetKey: "한글은 재미있어요.",
      acceptedAnswers: ["한글은 재미있어요."],
      eligibleModes: ["translate-type", "sentence-recognition"],
      primaryCompetencies: ["topic", "present-polite"],
      supportingLessonIds: ["..."],
      minimumSectionOrder: 1,
      exclusionReasons: [],
      reviewStatus: "approved",
      reviewedAt: "2026-...",
      reviewerNote: ""
    }
  }
};
```

`acceptedAnswers` is derived from the row's canonical `korean` plus approved
`acceptAlso`, never maintained as an unrelated second truth. `examPromptEn` may
be more constrained than the learning `english` field but may not name the
required grammar form.

### 5.2 Canonical target key

```text
canonicalTargetKey = normalizeSentenceExamAnswer(row.korean)
```

Freshness and duplicate control use the canonical target key, not row ID. Two
rows with the same canonical target are one target.

### 5.3 Review order

The authoring/review queue is deterministic:

1. all rows carrying `copula-negative-anieyo`;
2. other thin tags in ascending raw pool size;
3. `future-geoyeyo`;
4. rows with existing non-empty `acceptAlso`;
5. formal/honorific rows;
6. remaining rows by section, unit, band, and stable ID.

This finds real pool failures before UI work.

### 5.4 Approval requirements

Every typed-eligible row has:

- explicit class;
- constrained exam prompt;
- one to five total accepted strings;
- stable canonical target key;
- teaching milestone;
- section scope;
- approved pattern tags;
- no unresolved exclusion reason;
- human review status.

No inferred default makes a row typed-eligible.

## 6. Eligibility census and fail-loudly floors

### 6.1 Per-tag eligible pool

For tag `t`:

```text
E_t = number of distinct canonicalTargetKey values among:
      approved Class 1 or Class 2 rows
      that carry t
      and are eligible for the relevant paper scope.
```

The audit reports raw rows, reviewed rows, excluded rows, duplicate targets,
Class 1, Class 2, `E_t`, required minimum, and margin.

### 6.2 Locked final and retention floors

| Tag | Raw rows | Final `q_t` | Retention `r_t` | Required `M_t` |
|---|---:|---:|---:|---:|
| `object-eul-reul` | 2,008 | 4 | 2 | 20 |
| `present-polite` | 1,963 | 4 | 2 | 20 |
| `subject-i-ga` | 1,344 | 4 | 2 | 20 |
| `past-polite` | 1,044 | 5 | 3 | 25 |
| `topic-neun` | 746 | 4 | 2 | 20 |
| `time-expression` | 648 | 3 | 2 | 15 |
| `location-e` | 620 | 3 | 2 | 15 |
| `location-eseo` | 433 | 3 | 2 | 15 |
| `possessive-ui` | 334 | 2 | 1 | 10 |
| `because-aseo` | 284 | 2 | 1 | 10 |
| `imperative-seyo` | 262 | 2 | 1 | 10 |
| `copula-ieyo` | 256 | 2 | 1 | 10 |
| `direction-euro` | 245 | 2 | 1 | 10 |
| `honorific-si` | 237 | 4 | 2 | 20 |
| `and-go` | 203 | 2 | 1 | 10 |
| `question-polite` | 203 | 2 | 1 | 10 |
| `with-hago-wa` | 191 | 2 | 1 | 10 |
| `formal-nida` | 190 | 4 | 2 | 20 |
| `if-myeon` | 189 | 2 | 1 | 10 |
| `existence-itda` | 171 | 2 | 1 | 10 |
| `counter-phrase` | 115 | 2 | 1 | 10 |
| `when-ttae` | 91 | 2 | 1 | 10 |
| `can-su-itda` | 79 | 2 | 1 | 10 |
| `must-ya-dwaeda` | 79 | 2 | 1 | 10 |
| `also-do` | 73 | 2 | 1 | 10 |
| `comparison-boda` | 73 | 2 | 1 | 10 |
| `want-go-sipda` | 69 | 2 | 1 | 10 |
| `neg-ji-anta` | 65 | 2 | 1 | 10 |
| `neg-an` | 64 | 2 | 1 | 10 |
| `neg-mot` | 53 | 2 | 1 | 10 |
| `future-geoyeyo` | 52 | 5 | 3 | 25 |
| `until-kkaji` | 52 | 1 | 1 | 5 |
| `propositive-eyo` | 41 | 1 | 1 | 5 |
| `but-jiman` | 36 | 2 | 1 | 10 |
| `only-man` | 36 | 1 | 1 | 5 |
| `from-buteo` | 34 | 1 | 1 | 5 |
| `copula-negative-anieyo` | 23 | 2 | 1 | 10 |

The formula is binding:

```text
M_t = max(5q_t, q_t + r_t)
```

### 6.3 Future-tense gate 🔒

```text
q_future = 5
r_future = 3
M_future = max(5×5, 5+3) = 25
```

The eligibility audit must hard-fail when `E_future < 25`. The failure message
must print:

- raw `future-geoyeyo` rows;
- excluded count by reason;
- duplicate canonical targets;
- Class 1 and Class 2 counts;
- `E_future`;
- deficit to 25;
- `🔒 Workstream D owner decision re-triggered`.

The implementation may not lower the quota, relax freshness, auto-accept
variants, or author new rows to hide the failure.

### 6.4 Other floor failures

Any `E_t < M_t` for a locked final quota is a hard failure. The report returns
to the owner with the exact tag and deficit. Stage-specific pools must also meet
their own five-attempt minima.

## 7. Blueprints

Add declarative `sentence_exam_blueprints.js`. Proposed globals:

```js
window.HANAPATH_SENTENCE_EXAMS = [ /* five blueprints */ ];
window.HANAPATH_SENTENCE_EXAM_META = {
  blueprintVersion: 1,
  eligibilityRevision: "sentence-eligibility-v1",
  macrostrands: ["P","F","X","R","C"],
  sentenceSubscoreGuard: { noPctBelow: 8, directionalFrom: 5, floorFrom: 10 },
  achievementStandardsProvisional: true
};
```

### 7.1 Exact paper table

| Order | ID | Title | Scope | Unlock | Items | Time |
|---:|---|---|---|---|---:|---:|
| 1 | `sentence-exam-1` | Foundational Sentence Achievement Exam · 기초 문장 성취 시험 | `sn1–sn2` | Sentences sections 1–2 complete | 24 | 40 min |
| 2 | `sentence-exam-2` | Time & Plans Sentence Achievement Exam · 시간과 계획 문장 성취 시험 | `sn1–sn4` | Sections 1–4 complete | 24 | 40 min |
| 3 | `sentence-exam-3` | Connected Sentence Achievement Exam · 연결 문장 성취 시험 | `sn1–sn6` | Sections 1–6 complete | 24 | 40 min |
| 4 | `sentence-exam-4` | Sentence Nuance Achievement Exam · 문장 뉘앙스 성취 시험 | `sn1–sn8` | Sections 1–8 complete | 24 | 40 min |
| 5 | `sentence-exam-5` | Sentence Mastery Final · 문장 완전 습득 최종 시험 | `sn1–sn8` | All eight sections complete | 50 | 75 min |
| mode | `sentence-exam-5:retention` | Retention Confirmation · 지연 확인 | final qualifier + 7 days | 21-day window | 25 | 40 min |

### 7.2 Stage tag floors

Floors overlap. They are minima inside 24 items, not additive allocations.

#### Stage 1

```text
present-polite 6
topic-neun 3
subject-i-ga 3
object-eul-reul 4
location-e 2
location-eseo 2
copula-ieyo 2
question-polite 2
time-expression 2
```

#### Stage 2

```text
present-polite 4
past-polite 4
future-geoyeyo 3
time-expression 3
object-eul-reul 4
subject-i-ga 3
topic-neun 3
location-e 2
location-eseo 2
neg-an 2
neg-mot 1
neg-ji-anta 1
want-go-sipda 2
can-su-itda 2
question-polite 2
```

#### Stage 3

```text
past-polite 4
future-geoyeyo 4
present-polite 3
formal-nida 3
honorific-si 3
imperative-seyo 2
propositive-eyo 1
neg-an 2
neg-mot 2
neg-ji-anta 2
and-go 2
but-jiman 2
because-aseo 2
if-myeon 2
when-ttae 1
object-eul-reul 3
subject-i-ga 3
topic-neun 2
```

#### Stage 4

```text
present-polite 3
past-polite 4
future-geoyeyo 4
formal-nida 4
honorific-si 4
object-eul-reul 3
subject-i-ga 3
topic-neun 3
time-expression 3
neg-an 2
neg-mot 2
neg-ji-anta 2
and-go 2
but-jiman 2
because-aseo 2
if-myeon 2
when-ttae 2
want-go-sipda 2
can-su-itda 2
must-ya-dwaeda 2
question-polite 2
imperative-seyo 2
```

Stage floors are provisional blueprint details implementing the locked
structure. Their feasibility is mandatory before runner work; a failure is
reported, not silently relaxed.

### 7.3 Final/retention tag floors

The final uses every `q_t` and retention uses every `r_t` from §6.2. Because
items carry several tags, the exact floors fit inside 50 and 25 items only if
the real eligibility matrix supports sufficient overlap. The audit must prove
this across mandated seeds before the blueprint is accepted.

### 7.4 Section and band coverage

- Stage 1: each included section at least 8 items.
- Stages 2–4: each newly added two-section band at least 8 items; every earlier
  two-section band at least 3.
- Final: every section at least 5 items; remaining 10 distributed
  proportionally by eligible target count.
- Retention: every two-section band at least 5 items.
- Every paper includes at least three difficulty bands where scope permits.
- Final includes all five internal bands where eligible.
- A 50-item final cannot cover all 75 units. Unit coverage is therefore audited
  across the five-attempt freshness window, with every eligible unit appearing
  at least once and exposure deviation reported.

## 8. Seeded generation

### 8.1 Inputs

```text
examId
blueprintVersion
eligibilityRevision
contentBankRevision
seed
attemptMode
freshnessHistory
qualifyingTargetKeys (retention only)
```

No SRS, recent errors, weak areas, lesson recency, or learner ability enters
selection.

### 8.2 Generation order

1. resolve blueprint and completed teaching scope;
2. load only approved eligibility rows;
3. remove rows above the paper's section/milestone;
4. remove canonical keys prohibited by freshness/retention;
5. reserve scarce tag floors first, sorted by eligible-pool pressure;
6. satisfy typed strand allocation;
7. satisfy selected strand allocation;
8. satisfy section and band floors;
9. fill remaining slots proportionally by eligible target count;
10. enforce one canonical target key per paper;
11. validate all overlapping floors;
12. seeded-shuffle final order;
13. assign deterministic item IDs and timing metadata.

### 8.3 Selected-response safety

Every `R` or `C` item:

- has exactly four unique options;
- has one defensible answer;
- uses reviewed distractors from in-scope rows;
- excludes accepted variants and duplicate canonical targets;
- does not expose the later typed answer through a repeated target;
- carries one primary strand.

### 8.4 Same surface and target caps

- same canonical target key: maximum 1 per paper;
- same Korean surface after normalization: maximum 1 per paper;
- same source row: maximum 1;
- same prompt text: maximum 1;
- same lexical focus may recur only where the canonical sentence differs and
  the five-attempt target-key rule is satisfied.

## 9. Freshness and attempt history

### 9.1 Five-attempt disjoint window

For each exam ID, ordinary attempts form a rolling window of five generated
papers. A canonical target key may appear once in that window.

Started attempts enter generation history immediately, with status:

```text
active | submitted | timed-out | discarded
```

Discarding removes answers and score but does not erase the presented target
keys from freshness history. This prevents quit-and-reroll previewing.

### 9.2 Retention

Retention:

- uses a fresh seed;
- excludes every canonical target key in the qualifying final;
- may reuse a target from an earlier non-qualifying attempt if it is outside the
  ordinary five-attempt window;
- never pairs across blueprint major versions;
- fails generation rather than repeating a prohibited qualifier target.

### 9.3 Deterministic fallback

If a seed cannot fill the blueprint:

1. try deterministic derived seeds `seed#1` through `seed#32`;
2. keep the first fully valid form;
3. record the resolved seed in provenance;
4. if none succeeds, do not start an attempt;
5. show `This exam form is temporarily unavailable because the reviewed item
   pool cannot meet its coverage rules`;
6. write no result and no progress mutation;
7. hard-fail the audit with the limiting pool.

The engine may not relax a locked floor, freshness rule, answer class, or
same-target cap.

## 10. Runner contract

Reuse the Core Words examination navigation precedent:

- Previous/Next and flagging allowed;
- pre-submission review allowed;
- no correctness, hints, answer reveal, teaching notes, lesson progress, SRS,
  or accepted variants shown before submission;
- audio at most twice where used;
- timeout submits current answers;
- quit confirms and discards answers;
- Korean IME composition events must not trigger premature validation;
- the helper ladder is unavailable, not merely visually hidden;
- no per-item timer;
- the whole-paper countdown remains visible;
- exams do not mutate Sentences learning, SRS, lesson completion, or crowns.

## 11. Scoring bands and mastery

All thresholds are provisional.

### 11.1 Stage

**Pass**

- overall at least 75%;
- typed `P+F+X` at least 70%;
- `P` at least 70%;
- no included two-section band below 60%.

**Distinction**

- overall at least 90%;
- typed at least 85%;
- no included two-section band below 75%.

### 11.2 Final

**Pass**

- overall at least 75%;
- typed at least 75%;
- `P` at least 75%;
- combined `F+X` at least 70%;
- no two-section band below 60%.

**Distinction**

- overall at least 90%;
- typed at least 85%;
- no two-section band below 75%.

### 11.3 Mastery qualification

- overall at least 88%;
- typed at least 85%;
- `P` at least 85%;
- `F` at least 80%;
- `X` at least 80%;
- no two-section band below 75%;
- result status `hanaPath`;
- complete provenance.

Qualification opens retention after seven days and expires 21 days after
opening.

### 11.4 Retention

- 19/25 correct, 75% or higher;
- typed at least 80%;
- no two-section band below 70%;
- no qualifying target repeats;
- compatible provenance and blueprint;
- result status `hanaPath`.

Passing awards sticky Sentence Mastery. A later lower result does not erase it.

### 11.5 Practice results

Workstream 0 applies. Practice results show rehearsal calculations but do not
set pass, distinction, qualification, retention, or mastery state.

## 12. Diagnostics and subscores

### 12.1 Error axes

After submission, typed answers may receive zero or more non-scoring axes:

```text
blank
orthography
spacing
lexical-choice
particle
tense
negation
register
honorific
ending
connective
word-order
copula
modality
extra-content
missing-content
unclassified
```

An error axis is shown only when a deterministic comparison supports it.
Otherwise use `The response did not match the reviewed accepted set`.

### 12.2 Graduated evidence guard

| Observations in this attempt | Display |
|---:|---|
| 0–4 | `Not enough evidence this attempt`; show `n/N`, no percentage |
| 5–7 | directional `Developing`, `Mixed`, or `Strong this attempt`; show `n/N`, no percentage |
| 8–9 | percentage plus `n/N`; diagnostic only |
| 10+ | percentage plus `n/N`; may carry a floor after pilot approval |

### 12.3 Known cross-suite inconsistency

The Core Words suite currently uses `MIN_SUBSCORE_ITEMS = 3`. This Sentence
specification deliberately uses the stricter guard above. **This workstream does not change Words reporting.** Cross-suite harmonisation is a separate
owner decision deferred until Sentence pilot data exists.

### 12.4 Weak-area routing

Show at most three routes. Each route resolves stable lesson IDs from
eligibility metadata:

- tense → the earliest supporting Sentences lesson for the failed row;
- particle/location → matching `sn2-grammar-u1` lesson;
- connectives → matching taught Sentences pattern lesson;
- register/honorific → matching section 5+ Sentences lesson;
- answer ambiguity/exclusion is never blamed on the learner.

## 13. Result experience

Show:

- result status: HanaPath, Practice, or legacy-incomplete;
- overall score and band;
- typed-production profile;
- macrostrand profile;
- two-section-band diagnostics;
- pattern rows under the graduated guard;
- duration and item-mode timing summary;
- up to three weak routes;
- full answer review;
- candidate, canonical answer, accepted variants, and concise explanation after
  submission;
- qualification/retention status;
- blueprint, engine, bank, and eligibility versions in details.

### 13.1 Exact mastery-card line

> You demonstrated and retained the taught HanaPath sentence patterns in this device-local assessment.

### 13.2 Full disclosure, one interaction away

> HanaPath Sentence Mastery records that, under this version of HanaPath's local assessment, you produced the taught sentence patterns accurately and retained that performance after a delayed confirmation. Results are stored on this device and are not proctored or tamper-proof credentials.

No result uses `official`, `verified`, TOPIK, or CEFR wording.

## 14. Persistence

```js
state.sentenceExams = {
  version: 1,
  byExamId: {
    "sentence-exam-1": {
      blueprintVersion: 1,
      attempts: 0,
      bestPct: 0,
      passed: false,
      distinguished: false,
      lastAttemptAt: null,
      lastResultAttemptId: null
    },
    "sentence-exam-5": {
      blueprintVersion: 1,
      attempts: 0,
      bestPct: 0,
      passed: false,
      distinguished: false,
      masteryEarnedAt: null,
      qualifyingAttemptId: null,
      confirmationDueFrom: null,
      confirmationExpiresAt: null,
      retentionAttemptId: null,
      lastAttemptAt: null,
      lastResultAttemptId: null
    }
  },
  generationHistory: {
    "sentence-exam-1": []
  }
};
```

Full results use Workstream 0's immutable provenance schema. Sentence results
populate `eligibilityRevision` from day one. `generationHistory` stores seed,
blueprint, eligibility revision, status, and canonical target keys, but not
discarded answers.

## 15. Response-time instrumentation and pilot gate

### 15.1 Per-item timing

Store locally:

```text
itemId
mode
primaryStrand
firstShownAt
lastShownAt
answerFirstChangedAt
answerLastChangedAt
submittedAt
activeVisibleMs
visitCount
answerChangeCount
answerLength
wasBlank
timedOut
deviceClass
viewportBucket
inputMethod: korean-ime | hardware | tile-fallback | unknown
```

Do not store keystroke content beyond the submitted candidate already required
for answer review. Pause active-visible timing while the document is hidden.

### 15.2 Timing pilot

Before calling 40/75/40-minute limits stable, inspect:

- median and 90th-percentile typed response time;
- selected response time;
- completion and timeout rates;
- blank rate by item position;
- correctness by item position;
- phone versus tablet/desktop;
- Korean IME versus fallback input;
- interruption/background duration;
- evidence of late-paper fatigue.

The locked launch limits remain the initial limits. Pilot findings that suggest
a change return to the owner and require a version bump.

## 16. Audit contract

Add `scripts/audit-sentence-exams.mjs`. It must hard-fail on:

1. wrong paper count, IDs, order, items, times, or unlock milestones;
2. wrong strand allocation or typed percentage;
3. a row without stable sentence, unit, section, or lesson references;
4. typed eligibility without explicit reviewed class;
5. canonical/finite class without an exam prompt;
6. finite class with more than four `acceptAlso` strings;
7. duplicate accepted answers after normalization;
8. canonical answer absent from the accepted set;
9. an excluded row entering a typed item;
10. automatic transformation code entering grading;
11. exam normalization deleting all spaces;
12. unresolved lexical, tense, register, particle, or word-order ambiguity;
13. candidate-visible accepted-answer leakage;
14. a typed row tested before its teaching milestone;
15. out-of-scope or untaught vocabulary;
16. invalid or missing pattern tags;
17. duplicate canonical target keys within one paper;
18. same surface or prompt beyond cap;
19. wrong MCQ option count;
20. duplicate, ambiguous, or accepted-variant distractors;
21. final or retention missing any exact tag floor;
22. any `E_t < M_t`;
23. `E_future < 25` without the explicit 🔒 re-trigger failure;
24. lowering a quota or freshness rule as fallback;
25. a stage-specific pool below its five-attempt requirement;
26. section or two-section-band coverage below floor;
27. difficulty-band coverage below floor;
28. personalised selection from SRS, errors, or lesson recency;
29. same seed not producing byte-equivalent item metadata;
30. different official seeds not producing materially different forms;
31. a five-attempt sequence repeating a prohibited canonical target;
32. discarded attempts disappearing from freshness history;
33. retention repeating a qualifying target;
34. a mastery pair crossing blueprint versions;
35. generated form failing after 32 deterministic fallback seeds;
36. wrong pass, distinction, qualification, or retention calculation;
37. a Practice result awarding progression;
38. missing Workstream 0 provenance;
39. a Sentence percentage displayed below eight observations;
40. a floor applied below ten observations without pilot approval;
41. omission of the known Words/Sentence subscore inconsistency note;
42. result-card or disclosure copy drift;
43. prohibited authenticity or external-equivalence wording;
44. missing weak-route lesson;
45. response-time instrumentation missing required fields;
46. full answer review unavailable after submission;
47. exam mutation of Sentences SRS, lessons, or crowns;
48. audio beyond two plays;
49. timeout not submitting;
50. quit preserving candidate answers.

### 16.1 Mandated seed counts

- each stage: 500 independent seeds;
- final: 1,000 independent seeds;
- retention: 500 qualifying/confirmation pairs;
- freshness: 250 five-attempt sequences per stage;
- final freshness: 500 five-attempt sequences;
- migrated and tainted fixtures: all paper types.

Print min/max/mean exposure by section, unit, band, strand, tag, class, and
canonical target key.

## 17. Browser acceptance tests

- exact five cards and retention mode;
- cumulative unlocks at sections 2/4/6/8;
- correct counts and timers;
- 20/40/20 typed items for stage/final/retention;
- no helper ladder or pre-submit feedback;
- navigation, flagging, and review;
- Korean IME composition behaves correctly;
- same seed reproduces;
- five attempts remain target-disjoint;
- quit discards answers but preserves freshness history;
- timeout submits;
- no more than two audio plays;
- canonical-only, finite-variant, and excluded fixtures grade correctly;
- spaces are collapsed but not globally removed;
- prohibited particle/order/register alternatives are rejected;
- selected items have four unique options;
- scoring and floors match §11;
- qualification opens after seven days;
- retention expires after 21 days;
- retention avoids qualifier targets;
- sticky mastery;
- Practice result cannot qualify;
- subscore guard at 4, 5, 7, 8, 9, and 10 observations;
- exact card and disclosure copy;
- result details show all provenance versions;
- weak routes open exact lessons;
- reload preserves active summary, results, and generation history;
- no Sentences progress/SRS mutation;
- phone layout supports 75-minute final navigation and typing;
- response-time records exclude hidden-tab time.

## 18. Standard setting and validation

Before stronger claims:

- expert panel reviews every typed eligibility decision;
- panel defines minimally competent performance for stage, final, and mastery;
- conduct a documented standard-setting exercise;
- pilot real learners;
- inspect difficulty, discrimination, reliability, timing, omissions,
  alternate-seed stability, classification consistency, and device/input
  effects;
- version any changed cuts or time limits;
- never regrade old results.

Until then, the UI says `provisional HanaPath achievement standards`.

## 19. Ship checklist

```bash
node --check app.js sentence_exam_blueprints.js sentence_exam_engine.js sw.js
node scripts/audit-sentences-data.mjs --strict
node scripts/audit-sentence-exams.mjs
node scripts/audit-exam-integrity.mjs
node scripts/audit-word-exams.mjs
node scripts/audit-app-shell.mjs
```

Also:

- human-review the complete eligibility queue;
- archive the eligibility census;
- stop if any locked pool fails;
- verify all exact lesson routes;
- serve statically and complete §17;
- run the timing pilot before declaring limits stable;
- bump cache/query versions only in implementation PRs;
- update handover docs only after shipment.

## 20. One-box-per-PR execution queue

| Box | One draft PR | Gate |
|---|---|---|
| `A1` | Add eligibility schema, review tooling, explicit classifications, and canonical target keys | Human review complete; no runner |
| `A2` | Add eligibility census and strict data audit, including `E_t` and future 25 gate | Every locked pool passes |
| `A3` | Add versioned blueprints and deterministic engine with seed/freshness audits | Mandated seeds green |
| `A4` | Bind Workstream 0 persistence, generation history, qualification, and retention | Taint/provenance fixtures green |
| `A5` | Build the shared runner and exact attempt controls | No feedback/hints leak |
| `A6` | Add result review, diagnostics, routes, exact claim copy, and timing instrumentation | Browser acceptance green |
| `A7` | Pilot timing/standards report and owner review of any version changes | Limits/cuts remain provisional until accepted |

Data, eligibility, and audits precede runner/UI.

## 21. Locked decisions

All Decisions 1–10, Decision 15 copy, and the Decision 6 scope amendment are
carried forward unchanged.

## 22. Open questions for the owner

None at drafting time. A failed eligibility, overlap, timing, or generator
feasibility gate returns with evidence and does not silently redesign a locked
decision.

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
