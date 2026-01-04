# Evidence Extract — OpenTelemetry Collector Contrib (Attributes + Transform processors for redaction)

- slug: `otel-collector-redaction`
- category: event/log redaction primitives for pipelines (delete/hash/replace/truncate)
- license: Apache-2.0

## Cycle 17 — Evidence-backed primitives (redaction/masking as a pipeline stage)

### Notable features (3)

1) Attributes processor supports `delete` and `hash` actions (explicit)  
Evidence: https://raw.githubusercontent.com/open-telemetry/opentelemetry-collector-contrib/main/processor/attributesprocessor/README.md

2) Attributes processor docs explicitly mention “redacting sensitive information” as a use case  
Evidence: https://raw.githubusercontent.com/open-telemetry/opentelemetry-collector-contrib/main/processor/attributesprocessor/README.md

3) Transform processor supports rich rewrite operations, including `replace_pattern` and truncation and delete-key functions (useful for masking secrets/PII)  
Evidence: https://raw.githubusercontent.com/open-telemetry/opentelemetry-collector-contrib/main/processor/transformprocessor/README.md

### Copyable workflows (2)

1) Redaction-in-pipeline: ingest logs/events → delete sensitive keys → hash identifiers → export to sinks (SIEM/observability/audit export)  
Evidence: attributes processor actions: https://raw.githubusercontent.com/open-telemetry/opentelemetry-collector-contrib/main/processor/attributesprocessor/README.md

2) Pattern-based masking: replace secrets in strings (e.g., `password=...`) and truncate large fields before export/storage  
Evidence: transform processor examples: https://raw.githubusercontent.com/open-telemetry/opentelemetry-collector-contrib/main/processor/transformprocessor/README.md

### 3 steal ideas (easy / medium / hard)

- Easy: define a “redaction profile” as part of our audit/export pipeline config (delete/hash known keys).
- Medium: apply pattern-based replacement for secrets that appear in strings (regex replace) and truncate large payload fields.
- Hard: tenant-configurable redaction rules with previews and approvals (risk of breaking downstream processing).

### Thin-slice implementation (1–3 days)

- Day 1: define a fixed redaction profile that deletes/ hashes common sensitive fields (tokens, secrets, emails) for delivery logs exports.
- Day 2: add a preview endpoint (`/admin/redaction/preview`) that shows before/after for one event payload.
- Day 3: wire redaction profile into exports (CloudEvents + OTel semconv aligned) and add audit trails for redaction config changes.

## License evidence

- Apache-2.0: https://raw.githubusercontent.com/open-telemetry/opentelemetry-collector-contrib/main/LICENSE

