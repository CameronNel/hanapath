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
| deferred | 5 | 때문, 어서, 다는, 으면, 해서 |
| covered | 5 | 왜, 여자, 뭐, 위, 좀 |
| rejected | 1 | 화 |
| **window total** | **11** | |

The five source tokens are retained in the qualification history but are not
teachable elective lemmas. `때문` is grammar-only: teach the bound-noun
construction `때문에`, and do not create a standalone elective word row.
`어서` is the source-token form of the `-아서/어서` grammar; defer the
independent adverb meaning “quickly/please” unless a separate context supports
it. `다는` is the quotative/attributive grammar form, `으면` is the conditional
ending `-(으)면`, and `해서` is the `하다 + -아서/어서` grammar form. None may
be imported as vocabulary rows from this window. The covered rows remain
linked to their existing curated IDs; `화` remains rejected because no safe
lexical sense was established.

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

## Owner decisions recorded

1. `때문`: grammar-only; teach `때문에` as a bound-noun construction, with no
   elective word row.
2. `어서`: grammar-only in this source context; only consider the independent
   adverb later if its own context supports “quickly/please.”
3. `다는`: grammar-only quotative/attributive form.
4. `으면`: grammar-only conditional ending `-(으)면`.
5. `해서`: grammar-only `하다 + -아서/어서` form.
6. A larger, semantically coherent follow-up range may be qualified for a
   future elective pack, but these five forms remain excluded from vocabulary
   rows.

No audio run, cache bump, app data mutation, or learner-visible change is part
of this proposal.
