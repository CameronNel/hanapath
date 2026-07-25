// HanaPath Sentence Examination Eligibility — Shard D (rows s3151–s4177).
// Plain static browser global — no build step. One of four deterministic,
// non-overlapping shards; the public aggregate is published by
// sentence_exam_eligibility.js after all four shards load.
(function () {
  "use strict";
  var registry = (window.HANAPATH_SENTENCE_EXAM_ELIGIBILITY_SHARDS =
    window.HANAPATH_SENTENCE_EXAM_ELIGIBILITY_SHARDS || {});
  registry.D = {
    shardId: "D",
    firstOrder: 3151,
    lastOrder: 4177,
    reviewedRows: {}
  };
})();
