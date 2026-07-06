# Sentences Tag Accuracy Batch 001

Scope: `s0001`-`s0200`, reviewed against the Korean text with emphasis on the
handoff's high-risk tags: `location-e`, `location-eseo`, verbal connectives,
`time-expression`, and tense/politeness overlap.

This pass corrects 28 rows. It does not change `korean`, `english`, `tokens`,
ids, bands, or audio.

## Policy Notes

- `present-polite` is removed from simple past-polite forms such as `먹었어요`
  and `돌았어요`; the past ending already carries the polite `요`.
- Temporal `에` phrases such as `점심에`, `저녁에`, and `아침에` are
  `time-expression`, not `location-e`.
- Meal nouns marked as objects (`아침을`, `저녁을`) are not tagged as
  `time-expression`.
- Progressive `-고 있어요` is not tagged as the clause linker `and-go`.
- `counter-phrase` is added when a numeral combines with a measurable unit
  (`삼십 분`, `한 시간`).

## Tag Delta

Added:

- `counter-phrase`: `s0054`
- `present-polite`: `s0133`, `s0134`, `s0135`, `s0139`, `s0140`, `s0144`
- `time-expression`: `s0054`, `s0103`

Removed:

- `and-go`: `s0057`, `s0082`, `s0145`, `s0187`
- `because-aseo`: `s0085`
- `future-geoyeyo`: `s0019`, `s0021`
- `location-e`: `s0107`, `s0108`, `s0176`
- `present-polite`: `s0070`, `s0088`, `s0105`, `s0106`, `s0109`, `s0126`
- `question-polite`: `s0024`
- `subject-i-ga`: `s0131`
- `time-expression`: `s0105`, `s0106`, `s0109`, `s0175`
- `topic-neun`: `s0085`, `s0110`

## Verification

- `node --check sentences_core.js; node --check sw.js`
- `node scripts/audit-sentences-data.mjs --strict`
- `node scripts/audit-words-data.mjs --strict`
- `node scripts/audit-app-shell.mjs`
- `node scripts/audit-alphabet-audio.mjs --strict`
