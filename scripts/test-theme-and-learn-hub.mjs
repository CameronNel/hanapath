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
for (const theme of ["graphite", "sage", "clay", "plum"]) {
  assert.match(app, new RegExp(`id: "${theme}"`));
  if (theme !== "graphite") assert.match(css, new RegExp(`data-theme="${theme}"`));
}
assert.match(app, /appearance: "system"/);
assert.match(app, /theme: "graphite"/);
assert.match(css, /:root\[data-color-mode="light"\]/);
assert.match(css, /--bg:\s+#1b1b1b/);
assert.match(css, /--bg:\s+#f7f7f5/);
for (const alias of ["accent-text", "accent-bg", "border", "card", "shadow-sm", "surface", "surface-1", "surface-hover", "surface-light"]) {
  assert.match(css, new RegExp(`--${alias}:`), `missing theme alias --${alias}`);
}

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
  const paletteHex = new Set(["#8f8f8f", "#7d9686", "#a47f68", "#967f91", "#202020", "#f7f7f5", "#191919"]);
  for (const match of source.matchAll(/#[0-9a-fA-F]{6}\b/g)) {
    const hex = match[0].toLowerCase();
    if (paletteHex.has(hex) || tokenBlock.includes(hex)) continue;
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
    const spread = Math.max(r, g, b) - Math.min(r, g, b);
    assert.ok(spread <= 10, `${name}: off-palette hex ${hex} — use a theme token`);
  }
}
assert.match(manifest, /"background_color": "#202020"/);
assert.match(manifest, /"theme_color": "#202020"/);

console.log("Theme, light/dark appearance, restrained motion, completion, and three-destination Learn contracts passed.");
