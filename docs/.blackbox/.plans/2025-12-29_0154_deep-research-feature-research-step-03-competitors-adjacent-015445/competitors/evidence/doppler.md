# Evidence Extract — Doppler

- slug: `doppler`
- category: secrets management SaaS (adjacent: service tokens + RBAC + activity logs)
- license: SaaS / proprietary (license not applicable as OSS)

## Cycle 4 — Evidence-backed primitives (service tokens + activity logs + custom roles)

### Notable features (3)

1) Service tokens as a credential primitive for environments/services  
Evidence: https://docs.doppler.com/docs/service-tokens

2) Activity logs as a first-class governance surface  
Evidence: https://docs.doppler.com/docs/activity-logs

3) Custom roles as an RBAC primitive (fine-grained admin delegation)  
Evidence: https://docs.doppler.com/docs/custom-roles

### Copyable workflows (2)

1) Issue credentials safely: create service token → scope it → distribute to service → rotate when needed  
Evidence (service tokens): https://docs.doppler.com/docs/service-tokens

2) Security review loop: filter activity logs → identify suspicious actions → revoke/rotate tokens  
Evidence (activity logs): https://docs.doppler.com/docs/activity-logs

### 3 steal ideas (easy / medium / hard)

- Easy: “service token” UX patterns (name, scope, show-once secret, last used, rotate/revoke).
- Medium: custom roles for credential workflows (connect/rotate/revoke) rather than broad “admin”.
- Hard: full secrets management parity (multi-env injection, agents, CLI tooling) — likely out of scope for ecommerce admin.

### Thin-slice implementation (1–3 days)

- Day 1: “Integration API keys” object + show-once token creation + revoke.
- Day 2: activity log stream for integration/credential events + filters (actor, integration, action).
- Day 3: role templates for credential management + optional approval gate for rotate/revoke.

