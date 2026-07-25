// HanaPath Sentence Examination Eligibility — aggregate merger.
// The reviewed records live in four deterministic, non-overlapping shards
// (sentence_exam_eligibility_a.js … _d.js), which load before this file. This
// merger publishes the single public contract
// window.HANAPATH_SENTENCE_EXAM_ELIGIBILITY unchanged, so app.js and the audits
// keep reading exactly one global. Do not add reviewed rows here — edit the
// shard that owns the row's range.
(function () {
  "use strict";
  var SHARD_ORDER = ["A", "B", "C", "D"];
  var registry = window.HANAPATH_SENTENCE_EXAM_ELIGIBILITY_SHARDS || {};
  var reviewedRows = {};
  var shardRanges = {};
  for (var i = 0; i < SHARD_ORDER.length; i++) {
    var shard = registry[SHARD_ORDER[i]];
    if (!shard) continue;
    shardRanges[shard.shardId] = { firstOrder: shard.firstOrder, lastOrder: shard.lastOrder };
    var rows = shard.reviewedRows || {};
    for (var id in rows) {
      if (Object.prototype.hasOwnProperty.call(rows, id)) reviewedRows[id] = rows[id];
    }
  }
  window.HANAPATH_SENTENCE_EXAM_ELIGIBILITY = {
    schemaVersion: 1,
    revision: "sentence-eligibility-v1",
    shardRanges: shardRanges,
    reviewedRows: reviewedRows
  };
})();
