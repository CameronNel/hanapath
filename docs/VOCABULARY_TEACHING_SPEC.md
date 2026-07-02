# HanaPath Vocabulary Teaching Spec (pedagogy & linguistics north star)

Date: 2026-07-02
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

Grounded in the shipped code (main) as of 2026-07-02. Legend: ✅ solid ·
🟡 partial · ❌ missing.

| Spec pillar | Status | Where it stands |
|---|---|---|
| Hangul-first, romanization secondary | ✅ | UX is Hangul-primary; romanization is a support layer |
| Script → block → batchim course | ✅ | Full alphabet module (drill lab, skill-SRS, 72 audio tokens, batchim) |
| Staged curriculum word→phrase→sentence | ✅ | W0–W16 thematic stages + checkpoint ladder + W17–W19 grammar track (merged) |
| Lexeme + forms, not flat pairs | 🟡 | `forms`/`grammarRole`/`pattern`/`formNote` exist, but forms are **hand-authored**, no engine |
| Particles & endings first-class | ✅ | Function-word entries with forms/grammarRole/contrastWith/pattern |
| Honorifics (subject vs listener) | 🟡 | Honorific verb table + W19 lesson (shipped); not yet a systematic register axis |
| SRS backbone | ✅ | Leitner scheduler (`vocabSrs`, 5m/20m/1d/3d/7d…) |
| Bidirectional retrieval | ✅ | ko↔meaning, type-ko, sentence-blank, function-usage, audio |
| Irregular families as trigger-based | 🟡 | W19 track (shipped) + inline `formNote`; no generation engine yet |
| **Sense-level polysemy** | ❌ | one row = one `meaning` string |
| **Word-origin tagging (native/Sino/loan)** | ❌ | no `originType`/`hanja` |
| **Register as a data axis** | ❌ | free-text `usageNote` only |
| **Morph tags (Sejong/UD)** | ❌ | coarse learner `pos` only |
| **Pronunciation training (minimal pairs, 3-way stops)** | ❌ | at the vocab layer; exists only in the alphabet phase |
| **Pronunciation scoring (segmental + prosodic)** | ❌ | TTS playback only |
| Rich review-event analytics | 🟡 | lesson completion + SRS boxes; no per-item latency/error-type events |
| Numbers / counters / native-vs-Sino | 🟡 | thin; not a dedicated theme yet |
| Vocabulary volume | 🟡 | ~230 curated senses (main) — around the 300–400 launch set, well short of Core 1000 |

**Read:** the hardest-to-retrofit parts (script course, Hangul-first UX, SRS,
retrieval) are already strong. The gaps cluster in the **data model depth**
(sense/register/origin/morph), the **inflection engine**, **pronunciation
training**, and **lexicon volume**.

---

## 9. Gap-driven roadmap (pedagogy-first PR sequence)

Each PR is small, additive, and audit-backed. Ordered by leverage.

1. **Data axes (foundation).** Add additive `senseKey`, `register`,
   `speechLevel`, `originType`/`hanja`, `irregularFamily`, `morphTag` to
   `defineWord`; extend `audit-words-data.mjs` to validate enums. No UI change.
   *Unlocks correct polysemy + register — the spec's #1 risk (flat mapping).*
2. **Sense split.** Break high-frequency polysemous lexemes (보다, 하다, 나다…)
   into per-sense rows sharing a `lemma`; surface sense in Word Bank + lessons.
3. **Inflection engine.** Stem→form generator + recognizer for polite/formal/
   past/honorific/attributive/negation and the §3.2 irregular families; drive
   `form-production` / `form-recognition` checkpoints from it instead of
   hand-authored strings.
4. **Pronunciation layer.** Minimal-pair drills for the §6.2 pitfalls
   (three-way stops, ㅓ/ㅗ, ㅡ/ㅜ, ㄹ), "spelling vs sounds-like" on every card,
   and a segmental + prosodic scoring stub.
5. **Authoring to Core 1000.** Grow from ~230 → 800–1,000 senses against the
   official level-1 list, with numbers/counters and Sino-Korean families as
   explicit themes.
6. **Assessment & analytics.** Per-item `REVIEW_EVENT` (latency, error-type,
   confidence); mastery model; retention scores at 1 week / 1 month; a formative
   metrics view.

Ship **depth before breadth**: a narrow, coherent system with strong script
training, register-aware senses, particle-aware frames, and reliable inflection
beats adding 5,000 more flat words.

---

## 10. Risk register

| Risk | Why likely | Mitigation |
|---|---|---|
| Flat English↔Korean mapping teaches wrong usage | Register/origin-sensitive alternatives | multiple senses per gloss + scenario labels (§7.1 PR 1–2) |
| Romanization becomes a crutch | English speakers over-trust Roman letters | Hangul-first UI, fade romanization (already largely done) |
| Recognize-but-can't-produce | Korean needs form generation | retrieval + inflection practice from day one (PR 3) |
| Pronunciation ignored until later | Phonology affects lexical identity early | minimal-pair work from week one (PR 4) |
| Content team can't scale morphology | Forms proliferate fast | separate authored lexemes from generated forms (PR 3) |
| Assessment only measures recognition | Recognition overestimates ability | track recall, latency, inflection, reuse (PR 6) |

---

## 11. Milestone reference sheet

At-a-glance map of the whole build. `M0`/`M0.5` are the current baseline; `M1`–`M6`
are the roadmap from §9. Effort is a rough band, not a schedule. Status is honest
as of 2026-07-02.

| ID | Milestone | Depends on | Primary files | Ships when (acceptance) | Effort | Status |
|---|---|---|---|---|---|---|
| **M0** | Shipped baseline: script course, Leitner SRS, Word Bank, W0–W16 lessons | — | `app.js`, `words_curated_core.js`, `words_lesson_plan.js`, `alphabet_*` | (already live) | — | ✅ done |
| **M0.5** | W17–W19 grammar-mechanics track (endings/register, negation, connectives, modifiers, honorifics, irregulars) | M0 | `words_curated_core.js`, `words_lesson_plan.js` | 6 lessons render; strict audit clean | S | ✅ done (#42) |
| **M1** | **Data axes** — additive `senseKey`/`register`/`speechLevel`/`originType`/`hanja`/`irregularFamily`/`morphTag` + audit enums | M0 | `words_curated_core.js` (`defineWord`), `scripts/audit-words-data.mjs` | fields optional; enums validated when present; all existing rows still pass strict | S–M | ✅ done |
| **M2** | **Sense split** — per-sense rows for polysemous lexemes (보다, 하다, 나다…) | M1 | `words_curated_core.js`, `app.js` (Word Bank + lesson render) | high-freq polysemes split; sense shown in bank + lessons | M | ⬜ not started |
| **M3** | **Inflection engine** — stem→form generator + recognizer | M1 | new `words_inflect.js`, `app.js` (`buildWordLessonQuestions`, form checkpoints) | engine output matches authored forms for a test set; drives `form-production`/`form-recognition` | M–L | ⬜ not started |
| **M4** | **Pronunciation layer** — minimal-pair drills, spelling/sounds-like, segmental+prosodic scoring stub | M0 (audio); M1 optional | `app.js`, `audio/` + `generate_assets.py`, new drill data | drills exist for the §6.2 pitfall sets; every card shows both layers | M | ⬜ not started |
| **M5** | **Authoring to Core 1000** — grow ~230 → 800–1,000 senses vs official level-1 list | M1 (schema); M3 (leverage) | `words_curated_core.js`, `words_lesson_plan.js` | ≥800 senses; numbers/counters + Sino-Korean families as explicit themes | L (ongoing) | ⬜ not started |
| **M6** | **Assessment & analytics** — per-item review events, mastery model, retention metrics | M0 (SRS); M2 | `app.js` (state + review-event log), new metrics view | latency + error-type logged per item; 1-week/1-month retention surfaced | M | ⬜ not started |

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

Read it as: **M1 is the gate.** Almost everything of value depends on the data
axes landing first. M4 (pronunciation) is the one independent track — it can run
in parallel from day one because it only needs the existing audio system.

### 12.2 Cross-cutting rules (apply to every milestone)

- **Additive & backward-compatible.** New schema fields are optional; existing
  curated rows and lessons must keep passing `node scripts/audit-words-data.mjs --strict`.
- **Vanilla/static.** New data goes in a plain browser-global file loaded before
  `app.js` (like `words_curated_core.js`). No build step.
- **Cache discipline.** Any change to a loaded file → bump `CACHE_NAME` in `sw.js`
  and the `?v=...` strings in `index.html` + `sw.js`.
- **Audio.** New Korean text → regenerate assets (`python generate_assets.py`),
  never hand-edit `audio_map.js`.
- **PRs.** One milestone per PR (or smaller); draft PR, owner squash-merges.

### 12.3 Per-milestone: preconditions · where · how · done-when

**M1 — Data axes.**
- *Preconditions:* none beyond M0.
- *Where:* `defineWord()` in `words_curated_core.js`; validation in
  `scripts/audit-words-data.mjs`.
- *How:* (1) allow the new optional fields through `defineWord` (pass-through like
  `forms`/`grammarRole`); (2) add enum constants (`register`, `speechLevel`,
  `originType`, `irregularFamily`) and validate them **only when present** in the
  audit; (3) backfill the highest-value existing rows opportunistically. No UI
  change required.
- *Done when:* audit strict-passes with several rows carrying the new fields and
  all legacy rows untouched.

**M2 — Sense split.**
- *Preconditions:* M1 (needs `senseKey`/`senseNo`).
- *Where:* `words_curated_core.js` (data), `app.js` Word Bank + lesson renderers.
- *How:* split a shortlist of high-frequency polysemes into multiple rows sharing
  one `lemma` but distinct `senseKey`; ensure the Word Bank groups senses under a
  lemma and lessons target a single sense.
- *Done when:* 보다/하다/나다 (and a few more) show distinct senses with their own
  examples and review identity.

**M3 — Inflection engine.**
- *Preconditions:* M1 (needs `irregularFamily` + structured `inflections`).
- *Where:* new `words_inflect.js` (pure functions on `window`), consumed by
  `buildWordLessonQuestions`/`generateWordQuestionFor` in `app.js`.
- *How:* implement stem→form generation for the §3.1 scope + §3.2 irregular
  families and a recognizer; validate generated forms against a hand-authored
  gold set in the audit; switch `form-production`/`form-recognition` checkpoints
  to the engine.
- *Done when:* engine reproduces the authored forms for the gold set and powers
  at least one lesson's form checkpoints.

**M4 — Pronunciation layer.**
- *Preconditions:* M0 audio only (independent track).
- *Where:* `app.js` (new drill mode + card "sounds-like" line), `audio/` assets.
- *How:* author minimal-pair sets for the §6.2 pitfalls (three-way stops, ㅓ/ㅗ,
  ㅡ/ㅜ, ㄹ, batchim); add a discrimination drill; render "spelling" vs
  "sounds-like" on every word card; stub a segmental+prosodic score field.
- *Done when:* a learner can drill 달/딸/탈-type sets and every card shows both
  pronunciation layers.

**M5 — Authoring to Core 1000.**
- *Preconditions:* M1 (schema stable); strongly benefits from M3 (engine reduces
  hand-authoring of forms).
- *Where:* `words_curated_core.js`, `words_lesson_plan.js`.
- *How:* author in small batches against the official level-1 list, re-ranked by
  frequency/lesson fit; add numbers/counters and Sino-Korean families as explicit
  themes; keep 5–6 items per grammar lesson, 6–8 per vocab lesson.
- *Done when:* ≥800 curated senses, strict audit clean, no orphan words.

**M6 — Assessment & analytics.**
- *Preconditions:* M0 (SRS) + M2 (sense-level identity to attribute events to).
- *Where:* `app.js` state (`vocabSrs` + a new review-event log), a metrics view.
- *How:* log per-item `{result, latency, errorType, confidence}` events; compute
  mastery + 1-week/1-month retention; surface a formative dashboard.
- *Done when:* review events persist per item and retention/error metrics are
  visible.

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
