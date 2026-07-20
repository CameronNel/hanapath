import { readFileSync } from "node:fs";
import vm from "node:vm";

const app = readFileSync(new URL("../app.js", import.meta.url), "utf8");
const styles = readFileSync(new URL("../styles.css", import.meta.url), "utf8");
const java = readFileSync(new URL("../mobile/android/app/src/main/java/io/github/cameronnel/hanapath/PremiumWritingPlugin.java", import.meta.url), "utf8");
const recognitionJava = readFileSync(new URL("../mobile/android/app/src/main/java/io/github/cameronnel/hanapath/HangulRecognitionPlugin.java", import.meta.url), "utf8");
const strings = readFileSync(new URL("../mobile/android/app/src/main/res/values/strings.xml", import.meta.url), "utf8");
const manifest = readFileSync(new URL("../mobile/android/app/src/main/AndroidManifest.xml", import.meta.url), "utf8");
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
requireCheck(app.includes('else enterPremiumWriting(source, options)'), "Words/Sentences do not route through the premium boundary");
requireCheck(app.includes('getHanaPathNativePlugin("PremiumWriting")'), "store entitlement is not read through a native bridge");
requireCheck(app.includes('appPlugin.addListener("appStateChange"') && app.includes("refreshPremiumWritingAccess()"), "premium access is not re-queried when the native app resumes");
requireCheck(!/premiumWritingEntitled\s*:/.test(app), "a trusted premium entitlement appears to be persisted locally");
requireCheck(app.includes("!premiumWritingState.store.entitled || !premiumWritingState.model.downloaded || premiumWritingState.model.operational !== true"), "premium practice is not gated on entitlement, downloaded model, and successful warm-up");
requireCheck(app.includes("model.operational !== true"), "checkout is not blocked when the native recognizer warm-up fails");
requireCheck(app.includes('candidates[0] === expected'), "automatic banking is not restricted to an exact top candidate");
requireCheck(app.includes("bankPremiumWritingBlock(canvas)"), "successful blocks do not reach the immediate banking path");
requireCheck(app.includes("Array.isArray(row.tokens)"), "phrase prompts are not built from authored sentence tokens");
requireCheck(app.includes("row.korean"), "sentence prompts are not built from the audited sentence bank");
requireCheck(app.includes("word.display || word.korean"), "word prompts are not built from curated Words data");
requireCheck(styles.includes(".premium-writing-block.active") && styles.includes(".premium-writing-block.completed"), "active/completed block states are not styled");
requireCheck(styles.includes("aria-current") || app.includes('aria-current="step"'), "active block lacks an accessible current-step marker");

requireCheck(recognitionJava.includes("setPreContext(recognitionPreContext)"), "Android recognition context does not receive banked pre-context");
requireCheck(recognitionJava.includes("makeModelStatus(true, !result.getCandidates().isEmpty())"), "Android readiness check does not exercise the recognizer before checkout");
requireCheck(recognitionJava.includes("preContextCodePoints > 20"), "Android pre-context is not capped at 20 Unicode code points");
requireCheck(java.includes("Purchase.PurchaseState.PENDING"), "pending Play purchases are not handled");
requireCheck(java.includes("Purchase.PurchaseState.PURCHASED"), "purchased Play state is not handled");
requireCheck(java.includes("verifySignature("), "Play purchase signature verification is missing");
requireCheck(java.includes("acknowledgePurchase"), "verified Play purchases are not acknowledged");
requireCheck(java.includes("queryPurchasesAsync"), "purchase restoration/relaunch query is missing");
requireCheck(java.includes("product_unconfigured"), "billing bridge does not fail closed before permanent product configuration");
requireCheck(manifest.includes("com.android.vending.BILLING"), "Play Billing normal permission is missing");
requireCheck(strings.includes('name="premium_writing_product_id"') && strings.includes('name="play_billing_public_key"'), "public Play product configuration slots are missing");
requireCheck(plan.includes("Purchase availability and feature availability are separate states"), "premium safety contract is missing from the governing plan");

console.log("Premium handwriting audit");
console.log("=========================");
console.log(`sample writable blocks : ${writable.length}`);
console.log(`sample static chars    : ${blocks.length - writable.length}`);
console.log(`free Alphabet boundary : ${errors.some((error) => error.includes("free Alphabet")) ? "fail" : "pass"}`);
console.log(`top-1 bank contract    : ${errors.some((error) => error.includes("top candidate")) ? "fail" : "pass"}`);
console.log(`billing fail-closed    : ${errors.some((error) => /billing|purchase|Play/.test(error)) ? "fail" : "pass"}`);
console.log(`errors                 : ${errors.length}`);
errors.forEach((error) => console.log(`  ERROR ${error}`));
if (errors.length) process.exitCode = 1;
else console.log("Result: premium content is entitlement + model gated; blocks bank only on exact ML Kit top-1 matches; purchase recovery is wired and unconfigured checkout fails closed.");
