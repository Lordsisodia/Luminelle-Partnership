# Evidence Extract — Auth0

- slug: `auth0`
- category: identity + access control + logs (adjacent: RBAC + audit logs + log streaming)
- license: SaaS / proprietary (license not applicable as OSS)

## Cycle 4 — Evidence-backed primitives (RBAC + logs + log streaming)

### Notable features (3)

1) RBAC model for APIs (roles + permissions)  
Evidence: https://auth0.com/docs/manage-users/access-control/rbac

2) Logs as a first-class monitoring/audit surface  
Evidence: https://auth0.com/docs/secure/monitoring/logs

3) Log Streams as an export primitive (forward logs to external tools)  
Evidence: https://auth0.com/docs/secure/monitoring/log-streams

### Copyable workflows (2)

1) Least-privilege admin: define roles/permissions → assign to users/apps → enforce for sensitive actions  
Evidence: https://auth0.com/docs/manage-users/access-control/rbac

2) Incident response: detect suspicious events in logs → stream to SIEM → correlate + remediate (disable/revoke)  
Evidence (logs): https://auth0.com/docs/secure/monitoring/logs  
Evidence (log streams): https://auth0.com/docs/secure/monitoring/log-streams

### 3 steal ideas (easy / medium / hard)

- Easy: log taxonomy + search filters for admin events (who/what/when/where).
- Medium: log streaming integration (push our audit events to common sinks) as a paid/enterprise add-on.
- Hard: full identity/risk engine (anomaly detection, adaptive MFA) — too broad, but individual patterns are reusable.

### Thin-slice implementation (1–3 days)

- Day 1: audit log events for integration/credential lifecycle + search filters.
- Day 2: RBAC guardrails for sensitive actions (rotate/revoke/disconnect) + permission model.
- Day 3: external export: webhook/log streaming sink for audit events (minimal SIEM integration).

