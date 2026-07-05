import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
export const WORDS_FILE = join(ROOT, "words_curated_core.js");
export const AUDIO_FILE = join(ROOT, "audio_map.js");
export const SENTENCES_FILE = join(ROOT, "sentences_core.js");

function createSandbox() {
  const window = {};
  const sandbox = { window, self: window };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  return sandbox;
}

export function loadBrowserGlobal(filePath, globalName) {
  const sandbox = createSandbox();
  const code = readFileSync(filePath, "utf8");
  vm.runInContext(code, sandbox, { filename: filePath });
  return sandbox.window[globalName];
}

export function loadCuratedWords() {
  return loadBrowserGlobal(WORDS_FILE, "HANAPATH_CURATED_WORDS") || [];
}

export function loadAudioMap() {
  return loadBrowserGlobal(AUDIO_FILE, "AUDIO_MAP") || {};
}

export function loadExistingSentenceBank() {
  if (!existsSync(SENTENCES_FILE)) {
    return [];
  }
  return loadBrowserGlobal(SENTENCES_FILE, "HANAPATH_SENTENCES") || [];
}

export function normalizeSentenceKey(value) {
  return String(value || "")
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[\s.,!?;:"'`~(){}\[\]<>\/·-]+/g, "");
}

export function tokenizeSentenceText(value) {
  return String(value || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

export function cleanSentenceToken(token) {
  return String(token || "")
    .replace(/[.,!?;:"'`~(){}\[\]<>\/·-]+$/g, "")
    .trim();
}

export function uniqueStrings(values) {
  const seen = new Set();
  const out = [];
  for (const value of values || []) {
    const text = String(value || "").trim();
    if (!text || seen.has(text)) continue;
    seen.add(text);
    out.push(text);
  }
  return out;
}

export function mergeStringLists(...lists) {
  return uniqueStrings(lists.flat());
}

export function inferSentenceBand(tokenCount, difficulty) {
  const safeTokenCount = Number.isFinite(Number(tokenCount)) ? Number(tokenCount) : 1;
  const tokenBand = Math.max(1, Math.min(5, safeTokenCount - 2));
  const safeDifficulty = Math.max(1, Number(difficulty) || 1);
  const difficultyBand = safeDifficulty >= 4 ? 5 : Math.min(3, safeDifficulty);
  return Math.max(tokenBand, difficultyBand);
}

function hasTokenEnding(tokens, endings) {
  return tokens.some((token) => endings.some((ending) => token.endsWith(ending)));
}

function includesAny(text, needles) {
  return needles.some((needle) => text.includes(needle));
}

const SENTENCE_TAG_CHECKS = [
  ["topic-neun", ({ tokens }) => hasTokenEnding(tokens, ["은", "는"])],
  ["subject-i-ga", ({ tokens }) => hasTokenEnding(tokens, ["이", "가"])],
  ["object-eul-reul", ({ tokens }) => hasTokenEnding(tokens, ["을", "를"])],
  ["location-e", ({ tokens }) => hasTokenEnding(tokens, ["에"])],
  ["location-eseo", ({ tokens }) => hasTokenEnding(tokens, ["에서"])],
  ["direction-euro", ({ tokens }) => hasTokenEnding(tokens, ["으로", "로"])],
  ["possessive-ui", ({ tokens }) => hasTokenEnding(tokens, ["의"])],
  ["with-hago-wa", ({ tokens }) => hasTokenEnding(tokens, ["하고", "와", "과"])],
  ["only-man", ({ tokens }) => hasTokenEnding(tokens, ["만"])],
  ["also-do", ({ tokens }) => hasTokenEnding(tokens, ["도"])],
  ["from-buteo", ({ tokens }) => hasTokenEnding(tokens, ["부터"])],
  ["until-kkaji", ({ tokens }) => hasTokenEnding(tokens, ["까지"])],
  ["present-polite", ({ compact }) => includesAny(compact, ["아요", "어요", "여요", "해요", "네요", "군요"])],
  ["past-polite", ({ compact }) => includesAny(compact, ["았어요", "었어요", "였어요", "했어요", "았어", "었어"])],
  ["future-geoyeyo", ({ compact }) => includesAny(compact, ["겠어요", "거예요", "을거예요", "ㄹ거예요", "겠습니다", "을게요", "ㄹ게요"])],
  ["formal-nida", ({ compact }) => includesAny(compact, ["습니다", "ㅂ니다", "합니다"])],
  ["copula-ieyo", ({ compact }) => includesAny(compact, ["이에요", "예요", "입니다", "이다", "이야"])],
  ["copula-negative-anieyo", ({ compact }) => includesAny(compact, ["아니에요", "아니야", "아닙니다"])],
  ["question-polite", ({ raw, compact }) => /[?？]$/.test(raw) || includesAny(compact, ["나요", "까요", "지요", "죠", "습니까"])],
  ["imperative-seyo", ({ compact }) => includesAny(compact, ["세요", "십시오", "주세요", "셔요"])],
  ["propositive-eyo", ({ tokens, compact }) => tokens.some((token) => token === "자" || token === "가자" || token === "하자") || includesAny(compact, ["읍시다", "합시다", "봅시다"])],
  ["neg-an", ({ tokens, compact }) => includesAny(tokens, ["안"]) || includesAny(compact, ["안돼", "안되", "않"])],
  ["neg-mot", ({ tokens, compact }) => includesAny(tokens, ["못"]) || includesAny(compact, ["못"])],
  ["neg-ji-anta", ({ compact }) => includesAny(compact, ["지않", "지 않"])],
  ["and-go", ({ tokens, compact }) => hasTokenEnding(tokens, ["고"]) || includesAny(compact, ["그리고"])],
  ["but-jiman", ({ compact }) => includesAny(compact, ["지만"])],
  ["because-aseo", ({ compact }) => includesAny(compact, ["아서", "어서", "해서", "라서"])],
  ["if-myeon", ({ compact }) => includesAny(compact, ["면"])],
  ["when-ttae", ({ compact }) => includesAny(compact, ["때"])],
  ["want-go-sipda", ({ compact }) => includesAny(compact, ["고싶", "고 싶"])],
  ["can-su-itda", ({ compact }) => includesAny(compact, ["수있", "수 있"])],
  ["must-ya-dwaeda", ({ compact }) => includesAny(compact, ["해야", "야해", "야 돼", "해야돼", "해야 해"])],
  ["honorific-si", ({ tokens, compact }) => hasTokenEnding(tokens, ["시", "셔", "시겠", "십", "세요", "십시오"]) || includesAny(compact, ["시요"])],
  ["counter-phrase", ({ tokens, compact }) => /\d/.test(compact) || tokens.some((token) => ["하나", "둘", "셋", "넷", "다섯", "여섯", "일곱", "여덟", "아홉", "열"].includes(token) || /(?:명|개|시|분|살|권|대|번|층|잔|병|마리|장|달)$/.test(token))],
  ["time-expression", ({ compact }) => includesAny(compact, ["오늘", "내일", "어제", "지금", "아침", "점심", "저녁", "오전", "오후", "주말", "매일", "방금", "곧", "올해", "내년", "지난주", "이번주", "다음주"])],
  ["comparison-boda", ({ compact }) => includesAny(compact, ["보다"])],
  ["existence-itda", ({ compact }) => includesAny(compact, ["있어요", "없어요", "있다", "없다", "있습니다", "없습니다"])],
];

export function inferPatternTags(korean) {
  const raw = String(korean || "").normalize("NFC");
  const tokens = tokenizeSentenceText(raw).map(cleanSentenceToken);
  const compact = tokens.join("");
  const context = { raw, tokens, compact };
  const tags = [];

  for (const [tag, predicate] of SENTENCE_TAG_CHECKS) {
    if (predicate(context)) {
      tags.push(tag);
    }
  }

  if (!tags.length) {
    if (compact.endsWith("요")) {
      tags.push("present-polite");
    } else if (compact.endsWith("다")) {
      tags.push("formal-nida");
    } else {
      tags.push("present-polite");
    }
  }

  return tags;
}

function getSentenceIdNumber(id) {
  const match = /^s(\d+)$/.exec(String(id || ""));
  return match ? Number(match[1]) : null;
}

function buildExistingBankMaps(existingSentences) {
  const byKey = new Map();
  const usedIds = new Set();
  let maxId = 0;

  for (const row of existingSentences || []) {
    if (!row || typeof row !== "object") continue;
    const key = normalizeSentenceKey(row.korean);
    if (!key || byKey.has(key)) continue;
    byKey.set(key, row);
    if (row.id) {
      usedIds.add(String(row.id));
      const n = getSentenceIdNumber(row.id);
      if (n && n > maxId) maxId = n;
    }
  }

  return { byKey, usedIds, maxId };
}

function mergeMaybeExistingRow(existing, derived, usedIds, nextId) {
  const row = existing && typeof existing === "object" ? { ...existing } : {};
  if (!row.id) {
    row.id = `s${String(nextId).padStart(4, "0")}`;
  }
  if (usedIds) usedIds.add(row.id);

  row.korean = derived.korean;
  row.english = derived.english;
  row.voiceText = derived.voiceText;
  row.tokens = derived.tokens;

  if (typeof row.band !== "number") row.band = derived.band;
  if (!Array.isArray(row.patternTags) || row.patternTags.length === 0) row.patternTags = derived.patternTags;
  if (!Array.isArray(row.focusWordIds) || row.focusWordIds.length === 0) row.focusWordIds = derived.focusWordIds;
  else row.focusWordIds = mergeStringLists(row.focusWordIds, derived.focusWordIds);
  if (!Array.isArray(row.sourceWordIds) || row.sourceWordIds.length === 0) row.sourceWordIds = derived.sourceWordIds;
  else row.sourceWordIds = mergeStringLists(row.sourceWordIds, derived.sourceWordIds);
  if (!row.speechLevel) row.speechLevel = derived.speechLevel;
  if (!row.register) row.register = derived.register;
  if (!row.source) row.source = derived.source;
  if (typeof row.grammarTip !== "string") row.grammarTip = derived.grammarTip;
  if (!Array.isArray(row.acceptAlso)) row.acceptAlso = derived.acceptAlso;
  if (!row.annotationSource || typeof row.annotationSource !== "object" || Array.isArray(row.annotationSource)) {
    row.annotationSource = derived.annotationSource;
  }

  return row;
}

export function buildSentenceBank({ words, existingSentences = [] }) {
  const { byKey: existingByKey, usedIds, maxId } = buildExistingBankMaps(existingSentences);
  const groups = new Map();
  const order = [];

  for (const word of words || []) {
    if (!word || typeof word !== "object") continue;
    const sentence = String(word.exampleKo || "").trim();
    if (!sentence) continue;
    const key = normalizeSentenceKey(sentence);
    if (!key) continue;
    if (!groups.has(key)) {
      groups.set(key, []);
      order.push(key);
    }
    groups.get(key).push(word);
  }

  const sentences = [];
  let nextId = maxId + 1;
  let reusedIds = 0;
  let assignedIds = 0;
  let duplicateGroups = 0;

  for (const key of order) {
    const group = groups.get(key) || [];
    if (!group.length) continue;
    if (group.length > 1) duplicateGroups += 1;

    const primary = group[0];
    const korean = String(primary.exampleKo || "").trim();
    const english = String(primary.exampleEn || "").trim();
    const voiceText = String(primary.exampleVoiceText || primary.exampleKo || "").trim();
    const tokens = tokenizeSentenceText(korean);
    const sourceWordIds = uniqueStrings(group.map((row) => row.id));
    const mergedDifficulty = Math.max(
      ...group.map((row) => Math.max(1, Number(row.difficulty) || 1)),
      1,
    );
    const band = inferSentenceBand(tokens.length, mergedDifficulty);
    const patternTags = inferPatternTags(korean);
    const derived = {
      id: "",
      korean,
      english,
      voiceText,
      tokens,
      band,
      patternTags,
      focusWordIds: sourceWordIds,
      speechLevel: String(primary.speechLevel || "polite").trim() || "polite",
      register: String(primary.register || "everyday").trim() || "everyday",
      source: "words-core",
      sourceWordIds,
      grammarTip: "",
      acceptAlso: [],
      annotationSource: { band: "inferred", patternTags: "inferred" },
    };

    const existing = existingByKey.get(key);
    const before = nextId;
    const row = mergeMaybeExistingRow(existing, derived, usedIds, nextId);
    if (existing && existing.id) {
      reusedIds += 1;
    } else {
      assignedIds += 1;
      nextId += 1;
      while (usedIds.has(`s${String(nextId).padStart(4, "0")}`)) {
        nextId += 1;
      }
    }

    // Keep the row in source order. Existing ids remain frozen, but new ids
    // are assigned deterministically in first-seen sentence order.
    if (row.id && !existing?.id) {
      row.id = `s${String(before).padStart(4, "0")}`;
    }
    sentences.push(row);
  }

  return {
    sentences,
    stats: {
      sourceRows: Array.isArray(words) ? words.length : 0,
      uniqueSentences: sentences.length,
      duplicateGroups,
      reusedIds,
      assignedIds,
    },
  };
}

export function serializeSentenceBank(sentences) {
  const payload = JSON.stringify(sentences, null, 2);
  return [
    "// HanaPath sentence bank (Sentences section).",
    "// Plain static browser global — no build step. Generated from words_curated_core.js.",
    "// The build script preserves existing ids and curated overrides when rerun.",
    "(function () {",
    '  "use strict";',
    `  window.HANAPATH_SENTENCES = ${payload};`,
    "})();",
    "",
  ].join("\n");
}

export function writeSentenceBankFile(sentences) {
  writeFileSync(SENTENCES_FILE, serializeSentenceBank(sentences), "utf8");
}
