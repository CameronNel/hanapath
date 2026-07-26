# Curated Sentence Exam Bank implementation specification

> **Design and implementation contract, not an execution queue.** Packet status and work order live
> only in [`CORE_APP_COMPLETION_ROADMAP.md`](CORE_APP_COMPLETION_ROADMAP.md). This document explains
> how the curated bank and its supporting lessons must be built.

## 1. Decision lock

- Keep all 4,177 Sentence rows for lessons, review, listening, recognition, and free practice.
- Do not require every row to become a fair exact-match typing question.
- Build a separate curated exam bank from rows already taught in the curriculum.
- Use exact matching only when a prompt forces one intended Korean answer or a manually reviewed
  list of at most four alternatives.
- Use recognition or sentence-choice questions where exact typed grading would reject valid Korean.
- Preserve the 2,100 E1A/E1B reviews as candidate evidence. They are not final curated-bank approval.
- Do not change normal lesson grading into formal exam grading. Learning remains supported;
  certification remains strict.

## 2. Problem this design prevents

A broad English gloss can map to several natural but different Korean constructions. These cannot be
silently treated as equivalent answers:

- “I like to eat.”
- “I like eating.”
- “Eating is nice.”

The curriculum must explicitly distinguish nearby constructions such as:

- liking a noun or food;
- liking the activity of eating;
- describing the activity as pleasant;
- making the speaker the topic;
- making the activity the topic or focus;
- everyday polite versus formal polite speech;
- full forms versus standard contractions.

The exam controls ambiguity by aligning four layers:

1. the lesson teaches the contrast;
2. the prompt forces the intended use;
3. accepted answers are manually finite;
4. the audit rejects anything that still permits ordinary competing answers.

## 3. Required lesson shape

Every lesson contributing a typed candidate must contain these phases in order.

### Phase A: Meaning in context

- Show the Korean sentence in a realistic context.
- Explain the speaker’s communicative goal, not only an English translation.
- Identify speaker, addressee, and social setting.
- Identify time or aspect.
- Identify topic, focus, object, location, contrast, or other discourse role.
- Identify the lexical item or construction being taught.

### Phase B: Contrast closure

- Show at least one nearby grammatical sentence with a different meaning or discourse effect.
- State the difference in plain language.
- Cover likely English collisions, including:
  - liking a thing versus liking an activity;
  - enjoying an activity versus describing it as pleasant;
  - topic versus focus;
  - routine versus completed event versus plan;
  - everyday polite versus formal polite;
  - statement versus request versus suggestion;
  - particle present versus omitted;
  - canonical form versus a reviewed contraction.

### Phase C: Controlled production

- Present a context-rich prompt.
- Force the intended tense or time.
- Force the addressee or social setting.
- Force the topic/focus relationship when relevant.
- Supply a lexical anchor when an ordinary synonym would otherwise be valid.
- Force one communicative act.
- Accept only the canonical target and explicitly reviewed alternatives.
- Never use fuzzy matching or generated grammar transformations.

### Phase D: Variation awareness

- Show other natural ways to express related meanings.
- Label them as different constructions, not bad Korean.
- Explain why they are not accepted for the controlled target.
- Keep them available for learning, comparison, or recognition.

### Phase E: Free practice

- Permit broader supported production.
- Allow helpers, explanations, and remediation.
- Do not use free-practice acceptance as evidence that a form is safe for exact exam grading.

### Phase F: Exam-readiness decision

The lesson record must state one of:

- `typed-candidate`: one intended response or a finite reviewed set is defensible;
- `recognition-candidate`: useful content, but exact production is too broad;
- `lesson-only`: valuable teaching content not suitable for certification.

## 4. Prompt authoring contract

A typed prompt must force the following when they matter:

- `communicativeAct`;
- `addressee`;
- `register`;
- `time`;
- `discourseRole`;
- `focusQuestion`;
- `lexicalAnchor`;
- `context`.

A prompt must not name the answer’s grammar label directly. It may supply a lexical item where the
construct is grammatical control rather than vocabulary recall.

### Typed prompt rejection rules

Reject or convert to recognition when any of these remains unresolved:

- ordinary synonym choice;
- topic versus subject/focus;
- optional particle use;
- several ordinary word orders;
- unspecified register;
- unspecified tense or time;
- productive paraphrase family;
- more than four legitimate answers;
- duplicate canonical target;
- untaught grammar or vocabulary;
- unstable lesson route;
- prompt leakage that states the required form.

## 5. Runtime and data contracts

### `sentence_exam_prompt_templates.js`

Stores approved prompt families and required cue kinds. Template membership is necessary but not
sufficient: each authored prompt is still reviewed in context.

### `sentence_exam_curated_bank.js`

The bank repeats the locked selection policy for transparent runtime metadata. The audit owns the
actual constants independently and rejects missing or altered bank values.

A typed entry has this shape:

```js
{
  id: "s0001",
  mode: "typed",
  templateId: "topic-statement",
  examPromptEn: "As for Hangul, tell a classmate that it is fun.",
  canonicalAnswer: "한글은 재미있어요.",
  manualAlternatives: [],
  requiresLexicalAnchor: false,
  authoredBy: "author-id",
  reviewStatus: "approved",
  reviewedBy: "different-reviewer-id",
  reviewedAt: "2026-07-26T11:00:00Z",
  reviewedRevision: "curated-sentence-exam-v1",
  reviewerNote: "Topic, lexical choice, and everyday polite register are forced."
}
```

Typed review evidence is invalid when:

- the status is not `approved`;
- author or reviewer identity is missing;
- author and reviewer are the same identity;
- the timestamp is not valid UTC ISO format;
- `reviewedRevision` differs from the bank revision;
- the reviewer note is empty.

A recognition entry uses a live source row but is not eligible for exact typed certification.

### Locked selection policy

The independent audit constants are:

- typed target: 288;
- recognition target: 320;
- typed floor per section: 32;
- recognition floor per section: 24;
- maximum typed entries per lesson: 1;
- maximum recognition entries per lesson: 2;
- maximum finite typed share: 15%;
- stage exam: 24 total, 20 typed, 4 selected;
- final exam: 50 total, 40 typed, 10 selected;
- retention exam: 25 total, 20 typed, 5 selected.

### `sentence_exam_grader.js`

- NFC-normalizes input.
- Trims outer whitespace.
- Collapses repeated whitespace.
- Preserves Korean word boundaries.
- Accepts only canonical plus manually authored alternatives.
- Produces non-scoring diagnostics only after submission.
- Never swaps particles, reorders words, substitutes synonyms, generates contractions, or asks an
  LLM to judge correctness.

## 6. Tooling contracts

### Ambiguity screening

`scripts/lib/sentence-exam-ambiguity.mjs` may flag or reject candidates. It may never approve one.
Initial flags cover topic/focus, time/tense, register, communicative act, lexical choice, productive
clause families, particle/order density, and duplicate targets.

### Inventory builder

`scripts/build-sentence-exam-inventory.mjs` produces deterministic data containing:

- every sentence row;
- lesson and section routes;
- historical eligibility evidence;
- ambiguity flags;
- contraction families;
- candidate ranking inputs.

No current timestamp, random ordering, or machine-specific path may enter generated output.

### Curated-bank audit

`scripts/audit-sentence-exam-curated-bank.mjs` fails on:

- missing or altered locked policy fields;
- missing source rows or lesson routes;
- unknown prompt templates or missing prompts;
- canonical answer drift;
- more than four alternatives;
- duplicate accepted answers;
- accepted-answer collisions;
- typed rows contradicting a protected historical exclusion;
- unresolved ambiguity flags;
- missing, stale, rejected, or self-authored review evidence;
- target, section, or lesson quota failures when enabled;
- excessive finite-variant share.

The audit uses its own locked constants for readiness. It never trusts lower values supplied by the
bank it is auditing.

## 7. Implementation stages

These stages describe deliverables. The primary roadmap alone decides when each may run.

### CB0 foundation

- Prompt-template contract.
- Disabled curated-bank contract.
- Strict grader.
- Ambiguity screening.
- Inventory builder.
- Curated-bank audit and regressions.
- CI and core-gate wiring.
- Research-backed implementation specification.

### CB1 inventory and shortlist

- Generate `docs/generated/sentence_exam_inventory.json` deterministically.
- Rank by section, lesson, grammar family, route stability, and ambiguity risk.
- Produce at least 400 typed candidates and 450 recognition candidates.
- Reuse E1A/E1B evidence without auto-approval.

### CB2 and CB3 lesson restructuring

- Add meaning context, contrast closure, controlled production, variation awareness, and free
  practice for every typed candidate.
- CB2 owns sections 1-4; CB3 owns sections 5-8.
- Run sequentially unless physical file ownership is proven non-overlapping.
- Add focused browser, phone-width, and screen-reader evidence.

### CB4 bank authoring and independent review

- Select at least 288 typed and 320 recognition entries.
- Review every typed prompt and accepted answer manually.
- Review every finite alternative independently.
- Record complete current review evidence with different author and reviewer identities.
- Confirm all section and lesson quotas and all collision checks.
- Keep the bank disabled.

### CB5 freeze and activate

- Set the frozen bank revision.
- Record prompt and accepted-answer hashes.
- Enable the bank.
- Check in deterministic inventory output.
- Make readiness depend on the curated bank.
- Preserve E1A/E1B and shards C/D as historical evidence without requiring completion of C/D.

### X1 engine and paper audit

- Build stage, final, and retention blueprints from the enabled bank.
- Enforce freshness, section coverage, strand allocations, and deterministic seeds.
- Use the same strict grader in browser and audit environments.

### X2 browser runner

- Add timer, navigation, review, submission, results, remediation, provenance, Practice taint, and
  delayed retention.
- Never show hints or correctness before submission.

## 8. Acceptance checklist

### Infrastructure

- [ ] All root browser scripts and touched MJS files pass syntax checks.
- [ ] Ambiguity and audit-safety regression passes.
- [ ] Grader regression passes.
- [ ] Disabled empty bank passes structural audit.
- [ ] Lowered or missing policy values fail regression fixtures.
- [ ] Unapproved, stale, missing, or self-reviewed typed evidence fails regression fixtures.
- [ ] Existing historical eligibility audit remains green during migration.
- [ ] Full core gate remains green.

### Lesson restructuring

- [ ] Every typed candidate has a contrast set.
- [ ] Every typed candidate has controlled production.
- [ ] Every prompt identifies its communicative act.
- [ ] Tense-sensitive targets include time cues.
- [ ] Register-sensitive targets identify addressee or setting.
- [ ] Topic/focus-sensitive targets state discourse context.
- [ ] Synonym-sensitive targets include a lexical anchor.
- [ ] Natural related variants are taught without being falsely accepted.

### Bank activation

- [ ] At least 288 typed and 320 recognition entries.
- [ ] Section floors and lesson caps pass audit-owned constants.
- [ ] Every typed entry has current independent-review evidence.
- [ ] Author and reviewer differ for every typed item.
- [ ] No unresolved ambiguity flags.
- [ ] No more than four alternatives per item.
- [ ] No accepted-answer collision.
- [ ] Finite typed share is at most 15%.
- [ ] Revision and hashes are frozen.

### Release

- [ ] Stage papers contain 24 questions with 20 typed.
- [ ] Final contains 50 with 40 typed.
- [ ] Retention contains 25 with 20 typed.
- [ ] Five-attempt freshness passes.
- [ ] Browser and audit use the same grader.
- [ ] No lesson helper leaks into exams.
- [ ] No unreviewed item can enter a generated paper.
- [ ] Phone-width journeys pass without clipped controls or blank routes.

## 9. Research basis

Use these as design constraints, not as labels for HanaPath proficiency claims:

- Council of Europe, CEFR Companion Volume (2020): align teaching, tasks, and assessment while
  describing production, interaction, reception, and mediation separately.
- ACTFL Proficiency Guidelines 2024: assess contextual language functions and do not confuse
  memorized isolated forms with broad proficiency.
- Cambridge English quality and accountability principles: balance validity, reliability, impact,
  and practicality; pretest and monitor item quality.
- King Sejong Institute curriculum and assessment materials: align achievement assessment with
  curriculum goals and distinguish language skills.

Reference links:

- https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors
- https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-in-the-classroom
- https://www.actfl.org/proficiency-guidelines-overview
- https://www.actfl.org/uploads/files/general/Resources-Publications/ACTFL_Proficiency_Guidelines_2024.pdf
- https://www.cambridgeenglish.org/english-research-group/quality-and-accountability/
- https://www.cambridgeenglish.org/exams-and-tests/producing-exams/
- https://www.ksif.or.kr/com/cmm/EgovContentView.do?menuNo=20102100
