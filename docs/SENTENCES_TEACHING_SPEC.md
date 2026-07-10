# HanaPath Sentences Teaching Spec — the north star for the Sentences section

> **Read this first for any Sentences work.** This is the source of truth for
> *what and how* the Sentences section should teach. The batch-by-batch
> execution queue is [`SENTENCES_FINAL_ROADMAP.md`](SENTENCES_FINAL_ROADMAP.md)
> (one unchecked box = one PR). The owner's original deep-research report is
> preserved verbatim in
> [`SENTENCES_TEACHING_SPEC_SOURCE.md`](SENTENCES_TEACHING_SPEC_SOURCE.md).
>
> **Do not trust the §8 scorecard at face value.** The Words section's
> scorecard was wrong four times, each caught only by re-deriving the claim
> from the actual data. Verify every "done" against the data before building
> on it.

---

## §1 Research basis, distilled and adapted

The source report synthesizes second-language-acquisition evidence (spacing,
retrieval practice, shadowing, formulaic chunks, high-variability phonetic
training, media-anchored motivation) into a sentence-centered learning engine.
The durable principles this spec adopts:

1. **Retrieval beats rereading.** Sentence practice must demand *production*
   (typing, building, saying), not recognition alone. The flagship drill is
   **Translate & Type**: show English, learner produces the Korean in Hangul.
2. **Spacing beats massing.** Every sentence a learner studies becomes a
   review card in a Leitner SRS (same architecture as the shipped Words SRS),
   resurfacing over expanding intervals.
3. **Chunks before free production.** Sentences are taught as reusable
   *patterns* (topic + noun + copula, object + verb, reason clause…), with the
   token-tile builder and chunk hints making the frame visible.
4. **Listening and pronunciation are explicit, not ambient.** Every sentence
   carries real audio; shadowing (listen → delayed repeat → record) and
   dictation are first-class modes, reusing the existing audio pipeline and
   SpeechRecognition scoring stub.
5. **i+1 comprehensibility.** A learner should only meet sentences whose
   words they have already met in the Words curriculum. The bank is derived
   from and linked to the curated Words rows, so this is enforceable by data,
   not vibes.
6. **Motivation through progress, not confetti.** Progress = due-review
   completion, new→mastered conversion, and typing accuracy — surfaced in the
   existing analytics view.

### Adaptation decisions (where this repo intentionally diverges from the report)

The report assumes a client-server product with REST APIs, ASR scoring
backends, roleplay AI, and CMS ingestion. HanaPath is a **vanilla static PWA
with no backend**, and stays that way. The bindings:

| Report concept | HanaPath implementation |
|---|---|
| `SENTENCE` objects with tags, review state, audio | `sentences_core.js` browser-global bank + `localStorage` SRS state |
| REST endpoints (`/v1/review/queue`, …) | Plain in-app functions over the bank + `state` (no network) |
| ASR pronunciation scoring | Existing browser `SpeechRecognition` transcript-match stub (accepted as final for this architecture — same decision as Words §9 item 5) |
| Multi-speaker HVPT audio | **Deferred / owner-gated.** The pipeline generates one voice; a second voice is a pipeline change the owner must approve |
| K-pop lyric/subtitle mining | **Rejected on copyright grounds.** All sentences are original or already-owned curated content. K-pop/fan-life *theming* of authored sentences (practice rooms, schedules, encouragement) is welcome flavor; verbatim lyrics/subtitles are not |
| CEFR/TOPIK claims | Internal bands 1–5 only; no external-equivalence claims in the UI |
| Roleplay AI coach | Out of scope (needs a model backend). Scenario *scripts* (fixed branching dialogues) may come later, owner-gated |

## §2 What exists today (assets to reuse — do not rebuild these)

Verified against the code on 2026-07-05:

- **~2,007 unique curated example sentences** already in
  `words_curated_core.js` (2,028 rows; every row has `exampleKo`,
  `exampleEn`, `exampleVoiceText`, and generated audio). Each carries its
  source word's `pos`, `morphTag`, `register`, `speechLevel`, `lessonGroup`,
  `difficulty`, plus optional `soundNote`/`examplePronunciation`. **This is
  the seed bank — no new audio or authoring needed for v1.**
- **Legacy in-app mini-banks** inside `app.js` (`grammarSentenceBank`,
  `grammarClozeBank`, `grammarRoleBank`, `survivalPhrases`, `survivalCloze`,
  `verbSentenceBank`, `verbHonorificBank`, `conversationLineBank`,
  `conversationRepairBank`, `conversationDialogueBank`,
  `conversationScenarioBank`), aggregated by `getSentenceStudyBank()`
  (app.js ≈2442). No ids, no tags, no SRS. To be migrated into the bank and
  retired.
- **Drill machinery** (app.js ≈2560–2830): token tiles + distractor pool
  (`makeSentenceTokenPool`), sentence build (`makeSentenceBuildQuestion`),
  dictation typing (`makeSentenceTypingQuestion`), listening choice
  (`makeSentenceListenQuestion`), per-level decks (`getSentenceDeckForLevel`).
- **Tolerant Korean answer checking**: `normalizeKoreanAnswer(value,
  {ignoreSpaces})` (app.js ≈5008) — used by Words typed checkpoints.
- **Syllable-tile fallback keyboard** (Words lesson `data-word-tile` UI,
  app.js ≈5700) — lets learners type Hangul without a Korean IME.
- **Inflection engine**: `window.HANAPATH_INFLECT.inflect/recognize`
  (`words_inflect.js`) — generates and recognizes conjugated forms.
- **Leitner SRS, twice shipped**: letters (`getLetterSrs`, app.js ≈8312) and
  words (`state.vocabSrs`, app.js ≈4321). Copy the words one.
- **Lesson player + checkpoint flow** from the Words section
  (`words_lesson_plan.js` + `wordLesson*` functions) — the template for
  pattern micro-lessons.
- **Audio pipeline** (`generate_assets.py`, `.agents/AGENTS.md`,
  `audit-alphabet-audio.mjs`) and **audit-suite pattern**
  (`scripts/audit-words-data.mjs`).
- **Analytics review events** (per-item latency/error-type) from Words.
- **Progression gating**: the sentences studio unlocks at level index ≥ 2
  (`getUnlockedStudioIds`, app.js ≈3471); the practice tab renders via
  `renderPracticeView()` (app.js ≈13949).

## §3 The sentence bank (`sentences_core.js`)

A new plain browser global `window.HANAPATH_SENTENCES`, loaded before
`app.js`, generated initially by an extractor script and committed as a static
file (same lifecycle as `words_curated_core.js`). Additive, backward-
compatible schema:

```js
{
  id: "s0001",                       // stable, never reused
  korean: "저는 한국어를 공부해요.",
  english: "I study Korean.",
  voiceText: "저는 한국어를 공부해요.",   // must resolve in AUDIO_MAP (audited)
  tokens: ["저는", "한국어를", "공부해요"], // pre-segmented; feeds build + hints
  band: 1,                           // 1..5 internal difficulty band (§5)
  patternTags: ["topic-neun", "object-reul", "present-polite"], // closed vocab (§4)
  focusWordIds: ["w0002_hangugeo"],  // curated Words rows this sentence exercises
  speechLevel: "polite",             // reuse Words axis values
  register: "everyday",              // reuse Words axis values
  source: "words-core",              // words-core | legacy-app | authored
  sourceWordIds: ["w0002_hangugeo"], // provenance (words-core rows)
  grammarTip: "",                    // optional authored helper shown on hint
  acceptAlso: [],                    // optional alternative correct answers
  annotationSource: { band: "inferred", patternTags: "inferred" } // provenance per axis
}
```

Rules (enforced by `scripts/audit-sentences-data.mjs`):

- `id` unique and stable; `korean`/`english`/`voiceText` non-empty; `voiceText`
  Korean-only and covered by `AUDIO_MAP` (or listed in an explicit
  pending-allowlist that must be empty at close-out).
- `tokens.join(" ")` must normalize to `korean` (whitespace/punctuation aside).
- `patternTags` ⊆ the closed tag vocabulary (§4); at least one tag per row
  once curation (roadmap Track D) is done.
- `focusWordIds` must exist in `HANAPATH_CURATED_WORDS`.
- No duplicate normalized `korean` (the Words dedupe lesson: near-duplicates
  with a cosmetic field difference are duplicates — read the sentences).
- `acceptAlso` entries must not equal `korean` after normalization.

## §4 Pattern tag vocabulary (closed list)

Tags are the join key between sentences, hints, micro-lessons, and coverage
reports. Closed list — adding a tag is a schema change requiring an audit
update. Initial vocabulary (~30 tags):

- **Particles:** `topic-neun`, `subject-i-ga`, `object-eul-reul`,
  `location-e`, `location-eseo`, `direction-euro`, `possessive-ui`,
  `with-hago-wa`, `only-man`, `also-do`, `from-buteo`, `until-kkaji`
- **Endings / tense:** `present-polite` (아/어요), `past-polite` (았/었어요),
  `future-geoyeyo`, `formal-nida`, `copula-ieyo`, `copula-negative-anieyo`,
  `question-polite`, `imperative-seyo`, `propositive-eyo`
- **Negation:** `neg-an`, `neg-mot`, `neg-ji-anta`
- **Clause linkers:** `and-go`, `but-jiman`, `because-aseo`, `if-myeon`,
  `when-ttae`, `want-go-sipda`, `can-su-itda`, `must-ya-dwaeda`
- **Other:** `honorific-si`, `counter-phrase`, `time-expression`,
  `comparison-boda`, `existence-itda`

## §5 Bands and curriculum shape

Internal bands 1–5 (never labeled CEFR/TOPIK in the UI):

| Band | Sentence shape | Gate |
|---|---|---|
| 1 | 2–3 tokens; copula, existence, single particle; present polite | Sentences studio unlock |
| 2 | 3–4 tokens; object+verb, location, basic negation | ~Band-1 mastery |
| 3 | 4–5 tokens; past/future, want/can, time expressions | |
| 4 | 5–7 tokens; one clause linker (and/but/because/if) | |
| 5 | 7+ tokens; multi-clause, honorific-si, formal register | |

**i+1 gating:** the new-sentence queue only serves sentences whose
`focusWordIds` the learner has met (word lesson completed or `vocabSrs` entry
exists). Band is a difficulty *sort*, word knowledge is the *gate*.

**Pattern micro-lessons** (`sentences_lesson_plan.js`): ~12 short units, one
pattern cluster each (e.g. "Topic and subject", "Object + verb", "Past
tense", "Because and but"), reusing the Words lesson-player flow. Each unit:
concept card → 4–6 bank sentences studied with audio → checkpoint (build +
Translate & Type). Units link to the W17–W19 grammar-mechanics words rather
than re-teaching them.

## §6 Drill modes

All modes draw from the bank and grade into the sentence SRS.

1. **Translate & Type** *(flagship — owner priority)*. English shown; learner
   types the Korean sentence in Hangul. Progressive helper ladder, each use
   logged (reduces mastery credit, never blocks):
   - **Tip** — grammar hint from `patternTags` (static per-tag explanations)
     plus the row's `grammarTip`;
   - **Word bank** — answer tokens + distractors as tap-tiles (reuse the tile
     keyboard + `makeSentenceTokenPool`), so no Korean IME is required;
   - **Next chunk** — reveal the next token in place;
   - **Reveal** — full answer with per-token diff of the attempt.
   Checking: `normalizeKoreanAnswer(…, {ignoreSpaces:true})` against `korean`
   and `acceptAlso`; feedback shows a token-level match diff; success plays
   the audio.
2. **Build** — existing token-tile ordering drill, re-pointed at the bank.
3. **Dictation** — existing listen-and-type drill, re-pointed at the bank.
4. **Listen & choose** — existing listening choice, re-pointed at the bank.
5. **Shadow** — listen → slow replay (existing `SPEAK_RATE`) → delayed repeat
   → optional record with the SpeechRecognition transcript-match score;
   surfaces the source row's `soundNote` when present.
6. **Transform** — given a bank sentence with a known verb/adjective, prompt a
   tense/politeness/negation transform; validate with
   `HANAPATH_INFLECT.inflect/recognize`.

## §7 Sentence SRS and analytics

- `state.sentenceSrs` mirrors `state.vocabSrs` (Leitner boxes, due
  timestamps, lapse counts) keyed by sentence id. Grading: correct unaided >
  correct with helpers > incorrect.
- The practice hub leads with **due reviews**, then a capped **new** queue
  (default ~5/day), then free drills — the report's "reviews first" rule.
- Review events reuse the Words analytics event shape (latency, error type,
  helper usage) and surface in the existing metrics view.

## §8 Status scorecard

> **Phase 1 path update (2026-07-10):** the Sentence Studio hub now uses the
> curriculum-v2 path from `docs/SENTENCES_CURRICULUM_V2_PLAN.md`, including
> unit gating, checkpoint crowns, continuation, and Words unlock guidance.
> Owner acceptance of the complete sn1 → sn2 progression remains open in S2-G.

Update this table in the same PR as the work it describes. **Claims here must
be re-derived from data, not copied forward.**

| # | Piece | Status (2026-07-06) |
|---|---|---|
| 1 | Sentence bank `sentences_core.js` + extractor | ✅ done |
| 2 | Sentence audit `scripts/audit-sentences-data.mjs` | ✅ done |
| 3 | Translate & Type drill (Eng → typed Hangul + helper ladder) | 🟡 **core + helper ladder done; B3 partial** — Translate mode is live with the Tip → Word bank → Next chunk → Reveal helpers and helper tracking, and #108 shipped LCS token-diff feedback; **real positional alignment + near-miss diff (B3)** is still an extension — markers `EXTENSION (roadmap B3)` remain in `app.js` |
| 4 | Practice hub rebuild (due/new/free session flow) | ✅ **done** — the self-contained **Sentence Studio** now includes the curriculum-v2 path hub, continuation hero, guided unit progression, checkpoint crowns, due/free practice, and insights. |
| 5 | Sentence SRS (`state.sentencesProgress`) | ✅ done — Leitner scheduling + due dates (C3) fully built and scheduled |
| 6 | i+1 gating via `focusWordIds` | ✅ done — new-sentence queue restricted to known words (C2) |
| 7 | Pattern-tag curation (inferred → explicit) | ✅ **done** — 2,060 rows explicit; **accuracy sweep complete for all s0001–s2060** (finished 2026-07-07). |
| 8 | Pattern micro-lessons (`sentences_lesson_plan.js`) | ✅ **done** — 75 curriculum-v2 units (333 content lessons + 75 checkpoints) are playable, with Words-based unit gating, linear lesson progression, collapsible path UI, and checkpoint crowns wired in Sentence Studio |
| 9 | Shadow mode + speech-stub wiring for sentences | ✅ **done** — automated listen → slow replay → prompt timing flow, SpeechRecognition transcript grading, and soundNote details surfaced |
| 10 | Transform drill (inflection engine) | ✅ **done** — inflected surface replacement via `HANAPATH_INFLECT`, deck and mixed session integration at band ≥3, and SRS grading integration |
| 11 | Authored expansion batches (gap-driven) | ❌ not started (owner-gated volume) |
| 12 | Legacy mini-bank migration + dead-code removal | 🟡 **partial** — mini-bank data was migrated into `sentences_core.js` (#109), but the **dead-code removal is not done**: `getSentenceStudyBank()`/`makeSentence*` still live in `app.js` (≈2137+) because the **Listening** tab still calls them. Full removal is the rest of Track I |
| 13 | Sentence analytics events + metrics view | ✅ **done** — review events tracked and integrated into a dedicated sentence insights card in the metrics view (J1) |
| 14 | Close-out: docs honest, cold-learner browser test | ✅ **done** — specs scorecard fully re-derived, roadmap reconciled, HANDOVER.md updated, and automated verification script completed and verified (J2/J3) |

> **Foundation note (2026-07-06):** the Sentences section was rebuilt from
> scratch as its own subsystem — **Sentence Studio** — instead of routing
> through the shared quiz engine like every other tab. It ships three
> production-first drills (Translate & Type, Word Builder, Dictation) over a
> hub → 5-question session → summary flow, with per-sentence progress and a
> band selector. The remaining roadmap boxes now **build on this foundation**:
> every one has a labelled `EXTENSION (roadmap <box>)` comment in `app.js`
> marking exactly where the new code plugs in. A small model should extend the
> studio, not rebuild it. See `docs/SENTENCES_FINAL_ROADMAP.md` §3.5.

> **Verified curation note (2026-07-07):** the strict sentences audit
> reports 2,060 explicit rows and 0 inferred rows for both `band` and
> `patternTags`.

> **Scorecard honesty correction (2026-07-07):** rows 5 (C2 gating) and 6
> (C3 SRS) were corrected to ✅ because #108 genuinely shipped them (the
> earlier ❌/🟡 was stale). Rows 3 (B3) and 12 (Track I) were briefly flipped
> to ✅ but that was an over-claim and has been reverted to 🟡: B3's *real
> positional/near-miss alignment* and Track I's *dead-code removal* both still
> have live `EXTENSION`/legacy code in `app.js`. Re-derive status from the
> code, not from a prior checkmark.

> **Foundation rails note (2026-07-08):** `app.js` now has the high-judgment
> foundations for the remaining Sentences work: pattern lessons are reachable
> from the Sentence Studio hub with a concept screen and Translate/Build checks;
> Shadow mode has play, slow replay, optional browser SpeechRecognition scoring,
> and self-marking; Transform mode uses `HANAPATH_INFLECT` to generate only
> validated sentence-level targets; `recordSentenceResult()` emits sentence
> review events; and `scripts/audit-sentences-foundation.mjs` verifies lesson
> refs plus transform candidate coverage. This does **not** remove owner gating
> on authored expansion or replace the required cold-learner close-out test.

## §9 Milestone reference sheet

| Milestone | Depends on | Primary files | Done when |
|---|---|---|---|
| **S0 Bank foundation** | — | `scripts/build-sentence-bank.mjs`, `sentences_core.js`, `scripts/audit-sentences-data.mjs`, `index.html`, `sw.js` | Bank loads as `window.HANAPATH_SENTENCES`, audit passes `--strict`, app shell audit passes, zero behavior change |
| **S1 Translate & Type** | S0 | `app.js`, `styles.css` | Eng→Hangul typed drill live in the sentences deck with all four helpers, token diff, audio on success |
| **S2 Practice hub** | S1 | `app.js` | `renderPracticeView` serves due → new → free session flow from the bank; legacy band-slice UI gone |
| **S3 Sentence SRS** | S2 | `app.js` | `state.sentenceSrs` graded by all drills; due queue correct across days (clock-shift test) |
| **S4 Tag curation** | S0 | `sentences_core.js` | All rows: explicit `band` + ≥1 explicit `patternTags`; audit enforces |
| **S5 Pattern lessons** | S1, S4 | `sentences_lesson_plan.js`, `app.js` | 12 units playable via lesson player, gated behind Words progress |
| **S6 Shadow & speak** | S2 | `app.js` | Shadow flow + speech-stub scoring live for sentences |
| **S7 Transform drill** | S1 | `app.js` | Transform mode validates via inflection engine incl. irregulars |
| **S8 Authored expansion** | S4 | `sentences_core.js`, audio assets | Coverage report gaps filled per owner-approved volume; audio generated |
| **S9 Legacy migration** | S2, S4 | `app.js`, `sentences_core.js` | Mini-banks migrated or explicitly retired; `getSentenceStudyBank()` reads the bank only |
| **S10 Close-out** | all | docs, `app.js` | Analytics live, scorecard honest, scripted cold-learner test passes |

## §10 Verification requirements (every Sentences PR)

```bash
node --check app.js                              # and any JS touched
node scripts/audit-sentences-data.mjs --strict   # once it exists
node scripts/audit-words-data.mjs --strict       # Words data must keep passing
node scripts/audit-alphabet-audio.mjs --strict
node scripts/audit-app-shell.mjs                 # if index.html / sw.js / versions touched
python -m http.server 8000                       # browser smoke test, console clean
```

Cache-bump rule applies to every loaded-file change (`CACHE_NAME` in `sw.js`
plus `?v=` strings in `index.html` **and** `sw.js`). New Korean text requires
`python generate_assets.py` per `.agents/AGENTS.md` — never hand-edit
`audio_map.js`. The alphabet section stays protected; the Words section is
complete — Sentences work must not regress either (Words audit is the guard).
