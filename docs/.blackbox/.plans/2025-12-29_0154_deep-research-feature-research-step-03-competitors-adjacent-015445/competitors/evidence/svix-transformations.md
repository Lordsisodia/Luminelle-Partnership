# Evidence Extract — Svix (Transformations)

- slug: `svix-transformations`
- category: in-flight payload transformation (customer-defined JavaScript) + endpoint-level customization
- license: docs/product (Svix); not OSS feature itself

## Cycle 17 — Evidence-backed primitives (redaction via transformations + endpoint customization)

### Notable features (3)

1) “Transformations” allow modifying webhook properties in-flight, including body payload  
Evidence: https://docs.svix.com/transformations

2) Customer-authored JavaScript per endpoint (end-customer controllable; powerful but needs guardrails)  
Evidence: https://docs.svix.com/transformations

3) Transformations can modify HTTP method, target URL, and body payload (explicitly listed)  
Evidence: https://docs.svix.com/transformations

### Copyable workflows (2)

1) Payload shaping workflow: customer writes transform → preview/test → apply to endpoint → verify delivery behavior  
Evidence: transformations overview: https://docs.svix.com/transformations

2) Redaction workflow: strip or rewrite sensitive fields (PII) before delivering to the receiver (safer than “store everything forever”)  
Evidence: transformations modify body payload: https://docs.svix.com/transformations

### 3 steal ideas (easy / medium / hard)

- Easy: support server-side “transform templates” controlled by us (e.g., remove `customer.email`, `card.last4`) without exposing arbitrary JS.
- Medium: expose a limited transformation DSL (allowlist of operations) so customers can redact/reshape payload safely.
- Hard: arbitrary user-defined JS transforms (needs sandboxing, timeouts, memory caps, audit logs, and approval gating).

### Thin-slice implementation (1–3 days)

- Day 1: add a payload “redaction profile” object per endpoint (field allowlist/denylist) and apply it before delivery.
- Day 2: add preview UI: show original payload → redacted payload diff.
- Day 3: add audit events for redaction profile changes + approvals for enabling redaction profiles in prod.

