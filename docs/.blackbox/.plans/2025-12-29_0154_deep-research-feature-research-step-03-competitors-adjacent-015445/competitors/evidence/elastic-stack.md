# Evidence Extract — Elastic Stack (Kibana/Elasticsearch)

- slug: `elastic-stack`
- category: search/log analytics platform (adjacent: audit events taxonomy + audit logging)
- license: mixed / restrictive (AGPLv3/SSPL/Elastic License 2.0 per Kibana repo LICENSE); flag as complex

## Cycle 5 — Evidence-backed primitives (audit events taxonomy)

### Notable features (3)

1) Kibana audit events provide an explicit event taxonomy (great model for naming + fields)  
Evidence: https://www.elastic.co/docs/reference/kibana/kibana-audit-events

2) Elasticsearch audit events extend taxonomy to server-side actions (useful for system events)  
Evidence: https://www.elastic.co/docs/reference/elasticsearch/elasticsearch-audit-events

3) OSS license posture is complex/restrictive; treat as a pattern reference unless legal approves  
Evidence (license text): https://raw.githubusercontent.com/elastic/kibana/main/LICENSE.txt

### Copyable workflows (2)

1) Define audit event names + payload schema → log consistently → build filters/search around stable fields  
Evidence: https://www.elastic.co/docs/reference/kibana/kibana-audit-events

2) Build “event taxonomy first” then wire exports: consistent event names make export and SIEM mapping easier  
Evidence: https://www.elastic.co/docs/reference/elasticsearch/elasticsearch-audit-events

### 3 steal ideas (easy / medium / hard)

- Easy: adopt a documented audit event taxonomy (event types, outcomes, targets) to avoid ad-hoc logs.
- Medium: build export mapping presets for common sinks (Splunk/Datadog) based on event taxonomy.
- Hard: ship a full Elastic stack or embed it (license complexity + operational burden).

### Thin-slice implementation (1–3 days)

- Day 1: publish “Audit Event Types” doc in-app (stable names + fields).
- Day 2: make UI filters driven by taxonomy (actor/action/outcome/target).
- Day 3: add export presets (webhook + Splunk HEC) that reference the taxonomy.

## License evidence

- Kibana repository license mix (AGPLv3/SSPL/ELv2): https://raw.githubusercontent.com/elastic/kibana/main/LICENSE.txt

