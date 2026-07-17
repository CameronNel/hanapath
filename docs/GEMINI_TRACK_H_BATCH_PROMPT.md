# Gemini Track H batch prompt — Sentences authored expansion (high-volume)

> **You are Gemini 3.5 Flash.** You're fast and you like volume. This is
> perfect for you: author **large batches** of practical Korean sentences into
> the HanaPath sentence bank, ~160 rows at a time (four themed packs of ~40),
> using a **self-validating script** that catches your mistakes before they
> land. Opus built batches 1–13 (1,120 sentences, s2061–s3180) exactly this
> way; you continue from s3181.

## ⚠️ Before you touch anything: PULL FIRST

The bank changes every batch. If you author against a stale copy you'll
collide with existing rows. **Always start a batch with:**

```bash
git fetch origin main
git checkout -B <your-branch> origin/main
```

Then re-derive the true next id from the data (never hard-code it — the
template below does `maxNum + 1` automatically):

```bash
node -e 'const vm=require("vm"),fs=require("fs");const c={window:{}};vm.createContext(c);vm.runInContext(fs.readFileSync("sentences_core.js","utf8"),c);const s=c.window.HANAPATH_SENTENCES;console.log("rows:",s.length,"next id: s"+(Math.max(...s.map(r=>+String(r.id).replace(/\D/g,"")))+1));'
```

## Read first (skim, don't memorize)

- `CLAUDE.md` — repo rules, cache-bump law.
- `docs/OPUS_TRACK_H_BATCH_PROMPT.md` — the original rules (schema, tags,
  fast-immersion method, owner's "no K-pop topic content" clarification).
- `.agents/AGENTS.md` — audio pipeline.
- **This doc is the operational recipe.** Follow it literally.

## The one rule that matters most

**The whole point of the batch script is that it validates itself.** It refuses
to write anything if a row is bad: duplicate Korean, invalid pattern tag, a
`focusWordId` that isn't a real curated word, a bad band, or missing terminal
punctuation. When it prints errors, **fix those rows and re-run** — do not try
to bypass it. When it prints `Appended N rows`, you're good.

## Schema of one row (what you fill in)

Each row is a JS array: `[korean, english, band, tags, focusIds, register, grammarTip, acceptAlso]`

- **korean** — original sentence, ends in `.` or `?` or `!`. 해요체 (polite
  informal) by default. **Practical, universal subject matter** — everyday
  life, NOT K-pop topics (owner's rule).
- **english** — natural translation.
- **band** — difficulty 1–5. Rough guide: 1 = ≤3 words very common; 2 = short
  everyday; 3 = one grammar point + normal vocab; 4 = compound/two clauses;
  5 = long/nuanced. **Aim for a spread; push some band 4–5** (the bank is
  light on 5).
- **tags** — array from the **closed 37-tag list** (below). At least one.
  Tag what's actually in the sentence.
- **focusIds** — array of **real** `words_curated_core.js` ids that **appear in
  the sentence** and match the right sense. This is where mistakes happen —
  see gotchas.
- **register** — usually `"polite"`. Use `"formal"` for 합니다-form,
  `"everyday"` for casual/plain, `"honorific"` when 시/께서/드시다 appear.
- **grammarTip** — one sentence teaching the key pattern (e.g. "-고 싶어요 =
  want to; 사다 → 사고 싶어요"). Required, never empty.
- **acceptAlso** — array of natural variants (contractions like 저는→전), or
  `[]`. Must not repeat the korean.

## The closed pattern-tag list (only these 37 are valid)

```
topic-neun subject-i-ga object-eul-reul location-e location-eseo
direction-euro possessive-ui with-hago-wa only-man also-do from-buteo
until-kkaji present-polite past-polite future-geoyeyo formal-nida
copula-ieyo copula-negative-anieyo question-polite imperative-seyo
propositive-eyo neg-an neg-mot neg-ji-anta and-go but-jiman because-aseo
if-myeon when-ttae want-go-sipda can-su-itda must-ya-dwaeda honorific-si
counter-phrase time-expression comparison-boda existence-itda
```

Note: `direction-euro` also covers instrumental 으로 ("by card / by bus"). Many
patterns have **no tag** (e.g. -(으)러, -(으)면서, -기 전에); that's fine — tag
the other surface features present. `honorific-si` covers 시/께서/드시다/주무시다.

## Gotchas that will bite you (Opus hit all of these)

1. **focusId must be in the sentence AND the right sense.** These curated ids
   are homonym traps — do **not** use them for the wrong meaning:
   - `w_m6_3002_jeongi_biography` = 전기 *biography*, NOT electricity.
   - `w_m6_3003_isa_director` = 이사 *board director*, NOT moving house.
   - `w0301_i_this` = 이 *this*, NOT tooth.
   - `w_m5_117_sae` = 새 *bird*, NOT "new".
   If you can't find a good in-sentence focus word, pick a different noun/verb
   that IS in the sentence. Look ids up like this:
   ```bash
   node -e 'const vm=require("vm"),fs=require("fs");const c={window:{}};vm.createContext(c);vm.runInContext(fs.readFileSync("words_curated_core.js","utf8"),c);const m=new Map();for(const w of c.window.HANAPATH_CURATED_WORDS)if(!m.has(w.korean))m.set(w.korean,w.id);for(const k of ["물","친구","시간"])console.log(k,m.get(k));'
   ```
2. **No duplicate Korean.** The script checks the whole bank AND within your
   batch. If it flags a dup, reword that row (make it more specific).
3. **grammar units are special** — you almost never need them. For ordinary
   thematic sentences, just use a real content word as focus; the row gates to
   that word's unit automatically. (Details in the Opus doc §"gating".)
4. **Never edit or renumber existing rows.** Additive only. Ids are frozen.

## The batch script template — COPY THIS, fill `rows`, run it

Save as `scratch_batchN.mjs` at the repo root. Replace the `rows` array with
your ~160 rows (four `// PACK` sections of ~40). Everything below the rows is
the validator — **do not change it.**

```js
import { readFileSync, writeFileSync } from "node:fs";
import vm from "node:vm";
const P = "polite informal";
const EXP = { band: "explicit", patternTags: "explicit" };

// [korean, english, band, tags, focusIds, register, grammarTip, acceptAlso]
const rows = [
  // ===== PACK A — <theme> (40) =====
  ["여기 물 좀 주세요.", "Some water here, please.", 1, ["imperative-seyo"], ["w0501_mul"], "polite", "좀 softens 주세요; 물 = water.", []],
  // ... 40 rows ...
  // ===== PACK B / C / D ... =====
];

// ---------- validator (do not edit) ----------
const VALID_TAGS = new Set(["topic-neun","subject-i-ga","object-eul-reul","location-e","location-eseo","direction-euro","possessive-ui","with-hago-wa","only-man","also-do","from-buteo","until-kkaji","present-polite","past-polite","future-geoyeyo","formal-nida","copula-ieyo","copula-negative-anieyo","question-polite","imperative-seyo","propositive-eyo","neg-an","neg-mot","neg-ji-anta","and-go","but-jiman","because-aseo","if-myeon","when-ttae","want-go-sipda","can-su-itda","must-ya-dwaeda","honorific-si","counter-phrase","time-expression","comparison-boda","existence-itda"]);
const ctx = { window: {} }; vm.createContext(ctx); vm.runInContext(readFileSync("sentences_core.js","utf8"), ctx);
const existing = ctx.window.HANAPATH_SENTENCES;
const wctx = { window: {} }; vm.createContext(wctx); vm.runInContext(readFileSync("words_curated_core.js","utf8"), wctx);
const wordIds = new Set(wctx.window.HANAPATH_CURATED_WORDS.map((w) => w.id));
const norm = (s) => String(s).normalize("NFC").replace(/[\s.,!?;:"'`~(){}\[\]<>\/·-]+/g, "");
const existingKr = new Set(existing.map((r) => norm(r.korean)));
const maxNum = Math.max(...existing.map((r) => Number(String(r.id).replace(/\D/g, "")) || 0));
const problems = [], seen = new Set();
rows.forEach(([kr, en, band, tags, focus, reg, tip, alt], i) => {
  if (!/[.?!]$/.test(kr)) problems.push(`${i}: no terminal punctuation: ${kr}`);
  const nk = norm(kr);
  if (existingKr.has(nk)) problems.push(`${i}: DUPLICATE of existing bank: ${kr}`);
  if (seen.has(nk)) problems.push(`${i}: duplicate within batch: ${kr}`); seen.add(nk);
  if (![1,2,3,4,5].includes(band)) problems.push(`${i}: band ${band} not 1-5`);
  for (const t of tags) if (!VALID_TAGS.has(t)) problems.push(`${i}: invalid tag ${t}`);
  if (new Set(tags).size !== tags.length) problems.push(`${i}: duplicate tag in row`);
  if (!Array.isArray(focus) || !focus.length) problems.push(`${i}: no focus ids`);
  for (const f of focus) if (!wordIds.has(f)) problems.push(`${i}: focus not a real word id: ${f}`);
  for (const a of (alt||[])) if (norm(a) === nk) problems.push(`${i}: acceptAlso repeats korean`);
  if (!tip || !String(tip).trim()) problems.push(`${i}: empty grammarTip`);
});
if (problems.length) { console.error("FIX THESE:\n" + problems.join("\n")); process.exit(1); }
const start = maxNum + 1;
const objs = rows.map(([kr, en, band, tags, focus, reg, tip, alt], i) => ({
  id: `s${start+i}`, korean: kr, english: en, voiceText: kr,
  tokens: kr.replace(/[.?!]$/,"").split(" "), band, patternTags: tags,
  focusWordIds: focus, sourceWordIds: focus, speechLevel: P, register: reg,
  grammarTip: tip, acceptAlso: alt || [], annotationSource: EXP, source: "authored",
}));
const chunk = objs.map((o) => JSON.stringify(o,null,2).split("\n").map((l)=>"  "+l).join("\n")).join(",\n");
const path = "sentences_core.js", src = readFileSync(path,"utf8"), anchor = /\n\];\n\}\)\(\);\n?$/;
if (!anchor.test(src)) { console.error("anchor not found at end of sentences_core.js"); process.exit(1); }
writeFileSync(path, src.replace(anchor, `,\n${chunk}\n];\n})();\n`));
console.log(`Appended ${objs.length} rows: ${objs[0].id}–${objs[objs.length-1].id}`);
```

## The pipeline (run in order, every batch)

```bash
# 1. Author + append (validator gates it)
node scratch_batchN.mjs
node --check sentences_core.js

# 2. Confirm ONLY audio errors remain (rows have no audio yet)
node scripts/audit-sentences-data.mjs 2>&1 | grep ERROR | grep -v "no playable local audio"
#    ^ must print NOTHING. Any other error = fix it.

# 3. Regenerate curriculum deterministically + confirm gating is clean
node scripts/generate_sentences_curriculum_v2.mjs
node scripts/audit-sentences-foundation.mjs        # want: Errors 0, Warnings 0

# 4. Prove NO lesson ids were removed (must say removed: none)
node -e 'const vm=require("vm"),fs=require("fs"),cp=require("child_process");const L=s=>{const c={window:{}};vm.createContext(c);vm.runInContext(s,c);return c.window.HANAPATH_SENTENCE_LESSONS;};const a=new Set(L(fs.readFileSync("sentences_lesson_plan.js","utf8")).map(l=>l.id));const b=new Set(L(cp.execSync("git show HEAD:sentences_lesson_plan.js",{maxBuffer:1e8}).toString()).map(l=>l.id));console.log("removed:",[...b].filter(x=>!a.has(x)).join(",")||"none","| added:",[...a].filter(x=>!b.has(x)).length);'

# 5. AUDIO — see the audio section below
python generate_assets.py --backend mimic3

# 6. Cache bumps — bump ALL of these together (v### and the ?v= dates)
#    - sw.js: CACHE_NAME "hanapath-shell-vNNN"  (increment NNN)
#    - index.html AND sw.js: sentences_core.js / sentences_lesson_plan.js / audio_map.js ?v=YYYYMMDDx
node scripts/audit-app-shell.mjs                   # want: passed

# 7. Full green gate
for a in audit-sentences-data.mjs audit-audio-coverage.mjs audit-words-data.mjs audit-alphabet-audio.mjs; do node scripts/$a --strict 2>&1|tail -1; done
git diff --check

# 8. Commit, push to your branch, open a DRAFT PR, wait for CI green, squash-merge.
```

## Audio (the one environment-dependent step)

Sentences **cannot merge without audio** — the strict audit fails on any row
whose `voiceText` has no clip. Two ways to make it:

- **Offline KSS (preferred, no external API):** `python generate_assets.py
  --backend mimic3`. Needs, one-time: `pip install numpy onnxruntime
  phonemes2ids gruut-ipa espeak-phonemizer imageio-ffmpeg` (use
  `pip install --no-build-isolation` + upgrade setuptools if wheels fail),
  the system `espeak-ng` package, and the pinned KSS voice model at
  `scripts/intro/.voices/ko_KO/kss_low/` (generator verifies its SHA-256).
  The script only synthesizes the new phrases and rewrites `audio_map.js`
  itself — **never hand-edit `audio_map.js`.**
- **If you cannot run audio at all:** ship the PR as a **draft titled
  "audio pending"**, clearly say the owner must run `python
  generate_assets.py`, and stop. The sentences audit will be red on exactly
  the missing-audio errors — that is the expected pending state; never weaken
  an audit to go green.

There is a **known fix already merged** so the pipeline works: the manifest
builder flushes stdout before exit. If `generate_assets.py` ever prints
"invalid JSON … manifest builder", you're on an old checkout — **pull main.**

## What's already covered — pick NEW themes

Done (batches 1–13): the pattern×band coverage matrix + 23 packs — dining,
directions/transport, shopping, doctor/pharmacy, appointments/phone,
airport/travel, housing, banking/post office, work/school, weather/small-talk,
hobbies/friends, cooking/kitchen, sports/exercise, technology/phone,
emotions/relationships, nature/animals, describing people, time/routines,
opinions/discussing, requests/favors, advice/warnings, past-experiences,
reactions/exclamations.

**Fresh themes still open** (pick 4 per batch): family & relatives · dating &
romance · kids & parenting · pets & the vet · hair salon / barber · chores &
cleaning · holidays & celebrations (generic 설날/추석, birthdays) · watching
sports · cars & driving · gardening & plants · music & instruments · art &
museums · volunteering & community · recycling & environment · the gym &
fitness classes · job hunting & résumés · learning languages · daily hygiene
& self-care · complaints & problems (returns, noise, repairs) · giving
directions to your home · describing a room/house in detail · money & budgeting
· making plans with friends.

Keep it **practical and universal**. No idol/fan-life topic content.

## Hard stops — leave for a human

- A pattern the 37-tag list can't express → just omit the tag, don't invent one.
- Anything touching the **Words** section, `app.js` logic, or the generator's
  internals.
- Any temptation to weaken an audit, hand-edit `audio_map.js`, or edit existing
  rows.

Ship small, ship green, ship often. Go.
