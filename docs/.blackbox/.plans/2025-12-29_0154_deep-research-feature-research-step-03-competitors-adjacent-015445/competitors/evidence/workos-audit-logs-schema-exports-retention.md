# Evidence Extract — WorkOS Audit Logs (schema + exports + retention)

- slug: `workos-audit-logs-schema-exports-retention`
- category: embedded audit logs product primitives (schema registry + exports + retention controls)
- license: proprietary SaaS docs (WorkOS). Use as pattern reference only (not code).

## Cycle 22 — Evidence-backed primitives (audit logs as an embeddable product)

### Notable features (3)

1) Provides an “Audit Log Schema” surface plus schema CRUD/listing (schema registry as first-class concept)  
Evidence: https://workos.com/docs/reference/audit-logs

2) Provides “Audit Log Export” endpoints including create/get export (export jobs as first-class objects)  
Evidence: https://workos.com/docs/reference/audit-logs

3) Provides explicit retention controls (get/set retention) and configuration endpoints for audit logs  
Evidence: https://workos.com/docs/reference/audit-logs

### Copyable workflows (2)

1) Schema-first governance: define schema → emit events that conform → use schema to drive UI (field labels, filtering, stable event taxonomy)  
Evidence: https://workos.com/docs/reference/audit-logs

2) Compliance export: create export job → poll/get export → deliver to auditor/warehouse; retention policy controls how far back exports can go  
Evidence: https://workos.com/docs/reference/audit-logs

### 3 steal ideas (easy / medium / hard)

- Easy: treat exports as first-class objects with status + download link (vs “download now” only).
- Medium: retention configuration as an admin primitive (defaults + per-tenant policy).
- Hard: schema registry + action catalog (stable event taxonomy that powers UI, filtering, and downstream exports).

### Thin-slice implementation (1–3 days)

- Day 1: canonical audit event envelope (actor/action/target/time/origin/correlation).
- Day 2: export job primitive (`exports` table: status, created_by, time_range, format, download_url) + UI.
- Day 3: retention policy config + enforcement in export queries (max lookback) + audit events for policy changes.

