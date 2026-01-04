---
status: active
last_reviewed: 2025-12-29
owner: agent-zero
---

# OSS Deep Audit Template (step-by-step)

Goal: turn “cool code” into a **specific integration plan** (not vibes).

## 0) Identity (facts)

- Repo:
- License (SPDX):
- Primary language:
- Last updated:
- Stars:
- Maintainers / org:

## 1) What we want from it (1 sentence)

- “We want X so we can Y for merchant admins.”

## 2) What feature row does it map to?

- Link the row in `artifacts/top-50-market-features.md`:

## 3) Integration posture (pick one)

- Embed UI into our admin
- Service boundary (run it separately, call via API)
- Inspiration-only (copy patterns, not code)

## 4) The 1‑day POC (concrete)

- Inputs:
- Outputs:
- Minimal endpoints:
- Minimal UI:
- “Done when” checklist:

## 5) The 1‑week integration (concrete)

- Data model mapping:
- Auth model (tenant boundaries):
- RBAC / permissions hooks:
- Audit log hooks:
- Run logs / retries:
- Observability:

## 6) Extension points (how we customize)

- Plugins / hooks:
- Webhooks / events:
- DB schema flexibility:
- Where code changes will happen:

## 7) Risk scan (short + honest)

- License risk:
- Security risk:
- Maintenance risk:
- Scope mismatch risk:
- “Gotchas”:

## 8) Recommendation (one line)

- Adopt / Pilot / Avoid

## 9) Evidence links

- Docs links:
- Code links (paths/README):
- Any competitor evidence that supports adopting this:

