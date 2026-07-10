# Hangul Writing plan — draw-to-learn for the Alphabet section

> **Status:** Phase W0 (shell) built by Fable on branch `claude/hangul-writing-shell`
> (draft PR). Phases W1–W3 are the implementation queue for **Opus** — the full
> work order prompt is in §7. One box = one PR, per repo convention.

## 1. Goal

Learners should be able to **draw Hangul with a finger/stylus/mouse** to learn
letter shapes and stroke order, inside the existing Alphabet section flows.

Owner-set scope boundary (2026-07-10):

- **Alphabet section: writing caps at a single syllable block** (jamo → CV →
  CVC). Nothing longer than one block ever appears here.
- **Words section: multi-block/word writing is a future, separate expansion.**
  Out of scope for this entire plan; do not build toward it yet.

## 2. Hard constraints (inherited from CLAUDE.md — restated because they bind every phase)

1. Vanilla/static only. No framework, no bundler, no build step, no new
   dependencies or libraries (no ML/recognition libraries; hanzi-writer etc. are
   **not** allowed). Canvas 2D + pointer events only.
2. **The Alphabet section is complete and protected.** Writing is additive: it
   must not change lesson content, quiz decks, `getAlphabetProgress()`
   semantics, or unlock order. Writing *reads* alphabet progress; it never
   writes it.
3. Cache discipline: any change to `app.js`, `styles.css`, or a loaded data
   file bumps `CACHE_NAME` in `sw.js` **and** the matching `?v=` strings in
   both `index.html` and `sw.js`. New loaded files are added to `index.html`,
   `APP_SHELL` in `sw.js`, and the audit passes.
4. After every phase: `node --check` on touched JS,
   `node scripts/audit-app-shell.mjs`,
   `node scripts/audit-alphabet-audio.mjs --strict`, plus a served browser
   smoke test (`python -m http.server 8000`).
5. Branch off `main`, draft PR, small and single-purpose. Owner squash-merges.

## 3. What the W0 shell provides (already built — do not rebuild)

All shell code is marked with `HANGUL WRITING` section banners and `OPUS(Wn):`
stub comments.

- **Entry point:** a `Hangul writing` tile in `HUB_DEFS.practice.items`
  (`custom: "hangulWriting"`) routed in `openHubItem()` →
  `renderHangulWriting()`.
- **Unit picker:** `HANGUL_WRITING_UNITS` — five stub units (basic vowels,
  basic consonants, CV blocks, advanced jamo, CVC blocks with batchim), each
  with an `unlockLessonIndex` gate read from `getAlphabetProgress()`
  (`completedCount > unlockLessonIndex`). Locked units render disabled.
- **Practice screen:** per-glyph screen with a square canvas, working freehand
  pointer drawing (stroke array + redraw), guide toggle (faint glyph rendered
  under the ink), undo/clear, 🔊 audio via the existing `speak()`/`data-speak`
  path, prev/next glyph navigation, and a self-check flow ("Check" → reference
  shown → "Got it / Try again") that advances without persisting anything.
- **Stubs Opus fills in:** `getHangulStrokeGuide(glyph)` (returns `null`),
  `gradeHangulDrawing(glyph, strokes)` (returns `null`),
  `recordHangulWritingResult(glyph, verdict)` (no-op).
- **CSS:** `.writing-*` block at the end of `styles.css`.
- Transient state only (`hangulWritingState`); nothing new persisted to
  `hanapath-v1` yet.

## 4. Execution queue for Opus (one box = one PR)

- [ ] **W1 — Stroke guides + tracing.** Author stroke-order data for the
  shell's jamo units (start with the 6 basic vowels + 10 basic consonants;
  advanced jamo may follow in a W1b PR if the diff gets large) in a new
  static data file `hangul_strokes.js` (plain browser global, loaded before
  `app.js`, added to `index.html` + `APP_SHELL` + cache bump). Implement
  `getHangulStrokeGuide()` to consume it: numbered stroke-order hints, animated
  stroke-by-stroke demo ("Watch" button), and per-stroke tracing mode where the
  learner draws one stroke at a time over the guide. Composed syllables reuse
  jamo stroke data positioned by block layout — syllable-specific authoring
  should be layout transforms, not re-drawn paths.
- [ ] **W2 — Grading heuristic.** Implement `gradeHangulDrawing()` without any
  library: stroke-count match, per-stroke direction (start→end vector vs
  guide), and coverage/containment sampling against the guide raster. Output
  `{ verdict: "great" | "close" | "again", perStroke: [...] }` and surface it
  in the check flow. Keep the self-grade buttons as fallback for glyphs
  without guide data.
- [ ] **W3 — Progress + polish.** Persist per-glyph writing results in a new
  additive key on the existing `hanapath-v1` state (schema documented in the
  PR; must survive `normalizeState` round-trips and old saves). Unit cards
  show per-glyph completion. Optional light integration: a "practice writing"
  link from the finished-alphabet reference screen. **No SRS, no XP changes,
  no gating changes** without a separate owner decision.

Anything beyond W3 (writing SRS, Words-section word writing, handwriting
recognition) is **owner-gated 🔒 — propose, don't build.**

## 5. Design decisions already made (don't relitigate)

- **Canvas 2D freehand + authored stroke guides**, not SVG-pointer-capture or
  third-party recognizers. Grading is heuristic, honest about being heuristic,
  and always paired with the visual compare-to-reference step.
- Stroke data is **hand-authored static data**, reviewed like curriculum data.
  Format suggestion: per glyph, an array of strokes, each stroke an array of
  normalized `[x, y]` points in a 0–1 box (straight strokes may be 2 points);
  syllable entries reference jamo entries + a layout box. Opus may refine the
  format but must document it in `hangul_strokes.js` header comments.
- Audio for glyphs uses the existing `speak()` path (jamo names / syllable
  readings already flow through it in the alphabet quizzes). **Never hand-edit
  `audio_map.js`**; if a chosen syllable lacks an audio asset, prefer picking
  one that has one over generating new audio in these PRs.
- Unlock gating mirrors the lesson that *teaches* the glyphs (see
  `unlockLessonIndex` in the shell). Writing never unlocks anything else.

## 6. Future (out of scope, recorded so nobody builds it early)

- **Words section:** multi-block word writing (e.g. write 한국 after learning
  it), possibly wired to the Words SRS. Needs its own plan doc and owner
  sign-off; the syllable cap in the Alphabet section stands regardless.

## 7. Opus work-order prompt (verbatim, for W1)

```text
You are implementing Phase W1 of the Hangul writing feature in the HanaPath
repo (vanilla static Korean-learning PWA, no build step, no dependencies).

Read, in order, before writing any code:
1. CLAUDE.md (hard rules — vanilla/static, additive-only, cache bumps, audits,
   the Alphabet section is protected)
2. docs/HANGUL_WRITING_PLAN.md (this plan — scope, decisions, your queue)
3. The W0 shell code in app.js: search for "HANGUL WRITING" section banners.
   Also read renderAlphabetPractice() and the pronunciation drill section
   directly above the shell for the established UI patterns.

Your task is exactly the W1 box in plan §4:

1. Create hangul_strokes.js — a plain browser global (window.HANGUL_STROKES or
   a top-level const, matching how words_curated_core.js exposes data). Author
   stroke-order data for these 16 jamo: ㅏ ㅓ ㅗ ㅜ ㅡ ㅣ ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅅ
   ㅇ ㅈ ㅎ. Format: documented header comment; per glyph an ordered array of
   strokes; each stroke an ordered array of [x, y] points normalized to a 0–1
   square, following real Korean stroke order (left→right, top→bottom rules).
   Verify stroke order against a reputable reference before authoring; get ㄹ,
   ㅂ, ㅎ right — they are the ones people get wrong.
2. Load it in index.html before app.js with a ?v= string, add it to APP_SHELL
   in sw.js, bump CACHE_NAME and the app.js/styles.css ?v= strings you touch.
3. Implement getHangulStrokeGuide(glyph) in app.js to return the parsed guide
   or null. For syllable glyphs return null in W1 (syllable layout composition
   is W1b/W2 territory unless it comes for free).
4. In the practice screen (renderHangulWriting), when a guide exists:
   - draw the guide as numbered faint strokes (stroke number at each stroke's
     start point) instead of the W0 faint-font glyph;
   - add a "Watch" button that animates the strokes one at a time on the
     canvas (requestAnimationFrame, no libraries);
   - add a per-stroke tracing mode: the learner draws stroke N, you advance a
     highlighted "next stroke" indicator per completed pointer-up. No grading
     yet (that is W2) — tracing mode only tracks count/order visually.
   Glyphs without guide data must keep the exact W0 behavior (faint-font guide
   + freehand + self-check). Do not remove the self-check flow.
5. Do not touch: alphabet lessons/quizzes/progress semantics, Words,
   Sentences, Listening, audio_map.js, or any persisted state schema (W1
   stores nothing). Keep the diff additive and single-purpose.

Verification before opening the draft PR (record all of it in the PR body):
- node --check app.js hangul_strokes.js
- node scripts/audit-app-shell.mjs
- node scripts/audit-alphabet-audio.mjs --strict
- node scripts/audit-words-data.mjs --strict and
  node scripts/audit-sentences-data.mjs --strict (should be untouched — run
  them to prove it)
- Serve with python -m http.server 8000 and smoke-test as a cold learner:
  Practice → Hangul writing → each unit; draw on desktop mouse AND verify
  touch/pointer works (DevTools device emulation is acceptable); confirm
  locked units stay locked with a fresh localStorage; confirm the Alphabet
  lessons and quiz still behave identically.
- List every glyph you authored and its stroke count in the PR body so the
  owner can review stroke order at a glance.

Workflow: branch off main (e.g. opus/hangul-writing-w1), one draft PR, small
and single-purpose. The owner marks ready and squash-merges. If you hit a
genuine ambiguity, stop and leave a question in the PR rather than guessing
against the plan.
```
