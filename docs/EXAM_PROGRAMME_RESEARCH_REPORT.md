# HanaPath Exam Programme Phase 1 Research Report

**Status:** Phase 1 research only  
**Commission:** [PR #319 research brief](https://github.com/CameronNel/hanapath/blob/claude/exam-section-audit-fxv6nh/docs/CHATGPT_EXAM_PROGRAMME_RESEARCH_BRIEF.md)  
**Audited application baseline:** `55ac88981fdab0eb79cafd1770b25cde25340234`  
**Research date:** 2026-07-21  
**Scope boundary:** No pronunciation or speaking assessment is designed here.

## 1. Executive conclusion

HanaPath can add a credible Sentence Mastery Examination without a server, fuzzy
matching, an LLM grader, or human raters, but only by narrowing what each typed
item asks the learner to produce.

The central recommendation is:

1. **[Evidence-backed] Use constrained English prompts and authored answer
   sets.** A typed item is eligible only when the prompt makes one taught Korean
   response uniquely recoverable, or when every legitimate alternative can be
   enumerated and reviewed in the existing `acceptAlso` mechanism. Ambiguous
   rows remain useful for learning or selected-response diagnosis but are
   excluded from exact-match certification.
2. **[Judgement call, supported by learning evidence] Use a five-exam ladder:
   four stage exams after Sentences sections 2, 4, 6, and 8, followed by a
   cumulative final.** The final has a delayed retention confirmation after
   seven days. This gives recurring evidence without duplicating the eight-card
   Words suite.
3. **[Judgement call] Make full-sentence typing 80% of every scored paper.**
   Stage exams contain 24 items, the final 50, and retention 25. Recommended
   time limits are 40, 75, and 40 minutes respectively. These limits are
   provisional because no suitable modern dataset was found for novice Korean
   typing speed on phone IMEs.
4. **[Evidence-backed] Score each item binary for certification and attach
   non-scoring diagnostic error tags.** A deterministic system can explain
   tense, particle, register, spacing, spelling, word-order, and lexical-choice
   errors after submission, but should not pretend that a rule-based partial
   score has psychometric meaning before validation.
5. **[Evidence-backed principle, judgement thresholds] Suppress fragile
   subscores.** Show no percentage below eight observations. Five to seven
   observations may produce a directional label with `n/N`; fewer than five
   produce no construct result.
6. **[Mathematical result] Do not commission future-tense expansion yet.**
   Under the recommended freshness contract, `future-geoyeyo` needs 25 distinct
   eligible targets. The raw bank has 52. The expansion workstream is triggered
   only if an eligibility and deduplication audit leaves fewer than 25.
7. **[Evidence-backed] Ship Workstream 0 before a new exam.** Device-local
   provenance improves traceability but cannot make `localStorage` results
   tamper-proof. Test-control use must taint affected attempts and prevent them
   from awarding mastery.
8. **[Judgement call] When typed Words past/negation teaching ships, add
   competency minima inside existing P/F allocations rather than enlarging the
   papers.** Bump the Words blueprint from v2 to v3, preserve old results
   immutably, and complete any live v2 retention window using frozen v2 rules.

These recommendations answer all seven owner questions in §11. The choices that
remain for the owner are separated into
`docs/EXAM_PROGRAMME_DECISION_MEMO.md`.

---

## 2. Repository verification

### 2.1 Baseline and architecture

The research brief correctly describes a static, deterministic architecture:

- Sentence rows are plain browser-global data. The first row demonstrates the
  schema fields `korean`, `english`, `tokens`, `band`, `patternTags`,
  `speechLevel`, `register`, `source`, `grammarTip`, and `acceptAlso` in
  [`sentences_core.js`](https://github.com/CameronNel/hanapath/blob/55ac88981fdab0eb79cafd1770b25cde25340234/sentences_core.js).
- The Word exam blueprint is declarative and contains no frozen item IDs. It
  defines scope, allocation, scoring, version, and retention in
  [`word_exam_blueprints.js`](https://github.com/CameronNel/hanapath/blob/55ac88981fdab0eb79cafd1770b25cde25340234/word_exam_blueprints.js), while
  generation and grading live in
  [`word_exam_engine.js`](https://github.com/CameronNel/hanapath/blob/55ac88981fdab0eb79cafd1770b25cde25340234/word_exam_engine.js).
- The Word engine resolves scope from blueprint section IDs and treats a
  competency as eligible once its first-teaching section is at or before the
  exam's maximum scope section. That matters for the Workstream C quota change:
  past and negation can become typed competencies in later exams without
  changing the basic scope model.
- `word_exam_blueprints.js` explicitly marks past tense and negation
  `scoredProduction: false`, because `s3-grammar-u2-l2` teaches them through
  recognition/context modes rather than typed form production.
- The existing blueprint already establishes important precedents:
  `MIN_SUBSCORE_ITEMS = 3`; provisional achievement standards; versioned
  blueprints; a 150-item final; a 60-item retention confirmation opening after
  seven days and expiring after 21; avoidance of qualifying-attempt targets;
  and immutable seeded generation.
- The brief's Appendix A reproduces the verified bank and curriculum counts and
  is treated as ground truth for this report.

### 2.2 Existing sentence answer handling

The current learning surface compares a normalized typed response against the
canonical Korean target plus the row's authored `acceptAlso` list, as audited in
the brief. Ninety-eight of 4,177 rows currently have non-empty accepted
alternatives. The design consequence is important:

> HanaPath already has the correct primitive for finite variation. It does not
> need a new grammatical rewrite engine. It needs an exam-eligibility layer,
> authoring review, and audits around the existing primitive.

The exam should preserve NFC normalization and harmless outer-whitespace
cleanup. It should not globally remove Korean spaces, substitute particles, or
reorder phrases. Those operations can change information structure or admit
answers that the prompt did not ask for.

### 2.3 Integrity condition

The baseline contains the owner-mandated live section-completion control
identified in the brief, and exam unlocks depend on the state that control
changes. Separately, HanaPath stores progress and results in `localStorage`.
Browser vendors document that local storage can be viewed and edited in
developer tools, and OWASP describes browser storage as directly inspectable
and editable.[^chrome-storage][^owasp-storage] Therefore provenance metadata
can make a record interpretable, but cannot make it externally trusted.

---

## 3. Hunt 1: How established Korean assessments constrain production

### 3.1 TOPIK

NIIED's official overview shows that TOPIK I, the beginner examination, contains
listening and reading only. PBT TOPIK II contains four writing questions within
the 180-minute paper.[^topik-overview] The official overview does not publish a
separate per-item time allowance for questions 51 to 54. Advice assigning five
minutes to question 51 or 52 is preparation guidance, not an official timing
contract, and must not be presented as official.

The research on TOPIK completion questions is more directly useful than the
essay tasks. Kim's analysis of items 51 and 52 argues that the answer should be
inferable from context and should combine content and grammatical clues; for
item 52, the author recommends one blank requiring one complete sentence.[^kim-topik]
That supports HanaPath prompts that constrain:

- event time, so tense is not optional;
- participant relationship, so register is recoverable;
- subject and object roles, so particle choice has a defined discourse reading;
- a named lexical frame or supplied vocabulary, so synonyms do not produce an
  open answer space;
- communicative purpose, so statement, question, imperative, and proposal are
  distinguished.

TOPIK is not an exact-match precedent. Its writing construct is sufficiently
open that trained human raters are required. A study of 150 TOPIK scripts
independently rated by 20 raters found severity and consistency differences and
identified confusion in applying criteria, using a many-facet Rasch analysis.[^topik-raters]
The lesson for HanaPath is not to imitate TOPIK scoring. It is to imitate the
constraint logic of completion items while avoiding tasks that require
judgement.

The absence of writing in TOPIK I means there is no official beginner TOPIK
model that validates exact-match sentence production. It does **not** imply that
beginner production should not be assessed. It means HanaPath must describe its
exam as a curriculum achievement assessment rather than a TOPIK-like
proficiency test.

### 3.2 King Sejong Institute and NIKL

KSIF says its achievement assessments evaluate speaking, listening, reading,
and writing separately against curriculum objectives, while its online level
test returns immediate automatically scored results.[^ksif-system] The current
SKA covers all four communicative skills, uses practical daily and workplace
tasks, and is aligned to NIKL's Standard Curriculum.[^ska] KSIF also operates
specific training programmes for speaking and writing raters.[^ska-raters]

This division is revealing:

- automatically scored level testing is possible where item formats are
  machine-scorable;
- open speaking and writing require trained raters;
- curriculum achievement and general proficiency are different claim types.

NIKL's Standard Curriculum includes a content framework, skill-level
achievement standards, and directions for teaching, learning, and
assessment.[^nikl] It is a valid construct-design reference, not an automatic
license to label a local exam with NIKL, TOPIK, or CEFR levels.

### 3.3 University placement tests

Yonsei publicly states that new learners are placed using listening, speaking,
reading, and writing results.[^yonsei] Public pages for Yonsei, SNU, and Sogang
do not expose enough item-level detail or marking keys to justify claims about
their acceptance of sentence variants. This is an evidence gap, not permission
to infer a policy.

### 3.4 Deterministic scoring research

Modern automated short-answer scoring normally relies on human-scored training
data, NLP features, semantic similarity, or large language models. ETS best
practices require validity, fairness, monitoring, and documented evidence when
automated scoring is used for constructed responses.[^ets-cr] Earlier ETS
`c-rater` work also targeted short responses with NLP rather than literal
matching.[^crater] Recent research notes that a single reference answer does
not cover the variety of valid responses and that manually authoring
paraphrases is costly.[^paraphrase]

That evidence establishes a boundary:

- **Exact matching is defensible when the response set is intentionally small,
  known, and auditable.**
- **Free translation is not made valid by adding a few normalization rules.**
- **When the valid set cannot be enumerated, the item must be excluded from
  typed certification or moved to a selected-response diagnostic.**

### 3.5 Prompt-design contract

| Rule | Purpose | Eligible class |
|---|---|---|
| Put a concrete time expression in the English prompt | Force present, past, or future | Canonical or finite variant |
| Identify the addressee or social setting | Force polite informal, formal, or plain register | Canonical or finite variant |
| Supply the lexical item when ordinary synonyms exist | Prevent arbitrary synonym expansion | Canonical |
| State discourse context, not only propositional content | Distinguish topic, focus, contrast, question, command, or proposal | Canonical or finite variant |
| Preserve one communicative act per prompt | Avoid several equally good clause structures | Canonical |
| Author every accepted contraction or permitted spacing form | Keep acceptance finite and reviewable | Finite variant |
| Exclude prompts with multiple legitimate particles, registers, clause orders, or lexicalizations | Prevent false negatives and false positives | Excluded |
| Never say “use the past tense” | Preserve the locked contextual-elicitation rule | All eligible items |

---

## 4. Hunt 2: Korean variation and the accepted-answer model

Korean allows real variation, but “grammatical” is not the same as “the same
answer.” Topic/focus marking, particle omission, and scrambling interact with
meaning and information structure. A deterministic exam must therefore be
stricter than ordinary conversation.

### 4.1 Decision table

| Phenomenon | Linguistic finding | Exam decision | Item class |
|---|---|---|---|
| `은/는` versus `이/가` | `은/는` commonly marks topic or contrast; `이/가` marks focus or neutral subject. The readings are not globally interchangeable.[^topic-focus] | Do not generate one from the other. Accept both only when the prompt's reviewed discourse context genuinely licenses both without changing the construct. Usually rewrite the prompt or exclude. | Canonical, finite variant, or excluded |
| Object/subject particle omission | Case-particle ellipsis depends on syntactic, semantic, and pragmatic conditions.[^ellipsis] | Formal achievement items require the taught particle unless omission is an explicit, human-reviewed target of that item. Do not globally accept omission. | Canonical or finite variant |
| Word-order scrambling | Korean word-order variation has syntactic and discourse consequences; work on information structure treats variation as communicatively motivated.[^scrambling][^word-order] | Accept only specifically authored permutations that preserve the intended information structure. If several orders are ordinary and the prompt cannot select among them, exclude typed scoring. | Finite variant or excluded |
| Contractions such as `이것은→이건`, `나는→난`, `무엇→뭐` | Standard contractions can preserve the intended proposition but alter style/register. | Accept only when compatible with the prompt's register and explicitly listed in `acceptAlso`. | Finite variant |
| `-어요/-여요/-해요` realization | Morphophonological surface choice follows the stem; one may be standard while another is an error. | Use the audited inflection/authoring source. Accept standard surfaces only, never edit-distance neighbours. | Canonical or finite variant |
| `하십시오체` versus `해요체` | These are different speech-level choices. | The prompt must name the setting/addressee. A different register is incorrect even when polite. Ambiguous prompts are excluded. | Canonical or excluded |
| Spacing | Korean orthography generally requires spacing, while specific rules permit attached alternatives, including some auxiliary constructions under Article 47.[^spacing] | Preserve canonical spacing. Permit only specific NIKL-sanctioned alternatives authored per row. Never remove all spaces before comparison. | Canonical or finite variant |
| Orthographic alternatives | Some spellings are standard alternatives; many learner forms are simply misspellings. | Accept only alternatives supported by an authoritative dictionary/rule and authored in the row. Reject misspellings. | Finite variant or incorrect |
| Punctuation | Final punctuation is usually not the grammatical construct in a short translation. | Normalize optional terminal punctuation only if the current learning grader already does so or Phase 2 explicitly audits it. Do not normalize internal punctuation that changes clause structure. | Implementation question |
| Whitespace noise | Leading/trailing or repeated UI whitespace does not represent language ability. | NFC-normalize, trim, and collapse repeated whitespace. Do not erase word boundaries. | All classes |

### 4.2 Worked examples required by §11-2

#### Particle alternation

**English prompt:** “As for Mina, she is a trainee.”  
**Target:** `미나는 연습생이에요.`

The phrase “as for” establishes a topic reading. `미나가 연습생이에요` is a
grammatical Korean sentence but answers a different information-structure
prompt. This is **canonical-only** unless a reviewed scenario demonstrates that
both readings are intended.

A prompt merely saying “Mina is a trainee” may permit either topic or neutral
subject depending on discourse. That version is **excluded** from typed
certification unless the surrounding prompt supplies context.

#### Word-order permutation

**Prompt context:** “Answer the question ‘What did Jisoo buy yesterday?’”  
**Target:** `지수는 어제 앨범을 샀어요.`

`어제 지수는 앨범을 샀어요` may be grammatical but changes the information
flow. It can be an **authored finite variant** only after human review confirms
that the exam is measuring tense/object marking rather than information
structure. A blanket permutation generator is prohibited.

#### Tense ambiguity

**Bad prompt:** “I go to practice.”  
English simple present can describe routine or a scheduled future event.

**Rewritten prompt:** “I went to practice yesterday.”  
**Target:** `어제 연습하러 갔어요.`

The rewritten item is **canonical-only** or finite-variant depending on lexical
constraints. The bad item is **excluded** for tense certification.

#### Register ambiguity

**Bad prompt:** “Please sit down.”  
It does not identify who is speaking to whom.

**Rewritten prompt:** “At a formal audition, tell the judge respectfully:
‘Please sit down.’”  
The setting can require the authored formal/honorific response. The rewritten
item is **canonical-only** if one taught form is expected. The bad item is
**excluded**.

### 4.3 Eligibility thresholds

**Recommended policy [judgement call]:**

- Canonical class: one canonical target, plus mechanically equivalent terminal
  punctuation handling if audited.
- Finite-variant class: canonical target plus no more than **four** reviewed
  strings in `acceptAlso`.
- Excluded class: more than four independently legitimate strings, any
  productive family of transformations, or unresolved discourse ambiguity.

The number four is an authoring-control threshold, not a linguistic law. It
keeps reviews inspectable and prevents `acceptAlso` from becoming a hand-built
parser. The owner may choose six, but should not choose an unlimited set.

**Initial bank forecast [judgement call, not yet audited]:**

| Class | Estimated share | Reason |
|---|---:|---|
| Canonical-only | 50-65% | Constrained everyday sentences with clear tense/register/lexicon |
| Authored finite variant | 10-20% | Standard contractions, narrow spacing variants, a small number of reviewed orders |
| Excluded typed scoring | 20-40% | Open lexical choice, particle ambiguity, discourse-sensitive order, under-specified English |

A Phase 2 eligibility audit must replace this estimate with real counts.

---

## 5. Hunt 3: Scoring, subscores, and standards

### 5.1 Binary versus partial credit

Open writing rubrics can produce analytic component scores, but those scores
depend on trained raters or validated automated models. Different rubric
structures are not interchangeable, and constructed-response scoring requires
evidence for the intended interpretation.[^ets-cr][^testing-standards]

HanaPath's deterministic item is different. The task is intentionally designed
so that the learner either produced one of the reviewed answers or did not.
For certification:

- **score the item 1 or 0;**
- after submission, compare the answer to diagnostic features;
- show which axes appear wrong, but do not convert those tags into fractions of
  a point until they have been validated against expert judgements and learner
  outcomes.

This avoids the false precision of awarding, for example, 0.75 because tense,
lexicon, and word order appear correct while a particle is wrong. Such weights
would encode an unvalidated theory of severity.

### 5.2 Learner-facing explanation

Recommended copy:

> This item is scored as one complete Korean response. Your answer did not match
> the reviewed accepted set, so it receives no point. The notes below identify
> parts that appear correct and the form to review; those notes help you learn
> but do not change the item score.

### 5.3 Minimum evidence for subscores

Subscore research repeatedly finds that requested diagnostic scores often add
little over a reliable total score. Added value requires strong reliability and
distinctiveness; operational studies have found useful subscores only in a
minority of cases.[^subscores-survey][^subscores-value]

There is no universal psychometric rule that “three items make a valid
percentage.” The current Words minimum of three is a sensible display guard,
not proof of a reportable construct score.

**Recommended display contract [judgement call]:**

| Evidence count for a pattern/construct | Display |
|---:|---|
| 0-4 | “Not enough evidence” and `n/N`; no percentage |
| 5-7 | Directional label: “developing”, “mixed”, or “strong in this attempt”; show `n/N`, no precise percentage |
| 8+ | Percentage may be shown, still labelled attempt-level diagnostic |
| 10+ in a primary macrostrand | Eligible for a pass/mastery floor after pilot review |

These rules reduce the risk that one error turns a two-item “subscore” from
100% to 50%. After pilot data exist, HanaPath should calculate reliability,
inter-pattern correlations, and whether each subscore predicts a parallel-form
subscore better than the total score.

### 5.4 Provisional cut scores

Standard setting is a documented judgement process, not a mathematical
discovery. NCME describes planning and conducting standard setting across
methods such as modified Angoff, Bookmark, and Body of Work.[^ncme-setting]
Language-assessment literature likewise treats Angoff and Bookmark as different
methods with strengths and weaknesses.[^angoff-bookmark]

For HanaPath:

1. Phase 2 may state provisional cut scores.
2. Before stronger claims, a panel should define the minimally competent
   learner for each paper.
3. Panelists should review representative items and expected performance,
   preferably through a modified Angoff or body-of-work exercise.
4. Pilot attempts should then supply completion rates, item difficulty,
   discrimination, timing, distractor performance, reliability, classification
   consistency, and subgroup checks.
5. Cuts and floors should be revised and versioned, never silently applied to
   historical results.

No proposed score is a TOPIK or CEFR equivalence.

---

## 6. Hunt 4: Learning structure, retention, and timing

### 6.1 Why typed production must dominate

Research comparing receptive and productive retrieval found that productive
retrieval was significantly more effective on a productive knowledge test,
while receptive retrieval best supported receptive outcomes.[^productive-retrieval]
This supports measuring sentence production by requiring sentence production,
not by allowing recognition items to carry the result.

Recognition remains useful for diagnosis, coverage, and lower-fatigue
transitions. It should be 20% of a paper, not the certification backbone.

### 6.2 Blocking in Form Checks, mixing in exams

Nakata and Suzuki found that interleaved grammar practice produced more errors
during training but better performance than blocking on a one-week delayed
test.[^nakata] Pan and colleagues likewise report benefits from systematic and
random interleaving in second-language grammar learning.[^pan]

The cautious design conclusion is:

- Form Checks are blocked and corrective because their job is acquisition,
  discrimination, and immediate feedback.
- Formal exams mix tense, particles, register, connectives, and modality
  because their job is independent selection under context.
- Early stage exams should still avoid chaotic mixing of forms that have not
  been taught by their unlock point.

### 6.3 Seven-day and 21-day retention window

Retrieval-practice and spacing research supports delayed testing and shows that
the effective spacing gap depends on the desired retention interval rather than
one universal schedule.[^spacing-learning] Recent EFL work also measures retrieval
effects immediately, at one week, and at one month.[^feedback-retention]

The existing seven-day opening and 21-day expiry are defensible programme
conventions:

- seven days prevents an immediate repeat from masquerading as retention;
- a 21-day completion window is operationally forgiving;
- the confirmation should use a fresh seed and avoid the qualifying targets;
- mastery remains sticky once earned, while the historical record preserves
  which blueprint and bank earned it.

This is evidence-aligned, not a claim that exactly seven and 21 days are
psychometrically optimal for Korean sentence production.

### 6.4 Phone typing and fatigue

No suitable contemporary dataset was located that estimates novice Korean
learner sentence-production speed on modern phone IMEs. Older Korean mobile
input studies concern historical keypad/layout conditions and cannot justify a
single present-day syllable-per-minute standard.[^korean-input]

Therefore timing is a **judgement call requiring instrumentation**.

Recommended planning assumptions:

- full-sentence typed item: 90 seconds average, including reading and planning;
- selected-response item: 20 seconds average;
- no per-item timer;
- one visible whole-paper countdown;
- collect item response times locally for pilot analysis, excluding abandoned
  attempts.

### 6.5 Recommended exam ladder

| Paper | Unlock | Items | Typed | Selected | Planning time | Limit |
|---|---|---:|---:|---:|---:|---:|
| Stage 1 | Sentences sections 1-2 complete | 24 | 20 | 4 | about 31 min | 40 min |
| Stage 2 | Sections 1-4 complete | 24 | 20 | 4 | about 31 min | 40 min |
| Stage 3 | Sections 1-6 complete | 24 | 20 | 4 | about 31 min | 40 min |
| Stage 4 | Sections 1-8 complete | 24 | 20 | 4 | about 31 min | 40 min |
| Final | All Sentences complete | 50 | 40 | 10 | about 63 min | 75 min |
| Retention | Qualifying final + 7 days | 25 | 20 | 5 | about 32 min | 40 min |

Recommended macrostrand reuse:

| Code | Sentence meaning | Stage | Final | Retention |
|---|---|---:|---:|---:|
| `P` | Full-sentence controlled production | 14 | 30 | 15 |
| `F` | Form and register control through typed production | 3 | 6 | 3 |
| `X` | Contextual integration through typed production | 3 | 4 | 2 |
| `R` | Receptive diagnosis | 2 | 5 | 3 |
| `C` | Cued selection/discrimination | 2 | 5 | 2 |
| **Total** |  | **24** | **50** | **25** |

Each item has one primary macrostrand, while pattern tags supply secondary
diagnostics.

A single final would create a large motivational cliff and too little
pre-final evidence. Eight section exams plus a final would duplicate the Words
suite and impose excessive testing. Four two-section stages are the middle
path.

---

## 7. Hunt 5: Honest claims and result integrity

### 7.1 Product precedents

Duolingo describes its Score as granular progress through course material and
distinguishes it from broad CEFR levels.[^duolingo-score] WaniKani explicitly
states the scope it teaches and says it does not teach grammar.[^wanikani]
Anki warns that one day's statistics are not a good indicator of overall
learning progress and separately reports retention information.[^anki]

The shared good practice is scope specificity:

- say what curriculum was covered;
- say what task was performed;
- avoid upgrading a product-internal result into an external credential;
- distinguish progress, achievement, retention, and proficiency.

The Council of Europe states that the CEFR is a non-prescriptive framework and
that it does not verify or validate a provider's claimed examination
alignment.[^cefr] HanaPath should not publish CEFR labels without a formal,
documented linking programme.

### 7.2 Recommended claim boundary

**Mastery claim:**

> HanaPath Sentence Mastery records that, under this version of HanaPath's
> local assessment, you produced the taught sentence patterns accurately and
> retained that performance after a delayed confirmation.

**Persistent integrity disclosure:**

> Results are stored on this device. They are not proctored, independently
> verified, or tamper-proof credentials.

**Prohibited copy:**

- “Korean proficiency certified”
- “TOPIK level”
- “CEFR level”
- “official result”
- “verified certificate”
- any implication that local provenance prevents editing

Use “HanaPath result” for ordinary untainted attempts and “Practice result” for
override-tainted attempts. Reserve no “official” label at all.

### 7.3 Test-control gating

The section-completion control must remain available by owner decision. The
recommended option is:

1. Hide it behind the existing private test-mode/query pattern rather than
   rendering it in ordinary use.
2. When it is used, append an irreversible local taint event with section IDs,
   timestamp, app version, and control ID.
3. An exam attempt whose scope intersects a tainted section records the taint.
4. The attempt may be taken and reviewed, but it is labelled `practice` and
   cannot qualify for mastery or retention.
5. A normal learner must be able to clear test data through an explicit
   developer reset; ordinary app actions must not silently erase provenance.

Because the ledger is local, a capable user can still edit it. Its function is
honest self-accounting and bug diagnosis, not external trust.

### 7.4 Minimum provenance schema

```text
resultSchemaVersion
attemptId
examId
attemptMode
blueprintVersion
engineVersion
generationSeed
contentBankRevision
eligibilityRevision
generatedAt
submittedAt
scopeSectionIds
itemCount
scoreSummary
floorSummary
status
overrideFlags[]
overrideEventIds[]
qualifyingAttemptId
retentionAttemptId
legacyProvenanceStatus
```

A local checksum may detect accidental corruption, but must not be described as
proof of authenticity. W3C PROV's separation of entities, activities, agents,
and timestamps is a useful conceptual reference for traceability.[^prov]

### 7.5 Migration and immutable history

- Never recalculate or relabel historical scores under a new blueprint.
- Backfill only fields that can be known. Mark unknown legacy provenance as
  `legacy-incomplete`.
- New attempts always use the current blueprint.
- A qualifying and retention pair must use the same blueprint major version
  and compatible bank/eligibility revision.
- Keep the old generator available until the last old retention window expires.

---

## 8. Hunt 6: Sampling mathematics

### 8.1 Definitions

For pattern tag `t`:

- `q_t`: required number of distinct eligible targets in one ordinary attempt;
- `r_t`: required number in retention;
- `N`: number of supported ordinary retakes after the first;
- `W = N + 1`: mutually fresh ordinary-attempt window;
- `c_t`: maximum times one canonical target may appear in that window;
- `E_t`: actual distinct **eligible** targets after typed-item classification
  and canonical-target deduplication.

The recommendation supports four ordinary retakes, so `W = 5`, and allows a
canonical target once within that freshness window, so `c_t = 1`.

### 8.2 Formula

For ordinary attempts:

```text
ordinary minimum = ceil(W × q_t / c_t)
```

For retention that must avoid the qualifying attempt:

```text
qualification-pair minimum = q_t + r_t
```

Therefore:

```text
M_t = max(ceil(W × q_t / c_t), q_t + r_t)
```

With `W = 5` and `c_t = 1`:

```text
M_t = max(5q_t, q_t + r_t)
```

This formula does **not** require retention to avoid every target in every
ordinary retake. It avoids the qualifying attempt, matching the existing Words
precedent. If the owner instead requires retention to avoid all five ordinary
attempts, the stronger minimum is `5q_t + r_t`.

A row count is only an upper bound. `E_t` must deduplicate identical Korean
targets and remove rows in the excluded answer class. A tag is exam-viable only
when `E_t >= M_t`.

### 8.3 Recommended final/retention tag floors

The quotas below are floors, not additive slots. One item may satisfy several
secondary tags while retaining exactly one primary macrostrand. Retention uses
`r_t = max(1, ceil(q_t / 2))`.

| Tag | Raw rows | Final quota `q` | Retention `r` | Required eligible `M` | Raw margin | Raw verdict |
|---|---:|---:|---:|---:|---:|---|
| `object-eul-reul` | 2,008 | 4 | 2 | 20 | +1,988 | Pass |
| `present-polite` | 1,963 | 4 | 2 | 20 | +1,943 | Pass |
| `subject-i-ga` | 1,344 | 4 | 2 | 20 | +1,324 | Pass |
| `past-polite` | 1,044 | 5 | 3 | 25 | +1,019 | Pass |
| `topic-neun` | 746 | 4 | 2 | 20 | +726 | Pass |
| `time-expression` | 648 | 3 | 2 | 15 | +633 | Pass |
| `location-e` | 620 | 3 | 2 | 15 | +605 | Pass |
| `location-eseo` | 433 | 3 | 2 | 15 | +418 | Pass |
| `possessive-ui` | 334 | 2 | 1 | 10 | +324 | Pass |
| `because-aseo` | 284 | 2 | 1 | 10 | +274 | Pass |
| `imperative-seyo` | 262 | 2 | 1 | 10 | +252 | Pass |
| `copula-ieyo` | 256 | 2 | 1 | 10 | +246 | Pass |
| `direction-euro` | 245 | 2 | 1 | 10 | +235 | Pass |
| `honorific-si` | 237 | 4 | 2 | 20 | +217 | Pass |
| `and-go` | 203 | 2 | 1 | 10 | +193 | Pass |
| `question-polite` | 203 | 2 | 1 | 10 | +193 | Pass |
| `with-hago-wa` | 191 | 2 | 1 | 10 | +181 | Pass |
| `formal-nida` | 190 | 4 | 2 | 20 | +170 | Pass |
| `if-myeon` | 189 | 2 | 1 | 10 | +179 | Pass |
| `existence-itda` | 171 | 2 | 1 | 10 | +161 | Pass |
| `counter-phrase` | 115 | 2 | 1 | 10 | +105 | Pass |
| `when-ttae` | 91 | 2 | 1 | 10 | +81 | Pass |
| `can-su-itda` | 79 | 2 | 1 | 10 | +69 | Pass |
| `must-ya-dwaeda` | 79 | 2 | 1 | 10 | +69 | Pass |
| `also-do` | 73 | 2 | 1 | 10 | +63 | Pass |
| `comparison-boda` | 73 | 2 | 1 | 10 | +63 | Pass |
| `want-go-sipda` | 69 | 2 | 1 | 10 | +59 | Pass |
| `neg-ji-anta` | 65 | 2 | 1 | 10 | +55 | Pass |
| `neg-an` | 64 | 2 | 1 | 10 | +54 | Pass |
| `neg-mot` | 53 | 2 | 1 | 10 | +43 | Pass |
| `future-geoyeyo` | 52 | 5 | 3 | 25 | +27 | Pass |
| `until-kkaji` | 52 | 1 | 1 | 5 | +47 | Pass |
| `propositive-eyo` | 41 | 1 | 1 | 5 | +36 | Pass |
| `but-jiman` | 36 | 2 | 1 | 10 | +26 | Pass |
| `only-man` | 36 | 1 | 1 | 5 | +31 | Pass |
| `from-buteo` | 34 | 1 | 1 | 5 | +29 | Pass |
| `copula-negative-anieyo` | 23 | 2 | 1 | 10 | +13 | Pass |

### 8.4 Explicit `future-geoyeyo` arithmetic

Recommended final quota:

```text
q_future = 5
r_future = ceil(5 / 2) = 3
W = 5
c = 1

M_future = max(5 × 5, 5 + 3)
         = max(25, 8)
         = 25 distinct eligible canonical targets
```

Raw census:

```text
52 raw rows - 25 required = 27 raw-row margin
```

The tag remains viable if at least `25 / 52 = 48.1%` of its raw rows survive
eligibility review and target deduplication. At a hypothetical 60% survival
rate it would retain about 31 targets, six above minimum.

**Decision:** 52 is not presently proven too small. Workstream D authoring is
not triggered. First ship an audit that calculates `E_t`. Trigger expansion
only when `E_future < 25`, or when the owner chooses stronger freshness,
larger quotas, or separate Form Check no-repeat guarantees.

### 8.5 Other thin pools

All 37 raw pools pass the recommended formula. The smallest raw margin is
`copula-negative-anieyo` at +13. That tag and the other small pools
(`from-buteo`, `only-man`, `but-jiman`, `propositive-eyo`) deserve early
eligibility review, because raw counts can hide duplicate surfaces and
ambiguous prompts.

Form Checks are repeatable practice, not certification. They may sample with
replacement across sessions and therefore do not need the five-attempt
certification minimum. Within one check, however, targets should remain unique.

---

## 9. Scoring and mastery recommendation

### 9.1 Provisional bands

These are **judgement calls** pending standard setting and pilot calibration.

| Paper | Pass | Distinction |
|---|---|---|
| Stage | overall ≥75%; typed P/F/X combined ≥70%; P ≥70%; no included section band <60% | overall ≥90%; typed ≥85%; no included section band <75% |
| Final | overall ≥80%; typed ≥75%; P ≥75%; F+X ≥70%; no two-section band <60% | overall ≥90%; typed ≥85%; no two-section band <75% |
| Mastery qualification | overall ≥88%; typed ≥85%; P ≥85%; F ≥80%; X ≥80%; no two-section band <75% | Not a separate band |
| Retention confirmation | overall ≥84% (21/25); typed ≥80%; no two-section band <70% | Awards sticky mastery |

A learner may pass the final without qualifying for mastery. A qualification
opens retention after seven days and expires 21 days after opening. A failed or
expired confirmation requires a new qualifying final.

### 9.2 Why 84% for retention

Twenty-one of 25 is 84%. It is high enough to require broad retained
performance but avoids requiring near-perfection from a small, production-heavy
paper. This number is provisional and should be reviewed with classification
consistency once pilot data exist.

---

## 10. Workstream C: typed Words past/negation consequences

### 10.1 Curriculum condition

Do not change scoring until the Words curriculum explicitly teaches typed
production of:

- `-았어요/-었어요`;
- `안`;
- `못`;
- `-지 않다`;
- `-지 못하다`.

The lesson change must be additive and its accepted forms must be audited.

### 10.2 Recommended v3 competency minima

Keep total item counts and top-level macrostrand allocations unchanged. Add
minimum typed competency counts inside existing P/F slots:

| Paper | Typed past minimum | Typed negation minimum |
|---|---:|---:|
| Exams 1-2 | 0 | 0 |
| Exam 3 | 2 | 2 |
| Exam 4 | 2 | 2 |
| Midterm Exam 5 | 4 | 4 |
| Exams 6-9 | 2 each | 2 each |
| Final Exam 10 | 6 | 6 |
| Retention confirmation | 3 | 3 |

Then:

- set the two competency records to `scoredProduction: true`;
- update their accepted-form source and teaching evidence;
- bump blueprint version 2 to 3;
- regenerate/check the competency map;
- extend the audit across mandated seeds to prove every quota is fillable
  without breaking unit, POS, surface, strand, or retention invariants.

These counts are feasibility recommendations, not final specifications. Phase 2
must run the live generator before locking them.

### 10.3 Version transition

Recommended rule:

1. Existing results and existing mastery remain immutable and valid within
   their stated v2 scope.
2. New final attempts after v3 release use v3.
3. A learner holding a live v2 qualifying final completes retention under a
   frozen v2 confirmation, with the original bank/blueprint family.
4. Keep v2 generation available only until all live v2 windows expire.
5. Do not combine a v2 qualification with a v3 confirmation.
6. If technical constraints make frozen v2 confirmation impossible, preserve
   the v2 qualification as historical evidence but require a new v3
   qualification. This is the fallback, not the preferred migration.

---

## 11. Explicit answers to the seven owner questions

### 11.1 One exam or a ladder?

**Recommendation:** Four two-section stage exams, one cumulative final, and one
retention confirmation.

This balances learner motivation and evidence quality. A single final delays all
formal feedback and creates a large cliff. Eight section exams copy the Words
suite and over-test. Four stages provide recurring, increasingly mixed
production evidence while keeping the final meaningful.

### 11.2 How does the grader accept variation?

NFC-normalize, trim UI whitespace, compare against the canonical target plus a
maximum of four human-reviewed `acceptAlso` strings, and exclude open response
spaces. Do not generate particle swaps, omissions, spacing deletion, register
changes, synonyms, or word-order permutations automatically.

Worked examples appear in §4.2.

### 11.3 Per-item and total time?

Plan 90 seconds for typed items and 20 seconds for selected items, with no
per-item timer. Use 40 minutes for 24-item stages, 75 minutes for the 50-item
final, and 40 minutes for the 25-item retention paper. Instrument real response
times and revise before claiming these are calibrated.

### 11.4 Minimum-pool formula and failures?

`M_t = max(ceil(Wq_t/c_t), q_t+r_t)`. With five mutually fresh ordinary
attempts and one use per target, `M_t = max(5q_t, q_t+r_t)`. All 37 raw pools
pass. `future-geoyeyo` needs 25 and has 52 raw rows. No expansion is justified
until eligibility/deduplication reduces the pool below 25.

### 11.5 Binary or partial credit?

Binary certification items with rich, non-scoring diagnostic tags. The review
explains that the complete response earns the point, while the tags identify
what to repair. Partial credit requires a validated rubric and weights that
HanaPath does not yet have.

### 11.6 What changes when Words typed past/negation ships?

Add past/negation typed minima inside existing P/F allocations, bump Words
blueprints to v3, update the competency map and audits, and never recompute old
results. A live v2 qualifying final should complete a frozen v2 retention
confirmation; v2 and v3 may not be mixed in one mastery pair.

### 11.7 What may “Sentences mastered” claim?

> HanaPath Sentence Mastery records that, under this version of HanaPath's
> local assessment, you produced the taught sentence patterns accurately and
> retained that performance after a delayed confirmation. Results are stored
> on this device and are not proctored or tamper-proof credentials.

---

## 12. Open evidence limits

1. Public TOPIK sources provide whole-section timing, not official
   question-by-question time allowances.
2. Public Yonsei, SNU, and Sogang pages do not expose enough item-level
   production rubrics for deterministic-answer policy.
3. No suitable modern study was found for novice Korean learners typing full
   sentences on current phone IMEs.
4. The bank's canonical/finite/excluded percentages remain estimates until a
   repository audit classifies every row.
5. Raw tag counts are upper bounds until canonical target deduplication.
6. Cut scores, timing, and floor values are provisional judgement calls until
   panel review and pilot data.

---

## 13. Sources

[^topik-overview]: National Institute for International Education, [Test of Proficiency in Korean overview](https://www.niied.go.kr/web/NIIED/contents/niiedEng/eng_topikOverview).
[^kim-topik]: Kim, G. (2019), [Analysis of the Completion Items in TOPIK Writing Section and Improvement Plan](https://doi.org/10.21716/TKFL.55.3).
[^topik-raters]: Ahn, S. and Kim, C. (2017), [A Study on the Features of Writing Rater in TOPIK Writing Assessment](https://doi.org/10.18209/iakle.2017.28.1.173).
[^ksif-system]: King Sejong Institute Foundation, [Establishment and Operation of KSI Evaluation System](https://www.ksif.or.kr/com/cmm/EgovContentView.do?lang=eng&menuNo=31101310).
[^ska]: King Sejong Institute Foundation, [Sejong Korean Language Assessment](https://www.ksif.or.kr/com/cmm/EgovContentView.do?menuNo=20107010).
[^ska-raters]: King Sejong Institute Foundation (2025), [SKA Speaking and Writing Rater Training Program](https://www.ksif.or.kr/cop/bbs/selectBoardArticle.do?bbsId=BBSMSTR_000000000141&nttId=9220000007359&pageIndex=1).
[^nikl]: National Institute of Korean Language, [Standard Curriculum for Korean Language](https://www.korean.go.kr/front/etcData/etcDataView.do?etc_seq=660&mn_id=208).
[^yonsei]: Yonsei University MIRAE KLP, [Class Placement](https://ywis.yonsei.ac.kr/yiec_en/korean/ko-entrance05.do).
[^ets-cr]: McCaffrey et al. (2022), [Best Practices for Constructed-Response Scoring](https://doi.org/10.1002/ets2.12358).
[^crater]: Leacock and Chodorow (2003), [C-rater: Automated Scoring of Short-Answer Questions](https://doi.org/10.1023/A:1025779619903).
[^paraphrase]: [Generating Paraphrases to Improve Automated Scoring of Short Answers](https://doi.org/10.1007/s40593-023-00391-w).
[^topic-focus]: Jeong, H. (2011), [Acquisition of Korean Sentential Topic and Focus](https://doi.org/10.18209/iakle.2011.22.3.285).
[^ellipsis]: Lee, H. (2015), [Case Particle Ellipsis](https://doi.org/10.1002/9781118371008.ch11).
[^scrambling]: Ko, H. (2018), [Scrambling in Korean Syntax](https://doi.org/10.1093/acrefore/9780199384655.013.243).
[^word-order]: Yeon, J. and Park, C. (2022), [Word Order Variation and Information Structure in Korean](https://doi.org/10.17290/jlsk.2022..93.3).
[^spacing]: National Institute of Korean Language, [Korean orthographic rules, spacing chapter and Article 47](https://www.korean.go.kr/kornorms/m/m_regltn.do).
[^testing-standards]: AERA, APA and NCME, [Standards for Educational and Psychological Testing](https://www.aera.net/publications/books/standards-for-educational-psychological-testing-2014-edition).
[^subscores-survey]: Sinharay and Haberman (2008), [Reporting Subscores: A Survey](https://www.ets.org/research/policy_research_reports/publications/report/2008/jdne.html).
[^subscores-value]: Sinharay (2010), [When Can Subscores Be Expected to Have Added Value?](https://doi.org/10.1002/j.2333-8504.2010.tb02223.x).
[^ncme-setting]: NCME, [Planning and Conducting Standard Setting](https://ncme.org/resources/professional-learning/items/planning-and-conducting-standard-setting/).
[^angoff-bookmark]: [Comparing Yes/No Angoff and Bookmark Standard Setting Methods in English Assessment](https://doi.org/10.1080/15434303.2013.769550).
[^productive-retrieval]: [Effects of Receptive and Productive Word Retrieval Practice on L2 Vocabulary Learning](https://doi.org/10.20806/KATEJOURNAL.30.0_139).
[^nakata]: Nakata and Suzuki (2019), [Mixing Grammar Exercises Facilitates Long-Term Retention](https://doi.org/10.1111/modl.12581).
[^pan]: Pan et al. (2019), [Synergistic Benefits of Systematic and Random Interleaving for L2 Grammar Learning](https://doi.org/10.1016/j.jarmac.2019.07.004).
[^spacing-learning]: Cepeda et al. (2008), [Spacing Effects in Learning](https://doi.org/10.1111/j.1467-9280.2008.02209.x).
[^feedback-retention]: [Timing of Feedback and Retrieval Practice with EFL Students](https://www.nature.com/articles/s41599-024-03983-6).
[^korean-input]: Kim and Myung (2010), [Mobile Text Entry for Korean Users](https://doi.org/10.1145/1753326.1753633).
[^duolingo-score]: Duolingo, [The Duolingo Score Tracks Your Learning Progress](https://blog.duolingo.com/duolingo-score/).
[^wanikani]: WaniKani, [What Will WaniKani Teach Me?](https://knowledge.wanikani.com/wanikani/wanikani-content/).
[^anki]: Anki Manual, [Statistics](https://docs.ankiweb.net/stats.html).
[^cefr]: Council of Europe, [The CEFR as a Non-Prescriptive Framework](https://www.coe.int/en/web/common-european-framework-reference-languages/introduction-and-context).
[^chrome-storage]: Chrome for Developers, [View and Edit Local Storage](https://developer.chrome.com/docs/devtools/storage/localstorage/).
[^owasp-storage]: OWASP, [Testing Browser Storage](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/11-Client-side_Testing/12-Testing_Browser_Storage).
[^prov]: W3C, [PROV-DM: The PROV Data Model](https://www.w3.org/TR/prov-dm/).
