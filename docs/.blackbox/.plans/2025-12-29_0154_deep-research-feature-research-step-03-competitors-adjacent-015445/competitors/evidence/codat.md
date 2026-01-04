# Evidence Extract — Codat

- slug: `codat`
- category: unified APIs (accounting/commerce/etc) + embedded link flow (SaaS)
- license: proprietary (SaaS)

## Cycle 3 — Evidence-backed primitives (authorization flow + connections + sync monitoring + webhooks)

### Notable features (3)

1) Authorization flow as a documented first-class product surface  
Evidence: https://docs.codat.io/auth-flow/overview

2) “Connections” as a first-class concept (foundation for status-driven UX)  
Evidence: https://docs.codat.io/core-concepts/connections

3) Monitoring a sync (explicit observability surface)  
Evidence: https://docs.codat.io/commerce/learn/monitoring-a-sync

### Copyable workflows (2)

1) Merchant linking flow (embedded link authorization)  
Evidence: https://docs.codat.io/auth-flow/authorize-embedded-link

2) Operate integrations via sync monitoring + webhooks  
Evidence (monitor sync): https://docs.codat.io/commerce/learn/monitoring-a-sync  
Evidence (webhooks): https://docs.codat.io/using-the-api/webhooks/overview

### 3 steal ideas (easy / medium / hard)

- Easy: model “connections” with clear status badges and “reauthorize” CTA.
- Medium: add a “sync monitor” view per integration (last run, status, error, next scheduled).
- Hard: deliver unified APIs across multiple categories (Codat’s moat); emulate only the admin UX patterns.

### Thin-slice implementation (1–3 days)

- Day 1: “Integrations” page → “Connections” tab: list connections with status and connect/reauthorize actions.
- Day 2: “Sync monitor” subpage: last sync status, last success, last failure reason, retry action.
- Day 3: webhook subscription UI for internal systems (events routing) + replay/resend toggle (if supported).

