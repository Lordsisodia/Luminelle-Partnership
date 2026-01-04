# Evidence Extract — Okta

- slug: `okta`
- category: identity + admin RBAC + system log (adjacent: audit/event stream primitives)
- license: SaaS / proprietary (license not applicable as OSS)

## Cycle 4 — Evidence-backed primitives (System Log + roles + API tokens)

### Notable features (3)

1) System Log API as a first-class audit/event stream primitive  
Evidence: https://developer.okta.com/docs/reference/api/system-log/

2) Admin roles API for delegation and governance (RBAC patterns)  
Evidence: https://developer.okta.com/docs/reference/api/roles/

3) API tokens lifecycle management patterns  
Evidence: https://developer.okta.com/docs/reference/api/api-tokens/

### Copyable workflows (2)

1) Governance: assign admin roles → review audit events in System Log → investigate changes  
Evidence (roles): https://developer.okta.com/docs/reference/api/roles/  
Evidence (system log): https://developer.okta.com/docs/reference/api/system-log/

2) Token hygiene: create API token → rotate/revoke → trace usage via logs/events  
Evidence (tokens): https://developer.okta.com/docs/reference/api/api-tokens/  
Evidence (system log): https://developer.okta.com/docs/reference/api/system-log/

### 3 steal ideas (easy / medium / hard)

- Easy: “System Log”-style event model (event types, actor, target, outcome) and query/filter UX.
- Medium: treat admin roles as composable + API-managed (good for enterprise customers and internal ops).
- Hard: full IAM suite parity — instead, borrow just the event model + roles patterns for our admin.

### Thin-slice implementation (1–3 days)

- Day 1: event schema for audit logs (actor, target, action, outcome, ip, user_agent).
- Day 2: role assignments for credential/integration management (delegation beyond “owner/admin”).
- Day 3: API token inventory UX (created_at, last_used_at, revoke/rotate) + tie to audit events.

