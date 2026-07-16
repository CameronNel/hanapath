#!/usr/bin/env node
import { existsSync, statSync } from "node:fs";
import { isAbsolute, relative, resolve } from "node:path";
import { ROOT, loadAudioMap, loadCuratedWords, loadExistingSentenceBank, normalizeSentenceKey } from "./sentences-bank.mjs";

const strict = process.argv.includes("--strict");
const words = loadCuratedWords();
const sentences = loadExistingSentenceBank();
const audioMap = loadAudioMap();
const normalizedAudioMap = new Map();
for (const [key, value] of Object.entries(audioMap || {})) {
  const normalized = String(key).trim().normalize("NFC");
  if (!normalizedAudioMap.has(normalized)) normalizedAudioMap.set(normalized, value);
}
const audioRoot = resolve(ROOT, "audio");
// The only deliberate non-speech entry is a real Ogg silence asset. Required
// spoken rows never get a zero-byte exception.
const DOCUMENTED_SILENT_KEYS = new Set(["No sound"]);

const errors = [];
const warnings = [];

const HANGUL_RE = /[가-힣ㄱ-ㅎㅏ-ㅣ]/;
const LATIN_RE = /[A-Za-z]/;
const VALID_REGISTER = new Set(["everyday", "polite", "formal", "honorific", "written-formal"]);
const VALID_SPEECH_LEVEL = new Set(["plain", "polite informal", "polite formal"]);
const VALID_SOURCE = new Set(["words-core", "legacy-app", "authored"]);
const VALID_ANNOTATION_SOURCE = new Set(["explicit", "inferred", "absent"]);
const VALID_PATTERN_TAGS = new Set([
  "topic-neun",
  "subject-i-ga",
  "object-eul-reul",
  "location-e",
  "location-eseo",
  "direction-euro",
  "possessive-ui",
  "with-hago-wa",
  "only-man",
  "also-do",
  "from-buteo",
  "until-kkaji",
  "present-polite",
  "past-polite",
  "future-geoyeyo",
  "formal-nida",
  "copula-ieyo",
  "copula-negative-anieyo",
  "question-polite",
  "imperative-seyo",
  "propositive-eyo",
  "neg-an",
  "neg-mot",
  "neg-ji-anta",
  "and-go",
  "but-jiman",
  "because-aseo",
  "if-myeon",
  "when-ttae",
  "want-go-sipda",
  "can-su-itda",
  "must-ya-dwaeda",
  "honorific-si",
  "counter-phrase",
  "time-expression",
  "comparison-boda",
  "existence-itda",
]);
const wordsById = new Map((words || []).map((word) => [word.id, word]));
const sentenceIds = new Set();
const normalizedSentenceKeys = new Map();
let sentenceAudioMisses = 0;

const annotationSourceCounts = {
  band: { explicit: 0, inferred: 0, absent: 0 },
  patternTags: { explicit: 0, inferred: 0, absent: 0 },
};

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function normalizeForCheck(value) {
  return String(value || "")
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[\s.,!?;:"'`~(){}\[\]<>\/·-]+/g, "");
}

function tokenizeForCheck(value) {
  return String(value || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function stripTrailingPunctuation(token) {
  return String(token || "")
    .replace(/[.,!?;:"'`~(){}\[\]<>\/·-]+$/g, "")
    .trim();
}

function mappedAssetStatus(token) {
  const normalized = String(token || "").trim().normalize("NFC");
  const mapped = normalizedAudioMap.get(normalized);
  if (!mapped) return { ok: false, reason: "missing AUDIO_MAP key" };
  if (typeof mapped !== "string" || !mapped.startsWith("./audio/")) {
    return { ok: false, reason: `invalid mapped path ${JSON.stringify(mapped)}` };
  }
  const filePath = resolve(ROOT, mapped.slice(2));
  const rel = relative(audioRoot, filePath);
  if (!rel || rel.startsWith("..") || isAbsolute(rel)) {
    return { ok: false, reason: `mapped path escapes audio/: ${JSON.stringify(mapped)}` };
  }
  if (!existsSync(filePath)) return { ok: false, reason: `mapped file is missing: ${mapped}` };
  const stat = statSync(filePath);
  if (!stat.isFile()) return { ok: false, reason: `mapped path is not a file: ${mapped}` };
  if (stat.size === 0) return { ok: false, reason: `mapped file is zero-byte: ${mapped}` };
  return { ok: true, reason: DOCUMENTED_SILENT_KEYS.has(normalized) ? "documented silence" : "" };
}

function audioStatus(text) {
  const trimmed = String(text || "").trim();
  if (!trimmed) return { ok: true, reason: "" };
  return mappedAssetStatus(trimmed);
}

function summarizeAnnotationSource(row, label) {
  const source = row.annotationSource;
  if (!source || typeof source !== "object" || Array.isArray(source)) {
    errors.push(`${label}: missing annotationSource`);
    return;
  }
  for (const key of ["band", "patternTags"]) {
    const value = source[key];
    if (!VALID_ANNOTATION_SOURCE.has(value)) {
      errors.push(`${label}: invalid annotationSource.${key} "${value}"`);
      continue;
    }
    annotationSourceCounts[key][value] += 1;
  }
}

if (!Array.isArray(words) || !words.length) {
  errors.push("window.HANAPATH_CURATED_WORDS is missing or empty");
}

if (!Array.isArray(sentences) || !sentences.length) {
  errors.push("window.HANAPATH_SENTENCES is missing or empty");
}

for (const row of sentences || []) {
  const label = row.id || row.korean || "(unknown sentence)";
  if (!row.id) {
    errors.push(`${label}: missing id`);
  } else if (sentenceIds.has(row.id)) {
    errors.push(`duplicate sentence id: ${row.id}`);
  } else {
    sentenceIds.add(row.id);
  }

  const normalizedKey = normalizeSentenceKey(row.korean);
  if (!normalizedKey) {
    errors.push(`${label}: missing korean`);
  } else if (normalizedSentenceKeys.has(normalizedKey)) {
    const firstId = normalizedSentenceKeys.get(normalizedKey);
    errors.push(`duplicate korean sentence: ${row.id} and ${firstId} both normalize to "${normalizedKey}"`);
  } else {
    normalizedSentenceKeys.set(normalizedKey, row.id);
  }

  if (!isNonEmptyString(row.english)) {
    errors.push(`${label}: missing english`);
  }
  if (!isNonEmptyString(row.voiceText)) {
    errors.push(`${label}: missing voiceText`);
  } else {
    if (!HANGUL_RE.test(row.voiceText)) {
      errors.push(`${label}: voiceText has no Hangul: ${JSON.stringify(row.voiceText)}`);
    }
    if (LATIN_RE.test(row.voiceText)) {
      errors.push(`${label}: voiceText contains English letters: ${JSON.stringify(row.voiceText)}`);
    }
    const status = audioStatus(row.voiceText);
    if (!status.ok) {
      sentenceAudioMisses += 1;
      errors.push(`${label}: voiceText has no playable local audio: ${JSON.stringify(row.voiceText)} (${status.reason})`);
    }
  }

  if (!Array.isArray(row.tokens) || row.tokens.length === 0) {
    errors.push(`${label}: missing tokens`);
  } else {
    const tokenText = row.tokens.map(stripTrailingPunctuation).join(" ");
    if (normalizeForCheck(tokenText) !== normalizeForCheck(row.korean)) {
      errors.push(`${label}: tokens do not normalize to korean`);
    }
    for (const token of row.tokens) {
      if (!isNonEmptyString(token)) {
        errors.push(`${label}: tokens contains an empty entry`);
        break;
      }
    }
  }

  const band = Number(row.band);
  if (!Number.isInteger(band) || band < 1 || band > 5) {
    errors.push(`${label}: invalid band "${row.band}"`);
  }

  if (!Array.isArray(row.patternTags) || row.patternTags.length === 0) {
    errors.push(`${label}: missing patternTags`);
  } else {
    const seenTags = new Set();
    for (const tag of row.patternTags) {
      if (!VALID_PATTERN_TAGS.has(tag)) {
        errors.push(`${label}: invalid patternTag "${tag}"`);
      }
      if (seenTags.has(tag)) {
        errors.push(`${label}: duplicate patternTag "${tag}"`);
      }
      seenTags.add(tag);
    }
  }

  if (!Array.isArray(row.focusWordIds) || row.focusWordIds.length === 0) {
    errors.push(`${label}: missing focusWordIds`);
  } else {
    for (const id of row.focusWordIds) {
      if (!wordsById.has(id)) {
        errors.push(`${label}: focusWordIds references missing word id ${id}`);
      }
    }
  }

  if (!Array.isArray(row.sourceWordIds) || row.sourceWordIds.length === 0) {
    errors.push(`${label}: missing sourceWordIds`);
  } else {
    for (const id of row.sourceWordIds) {
      if (!wordsById.has(id)) {
        errors.push(`${label}: sourceWordIds references missing word id ${id}`);
      }
    }
  }

  if (!VALID_REGISTER.has(row.register)) {
    errors.push(`${label}: invalid register "${row.register}"`);
  }
  if (!VALID_SPEECH_LEVEL.has(row.speechLevel)) {
    errors.push(`${label}: invalid speechLevel "${row.speechLevel}"`);
  }
  if (!VALID_SOURCE.has(row.source)) {
    errors.push(`${label}: invalid source "${row.source}"`);
  }

  if (!Array.isArray(row.acceptAlso)) {
    errors.push(`${label}: acceptAlso must be an array`);
  } else {
    const seenAcceptAlso = new Set();
    for (const alt of row.acceptAlso) {
      const normalizedAlt = normalizeForCheck(alt);
      if (!isNonEmptyString(alt)) {
        errors.push(`${label}: acceptAlso contains an empty entry`);
      }
      if (normalizedAlt === normalizedKey) {
        errors.push(`${label}: acceptAlso may not duplicate korean`);
      }
      if (seenAcceptAlso.has(normalizedAlt)) {
        errors.push(`${label}: duplicate acceptAlso entry "${alt}"`);
      }
      seenAcceptAlso.add(normalizedAlt);
    }
  }

  summarizeAnnotationSource(row, label);
}

const wordsAudioMisses = [];
for (const word of words || []) {
  if (!word || typeof word !== "object") continue;
  for (const field of ["voiceText", "exampleVoiceText"]) {
    const text = word[field];
    if (!isNonEmptyString(text)) continue;
    const status = audioStatus(text);
    if (HANGUL_RE.test(text) && !status.ok) {
      wordsAudioMisses.push(`${word.id}: ${field} missing/empty audio (${status.reason})`);
    }
  }
}

if (wordsAudioMisses.length) {
  warnings.push(...wordsAudioMisses.map((message) => `Words audio miss: ${message}`));
}

const summary = {
  rows: Array.isArray(sentences) ? sentences.length : 0,
  uniqueSentenceIds: sentenceIds.size,
  uniqueKorean: normalizedSentenceKeys.size,
  annotationSources: annotationSourceCounts,
  sentenceAudioMisses,
  wordsAudioMisses: wordsAudioMisses.length,
};

console.log(`Sentences rows: ${summary.rows}`);
console.log(`Unique sentence ids: ${summary.uniqueSentenceIds}`);
console.log(`Unique korean sentences: ${summary.uniqueKorean}`);
console.log(`Annotation sources: ${JSON.stringify(summary.annotationSources)}`);
console.log(`Audio coverage: ${summary.sentenceAudioMisses} sentence issue(s); ${summary.wordsAudioMisses} word/example issue(s); ${DOCUMENTED_SILENT_KEYS.size} documented silence key(s)`);
console.log(`Errors: ${errors.length}`);
for (const message of errors) {
  console.log(`  ERROR ${message}`);
}
console.log(`Warnings: ${warnings.length}`);
for (const message of warnings) {
  console.log(`  warn  ${message}`);
}

if (errors.length || (strict && warnings.length)) {
  process.exit(1);
}

console.log(strict ? "Sentences data audit passed (strict)." : "Sentences data audit passed.");
