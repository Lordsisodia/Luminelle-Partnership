# 003 — `server/` entrypoint was stale (resolved by removing it)

Status: **Resolved** (2025-12-14)

## Summary
Historically there was a `server/index.ts` Express webhook server, but it was **not runnable**:

- It imports modules under `src/server/*` that do not exist in this repo.
- It depends on packages like `express`, `cors`, and `body-parser` that are not declared in `package.json`.

So any docs/notes that suggest using `server/index.ts` for local webhook handling will break.

This has been resolved by removing `server/index.ts` entirely and clarifying that `server/` is used for SQL migrations only.

## Impact
- **Previously Medium**: confusing for contributors; “local webhook server” workflows fail immediately.
- **Now**: no broken runtime entrypoint exists in `server/`.

## Evidence
- `server/index.ts` previously imported non-existent `src/server/*` modules and relied on missing dependencies.
- `server/README.md` now documents the intended scope of `server/` (migrations only).

## Repro
This repro no longer applies if you’re on a commit after 2025-12-14.

## Likely Root Cause
`server/` is a leftover from an earlier architecture before `api/` functions took over webhooks.

## Fix Direction
Completed fix:
- Removed the stale `server/index.ts`.
- Documented `server/` as “migrations only” in `server/README.md`.

If you need local webhook handling:
- Use the existing serverless endpoints under `api/shopify/webhooks/*` and `api/webhooks/clerk.ts`.
