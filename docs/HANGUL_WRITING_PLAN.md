# Hangul Writing plan — draw-to-learn for the Alphabet section

> **Status:** W0 (shell, PR #224) and W1 (stroke guides + Watch + tracing for
> the 16 basic jamo, commit 0637ee6a) are **merged to main**. The remaining
> queue for **Opus** is W2 → W1b → W3 in §4. The normative grading spec for W2
> is §7; the verbatim Opus work-order prompt for W2 is §8. One box = one PR,
> per repo convention.

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

- [x] **W1 — Stroke guides + tracing.** *(Shipped, commit 0637ee6a.)* Authored
  stroke-order data for the 6 basic vowels + 10 basic consonants in
  `hangul_strokes.js` (plain browser global, in `index.html` + `APP_SHELL`,
  cache bumped). `getHangulStrokeGuide()` consumes it: numbered stroke-order
  hints, animated "Watch" demo, and per-stroke tracing mode.
- [x] **W2 — Grading heuristic.** *(Shipped: PR #232 grading, PR #233
  shape/sound/romanization exercise prompts + minimal header. PR #234 then
  replaced the §7.6/§7.7 UI surfaces by owner direction: blank canvas (no
  outline, no visible guide), only two buttons (‹ Menu, Help! = demo
  animation that fades), every stroke auto-graded on pointer-up, automatic
  "Well done!" chime → glyph audio → advance on the final stroke, and
  units without full stroke data hidden from the picker until W1b. The §7
  scoring engine is unchanged and still normative; read the shipped code
  before extending. Cache v323.)*
  Implement `gradeHangulDrawing()` without any
  library, following the **normative pipeline spec in §7** exactly (stroke
  cleaning → resampling → per-stroke multi-check scoring → hard rejects →
  verdict), and surface it in both the Check flow and tracing mode with the
  §7.6 mistake-specific messages. Output shape:
  `{ verdict: "great" | "close" | "again", perStroke: [...], strokeCount: {...} }`.
  Keep the self-grade buttons as fallback for glyphs without guide data.
  Jamo-only: syllable glyphs have no guide until W1b and keep W0 behavior.
- [~] **W1b — Advanced jamo + syllable composition.** *(Syllable composition
  SHIPPED with the position-invariance fix: `composeHangulSyllableGuide()`
  builds Unit 3/5 guides from jamo strokes + `HANGUL_SYLLABLE_LAYOUTS`
  boxes — vertical/horizontal × open/closed, jamo bbox-normalized, stroke
  order initial→medial→final. Also shipped in the same change (owner
  direction): the wrong-start hard reject is REMOVED, stroke 1 is graded
  position/scale-FREE, and later strokes are graded against the guide
  aligned onto the learner's accepted ink via `fitHangulAlignment()` —
  absolute canvas placement never fails anyone.)*
  **Remaining:** author guides for the Unit 4 jamo (ㅑ ㅕ ㅛ ㅠ ㅋ ㅌ ㅍ ㅊ)
  in `hangul_strokes.js`; Unit 4 stays hidden from the picker until then.
  Compound-vowel layouts (ㅘ ㅙ ㅚ…) also remain unbuilt — the composer
  returns null for them. Per-syllable layout overrides allowed if a block
  looks cramped.
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

## 7. W2 grading pipeline — normative spec (implement exactly; don't redesign)

Every design decision below is already made. The implementer's job is to
transcribe this into plain-JS functions in `app.js` (inside the existing
`HANGUL WRITING` banner section), wire the two UI surfaces in §7.6–7.7, and
verify. No new files, no libraries, no DOM access inside the scoring
functions (§7.1–7.5 must be pure functions of their arguments so they can be
sanity-checked in isolation).

**Coordinate convention:** everything is graded in the guide's normalized 0–1
space. The shell's canvas is a fixed logical 480×480 (`width`/`height`
attributes), and user ink points are already in that logical space, so
normalization is a plain divide:

```js
// {x, y} canvas points → [x, y] pairs in the 0–1 guide space.
function normalizeHangulInkStroke(stroke, canvas) {
  return stroke.map((p) => [p.x / canvas.width, p.y / canvas.height]);
}
```

`gradeHangulDrawing(glyph, strokes)` keeps its existing signature; callers
pass **already-normalized** strokes (arrays of `[x, y]` pairs). It returns
`null` when `getHangulStrokeGuide(glyph)` is null — the shell's self-check
flow is then the verdict, exactly as today.

### 7.1 Tolerances (single constants object; beginner-tuned defaults)

```js
const HANGUL_GRADE = {
  RESAMPLE_POINTS: 32,   // both ink and guide strokes resample to this count
  MIN_POINTS: 3,         // ink strokes with fewer raw points are accidental taps
  MIN_LENGTH: 0.02,      // ink strokes shorter than this (normalized) are taps
  DEDUPE_EPS: 0.002,     // drop consecutive raw points closer than this
  START_RADIUS: 0.35,    // start/end distance that maps to score 0
  PLACEMENT_RADIUS: 0.25,
  SHAPE_RADIUS: 0.30,
  PASS_SCORE: 0.72,      // per-stroke pass
  CLOSE_SCORE: 0.60,     // whole-glyph "close" floor
  REJECT_START: 0.35,    // hard-reject thresholds (reason codes, §7.4)
  REJECT_DIRECTION: 0.40,
  REJECT_LENGTH: 0.45,
};
```

These are initial values, expected to be tuned by the owner on device later.
Do not add difficulty levels or settings UI in W2.

### 7.2 Stroke cleaning + resampling (pure helpers)

1. **Tap rejection:** an ink stroke with fewer than `MIN_POINTS` raw points
   OR total arc length `< MIN_LENGTH` is discarded before grading. In tracing
   mode a discarded stroke is silently removed (no error message, no
   advancement). In Check mode discarded strokes simply don't count toward
   the drawn-stroke tally.
2. **Dedupe:** drop a point if its distance to the previously kept point is
   `< DEDUPE_EPS`. No smoothing beyond this — Hangul corners must stay sharp.
3. **Resample:** convert a polyline to exactly `RESAMPLE_POINTS` points
   equally spaced by arc length (linear interpolation along segments; if
   total length is 0, repeat the first point). Both the ink stroke and the
   guide stroke are resampled before any scoring. This is the standard
   resample-by-distance algorithm; implement it once as
   `resampleHangulStroke(points, count)`.

### 7.3 Per-stroke scores (each 0–1; `clamp(v) = Math.max(0, Math.min(1, v))`)

Ink stroke `U` and guide stroke `G`, both resampled to N points, both in 0–1
space. `dist(a, b) = Math.hypot(ax - bx, ay - by)`.

- **start** `= clamp(1 - dist(U[0], G[0]) / START_RADIUS)`
- **end** `= clamp(1 - dist(U[N-1], G[N-1]) / START_RADIUS)`
- **placement** `= clamp(1 - meanPointDistance(U, G) / PLACEMENT_RADIUS)`
  where `meanPointDistance` is the average of `dist(U[i], G[i])` over all i.
- **shape**: make copies of `U` and `G` each normalized to its own bounding
  box, then `clamp(1 - meanPointDistance(U', G') / SHAPE_RADIUS)`.
  **Degenerate-box rule (mandatory):** scale both axes by
  `max(boxWidth, boxHeight, 0.05)` (one uniform scale per stroke, centered on
  the box center) — per-axis scaling explodes on straight strokes like ㅡ/ㅣ
  whose box has ~zero height or width.
- **direction**: mean over segments i of
  `(cos θ + 1) / 2`, where θ is the angle between segment `U[i-1]→U[i]` and
  `G[i-1]→G[i]`; skip zero-length segments; 0 if nothing was comparable. A
  backwards stroke lands near 0, a correct one near 1.
- **length** `= min(len(U), len(G)) / max(len(U), len(G))` (arc lengths;
  0 if either is 0).

Combined per-stroke score:

```js
score = start * 0.15 + end * 0.10 + placement * 0.20
      + shape * 0.25 + direction * 0.20 + length * 0.10;
```

**Closed-stroke rule (mandatory):** if a guide stroke is closed
(`dist(G[0], G[N-1]) < 0.05` — the circles in ㅇ and ㅎ), score the ink
against both the guide and its reversed copy and keep the better result.
Learners legitimately draw circles in either rotation; do not fail them on
direction. Compare only forward vs reversed — no other rotations or start
offsets. Circle start-point leniency comes free from the shape/placement
weights.

### 7.4 Hard rejects → reason codes (checked in this order, first hit wins)

| Condition | `reason` |
|---|---|
| `start < REJECT_START` | `"wrong-start"` |
| `direction < REJECT_DIRECTION` | `"wrong-direction"` |
| `length < REJECT_LENGTH` | `"length"` |
| `score < PASS_SCORE` | `"shape"` |
| otherwise | `null` (stroke passes) |

Per-stroke result object: `{ index, score, pass, reason }` (`pass` is
`reason === null`).

### 7.5 Whole-glyph verdict (`gradeHangulDrawing` return value)

Grade ink stroke *i* against guide stroke *i* — order is the lesson, so no
reordering/matching search. Let `expected = guide.strokes.length`,
`drawn = cleaned ink strokes count`, comparing only the first
`min(expected, drawn)` pairs.

- `"great"`: `drawn === expected` AND every stroke passes.
- `"close"`: `drawn === expected` AND mean score `>= CLOSE_SCORE` AND no
  stroke has reason `"wrong-start"` or `"wrong-direction"`.
- `"again"`: everything else (including `drawn !== expected`).

Return:

```js
{
  verdict: "great" | "close" | "again",
  perStroke: [ { index, score, pass, reason }, ... ],
  strokeCount: { expected, drawn },
}
```

### 7.6 Surface 1 — tracing mode grades each stroke on pointer-up

In `bindHangulWritingCanvas`'s `finishStroke`, when `mode === "trace"` and a
guide exists: normalize the just-finished stroke, grade it against guide
stroke `strokes.length - 1` (§7.2–7.4, single stroke).

- **Pass:** keep the stroke (it stays inked and the guide marks it done —
  this is the current behavior) and refresh the status line as today.
- **Fail:** `pop()` the stroke from `hangulWritingState.strokes`, redraw, and
  put the reason message in `#writingTraceStatus`:

| `reason` | status message |
|---|---|
| `"wrong-start"` | `Start at the numbered dot, then follow the line.` |
| `"wrong-direction"` | `Right shape — wrong direction. Follow the stroke top-to-bottom / left-to-right.` |
| `"length"` | `Trace the whole highlighted stroke, end to end.` |
| `"shape"` | `Almost — stay closer to the highlighted line and try again.` |

One message at a time (first-hit reason only). A discarded tap (§7.2.1)
shows no message. Undo/Clear keep their current semantics.

### 7.6b Ink safety in tracing mode

`pointFromEvent` can produce points outside the canvas while the pointer is
captured. Clamp normalized coordinates into [0, 1] before grading (do NOT
clamp the stored ink — rendering already clips to the canvas).

### 7.7 Surface 2 — the Check button in free mode

In the `#writingCheck` handler, before setting `checking = true`: normalize
all strokes, call `gradeHangulDrawing(glyph, normalized)`.

- **`null` (no guide):** exact current behavior — reference shown,
  self-check "Try again / Got it →" buttons are the verdict.
- **Non-null:** still show the reference compare view, but replace the
  neutral "How did it go?" line with a verdict line, keeping both buttons:
  - `great` → `✨ Great writing — stroke order and shapes all check out.`
  - `close` → `Close! Compare with the reference — check the strokes marked below.`
  - `again` → stroke-count mismatch: `You used {drawn} strokes — {glyph} takes {expected}. Watch the demo, then try again.`
    otherwise: `Not quite — watch the stroke order and give it another go.`
  - For `close`/`again` with a count match, list failing stroke numbers and
    their §7.6 short reasons (e.g. `Stroke 2: wrong direction`), max 2 lines.
- The verdict is **advisory**: it never blocks "Got it →" and never persists
  anything (persistence is W3). Pass the verdict string to the existing
  `recordHangulWritingResult` call sites unchanged.

### 7.8 Explicitly out of scope for W2 (do not build)

- Corridor-coverage and forward-progress metrics (§7.3's checks cover the
  same failure modes at this canvas size; revisit only if on-device tuning
  shows scribbles passing).
- Difficulty levels / settings UI; telemetry; persistence (W3); syllable
  guide composition (W1b); any change to `hangul_strokes.js` data.

## 8. Opus work-order prompt (verbatim, for W2)

```text
You are implementing Phase W2 (grading) of the Hangul writing feature in the
HanaPath repo (vanilla static Korean-learning PWA, no build step, no
dependencies).

Read, in order, before writing any code:
1. CLAUDE.md (hard rules — vanilla/static, additive-only, cache bumps,
   audits, the Alphabet section is protected)
2. docs/HANGUL_WRITING_PLAN.md — especially §7, the normative grading spec.
   Every formula, threshold, message string, and edge-case rule you need is
   written there. Implement it exactly; do not redesign, rename the tunables,
   or add features it doesn't list (§7.8 lists what NOT to build).
3. The shipped W0/W1 code in app.js: search for the "HANGUL WRITING" banner.
   The pieces you will touch: gradeHangulDrawing() (currently returns null,
   ~line 14091), finishStroke inside bindHangulWritingCanvas(),
   updateHangulTraceStatus(), and the #writingCheck handler plus check-row
   markup in renderHangulWritingPractice(). hangul_strokes.js documents the
   guide data format — read its header, change nothing in it.

Your task is exactly the W2 box in plan §4:

1. Add the pure helpers from §7.1–7.5 inside the HANGUL WRITING section of
   app.js: the HANGUL_GRADE constants, normalizeHangulInkStroke,
   resampleHangulStroke, the per-stroke scorer with the closed-stroke and
   degenerate-box rules, and the full gradeHangulDrawing implementation.
   These functions must not touch the DOM.
2. Wire tracing mode per §7.6/§7.6b: grade each stroke on pointer-up, keep
   passes, pop fails, show the exact reason messages in #writingTraceStatus.
3. Wire the Check flow per §7.7: advisory verdict line + failing-stroke
   reasons in the existing check row; self-check buttons stay and still
   advance; glyphs without guides keep the exact current behavior.
4. Do not touch: hangul_strokes.js, alphabet lessons/quizzes/progress
   semantics, Words, Sentences, Listening, audio_map.js, or any persisted
   state (W2 stores nothing). Keep the diff additive and single-purpose.
5. Cache discipline: you are editing app.js (and styles.css only if a small
   verdict style is genuinely needed) — bump CACHE_NAME in sw.js and the
   matching ?v= strings in index.html and sw.js.

Verification before opening the draft PR (record all of it in the PR body):
- node --check app.js
- node scripts/audit-app-shell.mjs
- node scripts/audit-alphabet-audio.mjs --strict
- node scripts/audit-words-data.mjs --strict and
  node scripts/audit-sentences-data.mjs --strict (untouched — run to prove it)
- Serve with python -m http.server 8000 and smoke-test as a cold learner, and
  record the outcome of each of these in the PR body:
  a. Trace ㄱ correctly → stroke accepted, status advances.
  b. Trace ㄱ backwards (bottom-up then right-to-left) → rejected (a full
     reversal starts where the guide ends, so the §7.4 ladder correctly
     reports wrong-start; wrong-direction fires when the start is near but
     the path direction disagrees).
  c. Start ㅏ's first stroke in the wrong corner → wrong-start message.
  d. Draw a tiny tap → silently ignored, no message, no advancement.
  e. Draw ㅇ clockwise AND counter-clockwise in tracing mode → both accepted
     (closed-stroke rule).
  f. Free mode: draw ㅁ with 3 correct strokes → Check shows "great"; draw it
     with 2 strokes → Check reports the stroke-count message; a syllable
     glyph (가) still shows the W0 self-check with no verdict line.
  g. Confirm Alphabet lessons/quiz and the other Practice tiles behave
     identically to main.
- Also test with DevTools touch emulation, not just a mouse.

Workflow: branch off main (e.g. opus/hangul-writing-w2), one draft PR, small
and single-purpose. The owner marks ready and squash-merges. If the spec in
§7 is ambiguous anywhere, stop and leave a question in the PR rather than
guessing.
```
