# Words Batch QA Checklist

Use this checklist to verify every expansion batch PR before merging. No batch may bypass these QA gates.

---

## 1. Automated Verification Checks
- [ ] Run the strict curated words audit:
  ```powershell
  node scripts/audit-words-data.mjs --strict
  ```
- [ ] Verify that all Javascript files pass syntax checks:
  ```powershell
  node --check words_curated_core.js
  node --check words_lesson_plan.js
  ```
- [ ] Run the expansion tooling tests to ensure no regressions:
  ```powershell
  node scripts/words_expansion/test_expansion_tooling.mjs
  ```

## 2. Audio Validation Gates
- [ ] Run the schema-aware, deterministic audio extraction and verification:
  `node scripts/words_expansion/extract_audio_keys.mjs --out scripts/words_expansion/audio_keys_report.json --missing-out scripts/words_expansion/audio_missing_report.json --strict`
  Review the missing report; it covers word, form, and example speech fields.
  ```powershell
  python generate_assets.py
  ```
- [ ] Run the alphabet audio check to ensure zero missing references:
  ```powershell
  node scripts/audit-alphabet-audio.mjs --strict
  ```
- [ ] Bump cache versions in `sw.js` (update `CACHE_NAME`) and update `?v=...` query parameters in `index.html` and `sw.js` to trigger client-side cache refresh.

## 3. Pedagogical & Content Review
- [ ] **No Invented Senses**: Verify homographs have valid dictionaries behind them.
- [ ] **Duplicate Gloss Check**: Jaccard similarity is within limits and meaning is distinct from existing curated entries.
- [ ] **Beginner-Friendly Examples**: Examples use simple vocabulary and grammar tags.
- [ ] **Scenario Cohesion**: Check that new lessons contain 8–12 words mapped to a clear communicative function.
- [ ] **Review High-Risk Forms**: Manual check for homographs, particles, proper nouns, and native vs. Sino-Korean distinctions.

## 4. Performance & Memory Budget
- [ ] **LocalStorage Check**: Curated core JSON file size is within limits. Confirm `localStorage` state for `hanapath-v1` remains under the browser quota.
- [ ] **Audio Cache Size**: Confirm that the runtime download cache remains under the target 200MB limit.

## 5. Browser Smoke Testing
- [ ] Start local server: `python -m http.server 8000`
- [ ] Open application in private browser window.
- [ ] Play through at least one new content lesson and verify typing, card rendering, audio playing, and check-remediation steps without errors.
