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

## 0. Verified status snapshot (2026-07-04, post-B1–B4 merge)

The Words section is **feature-complete**. All engines, screens, and content
systems are shipped and the app smoke-tests clean (no console errors; Word
Bank, lesson flow, SRS review all render). What remains is **data finishing
work** — exactly the kind of high-volume, low-risk editing a small model can
grind through with this playbook.

| Fact | Verified value |
|---|---|
| Curated senses | **2,020** rows, every one referenced by a lesson (audit: 0 errors, 0 warnings) |
| Lessons | **298** across stages W0–W19 |
| Genuinely multi-sense lemmas | **99** lemmas with 2+ sense rows sharing a distinct `senseKey` per row |
| Leftover singleton `senseKey`s | **17** rows have a `senseKey` but no sibling sense (§Track C) |
| Curation queue | **575** rows have ≥1 `inferred` axis — register 566 · speechLevel 572 · morphTag 568 · originType 205; 564 rows are inferred on register+speechLevel+morphTag simultaneously (down from 708 pre-Track-A7–A9) |
| `hanja` | explicit on only 2 rows; 2,018 absent (owner-gated, §Track E) |
| Audits | `audit-words-data --strict`, `audit-alphabet-audio --strict`, `audit-app-shell` all pass |

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

- [ ] **Track A** — Curation burn-down: 0 rows with an `inferred` annotation axis
- [ ] **Track B** — M2 sense split: candidate list in §4 fully worked (each lemma either split or explicitly declined with a reason written into §4)
- [ ] **Track C** — 16 singleton `senseKey`s resolved (real second sense authored, or leftover key removed)
- [ ] **Track D** — Honorific axis encoded per the owner-approved design
- [ ] **Track E** — Owner decisions recorded (pronunciation scoring; hanja policy; 하다-verb originType convention)
- [ ] **Final gate** — `TEST_UNLOCK_ALL_STAGES` in `app.js` set back to `false`; full cold-learner smoke test of the real progression; caches bumped; all three audits green

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

## 3. Track A — Curation burn-down (~575 rows remaining as of A7–A9; the bulk of the easy work)

**What it is.** Every row already has effective values on all axes, but on ~575
rows some values are machine-`inferred` (re-run §0.1 for the live count — A7–A9
already brought this down from 711). Curation = a human-quality pass that
**pins** each value as explicit: add `register:`, `speechLevel:`,
`originType:`, `morphTag:` fields to the row's `defineWord({...})` entry in
`words_curated_core.js`. `annotationSource` flips to `explicit` automatically
(see `defineWord`, ~line 141). Usually the inferred value is already correct —
the job is *verify then pin*, fixing the minority that are wrong.

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

- [ ] A1 — `travel-city` (65)
- [ ] A2 — `core-actions` (61)
- [ ] A3 — `home-routine` (43) + `honorifics` (1)
- [ ] A4 — `feelings-descriptions` (42) + `endings-register` (3)
- [ ] A5 — `food-drink` (42) + `tense-negation` (5)
- [ ] A6 — `weather-nature` (38) + `connectives` (7)
- [x] A7 — `survival-core` (35) + `noun-modification` (5) — done 2026-07-04; 41 rows pinned and lesson-linked
- [x] A8 — `time-daily` (38) + `irregular-families` (8) — done 2026-07-04; 46 rows pinned and lesson-linked
- [x] A9 — `study-school` (30) + `question-words` (13) — done 2026-07-04; 46 rows pinned and lesson-linked
- [ ] A10 — `post-hangul-bridge` (26) + `people-pronouns` (9) + `function-words-1` (9)
- [ ] A11 — `occupations` (26) + `family-people` (22)
- [ ] A12 — `body-health` (22) + `body-parts` (12)
- [ ] A13 — `shopping-money` (21) + `daily-objects-tech` (21)
- [ ] A14 — `animals` (19) + `clothing` (17)
- [ ] A15 — `hobbies-leisure` (16) + `sports` (12) + `colors` (12)
- [ ] A16 — `places-movement` (13) + `things-demonstratives` (10) — final sweep: after this, the audit's Annotation sources line must show `"inferred":0` for register, speechLevel, morphTag, and originType

**Per-PR acceptance:** strict audit passes; the "Annotation sources" inferred
counts drop by ≈ the batch size; no `meaning`/`exampleKo`/`id` changed; caches
bumped; 3 rows spot-checked in the Word Bank (serve + open, filter "Needs
curation" — treated rows must no longer appear).

---

## 4. Track B — M2 sense split (the one open milestone)

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
- [x] **B2 — author second senses for existing single rows** (done 2026-07-04;
  each new sense placed in the same lesson as its sense-1 row, mirroring the
  precedent already set by 나다's two senses sharing `w19-irregular-families-01`):
  - [x] 쉬다 (`w1206_swida` → `rest`; new `w_m2_swida_breathe` → `breathe`, 숨을 쉬다)
  - [x] 열다 (`w1217_yeolda` → `open`; new `w_m2_yeolda_hold_event` → `hold-event`, 파티를 열다)
  - [x] 짓다 (`w1913_jitda` → `build`; new `w_m2_jitda_make_prepare` → `make-prepare`, 밥을 짓다)
  - [x] 살다 (`w1916_salda` → `live-reside`; new `w_m2_salda_be_alive` → `be-alive`)
  - [x] 초 (`w_m5_217_cho` → `second-time`; new `w_m2_cho_candle` → `candle`, 생일 초)
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
- [ ] **B5 — judgment batch** (verify each is beginner-teachable before authoring; decline in writing if not):
  - 바람 — `wind` vs `wish-hope`
  - 밝다 — `bright` vs `cheerful-personality` (성격이 밝다)
  - 세다 — `strong` (adj) vs `count` (verb) — homograph
  - 피다 — `bloom` vs `light-a-fire` (transitive is 피우다 — check before authoring)
  - 두다 — `put-keep` vs `leave-behind`

**Declined (do not re-add without a better second sense):** 안다 (only
"embrace"; earlier note confused it with unrelated 알다), 물다 ("pay/be liable"
sense too formal/rare for beginner).

**Done when:** B1–B5 all resolved (split or declined-in-writing), each split
visible in the Word Bank with distinct senses, strict audit green.

---

## 5. Track C — Singleton senseKey cleanup (one small PR)

16 rows carry a `senseKey` with no sibling sense row. Most are leftovers from
the #54 dedupe (the deleted twin took the other key). Resolve each; **never
change the row's `id`** (SRS state in users' localStorage keys off it).

| Row | Current key | Action |
|---|---|---|
| `w1206_swida` 쉬다 | `rest` | keep — second sense authored in **B2** |
| `w_m5_206_hae_sun` 해 | `sun` | **author** `year` sense (올해, 한 해) — genuine homograph, beginner-common |
| `w_m5_520_pul_grass` 풀 | `grass` | **author** `glue` sense (school context) or drop key with reason |
| `fw1806_ttaemune` 때문에 | `because-of` | drop key (no second beginner sense planned) |
| `w_m5_218_ju_week` 주 | `week` | drop key |
| `w_m5_253_gita_instrument` 기타 | `instrument` | drop key (기타 "et cetera" is written-register, not beginner) |
| `w_m5_260_suyeong_sport` 수영 | `sport` | drop key |
| `w_m5_335_hangahada` 한가하다 | `free-unbusy` | drop key (fabricated, pre-#54) |
| `w_m5_382_gukga` 국가 | `nation-state` | drop key |
| `w_m5_383_gungnae` 국내 | `domestic` | drop key |
| `w_m5_415_munseo` 문서 | `document` | drop key |
| `w_m5_418_jilmun_sino` 질문 | `sino` | drop key (fabricated) |
| `w_m5_467_norae_hobby` 노래 | `hobby` | drop key (fabricated) |
| `w_m5_488_nappuda_bad` 나쁘다 | `bad` | drop key (fabricated) |
| `w_m5_514_kape_cafe` 카페 | `cafe` | drop key (fabricated) |
| `w_m5_530_banghak_break` 방학 | `break` | drop key (fabricated) |

- [ ] **C1** — apply the table above (drop = remove `senseKey` and `senseNo`
  from the entry; author = follow the Track B recipe). Re-run the §0.1
  singleton count — it must land at 0 (excluding lemmas mid-split in B).

---

## 6. Track D — Honorifics as a systematic axis (design first — not mini-model work)

**Gap:** the honorific verb table and W19 lessons shipped, but
*subject-honorific* (높임: 계시다, 드시다, 주무시다, -(으)시-) vs
*listener-politeness* (해요체/합쇼체) is not distinctly encoded on rows —
`register`/`speechLevel` each carry part of it.

**Proposed minimal design (needs owner sign-off before any code):** one new
optional field `honorificRole: "subject" | "listener" | "humble"` +
`contrastWith` links between plain/honorific pairs (먹다↔드시다, 자다↔주무시다,
있다↔계시다, 주다↔드리다, 말↔말씀, 나↔저). Additive, audit gets the enum.

- [ ] **D1** — owner approves (or amends) the design
- [ ] **D2** — schema + audit enum + backfill the ~40 affected rows (easy work once D1 is decided)

---

## 7. Track E — Owner decisions (record here; agents must not attempt)

- [ ] **E1 — Pronunciation scoring.** Shipped: SpeechRecognition transcript-match
  + duration stub. True phoneme-level scoring is not achievable client-side
  with no build step/backend. **Decide:** accept stub as final, or scope a
  backend service.
- [ ] **E2 — Hanja policy.** Explicit on 2 rows only. **Decide:** leave absent
  (recommended — wrong hanja is worse than none), or backfill via a verified
  dictionary source with human review. Never a small-model task.
- [ ] **E3 — 하다-verb originType convention.** Existing explicit rows conflict
  (공부하다=`Sino-Korean`, 전화하다/일하다=`hybrid`). **Decide** one rule;
  suggested: origin of the root, 하다 ignored. Then one cleanup PR normalizes
  the handful of explicit rows.
- [ ] **E4 — Final gate.** Flip `TEST_UNLOCK_ALL_STAGES` (app.js) to `false`,
  cold-learner smoke test of the real gated progression, bump caches, all
  audits green. Do this **last**, after A–D are closed.

---

## 8. Suggested execution order

Tracks are independent — safe to interleave. Highest-leverage order for a
small model grinding solo:

1. **C1** (tiny, cleans the senseKey landscape before B touches it)
2. **A1…A16** (the bulk; pure data pinning, zero audio work)
3. **B1 → B5** (needs audio regen + more judgment; do after warming up on A)
4. **D2** once the owner clears D1; **E4** last.
