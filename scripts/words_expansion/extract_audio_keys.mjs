import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function loadGlobal(filePath, globalName) {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(filePath, "utf8"), context, { filename: filePath });
  return context.window[globalName] || {};
}

export function extractSpokenKeys(words) {
  const keys = [];
  const add = (text, kind, wordId, field) => {
    if (typeof text !== "string" || !text.trim()) return;
    keys.push({ text: text.trim(), kind, wordId, field });
  };
  for (const word of words) {
    if (!word || !word.id || !word.korean) throw new Error("Every word must have id and korean before audio extraction.");
    add(word.voiceText || word.korean, "word", word.id, "voiceText");
    add(word.exampleVoiceText || word.exampleKo, "example", word.id, "exampleVoiceText");
    if (Array.isArray(word.forms)) {
      word.forms.forEach((form, index) => add(form, "form", word.id, `forms[${index}]`));
    } else if (word.forms && typeof word.forms === "object") {
      for (const [name, form] of Object.entries(word.forms)) add(form, "form", word.id, `forms.${name}`);
    }
  }
  const unique = new Map();
  for (const key of keys) {
    const identity = `${key.kind}\u0000${key.wordId}\u0000${key.field}\u0000${key.text}`;
    unique.set(identity, key);
  }
  return [...unique.values()].sort((a, b) => a.text.localeCompare(b.text, "ko") || a.kind.localeCompare(b.kind) || a.wordId.localeCompare(b.wordId) || a.field.localeCompare(b.field));
}

export function buildAudioReport(words, audioMap) {
  const keys = extractSpokenKeys(words);
  const missing = keys.filter((key) => !audioMap[key.text] && !audioMap[key.text.normalize("NFC")]);
  return {
    schemaVersion: 1,
    generatedBy: "scripts/words_expansion/extract_audio_keys.mjs",
    source: "words_curated_core.js",
    keyCount: keys.length,
    missingKeyCount: missing.length,
    keys,
    missing
  };
}

function parseArgs(args) {
  const options = { out: null, missingOut: null, strict: false };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--out") options.out = path.resolve(args[++i]);
    else if (args[i] === "--missing-out") options.missingOut = path.resolve(args[++i]);
    else if (args[i] === "--strict") options.strict = true;
    else throw new Error(`Unknown option: ${args[i]}`);
  }
  return options;
}

export function run(args = process.argv.slice(2)) {
  const options = parseArgs(args);
  const words = loadGlobal(path.join(root, "words_curated_core.js"), "HANAPATH_CURATED_WORDS");
  const audioMap = loadGlobal(path.join(root, "audio_map.js"), "AUDIO_MAP");
  const report = buildAudioReport(words, audioMap);
  const missingReport = {
    schemaVersion: report.schemaVersion,
    generatedBy: report.generatedBy,
    source: report.source,
    missingKeyCount: report.missingKeyCount,
    missing: report.missing
  };
  const json = JSON.stringify(report, null, 2) + "\n";
  const missingJson = JSON.stringify(missingReport, null, 2) + "\n";
  if (options.out) fs.writeFileSync(options.out, json, "utf8");
  if (options.missingOut) fs.writeFileSync(options.missingOut, missingJson, "utf8");
  console.log(`Extracted ${report.keyCount} spoken keys from ${words.length} curated words.`);
  console.log(`Missing audio keys: ${report.missingKeyCount}`);
  if (options.strict && report.missingKeyCount > 0) process.exitCode = 1;
  return report;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) run();
