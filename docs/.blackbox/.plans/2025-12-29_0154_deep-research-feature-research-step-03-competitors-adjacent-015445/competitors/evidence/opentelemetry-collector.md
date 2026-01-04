# Evidence Extract — OpenTelemetry Collector

- slug: `opentelemetry-collector`
- category: observability pipeline (receive → process → export)
- license: Apache-2.0 (permissive)

## Cycle 5 — Evidence-backed primitives (vendor-agnostic pipeline)

### Notable features (3)

1) Collector exists to receive, process, and export telemetry (pipeline mental model)  
Evidence: https://opentelemetry.io/docs/collector/

2) Vendor-agnostic “processor” stage suggests how to implement redaction/enrichment before export  
Evidence (high-level collector description): https://opentelemetry.io/docs/collector/

3) “Exporters” abstraction maps cleanly to a productized “audit event export sinks” list  
Evidence: https://opentelemetry.io/docs/collector/

### Copyable workflows (2)

1) Export pipeline: receive audit events → apply processors → export to multiple sinks  
Evidence: https://opentelemetry.io/docs/collector/

2) Gradual rollout: add a new exporter → shadow export → validate → enable fully  
Evidence (collector used as configurable pipeline; this page establishes the concept): https://opentelemetry.io/docs/collector/

### 3 steal ideas (easy / medium / hard)

- Easy: describe our export system as “receivers / processors / exporters” in both code and UI.
- Medium: allow multiple exporters with per-exporter health status.
- Hard: full OTEL collector embedding; consider as reference architecture rather than direct product feature.

### Thin-slice implementation (1–3 days)

- Day 1: implement a single “exporter” (webhook) for audit events.
- Day 2: add processors (redact PII fields, enrich with tenant metadata).
- Day 3: add a second exporter template (Splunk HEC-style endpoint + token).

## License evidence

- Apache-2.0 license: https://raw.githubusercontent.com/open-telemetry/opentelemetry-collector/main/LICENSE

