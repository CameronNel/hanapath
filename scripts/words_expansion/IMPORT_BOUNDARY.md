# Phase 2 import boundary

`import_batch.mjs --commit` now requires an explicit release contract. A real
import must be able to prove all of the following before it mutates a loaded
data file:

- rows are placed in a validated draft elective pack rather than the frozen
  S1-S8 plan;
- the pack and core lock regression are append-only and reproducible;
- every spoken word, form, and example has passed owner-run audio generation
  and missing-key verification; and
- final `index.html`/`sw.js` query versions and the service-worker cache name
  changed after audio generation.

Pass `--pack-manifest <path>` with `{packId, status:"draft", wordIds, units,
coreLockSha256}`. The batch ids must be covered exactly once by the draft
units, and the lock hash must match `scripts/curriculum_v2_lock.json`.

Pass `--release-manifest <path>` with `{status:"owner-approved",
audioGenerated:true, missingKeysCount:0, audioMapSha256, cacheName,
assetVersion, batchWordCount}`. The importer compares the audio-map hash, the
service-worker cache name, and every indexed asset query version to the
manifest. The owner runs audio generation and records this manifest; the
importer never edits `audio_map.js` or cache versions.

Use `--dry-run` for schema validation, lock validation, and review evidence
without either manifest. A failed contract exits before writing any file.
