import fs from "node:fs";
import path from "node:path";
import assert from "node:assert";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const tempDir = path.join(root, "scripts/words_expansion/temp_test");

// Helper to ensure clean temp directory
function setupTempDir() {
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
  fs.mkdirSync(tempDir, { recursive: true });
}

function cleanupTempDir() {
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

// Mock CSV data
const mock5kCsvContent = `rank,korean_spelling,english_spelling_romanization,frequency_band,syllables,token_note,source_url
1,이,i,1-1000,1,High-frequency grammar particle/ending or function form,https://mock
50,가다,gada,1-1000,2,Core verb,https://mock
`;

const mock15kCsvContent = `rank,korean_spelling,english_spelling_romanization,frequency_band,syllables,token_note,source_url
5194,이,i,5001-6000,1,Supplementary particle,https://mock
6000,먹다,meogda,5001-6000,2,Supplementary verb,https://mock
`;

console.log("Starting Words Expansion Tooling Tests...");

try {
  setupTempDir();

  const mock5kPath = path.join(tempDir, "mock_5k.csv");
  const mock15kPath = path.join(tempDir, "mock_15k.csv");
  const queueOutPath = path.join(tempDir, "candidate_queue.json");
  const decisionsPath = path.join(tempDir, "candidate_decisions.jsonl");

  fs.writeFileSync(mock5kPath, mock5kCsvContent, "utf8");
  fs.writeFileSync(mock15kPath, mock15kCsvContent, "utf8");

  // ==========================================
  // Test 1: Deterministic Byte-Identical Queue
  // ==========================================
  console.log("Test 1: Verifying byte-identical output on unchanged input...");
  
  execSync(
    `node scripts/words_expansion/build_candidate_queue.mjs --input5k ${mock5kPath} --input15k ${mock15kPath} --output ${queueOutPath} --decisions ${decisionsPath}`,
    { stdio: "pipe" }
  );
  
  const hash1 = crypto.createHash("sha256").update(fs.readFileSync(queueOutPath)).digest("hex");
  
  execSync(
    `node scripts/words_expansion/build_candidate_queue.mjs --input5k ${mock5kPath} --input15k ${mock15kPath} --output ${queueOutPath} --decisions ${decisionsPath}`,
    { stdio: "pipe" }
  );
  
  const hash2 = crypto.createHash("sha256").update(fs.readFileSync(queueOutPath)).digest("hex");
  assert.strictEqual(hash1, hash2, "Re-running build_candidate_queue should produce byte-identical output.");

  // ==========================================
  // Test 2: Reject Conflicting Decisions
  // ==========================================
  console.log("Test 2: Verifying validation of duplicate/conflicting decisions...");
  
  // Create a decisions log with a duplicate key
  fs.writeFileSync(
    decisionsPath,
    `{"sourceFileHash":"hash123","sourceRowKey":"이","status":"rejected","reason":"test"}
{"sourceFileHash":"hash123","sourceRowKey":"이","status":"accepted","reason":"test"}
`,
    "utf8"
  );
  
  assert.throws(() => {
    execSync(`node scripts/words_expansion/build_candidate_queue.mjs --validate --decisions ${decisionsPath}`, { stdio: "pipe" });
  }, /Duplicate decision key/, "Should throw error on duplicate decision keys.");

  // Create decisions log with invalid status
  fs.writeFileSync(
    decisionsPath,
    `{"sourceFileHash":"hash123","sourceRowKey":"이","status":"invalidStatus","reason":"test"}
`,
    "utf8"
  );
  
  assert.throws(() => {
    execSync(`node scripts/words_expansion/build_candidate_queue.mjs --validate --decisions ${decisionsPath}`, { stdio: "pipe" });
  }, /Invalid status/, "Should throw error on invalid decision status.");

  // ==========================================
  // Test 3: Existing Curated IDs Overwrite Protection
  // ==========================================
  console.log("Test 3: Verifying import validation rejects duplicate curated IDs...");
  
  const mockBatchPath = path.join(tempDir, "mock_batch.json");
  // w0001_hangul is an existing curated word ID
  const invalidBatchContent = [
    {
      id: "w0001_hangul",
      korean: "새단어",
      meaning: "new word",
      pos: "noun",
      pronunciation: "saedaneo",
      exampleKo: "새 단어입니다.",
      exampleEn: "This is a new word.",
      lessonGroup: "study-school",
      originType: "native",
      voiceText: "새단어",
      exampleVoiceText: "새 단어입니다.",
      register: "everyday",
      speechLevel: "plain",
      morphTag: "NNG",
      annotationSource: {
        register: "explicit",
        speechLevel: "explicit",
        originType: "explicit",
        morphTag: "explicit",
        hanja: "absent"
      }
    }
  ];
  fs.writeFileSync(mockBatchPath, JSON.stringify(invalidBatchContent), "utf8");

  assert.throws(() => {
    execSync(`node scripts/words_expansion/import_batch.mjs --batch ${mockBatchPath} --dry-run`, { stdio: "pipe" });
  }, /Duplicate curated id: w0001_hangul/, "Should throw error on duplicate curated ID.");

  // ==========================================
  // Test 4: Invalid Row Schema Rejection
  // ==========================================
  console.log("Test 4: Verifying import validation rejects invalid row schemas...");
  
  const invalidSchemaContent = [
    {
      id: "w_m6_9999_test",
      korean: "새단어",
      meaning: "", // Missing meaning
      pos: "invalid_pos", // Invalid POS
      pronunciation: "saedaneo",
      exampleKo: "새 단어입니다.",
      exampleEn: "This is a new word.",
      lessonGroup: "study-school",
      originType: "native",
      voiceText: "새단어",
      exampleVoiceText: "새 단어입니다.",
      register: "everyday",
      speechLevel: "plain",
      morphTag: "NNG",
      annotationSource: {
        register: "explicit",
        speechLevel: "explicit",
        originType: "explicit",
        morphTag: "explicit",
        hanja: "absent"
      }
    }
  ];
  fs.writeFileSync(mockBatchPath, JSON.stringify(invalidSchemaContent), "utf8");

  assert.throws(() => {
    execSync(`node scripts/words_expansion/import_batch.mjs --batch ${mockBatchPath} --dry-run`, { stdio: "pipe" });
  }, /missing meaning|invalid or missing pos/, "Should throw error on missing meaning or invalid POS.");

  // ==========================================
  // Test 5: Dry Run Mutation Safety
  // ==========================================
  console.log("Test 5: Verifying dry-run import does not mutate words_curated_core.js...");
  
  const validBatchContent = [
    {
      id: "w_m6_9999_validtest",
      korean: "테스트단어",
      meaning: "test word",
      pos: "noun",
      pronunciation: "teseutedaneo",
      exampleKo: "테스트 단어입니다.",
      exampleEn: "This is a test word.",
      lessonGroup: "study-school",
      originType: "native",
      voiceText: "테스트단어",
      exampleVoiceText: "테스트 단어입니다.",
      register: "everyday",
      speechLevel: "plain",
      morphTag: "NNG",
      annotationSource: {
        register: "explicit",
        speechLevel: "explicit",
        originType: "explicit",
        morphTag: "explicit",
        hanja: "absent"
      }
    }
  ];
  fs.writeFileSync(mockBatchPath, JSON.stringify(validBatchContent), "utf8");

  const corePath = path.join(root, "words_curated_core.js");
  const coreHashBefore = crypto.createHash("sha256").update(fs.readFileSync(corePath)).digest("hex");

  execSync(`node scripts/words_expansion/import_batch.mjs --batch ${mockBatchPath} --dry-run`, { stdio: "pipe" });

  const coreHashAfter = crypto.createHash("sha256").update(fs.readFileSync(corePath)).digest("hex");
  assert.strictEqual(coreHashBefore, coreHashAfter, "Dry run must not modify words_curated_core.js.");

  console.log("\nALL TESTS PASSED SUCCESSFULLY!");
} catch (e) {
  console.error(`\nTEST RUN FAILED: ${e.message}`);
  process.exit(1);
} finally {
  cleanupTempDir();
}
import crypto from "node:crypto";
