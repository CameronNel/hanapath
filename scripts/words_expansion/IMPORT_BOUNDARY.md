# Phase 2 import boundary

`import_batch.mjs` is intentionally dry-run-only until the release contract is
implemented and approved. A real import must be able to prove all of the
following before it mutates a loaded data file:

- rows are placed in a validated draft elective pack rather than the frozen
  S1-S8 plan;
- the pack and core lock regression are append-only and reproducible;
- every spoken word, form, and example has passed owner-run audio generation
  and missing-key verification; and
- final `index.html`/`sw.js` query versions and the service-worker cache name
  changed after audio generation.

Until that contract exists, `--commit` fails before writing any file. Use
`--dry-run` for schema validation, lock validation, and review evidence only.
