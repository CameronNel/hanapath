# Luna Words Phase 2 marathon handoff

> **Owner assignment (2026-07-10): Luna owns this queue again.** Codex reviewed
> and merged Claude's top-1,000 sweep and first draft lesson. Continue from the
> verified baseline below. Do not redo completed work.

## Mission

Do as much useful Words Phase 2 work as your credit window safely permits.
Keep working batch by batch until credits are low. Every batch must be pushed
as its own draft PR before you start the next batch. Prefer real qualification,
semantic review, and coherent authored content over handover or README churn.

Read these before editing:

1. `AI_INSTRUCTIONS.md`
2. `CLAUDE.md`
3. `docs/WORDS_CURRICULUM_V2_PLAN.md`, especially sections 5–7
4. `scripts/words_expansion/author_batch_template.md`
5. `scripts/words_expansion/batch_qa_checklist.md`
6. `docs/WORDS_EXPANSION_LEDGER.md`

Work only on Words Phase 2. Do not touch Sentences, Alphabet, or the frozen
S1–S8 curriculum.

## Verified starting point

- Start from `main` at or after `8c7a9452`.
- Phase 1 is complete and frozen: 2,028 curated words, 283 lessons.
- Candidate ranks 1–1000 have disposition coverage in the immutable ledger.
- The accepted pool contains 24 lemmas.
- `ep1-conversation` is a draft, unpublished 12-word lesson named
  **Connecting your ideas**. It is not imported.
- Real imports remain owner-gated. Do not run `import_batch.mjs --commit`, do
  not run audio generation, and do not change loaded data/cache versions.
- Qualification, owner-review packets, authored draft rows, dry runs, tests,
  and tooling fixes are allowed.

Re-derive these claims before relying on them:

```powershell
node scripts/words_expansion/build_candidate_queue.mjs --validate
node scripts/words_expansion/test_qualify_config.mjs
node scripts/words_expansion/test_elective_qualification.mjs
node scripts/words_expansion/test_expansion_tooling.mjs
node scripts/audit-words-data.mjs --strict
node scripts/audit-alphabet-audio.mjs --strict
```

## Marathon and low-credit rules

1. Continue automatically; do not stop after one PR to ask whether to proceed.
2. Treat a platform low-credit warning or roughly 15% remaining credits as the
   stop threshold. Do not begin another batch once you cross it.
3. At the threshold, finish and verify the current small batch if safe, push
   it, open its draft PR, and stop. If finishing would be risky, push a clearly
   labelled draft/WIP commit with the exact breakpoint and no uncommitted work.
4. Never trade semantic accuracy or verification for one more batch.
5. End with a compact stack order, PR links, exact rank coverage, disposition
   counts, accepted lemmas, authored drafts, checks run, and the next rank.

## Git and PR protocol

- One qualification range, semantic-resolution packet, or authored lesson pack
  equals one branch, one commit series, and one draft PR.
- Branch names: `luna/words-p2-q<start>-<end>` for qualification and
  `luna/words-p2-author-<slug>` for authoring.
- Push and open the draft PR immediately after verification. Never leave the
  only copy of completed work local.
- Because qualification batches all append to the same decision ledger, use a
  documented stack during one marathon: PR 1 targets `main`; PR 2 branches from
  PR 1 and targets PR 1's branch; continue in order. Put `Stack: N of M` and the
  required merge order in every PR body.
- Never delete a stack-base branch. A deleted base automatically closes its
  dependent PRs. The reviewer will squash-merge, rebuild/retarget as needed,
  and clean branches after the whole stack lands.
- Do not merge your own PRs unless the owner explicitly tells you to merge.
- Before starting, require a clean tree and run `git fetch origin`. Do not
  absorb unrelated user changes.

## Qualification contract for every Q batch

Use `qualifyWithConfig()` and follow the merged top-1,000 configs as the
pattern. Each qualification PR must contain:

- one committed config under `scripts/words_expansion/batches/`;
- one deterministically regenerated report;
- the append-only decisions in `candidate_decisions.jsonl`;
- one concise owner-review packet under `docs/`;
- one new row in `docs/WORDS_EXPANSION_LEDGER.md`;
- exact counts re-derived from the report and ledger, never hand-counted.

Semantic rules:

- A raw token is not automatically a lemma.
- Do not override heuristic flags merely to increase accepted counts.
- Record canonical lemmas for inflected/truncated forms when supported, but do
  not author a row from the fragment.
- Different parts of speech are not duplicates: for example, noun `공부` is
  distinct from verb `공부하다`.
- Preserve genuine ambiguity as `needs-sense-review`.
- Grammar endings/constructions are `deferred`, not vocabulary.
- Contractions/case-marked forms may merge only when the parent surface and
  exact curated id are verified.
- `accepted` means a real standalone dictionary lemma worth later authoring;
  it does not mean it must be forced into the next lesson.
- Reasons must state the linguistic evidence, not merely repeat the status.

Run after every qualification PR:

```powershell
node --check scripts/words_expansion/qualify_elective_range.mjs
node scripts/words_expansion/test_qualify_config.mjs
node scripts/words_expansion/test_elective_qualification.mjs
node scripts/words_expansion/test_expansion_tooling.mjs
node scripts/words_expansion/build_candidate_queue.mjs --validate
node scripts/audit-words-data.mjs --strict
node scripts/audit-alphabet-audio.mjs --strict
node scripts/audit-app-shell.mjs
git diff --check
```

## Lane A — qualification backlog

Take these in order. One line is one draft PR. Skip already-decided source rows
through the tool; never duplicate or rewrite an existing decision.

- [ ] Q01 ranks 1001–1500
- [ ] Q02 ranks 1501–2000
- [ ] Q03 ranks 2001–2500
- [ ] Q04 ranks 2501–3000
- [ ] Q05 ranks 3001–3500
- [ ] Q06 ranks 3501–4000
- [ ] Q07 ranks 4001–4500
- [ ] Q08 ranks 4501–5000
- [ ] Q09 ranks 5001–5500
- [ ] Q10 ranks 5501–6000
- [ ] Q11 ranks 6001–6500
- [ ] Q12 ranks 6501–7000
- [ ] Q13 ranks 7001–7500
- [ ] Q14 ranks 7501–8000
- [ ] Q15 ranks 8001–8500
- [ ] Q16 ranks 8501–9000
- [ ] Q17 ranks 9001–9500
- [ ] Q18 ranks 9501–10000
- [ ] Q19 ranks 10001–10500
- [ ] Q20 ranks 10501–11000
- [ ] Q21 ranks 11001–11500
- [ ] Q22 ranks 11501–12000
- [ ] Q23 ranks 12001–12500
- [ ] Q24 ranks 12501–13000
- [ ] Q25 ranks 13001–13500
- [ ] Q26 ranks 13501–14000
- [ ] Q27 ranks 14001–14500
- [ ] Q28 ranks 14501–15000
- [ ] Q29 ranks 15001–15500
- [ ] Q30 ranks 15501–16000
- [ ] Q31 ranks 16001–16500
- [ ] Q32 ranks 16501–17000
- [ ] Q33 ranks 17001–17500
- [ ] Q34 ranks 17501–18000
- [ ] Q35 ranks 18001–18500
- [ ] Q36 ranks 18501–19000
- [ ] Q37 ranks 19001–19500
- [ ] Q38 ranks 19501–20000
- [ ] Q39 ranks 20001–20500
- [ ] Q40 ranks 20501–21000
- [ ] Q41 ranks 21001–21500
- [ ] Q42 ranks 21501–22000
- [ ] Q43 ranks 22001–22500
- [ ] Q44 ranks 22501–22679

Do not assume you will finish Q44 in one session. The intended behavior is to
finish as many early batches as credits and accuracy allow, then leave the next
unchecked range as the restart point.

## Lane B — high-value semantic review PRs

Interleave one Lane B PR after every three or four Lane A PRs when enough
evidence has accumulated. These are separate PRs, never folded into a range
qualification PR.

- [ ] **B01 — Resolve the top-1,000 ambiguity packet.** Re-review `가지`, `프로`,
  `그리`, and `다운` using dictionary evidence and corpus-context evidence.
  Produce an owner packet. Do not mutate immutable decisions unless the
  existing owner-decision mechanism supports a new append-only resolution.
- [ ] **B02 — Missing-core lemma review.** Consolidate canonical lemmas exposed
  by stems in the top 1,000 (`되다`, `아니다`, `모르다`, `보이다`, `그렇다`,
  `이렇다`, `그러다`, `어떻다`, `따르다`, `들어가다`, `힘들다`, `버리다`,
  `알리다`, `가지다`, `이루다`, `비슷하다`, `느끼다`, `열리다`, `생기다`,
  `고맙다`, `멋지다`). Deduplicate lemmas, verify primary senses and POS, and
  propose coherent authoring groups. This PR is review/selection only.
- [ ] **B03 — Parent-link audit.** Independently sample every `merged`,
  `covered`, and `inflected` override from the completed ranges. Verify the
  parent id is the correct sense, especially polysemous Korean surfaces.
- [ ] **B04 — Accepted-pool taxonomy.** Recompute all accepted lemmas and group
  them into scenario-ready pools without forcing leftovers into incoherent
  lessons. Record waiting pools such as tech, money, civic/news, address terms,
  demonstratives, daily actions, and descriptions.
- [ ] **B05+ — Repeat risk review every 2,000 ranks.** Create a fresh review PR
  for high-risk function words, one-syllable tokens, homographs, loanword
  clippings, proper nouns, counters, and bound morphemes in the latest ranges.

## Lane C — authored draft lesson PRs

Author only after a semantic-review or qualification PR has produced at least
8 genuinely related accepted lemmas. One authored lesson is 8–12 words with a
single communicative scenario. Never repeat Claude's mistake of placing all
accepted leftovers into one miscellaneous lesson.

Each authored PR must:

- contain only draft JSONL rows and a draft pack manifest;
- use existing `lessonGroup` values and explicit annotations;
- cross-check glosses and POS against the curated bank;
- keep examples beginner-parseable and register-appropriate;
- include usage cautions for dangerous learner traps;
- pass `import_batch.mjs --dry-run --pack-manifest`;
- state the exact future audio-string count;
- leave all ids provisional and import count at zero;
- update the expansion ledger honestly.

Priority authoring opportunities, only when their review pool is ready:

- [ ] **C01 — Core change/action verbs**, 8–12 reviewed missing-core lemmas.
- [ ] **C02 — Knowing, feeling, and describing**, 8–12 reviewed lemmas.
- [ ] **C03 — Demonstratives and reference**, using `이런`, `그런`, and later
  related accepted items; wait until the pool reaches 8 rather than padding it.
- [ ] **C04 — Online life and technology**, using `사이트`, `프로그램`, and later
  related accepted items; wait for a coherent pool.
- [ ] **C05 — News, society, and public life**, using `시대`, `후보`, and later
  related accepted items; do not mix in unrelated pronouns or money merely to
  hit lesson size.
- [ ] **C06 — Money and prices**, using `달러` plus later shopping/currency
  candidates; wait for a coherent pool.
- [ ] **C07+ — Continue one scenario lesson per PR** as accepted pools reach
  8–12 words. A draft pack may accumulate multiple coherent lessons over time,
  but every PR remains small and reviewable.

## Lane D — tooling improvements only when directly needed

Do not invent tooling work to avoid semantic work. If a real batch exposes a
repeatable failure, fix it in its own PR with a regression test, then resume the
queue. Useful examples include:

- deterministic owner-packet generation from reports;
- accepted-pool reconciliation and duplicate-POS/gloss checks;
- parent-id/sense validation for merged decisions;
- a machine check that manifest word ids and JSONL rows match exactly;
- append-only resolution records for previously ambiguous decisions, if the
  current ledger lacks a safe mechanism.

Never weaken an audit, never hand-edit generated reports, and never add a
framework/build step.

## Required final handoff when credits run low

Report:

1. every PR URL in merge order;
2. the base branch of every stacked PR;
3. last fully covered rank and next unchecked rank;
4. disposition totals and accepted lemmas per PR;
5. authored draft lesson names and word counts;
6. all verification commands and failures fixed;
7. any unresolved semantic calls requiring owner judgment;
8. confirmation that the worktree is clean and every commit is pushed.

Do not spend the final credits rewriting this document. Spend them completing,
verifying, and pushing the current product batch.
