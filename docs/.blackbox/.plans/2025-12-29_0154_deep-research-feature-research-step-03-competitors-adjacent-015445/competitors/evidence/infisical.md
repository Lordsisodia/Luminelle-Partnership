# Evidence Extract — Infisical

- slug: `infisical`
- category: secrets management + access controls + audit logs (adjacent: credential governance primitives)
- license: MIT outside `ee/` (per repository LICENSE)

## Cycle 4 — Evidence-backed primitives (RBAC + audit logs + token lifecycle)

### Notable features (3)

1) Audit logs as a first-class platform surface  
Evidence: https://infisical.com/docs/documentation/platform/audit-logs

2) Access controls / RBAC-style permissions for governing who can change secrets/config  
Evidence: https://infisical.com/docs/documentation/platform/access-controls

3) OSS license posture is permissive *outside* enterprise directories (useful as reference + potential adoption, pending scope)  
Evidence: https://raw.githubusercontent.com/Infisical/infisical/main/LICENSE

### Copyable workflows (2)

1) Sensitive change governance: update secret/config → emit immutable audit entry → review in audit log  
Evidence (audit logs): https://infisical.com/docs/documentation/platform/audit-logs

2) Admin access delegation: invite/administer members → assign access controls → reduce blast radius of credential changes  
Evidence (access controls): https://infisical.com/docs/documentation/platform/access-controls

### 3 steal ideas (easy / medium / hard)

- Easy: “Credential change = audit event” with a dedicated audit log view scoped to integrations/credentials.
- Medium: role templates for credential management (view-only, connect, rotate, revoke) inspired by access controls primitives.
- Hard: build/operate a full secrets platform (multi-env config, agents, secret injection) vs keep an “integration credentials vault” thin.

### Thin-slice implementation (1–3 days)

- Day 1: add `credentials` object (provider, masked label, created_by, last_rotated_at) + audit log events for create/update/delete.
- Day 2: add roles for credentials (read / connect / rotate / revoke) and enforce in UI + API.
- Day 3: export/filter audit log (by integration, actor, time window) for support + security review.

## License evidence

- MIT outside `ee/`: https://raw.githubusercontent.com/Infisical/infisical/main/LICENSE

