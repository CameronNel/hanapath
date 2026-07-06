# Sentences Tag Accuracy Report

Track D follow-up passes re-check explicit `patternTags` against the actual
Korean. Each pass should document the policy used, rows changed, and audit
results so later passes do not have to rediscover the same decision.

## 2026-07-06 counter-phrase policy pass

Policy: keep `counter-phrase` only for a numeral plus a Korean counter,
classifier, or measurable unit. Examples kept include `한 잔`, `두 개`, `다섯 명`,
`여섯 시`, `십 분`, `한 번`, `삼 개월`, `오십 퍼센트`, and `삼 박 사 일`.
Remove it from bare numeral + ordinary noun phrases, even when English would
say "two X", because those do not teach the Korean counter pattern.

Removed `counter-phrase` from 22 rows:

`s1029`, `s1200`, `s1338`, `s1339`, `s1362`, `s1370`, `s1427`, `s1440`,
`s1485`, `s1525`, `s1561`, `s1612`, `s1639`, `s1678`, `s1707`, `s1725`,
`s1922`, `s1937`, `s1955`, `s1967`, `s1998`, `s2003`.

Counter rows before: 83. Counter rows after: 61.

Verification:

- `node --check sentences_core.js; node --check sw.js`
- `node scripts/audit-sentences-data.mjs --strict`
- `node scripts/audit-words-data.mjs --strict`
- `node scripts/audit-app-shell.mjs`
- `node scripts/audit-alphabet-audio.mjs --strict`
