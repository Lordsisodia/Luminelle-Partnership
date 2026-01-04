# Evidence Extract — OpenFGA

- slug: `openfga`
- category: fine-grained authorization (Zanzibar-inspired ReBAC)
- license: Apache-2.0

## Cycle 11 — Evidence-backed primitives (relationship-based permissions)

### Notable features (3)

1) Zanzibar-inspired fine-grained authorization positioning  
Evidence: https://raw.githubusercontent.com/openfga/openfga/main/README.md

2) Modeling guidance is first-class: “object types, relations, define relations, test, iterate” process  
Evidence: https://openfga.dev/docs/modeling/getting-started

3) Rich modeling guides (patterns/building blocks) to translate product requirements into authorization models  
Evidence: https://openfga.dev/docs/modeling

### Copyable workflows (2)

1) Protected resources registry backed by relations: define objects (store, integration, payout_settings) and relations (owner, admin, finance_approver) → query “can user do action on resource?”  
Evidence: modeling process reference: https://openfga.dev/docs/modeling/getting-started

2) Model iteration workflow: start with one feature → list types → list relations → define relations → test model → iterate  
Evidence: https://openfga.dev/docs/modeling/getting-started

### 3 steal ideas (easy / medium / hard)

- Easy: represent access as relationships (“user U is finance_approver for store S”) instead of large role matrices.
- Medium: define “approval-required” as a derived relation/decision outcome from permissions + action attributes (e.g., high-risk action requires finance_approver relation).
- Hard: multi-tenant scale + caching/invalidation patterns for relationship checks (treat as later optimization).

### Thin-slice implementation (1–3 days)

- Day 1: define a minimal relationship model for 2 resource types (store + integration) and 3 relations (owner/admin/finance_approver).
- Day 2: wrap checks behind a single `authorize(actor, action, resource)` function returning allow/deny + reasons.
- Day 3: connect authorization checks to approval creation: `deny` with “needs_approval” reason → create approval request.

## License evidence

- Apache-2.0: https://raw.githubusercontent.com/openfga/openfga/main/LICENSE

