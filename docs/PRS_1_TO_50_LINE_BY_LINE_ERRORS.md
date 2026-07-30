# PRs 1–50: Line-by-Line Errors and Review

**Repository:** `CameronNel/hanapath`  
**Audit date:** 30 July 2026

Reviewed: every textual diff line exposed by GitHub for PRs #1–#50, PR metadata/discussion, correction lineage, and targeted current-`main` survival. Binary audio was reviewed through file/map/generator evidence, not waveform listening. Bulk Korean data was engineering-reviewed, not freshly native-certified line by line.

Labels: `LIVE` confirmed current; `FIXED` corrected/historical; `REPRO` reproduce on current main; `PROCESS` scope/evidence/governance. Severity: P0 critical, P1 high, P2 significant, P3 cleanup.

## Priority

- Fix PR #15’s live destructive Alphabet migration.
- Integrate PR #24’s auxiliary SRS into backup/state and fix its interval indexing.
- Rename/remove PR #50’s live pseudo-scientific speech metrics.
- Restore real first-run onboarding instead of PR #1’s bypass.
- Reproduce surviving PR #37/#48 assessment and analytics defects.
- Independently review bulk Korean/pronunciation content from #37/#40/#46/#47.

## Findings

### PR #1 · merged
https://github.com/CameronNel/hanapath/pull/1
- [P1 · LIVE] “Repo cleanup” silently bypassed onboarding.
- [P2 · LIVE] The forced onboarding mutation does not surface save failure.
- [P2 · PROCESS] Title and description concealed learner-facing behaviour.

### PR #2 · merged
https://github.com/CameronNel/hanapath/pull/2
- [P1 · FIXED] The prompt displayed the answer.
- [P1 · FIXED] A toast PR bundled unrelated lesson and audio changes.
- [P2 · REPRO] The revised voice sequence omitted taught vowels.
- [P2 · PROCESS] Permanent global input listeners widened the blast radius.

### PR #3 · merged
https://github.com/CameronNel/hanapath/pull/3
- [P3 · FIXED] Unused source parameter.
- [P3 · FIXED] Generic “Hear lesson” copy lost the active lesson context.

### PR #4 · merged
https://github.com/CameronNel/hanapath/pull/4
- [P1 · FIXED] Loaded `app.js` changed without a cache/version bump.
- [P2 · FIXED] Copy called some symbols “real consonants”.

### PR #5 · merged
https://github.com/CameronNel/hanapath/pull/5
- [P1 · FIXED] Alphabet-copy work unexpectedly added deployment infrastructure.
- [P2 · REPRO] Pages workflow deployed the repository root.
- [P2 · REPRO] Dialect-dependent English sound analogies.
- [P2 · FIXED] Delegated event code assumed an Element target.

### PR #6 · merged
https://github.com/CameronNel/hanapath/pull/6
- [P1 · REPRO] Deterministic voicing rules overstated Korean pronunciation.
- [P1 · REPRO] 자 was compared to English “cha”.
- [P2 · FIXED] “Every other letter matches romanization” was false.
- [P2 · FIXED] Important explanation content was visually hidden.

### PR #7 · merged
https://github.com/CameronNel/hanapath/pull/7
- [P3 · PROCESS] Responsive claim exceeded the evidence.

### PR #8 · merged
https://github.com/CameronNel/hanapath/pull/8
- [P2 · REPRO] Fixed pixel heights treated symptoms rather than content flow.
- [P3 · FIXED] Empty space was permanently reserved.

### PR #9 · merged
https://github.com/CameronNel/hanapath/pull/9
- [P2 · REPRO] Shift interaction rerendered the surface and could destroy focus.
- [P2 · FIXED] Delayed hide refresh was not cancelled.
- [P3 · FIXED] Fallback refresh targeted an absent mount.
- [P3 · FIXED] Save failure was ignored.

### PR #10 · merged
https://github.com/CameronNel/hanapath/pull/10
- [P3 · REPRO] Another fixed-height patch preserved the brittle layout model.

### PR #11 · merged
https://github.com/CameronNel/hanapath/pull/11
- [P2 · FIXED] The prior navigation crash exposed missing end-to-end coverage.
- [P3 · FIXED] The corrective change itself was narrow and appropriate.

### PR #12 · merged
https://github.com/CameronNel/hanapath/pull/12
- [P0 · FIXED] Default state shipped five Alphabet stages as completed.
- [P1 · FIXED] The PR title/body hid unrelated state and progression changes.
- [P2 · REPRO] Locked controls lacked robust disabled semantics.
- [P2 · PROCESS] Broad style changes made the regression surface larger than the stated task.

### PR #13 · merged
https://github.com/CameronNel/hanapath/pull/13
- [P2 · REPRO] Legend removal increased reliance on colour and opacity.
- [P3 · FIXED] Service-worker comment became stale.

### PR #14 · merged
https://github.com/CameronNel/hanapath/pull/14
- [P1 · FIXED] `app.js` changed without cache coordination.
- [P2 · REPRO] Legacy `showTab('practice')` alias remained ambiguous.

### PR #15 · merged
https://github.com/CameronNel/hanapath/pull/15
- [P0 · LIVE] Legacy Alphabet progress can be erased before forced onboarding.
- [P1 · LIVE] Migration has no explicit one-time version marker.
- [P1 · LIVE] Gap normalization destroys later completion records.
- [P1 · FIXED] Release-critical migration shipped without a cache bump.
- [P2 · LIVE] Global ordered lesson IDs are mutable.
- [P2 · LIVE] Migration persistence failure is not learner-visible.

### PR #16 · merged
https://github.com/CameronNel/hanapath/pull/16
- [P2 · FIXED] Loaded app change had no cache bump.
- [P2 · FIXED] Copy overclaimed that the step proved decoding.
- [P3 · FIXED] The curriculum structure was replaced only a few PRs later.

### PR #17 · merged
https://github.com/CameronNel/hanapath/pull/17
- [P1 · REPRO] Batchim gating checked whether block geometry was unlocked, not completed.
- [P1 · REPRO] The gate used the wrong milestone for actual batchim instruction.
- [P2 · REPRO] Seven coda sound representatives were treated as all batchim.
- [P2 · FIXED] Other simple spellings were removed to make the path fit.
- [P2 · FIXED] No cache bump.

### PR #18 · merged
https://github.com/CameronNel/hanapath/pull/18
- [P1 · REPRO] Precaching `audio_map.js` did not precache mapped audio.
- [P2 · REPRO] Audit regex did not parse every valid map form.
- [P2 · REPRO] Normalized key collisions silently kept the first entry.
- [P2 · REPRO] Audio index lacked a durable invalidation model.
- [P2 · FIXED] `app.js` revision was not updated.
- [P2 · PROCESS] One missing clip was waived rather than repaired.

### PR #19 · merged
https://github.com/CameronNel/hanapath/pull/19
- [P1 · FIXED] Accessibility claim included controls that were not keyboard-operable.
- [P2 · REPRO] Locked controls lacked consistent disabled semantics.
- [P2 · REPRO] Space handling on keydown could repeat actions.
- [P3 · FIXED] Data attribute targets were trusted without validation.

### PR #20 · merged
https://github.com/CameronNel/hanapath/pull/20
- [P3 · FIXED] Narrow cleanup after #19.

### PR #21 · merged
https://github.com/CameronNel/hanapath/pull/21
- [P2 · LIVE] Documentation canonised a destructive migration as safe.
- [P2 · FIXED] Batchim model repeated the same seven-sound/all-batchim conflation.
- [P2 · FIXED] Documentation implied audio-map caching meant audio was offline.
- [P3 · PROCESS] Authority document was already vulnerable to staleness.

### PR #22 · merged
https://github.com/CameronNel/hanapath/pull/22
- [P1 · FIXED] CI syntax command checked only the first JavaScript file.
- [P2 · PROCESS] Audio waiver was workflow-owned rather than audit-owned.
- [P2 · REPRO] CI inherited the audio parser’s coverage gaps.
- [P3 · PROCESS] GitHub Actions were tag-pinned rather than commit-SHA-pinned.

### PR #23 · merged
https://github.com/CameronNel/hanapath/pull/23
- [P3 · FIXED] Formatting-only Python change had unclear scope.
- [P3 · REPRO] Binary patterns were incomplete.

### PR #24 · merged
https://github.com/CameronNel/hanapath/pull/24
- [P1 · LIVE] Alphabet skill SRS is stored outside HanaPath backups.
- [P1 · LIVE] The first correct review skips the first configured interval.
- [P1 · LIVE] Unlocks read raw persisted IDs instead of canonical live state.
- [P2 · LIVE] Storage failures are silently discarded.
- [P2 · LIVE] The wrapper silently fails to install if global function names drift.
- [P2 · LIVE] Due reviews are offered probabilistically.
- [P2 · PROCESS] PR merged with no browser or terminal validation.
- [P2 · LIVE] Global monkey-patching is fragile.

### PR #25 · merged
https://github.com/CameronNel/hanapath/pull/25
- [P2 · LIVE] Hint is marked seen before successful rendering.
- [P2 · LIVE] A second independent storage key is outside backup/reset.
- [P2 · FIXED] “Tap any Hangul” copy was false.
- [P3 · PROCESS] Introduced another bespoke toast system.

### PR #26 · merged
https://github.com/CameronNel/hanapath/pull/26
- [P2 · PROCESS] No meaningful test evidence; checklist remained unchecked.
- [P2 · FIXED] Unrelated block diagrams and navigation removal were bundled.
- [P2 · REPRO] Fallback joined jamo text instead of composing a Hangul syllable.
- [P2 · REPRO] Vowel layout logic was binary and unsafe for compound vowels.
- [P2 · PROCESS] Navigation removal had no migration/resume test.
- [P2 · FIXED] Batchim appeared before its dedicated stage.
- [P3 · FIXED] Save failure ignored.

### PR #27 · merged
https://github.com/CameronNel/hanapath/pull/27
- [P1 · REPRO] Romanised prompts tested ambiguous English spelling rather than sound.
- [P2 · REPRO] Partial success spoke raw jamo sequences.
- [P2 · REPRO] `new Set(question.tray)` ran before array validation.
- [P2 · REPRO] Validator did not prove the target composition.
- [P2 · REPRO] Completion did not move focus.
- [P2 · REPRO] One mistake permanently spoiled clean scoring without clear explanation.

### PR #28 · merged
https://github.com/CameronNel/hanapath/pull/28
- [P2 · REPRO] Romanisation and hyphenation were inconsistent.
- [P2 · REPRO] Set construction preceded type validation.
- [P2 · REPRO] Target composition remained unverified.
- [P2 · REPRO] One tile could be reused to satisfy repeated letters.
- [P2 · REPRO] Raw-jamo audio remained.
- [P2 · REPRO] Per-block progress lacked a robust accessible equivalent.

### PR #29 · merged
https://github.com/CameronNel/hanapath/pull/29
- [P1 · FIXED] `app.js` and `styles.css` changed without cache coordination.
- [P2 · REPRO] The screen amplified inaccurate pronunciation notes from earlier PRs.
- [P2 · REPRO] “Ae & ye” and “double-vowel shape” copy was confusing.
- [P2 · REPRO] Keyboard instructions assumed a particular Korean layout.
- [P3 · FIXED] Some labels were not the standard Korean letter names.

### PR #30 · merged
https://github.com/CameronNel/hanapath/pull/30
- [P2 · REPRO] Fixed-height workaround remained brittle under zoom and font changes.
- [P3 · FIXED] Cache comment claimed broader work than the PR.
- [P3 · FIXED] Favicon/debug cleanup was sound.

### PR #31 · merged
https://github.com/CameronNel/hanapath/pull/31
- [P2 · REPRO] Restored feedback always said “Correct”.
- [P2 · PROCESS] New helper relied on inline styling.
- [P2 · REPRO] Delegated target assumed `.closest()` support.
- [P2 · FIXED] Persistence failure was ignored.

### PR #32 · merged
https://github.com/CameronNel/hanapath/pull/32
- [P1 · REPRO] One question could increment the same weak spot multiple times.
- [P1 · REPRO] Ending early could produce optimistic accuracy.
- [P2 · REPRO] End Session appeared in finite sessions despite the stated Infinite-only intent.
- [P2 · REPRO] English option labels were marked `lang='ko'`.
- [P2 · REPRO] Weak Spots mode reduced every weakness to a letter question.
- [P2 · REPRO] Choice generation could yield fewer than four options after deduplication.
- [P2 · REPRO] Wrong component could be logged as the weak key.
- [P2 · REPRO] No schema migration for `alphabetWeakSpots`.
- [P2 · PROCESS] Save failures were ignored.
- [P2 · REPRO] Mutually exclusive modes initially lacked radio semantics.

### PR #33 · merged
https://github.com/CameronNel/hanapath/pull/33
- [P1 · REPRO] Naive `LETTER_SOUND` concatenation produced ambiguous targets.
- [P2 · REPRO] Partial correct playback spoke raw jamo.
- [P2 · REPRO] One tile could be reused for duplicate positions.
- [P2 · REPRO] Weak-key logging always favoured the initial consonant.
- [P2 · REPRO] First-try status lacked an accessible representation.

### PR #34 · merged
https://github.com/CameronNel/hanapath/pull/34
- [P1 · REPRO] Regex-based speech extraction can speak arbitrary Hangul fragments.
- [P2 · LIVE] Hint state is persisted before render success.
- [P2 · PROCESS] “Questions generate forever” exceeded the proof.
- [P2 · REPRO] No existence audit guaranteed audio for extracted fragments.

### PR #35 · merged
https://github.com/CameronNel/hanapath/pull/35
- [P2 · REPRO] `role='status'` covered a large dynamic detail card.
- [P2 · REPRO] `aria-pressed` was weaker than a radio-group model for exclusive modes.
- [P2 · PROCESS] “Every screen” accessibility claim lacked assistive-technology evidence.

### PR #36 · closed/unmerged
https://github.com/CameronNel/hanapath/pull/36
- [P2 · FIXED] A 3,067-line duplicate specification competed with existing authority.
- [P2 · PROCESS] The PR had no useful inspectable product diff because the document had already entered `main` elsewhere.

### PR #37 · merged
https://github.com/CameronNel/hanapath/pull/37
- [P1 · REPRO] Fresh correct SRS answer skipped the first interval.
- [P1 · FIXED] Study typing card displayed the target answer.
- [P1 · REPRO] Raw frequency rank was merged by Korean surface only.
- [P1 · FIXED] First-win Korean map collapsed same-surface senses.
- [P1 · FIXED] Known totals could double-count curated rows also present in the raw list.
- [P1 · REPRO] Manual “known” created artificial SRS evidence.
- [P1 · REPRO] Lesson completion created SRS records even for skipped words.
- [P1 · REPRO] `requireTypedAttempt` checked attempt existence, not typing success.
- [P1 · REPRO] Pass calculation could return 100% with no checkpoint results.
- [P1 · REPRO] Accepted-answer sets could include contextually wrong forms.
- [P1 · FIXED] Curated Words audio initially fell back to browser TTS despite “audio for every word” copy.
- [P1 · FIXED] No persisted mid-lesson resume.
- [P1 · PROCESS] PR merged with a known failing browser assertion.
- [P2 · REPRO] Direction-level due records were not fully driving scheduling.
- [P2 · REPRO] Word Bank cache key could stay stale when set membership changed but counts did not.
- [P2 · REPRO] Context blanking used the first raw substring match.
- [P2 · REPRO] Function-word distractors mixed incompatible positional categories.
- [P2 · REPRO] Meaning distractors deduped only exact strings.
- [P2 · REPRO] Syllable tiles could be reused without multiplicity enforcement.
- [P2 · REPRO] Exact Word Bank return position was not persisted.
- [P2 · REPRO] Back navigation cleared typed work.
- [P2 · REPRO] English answer options could be marked Korean.
- [P2 · REPRO] Row keydown could open detail when activating a nested Hear button.
- [P2 · REPRO] Unknown lesson IDs were retained by shallow normalization.
- [P2 · PROCESS] Added 1,667 lines directly to the monolithic `app.js`.
- [P2 · PROCESS] No full Alphabet regression.
- [P3 · REPRO] Locked lesson controls lacked consistent disabled semantics.

### PR #38 · merged
https://github.com/CameronNel/hanapath/pull/38
- [P2 · FIXED] Removed a dangerous runtime monkey-patch approach.
- [P1 · REPRO] Most example romanisations remained knowingly approximate.
- [P2 · REPRO] Approximate per-syllable romanisation was still shown to beginners.
- [P2 · PROCESS] Hand-authored pronunciation data lacked an independent content audit.
- [P2 · PROCESS] Title implied full correction while roughly 57 of 109 examples still used fallback.

### PR #39 · merged
https://github.com/CameronNel/hanapath/pull/39
- [P1 · FIXED] `app.js` changed without a cache bump.
- [P2 · REPRO] Current-step logic used indexed completion count.
- [P2 · PROCESS] No full browser click-path verification.

### PR #40 · merged
https://github.com/CameronNel/hanapath/pull/40
- [P1 · REPRO] Surface forms and pronunciation hints were conflated.
- [P1 · REPRO] 120 words and 24 lessons were added without independent review.
- [P2 · FIXED] Changed lesson-plan file kept the old query revision.
- [P2 · PROCESS] Browser tests seeded prerequisites rather than completing the learner path.
- [P2 · REPRO] Plain nouns still relied on approximate romanisation.
- [P2 · PROCESS] The PR encouraged further bulk expansion before quality review.

### PR #41 · merged
https://github.com/CameronNel/hanapath/pull/41
- [P1 · FIXED] 500 raw meanings were outside the strict curated audit.
- [P1 · FIXED] Surface-keyed meanings collapsed homographs and polysemy.
- [P1 · PROCESS] “Ranks 1–500” was inferred from key count rather than one-to-one rank proof.
- [P1 · REPRO] Inflected fragments were described like dictionary entries.
- [P2 · PROCESS] No independent review of 500 generated glosses.
- [P2 · PROCESS] No comprehensive browser/regression evidence.

### PR #42 · merged
https://github.com/CameronNel/hanapath/pull/42
- [P1 · REPRO] Grammar endings were forced into the ordinary-word model.
- [P2 · REPRO] Lesson-group name did not match the later past-form selector.
- [P2 · REPRO] Irregular-family lessons later defaulted to honorific questions.
- [P2 · PROCESS] Recognition drills were treated as proof of production teaching.
- [P2 · REPRO] 33 grammar entries and six lessons lacked independent review.

### PR #43 · merged
https://github.com/CameronNel/hanapath/pull/43
- [P2 · PROCESS] Created a north-star document and a verbatim duplicate source.
- [P2 · PROCESS] Research claims lacked concrete source citations inside the repository.
- [P2 · PROCESS] Pronunciation-scoring “stub” was treated as an acceptable milestone.
- [P2 · PROCESS] Large duplicated documentation increased authority drift.

### PR #44 · merged
https://github.com/CameronNel/hanapath/pull/44
- [P1 · FIXED] Proved a squash merge had omitted the second commit from #43.
- [P2 · FIXED] README recommended a multi-file `node --check` command that checked only the first file.
- [P2 · PROCESS] Retained duplicate source documentation.
- [P2 · PROCESS] Accepted non-acoustic segmental/prosodic scoring as roadmap-complete.

### PR #45 · merged
https://github.com/CameronNel/hanapath/pull/45
- [P2 · PROCESS] Automatic milestone selection enabled oversized scope.
- [P2 · PROCESS] Hard-coded queue state became stale immediately.
- [P2 · PROCESS] Feature PRs updated their own scorecard to Done.
- [P2 · PROCESS] “One milestone per PR” was advisory, not enforced.

### PR #46 · merged
https://github.com/CameronNel/hanapath/pull/46
- [P0 · FIXED] Speaking practice fabricated 94% and 91% scores.
- [P0 · PROCESS] Title claimed M1-only while the PR changed 1,050 files.
- [P1 · PROCESS] The same PR marked M1, M2, M3, and M4 complete.
- [P1 · REPRO] Inflection engine contained an invalid medial-vowel table entry.
- [P1 · REPRO] Inflection rules were too broad for Korean morphology.
- [P1 · REPRO] Irregular-family questions selected honorific forms rather than the taught irregular operation.
- [P1 · REPRO] Past-tense group naming did not match the generator branch.
- [P1 · FIXED] Listening discrimination was labelled pronunciation accuracy.
- [P1 · REPRO] Minimal-pair explanations used dialect-dependent English analogies.
- [P2 · REPRO] Default “sounds-like” derivation added tense `따` too broadly.
- [P2 · REPRO] Form-recognition distractors were not collision-checked.
- [P2 · REPRO] Form production accepted only one generated surface.
- [P2 · PROCESS] Inline `onclick` globals expanded the runtime surface.
- [P2 · PROCESS] The 1,050-file diff was not realistically reviewable as one PR.
- [P3 · PROCESS] New AGENTS rules said changes must be small and single-purpose while this PR violated them.

### PR #47 · merged
https://github.com/CameronNel/hanapath/pull/47
- [P1 · FIXED] The claimed 805-sense bank contained 67 accidental duplicate rows.
- [P1 · FIXED] Bulk generation used duplicate surfaces and lightly renamed IDs to cross the volume threshold.
- [P1 · REPRO] Hundreds of words/examples and 91 lessons lacked independent review.
- [P1 · PROCESS] M5 self-certified as Done because the count exceeded 800.
- [P2 · FIXED] Generated copy contained grammar such as “Learn 1 common words”.
- [P2 · FIXED] Generic titles such as “Building bridge Part 5” weakened pedagogy.
- [P2 · PROCESS] Audio was bulk-generated but not perceptually reviewed.
- [P2 · PROCESS] Verification proved schema and syntax, not lexical quality.

### PR #48 · merged
https://github.com/CameronNel/hanapath/pull/48
- [P1 · REPRO] “7-day” and “30-day retention” were not delayed retests.
- [P1 · REPRO] Mastery percentage was an arbitrary weighted formula.
- [P1 · REPRO] Confidence was inferred from speed and correctness.
- [P2 · REPRO] Latency could include hidden-tab or idle time.
- [P2 · REPRO] Imported/future timestamps were not tightly rejected.
- [P2 · REPRO] A global question timer could be stale across preserved renders.
- [P2 · PROCESS] M6 was self-certified Done immediately.
- [P2 · REPRO] 80% mastery threshold had no calibration evidence.

### PR #49 · merged
https://github.com/CameronNel/hanapath/pull/49
- [P1 · REPRO] Audio-map parse failure could reset the generator’s in-memory map to empty.
- [P1 · REPRO] Existing stale audio keys were preserved forever.
- [P1 · REPRO] Recognition validation was tautological.
- [P2 · REPRO] “Sounds-like” fell back to Latin romanisation.
- [P2 · FIXED] General sound-note prose was relabelled “Spelling vs sounds-like”.
- [P2 · PROCESS] A small gold set was used to overstate engine completeness.
- [P2 · FIXED] Verification used the broken multi-file `node --check` pattern.
- [P2 · PROCESS] Hanja validation proved only that some CJK ideograph existed, not that it was correct.

### PR #50 · merged
https://github.com/CameronNel/hanapath/pull/50
- [P1 · LIVE] “Segmental accuracy” is transcript edit distance.
- [P1 · LIVE] “Prosodic fluency” is duration proximity.
- [P1 · LIVE] Browser speech processing is not properly disclosed in the product’s privacy copy.
- [P1 · REPRO] Android microphone behaviour was not proven.
- [P1 · PROCESS] The PR said register was correct across all 805 rows despite mostly inferred labels.
- [P2 · REPRO] Explicit metadata was displayed as “verified” without independent verification.
- [P2 · REPRO] Origin type inference used English keyword and spelling heuristics.
- [P2 · REPRO] Broad morph-tag inference flattened nuanced categories.
- [P2 · REPRO] Internal curation metadata was exposed in the learner Word Bank.
- [P2 · REPRO] No full assistive-technology or device matrix.
- [P2 · FIXED] README retained the broken multi-file `node --check` command.
- [P2 · PROCESS] UI labels sounded scientific even though the PR called the feature a stub.

## Recurrent causes

- Scope laundering: state, deployment, data, audio, and pedagogy changes hid under narrow titles.
- Cache drift: loaded-file changes repeatedly lacked coordinated service-worker/query revisions.
- Structural audits were mistaken for Korean linguistic or audio review.
- Feature PRs self-certified roadmap milestones as Done.
- PR #37 and especially #46 were too large for reliable independent review.
- Auxiliary localStorage stores escaped backup/reset/corruption handling.
- Pronunciation, confidence, mastery, and retention labels exceeded their algorithms.
- Tests often seeded state or inspected source instead of completing the learner flow.
- Multi-file `node --check` commands checked only the first file.

## Done when

- Every LIVE P0/P1 is fixed or explicitly accepted with truthful copy.
- Every REPRO P0/P1 is reproduced or disproved on current main with a permanent test.
- All learner state round-trips through backup/import and handles quota/corruption visibly.
- Korean and pronunciation claims receive independent review separate from schema audits.
- Scientific labels are reserved for measurements that actually measure the named construct.
- Future PRs disclose all changed domains and cannot self-approve milestone completion.