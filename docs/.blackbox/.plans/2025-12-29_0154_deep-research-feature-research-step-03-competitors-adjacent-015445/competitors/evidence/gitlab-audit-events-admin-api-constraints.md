# Evidence Extract — GitLab Audit Events (UI + API constraints)

- slug: `gitlab-audit-events-admin-api-constraints`
- category: audit events (compliance/governance) + filtering constraints + API limits
- license: docs are CC BY-SA 4.0 (GitLab docs); product is SaaS/self-managed.

## Cycle 22 — Evidence-backed primitives (audit events as compliance UX)

### Notable features (3)

1) Audit events are available at multiple scopes (group, project, instance, sign-in), with role-based access requirements including an “Auditor” access level for broader visibility  
Evidence: https://docs.gitlab.com/ee/user/compliance/audit_events.html

2) API access exists for group/project audit events, but query parameters `created_after` and `created_before` are constrained to a maximum 30-day difference (prevents overly large queries)  
Evidence: https://docs.gitlab.com/ee/user/compliance/audit_events.html

3) Audit events retention is described as indefinite (no retention timeframe; all audit events are available), and the UI search is intentionally limited (only filter by author + date range; no text search in details)  
Evidence: https://docs.gitlab.com/ee/user/compliance/audit_events.html

### Copyable workflows (2)

1) Compliance review loop: open audit events → filter by member (actor) + date range → export/collect evidence for auditor  
Evidence: https://docs.gitlab.com/ee/user/compliance/audit_events.html

2) “Least privilege” + delegated auditing: use Auditor access role → review group/project audit events for all users without making them owners/maintainers  
Evidence: https://docs.gitlab.com/ee/user/compliance/audit_events.html

### 3 steal ideas (easy / medium / hard)

- Easy: make audit log filtering intentionally scoped at first (actor + time range) to keep UX simple and reliable.
- Medium: enforce query window limits for exports/APIs (e.g., max 30 days per request) to protect performance and reliability.
- Hard: introduce an “Auditor” role that grants read-only access to audit logs across tenant without granting operational permissions.

### Thin-slice implementation (1–3 days)

- Day 1: audit log page with actor + time range filters and a stable event schema.
- Day 2: export endpoint that enforces max time windows (e.g., 7–30 days) and paginated download.
- Day 3: add “Auditor” role (read-only) and wire it to payload viewing restrictions and export permissions.

