# Words Expansion Progress Ledger

This ledger tracks the progress of vocabulary expansion batches in Phase 2. Every change must be re-derivable from the core data files, candidate decision logs, and git commit history.

## Derivation of Fields

- **Source File/Range and Source Hash**: The range of row indices in the source CSVs processed in this batch, along with the cryptographic SHA-256 hash of the input files to ensure reproducibility.
- **Disposition Counts**: Re-derived from the candidate decisions ledger (`scripts/words_expansion/candidate_decisions.jsonl`) filtered by date/batch ID. It counts candidate statuses (`accepted`, `covered`, `merged`, `inflected`, `deferred`, `rejected`, `needs-sense-review`).
- **Qualified Lemmas**: The count of unique canonical dictionary-form lemmas accepted in the batch, verified programmatically.
- **Curated Words/Senses Added**: The number of entry rows added to `words_curated_core.js` in this batch.
- **Cumulative Curated Count**: The total size of `window.HANAPATH_CURATED_WORDS` after this batch's import.
- **Audio Run and Cache Confirmation**: Logs the Service Worker cache name (e.g., `hanapath-shell-vXXX`) and confirms `python generate_assets.py` was executed to map all new text to audio files in `audio_map.js`.

## Ledger Table

| Batch ID | Date | Source File/Range & Hash | Disposition Counts | Qualified Lemmas | Curated Words/Senses Added | Cumulative Curated Count | Draft/Published Elective Pack | Audio Run & Cache Confirmation | Independent Review Result | Notes/Blockers |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **baseline** | 2026-07-10 | Pre-expansion curated core | *not yet measured* | *not yet measured* | 2028 | 2028 | N/A (Core S1-S8) | Yes (v303/audio_map.js) | Approved | Core vocabulary v2 baseline |

*Note on baseline counts:* Disposition counts and qualified lemmas for the baseline 2,028 words are *not yet measured* because the curated core was compiled during Phase 1 prior to the scaffolding of candidate decision history. These fields will be derived for all subsequent expansion batches via the candidate processing pipeline.
