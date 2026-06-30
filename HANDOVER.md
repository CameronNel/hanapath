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

## Open / optional (intentionally not done)
1. **P2 — SRS expansion:** add a small alphabet-*skill* SRS (block geometry, batchim detection, word decoding) on top of the existing per-letter Leitner system (`letterSrs`, `STAGE_LETTERS`, `renderLetterReview`). Keep it minimal.
2. **P4.1 — modularization:** extract alphabet logic into `src/alphabet/*`. Needs a build step first (the app is currently one static script), so probably defer.

## Workflow
Branch off `main`, open a **draft** PR, keep it small and single-purpose. The owner marks ready and squash-merges.
