# Sentences Tag Accuracy Batch 002

Scope: `s0201`-`s0400`, reviewed against the Korean text with emphasis on the
handoff's high-risk tags: `location-e`, `location-eseo`, verbal connectives,
`time-expression`, counter phrases, and honorific `-세요` false positives.

This pass corrects 38 rows. It does not change `korean`, `english`, `tokens`,
ids, bands, or audio.

## Policy Notes

- Honorific present forms like `오세요`, `계세요`, and `드세요` are
  `honorific-si` plus `present-polite`, not `imperative-seyo`.
- Temporal month/time `에` phrases (`삼 월에`, `육 월에`, `여섯 시에`) are
  `time-expression`, not `location-e`.
- `만 원` is the Korean number/unit phrase "10,000 won"; it is not the particle
  `only-man`.
- Numeral + measurable unit phrases such as `사 년`, `이 층`, `천 원`, `스물 살`,
  and `오 분` take `counter-phrase`.
- `먹고 싶어요` is tagged with `want-go-sipda`; its `-고` is not a standalone
  `and-go` connector for this curriculum tag.

## Tag Delta

Added:

- `can-su-itda`: `s0398`
- `counter-phrase`: `s0315`, `s0317`, `s0318`, `s0320`, `s0322`, `s0325`,
  `s0326`, `s0337`, `s0338`, `s0340`, `s0344`, `s0345`
- `existence-itda`: `s0297`
- `formal-nida`: `s0344`
- `past-polite`: `s0288`, `s0289`, `s0373`
- `present-polite`: `s0281`, `s0296`, `s0297`, `s0298`, `s0299`, `s0300`,
  `s0301`, `s0320`, `s0393`
- `propositive-eyo`: `s0279`
- `subject-i-ga`: `s0296`, `s0297`, `s0298`, `s0299`

Removed:

- `and-go`: `s0353`
- `imperative-seyo`: `s0296`, `s0297`, `s0298`, `s0299`, `s0300`
- `location-e`: `s0313`, `s0316`, `s0319`, `s0332`, `s0335`, `s0338`, `s0347`
- `neg-an`: `s0282`
- `object-eul-reul`: `s0293`
- `only-man`: `s0318`, `s0326`
- `present-polite`: `s0288`, `s0289`, `s0373`
- `subject-i-ga`: `s0264`, `s0289`, `s0345`
- `topic-neun`: `s0292`, `s0294`
- `when-ttae`: `s0290`

## Verification

- `node --check sentences_core.js; node --check sw.js`
- `node scripts/audit-sentences-data.mjs --strict`
- `node scripts/audit-words-data.mjs --strict`
- `node scripts/audit-app-shell.mjs`
- `node scripts/audit-alphabet-audio.mjs --strict`
