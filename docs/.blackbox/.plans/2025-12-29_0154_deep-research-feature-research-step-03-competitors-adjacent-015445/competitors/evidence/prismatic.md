# Evidence Extract — Prismatic

- slug: `prismatic`
- category: embedded integrations platform + integration marketplace (SaaS)
- license: proprietary (SaaS)

## Cycle 3 — Evidence-backed primitives (embedded marketplace + connections + OAuth redirects + debugging)

### Notable features (3)

1) Embedded marketplace (customer-facing integration catalog UI)  
Evidence: https://prismatic.io/docs/embed/marketplace/

2) Connections as first-class concept (how integrations authenticate/connect)  
Evidence: https://prismatic.io/docs/integrations/connections/

3) Debugging surface for integration data sources (operability)  
Evidence: https://prismatic.io/docs/integrations/data-sources/debugging/

### Copyable workflows (2)

1) Customer integration marketplace workflow  
- Provide catalog UI → customer selects integration → config wizard / connection flow  
Evidence: https://prismatic.io/docs/instances/integration-marketplace/

2) Embedded OAuth posture (custom redirects)  
Evidence: https://prismatic.io/docs/integrations/connections/oauth2/custom-redirects/

### 3 steal ideas (easy / medium / hard)

- Easy: ship an “integration marketplace” page in admin (cards with connect/manage).
- Medium: add “connection types” (org-activated vs customer-activated) and reflect this in UI and permissions.
- Hard: full embedded integration platform breadth (connector ecosystem + lifecycle + runtime).

### Thin-slice implementation (1–3 days)

- Day 1: integration marketplace UI (catalog + connect CTA + status).
- Day 2: connection model with ownership modes (org-managed vs merchant-managed) + custom redirect handling for OAuth.
- Day 3: debugging panel per integration (request/response logs, last error, retry + “test connection”).

