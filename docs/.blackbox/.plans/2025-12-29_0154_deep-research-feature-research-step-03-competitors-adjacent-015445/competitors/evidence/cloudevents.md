# Evidence Extract — CloudEvents (CNCF)

- slug: `cloudevents`
- category: event envelope standard (audit/event export interoperability)
- license: Apache-2.0

## Cycle 14 — Evidence-backed primitives (event envelopes for audit + automation)

### Notable features (3)

1) Defines a standard event envelope (metadata + data) for interoperable event delivery  
Evidence: https://cloudevents.io/

2) Clear spec and documented core attributes (`id`, `source`, `type`, etc.) for event routing and correlation  
Evidence: https://github.com/cloudevents/spec/blob/main/cloudevents/spec.md

3) Ecosystem positioning: vendor-neutral standard for events (useful for “audit log export as event stream”)  
Evidence: https://cloudevents.io/

### Copyable workflows (2)

1) Audit events as CloudEvents: emit `type=lumelle.audit.*` with stable `source` per service and attach event payload in `data` → ship to webhook/queue/sink  
Evidence: CloudEvents spec: https://github.com/cloudevents/spec/blob/main/cloudevents/spec.md

2) Automation triggers as CloudEvents: emit `type=lumelle.order.refunded` → external systems subscribe and trigger workflows (with consistent metadata/correlation IDs)  
Evidence: CloudEvents spec: https://github.com/cloudevents/spec/blob/main/cloudevents/spec.md

### 3 steal ideas (easy / medium / hard)

- Easy: standardize our outbound event exports on CloudEvents to make integrations easier to build.
- Medium: define a stable `type` taxonomy and versioning scheme (`lumelle.audit.v1.*`) for backwards compatibility.
- Hard: build an “event schema registry” and validation pipeline for all emitted CloudEvents (prevents breaking changes).

### Thin-slice implementation (1–3 days)

- Day 1: define a CloudEvents JSON format for 5 core audit events (who/what/when/tenant).
- Day 2: implement a webhook exporter that sends CloudEvents with retries + signing.
- Day 3: add an admin “event deliveries” log (delivery attempts, response codes, retries, disable on failures).

## License evidence

- Apache-2.0: https://raw.githubusercontent.com/cloudevents/spec/main/LICENSE

