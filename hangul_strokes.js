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
// This bank covers all 40 modern compatibility jamo: 19 consonants and 21
// vowels. Complex final clusters are intentionally not duplicated here;
// composed syllable blocks are assembled from these guides by app.js.
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

    // ── Additional modern vowels ────────────────────────────────────────────
    "ㅑ": {
      type: "vowel",
      name: "ya",
      strokes: [
        [[0.42, 0.08], [0.42, 0.92]], // long vertical, top → bottom
        [[0.42, 0.38], [0.78, 0.38]], // upper right branch
        [[0.42, 0.62], [0.78, 0.62]], // lower right branch
      ],
    },
    "ㅕ": {
      type: "vowel",
      name: "yeo",
      strokes: [
        [[0.22, 0.38], [0.58, 0.38]], // upper left branch
        [[0.22, 0.62], [0.58, 0.62]], // lower left branch
        [[0.58, 0.08], [0.58, 0.92]], // long vertical, top → bottom
      ],
    },
    "ㅛ": {
      type: "vowel",
      name: "yo",
      strokes: [
        [[0.36, 0.28], [0.36, 0.64]], // left upright, top → bottom
        [[0.64, 0.28], [0.64, 0.64]], // right upright, top → bottom
        [[0.12, 0.64], [0.88, 0.64]], // base bar, left → right
      ],
    },
    "ㅠ": {
      type: "vowel",
      name: "yu",
      strokes: [
        [[0.12, 0.38], [0.88, 0.38]], // top bar, left → right
        [[0.36, 0.38], [0.36, 0.76]], // left downward branch
        [[0.64, 0.38], [0.64, 0.76]], // right downward branch
      ],
    },
    "ㅐ": {
      type: "vowel",
      name: "ae",
      strokes: [
        [[0.32, 0.08], [0.32, 0.92]], // ㅏ stem
        [[0.32, 0.5], [0.7, 0.5]],    // ㅏ branch, joined to ㅣ
        [[0.7, 0.08], [0.7, 0.92]],   // ㅣ stem
      ],
    },
    "ㅔ": {
      type: "vowel",
      name: "e",
      strokes: [
        [[0.16, 0.5], [0.44, 0.5]],   // ㅓ branch
        [[0.44, 0.08], [0.44, 0.92]], // ㅓ stem
        [[0.72, 0.08], [0.72, 0.92]], // separate ㅣ stem
      ],
    },
    "ㅒ": {
      type: "vowel",
      name: "yae",
      strokes: [
        [[0.3, 0.08], [0.3, 0.92]],   // ㅑ stem
        [[0.3, 0.38], [0.68, 0.38]],  // upper branch, joined to ㅣ
        [[0.3, 0.62], [0.68, 0.62]],  // lower branch, joined to ㅣ
        [[0.68, 0.08], [0.68, 0.92]], // ㅣ stem
      ],
    },
    "ㅖ": {
      type: "vowel",
      name: "ye",
      strokes: [
        [[0.14, 0.38], [0.42, 0.38]], // upper ㅕ branch
        [[0.14, 0.62], [0.42, 0.62]], // lower ㅕ branch
        [[0.42, 0.08], [0.42, 0.92]], // ㅕ stem
        [[0.72, 0.08], [0.72, 0.92]], // separate ㅣ stem
      ],
    },
    "ㅘ": {
      type: "vowel",
      name: "wa",
      strokes: [
        [[0.28, 0.18], [0.28, 0.46]], // ㅗ upright
        [[0.06, 0.46], [0.5, 0.46]],  // ㅗ base
        [[0.7, 0.1], [0.7, 0.9]],     // ㅏ stem
        [[0.7, 0.5], [0.94, 0.5]],    // ㅏ branch
      ],
    },
    "ㅙ": {
      type: "vowel",
      name: "wae",
      strokes: [
        [[0.25, 0.18], [0.25, 0.44]], // ㅗ upright
        [[0.05, 0.44], [0.46, 0.44]], // ㅗ base
        [[0.6, 0.1], [0.6, 0.9]],     // ㅐ left stem
        [[0.6, 0.5], [0.88, 0.5]],    // ㅐ joining branch
        [[0.88, 0.1], [0.88, 0.9]],   // ㅐ right stem
      ],
    },
    "ㅚ": {
      type: "vowel",
      name: "oe",
      strokes: [
        [[0.28, 0.18], [0.28, 0.46]], // ㅗ upright
        [[0.06, 0.46], [0.5, 0.46]],  // ㅗ base
        [[0.76, 0.1], [0.76, 0.9]],   // separate ㅣ stem
      ],
    },
    "ㅝ": {
      type: "vowel",
      name: "wo",
      strokes: [
        [[0.06, 0.34], [0.5, 0.34]],  // ㅜ top bar
        [[0.28, 0.34], [0.28, 0.64]], // ㅜ downward branch
        [[0.54, 0.5], [0.74, 0.5]],   // ㅓ branch
        [[0.74, 0.1], [0.74, 0.9]],   // ㅓ stem
      ],
    },
    "ㅞ": {
      type: "vowel",
      name: "we",
      strokes: [
        [[0.05, 0.34], [0.46, 0.34]], // ㅜ top bar
        [[0.25, 0.34], [0.25, 0.64]], // ㅜ downward branch
        [[0.5, 0.5], [0.64, 0.5]],    // ㅔ branch
        [[0.64, 0.1], [0.64, 0.9]],   // ㅔ stem
        [[0.88, 0.1], [0.88, 0.9]],   // separate ㅣ stem
      ],
    },
    "ㅟ": {
      type: "vowel",
      name: "wi",
      strokes: [
        [[0.06, 0.34], [0.5, 0.34]],  // ㅜ top bar
        [[0.28, 0.34], [0.28, 0.64]], // ㅜ downward branch
        [[0.76, 0.1], [0.76, 0.9]],   // separate ㅣ stem
      ],
    },
    "ㅢ": {
      type: "vowel",
      name: "ui",
      strokes: [
        [[0.06, 0.5], [0.52, 0.5]], // ㅡ, left → right
        [[0.76, 0.1], [0.76, 0.9]], // ㅣ, top → bottom
      ],
    },

    // ── Tense consonants ────────────────────────────────────────────────────
    "ㄲ": {
      type: "consonant",
      name: "ssanggiyeok",
      strokes: [
        [[0.1, 0.22], [0.44, 0.22], [0.38, 0.82]], // left ㄱ
        [[0.53, 0.22], [0.87, 0.22], [0.81, 0.82]], // right ㄱ
      ],
    },
    "ㄸ": {
      type: "consonant",
      name: "ssangdigeut",
      strokes: [
        [[0.08, 0.22], [0.44, 0.22]],             // left ㄷ top
        [[0.08, 0.22], [0.08, 0.8], [0.44, 0.8]], // left ㄷ bottom
        [[0.56, 0.22], [0.92, 0.22]],             // right ㄷ top
        [[0.56, 0.22], [0.56, 0.8], [0.92, 0.8]], // right ㄷ bottom
      ],
    },
    "ㅃ": {
      type: "consonant",
      name: "ssangbieup",
      strokes: [
        [[0.08, 0.16], [0.08, 0.84]], // left ㅂ: left vertical
        [[0.43, 0.16], [0.43, 0.84]], // left ㅂ: right vertical
        [[0.08, 0.52], [0.43, 0.52]], // left ㅂ: middle bar
        [[0.08, 0.84], [0.43, 0.84]], // left ㅂ: bottom bar
        [[0.57, 0.16], [0.57, 0.84]], // right ㅂ: left vertical
        [[0.92, 0.16], [0.92, 0.84]], // right ㅂ: right vertical
        [[0.57, 0.52], [0.92, 0.52]], // right ㅂ: middle bar
        [[0.57, 0.84], [0.92, 0.84]], // right ㅂ: bottom bar
      ],
    },
    "ㅆ": {
      type: "consonant",
      name: "ssangsiot",
      strokes: [
        [[0.28, 0.2], [0.1, 0.84]],  // left ㅅ: left-falling diagonal
        [[0.23, 0.42], [0.45, 0.84]], // left ㅅ: right-falling diagonal
        [[0.7, 0.2], [0.52, 0.84]],  // right ㅅ: left-falling diagonal
        [[0.65, 0.42], [0.9, 0.84]], // right ㅅ: right-falling diagonal
      ],
    },
    "ㅉ": {
      type: "consonant",
      name: "ssangjieut",
      strokes: [
        [[0.08, 0.26], [0.45, 0.26]], // left ㅈ: top bar
        [[0.27, 0.26], [0.1, 0.82]],  // left ㅈ: left diagonal
        [[0.27, 0.26], [0.45, 0.82]], // left ㅈ: right diagonal
        [[0.55, 0.26], [0.92, 0.26]], // right ㅈ: top bar
        [[0.73, 0.26], [0.55, 0.82]], // right ㅈ: left diagonal
        [[0.73, 0.26], [0.9, 0.82]],  // right ㅈ: right diagonal
      ],
    },

    // ── Aspirated consonants ─────────────────────────────────────────────────
    "ㅋ": {
      type: "consonant",
      name: "kieuk",
      strokes: [
        [[0.2, 0.2], [0.78, 0.2], [0.64, 0.82]], // ㄱ frame
        [[0.18, 0.5], [0.7, 0.5]],               // added middle bar
      ],
    },
    "ㅌ": {
      type: "consonant",
      name: "tieut",
      strokes: [
        [[0.22, 0.16], [0.78, 0.16]],             // top bar
        [[0.22, 0.4], [0.78, 0.4]],               // middle bar
        [[0.22, 0.4], [0.22, 0.82], [0.78, 0.82]], // bottom ㄴ
      ],
    },
    "ㅍ": {
      type: "consonant",
      name: "pieup",
      strokes: [
        [[0.16, 0.24], [0.84, 0.24]], // upper horizontal
        [[0.16, 0.76], [0.84, 0.76]], // lower horizontal
        [[0.3, 0.24], [0.3, 0.76]],   // left connector
        [[0.7, 0.24], [0.7, 0.76]],   // right connector
      ],
    },
    "ㅊ": {
      type: "consonant",
      name: "chieut",
      strokes: [
        [[0.38, 0.1], [0.62, 0.1]],   // short top bar
        [[0.22, 0.32], [0.78, 0.32]], // ㅈ top bar
        [[0.5, 0.32], [0.24, 0.84]],  // left-falling diagonal
        [[0.5, 0.32], [0.76, 0.84]],  // right-falling diagonal
      ],
    },
  };

  // Export the modern-jamo coverage count so browser and Node audits can
  // assert the data contract without coupling to object insertion order.
  var modernJamo = Array.from("ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ");
  window.HANGUL_STROKE_GUIDE_COUNT = modernJamo.filter(function (glyph) {
    return Boolean(window.HANGUL_STROKES[glyph]);
  }).length;
})();
