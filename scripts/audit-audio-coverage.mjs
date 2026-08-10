#!/usr/bin/env node
// Build and audit the authoritative learner-facing audio manifest.
//
// The app creates some speech targets dynamically, so scanning arbitrary
// Korean-looking JavaScript strings is both incomplete (generated syllables)
// and noisy (copy, comments, and mixed-language notes). This script mirrors
// the explicit runtime sources instead:
//   - every modern Hangul syllable exposed by Syllable Lab (11,172)
//   - curated word and example voice fields, plus word typing tiles
//   - sentence-bank voice fields and token tiles
//   - the two CSV vocabulary banks used by reference/practice views
//   - Phase One, Drill Lab, minimal-pair, and legacy sentence audio data
//   - the generated complex-final demo syllables
//   - loaded authored lesson answers, Form Check generators, and exam strings
//
// Usage:
//   node scripts/audit-audio-coverage.mjs
//   node scripts/audit-audio-coverage.mjs --strict
//   node scripts/audit-audio-coverage.mjs --manifest-json
//
// `generate_assets.py` consumes --manifest-json so generation and auditing
// cannot silently drift apart.

import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import vm from "node:vm";
import { collectAuthoredAudioTargets } from "./lib/authored-audio-targets.mjs";

const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), "..");
const APP_FILE = path.join(ROOT, "app.js");
const AUDIO_MAP_FILE = path.join(ROOT, "audio_map.js");
const AUDIO_ROOT = path.join(ROOT, "audio");

const DATA_GLOBALS = [
  ["words_curated_core.js", "HANAPATH_CURATED_WORDS"],
  ["words_lesson_plan.js", "HANAPATH_WORD_LESSONS"],
  ["sentences_core.js", "HANAPATH_SENTENCES"],
  ["sentences_lesson_plan.js", "HANAPATH_SENTENCE_LESSONS"],
];

const CSV_FILES = ["korean_5000_claude_ready.csv", "korean_supplementary_15k.csv"];
const WORD_TILE_DISTRACTORS = ["가", "나", "다", "리", "미", "바", "서", "아", "자", "하", "요", "은", "무", "고"];

// These keys are written as decomposed laughter/emoticon spellings in the raw
// bank. Edge TTS cannot pronounce them literally, so keep the lookup key while
// synthesizing a deliberate spoken equivalent.
export const SPEECH_OVERRIDES = Object.freeze({
  "ᄒᄒ": "흐흐",
  "ᅲᅲ": "유유",
  "ᄏᄏ": "크크",
});

// This is the only intentional non-speech key in the learner-facing manifest.
// It must still map to a valid, non-empty audio container containing silence;
// zero-byte placeholders are never accepted.
export const DOCUMENTED_SILENT_KEYS = new Set(["No sound"]);

const HANGUL_RE = /[\u1100-\u11ff\u3131-\u318e\uac00-\ud7a3]/u;
const HANGUL_CHUNK_RE = /[\u3131-\u318e\uac00-\ud7a3]+/gu;
const TOKEN_TRAILING_PUNCTUATION_RE = /[.,!?;:"'`~(){}\[\]<>\\/·-]+$/g;

const HANGUL_JAMO_SPEAK = Object.freeze({
  ㄱ: "가", ㄲ: "까", ㄴ: "나", ㄷ: "다", ㄸ: "따", ㄹ: "라", ㅁ: "마",
  ㅂ: "바", ㅃ: "빠", ㅅ: "사", ㅆ: "싸", ㅇ: "아", ㅈ: "자", ㅉ: "짜",
  ㅊ: "차", ㅋ: "카", ㅌ: "타", ㅍ: "파", ㅎ: "하",
  ㅏ: "아", ㅐ: "애", ㅑ: "야", ㅒ: "얘", ㅓ: "어", ㅔ: "에", ㅕ: "여",
  ㅖ: "예", ㅗ: "오", ㅘ: "와", ㅙ: "왜", ㅚ: "외", ㅛ: "요", ㅜ: "우",
  ㅝ: "워", ㅞ: "웨", ㅟ: "위", ㅠ: "유", ㅡ: "으", ㅢ: "의", ㅣ: "이",
});

const COMPLEX_FINAL_INDEX = Object.freeze({
  ㄳ: 3, ㄵ: 5, ㄶ: 6, ㄺ: 9, ㄻ: 10, ㄼ: 11,
  ㄽ: 12, ㄾ: 13, ㄿ: 14, ㅀ: 15, ㅄ: 18,
});

const SOUND_LABEL_SPEAK = Object.freeze({
  a: "아", ae: "애", ya: "야", yae: "얘", eo: "어", e: "에", yeo: "여", ye: "예",
  o: "오", wa: "와", wae: "왜", oe: "외", yo: "요", u: "우", wo: "워", we: "웨",
  wi: "위", yu: "유", eu: "으", ui: "의", i: "이", g: "가", kk: "까", n: "나",
  d: "다", tt: "따", r: "라", m: "마", b: "바", pp: "빠", s: "사", ss: "싸",
  j: "자", jj: "짜", ch: "차", k: "카", t: "타", p: "파", h: "하", ng: "앙",
  "silent (ng)": "아",
});

const APP_STATIC_ARRAYS = [
  "survivalPhrases",
  "survivalCloze",
  "grammarClozeBank",
  "grammarRoleBank",
  "grammarSentenceBank",
  "verbBank",
  "verbSentenceBank",
  "verbHonorificBank",
  "conversationLineBank",
  "conversationRepairBank",
  "conversationScenarioBank",
  "conversationDialogueBank",
  "MINIMAL_PAIRS",
  "HANGUL_WRITING_UNITS",
];

// These are the exact app.js arrays copied into getSentenceStudyBank(), whose
// tokenized Korean feeds clickable generic sentence-build tiles.
const APP_SENTENCE_TOKEN_ARRAYS = new Set([
  "survivalCloze",
  "grammarClozeBank",
  "grammarRoleBank",
  "conversationRepairBank",
  "conversationScenarioBank",
]);

function norm(value) {
  return String(value || "").trim().normalize("NFC");
}

function hasHangul(value) {
  return HANGUL_RE.test(String(value || ""));
}

function cleanSentenceToken(value) {
  return norm(value).replace(TOKEN_TRAILING_PUNCTUATION_RE, "").trim();
}

function tokenizeSentence(value) {
  return norm(value)
    .split(/\s+/)
    .map(cleanSentenceToken)
    .filter(Boolean);
}

function complexFinalDemo(character) {
  const index = COMPLEX_FINAL_INDEX[character];
  return Number.isInteger(index) ? String.fromCharCode(0xc544 + index) : "";
}

function speakableForChunk(value) {
  const text = norm(value);
  if (/^[가-힣]+$/u.test(text)) return text;
  if (/^[ㄱ-ㅎㅏ-ㅣ]+$/u.test(text)) {
    return Array.from(text)
      .map((character) => HANGUL_JAMO_SPEAK[character] || complexFinalDemo(character) || character)
      .join(" ");
  }
  return text;
}

function createManifestCollector() {
  const entries = new Map();

  const add = (value, category, spokenValue = undefined) => {
    const key = norm(value);
    if (!key) return;
    const speechText = norm(spokenValue === undefined ? (SPEECH_OVERRIDES[key] || key) : spokenValue);
    if (!speechText) throw new Error(`empty speech text for manifest key ${JSON.stringify(key)}`);

    let entry = entries.get(key);
    if (!entry) {
      entry = { key, speechText, categories: new Set() };
      entries.set(key, entry);
    } else if (entry.speechText !== speechText) {
      throw new Error(
        `conflicting speech text for ${JSON.stringify(key)}: ${JSON.stringify(entry.speechText)} vs ${JSON.stringify(speechText)}`,
      );
    }
    entry.categories.add(category);
  };

  const addSentenceAndTokens = (value, phraseCategory, tokenCategory) => {
    const sentence = norm(value);
    if (!sentence || !hasHangul(sentence)) return;
    add(sentence, phraseCategory);
    for (const token of tokenizeSentence(sentence)) add(token, tokenCategory);
  };

  const records = () => [...entries.values()]
    .map((entry) => ({
      key: entry.key,
      speechText: entry.speechText,
      categories: [...entry.categories].sort(),
    }))
    .sort((a, b) => a.key.localeCompare(b.key, "ko"));

  return { add, addSentenceAndTokens, records };
}

function createBrowserSandbox() {
  const window = {};
  const sandbox = { window, self: window };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  return sandbox;
}

function loadDataGlobals() {
  const sandbox = createBrowserSandbox();
  const loaded = {};
  for (const [filename, globalName] of DATA_GLOBALS) {
    const filePath = path.join(ROOT, filename);
    if (!fs.existsSync(filePath)) throw new Error(`required audio source file is missing: ${filename}`);
    vm.runInContext(fs.readFileSync(filePath, "utf8"), sandbox, { filename });
    loaded[globalName] = sandbox.window[globalName];
  }
  return loaded;
}

function parseCsv(source) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (quoted) {
      if (character === '"' && source[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
      continue;
    }

    if (character === '"') {
      quoted = true;
    } else if (character === ",") {
      row.push(field);
      field = "";
    } else if (character === "\n") {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += character;
    }
  }

  if (field || row.length) {
    row.push(field.replace(/\r$/, ""));
    rows.push(row);
  }
  if (quoted) throw new Error("unterminated quoted CSV field");
  return rows;
}

function extractConstLiteral(source, constantName) {
  const marker = new RegExp(`\\bconst\\s+${constantName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*=`);
  const match = marker.exec(source);
  if (!match) throw new Error(`could not find const ${constantName} in app.js`);

  let start = match.index + match[0].length;
  while (/\s/.test(source[start] || "")) start += 1;
  const opener = source[start];
  const closer = opener === "[" ? "]" : opener === "{" ? "}" : "";
  if (!closer) throw new Error(`const ${constantName} is not an array/object literal`);

  let depth = 0;
  let quote = "";
  let escaped = false;
  let lineComment = false;
  let blockComment = false;

  for (let index = start; index < source.length; index += 1) {
    const character = source[index];
    const next = source[index + 1] || "";

    if (lineComment) {
      if (character === "\n") lineComment = false;
      continue;
    }
    if (blockComment) {
      if (character === "*" && next === "/") {
        blockComment = false;
        index += 1;
      }
      continue;
    }
    if (quote) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === quote) quote = "";
      continue;
    }
    if (character === "/" && next === "/") {
      lineComment = true;
      index += 1;
      continue;
    }
    if (character === "/" && next === "*") {
      blockComment = true;
      index += 1;
      continue;
    }
    if (character === '"' || character === "'" || character === "`") {
      quote = character;
      continue;
    }
    if (character === opener) depth += 1;
    else if (character === closer) {
      depth -= 1;
      if (depth === 0) return source.slice(start, index + 1);
    }
  }
  throw new Error(`unterminated const ${constantName} literal`);
}

function loadAppConstant(appSource, constantName) {
  const literal = extractConstLiteral(appSource, constantName);
  return vm.runInNewContext(`(${literal})`, Object.create(null), { filename: `app.js:${constantName}` });
}

function assertRuntimeConstantMatches(appSource, constantName, expected) {
  const actual = loadAppConstant(appSource, constantName);
  const actualEntries = Object.entries(actual).sort(([a], [b]) => a.localeCompare(b));
  const expectedEntries = Object.entries(expected).sort(([a], [b]) => a.localeCompare(b));
  if (JSON.stringify(actualEntries) !== JSON.stringify(expectedEntries)) {
    throw new Error(
      `${constantName} changed in app.js; update the explicit audio-manifest mirror before generating assets`,
    );
  }
}

function addHangulChunks(collector, value, category) {
  const text = norm(value);
  for (const match of text.matchAll(HANGUL_CHUNK_RE)) {
    const speechText = speakableForChunk(match[0]);
    if (speechText) collector.add(speechText, category);
  }
}

function collectPhaseOne(collector, appSource) {
  const lessons = loadAppConstant(appSource, "phaseOneLessons");
  for (const lesson of lessons) {
    for (const intro of lesson.introCards || []) {
      addHangulChunks(collector, intro.cool || lesson.goal, "phase-one-clickable");
    }
    for (const concept of lesson.concepts || []) {
      for (const chunk of String(concept.voiceText || "").split(/[,、/·|]+/)) {
        if (norm(chunk)) collector.add(chunk, "phase-one-voice");
      }
      addHangulChunks(collector, concept.visual, "phase-one-clickable");
      addHangulChunks(collector, concept.cue, "phase-one-clickable");
      for (const diagram of concept.diagram || []) {
        const assembled = diagram.char || "";
        if (assembled) collector.add(assembled, "phase-one-diagram");
      }
      for (const block of concept.wordBreakdown || []) {
        if (block.char) collector.add(block.char, "phase-one-diagram");
      }
    }
    for (const question of lesson.questions || []) {
      for (const chunk of String(question.voiceText || "").split(/[,、/·|]+/)) {
        if (norm(chunk)) collector.add(chunk, "phase-one-voice");
      }
      addHangulChunks(collector, question.visual, "phase-one-clickable");
      for (const option of question.options || []) {
        const label = norm(option).toLowerCase();
        if (SOUND_LABEL_SPEAK[label]) collector.add(SOUND_LABEL_SPEAK[label], "phase-one-option");
        else if (DOCUMENTED_SILENT_KEYS.has(norm(option))) collector.add(option, "documented-silence");
        else if (hasHangul(option)) addHangulChunks(collector, option, "phase-one-option");
      }
    }
  }
}

function collectAppStaticData(collector, appSource) {
  const sentenceFields = ["voiceText", "korean", "sentence", "phrase", "answer", "reply", "starter", "honorific", "plain"];
  const wordFields = ["base", "present", "past", "future", "text", "example"];

  const visit = (value, category, collectSentenceTokens) => {
    if (!value || typeof value !== "object") return;
    if (Array.isArray(value)) {
      for (const item of value) visit(item, category, collectSentenceTokens);
      return;
    }

    for (const field of sentenceFields) {
      if (typeof value[field] === "string" && hasHangul(value[field])) {
        if (collectSentenceTokens) collector.addSentenceAndTokens(value[field], category, "sentence-token");
        else collector.add(value[field], category);
      }
    }
    for (const field of wordFields) {
      if (typeof value[field] === "string" && hasHangul(value[field])) {
        collector.add(value[field], category);
      }
    }
    for (const option of value.options || []) {
      if (typeof option === "string" && hasHangul(option)) collector.add(option, "app-korean-option");
    }
    // Hangul Writing speaks each raw jamo in HANGUL_WRITING_UNITS.glyphs.
    // Keep that runtime surface explicit so future edits cannot silently fall
    // back to browser TTS even though the nested array has no voiceText field.
    for (const glyph of value.glyphs || []) {
      if (typeof glyph === "string" && hasHangul(glyph)) collector.add(glyph, "hangul-writing-glyph");
    }
    for (const nested of Object.values(value)) {
      if (nested && typeof nested === "object") visit(nested, category, collectSentenceTokens);
    }
  };

  for (const constantName of APP_STATIC_ARRAYS) {
    visit(
      loadAppConstant(appSource, constantName),
      `app:${constantName}`,
      APP_SENTENCE_TOKEN_ARRAYS.has(constantName),
    );
  }

  for (const constantName of ["HANGUL_JAMO_SPEAK", "BATCHIM_GROUP_SOUND_SPEAK", "BATCHIM_GROUP_WORD_SAMPLE"]) {
    const values = loadAppConstant(appSource, constantName);
    for (const value of Object.values(values)) collector.add(value, `app:${constantName}`);
  }
}

function collectFutureDataFields(collector, value, source, seen = new Set()) {
  if (!value || typeof value !== "object" || seen.has(value)) return;
  seen.add(value);
  if (Array.isArray(value)) {
    for (const item of value) collectFutureDataFields(collector, item, source, seen);
    return;
  }
  for (const [field, child] of Object.entries(value)) {
    if ((field === "voiceText" || field === "audioText") && typeof child === "string" && hasHangul(child)) {
      collector.add(child, `${source}:${field}`);
    } else if (field === "tokens" && Array.isArray(child)) {
      for (const token of child) {
        if (typeof token === "string" && hasHangul(token)) collector.add(cleanSentenceToken(token), `${source}:token`);
      }
    }
    if (child && typeof child === "object") collectFutureDataFields(collector, child, source, seen);
  }
}

export function buildLearnerAudioManifest() {
  const collector = createManifestCollector();
  const appSource = fs.readFileSync(APP_FILE, "utf8");
  const globals = loadDataGlobals();

  // These mirrors are used to reproduce app.js's dynamic speech conversion.
  // Fail closed if runtime mappings change so the generator never allocates
  // assets using stale pronunciation rules.
  assertRuntimeConstantMatches(appSource, "HANGUL_JAMO_SPEAK", HANGUL_JAMO_SPEAK);
  assertRuntimeConstantMatches(appSource, "HANGUL_COMPLEX_FINAL_INDEX", COMPLEX_FINAL_INDEX);
  assertRuntimeConstantMatches(appSource, "CLICKABLE_SOUND_LABEL_SPEAK", SOUND_LABEL_SPEAK);
  assertRuntimeConstantMatches(appSource, "WORD_TILE_DISTRACTORS", WORD_TILE_DISTRACTORS);

  // Complete modern syllabary used by INITIALS × MEDIALS × FINALS in the lab.
  for (let codePoint = 0xac00; codePoint <= 0xd7a3; codePoint += 1) {
    collector.add(String.fromCharCode(codePoint), "modern-syllable");
  }

  const words = Array.isArray(globals.HANAPATH_CURATED_WORDS) ? globals.HANAPATH_CURATED_WORDS : [];
  for (const word of words) {
    collector.add(word.voiceText || word.korean, "word-voice");
    collector.add(word.exampleVoiceText || word.exampleKo, "word-example-voice");

    const target = Array.isArray(word.forms) && word.forms.length ? word.forms[0] : word.korean;
    for (const character of Array.from(String(target || ""))) {
      if (/^[가-힣]$/u.test(character)) collector.add(character, "word-type-tile");
    }
  }
  for (const tile of WORD_TILE_DISTRACTORS) collector.add(tile, "word-type-tile");

  const sentences = Array.isArray(globals.HANAPATH_SENTENCES) ? globals.HANAPATH_SENTENCES : [];
  for (const sentence of sentences) {
    collector.add(sentence.voiceText || sentence.korean, "sentence-voice");
    // getSentenceTokenBank() intentionally draws answer/distractor tokens from
    // legacy-app rows; v2 lesson helper tiles are not audio controls. Keep this
    // aligned with the actual clickable-token runtime instead of generating
    // thousands of unused token recordings from every authored row.
    if (sentence.source === "legacy-app") {
      for (const token of sentence.tokens || tokenizeSentence(sentence.korean)) {
        collector.add(cleanSentenceToken(token), "sentence-token");
      }
    }
  }

  // Keep lesson-plan audio fields additive: future authored voiceText/tokens in
  // either source file become required without returning to regex scraping.
  collectFutureDataFields(collector, globals.HANAPATH_WORD_LESSONS, "words_lesson_plan.js");
  collectFutureDataFields(collector, globals.HANAPATH_SENTENCE_LESSONS, "sentences_lesson_plan.js");

  for (const filename of CSV_FILES) {
    const rows = parseCsv(fs.readFileSync(path.join(ROOT, filename), "utf8"));
    const header = rows.shift() || [];
    const koreanIndex = header.indexOf("korean_spelling");
    if (koreanIndex < 0) throw new Error(`${filename}: missing korean_spelling column`);
    for (const row of rows) {
      const korean = norm(row[koreanIndex]);
      if (korean && hasHangul(korean)) collector.add(korean, `csv:${filename}`);
    }
  }

  collectPhaseOne(collector, appSource);
  collectAppStaticData(collector, appSource);

  // L3 executes the real authored-item generators and traverses the loaded
  // examination contracts. This closes the gap left by static voiceText-only
  // discovery, especially the finite past/negation Form Check production pool.
  for (const target of collectAuthoredAudioTargets(ROOT)) {
    for (const category of target.categories) collector.add(target.key, category);
  }

  // Explicitly retain all complex-final demo outputs even if Phase One copy is
  // edited; speakableForChunk() can produce any of these at runtime.
  for (const final of Object.keys(COMPLEX_FINAL_INDEX)) {
    collector.add(complexFinalDemo(final), "complex-final-demo");
  }

  collector.add("No sound", "documented-silence");
  return collector.records();
}

function loadAudioMap() {
  const source = fs.readFileSync(AUDIO_MAP_FILE, "utf8");
  const sandbox = createBrowserSandbox();
  vm.runInContext(source, sandbox, { filename: "audio_map.js" });
  return sandbox.window.AUDIO_MAP || {};
}

function resolveMappedAsset(mappedPath) {
  if (typeof mappedPath !== "string" || !mappedPath.startsWith("./audio/")) {
    return { status: "bad-path", filePath: "" };
  }
  const filePath = path.resolve(ROOT, mappedPath.slice(2));
  const relative = path.relative(AUDIO_ROOT, filePath);
  if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) {
    return { status: "bad-path", filePath };
  }
  if (!fs.existsSync(filePath)) return { status: "missing-file", filePath };
  const stat = fs.statSync(filePath);
  if (!stat.isFile()) return { status: "bad-path", filePath };
  if (stat.size === 0) return { status: "empty-file", filePath };

  const header = Buffer.alloc(12);
  const handle = fs.openSync(filePath, "r");
  const bytesRead = fs.readSync(handle, header, 0, header.length, 0);
  fs.closeSync(handle);
  const bytes = header.subarray(0, bytesRead);
  const extension = path.extname(filePath).toLowerCase();
  const validOgg = extension === ".ogg" && bytes.length >= 4 && bytes.subarray(0, 4).toString("ascii") === "OggS";
  const validMp3 = extension === ".mp3" && (
    (bytes.length >= 3 && bytes.subarray(0, 3).toString("ascii") === "ID3") ||
    (bytes.length >= 2 && bytes[0] === 0xff && (bytes[1] & 0xe0) === 0xe0)
  );
  if (!validOgg && !validMp3) return { status: "bad-signature", filePath };
  return { status: "ok", filePath, size: stat.size };
}

function summarizeCategories(records) {
  const counts = new Map();
  for (const record of records) {
    for (const category of record.categories) counts.set(category, (counts.get(category) || 0) + 1);
  }
  return [...counts.entries()].sort(([a], [b]) => a.localeCompare(b));
}

function summarizeIssueCategories(issues) {
  const counts = new Map();
  for (const issue of issues) {
    for (const category of issue.record.categories) {
      counts.set(category, (counts.get(category) || 0) + 1);
    }
  }
  return [...counts.entries()].sort(([a], [b]) => a.localeCompare(b));
}

function printIssueCategorySummary(label, issues) {
  if (!issues.length) return;
  console.log(`\n${label}:`);
  for (const [category, count] of summarizeIssueCategories(issues)) {
    console.log(`  ${category.padEnd(42)} ${count}`);
  }
}

function printIssueSamples(label, issues, limit = 40) {
  if (!issues.length) return;
  console.log(`\n${label}:`);
  for (const issue of issues.slice(0, limit)) {
    const categories = issue.record.categories.join(", ");
    console.log(`  - ${JSON.stringify(issue.record.key)} [${categories}]${issue.mappedPath ? ` -> ${issue.mappedPath}` : ""}`);
  }
  if (issues.length > limit) console.log(`  …and ${issues.length - limit} more`);
}

function isMainModule() {
  if (!process.argv[1]) return false;
  return path.resolve(process.argv[1]) === url.fileURLToPath(import.meta.url);
}

if (isMainModule()) {
  let manifest;
  try {
    manifest = buildLearnerAudioManifest();
  } catch (error) {
    console.error(`ERROR: could not build learner audio manifest: ${error.message}`);
    process.exit(2);
  }

  if (process.argv.includes("--manifest-json")) {
    // Exit only after stdout drains: process.exit() right after a multi-MB
    // write truncates the payload when stdout is a pipe (as it is when
    // generate_assets.py consumes this output).
    await new Promise((flushed) => {
      process.stdout.write(JSON.stringify({ version: 1, entries: manifest }), flushed);
    });
    process.exit(0);
  }

  const audioMap = loadAudioMap();
  const normalizedMap = new Map();
  for (const [key, value] of Object.entries(audioMap)) {
    const normalized = norm(key);
    if (!normalizedMap.has(normalized)) normalizedMap.set(normalized, value);
  }

  const missingMap = [];
  const invalidAssets = [];
  let valid = 0;
  for (const record of manifest) {
    const mappedPath = normalizedMap.get(record.key);
    if (!mappedPath) {
      missingMap.push({ record, mappedPath: "" });
      continue;
    }
    const asset = resolveMappedAsset(mappedPath);
    if (asset.status !== "ok") {
      invalidAssets.push({ record, mappedPath, status: asset.status });
      continue;
    }
    valid += 1;
  }

  const invalidByStatus = new Map();
  for (const issue of invalidAssets) invalidByStatus.set(issue.status, (invalidByStatus.get(issue.status) || 0) + 1);

  console.log("Learner-facing audio coverage audit");
  console.log("===================================");
  console.log(`manifest entries : ${manifest.length}`);
  console.log(`audio_map keys   : ${Object.keys(audioMap).length}`);
  console.log(`valid assets     : ${valid}`);
  console.log(`missing mappings : ${missingMap.length}`);
  console.log(`invalid assets   : ${invalidAssets.length}`);
  for (const [status, count] of [...invalidByStatus.entries()].sort()) console.log(`  ${status.padEnd(14)} ${count}`);
  console.log(`documented silent: ${[...DOCUMENTED_SILENT_KEYS].join(", ")}`);
  console.log("\nManifest categories:");
  for (const [category, count] of summarizeCategories(manifest)) console.log(`  ${category.padEnd(42)} ${count}`);

  printIssueCategorySummary("Missing mappings by category (categories overlap)", missingMap);
  printIssueCategorySummary("Invalid assets by category (categories overlap)", invalidAssets);

  printIssueSamples("Missing AUDIO_MAP entries", missingMap);
  printIssueSamples("Mapped assets that are missing, empty, or malformed", invalidAssets);

  const failed = missingMap.length > 0 || invalidAssets.length > 0;
  console.log(failed ? "\nResult: learner-facing audio gaps found." : "\nResult: every learner-facing audio target has a valid local asset.");
  process.exit(failed ? 1 : 0);
}
