# Evidence Extract — Svix App Portal (logs, replay, test events)

- slug: `svix-app-portal-ops-ux`
- category: embedded portal UX for endpoints + logs + replay/testing workflows
- license: docs/product (Svix)

## Cycle 18 — Evidence-backed primitives (operator UX + payload viewing policy)

### Notable features (3)

1) Logs are filterable by endpoint page and date filter presets (explicit UX affordance)  
Evidence: https://docs.svix.com/receiving/using-app-portal/filtering-logs

2) Replay supports both single resend and “replay all failed messages since time” recovery workflow  
Evidence: https://docs.svix.com/receiving/using-app-portal/replaying-messages

3) Testing tab can send example events and then view message payload + attempts (setup confidence loop)  
Evidence: https://docs.svix.com/receiving/using-app-portal/testing-events

### Copyable workflows (2)

1) Setup confidence loop: configure endpoint → send test event → inspect payload + attempts → iterate until healthy  
Evidence: https://docs.svix.com/receiving/using-app-portal/testing-events

2) Outage recovery loop: find failed messages → replay individual message or replay all failures since timestamp  
Evidence: https://docs.svix.com/receiving/using-app-portal/replaying-messages

### 3 steal ideas (easy / medium / hard)

- Easy: ship “endpoint-scoped logs” with built-in date presets (last 15m/1h/24h/7d).
- Medium: ship a recovery modal: “replay all failed since X” with confirmation + audit event.
- Hard: fully embedded “app portal” for end-customers (requires multi-tenant auth + branding + RBAC).

### Thin-slice implementation (1–3 days)

- Day 1: endpoint detail page includes delivery log list + date filter presets.
- Day 2: add test event sender and message detail drawer (payload + attempts).
- Day 3: add replay actions (single resend + replay-all-since) gated by RBAC/step-up + audit.

