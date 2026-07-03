# Handover — hanapath (Korean learning PWA)

Snapshot for the next contributor (human or agent) picking up this project.

## Repo & state
- **Branch:** `main` is the single source of truth; all completed work is merged, no open PRs.
- **App shape:** vanilla static PWA — **no build step, no framework, no `package.json`**. The core is one large file `app.js` (~9.6k lines) loaded as a plain browser script, plus:
  - `index.html`, `styles.css`
  - `lib/hangul.js`
  - `audio_map.js` — Korean-text → `.mp3` dictionary on `window.AUDIO_MAP`
  - `sw.js` — service worker (precaches the app shell)
  - `audio/` — pre-generated mp3 assets; `generate_assets.py` builds them
  - `scripts/audit-alphabet-audio.mjs` — audio coverage audit
- **Run it:** serve the folder over static HTTP and open `index.html` (e.g. `python3 -m http.server`). State persists in `localStorage` under key `hanapath-v1`.

## Recently completed (alphabet / Phase One review checkpoint)
- **Lock-it-in fix** — the "Lock it in" completion card no longer routes into the sentence quiz.
- **P0 — canonical progression.** `getAlphabetProgress()` is the single source of truth; progress = the longest ordered completed prefix of `phaseOneLessons`. Added `normalizeCompletedAlphabetIds()` and a load-time `migrateAlphabetProgress()` (drops unknown/duplicate ids, collapses to the ordered prefix, clears progress on profiles that never finished onboarding). Removed a shipped debug seed.
- **P1.1/1.2 — copy.** Phase One is **8 stages** (7 learning stages + the mastery capstone). Fixed stale "seven gated stages" / "previous six" copy. (Remaining "seven" references are the seven batchim final sound groups — correct, leave them.)
- **P1.3/1.5 — quiz-pool safety.** `BATCHIM_FINALS` (the 7 taught single-jamo finals + open syllable) replaces the full `FINALS` list in the `advanced`/`reading` pools, so free-practice never composes or tests complex double-jamo finals (ㄳ ㄺ ㄻ ㅄ …). `getAlphabetQuizPools()` also collapses finals/batchim to open syllables until **block geometry** is unlocked, regardless of the selected board view.
- **P1.4/1.5 — audio.** `normalizeAudioKey()` (trim + NFC) and `lookupAudioUrl()` (lazy NFC-normalized index) make audio lookups survive Unicode-equivalent Hangul; `audio_map.js` is precached by the service worker; `scripts/audit-alphabet-audio.mjs` reports Phase One audio coverage.
- **P3 — accessibility.** `bindTapToHearToken()` gives the letter-review token keyboard activation (Enter/Space) + an aria-label; `hearIconButton()` gives the `▶` hear buttons real accessible names; locked stage/unit rows no longer dim their text with `opacity` (they rely on the lock dot/muted pill and stay readable).
- **P4.2 — dead-code removal.** Removed ~610 lines: `renderAlphabetPanel` / `renderAlphabetPanelV2`, `renderCurriculum`, the dead `curriculum` data array, and their now-orphaned helpers.

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
- **North star (what/how to teach):** [`docs/VOCABULARY_TEACHING_SPEC.md`](docs/VOCABULARY_TEACHING_SPEC.md) — linguistics + pedagogy requirements, a current-status scorecard (§8), milestone reference sheet (§11), and dependency/implementation order (§12).
- **Implementation plan (how it's built):** [`docs/WORDS_SECTION_MASTER_SPEC.md`](docs/WORDS_SECTION_MASTER_SPEC.md) — schema, SRS, lesson flow, screens; §25 reconciles it with the north star (schema deltas + revised PR order).
- **Shipped as of 2026-07-03 (PRs #37, #40–#51):** Hangul-first UX, script course, Leitner SRS, W0–W19 lessons (incl. the W17–W19 grammar-mechanics track), a non-laggy Word Bank, a `words_inflect.js` stem→form generator/recognizer (verified against a gold conjugation set), M1 data axes (`senseKey`/`register`/`speechLevel`/`originType`/`hanja`/`irregularFamily`/`morphTag` on every curated row, with `annotationSource` provenance), a Word Bank "Needs curation" queue, a vocab minimal-pair pronunciation drill + browser SpeechRecognition scoring stub, and per-item review-event analytics (latency/error-type, feeding a metrics view).
- **⚠️ Read this before trusting any "✅ done" in §8/§11: the self-reported scorecard has been wrong twice already**, caught only by independently re-deriving the underlying data rather than trusting the doc:
  1. `inferRegister`/`inferSpeechLevel` scanned a word's **example sentence** for politeness markers instead of the word itself — so 물 ("water") was inferred `honorific` from its example "물 주세요", and ~300 everyday nouns were mislabeled polite/honorific. Fixed in #50 (rewritten to use only structured signals: POS, lessonGroup, curated tags).
  2. The "805 curated senses" M5 milestone was inflated: 67 rows were accidental re-adds of words already curated elsewhere (학생, 누구, 마시다, 사다, 자다… each existed twice, one lesson was 6/7 duplicate). Fixed in #51 — **true count is 738**, and `audit-words-data.mjs` now hard-fails this class of duplicate going forward (verified against the old data: it catches all 67).
  - **Lesson for future sessions: verify §8/§11 claims against the actual data (counts, a gold test, a browser reload) before building on top of them or reporting further progress. Do not just read the checkmark.**
- **Known real gaps right now** (see teaching spec §8 for full detail):
  - Vocabulary volume: **738 / 800–1,000** Core 1000 target — short, needs real new authoring (not re-adds; the audit will now reject those).
  - Sense-split (`senseKey`): only **82 lemmas** tagged with genuine multi-sense rows; most polysemous lemmas (like 것, 눈, 다리 — check the audit's near-duplicate warnings) are still single-sense or untagged.
  - `register`/`speechLevel`/`morphTag`: every row has a structurally-inferred value (correct-by-rule after the #50 fix), but explicit hand-verified counts are tiny — **register 14/738, speechLevel 6/738, morphTag 15/738**. `originType` is the best-covered axis (475/738 explicit).
  - Pronunciation scoring: transcript-match + duration stub (browser SpeechRecognition), not phoneme-level acoustic scoring.
  - `w39-theme-85` is a pre-existing 1-word lesson with no same-stage sibling to fold into safely — left as-is, needs either more content or a curriculum decision.
  - Run `node scripts/audit-words-data.mjs --strict` and read the **Annotation sources** line it prints — that JSON is the ground truth for the above counts; it will drift as content is authored, so re-run it rather than trusting a cached number.

## Open / optional (intentionally not done)
1. **P2 — SRS expansion:** add a small alphabet-*skill* SRS (block geometry, batchim detection, word decoding) on top of the existing per-letter Leitner system (`letterSrs`, `STAGE_LETTERS`, `renderLetterReview`). Keep it minimal.
2. **P4.1 — modularization:** extract alphabet logic into `src/alphabet/*`. Needs a build step first (the app is currently one static script), so probably defer.

## Workflow
Branch off `main`, open a **draft** PR, keep it small and single-purpose. The owner marks ready and squash-merges.
