# Sentences Section — Final Roadmap (execution playbook)

> **Who this is for:** the AI-model workflow building the Sentences section.
> **What owns what:** [`SENTENCES_TEACHING_SPEC.md`](SENTENCES_TEACHING_SPEC.md)
> is the source of truth for *what* to build (schema §3, tags §4, bands §5,
> drills §6, milestones §9); this file is the batch-by-batch *execution queue*
> — tick a checkbox, do exactly that PR, nothing else. If this file and an
> audit ever disagree, trust the audit and fix this file in the same PR.
>
> **One unchecked box = one small PR**, branched off `main`, opened as a
> draft, verified per spec §10. Update this file's checkbox and the spec's §8
> scorecard **in the same PR** as the work.

---

## 0. Ground rules (inherited from the Words build — they earned their scars)

1. **Never trust a checked box or scorecard line without re-deriving it from
   the data.** The Words scorecard lied four times; the worst case was a bad
   integration merge (`b385e77`) that silently destroyed already-merged
   content while every audit stayed green. After any merge touching
   `sentences_core.js`, diff the merged branch tip against `main` at the
   row/field level before trusting the result.
2. **Stay vanilla/static.** No framework, no build step, no `package.json`.
   `sentences_core.js` is a committed plain browser global, even though a
   script generates its first version.
3. **Additive, backward-compatible data changes.** Existing rows keep passing
   the audit; ids are never reused or renamed.
4. **Cache bumps** on every loaded-file change: `CACHE_NAME` in `sw.js` +
   `?v=` strings in **both** `index.html` and `sw.js`.
5. **Audio:** new Korean text → `python generate_assets.py` per
   `.agents/AGENTS.md`. Never hand-edit `audio_map.js`. (Track A needs **no**
   audio work — every seed sentence already has generated audio.)
6. **Protected areas:** the Alphabet section is complete; the Words section is
   complete. Keep `node scripts/audit-words-data.mjs --strict` green in every
   sentences PR.
7. **Owner-gated items are marked 🔒** — do not attempt them autonomously.

### 0.1 Model routing (who does which box)

Route by task shape, per `AI_INSTRUCTIONS.md`:

- **Codex 5.4 (bulky, recipe-driven):** Track D tag-curation batches (apply
  the §5 decision table row by row), Track H audio-regeneration/wiring steps,
  mechanical doc/count refreshes. The audits are the safety net.
- **High-intelligence model (judgment):** everything touching `app.js`
  (Tracks B, C, E, F, G, I, J), schema/audit design (A2), authoring new
  sentences or `grammarTip` copy (H), reviewing/landing Codex batches, all
  merge/integration work and post-merge verification.
- A "bulky" box that turns out to need a semantic call mid-batch **stops and
  hands over** — no guessing.

Each box below carries its routing: **[codex]** or **[high]**.

---

## 1. Definition of DONE for the whole Sentences section

- [ ] **Track A** — Bank foundation: `sentences_core.js` + strict audit + app-shell wiring
- [ ] **Track B** — Translate & Type: English → typed-Hangul drill with the full helper ladder *(owner's #1 feature)*
- [ ] **Track C** — Practice hub + sentence SRS + i+1 gating
- [ ] **Track D** — Pattern-tag & band curation: 0 rows with an `inferred` axis
- [ ] **Track E** — Pattern micro-lessons: 12 units playable
- [ ] **Track F** — Shadow & speak modes
- [ ] **Track G** — Transform drill (inflection engine)
- [ ] **Track H** — 🔒 Authored expansion batches (owner sets volume/themes)
- [ ] **Track I** — Legacy mini-bank migration + dead-code removal
- [ ] **Track J** — Close-out: analytics, honest docs, scripted cold-learner test

Dependency order: **A → B → C → (D ∥ E after D1) → F/G → H (after D) → I → J.**
D batches can interleave with B/C. Nothing in E–J starts before B ships —
the owner wants Translate & Type first.

---

## 2. Runbook (read before every box)

1. `git status && git log --oneline -8` — confirm clean, on `main`.
2. Re-derive current state (§2.1). Read the box's recipe fully.
3. Branch, implement **only that box**, run spec §10 verification.
4. Update this file's checkbox + spec §8 scorecard in the same PR.
5. Open a draft PR describing what changed and how it was verified.

### 2.1 How to re-derive current state

```bash
node scripts/audit-sentences-data.mjs --strict 2>/dev/null || echo "bank not built yet"
node -e '
global.window={}; try{ eval(require("fs").readFileSync("sentences_core.js","utf8"));
const s=window.HANAPATH_SENTENCES||[];
console.log("rows:",s.length);
console.log("inferred band:",s.filter(r=>r.annotationSource?.band==="inferred").length);
console.log("inferred tags:",s.filter(r=>r.annotationSource?.patternTags==="inferred").length);
console.log("by source:",JSON.stringify(s.reduce((a,r)=>(a[r.source]=(a[r.source]||0)+1,a),{})));
}catch(e){console.log("no bank yet")}'
```

---

## 3. Track A — Bank foundation

### A1 — Extractor + seed bank [high]
- [x] **A1** Build `scripts/build-sentence-bank.mjs` and commit the generated `sentences_core.js`.

**Recipe:** The extractor loads `words_curated_core.js` (Node `vm`/`eval`
pattern used by the existing audits), takes every row's
`exampleKo`/`exampleEn`/`exampleVoiceText`, dedupes by normalized `exampleKo`
(~2,007 unique sentences expected from 2,028 rows — merge `sourceWordIds`
/`focusWordIds` for shared sentences), and emits `sentences_core.js` exposing
`window.HANAPATH_SENTENCES` per spec §3. Mechanical inference for v1, all
marked `annotationSource: "inferred"`:
- `tokens`: whitespace split of `korean` (strip trailing punctuation from the
  last token's copy in `tokens`? **No** — keep tokens verbatim so
  `tokens.join(" ") === korean`; the build drill already tokenizes this way,
  see `tokenizeSentence`, app.js ≈2403).
- `band`: from token count + source word `difficulty` (1: ≤3 tokens & diff 1;
  5: ≥7 tokens or diff ≥4; linear in between — document the exact formula in
  the script header).
- `patternTags`: regex/morphTag detection for the mechanically detectable
  subset (particles by token endings 은/는→`topic-neun`, 이/가→`subject-i-ga`,
  을/를→`object-eul-reul`, 에/에서/으로 etc.; endings 어요/아요→`present-polite`,
  았/었→`past-polite`, ㅂ니다→`formal-nida`, 이에요/예요→`copula-ieyo`; 안 →`neg-an`,
  못→`neg-mot`). False positives are acceptable at this stage — Track D fixes
  them; false *certainty* is not, hence `inferred`.
- `speechLevel`/`register`: copy from the source word row.
- `source: "words-core"`, `id`s assigned once (`s0001`…) in deterministic
  order (by source word id) and **frozen thereafter** — rerunning the script
  must not renumber existing rows (the script must read the existing bank and
  preserve ids; document this).

The script is a one-time generator + regeneration tool, not a build step: its
output is committed and thereafter hand-edited like `words_curated_core.js`.
**No audio work needed** — every `voiceText` equals an already-generated
`exampleVoiceText`. Verify that claim with a coverage count in the PR.

**Acceptance:** committed bank ≈2,000 rows; `node --check sentences_core.js`;
rerunning the extractor is idempotent (zero diff); a spot-check of 10 random
rows reads correctly (do it, paste it in the PR).

### A2 — Strict audit [high]
- [x] **A2** Create `scripts/audit-sentences-data.mjs` (+`--strict`).

**Recipe:** Mirror `audit-words-data.mjs` structure. Enforce every §3 rule:
unique/stable ids, non-empty korean/english/voiceText, Korean-only voiceText,
`AUDIO_MAP` coverage (load `audio_map.js`, allowlist constant must be empty at
J-close), tokens⇄korean consistency, `patternTags` ⊆ §4 closed vocabulary,
`focusWordIds` exist in curated words, no duplicate normalized `korean`
(carry over the Words dedupe lesson: a senseKey-style cosmetic difference is
not a distinct sentence), `acceptAlso` sanity, `annotationSource` present per
axis. Print an "Annotation sources" summary (explicit vs inferred per axis)
exactly like the words audit so §2.1 re-derivation works.

**Acceptance:** audit passes `--strict` on the A1 bank; deliberately breaking
one row of each class makes it fail (show one example in the PR).

### A3 — App-shell wiring [high]
- [x] **A3** Load the bank in the app (zero behavior change).

**Recipe:** Add `<script defer src="./sentences_core.js?v=...">` before
`app.js` in `index.html`; precache in `sw.js`; bump `CACHE_NAME` and all `?v=`
strings; `node scripts/audit-app-shell.mjs` green. No `app.js` consumption yet
beyond an optional dev-console log. Browser smoke test: console clean,
`window.HANAPATH_SENTENCES.length` correct.

---

## 4. Track B — Translate & Type (owner's requested feature)

### B1 — Core drill [high]
- [ ] **B1** New question type `translate-type`: English prompt → typed Hangul answer.

**Recipe:** Add `makeSentenceTranslateQuestion(level)` beside the existing
generators (app.js ≈2629–2750): prompt = `english`, expected = `korean` +
`acceptAlso`, sourced from `HANAPATH_SENTENCES` filtered to the learner's band
(fallback to `getSentenceStudyBank()` only if the bank is missing). Reuse the
existing typed-input quiz plumbing from `makeSentenceTypingQuestion`
(`inputMode`-style question with text field, `lang="ko"`, Check button).
Checking via `normalizeKoreanAnswer(value, {ignoreSpaces:true})`. On success
play `voiceText` audio via `lookupAudioUrl()`. Add `"translate"` into
`getSentenceDeckForLevel` mixes (e.g. replace one `"type"` slot per band ≥2,
and make band 1 `["build","translate","build","type"]`). Wire the same
mode-key into the deck-selection and rendering switch (≈2790).

**Acceptance:** drill appears in the sentences practice deck; correct/incorrect
paths both render feedback; `node --check app.js`; browser test typing both a
correct and wrong answer.

### B2 — Helper ladder [high]
- [ ] **B2** Tip → Word bank → Next chunk → Reveal, with helper-usage tracking.

**Recipe:** Per spec §6.1. Buttons under the input, escalating:
1. **Tip:** static `PATTERN_TAG_INFO` map (tag → 1-line English explanation
   for every §4 tag — author the copy in this PR) rendered for the row's
   `patternTags`, plus `grammarTip` when non-empty.
2. **Word bank:** render the row's `tokens` + distractors from
   `makeSentenceTokenPool` as tap-tiles appending to the input — reuse the
   Words checkpoint tile pattern (`data-word-tile`, app.js ≈5700) including
   the ⌫ tile; this is the no-Korean-IME path and must be fully usable alone.
3. **Next chunk:** reveals the next unrevealed token inline (prefix locked
   into the input).
4. **Reveal:** shows the full answer; attempt logged as "revealed".
Track helpers used on the active question (e.g. `question.helpersUsed`) — it
feeds SRS grading (C3) and analytics (J1). Keyboard users must be able to
ignore helpers entirely.

**Acceptance:** all four helpers work on touch + keyboard; helper state resets
between questions; tiles honor `aria-label` rules (HANDOVER conventions).

### B3 — Token diff feedback + acceptAlso [high]
- [ ] **B3** Per-token diff on wrong answers; `acceptAlso` honored.

**Recipe:** On incorrect Check, align typed tokens vs target tokens
(normalized comparison, simple LCS or positional match is fine) and render the
target with matched tokens green / missed tokens highlighted, plus the
learner's input echoed. Accept any `acceptAlso` variant as fully correct.
Optionally (same PR) treat an answer differing only in final punctuation or a
politeness-equivalent whitespace variant as correct — anything beyond that
waits for real `acceptAlso` data (Track D/H add variants; do **not**
mass-generate variants mechanically here).

**Acceptance:** wrong answer shows an interpretable diff; near-miss (spacing/
punctuation) is accepted; browser-verified.

---

## 5. Track C — Practice hub, SRS, gating

### C1 — Practice hub rebuild [high]
- [ ] **C1** Replace the `renderPracticeView` level-rail shell with a session hub.

**Recipe:** Rebuild `renderPracticeView()` (app.js ≈13949): a session card
(Due reviews → New sentences → Free drill), mode chips (Translate / Build /
Dictation / Listen), and a browse list of the learner's available sentences
(reuse the existing study-row rendering). Keep `currentQuizScope="sentences"`
plumbing. Until C3 lands, "Due" can show the new-sentence queue only — do not
fake SRS numbers. Remove the old band-slice "Learn/Repeat" cards; keep the
level rail only if it still drives deck difficulty (it does, via
`getTrackLevel("sentences")` — keep, but demote visually).

### C2 — i+1 gating [high]
- [ ] **C2** New-sentence queue restricted to known words.

**Recipe:** "Met words" = union of word ids in completed word lessons
(`HANAPATH_WORD_LESSONS` + lesson-completion state) and `state.vocabSrs` keys.
A sentence is *available* when every `focusWordIds` entry is met (empty
`focusWordIds` ⇒ available). Sort available by `band`, then token count. Show
a "locked — learn N more words" affordance linking to the Words tab for the
next locked band. Guard the cold-start: a learner with zero Words progress
still gets band-1 sentences whose focus words sit in the first Words lessons
(W0–W2) — verify with a cold `localStorage` browser run.

### C3 — Sentence SRS [high]
- [ ] **C3** `state.sentenceSrs` Leitner + due queue + grading.

**Recipe:** Mirror `state.vocabSrs` (see word SRS usage app.js ≈4321/4958 and
the letter Leitner ≈8312–8390): `{ box, due, lapses, lastSeen, isKnown }` per
sentence id, normalized on state load like other state slices. Grading:
correct with no helpers → promote; correct with helpers → hold; wrong/reveal →
demote + lapse. All Track B/legacy drills that draw a bank row report into it.
Hub "Due" section now real; cap new/day (default 5, stored in state).
**Clock-shift test:** set a card's `due` into the past via console, reload,
confirm it surfaces.

### C4 — Today-screen surfacing [high]
- [ ] **C4** Due-sentence count on the Today/home surface next to the existing word-review affordance (see `wordReviewHtml`, app.js ≈12506). Small PR.

---

## 6. Track D — Curation burn-down (band + patternTags) [codex]

**Goal:** every row ends with explicit `band` and ≥1 explicit `patternTags`;
`annotationSource` flips to `"explicit"` only after a human-readable check of
that row. ~2,000 rows ÷ 8 batches ≈ 250 rows per batch, ordered by id.

**Per-batch recipe (identical every time):**
1. Take the next id range with any inferred axis (re-derive via §2.1 — never
   trust the last PR's claim of where it stopped).
2. For each row apply the decision table:
   - **band:** does the inferred band match §5's table for this sentence's
     shape? Adjust if not. A sentence with a clause linker is never band ≤2;
     a 2–3-token copula sentence is never band ≥3.
   - **patternTags:** verify each inferred tag against the actual sentence
     (the regexes have known false positives: 에 inside a word is not
     `location-e`; 은/는 as a modifier ending is not `topic-neun`). Remove
     wrong tags, add missing tags **from the §4 closed list only**. If the
     sentence needs a tag outside the list, **stop and hand to [high]** — tag
     vocabulary changes are schema changes.
   - Optionally fill `grammarTip` when a one-liner is obvious; leave empty
     otherwise (H authors tips deliberately).
3. Flip only the verified axes to `explicit`. Run the audit. One PR.

- [ ] **D1** rows batch 1 (~250)
- [ ] **D2** rows batch 2
- [ ] **D3** rows batch 3
- [ ] **D4** rows batch 4
- [ ] **D5** rows batch 5
- [ ] **D6** rows batch 6
- [ ] **D7** rows batch 7
- [ ] **D8** rows batch 8 + final zero-inferred verification (paste §2.1 output)

---

## 7. Track E — Pattern micro-lessons

### E1 — Lesson plan file + player wiring [high]
- [ ] **E1** `sentences_lesson_plan.js` (`window.HANAPATH_SENTENCE_LESSONS`) + app-shell wiring + a lesson-player path for sentence units.

**Recipe:** Schema mirrors `words_lesson_plan.js`: units with `id`, `title`,
`patternTags` (the cluster taught), `sentenceIds` (4–6 bank rows exercising
it), `conceptHtml` (short explanation), unlock chain linear. Reuse/extend the
Words lesson player flow (`wordLesson*`) rather than writing a new player —
study cards with audio, then checkpoint = 1 build + 1 translate-type from the
unit's sentences. Gate unit 1 behind the sentences-studio unlock; later units
behind the previous unit. Cache bump + audit wiring (extend A2's audit or add
checks: sentenceIds exist, tags ⊆ closed list).

### E2 / E3 — Author the 12 units [high]
- [ ] **E2** Units 1–6: Topic & subject · Object + verb · Location 에/에서 · Copula & negative copula · Present-polite conjugation in context · Negation 안/못
- [ ] **E3** Units 7–12: Past tense · Future 거예요 · Want/can (고 싶다, ㄹ 수 있다) · And/but (고, 지만) · Because/if (아서, 면) · Honorific 시 & formal 니다

**Recipe:** For each unit pick bank sentences by `patternTags` (post-Track-D
they're trustworthy), preferring low-band, early-word sentences; write
`conceptHtml` linking to the W17–W19 grammar words instead of re-explaining
them. One PR per box; browser-play each unit before shipping.

---

## 8. Track F — Shadow & speak

- [ ] **F1** [high] Shadow mode: listen → slow replay (`SPEAK_RATE` exists ≈2884) → delayed repeat prompt → self-mark; surfaces the source row's `soundNote` when the bank row's source word has one (join via `sourceWordIds`).
- [ ] **F2** [high] Speech scoring: wire the existing SpeechRecognition transcript-match stub (≈14626) to grade a spoken sentence attempt vs `voiceText` with the same graceful no-API fallback copy. The stub is the accepted final approach (Words §9 item 5 decision) — do not build server ASR.

---

## 9. Track G — Transform drill

- [ ] **G1** [high] `makeSentenceTransformQuestion`: pick a bank sentence whose focus word is a verb/adjective with `HANAPATH_INFLECT` support; prompt a transform (present→past, polite→formal, affirmative→negated); validate with `inflect`/`recognize` (see the conjugated-blank precedent, app.js ≈5097–5300). Typed input reuses B1/B2 machinery (tiles included).
- [ ] **G2** [high] Deck integration: transforms appear at band ≥3 in `getSentenceDeckForLevel`; graded into the SRS as the *sentence's* review with a `transform` event flag.

---

## 10. Track H — 🔒 Authored expansion (owner-gated volume)

**Precondition:** owner approves themes + batch count. Coverage first:

- [ ] **H1** [high] Gap report: extend the audit (or a sibling script) to print a patternTags × band coverage matrix and the list of §4 tags with <10 sentences; propose batch contents from it. No data change — the PR is the report + proposal in `docs/`.
- [ ] **H2…Hn** [high authors, codex applies audio steps] Batches of ~40–60 **original** sentences filling the thinnest cells (expected thin: clause linkers, future, formal register, honorific-si). Rules: copyright-safe original text only (K-pop/fan-life *theming* welcome — practice rooms, schedules, encouragement — verbatim lyrics/subtitles never); every new row needs `grammarTip`, explicit axes, `acceptAlso` where a natural variant exists; **audio must be generated** (`python generate_assets.py`) and `audit-alphabet-audio --strict` + the sentences audit green; ids continue the frozen sequence with `source: "authored"`.

---

## 11. Track I — Legacy consolidation

- [ ] **I1** [high] Migrate the app.js mini-banks (`grammarSentenceBank`, `verbSentenceBank`, `conversationLineBank`, `survivalPhrases`, and the rest aggregated in `getSentenceStudyBank()` ≈2442) into `sentences_core.js` with `source: "legacy-app"`, real ids, tags, and dedupe against existing rows (many overlap the words examples — the audit's duplicate check decides). Sentences that only make sense in their original drill (cloze prompts, role-ID items) stay put — migrate only actual sentences; list the keep-in-place items in the PR.
- [ ] **I2** [high] Point `getSentenceStudyBank()` (and the listening deck's sentence sources) at the bank; delete now-dead bank constants and any orphaned deck code; re-verify the Listening tab still works (it shares these banks — check `makeSentenceListenQuestion` and the conversation drills before deleting anything they still use).

---

## 12. Track J — Close-out

- [ ] **J1** [high] Analytics: sentence review events (mode, correctness, helper count, latency) into the existing per-item analytics store + a sentences block in the metrics view.
- [ ] **J2** [codex] Docs honest: spec §8 scorecard fully re-derived, this file's boxes reconciled, `HANDOVER.md` + `README.md` updated to describe the shipped Sentences section.
- [ ] **J3** [high] Cold-learner verification: scripted Chromium run (playwright-core, per HANDOVER "How to verify") from empty `localStorage` — alphabet-gated learner cannot reach sentences early; a seeded post-Words learner gets band-1 sentences, completes a Translate & Type with and without helpers, sees the card scheduled, and the due card resurfaces after a clock shift. Fix what it finds (the Words cold pass found three real gaps the audits missed — expect the same).

---

## 13. Progress log

| Date | Box | PR | Notes |
|---|---|---|---|
| 2026-07-05 | A1-A3 | draft PR | Extracted the 2,007-row sentence bank from `words_curated_core.js`, added the strict audit, and wired the bank into the app shell. |
