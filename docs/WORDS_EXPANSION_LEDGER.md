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
| **p2-proposal-r112-r122 + p2-owner-decisions-r112-r122** | 2026-07-10 | `korean_5000_claude_ready.csv`, ranks 112–122; `4dfba796fd3f2d828c48d78a8a10565e33483b5366af16f2b607ec27d0f714dd` | 5 deferred; 5 covered; 1 rejected, re-derived across the two listed immutable-history batches | 0 | 0 | 2028 | No pack; qualification-only | N/A — no new spoken content and no cache change | Owner decisions recorded | 때문 is grammar-only and taught as 때문에; 어서/다는/으면/해서 are grammar-only source forms; no rows invented |
| **p2-qualify-r345-r453** | 2026-07-10 | Candidate queue ranks 345–453; per-row 5k/15k source hashes in immutable decisions | Re-derived in `elective_qualification_report.json` | 3 qualified lexical candidates | 0 | 2028 | No pack; qualification-only | N/A — no new spoken content and no cache change | Owner review packet | Study/work/social participation seeds only; ambiguous, grammatical, covered, and unresolved forms stay out of vocabulary rows |

*Note on baseline counts:* Disposition counts and qualified lemmas for the baseline 2,028 words are *not yet measured* because the curated core was compiled during Phase 1 prior to the scaffolding of candidate decision history. These fields will be derived for all subsequent expansion batches via the candidate processing pipeline.
