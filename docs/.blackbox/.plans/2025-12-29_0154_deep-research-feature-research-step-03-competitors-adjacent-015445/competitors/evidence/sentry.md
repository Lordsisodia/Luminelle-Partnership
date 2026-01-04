# Evidence Extract — Sentry

- slug: `sentry`
- category: observability / org governance (adjacent: audit log UX)
- license: SaaS + OSS (license varies by deployment; treat as product pattern reference)

## Cycle 5 — Evidence-backed primitives (audit log surface)

### Notable features (3)

1) Audit log is a first-class organization-level governance surface  
Evidence: https://docs.sentry.io/product/organization/audit-log/

2) Centralized change history makes “who did what” discoverable without database access  
Evidence: https://docs.sentry.io/product/organization/audit-log/

3) Audit log UX pattern (filters + entries) is portable to ecommerce admin actions and integration changes  
Evidence: https://docs.sentry.io/product/organization/audit-log/

### Copyable workflows (2)

1) Debugging governance: “something changed” → open audit log → filter by actor/time → identify action  
Evidence: https://docs.sentry.io/product/organization/audit-log/

2) Access review: periodically review audit log entries to validate least privilege and detect anomalies  
Evidence: https://docs.sentry.io/product/organization/audit-log/

### 3 steal ideas (easy / medium / hard)

- Easy: audit log list with search/filter and stable event names.
- Medium: link every audit entry to the exact object detail page (integration, credential, setting).
- Hard: advanced anomaly detection; instead, add export/stream to external tools.

### Thin-slice implementation (1–3 days)

- Day 1: add “Audit Log” page in admin with event schema + filters.
- Day 2: attach audit events to sensitive flows (connect/disconnect, rotate/revoke, approvals).
- Day 3: add export target (webhook) with test event button.

