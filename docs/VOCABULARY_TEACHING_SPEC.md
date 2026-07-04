# HanaPath Vocabulary Teaching Spec (pedagogy & linguistics north star)

Date: 2026-07-04
Repo: `CameronNel/hanapath`
Status: **governing spec for *what* and *how* the Words section teaches.**

## How this doc relates to the others

- **This doc** — the *why / what to teach*: the linguistic and pedagogical
  requirements a beginner English→Korean app must satisfy. It is the north star.
- [`WORDS_SECTION_MASTER_SPEC.md`](WORDS_SECTION_MASTER_SPEC.md) — the *how it is
  built*: file structure, data schema, SRS, lesson flow, screens, PR sequence.
  When the two disagree, this doc sets the target and the master spec is the
  implementation that must be brought toward it (see §8–§9 below).

The original research spec is reproduced **verbatim** in
[`VOCABULARY_TEACHING_SPEC_SOURCE.md`](VOCABULARY_TEACHING_SPEC_SOURCE.md) (source
of record); this doc is its repo-actionable adaptation.

**If you are an AI/agent about to build Words features:** read §8 (status), then
§11 (milestone reference sheet) and §12 (dependency & implementation order).
§11–§12 tell you *when* a piece is ready to build, *where* the code lives, and
*how* to land it.

The one-line thesis, which the rest of this doc unpacks:

> A beginner Korean app should not treat "vocabulary" as isolated word pairs.
> The core unit is a **sense-linked lexeme plus its inflected forms, particles,
> register, pronunciation, and exemplar phrase patterns** — not a flat
> translation card. Korean's script, phonology, morphology, and politeness are
> inseparable from usable vocabulary, so the app must be a **script-aware,
> morphology-aware, register-aware lexical system**, not a bilingual word bank.

---

## 1. Linguistic foundations the app must respect

1. **Script is beginner-friendly but demanding.** Hangeul is phonemic but written
   in **syllable blocks** (감, 물, 학교). Reading speed depends on perceiving the
   whole block, not scanning jamo. Teach in layers: basic consonants/vowels →
   tense consonants + compound/diphthong vowels → batchim → whole-block
   recognition and typing.
2. **Phonology from day one.** Orthography ≠ running-speech pronunciation
   (물고기 → [물꼬기]; resyllabification in 한국어, 같이, 읽어요). Every word carries a
   "spelling" layer and a "sounds like" layer.
3. **English-speaker phonological targets** (make these unusually prominent):
   the three-way stop contrast (달/딸/탈, 불/풀 — VOT **and** onset pitch, not a
   two-way voiced/voiceless split), ㄹ realization by position, ㅓ vs ㅗ, ㅡ vs ㅜ
   (ㅡ has no close English equivalent), and batchim/resyllabification.
4. **Korean is agglutinative.** Do not store only citation forms. Learners need
   stems, endings, particles, honorific markers, and common surface allomorphs.
5. **Dual POS schema.** Teach a simplified learner-facing class set; store a
   richer Sejong/UD-compatible tagset underneath (see §3).
6. **Particles and honorifics are structural, not "advanced."** Case /
   conjunctive / auxiliary particles, and the split between **subject
   honorification** (`-(으)시-`) and **listener politeness** (`-요`, `-습니다`).
7. **Word-origin strata matter early.** Native Korean vs Sino-Korean vs
   loanword. High-frequency Sino-Korean morphemes recur productively
   (학교/학생/학년), and one English gloss may need different Korean words by
   register (everyday 오늘 vs formal 금일).

---

## 2. The core teaching unit

Each learner-facing item is a **sense**, not a type. Concretely:

- `보다` is not one card with a long English list; each major sense gets its own
  teaching context, example, and review history.
- Knowing 집 = "house" is not knowing the word until the learner can use
  집에 / 집에서 / 우리 집 / 작은 집. Form-level and phrase-level accuracy are both
  required.
- Every new lexical item arrives with **just enough phonology and morphology to
  be usable in a phrase** — never as an isolated noun or citation verb.

---

## 3. Morphology & conjugation priorities

Taught by **communicative load**, not descriptive completeness. Korean predicates
should be modeled as a **stem + inflection engine** (form generation + form
recognition), which is a first-release capability, not a later enhancement.

### 3.1 Beginner conjugation scope

| Category | What the learner needs early | Why | Example |
|---|---|---|---|
| Citation form | Dictionary/lookup form (lexeme identity, search) | Search + identity | 먹다, 가다, 좋다 |
| Polite informal (해요체) | Default spoken beginner output | Most daily talk starts here | 먹어요, 가요, 좋아요 |
| Polite formal (합니다체) | Service/public/classroom register | Signs, customer service | 먹습니다, 갑니다 |
| Past | Core time reference | Survival conversation | 먹었어요, 갔어요 |
| Subject honorific | Politeness contrast | Connect people terms to predicate marking | 드세요, 계세요 |
| Connective | Clause chaining | Korean chains clauses constantly | 가서, 먹고 |
| Attributive | Noun modification | Needed surprisingly early | 먹는 사람, 예쁜 집 |
| Negation | Core function | Minimal useful expression fast | 안 가요, 못 해요, 하지 않아요 |

### 3.2 Irregular families (teach as trigger-based families, not a memorization bucket)

| Family | Trigger | Examples | Recommendation |
|---|---|---|---|
| ㄷ | Stem-final ㄷ → ㄹ before a vowel ending | 듣다 → 들어, 걷다 → 걸어 | Dedicated family with alerts |
| ㅂ | Stem-final ㅂ → 우 before a vowel ending (돕다/곱다 → 와) | 춥다 → 추워, 맵다 → 매워 | After regular vowel contractions |
| ㅅ | Stem-final ㅅ drops before a vowel ending (no contraction) | 짓다 → 지어, 낫다 → 나아 | Group as "drop-ㅅ" |
| ㅎ | Some adjectives: final ㅎ contracts | 빨갛다 → 빨개, 파랗다 → 파래 | Restrict early teaching to high-freq color adjectives |
| 르 | Stem-final 르 → ㄹㄹ before -아/-어 | 부르다 → 불러, 빠르다 → 빨라 | Pattern family, not one-offs |
| 러 | -어/-어서 → -러 in a small set | 이르다 → 이르러 | Defer to late-beginner |
| ㄹ-deletion | Stem ㄹ drops before ㄴ/ㅂ/ㅅ | 살다 → 삽니다, 길다 → 긴 | Teach functionally |

### 3.3 Dual POS schema (learner-facing ↔ Sejong/UD)

| Learner-facing | Sejong tags | UD | App use |
|---|---|---|---|
| Common noun | NNG, NNB, XR | NOUN | Lexical core, counters, topic/object practice |
| Proper noun | NNP | PROPN | Names, places |
| Pronoun | NP | PRON | Restricted early (often omissible) |
| Verb | VV, VX, VCP, VCN | VERB | Main inflection engine |
| Descriptive verb | VA | ADJ | Predicate-like in lessons |
| Adverb | MAG, MAJ | ADV/CONJ | Manner + sentence linking |
| Determiner | MM | DET | this/that/some |
| Particle/postposition | JKS, JKC, JKG, JKO, JKB, JKV, JKQ, JX, JC | ADP | Case, topic, only, with, to, from |
| Ending | EP, EF, EC, ETN, ETM | PART | Tense, mood, clause type, modifier forms |
| Derivational affix | XPN, XSN, XSA, XSV | PART | Word-family / derivation hints |
| Interjection | IC | INTJ | High-value early oral items |

Author against the simplified schema; **preserve the richer tags underneath** so
form generation and exercise targeting stay reliable.

---

## 4. Vocabulary selection & grading

Do **not** define "core vocabulary" by raw corpus frequency alone. Triangulate:
**official graded learner lists + corpus frequency + communicative utility +
morphological productivity**, then re-rank within official lists by frequency and
lesson fit. (Anchor sources: NIKL learner vocabulary list — 982 level-1 / 2,111
level-2 / 2,872 level-3 items; Basic Korean Dictionary's 50,000 leveled
headwords.)

### 4.1 Shipping tiers

| Tier | Size | Principle | Contents |
|---|---|---|---|
| Script-prelexical | 0 lexical | Orthographic control | Hangeul letters, syllable blocks, batchim |
| Core oral launch | 300–400 senses | Survival communication | Greetings, self-intro, numbers, time, family, places, food, common verbs/adjectives, particles |
| **Core 1000** | 800–1,000 senses | Official level-1 + frequency + textbook salience | Most reusable beginner vocab, formulaic expressions, high-freq predicates, counters, pronouns, question words |
| Core 2000 | 1,800–2,000 senses | + level-2 + early topical | Daily life, transport, work, study, health, shopping, simple abstract vocab |
| Post-ship | 3,000+ senses | Frequency + curricular pathways | News, formal register, cultural terms, Sino-Korean networks, idioms |

"Core 1000" is a packaging decision on top of the official level-1 list, not a
magic threshold.

### 4.2 Thematic coverage inside the core lexicon

| Theme | Why it ships early | Morphology to bind with it |
|---|---|---|
| Identity & courtesy | Day-one need | -요, -습니다, honorific names/titles |
| Numbers, dates, time | Essential + structurally distinctive | Native vs Sino numerals, counters |
| Home, family, food | High frequency | Possession, location particles, honorific kin terms |
| Motion & place | Enables sentence framing | 에, 에서, 로/으로, 있다/없다, 가다/오다 |
| Daily routines | Verb-centred learning | Past, negation, sequencing -고/-아서 |
| People & description | Real propositions | VA predicates, topic marking, modifier forms |
| Transactions & service | Travellers + adults | Formal polite endings, requests |
| Study/work basics | Adult learners | Noun+하다, Sino-Korean word families |

The launch lexicon must be **sense-based**, and register/origin-aware so one
English gloss does not silently teach the wrong Korean word.

---

## 5. Curriculum sequencing & pedagogy

Move **syllable → word → phrase → sentence** (official beginner guidance):

```
Hangeul letters → syllable blocks → pronunciation & batchim →
high-frequency words → formulaic phrases → sentence frames with particles →
short dialogues → guided production → topical expansion & review
```

Balance every unit across **Nation's Four Strands**: meaning-focused input,
meaning-focused output, language-focused learning, fluency development.

Memory backbone:

- **Spaced repetition by default** (medium-to-large effect; longer spacing helps
  delayed retention; equal vs expanding intervals perform similarly — so don't
  obsess over strictly expanding intervals).
- **Retrieval practice ≥ exposure.** Recognition-only flashcards are not enough;
  pull the target from memory in multiple directions (hearing→meaning,
  meaning→form, form→pronunciation).
- **Mnemonics selectively** — most useful for low-imageability forms and
  high-confusion minimal sets; fade as exposure and morphology take over.

Per-sense three-mode cycle: **notice** (form in context, audio + script) →
**retrieve** (increasingly hard prompts, both directions) → **deploy**
(constrained production).

---

## 6. Exercises, minimal pairs, assessment

### 6.1 Exercise ladder

| Stage | Input tasks | Output tasks | Main metric |
|---|---|---|---|
| Script | jamo recognition, block parsing, audio→block | type heard syllable, rebuild block | decoding accuracy, RT |
| Word | audio→meaning, meaning discrimination, picture match | recall Hangul from English, read aloud | form recall, pronunciation attempt |
| Phrase | phrase match, particle recognition, cloze with audio | complete phrase with correct particle/ending | grammatical accuracy in context |
| Sentence | dialogue comprehension, ordering, dictation-lite | translate constrained prompts, shadow/reformulate | sentence accuracy & fluency |
| Review | mixed-modal retrieval | cumulative recall & reuse | long-term retention, transfer |

### 6.2 English-speaker pitfalls (build minimal-pair drills for these)

| Pitfall | Example set | Teaching response |
|---|---|---|
| Three-way stops | 달 / 딸 / 탈 | triplet audio discrimination before production |
| Lenis vs aspirated | 불 / 풀 | train with VOT + pitch-rich examples |
| ㄹ category | 라면, 나라, 빨리 | positional realization via audio, not romanization |
| ㅓ vs ㅗ | 먹어 / 모거-style | vowel maps + auditory minimal sets |
| ㅡ vs ㅜ | 글 / 굴, 크다 / 쿠다-style | mouth-shape cueing + slow audio |
| Batchim / resyllabification | 한국어, 같이, 읽어요 | show "spelling" and "sounds like" layers |
| Particle omission | 저는 학생이에요 vs 저 학생이에요 | keep particles attached to phrase frames |
| Register mismatch | 오늘 vs 금일; 먹어요 vs 잡수세요 | teach by scenario + speaker/listener status |

### 6.3 Metric suite (measure more than correctness)

Lexical recognition accuracy · lexical recall accuracy · syllable-block decoding
speed · inflection accuracy **by irregular family** · particle accuracy in
sentence frames · spaced-retention score at 1 week and 1 month · pronunciation
split into **segmental accuracy** and **prosodic fluency**.

---

## 7. Data architecture required to reach this spec

Entities (the displayed item is only the top layer over structured data):

```
LEXEME ──has──▶ SENSE ──realises──▶ FORM
  │              │                    │
  │              ├─glossed_by─▶ TRANSLATION
  │              ├─appears_in─▶ EXAMPLE ──pronounced_as──▶ AUDIO
  │              └─used_in────▶ EXERCISE_ITEM
  ├─links─▶ WORD_FAMILY
FORM ──affected_by──▶ PRON_RULE ; FORM ──tagged_with──▶ MORPH_TAG
USER ──performs──▶ REVIEW_EVENT ; EXERCISE_ITEM ──generates──▶ REVIEW_EVENT
```

Tagging dimensions every sense/form should carry: **word origin** (native /
Sino-Korean / loanword / hybrid), **register** (everyday / polite / formal /
honorific / written-formal), **speech level** (plain / polite informal / polite
formal), **morph family** (regular / ㄷ / ㅂ / ㅅ / ㅎ / 르 / ㄹ-deletion),
**particle frame** (topic / subject / object / location / direction / additive /
contrastive), **exercise skill**, and **error type** (phonology / orthography /
particle / inflection / lexical choice / register).

### 7.1 Mapping onto the current `defineWord` schema

The current curated schema (`words_curated_core.js` / master spec §4.3–4.4)
already carries: `id`, `korean`, `lemma`, `pos`, `pronunciation`, `exampleKo/En`,
`usageNote`, `forms`, `grammarRole`, `contrastWith`, `pattern`, `formNote`,
`soundNote`, `tags`, `difficulty`, `priority`, `isFunctionWord`. It is a good
base but **collapses lexeme+sense+form** into one row and lacks the register /
origin / morph axes above.

**Planned additive fields** (backward compatible; audit-enforced when present):

| Field | Purpose | Notes |
|---|---|---|
| `senseKey` / `senseNo` | Split polysemy (보다 → multiple senses) | one lexeme → many rows sharing a `lemma` |
| `register`, `speechLevel` | Correct-context teaching | enum, not free text |
| `originType`, `hanja` | native / Sino-Korean / loanword | drives word-family teaching |
| `irregularFamily` | Trigger-based inflection | one of the §3.2 families |
| `morphTag` | Sejong/UD tag under the learner `pos` | preserve computational detail |
| structured `inflections` | Generated + authored forms | polite/formal/past/honorific/attributive |

These were prototyped on an earlier branch and dropped in main's rebuild for a
simpler schema; re-adding them **additively** is the foundation the rest of this
spec builds on.

---

## 8. Current status vs this spec

Grounded in the shipped code (main) as of 2026-07-04. Legend: ✅ solid ·
🟡 partial · ❌ missing.

| Spec pillar | Status | Where it stands |
|---|---|---|
| Hangul-first, romanization secondary | ✅ | UX is Hangul-primary; romanization is a support layer |
| Script → block → batchim course | ✅ | Full alphabet module (drill lab, skill-SRS, 72 audio tokens, batchim) |
| Staged curriculum word→phrase→sentence | ✅ | W0–W16 thematic stages + checkpoint ladder + W17–W19 grammar track (merged) |
| Lexeme + forms, not flat pairs | ✅ | `forms`/`grammarRole`/`pattern`/`formNote` exist; `words_inflect.js` now provides generator + recognizer coverage |
| Particles & endings first-class | ✅ | Function-word entries with forms/grammarRole/contrastWith/pattern |
| Honorifics (subject vs listener) | 🟡 | Honorific verb table + W19 lesson (shipped); not yet a systematic register axis |
| SRS backbone | ✅ | Leitner scheduler (`vocabSrs`, 5m/20m/1d/3d/7d…) |
| Bidirectional retrieval | ✅ | ko↔meaning, type-ko, sentence-blank, function-usage, audio |
| Irregular families as trigger-based | ✅ | W19 track + inline `formNote`; generator/recognizer covers the audited irregular-family gold set |
| **Sense-level polysemy** | 🟡 | 94 lemmas carry genuine multi-sense rows with distinct `senseKey`/`senseNo` (쓰다 write/wear/use, 시장 market/mayor/hunger, 배 stomach/pear/boat, 말 speech/horse, 타다 ride/burn, 내리다 get-off/fall, 일어나다 wake/stand, 것 independent/bound noun, modifier `(으)ㄴ`, 하다 do/say, 보다 see/try, 나다 occur/sprout, 눈 snow/eye, 다리 bridge/leg, 밤 night/chestnut, 차 tea/car, 맞다 correct/get-hit, 사과 apple/apology, 뛰다 run/jump, 가다 go/time-passing, 싸다 cheap/pack, 들다 hold/cost, 걸리다 take-time/catch-illness, 지다 lose/sunset, 걸다 hang/call, 서다 stand/stop, 치다 hit/play-instrument, 풀다 untie/solve, 돌다 turn/go-around, plus five more added 2026-07-04 — 재다 measure/be-calculating, 짜다 salty/make-a-plan, 차다 kick/be-full, 빠지다 fall-into/be-omitted, 붙다 stick/pass-an-exam; plus five early noun splits in the previous batch — 밥 meal/rice, 시간 time/hour, 아침 morning/breakfast, 점심 lunch/noon, 저녁 evening/dinner; plus four more in the previous batch — 검사 examination/prosecutor, 감독 director/supervisor, 가정 household/assumption, 문구 stationery/phrase; plus two more in the previous batch 3 — 과정 process/course, 인상 impression/price increase; plus four more in the previous batch — 시계 clock/watch, 머리 head/hair, 목 throat/neck, 가슴 heart/chest; plus three new split lemmas in the current batch — 분 minute/honorific counter, 새 bird/new, 통화 phone call/currency; plus one extra sense in the already-split 배 belly/pear/boat trio; plus three more in batch 8 ? itda have/exist, eopda not-have/not-exist, bonaeda send/spend time; plus four more in the current batch ? dol first birthday, ilsik solar eclipse, jungsik lunch, jeongri cleanup/organization; plus four more in the newest batch — 구조 structure/rescue, 조직 organization/tissue, 모델 fashion/prototype, 코드 programming/dress code; plus three more in the newest batch — 대기 atmosphere/waiting, 시점 point in time/viewpoint, 차례 turn/ancestral rites/table of contents). **Correction (PR #54, 2026-07-03):** the previously reported "128 rows / 94 lemmas" figure was wrong — 74 of those rows were accidental duplicate content disguised as polysemy (a second copy of the same word/meaning tagged with a fabricated `senseKey` like `"small"`/`"busy"`/`"hobby"` purely to dodge the duplicate-content audit, which fully exempted a whole same-surface group the moment *any* row in it had a `senseKey`). Removed; the audit's exemption logic is now closed (a shared/identical `senseKey` across rows is a hard error) so this can't silently recur. Most polysemous lemmas remain untagged; real M2 authoring continues per §9 |
| **Word-origin tagging (native/Sino/loan)** | 🟡 | every row has effective `originType`; `annotationSource` distinguishes verified vs inferred labels, and Hanja is retained only when verified |
| **Register as a data axis** | 🟡 | `register`/`speechLevel` now inferred from **structured** signals (POS, lessonGroup, curated tags), not by scanning the example sentence — so everyday nouns (물, 책, 시간…) are no longer mislabeled polite/honorific. High-contrast lexemes (저 vs 나, 무엇 vs 뭐, 와/과 vs 하고, formal set-phrases, honorifics) are hand-verified `explicit`; the rest are correct-by-rule and flagged for review in the curation queue |
| **Morph tags (Sejong/UD)** | 🟡 | every row has a validated effective `morphTag`; broad inferred tags are tracked separately from explicit hand-curated tags |
| **Pronunciation training (minimal pairs, 3-way stops)** | ✅ | Vocab minimal-pair drill exists; every curated word card shows spelling vs sounds-like layers |
| **Pronunciation scoring (segmental + prosodic)** | 🟡 | browser SpeechRecognition scoring stub compares transcript accuracy and speaking duration; not acoustic phoneme-level scoring |
| Rich review-event analytics | ✅ | per-item latency/error-type events persist and feed the metrics view |
| Numbers / counters / native-vs-Sino | ✅ | Sino/Native numbers and counters thematic sets + lessons |
| Vocabulary volume | ✅ | 2,015 unique curated senses (1,918 post-#54, +97 across seventeen M2 batches), slightly above the Core 1000 / Core 2000 target band, with every curated row assigned to a lesson |

**Read:** the hardest-to-retrofit parts (script course, Hangul-first UX, SRS,
retrieval, inflection engine, volume) are done. The remaining gaps are
**genuine sense-splitting (M2)**, **curation of inferred labels**,
**curriculum polish after the dedupe passes**, and a **decision on
pronunciation scoring** — the concrete checklist is §9.

The Word Bank now has a **Needs curation** filter and **Curation priority** sort
driven by `annotationSource`, so inferred register/origin/morph labels can be
reviewed in batches instead of hiding behind effective fallback values.

---

## 9. What remains to finalize the Words section

The original six-PR roadmap (data axes → sense split → inflection engine →
pronunciation layer → Core 1000 authoring → analytics) has **shipped except for
the sense split** — see §11 for per-milestone status. This section is now the
finalization checklist, ordered by leverage. Each item is small, additive, and
audit-backed. The batch-by-batch execution queue for these items (per-PR
recipes, vetted M2 candidate list, curation decision guides — written so a
small coding model can execute safely) is
**[`WORDS_FINAL_ROADMAP.md`](WORDS_FINAL_ROADMAP.md)**; this section stays the
source of truth for *what*, that file for *how and in which order*.

1. **M2 sense split (the one open milestone — real authoring, not tagging).**
   94 lemmas have genuine multi-sense rows (§8). Seventeen batches so far:
   2026-07-03 (눈/다리/밤/차/맞다, slotted into thin lessons to help §9 item 2
   too; also fixed a bug where 부르다's verb row wrongly bundled the
   adjective sense's gloss into its own meaning); 2026-07-04 batch 1
   (사과/뛰다/가다/싸다 split from single bundled rows, plus 들다/걸리다/지다
   authored as brand-new multi-sense verbs); 2026-07-04 batch 2
   (걸다/서다/치다/풀다/돌다 — one of which, 풀다's "solve" sense, was slotted
   into `w218-theme-264`, resolving the one thin lesson #59 had left
   unfoldable); 2026-07-04 batch 3 (재다 measure/be-calculating, 짜다
   salty/make-a-plan, 차다 kick/be-full, 빠지다 fall-into/be-omitted, 붙다
   stick/pass-an-exam); 2026-07-04 batch 4 (사고 accident/thinking, 연기 acting/smoke,
   전기 electricity/biography, 이사 moving/director, 소식 news/eating-light); 2026-07-04 batch 5 (과정 process/course, 인상 impression/price increase); 2026-07-04 batch 9 (구조 structure/rescue, 조직 organization/tissue, 모델 fashion/prototype, 코드 programming/dress code, slotted into body-health, daily-objects-tech, and clothing lessons); 2026-07-04 batch 10 (...); 2026-07-04 batch 11 (tteoreojida fall/drop, oreuda climb/rise-increase, naoda come-out/appear-media, nohda put/place/let-go, seuda stand-upright/stop-vehicle).
   **Reviewed and declined:** 안다 and 물다 were on the
   candidate list but don't have a second sense clean enough for beginner
   level (안다 is just "to embrace" — the earlier note confused it with the
   *unrelated* word 알다 "to know," which only look similar to a learner, not
   a real polysemy case; 물다's "to pay/be liable for" sense is formal/
   lower-frequency). Don't re-add them here without a better second sense.
   For every case: give each real sense its own row, example, and review
   identity. Previous batch: 밥 meal/rice, 시간 time/hour, 아침 morning/breakfast,
   점심 lunch/noon, 저녁 evening/dinner; previous batch 2: 병 bottle/illness, 일기
   diary/weather, 양식 Western food/form; previous batch 3: 검사 examination/prosecutor,
   감독 director/supervisor, 가정 household/assumption, 문구 stationery/phrase;
   previous batch 3: 과정 process/course, 인상 impression/price increase; 2026-07-04 batch 7: 분 minute/honorific counter, 새 bird/new, 통화 phone call/currency; plus one extra sense in the already-split 배 belly/pear/boat trio; 2026-07-04 batch 8: 있다 have/exist, 없다 not-have/not-exist, 보내다 send/spend time; 2026-07-04 batch 10: 대기 atmosphere/waiting, 시점 point in time/viewpoint, 차례 turn/ancestral rites/table of contents. ⚠️ A `senseKey` must mark a **genuinely distinct meaning**; the
   audit now hard-fails identical
   senseKeys within a group, but it cannot judge semantics — read the
   meanings (PR #54 removed 74 rows of fake polysemy that had been tagged
   purely to dodge the duplicate check).
2. **Curriculum polish after the dedupe passes — ✅ done (2026-07-03).** All 51
   subtitle/count mismatches were corrected to the real `newWordIds.length`,
   and all 14 thin lessons (down to 1 genuinely unfoldable single-lesson stage,
   `w218-theme-264`, left alone since it has no same-stage sibling) were folded
   into same-stage siblings — 312 → 298 lessons. `audit-words-data.mjs` now
   hard-fails a subtitle/count mismatch and warns on any lesson under 4 words
   that *has* a foldable same-stage sibling, so this can't silently drift
   again.
3. **Curation queue burn-down.** Every row has effective values on every axis,
   but roughly a third are `inferred`, not hand-verified (~660 rows each for
   `register`/`speechLevel`/`morphTag`, ~260 for `originType`; `hanja` is
   explicit on only 2 rows). Use the Word Bank's **Needs curation** filter +
   **Curation priority** sort to verify in batches; re-run the audit and read
   its **Annotation sources** line for current counts.
4. **Honorifics as a systematic register axis.** The honorific verb table and
   W19 lesson shipped, but subject-honorific vs listener-politeness is not yet
   consistently encoded on rows (`register`/`speechLevel` carry part of it).
5. **Pronunciation scoring — needs an owner decision.** The shipped scorer is a
   browser-SpeechRecognition transcript-match + duration stub. True segmental/
   prosodic (phoneme-level) scoring is not realistically achievable client-side
   with no build step and no backend; either accept the stub as final for this
   architecture or explicitly scope a backend/service. Do not silently attempt
   it.

Ship **depth before breadth**: finishing sense-split, curation, and curriculum
polish on the existing ~1,900 senses beats adding more flat words.

---

## 10. Risk register

| Risk | Why likely | Mitigation (status) |
|---|---|---|
| Flat English↔Korean mapping teaches wrong usage | Register/origin-sensitive alternatives | multiple senses per gloss + scenario labels — **open**, this is the M2 work in §9. A new risk surfaced here in practice: duplicates disguised as senses to satisfy the audit (see #54); mitigated by hardened audit + read-the-meanings rule |
| Romanization becomes a crutch | English speakers over-trust Roman letters | Hangul-first UI, fade romanization (✅ done) |
| Recognize-but-can't-produce | Korean needs form generation | retrieval + inflection practice from day one (✅ done — M3 engine) |
| Pronunciation ignored until later | Phonology affects lexical identity early | minimal-pair work from week one (✅ done — M4 drills; scoring depth still open, §9 item 5) |
| Content team can't scale morphology | Forms proliferate fast | separate authored lexemes from generated forms (✅ done — M3) |
| Assessment only measures recognition | Recognition overestimates ability | track recall, latency, inflection, reuse (✅ done — M6) |

---

## 11. Milestone reference sheet

At-a-glance map of the whole build. Everything is shipped except **M2** — the
live finalization work is listed in §9. Effort is a rough band, not a schedule.
Status is honest as of 2026-07-04 (post-#54).

| ID | Milestone | Depends on | Primary files | Ships when (acceptance) | Effort | Status |
|---|---|---|---|---|---|---|
| **M0** | Shipped baseline: script course, Leitner SRS, Word Bank, W0–W16 lessons | — | `app.js`, `words_curated_core.js`, `words_lesson_plan.js`, `alphabet_*` | (already live) | — | ✅ done |
| **M0.5** | W17–W19 grammar-mechanics track (endings/register, negation, connectives, modifiers, honorifics, irregulars) | M0 | `words_curated_core.js`, `words_lesson_plan.js` | 6 lessons render; strict audit clean | S | ✅ done (#42) |
| **M1** | **Data axes** — additive `senseKey`/`register`/`speechLevel`/`originType`/`hanja`/`irregularFamily`/`morphTag` + audit enums | M0 | `words_curated_core.js` (`defineWord`), `scripts/audit-words-data.mjs` | fields optional; enums validated when present; all existing rows still pass strict | S–M | ✅ done |
| **M2** | **Sense split** — per-sense rows for polysemous lexemes (보다, 하다, 나다…) | M1 | `words_curated_core.js`, `app.js` (Word Bank + lesson render) | high-freq polysemes split; sense shown in bank + lessons | M | 🟡 partial — 94 lemmas genuinely split (see §8; 눈/다리/밤/차/맞다 added 2026-07-03, twenty-two more — 사과/뛰다/가다/싸다/들다/걸리다/지다/걸다/서다/치다/풀다/돌다/재다/짜다/차다/빠지다/붙다/사고/연기/전기/이사/소식 — added 2026-07-04; plus five early noun splits in the previous batch — 밥/시간/아침/점심/저녁; plus four more in the previous batch — 검사/감독/가정/문구; plus two more in the previous batch 3 — 과정/인상; plus four more in the previous batch — 시계/머리/목/가슴; plus three new split lemmas in the current batch — 분/새/통화; plus one extra sense in the already-split 배 trio; plus three more in batch 8 ? itda have/exist, eopda not-have/not-exist, bonaeda send/spend time; plus four more in the current batch ? dol first birthday, ilsik solar eclipse, jungsik lunch, jeongri cleanup/organization). The "128 rows / 94 lemmas" figure previously reported here was wrong (74 disguised-duplicate rows, corrected in #54) and has been removed. Most polysemous lemmas remain untagged; real work continues per §9 item 1 |
| **M3** | **Inflection engine** — stem→form generator + recognizer | M1 | new `words_inflect.js`, `app.js` (`buildWordLessonQuestions`, form checkpoints) | engine output matches authored forms for a test set; drives `form-production`/`form-recognition` | M–L | ✅ done |
| **M4** | **Pronunciation layer** — minimal-pair drills, spelling/sounds-like, segmental+prosodic scoring stub | M0 (audio); M1 optional | `app.js`, `audio/` + `generate_assets.py`, new drill data | drills exist for the §6.2 pitfall sets; every card shows both layers | M | ✅ done |
| **M5** | **Authoring to Core 1000** — grow ~230 → 800–1,000 senses vs official level-1 list | M1 (schema); M3 (leverage) | `words_curated_core.js`, `words_lesson_plan.js` | ≥800 senses; numbers/counters + Sino-Korean families as explicit themes | L (ongoing) | ✅ done — 1,995 unique curated senses (corrected to 1,918 post-#54 after 74 disguised duplicates were removed, see §8; +77 across fifteen M2 batches); strict audit clean; no orphan words |
| **M6** | **Assessment & analytics** — per-item review events, mastery model, retention metrics | M0 (SRS); M2 | `app.js` (state + review-event log), new metrics view | latency + error-type logged per item; 1-week/1-month retention surfaced | M | ✅ done |

Guiding rule: **depth before breadth.** M1→M3 (correct, register-aware,
inflectable senses) matter more than rushing M5 (raw volume).

---

## 12. Dependency & implementation order (when / where / how)

### 12.1 Dependency graph

```
M0 (shipped baseline)
 ├─▶ M1 Data axes ──┬─▶ M2 Sense split ──▶ M6 Assessment & analytics
 │                  ├─▶ M3 Inflection engine ─┐
 │                  └─▶ M5 Authoring to Core 1000 ◀─┘ (M3 makes M5 cheaper)
 └─▶ M4 Pronunciation layer            (needs only M0 audio; start any time)
```

Historical read: **M1 was the gate** — everything else depended on the data
axes landing first, with M4 as the one independent track. As of PR #54 every
node in this graph is shipped except **M2**, so the graph is now history; the
live work list is §9.

### 12.2 Cross-cutting rules (apply to every milestone)

- **Additive & backward-compatible.** New schema fields are optional; existing
  curated rows and lessons must keep passing `node scripts/audit-words-data.mjs --strict`.
- **Vanilla/static.** New data goes in a plain browser-global file loaded before
  `app.js` (like `words_curated_core.js`). No build step.
- **Cache discipline.** Any change to a loaded file → bump `CACHE_NAME` in `sw.js`
  and the `?v=...` strings in `index.html` + `sw.js`; verify with
  `node scripts/audit-app-shell.mjs`.
- **Audio.** New Korean text → regenerate assets (`python generate_assets.py`),
  never hand-edit `audio_map.js`.
- **PRs.** One milestone per PR (or smaller); draft PR, owner squash-merges.

### 12.3 Per-milestone: preconditions · where · how · done-when

**M1 / M3 / M4 / M5 / M6 — ✅ shipped.** Their build instructions are retired;
see git history (PRs #40–#53) if you need the how. What shipped, in one line
each: M1 data axes live on every row with `annotationSource` provenance; M3
`words_inflect.js` generator/recognizer is gold-set-verified in the audit; M4
minimal-pair drills + spelling/sounds-like layers + a SpeechRecognition scoring
stub; M5 ~1,900 curated senses with every row in a lesson; M6 per-item review
events feeding a metrics view.

**M2 — Sense split (open; the only unfinished milestone).**
- *Preconditions:* none — M1 is shipped.
- *Where:* `words_curated_core.js` (data); Word Bank + lesson renderers in
  `app.js` already display senses correctly (verified with 말/쓰다).
- *How:* work through the genuinely polysemous high-frequency lemmas (candidate
  list in §9 item 1). For each: give **every** sense of the lemma its own row
  with a distinct `senseKey`, sequential `senseNo`, its own example sentence,
  and its own review identity. Author real second senses — do **not** re-add
  the same meaning under a new key (the audit hard-fails identical senseKeys
  in a group, and PR #54 is the cautionary tale). New example sentences need
  audio regeneration (`python generate_assets.py`).
- *Done when:* the high-frequency polyseme list in §9 is worked through, each
  with distinct senses visible in the Word Bank and targeted by lessons, and
  the strict audit passes.

---

## Anchor sources

**Product/curriculum:** Standard Curriculum for Korean Language (level aims,
assessment); Basic Korean Dictionary (graded lexicon, conjugational support);
NIKL *The Korean Alphabet, Hangeul* (syllable blocks); NIKL *Everything You
Wanted to Know about the Korean Language* (lexical strata); Sejong POS +
learner-corpus papers (computational structure); NIKL learner vocabulary list
and 국제 통용 한국어 표준 교육과정 (graded vocabulary).

**Pedagogy:** spacing meta-analysis (*Language Learning*); Karpicke & Roediger
(retrieval practice); Nation, *The Four Strands*.
