// HanaPath Hangul stroke-order data (Alphabet writing section).
// Plain static browser global — no modules, no build step. Loaded before app.js
// (see index.html / sw.js APP_SHELL). Consumed by getHangulStrokeGuide() in
// app.js for the draw-to-learn practice screen (docs/HANGUL_WRITING_PLAN.md, W1).
//
// ── Schema ──────────────────────────────────────────────────────────────────
// window.HANGUL_STROKES maps a single jamo character → a guide object:
//
//   "<glyph>": {
//     type:  "vowel" | "consonant",
//     name:  romanized letter name (for review / debugging),
//     strokes: [ stroke, stroke, ... ]     // ordered: index 0 is drawn first
//   }
//
// A `stroke` is an ordered array of [x, y] points. Coordinates are normalized
// to a 0–1 square with the ORIGIN AT TOP-LEFT: x grows rightward, y grows
// DOWNWARD (matching canvas pixel space). A straight stroke is just its two
// endpoints; bends/curves add intermediate points. The point order encodes the
// real writing DIRECTION (start → end), which W2 grading will compare against.
//
// ── Stroke-order rules followed (standard South Korean 필순) ─────────────────
//   • Top before bottom, left before right.
//   • Horizontal strokes are drawn left → right; verticals top → bottom.
//   • For a vowel, the stem element on the left/top is drawn before the branch
//     on the right/bottom (so ㅏ = vertical then right branch; ㅓ = left branch
//     then vertical; ㅗ = short vertical then base; ㅜ = base then short vertical).
//
// Stroke counts (verified against reputable references; the commonly-mistaken
// ones — ㄹ, ㅂ, ㅎ — are called out):
//   ㅏ2 ㅓ2 ㅗ2 ㅜ2 ㅡ1 ㅣ1
//   ㄱ1 ㄴ1 ㄷ2 ㄹ3 ㅁ3 ㅂ4 ㅅ2 ㅇ1 ㅈ3 ㅎ3
//   • ㄹ (3): top ㄱ (across, then down to the middle) → middle bar → bottom
//     ㄴ (down, then across). Zigzag: bar1→bar2 joins on the RIGHT, bar2→bar3
//     on the LEFT.
//   • ㅂ (4): left vertical → right vertical → middle bar → bottom bar. It is
//     NOT drawn as a box outline.
//   • ㅎ (3): short upright mark → middle bar → circle (ㅇ) underneath.
//
// W1 only ships jamo. Composed syllable blocks return null from
// getHangulStrokeGuide() for now (block layout composition is W1b/W2).
(function () {
  "use strict";

  // Build a closed circle as one stroke (used by ㅇ and the bottom of ㅎ).
  // Counter-clockwise from the top, matching how the ieung circle is written.
  function circle(cx, cy, r, segments) {
    var pts = [];
    var n = segments || 16;
    for (var k = 0; k <= n; k += 1) {
      var a = -Math.PI / 2 - (2 * Math.PI * k) / n; // start at top, go CCW
      pts.push([
        Math.round((cx + r * Math.cos(a)) * 1000) / 1000,
        Math.round((cy + r * Math.sin(a)) * 1000) / 1000,
      ]);
    }
    return pts;
  }

  window.HANGUL_STROKES = {
    // ── Basic vowels ─────────────────────────────────────────────────────────
    "ㅏ": {
      type: "vowel",
      name: "a",
      strokes: [
        [[0.45, 0.08], [0.45, 0.92]], // long vertical, top → bottom
        [[0.45, 0.5], [0.78, 0.5]],   // right branch, left → right
      ],
    },
    "ㅓ": {
      type: "vowel",
      name: "eo",
      strokes: [
        [[0.22, 0.5], [0.55, 0.5]],   // left branch, left → right
        [[0.55, 0.08], [0.55, 0.92]], // long vertical, top → bottom
      ],
    },
    "ㅗ": {
      type: "vowel",
      name: "o",
      strokes: [
        [[0.5, 0.32], [0.5, 0.66]],   // short vertical stub, top → bottom
        [[0.12, 0.66], [0.88, 0.66]], // base bar, left → right
      ],
    },
    "ㅜ": {
      type: "vowel",
      name: "u",
      strokes: [
        [[0.12, 0.42], [0.88, 0.42]], // top bar, left → right
        [[0.5, 0.42], [0.5, 0.78]],   // short vertical stub, top → bottom
      ],
    },
    "ㅡ": {
      type: "vowel",
      name: "eu",
      strokes: [
        [[0.12, 0.5], [0.88, 0.5]], // single horizontal, left → right
      ],
    },
    "ㅣ": {
      type: "vowel",
      name: "i",
      strokes: [
        [[0.5, 0.08], [0.5, 0.92]], // single vertical, top → bottom
      ],
    },

    // ── Basic consonants ─────────────────────────────────────────────────────
    "ㄱ": {
      type: "consonant",
      name: "giyeok",
      strokes: [
        [[0.24, 0.24], [0.76, 0.24], [0.6, 0.82]], // across, then down-left
      ],
    },
    "ㄴ": {
      type: "consonant",
      name: "nieun",
      strokes: [
        [[0.3, 0.16], [0.3, 0.78], [0.8, 0.78]], // down, then across
      ],
    },
    "ㄷ": {
      type: "consonant",
      name: "digeut",
      strokes: [
        [[0.24, 0.22], [0.78, 0.22]],               // top bar, left → right
        [[0.24, 0.22], [0.24, 0.8], [0.78, 0.8]],   // down, then across (ㄴ)
      ],
    },
    "ㄹ": {
      type: "consonant",
      name: "rieul",
      strokes: [
        [[0.26, 0.2], [0.74, 0.2], [0.74, 0.5]],   // top ㄱ: across, down to middle
        [[0.26, 0.5], [0.74, 0.5]],                // middle bar, left → right
        [[0.26, 0.5], [0.26, 0.8], [0.74, 0.8]],   // bottom ㄴ: down, then across
      ],
    },
    "ㅁ": {
      type: "consonant",
      name: "mieum",
      strokes: [
        [[0.26, 0.2], [0.26, 0.8]],                // left vertical, top → bottom
        [[0.26, 0.2], [0.74, 0.2], [0.74, 0.8]],   // top bar + right vertical (ㄱ)
        [[0.26, 0.8], [0.74, 0.8]],                // bottom bar, left → right
      ],
    },
    "ㅂ": {
      type: "consonant",
      name: "bieup",
      strokes: [
        [[0.28, 0.16], [0.28, 0.84]], // left vertical, top → bottom
        [[0.72, 0.16], [0.72, 0.84]], // right vertical, top → bottom
        [[0.28, 0.52], [0.72, 0.52]], // middle bar, left → right
        [[0.28, 0.84], [0.72, 0.84]], // bottom bar, left → right
      ],
    },
    "ㅅ": {
      type: "consonant",
      name: "siot",
      strokes: [
        [[0.5, 0.2], [0.24, 0.84]],   // left-falling diagonal from apex
        [[0.43, 0.42], [0.78, 0.84]], // right-falling diagonal off the first
      ],
    },
    "ㅇ": {
      type: "consonant",
      name: "ieung",
      strokes: [
        circle(0.5, 0.5, 0.32, 16), // single closed circle, CCW from top
      ],
    },
    "ㅈ": {
      type: "consonant",
      name: "jieut",
      strokes: [
        [[0.24, 0.26], [0.76, 0.26]], // top bar, left → right
        [[0.5, 0.26], [0.26, 0.82]],  // left-falling diagonal
        [[0.5, 0.26], [0.76, 0.82]],  // right-falling diagonal
      ],
    },
    "ㅎ": {
      type: "consonant",
      name: "hieut",
      strokes: [
        [[0.5, 0.04], [0.5, 0.22]],   // short upright mark, top → bottom
        [[0.24, 0.36], [0.76, 0.36]], // middle bar, left → right
        circle(0.5, 0.68, 0.2, 14),   // circle underneath, CCW from top
      ],
    },
  };
})();
