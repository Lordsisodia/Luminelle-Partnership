# Evidence Extract — Splunk (HTTP Event Collector)

- slug: `splunk`
- category: log ingestion / SIEM (adjacent: external sink target)
- license: proprietary (enterprise)

## Cycle 5 — Evidence-backed primitives (HEC token ingestion)

### Notable features (3)

1) HTTP Event Collector (HEC) provides a token-based ingestion API  
Evidence: https://docs.splunk.com/Documentation/Splunk/latest/Data/UsetheHTTPEventCollector

2) Shared “ingest token” concept maps cleanly to “audit log export token” in an admin UX  
Evidence: https://docs.splunk.com/Documentation/Splunk/latest/Data/UsetheHTTPEventCollector

3) Event ingestion normalization: producers send JSON/events; platform indexes + searches (sink mental model)  
Evidence: https://docs.splunk.com/Documentation/Splunk/latest/Data/UsetheHTTPEventCollector

### Copyable workflows (2)

1) Set up export sink: generate HEC token → configure endpoint → test event delivery → monitor ingestion  
Evidence: https://docs.splunk.com/Documentation/Splunk/latest/Data/UsetheHTTPEventCollector

2) Incident review: query audit events → correlate with other logs → identify actor + affected objects  
Evidence (HEC is ingestion; queries are downstream, but this page establishes HEC as the ingestion primitive): https://docs.splunk.com/Documentation/Splunk/latest/Data/UsetheHTTPEventCollector

### 3 steal ideas (easy / medium / hard)

- Easy: export sink wizard with “send test event” + health status.
- Medium: delivery guarantees UX (last delivered, retries, dead letter queue summary).
- Hard: full SIEM query + correlation engine (out of scope).

### Thin-slice implementation (1–3 days)

- Day 1: “External sink” settings object (type=Splunk HEC, endpoint URL, token, enabled).
- Day 2: test delivery + health checks + retry policy (exponential backoff).
- Day 3: delivery logs page (per-sink delivery history + failures).

