# Evidence Extract — RudderStack (Tracking Plans)

- slug: `rudderstack-tracking-plans`
- category: event taxonomy / tracking plan governance
- license: AGPL-3.0 (rudder-server) — restrictive (flagged)

## Cycle 14 — Evidence-backed primitives (event schema governance + enforcement)

### Notable features (3)

1) Tracking Plans product surface exists (govern event names + properties)  
Evidence: https://www.rudderstack.com/docs/profiles/tracking-plans/

2) Tracking Plans include “tracking plan version” in the UI flow (implies versioned taxonomy)  
Evidence: https://www.rudderstack.com/docs/profiles/tracking-plans/

3) Positioning: event governance as a first-class system (reduces analytics/audit drift)  
Evidence: https://www.rudderstack.com/docs/profiles/tracking-plans/

### Copyable workflows (2)

1) Define tracking plan → publish → validate incoming events against the plan → reject/flag invalid events  
Evidence: tracking plans docs: https://www.rudderstack.com/docs/profiles/tracking-plans/

2) Versioned taxonomy workflow: update plan → bump version → migrate producers → monitor compliance over time  
Evidence: tracking plans docs: https://www.rudderstack.com/docs/profiles/tracking-plans/

### 3 steal ideas (easy / medium / hard)

- Easy: define a first-class “event taxonomy” for audit + automation events in our admin and show it in documentation/UI.
- Medium: enforce schema validation on outbound audit/event exports (so events stay predictable for customers).
- Hard: implement a full tracking-plan lifecycle with versioned schema registry + diff + migration tooling.

### Thin-slice implementation (1–3 days)

- Day 1: define an “audit event schema registry” (JSON Schema per event type) for 5 event types.
- Day 2: add server-side validation for event emission (log + drop on invalid in non-prod; warn in prod).
- Day 3: add an admin page that lists event types, required fields, and sample payloads (reduces support friction).

## License evidence

- AGPL-3.0: https://raw.githubusercontent.com/rudderlabs/rudder-server/master/LICENSE

