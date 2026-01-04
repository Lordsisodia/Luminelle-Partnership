# Evidence Extract — Hookdeck (Issues API surface)

- slug: `hookdeck-issues-api`
- category: ops object model with API endpoints (issues lifecycle)
- license: proprietary docs/service (Hookdeck)

## Cycle 19 — Evidence-backed primitives (issues as a first-class API object)

### Notable features (3)

1) Issues can be listed via API (`GET /issues`)  
Evidence: https://hookdeck.com/docs/issues.md

2) Issues can be retrieved and updated/dismissed (`GET /issues/:id`, `PUT /issues/:id`, `DELETE /issues/:id`)  
Evidence: https://hookdeck.com/docs/issues.md

3) Notifications/webhooks toggles exist as an API surface (`PUT /notifications/webhooks`)  
Evidence: https://hookdeck.com/docs/issues.md

### Copyable workflows (2)

1) Programmatic ops: list issues → update status (ignored/resolved) → bulk retry from UI to recover  
Evidence: issues docs + API endpoint references: https://hookdeck.com/docs/issues.md

2) Notifications lifecycle: configure notifications → choose triggers/topics → receive alerts when issues change  
Evidence: https://hookdeck.com/docs/issues.md

### 3 steal ideas (easy / medium / hard)

- Easy: model “issue” as an API object in our system (not just a UI filter).
- Medium: expose status transitions + mute/ignore via API (governed; reduces alert fatigue).
- Hard: externalize notifications config into an API and allow routing by topic/destination.

### Thin-slice implementation (1–3 days)

- Day 1: implement `issues` table + basic grouping + list UI.
- Day 2: implement `PATCH issue`/`dismiss issue` endpoints + audit events.
- Day 3: implement notification preferences (email) and add a safe payload snippet policy.

