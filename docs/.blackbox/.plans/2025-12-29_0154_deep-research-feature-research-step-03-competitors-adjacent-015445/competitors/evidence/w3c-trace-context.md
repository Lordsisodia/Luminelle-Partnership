# Evidence Extract — W3C Trace Context (traceparent + tracestate)

- slug: `w3c-trace-context`
- category: correlation IDs / distributed tracing context propagation standard
- license: W3C spec (standard; use as pattern reference)

## Cycle 21 — Evidence-backed primitives (correlation + trace linking)

### Notable features (3)

1) Standardizes the `traceparent` HTTP header for propagating trace context across services  
Evidence: https://www.w3.org/TR/trace-context/

2) Standardizes the `tracestate` HTTP header for vendor-specific trace context propagation alongside `traceparent`  
Evidence: https://www.w3.org/TR/trace-context/

3) Provides a stable, versioned header format so traces can be correlated across heterogeneous systems  
Evidence: https://www.w3.org/TR/trace-context/

### Copyable workflows (2)

1) End-to-end correlation: propagate `traceparent` from admin request → background jobs → webhook delivery attempt → observability trace link in UI  
Evidence: W3C trace context header propagation concept: https://www.w3.org/TR/trace-context/

2) Audit correlation: include trace-id (or a derived correlation id) in audit events so incidents can be stitched into a timeline across logs and deliveries  
Evidence: W3C trace context header fields enable cross-service correlation: https://www.w3.org/TR/trace-context/

### 3 steal ideas (easy / medium / hard)

- Easy: store trace-id (or traceparent) on delivery attempts and audit events; expose “copy correlation ID” in UI.
- Medium: enforce trace context propagation through async boundaries (jobs, queues, retries) for consistent timelines.
- Hard: allow customer-provided trace context headers for inbound webhook triggers and preserve them safely (needs threat modeling).

### Thin-slice implementation (1–3 days)

- Day 1: propagate trace context in internal services and persist `trace_id` on `delivery_attempts`.
- Day 2: surface trace links from deliveries UI and include trace-id in audit log entries.
- Day 3: add a correlation search box (“find everything related to this trace-id / request-id”).

