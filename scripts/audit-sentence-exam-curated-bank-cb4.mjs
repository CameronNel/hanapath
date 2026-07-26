#!/usr/bin/env node
import { auditCb4Package } from "./build-sentence-exam-curated-bank.mjs";

const requireApproved = process.argv.includes("--require-approved");
const result = auditCb4Package({ requireApproved });

console.log("CB4 curated Sentence bank audit");
console.log("================================");
console.log(`Revision             : ${result.authoringPackage.revision}`);
console.log(`Typed entries        : ${result.authoringPackage.summary.typedCount}`);
console.log(`Recognition entries  : ${result.authoringPackage.summary.recognitionCount}`);
console.log(`Finite typed entries : ${result.authoringPackage.summary.finiteTypedCount}`);
console.log(`Review state         : ${result.allApproved ? "independently approved" : "awaiting independent review"}`);
console.log(`Approved reviews     : ${result.manifest?.approvedCount ?? 0}`);
console.log(`Pending reviews      : ${result.manifest?.pendingCount ?? result.authoringPackage.summary.typedCount}`);

if (result.errors.length > 0) {
  console.error(`\nAudit failed with ${result.errors.length} error(s):`);
  for (const error of result.errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log("\nAudit passed cleanly.");
