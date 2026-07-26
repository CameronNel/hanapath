# Sentence Mastery examination amendment: curated source bank

> **Normative amendment to `SENTENCE_MASTERY_EXAM_SPEC_DRAFT.md`.** Where the draft requires every one of the 4,177 lesson rows to receive an exam eligibility record, this amendment replaces that requirement with a smaller curated source bank. All paper sizes, scoring, timing, provenance, taint, retention, and no-hints rules remain unchanged unless explicitly stated here.

## Source-bank rule

- Exams draw only from `HANAPATH_SENTENCE_EXAM_CURATED_BANK`.
- The 4,177-row lesson bank remains the teaching and practice corpus.
- A lesson row may be omitted from the exam bank without being defective or incomplete.
- A row must be taught and routed before it can enter the curated bank.
- Typed rows require one canonical answer plus at most four manual alternatives.
- Recognition rows may be used when exact typed certification would be unfair.

## Locked minimums

- 288 typed entries.
- 320 recognition entries.
- 32 typed entries per section.
- 24 recognition entries per section.
- Maximum one typed entry per lesson.
- Maximum two recognition entries per lesson.
- Maximum 15% of typed entries with manual alternatives.

## Lesson-to-exam trace

Every typed entry must point to a lesson that contains:

1. the target sentence in context;
2. a plain explanation of the intended meaning;
3. at least one nearby contrast showing a different valid construction;
4. controlled production with the exam-style context cues;
5. variation awareness explaining natural but non-equivalent forms;
6. an approved review record.

## Readiness rule

Sentence eligibility is ready when:

- the curated bank is enabled;
- the curated-bank audit passes;
- all target sizes and section floors pass;
- every typed entry has zero unresolved ambiguity flags;
- every accepted answer is unique to one item;
- the inventory and bank revision are frozen;
- the X1 generator proves the existing freshness and allocation rules.

Completion of eligibility shards C and D is no longer a readiness condition.
