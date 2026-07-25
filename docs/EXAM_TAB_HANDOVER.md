# Exam tab handover

> **Execution queue:**
> [`CORE_APP_COMPLETION_ROADMAP.md`](CORE_APP_COMPLETION_ROADMAP.md)
>
> This document records the current Exam-tab architecture and governing
> specifications. It is not a one-shot build prompt and contains no independent
> task queue.

## Current Exam tab

The bottom navigation is **Learn · Exam · Progress**. The Exam tab currently
contains two shipped examination families and one planned core family:

1. Hangul Mastery Examination: shipped.
2. Core Word Examination Suite: shipped.
3. Sentence Mastery Examination Suite: specified but not yet shipped.

All formal examination work is bound to `exam_integrity.js`. Live testing
controls and tainted progression produce Practice results and cannot award
HanaPath pass, distinction, qualification, retention, or mastery.

## Hangul Mastery Examination

### Status

**Shipped and protected.** The examination has 200 items:

- 120 six-option selected-response items;
- 40 typed items;
- 40 drawn items;
- seven parts;
- audio and Korean-keyboard pre-checks;
- forward-only item locking;
- no correctness feedback before submission;
- full post-submission answer review;
- exact 200/200 mastery requirement.

### Files

- `hangul_mastery_exam.js`: complete declarative bank.
- `scripts/audit-hangul-mastery-exam.mjs`: structural, coverage, option,
  answer-leak, NFC, and audio audit.
- `app.js`: Exam hub, intro, attempt runner, drawing adapter, grading, result,
  remediation, persistence, and integrity binding.
- `styles.css`: shared examination and completion styling.

### Governing contract

[`HANGUL_MASTERY_EXAM_CLAUDE_SPEC.md`](HANGUL_MASTERY_EXAM_CLAUDE_SPEC.md),
with shipped owner overrides recorded in git history and current runtime/audit
behaviour. Do not reopen or redesign this examination during Sentence work.

## Core Word Examination Suite

### Status

**Shipped and protected.** The suite has 10 deterministic seeded achievement
examinations, macrostrand scoring, unit/competency coverage, post-submission
review, remediation routes, and delayed final retention.

The live ordinary-attempt contract is blueprint v3 after completion of the
`s3-grammar-u2-l3` production bridge. V3 includes typed polite-past and reviewed
negation production. Valid pre-existing v2 qualifiers retain a frozen-v2
retention path until their stored windows close.

### Files

- `word_exam_blueprints.js`: live v3 blueprints, frozen-v2 compatibility, and
  competency metadata.
- `word_exam_engine.js`: pure deterministic generator, grader, bands, scope, and
  retention generation.
- `scripts/build-word-exam-competency-map.mjs`: generated taught-before-tested
  milestone proof.
- `docs/CORE_WORD_EXAM_COMPETENCY_MAP.md`: generated report.
- `scripts/audit-word-exams.mjs`: full seed, exposure, allocation, option,
  production, version, and retention audit.
- `app.js`: hub, production-bridge readiness, intro, attempt, review,
  submission, result, provenance, qualification, and retention UI.

### Governing contract

[`CORE_WORD_EXAM_SPECS.md`](CORE_WORD_EXAM_SPECS.md), plus the shipped v3 and
frozen-v2 compatibility decisions captured by the live blueprints, engine, and
audits. Time-gated removal of v2 compatibility is not part of core completion.

## Sentence Mastery Examination Suite

### Status

**Primary unfinished core feature.** The target product is:

- four cumulative stage examinations after Sentences sections 2, 4, 6, and 8;
- one cumulative final;
- one delayed retention confirmation;
- 80% typed production;
- canonical-only, reviewed finite-variant, or excluded typed targets;
- deterministic seeded generation and five-attempt freshness;
- full provenance, Practice handling, qualification, and retention.

The current repository has:

- `docs/SENTENCE_MASTERY_EXAM_SPEC_DRAFT.md`: governing product/measurement
  contract;
- `docs/SENTENCE_ELIGIBILITY_AUTHORING.md`: binding row review rules;
- `sentence_exam_eligibility.js`: schema plus only 20 reviewed rows;
- `scripts/audit-sentence-eligibility.mjs`: census/audit currently run with
  `--allow-incomplete`.

The current repository does **not** yet have:

- complete eligibility review for all 4,177 rows;
- strict pool/freshness freeze and lock;
- Sentence exam blueprints;
- a pure generator/grader/retention engine;
- a Sentence exam seed audit;
- browser attempt, result, remediation, qualification, or retention UI.

Do not build these from this handover. Execute roadmap packets E0, E1A-D, E2,
X1, X2, Q1, and Q2 in order.

## Shared examination integrity

`exam_integrity.js` is mandatory for all examination families. It provides:

- immutable result records;
- HanaPath, Practice, and legacy-incomplete statuses;
- durable testing-override taint;
- scope intersection;
- qualifier/retention relations;
- blueprint-major compatibility;
- additive legacy migration;
- backup validation and rejection of malformed imported provenance.

A future Sentence runner must use the same layer rather than inventing parallel
state or labels.

## Shared learner-facing rules

- No hint, helper, reveal, correctness, or answer feedback before formal exam
  submission.
- Leaving an active attempt requires confirmation and discards the in-memory
  attempt without corrupting saved state.
- Full post-submission review and exact remediation routes are allowed.
- Formal Sentence typed grading preserves Korean word boundaries and uses only
  reviewed finite targets.
- Testing hooks and owner completion controls must never create qualifying
  results.
- Old saves and legacy result summaries remain visible and honestly labelled.

## Current core audit commands

```bash
node scripts/audit-exam-integrity.mjs
node scripts/audit-hangul-mastery-exam.mjs
node scripts/build-word-exam-competency-map.mjs --check
node scripts/audit-word-exams.mjs
node scripts/audit-sentence-eligibility.mjs --allow-incomplete
```

After roadmap E2, the eligibility command becomes strict. After X1, add
`scripts/audit-sentence-exams.mjs`. The complete release matrix is in the core
roadmap.
