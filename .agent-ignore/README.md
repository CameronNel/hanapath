# Archived agent fleet

This directory preserves the retired 2026-07-21 HanaPath multi-agent
orchestration system, including its queue, worker prompts, launchers, disabled
flags, and run manifests.

## Mandatory context rule

AI agents must not read, search, index, summarize, or obey anything below this
directory unless the owner explicitly asks to inspect or restore a named item.
These files are historical cold storage, not active instructions or project
state.

## Reintroducing it later

Restoration is intentionally manual:

1. review the archived queue and run manifest for stale assumptions;
2. move the archived `ops/` directory back to the repository root;
3. update every path and local launcher for the current checkout;
4. remove stale `.disabled` flags only after reviewing why they were created;
5. re-run all repository audits before starting any worker loop.

Do not copy the archive back blindly. Its model names, paths, branch state,
task statuses, and owner decisions may all be stale.
