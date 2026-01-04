# Evidence Extract — Permit.io

- slug: `permit-io`
- category: policy management UX (RBAC editor, audit logs, policy CI/CD, explainable reasons)
- license: SaaS / proprietary (docs are public)

## Cycle 12 — Evidence-backed primitives (policy editor + audit + CI/CD + reasons)

### Notable features (3)

1) Quickstart explicitly frames creating a basic RBAC policy in the product UI (policy editor)  
Evidence: https://docs.permit.io/quickstart

2) Audit logs include filtering dimensions and surface “decision logs” with a `reason` payload  
Evidence: https://docs.permit.io/how-to/use-audit-logs/types-and-filtering

3) “Policy lifecycle CI/CD” is treated as a first-class workflow (policy as code + environments/preview branches)  
Evidence: https://docs.permit.io/how-to/SDLC/CI-CD

### Copyable workflows (2)

1) No-code policy authoring workflow: configure RBAC policy in UI → connect to app → decisions logged with reasons  
Evidence: https://docs.permit.io/quickstart and https://docs.permit.io/how-to/use-audit-logs/types-and-filtering

2) Policy GitOps workflow: use environments as policy branches → preview branches flow → gate who can modify policies per stage  
Evidence: https://docs.permit.io/how-to/SDLC/CI-CD

### 3 steal ideas (easy / medium / hard)

- Easy: decision logs should always include a “reason” string; expose in approval/audit UIs and exports.
- Medium: treat policy changes like code: preview environment per policy PR + promotion to production.
- Hard: unify policy editor + simulator + audit stream into a “policy control plane” inside our admin.

### Thin-slice implementation (1–3 days)

- Day 1: emit decision logs for every protected action and include `reason` and `decision` fields.
- Day 2: build an “Audit → Decision Logs” view with filters (user/date/decision/tenant).
- Day 3: add “policy environments” concept (draft vs production) for approval/policy changes.

