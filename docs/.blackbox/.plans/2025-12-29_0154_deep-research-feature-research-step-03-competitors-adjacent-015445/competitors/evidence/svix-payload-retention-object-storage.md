# Evidence Extract — Svix (Payload Retention + Object Storage)

- slug: `svix-payload-retention-object-storage`
- category: webhook compliance controls (retention) + alternative delivery targets (object storage)
- license: docs/product (Svix); OSS server is MIT separately

## Cycle 16 — Evidence-backed primitives (retention, deletion, object storage)

### Notable features (3)

1) Payload retention is explicit and time-bounded (90 days)  
Evidence: https://docs.svix.com/retention

2) Enterprise control: optionally delete payloads on successful delivery (or at retention expiry), with explicit warning about debugging/redrive tradeoffs  
Evidence: https://docs.svix.com/retention

3) “Object Storage” is an endpoint type: send messages directly to S3/GCS/Azure Blob Storage (non-HTTP webhook delivery target)  
Evidence: https://docs.svix.com/advanced-endpoints/object-storage

### Copyable workflows (2)

1) Compliance-first retention workflow: set retention period → optionally delete on success → accept reduced ability to redrive/debug (explicit UX warning)  
Evidence: https://docs.svix.com/retention

2) High-payload / regulated workflow: deliver payloads to object storage instead of pushing them over webhooks (reduce receiver complexity + control data residency)  
Evidence: https://docs.svix.com/advanced-endpoints/object-storage

### 3 steal ideas (easy / medium / hard)

- Easy: add a retention policy control to our “webhook deliveries” feature (retention days + who can change it + audit).
- Medium: add a “delete payloads on success” option *with a product warning* about breaking redrive/support workflows.  
  Evidence: warning rationale in retention doc: https://docs.svix.com/retention
- Hard: support alternative delivery targets like object storage (S3/GCS/Azure) for high-throughput or sensitive event payloads.

### Thin-slice implementation (1–3 days)

- Day 1: implement payload retention window for delivery log payloads (e.g., 7/14/30/90) + hard delete job + audit events.
- Day 2: add a toggle for “delete payload on success” + UI warning + require approvals for enabling in prod.
- Day 3: add “object storage export” as a second delivery target type for one event stream (batch write JSONL).

