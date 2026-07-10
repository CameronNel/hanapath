import assert from "node:assert/strict";
import { qualify } from "./qualify_elective_range.mjs";

const report = qualify();
assert.equal(report.batchId, "p2-qualify-r345-r453");
assert.equal(report.range.sourceRows, report.records.length);
assert.equal(report.importReadyRows, 0);
assert.ok(report.qualifiedLexicalCandidates.length >= 3);
assert.ok(report.records.every((record) => record.status !== "accepted" || record.canonicalLemma));
assert.ok(report.records.some((record) => record.status === "needs-sense-review"));
console.log("Elective qualification tests passed.");
