# Words Phase 2 qualification review: ranks 1001-1500

## Scope

`p2-qualify-r1001-r1500` covers every candidate rank from 1001 through 1500.
The committed config is `scripts/words_expansion/batches/p2-qualify-r1001-r1500.json`,
and the deterministic source report is
`scripts/words_expansion/batches/p2-qualify-r1001-r1500_report.json`.

## Result

| Status | Count |
| --- | ---: |
| covered | 177 |
| rejected | 78 |
| inflected | 4 |
| needs-sense-review | 241 |
| accepted | 0 |
| **Total** | **500** |

No new vocabulary rows or authored lessons are proposed. The 241 unflagged
surfaces remain owner-review items because the queue alone does not establish a
safe canonical lemma, sense, or grammar-vocabulary boundary. This deliberately
avoids inventing meanings or forcing an accepted pool for lesson padding.

## Re-derivation

```powershell
node scripts/words_expansion/qualify_elective_range.mjs --config scripts/words_expansion/batches/p2-qualify-r1001-r1500.json --append
node scripts/words_expansion/build_candidate_queue.mjs --validate
```

The append-only ledger contains 500 new records with `batchId` set to
`p2-qualify-r1001-r1500`; the full review surface list and source hashes are in
the generated report. Parent links for covered rows and canonical lemmas for
inflected rows are preserved from the qualification tool.

## Owner decisions still required

Review the 241 `needs-sense-review` records in the report before any later
authoring or import work. In particular, do not treat apparent stems,
conjugations, particles, endings, proper nouns, or polysemous forms as
standalone vocabulary without dictionary and corpus evidence.
