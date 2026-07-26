# Curated Sentence Exam Bank implementation plan

> **Active implementation plan.** This document turns the 26 July 2026 research decision into an executable repository queue. It is not a prose report. It is the build list, data contract, authoring contract, migration path, and acceptance checklist for replacing full-corpus typed certification with a smaller, deliberately authored exam bank.

## 1. Decision lock

- Keep all 4,177 sentence rows for lessons, review, listening, recognition, and free practice.
- Stop requiring every sentence row to become a fair exact-match typing question.
- Build a separate curated exam bank from rows already taught in the sentence curriculum.
- Use exact matching only for prompts that force one intended Korean answer or a manually reviewed list of at most four alternatives.
- Use recognition or sentence-choice questions for useful rows that cannot be made fair for typed scoring.
- Preserve the 2,100 completed eligibility reviews as evidence and candidate triage. Do not discard them.
- Pause new full-corpus classification work on shards C and D until the curated-bank migration is complete.
- Do not change normal lesson grading to exam grading. Learning remains supported; certification remains strict.

## 2. Why the lesson structure must change

A translation gloss can represent several related but different Korean constructions. For example:

- “I like to eat.”
- “I like eating.”
- “Eating is nice.”

Those must never be treated as interchangeable surfaces for one exact-answer item.

Every grammar family that can produce this problem must be taught as a **contrast set**, not as isolated English-to-Korean pairs:

- `-는 것을 좋아하다`: liking an activity.
- `-기가 좋다`: finding an activity pleasant or good.
- topic framing with `은/는`: making the activity the topic.
- subject/focus framing with `이/가`: answering who or what is responsible.
- lexical liking: liking a noun or food rather than the activity.
- speech-level and contraction variants.

## 3. Required lesson shape

Every sentence lesson that contributes an exam candidate must contain these phases in this order.

### Phase A: Meaning first

- Show the Korean sentence in context.
- Explain what the speaker is doing, not only the English meaning.
- Identify the addressee and speech level.
- Identify the time or aspect.
- Identify what is topic, focus, object, location, or contrast.
- Identify the lexical item being taught.

### Phase B: Contrast closure

- Show at least one nearby sentence that is grammatical but means something different.
- State the difference in plain language.
- Cover likely English collisions such as:
  - like a thing vs like an activity;
  - action is enjoyable vs speaker enjoys the action;
  - topic vs focus;
  - present routine vs future plan;
  - everyday polite vs formal polite;
  - statement vs request vs suggestion;
  - particle present vs omitted;
  - canonical form vs standard contraction.

### Phase C: Controlled production

- Present a context-rich prompt.
- Force the intended tense.
- Force the addressee or social setting.
- Force the discourse role.
- Supply a lexical anchor when an ordinary synonym would otherwise be valid.
- Force one communicative act.
- Accept only the canonical target and explicitly reviewed alternatives.
- Do not use fuzzy matching or generated grammar transformations.

### Phase D: Variation awareness

- Show other natural ways to express a related meaning.
- Label them as different constructions, not “wrong answers.”
- Explain why they are not accepted for the controlled target.
- Keep these variants in learning or recognition surfaces.

### Phase E: Free practice

- Allow broader production with helpers and explanations.
- Do not award formal exam credit from free-practice attempts.

### Phase F: Exam readiness marker

A row becomes an exam candidate only after all of the following are true:

- the contrast set exists;
- the controlled prompt exists;
- the prompt has explicit context cues;
- accepted alternatives are finite and manually reviewed;
- the row resolves to a real lesson and section;
- the ambiguity audit has no unresolved flag;
- a reviewer marks the candidate approved.

## 4. Curated bank size

### Typed bank

- Target: **288 rows**.
- Minimum: **32 rows per section** across eight sections.
- Maximum: **1 typed row per lesson**.
- Maximum finite-variant share: **15%**.
- Default class: canonical-only.

### Recognition bank

- Target: **320 rows**.
- Minimum: **24 rows per section**.
- Maximum: **2 recognition rows per lesson**.
- Use for rows with useful meaning or grammar coverage that cannot support fair exact typing.

### Why these numbers

- Stage exams use 20 typed and 4 selected questions.
- The final uses 40 typed and 10 selected questions.
- Retention uses 20 typed and 5 selected questions.
- The existing five-attempt freshness rule requires enough unique typed material to avoid immediate recycling.
- A 288-row typed bank gives margin above the final-only five-attempt lower bound of 200 while supporting section balance and lesson diversity.

## 5. Data files

### `sentence_exam_prompt_templates.js`

Stores approved prompt families and the cue kinds each family requires.

Required cue kinds:

- `communicativeAct`
- `addressee`
- `register`
- `time`
- `discourseRole`
- `focusQuestion`
- `lexicalAnchor`
- `context`

### `sentence_exam_curated_bank.js`

Stores the curated rows and selection policy.

Each typed entry must eventually contain:

```js
{
  id: "s0001",
  mode: "typed",
  templateId: "topic-statement",
  examPromptEn: "As for Hangul, tell a classmate that it is fun.",
  canonicalAnswer: "한글은 재미있어요.",
  manualAlternatives: [],
  requiresLexicalAnchor: false,
  reviewStatus: "approved",
  reviewerNote: "Topic and everyday polite register are forced."
}
```

Each recognition entry uses the same source row but is not eligible for exact typed certification.

### `sentence_exam_grader.js`

- NFC-normalizes input.
- Trims outer whitespace.
- Collapses repeated whitespace.
- Preserves Korean word boundaries.
- Accepts only canonical plus manually authored alternatives.
- Produces non-scoring diagnostics after submission.
- Never swaps particles, reorders words, substitutes synonyms, or asks an LLM to judge correctness.

### `scripts/lib/sentence-exam-ambiguity.mjs`

Provides conservative screening flags. It does not approve an item by itself.

Initial flags:

- topic or focus not forced;
- time or tense not forced;
- register not forced;
- communicative act not forced;
- lexical choice not forced;
- productive clause family;
- dense particle or word-order family;
- duplicate canonical target.

### `scripts/build-sentence-exam-inventory.mjs`

Produces a deterministic inventory of:

- all sentence rows;
- lesson and section routes;
- existing eligibility decisions;
- ambiguity flags;
- contraction families;
- heuristic typed-safety status.

### `scripts/audit-sentence-exam-curated-bank.mjs`

Fails on:

- missing source rows;
- missing lesson routes;
- unknown prompt templates;
- missing prompts;
- canonical answer drift;
- more than four alternatives;
- duplicate accepted answers;
- accepted-answer collisions across items;
- typed rows that contradict an existing exclusion;
- unresolved ambiguity flags;
- target or section quotas when the bank is enabled;
- per-lesson caps;
- excessive finite-variant share.

## 6. Authoring rules

### Canonical-only typed item

Use only when the prompt forces:

- one event or state;
- one time interpretation;
- one speech level;
- one addressee relationship;
- one topic/focus structure;
- one main lexical choice;
- one communicative act;
- one taught route.

### Finite typed item

Use only when:

- every alternative is explicitly stored;
- there are no more than four alternatives;
- alternatives preserve meaning, grammar target, register, and information structure;
- alternatives are standard forms such as a reviewed contraction;
- no alternative collides with another item.

### Recognition item

Use when:

- the row is pedagogically useful;
- exact typed grading would reject valid Korean;
- four clear options can be authored;
- the item tests meaning or contextual fit rather than memorized wording.

### Hard typed exclusions

- unresolved synonym choice;
- unresolved topic vs subject;
- optional particle not selected by context;
- several ordinary word orders;
- unspecified register;
- unspecified tense;
- productive paraphrase family;
- more than four valid answers;
- duplicate canonical target;
- untaught grammar or vocabulary;
- unstable lesson route;
- prompt that states the grammar answer directly.

## 7. Migration packets

### CB0: infrastructure and plan

Deliver:

- prompt-template contract;
- curated-bank contract, disabled;
- strict grader;
- ambiguity screening library;
- inventory builder;
- curated-bank audit;
- regression tests;
- CI wiring;
- this plan and the roadmap addendum.

Done when all new syntax checks and regressions pass and the disabled empty bank passes its structural audit.

### CB1: inventory and candidate shortlist

- Generate `docs/generated/sentence_exam_inventory.json`.
- Rank candidates by section, lesson, grammar family, and ambiguity risk.
- Produce a shortlist larger than the final bank:
  - at least 400 typed candidates;
  - at least 450 recognition candidates.
- Reuse E1A and E1B reviews as evidence.
- Do not approve items automatically from heuristic output.

### CB2: lesson contrast restructuring, sections 1–4

- Add contrast closure and controlled-production prompts to candidate lessons.
- Cover every typed candidate in sections 1–4.
- Add focused browser fixtures.
- Verify mobile layout and screen-reader labels.

### CB3: lesson contrast restructuring, sections 5–8

- Repeat CB2 for sections 5–8.
- Pay special attention to clause combinations, formal register, honorifics, future, negation, requests, and proposals.

### CB4: curate and review the bank

- Select 288 typed and 320 recognition rows.
- Review every typed prompt and accepted answer manually.
- Review all finite alternatives independently.
- Confirm section and lesson quotas.
- Confirm no answer collisions.
- Keep the bank disabled until the review is complete.

### CB5: freeze and activate

- Set the bank revision.
- Record prompt hashes and accepted-answer hashes.
- Enable the bank.
- Commit and check the generated inventory.
- Change Sentence exam readiness from full-corpus completion to curated-bank readiness.
- Remove the old requirement to complete shards C and D.
- Keep old eligibility shards as historical review evidence unless a later cleanup packet removes them safely.

### X1: generator and paper audit

- Build stage, final, and retention blueprints from the curated bank.
- Enforce freshness, section coverage, strand allocations, and deterministic seeds.
- Use `sentence_exam_grader.js` byte-for-byte in browser and audit environments.

### X2: browser runner

- Add the real Sentence exam screens.
- Add timer, review, submission, results, remediation, provenance, practice taint, and retention.
- Do not expose hints or answer feedback before submission.

## 8. Acceptance checklist

### Infrastructure

- [ ] All new root scripts pass `node --check`.
- [ ] Ambiguity regression passes.
- [ ] Grader regression passes.
- [ ] Curated-bank audit passes with the bank disabled.
- [ ] Existing sentence eligibility audit still passes during migration.
- [ ] Existing full core gate remains green.

### Lesson restructuring

- [ ] Every typed candidate has a contrast set.
- [ ] Every typed candidate has a controlled-production prompt.
- [ ] Every prompt identifies the communicative act.
- [ ] Tense-sensitive targets have time cues.
- [ ] Register-sensitive targets identify the addressee or setting.
- [ ] Topic/focus-sensitive targets state the discourse context.
- [ ] Synonym-sensitive targets supply a lexical anchor.
- [ ] Related natural variants are taught without being falsely accepted for the controlled target.

### Bank activation

- [ ] At least 288 typed entries.
- [ ] At least 320 recognition entries.
- [ ] At least 32 typed entries per section.
- [ ] At least 24 recognition entries per section.
- [ ] No lesson exceeds the contribution caps.
- [ ] No typed row has unresolved ambiguity flags.
- [ ] No item has more than four alternatives.
- [ ] No accepted answer collides with another item.
- [ ] Finite typed share is no more than 15%.
- [ ] The bank revision and hashes are frozen.

### Release

- [ ] Stage exams generate 24 questions with 20 typed.
- [ ] Final generates 50 questions with 40 typed.
- [ ] Retention generates 25 questions with 20 typed.
- [ ] Five-attempt freshness passes.
- [ ] Browser and audit use the same grader.
- [ ] No lesson helper leaks into exams.
- [ ] No unreviewed item appears in an exam.
- [ ] Phone-width journeys pass without clipped controls or blank routes.

## 9. Research basis

Use these as design constraints, not as labels for HanaPath proficiency claims:

- Council of Europe, **CEFR Companion Volume (2020)**: align teaching, tasks, and assessment; describe production, interaction, reception, and mediation separately.
- ACTFL, **Proficiency Guidelines 2024**: evaluate what learners can do with language in real-world functions and contexts; do not confuse memorized isolated forms with broad proficiency.
- Cambridge English, **Principles of Good Practice / quality and accountability**: balance validity, reliability, impact, and practicality; pretest and monitor item quality.
- King Sejong Institute Foundation, **Sejong Korean assessment and curriculum materials**: align achievement assessment with curriculum goals and separate language skills in assessment design.

Reference links:

- https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors
- https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-in-the-classroom
- https://www.actfl.org/proficiency-guidelines-overview
- https://www.actfl.org/uploads/files/general/Resources-Publications/ACTFL_Proficiency_Guidelines_2024.pdf
- https://www.cambridgeenglish.org/english-research-group/quality-and-accountability/
- https://www.cambridgeenglish.org/exams-and-tests/producing-exams/
- https://www.ksif.or.kr/com/cmm/EgovContentView.do?menuNo=20102100
