// HanaPath Sentence Examination Eligibility — shard merger.
// Plain static browser global — no build step.
//
// Packet E0 split the reviewed-row metadata into four deterministic,
// non-overlapping ID-range shards so classification packets E1A–E1D can be
// authored without merge conflicts:
//
//   sentence_exam_eligibility_shard_a.js  s0001–s1050
//   sentence_exam_eligibility_shard_b.js  s1051–s2100
//   sentence_exam_eligibility_shard_c.js  s2101–s3150
//   sentence_exam_eligibility_shard_d.js  s3151–s4177
//
// Each shard registers itself on window.HANAPATH_SENTENCE_EXAM_ELIGIBILITY_SHARDS
// (loaded BEFORE this file). This merger publishes the single, unchanged public
// contract window.HANAPATH_SENTENCE_EXAM_ELIGIBILITY with the same shape as
// before the split ({ schemaVersion, revision, reviewedRows }), plus additive
// shardRanges metadata. Structural invariants (no duplicate/out-of-range/
// overlapping/malformed rows, and reviewed IDs present in the live bank) are
// enforced by scripts/audit-sentence-eligibility.mjs, not at browser load time.
(function () {
  "use strict";

  var SHARD_ORDER = ["A", "B", "C", "D"];
  var registry = window.HANAPATH_SENTENCE_EXAM_ELIGIBILITY_SHARDS || {};

  var reviewedRows = {};
  var shardRanges = [];

  for (var i = 0; i < SHARD_ORDER.length; i++) {
    var shard = registry[SHARD_ORDER[i]];
    if (!shard) continue;
    if (shard.range) {
      shardRanges.push({
        shardId: shard.shardId,
        fromId: shard.range.fromId,
        toId: shard.range.toId,
        fromNum: shard.range.fromNum,
        toNum: shard.range.toNum
      });
    }
    var rows = shard.reviewedRows || {};
    var ids = Object.keys(rows);
    for (var j = 0; j < ids.length; j++) {
      var id = ids[j];
      // Ranges are disjoint, so first-writer-wins is deterministic; a genuine
      // collision is a data error the audit hard-fails on.
      if (!Object.prototype.hasOwnProperty.call(reviewedRows, id)) {
        reviewedRows[id] = rows[id];
      }
    }
  }

  window.HANAPATH_SENTENCE_EXAM_ELIGIBILITY = {
    schemaVersion: 1,
    revision: "sentence-eligibility-v1",
    shardRanges: shardRanges,
    reviewedRows: reviewedRows
  };
})();
