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

> **Path-work supersession (2026-07-10):** curriculum, hub, and runner work is
> now owned by [`SENTENCES_CURRICULUM_V2_PLAN.md`](SENTENCES_CURRICULUM_V2_PLAN.md).
> Use this roadmap for Track H authored-content work and its bank-level audits.

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

- [x] **Track A** — Bank foundation: `sentences_core.js` + strict audit + app-shell wiring (PR #98)
- [x] **Track B** — Translate & Type: Shipped B1 core drill, B2 helper ladder, and B3 token-diff feedback
- [x] **Track C** — Practice hub + sentence SRS + i+1 gating: Shipped C1 hub, C2 i+1 gating, C3 sentence SRS, and C4 today-screen surfacing
- [x] **Track D** — Pattern-tag & band curation: 0 rows with an `inferred` axis (all 2,060 rows explicit on both `band` and `patternTags`)
- [x] **Track E** — Pattern micro-lessons: 12 units playable
- [x] **Track F** — Shadow & speak modes
- [x] **Track G** — Transform drill (inflection engine)
- [ ] **Track H** — Authored expansion batches (🔓 owner-unlocked 2026-07-16;
  queue + rules in `OPUS_TRACK_H_BATCH_PROMPT.md`; scenario themes still
  owner-picked per batch)
- [~] **Track I** — Legacy mini-bank migration done (#109); **dead-code removal still pending** (`getSentenceStudyBank()`/`makeSentence*` remain in `app.js` — Listening tab still uses them)
- [x] **Track J** — Close-out: analytics, honest docs, scripted cold-learner test

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

## 3.5 The Sentence Studio foundation (shipped 2026-07-06) — READ THIS FIRST

The Sentences section was **rebuilt from scratch as its own subsystem** rather
than routing through the shared quiz engine (`generateQuestion` /
`renderQuizCard` / level rails) the way every other tab does. The owner's
brief: the section was "too similar and boiler-heavy" and "not its own thing."
It now is. **Do not resurrect the old pattern.** The pre-2026-07-06 B1/C1
recipes below (which said "add a question type to the shared deck") are
**superseded** — the studio already contains that behavior. Build on the
studio instead.

**Where it lives:** one contiguous block in `app.js` under
`// --- PRACTICE: SENTENCE STUDIO`, replacing the old `renderPracticeView`.
Plus `state.sentencesProgress` (see `getSentencesProgress()`), the `.ss-*`
styles in `styles.css`, and the default in `loadState`.

**Architecture (hub → session → summary), all reading `HANAPATH_SENTENCES`:**
- `renderPracticeView()` — the single entry point; dispatches on
  `sentenceStudioSession` (null = hub) and `.phase` (`question`/`feedback`/`summary`).
- `sentenceStudioHubHtml()` — stats, band selector, mode cards, up-next preview.
- Session runner — a 5-question run in one of four modes:
  `translate` (English → typed Hangul, **the flagship B1**), `build` (tap
  tokens into order), `listen` (dictation), `mixed` (rotates the three).
- `checkSentenceAnswer()` — normalized, spacing/punctuation-tolerant, honors
  `acceptAlso`. `recordSentenceResult()` — persists per-sentence
  seen/correct/streak/last.

**Extension points — each open box has a labelled comment in the code.** Grep
`EXTENSION (roadmap` in `app.js`. When you build a box, replace/extend at its
marker; don't re-architect:
| Box | Marker location | What to add |
|---|---|---|
| **B2** helper ladder | `sentenceAnswerBoxHtml` + `sentenceHelperLadderHtml` | shipped: tip / word-bank tiles / next-chunk / reveal, with helper usage recorded on session results |
| **B3** answer alignment | `checkSentenceAnswer` + `sentenceTokenDiffHtml` | positional token alignment + real near-miss diff |
| **C2** i+1 gating | `getSentenceRowsForBand` | filter to rows whose `focusWordIds` ⊆ met words |
| **C3** sentence SRS | `pickSentenceSessionRows` + `recordSentenceResult` | Leitner boxes + due dates over `state.sentencesProgress` |
| **J1** analytics | `recordSentenceResult` | emit a review-event into the analytics store |

**What it deliberately does NOT do yet:** helper ladder, real SRS scheduling,
i+1 gating, pattern-tag-driven tips, shadow/speech scoring, transform drill,
analytics events. Those stay their own boxes.

**Legacy:** the studio does not touch `getSentenceStudyBank()` or the
`makeSentence*` generators. They remain **only** because the Listening tab
still shares them — see Track I for their removal (verify Listening first).

---

## 4. Track B — Translate & Type (owner's requested feature)

> **B1 core shipped in the foundation (§3.5).** The recipe below is the
> original shared-deck plan and is **superseded** — the Translate mode already
> exists in the Sentence Studio. B2/B3 remain; build them at the extension
> markers, not on the old deck.

### B1 — Core drill [high]
- [x] **B1** English prompt → typed Hangul answer. **Shipped in the Sentence Studio (§3.5)** as the `translate` mode, not as a shared-deck question type.

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

**B1 scope fence — do exactly this, nothing more.** Field mapping:
`row.english` → prompt, `row.korean` (+ `row.acceptAlso`, which is empty on
every row today — matching it costs one array check, the *meaningful*
acceptAlso work is B3) → expected answer, `row.voiceText` → success audio,
`row.band` → level filter. Do **not** implement in B1: the helper ladder
(B2), the token diff / near-miss tolerance (B3), SRS (C3), i+1 gating (C2),
the hub redesign (C1), pattern-tag display, or any `sentences_core.js` data
edits. B1 must be boring, small, and mergeable — a fresh agent should be
able to review the whole diff in one sitting.

### B2 — Helper ladder [high]
- [x] **B2** Tip → Word bank → Next chunk → Reveal, with helper-usage tracking.

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

**Inferred-tag caution for the Tip helper:** until Track D closes, every
row's `patternTags` is `annotationSource: "inferred"` and contains confirmed
errors (verified 2026-07-05: `s1490` carries `subject-i-ga` from the final
syllable of 강가 — no subject particle present — and `present-polite` while
missing `past-polite` on 누웠어요). While a row's tags are still inferred,
phrase tips as *things to check for* ("Does the sentence need an object?
Mark it with 을/를") rather than assertions about *this* sentence ("this
sentence uses the subject marker") — a wrong tip teaches wrong grammar.
Assertive per-sentence tips unlock per row as Track D flips it to
`explicit`.

**Acceptance:** all four helpers work on touch + keyboard; helper state resets
between questions; tiles honor `aria-label` rules (HANDOVER conventions).

### B3 — Token diff feedback + acceptAlso [high]
- [x] **B3** Per-token diff on wrong answers; `acceptAlso` honored.

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
- [x] **C1** Replace the `renderPracticeView` level-rail shell with a session hub. **Shipped in the Sentence Studio (§3.5):** hub with stats, band selector, mode cards, and an up-next preview; a 5-question session runner; a summary screen. The old band-slice "Learn/Repeat" cards and the level rail are gone.

### C2 — i+1 gating [high]
- [x] **C2** New-sentence queue restricted to known words. **Extend the foundation** — the marker is in `getSentenceRowsForBand` (`EXTENSION (roadmap C2)`).

**Recipe:** "Met words" = union of word ids in completed word lessons
(`HANAPATH_WORD_LESSONS` + lesson-completion state) and `state.vocabSrs` keys.
A sentence is *available* when every `focusWordIds` entry is met (empty
`focusWordIds` ⇒ available). Filter `getSentenceRowsForBand` by availability
(keep the existing band + least-practiced sort after it). Show a "locked —
learn N more words" affordance in the hub linking to the Words tab. Guard the
cold-start: a learner with zero Words progress still gets band-1 sentences
whose focus words sit in the first Words lessons (W0–W2) — verify with a cold
`localStorage` browser run.

### C3 — Sentence SRS [high]
- [x] **C3** Leitner scheduling over `state.sentencesProgress`. **Extend the foundation** — markers in `pickSentenceSessionRows` and `recordSentenceResult` (`EXTENSION (roadmap C3)`).

**Recipe:** The foundation already persists per-sentence records
(`state.sentencesProgress.results[id]` = `{seen, correct, streak, last}`) and
selects least-practiced-first. Upgrade that to real spacing: add
`{ box, due, lapses }` to each record (mirror `state.vocabSrs`, app.js
≈4321/4958, and the letter Leitner ≈8312–8390). Grading in
`recordSentenceResult`: correct with no helpers → promote; correct with
helpers (once B2 lands) → hold; wrong/reveal → demote + lapse. Change
`pickSentenceSessionRows` to draw due cards first, then unseen, capped at
new/day (default 5, stored in state). Surface a real "Due" count in the hub.
**Clock-shift test:** set a card's `due` into the past via console, reload,
confirm it surfaces.

### C4 — Today-screen surfacing [high]
- [x] **C4** Due-sentence count on the Today/home surface next to the existing word-review affordance (see `wordReviewHtml`, app.js ≈12506). Small PR.

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
     (the regexes have known false positives — confirmed in the shipped bank:
     `s1490` tags `subject-i-ga` off the final syllable of 강가 and misses
     `past-polite` on 누웠어요; likewise 에 inside a word is not
     `location-e`, and 은/는 as a modifier ending is not `topic-neun`). Remove
     wrong tags, add missing tags **from the §4 closed list only**. If the
     sentence needs a tag outside the list, **stop and hand to [high]** — tag
     vocabulary changes are schema changes.
   - Optionally fill `grammarTip` when a one-liner is obvious; leave empty
     otherwise (H authors tips deliberately).
3. Flip only the verified axes to `explicit`. Run the audit. One PR.

- [x] **D1** rows batch 1 (~250)
- [x] **D2** rows batch 2
- [x] **D3** rows batch 3
- [x] **D4** rows batch 4
- [x] **D5** rows batch 5
- [x] **D6** rows batch 6
- [x] **D7** rows batch 7
- [x] **D8** rows batch 8 + final zero-inferred verification — audit reports `band` 2060 explicit / 0 inferred, `patternTags` 2060 explicit / 0 inferred

> **Quality note (2026-07-07):** The counter-phrase accuracy pass has been completed.
> A consistent policy of "number plus classifier/counter noun" has been set and applied
> uniformly. 18 rows of general nouns counted directly (e.g., 두 부서, 두 사건, 두 단어) and
> false positives have had the tag removed, and 6 missing rows of valid counter phrases
> (e.g., 사 년, 삼 년, 세 시간) have had the tag added. All rows have been validated.

---

## 7. Track E — Pattern micro-lessons

### E1 — Lesson plan file + player wiring [high]
- [x] **E1** `sentences_lesson_plan.js` (`window.HANAPATH_SENTENCE_LESSONS`) + app-shell wiring + a lesson-player path for sentence units.

**Recipe:** Schema mirrors `words_lesson_plan.js`: units with `id`, `title`,
`patternTags` (the cluster taught), `sentenceIds` (4–6 bank rows exercising
it), `conceptHtml` (short explanation), unlock chain linear. Reuse/extend the
Words lesson player flow (`wordLesson*`) rather than writing a new player —
study cards with audio, then checkpoint = 1 build + 1 translate-type from the
unit's sentences. Gate unit 1 behind the sentences-studio unlock; later units
behind the previous unit. Cache bump + audit wiring (extend A2's audit or add
checks: sentenceIds exist, tags ⊆ closed list).

### E2 / E3 — Author the 12 units [high]
- [x] **E2** Units 1–6: Topic & subject · Object + verb · Location 에/에서 · Copula & negative copula · Present-polite conjugation in context · Negation 안/못
- [x] **E3** Units 7–12: Past tense · Future 거예요 · Want/can (고 싶다, ㄹ 수 있다) · And/but (고, 지만) · Because/if (아서, 면) · Honorific 시 & formal 니다

**Recipe:** For each unit pick bank sentences by `patternTags` (post-Track-D
they're trustworthy), preferring low-band, early-word sentences; write
`conceptHtml` linking to the W17–W19 grammar words instead of re-explaining
them. One PR per box; browser-play each unit before shipping.

---

## 8. Track F — Shadow & speak

- [x] **F1** [high] Shadow mode: listen → slow replay (`SPEAK_RATE` exists ≈2884) → delayed repeat prompt → self-mark; surfaces the source row's `soundNote` when the bank row's source word has one (join via `sourceWordIds`).
- [x] **F2** [high] Speech scoring: wire the existing SpeechRecognition transcript-match stub (≈14626) to grade a spoken sentence attempt vs `voiceText` with the same graceful no-API fallback copy. The stub is the accepted final approach (Words §9 item 5 decision) — do not build server ASR.

---

## 9. Track G — Transform drill

- [x] **G1** [high] `makeSentenceTransformQuestion`: pick a bank sentence whose focus word is a verb/adjective with `HANAPATH_INFLECT` support; prompt a transform (present→past, polite→formal, affirmative→negated); validate with `inflect`/`recognize` (see the conjugated-blank precedent, app.js ≈5097–5300). Typed input reuses B1/B2 machinery (tiles included).
- [x] **G2** [high] Deck integration: transforms appear at band ≥3 in `getSentenceDeckForLevel`; graded into the SRS as the *sentence's* review with a `transform` event flag.

---

## 10. Track H — Authored expansion (🔓 owner-unlocked 2026-07-16)

**Precondition (met):** owner unlocked Track H on 2026-07-16 for the
priority queue in the v2 plan §5; the per-batch work order is
[`OPUS_TRACK_H_BATCH_PROMPT.md`](OPUS_TRACK_H_BATCH_PROMPT.md). Scenario-pack
themes are still approved per batch. Coverage first:

- [x] **H1** [high] Gap report: extend the audit (or a sibling script) to print a patternTags × band coverage matrix and the list of §4 tags with <10 sentences; propose batch contents from it. No data change — the PR is the report + proposal in `docs/`.
- [ ] **H2…Hn** [high authors, codex applies audio steps] Batches of ~40–60 **original** sentences filling the thinnest cells (expected thin: clause linkers, future, formal register, honorific-si). Rules: copyright-safe original text only (K-pop/fan-life *theming* welcome — practice rooms, schedules, encouragement — verbatim lyrics/subtitles never); every new row needs `grammarTip`, explicit axes, `acceptAlso` where a natural variant exists; **audio must be generated** (`python generate_assets.py`) and `audit-alphabet-audio --strict` + the sentences audit green; ids continue the frozen sequence with `source: "authored"`.

---

## 11. Track I — Legacy consolidation

- [x] **I1** [high] Migrate the app.js mini-banks (`grammarSentenceBank`, `verbSentenceBank`, `conversationLineBank`, `survivalPhrases`, and the rest aggregated in `getSentenceStudyBank()` ≈2442) into `sentences_core.js` with `source: "legacy-app"`, real ids, tags, and dedupe against existing rows (many overlap the words examples — the audit's duplicate check decides). Sentences that only make sense in their original drill (cloze prompts, role-ID items) stay put — migrate only actual sentences; list the keep-in-place items in the PR.
- [x] **I2** [high] Point `getSentenceStudyBank()` (and the listening deck's sentence sources) at the bank; delete now-dead bank constants and any orphaned deck code; re-verify the Listening tab still works (it shares these banks — check `makeSentenceListenQuestion` and the conversation drills before deleting anything they still use).

---

## 12. Track J — Close-out

- [x] **J1** [high] Analytics: sentence review events (mode, correctness, helper count, latency) into the existing per-item analytics store + a sentences block in the metrics view.
- [x] **J2** [codex] Docs honest: spec §8 scorecard fully re-derived, this file's boxes reconciled, `HANDOVER.md` + `README.md` updated to describe the shipped Sentences section.
- [x] **J3** [high] Cold-learner verification: scripted Chromium run (playwright-core, per HANDOVER "How to verify") from empty `localStorage` — alphabet-gated learner cannot reach sentences early; a seeded post-Words learner gets band-1 sentences, completes a Translate & Type with and without helpers, sees the card scheduled, and the due card resurfaces after a clock shift. Fix what it finds (the Words cold pass found three real gaps the audits missed — expect the same).

---

## 12.5 Foundation rails for Gemini batches

The 2026-07-08 foundation pass is intended to make the remaining work
Gemini-safe without handing Gemini architecture decisions:

- **Track E rail:** `app.js` can open `window.HANAPATH_SENTENCE_LESSONS` from
  the Sentence Studio hub. Each unit has a concept screen, six audio-backed
  examples, and a lesson session that alternates Translate & Type with Word
  Builder. Gemini-safe follow-up: improve lesson copy or swap example ids only
  when `node scripts/audit-sentences-foundation.mjs` stays green.
- **Track F rail:** Sentence Studio has a `shadow` mode: play, slow replay
  via browser TTS, optional SpeechRecognition scoring using the existing
  transcript-match stub, and self-mark buttons. Gemini-safe follow-up: copy
  polish and browser smoke check notes; do not change scoring architecture.
- **Track G rail:** Sentence Studio has a `transform` mode powered by
  `HANAPATH_INFLECT`. It selects only rows where a verb/adjective focus word's
  current inflected surface can be replaced by a generated target form.
  Gemini-safe follow-up: add or reorder transform task recipes only if the
  foundation audit still reports enough candidates and no errors.
- **Track I rail:** legacy Listening remains on `getSentenceStudyBank()`; do
  not delete it until a browser smoke test proves sentence choice, dictation,
  phrase listening, and conversation listening still work after replacement.
- **Track J rail:** `recordSentenceResult()` now emits sentence review events
  with mode, result, helper count, latency, lesson id, transform id, and speech
  score. The hub shows a compact Sentence insights card. Gemini-safe follow-up:
  expand docs/counts and run the cold-learner script; feature fixes from a
  failed cold run stay high-intelligence work.

Mechanical verification for all Gemini follow-ups:

```bash
node --check app.js
node --check scripts/audit-sentences-foundation.mjs
node scripts/audit-sentences-foundation.mjs
node scripts/audit-sentences-data.mjs --strict
node scripts/audit-words-data.mjs --strict
node scripts/audit-alphabet-audio.mjs --strict
node scripts/audit-app-shell.mjs
```

---

## 13. Progress log

| Date | Box | PR | Notes |
|---|---|---|---|
| 2026-07-05 | A1-A3 | PR #98 | Extracted the 2,007-row sentence bank from `words_curated_core.js`, added the strict audit, and wired the bank into the app shell. |
| 2026-07-06 | Foundation (B1 + C1) | — | Rebuilt the Sentences section from scratch as the **Sentence Studio** (§3.5): hub → 5-question session → summary, three drills (Translate & Type, Word Builder, Dictation) reading `HANAPATH_SENTENCES`, `state.sentencesProgress` per-sentence records, band selector, `.ss-*` styles. Replaced the old `renderPracticeView` level-rail shell. Labelled extension points left for B2/B3/C2/C3/J1. Verified: `node --check`, all three audits `--strict`, and a 28-assertion vm logic test (session flow, tolerance, tile pool, mixed run). |
| 2026-07-06 | B2 | local branch | Added the Translate & Type helper ladder inside Sentence Studio: inferred-safe tag tips, word-bank tiles with erase, next-chunk prefix hints, reveal handling, and per-question `helpersUsed` tracking for later SRS/analytics work. |
| 2026-07-06 | D1 complete (s0001-s0250) | local branch | Curated the first 250 sentence rows across the first Track D batch: corrected obvious tag false positives/missing present-polite/past-polite cases, flipped both annotation axes to explicit on those rows, and kept the audits green. 1,757 rows remain inferred. |
| 2026-07-06 | D2 partial (s0251-s0300) | local branch | Curated the next 48 sentence rows in id order, corrected obvious band/tag issues, and left s0288-s0289 inferred because the closed tag list has no direct connective tag for `-자마자` / `-다가`. 1,709 rows remain inferred. |
| 2026-07-06 | D2 continued (s0469-s0556) | local branch | Curated another 85 sentence rows across the next Track D stretch, corrected obvious band/tag issues, and kept the batch mechanical; 1,472 rows remain inferred. |
| 2026-07-06 | D2 continued (s0557-s0621) | local branch | Curated the next 65 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 600 rows are explicit on both axes and 1,407 rows remain inferred. |
| 2026-07-06 | D2 continued (s0622-s0638) | local branch | Curated the next 17 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 617 rows are explicit on both axes and 1,390 rows remain inferred. |
| 2026-07-06 | D2 continued (s0639-s0655) | local branch | Curated the next 17 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 634 rows are explicit on both axes and 1,373 rows remain inferred. |
| 2026-07-06 | D2 continued (s0656-s0670) | local branch | Curated the next 15 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 649 rows are explicit on both axes and 1,358 rows remain inferred. |
| 2026-07-06 | D2 continued (s0671-s0685) | local branch | Curated the next 15 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 664 rows are explicit on both axes and 1,343 rows remain inferred. |
| 2026-07-06 | D2 continued (s0686-s0705) | local branch | Curated the next 20 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 684 rows are explicit on both axes and 1,323 rows remain inferred. |
| 2026-07-06 | D2 continued (s0706-s0720) | local branch | Curated the next 15 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 699 rows are explicit on both axes and 1,308 rows remain inferred. |
| 2026-07-06 | D2 continued (s0721-s0735) | local branch | Curated the next 15 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 714 rows are explicit on both axes and 1,293 rows remain inferred. |
| 2026-07-06 | D2 continued (s0736-s0750) | local branch | Curated the next 15 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 729 rows are explicit on both axes and 1,278 rows remain inferred. |
| 2026-07-06 | D2 continued (s0751-s0765) | local branch | Curated the next 15 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 744 rows are explicit on both axes and 1,263 rows remain inferred. |
| 2026-07-06 | D2 continued (s0766-s0780) | local branch | Curated the next 15 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 759 rows are explicit on both axes and 1,248 rows remain inferred. |
| 2026-07-06 | D2 continued (s0781-s0795) | local branch | Curated the next 15 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 774 rows are explicit on both axes and 1,233 rows remain inferred. |
| 2026-07-06 | D2 continued (s0796-s0810) | local branch | Curated the next 15 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 789 rows are explicit on both axes and 1,218 rows remain inferred. |
| 2026-07-06 | D2 continued (s0811-s0825) | local branch | Curated the next 15 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 804 rows are explicit on both axes and 1,203 rows remain inferred. |
| 2026-07-06 | D2 continued (s0826-s0840) | local branch | Curated the next 15 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 819 rows are explicit on both axes and 1,188 rows remain inferred. |
| 2026-07-06 | D2 continued (s0841-s0855) | local branch | Curated the next 7 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 826 rows are explicit on both axes and 1,181 rows remain inferred. |
| 2026-07-06 | D2 continued (s0856-s0870) | local branch | Curated the next 15 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 841 rows are explicit on both axes and 1,166 rows remain inferred. |
| 2026-07-06 | D2 continued (s0871-s0885) | local branch | Curated the next 15 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 856 rows are explicit on both axes and 1,151 rows remain inferred. |
| 2026-07-06 | D2 continued (s0886-s0900) | local branch | Curated the next 15 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 862 rows are explicit on both axes and 1,145 rows remain inferred. |
| 2026-07-06 | D2 continued (s0901-s0915) | local branch | Curated the next 15 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 876 rows are explicit on both axes and 1,131 rows remain inferred. |
| 2026-07-06 | D2 continued (s0916-s0930) | local branch | Curated the next 15 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 891 rows are explicit on both axes and 1,116 rows remain inferred. |
| 2026-07-06 | D2 continued (s0931-s0945) | local branch | Curated the next 15 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 909 rows are explicit on both axes and 1,098 rows remain inferred. |
| 2026-07-06 | D2 continued (s0946-s0960) | local branch | Curated the next 15 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 924 rows are explicit on both axes and 1,083 rows remain inferred. |
| 2026-07-06 | D2 continued (s0961-s0975) | local branch | Curated the next 15 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 940 rows are explicit on both axes and 1,067 rows remain inferred. |
| 2026-07-06 | D2 partial (s0977-s0990) | local branch | Curated the next 13 safe sentence rows in id order, corrected obvious band/tag issues, and left s0986 inferred because the closed tag list has no clean tag for `-치고`; 953 rows are explicit on both axes and 1,054 rows remain inferred. |
| 2026-07-06 | D2 continued (s0991-s1005) | local branch | Curated the next 15 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 968 rows are explicit on both axes and 1,039 rows remain inferred. |
| 2026-07-06 | D2 continued (s1006-s1020) | local branch | Curated the next 15 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 983 rows are explicit on both axes and 1,024 rows remain inferred. |
| 2026-07-06 | D2 continued (s1021-s1035) | local branch | Curated the next 15 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 998 rows are explicit on both axes and 1,009 rows remain inferred. |
| 2026-07-06 | D2 continued (s1036-s1050) | local branch | Curated the next 15 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 1,013 rows are explicit on both axes and 994 rows remain inferred. |
| 2026-07-06 | D2 continued (s1051-s1065) | local branch | Curated the next 15 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 1,028 rows are explicit on both axes and 979 rows remain inferred. |
| 2026-07-06 | D2 continued (s1066-s1080) | local branch | Curated the next 15 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 1,043 rows are explicit on both axes and 964 rows remain inferred. |
| 2026-07-06 | D2 continued (s1081-s1095) | local branch | Curated the next 15 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 1,058 rows are explicit on both axes and 949 rows remain inferred. |
| 2026-07-06 | D2 continued (s1096-s1110) | local branch | Curated the next 15 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 1,073 rows are explicit on both axes and 934 rows remain inferred. |
| 2026-07-06 | D2 continued (s1111-s1125) | local branch | Curated the next 15 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 1,088 rows are explicit on both axes and 919 rows remain inferred. |
| 2026-07-06 | D2 continued (s1126-s1140) | local branch | Curated the next 15 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 1,103 rows are explicit on both axes and 904 rows remain inferred. |
| 2026-07-06 | D2 continued (s1141-s1155) | local branch | Curated the next 15 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 1,118 rows are explicit on both axes and 889 rows remain inferred. |
| 2026-07-06 | D2 continued (s1156-s1170) | local branch | Curated the next 15 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 1,133 rows are explicit on both axes and 874 rows remain inferred. |
| 2026-07-06 | D2 continued (s1171-s1185) | local branch | Curated the next 15 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 1,148 rows are explicit on both axes and 859 rows remain inferred. |
| 2026-07-06 | D2 continued (s1186-s1200) | local branch | Curated the next 15 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 1,163 rows are explicit on both axes and 844 rows remain inferred. |
| 2026-07-06 | D2 continued (s1201-s1215) | local branch | Curated the next 15 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 1,178 rows are explicit on both axes and 829 rows remain inferred. |
| 2026-07-06 | D2 continued (s1216-s1230) | local branch | Curated the next 15 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 1,193 rows are explicit on both axes and 814 rows remain inferred. |
| 2026-07-06 | D2 continued (s1231-s1245) | local branch | Curated the next 15 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 1,208 rows are explicit on both axes and 799 rows remain inferred. |
| 2026-07-06 | D2 continued (s1246-s1260) | local branch | Curated the next 15 sentence rows in id order, corrected obvious band/tag issues, and kept the batch mechanical; 1,223 rows are explicit on both axes and 784 rows remain inferred. |
| 2026-07-07 | D8 finish (s2008-s2060) | local branch | Curated the remaining 53 sentence rows (s2008-s2060) in id order, corrected band/tag issues, and flipped all annotation axes to explicit; all 2,060 rows are now explicit. |
| 2026-07-07 | D8 review fix (s2025/s2026/s2056-s2060) | integration | Review of the D8 finish caught 7 honorific declaratives (오세요/계세요/주무세요/드세요/말씀하세요 with a 3rd-person 가/이 subject) mistagged `imperative-seyo` off the surface `-세요`; removed it, leaving `honorific-si`. These are statements, not commands. |
| 2026-07-07 | Accuracy sweep batch 1 (s0001-s0200) | local branch | Swept s0001-s0200 for patternTag accuracy: fixed location-e false positives on time 에, missing present-polite, false positive and-go, and one band elevation. |
| 2026-07-07 | Accuracy sweep batch 2 (s0201-s0400) | local branch | Swept s0201-s0400 for patternTag accuracy: corrected false imperative-seyo to present-polite (s0296-s0300), removed false only-man (s0318, s0326), fixed tense mismatch (s0320), and removed location-e on time expressions (s0332, s0335). |
| 2026-07-07 | Accuracy sweep s1601-s2000 (integrated #128/#129) | integration | Landed the Codex s1601-s1800 and s1801-s2000 sweeps as one reconciled PR: overlaid **only** their band (14 rows) + patternTag (148 rows total) edits onto `main`, dropping #128's out-of-scope `\uXXXX`→Hangul re-encoding churn (verified 0 semantic korean/english/tokens changes). Mostly removes false location-e/direction-euro/existence-itda and fixes present→past-polite tense. **Gap remains: s0401-s1600 unswept** — the scorecard was NOT advanced to "s0001-s2000 complete" (the two source PRs' over-claim was corrected). |
| 2026-07-07 | Accuracy sweep s2001-s2060 (tail) | integration | Ran the same validated detector over the Track-D tail: 2 rows fixed — s2002 뺐어요 present→past-polite, s2055 할 수 있어요? dropped false existence-itda (수 있다 = potential). **All s0001–s2060 now accuracy-swept.** |
| 2026-07-07 | Track E micro-lesson data + tag coverage report | integration | Landed `sentences_lesson_plan.js` (12 pattern-cluster units, `window.HANAPATH_SENTENCE_LESSONS`) and `docs/SENTENCES_TAG_COVERAGE.md` from Gemini's batch, **reviewed**: coverage counts re-derived and confirmed exact; lesson plan had 9/59 mis-tagged example sentences (past-tense unit cited present-tense rows, future unit cited 있어요, negation unit cited rows with no negation) — replaced with correctly tag-matched examples (0 mismatches now). App.js lesson-player wiring still pending (Track E remainder). |
| 2026-07-07 | Band accuracy sweep — **REJECTED** (not merged) | integration | Gemini's 11-batch band sweep (PRs #133–#143) was rejected: 93 of 117 changes were register-driven over-promotions — short beginner phrases (물 주세요, 감사합니다, 누구세요?) pushed to band 5 because the handover rule wrongly treated honorific-si/formal-nida/imperative-seyo as band-5 triggers. **Band ≈ length/multi-clause complexity, NOT politeness register.** Bands left as Track-D curated. Do not re-run a band sweep without a register-agnostic rule (band 5 = ≥7 tokens OR ≥2 clause linkers OR clause-linker + ≥5 tokens; honorific/formal register does not raise the band). |
| 2026-07-07 | Accuracy sweep s0401-s1600 (gap closed) | integration | Swept the last unswept range, 150 rows, patternTags only. Detector was validated before applying: **tense** via Hangul jongseong decomposition (ㅆ-batchim = contracted past 았/었/였, excluding 있/겠), not a naive 았/었/였 substring — 51 rows mistagged `present-polite` on clearly past verbs (샀어요/봤어요/끝났어요/…) flipped to `past-polite`; **location-e** removed from 29 rows via an **exact** temporal/fixed 에-token set (시에/주말에/덕분에/…), not `endsWith` (which had falsely matched 화분에 on 분); **existence-itda** removed from 56 rows where 있 is progressive/resultative/potential/lexicalized (kept genuine 있다/없다 existence); **and-go** removed from 52 rows that were progressive `-고 있` or had no `고` at all; **direction-euro** removed from 4 fixed adverbs (무료로/토대로/대상으로/마음대로). All classes spot-checked against the Korean. **s0001–s2000 accuracy sweep now complete.** |
| 2026-07-08 | Foundation rails for Tracks E/F/G/I/J | local branch | Added the high-judgment app foundations Gemini can safely build on: playable pattern-lesson concept/session path, Shadow mode with slow replay + SpeechRecognition scoring stub + self-marking, Transform mode backed by `HANAPATH_INFLECT`, sentence review-event analytics, and `scripts/audit-sentences-foundation.mjs` to validate lesson refs plus transform candidate coverage. |
| 2026-07-08 | Track E playable & linear progression gating | local branch | Implemented `isSentenceLessonUnlocked` linear progression logic. Integrated progression checks and visual locks/disabled states for pattern lessons in the Sentence Studio hub and player controls. |
| 2026-07-08 | Track F complete: Shadow & speak | local branch | Wired the slow-rate slow playback and delayed repeat prompt timings in Shadow mode. Joined soundNotes via sourceWordIds to display pronunciation notes. Wired SpeechRecognition transcript-matching and grading. |
| 2026-07-08 | Track G complete: Transform drill | local branch | Integrated Transform mode into mixed sessions at band ≥3 (with graceful translation fallback if no candidates exist) and updated legacy getSentenceDeckForLevel. Ensured transformId is passed on incorrect/revealed checks. |
| 2026-07-08 | Track J complete: analytics, docs & cold-learner | local branch | Integrated sentence analytics tracking into metrics view. Created verify-cold-learner playwright script and verified gating and post-words progression. Updated spec scorecard and roadmap docs. |
| 2026-07-16 | Experience, assessment, handwriting, and audio hardening | current branch | Re-derived finite assessment coverage for all 40 modern jamo in both directions, all 2,028 required words, all 2,061 sentence rows, and all 37 sentence pattern tags; removed pre-answer target leaks; made free shape recognition the only writing mode with audited ±1-stroke tolerance; polished directional navigation, completion, Settings, and drill layouts; generated 10,399 offline KSS clips and allocated the 32,861-target canonical audio manifest. Strict Words, Sentences, Alphabet audio, consolidated audio, question, recognition, curriculum, syntax, and app-shell audits all pass. |
| 2026-07-17 | H2 batch 8 (s2350–s2388) | draft PR | 39 authored **shopping situational pack** — looking for items, sizes/trying on, colors/preferences, prices/discounts, paying, exchanges/refunds; clothing counters (벌/켤레/개). Universal high-utility content. Foundation 0/0; 4 new lessons, zero ids removed; cache v392; offline mimic3 KSS audio. All strict audits + foundation/app-shell + Chromium smoke pass. |
| 2026-07-17 | H2 batch 7 (s2311–s2349) | draft PR | 39 authored **directions & transport situational pack** — asking the way, taxi (address/fare/stop here), bus & subway (which number, get off, transfer, buy tickets), how far / how long / traffic, arriving & getting lost, train/flight/stops. Universal high-utility content. Foundation 0/0; 3 new lessons, zero ids removed; cache v391; offline mimic3 KSS audio. All strict audits + foundation/app-shell + Chromium smoke pass. |
| 2026-07-17 | H2 batch 6 (s2272–s2310) | draft PR | 39 authored **dining-out situational pack** — practical restaurant/café Korean across the full flow (seating, ordering, asking about the menu, requests during the meal, paying): counters (두 개/한 잔/한 병), 주세요 requests, spiciness/taste questions, 계산/카드/영수증. Universal high-utility content, first authored-depth pack now that pattern×band coverage is complete. Foundation 0/0; 7 new lessons, zero ids removed; cache v390; offline mimic3 KSS audio. All strict audits + foundation/app-shell + Chromium smoke pass. |
| 2026-07-17 | H2 batch 5 (s2234–s2271) | draft PR | 38 authored practical sentences clearing the **last thin band cells** — only-man b3, from-buteo b3–4, until-kkaji b3–4 all now ≥5 — plus mid-band lifts for copula-negative-anieyo, propositive-eyo, neg-mot, comparison-boda, neg-an, future-geoyeyo. **Milestone: the gap report's thin-cell list is now empty** — every pattern-tag × band cell has ≥5 sentences and every tag ≥10 overall. Universal/practical subject matter. Content-tag rows gate by key content word (foundation 0/0). Curriculum regenerated deterministically: 4 new lessons, zero ids removed; cache v389; offline mimic3 KSS audio. All strict audits + foundation/app-shell + Chromium smoke pass. |
| 2026-07-17 | H2 batch 4 (s2194–s2233) | draft PR | 40 authored **practical high-frequency survival sentences** (work, food, transport, appointments, requests, money) filling the last thin band cells (gap report §3 thin cells 12→5) — only-man b3, from-buteo/until-kkaji b3–4, future/want/can b4, but-jiman b5, must-ya-dwaeda + neg-mot practical, plus core survival phrases (say-again, how-much, where-is). **Owner clarification (2026-07-17) recorded**: the "trainee" framing is the fast-immersion drilling *method*, not K-pop subject matter — scenario-pack wording in the batch prompt + plan §5 reframed to practical situational packs. Content-tag rows gate by key content word (foundation 0/0). Curriculum regenerated deterministically: 7 new lessons, zero ids removed; cache v388; offline mimic3 KSS audio. All strict audits + foundation/app-shell + Chromium smoke pass. |
| 2026-07-17 | H2 batch 3 (s2154–s2193) | draft PR | 40 authored rows lifting the sparsest **band cells** (gap report §3, thin cells 20→12): want-go-sipda / can-su-itda / comparison-boda (the three lowest-total tags) +8 each across bands 2–5, plus propositive-eyo b3 (was 0), also-do b1–2, but-jiman b4–5, neg-an/neg-ji-anta b3. Content-tag rows gate by their key content word (foundation audit 0/0). Curriculum regenerated deterministically: 4 new lessons, zero ids removed; cache v387; offline mimic3 KSS audio. All strict audits + foundation/app-shell + Chromium boot smoke pass. |
| 2026-07-17 | H2 batch 2 (s2114–s2153) | draft PR | 40 authored rows **filling the three thin grammar units** (plan §5 fills): sn2-grammar-u1 10→24, sn3-grammar-u2 12→26, sn5-grammar-u3 15→27 (each 2–3 → 4 content lessons). u1 particles & copula, u2 negation & connectives, u3 honorifics/questions/formal. Focus words are the units' grammar function-word ids so rows gate to the twin unit with clean coverage (foundation audit 0/0). Curriculum regenerated deterministically: 5 new lessons appended, zero ids removed; cache v386. Audio generated offline (mimic3 KSS). All strict audits (sentences, audio coverage, words, alphabet) + foundation/app-shell + Chromium boot smoke pass. |
| 2026-07-16 | H2 batch 1 (s2062–s2113) | draft PR | 52 authored rows into the thin pattern-tag cells (copula-negative-anieyo 2→11, propositive-eyo 4→13, from-buteo 5→12, until-kkaji 7→13, but-jiman 6→13, neg-mot 7→13, only-man 4→12, future-geoyeyo 12→17); regenerated gap report now shows **zero tags under the 10-row baseline**. Bands 1–3, full schema, explicit both axes, `source: "authored"`. Curriculum regenerated deterministically: 7 new lessons appended, zero lesson/unit ids removed; cache v385. Audio generated fully offline in-session via `generate_assets.py --backend mimic3` (pinned CC0 KSS voice, SHA-verified; edge-tts was unusable — the sandbox proxy rejects WebSocket upgrades); fixed a latent stdout-flush truncation in `audit-audio-coverage.mjs --manifest-json` found by that run. All strict audits (sentences, audio coverage, words, alphabet) plus foundation/app-shell and the Chromium boot smoke pass. |
