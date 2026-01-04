# Evidence Extract — Paragon

- slug: `paragon`
- category: embedded integrations platform (SaaS)
- license: proprietary (SaaS)

## Cycle 2 — Evidence-backed primitives (Connect Portal + monitoring + multi-account)

### Notable features (3)

1) Connect Portal overview (embedded UI surface for integrations)  
Evidence: https://docs.useparagon.com/connect-portal/overview

2) Connect Portal embedding workflow (“displaying the Connect Portal”)  
Evidence: https://docs.useparagon.com/getting-started/displaying-the-connect-portal

3) Monitoring via event logs (run history / debugging surface)  
Evidence: https://docs.useparagon.com/monitoring/event-logs

### Copyable workflows (2)

1) End-user connects an app (merchant connects Shopify/Klaviyo/etc) via embedded portal  
- Portal overview: https://docs.useparagon.com/connect-portal/overview  
- Display in product: https://docs.useparagon.com/getting-started/displaying-the-connect-portal

2) Multi-account connections (same user/tenant authorizes multiple accounts)  
Evidence: https://docs.useparagon.com/apis/api-reference/multi-account-authorization

### 3 steal ideas (easy / medium / hard)

- Easy: “Integration settings” page that looks like a portal/catalog (connect/reconnect/disconnect).
- Medium: support multi-account auth for some connectors (e.g., multiple storefronts / ad accounts) with clear labeling.
- Hard: full embedded integrations platform (connector breadth + monitoring depth + auth variants).

### Thin-slice implementation (1–3 days)

- Day 1: integration catalog UI + connection cards (status, last updated, connect/reconnect).
- Day 2: add “Event log” view for integration runs (filter by integration, show error taxonomy).
- Day 3: add multi-account support for one connector (storefront A + storefront B) + UI to pick active account per workflow.

