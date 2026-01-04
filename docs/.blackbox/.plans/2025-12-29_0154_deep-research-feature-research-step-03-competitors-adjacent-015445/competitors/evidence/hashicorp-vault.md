# Evidence Extract — HashiCorp Vault

- slug: `hashicorp-vault`
- category: secrets management + policy + audit primitives (adjacent: credential governance / security)
- license: Business Source License (BUSL) — restrictive for embedding/hosting competitive offerings

## Cycle 4 — Evidence-backed primitives (audit devices + policies + tokens + leases)

### Notable features (3)

1) Audit devices (audit trail) as a first-class configurable primitive  
Evidence: https://developer.hashicorp.com/vault/docs/audit

2) Policy-based access control (RBAC-like governance primitive)  
Evidence: https://developer.hashicorp.com/vault/docs/concepts/policies

3) Token lifecycle + lease/TTL concepts (expiring credentials as a platform primitive)  
Evidence (tokens): https://developer.hashicorp.com/vault/docs/concepts/tokens  
Evidence (leases): https://developer.hashicorp.com/vault/docs/concepts/lease

### Copyable workflows (2)

1) Forensics-ready governance: enable audit → send audit output to external sink → investigate “who changed what”  
Evidence: https://developer.hashicorp.com/vault/docs/audit

2) Reduce blast radius with expiry: issue scoped token → require renewal/rotation → revoke on suspicion  
Evidence (tokens): https://developer.hashicorp.com/vault/docs/concepts/tokens  
Evidence (leases): https://developer.hashicorp.com/vault/docs/concepts/lease

### 3 steal ideas (easy / medium / hard)

- Easy: “audit sinks” as an integration primitive (file/webhook/log streaming) for credential and integration events.
- Medium: TTL/expiry UX: show “expires at” + renewal/rotation workflows for tokens/credentials.
- Hard: dynamic secrets with leases (issue ephemeral provider credentials per job) — heavy but high leverage if you do lots of third-party access.

### Thin-slice implementation (1–3 days)

- Day 1: audit log pipeline + sinks (store internally + optional external forwarder) for credential/connection actions.
- Day 2: token lifecycle UI: issue/revoke + expiry timestamps + “rotate now” action.
- Day 3: simple “lease” concept for integration credentials (auto-expire + reminders) without full dynamic secrets.

## License evidence

- BUSL license text: https://raw.githubusercontent.com/hashicorp/vault/main/LICENSE

