# Evidence Extract — WorkOS Audit Logs (API endpoint taxonomy + export objects)

- slug: `workos-audit-logs-endpoints-taxonomy`
- category: audit logs as a product surface (events + actions + schemas + exports + retention)
- license: proprietary SaaS docs (WorkOS). Use as pattern reference only (not code).

## Cycle 23 — Evidence-backed primitives (endpoint taxonomy for audit-as-a-product)

### Notable features (3)

1) Audit logs expose a “first-class exports” surface (`/audit_logs/exports` + `/audit_logs/exports/:id`)  
Evidence: endpoints appear in WorkOS audit logs reference HTML: https://workos.com/docs/reference/audit-logs

2) Audit logs expose an “actions catalog” and “schemas per action” surface (`/audit_logs/actions` and `/audit_logs/actions/:name/schemas`)  
Evidence: endpoints appear in WorkOS audit logs reference HTML: https://workos.com/docs/reference/audit-logs

3) Audit logs separate “events” from “schemas” and “retention” controls (distinct endpoints like `/audit_logs/events` and `/audit_logs_retention`)  
Evidence: endpoints appear in WorkOS audit logs reference HTML: https://workos.com/docs/reference/audit-logs

### Copyable workflows (2)

1) Self-documenting audit UI: list actions → inspect schema for action → interpret events and build filters/export confidently  
Evidence: actions + schemas endpoints listed in docs: https://workos.com/docs/reference/audit-logs

2) Compliance export loop: create export → poll/get export → provide download link and retention-limited lookback  
Evidence: exports + retention endpoints listed in docs: https://workos.com/docs/reference/audit-logs

### 3 steal ideas (easy / medium / hard)

- Easy: represent audit exports as their own API objects with IDs and status.
- Medium: maintain an “action catalog” that powers schema-first UI and filter builder UX.
- Hard: treat retention as a configurable policy primitive with an API (and emit audit events when changed).

### Thin-slice implementation (1–3 days)

- Day 1: define `audit_actions` catalog + `audit_event_types` (or `action_name`) and expose them in UI.
- Day 2: add export jobs (`exports` table + status + download URL) and retention-limited queries.
- Day 3: add schema-per-action (even if minimal) so consumers can self-serve understanding and reduce support burden.

## Note on “code sample” retrieval

- Attempted to fetch WorkOS `_code/*` sample assets directly via `https://workos.com/docs/reference/audit-logs/_code/...` but the route returns a JS fallback loader page (blocked from clean static retrieval in this environment).  
  Status: blocked_evidence (direct code sample URLs not reliably fetchable), but endpoint taxonomy is visible in the reference HTML at `https://workos.com/docs/reference/audit-logs`.

