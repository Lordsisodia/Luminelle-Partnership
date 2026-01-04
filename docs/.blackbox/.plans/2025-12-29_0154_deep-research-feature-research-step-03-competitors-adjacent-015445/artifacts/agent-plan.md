---
status: active
last_reviewed: 2025-12-29
owner: agent
role: step-03
---

# Agent Plan (Step-03 / Adjacent competitors)

## 🎯 Current cycle focus (Cycle 1)

- Deepen adjacent “iPaaS / connectors / enterprise automation” platforms that demonstrate reusable admin primitives:
  - approvals / human-in-the-loop
  - credential management (connections, secrets, vaults)
  - run history / job logs / retries
  - templates/gallery + lifecycle (draft/test/enable)

## ✅ N limit

- N=4 competitors (efficiency > completeness)

## 🧩 Competitors (Cycle 1)

- Workato — iPaaS / recipe automation
- Tines — security-flavored automation with human approvals
- Kestra — OSS workflow orchestration with UI for executions (license check required)
- Camunda — BPM/workflow engine with task/operate surfaces (license check required)

## ➡️ Next 3 actions (in order)

1) Add evidence URLs to `artifacts/sources.md` for each competitor (docs pages that prove primitives).
2) Create `competitors/evidence/*.md` for the 4 competitors (3 features + 2 workflows + 3 steal ideas + thin slice).
3) Append the 4 competitors to `artifacts/competitor-matrix.md` + add 3–7 durable insights to `artifacts/summary.md`.

---

## 🎯 Current cycle focus (Cycle 2)

- Deepen adjacent “embedded integrations / unified APIs” platforms to steal patterns for:
  - connection catalog + “connect app” CTA
  - credential storage + OAuth token lifecycle + rotation
  - sync/run history + error taxonomy + retries
  - tenant-scoped connections (multi-tenant SaaS embedding)

## ✅ N limit

- N=4 competitors (efficiency > completeness)

## 🧩 Competitors (Cycle 2)

- Merge.dev — unified API (HRIS/ATS/CRM/etc) embedding patterns
- Apideck — unified APIs + connection management patterns
- Paragon — embedded integrations UI + connection portal patterns
- Nango — OSS integration auth + connection sync primitives (license check)
- Airbyte — OSS connectors + connection wizard + job history patterns (license check)

## ➡️ Next 3 actions (in order)

1) Add evidence URLs to `artifacts/sources.md` for each competitor (docs pages proving “connections/auth/syncs/logs” primitives).
2) Add `competitors/evidence/*.md` for each competitor (3 features + 2 workflows + 3 steal ideas + thin slice).
3) Update `artifacts/competitor-matrix.md` + append 3–7 durable insights to `artifacts/summary.md`.

---

## 🎯 Current cycle focus (Cycle 3)

- Deepen adjacent “embedded integrations platforms” with reusable primitives for:
  - connection setup (link flow / OAuth consent) + state-driven UX
  - integration catalog UI (connect/reconnect/disconnect)
  - sync cadence + status surfaces (job history, timeline, retry)
  - embedding patterns (end-customer portal, multi-tenant isolation)

## ✅ N limit

- N=4 competitors (efficiency > completeness)

## 🧩 Competitors (Cycle 3)

- Codat — accounting/commerce unified APIs + link flow patterns
- Prismatic — embedded integrations + customer-facing integration marketplace patterns
- Tray.io — iPaaS with embedded/connectors/logging patterns
- Merge.dev — unified APIs (attempt; if docs remain blocked label `blocked_evidence`)

## ➡️ Next 3 actions (in order)

1) Add evidence URLs to `artifacts/sources.md` (prefer docs that prove link flow, connection objects/states, logs/timelines).
2) Add `competitors/evidence/*.md` for the 4 competitors (3 features + 2 workflows + 3 steal ideas + thin slice).
3) Update `artifacts/competitor-matrix.md` + add 3–7 durable insights to `artifacts/summary.md`.

---

## 🎯 Current cycle focus (Cycle 4)

- Deepen adjacent “credential governance / security primitives” platforms to steal patterns for:
  - RBAC + scoped permissions around integrations/credentials
  - audit logs for credential/connection changes
  - token lifecycle (issuance, rotation, expiration, revoke)
  - log streaming export to SIEM / external monitoring
  - approvals gates for sensitive admin actions (rotate/revoke/disconnect)

## ✅ N limit

- N=5 competitors (efficiency > completeness)

## 🧩 Competitors (Cycle 4)

- Infisical — secrets management with audit logs + RBAC (OSS-ish, MIT outside `ee/`)
- HashiCorp Vault — secrets/policy/audit primitives (BUSL; restrictive for embedding/hosting)
- Doppler — secrets platform with activity logs + custom roles + service tokens
- Auth0 — identity platform with RBAC + logs + log streaming
- Okta — identity platform with System Log + roles + API token patterns

## ➡️ Next 3 actions (in order)

1) Add evidence URLs to `artifacts/sources.md` (audit logs, RBAC, token lifecycle, log streaming).
2) Create `competitors/evidence/*.md` for the 5 competitors (3 features + 2 workflows + 3 steal ideas + thin slice).
3) Append the 5 competitors to `artifacts/competitor-matrix.md` + add 3–7 durable insights to `artifacts/summary.md`.

---

## 🎯 Current cycle focus (Cycle 5)

- Deepen adjacent “observability export + governance” platforms to steal patterns for:
  - audit events modeled as an event stream (queryable + filterable)
  - export/forwarding to external sinks (SIEM/log platforms)
  - pipelines/transforms/redaction before export (PII hygiene)
  - retention/archiving controls
  - token-based ingestion primitives (webhook/HEC/OTLP)

## ✅ N limit

- N=5 competitors (efficiency > completeness)

## 🧩 Competitors (Cycle 5)

- Datadog — logs pipelines + archives (export/retention patterns)
- Splunk — HTTP Event Collector (HEC) ingestion pattern (token-based)
- Sentry — audit log patterns (organization governance surface)
- OpenTelemetry Collector — vendor-agnostic receive/process/export pipeline (Apache-2.0)
- Elastic Stack (Kibana/Elasticsearch) — audit events + audit logging patterns (ELv2/SSPL/AGPL mix; restrictive)

## ➡️ Next 3 actions (in order)

1) Add evidence URLs to `artifacts/sources.md` (pipelines/archives, HEC, audit logs, OTEL collector, Elastic audit events).
2) Create `competitors/evidence/*.md` for the 5 competitors (3 features + 2 workflows + 3 steal ideas + thin slice).
3) Append the 5 competitors to `artifacts/competitor-matrix.md` + add 3–7 durable insights to `artifacts/summary.md`.

---

## 🎯 Current cycle focus (Cycle 6)

- Deepen adjacent “step-up auth + approvals for sensitive actions” patterns to steal primitives for:
  - re-auth / step-up requirements before sensitive actions (password/MFA re-prompt)
  - just-in-time (JIT) privilege elevation with time-bounded access
  - dual-control approvals (“two-person rule”) for destructive actions
  - protected actions with policy gates (who can do what, when, with what checks)
  - auditability: immutable trail of approvals + denials + changes

## ✅ N limit

- N=5 competitors (efficiency > completeness)

## 🧩 Competitors (Cycle 6)

- GitHub — protected branches/environments + required reviews (approval gates) + sudo-mode style re-auth patterns
- GitLab — protected branches + approvals + sudo mode / admin mode patterns
- Microsoft Entra Privileged Identity Management (PIM) — JIT role activation + approval workflows (step-up governance)
- AWS IAM + CloudTrail (plus S3 MFA Delete) — MFA and audit trail patterns for sensitive actions
- Stripe — restricted API keys + team/roles + 2FA patterns (merchant-admin-adjacent governance)

## ➡️ Next 3 actions (in order)

1) Add evidence URLs to `artifacts/sources.md` (sudo/step-up, approvals, protected actions, JIT/PIM, MFA + audit trail, restricted keys).
2) Create `competitors/evidence/*.md` for the 5 competitors (3 features + 2 workflows + 3 steal ideas + thin slice).
3) Append the 5 competitors to `artifacts/competitor-matrix.md` + add 3–7 durable insights to `artifacts/summary.md`.

---

## 🎯 Current cycle focus (Cycle 7)

- Deepen adjacent “approval UX + notifications/escalation” platforms to steal patterns for:
  - approval inbox / queue UX (pending, overdue, delegated)
  - SLAs and timers for approvals (countdowns, breach state)
  - escalation rules + reminders (notify backup approver)
  - auditability for approvals/denials and policy changes

## ✅ N limit

- N=4 competitors (efficiency > completeness)

## 🧩 Competitors (Cycle 7)

- Jira Service Management — approval steps + SLAs (ticket/request governance patterns)
- PagerDuty — escalation policies/timeouts (escalation + notification patterns)
- Power Automate Approvals — approval flows + “approve/reject” action surface (inbox + notifications)
- GitHub — required reviewers + protected targets (approval gate primitives; evidence already captured)

## ➡️ Next 3 actions (in order)

1) Add evidence URLs to `artifacts/sources.md` (approval steps, SLAs, escalation policies, approval connectors).
2) Create `competitors/evidence/*.md` for the 3 net-new competitors (JSM/PagerDuty/Power Automate) and reuse `competitors/evidence/github.md`.
3) Append the batch to `artifacts/competitor-matrix.md` + add 3–7 durable insights to `artifacts/summary.md`.

---

## 🎯 Current cycle focus (Cycle 8)

- Deepen adjacent “approval inbox UX primitives” to steal patterns for:
  - inbox tabs and states (pending / snoozed / done)
  - snooze / deferral mechanics (and “unsnooze_at” return)
  - bulk actions + selection UX (checkboxes, select-all)
  - standardized decision outcomes (approve / request changes / comment)
  - resolution tracking (threads resolved) + re-request patterns
  - “approver seats” / external approvers without full admin licensing

## ✅ N limit

- N=3 competitors (efficiency > completeness)

## 🧩 Competitors (Cycle 8)

- GitLab (To-Do List + MR reviews) — inbox tabs + snooze + bulk actions + pending review state
- GitHub (PR reviews) — standardized review outcomes + resolution tracking + re-request review
- Jira Service Management (approval stage) — approvals as workflow stages + external/customer approvers without agent license

## ➡️ Next 3 actions (in order)

1) Add evidence URLs to `artifacts/sources.md` (GitLab To-Do, GitLab MR reviews, GitHub PR review docs, JSM approval stage).
2) Create `competitors/evidence/*.md` for Cycle 8 (3 features + 2 workflows + 3 steal ideas + thin slice).
3) Append Cycle 8 entries to `artifacts/competitor-matrix.md` + add 3–7 durable insights to `artifacts/summary.md`.

---

## 🎯 Current cycle focus (Cycle 9)

- Deepen adjacent “delegation / out-of-office + approval portal/email” patterns to steal primitives for:
  - approver delegation / reassign (“I’m OOO, send to someone else”)
  - deferral that’s time-based (“approved now, effective later”)
  - approval request delivery channels (email inbox + approvals center + mobile)
  - email status updates (avoid “stale approval email” confusion)
  - approval UX building blocks (stage timeline / reviewers gallery)
  - timeout semantics (skip/fail stages when approvals don’t happen)

## ✅ N limit

- N=3 competitors (efficiency > completeness)

## 🧩 Competitors (Cycle 9)

- Power Automate Approvals — reassign approvals + email inbox approvals + email status updates
- Azure DevOps Pipelines (Approvals and checks) — deferred approvals + instructions + timeouts
- Power Apps (Approval request screen template) — approval stages UI building blocks

## ➡️ Next 3 actions (in order)

1) Add Cycle 9 evidence URLs to `artifacts/sources.md`.
2) Create `competitors/evidence/*.md` for Cycle 9 (3 features + 2 workflows + 3 steal ideas + thin slice).
3) Append Cycle 9 entries to `artifacts/competitor-matrix.md` + add Cycle 9 primitives/insights to `artifacts/summary.md`.

---

## 🎯 Current cycle focus (Cycle 11)

- Deepen adjacent “policy / authorization primitives” to steal code-shaped patterns for:
  - protected resources registry + policy evaluation
  - RBAC/ABAC/ReBAC models (roles, attributes, relationships)
  - policy-as-code workflow (reviewable changes, audit events)
  - enforcing “required approvals” as a policy outcome (permit/deny/needs_approval)

## ✅ N limit

- N=4 (efficiency > completeness)

## 🧩 Competitors (Cycle 11)

- Open Policy Agent (OPA) — policy-as-code (Rego) for gating actions
- OpenFGA (Zanzibar-style) — relationship-based access control (ReBAC) for resource permissions
- SpiceDB (Zanzibar-style) — relationship-based access control (ReBAC) for resource permissions (GitHub evidence if docs block)
- Casbin — OSS authorization library with RBAC/ABAC models

## ➡️ Next 3 actions (in order)

1) Add Cycle 11 evidence URLs to `artifacts/sources.md` (OPA, SpiceDB, Casbin, Oso docs).
2) Create `competitors/evidence/*.md` for Cycle 11 (3 features + 2 workflows + 3 steal ideas + thin slice).
3) Append Cycle 11 entries to `artifacts/competitor-matrix.md` + add Cycle 11 primitives/insights to `artifacts/summary.md`.

---

## 🎯 Current cycle focus (Cycle 12)

- Deepen adjacent “policy templates + policy simulator” patterns to steal code and UX ideas for:
  - a consistent `authorize()` API that can return `allow/deny/needs_approval`
  - policy templates for high-risk ecommerce actions (refunds, payouts, integration disconnect)
  - “policy simulator” tooling (explain: why allowed/denied; what-if testing)
  - progressive adoption: start with a few policies, grow coverage safely

## ✅ N limit

- N=4 (efficiency > completeness)

## 🧩 Competitors (Cycle 12)

- Cedar (policy language) — policy-as-code for authorization
- AWS Verified Permissions — Cedar-based authorization service (policy store + decision API)
- Permit.io — policy management surface + approval-style “who can do what” tooling (SaaS)
- OPA (HTTP API authorization examples) — policy enforcement patterns at the API edge

## ➡️ Next 3 actions (in order)

1) Add Cycle 12 evidence URLs to `artifacts/sources.md`.
2) Create `competitors/evidence/*.md` for Cycle 12 (3 features + 2 workflows + 3 steal ideas + thin slice).
3) Append Cycle 12 entries to `artifacts/competitor-matrix.md` + add Cycle 12 primitives/insights to `artifacts/summary.md`.

---

## 🎯 Current cycle focus (Cycle 13)

- Deepen adjacent “feature flags + experimentation” platforms to steal code-shaped primitives for:
  - vendor-neutral flag evaluation APIs + provider model
  - targeting/audience builder UX + preview/simulator
  - QA overrides / forced variants (debuggability) with audit logging
  - publish/version/rollback workflows (template diffs)
  - experiments + metrics guardrails + “promote winner” approvals

## ✅ N limit

- N=5 competitors (efficiency > completeness)

## 🧩 Competitors (Cycle 13)

- OpenFeature — standard evaluation API + providers + hooks (OSS)
- Statsig — feature gates + experiments + metrics (SaaS)
- Firebase Remote Config — templates/versioning + A/B testing adjacency (SaaS)
- Optimizely Feature Experimentation — audiences/targeting + QA forcing (SaaS)
- PostHog — feature flags + experiments + self-host posture (MIT per docs)

## ➡️ Next 3 actions (in order)

1) Add Cycle 13 evidence URLs to `artifacts/sources.md`.
2) Create `competitors/evidence/*.md` for Cycle 13 (3 features + 2 workflows + 3 steal ideas + thin slice).
3) Append Cycle 13 entries to `artifacts/competitor-matrix.md` + add Cycle 13 primitives/insights to `artifacts/summary.md`.

---

## 🎯 Current cycle focus (Cycle 14)

- Deepen adjacent “event export + feature flag telemetry standards” to steal buildable platform primitives for:
  - a stable outbound event envelope for audit + automation exports (webhooks/queues)
  - standardized feature-flag evaluation telemetry fields (exposure/audit logs)
  - event taxonomy governance and versioning (schema drift prevention)

## ✅ N limit

- N=3 (standards-focused; efficiency > completeness)

## 🧩 Competitors / standards (Cycle 14)

- OpenTelemetry Semantic Conventions (Feature Flags) — standard attributes for flag evaluation logs (OSS spec)
- CloudEvents (CNCF) — event envelope spec for exports/webhooks/queues (OSS spec)
- RudderStack Tracking Plans — event taxonomy governance patterns (AGPL license flagged)

## ➡️ Next 3 actions (in order)

1) Add Cycle 14 evidence URLs to `artifacts/sources.md`.
2) Create `competitors/evidence/*.md` for Cycle 14 (3 features + 2 workflows + 3 steal ideas + thin slice).
3) Append Cycle 14 entries to `artifacts/competitor-matrix.md` + add Cycle 14 primitives/insights to `artifacts/summary.md`.

---

## 🎯 Current cycle focus (Cycle 15)

- Deepen adjacent “webhook delivery platform” patterns to steal primitives for:
  - signing + verification guidance (HMAC, timestamps, replay mitigation)
  - delivery logs + redelivery UX (supportability)
  - retries/backoff schedules + endpoint health (auto-disable)
  - secret rotation + audit events on config changes

## ✅ N limit

- N=4 competitors (efficiency > completeness)

## 🧩 Competitors (Cycle 15)

- Svix — webhook delivery as a service + OSS server; retries + verification docs + debugger
- Hookdeck — webhook reliability/event gateway; retries + destinations
- Stripe Webhooks — best-practice signing + endpoint lifecycle patterns
- GitHub Webhooks — receiver SLA + signature validation + redelivery patterns

## ➡️ Next 3 actions (in order)

1) Add Cycle 15 evidence URLs to `artifacts/sources.md`.
2) Create `competitors/evidence/*.md` for Cycle 15 (3 features + 2 workflows + 3 steal ideas + thin slice).
3) Append Cycle 15 entries to `artifacts/competitor-matrix.md` + add Cycle 15 primitives/insights to `artifacts/summary.md`.

---

## 🎯 Current cycle focus (Cycle 16)

- Deepen adjacent “webhook deliveries UX primitives” (operational + compliance) to steal code and ideas for:
  - payload retention + redaction controls (privacy/compliance)
  - explicit receiver SLAs (respond quickly, process async)
  - idempotency strategies for “at least once” delivery
  - time-bounded, permission-gated redelivery
  - alternative delivery targets (object storage) for high-sensitivity events

## ✅ N limit

- N=3 competitors (efficiency > completeness)

## 🧩 Competitors (Cycle 16)

- Svix — payload retention controls + object storage endpoints + verification docs
- Hookdeck — concrete idempotency strategies with ecommerce examples
- GitHub Webhooks — explicit receiver SLA + secrets guidance + redelivery constraints

## ➡️ Next 3 actions (in order)

1) Add Cycle 16 evidence URLs to `artifacts/sources.md`.
2) Create Cycle 16 evidence notes (3 features + 2 workflows + 3 steal ideas + thin slice).
3) Append Cycle 16 entries to `artifacts/competitor-matrix.md` + add Cycle 16 insights to `artifacts/summary.md`.

---

## 🎯 Current cycle focus (Cycle 17)

- Deepen adjacent “payload redaction + safe delivery viewer UX” primitives to steal patterns for:
  - metadata-first delivery logs and opt-in payload viewing
  - deterministic redaction profiles (delete/hash/replace/truncate)
  - governance around transformations (power tools) + auditability

## ✅ N limit

- N=3 competitors (efficiency > completeness)

## 🧩 Competitors (Cycle 17)

- Svix — transformations for payload changes (power tool; governance needed)
- Hookdeck — events viewer + custom columns for delivery logs
- OpenTelemetry Collector (contrib) — redaction processors (attributes/transform)

## ➡️ Next 3 actions (in order)

1) Add Cycle 17 evidence URLs to `artifacts/sources.md`.
2) Create Cycle 17 evidence notes (3 features + 2 workflows + 3 steal ideas + thin slice).
3) Append Cycle 17 entries to `artifacts/competitor-matrix.md` + add Cycle 17 insights to `artifacts/summary.md`.

---

## 🎯 Current cycle focus (Cycle 18)

- Deepen adjacent “payload viewing policy + recovery UX” primitives to steal patterns for:
  - filtering delivery logs, replaying messages, testing events loops
  - issues + notifications that are operationally useful but privacy-safe
  - bulk retry vs “replay since timestamp” controls

## ✅ N limit

- N=2 competitors (efficiency > completeness)

## 🧩 Competitors (Cycle 18)

- Svix — App Portal ops workflows (filter logs, replay messages, testing events)
- Hookdeck — issues + notifications + bulk retry (explicit payload-in-notifications risk)

## ➡️ Next 3 actions (in order)

1) Add Cycle 18 evidence URLs to `artifacts/sources.md`.
2) Create Cycle 18 evidence notes (3 features + 2 workflows + 3 steal ideas + thin slice).
3) Append Cycle 18 entries to `artifacts/competitor-matrix.md` + add Cycle 18 insights to `artifacts/summary.md`.

---

## 🎯 Current cycle focus (Cycle 19)

- Deepen adjacent “schema + taxonomy primitives” to steal patterns for:
  - event type registry (dot-delimited grouping)
  - schema-per-event + curated example payloads
  - issues as first-class API objects + notification config endpoints

## ✅ N limit

- N=2 competitors (efficiency > completeness)

## 🧩 Competitors (Cycle 19)

- Svix — event type schema + event catalog UX
- Hookdeck — issues API objects + notifications config endpoints

## ➡️ Next 3 actions (in order)

1) Add Cycle 19 evidence URLs to `artifacts/sources.md`.
2) Create Cycle 19 evidence notes (3 features + 2 workflows + 3 steal ideas + thin slice).
3) Append Cycle 19 entries to `artifacts/competitor-matrix.md` + add Cycle 19 insights to `artifacts/summary.md`.

---

## 🎯 Current cycle focus (Cycle 20)

- Deepen adjacent “audit + telemetry taxonomy” primitives to steal patterns for:
  - portable outbound audit/automation exports (envelope + taxonomy versioning)
  - delivery operations observability (attempts as traces/spans)
  - canonical audit record schema (actor/action/time/origin + correlation IDs)

## ✅ N limit

- N=3 (efficiency > completeness)

## 🧩 Competitors / standards (Cycle 20)

- CloudEvents — vendor-neutral event envelope for exported events (audit + automation)
- Svix (OpenTelemetry streaming) — delivery attempts as traces/spans with a concrete attribute taxonomy
- AWS CloudTrail — audit record schema patterns (who/what/when/where + correlation IDs)

## ➡️ Next 3 actions (in order)

1) Add Cycle 20 evidence URLs to `artifacts/sources.md`.
2) Create Cycle 20 evidence notes (3 features + 2 workflows + 3 steal ideas + thin slice).
3) Append Cycle 20 entries to `artifacts/competitor-matrix.md` + add Cycle 20 insights to `artifacts/summary.md`.

---

## 🎯 Current cycle focus (Cycle 21)

- Deepen adjacent “audit schema + correlation standards” primitives to steal patterns for:
  - audit categories and query/export workflows
  - canonical audit envelope + typed payload extensions
  - correlation primitives (`trace-id`, `request-id`) that tie audit logs, automation runs, and delivery attempts

## ✅ N limit

- N=3 (efficiency > completeness)

## 🧩 Competitors / standards (Cycle 21)

- Google Cloud Audit Logs — structured audit payload patterns (`protoPayload`/`AuditLog`) + category/query workflows
- W3C Trace Context — `traceparent` + `tracestate` headers for correlation
- W3C Baggage — `baggage` header for allowlisted key-value context propagation

## ➡️ Next 3 actions (in order)

1) Add Cycle 21 evidence URLs to `artifacts/sources.md`.
2) Create Cycle 21 evidence notes (3 features + 2 workflows + 3 steal ideas + thin slice).
3) Append Cycle 21 entries to `artifacts/competitor-matrix.md` + add Cycle 21 insights to `artifacts/summary.md`.

---

## 🎯 Current cycle focus (Cycle 22)

- Deepen adjacent “audit log streaming + export jobs” primitives to steal patterns for:
  - destination catalogs (SIEM/storage/event bus) + validation (“Check endpoint”)
  - configuration as API (IaC / admin automation)
  - export jobs + retention controls (compliance-grade)
  - pragmatic constraints (query window limits, intentionally limited filters)

## ✅ N limit

- N=3 (efficiency > completeness)

## 🧩 Competitors / standards (Cycle 22)

- GitHub Enterprise Cloud — audit log streaming destinations + configuration APIs + export workflow
- WorkOS — audit logs product primitives (schema registry, exports, retention, configuration)
- GitLab — audit events with role gating + query window limits + constrained search

## ➡️ Next 3 actions (in order)

1) Add Cycle 22 evidence URLs to `artifacts/sources.md`.
2) Create Cycle 22 evidence notes (3 features + 2 workflows + 3 steal ideas + thin slice).
3) Append Cycle 22 entries to `artifacts/competitor-matrix.md` + add Cycle 22 insights to `artifacts/summary.md`.

---

## 🎯 Current cycle focus (Cycle 23)

- Deepen adjacent “code-shaped audit export APIs” primitives to steal patterns for:
  - cursor pagination + `rel=next` link headers
  - separating event feed from stream configs (object model)
  - stream config typed schemas + encryption/rotation posture
  - action catalog + schema registry for audit-as-a-product

## ✅ N limit

- N=3 (efficiency > completeness)

## 🧩 Competitors / standards (Cycle 23)

- Okta — System Log OpenAPI (`/api/v1/logs`) + Log Streaming API (`/api/v1/logStreams`)
- GitHub Enterprise Cloud — audit log streaming config schema (`stream_type` + `stream_details`) + stream-key encryption workflow
- WorkOS — audit logs endpoint taxonomy (`actions`, `schemas`, `exports`, `retention`)

## ➡️ Next 3 actions (in order)

1) Add Cycle 23 evidence URLs to `artifacts/sources.md`.
2) Create Cycle 23 evidence notes (3 features + 2 workflows + 3 steal ideas + thin slice).
3) Append Cycle 23 entries to `artifacts/competitor-matrix.md` + add Cycle 23 insights to `artifacts/summary.md`.

---

## 🎯 Current cycle focus (Cycle 24)

- Deepen adjacent “destination schemas + channel-gated audit taxonomy” primitives to steal patterns for:
  - schema-driven destination UI (`GET /schemas` and `GET /schemas/:type`)
  - explicit destination type enums and lifecycle operations (activate/deactivate)
  - stream-only vs UI-visible event taxonomy and field-level visibility

## ✅ N limit

- N=2 (efficiency > completeness; both are high-signal)

## 🧩 Competitors / standards (Cycle 24)

- Okta — log stream destination types (`LogStreamType`) + schema endpoints (`/api/v1/meta/schemas/logStream*`) + lifecycle endpoints
- GitHub — audit event docs explicitly marking stream-only/export-only events + fields-per-event lists

## ➡️ Next 3 actions (in order)

1) Add Cycle 24 evidence URLs to `artifacts/sources.md`.
2) Create Cycle 24 evidence notes (3 features + 2 workflows + 3 steal ideas + thin slice).
3) Append Cycle 24 entries to `artifacts/competitor-matrix.md` + add Cycle 24 insights to `artifacts/summary.md`.

---

## ✅ Cycle 25 completed (workflow automation governance + run ops primitives)

- Competitors: Zapier, Workato, Pipedream, n8n
- Output: appended Cycle 25 to `artifacts/competitor-matrix.md` + added Cycle 25 primitives to `artifacts/summary.md` + added n8n evidence + updated `artifacts/sources.md`.

---

## 🎯 Current cycle focus (Cycle 26)

- Deepen “automation builder as a product surface” primitives that we can transplant into our ecommerce admin:
  - templates/gallery + sharing (discoverability + standardization)
  - versioning + environments + safe rollout (change management)
  - approvals + human tasks (inbox, SLAs, escalation)
  - run history UX (search, replay, redaction)

## ✅ N limit

- N=3 (efficiency > completeness)

## 🧩 Competitors (Cycle 26)

- Slack Workflow Builder — lightweight “human tasks” + sharing patterns
- Jira Automation — rule builder templates + audit/logging patterns
- Retool Workflows — internal workflows + run history + RBAC (admin-first UI)

## ➡️ Next 3 actions (in order)

1) Gather 1–2 doc URLs per competitor proving templates/sharing/versioning/ops UI features.
2) Create/extend evidence notes for the 3 competitors (3 notable features + 2 workflows + 3 steal ideas + thin slice).
3) Append Cycle 26 batch to `artifacts/competitor-matrix.md` + add 3–7 insights to `artifacts/summary.md`.

---

## ✅ Cycle 26 completed (templates + reusable building blocks + run logs export)

- Competitors: GitHub Actions, Retool Workflows, Slack Workflow Builder
- Output: evidence notes created/updated + Cycle 26 appended to `artifacts/competitor-matrix.md` and `artifacts/summary.md` + sources updated.

---

## 🎯 Current cycle focus (Cycle 27)

- Deepen “template gallery” and “sharing” primitives in automation tools that are explicitly template-driven:
  - Zapier templates / sharing
  - Make templates / scenario templates
  - n8n templates (if available) or a similar OSS tool with clear template docs

## ✅ N limit

- N=3 (efficiency > completeness)

## ➡️ Next 3 actions (in order)

1) Find template/gallery URLs and any sharing/governance pages for the 3 tools (evidence-first).
2) Extract 3 features + 2 workflows + steal ideas and thin slice for each.
3) Append Cycle 27 batch to the matrix + add 3–7 insights to summary.
