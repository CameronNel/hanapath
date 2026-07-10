# Words Phase 2 active handoff

> **Ownership note (2026-07-10):** the owner reassigned this queue from Luna to
> **Claude Code**. The rules below still bind whoever works the queue. The
> import-boundary hardening task is complete (PR #184); current work is
> large-range qualification plus the first owner-review authoring packet.

Work only on HanaPath Words Phase 2. Read `AI_INSTRUCTIONS.md`, `CLAUDE.md`,
`HANDOVER.md`, and `docs/WORDS_CURRICULUM_V2_PLAN.md` section 5 before editing.

Gemini completed P2-0 tooling. Do not redo it and do not touch Sentences,
Alphabet, or frozen Words core objects (S1-S8).

## First task: harden the import boundary

Review and repair `scripts/words_expansion/import_batch.mjs` before any real
import. Its current `--commit` path appends directly to `words_curated_core.js`
without creating or validating a draft elective pack, or enforcing the required
audio/cache release sequence. Make real imports safe, append-only, and auditable;
otherwise keep the adapter dry-run only and document the boundary.

## Then: first batch proposal

Use the candidate queue and immutable decision ledger to qualify a small source
range and propose an owner-reviewable elective-pack theme. Make semantic calls
only with evidence; preserve ambiguous candidates as `needs-sense-review`.
Do not import new Korean content or run audio without owner approval.

One task per branch/PR. Run the expansion-tool tests plus strict Words, Alphabet,
and app-shell audits; browser-smoke any learner-visible change.
