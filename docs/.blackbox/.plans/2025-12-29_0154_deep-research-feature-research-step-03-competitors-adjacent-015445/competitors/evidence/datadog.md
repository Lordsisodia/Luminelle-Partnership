# Evidence Extract — Datadog

- slug: `datadog`
- category: observability / logs pipelines + archives (adjacent: audit export primitives)
- license: proprietary SaaS

## Cycle 5 — Evidence-backed primitives (pipelines + archives)

### Notable features (3)

1) Log processing pipelines (transform/enrich/redact before routing/storage)  
Evidence: https://docs.datadoghq.com/logs/log_configuration/pipelines/

2) Log archives for retention / compliance patterns  
Evidence: https://docs.datadoghq.com/logs/log_configuration/archives/

3) “Process then route” mental model: central pipeline control plane separate from log producers  
Evidence (pipelines concept): https://docs.datadoghq.com/logs/log_configuration/pipelines/

### Copyable workflows (2)

1) PII hygiene: ingest audit events → pipeline redaction/enrichment → store + export safely  
Evidence: https://docs.datadoghq.com/logs/log_configuration/pipelines/

2) Compliance retention: keep short retention in primary store → archive long-term elsewhere  
Evidence: https://docs.datadoghq.com/logs/log_configuration/archives/

### 3 steal ideas (easy / medium / hard)

- Easy: “export configuration” UI that shows sinks + retention + redaction status at a glance.
- Medium: build a pipeline step library for audit events (mask tokens, drop PII fields, add tenant metadata).
- Hard: full observability platform parity; keep only the “pipeline + archive + export” primitives.

### Thin-slice implementation (1–3 days)

- Day 1: audit event schema + internal store + filters (actor/target/action/outcome).
- Day 2: export pipeline “processors” (redact, enrich, drop fields) + external sink (webhook).
- Day 3: archive toggle (write-ahead to cheap storage) + retention policy UI.

