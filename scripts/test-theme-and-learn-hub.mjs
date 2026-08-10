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
