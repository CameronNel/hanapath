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
// shardRanges metadata.
//
// FAIL CLOSED: the aggregate is published only when all four expected shards
// (A/B/C/D) are present and each carries a range + reviewedRows object. A failed
// shard request, transient 404, or malformed registration must NOT yield a
// valid-looking but truncated aggregate — once E1A–E1D fill these files, that
// would silently drop hundreds of reviewed rows. On any missing/malformed shard
// this throws and leaves window.HANAPATH_SENTENCE_EXAM_ELIGIBILITY unset.
// Deeper structural invariants (duplicate/out-of-range/overlapping/malformed
// rows, and reviewed IDs present in the live bank) are enforced by
// scripts/audit-sentence-eligibility.mjs.
(function () {
  "use strict";

  var SHARD_ORDER = ["A", "B", "C", "D"];
  var registry = window.HANAPATH_SENTENCE_EXAM_ELIGIBILITY_SHARDS;

  if (!registry || typeof registry !== "object") {
    throw new Error(
      "HanaPath eligibility: shard registry " +
        "(window.HANAPATH_SENTENCE_EXAM_ELIGIBILITY_SHARDS) is missing — refusing " +
        "to publish eligibility. Load the four shard files before this merger."
    );
  }

  var reviewedRows = {};
  var shardRanges = [];

  for (var i = 0; i < SHARD_ORDER.length; i++) {
    var key = SHARD_ORDER[i];
    var shard = registry[key];

    if (!shard || typeof shard !== "object" || !shard.range || !shard.reviewedRows) {
      throw new Error(
        "HanaPath eligibility: shard " + key + " is missing or malformed — " +
          "refusing to publish a partial aggregate (fail closed)."
      );
    }

    shardRanges.push({
      shardId: shard.shardId,
      fromId: shard.range.fromId,
      toId: shard.range.toId,
      fromNum: shard.range.fromNum,
      toNum: shard.range.toNum
    });

    var rows = shard.reviewedRows;
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
