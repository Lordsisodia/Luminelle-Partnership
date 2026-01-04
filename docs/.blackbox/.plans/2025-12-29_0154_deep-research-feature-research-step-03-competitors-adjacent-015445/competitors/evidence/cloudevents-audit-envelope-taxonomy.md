# Evidence Extract — CloudEvents for Audit/Automation Exports (Envelope + Taxonomy)

- slug: `cloudevents-audit-envelope-taxonomy`
- category: event envelope standard (portable audit + automation exports)
- license: Apache-2.0 (spec)

## Cycle 20 — Evidence-backed primitives (portable event exports)

### Notable features (3)

1) Defines core context attributes for events (`specversion`, `id`, `source`, `type`) that enable routing + correlation across transports  
Evidence: https://raw.githubusercontent.com/cloudevents/spec/main/cloudevents/spec.md

2) Provides optional context attributes that fit “audit + automation” well (`subject`, `time`, `dataschema`, `datacontenttype`)  
Evidence: https://raw.githubusercontent.com/cloudevents/spec/main/cloudevents/spec.md

3) Specifies uniqueness guidance: producers ensure `source` + `id` uniqueness for distinct events; consumers may treat same pair as duplicates  
Evidence: https://raw.githubusercontent.com/cloudevents/spec/main/cloudevents/spec.md

### Copyable workflows (2)

1) Outbound audit stream: emit CloudEvents JSON for every sensitive admin action → deliver via webhook/queue → customer SIEM/warehouse consumes with stable envelope  
Evidence: CloudEvents core attributes and JSON/event format: https://raw.githubusercontent.com/cloudevents/spec/main/cloudevents/spec.md

2) Automation triggers: internal rule engine subscribes to `type=lumelle.*` → executes actions; external partners can do the same with consistent metadata (`id`, `source`, `subject`)  
Evidence: CloudEvents core attributes: https://raw.githubusercontent.com/cloudevents/spec/main/cloudevents/spec.md

### 3 steal ideas (easy / medium / hard)

- Easy: adopt CloudEvents JSON as the “export format” for webhooks and event-stream sinks.
- Medium: formalize `type` taxonomy with versions (`lumelle.audit.v1.*`, `lumelle.orders.v1.*`) + enforce change control.
- Hard: schema validation at the edge (reject broken events; measure schema drift; deprecations/migrations).

### Thin-slice implementation (1–3 days)

- Day 1: define 8–12 audit events with CloudEvents fields (`type`, `source`, `subject`, `id`, `time`) + minimal `data`.
- Day 2: emit events from admin actions (webhook endpoint changes + payload viewing + replays) with stable IDs and correlation.
- Day 3: add “Deliveries” + “Audit events” views: delivery attempts + CloudEvents export log with replay (admin-only).

## License evidence

- Apache-2.0: https://raw.githubusercontent.com/cloudevents/spec/main/LICENSE

