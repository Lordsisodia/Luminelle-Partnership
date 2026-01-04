---
status: draft
last_reviewed: 2025-12-28
owner: engineering
---

# Deploy runbook (starter)

## When to use

- You’re deploying a change and want a consistent checklist.

## Steps (high level)

1) Confirm what you’re deploying (commit/PR + scope).
2) Ensure env vars are correct for the target environment.
3) Deploy (follow the hosting docs if applicable).
4) Smoke test the critical paths.
5) Rollback if needed.

## References

- Hosting docs: `docs/02-engineering/hosting/`
- Project setup: `docs/02-engineering/project-setup/`

