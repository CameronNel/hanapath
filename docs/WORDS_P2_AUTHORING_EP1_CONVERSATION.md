# Words Phase 2 authoring packet: draft pack "Joining the conversation" (ep1)

Status: 🔒 **owner review required — nothing imported**. This packet contains
fully authored draft rows, but no data file, lesson plan, audio, or cache has
changed. Importing requires your explicit approval plus the owner-gated
audio/release sequence (below).

## What this is

The first elective-pack draft from Phase 2, built from the **23 accepted
lemmas** of the ranks 1–1000 qualification sweep (ledger batches
`p2-qualify-r345-r453`, `p2-qualify-r1-r344`, `p2-qualify-r454-r1000`).

- **Rows:** `scripts/words_expansion/batches/p2-author-ep1-conversation/rows.jsonl`
  — 23 machine-readable rows in the full curated schema (per
  `author_batch_template.md`): dictionary-verified senses only, beginner-level
  controlled-vocabulary examples, explicit register/speechLevel/originType/
  morphTag annotations, provenance (source hash + row key + raw rank) on every
  row, `priority: "elective"`.
- **Draft pack manifest:**
  `scripts/words_expansion/batches/p2-author-ep1-conversation/pack_manifest.json`
  — pack `ep1-conversation`, one unit, two content lessons (12 + 11 words),
  pinned to the frozen core lock
  (`coreLockSha256 = 390e5dba…`).
- **Validation:** `import_batch.mjs --dry-run --pack-manifest …` passes: all 23
  rows well-formed, no id/surface collisions with the frozen core, draft units
  cover every row exactly once, core lock intact.

## Lesson split (provisional — your call)

**L1 · Connecting your ideas (12):** 그런데, 그래도, 따라서, 혹은, 한편, 역시,
거의, 가장, 바로, 달리, 그래, 뭔가 — discourse connectors, degree adverbs, and
conversational responders.

**L2 · People, places, and talk (11):** 이런, 그런, 당신, 여러분, 관계, 자리,
시대, 후보, 프로그램, 사이트, 달러 — pointing words, people/address words, and
everyday society nouns.

## Flagged for your attention

- **당신** carries a mandatory usage caution (not a neutral "you"; natural
  between spouses/in songs/ads; rude to strangers). If you'd rather not teach
  it at all, delete the row — the pack still validates at 22 (11 + 11).
- **그래** is intimate-register; the note tells learners to use 네/그래요
  upward. Its example uses plain-style 가자 deliberately.
- **따라서 / 혹은 / 한편** are marked `written-formal` — they exist to make
  news/written Korean readable, not to replace 그래서/아니면.
- **근데** (rank 340) is documented on 그런데's usage note per its `merged`
  ledger decision — no separate row.
- lessonGroup values reuse existing taxonomy groups (connectives,
  feelings-descriptions, things-demonstratives, people-pronouns, …) so form
  drills and §3.3 track mapping need no new labels.
- The pack is one unit (2 lessons) — well under the 6–12-unit publication
  boundary. It stays a **draft** and gates nothing until future batches grow it.

## If you approve (the owner-gated release sequence)

1. `node scripts/words_expansion/import_batch.mjs --batch .../rows.jsonl
   --commit --pack-manifest .../pack_manifest.json --release-manifest <path>`
   will still **refuse** until the release manifest proves the audio run:
2. Run `python generate_assets.py` (46 new spoken strings: 23 words + 23
   examples — listed by the dry run), verify the missing-key report is empty.
3. Bump `CACHE_NAME` + `?v=` versions, record them in the release manifest,
   then re-run the import with `--commit`.
4. Audits: `audit-words-data.mjs --strict`, `audit-app-shell.mjs`; ledger row
   updates from qualification-only to imported.

If you want changes (different lesson split, drop/swap words, tone of
examples), edit or comment on this packet — rows are cheap to revise before
import; ids only freeze at publication.
