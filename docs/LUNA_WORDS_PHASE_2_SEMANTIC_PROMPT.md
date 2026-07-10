# Luna — Words Phase 2, handoff 2: semantic resolution marathon

> **Owner assignment (2026-07-10): Luna owns this queue.** Your Q01–Q18
> qualification stack was reviewed, verified, and merged. Do not redo it.
> This handoff replaces the Lane priorities in
> `docs/LUNA_WORDS_PHASE_2_BATCH_PROMPT.md`; everything in that doc about
> git/PR protocol, marathon/low-credit rules, semantic rules, verification
> commands, and the final handoff report still applies verbatim.

## Before anything else: sync your local clone

Your local `main` predates the merged Q01–Q18 stack. Before reading further
or creating any branch:

```powershell
git checkout main
git fetch origin
git pull origin main
git status
```

Require a clean tree and `main` at or after `45d5488e`. Several branches you
pushed last session (`luna/words-p2-q*`) were merged, rebuilt, or superseded
and then deleted on origin — delete any stale local copies rather than
reusing them, and never force-push an old local branch over current state.

## Verified starting point — re-derive before relying on it

- Start from `main` at or after `45d5488e`.
- Ranks 1–10,000 have full disposition coverage, merged via PRs #194, #213,
  #196–#201, and #212 (#212 collapses ranks 5001–10,000 into one commit;
  #195 and #202–#211 were closed as superseded — trust the ledger and
  `candidate_decisions.jsonl`, not old PR numbers).
- The decisions ledger holds 8,942 unique source rows: 6,852
  needs-sense-review, 1,221 covered, 712 rejected, 93 inflected, 40 deferred,
  24 accepted, 5 merged. Re-derive these counts from the JSONL.
- Curated core unchanged: 2,028 words, 283 lessons, cache
  `hanapath-shell-v306`. `ep1-conversation` is still a draft, unpublished.
- Imports (`import_batch.mjs --commit`), audio generation, and cache/version
  changes remain **owner-gated**. Do not run them.

## Mission

Phase 2 is administratively swept but semantically unfinished: 77% of decided
rows are `needs-sense-review`. Your job this marathon is to **resolve that
pool with real dictionary and corpus evidence**, grow the accepted pool, and
author coherent draft lessons from it.

**Do NOT continue Lane A (Q19+ / ranks 10,001–22,679).** Past rank 5,000 the
qualification tool routes essentially every row to needs-sense-review, so
further sweeps add backlog, not decisions. Lane A resumes only if the owner
explicitly re-opens it.

## Lane S — semantic resolution batches (primary lane)

Process the needs-sense-review pool in **ascending rank order** (frequency =
learner value), 200–250 candidates per PR. Branch names:
`luna/words-p2-s<start>-<end>` by rank range covered.

- **Mechanism:** append-only resolution records, following the
  `p2-owner-decisions-r112-r122` precedent — a new JSONL line that
  supersedes the earlier status for the same `sourceRowKey`. Never edit or
  delete an existing line. If the tooling lacks a first-class resolution
  command, build it FIRST as one Lane D PR with regression tests (this is
  pre-approved); it must validate that every resolution references an
  existing needs-sense-review record.
- **Evidence bar per candidate:** identify POS and standard dictionary
  (lemma) form; state the primary sense in one gloss; check distinctness
  against curated senses (같은 표기, 다른 품사/의미 are separate); then
  resolve to `accepted`, `covered` (with verified parent id), `rejected`
  (fragment/proper noun/non-lemma), `deferred` (grammar), or leave
  needs-sense-review with a reason stating exactly what evidence is missing.
  Reasons must cite the linguistic evidence, never just restate the status.
- Each Lane S PR ships: the resolution records, a deterministic summary
  report, an owner packet under `docs/`, and one honest ledger row.
- Do not inflate accepted counts. An `accepted` lemma is a real standalone
  dictionary word worth authoring later, nothing more.

## Lane B and Lane C — unchanged, now unblocked

Interleave the existing Lane B items (B01 ambiguity packet, B02 missing-core
lemmas, B03 parent-link audit, B04 accepted-pool taxonomy, B05 risk reviews)
with Lane S. Author a Lane C draft lesson PR (8–12 words, one communicative
scenario, `--dry-run --pack-manifest` must pass) whenever a coherent accepted
pool reaches 8 — never pad with leftovers.

## Stacking — lessons from the last merge

Keep the stacked-PR protocol, but **cap each stack at 6 PRs**, then wait for
that stack to merge before starting the next (squash-merging long stacks
forces the reviewer to rebuild every branch). Never delete a stack-base
branch. Put `Stack: N of M` and merge order in every PR body.

## Definition of done for Phase 2

1. Every needs-sense-review record from ranks 1–10,000 has an append-only
   resolution or a documented evidence gap.
2. The accepted pool is taxonomized into scenario pools (B04).
3. Every pool of 8+ has a draft, dry-run-passing lesson pack.
4. All owner-gated items (imports, audio, cache, publishing) are listed in
   one final owner packet, untouched.

Run the full verification battery from the original handoff after every PR.
End with the standard final report, including resolved/remaining
needs-sense-review counts and the next unresolved rank.
