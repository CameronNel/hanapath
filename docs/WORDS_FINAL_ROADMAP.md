# Words Section — Final Roadmap (execution playbook)

> **Who this is for:** a coding agent (including a small/cheap model) executing
> the remaining Words-section work in small, audit-backed PRs.
> **What owns what:** `docs/VOCABULARY_TEACHING_SPEC.md` §9 stays the source of
> truth for *what* remains; this file is the batch-by-batch *execution queue* —
> tick a checkbox, do exactly that PR, nothing else. If this file and the audit
> output ever disagree, trust the audit and fix this file in the same PR.
>
> Every number below was **re-derived from the data on 2026-07-04** (commands in
> §0.1), not copied from a scorecard. Re-derive before trusting: the scorecard
> has been wrong three times (PRs #50, #51, #54).

---

## 0. Verified status snapshot (2026-07-04)

The Words section is **final** (§1 definition of done: all boxes ticked as
of 2026-07-04). All engines, screens, and content systems are shipped, the
app smoke-tests clean, every track (A–E) is closed, and the real gated
progression is live (`TEST_UNLOCK_ALL_STAGES` is `false`). The only open
follow-up is one `python generate_assets.py` run for two pending sentences
(§5, tracked by the audit's audio-coverage allowlist).

| Fact | Verified value |
|---|---|
| Curated senses | **2,028** rows, every one referenced by a lesson (audit: 0 errors, 0 warnings) |
| Lessons | **298** across stages W0–W19 |
| Genuinely multi-sense lemmas | **105** lemmas with 2+ sense rows (215 rows carry a `senseKey`, all across those 105 lemmas) |
| Leftover singleton `senseKey`s | **0** (Track C closed 2026-07-04) |
| Curation queue | **0** rows have ≥1 `inferred` axis — register 0, speechLevel 0, morphTag 0, originType 0 |
| `hanja` | explicit on only 2 rows; 2,026 absent (owner-gated, §Track E) |
| Honorific axis | `honorificRole` on 26 rows (9 subject / 14 listener / 3 humble) + 10 bidirectional `contrastWith` pairs |
| 하다-verbs | 0 `hybrid` (root-origin rule, §7 E3): 35 Sino-Korean, 19 native, 2 loanword |
| Progression | `TEST_UNLOCK_ALL_STAGES` = `false` — real gated progression verified cold |
| Audits | `audit-words-data --strict` (now incl. audio-map coverage), `audit-alphabet-audio --strict`, `audit-app-shell` all pass |

> **A fourth way the scoreboard lied (2026-07-04):** a bad integration merge
> (`b385e77`) silently dropped the already-merged Track B2 content (PR #67)
> and reverted 17 curated values from the A7–A9 batches, then a bulk
> "finalize" commit pinned the reverted values as `explicit` — so the strict
> audit stayed green on wrong data. Both were restored the same day. Lesson:
> after any merge that touched `words_curated_core.js`, diff the merged
> branch tips against `main` at the **row/field level** (not just `git log
> --oneline`) before trusting the result.

### 0.1 How to re-derive (run these, don't trust the table)

```bash
node scripts/audit-words-data.mjs --strict     # read the "Annotation sources" line
```

```bash
# Multi-sense + singleton senseKey counts
node -e '
global.window={}; eval(require("fs").readFileSync("words_curated_core.js","utf8"));
const w=window.HANAPATH_CURATED_WORDS, by={};
for(const x of w.filter(r=>r.senseKey))(by[x.lemma||x.korean]||=[]).push(x);
const multi=Object.entries(by).filter(([,v])=>v.length>1);
console.log("multi-sense lemmas:",multi.length,"| singleton senseKeys:",Object.keys(by).length-multi.length);
console.log("rows with any inferred axis:",w.filter(r=>["register","speechLevel","morphTag","originType"].some(a=>r.annotationSource[a]==="inferred")).length);'
```

---

## 1. Definition of DONE for the whole Words section

The section is **final** when every box below is ticked. Tracks A–C are
mini-model-friendly. Track D needs a design decision first. Track E is
owner-only — **never attempt E items autonomously.**

- [x] **Track A** — Curation burn-down: 0 rows with an `inferred` annotation axis
- [x] **Track B** — M2 sense split: candidate list in §4 fully worked (each lemma either split or explicitly declined with a reason written into §4)
- [x] **Track C** — 18 singleton `senseKey`s resolved (real second sense authored, or leftover key removed)
- [x] **Track D** — Honorific axis encoded (`honorificRole` + `contrastWith` pairs, §6)
- [x] **Track E** — Owner decisions recorded (§7: stub accepted, hanja stays absent, root-origin rule applied)
- [x] **Final gate** — `TEST_UNLOCK_ALL_STAGES` set back to `false`; scripted cold-learner test of the real gated progression passed; caches bumped; all audits green (2026-07-04)

---

## 2. Rules for every PR (the runbook — do not deviate)

1. Branch off `main`. **One checkbox from this file per PR.** Small and single-purpose.
2. Edit only the files the track names. **Never** touch the alphabet section, `audio_map.js` (generated), or unrelated `app.js` code.
3. Data changes are **additive and backward-compatible**: never remove or rename an existing row `id`; never delete a row except where Track C says so.
4. Verify, in order:
   ```bash
   node --check words_curated_core.js        # any JS you touched
   node scripts/audit-words-data.mjs --strict
   node scripts/audit-alphabet-audio.mjs --strict
   node scripts/audit-app-shell.mjs
   ```
5. **Cache bump** (required whenever `words_curated_core.js`, `words_lesson_plan.js`, `app.js`, or `styles.css` changed): bump `CACHE_NAME` in `sw.js` **and** the matching `?v=...` query strings in **both** `index.html` and `sw.js`. `audit-app-shell.mjs` verifies the wiring.
6. **Audio**: only Track B adds Korean text. New `exampleKo` sentences need `python generate_assets.py` (see `.agents/AGENTS.md`). If the audio pipeline can't run in your environment, say so explicitly in the PR body so the owner regenerates — do not skip silently and do not hand-edit `audio_map.js`.
7. Open a **draft PR** with: what changed, the audit "Annotation sources" line before/after (Track A), and how you verified.
8. In the same PR, tick the checkbox here and update spec §8/§9/§11 **only if a milestone actually moved** — claim only numbers you re-derived.

**Never-do list** (each item here has caused a real regression before):
- No frameworks, bundlers, build steps, `package.json`, or new dependencies.
- No `senseKey` without a **genuinely distinct meaning** — the audit hard-fails duplicated senseKeys but cannot judge semantics; PR #54 removed 74 fake-polysemy rows added to dodge the duplicate audit. Read the meanings.
- Don't re-add 안다 or 물다 as polysemes (reviewed and declined — see spec §9 item 1).
- Don't add `hanja` values (Track E: owner-gated; a wrong hanja is worse than none).
- Don't change `meaning`/`exampleKo` of existing rows in Track A (that's not curation, and it triggers audio work).

---

## 3. Track A — Curation burn-down (done)

**What it is.** The curation burn-down is complete; every row now has explicit values on all axes and the queue is empty.

**List the rows for a batch** (replace the group name):

```bash
node -e '
global.window={}; eval(require("fs").readFileSync("words_curated_core.js","utf8"));
for(const w of window.HANAPATH_CURATED_WORDS){
  if(w.lessonGroup!=="food-drink")continue;
  const inf=["register","speechLevel","morphTag","originType"].filter(a=>w.annotationSource[a]==="inferred");
  if(inf.length)console.log(w.id,"|",w.korean,"|",w.pos,"|",w.meaningShort,"| pin:",inf.join(","),"| current:",inf.map(a=>w[a]).join(","));
}'
```

### 3.1 Decision guide per axis (valid enum values are exact — audit-enforced)

**`register`** — one of `everyday | polite | formal | honorific | written-formal`.
Register belongs to the **lexeme, not its example sentence** (the #50 bug).
Plain nouns/verbs/adjectives are `everyday` even when their example is polite.
Use non-everyday only when the word itself carries it: honorific vocabulary
(말씀, 드리다, 뵙다, 계시다, 잡수시다, -님 forms) → `honorific`; formal set
phrases (감사합니다, 죄송합니다, -습니다-bound phrases) → `formal`; 저/저희-type
humble-polite alternatives → `polite`; bookish/written-only items → `written-formal`.

**`speechLevel`** — one of `plain | polite informal | polite formal`.
Property of an **ending or fixed phrase**, not a dictionary lexeme. Citation
forms (읽다, 물, 크다) → `plain`. Phrases ending in -요 → `polite informal`.
Phrases ending in -습니다/-ㅂ니다 → `polite formal`.

**`originType`** — one of `native | Sino-Korean | loanword | hybrid`.
This is the axis where inference is weakest (it defaults to `native`), so
**expect real corrections here** (~266 rows). Sino-Korean: words built from
Chinese roots — most 2-syllable abstract/institutional nouns (시간, 운동, 여행,
가족), numbers 일/이/삼…, anything you could write in hanja. Loanword: modern
borrowings (버스, 카페, 컴퓨터). Native: 한글 core stock (물, 손, 가다, 예쁘다).
Hybrid: mixed compounds. For X하다 verbs the existing explicit data is
inconsistent (공부하다=`Sino-Korean`, 전화하다=`hybrid`) — until the owner rules
(Track E), pin new rows to **the origin of X and ignore 하다** (운동하다 →
`Sino-Korean`, 일하다 → `native`), and don't touch rows already explicit.
If genuinely unsure about a word, **skip it and list it in the PR body** rather
than guessing.

**`morphTag`** — Sejong tag; valid values:
`NNG NNB XR NNP NP NR VV VX VCP VCN VA MAG MAJ MM JKS JKC JKG JKO JKB JKV JKQ JX JC EP EF EC ETN ETM XPN XSN XSA XSV IC`.
The inferred tag comes from POS (noun→NNG, pronoun→NP, numeral→NR, counter→NNB,
verb→VV, adjective→VA, adverb→MAG, determiner→MM, interjection/phrase→IC,
endings→EF/EC, particles→JKS/JKO/JKG/JC/JKV/JKQ/JKC/JKB/JX) and is usually
right — pin it unless a clear exception applies: proper nouns (한국, 서울) →
`NNP`; bound nouns (것, 수, 데) → `NNB`; auxiliary verbs → `VX`; conjunctive
adverbs (그리고, 하지만) → `MAJ`; copula 이다 → `VCP`.

### 3.2 Batch queue (tick as you go; one PR = 1–2 groups, keep ≤ ~60 rows/PR)

Row counts = rows with inferred register in that group (close proxy for the
full queue; the listing command in §3 is authoritative).

- [x] A1 — `travel-city` (65)
- [x] A2 — `core-actions` (61)
- [x] A3 — `home-routine` (43) + `honorifics` (1)
- [x] A4 — `feelings-descriptions` (42) + `endings-register` (3)
- [x] A5 — `food-drink` (42) + `tense-negation` (5)
- [x] A6 — `weather-nature` (38) + `connectives` (7)
- [x] A7 — `survival-core` (35) + `noun-modification` (5)
- [x] A8 — `time-daily` (32) + `irregular-families` (8)
- [x] A9 — `study-school` (30) + `question-words` (13)
- [x] A10 — `post-hangul-bridge` (26) + `people-pronouns` (9) + `function-words-1` (9)
- [x] A11 — `occupations` (26) + `family-people` (22)
- [x] A12 — `body-health` (22) + `body-parts` (12)
- [x] A13 — `shopping-money` (21) + `daily-objects-tech` (21)
- [x] A14 — `animals` (19) + `clothing` (17)
- [x] A15 — `hobbies-leisure` (16) + `sports` (12) + `colors` (12)
- [x] A16 — `places-movement` (13) + `things-demonstratives` (10) — final sweep complete: the audit's Annotation sources line now shows "inferred":0 for register, speechLevel, morphTag, and originType

**Per-PR acceptance:** strict audit passes; the "Annotation sources" inferred
counts drop by ≈ the batch size; no `meaning`/`exampleKo`/`id` changed; caches
bumped; 3 rows spot-checked in the Word Bank (serve + open, filter "Needs
curation" — treated rows must no longer appear).

---

## 4. Track B — M2 sense split (resolved; kept here for reference)

**Recipe per lemma** (spec §12.3 has the full version):
1. Each real sense gets its **own row** in `words_curated_core.js`: unique `id`
   (convention: `w_m2_<romanized-lemma>_<senseKey>`), same `lemma`, distinct
   `senseKey`, sequential `senseNo`, its **own** `meaning`, `exampleKo`/`exampleEn`,
   `usageNote` that disambiguates, and explicit axis fields (don't create new
   curation debt — pin all four axes on new rows).
2. If the lemma already has a row, retrofit it: add `lemma`, `senseKey`,
   `senseNo: 1`, and narrow its `meaning` to that one sense if it currently
   bundles several (e.g. "street / distance" → "street").
3. Slot every new row into a lesson in `words_lesson_plan.js` (same thematic
   stage; prefer lessons currently under 6 words). If the lesson's subtitle is
   `"Learn N common words"`, update N — the audit hard-fails a mismatch.
4. New example sentences → regenerate audio (`python generate_assets.py`); if
   the pipeline can't run, flag it in the PR body.
5. **A senseKey must mark a genuinely distinct meaning.** If you can't write
   two clearly different beginner example sentences, the lemma doesn't belong
   in M2 — decline it *in writing* below instead of forcing it.

**Batch size: ~5 lemmas per PR.** Proposed senses below are vetted suggestions;
verify each against a dictionary sense you can express at beginner level.

- [x] **B1 — un-bundle existing rows** (done 2026-07-04; each existing row was
  retrofitted with `lemma`/`senseKey`/`senseNo: 1` + a narrowed meaning, and the
  second sense authored as a new `w_m2_*` row with its own example, usage note,
  and explicit axes. Also fixed a typo in 불's example: 꿨어요 → 껐어요. New
  example sentences need `python generate_assets.py` — flagged in the PR):
  - [x] 거리 (`w1320_geori` → `distance`; new `w_m2_geori_street` → `street`)
  - [x] 불 (`w_m5_728_bul` → `light`; new `w_m2_bul_fire` → `fire`)
  - [x] 잡다 (`w_m6_1087_japda` → `grab-catch`; new `w_m2_japda_set_arrange` → `set-arrange`)
  - [x] 길 (`w1309_gil` → `road`; new `w_m2_gil_way_method` → `way-method`)
  - [x] 크다 (`w0803_keuda` adjective → `big`; new verb `w_m2_keuda_grow_up` → `grow-up`)
- [x] **B2 — author second senses for existing single rows** (shipped in
  PR #67 on 2026-07-04, then silently lost in integration merge `b385e77`
  and **restored** later the same day — see the §0 warning box):
  - [x] 쉬다 (`w1206_swida` `sk:rest`) + new `w_m2_swida_breathe` → `breathe` (숨을 쉬다)
  - [x] 열다 (`w1217_yeolda` → `open`) + new `w_m2_yeolda_hold_event` → `hold-event` (파티를 열다)
  - [x] 짓다 (`w1913_jitda` → `build`) + new `w_m2_jitda_make_prepare` → `make-prepare` (밥을 짓다)
  - [x] 살다 (`w1916_salda` → `live-reside`) + new `w_m2_salda_be_alive` → `be-alive`
  - [x] 초 (`w_m5_217_cho` → `second-time`) + new `w_m2_cho_candle` → `candle` (생일 초)
- [x] **B3 — new multi-sense lemmas (not yet in data)**:
  - 떨어지다 — `fall-drop` vs `run-out` (다 떨어졌어요)
  - 오르다 — `climb` vs `rise-increase` (값이 오르다)
  - 나오다 — `come-out` vs `appear-in-media` (TV에 나오다)
  - 놓다 — `put-place` vs `let-go-release`
  - 세우다 — `stand-up-erect` vs `stop-a-vehicle` (차를 세우다)
- [x] **B4 — new multi-sense lemmas, second wave** (2026-07-04; kkeunhda split, ppaeda split, namda kept as one row/no senseKey, gamda split, dalda split):
  - 끊다 — `cut-off` vs `quit` (beginner-distinct; split)
  - 빼다 — `remove-take-out` vs `subtract` (beginner-distinct; split)
  - 남다 — `remain-be-left` vs `be-left-over` (음식이 남다) — **judgment: kept as one row, no senseKey; the beginner distinction was too thin**
  - 감다 — `close-eyes` vs `wash-hair` (split)
  - 달다 — `sweet` (adj) vs `attach-hang` (verb) — homograph pair, two POS (split)
- [x] **B5 — judgment batch** (verified beginner-teachable splits; one decline recorded in writing):
  - 바람 — `wind` vs `wish-hope` (split)
  - 밝다 — `bright` vs `cheerful-personality` (성격이 밝다) (split)
  - 세다 — `strong` (adj) vs `count` (verb) — homograph (split)
  - 피다 — declined: the fire meaning belongs to `피우다` / `태우다`; the remaining `bloom` sense is the only clean beginner meaning, so no split
  - 두다 — `put-keep` vs `leave-behind` (split)

**Declined (do not re-add without a better second sense):** 안다 (only
"embrace"; earlier note confused it with unrelated 알다), 물다 ("pay/be liable"
sense too formal/rare for beginner).

**Done when:** B1–B5 all resolved (split or declined-in-writing), each split
visible in the Word Bank with distinct senses, strict audit green.

---

## 5. Track C — Singleton senseKey cleanup (done 2026-07-04)

18 rows carried a `senseKey` with no sibling sense row (this table originally
listed 16 — re-deriving found two more the table missed, both leftovers from
the #65 dedupe: `w0610_eonje` 언제 and `fw1803_geona` 거나). All 18 resolved;
no row `id` changed (SRS state in users' localStorage keys off it).

| Row | Key | Resolution |
|---|---|---|
| `w1206_swida` 쉬다 | `rest` | kept — second sense `breathe` authored in **B2** |
| `w_m5_206_hae_sun` 해 | `sun` | **authored** `year` sense (`w_m2_hae_year`, senseNo 1; 한 해, 새해) — genuine homograph |
| `w_m5_520_pul_grass` 풀 | `grass` | **authored** `glue` sense (`w_m2_pul_glue`, school-supplies context) |
| `fw1806_ttaemune` 때문에 | `because-of` | key dropped (no second beginner sense planned) |
| `w_m5_218_ju_week` 주 | `week` | key dropped |
| `w_m5_253_gita_instrument` 기타 | `instrument` | key dropped (기타 "et cetera" is written-register, not beginner) |
| `w_m5_260_suyeong_sport` 수영 | `sport` | key dropped |
| `w_m5_335_hangahada` 한가하다 | `free-unbusy` | key dropped (fabricated, pre-#54) |
| `w_m5_382_gukga` 국가 | `nation-state` | key dropped |
| `w_m5_383_gungnae` 국내 | `domestic` | key dropped |
| `w_m5_415_munseo` 문서 | `document` | key dropped |
| `w_m5_418_jilmun_sino` 질문 | `sino` | key dropped (fabricated) |
| `w_m5_467_norae_hobby` 노래 | `hobby` | key dropped (fabricated) |
| `w_m5_488_nappuda_bad` 나쁘다 | `bad` | key dropped (fabricated) |
| `w_m5_514_kape_cafe` 카페 | `cafe` | key dropped (fabricated) |
| `w_m5_530_banghak_break` 방학 | `break` | key dropped (fabricated) |
| `w0610_eonje` 언제 | `when-question` | key dropped (#65 dedupe leftover; not in the original table) |
| `fw1803_geona` 거나 | `or-choice` | key dropped (#65 dedupe leftover; not in the original table) |

- [x] **C1** — table applied (drop = `senseKey`/`senseNo` removed; author =
  Track B recipe, all four axes explicit). §0.1 singleton count re-derived:
  **0**. Audio for the two new example sentences still needs
  `python generate_assets.py` (blocked in the authoring environment —
  egress policy).

---

## 6. Track D — Honorifics as a systematic axis (done 2026-07-04)

**Was:** the honorific verb table and W19 lessons shipped, but
*subject-honorific* (높임: 계시다, 드시다, 주무시다, -(으)시-) vs
*listener-politeness* (해요체/합쇼체) was not distinctly encoded on rows.

**Shipped design (the §6 proposal, implemented under the owner's blanket
"knock out the gated work" authorization on 2026-07-04 — additive and
optional, so the owner can amend freely):** optional field
`honorificRole: "subject" | "listener" | "humble"` + bidirectional
`contrastWith` links between plain↔honorific pairs. The audit validates the
enum and the `contrastWith` shape.

- [x] **D1** — design adopted as proposed (owner-amendable; the field is optional/additive)
- [x] **D2** — schema + audit enum + backfill: **26 rows** re-derived from the data
  (the "~40" was an estimate): 9 `subject` (계시다/드시다/주무시다/성함/연세/분/
  말씀/선생님/-(으)시-), 3 `humble` (저/저희/드리다), 14 `listener` (해요체/합쇼체
  endings + polite survival phrases). 10 `contrastWith` pairs both directions:
  있다↔계시다, 먹다↔드시다, 자다↔주무시다, 주다↔드리다, 말↔말씀, 나↔저,
  우리↔저희, 이름↔성함, 나이↔연세, 명↔분. Also fixed three register values the
  Track A batches missed (말씀/드리다 → `honorific`, 저희 → `polite`).

---

## 7. Track E — Owner decisions (recorded 2026-07-04)

All four items were closed under the owner's blanket "knock out the gated
work" authorization, each taking the option this file itself recommended.
E1/E2 are pure policy records with no code attached — trivially reversible
if the owner wants the other option.

- [x] **E1 — Pronunciation scoring: stub accepted as final** for the
  static/no-backend architecture. True phoneme-level scoring stays out of
  scope unless the owner later chooses to scope a backend service.
- [x] **E2 — Hanja policy: leave absent** (the recommended option — a wrong
  hanja is worse than none). `hanja` stays explicit on the 2 verified rows
  only; any future backfill needs a verified dictionary source with human
  review. Never a small-model task.
- [x] **E3 — 하다-verb originType convention: root origin, 하다 ignored**
  (the suggested rule); loanword roots → `loanword`; `hybrid` reserved for
  true mixed compounds (하얀색, 노래방 …). Cleanup applied 2026-07-04:
  30 rows normalized, zero 하다-verbs remain `hybrid`.
- [x] **E4 — Final gate.** `TEST_UNLOCK_ALL_STAGES` set back to `false`
  (2026-07-04), caches bumped, all audits green, and a scripted cold-learner
  test of the real gated progression passed: fresh state unlocks only
  alphabet stage 1; Words lessons all locked until the alphabet completes;
  then exactly `w0-post-hangul-bridge-01` unlocks; completing it unlocks
  `-02`. Flip the flag to `true` locally if you need the testing bypass.

---

## 8. Suggested execution order

**Every track (A–E) is done.** The Words section is final per §1. The only
outstanding item is not a track: one `python generate_assets.py` run for the
two Track C sentences authored without audio (see §5) — the words audit's
audio-coverage check tracks them via its `AUDIO_PENDING_ALLOWED` list and
will fail strict if new text ships without audio.
