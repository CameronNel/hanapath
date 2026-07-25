// HanaPath Sentence Examination Eligibility — Shard C (rows s2101–s3150).
// Plain static browser global — no build step. One of four deterministic,
// non-overlapping shards; the public aggregate is published by
// sentence_exam_eligibility.js after all four shards load.
(function () {
  "use strict";
  var registry = (window.HANAPATH_SENTENCE_EXAM_ELIGIBILITY_SHARDS =
    window.HANAPATH_SENTENCE_EXAM_ELIGIBILITY_SHARDS || {});
  registry.C = {
    shardId: "C",
    firstOrder: 2101,
    lastOrder: 3150,
    reviewedRows: {}
  };
})();
