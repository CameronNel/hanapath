# Sentence Mastery examination amendment: curated source bank

> **Normative amendment to `SENTENCE_MASTERY_EXAM_SPEC_DRAFT.md`.** Where the draft requires every
> one of the 4,177 lesson rows to receive an exam eligibility record, this amendment replaces that
> requirement with a smaller curated source bank. All paper sizes, scoring, timing, provenance,
> taint, retention, and no-hints rules remain unchanged unless explicitly stated here.

## Source-bank rule

- Exams draw only from `HANAPATH_SENTENCE_EXAM_CURATED_BANK`.
- The 4,177-row lesson bank remains the teaching and practice corpus.
- A lesson row may be omitted from the exam bank without being defective or incomplete.
- A row must be taught and routed before it can enter the curated bank.
- Typed rows require one canonical answer plus at most four manual alternatives.
- Recognition rows are used when exact typed certification would be unfair.

## Controlled clause transformation exception

Open English-to-Korean production remains ineligible for typed scoring when the row belongs to a
productive clause family or contains independently movable or omissible constituents. A narrow typed
exception exists only for the fail-closed `controlled-clause-transformation` item defined in
[`SENTENCE_EXAM_CONTROLLED_CLAUSE_CONTRACT.md`](SENTENCE_EXAM_CONTROLLED_CLAUSE_CONTRACT.md).

The learner must receive the exact Korean source fragment or fragments, the required Korean
construction, and explicit instructions to preserve supplied wording, particles, order, tense,
speech level, and information structure except for the named grammar operation. The exception does
not relax exact grading and does not permit generated alternatives. A row that cannot satisfy the
controlled contract remains recognition-only.

Historical full-corpus exclusion evidence assessed the former open-translation item shape. A current,
independently reviewed controlled transformation may supersede that historical exclusion without
rewriting or deleting the historical record.

## Locked policy

The audit owns these constants independently of the bank data being audited:

- 288 typed entries.
- 320 recognition entries.
- 32 typed entries per section.
- 24 recognition entries per section.
- Maximum one typed entry per lesson.
- Maximum two recognition entries per lesson.
- Maximum 15% of typed entries with manual alternatives.
- Stage paper: 24 total, 20 typed, 4 selected.
- Final paper: 50 total, 40 typed, 10 selected.
- Retention paper: 25 total, 20 typed, 5 selected.

The committed bank must repeat these values exactly for transparency. Missing or altered bank policy
values fail the audit; they can never lower the audit-owned requirements.

## Lesson-to-exam trace

Every typed entry must point to a lesson that contains:

1. the target sentence in context;
2. a plain explanation of the intended meaning;
3. at least one nearby contrast showing a different valid construction;
4. controlled production with exam-style context cues;
5. variation awareness explaining natural but non-equivalent forms;
6. an approved independent review record.

## Independent review evidence

Every typed entry must include:

- `authoredBy`: non-empty author identity;
- `reviewStatus: "approved"`;
- `reviewedBy`: non-empty reviewer identity different from `authoredBy`;
- `reviewedAt`: a valid UTC ISO timestamp;
- `reviewedRevision`: exactly equal to the current bank revision;
- `reviewerNote`: a substantive explanation of why the prompt and accepted answers are fair.

Historical full-corpus eligibility metadata may help candidate selection, but it does not replace this
curated-bank review evidence.

## Readiness rule

Sentence eligibility is ready only when:

- the curated bank is enabled;
- the curated-bank audit passes using audit-owned locked constants;
- all target sizes, section floors, and lesson caps pass;
- every typed entry has complete current independent-review evidence;
- every typed entry has zero unresolved ambiguity flags;
- every accepted answer is unique to one item;
- the inventory and bank revision are frozen;
- the X1 generator proves the existing freshness and allocation rules.

Completion of eligibility shards C and D is no longer a readiness condition.
