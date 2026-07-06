# Sentences Tag Accuracy Batch 006

Date: 2026-07-06  
Scope: `s1001`-`s1200`  
Branch: `codex/tag-accuracy-batch-006`

## Policy Notes

- Treated `-고 있어요` progressives as present-polite predicates, not standalone `and-go` or `existence-itda`.
- Kept `and-go` where a separate `-고` action remains visible, such as wearing/holding/carrying plus a second verb.
- Treated `-아서/-어서` as `because-aseo` only when the row reads causally, not for simple sequence or purpose.
- Removed `location-e` from dative/target uses such as gratitude, embarrassment at a question, and benefit to health.
- Treated numeral plus unit/counter forms as `counter-phrase`; bare listed numerals without a counter did not qualify.
- Removed `only-man` from `오만 원짜리`, where `만` is part of the numeric value rather than the "only" particle.

## Tag Deltas

Added:

- `because-aseo`: `s1130`
- `counter-phrase`: `s1111`, `s1126`, `s1156`, `s1197`
- `object-eul-reul`: `s1025`
- `present-polite`: `s1047`, `s1126`
- `time-expression`: `s1156`

Removed:

- `and-go`: `s1004`, `s1065`, `s1073`, `s1085`, `s1089`, `s1094`, `s1095`, `s1105`, `s1125`, `s1126`, `s1131`, `s1135`, `s1145`, `s1151`, `s1153`, `s1159`, `s1162`, `s1176`, `s1180`, `s1193`, `s1199`
- `because-aseo`: `s1007`, `s1023`, `s1036`, `s1079`, `s1090`, `s1175`, `s1176`
- `counter-phrase`: `s1029`
- `direction-euro`: `s1037`
- `existence-itda`: `s1004`, `s1073`, `s1125`, `s1126`, `s1145`, `s1151`, `s1153`, `s1160`, `s1162`, `s1176`, `s1180`
- `location-e`: `s1031`, `s1058`, `s1101`
- `neg-an`: `s1127`, `s1195`
- `only-man`: `s1170`
- `subject-i-ga`: `s1105`
- `topic-neun`: `s1021`
- `when-ttae`: `s1038`, `s1049`, `s1057`, `s1093`, `s1109`, `s1119`, `s1141`
- `with-hago-wa`: `s1021`

## Verification

- `node --check sentences_core.js`
- `node --check sw.js`
- `node scripts/audit-sentences-data.mjs --strict`
- `node scripts/audit-words-data.mjs --strict`
- `node scripts/audit-app-shell.mjs`
- `node scripts/audit-alphabet-audio.mjs --strict`
