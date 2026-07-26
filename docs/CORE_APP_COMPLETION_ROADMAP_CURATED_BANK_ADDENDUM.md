# Core completion roadmap addendum: curated Sentence exam bank

> **Active amendment.** This addendum changes only the Sentence-exam eligibility path in `CORE_APP_COMPLETION_ROADMAP.md`. All other scope, ownership, browser, migration, acceptance, and release rules remain active.

## Status correction

- D0: complete.
- C1: complete.
- E0: complete in PR #354.
- E1A: complete in PR #355.
- E1B: complete in PR #356.
- E1C: paused; do not review shard C under the old full-corpus requirement.
- E1D: paused; do not review shard D under the old full-corpus requirement.
- E2: replaced by CB4 and CB5 below.
- The 2,100 completed reviews remain valid evidence and candidate triage.

## Replacement dependency chain

```text
CB0 curated-bank infrastructure and plan
  |
  +--> CB1 inventory and candidate shortlist
          |
          +--> CB2 lesson contrast restructuring, sections 1-4 --+
          +--> CB3 lesson contrast restructuring, sections 5-8 --+--> CB4 bank authoring and review
                                                                   |
                                                                   +--> CB5 freeze and activate
                                                                            |
                                                                            +--> X1 engine
                                                                                   |
                                                                                   +--> X2 runner

L1 lesson browser gate, L3 audio closure, and other non-conflicting lanes may continue in parallel.
L2 must still merge before X2 because both touch learner-facing Sentence behavior.
```

## Active packet board

| ID | Packet | State | Depends on | Main output |
|---|---|---|---|---|
| CB0 | Curated-bank infrastructure, research plan, audits, CI | ACTIVE | E1B | Disabled bank contract and safety rails |
| CB1 | Full inventory and candidate shortlist | BLOCKED | CB0 | Deterministic inventory and ranked candidates |
| CB2 | Restructure candidate lessons, sections 1-4 | BLOCKED | CB1 | Contrast sets and controlled production |
| CB3 | Restructure candidate lessons, sections 5-8 | BLOCKED | CB1 | Contrast sets and controlled production |
| CB4 | Author and independently review curated bank | BLOCKED | CB2 + CB3 | 288 typed and 320 recognition rows |
| CB5 | Freeze, enable, and change readiness contract | BLOCKED | CB4 | Active bank, hashes, strict readiness |
| X1 | Sentence exam blueprints and pure engine | BLOCKED | CB5 | Deterministic papers and seed audit |
| X2 | Sentence exam UI, results, provenance, retention | BLOCKED | X1 + L2 | Learner-facing Sentence exam suite |
| Q1 | Full core acceptance | BLOCKED | L1-L3 + X2 | Browser and migration evidence |
| Q2 | Release-candidate closure | BLOCKED | Q1 | Strict CI and final evidence |

## Rules changed by this amendment

- The typed certification target is the curated bank, not all 4,177 lesson rows.
- Shards C and D are not prerequisites for Sentence exams.
- Full-corpus eligibility may remain available as historical research data.
- Curated-bank readiness requires:
  - enabled bank;
  - target sizes and section floors;
  - zero unresolved ambiguity flags for typed entries;
  - accepted-answer collision checks;
  - deterministic inventory;
  - independent review and frozen revision.
- The lesson curriculum must explicitly teach contrasts before a row can enter the typed bank.

## Rules not changed

- Exact Sentence exam grading remains strict.
- No runtime paraphrase generation, fuzzy matching, embeddings, or LLM grading.
- No hints or answer feedback before exam submission.
- Practice cannot award qualification, mastery, or retention.
- Save migration and backup/import must remain backward-compatible.
- X1 and X2 still require deterministic seeds, provenance, taint handling, and retention rules.
- Q1 and Q2 still run the full learner journey and strict release closure.

## Immediate next action after CB0

Run CB1 from fresh `main`:

> Generate the deterministic Sentence exam inventory, reuse E1A/E1B evidence, rank candidates by section and ambiguity risk, and produce a manually reviewable shortlist of at least 400 typed candidates and 450 recognition candidates. Do not enable the curated bank and do not change learner-facing behavior. Open a draft PR and stop.
