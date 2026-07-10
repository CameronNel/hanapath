# Words Phase 2 qualification: top-of-corpus sweep, ranks 1–344

Status: **owner review only**. This packet imports no Korean content, creates no
curated rows, and does not publish or alter an elective pack.

## Evidence window

- Candidate queue ranks **1–344**: 344 merged source rows, of which 11 were
  already decided in `p2-proposal-r112-r122` / `p2-owner-decisions-r112-r122`
  and were skipped; **333 new decisions** recorded.
- Source hashes are recorded per row in
  `scripts/words_expansion/candidate_decisions.jsonl` under batch id
  `p2-qualify-r1-r344`.
- The reproducible run is `scripts/words_expansion/qualify_elective_range.mjs
  --config scripts/words_expansion/batches/p2-qualify-r1-r344.json`; the
  committed config holds every semantic override with its reason, and the
  generated report is `scripts/words_expansion/batches/p2-qualify-r1-r344_report.json`.

## Disposition summary (re-derivable from the ledger)

| Status | Count | What it means here |
|---|---|---|
| covered | 168 | Surface already curated; linked to its row id |
| rejected | 129 | Particles, endings, single-syllable bound forms, romanization artifacts |
| inflected | 17 | Conjugated surfaces / tokenizer-truncated stems; lemma recorded, no row |
| deferred | 11 | Grammar-only forms (세요, 다고, 위해, 해야, 대한, 으며, 대해, 다면, 인데, 위한, 통해) per the owner's grammar-only precedent |
| accepted | 6 | Standalone dictionary lemmas: **이런, 그런, 가장, 바로, 사이트, 당신** |
| merged | 1 | 근데 → spoken variant of 그런데 (accepted in the next batch) |
| needs-sense-review | 1 | 가지 (counter vs. noun vs. 가지다 stem — dominance unclear) |

## Notable evidence

- **Uncurated core lemmas surfaced by truncated stems:** 되다, 모르다, 보이다,
  그렇다, 이렇다, 그러다, 어떻다, 따르다 are all absent from the curated 2,028.
  The stems themselves stay `inflected` (never rows), but the lemmas are
  recorded in `canonicalLemma` as high-value candidates for a future authoring
  pass.
- **당신** is accepted with an explicit condition: any authored row must carry
  a usage-restriction note (spousal/formal-writing/confrontational registers) —
  it is not a neutral "you".
- No decision invents a lemma from a raw token; every accepted surface is a
  standalone dictionary lemma.

This is not a release pack: it has zero import-ready rows. The six accepted
lemmas feed the conversation-glue authoring packet proposed after the
ranks 454–1000 batch.
