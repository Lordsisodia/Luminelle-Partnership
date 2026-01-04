# Evidence Extract — Svix OpenTelemetry Streaming

- slug: `svix-opentelemetry-streaming`
- category: delivery telemetry / observability export (webhook attempts as traces)
- license: proprietary feature (Svix product). Note: Svix OSS server exists separately (MIT), but this specific “OpenTelemetry streaming” feature is described as Enterprise-tier.

## Cycle 20 — Evidence-backed primitives (delivery attempt telemetry as traces)

### Notable features (3)

1) Models webhook delivery attempts as nested spans: outer `message_attempt` span with an inner `http_attempt` span  
Evidence: https://docs.svix.com/opentelemetry-streaming

2) Includes a concrete attribute taxonomy on spans (org/app/endpoint/message IDs, event type, attempt count, status) and HTTP response status code on the inner span  
Evidence: https://docs.svix.com/opentelemetry-streaming

3) Allows adding custom attributes onto spans via request parameters (`otel.custom-*`) and per-event attributes via `transformationsParams.otel`  
Evidence: https://docs.svix.com/opentelemetry-streaming

### Copyable workflows (2)

1) Export delivery telemetry to a customer’s existing observability tooling: webhook delivery emits spans → customer dashboards by endpoint/event type/status  
Evidence: https://docs.svix.com/opentelemetry-streaming

2) Add tenant/app-specific attributes at export-time so the same telemetry stream can be sliced by tenant/environment/integration  
Evidence: https://docs.svix.com/opentelemetry-streaming

### 3 steal ideas (easy / medium / hard)

- Easy: represent each delivery attempt as a trace/span pair with stable IDs so support can jump from “delivery log row” → “trace view”.
- Medium: a controlled “custom attributes” system for delivery telemetry (allowlist keys; prevent PII; per-tenant defaults).
- Hard: customer-configurable OTel export (collector endpoint, sampling controls, per-event attribute injection, RBAC + audit).

### Thin-slice implementation (1–3 days)

- Day 1: instrument internal deliveries with spans: `delivery_attempt` (outer) + `http_attempt` (inner); propagate `delivery_attempt_id` and `event_type`.
- Day 2: add a “telemetry export” toggle per tenant/integration; ship spans to our own collector and expose a basic “trace viewer” link from delivery logs.
- Day 3: add a minimal custom-attribute allowlist (e.g., `tenant_id`, `environment`, `integration_id`) + audit events when config changes.

