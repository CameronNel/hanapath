# Words Phase 2 qualification: study, work, and social participation

Status: **owner review only**. This packet imports no Korean content, creates no
curated rows, and does not publish or alter an elective pack.

## Evidence window

- Candidate queue ranks **345–453**, `109` merged source rows.
- Source hashes are recorded per row in
  `scripts/words_expansion/candidate_decisions.jsonl` under
  `p2-qualify-r345-r453`.
- The reproducible classification is in
  `scripts/words_expansion/qualify_elective_range.mjs`; the generated report is
  `scripts/words_expansion/elective_qualification_report.json`.

The range is a useful qualification slice because its safe lexical seeds point
toward study/work/social contexts: relationship (`관계`), program (`프로그램`),
place/seat (`자리`). The three are only qualified candidates, not authored vocabulary rows; meanings,
examples, register, controlled vocabulary, lesson grouping, and owner approval
remain required.

## Disposition policy

- Existing `is-curated` surfaces are `covered` and link to their existing row.
- Inflected/conjugated forms are `inflected` and do not become rows.
- Particle/ending or ambiguous-short forms are `rejected` for this lexical
  packet; grammar teaching belongs in grammar surfaces, not elective word rows.
- The three listed lexical seeds are `accepted` for future author review.
- Every other unflagged token is `needs-sense-review`; no lemma is invented from
  a raw token alone.

This is not yet a release pack: it has zero import-ready rows and does not meet
the 6–12-unit publication boundary. A later authoring pass may use the five
seeds only after independent evidence and owner approval, then assemble a
coherent 8–12-word lesson with controlled examples.
