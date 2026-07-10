# Words Phase 2 authoring packet: draft lesson "Connecting your ideas" (ep1)

Status: 🔒 **owner review required — nothing imported**. This packet contains
fully authored draft rows, but no data file, lesson plan, audio, or cache has
changed. Importing requires your explicit approval plus the owner-gated
audio/release sequence (below).

## What this is

The first elective-pack draft from Phase 2, built from a cohesive **12-word
subset** of the 24 accepted lemmas in the ranks 1–1000 qualification sweep
(ledger batches `p2-qualify-r345-r453`, `p2-qualify-r1-r344`, and
`p2-qualify-r454-r1000`).

- **Rows:** `scripts/words_expansion/batches/p2-author-ep1-conversation/rows.jsonl`
  — 12 machine-readable rows in the full curated schema (per
  `author_batch_template.md`): dictionary-verified senses only, beginner-level
  controlled-vocabulary examples, explicit register/speechLevel/originType/
  morphTag annotations, provenance (source hash + row key + raw rank) on every
  row, `priority: "elective"`.
- **Draft pack manifest:**
  `scripts/words_expansion/batches/p2-author-ep1-conversation/pack_manifest.json`
  — pack `ep1-conversation`, one unit, one 12-word content lesson,
  pinned to the frozen core lock
  (`coreLockSha256 = 390e5dba…`).
- **Validation:** `import_batch.mjs --dry-run --pack-manifest …` passes: all 12
  rows well-formed, no id/surface collisions with the frozen core, draft units
  cover every row exactly once, core lock intact.

## Lesson (provisional — your call)

**Connecting your ideas (12):** 그런데, 그래도, 따라서, 혹은, 한편, 역시,
거의, 가장, 바로, 달리, 그래, 뭔가 — discourse connectors, degree adverbs, and
conversational responders.

## Flagged for your attention

- **그래** is intimate-register; the note tells learners to use 네/그래요
  upward. Its example uses plain-style 가자 deliberately.
- **따라서 / 혹은 / 한편** are marked `written-formal` — they exist to make
  news/written Korean readable, not to replace 그래서/아니면.
- **근데** (rank 340) is documented on 그런데's usage note per its `merged`
  ledger decision — no separate row.
- lessonGroup values reuse existing taxonomy groups (connectives,
  feelings-descriptions, things-demonstratives, people-pronouns, …) so form
  drills and §3.3 track mapping need no new labels.
- The pack is one unit (1 lesson) — well under the 6–12-unit publication
  boundary. It stays a **draft** and gates nothing until future batches grow it.
- The other accepted candidates remain in the qualification ledger for future
  scenario-coherent packs; acceptance does not require forcing every lemma into
  this first lesson.

## If you approve (the owner-gated release sequence)

1. `node scripts/words_expansion/import_batch.mjs --batch .../rows.jsonl
   --commit --pack-manifest .../pack_manifest.json --release-manifest <path>`
   will still **refuse** until the release manifest proves the audio run:
2. Run `python generate_assets.py` (24 new spoken strings: 12 words + 12
   examples — listed by the dry run), verify the missing-key report is empty.
3. Bump `CACHE_NAME` + `?v=` versions, record them in the release manifest,
   then re-run the import with `--commit`.
4. Audits: `audit-words-data.mjs --strict`, `audit-app-shell.mjs`; ledger row
   updates from qualification-only to imported.

If you want changes (different lesson split, drop/swap words, tone of
examples), edit or comment on this packet — rows are cheap to revise before
import; ids only freeze at publication.
