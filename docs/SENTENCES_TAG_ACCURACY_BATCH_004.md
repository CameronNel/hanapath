# Sentences Tag Accuracy Batch 004

Scope: `s0601`-`s0800`, reviewed against the Korean text with emphasis on the
handoff's high-risk tags: `location-e`, `location-eseo`, verbal connectives,
`time-expression`, tense/politeness overlap, progressives, and formal endings.

This pass corrects 39 rows. It does not change `korean`, `english`, `tokens`,
ids, bands, or audio.

## Policy Notes

- Passive/result past forms such as `지어졌어요` use `past-polite`, not
  `present-polite`.
- `입니다`/`입니까` rows keep `formal-nida`; `입니까?` also keeps
  `question-polite` and `copula-ieyo`.
- Progressive `읽고 있어요`, `준비하고 있어요`, `놀고 있어요`, `알고 있어요`,
  and `살고 있어요` are not tagged as standalone `and-go`/`existence-itda`.
- Temporal or institutional `에` is distinguished by meaning: `화요일에` is a
  time expression, while `교회에/사찰에/음악회에` remain destination/location.
- Korean counter/measure phrases are tagged when present (`세 명`, `일곱 시`).

## Tag Delta

Added:

- `because-aseo`: `s0728`
- `copula-ieyo`: `s0616`, `s0757`
- `counter-phrase`: `s0658`
- `formal-nida`: `s0616`
- `location-e`: `s0788`
- `location-eseo`: `s0770`
- `past-polite`: `s0610`, `s0726`, `s0733`, `s0755`, `s0784`, `s0785`, `s0787`
- `present-polite`: `s0783`
- `time-expression`: `s0646`

Removed:

- `and-go`: `s0623`, `s0705`, `s0712`, `s0734`, `s0745`, `s0758`, `s0764`,
  `s0774`, `s0777`, `s0779`, `s0790`, `s0793`
- `because-aseo`: `s0660`
- `existence-itda`: `s0623`, `s0745`, `s0758`, `s0764`, `s0774`, `s0790`,
  `s0793`
- `location-e`: `s0666`, `s0744`
- `present-polite`: `s0610`, `s0726`, `s0733`, `s0755`, `s0785`, `s0787`
- `subject-i-ga`: `s0610`, `s0765`, `s0775`
- `topic-neun`: `s0790`
- `when-ttae`: `s0738`
- `with-hago-wa`: `s0745`

## Verification

- `node --check sentences_core.js; node --check sw.js`
- `node scripts/audit-sentences-data.mjs --strict`
- `node scripts/audit-words-data.mjs --strict`
- `node scripts/audit-app-shell.mjs`
- `node scripts/audit-alphabet-audio.mjs --strict`
