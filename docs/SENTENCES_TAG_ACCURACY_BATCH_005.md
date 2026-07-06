# Sentences Tag Accuracy Batch 005

Date: 2026-07-06  
Scope: `s0801`-`s1000`  
Branch: `codex/tag-accuracy-batch-005`

## Policy Notes

- Treated `-고 있어요` progressives as present-polite predicates, not standalone `and-go` or `existence-itda` uses.
- Kept `existence-itda` where `있다/없다` carries lexical existence or ability meaning, such as `수 없어요` and `있을 거예요`.
- Treated temporal `에` phrases like `작년에`, `자기 전에`, and `오후에` as `time-expression`, not `location-e`.
- Treated target/dative `에` phrases such as `계획에 찬성해요` and `질문에 맞았어요` as neither `location-e` nor a new tag.
- Kept `counter-phrase` for numeral plus counter/unit phrases such as `오백 원`, `삼십 도`, `삼 년`, `이십이 년`, and `팔십 점`.
- Removed `and-go` from `-고 싶어요` want constructions and from non-`-고` purpose/while forms such as `-려고` and `-며`.

## Tag Deltas

Added:

- `because-aseo`: `s0876`
- `can-su-itda`: `s0900`
- `counter-phrase`: `s0812`, `s0838`, `s0932`, `s0945`, `s0992`
- `existence-itda`: `s0989`
- `honorific-si`: `s0880`
- `past-polite`: `s0801`, `s0806`, `s0811`, `s0813`, `s0876`, `s0881`, `s0902`
- `present-polite`: `s0850`, `s0914`, `s0986`
- `propositive-eyo`: `s0977`
- `time-expression`: `s0861`, `s0864`, `s0867`, `s0887`
- `topic-neun`: `s0828`

Removed:

- `and-go`: `s0803`, `s0810`, `s0815`, `s0817`, `s0818`, `s0830`, `s0831`, `s0892`, `s0894`, `s0904`, `s0905`, `s0913`, `s0920`, `s0922`, `s0961`, `s0981`, `s0985`, `s0986`, `s0997`
- `because-aseo`: `s0807`, `s0905`
- `direction-euro`: `s0917`, `s0929`
- `existence-itda`: `s0803`, `s0817`, `s0818`, `s0891`, `s0892`, `s0894`, `s0904`, `s0913`, `s0920`, `s0922`, `s0981`
- `location-e`: `s0845`, `s0864`, `s0867`, `s0885`, `s0903`, `s0909`, `s0913`, `s0923`, `s0937`, `s0939`, `s0956`, `s0957`, `s1000`
- `neg-an`: `s0897`, `s0940`
- `neg-ji-anta`: `s0802`
- `object-eul-reul`: `s0968`
- `present-polite`: `s0801`, `s0806`, `s0811`, `s0813`, `s0876`, `s0881`, `s0902`, `s0917`
- `subject-i-ga`: `s0828`, `s0830`, `s0874`, `s0900`
- `time-expression`: `s0835`
- `topic-neun`: `s0830`, `s0856`, `s0880`
- `with-hago-wa`: `s0892`, `s0924`

## Verification

- `node --check sentences_core.js`
- `node --check sw.js`
- `node scripts/audit-sentences-data.mjs --strict`
- `node scripts/audit-words-data.mjs --strict`
- `node scripts/audit-app-shell.mjs`
- `node scripts/audit-alphabet-audio.mjs --strict`
