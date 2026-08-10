#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const app = readFileSync(join(root, "app.js"), "utf8");
const css = readFileSync(join(root, "styles.css"), "utf8");
const manifest = readFileSync(join(root, "manifest.webmanifest"), "utf8");

for (const mode of ["system", "light", "dark"]) assert.match(app, new RegExp(`"${mode}"`));
for (const theme of ["violet", "graphite", "blue", "red", "yellow", "green", "orange", "gold"]) {
  assert.match(app, new RegExp(`id: "${theme}"`));
  assert.match(css, new RegExp(`data-theme="${theme}"`));
}
assert.match(app, /appearance: "system"/);
assert.match(app, /theme: "violet"/);
assert.match(css, /:root\[data-color-mode="light"\]/);
assert.match(css, /--bg:\s+#000000/);
assert.match(css, /--bg:\s+#ffffff/);
for (const alias of ["accent-text", "accent-bg", "border", "card", "shadow-sm", "surface", "surface-1", "surface-hover", "surface-light"]) {
  assert.match(css, new RegExp(`--${alias}:`), `missing theme alias --${alias}`);
}

// Learn hub tiles carry curated-lesson progress ("X of Y lessons" + a bar).
assert.match(app, /function getHubItemLessonProgress/);
assert.match(app, /lesson\.type !== "checkpoint"/);
assert.match(app, /hub-tile-progress-meta/);
assert.match(css, /\.hub-tile-progress \{/);
assert.match(css, /\.hub-tile-progress-track span \{/);

// Light-mode accent contrast. Light mode paints white on --accent (primary
// buttons) and paints --accent/-3/-4 on white panels (accent text, pills), so
// every one of those members has to clear WCAG AA on white. A lighter, prettier
// accent silently pushed the primary button to 2.6:1 once, on all eight themes.
// Dark mode is exempt: there the text on accent is --on-accent, a near-black.
function relativeLuminance([r, g, b]) {
  const channel = (value) => {
    const c = value / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}
function contrastOnWhite(rgb) {
  return 1.05 / (relativeLuminance(rgb) + 0.05);
}
function hexToRgb(hex) {
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
}

const LIGHT_ACCENT_MIN = 4.5;
const lightThemeBlocks = [...css.matchAll(
  /:root\[data-color-mode="light"\]\[data-theme="(\w+)"\]\s*\{([^}]*)\}/g,
)];
assert.equal(lightThemeBlocks.length, 8, "expected one light block per accent theme");
for (const [, theme, body] of lightThemeBlocks) {
  const accentHex = /--accent:\s*(#[0-9a-fA-F]{6})/.exec(body);
  const accent4Hex = /--accent-4:\s*(#[0-9a-fA-F]{6})/.exec(body);
  const accent3Rgb = /--accent-3-rgb:\s*(\d+),\s*(\d+),\s*(\d+)/.exec(body);
  const accentDeepRgb = /--accent-deep-rgb:\s*(\d+),\s*(\d+),\s*(\d+)/.exec(body);
  assert.ok(accentHex && accent4Hex && accent3Rgb && accentDeepRgb, `light theme ${theme} is missing an accent member`);

  const members = {
    accent: hexToRgb(accentHex[1]),
    "accent-3": accent3Rgb.slice(1, 4).map(Number),
    "accent-4": hexToRgb(accent4Hex[1]),
  };
  for (const [name, rgb] of Object.entries(members)) {
    const ratio = contrastOnWhite(rgb);
    assert.ok(
      ratio >= LIGHT_ACCENT_MIN,
      `light ${theme}: --${name} is ${ratio.toFixed(2)}:1 on white, below ${LIGHT_ACCENT_MIN}:1`,
    );
  }
  // The light primary button runs --accent -> --accent-deep, so the deep member
  // must stay at least as dark as --accent or the gradient inverts.
  assert.ok(
    relativeLuminance(accentDeepRgb.slice(1, 4).map(Number)) <= relativeLuminance(members.accent),
    `light ${theme}: --accent-deep-rgb is lighter than --accent, inverting the button gradient`,
  );
}
assert.match(css, /:root\[data-color-mode="light"\] \.button\.primary \{/, "light mode must override the primary-button gradient");

const visibleLearnDefinitions = [...app.matchAll(/\{ id: "(alphabet|vocabulary|sentences)"[^\n]*\}/g)].slice(0, 3);
assert.equal(visibleLearnDefinitions.length, 3);
assert.match(app, /def\.items\.filter\(\(item\) => item\.showInHub !== false\)/);
for (const hidden of ["listening", "alphabet-practice", "vocabulary-quiz", "sentence-studio", "listening-quiz", "writing", "form-checks"]) {
  assert.match(app, new RegExp(`id: "${hidden}"[^\n]*showInHub: false`), `${hidden} must stay routable but hidden from Learn`);
}
assert.match(app, /itemId === "sentences" && sentenceDueCount > 0/);

assert.match(css, /\.completion-aurora,\s*\.completion-confetti \{ display: none !important; \}/);
assert.match(css, /\.app-reduced-motion \*/);
assert.match(app, /state\.reduceMotion \|\| window\.matchMedia/);
assert.match(css, /\.screen-motion-exit \{ animation-duration: \.18s; \}/);

const staleBlue = /#(?:0f1026|070b16|5b9dff|7a5cff|58a6ff|8b7cff|9fc5ff|dbeafe|22d3ee|2dd4bf)/i;
assert.doesNotMatch(`${app}\n${css}\n${manifest}`, staleBlue, "stale blue/purple release color remains");

// A hex allowlist alone let rgba() navy panels and blue glows survive the
// rebrand. Every remaining colour literal must either be a declared palette
// token or a neutral grey (|R-G|, |G-B|, |R-B| all within a small tolerance).
for (const [name, source] of [["styles.css", css], ["app.js", app], ["sentence_exam_runner.css", readFileSync(join(root, "sentence_exam_runner.css"), "utf8")]]) {
  const tokenBlock = name === "styles.css" ? css.slice(0, css.indexOf("*, *::before")) : "";
  for (const match of source.matchAll(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*[,)]/g)) {
    if (tokenBlock.includes(match[0])) continue; // palette definitions themselves
    const [r, g, b] = match.slice(1, 4).map(Number);
    const spread = Math.max(r, g, b) - Math.min(r, g, b);
    assert.ok(spread <= 8, `${name}: off-palette literal ${match[0].slice(0, -1)}) — use a --*-rgb channel`);
  }
  const paletteHex = new Set(["#a78bfa", "#a8a8a4", "#6cb2ff", "#ff7a72", "#f5d13f", "#5ddb8a", "#ffa057", "#f2c466", "#000000", "#ffffff", "#0c0c0f", "#121216", "#17171c", "#0b0b10", "#1b1b21", "#131318", "#191920", "#0a0a0e", "#f4f4f7", "#fbfbfd", "#1b1b20", "#b6b6c4", "#4b4b58"]);
  for (const match of source.matchAll(/#[0-9a-fA-F]{6}\b/g)) {
    const hex = match[0].toLowerCase();
    if (paletteHex.has(hex) || tokenBlock.includes(hex)) continue;
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
    const spread = Math.max(r, g, b) - Math.min(r, g, b);
    assert.ok(spread <= 10, `${name}: off-palette hex ${hex} — use a theme token`);
  }
}
assert.match(manifest, /"background_color": "#000000"/);
assert.match(manifest, /"theme_color": "#000000"/);

console.log("Theme, light/dark appearance, restrained motion, completion, hub lesson progress, and three-destination Learn contracts passed.");
