---
compaction: 0003
created_at: "2025-12-30 18:57"
range: "0020-0029"
max_bytes: 1048576
per_step_budget_bytes: 98304
---

# Compaction 0003 (0020–0029)

## ✅ Summary (fill this after compaction)

- Webhook delivery is a full platform primitive: signed payloads, retries/backoff, delivery logs, endpoint health, and redelivery tooling are essential for operational support.
- “Safe inspection” UX needs privacy-first defaults: metadata list views + redacted payload views + step-up auth for any raw payload access (if ever allowed).
- Event exports/audit logs become scalable when modeled as: (a) a governed event taxonomy (action catalog + schemas), (b) destination configs (typed schemas), (c) lifecycle state, and (d) cursor-paginated APIs.
- Cursor pagination patterns worth copying: opaque cursors + `Link: <...>; rel="next"` semantics (Okta) and bounded time-window queries (`since/until`) to keep exports operationally safe.
- “Streaming-only” or “export-only” event categories (GitHub audit log events) are an explicit product pattern: provide machine-readable fields and delivery destinations first, then build UI later if needed.

## 🧩 Patterns / heuristics (fill this after compaction)

- Prompt improvements: require a “destination schema object model” (types, required fields, validation flow) for every export/integration competitor.
- Checklist improvements: for every “delivery viewer” pattern, capture evidence for retention limits, redaction support, and replay/redelivery constraints.
- Better stop conditions: stop once 1–2 vendors provide concrete schema endpoints/config models + 1 vendor provides “stream-only events” gating, then move to implementation thin slices.

## Steps compacted (trimmed)

### 0020_checkpoint-cycle-15-webhook-delivery-primitives-svix-hookdeck-stripe-github.md

---
step: 0020
created_at: "2025-12-30 17:54"
title: "Checkpoint: Cycle 15 webhook delivery primitives (Svix/Hookdeck/Stripe/GitHub)"
---

# Step 0020: Checkpoint: Cycle 15 webhook delivery primitives (Svix/Hookdeck/Stripe/GitHub)

## ✅ What I did (facts)

- Picked Cycle 15 tranche focused on “webhook delivery platform primitives” (signing/verification, retries, redelivery, endpoint health, delivery logs) that we can transplant into our ecommerce admin.
- Collected evidence from:
  - Svix docs (retry schedule, webhook security, verification docs, Svix Play debugger).
  - Hookdeck docs (retries, destinations).
  - Stripe webhooks docs (webhook endpoints, signatures, best practices).
  - GitHub webhooks docs (handling deliveries, validating deliveries, redelivering webhooks).
- Created 4 evidence extracts and linked them into the matrix and sources:
  - `competitors/evidence/svix.md`
  - `competitors/evidence/hookdeck.md`
  - `competitors/evidence/stripe-webhooks.md`
  - `competitors/evidence/github-webhooks.md`
- Updated `artifacts/sources.md`, appended Cycle 15 entries to `artifacts/competitor-matrix.md`, and added Cycle 15 insights to `artifacts/summary.md`.

## 🧠 What I learned (new information)

- A dedicated webhook platform treats retries and schedules as first-class documentation and product surface (not an implementation detail).  
  Evidence: Svix retry schedule: https://docs.svix.com/retries/
- Good webhook security guidance includes *timestamps in the signature* and replay attack mitigation (and calls out HMAC-SHA256 as common).  
  Evidence: Svix security: https://docs.svix.com/security
- Mature platforms provide redelivery as an explicit debugging workflow; it’s required for supportability when receivers fail.  
  Evidence: GitHub redelivering webhooks: https://docs.github.com/en/webhooks/testing-and-troubleshooting-webhooks/redelivering-webhooks

## 🧭 What changes because of this

- Webhooks should be modeled as governed integration objects in admin (enabled/disabled, signing secret lifecycle, delivery logs, retries) instead of “just send HTTP POST”.
- Delivery logs + redeliver controls should be shipped early; otherwise support tickets become the “delivery UI”.
- Endpoint health (auto-disable after repeated failures) should integrate with approvals and step-up auth for safe re-enablement.

## ➡️ Next step

- If continuing Step-03: deepen “webhook deliveries UX” further (payload redaction, retention periods, replays, per-endpoint retry policies, signing key rotation with audit).
- Optional follow-on tranche: standardize our outbound signature scheme and publish receiver SDK snippets for common languages (best-practice baseline).
- Or hand off to Step-04 to map Cycle 15 patterns to OSS libraries/services (Svix OSS server under MIT; CloudEvents libraries; OTel exporters) with adoption plans.

## 🔗 Links / references

- Evidence notes: `competitors/evidence/svix.md`
- Evidence notes: `competitors/evidence/hookdeck.md`
- Evidence notes: `competitors/evidence/stripe-webhooks.md`
- Evidence notes: `competitors/evidence/github-webhooks.md`
- Sources ledger: `artifacts/sources.md`
- Matrix: `artifacts/competitor-matrix.md`
- Summary: `artifacts/summary.md`

---

### 0021_checkpoint-cycle-16-deliveries-ux-retention-redaction-idempotency-receiver-sla.md

---
step: 0021
created_at: "2025-12-30 17:59"
title: "Checkpoint: Cycle 16 deliveries UX (retention/redaction, idempotency, receiver SLA)"
---

# Step 0021: Checkpoint: Cycle 16 deliveries UX (retention/redaction, idempotency, receiver SLA)

## ✅ What I did (facts)

- Picked Cycle 16 tranche focused on “delivery viewer UX + compliance + reliability” for webhooks/event exports (retention/redaction, idempotency, receiver SLAs, redelivery constraints).
- Collected evidence from:
  - Svix docs: payload retention (including delete-on-success tradeoffs), object storage endpoints, manual signature verification guidance.
  - Hookdeck guide: concrete idempotency strategies with ecommerce examples (unique constraints; webhook ID headers like `X-Shopify-Webhook-Id`).
  - GitHub docs (markdown API): receiver SLA guidance (2XX within 10 seconds), secret handling guidance, and redelivery constraints (past 3 days; permission-gated).
- Created 3 evidence extracts and linked them into the matrix and sources:
  - `competitors/evidence/svix-payload-retention-object-storage.md`
  - `competitors/evidence/hookdeck-webhook-idempotency.md`
  - `competitors/evidence/github-webhook-ops-basics.md`
- Updated `artifacts/sources.md`, appended Cycle 16 entries to `artifacts/competitor-matrix.md`, and added Cycle 16 insights to `artifacts/summary.md`.

## 🧠 What I learned (new information)

- Retention and deletion policy is an explicit product UX decision: even delete-on-success is discouraged unless required because it breaks debugging/redrive scenarios.  
  Evidence: https://docs.svix.com/retention
- A “webhook receiver idempotency playbook” can be made concrete with database-level uniqueness + side-effect ordering; Hookdeck uses Shopify examples like `X-Shopify-Webhook-Id`.  
  Evidence: https://hookdeck.com/webhooks/guides/implement-webhook-idempotency
- Mature webhook ecosystems publish a strict receiver SLA (2XX within 10 seconds) and expect async processing patterns.  
  Evidence: https://docs.github.com/api/article/body?pathname=/en/webhooks/using-webhooks/handling-webhook-deliveries

## 🧭 What changes because of this

- “Delivery logs” are not just operational; they’re privacy/compliance surfaces. If we ship a delivery viewer, we must ship retention + redaction + access control with it.
- For ecommerce-admin automations and integrations, idempotency must be a shared middleware primitive; otherwise duplicates cause money/ops incidents (duplicate refunds, duplicate emails, etc.).
- Redelivery should be permission-gated and time-bounded by default, and every redelivery should emit an audit event with a reason.

## ➡️ Next step

- Deepen “payload redaction” patterns (what to store vs redact, how to handle PII/PCI, and how to represent “payload deleted” in logs without losing debuggability).
- Design a concrete “processed events” table schema for idempotency + replay protection and tie it to delivery attempts UI.
- Optional: map these patterns to OSS building blocks (Svix OSS under MIT; CloudEvents envelope; OTel semconv for event logs) for Step-04 adoption.

## 🔗 Links / references

- Evidence notes: `competitors/evidence/svix-payload-retention-object-storage.md`
- Evidence notes: `competitors/evidence/hookdeck-webhook-idempotency.md`
- Evidence notes: `competitors/evidence/github-webhook-ops-basics.md`
- Sources ledger: `artifacts/sources.md`
- Matrix: `artifacts/competitor-matrix.md`
- Summary: `artifacts/summary.md`

---

### 0022_checkpoint-cycle-17-payload-redaction-safe-delivery-viewer-ux-svix-hookdeck-otel.md

---
step: 0022
created_at: "2025-12-30 18:06"
title: "Checkpoint: Cycle 17 payload redaction + safe delivery viewer UX (Svix/Hookdeck/OTel)"
---

# Step 0022: Checkpoint: Cycle 17 payload redaction + safe delivery viewer UX (Svix/Hookdeck/OTel)

## ✅ What I did (facts)

- Picked Cycle 17 tranche focused on “payload redaction + safe delivery viewer UX” patterns needed for compliance and operator supportability.
- Collected evidence from:
  - Svix transformations docs (in-flight method/URL/body payload modification; customer-authored JS concept).
  - Hookdeck events viewer docs (event inspection includes request/response; custom columns; filtering constraints for large payloads).
  - OpenTelemetry collector-contrib processor docs (attributes processor delete/hash and explicit “redacting sensitive information”; transform processor replace/truncate/delete-key patterns).
- Created 3 evidence extracts and linked them into the matrix and sources:
  - `competitors/evidence/svix-transformations.md`
  - `competitors/evidence/hookdeck-events-viewer.md`
  - `competitors/evidence/opentelemetry-collector-redaction.md`
- Updated `artifacts/sources.md`, appended Cycle 17 entries to `artifacts/competitor-matrix.md`, and added Cycle 17 insights to `artifacts/summary.md`.

## 🧠 What I learned (new information)

- Svix supports endpoint-level transformations that can change the body payload in-flight, which makes “redaction before delivery” a first-class pattern (but also introduces sandbox/governance needs).  
  Evidence: https://docs.svix.com/transformations
- Hookdeck’s event inspection model separates list views from deep inspection and supports “custom columns” (only show a few payload fields at a glance).  
  Evidence: https://hookdeck.com/docs/events.md
- OpenTelemetry Collector redaction primitives are very explicit: delete keys, hash values, replace patterns, and truncate fields; docs mention redacting sensitive information as a use case.  
  Evidence: https://raw.githubusercontent.com/open-telemetry/opentelemetry-collector-contrib/main/processor/attributesprocessor/README.md and https://raw.githubusercontent.com/open-telemetry/opentelemetry-collector-contrib/main/processor/transformprocessor/README.md

## 🧭 What changes because of this

- A “delivery viewer” feature should be designed as privacy-first: metadata-only list view + redacted payload view + step-up auth for raw payload access (if ever allowed).
- “Custom columns” are a great way to reduce full payload exposure while still enabling operator triage (show order_id, integration_id, event_type).
- Redaction should be implemented as deterministic pipeline operations (delete/hash/replace/truncate) with preview tooling and audit logs, not arbitrary production transforms without guardrails.

## ➡️ Next step

- Deepen “payload viewing policy” patterns: who can view raw payloads, how long, and how to record “payload viewed” audit events.
- Draft a thin-slice schema for:
  - `delivery_attempts` (metadata)
  - `delivery_payloads` (redacted/raw with retention flags)
  - `redaction_profiles` (rules + versions + approvals)
- Optional: research sandboxing patterns for user-authored transforms (timeouts, memory caps, deny network, audit).

## 🔗 Links / references

- Evidence notes: `competitors/evidence/svix-transformations.md`
- Evidence notes: `competitors/evidence/hookdeck-events-viewer.md`
- Evidence notes: `competitors/evidence/opentelemetry-collector-redaction.md`
- Sources ledger: `artifacts/sources.md`
- Matrix: `artifacts/competitor-matrix.md`
- Summary: `artifacts/summary.md`

---

### 0023_checkpoint-cycle-18-payload-viewing-policy-recovery-ux-svix-hookdeck.md

---
step: 0023
created_at: "2025-12-30 18:10"
title: "Checkpoint: Cycle 18 payload viewing policy + recovery UX (Svix/Hookdeck)"
---

# Step 0023: Checkpoint: Cycle 18 payload viewing policy + recovery UX (Svix/Hookdeck)

## ✅ What I did (facts)

- Picked Cycle 18 tranche focused on “payload viewing policy + recovery UX” (filtering logs, replaying failures, test events, issues + notifications + bulk retry).
- Collected evidence from Svix App Portal docs (filtering logs, replaying messages, testing events) and Hookdeck issues docs (auto-open issues, notifications contain payload, bulk retry).
- Created 2 evidence extracts and linked them into the matrix and sources:
  - `competitors/evidence/svix-app-portal-ops-ux.md`
  - `competitors/evidence/hookdeck-issues-notifications.md`
- Updated `artifacts/sources.md`, appended Cycle 18 entries to `artifacts/competitor-matrix.md`, and added Cycle 18 insights to `artifacts/summary.md`.

## 🧠 What I learned (new information)

- Svix explicitly supports both “resend one message” and “replay all failed messages since this time” which is a strong operator recovery UX for outages.  
  Evidence: https://docs.svix.com/receiving/using-app-portal/replaying-messages
- Hookdeck’s issues system explicitly states that notifications contain the payload of the failed webhook, which forces a product decision on redaction and who can view payloads.  
  Evidence: https://hookdeck.com/docs/issues.md
- Svix’s testing flow explicitly ties to inspection: send example event → click into message to view payload and attempts.  
  Evidence: https://docs.svix.com/receiving/using-app-portal/testing-events

## 🧭 What changes because of this

- We should treat “payload access” as a governed capability: the easiest way to leak secrets is via notifications and delivery viewers. Default should be redacted snippets, and raw payload viewing should require step-up auth + audit.
- Recovery should exist at both granularity levels: message-level resend and bulk replay since time (outage recovery).
- “Issues” objects + bulk retry should be a first-class primitive for integrations health in ecommerce admin (reduce alert fatigue and support load).

## ➡️ Next step

- Draft a concrete “payload viewing policy” matrix for our admin:
  - who can view payloads (RBAC roles)
  - when step-up is required
  - retention limits and deletion behavior
  - audit events emitted (payload_viewed, replay_triggered, bulk_retry_triggered)
- Convert these patterns into a concrete schema (delivery_attempts, delivery_payloads, issues, notifications).
- Optional: extend with redaction profiles from Cycle 17 (delete/hash/replace/truncate) to power the “redacted snippet by default” policy.

## 🔗 Links / references

- Evidence notes: `competitors/evidence/svix-app-portal-ops-ux.md`
- Evidence notes: `competitors/evidence/hookdeck-issues-notifications.md`
- Sources ledger: `artifacts/sources.md`
- Matrix: `artifacts/competitor-matrix.md`
- Summary: `artifacts/summary.md`

---

### 0024_checkpoint-cycle-19-schema-taxonomy-primitives-svix-schemas-catalog-hookdeck-issues-api.md

---
step: 0024
created_at: "2025-12-30 18:14"
title: "Checkpoint: Cycle 19 schema + taxonomy primitives (Svix schemas/catalog + Hookdeck issues API)"
---

# Step 0024: Checkpoint: Cycle 19 schema + taxonomy primitives (Svix schemas/catalog + Hookdeck issues API)

## ✅ What I did (facts)

- Picked Cycle 19 tranche focused on making the work build-ready: concrete schema/taxonomy primitives for event catalogs, issues objects, and delivery logs.
- Collected evidence from Svix docs showing dot-delimited event type grouping, attaching JSON Schema (Draft 7) to event types, schema previews + example payloads, and Event Catalog schema/example display.
- Collected evidence from Hookdeck issues docs showing that issues are first-class API objects and notifications config is also exposed via API references.
- Created 2 evidence extracts and linked them into the matrix and sources:
  - `competitors/evidence/svix-event-type-schema-event-catalog.md`
  - `competitors/evidence/hookdeck-api-issues.md`
- Updated `artifacts/sources.md`, appended Cycle 19 entries to `artifacts/competitor-matrix.md`, and added Cycle 19 insights to `artifacts/summary.md`.

## 🧠 What I learned (new information)

- Svix uses dot-delimited event names as a UX primitive: it groups event types visually in the App Portal UI.  
  Evidence: https://docs.svix.com/tutorials/event-type-schema
- Svix supports authoring schemas in a visual editor or directly providing JSON Schema Draft 7, then previews schema and example payloads in the event type detail and Event Catalog.  
  Evidence: https://docs.svix.com/tutorials/event-type-schema and https://docs.svix.com/receiving/using-app-portal/event-catalog
- Hookdeck issues are explicitly referenced as API endpoints (list/get/update/dismiss) and notification webhooks can be toggled via API reference.  
  Evidence: https://hookdeck.com/docs/issues.md

## 🧭 What changes because of this

- We should treat `event_types` (taxonomy + schema + examples) as a first-class registry in our admin, separate from delivery attempt logs.
- We should treat `issues` as a first-class object model with an API surface (not just a UI view), enabling automation and bulk actions.
- This gives a clear direction for a “schema + ops” thin slice: Event Catalog + delivery logs + issues + replay tied together with audit events.

## ➡️ Next step

- Draft a concrete schema for:
  - `event_types` (key, group, schema_json, example_payload_json, version)
  - `delivery_attempts` (metadata) and `delivery_payloads` (redacted/raw with retention)
  - `issues` (group key, status, counts, last_seen_at) and `issue_events` join
  - `notification_prefs` (channel, topics, payload_policy)
- Define a minimal event taxonomy for audit/events using dot-delimited naming (align with CloudEvents type versioning where appropriate).
- Optional: add “schema change approvals” and preview environments for risky schema changes (reusing Cycle 12 policy CI/CD patterns).

## 🔗 Links / references

- Evidence notes: `competitors/evidence/svix-event-type-schema-event-catalog.md`
- Evidence notes: `competitors/evidence/hookdeck-api-issues.md`
- Sources ledger: `artifacts/sources.md`
- Matrix: `artifacts/competitor-matrix.md`
- Summary: `artifacts/summary.md`

---

### 0025_checkpoint-cycle-20-audit-telemetry-taxonomy-cloudevents-otel-spans-cloudtrail.md

---
step: 0025
created_at: "2025-12-30 18:26"
title: "Checkpoint: Cycle 20 audit+telemetry taxonomy (CloudEvents + OTel spans + CloudTrail)"
---

# Step 0025: Checkpoint: Cycle 20 audit+telemetry taxonomy (CloudEvents + OTel spans + CloudTrail)

## ✅ What I did (facts)

- Added Cycle 20 batch focused on “audit + telemetry taxonomy primitives” (CloudEvents + Svix OTel streaming + AWS CloudTrail).
- Created 3 new evidence notes (CloudEvents audit envelope + taxonomy, Svix OTel streaming spans/attributes, CloudTrail audit record schema fields).
- Updated the competitor matrix with concrete “3 features / 2 workflows / 3 steal ideas / thin slice” for each of the 3 Cycle 20 entries.
- Updated sources and summary artifacts with evidence-backed primitives and build-ready implications.

## 🧠 What I learned (new information)

- CloudEvents core attributes (`specversion`, `id`, `source`, `type`) plus optional fields (`subject`, `time`, `dataschema`) map cleanly onto “audit log export” and “automation triggers” patterns.  
- Svix models delivery attempts as two spans: outer `message_attempt` and inner `http_attempt`, with a concrete attribute taxonomy (org/app/endpoint/msg IDs, event type, attempt count, status, and HTTP response status code).  
- CloudTrail’s event record contents provide a strong “canonical audit row” template: actor identity (`userIdentity`), action identifiers (`eventSource`, `eventName`), timestamp (`eventTime`), origin (`sourceIPAddress`, `userAgent`), and correlation (`eventID`, `requestID`).

## 🧭 What changes because of this

- We can define a single “Lumelle outbound event” standard by pairing:
  - CloudEvents envelope for portability across webhooks/queues/sinks
  - An internal `event_types` registry for schema + examples (Cycle 19)
- Our “Deliveries” UI should expose a trace link (trace-id per delivery attempt) and be payload-optional by default; observability can be metadata-first.
- Our audit log and delivery log should share correlation IDs (admin action → job → delivery attempt → trace).

## ➡️ Next step

- Next cycle candidate: deepen a second “audit log export” reference stack (e.g., GCP Cloud Audit Logs + W3C Trace Context) and extract any concrete field/taxonomy patterns we should adopt.

## 🔗 Links / references

- Evidence: `competitors/evidence/cloudevents-audit-envelope-taxonomy.md`
- Evidence: `competitors/evidence/svix-opentelemetry-streaming.md`
- Evidence: `competitors/evidence/cloudtrail-event-record-schema.md`

---

### 0026_checkpoint-cycle-21-audit-schema-correlation-standards-gcp-w3c-trace-headers.md

---
step: 0026
created_at: "2025-12-30 18:31"
title: "Checkpoint: Cycle 21 audit schema + correlation standards (GCP + W3C trace headers)"
---

# Step 0026: Checkpoint: Cycle 21 audit schema + correlation standards (GCP + W3C trace headers)

## ✅ What I did (facts)

- Added Cycle 21 batch focused on audit schema and correlation standards (GCP Audit Logs + W3C Trace Context + W3C Baggage).
- Created 3 new evidence notes capturing field/taxonomy patterns and “thin slice” implementation wedges.
- Updated `artifacts/sources.md`, `artifacts/competitor-matrix.md`, `artifacts/summary.md`, `context/context.md`, and `artifacts/agent-plan.md` with Cycle 21 outputs.

## 🧠 What I learned (new information)

- GCP audit logs distinguish audit entries via `protoPayload` containing an `AuditLog` object, which can serve as a blueprint for “canonical envelope + typed payload”.
- W3C Trace Context standardizes `traceparent` and `tracestate` headers, giving us an interoperable way to carry correlation IDs across services and async boundaries.
- W3C Baggage provides a standard key-value propagation mechanism, but implies we should enforce allowlists/limits to avoid PII leakage and header bloat.

## 🧭 What changes because of this

- Our admin’s audit experience can be category-first (activity/system/data-access) and query-first, rather than “log dump” UX.
- Correlation IDs should be treated as a platform primitive (shared across audit logs, automation runs, delivery attempts, and traces).
- We should treat propagated “custom attributes” as governed configuration (allowlisted keys + audit events on changes).

## ➡️ Next step

- Next cycle candidate: deepen an “embedded audit log export” reference product (e.g., Okta System Log API or GitHub audit log streaming) and pull out concrete endpoints + retention/export UX patterns.

## 🔗 Links / references

- Evidence: `competitors/evidence/gcp-cloud-audit-logs-schema.md`
- Evidence: `competitors/evidence/w3c-trace-context.md`
- Evidence: `competitors/evidence/w3c-baggage.md`

---

### 0027_checkpoint-cycle-22-audit-log-streaming-export-jobs-github-workos-gitlab.md

---
step: 0027
created_at: "2025-12-30 18:42"
title: "Checkpoint: Cycle 22 audit log streaming + export jobs (GitHub + WorkOS + GitLab)"
---

# Step 0027: Checkpoint: Cycle 22 audit log streaming + export jobs (GitHub + WorkOS + GitLab)

## ✅ What I did (facts)

- Deepened “audit log streaming + export jobs” primitives from adjacent products (GitHub Enterprise Cloud, WorkOS Audit Logs, GitLab audit events).
- Created 3 evidence notes with URLs for each feature claim (streaming destinations + config APIs, schema/export/retention controls, and API/UI constraints).
- Updated Cycle 22 sections in `artifacts/sources.md`, `artifacts/competitor-matrix.md`, `artifacts/summary.md`, `context/context.md`, and `artifacts/agent-plan.md`.

## 🧠 What I learned (new information)

- GitHub treats audit log streaming as a destination catalog with provider-specific setup flows and a “Check endpoint” validation step, plus a REST API surface for stream key retrieval and stream configuration CRUD.
- WorkOS productizes audit logs as an embeddable system with explicit schema surfaces, export endpoints (export jobs), retention controls, and configuration endpoints.
- GitLab documents a pragmatic “constraint-first” posture: API window limits (max 30 days between `created_after` and `created_before`) and intentionally limited UI searching (actor + date range only).

## 🧭 What changes because of this

- Our admin should treat “exports” as a shared platform primitive: destination catalog + validation + run history + config APIs + audit trail of changes (reusable for webhooks, data exports, compliance logs).
- “Export jobs” are a safer first step than “instant downloads” (they support background processing, retries, and clearer status UX for large datasets).
- Guardrails (time-window limits, constrained filters) are a viable MVP strategy for audit exports without needing full-text audit search.

## ➡️ Next step

- Next cycle candidate: deepen one additional “audit export vendor” (Okta System Log streaming, Datadog Audit Trail, or GitHub org-level audit log events taxonomy) and extract the best schema/taxonomy patterns for merchant-admin actions.

## 🔗 Links / references

- Evidence: `competitors/evidence/github-audit-log-streaming-and-api.md`
- Evidence: `competitors/evidence/workos-audit-logs-schema-exports-retention.md`
- Evidence: `competitors/evidence/gitlab-audit-events-admin-api-constraints.md`

---

### 0028_checkpoint-cycle-23-code-shaped-audit-export-apis-okta-github-workos.md

---
step: 0028
created_at: "2025-12-30 18:52"
title: "Checkpoint: Cycle 23 code-shaped audit export APIs (Okta + GitHub + WorkOS)"
---

# Step 0028: Checkpoint: Cycle 23 code-shaped audit export APIs (Okta + GitHub + WorkOS)

## ✅ What I did (facts)

- Deepened code-shaped “audit export APIs” patterns using Okta OpenAPI (SystemLog + LogStream), GitHub Enterprise audit log stream config schema, and WorkOS audit logs endpoint taxonomy.
- Extracted concrete API primitives (cursor pagination via `after` + `rel=next`, stream config CRUD + lifecycle endpoints, typed provider configs with secret encryption, action catalog + per-action schemas).
- Updated artifacts: `sources.md`, `competitor-matrix.md`, `summary.md`, `context/context.md`, and `agent-plan.md` with Cycle 23 outputs.
- Created 3 new evidence notes in `competitors/evidence/` with URLs for each feature claim.

## 🧠 What I learned (new information)

- Okta’s System Log API models cursor pagination explicitly: the `after` token is opaque and the next page is returned via an HTTP `Link` header (`rel=next`) that includes `after`.
- Okta separates the “events feed” (`/api/v1/logs`) from “log stream configuration” (`/api/v1/logStreams`) including activate/deactivate lifecycle endpoints, and states a constraint (up to two log stream integrations per org).
- GitHub’s enterprise audit stream configs have a strong typed schema (`stream_type` + `stream_details`) and require an explicit secret-encryption workflow via a stream-key endpoint with `key_id` recorded in provider configs.
- WorkOS publishes an audit-as-a-product endpoint taxonomy that separates “actions catalog”, “schemas”, “events”, “exports”, and “retention”.

## 🧭 What changes because of this

- We can ship an MVP audit export API without full-text search by combining: bounded time windows (`since/until`) + cursor pagination (`after` + `rel=next`) + allowlisted `filter/q`.
- Our export platform should treat “destination configs” as first-class objects (typed configs + lifecycle state), distinct from the event feed semantics.
- Adding an “action catalog + schemas” surface is a high-leverage move to make audit logs self-serve and reduce support burden (especially for integrations/deliveries/credential changes).

## ➡️ Next step

- Next cycle candidate: deepen one more “destination config + validation” reference (Okta log stream destination types if accessible, or another vendor’s SIEM connectors), focusing specifically on typed destination schemas + test/validation flows.

## 🔗 Links / references

- Evidence: `competitors/evidence/okta-system-log-and-log-stream-openapi.md`
- Evidence: `competitors/evidence/github-audit-log-streaming-config-schema.md`
- Evidence: `competitors/evidence/workos-audit-logs-endpoints-taxonomy.md`

---

### 0029_checkpoint-cycle-24-destination-schemas-stream-only-audit-taxonomy-okta-github.md

---
step: 0029
created_at: "2025-12-30 18:57"
title: "Checkpoint: Cycle 24 destination schemas + stream-only audit taxonomy (Okta + GitHub)"
---

# Step 0029: Checkpoint: Cycle 24 destination schemas + stream-only audit taxonomy (Okta + GitHub)

## ✅ What I did (facts)

- Deepened “audit destination schema” primitives in Okta LogStream OpenAPI:
  - Verified destination types enum and schema discovery endpoints.
  - Captured lifecycle endpoints (activate/deactivate) that separate config governance from event feed semantics.
- Deepened “stream-only / export-only event taxonomy” primitives in GitHub Audit Log Events docs:
  - Identified explicit gating text (“only available via audit log streaming” / “not available in the web interface, only via API/stream/export”).
  - Captured evidence that event docs include machine-readable field lists per event type.
- Wrote 2 evidence notes and linked the URLs into sources/matrix/summary.

## 🧠 What I learned (new information)

- Okta’s LogStream API publishes destination schema discovery endpoints:
  - `GET /api/v1/meta/schemas/logStream` and `GET /api/v1/meta/schemas/logStream/{logStreamType}`.
- Okta’s destination type enum includes at least `aws_eventbridge` and `splunk_cloud_logstreaming`, and log stream configs have explicit lifecycle activate/deactivate endpoints.
- GitHub audit log event docs sometimes include events that are explicitly not in UI and/or only available through streaming/API/export, while still documenting per-event fields (which is ideal for integration tooling).

## 🧭 What changes because of this

- We should implement “destination types” as a first-class enum in our admin, backed by per-type JSON schemas that drive UI forms + validation (test connection) + safe storage of secrets.
- Separate the event feed API from destination config objects:
  - feed = query + pagination
  - destination = typed config + lifecycle + validation + audit events for changes
- Maintain an “event taxonomy registry” page that can contain events that are stream/export-only first (no UI), enabling integrations without building full dashboards up front.

## ➡️ Next step

- Run the next tranche on workflow automation primitives (Zapier/Workato/n8n/Pipedream) to connect “events + approvals” into an end-user automation builder.
- Optionally deepen one more destination schema reference (e.g., Splunk HEC, AWS EventBridge targets, or a SIEM connector) and extract validation/test workflows.

## 🔗 Links / references

- Okta LogStream OpenAPI (destination schema endpoints + types): https://developer.okta.com/docs/api/page-data/openapi/okta-management/management/tag/LogStream/page-data.json
- GitHub enterprise audit log events (streaming-only language + fields): https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/audit-log-events-for-your-enterprise
- GitHub org audit log events (not in UI, only API/stream/export): https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/organizations/keeping-your-organization-secure/managing-security-settings-for-your-organization/audit-log-events-for-your-organization
- Evidence notes: `competitors/evidence/okta-logstream-destination-schemas.md`
- Evidence notes: `competitors/evidence/github-audit-log-events-stream-only.md`
- Sources ledger: `artifacts/sources.md`
- Matrix: `artifacts/competitor-matrix.md`
- Summary: `artifacts/summary.md`

---

## Cleanup notes

- Step files compacted: 10 (and removed from steps/)
- Compaction file is capped at ~1048576 bytes (configurable via BLACKBOX_CONTEXT_MAX_BYTES).
