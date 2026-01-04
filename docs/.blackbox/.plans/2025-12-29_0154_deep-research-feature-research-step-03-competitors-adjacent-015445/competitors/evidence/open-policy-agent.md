# Evidence Extract — Open Policy Agent (OPA)

- slug: `open-policy-agent`
- category: policy engine / policy-as-code (authorization + admission decisions)
- license: Apache-2.0

## Cycle 11 — Evidence-backed primitives (policy-as-code gates)

### Notable features (3)

1) Policy language: OPA uses declarative language Rego to express rules/decisions as code  
Evidence: https://openpolicyagent.org/docs/policy-language

2) Multiple integration surfaces: CLI eval, server/HTTP, and library usage (embed policy evaluation)  
Evidence: https://openpolicyagent.org/docs

3) Useful “gating” mental model: evaluate policy and treat results as decisions (permit/deny/violations)  
Evidence: policy queries/decisions described in Rego language overview: https://openpolicyagent.org/docs/policy-language

### Copyable workflows (2)

1) Protected action gate: admin attempts sensitive action → backend queries OPA with `input` → returns `allow/deny/needs_approval` → action proceeds or is blocked/queued  
Evidence: Rego as decision-making language: https://openpolicyagent.org/docs/policy-language

2) Policy change workflow: policies stored as files/bundles → reviewed like code → deployed → decisions become auditable (“which policy denied?”)  
Evidence: OPA supports loading policy/data files and bundles; CLI eval: https://openpolicyagent.org/docs

### 3 steal ideas (easy / medium / hard)

- Easy: represent “protected resources” policies as structured rules that return a decision (allow/deny) and optionally a reason string.
- Medium: add policy versioning + audit events (“policy_version X decided deny”) so approval/audit exports can tie back to policy evaluations.
- Hard: build a full policy authoring UX; start with templates that compile to a few fixed rules.

### Thin-slice implementation (1–3 days)

- Day 1: add a `policy_decision` interface in code (`allow`, `deny`, `reason`, `policy_version`) and call it for 1–2 protected actions.
- Day 2: store policy docs in DB as “templates” and compile into decisions in-app (no DSL yet).
- Day 3: add audit events for every policy evaluation + export mapping.

## License evidence

- Apache-2.0: https://raw.githubusercontent.com/open-policy-agent/opa/main/LICENSE

