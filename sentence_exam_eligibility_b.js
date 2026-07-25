// HanaPath Sentence Examination Eligibility — Shard B (rows s1051–s2100).
// Plain static browser global — no build step. One of four deterministic,
// non-overlapping shards; the public aggregate is published by
// sentence_exam_eligibility.js after all four shards load.
(function () {
  "use strict";
  var registry = (window.HANAPATH_SENTENCE_EXAM_ELIGIBILITY_SHARDS =
    window.HANAPATH_SENTENCE_EXAM_ELIGIBILITY_SHARDS || {});
  registry.B = {
    shardId: "B",
    firstOrder: 1051,
    lastOrder: 2100,
    reviewedRows: {}
  };
})();
