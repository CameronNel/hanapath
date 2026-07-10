# Handover — hanapath (Korean learning PWA)

Snapshot for the next contributor (human or agent) picking up this project.

## Repo & state
- **Branch:** `main` is the single source of truth; completed work is merged there, and active work lives on feature branches / draft PRs.
- **App shape:** vanilla static PWA — **no build step, no framework, no `package.json`**. The core is one large file `app.js` (~17.4k lines) loaded as a plain browser script, plus:
  - `index.html`, `styles.css`
  - `lib/hangul.js`
  - `words_curated_core.js` — 2,028 curated Words rows (`window.HANAPATH_CURATED_WORDS`)
  - `words_lesson_plan.js` — the v2 Words curriculum (`window.HANAPATH_WORD_LESSONS`, sections and units)
  - `words_inflect.js` — stem→form generator/recognizer (`window.HANAPATH_INFLECT`)
  - `raw_word_meanings.js`, `korean_5000_claude_ready.csv` — the 5k raw frequency reference
  - `alphabet_skill_srs.js` — alphabet skill-SRS layer
  - `audio_map.js` — Korean-text → `.mp3` dictionary on `window.AUDIO_MAP`
  - `sw.js` — service worker (precaches the app shell)
  - `audio/` — pre-generated mp3 assets; `generate_assets.py` builds them
  - `scripts/audit-words-data.mjs`, `scripts/audit-alphabet-audio.mjs`, `scripts/audit-app-shell.mjs` — the audit suite (this repo's "tests")
- **Run it:** serve the folder over static HTTP and open `index.html` (e.g. `python3 -m http.server`). State persists in `localStorage` under key `hanapath-v1`.

## Test override — reverted (final gate closed 2026-07-04)
`TEST_UNLOCK_ALL_STAGES` in `app.js` is back to **`false`** (roadmap Track E4):
real gated progression is live — a cold learner gets alphabet stage 1 only,
Words unlocks after the alphabet completes, then lesson-by-lesson. A scripted
cold-learner test verified the chain. Flip to `true` locally (plus a cache
bump) only for testing convenience; do not ship it enabled.

The v2 Words path also has a separate testing control:
`TEST_ENABLE_WORD_SECTION_COMPLETION` shows **Complete section (test)**
buttons and crowns a whole section without playing its lessons. It is guarded
in both the renderer and handler; set it to **`false`** before any
learner-facing release. Use it only for local path, checkpoint, migration,
and downstream-section smoke testing.

## Alphabet section — complete and protected
Finished (progression, quiz-pool safety, audio normalization, accessibility,
dead-code removal, skill-SRS) across earlier PRs; details are in git history.
**Do not regress it.** The durable rules live under "Conventions to follow"
below.

## Conventions to follow
- **Alphabet progress:** always go through `getAlphabetProgress()` / `isLessonUnlocked()`. Do **not** reintroduce raw `state.phaseOneCompleted.length` or `.includes()` for gating or counting.
- **`phaseOneLessons`** (in `app.js`) is the 8-lesson Phase One curriculum. Lesson ids, in order:
  `anchor-vowels, base-consonants, block-geometry, complete-vowels, strong-consonants, batchim-basics, reading-graduation, alphabet-mastery`.
- **Audio:** look up via `lookupAudioUrl()` / `normalizeAudioKey()`, never raw `AUDIO_MAP[text]`. Misses fall back to Korean browser TTS.
- **Icon-only buttons** must use `hearIconButton(text, dataAttr)` or otherwise carry an `aria-label`.
- **Service worker:** when you change `app.js` or `styles.css`, bump `CACHE_NAME` in `sw.js` **and** the matching `?v=...` query strings in both `index.html` and `sw.js`, or returning PWA users won't pick up the change.

## How to verify changes (no test framework exists)
- **Syntax:** `node --check app.js`.
- **Logic:** extract the target function's source and run it in a Node `vm` sandbox with stubbed dependencies. `scripts/audit-alphabet-audio.mjs` demonstrates the pattern and audits Phase One audio:
  `node scripts/audit-alphabet-audio.mjs [--strict]`.
- **Browser:** Chromium is available; drive it with `playwright-core`. Serve the directory, seed `localStorage["hanapath-v1"]`, load `index.html`, assert on the DOM and capture `pageerror` events.
  - **Gotcha:** the background orbs animate forever — do **not** `await Promise.all(document.getAnimations().map(a => a.finished))` (it never resolves). Use a fixed wait instead.

## Words section planning
- **Delegation:** **Luna** owns the Words Phase 2 marathon queue in
  `docs/LUNA_WORDS_PHASE_2_BATCH_PROMPT.md`. Tooling, the top-1,000 sweep, and
  the first coherent draft lesson are complete; she continues at rank 1001,
  one pushed draft PR per batch, until credits are low. Real imports remain
  owner-gated. Keep this queue separate from Sentences PRs.
- **Current live plan:** [`docs/WORDS_CURRICULUM_V2_PLAN.md`](docs/WORDS_CURRICULUM_V2_PLAN.md).
  Its hardened owner decisions are binding; the older Words specs below are
  historical implementation references and must not override it. P1-0 through
  P1-F are merged; P1-G remains owner acceptance (live-device S1/S2 and
  migration review).
- **North star (what/how to teach):** [`docs/VOCABULARY_TEACHING_SPEC.md`](docs/VOCABULARY_TEACHING_SPEC.md) — linguistics + pedagogy requirements, a current-status scorecard (§8), milestone reference sheet (§11), and dependency/implementation order (§12).
- **Implementation plan (how it's built):** [`docs/WORDS_SECTION_MASTER_SPEC.md`](docs/WORDS_SECTION_MASTER_SPEC.md) — schema, SRS, lesson flow, screens; §25 reconciles it with the north star (schema deltas + revised PR order).
- **Shipped as of 2026-07-04 (PRs #37, #40–#54):** Hangul-first UX, script course, Leitner SRS, W0–W19 lessons (incl. the W17–W19 grammar-mechanics track), a non-laggy Word Bank, a `words_inflect.js` stem→form generator/recognizer (verified against a gold conjugation set), M1 data axes (`senseKey`/`register`/`speechLevel`/`originType`/`hanja`/`irregularFamily`/`morphTag` on every curated row, with `annotationSource` provenance), a Word Bank "Needs curation" queue, a vocab minimal-pair pronunciation drill + browser SpeechRecognition scoring stub, per-item review-event analytics (latency/error-type, feeding a metrics view), the M5 Core 2000 vocabulary expansion (true count now 2,028), and the #54 dedupe/audit-hardening pass (true count 1,918).
- **⚠️ Read this before trusting any "✅ done" in §8/§11: the self-reported scorecard has been wrong four times now**, caught only by independently re-deriving the underlying data rather than trusting the doc:
  1. `inferRegister`/`inferSpeechLevel` scanned a word's **example sentence** for politeness markers instead of the word itself — so 물 ("water") was inferred `honorific` from its example "물 주세요", and ~300 everyday nouns were mislabeled polite/honorific. Fixed in #50 (rewritten to use only structured signals: POS, lessonGroup, curated tags).
  2. The "805 curated senses" M5 milestone was inflated: 67 rows were accidental re-adds of words already curated elsewhere. Fixed in #51 — the audit now hard-fails this class of duplicate.
  3. **(2026-07-03, PR #54)** The #51 fix had a loophole: its duplicate-content check fully exempted a whole same-korean+POS group the moment *any* row in it carried a `senseKey` — so a duplicate could dodge the audit by tagging one copy with a fabricated `senseKey` (e.g. `"small"`, `"busy"`, `"hobby"`) instead of a real distinct sense. **74 rows across 65 words** (spanning M5-batch lessons w27–w73) turned out to be exactly this: the same word/meaning re-added with a slightly reworded example and a fake senseKey, not real polysemy. This inflated both the M5 volume count (1,992 → true 1,918) and the M2 sense-split count (a claimed "128 rows/94 lemmas" → true 12 genuinely-split lemmas). Fixed: the 74 rows were merged/removed (keeping the richer example per word), 2 lessons that were *entirely* duplicate content were deleted (`w27-theme-29`, `w32-theme-58`), and the audit's exemption logic was closed — a senseKey shared identically across rows in a group is now a hard error, and a pair where only one row is tagged no longer gets a free pass.
  - **Lesson for future sessions: a `senseKey` is not itself proof of real polysemy — read the actual meanings before trusting one. Verify §8/§11 claims against the actual data (counts, a gold test, a browser reload) before building on top of them or reporting further progress. Do not just read the checkmark, and do not assume an audit-passing tag is semantically honest.**
- **Words finalization is closed** — the authoritative historical checklist is **teaching spec §9**; the batch-by-batch execution record (`WORDS_FINAL_ROADMAP.md`) was deleted with `docs/archive/` on 2026-07-10 and lives in git history. Summary:
  1. **M2 sense split** — 105 lemmas are genuinely split; B1–B5 and Track C are resolved (0 singleton senseKeys). The B2 batch was silently lost in integration merge b385e77 after PR #67 merged and was restored on 2026-07-04. `피다` was declined in writing because the fire meaning belongs to `피우다`/`태우다`.
  2. **Curriculum polish** — done (2026-07-03). All 51 subtitle/count mismatches were corrected to the real `newWordIds.length`, and all 14 thin lessons (down to 1 genuinely unfoldable single-lesson stage, `w218-theme-264`, left alone since it has no same-stage sibling) were folded into same-stage siblings — 312 → 298 lessons.
  3. **Curation burn-down** — done (2026-07-04). All rows now have explicit values on all axes; the curation queue is empty.
  4. **Honorifics as a systematic register axis** — done (2026-07-04 data, surfaced in UI 2026-07-05): `honorificRole: subject|listener|humble` on 26 rows + 10 plain↔honorific `contrastWith` pairs, audit-validated and rendered in the Word Bank detail view / lesson cards.
  5. **Pronunciation scoring** — decision recorded (2026-07-04): the transcript-match stub is accepted as final for the static/no-backend architecture (reversible policy record; see roadmap §7 E1).
  6. **Audio coverage** — generated 2026-07-05; the words audit enforces full `voiceText`/`exampleVoiceText` coverage and `AUDIO_PENDING_ALLOWED` is empty.

## Sentences section planning (the current active work)
- **North star (what/how to teach):** [`docs/SENTENCES_TEACHING_SPEC.md`](docs/SENTENCES_TEACHING_SPEC.md) — research distillation + adaptation decisions (§1), verified asset inventory (§2), bank schema (§3), closed pattern-tag vocabulary (§4), bands (§5), drill modes (§6, flagship: **Translate & Type** — English shown, learner types the Hangul with a tip/word-bank/next-chunk/reveal helper ladder), SRS (§7), status scorecard (§8), milestone sheet (§9).
- **Execution queues:** [`docs/SENTENCES_CURRICULUM_V2_PLAN.md`](docs/SENTENCES_CURRICULUM_V2_PLAN.md) owns path/hub/runner work — its Phase 1 queue (S2-A–S2-G) closed 2026-07-10; Phase 2 (§5) is owner-gated. [`docs/SENTENCES_FINAL_ROADMAP.md`](docs/SENTENCES_FINAL_ROADMAP.md) is retained for Track H authored-content work and bank-level audits.
- **Verbatim research source:** [`docs/SENTENCES_TEACHING_SPEC_SOURCE.md`](docs/SENTENCES_TEACHING_SPEC_SOURCE.md).
- **Shipped: Track A (bank foundation, PR #98), Sentence Studio, and Tracks B/C/D/E/F/G/I/J1/J2/J3 (2026-07-06 → 10).** Current main includes the curriculum-v2 path through S2-F; cache version `v311` / `app.js?v=20260710q` / `styles.css?v=20260710m`. Live per-sentence facts: bank **2,060 rows**, `band` explicit on all 2,060, `patternTags` explicit on all 2,060.
  - Track A: `sentences_core.js` (2,060 rows, 100% explicit annotation), strict audit `scripts/audit-sentences-data.mjs`, app-shell wiring.
  - **Sentence Studio** — the Sentences section is a self-contained hub → 5-question session → summary flow over `HANAPATH_SENTENCES`, with drills (Translate & Type, Word Builder, Dictation, Shadow, Transform), `state.sentencesProgress` per-sentence SRS records, band selector, pattern lessons, and sentence analytics.
  - **This covers roadmap B1–B3, C1–C4, D1–D8, E1–E3, F1–F2, G1–G2, I1–I2, J1–J2.**
    - Track E (Lessons): 75 curriculum-v2 units (333 content lessons plus 75 checkpoints) are playable with linear progression gating.
    - Track F (Shadow): Listen → slow replay → delayed repeat prompt timing flow with SpeechRecognition transcript matching and soundNote detail surfacing.
    - Track G (Transform): Inflected surface replacements using `HANAPATH_INFLECT`, integrated into mixed sessions at band ≥3.
    - Track I (Legacy consolidation): Legacy mini-banks migrated into `sentences_core.js`.
    - Track J (Close-out): Sentence analytics integrated into Word insights metrics.
- Superseded plans (original blueprint, closed Words roadmap, Words research source) were archived on 2026-07-05 and deleted in the 2026-07-10 docs cleanup — recover any of them from git history.

## Open / optional (intentionally not done)
1. **Modularization:** extract alphabet/Words logic into `src/*` modules. Needs a build step first (the app is one static script by design), so deferred unless the owner asks.

## Workflow
Branch off `main`, open a **draft** PR, keep it small and single-purpose. The owner marks ready and squash-merges.
