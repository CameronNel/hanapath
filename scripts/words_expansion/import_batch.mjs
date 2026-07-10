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

function loadBatch(batchPath) {
  const content = fs.readFileSync(batchPath, "utf8");
  if (path.extname(batchPath).toLowerCase() === ".jsonl") {
    const rows = [];
    for (const [index, line] of content.split(/\r?\n/).entries()) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      try {
        rows.push(JSON.parse(trimmed));
      } catch (error) {
        throw new Error(`Invalid JSONL record at line ${index + 1}: ${error.message}`);
      }
    }
    return rows;
  }
  const parsed = JSON.parse(content);
  return Array.isArray(parsed) ? parsed : [parsed];
}

function loadCuratedWords() {
  const wordsPath = path.join(root, "words_curated_core.js");
  const wordsSource = fs.readFileSync(wordsPath, "utf8");
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(wordsSource, context);
  return context.window.HANAPATH_CURATED_WORDS || [];
}

function loadPlan(planPath) {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(planPath, "utf8"), context);
  return {
    sections: context.window.HANAPATH_WORD_SECTIONS || [],
    units: context.window.HANAPATH_WORD_UNITS || [],
    lessons: context.window.HANAPATH_WORD_LESSONS || []
  };
}

function assertCoreLock(planPath) {
  const lockPath = path.join(root, "scripts", "curriculum_v2_lock.json");
  const lock = JSON.parse(fs.readFileSync(lockPath, "utf8"));
  if (!lock.immutable) throw new Error("Curriculum v2 lock is not marked immutable.");

  const plan = loadPlan(planPath);
  const lockedPlan = {
    sections: plan.sections,
    units: plan.units,
    lessons: plan.lessons.map((lesson) => ({
      id: lesson.id,
      unitId: lesson.unitId,
      type: lesson.type,
      title: lesson.title,
      subtitle: lesson.subtitle,
      wordIds: lesson.newWordIds || [],
      reviewWordIds: lesson.reviewWordIds || []
    }))
  };
  for (const key of ["sections", "units", "lessons"]) {
    if (JSON.stringify(lockedPlan[key]) !== JSON.stringify(lock[key])) {
      throw new Error(`Frozen v2 ${key} do not match scripts/curriculum_v2_lock.json.`);
    }
  }
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
  if (!row.track || typeof row.track !== "string") errors.push(`${label}: missing track`);
  if (!Number.isInteger(row.rawFrequencyRank) || row.rawFrequencyRank < 1) errors.push(`${label}: invalid or missing rawFrequencyRank`);
  if (!row.frequencyBand || typeof row.frequencyBand !== "string") errors.push(`${label}: missing frequencyBand`);
  if (!row.canonicalLemma || !HANGUL_RE.test(row.canonicalLemma)) errors.push(`${label}: missing or non-Hangul canonicalLemma`);
  if (!row.sourceProvenance || typeof row.sourceProvenance !== "object" || !row.sourceProvenance.sourceFileHash || !row.sourceProvenance.sourceRowKey) {
    errors.push(`${label}: missing sourceProvenance.sourceFileHash/sourceRowKey`);
  }
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
    plan: path.join(root, "words_lesson_plan.js"),
    dryRun: true,
    commit: false
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--batch") options.batch = args[++i];
    else if (args[i] === "--plan") options.plan = args[++i];
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
  let newWords;
  try {
    newWords = loadBatch(options.batch);
  } catch (e) {
    console.error(`Error parsing batch JSON/JSONL: ${e.message}`);
    process.exit(1);
  }
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
    if (word.id) existingIds.add(word.id);
  }

  if (failed) {
    console.error("\nValidation FAILED! The following schema violations must be resolved:");
    allErrors.forEach(err => console.error(`  - ${err}`));
    process.exit(1);
  }

  console.log("Validation PASSED. All batch items are well-formed.");

  try {
    assertCoreLock(options.plan);
  } catch (error) {
    console.error(`Core lock validation FAILED: ${error.message}`);
    process.exit(1);
  }

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
