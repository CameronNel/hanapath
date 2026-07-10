# Words Phase 2 proposal: reasons, conditions, and plans

Status: **owner review only**. This proposal imports no Korean content and does
not publish or alter an elective pack.

## Evidence window

- Source: `korean_5000_claude_ready.csv`, ranks **112–122**, source hash
  `4dfba796fd3f2d828c48d78a8a10565e33483b5366af16f2b607ec27d0f714dd`.
- Queue output: `scripts/words_expansion/candidate_queue.json`.
- Every source row in the window has a decision in
  `scripts/words_expansion/candidate_decisions.jsonl` under batch
  `p2-proposal-r112-r122`.

| Disposition | Count | Surfaces |
|---|---:|---|
| needs-sense-review | 5 | 때문, 어서, 다는, 으면, 해서 |
| covered | 5 | 왜, 여자, 뭐, 위, 좀 |
| rejected | 1 | 화 |
| **window total** | **11** | |

The five review candidates are retained rather than treated as teachable
lemmas. `때문` is the strongest lexical candidate, but its bound-noun behavior
needs a controlled-vocabulary example decision. `어서`, `다는`, `으면`, and `해서` are
form/function candidates and must not become vocabulary rows without a
confirmed canonical lemma and communicative role. The covered rows remain
linked to their existing curated IDs; the two ambiguous one-syllable forms are
rejected for this proposal.

## Provisional elective-pack concept

**Theme:** Reasons, conditions, and making plans

**Communicative function:** explain why something happens, state a condition,
and describe a simple plan or obligation.

**Prerequisites:** the frozen S1–S8 core, especially existing time/daily,
connective, and core-action lessons. This proposal adds no gate or path edge.

**Controlled-vocabulary rule:** examples may use only already-curated core
words plus owner-approved new rows. No example may rely on an unresolved form
candidate as if it were a lemma.

**Proposed unit shape:** if review later confirms enough independent lemmas,
build 6–12 coherent draft units with 8–12 words each. The current window is
not large enough: it contains zero import-ready new lemmas. It is therefore a
qualification packet, not a release pack.

## Owner decisions requested

1. Confirm whether `때문` should be authored as a standalone elective item or
   treated only through the existing connective/grammar teaching surface.
2. Resolve the canonical lemma and teaching role, if any, for `어서`, `다는`,
   `으면`, and `해서` using source evidence before authoring examples.
3. Approve a larger, semantically coherent follow-up range before any JSON row
   authoring, audio generation, or importer commit is considered.

No audio run, cache bump, app data mutation, or learner-visible change is part
of this proposal.
