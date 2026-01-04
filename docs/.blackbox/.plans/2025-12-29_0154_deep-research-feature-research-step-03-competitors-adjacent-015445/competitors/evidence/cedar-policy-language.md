# Evidence Extract — Cedar Policy Language

- slug: `cedar-policy-language`
- category: policy templates + policy store patterns (authorization as code)
- license: Apache-2.0 (OSS)

## Cycle 12 — Evidence-backed primitives (policy templates + explainable decisions)

### Notable features (3)

1) Cedar supports policy-based authorization with conditions over principal/resource/context attributes  
Evidence: https://docs.cedarpolicy.com/

2) “Roles with policy templates” is a documented best practice (manage role assignment in policy store via templates when no IdP group mapping exists)  
Evidence: https://docs.cedarpolicy.com/bestpractices/bp-implementing-roles-templates.html

3) Clear core vocabulary (principal/resource/action schema + groups/hierarchies) supports explainable policies and stable evaluation inputs  
Evidence: https://docs.cedarpolicy.com/overview/terminology.html

### Copyable workflows (2)

1) Template-based RBAC workflow: define a policy template per role → instantiate for principals → role assignment becomes data in the policy store  
Evidence: https://docs.cedarpolicy.com/bestpractices/bp-implementing-roles-templates.html

2) Schema-first workflow: define schema (types/actions/attributes) → validate policies against schema → reduce runtime mismatches and improve explainability  
Evidence: schema concepts + validation references: https://docs.cedarpolicy.com/overview/terminology.html

### 3 steal ideas (easy / medium / hard)

- Easy: ship “policy templates” for common ecommerce rules (refund over threshold, payout changes) rather than a free-form DSL.
- Medium: add “policy simulator” tooling that validates policies against a schema and explains “why denied” using consistent inputs.
- Hard: formal analysis tooling for policies (prove invariants, catch gaps) — likely later.

### Thin-slice implementation (1–3 days)

- Day 1: build policy template UI for 2 templates: `refund_over_threshold_requires_finance` and `payout_change_requires_owner`.
- Day 2: add schema-enforced input shaping for policies (`principal`, `resource`, `context`) + validator checks.
- Day 3: add “why denied” text tied to the matching template + export to audit logs.

## License evidence

- Apache-2.0: https://raw.githubusercontent.com/cedar-policy/cedar/main/LICENSE

