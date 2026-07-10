# Mid-tier agent — work order

You are a **mid-tier agent** working in **HanaPath**, a vanilla static
Korean-learning PWA (no framework, no bundler, **no build step**, no
`package.json`; `app.js` is one plain browser script loaded via `<script
defer>`). You are fast and reliable on **fully specified, low-judgment work**.
This doc gives you two such packets, each with the recipe already resolved.

## How to work (non-negotiable)

1. **Read first, in this order:** [`AI_INSTRUCTIONS.md`](../AI_INSTRUCTIONS.md),
   [`CLAUDE.md`](../CLAUDE.md), then the specific files each packet names.
2. **One packet = one branch off `main` = one draft PR.** Never combine the two
   packets into one PR. Never commit to `main`. Never push to another branch's
   PR.
3. **Re-derive every count from the actual data/code before you write it in a
   doc or commit message.** This repo's scorecards have been wrong five times;
   a number you copied instead of re-deriving is assumed wrong.
4. **Stop and hand back** the moment a packet turns out to need a judgment call
   the recipe does not settle (a semantic decision, a schema/audit design
   choice, deleting code you cannot prove is unreferenced). Do not guess.
5. **Do not touch** Words curated data, Alphabet code/data, `audio_map.js`, or
   any Korean content. These packets are code/tooling only.
6. **Verify gates below are mandatory on every PR, even a one-liner.**

---

## Packet 1 — Fix the Words curriculum generator's output path (one-liner)

**Problem (confirmed).** `node scripts/generate_words_curriculum_v2.mjs --check`
throws `ENOENT` on `words_lesson_plan_v2.js`. That filename is wrong: the
generator's `outputPath` points at a file that does not exist. The real,
app-loaded plan file is **`words_lesson_plan.js`** (loaded by
`index.html` and `sw.js`; exports `window.HANAPATH_WORD_SECTIONS`). The
companion test `scripts/test_curriculum_v2_audit.mjs` already reads the correct
name (`words_lesson_plan.js`), so only the generator is wrong.

**Root cause is a single line.** In
[`scripts/generate_words_curriculum_v2.mjs`](../scripts/generate_words_curriculum_v2.mjs):

```js
const outputPath = path.join(root, "words_lesson_plan_v2.js");
```

Change `"words_lesson_plan_v2.js"` → `"words_lesson_plan.js"`. That is the whole
fix. Do **not** rename the committed data file, and do **not** change the global
variable name it exports.

**Why this is safe (already proven — re-prove it yourself).** Regenerating the
plan to the correct filename produces output **byte-identical** to the committed
`words_lesson_plan.js`. So after the repoint, `--check` must pass with **zero**
changes to `words_lesson_plan.js`, `scripts/curriculum_v2_lock.json`, or
`scripts/curriculum_v2_report.md`.

**⚠️ Trap:** running the generator with **no arguments** writes files
(`words_lesson_plan.js`, the lock, the report). Running it with **`--check`**
only compares and writes nothing. Use `--check` to verify. If you ever run it in
write mode, `git status` afterward and revert any incidental changes — your PR
diff must contain **only** the one-line generator edit.

**Done-when:**
- The one-line `outputPath` edit is the only change in the diff.
- `node scripts/generate_words_curriculum_v2.mjs --check` exits 0.
- `node scripts/test_curriculum_v2_audit.mjs` exits 0.
- `git status` is clean apart from the generator file.

**Verify (run all):**
```bash
node --check scripts/generate_words_curriculum_v2.mjs
node scripts/generate_words_curriculum_v2.mjs --check
node scripts/test_curriculum_v2_audit.mjs
git status --short          # expect ONLY the generator file
```

No cache bump (no app-loaded asset changed). PR title suggestion:
`fix(tooling): point Words v2 generator at words_lesson_plan.js`.

---

## Packet 2 — Verify the Listening tab, then remove only genuinely-dead legacy code

This packet has a **verify half** (mechanical, safe) and a **removal half**
(gated on what the verify half proves). Do the verify half first. **If the
removal half requires deleting anything you cannot prove is unreferenced, stop
and hand back the verify results alone as the PR.**

### Background (re-verify, do not trust these numbers)

Plan §8 of [`docs/SENTENCES_CURRICULUM_V2_PLAN.md`](SENTENCES_CURRICULUM_V2_PLAN.md)
lists two linked debts:
- "Listening-tab runtime verification (54 `.find()` lookups)" — **the count is
  stale**; re-derive it (`grep -c "\.find(" app.js` currently returns 29). Use
  the real number.
- "Track I dead-code removal (`getSentenceStudyBank`/`makeSentence*`) —
  Blocked on Listening tab repoint."

**Important finding to confirm:** `getSentenceStudyBank()` and the
`makeSentence*` family (around `app.js` lines ~2137–2463) are **not obviously
dead** — the Listening tab still reaches them via `makeListenStudioQuestion` →
`makeSentenceListenQuestion` / `makeSentenceTypingQuestion`. So this is **not** a
blind delete. You must build the reference map before removing anything.

### Verify half (do this, always)

1. Serve statically: `python -m http.server 8000`, open `index.html`.
2. Exercise the **Listening tab** as a cold learner at each level it offers:
   trigger phrase-listening, conversation-listening, and any sentence-listening
   question types. Confirm each renders a real prompt (not the "listening bank
   is not ready yet" fallback), audio plays, answers grade, and the session
   reaches its summary.
3. Watch the **console**: zero errors across the whole flow.
4. Record, in the PR body, exactly which code paths the Listening tab exercised
   (function names + line numbers) and which of the legacy
   `getSentenceStudyBank` / `makeSentence*` functions were **actually called**
   vs never reached.

### Removal half (only what you proved is dead)

5. For each `getSentenceStudyBank` / `makeSentence*` symbol, grep `app.js` (and
   any other loaded file) for **every** reference. A symbol is removable **only
   if** it has zero live callers after accounting for the Listening/Sentences
   flows you just exercised. List each symbol with its caller count.
6. Delete **only** the zero-caller symbols. Leave everything with a live caller
   in place and say so in the PR. If that means deleting nothing, the PR is the
   verify-half writeup plus the reference map — that is a valid, useful outcome.
7. If you removed code that changed `app.js`, **bump caches**: `CACHE_NAME` in
   `sw.js` **and** the `app.js?v=...` query strings in both `index.html` and
   `sw.js` (see CLAUDE.md rule 4).

**Done-when:**
- PR body contains the Listening-tab runtime writeup (paths exercised, console
  clean) and the full reference map for every legacy symbol.
- Any deletion is justified by a zero-caller proof in that map.
- If `app.js` changed: caches bumped and app-shell audit passes.

**Verify (run all that apply):**
```bash
node --check app.js
node scripts/audit-sentences-data.mjs --strict
node scripts/audit-words-data.mjs --strict
node scripts/audit-app-shell.mjs            # if index.html / sw.js / app.js changed
# plus the manual Listening-tab browser pass above
```

PR title suggestion: `chore(listening): verify runtime + remove dead legacy
sentence-bank code` (adjust to what you actually removed).

---

## Not in scope for you (hand these to a high-judgment model)

- Authoring any Korean sentences/words or helper copy (Track H, elective packs).
- The Words Phase 2 sense-review decisions in the `docs/WORDS_P2_*` packets.
- The Translate & Type positional/near-miss diff (`EXTENSION (roadmap B3)`
  markers in `app.js`) — app.js algorithm work, tagged [high].
- Any schema or audit **design** change.
