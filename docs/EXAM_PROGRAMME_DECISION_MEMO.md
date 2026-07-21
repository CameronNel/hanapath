# HanaPath Exam Programme Phase 1 Decision Memo

**Status:** Owner decision gate  
**Commission:** [PR #319 research brief](https://github.com/CameronNel/hanapath/blob/claude/exam-section-audit-fxv6nh/docs/CHATGPT_EXAM_PROGRAMME_RESEARCH_BRIEF.md)  
**Evidence base:** `docs/EXAM_PROGRAMME_RESEARCH_REPORT.md`  
**Instruction:** Select one option for each numbered decision, amend it where
needed, and return this memo as the locked input to Phase 2. Do not begin
Phase 2 specifications until the decisions are locked.

## 0. Decisions already locked by the commissioning brief

The following are not reopened here:

- `Learn · Exam · Progress` remains the tab structure.
- No standalone form-named formal exams.
- Formal exams are seeded, deterministic, and never personalised.
- No hints or feedback before submission.
- Exams do not gate or mutate ordinary learning progression or SRS.
- Mastery requires delayed retention evidence.
- The app remains vanilla/static and audit-driven.
- New authored Korean themes require owner approval.
- The section-completion test control remains available in some gated form.
- Pronunciation and speaking assessment are deferred.

---

## Decision 1: Sentence exam structure

### Option A - Four stage exams + final + retention **RECOMMENDED**

- Stage 1 after Sentences sections 1-2.
- Stage 2 after sections 1-4.
- Stage 3 after sections 1-6.
- Stage 4 after sections 1-8.
- One cumulative final after the complete path.
- One delayed retention confirmation attached to the final.

**Why recommend it:** It creates recurring retrieval and diagnostic evidence
without copying the ten-paper Words suite. It avoids one enormous end-of-path
cliff and keeps the cumulative final consequential.

**Strongest argument against:** Four stages may still feel like extra ceremony
for a single-learner app, and stage evidence may be partly redundant with the
final.

**Downstream consequence:** Phase 2 creates five exam blueprints plus the
retention mode, four unlock milestones, two-section coverage bands, and stage
result cards.

### Option B - Eight section exams + final + retention

**Why choose it:** Maximum symmetry with the Words path and immediate formal
evidence after every section.

**Strongest argument against:** It materially increases testing burden and
duplicates the existing Words-suite rhythm.

**Downstream consequence:** More blueprints, more audits, more UI cards, and
larger freshness requirements for section-specific pools.

### Option C - One final + retention

**Why choose it:** Smallest implementation and clearest single achievement
event.

**Strongest argument against:** No formal evidence before the end, a large
motivational cliff, and weaker opportunities to detect prompt or timing defects
before the final.

**Downstream consequence:** Fewer blueprints but a larger and riskier first
launch.

**Owner selection:** `A / B / C / amended: ______________________________`

---

## Decision 2: Item mix, length, and time

### Option A - 80% typed production **RECOMMENDED**

| Paper | Total | Typed | Selected | Limit |
|---|---:|---:|---:|---:|
| Stage | 24 | 20 | 4 | 40 min |
| Final | 50 | 40 | 10 | 75 min |
| Retention | 25 | 20 | 5 | 40 min |

Planning assumption: 90 seconds per typed item and 20 seconds per selected
item, with no per-item timer.

**Why recommend it:** Productive retrieval best matches a productive construct.
The selected minority supports breadth and diagnosis without carrying
certification.

**Strongest argument against:** Phone typing may cause fatigue or motor-speed
variance, especially for a beginner, and the limits are not yet empirically
calibrated.

**Downstream consequence:** Phase 2 must instrument response time, define
pause/background behaviour, and require a timing pilot before declaring the
limits stable.

### Option B - 70% typed, shorter papers

- Stage 20 items, final 40, retention 20.
- Lower fatigue and faster shipping.

**Strongest argument against:** Less direct production evidence, smaller
pattern subscores, and weaker mastery classification.

### Option C - 90-100% typed

**Why choose it:** Purest construct match.

**Strongest argument against:** Highest fatigue, accessibility burden, and
construct-irrelevant typing-speed variance.

**Owner selection:** `A / B / C / amended: ______________________________`

---

## Decision 3: Macrostrand model

### Option A - Reuse `P/F/X/R/C` **RECOMMENDED**

- `P`: full-sentence controlled production.
- `F`: form and sociolinguistic/register control.
- `X`: contextual integration.
- `R`: receptive diagnosis.
- `C`: cued selection/discrimination.

Recommended allocations:

| Code | Stage | Final | Retention |
|---|---:|---:|---:|
| `P` | 14 | 30 | 15 |
| `F` | 3 | 6 | 3 |
| `X` | 3 | 4 | 2 |
| `R` | 2 | 5 | 3 |
| `C` | 2 | 5 | 2 |

**Why recommend it:** It preserves HanaPath's existing result vocabulary and
makes Words/Sentences reports feel related. Pattern tags provide the
sentence-specific detail.

**Strongest argument against:** Reusing `P`, `F`, and `X` may hide meaningful
differences between word-level and sentence-level constructs.

**Downstream consequence:** Phase 2 defines sentence-specific labels under the
existing codes rather than inventing a parallel alphabet.

### Option B - New sentence-only strand codes

**Why choose it:** Maximum semantic precision.

**Strongest argument against:** More UI explanation and reduced comparability
with existing exams.

**Owner selection:** `A / B / amended: ______________________________`

---

## Decision 4: Accepted-answer policy

### Option A - Three classes, maximum four authored alternatives **RECOMMENDED**

1. Canonical-only.
2. Authored finite variant: canonical plus at most four reviewed
   `acceptAlso` strings.
3. Excluded from typed scoring.

Normalization is limited to NFC, trimming, and repeated UI-whitespace cleanup.
No automatic particle swaps, omissions, word-order changes, synonyms,
contractions, or global spacing deletion.

**Why recommend it:** It keeps the grader deterministic, offline, auditable,
and linguistically conservative. Korean variation is discourse-sensitive, so
productive transformation rules can accept meaning changes.

**Strongest argument against:** Four is an arbitrary authoring threshold and
will exclude otherwise useful sentences.

**Downstream consequence:** Phase 2 needs row eligibility metadata, a review
queue, accepted-set audits, collision checks, and owner-visible exclusion
reasons.

### Option B - Same model, maximum six alternatives

**Why choose it:** Retains more rows and accommodates several standard
contractions/spacing alternatives.

**Strongest argument against:** Greater authoring and audit load; risk that
`acceptAlso` becomes a manual parser.

### Option C - Canonical-only, no new variants

**Why choose it:** Simplest and strictest.

**Strongest argument against:** Creates avoidable false negatives for standard
variants already recognised by HanaPath's data model.

**Owner selection:** `A / B / C / amended: ______________________________`

---

## Decision 5: Item scoring

### Option A - Binary score + non-scoring diagnostic tags **RECOMMENDED**

A reviewed complete response earns one point. Any other response earns zero.
After submission, diagnostic analysis may identify tense, particle, register,
spacing, spelling, word order, and lexical-choice differences.

Recommended explanation:

> This item is scored as one complete Korean response. Your answer did not
> match the reviewed accepted set, so it receives no point. The notes below
> identify parts that appear correct and what to review; they do not change the
> item score.

**Why recommend it:** Deterministic partial weights have not been validated and
would create misleading precision. Binary scoring matches the constrained item
design.

**Strongest argument against:** A one-particle mistake and a wholly unrelated
answer both receive zero, which may feel harsh.

**Downstream consequence:** Phase 2 must make review feedback unusually clear
and ensure diagnostics never silently alter the score.

### Option B - Deterministic analytic partial credit

Example: stem, tense, particle, register, and lexical target each receive a
weight.

**Strongest argument against:** Requires a validated segmentation and severity
model; rule interactions will create edge cases and may reward malformed
sentences.

### Option C - Binary certification, optional unscored practice score

Formal result remains binary, while the answer review displays a clearly
labelled “components detected” indicator.

**Strongest argument against:** Learners may still read the practice indicator
as a real partial score.

**Owner selection:** `A / B / C / amended: ______________________________`

---

## Decision 6: Subscore evidence rules

### Option A - Graduated evidence guard **RECOMMENDED**

- 0-4 observations: no percentage, “not enough evidence”.
- 5-7: directional label plus `n/N`, no precise percentage.
- 8+: attempt-level percentage may display.
- 10+: a primary macrostrand may carry a pass/mastery floor after pilot review.

**Why recommend it:** Subscores based on very few items are unstable and often
add little beyond the total. This rule prevents absurd precision while keeping
diagnostic information.

**Strongest argument against:** It complicates UI and may hide percentages the
owner wants to inspect.

**Downstream consequence:** Phase 2 must specify labels, denominator display,
and rules for secondary tags that overlap.

### Option B - Keep current Words minimum of three

**Why choose it:** Consistency and simplicity.

**Strongest argument against:** Three items remain too fragile for meaningful
percentage interpretation.

### Option C - Require ten for every percentage

**Why choose it:** Strongest protection against noisy reporting.

**Strongest argument against:** Many pattern tags would rarely receive a
visible result.

**Owner selection:** `A / B / C / amended: ______________________________`

---

## Decision 7: Sampling freshness and minimum-pool formula

### Option A - Four retakes; five-attempt disjoint window **RECOMMENDED**

- First attempt plus four ordinary retakes use mutually fresh canonical
  targets for each quota.
- A target may appear once in that window.
- Retention avoids the qualifying attempt, not every prior attempt.
- General minimum:
  `M_t = max(ceil(W × q_t / c_t), q_t + r_t)`.
- Recommended values: `W=5`, `c_t=1`.

**Why recommend it:** Provides a clear, auditable promise of useful freshness
without making modest pools impossible.

**Strongest argument against:** A learner taking more than five attempts may
see earlier material again.

**Downstream consequence:** Phase 2 defines attempt-history storage, canonical
target keys, eligibility revisions, fallback behaviour, and seed audits.

### Option B - Three-attempt window

**Why choose it:** Easier on thin pools.

**Strongest argument against:** Faster repetition and weaker retake freshness.

### Option C - Retention avoids all five ordinary attempts

Minimum becomes `5q_t + r_t`.

**Strongest argument against:** Larger pool requirements with limited evidence
that the stronger rule improves validity.

**Owner selection:** `A / B / C / amended: ______________________________`

---

## Decision 8: Future-tense expansion trigger 🔒

### Option A - No authoring until eligibility audit **RECOMMENDED**

Under Decision 7 and the recommended quota:

```text
future final q = 5
future retention r = 3
required eligible pool = max(5×5, 5+3) = 25
raw pool = 52
raw margin = 27
```

Trigger Workstream D only if the audited, deduplicated eligible pool is below
25, or another locked decision raises the minimum.

**Why recommend it:** The current claim that 52 is too small is not supported by
the recommended math. Authoring before eligibility analysis may solve a
non-problem.

**Strongest argument against:** A proactive expansion could improve thematic
diversity even when the strict minimum passes.

**Downstream consequence:** Phase 2 first specifies the eligibility census and
fails loudly below 25. No theme menu or Korean authoring begins now.

### Option B - Author expansion for diversity despite mathematical sufficiency

**Why choose it:** Wider scenarios and a larger safety margin.

**Strongest argument against:** Scope growth, audio regeneration, owner theme
work, and review cost without a demonstrated shortage.

**Owner selection:** `A / B / amended: ______________________________`

---

## Decision 9: Unlock gating

### Option A - Cumulative two-section milestones **RECOMMENDED**

- Stage 1 requires sections 1-2 complete.
- Stage 2 requires 1-4 complete.
- Stage 3 requires 1-6 complete.
- Stage 4 and final require all eight complete.
- Retention requires a qualifying final and time window.

**Why recommend it:** Every formal item remains downstream of teaching, and
stage scope is easy to explain.

**Strongest argument against:** A learner who finishes a later section through
a non-linear route cannot take the corresponding stage until earlier sections
are complete.

**Downstream consequence:** Stage scopes and unlocks are cumulative, matching
the competency milestone model.

### Option B - Require only the stage's two sections

**Strongest argument against:** Later forms may depend on earlier teaching and
the result no longer represents cumulative progress.

**Owner selection:** `A / B / amended: ______________________________`

---

## Decision 10: Provisional scoring and mastery

### Option A - Recommended bands **RECOMMENDED**

**Stage pass**

- overall ≥75%;
- typed P/F/X combined ≥70%;
- P ≥70%;
- no included section band <60%.

**Final pass**

- overall ≥80%;
- typed ≥75%;
- P ≥75%;
- F+X ≥70%;
- no two-section band <60%.

**Distinction**

- overall ≥90%;
- typed ≥85%;
- no two-section band <75%.

**Mastery qualification**

- overall ≥88%;
- typed ≥85%;
- P ≥85%;
- F ≥80%;
- X ≥80%;
- no two-section band <75%.

**Retention**

- 25 items;
- opens after seven days;
- expires after 21 days;
- overall ≥84% (21/25);
- typed ≥80%;
- no two-section band <70%;
- fresh seed and no qualifying-target repeats;
- mastery is sticky once earned.

**Why recommend it:** It preserves the Words distinction between pass,
distinction, qualification, and delayed mastery while increasing emphasis on
typed production.

**Strongest argument against:** These cuts are expert judgement before pilot
calibration and may be too severe or too lenient.

**Downstream consequence:** Every screen and document labels the standards
provisional. Phase 2 includes standard-setting and pilot-calibration gates.

### Option B - Match Words final cuts more closely

**Why choose it:** Easier cross-exam explanation.

**Strongest argument against:** Sentence production is a different construct
with different item difficulty and precision.

### Option C - Lower initial pilot cuts, no mastery award until calibrated

**Why choose it:** Most psychometrically cautious launch.

**Strongest argument against:** Delays the programme goal and complicates the
user experience.

**Owner selection:** `A / B / C / amended: ______________________________`

---

## Decision 11: Integrity and test-control policy

### Option A - Query-gated control + persistent taint **RECOMMENDED**

- Hide section completion behind the existing private test-mode/query pattern.
- Each use writes a persistent local taint event.
- Any attempt intersecting tainted scope is a `Practice result`.
- Tainted attempts never qualify for mastery or retention.
- Untainted attempts are called `HanaPath results`, never “official” or
  “verified”.
- All result screens disclose device-local, unproctored, non-tamper-proof
  storage.

**Why recommend it:** It preserves the owner's workflow while preventing the
ordinary UI from presenting shortcut-enabled mastery as equivalent to normal
achievement.

**Strongest argument against:** Because the taint is also in `localStorage`, a
technical user can edit it; the system is honest rather than secure.

**Downstream consequence:** Workstream 0 ships first and defines taint
propagation, reset behaviour, migration, UI labels, and audit failures.

### Option B - Visible control, warning confirmation, persistent taint

**Why choose it:** Maximum owner convenience.

**Strongest argument against:** Ordinary learners may activate it accidentally
or treat it as a feature.

### Option C - Separate developer build flag

**Why choose it:** Cleanest ordinary UI.

**Strongest argument against:** Conflicts with no-build-step simplicity and may
be less convenient than the existing query pattern.

**Owner selection:** `A / B / C / amended: ______________________________`

---

## Decision 12: Result provenance and versioning

### Option A - Full provenance, immutable history **RECOMMENDED**

Required fields:

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

Rules:

- never recompute, reband, or delete a historical result because a blueprint
  changed;
- backfill only knowable legacy data;
- label unknown legacy provenance `legacy-incomplete`;
- a checksum may detect corruption but never implies authenticity.

**Why recommend it:** It provides reproducibility and honest interpretation
without pretending local records are secure credentials.

**Strongest argument against:** Adds state size, migration logic, and support
burden.

**Downstream consequence:** All future exam data shapes begin versioned, and
Workstream 0 migrates Hangul and Words additively.

### Option B - Minimal provenance

Store blueprint, seed, bank revision, and override status only.

**Strongest argument against:** Harder debugging and weaker future migration.

**Owner selection:** `A / B / amended: ______________________________`

---

## Decision 13: Words past/negation blueprint transition

### Option A - v3 minima inside existing allocations **RECOMMENDED**

After typed production is explicitly taught and audited:

| Paper | Past typed | Negation typed |
|---|---:|---:|
| Exams 1-2 | 0 | 0 |
| Exam 3 | 2 | 2 |
| Exam 4 | 2 | 2 |
| Midterm 5 | 4 | 4 |
| Exams 6-9 | 2 each | 2 each |
| Final 10 | 6 | 6 |
| Retention | 3 | 3 |

- Do not increase total items.
- Draw these minima from existing P/F allocation.
- Set the competencies to scored production.
- Bump blueprint v2 to v3.
- Preserve all historical results.
- Complete a live v2 retention window with frozen v2 generation.
- Never pair a v2 qualifier with v3 retention.

**Why recommend it:** It closes the honest competency gap while preserving
paper length and historical meaning.

**Strongest argument against:** The existing allocations may not be fillable
with all current unit/POS/surface invariants; the numbers require generator
audit before locking in Phase 2.

**Downstream consequence:** Phase 2 must treat these as proposed minima,
execute the full mandated seed audit, and revise counts if feasibility fails.

### Option B - Add typed past/negation only to Exam 3, midterm, final, retention

**Why choose it:** Smaller change and less pressure on later section pools.

**Strongest argument against:** Later section exams would continue to omit a
central cumulative skill.

### Option C - Increase paper lengths to add new items

**Strongest argument against:** More fatigue and unnecessary blueprint growth.

**Owner selection:** `A / B / C / amended: ______________________________`

---

## Decision 14: v2 qualifying-final migration

### Option A - Frozen v2 retention during the live window **RECOMMENDED**

A learner holding a valid v2 qualifying final at v3 release may take the v2
retention confirmation until the original expiry. New qualifications use v3.
Mastery pairs never cross major blueprint versions.

**Why recommend it:** It honours the learner's earned opportunity and keeps the
measurement pair coherent.

**Strongest argument against:** Requires retaining old generation logic and
bank compatibility for a transitional period.

**Downstream consequence:** Phase 2 specifies a temporary legacy-generator
path and an audit proving its removal date.

### Option B - Require requalification on v3

**Why choose it:** Simpler code.

**Strongest argument against:** Retroactively withdraws an earned retention
opportunity.

**Owner selection:** `A / B / amended: ______________________________`

---

## Decision 15: Learner-facing claim

### Option A - Scope-specific local achievement claim **RECOMMENDED**

> HanaPath Sentence Mastery records that, under this version of HanaPath's
> local assessment, you produced the taught sentence patterns accurately and
> retained that performance after a delayed confirmation. Results are stored
> on this device and are not proctored or tamper-proof credentials.

**Why recommend it:** It states the demonstrated task, finite curriculum,
version, retention evidence, storage model, and trust boundary.

**Strongest argument against:** The disclosure is long for a result card.

**Downstream consequence:** Phase 2 creates a short card line plus expandable
full disclosure without weakening the meaning.

### Option B - Shorter card claim

> You demonstrated and retained the taught HanaPath sentence patterns in this
> device-local assessment.

Full integrity disclosure remains one tap away and in documentation.

**Strongest argument against:** The short form omits the explicit
non-credential warning at the point of celebration.

**Owner selection:** `A / B / amended: ______________________________`

---

## Consolidated recommended decision set

```text
1A  Four stages + final + retention
2A  80% typed; 24/50/25 items; 40/75/40 minutes
3A  Reuse P/F/X/R/C
4A  Three answer classes; max four authored alternatives
5A  Binary scoring + diagnostic tags
6A  Graduated subscore evidence guard
7A  Five-attempt freshness window; retention avoids qualifier
8A  No future authoring until eligible pool <25
9A  Cumulative two-section unlocks
10A Provisional bands and 7/21-day retention
11A Query-gated test control + persistent taint
12A Full provenance + immutable history
13A Words v3 minima inside existing allocations
14A Frozen v2 retention during live windows
15A Full scope-specific local achievement claim
```

## Owner lock

**Owner name:** ____________________  
**Decision date:** ____________________  
**Selections or amendments:** ______________________________________________

Once locked, Phase 2 may produce only the five commissioned specification
documents and must carry these decisions forward without reopening them.
