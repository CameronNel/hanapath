# Sentences Tag Accuracy Batch 003

Scope: `s0401`-`s0600`, reviewed against the Korean text with emphasis on the
handoff's high-risk tags: `location-e`, `location-eseo`, verbal connectives,
`time-expression`, tense/politeness overlap, and honorific `-세요` false
positives.

This pass corrects 41 rows. It does not change `korean`, `english`, `tokens`,
ids, bands, or audio.

## Policy Notes

- Simple past forms such as `샀어요`, `켰어요`, and `끝났어요` use `past-polite`,
  not `present-polite`.
- Honorific present forms such as `쓰세요` are `honorific-si` plus
  `present-polite`, not necessarily `imperative-seyo`.
- Temporal phrases such as `새벽에`, `공휴일에는`, and `강으로 ... 주말에` are
  tagged as `time-expression` without forcing `location-e`.
- Instrument/method `로` remains `direction-euro` in the current closed tag set.
- Progressive `하고 있어요` is not tagged as `and-go`, `with-hago-wa`, or
  `existence-itda` in this pass; it is treated as present-polite context.

## Tag Delta

Added:

- `existence-itda`: `s0428`
- `past-polite`: `s0417`, `s0455`, `s0477`, `s0534`, `s0547`, `s0556`, `s0584`
- `present-polite`: `s0419`, `s0435`, `s0457`, `s0459`, `s0460`, `s0461`,
  `s0463`, `s0465`, `s0469`, `s0478`, `s0491`, `s0514`, `s0529`, `s0532`,
  `s0541`, `s0544`, `s0551`, `s0554`, `s0555`
- `time-expression`: `s0501`, `s0510`, `s0536`

Removed:

- `and-go`: `s0525`
- `because-aseo`: `s0447`
- `existence-itda`: `s0525`
- `imperative-seyo`: `s0514`
- `location-e`: `s0406`, `s0523`, `s0524`, `s0536`
- `location-eseo`: `s0498`
- `past-polite`: `s0419`, `s0435`
- `present-polite`: `s0417`, `s0455`, `s0477`, `s0501`, `s0533`, `s0534`,
  `s0547`, `s0556`, `s0584`
- `subject-i-ga`: `s0493`
- `topic-neun`: `s0524`, `s0527`, `s0548`
- `with-hago-wa`: `s0525`

## Verification

- `node --check sentences_core.js; node --check sw.js`
- `node scripts/audit-sentences-data.mjs --strict`
- `node scripts/audit-words-data.mjs --strict`
- `node scripts/audit-app-shell.mjs`
- `node scripts/audit-alphabet-audio.mjs --strict`
