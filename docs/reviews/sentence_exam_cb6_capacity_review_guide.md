# CB6 Sentence bank capacity remediation review guide

## Purpose

CB6 repairs the enabled CB4/CB5 Sentence exam bank without weakening the locked exam floors or five-attempt freshness rule. The worker packet proposes 94 additions and proves that the projected 702-entry bank can furnish five disjoint valid papers for each of the four stages and the final.

This is an authoring packet, not an approval or freeze. Every proposed entry remains pending until a distinct integrator reviews it.

## Mechanical result

- Base bank: 608 entries, 288 typed and 320 recognition.
- Proposed additions: 94 entries, 71 typed and 23 recognition.
- Projected bank: 702 entries, 359 typed and 343 recognition.
- Stage 1 typed capacity: 69 before, 101 projected, requirement 100.
- All ten previously deficient final-tag pools reach or exceed their locked five-attempt requirements.
- A checked-in witness contains five fresh valid papers for each stage and the final.
- Existing maximums remain preserved: one typed and two recognition entries per live lesson route.

## Independent-review boundary

Review every row in `docs/reviews/sentence_exam_cb6_capacity_reviews.json`.

For each typed addition, independently verify:

1. the Korean canonical is natural and exactly matches the live row;
2. the English prompt forces the intended meaning, vocabulary, tense, register, discourse role, and information structure;
3. ordinary valid Korean is not unfairly rejected;
4. any manual alternative is finite, necessary, and collision-safe;
5. pattern tags and section/lesson routes are correct;
6. the prompt leaks neither the Korean answer nor an internal grammar tag;
7. the entry is appropriate for strict formal grading.

For each recognition addition, independently verify:

1. Korean and English meaning match the live row;
2. pattern tags and routes are correct;
3. the item can support four unique defensible options when X1 materializes it;
4. no duplicate target or accepted-answer collision is introduced.

Do not approve mechanically generated prompts merely because the capacity audit is green. All 71 typed prompts are marked review-required. Twelve reuse an existing prompt and 59 are newly proposed.

## Review fields

For an approved row, set:

- `reviewStatus: "approved"`
- `reviewedBy` to a reviewer identity distinct from `GPT-5.6 Thinking / CB6 capacity author`
- `reviewedAt` to the real UTC review time
- `reviewedRevision: "curated-sentence-exam-v2-cb6-authoring"`
- a substantive `reviewerNote`
- `promptOverride`, `manualAlternativesOverride`, or `recognitionAnswerOverride` when corrections are needed

Reject or replace a row rather than lowering quotas, relaxing freshness, inventing an alternative, or approving an ambiguous prompt.

## Validation

```bash
node --check scripts/build-sentence-exam-capacity-remediation.mjs
node --check scripts/audit-sentence-exam-capacity-remediation.mjs
node --check scripts/test-sentence-exam-capacity-remediation.mjs

node scripts/build-sentence-exam-capacity-remediation.mjs --check
node scripts/audit-sentence-exam-capacity-remediation.mjs
node scripts/test-sentence-exam-capacity-remediation.mjs
```

The strict review gate must remain red until every row is genuinely reviewed:

```bash
node scripts/audit-sentence-exam-capacity-remediation.mjs --require-approved
```

## Post-review integration

After all additions are independently approved, the integrator must:

1. apply reviewed overrides;
2. emit a new curated runtime-bank revision;
3. regenerate freeze hashes and tamper evidence;
4. re-run the existing CB4/CB5 bank audits;
5. rebase X1 onto the new bank revision;
6. run X1's full 500/1,000-seed and 250/500 freshness audits;
7. merge CB6 and then X1 only on exact green heads.

CB6 does not modify `app.js`, the X1 engine, X2 UI, learner state, or the integrator-owned roadmap.
