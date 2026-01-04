---
status: draft
last_reviewed: 2025-12-29
owner: agent-zero
---

# OSS Deep Audit — gotify/server

## 0) Identity (facts)

- Repo: https://github.com/gotify/server
- License (SPDX): ⚠️ NOASSERTION
- Primary language: Go
- Stars: 14319
- Default branch: master
- Last updated: 2025-12-28T20:22:16Z
- Description: A simple server for sending and receiving messages in real-time per WebSocket. (Includes a sleek web-ui)
## 1) What we want from it (1 sentence)

- We want **gotify/server** as a reusable building block so we can ship faster for merchant admins (and avoid re-building commodity primitives).

## 2) What feature row does it map to?

- Link the row(s) in `artifacts/top-50-market-features.md`:
  - TODO: add exact row number(s) after triage

## 3) Integration posture (pick one)

- Recommended default: **Service boundary (run it separately, call via API)**
- Notes:
  - If license is ⚠️ unknown, treat as “pilot / verify” until confirmed.

## 4) The 1‑day POC (concrete)

- Inputs:
  - Minimal tenant context (tenant_id)
  - Minimal auth context (actor_id / role)
- Outputs:
  - A working demo proving the primitive works in our environment
- Minimal endpoints:
  - TODO: list the 1–3 endpoints we’d stand up (or proxy) for the POC
- Minimal UI:
  - TODO: the smallest UI surface we need to prove it (or an embedded admin page)
- “Done when” checklist:
  - [ ] We can run it locally (or in a sandbox)
  - [ ] We can connect it to our auth/tenant boundary (even if hacked)
  - [ ] We can demonstrate one real workflow using it

## 5) The 1‑week integration (concrete)

- Data model mapping:
  - TODO: identify the 2–5 core tables/objects we need to map
- Auth model (tenant boundaries):
  - TODO: enforce tenant scoping explicitly (no “trust the UI”)
- RBAC / permissions hooks:
  - TODO: define role gates for the riskiest actions
- Audit log hooks:
  - TODO: log all write actions (“who did what, when, to what”)
- Run logs / retries (if async):
  - TODO: define a `runs` concept for async actions (status, error, retry)
- Observability:
  - TODO: minimal metrics + error reporting

## 6) Extension points (how we customize)

- Plugins / hooks:
  - TODO: identify where customization happens (webhooks, plugins, config)
- Where code changes will happen:
  - TODO: list the file/module boundaries we’d fork/extend

## 7) Risk scan (short + honest)

- License risk: ⚠️ NOASSERTION (unknown)
- Security risk: TODO (review auth boundaries + SSRF/webhooks + secrets handling)
- Maintenance risk: TODO (bus factor + release cadence)
- Scope mismatch risk: TODO (is it overkill vs our thin slice?)
- “Gotchas”: TODO

## 8) Recommendation (one line)

- TODO: Adopt / Pilot / Avoid

## 9) Evidence links

- Repo: https://github.com/gotify/server
- README (raw): https://raw.githubusercontent.com/gotify/server/master/README.md
