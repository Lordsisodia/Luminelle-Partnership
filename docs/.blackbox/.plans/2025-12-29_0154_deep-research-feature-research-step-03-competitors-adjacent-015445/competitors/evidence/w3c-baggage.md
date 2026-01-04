# Evidence Extract — W3C Baggage (context key-value propagation)

- slug: `w3c-baggage`
- category: key-value context propagation standard (cross-cutting metadata)
- license: W3C spec (standard; use as pattern reference)

## Cycle 21 — Evidence-backed primitives (allowlisted metadata propagation)

### Notable features (3)

1) Standardizes the `baggage` HTTP header for propagating key-value pairs across service boundaries  
Evidence: https://www.w3.org/TR/baggage/

2) Enables cross-cutting context propagation (useful for debugging and routing) without coupling to any single vendor format  
Evidence: https://www.w3.org/TR/baggage/

3) Offers a foundation for controlled “custom attributes” patterns (but requires governance to avoid PII leakage and header bloat)  
Evidence: https://www.w3.org/TR/baggage/

### Copyable workflows (2)

1) Allowlisted baggage keys: propagate `tenant_id`, `environment`, `integration_id` across internal services to improve logs/traces and reduce support toil  
Evidence: Baggage as key-value propagation mechanism: https://www.w3.org/TR/baggage/

2) Debug sessions: temporarily enable additional allowlisted baggage keys for a tenant to collect deeper telemetry during incident response  
Evidence: Baggage mechanism supports additional context propagation: https://www.w3.org/TR/baggage/

### 3 steal ideas (easy / medium / hard)

- Easy: adopt an allowlist of “safe baggage keys” for internal correlation (never include PII).
- Medium: admin controls for enabling/disabling baggage keys per tenant/environment with audit logging.
- Hard: customer-controlled baggage injection safely (strong validation, size limits, threat model).

### Thin-slice implementation (1–3 days)

- Day 1: define allowed context keys + size limits; block/strip unknown keys.
- Day 2: wire allowed keys into tracing/logging context and persist to delivery attempts.
- Day 3: add admin UI toggles (internal-only) with audit entries for changes.

