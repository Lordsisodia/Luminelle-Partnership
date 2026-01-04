# Evidence Extract — Casbin

- slug: `casbin`
- category: authorization library (RBAC/ABAC models) + policy storage/mappings
- license: Apache-2.0

## Cycle 11 — Evidence-backed primitives (RBAC/ABAC library patterns)

### Notable features (3)

1) Supports multiple access control models (RBAC/ABAC etc) and is intended as an authorization library  
Evidence: https://casbin.org/docs/overview

2) Explicit responsibilities: stores access control model + policy; manages role-user and role-role mappings (role hierarchy)  
Evidence: “What Casbin Does” section: https://casbin.org/docs/overview

3) Examples for supported models link directly to model/policy example files in the repo  
Evidence: https://casbin.org/docs/supported-models

### Copyable workflows (2)

1) Standard auth check workflow: load model + policy → check `(subject, object, action)` → allow/deny decision used by API layer  
Evidence: Casbin overview: https://casbin.org/docs/overview

2) “Model template” workflow: pick a supported model → start from example config/policy → iterate  
Evidence: supported models index points to example configs/policies: https://casbin.org/docs/supported-models

### 3 steal ideas (easy / medium / hard)

- Easy: start with RBAC roles + a small set of resources/actions; keep the policy model simple and auditable.
- Medium: extend to “domains” (multi-tenant / per-store scopes) so roles can be scoped by store/account.
- Hard: unify RBAC/ABAC/ReBAC across all features; start with one model and evolve only when forced.

### Thin-slice implementation (1–3 days)

- Day 1: define `roles` and an `(actor, action, resource)` check function for 2–3 high-risk actions.
- Day 2: add “policy templates” (finance approval required, two-person rule) and map to approvals primitive.
- Day 3: record every allow/deny decision into audit events for later export.

## License evidence

- Apache-2.0: https://raw.githubusercontent.com/casbin/casbin/master/LICENSE

