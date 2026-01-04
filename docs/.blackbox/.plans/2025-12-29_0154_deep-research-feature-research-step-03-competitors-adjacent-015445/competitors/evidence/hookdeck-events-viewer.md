# Evidence Extract — Hookdeck (Events Viewer + Custom Columns)

- slug: `hookdeck-events-viewer`
- category: deliveries/event viewer UX primitives (inspect request/response + searchable fields)
- license: proprietary docs/service (Hookdeck)

## Cycle 17 — Evidence-backed primitives (delivery viewer UX + “store less / show what matters”)

### Notable features (3)

1) Inspect an event shows request headers/path/query/body and attempt response data (plain text or JSON)  
Evidence: https://hookdeck.com/docs/events.md

2) Custom columns let you display specific payload fields directly in the event list (focus on high-signal fields)  
Evidence: https://hookdeck.com/docs/events.md

3) Filtering constraints are acknowledged for large payloads (“request property filtering not supported” over size threshold)  
Evidence: https://hookdeck.com/docs/events.md

### Copyable workflows (2)

1) Operator workflow: filter events → click into an event → inspect latest attempt response → retry or debug  
Evidence: event inspection + retry linkage: https://hookdeck.com/docs/events.md

2) “Show only the important parts” workflow: add custom columns for selected fields → save view → share with ops team  
Evidence: custom columns + views: https://hookdeck.com/docs/events.md

### 3 steal ideas (easy / medium / hard)

- Easy: support “custom columns” in our deliveries table so users don’t need full payload access for triage.
- Medium: build a “safe payload viewer” with redaction + role-based access and show a stable metadata summary by default.
- Hard: build a full query DSL for searching inside payloads at scale (requires indexing + privacy safeguards).

### Thin-slice implementation (1–3 days)

- Day 1: delivery log list shows metadata only + allow adding “custom columns” from a known schema (event id, order id, integration id).
- Day 2: event detail drawer shows request/response payload in JSON, but behind RBAC/step-up and with redaction.
- Day 3: save views + share links for operators; add an audit record whenever payload viewing is performed.

