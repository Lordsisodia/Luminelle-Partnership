# Evidence Extract — Google Cloud Audit Logs (schema + categories)

- slug: `gcp-cloud-audit-logs-schema`
- category: audit log schema + categories + query workflows
- license: proprietary docs (Google). Use as pattern reference only (not code).

## Cycle 21 — Evidence-backed primitives (audit logs as structured “who/what/when/where”)

### Notable features (3)

1) Audit log entries are standard log entries where the `protoPayload` field contains an `AuditLog` object (audit-specific fields)  
Evidence: https://docs.cloud.google.com/logging/docs/audit

2) The `AuditLog` payload defines audit-specific fields (examples referenced directly in docs: `serviceName`, `methodName`, `authenticationInfo`)  
Evidence: https://docs.cloud.google.com/logging/docs/audit/understanding-audit-logs

3) Audit log categories are exposed via log names (activity/system/data access) and can be queried with the Logging API (docs include an `entries.list` example filter on `logName`)  
Evidence: https://docs.cloud.google.com/logging/docs/audit

### Copyable workflows (2)

1) Audit investigations via query filters: filter by audit log name(s) → page through results → export to downstream tooling  
Evidence: query example references in audit docs: https://docs.cloud.google.com/logging/docs/audit

2) Human-readable interpretation workflow: “who/what/resource/status” described as fields on `protoPayload` in “Understanding audit logs”  
Evidence: https://docs.cloud.google.com/logging/docs/audit/understanding-audit-logs

### 3 steal ideas (easy / medium / hard)

- Easy: make audit log categories explicit (admin activity vs system events vs data access) and expose them as filters in UI.
- Medium: store core envelope + service-specific metadata (like `protoPayload`) so we can extend without breaking base queries.
- Hard: provide an API-driven audit export (query + pagination + retention policy) that can be wired into external compliance workflows.

### Thin-slice implementation (1–3 days)

- Day 1: define audit categories and canonical audit envelope fields (actor/action/target/time/origin/status).
- Day 2: implement audit querying filters + export (CSV) for the core categories.
- Day 3: add “audit payload” extensibility mechanism (typed JSON per domain area) while keeping the canonical fields stable.

