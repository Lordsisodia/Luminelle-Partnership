# Evidence Extract — Svix (Event Type Schema + Event Catalog)

- slug: `svix-event-type-schema-event-catalog`
- category: event taxonomy + schema registry + example payloads in an embedded portal
- license: docs/product (Svix)

## Cycle 19 — Evidence-backed primitives (schema registry + examples + grouping)

### Notable features (3)

1) Event types should be dot-delimited and Svix groups them visually in App Portal UI  
Evidence: https://docs.svix.com/tutorials/event-type-schema

2) Event types can have JSON Schema (Draft 7) provided via code tab (schema registry concept)  
Evidence: https://docs.svix.com/tutorials/event-type-schema

3) Event Catalog shows event definition (payload shape) + example payload for each event type  
Evidence: https://docs.svix.com/receiving/using-app-portal/event-catalog

### Copyable workflows (2)

1) Define event type → attach schema → preview schema and example payload → publish in Event Catalog  
Evidence: https://docs.svix.com/tutorials/event-type-schema

2) Consumer self-serve: browse event catalog → view schema + example payload → build receiver confidently  
Evidence: https://docs.svix.com/receiving/using-app-portal/event-catalog

### 3 steal ideas (easy / medium / hard)

- Easy: maintain an event taxonomy with dot-delimited groups (`orders.created`, `payouts.updated`) and render as a tree in admin.
- Medium: ship JSON Schema for each event type and generate example payloads from schema (or allow curated examples).
- Hard: make schemas versioned with migration tooling and backwards-compat guarantees (requires governance + approvals).

### Thin-slice implementation (1–3 days)

- Day 1: create `event_types` registry table (key, description, group, status).
- Day 2: add optional JSON Schema per event type + example payload field.
- Day 3: expose “Event Catalog” UI: schema + example + “subscribe” toggles + link to test event sender.

