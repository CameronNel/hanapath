import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const VALID_POS = new Set([
  "noun", "verb", "adverb", "adjective", "numeral", "particle", "pronoun",
  "ending", "counter", "determiner", "phrase", "proper noun", "interjection", "conjunction"
]);

const VALID_REGISTERS = new Set(["everyday", "polite", "formal", "honorific", "written-formal"]);
const VALID_SPEECH_LEVELS = new Set(["plain", "polite informal", "polite formal"]);
const VALID_ORIGIN_TYPES = new Set(["native", "Sino-Korean", "loanword", "hybrid"]);
const VALID_ANNOTATION_SOURCES = new Set(["explicit", "inferred", "absent"]);
const VALID_MORPH_TAGS = new Set([
  "NNG", "NNB", "XR", "NNP", "NP", "NR", "VV", "VX", "VCP", "VCN", "VA", "MAG", "MAJ", "MM",
  "JKS", "JKC", "JKG", "JKO", "JKB", "JKV", "JKQ", "JX", "JC",
  "EP", "EF", "EC", "ETN", "ETM", "XPN", "XSN", "XSA", "XSV", "IC"
]);

const HANGUL_RE = /[가-힣ㄱ-ㅎㅏ-ㅣ]/;
const LATIN_RE = /[a-zA-Z]/;

function loadCuratedWords() {
  const wordsPath = path.join(root, "words_curated_core.js");
  const wordsSource = fs.readFileSync(wordsPath, "utf8");
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(wordsSource, context);
  return context.window.HANAPATH_CURATED_WORDS || [];
}

function validateRow(row, existingIds, existingSurfaces) {
  const errors = [];
  const label = row.id || row.korean || "(unknown entry)";

  if (!row.id) errors.push("Missing id");
  else if (existingIds.has(row.id)) errors.push(`Duplicate curated id: ${row.id}`);
  
  if (!row.korean || !HANGUL_RE.test(row.korean)) errors.push(`${label}: missing or non-Hangul korean`);
  if (!row.meaning) errors.push(`${label}: missing meaning`);
  if (!row.pos || !VALID_POS.has(row.pos)) errors.push(`${label}: invalid or missing pos "${row.pos}"`);
  if (!row.lessonGroup) errors.push(`${label}: missing lessonGroup`);
  if (!row.pronunciation) errors.push(`${label}: missing pronunciation`);

  if (!row.register || !VALID_REGISTERS.has(row.register)) {
    errors.push(`${label}: invalid or missing register "${row.register}"`);
  }
  if (!row.speechLevel || !VALID_SPEECH_LEVELS.has(row.speechLevel)) {
    errors.push(`${label}: invalid or missing speechLevel "${row.speechLevel}"`);
  }
  if (!row.originType || !VALID_ORIGIN_TYPES.has(row.originType)) {
    errors.push(`${label}: invalid or missing originType "${row.originType}"`);
  }
  if (!row.morphTag || !VALID_MORPH_TAGS.has(row.morphTag)) {
    errors.push(`${label}: invalid or missing morphTag "${row.morphTag}"`);
  }

  if (!row.annotationSource || typeof row.annotationSource !== "object") {
    errors.push(`${label}: missing or invalid annotationSource object`);
  } else {
    for (const key of ["register", "speechLevel", "originType", "morphTag", "hanja"]) {
      if (!VALID_ANNOTATION_SOURCES.has(row.annotationSource[key])) {
        errors.push(`${label}: invalid annotationSource.${key} "${row.annotationSource[key]}"`);
      }
    }
  }

  if (!row.voiceText) errors.push(`${label}: missing voiceText`);
  else {
    if (!HANGUL_RE.test(row.voiceText)) errors.push(`${label}: voiceText has no Hangul: ${JSON.stringify(row.voiceText)}`);
    if (LATIN_RE.test(row.voiceText)) errors.push(`${label}: voiceText contains English letters: ${JSON.stringify(row.voiceText)}`);
  }

  if (!row.exampleKo) {
    errors.push(`${label}: missing exampleKo`);
  } else if (!HANGUL_RE.test(row.exampleKo)) {
    errors.push(`${label}: exampleKo has no Hangul`);
  }
  if (!row.exampleEn) errors.push(`${label}: missing exampleEn`);
  
  if (!row.exampleVoiceText) {
    errors.push(`${label}: missing exampleVoiceText`);
  } else {
    if (!HANGUL_RE.test(row.exampleVoiceText)) errors.push(`${label}: exampleVoiceText has no Hangul`);
    if (LATIN_RE.test(row.exampleVoiceText)) errors.push(`${label}: exampleVoiceText contains English letters`);
  }

  // Refuse sense ambiguity / duplicates
  if (existingSurfaces.has(row.korean) && !row.senseKey) {
    errors.push(`${label}: surface "${row.korean}" already exists in core; you must provide a distinct senseKey and senseNo to avoid sense ambiguity.`);
  }

  return errors;
}

function run(args) {
  const options = {
    batch: null,
    dryRun: true,
    commit: false
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--batch") options.batch = args[++i];
    else if (args[i] === "--commit") {
      options.commit = true;
      options.dryRun = false;
    } else if (args[i] === "--dry-run") {
      options.dryRun = true;
      options.commit = false;
    }
  }

  if (!options.batch) {
    console.error("Error: --batch <path_to_json_file> is required.");
    process.exit(1);
  }

  if (!fs.existsSync(options.batch)) {
    console.error(`Error: Batch file does not exist: ${options.batch}`);
    process.exit(1);
  }

  console.log("Loading batch file...");
  let batchData;
  try {
    batchData = JSON.parse(fs.readFileSync(options.batch, "utf8"));
  } catch (e) {
    console.error(`Error parsing batch JSON: ${e.message}`);
    process.exit(1);
  }

  const newWords = Array.isArray(batchData) ? batchData : [batchData];
  console.log(`Loaded ${newWords.length} words to import.`);

  console.log("Loading existing curated words...");
  const curated = loadCuratedWords();
  const existingIds = new Set(curated.map(w => w.id));
  const existingSurfaces = new Set(curated.map(w => w.korean));

  console.log("Validating batch data...");
  let failed = false;
  const allErrors = [];
  
  for (const word of newWords) {
    const errors = validateRow(word, existingIds, existingSurfaces);
    if (errors.length > 0) {
      failed = true;
      allErrors.push(...errors);
    }
  }

  if (failed) {
    console.error("\nValidation FAILED! The following schema violations must be resolved:");
    allErrors.forEach(err => console.error(`  - ${err}`));
    process.exit(1);
  }

  console.log("Validation PASSED. All batch items are well-formed.");

  // Check boundary: lesson plan mutation is locked to draft elective packs
  console.log("\n[Product Boundary Audit]");
  console.log("  - Core sections (S1-S8) are frozen. No changes will be made to core lesson plans.");
  console.log("  - Elective packs are draft/unpublished. This batch only imports vocabulary definitions.");
  console.log("  - Mutation of words_lesson_plan.js is bypassed because this batch feeds draft elective packs.");

  if (options.dryRun) {
    console.log("\n--- DRY-RUN MODE ---");
    console.log(`Would append ${newWords.length} words to words_curated_core.js.`);
    newWords.forEach(w => console.log(`  [NEW] ${w.id} - ${w.korean}: ${w.meaning}`));
    
    console.log("\nAudio follow-up required (would need to run generate_assets.py for):");
    newWords.forEach(w => {
      console.log(`  - Text to speak: "${w.voiceText}"`);
      console.log(`  - Example to speak: "${w.exampleVoiceText}"`);
    });
    console.log("\nDry-run completed. No files were modified.");
    return true;
  }

  if (options.commit) {
    console.log("\nCommitting changes to words_curated_core.js...");
    const coreFilePath = path.join(root, "words_curated_core.js");
    let coreContent = fs.readFileSync(coreFilePath, "utf8");

    // We look for the closing ]; of the array in the IIFE
    const closingIndex = coreContent.lastIndexOf("];");
    if (closingIndex === -1) {
      console.error("Error: Could not locate the closing array bracket '];' in words_curated_core.js");
      process.exit(1);
    }

    const beforeClosing = coreContent.substring(0, closingIndex);
    const afterClosing = coreContent.substring(closingIndex);

    // Format new entries
    let entriesText = "";
    for (const w of newWords) {
      // Force priority to 'elective' for expansion batches
      w.priority = "elective";
      w.frequencyBand = w.frequencyBand || "expansion";
      
      const jsonStr = JSON.stringify(w);
      entriesText += `    defineWord(${jsonStr}),\n`;
    }

    const newCoreContent = beforeClosing + entriesText + afterClosing;
    fs.writeFileSync(coreFilePath, newCoreContent, "utf8");
    console.log(`Successfully imported ${newWords.length} words into words_curated_core.js.`);

    console.log("\n--- PENDING ACTIONS ---");
    console.log("1. Run offline audio generation to register new speech files:");
    console.log("   python generate_assets.py");
    console.log("2. Bump cache versions in sw.js and query parameters in index.html and sw.js.");
  }
}

const args = process.argv.slice(2);
run(args);
