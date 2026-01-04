# Evidence Extract — OpenTelemetry Semantic Conventions (Feature Flags)

- slug: `opentelemetry-semconv-feature-flags`
- category: observability standards for feature flag evaluation events
- license: Apache-2.0

## Cycle 14 — Evidence-backed primitives (flag/exposure telemetry + audit export alignment)

### Notable features (3)

1) A documented semantic convention exists specifically for feature flag evaluation attributes (standardized fields)  
Evidence: https://opentelemetry.io/docs/specs/semconv/feature-flags/feature-flags-logs/

2) Feature flag semantics are defined as log records (ties cleanly into “audit/event logs” concept)  
Evidence: https://opentelemetry.io/docs/specs/semconv/feature-flags/feature-flags-logs/

3) The semantic conventions live in a versioned spec (stable-ish contract for analytics/audit pipelines)  
Evidence: https://github.com/open-telemetry/semantic-conventions

### Copyable workflows (2)

1) Emit standardized flag evaluation logs from backend/admin services → route via OpenTelemetry Collector → export to sinks (Datadog/Splunk/Elastic)  
Evidence: feature flag log semconv: https://opentelemetry.io/docs/specs/semconv/feature-flags/feature-flags-logs/

2) Make “exposure logging” a default hook: any flag evaluation emits an event with consistent attributes (tenant, actor, flag key, variant, reason)  
Evidence: spec reference: https://opentelemetry.io/docs/specs/semconv/feature-flags/feature-flags-logs/

### 3 steal ideas (easy / medium / hard)

- Easy: define our audit event schema to be compatible with OTel semconv fields where possible (future-proof exports).
- Medium: enforce “no flag evaluation without context” by requiring tenant/actor identifiers (so audits/experiments are attributable).
- Hard: unify experimentation exposure events + security audit events under the same ingestion/export pipeline (single event router).

### Thin-slice implementation (1–3 days)

- Day 1: define `flag_evaluated` event schema aligned to OTel semconv (minimum set).
- Day 2: implement emission from our flag evaluation layer (hook) + store locally for admin debugging.
- Day 3: add exporter integration (OTel Collector or direct sink) for enterprise audit/observability.

## License evidence

- Apache-2.0: https://raw.githubusercontent.com/open-telemetry/semantic-conventions/main/LICENSE

