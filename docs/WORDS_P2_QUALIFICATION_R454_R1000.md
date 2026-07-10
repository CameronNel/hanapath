# Words Phase 2 qualification: high-frequency sweep, ranks 454–1000

Status: **owner review only**. This packet imports no Korean content, creates no
curated rows, and does not publish or alter an elective pack.

Together with `p2-qualify-r1-r344` and the earlier r112–r122 / r345–r453
batches, this completes disposition coverage of **the entire top 1,000** of the
merged candidate queue: 1,000 immutable ledger records, all re-derivable.

## Evidence window

- Candidate queue ranks **454–1000**: 547 merged source rows, 0 previously
  decided, **547 new decisions** recorded under batch id `p2-qualify-r454-r1000`.
- Committed config with every semantic override and reason:
  `scripts/words_expansion/batches/p2-qualify-r454-r1000.json`; generated
  report alongside it.

## Disposition summary (re-derivable from the ledger)

| Status | Count | What it means here |
|---|---|---|
| covered | 357 | Surface already curated; linked to its row id |
| rejected | 113 | Particles, bound suffixes (스럽, 고등), artifacts |
| inflected | 31 | Conjugations / truncated stems; lemma recorded, no row |
| deferred | 24 | Grammar-only endings and constructions (잖아, 군요, 려면, ~에 의해, ~로 인해, …) |
| accepted | 14 | **여러분, 시대, 역시, 거의, 그래도, 그런데, 그래, 후보, 달러, 뭔가, 달리, 따라서, 한편, 혹은** |
| merged | 5 | Contractions/bases onto curated rows: 누가→누구, 이게/이건→이것, 그게→그것, 공부→공부하다 |
| needs-sense-review | 3 | 프로 (pro/program/percent), 그리 (adverb vs. fragment), 다운 (-다운 vs. loanword) |

## Notable evidence

- **More uncurated core lemmas surfaced via stems:** 아니다, 들어가다, 힘들다,
  버리다, 알리다, 가지다, 이루다, 비슷하다, 느끼다, 열리다, 생기다, 고맙다,
  멋지다 are absent from the curated 2,028 and are recorded as `canonicalLemma`
  on their stem decisions — a ready-made shortlist for a "missing core verbs &
  adjectives" authoring pass.
- 재밌 is merged onto curated 재미있다 (standard contraction), 공부 onto
  공부하다 (noun base) — no duplicate glosses invented.
- 그래 is accepted with a mandatory intimate-register note; 달리's authored
  examples must cover the ~와/과 달리 pattern.

## Cumulative accepted pool (23 lemmas, ranks 1–1000)

관계, 프로그램, 자리 (r345–r453) · 이런, 그런, 가장, 바로, 사이트, 당신
(r1–r344) · 여러분, 시대, 역시, 거의, 그래도, 그런데, 그래, 후보, 달러, 뭔가,
달리, 따라서, 한편, 혹은 (this batch).

These feed the first elective-pack authoring packet (next PR in the stack);
zero rows are import-ready until the owner approves that packet and runs the
audio/release sequence.
