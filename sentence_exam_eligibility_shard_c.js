// HanaPath Sentence Examination Eligibility — Shard C (s2101–s3150).
// Plain static browser global — no build step.
//
// One of four deterministic, non-overlapping ID-range shards (A/B/C/D). The
// merger sentence_exam_eligibility.js combines all four into the single public
// contract window.HANAPATH_SENTENCE_EXAM_ELIGIBILITY.
//
// Edit ONLY rows whose numeric ID falls in this shard's range
// [2101..3150] (s2101–s3150). Do not change the range
// metadata, and do not add rows here as part of packet E0 — row classification
// is packets E1A–E1D. reviewedRows may be empty until its batch is reviewed.
(function () {
  "use strict";
  var registry = (window.HANAPATH_SENTENCE_EXAM_ELIGIBILITY_SHARDS =
    window.HANAPATH_SENTENCE_EXAM_ELIGIBILITY_SHARDS || {});
  registry.C = {
    shardId: "C",
    range: {"fromId":"s2101","toId":"s3150","fromNum":2101,"toNum":3150},
    reviewedRows: {}
  };
})();
