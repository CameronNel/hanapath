import { existsSync, readFileSync } from "node:fs";
import vm from "node:vm";

const app = readFileSync(new URL("../app.js", import.meta.url), "utf8");
const styles = readFileSync(new URL("../styles.css", import.meta.url), "utf8");
const mainActivity = readFileSync(new URL("../mobile/android/app/src/main/java/io/github/cameronnel/hanapath/MainActivity.java", import.meta.url), "utf8");
const billingPluginUrl = new URL("../mobile/android/app/src/main/java/io/github/cameronnel/hanapath/PremiumWritingPlugin.java", import.meta.url);
const recognitionJava = readFileSync(new URL("../mobile/android/app/src/main/java/io/github/cameronnel/hanapath/HangulRecognitionPlugin.java", import.meta.url), "utf8");
const strings = readFileSync(new URL("../mobile/android/app/src/main/res/values/strings.xml", import.meta.url), "utf8");
const manifest = readFileSync(new URL("../mobile/android/app/src/main/AndroidManifest.xml", import.meta.url), "utf8");
const filePathsUrl = new URL("../mobile/android/app/src/main/res/xml/file_paths.xml", import.meta.url);
const buildGradle = readFileSync(new URL("../mobile/android/app/build.gradle", import.meta.url), "utf8");
const plan = readFileSync(new URL("../docs/PREMIUM_HANDWRITING_PLAN.md", import.meta.url), "utf8");

const errors = [];
const requireCheck = (condition, message) => { if (!condition) errors.push(message); };

function readFunction(name) {
  const marker = `function ${name}(`;
  const start = app.indexOf(marker);
  if (start < 0) throw new Error(`Missing function ${name}`);
  const brace = app.indexOf("{", start);
  let depth = 0;
  let quote = null;
  let escaped = false;
  for (let index = brace; index < app.length; index += 1) {
    const char = app[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'" || char === "`") { quote = char; continue; }
    if (char === "{") depth += 1;
    if (char === "}") {
      depth -= 1;
      if (depth === 0) return app.slice(start, index + 1);
    }
  }
  throw new Error(`Unterminated function ${name}`);
}

const context = {};
vm.createContext(context);
vm.runInContext(`${readFunction("normalizePremiumWritingText")};${readFunction("buildPremiumWritingBlockModel")};${readFunction("countPremiumWritingBlocks")};this.buildPremiumWritingBlockModel=buildPremiumWritingBlockModel;this.countPremiumWritingBlocks=countPremiumWritingBlocks;`, context);
const blocks = context.buildPremiumWritingBlockModel("저는 한국어를 공부해요.");
const writable = blocks.filter((block) => block.writable);
requireCheck(writable.length === 10, `expected 10 writable blocks, got ${writable.length}`);
requireCheck(writable.every((block, index) => block.writableIndex === index), "writable block indices are not contiguous");
requireCheck(blocks.some((block) => block.character === " " && !block.writable), "spaces are not preserved as automatic/static blocks");
requireCheck(blocks.at(-1)?.character === "." && !blocks.at(-1)?.writable, "punctuation is not preserved as automatic/static content");

requireCheck(app.includes('source === "alphabet") enterHangulWriting(source, options)'), "free Alphabet writing is not kept on its existing path");
requireCheck(app.includes('else enterPremiumWriting(source, options)'), "Words/Sentences do not route through the content-writing boundary");
requireCheck(app.includes('const PREMIUM_WRITING_ACCESS_MODE = "free_all"'), "Handwriting Coach is not in the owner-approved all-access mode");
requireCheck(app.includes('return PREMIUM_WRITING_ACCESS_MODE === "free_all" || premiumWritingState.store?.entitled === true'), "free-all access does not retain the future store-mode boundary");
requireCheck(app.includes('premiumWritingPurchasesEnabled()\n      ? PremiumWritingStore.getStatus()'), "free-all mode still queries billing on entry");
requireCheck(!app.includes("Handwriting Coach · Paid") && !app.includes("Handwriting Coach · Unlocked"), "free-all UI still exposes paid/unlocked labels");
requireCheck(!/premiumWritingEntitled\s*:/.test(app), "a trusted premium entitlement appears to be persisted locally");
requireCheck(app.includes("!premiumWritingAccessGranted() || !premiumWritingState.model.downloaded || premiumWritingState.model.operational !== true"), "multi-block practice is not gated on access mode, downloaded model, and successful warm-up");
requireCheck(app.includes('candidates[0] === expected'), "automatic banking is not restricted to an exact top candidate");
requireCheck(app.includes("bankPremiumWritingBlock(canvas)"), "successful blocks do not reach the immediate banking path");
requireCheck(app.includes("Array.isArray(row.tokens)"), "phrase prompts are not built from authored sentence tokens");
requireCheck(app.includes("row.korean"), "sentence prompts are not built from the audited sentence bank");
requireCheck(app.includes("word.display || word.korean"), "word prompts are not built from curated Words data");
requireCheck(styles.includes(".premium-writing-block.active") && styles.includes(".premium-writing-block.completed"), "active/completed block states are not styled");
requireCheck(styles.includes("aria-current") || app.includes('aria-current="step"'), "active block lacks an accessible current-step marker");

requireCheck(recognitionJava.includes("setPreContext(recognitionPreContext)"), "Android recognition context does not receive banked pre-context");
requireCheck(recognitionJava.includes("makeModelStatus(true, !result.getCandidates().isEmpty())"), "Android readiness check does not exercise the recognizer");
requireCheck(recognitionJava.includes("preContextCodePoints > 20"), "Android pre-context is not capped at 20 Unicode code points");

requireCheck(!existsSync(billingPluginUrl), "free_all Android build still ships PremiumWritingPlugin.java");
requireCheck(!mainActivity.includes("PremiumWritingPlugin"), "free_all Android activity still registers the billing bridge");
requireCheck(/com\.android\.billingclient:billing:9\.1\.0/.test(buildGradle), "ad-free subscription does not pin the reviewed Play Billing version");
requireCheck(manifest.includes('<uses-permission android:name="com.android.vending.BILLING" />'), "ad-free subscription is missing its Play Billing permission");
requireCheck(!strings.includes('name="premium_writing_product_id"') && !strings.includes('name="play_billing_public_key"'), "free_all build still carries dormant Play product configuration");

requireCheck(manifest.includes('android:allowBackup="false"'), "Android learner state is still eligible for OS backup");
requireCheck(manifest.includes('android:fullBackupContent="false"'), "Android full-backup policy is not explicitly disabled");
requireCheck(!/androidx\.core\.content\.FileProvider/.test(manifest), "unused Android FileProvider remains registered");
requireCheck(!existsSync(filePathsUrl), "orphaned FileProvider path configuration remains packaged");

requireCheck(plan.includes("ad-free subscription never gates Handwriting Coach"), "governing plan does not separate ad-free billing from Handwriting Coach access");
requireCheck(plan.includes("no handwriting product ID"), "governing plan does not forbid a hidden Handwriting Coach product");

console.log("Handwriting and Android release-safety audit");
console.log("============================================");
console.log(`sample writable blocks : ${writable.length}`);
console.log(`sample static chars    : ${blocks.length - writable.length}`);
console.log(`free Alphabet boundary : ${errors.some((error) => error.includes("free Alphabet")) ? "fail" : "pass"}`);
console.log(`all-access mode        : ${errors.some((error) => /all-access|free-all|paid\/unlocked|billing on entry/.test(error)) ? "fail" : "pass"}`);
console.log(`top-1 bank contract    : ${errors.some((error) => error.includes("top candidate")) ? "fail" : "pass"}`);
console.log(`billing isolation      : ${errors.some((error) => /Billing|billing|purchase plugin|product configuration/.test(error)) ? "fail" : "pass"}`);
console.log(`backup/provider safety : ${errors.some((error) => /backup|FileProvider|storage root/.test(error)) ? "fail" : "pass"}`);
console.log(`errors                 : ${errors.length}`);
errors.forEach((error) => console.log(`  ERROR ${error}`));
if (errors.length) process.exitCode = 1;
else console.log("Result: multi-block writing is free and model-gated; Play Billing is isolated to ad suppression, with no handwriting purchase surface, OS backup, or broad FileProvider root.");
