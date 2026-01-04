---
status: draft
last_reviewed: 2025-12-28
owner: agent
---

# Competitor Matrix (Adjacent Sweep)

Purpose: adjacent tools that contain copyable admin/ops patterns.

## 1) Scope (transfer test)

- Transfer test:
  - If it improves ecommerce admin workflows → in scope.
  - If it’s pure enterprise infra without admin UX learnings → deprioritize.
- Target persona(s): merchant admins (primary), internal ops (secondary)
- Adjacent categories (used here):
  - Analytics + product analytics + BI
  - Session replay / heatmaps
  - Experimentation + A/B testing
  - Feature flags + remote config
  - CMS / content ops
  - Internal tools builders
  - Automation / workflow engines

## 2) Breadth list (30–60)

Format:
- Name — Category — What they sell (1 line) — What we can steal (1 line) — Links

- PostHog — product analytics (oss) — developer-focused analytics stack — “measure admin usage → prioritize → validate” — https://posthog.com
- Matomo — web analytics (oss) — analytics platform — privacy-first analytics patterns — https://matomo.org
- Plausible — web analytics (oss) — lightweight analytics — simple dashboards patterns — https://plausible.io
- Umami — web analytics (oss) — analytics platform — self-host analytics patterns — https://umami.is
- Mixpanel — product analytics — event analytics — funnels/cohorts patterns — https://mixpanel.com
- Amplitude — product analytics — analytics platform — experimentation + analytics patterns — https://amplitude.com
- Heap — product analytics — analytics platform — instrumentation patterns — https://heap.io
- Segment — CDP — data routing platform — identity stitching patterns — https://segment.com
- RudderStack — CDP (oss) — data pipelines — OSS pipeline patterns — https://www.rudderstack.com
- Metabase — BI (oss) — dashboards/BI — embed dashboards into admin — https://www.metabase.com
- Apache Superset — BI (oss) — dashboards/BI — internal analytics patterns — https://superset.apache.org
- Hotjar — heatmaps/session replay — UX analytics — behavior insights patterns — https://www.hotjar.com
- FullStory — session replay — UX analytics — replay + search patterns — https://www.fullstory.com
- LogRocket — session replay — replay + analytics — “debug by replay” patterns — https://logrocket.com
- GrowthBook — experimentation (oss) — experiments + flags — experiment control plane UX — https://www.growthbook.io
- Optimizely — experimentation — experimentation suite — experiment workflow patterns — https://www.optimizely.com
- VWO — experimentation — A/B testing suite — experiment workflow patterns — https://vwo.com
- LaunchDarkly — feature flags — feature management platform — rollout/kill-switch UX — https://launchdarkly.com
- Unleash — feature flags (oss) — OSS feature flags — server + segments patterns — https://www.getunleash.io
- Flagsmith — feature flags (oss) — OSS flags/remote config — per-tenant config patterns — https://flagsmith.com
- Strapi — headless CMS (oss) — CMS + admin UI — content modeling patterns — https://strapi.io
- Directus — headless CMS (oss) — data + admin UI — table/filter/bulk action patterns — https://directus.io
- Payload CMS — headless CMS — Node CMS — strong stack-fit content ops patterns — https://payloadcms.com
- Retool — internal tools — app builder — internal admin builder patterns — https://retool.com
- Appsmith — internal tools (oss) — internal app builder — OSS admin builder patterns — https://www.appsmith.com
- ToolJet — internal tools (oss) — internal app builder — OSS admin builder patterns — https://tooljet.com
- Budibase — internal tools (oss) — internal app builder — OSS admin builder patterns — https://budibase.com
- Zapier — workflow automation — automation platform — trigger/action patterns — https://zapier.com
- Make (Integromat) — workflow automation — automation platform — trigger/action patterns — https://www.make.com
- n8n — workflow automation (oss) — automation workflows — OSS workflow builder patterns — https://n8n.io
- Pipedream — workflow automation — dev automation — event-driven patterns — https://pipedream.com

## 3) Winners deepened (top ~15)

### PostHog (adjacent)

- Category: product analytics (oss)
- Website: https://posthog.com
- What they sell: “dev tools for product engineers” analytics stack (instrument, measure, iterate).
- Admin/ops transfer insight: blueprint for “measure admin usage → decide what to build next based on evidence”.

Notable features (5–10):
- Analytics + “build/test/measure/ship” positioning
- The idea of keeping experimentation + flags + analytics close together (one control plane)

Copyable workflows (2–4):
1) Instrument admin events → dashboards → identify drop-offs → ship improvements
2) Feature flag a change → rollout gradually → compare outcomes

What we can steal:
- Easy: event taxonomy template + dashboards for admin usage
- Medium: embed analytics “insights” into the admin itself
- Hard: full replay/analytics infra (self-hosting cost)

Evidence links:
- `competitors/evidence/posthog.md`

### LaunchDarkly (adjacent)

- Category: feature flags
- Website: https://launchdarkly.com
- What they sell: feature flags / feature management / experimentation control plane.
- Admin/ops transfer insight: the canonical UX patterns for safe rollout + kill-switch + governance.

Notable features (5–10):
- Release workflow as a first-class control-plane UX surface: https://docs.launchdarkly.com/home/releases
- Approval workflows for governance (review/approve changes): https://docs.launchdarkly.com/home/approvals
- “Releases” framing implies staged rollout patterns we can reuse for admin changes: https://docs.launchdarkly.com/home/releases

Copyable workflows (2–4):
1) Ship safely: create change → stage rollout → monitor → promote/rollback  
   Evidence: https://docs.launchdarkly.com/home/releases
2) Governance: require approvals for sensitive changes (“two-person rule”)  
   Evidence: https://docs.launchdarkly.com/home/approvals

What we can steal:
- Easy: “release workflow” stepper UI (draft → rollout → done) that works for config changes too.
- Medium: approvals for high-risk admin actions (refunds, fulfillment holds, pricing rules) with audit trail.
- Hard: enterprise-grade policy engine and org-scale governance.

Thin-slice (1–3 days):
- Day 1: add “Change request” object with states (draft → awaiting approval → applied).
- Day 2: approvals (1 reviewer) + required comment + immutable audit log entry.
- Day 3: staged rollout for config changes (apply to subset of merchants/tenants → expand).

Evidence links:
- `competitors/evidence/launchdarkly.md`

### Unleash (adjacent)

- Category: feature flags (oss)
- Website: https://www.getunleash.io
- What they sell: OSS feature flag server.
- Admin/ops transfer insight: likely best OSS primitive for staged rollouts if we want self-host.

Notable features (5–10):
- Feature management system overview (core model framing): https://docs.getunleash.io/reference/unleash-overview
- Feature toggle types taxonomy (release/experiment/ops/permission): https://docs.getunleash.io/reference/feature-toggles/feature-toggle-types
- Composable rollout/targeting rules via “strategies”: https://docs.getunleash.io/reference/feature-toggles/strategies

Copyable workflows (2–4):
1) Choose toggle type → configure strategies → roll out by rules/segments  
   Evidence: https://docs.getunleash.io/reference/feature-toggles/feature-toggle-types  
   Evidence: https://docs.getunleash.io/reference/feature-toggles/strategies
2) Operate: maintain “ops toggles” for incident response (fast disable/enable controls)  
   Evidence: https://docs.getunleash.io/reference/feature-toggles/feature-toggle-types

What we can steal:
- Easy: adopt the toggle-type taxonomy in our admin (release vs ops vs permission).
- Medium: strategy templates (percentage rollout, allowlist, attribute match) + “preview impacted merchants”.
- Hard: full strategy ecosystem + SDK parity + governance at scale.

Thin-slice (1–3 days):
- Day 1: add “flag type” field (release/ops/permission) with type-specific warnings/defaults.
- Day 2: implement 3 strategies (`always_on`, `percentage_rollout`, `attribute_match` by merchantId/storeId).
- Day 3: add “strategy preview” (list affected merchants) before enabling.

Evidence links:
- `competitors/evidence/unleash.md`

### Flagsmith (adjacent)

- Category: feature flags (oss)
- Website: https://flagsmith.com
- What they sell: OSS flags + remote config.
- Admin/ops transfer insight: remote config is directly useful for per-client customization without deploys.

Notable features (5–10):
- Remote config (key/value config beyond boolean flags): https://docs.flagsmith.com/advanced-use/remote-config
- Audit logs as a first-class governance primitive: https://docs.flagsmith.com/platform-features/audit-logs
- Remote config enables per-tenant customization without redeploys: https://docs.flagsmith.com/advanced-use/remote-config

Copyable workflows (2–4):
1) Change config value → observe effect instantly → roll back if needed  
   Evidence: https://docs.flagsmith.com/advanced-use/remote-config
2) Governance: review who changed what and when (audit trail)  
   Evidence: https://docs.flagsmith.com/platform-features/audit-logs

What we can steal:
- Easy: “config keys” UI with types (bool/string/number/json) + per-merchant overrides.
- Medium: immutable audit log entries + diff view for config changes.
- Hard: multi-service correctness + SDK rollout across backend/frontend.

Thin-slice (1–3 days):
- Day 1: implement `config_keys` + `config_values` with per-merchant overrides; add admin UI to edit.
- Day 2: add immutable audit log entries on create/update/delete + “diff view”.
- Day 3: add guarded rollout (“apply to subset of merchants” + “preview impacted merchants”).

Evidence links:
- `competitors/evidence/flagsmith.md`

### GrowthBook (adjacent)

- Category: experimentation (oss)
- Website: https://www.growthbook.io
- What they sell: experimentation + feature flags.
- Admin/ops transfer insight: experimentation UX patterns for “test changes” in a structured way.

Notable features (5–10):
- Feature flags as a first-class surface (targeting/rollouts): https://docs.growthbook.io/features/feature-flags
- Experiments as a first-class surface: https://docs.growthbook.io/features/experiments
- Feature scheduling (time-based releases): https://docs.growthbook.io/features/feature-scheduling

Copyable workflows (2–4):
1) Experiment workflow: define variants → run → analyze → decide  
   Evidence: https://docs.growthbook.io/features/experiments
2) Launch workflow: schedule release → roll out → stop/adjust  
   Evidence: https://docs.growthbook.io/features/feature-scheduling

What we can steal:
- Easy: “experiments as a checklist” UI (hypothesis, variants, metric, decision) inside admin.
- Medium: scheduling as a reusable primitive across admin objects (promotions, price rules, content).
- Hard: statistically-correct experimentation + metrics attribution end-to-end.

Thin-slice (1–3 days):
- Day 1: implement scheduled changes for one admin object (e.g., promotion start/end) with a timeline view.
- Day 2: implement basic bucketing/assignment for one admin change (e.g., new UI) by merchantId.
- Day 3: implement a decision UI (win/lose/inconclusive) + “promote winner” action with audit log entry.

Evidence links:
- `competitors/evidence/growthbook.md`

### Strapi (adjacent)

- Category: headless CMS (oss)
- Website: https://strapi.io
- What they sell: CMS + admin UI.
- Admin/ops transfer insight: integrating a CMS is usually cheaper than building content ops from scratch.

Notable features (5–10):
- Content modeling + admin editing patterns

Copyable workflows (2–4):
1) Define content model → edit content → publish
2) Role-based editing permissions

What we can steal:
- Easy: content modeling UX patterns
- Medium: media library patterns
- Hard: approvals + publishing workflow engine

Evidence links:
- `competitors/evidence/strapi.md`

### Directus (adjacent)

- Category: headless CMS / data platform (oss)
- Website: https://directus.io
- What they sell: data browsing/admin UI + content ops.
- Admin/ops transfer insight: “table + filters + bulk actions” patterns map directly to merchant admin UX.

Notable features (5–10):
- Data browsing/admin UI patterns

Copyable workflows (2–4):
1) Browse records → filter/search → bulk actions
2) Field-level permissions patterns

What we can steal:
- Easy: table/filter/bulk-action UI patterns
- Medium: schema-driven forms generation
- Hard: generic “admin for any DB” scope

Evidence links:
- `competitors/evidence/directus.md`

### Payload CMS (adjacent)

- Category: headless CMS
- Website: https://payloadcms.com
- What they sell: dev-first CMS (Node/TS) with admin UI.
- Admin/ops transfer insight: likely best stack-fit CMS patterns for TS-heavy teams.

Notable features (5–10):
- Dev-first CMS positioning

Copyable workflows (2–4):
1) Define collections → manage content → publish
2) Integrate content into app UI via stable API

What we can steal:
- Easy: content types + access control patterns
- Medium: rich editor/media UX patterns
- Hard: bespoke editorial workflows

Evidence links:
- `competitors/evidence/payload-cms.md`

### n8n (adjacent)

- Category: workflow automation (oss)
- Website: https://n8n.io
- What they sell: automation workflow builder.
- Admin/ops transfer insight: “trigger/action” automation can become a core admin differentiator.

Notable features (5–10):
- Executions as a first-class concept (run history): https://docs.n8n.io/workflows/executions/
- “All executions” view (global run log) + per-workflow runs: https://docs.n8n.io/workflows/executions/all-executions/  
  https://docs.n8n.io/workflows/executions/workflow-executions/
- Reliability primitives: explicit error handling + retries: https://docs.n8n.io/flow-logic/error-handling/  
  https://docs.n8n.io/flow-logic/execution/retries/

Copyable workflows (2–4):
1) Build automation → observe runs → debug failures (executions as the hub)  
   Evidence: https://docs.n8n.io/workflows/executions/
2) Recover from failures: error handling path + retry policy  
   Evidence: https://docs.n8n.io/flow-logic/error-handling/  
   Evidence: https://docs.n8n.io/flow-logic/execution/retries/

What we can steal:
- Easy: make “Runs” a first-class object (list + drilldown + payload previews) like n8n executions.
- Medium: standardized reliability controls per automation (retry policy + on-failure route/notification).
- Hard: generalized node-based builder + execution engine + connector ecosystem.

Thin-slice (1–3 days):
- Day 1: add “Automation Runs” table + drilldown (inputs/outputs).
- Day 2: add per-rule retry policy (attempts + delay) + “on failure” action.
- Day 3: add “All runs” view + “Runs per automation” view (global vs per-workflow drilldown).

Evidence links:
- `competitors/evidence/n8n.md`

### Metabase (adjacent)

- Category: BI (oss)
- Website: https://www.metabase.com
- What they sell: BI dashboards.
- Admin/ops transfer insight: fastest way to ship internal KPIs/dashboards without reinventing BI.

Notable features (5–10):
- Self-serve dashboards + filtering patterns

Copyable workflows (2–4):
1) Define KPI dashboards → share → schedule reports
2) Self-serve filtering for ops users

What we can steal:
- Easy: KPI dashboard patterns
- Medium: embed dashboards inside our admin
- Hard: multi-tenant analytics security

Evidence links:
- `competitors/evidence/metabase.md`

---

## 3) Additional deepened set (batch 2)

### Matomo (adjacent)

- Category: web analytics (oss)
- Website: https://matomo.org
- What they sell: privacy-first analytics alternative with cloud + on-prem options (strong “ethical” positioning).
- Admin/ops transfer insight: analytics UX + privacy-first defaults are reusable patterns for merchant-admin telemetry.

Notable features (5–10):
- Privacy-first positioning (explicitly contrasted with Google Analytics)
- Features list page exists (strong breadth signal)
- Pricing compare page exists (cloud vs on-prem packaging signal)

Copyable workflows (2–4):
1) Install/collect events → view dashboards → iterate tracking
2) Choose hosting mode (cloud vs on-prem) → configure privacy settings → audit data handling

What we can steal:
- Easy: “privacy controls” UX patterns + settings grouping
- Medium: dashboard + filtering patterns for admin analytics
- Hard: full analytics stack (event pipeline + reporting breadth)

Evidence links:
- `competitors/evidence/matomo.md`

### Heap (adjacent)

- Category: product analytics
- Website: https://heap.io
- What they sell: digital insights platform emphasizing full user behavior capture (“unknown unknowns”).
- Admin/ops transfer insight: capture-first analytics and “find the issue fast” workflows map directly to admin UX optimization.

Notable features (5–10):
- “Shows everything users do” positioning (capture breadth)
- Emphasis on faster insights / discovery

Copyable workflows (2–4):
1) Capture interactions → explore paths/funnels → identify drop-offs → iterate UX
2) Investigate anomaly → drill into sessions → derive fix → validate improvement

What we can steal:
- Easy: investigation UI patterns (drilldowns, “unknown unknowns” prompts)
- Medium: admin usage analytics instrumentation + exploration dashboards
- Hard: full session replay + analytics engine

Evidence links:
- `competitors/evidence/heap.md`

### Segment (adjacent)

- Category: CDP
- Website: https://segment.com
- What they sell: customer data platform to collect, clean, and activate customer data.
- Admin/ops transfer insight: “unified profile + destinations” mental model informs our integrations layer and admin config UX.

Notable features (5–10):
- Collect / clean / activate framing (pipeline + activation)
- Pricing plans page exists (packaging signal)
- Product page exists (surface for “destinations” style configuration)

Copyable workflows (2–4):
1) Collect events → normalize/clean → build audiences → send to tools
2) Govern data → enforce rules → monitor pipeline health

What we can steal:
- Easy: integrations catalog UX patterns (sources/destinations)
- Medium: data governance + “pipeline health” admin panels
- Hard: full CDP pipeline + identity resolution

Evidence links:
- `competitors/evidence/segment.md`

### RudderStack (adjacent)

- Category: CDP (oss)
- Website: https://www.rudderstack.com
- What they sell: CDP/pipelines positioning (snapshots captured; details vary by pages).
- Admin/ops transfer insight: OSS-ish pipelines are potential accelerators for event routing.

Notable features (5–10):
- Pipeline orientation (sources → transformations → destinations)
- OSS-ish positioning (self-host posture)

Copyable workflows (2–4):
1) Connect source → transform events → route to destinations → monitor failures
2) Configure schema rules → enforce governance → audit changes

What we can steal:
- Easy: pipeline config UX patterns (stepper setup, validation, preview)
- Medium: lightweight event router for internal telemetry
- Hard: full CDP ecosystem breadth

Evidence links:
- `competitors/evidence/rudderstack.md`

### Apache Superset (adjacent)

- Category: BI (oss)
- Website: https://superset.apache.org
- What they sell: data visualization + exploration platform (community site; docs URL exists as a directory listing in snapshot).
- Admin/ops transfer insight: BI embed patterns can power merchant/admin dashboards without reinventing BI.

Notable features (5–10):
- Clear “data viz + exploration” positioning
- Docs surface exists (even if not via a neat /docs page)

Copyable workflows (2–4):
1) Connect data → build charts → assemble dashboards → share internally
2) Explore data → filter/drilldown → answer ops questions quickly

What we can steal:
- Easy: dashboard layout + filter UX patterns
- Medium: embedding dashboards inside our admin with per-tenant access
- Hard: BI query engine + permissions at scale

Evidence links:
- `competitors/evidence/apache-superset.md`

### Optimizely (adjacent)

- Category: experimentation
- Website: https://www.optimizely.com
- What they sell: AI-powered digital experience platform (content + testing + personalization positioning).
- Admin/ops transfer insight: “test + personalize + prove impact” is a reusable optimization loop for ecommerce admin tooling.

Notable features (5–10):
- Combined content + testing + personalization narrative
- Pricing exists (customized pricing)

Copyable workflows (2–4):
1) Create content/experience → run test → measure impact → ship winner
2) Personalize journeys → measure outcomes → iterate

What we can steal:
- Easy: experiment setup copy + UX stepper patterns
- Medium: internal experimentation guardrails + reporting inside admin
- Hard: enterprise experimentation + personalization engine

Evidence links:
- `competitors/evidence/optimizely.md`

### VWO (adjacent)

- Category: experimentation
- Website: https://vwo.com
- What they sell: digital experience optimization (experimentation + CRO + personalization).
- Admin/ops transfer insight: strong blueprint for “optimization program” workflows and packaging.

Notable features (5–10):
- Explicit experimentation + CRO positioning
- Features suite page exists (testing + understand customers + personalize + measure)
- Pricing supports add-on modularity (start with one product)

Copyable workflows (2–4):
1) Define hypothesis → create variants → run experiment → measure → ship winner
2) Run an “optimization program”: track experiments → reuse learnings → grow velocity

What we can steal:
- Easy: experiment library + results UI patterns
- Medium: personalization rule builders (basic) + reporting
- Hard: full experimentation suite + stats engine

Evidence links:
- `competitors/evidence/vwo.md`

### AB Tasty (adjacent)

- Category: experimentation
- Website: https://www.abtasty.com
- What they sell: experimentation/personalization platform (snapshot blocked).

Notable features (5–10):
- Snapshot blocked (“Just a moment…”), needs manual follow-up or alternate sources.

Copyable workflows (2–4):
1) (blocked) capture experiment setup + results UX patterns
2) (blocked) capture personalization rule builder patterns

What we can steal:
- Easy: n/a until unblocked
- Medium: n/a until unblocked
- Hard: n/a until unblocked

Evidence links:
- `competitors/evidence/ab-tasty.md`

### Split.io (adjacent)

- Category: feature flags
- Website: https://www.split.io
- What they sell: feature management + experimentation (snapshot indicates Split is under Harness branding).
- Admin/ops transfer insight: feature flags + experimentation are foundational for safe “vibe coding” rollouts.

Notable features (5–10):
- Feature management + experimentation surface (product page captured)
- Pricing exists under Harness (packaging signal)

Copyable workflows (2–4):
1) Create flag → target segment → roll out gradually → monitor → rollback
2) Attach metrics → run experiment → pick winner → promote to default

What we can steal:
- Easy: rollout UI patterns (percentage rollouts, segments, environments)
- Medium: per-tenant flags in our admin with auditability
- Hard: enterprise feature management platform breadth

Evidence links:
- `competitors/evidence/split-io.md`

## Cycle 20 — audit + telemetry taxonomy primitives (portable envelopes + delivery traces) (adjacent)

### CloudEvents (portable envelope + event taxonomy versioning) (adjacent)

- Category: event envelope standard (audit/automation exports)
- Website: https://cloudevents.io/
- What they sell: a vendor-neutral event envelope that makes exported events portable across tooling (webhooks, queues, sinks).

Notable features (3):
- Defines core attributes (`specversion`, `id`, `source`, `type`) for routing/correlation  
  Evidence: https://raw.githubusercontent.com/cloudevents/spec/main/cloudevents/spec.md
- Defines optional attributes that map well to audit/automation (`subject`, `time`, `dataschema`, `datacontenttype`)  
  Evidence: https://raw.githubusercontent.com/cloudevents/spec/main/cloudevents/spec.md
- Specifies uniqueness guidance (`source` + `id`) for de-duplication semantics  
  Evidence: https://raw.githubusercontent.com/cloudevents/spec/main/cloudevents/spec.md

Copyable workflows (2):
1) Standardize our outbound audit events as CloudEvents JSON → deliver via webhook/queue → customers consume with stable envelope  
   Evidence: https://raw.githubusercontent.com/cloudevents/spec/main/cloudevents/spec.md
2) Make automation triggers portable: `type=lumelle.orders.v1.*` and `subject=order/<id>` → internal and external automation subscribes consistently  
   Evidence: https://raw.githubusercontent.com/cloudevents/spec/main/cloudevents/spec.md

What we can steal:
- Easy: a single export format (CloudEvents JSON) for audit and automation events.
- Medium: event type taxonomy versioning (`lumelle.audit.v1.*`) + `dataschema` links for schema governance.
- Hard: schema registry + validation for every emitted event type (prevent breaking changes).

Thin slice (1–3 days):
- Day 1: define 8–12 audit event types and map them to CloudEvents fields (type/source/subject/id/time).
- Day 2: implement emitter + webhook exporter that sends CloudEvents JSON to customer endpoints.
- Day 3: add deliveries log + per-event replay + basic de-dupe semantics (idempotency keys).

Evidence links:
- `competitors/evidence/cloudevents-audit-envelope-taxonomy.md`
- `competitors/evidence/cloudevents.md`

### Svix (OpenTelemetry streaming for delivery attempts) (adjacent)

- Category: delivery telemetry / observability export
- Website: https://docs.svix.com/opentelemetry-streaming
- What they sell: delivery attempts as traces/spans so customers can use their existing observability stack for webhook operations.

Notable features (3):
- Two-span trace model: outer `message_attempt` span + inner `http_attempt` span  
  Evidence: https://docs.svix.com/opentelemetry-streaming
- Concrete span attribute taxonomy (org/app/endpoint/message IDs, event type, attempt count, status, HTTP response status code)  
  Evidence: https://docs.svix.com/opentelemetry-streaming
- Custom span attributes supported (per-app and per-event) via parameters (`otel.custom-*`, `transformationsParams.otel`)  
  Evidence: https://docs.svix.com/opentelemetry-streaming

Copyable workflows (2):
1) Support workflow: open delivery attempt → jump to trace view to see timing + response codes across retries  
   Evidence: https://docs.svix.com/opentelemetry-streaming
2) Customer self-serve: build dashboards by event type / endpoint / status without exporting full payloads  
   Evidence: https://docs.svix.com/opentelemetry-streaming

What we can steal:
- Easy: model delivery attempts as traces and add a “Trace link” in delivery logs.
- Medium: span attribute taxonomy that matches our domain objects (tenant/app/endpoint/message/attempt).
- Hard: customer-configurable telemetry export pipeline with RBAC + audit for changes.

Thin slice (1–3 days):
- Day 1: instrument our delivery pipeline with spans (`delivery_attempt`, `http_attempt`) and stable IDs.
- Day 2: store a trace-id per attempt and deep-link from “Deliveries” UI.
- Day 3: implement a minimal allowlisted custom-attributes system + audit events on config change.

Evidence links:
- `competitors/evidence/svix-opentelemetry-streaming.md`

### AWS CloudTrail (audit record schema patterns) (adjacent)

- Category: audit log record schema (identity + action + time + origin)
- Website: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-event-reference-record-contents.html
- What they sell: strong patterns for structuring “who did what when where” audit records that support investigations and exports.

Notable features (3):
- Canonical action fields (`eventSource`, `eventName`) + timestamp (`eventTime`) + actor identity (`userIdentity`)  
  Evidence: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-event-reference-record-contents.html
- Origin context (`sourceIPAddress`, `userAgent`) as first-class audit data (anomaly detection + accountability)  
  Evidence: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-event-reference-record-contents.html
- Unique event identification and correlation (`eventID`, `requestID`)  
  Evidence: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-event-reference-record-contents.html

Copyable workflows (2):
1) Investigation loop: filter by actor → filter by action → correlate by time + source IP → export records  
   Evidence: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-event-reference-record-contents.html
2) Cross-system correlation: use request/event IDs to link audit rows with application logs and delivery attempts  
   Evidence: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-event-reference-record-contents.html

What we can steal:
- Easy: stable audit fields for every sensitive admin action.
- Medium: audit log UI filters aligned to those fields (actor/action/time/source ip).
- Hard: end-to-end correlation IDs across admin actions, automations, and outbound deliveries.

Thin slice (1–3 days):
- Day 1: define canonical audit record schema for Lumelle admin.
- Day 2: emit audit events for “high-risk delivery ops” actions (secret rotate, disable endpoint, payload view, bulk replay).
- Day 3: add export (CSV) and optional CloudEvents format export for downstream tooling.

Evidence links:
- `competitors/evidence/cloudtrail-event-record-schema.md`

---

## Cycle 21 — audit schema + correlation standards (GCP + W3C trace headers) (adjacent)

### Google Cloud Audit Logs (audit schema + categories) (adjacent)

- Category: audit log schema + categories + query workflows
- Website: https://docs.cloud.google.com/logging/docs/audit
- What they sell: strong, structured patterns for audit logs (canonical envelope + typed payload) and query-first workflows.

Notable features (3):
- Audit log entries use `protoPayload` to carry an `AuditLog` object (audit-specific payload inside a generic log entry)  
  Evidence: https://docs.cloud.google.com/logging/docs/audit
- Audit payload includes audit-specific fields (docs call out fields like `serviceName`, `methodName`, `authenticationInfo`)  
  Evidence: https://docs.cloud.google.com/logging/docs/audit/understanding-audit-logs
- Audit logs are grouped/categorized via log names and can be queried via the Logging API (docs include `entries.list` filter examples on `logName`)  
  Evidence: https://docs.cloud.google.com/logging/docs/audit

Copyable workflows (2):
1) Query audit logs by category and export: filter `logName` to select activity/system/data access → page results → export  
   Evidence: https://docs.cloud.google.com/logging/docs/audit
2) Interpret an audit entry: who (`authenticationInfo`) + what (`methodName`) + service (`serviceName`) + resource + status  
   Evidence: https://docs.cloud.google.com/logging/docs/audit/understanding-audit-logs

What we can steal:
- Easy: audit log category filters + consistent naming.
- Medium: generic envelope + typed payload pattern (`protoPayload`) to keep canonical fields stable while allowing extension.
- Hard: compliance-ready audit export APIs (pagination, retention controls, integration hooks).

Thin slice (1–3 days):
- Day 1: implement canonical audit envelope + audit categories.
- Day 2: implement audit filtering UX + export (CSV) for core categories.
- Day 3: add extensible `metadata` / typed payload field for domain-specific details.

Evidence links:
- `competitors/evidence/gcp-cloud-audit-logs-schema.md`

### W3C Trace Context (correlation header standard) (adjacent)

- Category: distributed trace context propagation (correlation IDs)
- Website: https://www.w3.org/TR/trace-context/
- What they sell: a stable standard for carrying correlation IDs across systems (`traceparent`, `tracestate`).

Notable features (3):
- Standard `traceparent` header for propagating trace context  
  Evidence: https://www.w3.org/TR/trace-context/
- Standard `tracestate` header for carrying vendor-specific context alongside `traceparent`  
  Evidence: https://www.w3.org/TR/trace-context/
- Versioned header format supports interoperability across heterogeneous systems  
  Evidence: https://www.w3.org/TR/trace-context/

Copyable workflows (2):
1) Persist trace-id on delivery attempts and audit events so support can join “who did what” to “what happened in delivery”  
   Evidence: https://www.w3.org/TR/trace-context/
2) End-to-end correlation through async boundaries (jobs, retries) so delivery attempts can be traced consistently  
   Evidence: https://www.w3.org/TR/trace-context/

What we can steal:
- Easy: include trace-id in our audit + delivery object models and surface it in the UI.
- Medium: enforce propagation patterns and treat trace-id as a first-class correlation primitive.
- Hard: allow safe ingestion/preservation of external trace context (threat model required).

Thin slice (1–3 days):
- Day 1: propagate trace context internally and store trace-id on delivery attempts.
- Day 2: add “trace link” from delivery logs and “correlation search” in audit logs.
- Day 3: unify trace-id with CloudEvents `id`/`source` de-dupe semantics where appropriate.

Evidence links:
- `competitors/evidence/w3c-trace-context.md`

### W3C Baggage (key-value context propagation) (adjacent)

- Category: controlled propagation of key-value context (debug/routing/telemetry enrichment)
- Website: https://www.w3.org/TR/baggage/
- What they sell: a standard header (`baggage`) to propagate key-value metadata across services.

Notable features (3):
- Standard `baggage` header for propagating key-value pairs  
  Evidence: https://www.w3.org/TR/baggage/
- Vendor-neutral and interoperable (works alongside `traceparent`)  
  Evidence: https://www.w3.org/TR/baggage/
- Requires governance to avoid leaking sensitive data and bloating headers (design constraint we can incorporate)  
  Evidence: https://www.w3.org/TR/baggage/

Copyable workflows (2):
1) Allowlist-only baggage keys for internal correlation (`tenant_id`, `environment`, `integration_id`) to enrich traces/logs without payload access  
   Evidence: https://www.w3.org/TR/baggage/
2) Debug toggles: temporarily enable additional allowlisted keys for a tenant during incident response (with audit logging)  
   Evidence: https://www.w3.org/TR/baggage/

What we can steal:
- Easy: a strict allowlist of propagated metadata keys (block PII).
- Medium: admin controls to enable/disable keys per environment with audit.
- Hard: safe customer-configurable baggage injection (validate, size-limit, threat model).

Thin slice (1–3 days):
- Day 1: define allowlisted keys + size limits; strip everything else.
- Day 2: propagate allowlisted keys through tracing/logging and persist on delivery attempts.
- Day 3: add admin toggles and emit audit events on configuration changes.

Evidence links:
- `competitors/evidence/w3c-baggage.md`

---

## Cycle 22 — audit log streaming + exports as product primitives (GitHub + WorkOS + GitLab) (adjacent)

### GitHub Enterprise Cloud (audit log streaming + configuration APIs) (adjacent)

- Category: audit log streaming to SIEM/storage + configuration APIs + export workflows
- Website: https://docs.github.com/
- What they sell: enterprise audit log as a product surface (UI export + streaming destinations + API-managed configuration).

Notable features (3):
- Supports multiple streaming destinations (S3, Azure Blob, Azure Event Hubs, Datadog, Splunk, Google Cloud Storage)  
  Evidence: https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/streaming-the-audit-log-for-your-enterprise
- “Check endpoint” validation step to confirm connectivity/credentials during setup  
  Evidence: https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/streaming-the-audit-log-for-your-enterprise
- Streaming configuration is manageable by API: stream key retrieval + create/list/update/delete stream configurations  
  Evidence: https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/rest/enterprise-admin/audit-log

Copyable workflows (2):
1) UI-led setup: choose provider → enter credentials/URL → “Check endpoint” → verify events arrive in destination  
   Evidence: https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/streaming-the-audit-log-for-your-enterprise
2) API/IaC: manage stream configs programmatically + encrypt secrets using stream key endpoint → rotate/pause/resume without breaking consumers  
   Evidence: https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/rest/enterprise-admin/audit-log

What we can steal:
- Easy: “Check endpoint” UX and “last validated at” status indicator.
- Medium: provider abstraction: `stream_type` + typed `stream_details` and a universal stream lifecycle (enabled/paused).
- Hard: key management for secret encryption + rotation workflows (audited changes, safe rollout).

Thin slice (1–3 days):
- Day 1: implement destination config model + “Check endpoint” for webhooks and one storage sink.
- Day 2: implement destination write run-history (attempts + error taxonomy) + pause/resume.
- Day 3: add config APIs and audit events for stream config changes.

Evidence links:
- `competitors/evidence/github-audit-log-streaming-and-api.md`

### WorkOS (audit logs as an embedded product: schema + exports + retention) (adjacent)

- Category: audit logs product primitives for embedding in SaaS
- Website: https://workos.com/docs/reference/audit-logs
- What they sell: a fully productized audit log system including schema, export jobs, retention controls, and configuration.

Notable features (3):
- Audit Log Schema surface (schema registry) + schema endpoints (create/list)  
  Evidence: https://workos.com/docs/reference/audit-logs
- Export jobs as first-class objects (create export, get export)  
  Evidence: https://workos.com/docs/reference/audit-logs
- Retention controls (get/set retention) + audit log configuration endpoints  
  Evidence: https://workos.com/docs/reference/audit-logs

Copyable workflows (2):
1) Schema-first: define schema → emit events → schema powers UI (labels, filtering) and downstream consumers  
   Evidence: https://workos.com/docs/reference/audit-logs
2) Compliance export: create export job → poll/get export → deliver to auditor/warehouse; retention policy constrains exports  
   Evidence: https://workos.com/docs/reference/audit-logs

What we can steal:
- Easy: export jobs as objects (status + link) instead of only interactive download.
- Medium: explicit retention policy configuration with enforcement (max lookback).
- Hard: schema registry + action catalog to make audit logs “self-documenting” for customers.

Thin slice (1–3 days):
- Day 1: canonical audit envelope and action taxonomy for 10–15 high-signal actions.
- Day 2: export job model + admin UI (create export, show status, download).
- Day 3: retention policy config + enforcement + audit events on retention changes.

Evidence links:
- `competitors/evidence/workos-audit-logs-schema-exports-retention.md`

### GitLab (audit events: role gating + API window limits + intentionally limited search) (adjacent)

- Category: compliance audit events (UI + API) with explicit constraints
- Website: https://docs.gitlab.com/ee/user/compliance/audit_events.html
- What they sell: audit event visibility across scopes with governance roles and operational constraints.

Notable features (3):
- Role gating across scopes (group/project/instance) + “Auditor” access role for broad read-only visibility  
  Evidence: https://docs.gitlab.com/ee/user/compliance/audit_events.html
- API query window limit: `created_after` and `created_before` limited to max 30-day difference  
  Evidence: https://docs.gitlab.com/ee/user/compliance/audit_events.html
- Retention and search constraints: audit events retained indefinitely; UI search limited to actor + date range (no text search in details)  
  Evidence: https://docs.gitlab.com/ee/user/compliance/audit_events.html

Copyable workflows (2):
1) Auditor workflow: filter audit events by actor + date range → collect evidence for audits/compliance reviews  
   Evidence: https://docs.gitlab.com/ee/user/compliance/audit_events.html
2) Least-privilege auditing: grant “Auditor” read access without operational rights to change config/resources  
   Evidence: https://docs.gitlab.com/ee/user/compliance/audit_events.html

What we can steal:
- Easy: keep first-pass filters minimal and reliable (actor/time).
- Medium: enforce export/query window limits to protect system reliability.
- Hard: auditor role + “read-only governance tooling” as a formal product primitive.

Thin slice (1–3 days):
- Day 1: audit log page with actor + time filters and stable event schema.
- Day 2: export endpoint with window limits + pagination.
- Day 3: auditor role for audit reads + export rights (no operational mutation rights).

Evidence links:
- `competitors/evidence/gitlab-audit-events-admin-api-constraints.md`

---

## Cycle 23 — code-shaped audit log export APIs (Okta OpenAPI + GitHub stream schema + WorkOS endpoint taxonomy) (adjacent)

### Okta (System Log API + Log Streaming API) (adjacent)

- Category: audit/event stream API + log streaming configuration objects (SIEM export + admin automation)
- Website: https://developer.okta.com/docs/api/page-data/openapi/okta-management/management/tag/SystemLog/page-data.json
- What they sell: a programmatic audit log feed with cursor pagination and a separate “log stream config” API surface.

Notable features (3):
- System Log endpoint exists (`GET /api/v1/logs`) with time bounds and ordering  
  Evidence: https://developer.okta.com/docs/api/page-data/openapi/okta-management/management/tag/SystemLog/page-data.json
- Cursor pagination: `after` is an opaque token returned via `rel=next` link header  
  Evidence: https://developer.okta.com/docs/api/page-data/openapi/okta-management/management/tag/SystemLog/page-data.json
- Log streaming configs are first-class resources (`/api/v1/logStreams`) with activate/deactivate lifecycle endpoints and a stated constraint (up to two integrations per org)  
  Evidence: https://developer.okta.com/docs/api/page-data/openapi/okta-management/management/tag/LogStream/page-data.json

Copyable workflows (2):
1) Export polling loop: query by `since`/`until` (bounded) or `since` (polling) → follow `rel=next` using `after` → persist cursor for reliability  
   Evidence: https://developer.okta.com/docs/api/page-data/openapi/okta-management/management/tag/SystemLog/page-data.json
2) Config-as-code: create/replace/delete log streams via API and toggle state via activate/deactivate lifecycle endpoints  
   Evidence: https://developer.okta.com/docs/api/page-data/openapi/okta-management/management/tag/LogStream/page-data.json

What we can steal:
- Easy: cursor-based pagination using opaque `after` tokens and `Link: ...; rel=\"next\"` headers.
- Medium: separate “events feed” from “stream configs” (object model), so ops can delegate config without changing event semantics.
- Hard: typed stream destination schemas and lifecycle operations (activate/deactivate) with enforcement limits (max N configs).

Thin slice (1–3 days):
- Day 1: implement audit events API with `since`/`until`, `after`, `limit`, `sortOrder`.
- Day 2: implement `filter` and `q` (start allowlisted) + return `rel=next` pagination links.
- Day 3: implement destination configs and export cursor state + show last export attempt.

Evidence links:
- `competitors/evidence/okta-system-log-and-log-stream-openapi.md`

### GitHub (audit log streaming config schema) (adjacent)

- Category: audit log streaming config objects + secret encryption pattern
- Website: https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/rest/enterprise-admin/audit-log
- What they sell: enterprise-grade audit stream configuration (typed providers + encrypt secrets + CRUD configs).

Notable features (3):
- Stream configs have a provider discriminator (`stream_type`) + typed provider details (`stream_details`)  
  Evidence: https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/rest/enterprise-admin/audit-log
- Stream config lifecycle/state: includes `enabled` and response field `paused_at`  
  Evidence: https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/rest/enterprise-admin/audit-log
- Common secret-encryption pattern: stream-key endpoint provides a public key for encrypting secrets and provider configs include `key_id`  
  Evidence: https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/rest/enterprise-admin/audit-log

Copyable workflows (2):
1) Secure provisioning: fetch stream key → encrypt secrets → create config → validate delivery  
   Evidence: https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/rest/enterprise-admin/audit-log
2) IaC lifecycle: list/update/pause/delete stream configs via API without requiring manual UI changes  
   Evidence: https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/rest/enterprise-admin/audit-log

What we can steal:
- Easy: typed `stream_type` + `stream_details` JSON schema to keep multi-provider configs manageable.
- Medium: state machine with `enabled/paused_at` and change audit events.
- Hard: unify UI “Check endpoint” with API-managed configs so both paths share a single backend validation service.

Thin slice (1–3 days):
- Day 1: config model + provider discriminator.
- Day 2: “Check endpoint” backend validation + UI.
- Day 3: encryption/rotation workflow + audit entries for every config change.

Evidence links:
- `competitors/evidence/github-audit-log-streaming-config-schema.md`

### WorkOS (audit logs endpoint taxonomy) (adjacent)

- Category: audit logs as a product (events + actions catalog + schemas + exports + retention)
- Website: https://workos.com/docs/reference/audit-logs
- What they sell: an embeddable audit system with separate surfaces for actions/schemas/exports/retention.

Notable features (3):
- Dedicated export endpoints (`/audit_logs/exports`, `/audit_logs/exports/:id`)  
  Evidence: https://workos.com/docs/reference/audit-logs
- Action catalog + per-action schemas (`/audit_logs/actions`, `/audit_logs/actions/:name/schemas`)  
  Evidence: https://workos.com/docs/reference/audit-logs
- Separate retention endpoint (`/audit_logs_retention`) and event feed endpoint (`/audit_logs/events`)  
  Evidence: https://workos.com/docs/reference/audit-logs

Copyable workflows (2):
1) Schema-first audit UI: show action catalog → show schema for action → then show events with correct interpretation  
   Evidence: https://workos.com/docs/reference/audit-logs
2) Export job lifecycle: create export → poll/get export → download link; retention policy constrains export windows  
   Evidence: https://workos.com/docs/reference/audit-logs

What we can steal:
- Easy: treat exports as API objects (ID + status) rather than only an interactive download.
- Medium: action catalog + schema surfaces that drive UI and consumer confidence.
- Hard: retention as configurable policy with audit events for changes.

Thin slice (1–3 days):
- Day 1: action catalog in admin + stable action naming.
- Day 2: export jobs + status UI + download URLs.
- Day 3: retention policy config + enforcement + audit trail.

Evidence links:
- `competitors/evidence/workos-audit-logs-endpoints-taxonomy.md`

---

## Cycle 24 — destination schemas + stream-only audit event taxonomy (Okta LogStream + GitHub audit events) (adjacent)

### Okta (LogStream destination types + schema endpoints) (adjacent)

- Category: destination schemas + lifecycle for log streaming configs
- Website: https://developer.okta.com/docs/api/page-data/openapi/okta-management/management/tag/LogStream/page-data.json
- What they sell: a typed destination config model for log streaming, backed by schema endpoints.

Notable features (3):
- Provider types are explicit (`aws_eventbridge`, `splunk_cloud_logstreaming`) via `LogStreamType` enum  
  Evidence: https://developer.okta.com/docs/api/page-data/openapi/okta-management/management/tag/LogStream/page-data.json
- Schema endpoints exist for schema-driven UIs (`GET /api/v1/meta/schemas/logStream` and `GET /api/v1/meta/schemas/logStream/{logStreamType}`)  
  Evidence: https://developer.okta.com/docs/api/page-data/openapi/okta-management/management/tag/LogStream/page-data.json
- Lifecycle endpoints exist separate from CRUD (`activate`/`deactivate`)  
  Evidence: https://developer.okta.com/docs/api/page-data/openapi/okta-management/management/tag/LogStream/page-data.json

Copyable workflows (2):
1) Schema-driven destination UI: list schemas → render provider-specific fields → create config → activate → monitor delivery  
   Evidence: https://developer.okta.com/docs/api/page-data/openapi/okta-management/management/tag/LogStream/page-data.json
2) IaC lifecycle: create/replace configs and activate/deactivate without deleting (safer ops)  
   Evidence: https://developer.okta.com/docs/api/page-data/openapi/okta-management/management/tag/LogStream/page-data.json

What we can steal:
- Easy: schema-driven destination configuration endpoints.
- Medium: lifecycle endpoints separate from CRUD (avoid “delete to stop”).
- Hard: enforce a destination limit per tenant (Okta notes up to two integrations per org; use limits as a product constraint).

Thin slice (1–3 days):
- Day 1: implement destination schema endpoints and `type/settings` config model.
- Day 2: implement activation lifecycle + delivery health status (last success/last error).
- Day 3: enforce per-tenant limits and audit config/lifecycle changes.

Evidence links:
- `competitors/evidence/okta-logstream-destination-schemas.md`

### GitHub (audit event taxonomy + stream/export-only gates) (adjacent)

- Category: audit event taxonomy + channel-based visibility gating (UI vs export vs streaming)
- Website: https://docs.github.com/
- What they sell: audit event documentation that explicitly distinguishes “UI-visible events” vs “stream-only/export-only events” and publishes fields per event type.

Notable features (3):
- Events can be explicitly streaming-only (example: API request events are only available via audit log streaming when enabled)  
  Evidence: https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/audit-log-events-for-your-enterprise
- Events can be explicitly not shown in UI (only via REST API / streaming / exports)  
  Evidence: https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/organizations/keeping-your-organization-secure/managing-security-settings-for-your-organization/audit-log-events-for-your-organization
- “Fields per event type” lists exist throughout the audit event taxonomy (documentation-as-schema-registry)  
  Evidence: enterprise + org audit events docs: https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/audit-log-events-for-your-enterprise and https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/organizations/keeping-your-organization-secure/managing-security-settings-for-your-organization/audit-log-events-for-your-organization

Copyable workflows (2):
1) Channel-based audit UX: UI shows baseline governance events; streaming/export includes high-volume or sensitive events + expanded fields  
   Evidence: “only available via audit log streaming” and “not available in web interface” statements in the docs above.
2) Feature-gated event categories: enable “API Request Events” only when needed; audit that enablement and its downstream stream impacts  
   Evidence: enterprise audit events doc references settings gating and streaming-only availability: https://docs.github.com/api/article/body?pathname=/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/audit-log-events-for-your-enterprise

What we can steal:
- Easy: publish field lists per event type as a doc/in-app catalog.
- Medium: implement channel gates (UI vs export/stream) to keep UI safe and simple.
- Hard: implement gated high-volume categories (billing/limits + explicit enablement).

Thin slice (1–3 days):
- Day 1: implement per-event-type field allowlists and publish them in an “Audit catalog”.
- Day 2: implement “export-only fields” for certain event types and UI warnings when fields aren’t available.
- Day 3: implement event-category toggles (feature flags) + audit changes + stream-only delivery.

Evidence links:
- `competitors/evidence/github-audit-log-events-stream-only.md`

---

## Cycle 25 — workflow automation governance + run ops primitives (Zapier + Workato + Pipedream + n8n) (adjacent)

### Zapier (approvals step + branching + run history) (adjacent)

- Category: workflow automation (no/low-code)
- Website: https://zapier.com/
- What they sell: trigger → action automations (“Zaps”) with approvals and run history.

Notable features (3):
- Human-in-the-loop approvals as a dedicated workflow step (“Approval by Zapier”)  
  Evidence: https://help.zapier.com/hc/en-us/articles/8496354423693-Get-started-with-Approval-by-Zapier
- Branching + gating primitives (“Filters” and “Paths”)  
  Evidence: https://help.zapier.com/hc/en-us/articles/8496223368085-Use-filters-in-Zaps and https://help.zapier.com/hc/en-us/articles/8496250107405-Use-Paths-by-Zapier
- Run history as a first-class ops surface (“Zap history”)  
  Evidence: https://help.zapier.com/hc/en-us/articles/8496257531797-View-your-Zap-history

Copyable workflows (2):
1) Safe automation with approvals: trigger → evaluate conditions → request approval → execute sensitive action  
   Evidence: approvals + filters docs above.
2) Ops workflow: inspect run history → diagnose failure → fix step/config → re-run  
   Evidence: https://help.zapier.com/hc/en-us/articles/8496257531797-View-your-Zap-history

What we can steal:
- Easy: “trigger/action/test/turn on” stepper vocabulary and an operator-friendly run history.
- Medium: approvals step type for high-risk actions (refunds, fulfillment holds, integration disconnects).
- Hard: connector breadth + reliable execution scaling across thousands of apps.

Thin slice (1–3 days):
- Day 1: “Automation rules” page (limited triggers/actions) + run history list.
- Day 2: add one branching guardrail primitive (“IF” filter).
- Day 3: add “Approval required” step with approve/deny and audit events.

Evidence links:
- `competitors/evidence/zapier.md`

### Workato (environments + ops hub + audit trail) (adjacent)

- Category: enterprise workflow automation / iPaaS
- Website: https://docs.workato.com/
- What they sell: recipes + connectors with monitoring and governance.

Notable features (3):
- Environments (dev/test/prod style separation) for automation lifecycle  
  Evidence: https://docs.workato.com/en/recipes/managing-recipes.html
- Admin dashboard / operations hub for monitoring and fast issue resolution  
  Evidence: https://docs.workato.com/en/features/admin-dashboard.html
- Activity audit log for changes (connections/recipes/settings)  
  Evidence: https://docs.workato.com/en/features/activity-audit-log.html

Copyable workflows (2):
1) Safe release workflow: build in dev → test → promote/deploy between environments  
   Evidence: https://docs.workato.com/en/recipes/managing-recipes.html
2) Ops workflow: monitor dashboards → investigate failing runs/connections → disable/retry/fix  
   Evidence: https://docs.workato.com/en/features/admin-dashboard.html

What we can steal:
- Easy: “Ops hub” landing page for automation health with quick actions.
- Medium: environment promotion workflow for automations and integrations.
- Hard: enterprise connector ecosystem + SLAs and compliance depth.

Thin slice (1–3 days):
- Day 1: add `automation_environment` badge (`draft`, `staging`, `prod`) for rules.
- Day 2: add “Ops hub” page (failed runs, unhealthy connections, last run timestamps).
- Day 3: add activity audit log for automation config changes + export.

Evidence links:
- `competitors/evidence/workato.md`

### Pipedream (trigger catalog + step logs + config boundary) (adjacent)

- Category: developer-friendly workflow automation
- Website: https://pipedream.com/
- What they sell: workflows built from triggers + steps with code-level control.

Notable features (3):
- Triggers are a first-class “step 0” in workflows (trigger catalog)  
  Evidence: https://pipedream.com/docs/workflows/steps/triggers/
- Step-level execution logs and error details are part of the workflow concept (“observe the logs, errors… for every step”)  
  Evidence: https://pipedream.com/docs/workflows/
- Strong config boundary via environment variables (separate secrets/config from code)  
  Evidence: https://pipedream.com/docs/environment-variables/

Copyable workflows (2):
1) Build workflow: pick trigger → add steps → save/deploy → observe per-step logs  
   Evidence: https://pipedream.com/docs/workflows/
2) Operate config: rotate env vars without editing workflow logic  
   Evidence: https://pipedream.com/docs/environment-variables/

What we can steal:
- Easy: trigger catalog UX + “step logs” mental model.
- Medium: variables/secret store as the default config boundary for automations.
- Hard: normalized event sources + execution scaling + connector catalog depth.

Thin slice (1–3 days):
- Day 1: ship 3 triggers + 3 actions + “test run” payload preview.
- Day 2: ship “Variables” screen (secrets + config) and allow rules to reference variables.
- Day 3: ship run detail view with per-step outputs, logs, and error stack.

Evidence links:
- `competitors/evidence/pipedream.md`

### n8n (executions ops + error handling + RBAC/projects) (adjacent)

- Category: workflow automation (self-hosted + cloud)
- Website: https://docs.n8n.io/
- What they sell: node-based automation with strong operator tooling (executions/debug) and admin access patterns (RBAC/projects).

Notable features (3):
- Executions are a first-class ops surface (“All executions” + “Debug executions”)  
  Evidence: https://docs.n8n.io/workflows/executions/all-executions/ and https://docs.n8n.io/workflows/executions/debug/
- Error handling is explicitly documented as workflow design (flow-logic patterns)  
  Evidence: https://docs.n8n.io/flow-logic/error-handling/
- RBAC + projects exist as governance primitives  
  Evidence: https://docs.n8n.io/user-management/rbac/ and https://docs.n8n.io/user-management/rbac/projects/

Copyable workflows (2):
1) Operate: review executions → debug a failed run → iterate workflow design → redeploy  
   Evidence: https://docs.n8n.io/workflows/executions/debug/
2) Govern: scope automations to projects + role types to reduce admin sprawl  
   Evidence: https://docs.n8n.io/user-management/rbac/projects/

What we can steal:
- Easy: “All executions” list + run detail UX as a baseline for automation supportability.
- Medium: project scoping and roles as first-class primitives for automation ownership.
- Hard: maintaining a large connector/node ecosystem (compatibility + support).

Thin slice (1–3 days):
- Day 1: add `automation_runs` + “All runs” list view (filters by status/time/trigger).
- Day 2: add run detail view (inputs, step outputs, error stack) + “re-run with same inputs”.
- Day 3: add project scoping + roles (viewer/editor/admin) for automation rules.

Evidence links:
- `competitors/evidence/n8n.md`

---

## Cycle 26 — templates/sharing + reusable building blocks + run logs exports (Slack + GitHub Actions + Retool Workflows) (adjacent)

### GitHub Actions (starter workflows + reusable workflows + marketplace steps) (adjacent)

- Category: workflow automation templates + reusable building blocks ecosystem
- Website: https://docs.github.com/en/actions
- What they sell: automation workflows that can be templated, reused, and extended with marketplace steps.

Notable features (3):
- Starter workflows (“use a starter workflow”) as a first-class scaffold pattern  
  Evidence: https://docs.github.com/en/actions/using-workflows/using-starter-workflows
- Reusable workflows (compose workflows across repos)  
  Evidence: https://docs.github.com/en/actions/learn-github-actions/reusing-workflows
- Marketplace distribution for steps/actions (ecosystem effect)  
  Evidence: https://github.com/marketplace?type=actions

Copyable workflows (2):
1) Template onboarding: pick starter workflow → customize → observe runs → iterate  
   Evidence: https://docs.github.com/en/actions/using-workflows/using-starter-workflows
2) Standardize across teams: create reusable workflow → call it from multiple workflows  
   Evidence: https://docs.github.com/en/actions/learn-github-actions/reusing-workflows

What we can steal:
- Easy: templates gallery (start from a known-good automation).
- Medium: reusable “subflows” with version tags (shared steps library).
- Hard: third-party marketplace ecosystem with trust/security controls.

Thin slice (1–3 days):
- Day 1: ship 10 automation templates (pre-filled trigger/action/approval/run log defaults).
- Day 2: ship shared-step library (reusable subflows) and “update version” UX.
- Day 3: ship template cloning + “run log” detail view for every run.

Evidence links:
- `competitors/evidence/github-actions.md`

### Retool Workflows (run logs filtering + JSON export + triggers + env vars) (adjacent)

- Category: internal admin workflows (jobs/alerts/ETL) with strong ops UX
- Website: https://docs.retool.com/workflows/
- What they sell: build, schedule, and monitor internal jobs/workflows; run logs for troubleshooting.

Notable features (3):
- Workflows positioned as scheduled/monitorable jobs (“Build, schedule, and monitor your jobs, alerts, and ETL tasks.”)  
  Evidence: https://docs.retool.com/workflows/
- Run logs include filtering (time, block name, error/success/info) + JSON download  
  Evidence: https://docs.retool.com/workflows/concepts/logs
- Environment variables exist for workflow-related configuration in self-hosted deployments  
  Evidence: https://docs.retool.com/workflows/reference/environment-variables

Copyable workflows (2):
1) Operate: run logs → filter failures → export JSON to attach to support/incident threads  
   Evidence: https://docs.retool.com/workflows/concepts/logs
2) Govern config: keep secrets/config in env vars instead of embedding in workflow logic (safer rotation)  
   Evidence: https://docs.retool.com/workflows/reference/environment-variables

What we can steal:
- Easy: run logs filters + “download JSON” for debugging.
- Medium: “jobs/alerts/ETL tasks” framing + workflow IDE-like onboarding.
- Hard: deep internal tool ecosystem + polished developer experience.

Thin slice (1–3 days):
- Day 1: add run logs with filters + JSON export.
- Day 2: add triggers catalog UX + test run with sample payload.
- Day 3: add environment variables/secret references + rotation workflow.

Evidence links:
- `competitors/evidence/retool.md`

### Slack Workflow Builder (embedded workflow creation + creation governance) (adjacent)

- Category: in-chat workflow automation + governance toggle
- Website: https://slack.com/help/articles/17542172840595-Build-a-workflow--Create-a-workflow-in-Slack
- What they sell: workflow creation where work happens (Slack) with admin controls over creation.

Notable features (3):
- Workflow Builder exists as an in-product creation surface  
  Evidence: https://slack.com/help/articles/17542172840595-Build-a-workflow--Create-a-workflow-in-Slack
- Governance knob for sprawl (“who can create workflows”) described in the help article  
  Evidence: https://slack.com/help/articles/17542172840595-Build-a-workflow--Create-a-workflow-in-Slack
- Workflow distribution is native to the collaboration surface (workflows live where operators are)  
  Evidence: https://slack.com/help/articles/17542172840595-Build-a-workflow--Create-a-workflow-in-Slack

Copyable workflows (2):
1) Embedded automation: create workflow from the primary operator UI (reduce context switching)  
   Evidence: https://slack.com/help/articles/17542172840595-Build-a-workflow--Create-a-workflow-in-Slack
2) Guardrails: restrict workflow creation to admins/owners (control sprawl)  
   Evidence: https://slack.com/help/articles/17542172840595-Build-a-workflow--Create-a-workflow-in-Slack

What we can steal:
- Easy: “create automation” entrypoint placed in the main operator UI, not buried.
- Medium: admin toggle controlling who can create automations (role-based).
- Hard: deep distribution and adoption from being embedded in the team’s primary tool.

Thin slice (1–3 days):
- Day 1: add “Create automation” entrypoints inside Orders/Refunds/Inventory pages with templates.
- Day 2: add role-based restriction for who can create/edit automations.
- Day 3: add “share template” flow + audit trail for sharing.

Evidence links:
- `competitors/evidence/slack-workflow-builder.md`

---

## Cycle 27 — template galleries + discovery UX + template taxonomy APIs (Zapier Templates + n8n templates library + IFTTT Applets) (adjacent)

### Zapier Templates (use-case categories + template detail pages) (adjacent)

- Category: templates gallery / curated solution templates
- Website: https://zapier.com/templates
- What they sell: ready-to-use workflow automation templates (“no code needed”) organized by use case.

Notable features (3):
- Dedicated templates catalog (“Workflow Automation Templates”)  
  Evidence: https://zapier.com/templates
- Use-case category navigation (e.g., lead management, customer support, tickets & incidents)  
  Evidence: category links rendered on https://zapier.com/templates (e.g., `/templates/lead-management`, `/templates/customer-support-management`)
- Template detail pages (`/templates/details/...`) as first-class objects  
  Evidence: detail links appear on https://zapier.com/templates (e.g., `/templates/details/unified-lead-capture`)

Copyable workflows (2):
1) Start from template: browse → open detail page → customize → enable → monitor  
   Evidence: https://zapier.com/templates
2) Reduce variance: promote known-good templates for common business processes  
   Evidence: “Use cases” and “Featured solution templates” sections on https://zapier.com/templates

What we can steal:
- Easy: curated template gallery with categories.
- Medium: template detail page that lists permissions/secrets/actions touched (risk preview) + “approval required” flags.
- Hard: ongoing template curation + keeping templates current as connectors change.

Thin slice (1–3 days):
- Day 1: ship 10 templates grouped by use-case categories.
- Day 2: add template detail page: preview steps + required permissions + required secrets.
- Day 3: add “clone template → create rule” flow + audit trail.

Evidence links:
- `competitors/evidence/zapier-templates.md`

### n8n Templates Library (public filters/categories + large workflows catalog) (adjacent)

- Category: template library + search/filter APIs
- Website: https://n8n.io/workflows
- What they sell: discover workflows/templates via UI + API (faceted search and category taxonomy).

Notable features (3):
- Filter endpoint returns categories with hit counts (faceted discovery primitive)  
  Evidence: https://api.n8n.io/api/templates/search/filters
- Categories endpoint publishes category taxonomy (including AI + subcategories)  
  Evidence: https://api.n8n.io/api/templates/categories
- Templates/workflows are available via a dedicated catalog endpoint (`/api/templates/workflows`) returning JSON (very large dataset)  
  Evidence: https://api.n8n.io/api/templates/workflows

Copyable workflows (2):
1) Discover → filter → select: use facets + counts to guide starting points  
   Evidence: https://api.n8n.io/api/templates/search/filters
2) Productize templates as objects: stable IDs + searchable metadata + shareable “clone” flows  
   Evidence: templates UI + API endpoints referenced above.

What we can steal:
- Easy: category facets with hit counts.
- Medium: template as object model with provenance and safety metadata.
- Hard: safe distribution (permissions-aware templates + provenance + secrets hygiene).

Thin slice (1–3 days):
- Day 1: implement `automation_templates` table + categories + clone UX.
- Day 2: implement search + facet counts.
- Day 3: add provenance + required permissions + approval flags for sensitive templates.

Evidence links:
- `competitors/evidence/n8n-templates-library.md`

### IFTTT Explore / Applets (template gallery + search + popularity) (adjacent)

- Category: trigger-action recipe gallery (“applets”)
- Website: https://ifttt.com/explore
- What they sell: discover and enable pre-built automations with search and popularity signals.

Notable features (3):
- Explore tabs for browsing (All/Applets/Services/Stories) + search input  
  Evidence: https://ifttt.com/explore
- Applets are shareable public objects (`/applets/<id>-...`)  
  Evidence: applet links in HTML on https://ifttt.com/explore
- Popularity signals on cards (install counts like “360K users enabled this Applet”)  
  Evidence: https://ifttt.com/explore

Copyable workflows (2):
1) Discovery onboarding: explore/search → open applet → enable  
   Evidence: https://ifttt.com/explore
2) Credibility routing: use popularity + badges to steer users to known-good templates  
   Evidence: install counts and badges visible on https://ifttt.com/explore

What we can steal:
- Easy: gallery + search UX as default entry.
- Medium: popularity + “pro” badges as template ranking signals.
- Hard: ecosystem QA + anti-spam controls for templates.

Thin slice (1–3 days):
- Day 1: template gallery with search + categories + “popular” row.
- Day 2: usage telemetry + popularity badges.
- Day 3: template QA pipeline (review/publish/unpublish) + audit trail.

Evidence links:
- `competitors/evidence/ifttt-applets-explore.md`

---

## Cycle 8 — approval inbox UX primitives (adjacent)

### GitLab (To-Do inbox + review workflow) (adjacent)

- Category: approvals inbox UX primitives
- Website: https://docs.gitlab.com/user/todos/
- What they sell: a “to-do inbox” + review workflow patterns that map cleanly to admin approvals.

Notable features (3):
- Inbox tabs/states + sorting semantics (`To Do`, `Snoozed`, `Done`)  
  Evidence: https://docs.gitlab.com/user/todos/
- Snooze mechanics with presets and automatic return to inbox  
  Evidence: https://docs.gitlab.com/user/todos/
- Bulk edit actions (mark done / snooze / remove snooze / restore)  
  Evidence: https://docs.gitlab.com/user/todos/

Copyable workflows (2):
1) Approvals inbox flow: request arrives → triage → snooze if blocked → bulk-clear when resolved  
   Evidence: https://docs.gitlab.com/user/todos/
2) Review flow with “pending” state: start review → collect pending comments → submit once → single notification email  
   Evidence: https://docs.gitlab.com/user/project/merge_requests/reviews/

What we can steal:
- Easy: tabs + snooze + bulk actions for approvals inbox.
- Medium: pending/unpublished “decision batch” state for approvals.
- Hard: “Recommended” ordering that combines created_at + snooze history.

Thin slice (1–3 days):
- Day 1: approvals inbox with `Pending/Snoozed/Done` tabs.
- Day 2: snooze presets + `unsnooze_at` + auto-return.
- Day 3: bulk actions + select-all UX.

Evidence links:
- `competitors/evidence/gitlab-inbox.md`

### GitHub (PR reviews) (adjacent)

- Category: approvals/reviews workflow UX
- Website: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews
- What they sell: PR reviews, but the workflow primitives are reusable for admin approvals.

Notable features (3):
- Standardized outcomes: `Comment`, `Approve`, `Request changes`  
  Evidence: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews
- Request reviewers/teams + re-request review after changes  
  Evidence: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/requesting-a-pull-request-review
- Resolution tracking (threads can be marked resolved) + “suggest changes” UX  
  Evidence: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request

Copyable workflows (2):
1) Assign approvers → approvers submit decision outcomes → requester addresses changes → re-request  
   Evidence: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/requesting-a-pull-request-review
2) Threaded rationale → resolve threads to close loop → archive for auditability  
   Evidence: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews

What we can steal:
- Easy: consistent decision outcomes everywhere (approve/request changes/comment).
- Medium: threaded feedback + `resolved_at` to make approvals tractable and auditable.
- Hard: suggested-change blocks (structured proposals) for high-stakes actions.

Thin slice (1–3 days):
- Day 1: approvals decisions with standardized outcomes + reason field.
- Day 2: request approvers (users/teams) + notifications + re-request.
- Day 3: comment threads + resolution markers + audit event export.

Evidence links:
- `competitors/evidence/github-pull-request-reviews.md`

### Jira Service Management (approval stage) (adjacent)

- Category: workflow approvals + external approvers
- Website: https://support.atlassian.com/jira-service-management-cloud/docs/set-up-an-approval-stage-for-a-request/
- What they sell: ITSM workflows, but the approval stage and “customer approver” model is directly transplantable.

Notable features (3):
- Approval stage blocks progression until decision  
  Evidence: https://support.atlassian.com/jira-service-management-cloud/docs/set-up-an-approval-stage-for-a-request/
- Approvers don’t need a JSM license (approvers can be customers)  
  Evidence: https://support.atlassian.com/jira-service-management-cloud/docs/set-up-an-approval-stage-for-a-request/
- Approvals are a reusable workflow building block (stage inserted where needed)  
  Evidence: https://support.atlassian.com/jira-service-management-cloud/docs/set-up-an-approval-stage-for-a-request/

Copyable workflows (2):
1) External approver flow: request enters approval stage → external approver decides → request progresses  
   Evidence: https://support.atlassian.com/jira-service-management-cloud/docs/set-up-an-approval-stage-for-a-request/
2) Stage-gated workflow: add approval stage before risky step → block until approved/declined  
   Evidence: https://support.atlassian.com/jira-service-management-cloud/docs/set-up-an-approval-stage-for-a-request/

What we can steal:
- Easy: “approver seats” that aren’t full admins.
- Medium: approval stages in workflows + stage-level due_at.
- Hard: multi-stage + conditional approver sets.

Thin slice (1–3 days):
- Day 1: limited “approver role” UI.
- Day 2: approval stage status model (pending/approved/declined) + timeline.
- Day 3: approval portal (email link → approve/decline) + audit events.

Evidence links:
- `competitors/evidence/jira-service-management-approval-stage.md`

---

## Cycle 9 — delegation/out-of-office + approval portal/email (adjacent)

### Power Automate (Approvals: email + reassign) (adjacent)

- Category: approvals portal + delegation/handoff
- Website: https://learn.microsoft.com/en-us/power-automate/modern-approvals
- What they sell: approval workflows that can be acted on via approvals center + email + mobile; includes reassign pattern.

Notable features (3):
- Approvers can respond via email inbox, approvals center, or app  
  Evidence: https://learn.microsoft.com/en-us/power-automate/modern-approvals
- Approval emails update to reflect completion (stale-email mitigation)  
  Evidence: https://learn.microsoft.com/en-us/power-automate/modern-approvals
- Reassign an approval to another person (delegation / OOO handoff)  
  Evidence: https://learn.microsoft.com/en-us/power-automate/approvals-howto

Copyable workflows (2):
1) Email portal approvals: request → formatted email → approve/deny → requester notified  
   Evidence: https://learn.microsoft.com/en-us/power-automate/modern-approvals
2) Delegation: approver receives request → reassign to someone else → decision recorded with auditability  
   Evidence: https://learn.microsoft.com/en-us/power-automate/approvals-howto

What we can steal:
- Easy: approve/deny via email deep link (scope-limited) + approvals center view.
- Medium: “reassign approval” action with immutable audit events (handoff chain).
- Hard: sync email state to approval decision (“completed” indicator) to reduce double-work and support tickets.

Thin slice (1–3 days):
- Day 1: email notification with deep link to approval request detail + approve/deny.
- Day 2: reassign action + notify new approver + record handoff in audit log.
- Day 3: completion updates (email/thread update where possible; otherwise completion follow-up) + correlation IDs.

Evidence links:
- `competitors/evidence/power-automate-approvals-delegation-email.md`

### Azure DevOps (Approvals and checks) (adjacent)

- Category: workflow gating + time windows
- Website: https://learn.microsoft.com/en-us/azure/devops/pipelines/process/approvals?view=azure-devops
- What they sell: deployment approvals/checks, but primitives map directly to “safe changes” in admin workflows.

Notable features (3):
- Approvers can have instructions + timeout configuration  
  Evidence: https://learn.microsoft.com/en-us/azure/devops/pipelines/process/approvals?view=azure-devops
- Deferred approvals (approve now, effective later)  
  Evidence: https://learn.microsoft.com/en-us/azure/devops/pipelines/process/approvals?view=azure-devops
- Explicit timeout semantics (skipped/failed stage when checks don’t succeed in time)  
  Evidence: https://learn.microsoft.com/en-us/azure/devops/pipelines/process/approvals?view=azure-devops

Copyable workflows (2):
1) Risk gate: approval required → instructions shown → approve/reject → proceed/stop  
   Evidence: https://learn.microsoft.com/en-us/azure/devops/pipelines/process/approvals?view=azure-devops
2) Low-traffic window: approve now → defer effectiveness → execute at window  
   Evidence: https://learn.microsoft.com/en-us/azure/devops/pipelines/process/approvals?view=azure-devops

What we can steal:
- Easy: “instructions for approver” field on approvals (checklist + links).
- Medium: deferred approvals as first-class control (effective_at).
- Hard: multi-check orchestration with evaluation intervals/timeouts as a coherent UI.

Thin slice (1–3 days):
- Day 1: approval requests support `instructions` + `timeout_at`.
- Day 2: deferred approvals `effective_at` + UI states for pre-approved items.
- Day 3: timeout expiry + retry/re-request patterns + notifications.

Evidence links:
- `competitors/evidence/azure-devops-approvals-checks.md`

### Power Apps (Approval request screen template) (adjacent)

- Category: approval portal UI building blocks
- Website: https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/add-screen-context-variables
- What they sell: app builder, but provides a concrete approval request screen + stages timeline pattern.

Notable features (3):
- “Approval request screen” as a reusable UX template  
  Evidence: https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/add-screen-context-variables
- Approval stages rendered as a timeline/list (reviewers gallery with stage metadata)  
  Evidence: https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/add-screen-context-variables
- Explicit UI ↔ workflow pairing (Power Apps screen + Power Automate approvals)  
  Evidence: https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/add-screen-context-variables

Copyable workflows (2):
1) Approval portal view: open request → see stages + current approver → act → timeline updates  
   Evidence: https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/add-screen-context-variables
2) Multi-stage approvals: show stage breakdown in UI (who/what/when) while workflow handles routing  
   Evidence: https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/add-screen-context-variables

What we can steal:
- Easy: “stages timeline” component for approval details (next approver, previous approvals, timestamps).
- Medium: split “portal UI” (limited access) from “admin UI” (full access) on the same approval primitive.
- Hard: configurable stage templates + stage-level SLAs + delegation.

Thin slice (1–3 days):
- Day 1: approval request detail page + stages timeline component.
- Day 2: stage status + timestamps + current approver highlight.
- Day 3: signed-link access for limited approvers + audit events.

Evidence links:
- `competitors/evidence/power-apps-approval-request-screen.md`

---

## Cycle 11 — policy / authorization primitives (adjacent; code-shaped patterns)

### Open Policy Agent (OPA) (adjacent)

- Category: policy-as-code (authorization/gating)
- Website: https://openpolicyagent.org/docs
- What they sell: OSS policy engine; useful for centralizing “should this sensitive admin action be allowed?” decisions.

Notable features (3):
- Declarative policy language Rego (“express rules and decisions as code”)  
  Evidence: https://openpolicyagent.org/docs/policy-language
- Works across multiple integration modes (CLI/server/library)  
  Evidence: https://openpolicyagent.org/docs
- Policy evaluation yields decisions that can drive gates and auditability  
  Evidence: https://openpolicyagent.org/docs/policy-language

Copyable workflows (2):
1) Protected action gate: API layer calls policy engine with `input` → returns allow/deny/needs_approval → enforce result  
   Evidence: https://openpolicyagent.org/docs/policy-language
2) Policy-as-code: review policies like code → deploy bundles → trace decisions to policy versions in audit events  
   Evidence: https://openpolicyagent.org/docs

What we can steal:
- Easy: standardize action authorization result object (`allow/deny`, `reason`, `policy_version`).
- Medium: treat “needs approval” as a policy outcome (deny with rationale that creates an approval request).
- Hard: build a full policy authoring UI; start from templates.

Thin slice (1–3 days):
- Day 1: implement `authorize(action, actor, resource)` decision wrapper and apply to 1–2 protected actions.
- Day 2: add policy versioning + immutable audit event for each decision.
- Day 3: plug into approvals primitive when policy returns “needs approval”.

Evidence links:
- `competitors/evidence/open-policy-agent.md`

### OpenFGA (adjacent)

- Category: fine-grained authorization (Zanzibar-inspired ReBAC)
- Website: https://openfga.dev/docs/fga
- What they sell: OSS permission engine; useful for relationship-driven permissions (“who can do what on what?”).

Notable features (3):
- Zanzibar-inspired fine-grained authorization positioning  
  Evidence: https://raw.githubusercontent.com/openfga/openfga/main/README.md
- Modeling guides and patterns are first-class documentation  
  Evidence: https://openfga.dev/docs/modeling
- Concrete modeling process (types → relations → define → test → iterate)  
  Evidence: https://openfga.dev/docs/modeling/getting-started

Copyable workflows (2):
1) Resource permission checks: define types/relations → query “can user perform action on resource?”  
   Evidence: https://openfga.dev/docs/modeling/getting-started
2) Start with one critical feature, model it, and iterate safely  
   Evidence: https://openfga.dev/docs/modeling/getting-started

What we can steal:
- Easy: represent permission as relationships (resource, relation, subject) instead of role matrices.
- Medium: encode high-risk actions as “requires approval unless relation X”.
- Hard: multi-tenant performance/caching strategy (defer).

Thin slice (1–3 days):
- Day 1: minimal relationship model for 2 resource types + 3 relations.
- Day 2: single `authorize()` wrapper returning allow/deny and rationale.
- Day 3: connect denial reasons to approval creation.

Evidence links:
- `competitors/evidence/openfga.md`

### SpiceDB (adjacent)

- Category: fine-grained authorization (schema + relationships + permission checks)
- Website: https://raw.githubusercontent.com/authzed/spicedb/main/README.md
- What they sell: OSS authorization engine inspired by Zanzibar; strong “schema + relationships” mental model.

Notable features (3):
- Explicit mental model: schema + relationships + permission checks  
  Evidence: https://raw.githubusercontent.com/authzed/spicedb/main/README.md
- Supports other queries beyond simple checks (“who can access resource?” style)  
  Evidence: https://raw.githubusercontent.com/authzed/spicedb/main/README.md
- Emphasis on schema tooling/validation and CI/CD use  
  Evidence: https://raw.githubusercontent.com/authzed/spicedb/main/README.md

Copyable workflows (2):
1) Define schema → write relationships → check permissions to gate actions  
   Evidence: https://raw.githubusercontent.com/authzed/spicedb/main/README.md
2) Develop schema using guides/reference, validate, iterate  
   Evidence: https://docs.authzed.com/guides/schema and https://docs.authzed.com/reference/schema-lang

What we can steal:
- Easy: “protected resources registry” maps directly to schema concepts (types/relations).
- Medium: permissions simulator (“can X do Y?”) as a debugging/admin tool.
- Hard: admin-facing playground for model testing.

Thin slice (1–3 days):
- Day 1: implement internal relationship tuples storage and a simple `check()`.
- Day 2: use `check()` to gate 1–2 actions + emit audit events with reasons.
- Day 3: add a minimal “permission simulator” endpoint for support/debug.

Evidence links:
- `competitors/evidence/spicedb.md`

### Casbin (adjacent)

- Category: authorization library (RBAC/ABAC models)
- Website: https://casbin.org/docs/overview
- What they sell: OSS library; good for embedding a first-pass RBAC policy system.

Notable features (3):
- Multi-model support (RBAC/ABAC/etc) positioning  
  Evidence: https://casbin.org/docs/overview
- Explicit responsibilities: policy storage + role mappings / hierarchies  
  Evidence: https://casbin.org/docs/overview
- Supported models documented with example configs/policies  
  Evidence: https://casbin.org/docs/supported-models

Copyable workflows (2):
1) Load model + policy → evaluate `(subject, object, action)` → enforce  
   Evidence: https://casbin.org/docs/overview
2) Start from supported model templates → iterate to fit the domain  
   Evidence: https://casbin.org/docs/supported-models

What we can steal:
- Easy: ship a minimal RBAC policy model fast (audit-friendly).
- Medium: add domains/scopes per store/tenant.
- Hard: unify with relationship-based permissions later (don’t overbuild early).

Thin slice (1–3 days):
- Day 1: implement role checks for 2–3 high-risk actions.
- Day 2: map policy outcomes to approvals (needs_approval templates).
- Day 3: audit event emission for every allow/deny decision.

Evidence links:
- `competitors/evidence/casbin.md`

---

## Cycle 12 — policy templates + policy simulator (adjacent; code + UX ideas)

### Cedar Policy Language (adjacent)

- Category: policy templates + schema/validation ideas
- Website: https://docs.cedarpolicy.com/
- What they sell: OSS policy language + docs with best practices; good source of “policy templates” and schema framing.

Notable features (3):
- Policy-based rules with conditions over principal/resource/context attributes  
  Evidence: https://docs.cedarpolicy.com/
- Best practice: role management using policy templates (when IdP group mapping isn’t available)  
  Evidence: https://docs.cedarpolicy.com/bestpractices/bp-implementing-roles-templates.html
- Clear terminology + schema concepts + groups/hierarchies to keep decisions explainable  
  Evidence: https://docs.cedarpolicy.com/overview/terminology.html

Copyable workflows (2):
1) Template RBAC: create template per role → instantiate assignments → role assignment lives in policy store  
   Evidence: https://docs.cedarpolicy.com/bestpractices/bp-implementing-roles-templates.html
2) Schema-first policy loop: define schema → validate policies → evaluate decisions with stable input contracts  
   Evidence: https://docs.cedarpolicy.com/overview/terminology.html

What we can steal:
- Easy: fixed policy templates for top 5 risky actions (refund, payout change, integration disconnect).
- Medium: enforce schema-validated inputs for all policy decisions (`principal/resource/context`) + “why denied” reasons.
- Hard: formal policy analysis/invariants (later).

Thin slice (1–3 days):
- Day 1: ship 2 policy templates + bind to approvals primitive (`needs_approval` result).
- Day 2: add schema-based input shaping + validator checks.
- Day 3: add “why denied” reasons to audit logs + export.

Evidence links:
- `competitors/evidence/cedar-policy-language.md`

### Amazon Verified Permissions (adjacent)

- Category: policy store + decision testing (managed service patterns)
- Website: https://docs.aws.amazon.com/verifiedpermissions/latest/userguide/what-is-avp.html
- What they sell: fine-grained permissions management + authorization service for custom apps.

Notable features (3):
- Explicit “policy store” concept with policies managed separately from app code  
  Evidence: https://docs.aws.amazon.com/verifiedpermissions/latest/userguide/getting-started-first-policy-store.html
- “Test bench” style decision testing via simulated authorization requests  
  Evidence: https://docs.aws.amazon.com/verifiedpermissions/latest/userguide/getting-started-first-policy-store.html
- Service framing: scalable fine-grained authorization service  
  Evidence: https://docs.aws.amazon.com/verifiedpermissions/latest/userguide/what-is-avp.html

Copyable workflows (2):
1) Build policy store → create policies → simulate authorization requests → confirm decisions before rollout  
   Evidence: https://docs.aws.amazon.com/verifiedpermissions/latest/userguide/getting-started-first-policy-store.html
2) Iterate policies safely by testing “allow/deny” outcomes with known inputs  
   Evidence: https://docs.aws.amazon.com/verifiedpermissions/latest/userguide/getting-started-first-policy-store.html

What we can steal:
- Easy: “Policy Simulator/Test Bench” UI for our admin actions.
- Medium: template-linked policies to reduce free-form complexity.
- Hard: multi-environment promotion workflow (draft → prod) with audit.

Thin slice (1–3 days):
- Day 1: add `/internal/policy/simulate` endpoint returning allow/deny + reason.
- Day 2: add admin UI simulator with sample inputs.
- Day 3: connect simulator/decisions into audit events and exports.

Evidence links:
- `competitors/evidence/aws-verified-permissions.md`

### Permit.io (adjacent)

- Category: policy management control plane UX
- Website: https://docs.permit.io/quickstart
- What they sell: policy editor + enforcement + audit logs + policy CI/CD (GitOps-like patterns).

Notable features (3):
- “Create a basic policy” in UI (RBAC) is explicitly documented as onboarding step  
  Evidence: https://docs.permit.io/quickstart
- Decision/audit logs include filterable dimensions and surface a `reason` payload concept  
  Evidence: https://docs.permit.io/how-to/use-audit-logs/types-and-filtering
- Policy lifecycle treated as CI/CD with environments/preview branches  
  Evidence: https://docs.permit.io/how-to/SDLC/CI-CD

Copyable workflows (2):
1) Policy editor → deploy to enforcement → decision logs with reasons  
   Evidence: https://docs.permit.io/quickstart and https://docs.permit.io/how-to/use-audit-logs/types-and-filtering
2) Policy CI/CD: environments as policy branches → preview branch per PR → gated promotion  
   Evidence: https://docs.permit.io/how-to/SDLC/CI-CD

What we can steal:
- Easy: decision logs always include `reason` and are filterable (user/date/decision/tenant).
- Medium: policy environments (draft vs prod) + preview branches for risky changes.
- Hard: full policy control plane inside our admin.

Thin slice (1–3 days):
- Day 1: emit decision logs with `decision` and `reason` for protected actions.
- Day 2: build decision logs UI + filters.
- Day 3: add draft/published policy environment toggle gated by approvals.

Evidence links:
- `competitors/evidence/permit-io.md`

### OPA (HTTP API authorization) (adjacent)

- Category: API-edge policy enforcement tutorial patterns
- Website: https://openpolicyagent.org/docs/latest/http-api-authorization/
- What they sell: OSS policy engine; this doc shows concrete enforcement wiring for allow/deny gates.

Notable features (3):
- API authorization framing: fine-grained, context-aware policies for HTTP APIs  
  Evidence: https://openpolicyagent.org/docs/latest/http-api-authorization/
- Sidecar workflow: API server asks OPA for authorization decisions (allow/deny)  
  Evidence: https://openpolicyagent.org/docs/latest/http-api-authorization/
- Optional JWT transport pattern for policy data  
  Evidence: https://openpolicyagent.org/docs/latest/http-api-authorization/

Copyable workflows (2):
1) Decision sidecar: API request → decision query → enforce allow/deny  
   Evidence: https://openpolicyagent.org/docs/latest/http-api-authorization/
2) Change policy → rerun checks → verify new policy works  
   Evidence: https://openpolicyagent.org/docs/latest/http-api-authorization/

What we can steal:
- Easy: stable decision endpoint contract (input → decision + reason).
- Medium: use compact tokens/JWT for passing context across services.
- Hard: unify with audit export pipeline and approvals for “needs approval”.

Thin slice (1–3 days):
- Day 1: implement decision wrapper for 1 action.
- Day 2: integrate decision into action execution; deny triggers approval creation.
- Day 3: emit decision audit events with reasons.

Evidence links:
- `competitors/evidence/opa-http-api-authorization.md`

---

## Cycle 13 — feature flags + experimentation contracts (adjacent; code + UX ideas)

### OpenFeature (adjacent)

- Category: feature flag evaluation standard (vendor-neutral abstraction)
- Website: https://openfeature.dev/docs/specification/
- What they sell: an interoperability spec + SDK pattern to decouple apps from flag vendors.

Notable features (3):
- Standard evaluation API contract for flag reads  
  Evidence: https://openfeature.dev/docs/specification/sections/evaluation-api
- Provider model to plug in different backends  
  Evidence: https://openfeature.dev/docs/specification/sections/providers
- Hooks for pre/post evaluation logic (telemetry/audit)  
  Evidence: https://openfeature.dev/docs/specification/sections/hooks

Copyable workflows (2):
1) “Provider swap” migration: implement provider A + provider B → switch provider by config → compare outcomes in a staging environment  
   Evidence: https://openfeature.dev/docs/specification/sections/providers
2) Standardized `flag_evaluated` event: implement a hook that emits consistent telemetry across all flags  
   Evidence: https://openfeature.dev/docs/specification/sections/hooks

What we can steal:
- Easy: adopt a stable evaluation API internally so the app never calls “flag vendor SDK” directly.
- Medium: require a standard evaluation context object for every check (tenant + role + plan + risk).  
  Evidence: https://openfeature.dev/docs/specification/sections/evaluation-context
- Hard: build multiple providers (our DB-backed provider + optional external providers) with safe switching.

Thin slice (1–3 days):
- Day 1: define an internal flag evaluation API + context schema (mirrors OpenFeature).
- Day 2: implement a DB-backed provider (tenant overrides + percent rollout).
- Day 3: implement a hook that emits `flag_evaluated` audit events + minimal admin log viewer.

Evidence links:
- `competitors/evidence/openfeature.md`

### Statsig (adjacent)

- Category: feature gates + experiments + metrics (integrated control plane)
- Website: https://docs.statsig.com/
- What they sell: feature management + experimentation SaaS; useful UX primitives for “flags + experiments + guardrails”.

Notable features (3):
- Feature Gates (flags) as first-class primitive  
  Evidence: https://docs.statsig.com/feature-gates
- Experiments as first-class primitive  
  Evidence: https://docs.statsig.com/experiments
- Metrics registry concept / metrics docs  
  Evidence: https://docs.statsig.com/metrics

Copyable workflows (2):
1) Ship with gates: create gate → rollout to segment → monitor metrics → expand/rollback  
   Evidence: https://docs.statsig.com/feature-gates and https://docs.statsig.com/metrics
2) Experiment workflow: define experiment → define success + guardrails → launch → review results → ship winner  
   Evidence: https://docs.statsig.com/experiments

What we can steal:
- Easy: unify “flags” and “experiments” in one UI and share targeting + exposure logging.
- Medium: require success + guardrail metrics before enabling rollout beyond a threshold.
- Hard: policy-driven auto-stop/rollback based on guardrail breaches (ties into automation + approvals).

Thin slice (1–3 days):
- Day 1: build Flag Registry (key, owner, rollout, segments, audit).
- Day 2: build Metric Registry + exposure logging.
- Day 3: build Experiment object (flag + metric + variants) + approval to promote winner.

Evidence links:
- `competitors/evidence/statsig.md`

### Firebase Remote Config (adjacent)

- Category: remote config + targeting + rollout + A/B testing adjacency
- Website: https://firebase.google.com/docs/remote-config
- What they sell: managed remote config with templates/versioning and A/B testing workflows.

Notable features (3):
- Params + conditions + percent rollouts (targeting + rollout)  
  Evidence: https://firebase.google.com/docs/remote-config
- Templates/versioning for Remote Config  
  Evidence: https://firebase.google.com/docs/remote-config/templates
- A/B testing workflow adjacent to Remote Config  
  Evidence: https://firebase.google.com/docs/ab-testing

Copyable workflows (2):
1) Staged publish + rollback: publish template → monitor → rollback to prior template  
   Evidence: https://firebase.google.com/docs/remote-config/templates
2) A/B test as config: create A/B test for parameter value → run → apply winner  
   Evidence: https://firebase.google.com/docs/ab-testing

What we can steal:
- Easy: “config templates” with publish + rollback + diff view (pairs with audit).
- Medium: unify flags + remote config as typed params + variants.
- Hard: enforce approvals for applying winners for high-risk parameters.

Thin slice (1–3 days):
- Day 1: implement typed config params + tenant overrides.
- Day 2: implement publish + rollback versions (audit per publish).
- Day 3: implement percent rollout for 1 dimension + exposure logging.

Evidence links:
- `competitors/evidence/firebase-remote-config.md`

### Optimizely Feature Experimentation (adjacent)

- Category: experimentation + audiences/targeting + QA debugging affordances
- Website: https://docs.developers.optimizely.com/feature-experimentation/docs
- What they sell: experimentation platform; we’re stealing targeting builder + QA/test primitives.

Notable features (3):
- “Feature Test” experiment primitive  
  Evidence: https://support.optimizely.com/hc/en-us/articles/4410282697997-Feature-Test
- Audiences/targeting conditions are explicitly documented  
  Evidence: https://docs.developers.optimizely.com/feature-experimentation/docs/audiences
- QA Audience pattern to force bucketing/assignment for testing  
  Evidence: https://docs.developers.optimizely.com/feature-experimentation/docs/create-a-qa-audience-to-test-experiments

Copyable workflows (2):
1) Targeting → QA → launch: define audience → create test → QA by forcing assignment → launch  
   Evidence: https://docs.developers.optimizely.com/feature-experimentation/docs/create-a-qa-audience-to-test-experiments
2) Reuse targeting: define audience objects once → reuse across tests/rollouts (reduces repeated logic)  
   Evidence: https://docs.developers.optimizely.com/feature-experimentation/docs/audiences

What we can steal:
- Easy: a targeting builder with nested AND/OR and a “preview” mode.
- Medium: QA overrides (force variant) + strict audit logging for support/internal testing.
- Hard: a reusable “audience library” shared across flags, automation rules, approvals routing.

Thin slice (1–3 days):
- Day 1: implement a minimal targeting builder (limited attributes).
- Day 2: implement QA overrides (force variant) + audit.
- Day 3: implement “preview evaluation” endpoint (given context, show outcome).

Evidence links:
- `competitors/evidence/optimizely-feature-experimentation.md`

### PostHog (adjacent)

- Category: product analytics + feature flags + experiments
- Website: https://posthog.com/docs/feature-flags
- What they sell: analytics platform with flags/experiments built-in; also supports self-hosting.

Notable features (3):
- Feature flags as first-class primitive  
  Evidence: https://posthog.com/docs/feature-flags
- Experiments documented as a primitive  
  Evidence: https://posthog.com/docs/experiments
- Self-hosting posture (MIT-licensed per docs)  
  Evidence: https://posthog.com/docs/self-host

Copyable workflows (2):
1) Ship with flags + analytics feedback loop: rollout → measure → graduate/rollback  
   Evidence: https://posthog.com/docs/feature-flags
2) Experiment → decide → ship: run experiment and promote winning variant  
   Evidence: https://posthog.com/docs/experiments

What we can steal:
- Easy: “flag lifecycle” states and an archiving/cleanup workflow.
- Medium: experiments require an explicit primary metric and show results inline.
- Hard: unify approvals + flags + analytics into a “release timeline” UI.

Thin slice (1–3 days):
- Day 1: implement flags (boolean + variant) + percent rollout.
- Day 2: emit exposure events into analytics/event pipeline.
- Day 3: implement experiment object tied to a flag + primary metric + approval to promote.

Evidence links:
- `competitors/evidence/posthog-feature-flags.md`

---

## Cycle 14 — feature flag telemetry + event envelope standards (adjacent; observability + audit export)

### OpenTelemetry Semantic Conventions (Feature Flags) (adjacent)

- Category: standardized feature flag evaluation log schema
- Website: https://opentelemetry.io/docs/specs/semconv/feature-flags/feature-flags-logs/
- What they sell: standards (not a product) — reusable “event fields contract” for audits/experiments.

Notable features (3):
- Defined semantic conventions for feature flag evaluation logs (standard attributes)  
  Evidence: https://opentelemetry.io/docs/specs/semconv/feature-flags/feature-flags-logs/
- Explicit log record framing (fits audit/event log pipelines)  
  Evidence: https://opentelemetry.io/docs/specs/semconv/feature-flags/feature-flags-logs/
- Versioned spec in a public repo (stable-ish contract)  
  Evidence: https://github.com/open-telemetry/semantic-conventions

Copyable workflows (2):
1) Emit flag evaluation logs from services → route via collector/export pipeline → deliver to SIEM/observability sinks  
   Evidence: https://opentelemetry.io/docs/specs/semconv/feature-flags/feature-flags-logs/
2) Require evaluation context (tenant/actor) as part of the log schema (so exposures are attributable)  
   Evidence: https://opentelemetry.io/docs/specs/semconv/feature-flags/feature-flags-logs/

What we can steal:
- Easy: align our `flag_evaluated` audit event fields to OTel semconv where feasible.
- Medium: make “exposure logging” mandatory for risky flags/experiments (checkout, payouts, pricing).
- Hard: unify flag exposure logs + approval decision logs + audit exports under one standardized event pipeline.

Thin slice (1–3 days):
- Day 1: define a minimal `flag_evaluated` schema aligned to semconv.
- Day 2: emit logs from our flag evaluation layer + store locally for debugging.
- Day 3: export logs via existing audit export pipeline.

Evidence links:
- `competitors/evidence/opentelemetry-feature-flag-semconv.md`

### CloudEvents (CNCF) (adjacent)

- Category: event envelope standard for exports/webhooks/queues
- Website: https://cloudevents.io/
- What they sell: standards — a stable envelope so integrations don’t have to guess metadata fields.

Notable features (3):
- Standard event envelope with core attributes (id/source/type/subject/time/data)  
  Evidence: https://github.com/cloudevents/spec/blob/main/cloudevents/spec.md
- Vendor-neutral spec + ecosystem framing  
  Evidence: https://cloudevents.io/
- Compatibility with “audit/event export” design (deliver consistent payloads to customers)  
  Evidence: https://github.com/cloudevents/spec/blob/main/cloudevents/spec.md

Copyable workflows (2):
1) Audit export as CloudEvents: emit `type=lumelle.audit.*` events to webhooks/queues with consistent correlation metadata  
   Evidence: https://github.com/cloudevents/spec/blob/main/cloudevents/spec.md
2) Automation triggers as CloudEvents: emit domain events (`lumelle.order.refunded`) that external systems can subscribe to  
   Evidence: https://github.com/cloudevents/spec/blob/main/cloudevents/spec.md

What we can steal:
- Easy: define our outbound event API in CloudEvents JSON format.
- Medium: version event types (`lumelle.audit.v1.*`) and enforce backwards compatibility.
- Hard: build an event schema registry + validation for all emitted events.

Thin slice (1–3 days):
- Day 1: implement CloudEvents JSON for 5 core audit events.
- Day 2: implement webhook exporter with retries + signing.
- Day 3: add “event deliveries” log UI (delivery attempts + failures + disable workflow).

Evidence links:
- `competitors/evidence/cloudevents.md`

### RudderStack Tracking Plans (adjacent)

- Category: event taxonomy governance + versioning
- Website: https://www.rudderstack.com/docs/profiles/tracking-plans/
- What they sell: tracking-plan governance; useful UI concepts for controlling event schemas (license is restrictive for OSS reuse).

Notable features (3):
- Tracking plans exist as a first-class product surface  
  Evidence: https://www.rudderstack.com/docs/profiles/tracking-plans/
- Plan versioning exists in the workflow (tracking plan version)  
  Evidence: https://www.rudderstack.com/docs/profiles/tracking-plans/
- Governance framing: prevent drift in event naming/properties over time  
  Evidence: https://www.rudderstack.com/docs/profiles/tracking-plans/

Copyable workflows (2):
1) Define plan → publish → validate events against the plan → flag invalid events  
   Evidence: https://www.rudderstack.com/docs/profiles/tracking-plans/
2) Version taxonomy: bump plan version → migrate producers → track compliance  
   Evidence: https://www.rudderstack.com/docs/profiles/tracking-plans/

What we can steal:
- Easy: define an “audit event taxonomy” registry and display it in admin/docs.
- Medium: validate outbound export payloads against JSON Schema per event type.
- Hard: implement full tracking-plan lifecycle tooling (diffs, migration helpers, compliance dashboard).

Thin slice (1–3 days):
- Day 1: define JSON Schema for 5 event types.
- Day 2: validate export payloads in the exporter pipeline (warn/drop depending on env).
- Day 3: build admin “event types” page with required fields + sample payloads.

Evidence links:
- `competitors/evidence/rudderstack-tracking-plans.md`

---

## Cycle 15 — webhook delivery platform primitives (signing, retries, redelivery, disable/health) (adjacent)

### Svix (adjacent)

- Category: webhook sending + delivery reliability + verification patterns
- Website: https://docs.svix.com/
- What they sell: webhook delivery as a service + OSS server; reusable patterns for “webhook endpoints as governed objects”.

Notable features (3):
- Retry schedule with exponential backoff  
  Evidence: https://docs.svix.com/retries/
- Security guidance including HMAC signing + timestamps + replay mitigation  
  Evidence: https://docs.svix.com/security
- Consumer verification docs for validating payload signatures  
  Evidence: https://docs.svix.com/receiving/verifying-payloads/

Copyable workflows (2):
1) Secure receiving flow: verify signature + timestamp tolerance before processing  
   Evidence: https://docs.svix.com/receiving/verifying-payloads/
2) Debugging flow: use a webhook debugger/playground to inspect payloads and iterate quickly  
   Evidence: https://docs.svix.com/play/

What we can steal:
- Easy: “delivery attempts” UI + manual redelivery.
- Medium: default signature scheme includes timestamp; enforce strict verification guidance in docs/snippets.  
  Evidence: https://docs.svix.com/security
- Hard: full delivery platform (retry schedules, health scoring, replay protection) as a core primitive.

Thin slice (1–3 days):
- Day 1: webhook endpoint model + signing secret + delivery log.
- Day 2: retries with exponential backoff + auto-disable after N failures.
- Day 3: redeliver button + minimal debugger view.

Evidence links:
- `competitors/evidence/svix.md`

### Hookdeck (adjacent)

- Category: webhook reliability / event gateway controls
- Website: https://hookdeck.com/docs
- What they sell: event gateway + delivery tooling; strong UI patterns for retries and destinations.

Notable features (3):
- Retries are first-class (manual/scheduled/automatic)  
  Evidence: https://hookdeck.com/docs/retries
- “Destinations” object model (delivery targets as entities)  
  Evidence: https://hookdeck.com/docs/destinations
- Handling retries best practices (idempotency guidance)  
  Evidence: https://hookdeck.com/docs/retries

Copyable workflows (2):
1) Retry workflow: schedule/cancel retries; view next attempt  
   Evidence: https://hookdeck.com/docs/retries
2) Destination workflow: configure target → monitor delivery behavior  
   Evidence: https://hookdeck.com/docs/destinations

What we can steal:
- Easy: make retry control buttons visible and usable by non-engineers.
- Medium: destination-level retry policies and “next attempt at” surfaces.
- Hard: full event gateway product (fan-out, transforms) — likely optional.

Thin slice (1–3 days):
- Day 1: destination model + UI.
- Day 2: retry controls + delivery log UX.
- Day 3: auto-disable and alerting on repeated failures.

Evidence links:
- `competitors/evidence/hookdeck.md`

### Stripe Webhooks (adjacent)

- Category: webhook endpoint + signatures + best practices (gold standard)
- Website: https://docs.stripe.com/webhooks
- What they sell: production-grade webhook integration surface; patterns for signing + docs UX.

Notable features (3):
- Productized webhook endpoints surface  
  Evidence: https://docs.stripe.com/webhooks
- Signature verification docs  
  Evidence: https://docs.stripe.com/webhooks/signatures
- Best practices guidance (operational constraints as part of docs)  
  Evidence: https://docs.stripe.com/webhooks/best-practices

Copyable workflows (2):
1) Receiver flow: verify signature → process event → respond quickly  
   Evidence: https://docs.stripe.com/webhooks/signatures
2) Endpoint lifecycle: configure endpoint → select events → monitor deliveries → rotate secrets  
   Evidence: https://docs.stripe.com/webhooks

What we can steal:
- Easy: best-practice checklist embedded into endpoint setup UI.
- Medium: secret rotation workflow + audit logs on config changes.
- Hard: rich events/deliveries explorer UX.

Thin slice (1–3 days):
- Day 1: endpoints + event subscriptions + signing secret.
- Day 2: delivery logs + retries/redelivery.
- Day 3: secret rotation + audit events.

Evidence links:
- `competitors/evidence/stripe-webhooks.md`

### GitHub Webhooks (adjacent)

- Category: webhook delivery reliability + validation + redelivery (developer platform patterns)
- Website: https://docs.github.com/en/webhooks
- What they sell: robust webhook ecosystem; great patterns for “delivery SLAs” and signature validation.

Notable features (3):
- Receiver SLA guidance (respond fast with 2XX; slow responses treated as failure)  
  Evidence: https://docs.github.com/en/webhooks/using-webhooks/handling-webhook-deliveries
- Signature validation docs (secret token + HMAC SHA-256 header)  
  Evidence: https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries
- Redelivery workflow as first-class debugging primitive  
  Evidence: https://docs.github.com/en/webhooks/testing-and-troubleshooting-webhooks/redelivering-webhooks

Copyable workflows (2):
1) Validate deliveries: configure secret → verify hash per delivery  
   Evidence: https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries
2) Troubleshoot: inspect past delivery → redeliver after receiver fix  
   Evidence: https://docs.github.com/en/webhooks/testing-and-troubleshooting-webhooks/redelivering-webhooks

What we can steal:
- Easy: “receiver checklist” and recommended response timing.
- Medium: redelivery UX + correlation IDs + delivery viewer.
- Hard: full request/response capture with redaction + retention (privacy work).

Thin slice (1–3 days):
- Day 1: endpoints + signing secret + docs snippets for verification.
- Day 2: delivery log + redelivery button.
- Day 3: endpoint health scoring + auto-disable + approval to re-enable.

Evidence links:
- `competitors/evidence/github-webhooks.md`

---

## Cycle 16 — webhook deliveries UX (retention/redaction, idempotency, receiver SLAs) (adjacent)

### Svix (retention + object storage) (adjacent)

- Category: retention controls + alternative delivery targets
- Website: https://docs.svix.com/retention
- What they sell: webhook delivery platform with explicit retention/compliance controls and non-HTTP delivery endpoints.

Notable features (3):
- Explicit payload retention window + deletion behavior  
  Evidence: https://docs.svix.com/retention
- Enterprise option: delete payloads on successful delivery (with explicit tradeoff notes)  
  Evidence: https://docs.svix.com/retention
- Object storage endpoints (S3/GCS/Azure Blob) as delivery targets  
  Evidence: https://docs.svix.com/advanced-endpoints/object-storage

Copyable workflows (2):
1) Retention governance: set retention period → audit changes → optionally delete payloads on success (compliance mode)  
   Evidence: https://docs.svix.com/retention
2) Object storage delivery: deliver event payloads to a customer bucket instead of HTTP POST (reduces receiver load)  
   Evidence: https://docs.svix.com/advanced-endpoints/object-storage

What we can steal:
- Easy: retention window setting + “payload redaction/retention” UI for delivery logs.
- Medium: delete payload on success option with explicit UX warning about breaking redrive/debug.
- Hard: alternative delivery target types (object storage) for high-throughput/high-sensitivity events.

Thin slice (1–3 days):
- Day 1: add payload retention policy + hard delete job + audit.
- Day 2: add “delete payload on success” (gated by approvals) + UI warning.
- Day 3: add object storage export for one event stream (JSONL to S3).

Evidence links:
- `competitors/evidence/svix-payload-retention-object-storage.md`

### Hookdeck (idempotency guide) (adjacent)

- Category: receiver reliability patterns (idempotency strategies)
- Website: https://hookdeck.com/webhooks/guides/implement-webhook-idempotency
- What they sell: webhook reliability/event gateway; strong written patterns for building safe receivers.

Notable features (3):
- “At least once” delivery requires idempotency (duplicates happen)  
  Evidence: https://hookdeck.com/webhooks/guides/implement-webhook-idempotency
- Strategy: unique constraint on a stable ID from event data (e.g. `order_id`)  
  Evidence: https://hookdeck.com/webhooks/guides/implement-webhook-idempotency
- Strategy: processed webhooks table keyed by provider webhook ID (e.g. `X-Shopify-Webhook-Id`)  
  Evidence: https://hookdeck.com/webhooks/guides/implement-webhook-idempotency

Copyable workflows (2):
1) Side-effects ordering: record idempotency key first → then side effects → respond 2XX even for duplicates  
   Evidence: https://hookdeck.com/webhooks/guides/implement-webhook-idempotency
2) Operational view: store “processed events” status to support replay safety and debugging  
   Evidence: https://hookdeck.com/webhooks/guides/implement-webhook-idempotency

What we can steal:
- Easy: require every webhook/automation handler to define an idempotency key.
- Medium: shared idempotency middleware + DB unique constraints to prevent duplicate side effects.
- Hard: admin “processed events” UI + replay controls (needs redaction/retention).

Thin slice (1–3 days):
- Day 1: create `processed_events` table keyed by `(tenant_id, idempotency_key)` and mark status.
- Day 2: wrap handler to short-circuit on duplicates and return 2XX.
- Day 3: add a basic UI to view processed events + link to delivery attempts.

Evidence links:
- `competitors/evidence/hookdeck-webhook-idempotency.md`

### GitHub Webhooks (ops basics) (adjacent)

- Category: receiver SLA + secret handling + redelivery constraints
- Website: https://docs.github.com/en/webhooks
- What they sell: a mature webhooks ecosystem with explicit operational guidance and redelivery UX.

Notable features (3):
- Explicit receiver SLA: respond 2XX within 10 seconds or delivery is treated as failure  
  Evidence: https://docs.github.com/api/article/body?pathname=/en/webhooks/using-webhooks/handling-webhook-deliveries
- Secret handling guidance: high entropy + store securely + never hardcode  
  Evidence: https://docs.github.com/api/article/body?pathname=/en/webhooks/using-webhooks/validating-webhook-deliveries
- Redelivery constraints: time-bounded (past 3 days) and permission-gated  
  Evidence: https://docs.github.com/api/article/body?pathname=/en/webhooks/testing-and-troubleshooting-webhooks/redelivering-webhooks

Copyable workflows (2):
1) Handle fast: verify/queue/respond quickly; process async  
   Evidence: https://docs.github.com/api/article/body?pathname=/en/webhooks/using-webhooks/handling-webhook-deliveries
2) Redrive safely: redeliver within a bounded window and restrict who can redrive  
   Evidence: https://docs.github.com/api/article/body?pathname=/en/webhooks/testing-and-troubleshooting-webhooks/redelivering-webhooks

What we can steal:
- Easy: ship receiver SLAs + best-practice guidance as part of setup UX.
- Medium: time-bounded redelivery in admin (last N days) with audit trail.
- Hard: full request/response delivery viewer with privacy redaction and retention controls.

Thin slice (1–3 days):
- Day 1: standard receiver pattern docs/snippets: enqueue then 2XX.
- Day 2: implement redelivery for last N days + audit.
- Day 3: implement secrets rotation + secure storage guidance + approvals for risky changes.

Evidence links:
- `competitors/evidence/github-webhook-ops-basics.md`

---

## Cycle 17 — payload redaction + “safe delivery viewer” UX (adjacent)

### Svix Transformations (adjacent)

- Category: in-flight payload transformation (endpoint-level JS)
- Website: https://docs.svix.com/transformations
- What they sell: payload shaping in the webhook delivery plane (powerful; relevant to redaction/masking patterns).

Notable features (3):
- Transformations modify webhook properties in-flight including body payload  
  Evidence: https://docs.svix.com/transformations
- Endpoint-level transformation code authored by customers (JS)  
  Evidence: https://docs.svix.com/transformations
- Explicitly supports changing HTTP method, target URL, and body payload  
  Evidence: https://docs.svix.com/transformations

Copyable workflows (2):
1) Redaction/payload shaping before delivery: apply transformation → deliver redacted payload → keep original internal  
   Evidence: https://docs.svix.com/transformations
2) Preview/test workflow: author transformation → test in UI → apply to endpoint  
   Evidence: https://docs.svix.com/transformations

What we can steal:
- Easy: “redaction profiles” (allowlist/denylist) as a safe subset of transformations.
- Medium: preview diff UI for before/after redaction (ties to approvals for enabling).
- Hard: arbitrary user-defined JS transformations (sandboxing + audit + abuse prevention).

Thin slice (1–3 days):
- Day 1: implement endpoint-level redaction profile (denylist fields) + apply before delivery.
- Day 2: preview diff (raw → redacted) and store only redacted in delivery logs by default.
- Day 3: audit + approvals on redaction profile changes.

Evidence links:
- `competitors/evidence/svix-transformations.md`

### Hookdeck Events Viewer (adjacent)

- Category: event/delivery viewer UX primitives (inspection + custom columns)
- Website: https://hookdeck.com/docs/events.md
- What they sell: operational UI patterns for browsing, filtering, and inspecting events and attempts.

Notable features (3):
- Inspect an event includes request headers/path/query/body and attempt response (JSON/plain text)  
  Evidence: https://hookdeck.com/docs/events.md
- Custom columns: display selected payload fields in the list view  
  Evidence: https://hookdeck.com/docs/events.md
- Explicitly acknowledges filtering limitations for large payloads (signals indexing/cost constraints)  
  Evidence: https://hookdeck.com/docs/events.md

Copyable workflows (2):
1) Operator triage: filter/sort → inspect event → check attempt response → retry  
   Evidence: https://hookdeck.com/docs/events.md
2) “Store less, show what matters”: use custom columns + saved views instead of exposing full payloads everywhere  
   Evidence: https://hookdeck.com/docs/events.md

What we can steal:
- Easy: add custom columns to our deliveries list (order_id, integration_id, event_type).
- Medium: default to metadata-only list view; gate full payload viewing behind RBAC + step-up + retention.
- Hard: payload search DSL at scale (privacy + indexing).

Thin slice (1–3 days):
- Day 1: deliveries list with metadata + add-field-as-column from known schema.
- Day 2: delivery details drawer with JSON viewer + redaction + RBAC/step-up.
- Day 3: saved views and share links + audit “payload viewed” events.

Evidence links:
- `competitors/evidence/hookdeck-events-viewer.md`

### OpenTelemetry Collector (redaction processors) (adjacent; OSS)

- Category: pipeline-stage masking/redaction primitives (delete/hash/replace/truncate)
- Website: https://github.com/open-telemetry/opentelemetry-collector-contrib
- What they sell: OSS pipeline building blocks; useful as mental model and potentially adoption candidate.

Notable features (3):
- Attributes processor supports explicit `delete` and `hash` actions  
  Evidence: https://raw.githubusercontent.com/open-telemetry/opentelemetry-collector-contrib/main/processor/attributesprocessor/README.md
- Docs explicitly call out “redacting sensitive information” use cases  
  Evidence: https://raw.githubusercontent.com/open-telemetry/opentelemetry-collector-contrib/main/processor/attributesprocessor/README.md
- Transform processor supports pattern replacement and truncation (e.g., redact passwords)  
  Evidence: https://raw.githubusercontent.com/open-telemetry/opentelemetry-collector-contrib/main/processor/transformprocessor/README.md

Copyable workflows (2):
1) Export pipeline with redaction: ingest logs → delete/hash → export (SIEM/observability/audit sinks)  
   Evidence: attributes processor actions: https://raw.githubusercontent.com/open-telemetry/opentelemetry-collector-contrib/main/processor/attributesprocessor/README.md
2) Pattern-based masking: replace secrets in strings and truncate long fields before storage/export  
   Evidence: transform processor examples: https://raw.githubusercontent.com/open-telemetry/opentelemetry-collector-contrib/main/processor/transformprocessor/README.md

What we can steal:
- Easy: fixed redaction profile for common fields (tokens/emails) applied before export.
- Medium: add regex-based masking for secrets in string fields.
- Hard: tenant-configurable redaction rules with preview + approvals.

Thin slice (1–3 days):
- Day 1: implement fixed redaction profile and apply in export pipeline.
- Day 2: add preview endpoint for before/after.
- Day 3: add audit + approvals on redaction config changes.

Evidence links:
- `competitors/evidence/opentelemetry-collector-redaction.md`

---

## Cycle 18 — payload viewing policy + recovery UX (RBAC/step-up, replay/bulk retry, “issues”) (adjacent)

### Svix App Portal (logs + replay + testing) (adjacent)

- Category: embedded portal UX for endpoints and operator workflows
- Website: https://docs.svix.com/app-portal
- What they sell: end-customer portal patterns for managing endpoints and diagnosing delivery issues.

Notable features (3):
- Filter logs from endpoint page and narrow by date filter presets  
  Evidence: https://docs.svix.com/receiving/using-app-portal/filtering-logs
- Replay workflows: resend a single message and replay all failed messages since a time  
  Evidence: https://docs.svix.com/receiving/using-app-portal/replaying-messages
- Testing tab: send example events and inspect payload + attempts  
  Evidence: https://docs.svix.com/receiving/using-app-portal/testing-events

Copyable workflows (2):
1) Endpoint setup loop: add endpoint → send test event → inspect attempts/payload → fix config  
   Evidence: https://docs.svix.com/receiving/using-app-portal/testing-events
2) Outage recovery loop: identify failures → replay single or replay all failures since timestamp  
   Evidence: https://docs.svix.com/receiving/using-app-portal/replaying-messages

What we can steal:
- Easy: endpoint-scoped delivery logs + date presets.
- Medium: replay-all-since modal with confirmation + audit event.
- Hard: fully embedded portal with tenant branding + deep RBAC (end-customer self-serve).

Thin slice (1–3 days):
- Day 1: endpoint detail page lists delivery attempts + date presets.
- Day 2: test event sender + delivery detail view (payload + attempts).
- Day 3: replay actions gated by RBAC/step-up + audit.

Evidence links:
- `competitors/evidence/svix-app-portal-ops-ux.md`

### Hookdeck Issues & Notifications (adjacent)

- Category: incident grouping + alerting + bulk retry
- Website: https://hookdeck.com/docs/issues
- What they sell: ops workflow primitives for delivery failures grouped as issues.

Notable features (3):
- Issues auto-open on problems and notify team (notification preferences)  
  Evidence: https://hookdeck.com/docs/issues.md
- Notifications contain the payload of the failed webhook (sensitive-data risk; requires redaction policy)  
  Evidence: https://hookdeck.com/docs/issues.md
- Issue workflow includes “View Events” and “Bulk Retry” recovery actions  
  Evidence: https://hookdeck.com/docs/issues.md

Copyable workflows (2):
1) Failure → issue → notify: start remediation early with grouped failures  
   Evidence: https://hookdeck.com/docs/issues.md
2) Bulk recovery: view associated events → bulk retry failures  
   Evidence: https://hookdeck.com/docs/issues.md

What we can steal:
- Easy: “issues” page grouping failures by endpoint + error signature.
- Medium: bulk retry + mute/ignore workflow to reduce alert fatigue.
- Hard: webhook notification topics + routing via sources/destinations.

Thin slice (1–3 days):
- Day 1: create issue grouping logic (endpoint + status family + message).
- Day 2: send email notification with redacted payload snippet by default.
- Day 3: bulk retry from issue with audit and approvals for risky endpoints.

Evidence links:
- `competitors/evidence/hookdeck-issues-notifications.md`

---

## Cycle 19 — concrete schema + event taxonomy primitives (registry + examples + issues API objects) (adjacent)

### Svix (event type schemas + event catalog) (adjacent)

- Category: event taxonomy + schema registry + example payloads
- Website: https://docs.svix.com/tutorials/event-type-schema
- What they sell: high-quality patterns for making an event catalog self-serve (schema + examples + grouping).

Notable features (3):
- Dot-delimited event types grouped visually in App Portal  
  Evidence: https://docs.svix.com/tutorials/event-type-schema
- JSON Schema (Draft 7) attached per event type (schema registry)  
  Evidence: https://docs.svix.com/tutorials/event-type-schema
- Event Catalog shows event definition and example payload per event type  
  Evidence: https://docs.svix.com/receiving/using-app-portal/event-catalog

Copyable workflows (2):
1) Define event type → add schema → preview schema + example → publish to catalog  
   Evidence: https://docs.svix.com/tutorials/event-type-schema
2) Consumer build loop: read schema + example → implement receiver + test event → validate payload handling  
   Evidence: https://docs.svix.com/receiving/using-app-portal/event-catalog

What we can steal:
- Easy: event taxonomy grouped by dot-delimited prefixes (tree UI).
- Medium: schema-per-event-type + example payload previews.
- Hard: versioned schemas with migration workflows and governance.

Thin slice (1–3 days):
- Day 1: `event_types` registry (key, group, description, status).
- Day 2: optional JSON Schema + curated example payload.
- Day 3: Event Catalog UI + link to test event sender.

Evidence links:
- `competitors/evidence/svix-event-type-schema-event-catalog.md`

### Hookdeck (issues as API objects) (adjacent)

- Category: issues lifecycle + notifications as first-class API surfaces
- Website: https://hookdeck.com/docs/issues
- What they sell: incident grouping primitives with explicit API endpoints.

Notable features (3):
- Issues list endpoint exists (`GET /issues`)  
  Evidence: https://hookdeck.com/docs/issues.md
- Issues have lifecycle endpoints (`GET/PUT/DELETE /issues/:id`)  
  Evidence: https://hookdeck.com/docs/issues.md
- Webhook notifications can be toggled via API (`PUT /notifications/webhooks`)  
  Evidence: https://hookdeck.com/docs/issues.md

Copyable workflows (2):
1) Issue lifecycle: auto-open → notify → bulk retry → resolve/dismiss/ignore  
   Evidence: https://hookdeck.com/docs/issues.md
2) Programmatic operations: list issues and update status from automation (internal ops tooling)  
   Evidence: https://hookdeck.com/docs/issues.md

What we can steal:
- Easy: make “issues” a first-class table + API, not just UI grouping.
- Medium: status transitions + ignore/mute rules are governance controls (need audit).
- Hard: externalized notification routing by topic/destination.

Thin slice (1–3 days):
- Day 1: `issues` table grouped by endpoint + error signature.
- Day 2: API endpoints for list/update/dismiss + audit.
- Day 3: notification preferences with redacted payload snippets by default.

Evidence links:
- `competitors/evidence/hookdeck-api-issues.md`

### Infisical (adjacent)

- Category: secrets management / credential governance
- Website: https://infisical.com
- What they sell: secrets management with access controls + audit logs; strong “govern credentials safely” primitives.

Notable features (3–5):
- Audit logs as a first-class platform surface
- Access controls / RBAC-style permissions for sensitive config changes
- “Secrets” treated as a governed platform object (vs app-specific settings)

Copyable workflows (2–4):
1) Update secret/config → emit immutable audit entry → review in audit log
2) Invite/administer members → assign access controls → constrain who can rotate/revoke credentials

What we can steal:
- Easy: dedicated “Integration/Credential Audit Log” view with filters (actor, integration, action).
- Medium: role templates for integration/credential management (view/connect/rotate/revoke).
- Hard: full secrets platform parity (agents/injection/CLI) — instead, keep a thin “integration credentials vault”.

Evidence links:
- `competitors/evidence/infisical.md`

### HashiCorp Vault (adjacent)

- Category: secrets management / policy / audit
- Website: https://developer.hashicorp.com/vault
- What they sell: secrets + policy + audit primitives (very transferable patterns, but BUSL license is restrictive).

Notable features (3–5):
- Audit devices as configurable audit trail sinks
- Policy-based access control (RBAC-like)
- Token lifecycle and TTL/lease concepts (expiring credentials)

Copyable workflows (2–4):
1) Enable audit → forward audit output to sink → investigate “who changed what”
2) Issue scoped tokens → enforce expiry/renewal → revoke on suspicious activity

What we can steal:
- Easy: “audit sinks” abstraction (store internally + optional external forwarder).
- Medium: TTL/expiry UX (expires_at, rotate now, revoke all) for integration tokens.
- Hard: dynamic secrets with leases (issue ephemeral credentials per job) — heavy but high leverage.

Evidence links:
- `competitors/evidence/hashicorp-vault.md`

### Doppler (adjacent)

- Category: secrets management (SaaS)
- Website: https://www.doppler.com
- What they sell: secrets platform with strong token lifecycle UX + activity logs + custom roles.

Notable features (3–5):
- Service tokens as a first-class credential primitive
- Activity logs (governance surface)
- Custom roles (fine-grained RBAC)

Copyable workflows (2–4):
1) Create service token → scope it → show-once secret → rotate/revoke when needed
2) Filter activity logs → identify suspicious actions → rotate/revoke credentials

What we can steal:
- Easy: show-once token creation UX + inventory (created_at, last_used_at, revoke).
- Medium: custom roles + permission templates for credential actions.
- Hard: end-to-end secrets management parity (out of scope; borrow only governance + lifecycle).

Evidence links:
- `competitors/evidence/doppler.md`

### Auth0 (adjacent)

- Category: identity + access control + logs (SaaS)
- Website: https://auth0.com
- What they sell: identity platform; reusable patterns for RBAC, logs, and log streaming exports.

Notable features (3–5):
- RBAC model for APIs (roles + permissions)
- Logs as a first-class surface (audit trail)
- Log Streams as an export primitive (to SIEM/observability tools)

Copyable workflows (2–4):
1) Define roles/permissions → assign to principals → gate sensitive admin actions
2) Use logs → stream to SIEM → correlate → remediate (disable/revoke/disconnect)

What we can steal:
- Easy: audit log event taxonomy + search/filter UX.
- Medium: log streaming (export) as an enterprise feature (webhook/sink).
- Hard: adaptive risk + anomaly detection — borrow UI patterns but not the full engine.

Evidence links:
- `competitors/evidence/auth0.md`

### Okta (adjacent)

- Category: identity + admin RBAC + system log (SaaS)
- Website: https://developer.okta.com
- What they sell: IAM platform; excellent patterns for system logs/event models and admin role delegation.

Notable features (3–5):
- System Log API as an audit/event stream primitive
- Admin roles API for delegated governance
- API tokens lifecycle patterns

Copyable workflows (2–4):
1) Assign admin roles → review audit events → investigate changes
2) Create API token → rotate/revoke → trace usage via logs/events

What we can steal:
- Easy: event schema for audit logs (actor/target/action/outcome) + query UX.
- Medium: composable admin roles (beyond “owner/admin”) for integrations/credentials.
- Hard: full IAM suite parity — instead, implement minimal roles + logs + export.

Evidence links:
- `competitors/evidence/okta.md`

### Datadog (adjacent)

- Category: observability / logs pipelines + archives
- Website: https://www.datadoghq.com
- What they sell: logs platform with configurable pipelines and archives (good patterns for audit export + retention).

Notable features (3–5):
- Log processing pipelines (transform/enrich/redact before storage/export)
- Archives for long-term retention patterns
- Central pipeline control plane separate from log producers

Copyable workflows (2–4):
1) Ingest audit events → redact/enrich in pipeline → store + export safely
2) Keep short retention in primary store → archive long-term elsewhere for compliance

What we can steal:
- Easy: export configuration UI that shows sinks + retention + redaction status.
- Medium: pipeline processor library for audit events (mask tokens, drop PII, add tenant metadata).
- Hard: full observability platform parity; keep only “pipeline + archive + export” primitives.

Evidence links:
- `competitors/evidence/datadog.md`

### Splunk (adjacent)

- Category: SIEM/log analytics (HEC ingestion)
- Website: https://www.splunk.com
- What they sell: enterprise SIEM/log analytics; HEC token ingestion is a great external sink primitive.

Notable features (3–5):
- HTTP Event Collector (HEC) token-based ingestion API
- “Ingest token” concept maps to export sink credentials in our admin
- JSON event ingestion model (producer → indexer/search)

Copyable workflows (2–4):
1) Generate HEC token → configure endpoint → send test event → monitor delivery health
2) Query exported audit events downstream to investigate incidents (correlate with other signals)

What we can steal:
- Easy: export sink wizard with “send test event” and health status.
- Medium: delivery guarantees UX (last delivered, retries, DLQ summary).
- Hard: full SIEM correlation engine (out of scope).

Evidence links:
- `competitors/evidence/splunk.md`

### Sentry (adjacent)

- Category: observability / org governance audit log
- Website: https://sentry.io
- What they sell: developer observability with strong organization governance patterns (audit log surface).

Notable features (3–5):
- Audit log as first-class org governance surface
- Centralized change history for “who did what”
- Transferable audit log list UX patterns (filters + entries)

Copyable workflows (2–4):
1) “Something changed” → open audit log → filter by actor/time → identify action
2) Periodic access review: scan audit entries for anomalies / least privilege violations

What we can steal:
- Easy: audit log list with stable event names + filters.
- Medium: deep-link each audit entry to affected object pages (integration, credential, setting).
- Hard: anomaly detection; instead, support export/streaming to external tools.

Evidence links:
- `competitors/evidence/sentry.md`

### OpenTelemetry Collector (adjacent)

- Category: observability pipeline (receive/process/export)
- Website: https://opentelemetry.io
- What they sell: open standard collector architecture; best blueprint for audit event forwarding.

Notable features (3–5):
- Pipeline mental model: receive → process → export
- Processor stage suggests redaction/enrichment before export
- Exporters abstraction maps to “audit export sinks”

Copyable workflows (2–4):
1) Receive audit events → apply processors → export to multiple sinks
2) Add exporter → shadow export → validate → enable fully

What we can steal:
- Easy: express our system as “receivers/processors/exporters” in UI + code.
- Medium: multiple exporters with health status per sink.
- Hard: embed a full OTEL collector; keep as reference architecture.

Evidence links:
- `competitors/evidence/opentelemetry-collector.md`

### Elastic Stack (adjacent)

- Category: audit events taxonomy + audit logging patterns
- Website: https://www.elastic.co
- What they sell: search/log analytics; strong audit event taxonomy patterns, but licensing is complex/restrictive.

Notable features (3–5):
- Kibana audit events taxonomy (naming + fields)
- Elasticsearch audit events taxonomy (system-level actions)
- License posture complexity (AGPL/SSPL/ELv2 mix) impacts adoption for hosted SaaS

Copyable workflows (2–4):
1) Define audit event taxonomy first → build UI filters/search around stable fields
2) Use taxonomy to generate sink-specific mappings (Splunk/Datadog) for exports

What we can steal:
- Easy: documented audit event types and stable payload schema.
- Medium: export mapping presets based on taxonomy.
- Hard: shipping or embedding a full Elastic stack (ops + license burden).

Evidence links:
- `competitors/evidence/elastic-stack.md`

### GitHub (adjacent)

- Category: step-up auth + approvals + protected actions
- Website: https://docs.github.com
- What they sell: governance primitives across sensitive actions (re-auth prompts, protected targets, required reviewers).

Notable features (3–5):
- “Sudo mode” re-authentication before sensitive actions
- Protected branches as policy gates for risky changes
- Environments + deployment protection rules with required reviewers (approval gate)

Copyable workflows (2–4):
1) Attempt sensitive action → prompt re-auth → grant time-limited step-up session
2) Attempt protected change → require reviewers → approve/deny → execute with audit trail

What we can steal:
- Easy: step-up auth prompts for risky admin actions (refunds > threshold, payout/bank changes, key rotations).
- Medium: “protected resources” with required reviewers/approvers.
- Hard: generalized policy engine; start with a small set of templates + high-risk actions only.

Evidence links:
- `competitors/evidence/github.md`

### GitLab (adjacent)

- Category: approvals + protected actions
- Website: https://docs.gitlab.com
- What they sell: governance through approval rules and protected branches (strong reusable patterns).

Notable features (3–5):
- Merge request approvals (required approvals)
- Protected branches (policy gates)
- Permissive OSS posture outside enterprise directories (MIT outside `ee/`)

Copyable workflows (2–4):
1) Sensitive change requires approvals → approver(s) approve → allow merge/apply
2) Protect critical branch/resource → restrict who can modify → reduce blast radius

What we can steal:
- Easy: approvals primitive (request → approve/deny → audit event).
- Medium: per-resource protection settings (require approvals for payout settings, integration disconnect, etc.).
- Hard: fully flexible policy DSL; start with templates.

Evidence links:
- `competitors/evidence/gitlab.md`

### Microsoft Entra PIM (adjacent)

- Category: JIT privilege elevation + approvals
- Website: https://learn.microsoft.com
- What they sell: time-based and approval-based role activation (excellent blueprint for “break glass” elevation).

Notable features (3–5):
- Time-bounded role activation (JIT)
- Approval-based activation (dual control)
- Activity/visibility surfaces for governance

Copyable workflows (2–4):
1) Request elevation → require approval → activate role for fixed duration → auto-expire
2) Review “activity” (who elevated, when, why) to reduce permanent admin access

What we can steal:
- Easy: time-bounded “elevated mode” for sensitive admin sections with visible countdown.
- Medium: approval-based elevation with required reason and approver roles.
- Hard: full identity governance suite; implement the thin subset (elevation + approvals + audit).

Evidence links:
- `competitors/evidence/microsoft-entra-pim.md`

### AWS IAM + CloudTrail (adjacent)

- Category: MFA + audit trail + MFA-gated destructive actions
- Website: https://docs.aws.amazon.com
- What they sell: security primitives for sensitive actions (MFA, event history) and MFA delete patterns.

Notable features (3–5):
- MFA for IAM users/root user (strong auth)
- CloudTrail event history (audit trail)
- MFA Delete for high-risk deletion actions (S3)

Copyable workflows (2–4):
1) Require MFA → execute sensitive change → record audit event → investigate via event history
2) Require MFA for delete operations on critical resources

What we can steal:
- Easy: “MFA required” (step-up) for destructive admin actions.
- Medium: event-history UI with filters and downloadable records.
- Hard: IAM-like policy expressiveness; start with a curated list of sensitive actions.

Evidence links:
- `competitors/evidence/aws-iam-cloudtrail.md`

### Stripe (adjacent)

- Category: 2FA baseline + API key governance (merchant-admin-adjacent)
- Website: https://stripe.com
- What they sell: admin security patterns and credential governance (2FA + API keys).

Notable features (3–5):
- Two-step authentication guidance for securing accounts
- API keys as a first-class credential surface
- Organization/account scoping patterns for multi-account governance (appears in docs usage patterns)

Copyable workflows (2–4):
1) Enforce 2FA for admins before allowing sensitive actions
2) Rotate/revoke API keys and tie changes to audit events

What we can steal:
- Easy: 2FA status gating + prompts for high-risk actions.
- Medium: API key inventory UX (created/last used/rotate/revoke) tied to audit log.
- Hard: full org/multi-account governance; start with scoped credentials + explicit “acting as store” context.

Evidence links:
- `competitors/evidence/stripe.md`

### Jira Service Management (adjacent)

- Category: approvals + SLAs (approval inbox + timers patterns)
- Website: https://support.atlassian.com/jira-service-management-cloud/
- What they sell: service request/change workflows with approvals and SLA goals (strong approval queue + timer mental models).

Notable features (3–5):
- Approval steps inserted into workflow statuses; supports approvers and approver groups (incl. CAB patterns)
- Built-in SLAs (goals/timers) for request handling
- Status-driven approval stage (explicit “approvers” status)

Copyable workflows (2–4):
1) Request → approval stage → approvers approve/deny → workflow progresses
2) SLA timers on work: countdown to due/breach → prioritize work → meet goals

What we can steal:
- Easy: approvals inbox with clear pending/approved/denied statuses and “who’s next”.
- Medium: SLA timers + overdue states for approvals; reminders triggered by due_at.
- Hard: CAB/change management depth; start with approver groups and basic stages.

Evidence links:
- `competitors/evidence/jira-service-management.md`

### PagerDuty (adjacent)

- Category: escalation policies + timeouts (notification/escalation primitive)
- Website: https://support.pagerduty.com
- What they sell: incident response escalation. Patterns map cleanly to approval reminders and escalation chains.

Notable features (3–5):
- Escalation policies composed of rules and timeouts
- Escalate until acknowledged (action required)
- Multi-user notification patterns

Copyable workflows (2–4):
1) Notify primary approver → if not acknowledged by timeout → notify backup approver → repeat
2) Configure escalation policy rules → apply to category of events → monitor outcomes

What we can steal:
- Easy: escalation timeout + reminder schedule for approvals.
- Medium: reusable escalation policies per approval type.
- Hard: schedule/on-call rotation-aware escalation; start with static fallback chain.

Evidence links:
- `competitors/evidence/pagerduty.md`

### Power Automate Approvals (adjacent)

- Category: approval workflow primitive (request/response + “wait” semantics)
- Website: https://learn.microsoft.com/en-us/power-automate/
- What they sell: workflow automation with a standardized approvals pattern and connector action surface.

Notable features (3–5):
- Approval workflow pattern (create approval → approve/reject → proceed)
- Standard approvals connector (consistent action surface)
- Approvals reused across many systems (platform glue)

Copyable workflows (2–4):
1) Trigger → create approval → wait for response → branch on approve/deny
2) Standardize approvals in workflows via a shared connector/action

What we can steal:
- Easy: treat approvals as a shared primitive used across admin actions.
- Medium: “wait for response” semantics with explicit timeouts and reminders.
- Hard: connector ecosystem breadth; start with internal admin actions only.

Evidence links:
- `competitors/evidence/power-automate-approvals.md`

---

## 6) Additional deepened set (batch 5 — iPaaS / cases / orchestration UI)

### Workato (adjacent)

- Category: workflow automation / iPaaS (SaaS)
- Website: https://www.workato.com
- What they sell: enterprise automation platform (“recipes” + connectors) with strong lifecycle/ops surfaces.
- Admin/ops transfer insight: Workato documents “operations hub + environments + audit log” — exactly the primitives we need to safely run merchant-admin automation at scale.

Notable features (5–10):
- Environment separation for automation lifecycle (dev/test/prod): https://docs.workato.com/en/recipes/managing-recipes.html
- Operations hub dashboard for monitoring running automations and connections: https://docs.workato.com/en/features/admin-dashboard.html
- Activity audit log as governance surface: https://docs.workato.com/en/features/activity-audit-log.html

Copyable workflows (2–4):
1) Safe release workflow for automations: develop → test → deploy between environments  
   Evidence: https://docs.workato.com/en/recipes/managing-recipes.html
2) Ops workflow: monitor ops dashboard → identify unhealthy connections/recipes → resolve quickly  
   Evidence: https://docs.workato.com/en/features/admin-dashboard.html

What we can steal:
- Easy: “Ops hub” landing page that surfaces failures and offers quick actions (retry/disable/notify).
- Medium: environment-based promotion workflow for admin changes + automations (draft/staging/prod).
- Hard: full iPaaS connector ecosystem + enterprise reliability moat.

Thin-slice (1–3 days):
- Day 1: add `automation_environment` (draft/staging/prod) and show it across automation screens.
- Day 2: add “Ops hub” page (failed runs, unhealthy connections, top errors).
- Day 3: add activity audit log for all automation/admin changes.

Evidence links:
- `competitors/evidence/workato.md`

### Tines (adjacent)

- Category: workflow automation (SaaS) + case management (human-in-the-loop)
- Website: https://www.tines.com
- What they sell: automation + case-based operational tooling (strong “cases/tasks” surfaces).
- Admin/ops transfer insight: the “cases + tasks” pattern is an elegant way to handle exceptions and approvals without forcing everything into a pure automation graph.

Notable features (5–10):
- Story runs (run history) as first-class operational surface: https://www.tines.com/docs/stories/story-runs/
- Cases as a first-class object: https://www.tines.com/docs/cases/overview/
- Tasks inside cases (work queue primitive): https://www.tines.com/docs/cases/tasks/
- Audit logs: https://www.tines.com/docs/admin/audit-logs/

Copyable workflows (2–4):
1) Automation → case escalation: create case + attach context + assign tasks  
   Evidence: https://www.tines.com/docs/cases/creating-a-case/  
   Evidence: https://www.tines.com/docs/cases/tasks/
2) Operate automation via run history: inspect story runs → filter failures → iterate fixes  
   Evidence: https://www.tines.com/docs/stories/story-runs/

What we can steal:
- Easy: “Runs” page that’s globally accessible and links to payload/errors.
- Medium: “Cases” as exception-handling + approval queue primitive (human operations layer).
- Hard: full SOAR-like ecosystem breadth and templates maturity.

Thin-slice (1–3 days):
- Day 1: add `cases` + “create case from failed run” action.
- Day 2: add `case_tasks` with assignment + statuses.
- Day 3: add audit log + link audit events to case/task/run detail views.

Evidence links:
- `competitors/evidence/tines.md`

### Kestra (adjacent)

- Category: workflow orchestration (OSS + enterprise)
- Website: https://kestra.io
- What they sell: orchestration engine + rich UI for operating workflows/executions.
- License posture: Apache-2.0 (repo license). Evidence: https://raw.githubusercontent.com/kestra-io/kestra/develop/LICENSE
- Admin/ops transfer insight: orchestration UI patterns (executions, run detail, debugging) can be adapted into our admin for background jobs and automations.

Notable features (5–10):
- Web UI is documented as a first-class surface: https://kestra.io/docs/ui
- Executions as a first-class UI surface: https://kestra.io/docs/ui/executions
- Manual approval processes are explicitly modeled as a use case: https://kestra.io/docs/use-cases/approval-processes

Copyable workflows (2–4):
1) Operate workflows via execution history: filter → drilldown → debug  
   Evidence: https://kestra.io/docs/ui/executions
2) Human-in-the-loop gating: pause awaiting approval → continue/deny  
   Evidence: https://kestra.io/docs/use-cases/approval-processes

What we can steal:
- Easy: standardized “Executions” list + drilldown (inputs/outputs/logs/timeline).
- Medium: approval gate step type + approvals queue.
- Hard: adopting orchestration runtime + plugin ecosystem (architectural commitment).

Thin-slice (1–3 days):
- Day 1: implement run history for background jobs/automations in admin.
- Day 2: add “approval gate” step type (approve/deny + comment).
- Day 3: add run detail view (tabs: inputs/outputs/logs/timeline).

Evidence links:
- `competitors/evidence/kestra.md`

### Camunda (adjacent, Platform 7)

- Category: BPM/workflow engine + operations webapps
- Website: https://camunda.com
- What they sell: process engine with human tasks and operational monitoring.
- License posture (repo): Apache-2.0. Evidence: https://raw.githubusercontent.com/camunda/camunda-bpm-platform/master/LICENSE
- Admin/ops transfer insight: “Tasklist + Cockpit” is a canonical UX pairing: human approvals inbox + operator visibility into running processes.

Notable features (5–10):
- Tasklist webapp for human tasks: https://docs.camunda.org/manual/latest/user-guide/tasklist/
- Cockpit webapp for monitoring processes: https://docs.camunda.org/manual/latest/webapps/cockpit/

Copyable workflows (2–4):
1) Approval workflow: create human task → approve/deny → continue  
   Evidence: https://docs.camunda.org/manual/latest/user-guide/tasklist/
2) Ops workflow: inspect process instances + incidents via cockpit UI  
   Evidence: https://docs.camunda.org/manual/latest/webapps/cockpit/

What we can steal:
- Easy: “Approvals inbox” (tasklist) patterns.
- Medium: “Automation instance visibility” patterns (state + incident details).
- Hard: BPMN adoption and process modeling scope.

Thin-slice (1–3 days):
- Day 1: approvals inbox for 1–2 high-risk admin actions (refund, price change).
- Day 2: task detail view (required fields, comments, audit log entry).
- Day 3: automation instance detail view (timeline + incident reason).

Evidence links:
- `competitors/evidence/camunda.md`

---

## 7) Additional deepened set (batch 6 — embedded integrations / unified APIs / connection lifecycle)

### Apideck (adjacent)

- Category: embedded integrations / unified APIs + connection management (Vault)
- Website: https://www.apideck.com
- What they sell: unified APIs + an embedded “Vault” experience for authorizing/managing customer connections.
- Admin/ops transfer insight: “Connections” are a first-class object, with explicit states and token-handling guidance (great blueprint for our integrations layer).

Notable features (5–10):
- Vault as embedded authorization surface: https://developers.apideck.com/guides/vault
- Connection states taxonomy: https://developers.apideck.com/guides/connection-states
- Token refresh race-condition guidance (operational edge case): https://developers.apideck.com/guides/refresh-token-race-condition

Copyable workflows (2–4):
1) “Connect an app” flow: embedded portal or hosted flow → authorize → land in “connected” state  
   Evidence: https://developers.apideck.com/guides/vault  
   Evidence: https://developers.apideck.com/guides/authorize-connections
2) Operate: show state, gate actions when disconnected, and handle token refresh concurrency safely  
   Evidence: https://developers.apideck.com/guides/connection-states  
   Evidence: https://developers.apideck.com/guides/refresh-token-race-condition

What we can steal:
- Easy: “Connections” page with explicit state badges + recommended actions per state.
- Medium: embedded “connect portal” component so merchants can self-serve integrations.
- Hard: robust OAuth token lifecycle across many connectors (refresh concurrency, revocations, edge cases).

Thin-slice (1–3 days):
- Day 1: `connections` model + UI (status, provider, last sync/run, reconnect).
- Day 2: enforce connection state machine (gate automations/actions based on state).
- Day 3: implement refresh-token locking/coordination + alerting counters for failures.

Evidence links:
- `competitors/evidence/apideck.md`

### Paragon (adjacent)

- Category: embedded integrations platform (SaaS)
- Website: https://www.useparagon.com
- What they sell: embedded Connect Portal UI + monitoring/event logs + auth variants (multi-account).
- Admin/ops transfer insight: a very direct blueprint for “Integration Settings” inside our admin: portal + logs + multi-account auth.

Notable features (5–10):
- Connect Portal overview (embedded UI): https://docs.useparagon.com/connect-portal/overview
- Connect Portal embedding workflow: https://docs.useparagon.com/getting-started/displaying-the-connect-portal
- Monitoring via event logs: https://docs.useparagon.com/monitoring/event-logs
- Multi-account authorization: https://docs.useparagon.com/apis/api-reference/multi-account-authorization

Copyable workflows (2–4):
1) End-user connects an app via embedded Connect Portal (self-serve)  
   Evidence: https://docs.useparagon.com/connect-portal/overview
2) Support multiple accounts per user/tenant (e.g., multiple stores/ad accounts)  
   Evidence: https://docs.useparagon.com/apis/api-reference/multi-account-authorization

What we can steal:
- Easy: integration catalog UI (connect/reconnect/disconnect + status).
- Medium: multi-account support for select connectors + UI to pick “active account” per workflow.
- Hard: connector breadth + monitoring depth comparable to Paragon.

Thin-slice (1–3 days):
- Day 1: integration catalog + connection cards (status, last updated, connect CTA).
- Day 2: add “event log” view for integration runs (filter by integration, error taxonomy).
- Day 3: add multi-account support for one connector + UI mapping.

Evidence links:
- `competitors/evidence/paragon.md`

### Nango (adjacent)

- Category: integration auth + sync primitives (OSS-ish)
- Website: https://nango.dev
- License posture: **Elastic License 2.0 (ELv2)** (restrictive; flag). Evidence: https://raw.githubusercontent.com/NangoHQ/nango/master/LICENSE
- Admin/ops transfer insight: Nango’s “connections + sync status” API surfaces are the exact primitives an embedded integrations layer needs — but license posture may block adoption.

Notable features (5–10):
- Connections as first-class API object: https://nango.dev/docs/reference/api/connections/list
- Syncs use case (continuous sync framing): https://nango.dev/docs/guides/use-cases/syncs
- Sync status API: https://nango.dev/docs/reference/api/sync/status
- Environment separation concept: https://nango.dev/docs/guides/platform/environments

Copyable workflows (2–4):
1) Connection lifecycle via API: create/authorize connection → list connections → use in workflows  
   Evidence: https://nango.dev/docs/reference/api/connections/post  
   Evidence: https://nango.dev/docs/reference/api/connections/list
2) Operate syncs: start/trigger → observe status → remediate issues  
   Evidence: https://nango.dev/docs/reference/api/sync/start  
   Evidence: https://nango.dev/docs/reference/api/sync/status

What we can steal:
- Easy: “connections” as a shared primitive across every integration/workflow.
- Medium: sync status dashboard (lag, last success, error reason) visible to ops/merchant users.
- Hard: adopting an ELv2-licensed component in a hosted SaaS product.

Thin-slice (1–3 days):
- Day 1: `connections` object + UI (provider, status, created_at).
- Day 2: `syncs` object + status dashboard (last run, next run, lag, error).
- Day 3: environment separation (dev/staging/prod) for integration config.

Evidence links:
- `competitors/evidence/nango.md`

### Airbyte (adjacent)

- Category: connectors + connection wizard + job history (OSS, but license constrained)
- Website: https://airbyte.com
- License posture: **Elastic License 2.0 (ELv2)** (restrictive; flag). Evidence: https://raw.githubusercontent.com/airbytehq/airbyte/master/LICENSE
- Admin/ops transfer insight: Airbyte documents a clean “connection setup wizard + timeline + jobs model” — reusable UX patterns even if we can’t adopt the code due to license constraints.

Notable features (5–10):
- Step-by-step “set up a connection” workflow: https://docs.airbyte.com/platform/using-airbyte/getting-started/set-up-a-connection
- Connection timeline/history surface: https://docs.airbyte.com/platform/cloud/managing-airbyte-cloud/review-connection-timeline
- Jobs model (run types + job history): https://docs.airbyte.com/platform/understanding-airbyte/jobs

Copyable workflows (2–4):
1) Create an integration via connection wizard (source → destination → schedule)  
   Evidence: https://docs.airbyte.com/platform/using-airbyte/getting-started/set-up-a-connection
2) Operate integrations via timeline + job history  
   Evidence: https://docs.airbyte.com/platform/cloud/managing-airbyte-cloud/review-connection-timeline  
   Evidence: https://docs.airbyte.com/platform/understanding-airbyte/jobs

What we can steal:
- Easy: “set up a connection” wizard + validation steps.
- Medium: “connection timeline” audit view for each integration (state changes, errors, retries).
- Hard: adopting Airbyte directly in an embedded/hosted product given ELv2 restrictions.

Thin-slice (1–3 days):
- Day 1: build integration setup wizard for 1 connector (Shopify) + 1 destination (warehouse/webhook).
- Day 2: add connection timeline (auth events, sync runs, failures, retries).
- Day 3: standardize job types + job history UI (sync/backfill/webhook delivery).

Evidence links:
- `competitors/evidence/airbyte.md`

---

## 8) Additional deepened set (batch 7 — embedded integrations platforms)

### Codat (adjacent)

- Category: unified APIs + embedded authorization/link flow
- Website: https://codat.io
- What they sell: unified access to SMB platforms + a documented “authorization flow” with sync monitoring and webhooks.
- Admin/ops transfer insight: link flow + connections + sync monitoring is the baseline integration UX we should replicate for ecommerce admin integrations.

Notable features (5–10):
- Authorization flow docs: https://docs.codat.io/auth-flow/overview
- Embedded link authorization: https://docs.codat.io/auth-flow/authorize-embedded-link
- Connections as a first-class concept: https://docs.codat.io/core-concepts/connections
- Sync monitoring: https://docs.codat.io/commerce/learn/monitoring-a-sync
- Webhooks overview: https://docs.codat.io/using-the-api/webhooks/overview

Copyable workflows (2–4):
1) Merchant linking flow: embed link → authorize → connection created  
   Evidence: https://docs.codat.io/auth-flow/authorize-embedded-link
2) Operate: monitor syncs and rely on webhooks to update state/UI  
   Evidence: https://docs.codat.io/commerce/learn/monitoring-a-sync  
   Evidence: https://docs.codat.io/using-the-api/webhooks/overview

What we can steal:
- Easy: “Connections” table with status badges + reauth CTA.
- Medium: per-connection “sync monitor” view (last run, status, retry).
- Hard: full unified API breadth (Codat moat) — use as UX reference.

Thin-slice (1–3 days):
- Day 1: integrations catalog + connections tab.
- Day 2: sync monitor page per integration connection.
- Day 3: webhook subscription UI + event log for connection changes.

Evidence links:
- `competitors/evidence/codat.md`

### Prismatic (adjacent)

- Category: embedded integrations platform + integration marketplace
- Website: https://prismatic.io
- What they sell: embedded marketplace, integration runtime, and connection/auth management.
- Admin/ops transfer insight: “integration marketplace” + explicit connection concepts are directly transplantable as merchant-facing integrations settings.

Notable features (5–10):
- Embedded marketplace: https://prismatic.io/docs/embed/marketplace/
- Integration marketplace instances: https://prismatic.io/docs/instances/integration-marketplace/
- Connections concept: https://prismatic.io/docs/integrations/connections/
- Custom OAuth redirects: https://prismatic.io/docs/integrations/connections/oauth2/custom-redirects/
- Debugging surface: https://prismatic.io/docs/integrations/data-sources/debugging/

Copyable workflows (2–4):
1) Marketplace workflow: browse → connect → configure → run  
   Evidence: https://prismatic.io/docs/instances/integration-marketplace/
2) Embedded OAuth posture: custom redirects in multi-tenant environment  
   Evidence: https://prismatic.io/docs/integrations/connections/oauth2/custom-redirects/

What we can steal:
- Easy: integration marketplace UI patterns (cards + connect/manage).
- Medium: ownership modes for connections (org-managed vs merchant-managed) + permissions.
- Hard: full embedded integration platform breadth (runtime + connector ecosystem).

Thin-slice (1–3 days):
- Day 1: “integration marketplace” page + connect CTA + statuses.
- Day 2: connection model with ownership modes and OAuth redirect handling.
- Day 3: debugging panel (logs + last error + retry + test connection).

Evidence links:
- `competitors/evidence/prismatic.md`

### Tray.io (adjacent)

- Category: iPaaS + embedded automation/integrations
- Website: https://tray.io
- What they sell: iPaaS with explicit auth objects and embedded auth UI patterns; operational logging and log streaming patterns.
- Admin/ops transfer insight: treat credentials as shareable objects (“authentications”), and offer an embedded “auth-only” flow to connect apps without exposing full automation builder.

Notable features (5–10):
- Authentications object surface: https://docs.tray.ai/platform/connectivity/authentications
- Auth-only dialog (embedded): https://docs.tray.ai/platform/embedded/key-concepts/auth-only-dialog
- Auth slots abstraction: https://docs.tray.ai/platform/embedded/key-concepts/auth-slots
- Debug logs: https://docs.tray.ai/platform/enterprise-core/logs-debugging/debug-logs
- Log streaming: https://docs.tray.ai/platform/enterprise-core/logs-debugging/log-streaming

Copyable workflows (2–4):
1) Embedded connection setup: auth-only dialog → store authentication → reuse across workflows  
   Evidence: https://docs.tray.ai/platform/embedded/key-concepts/auth-only-dialog  
   Evidence: https://docs.tray.ai/platform/embedded/key-concepts/auth-slots
2) Operate: debug logs + external log streaming  
   Evidence: https://docs.tray.ai/platform/enterprise-core/logs-debugging/debug-logs  
   Evidence: https://docs.tray.ai/platform/enterprise-core/logs-debugging/log-streaming

What we can steal:
- Easy: “Saved connections” (authentications) UI in our admin.
- Medium: multi-account “auth slots” concept for merchants with multiple stores/accounts.
- Hard: full iPaaS runtime and connector breadth.

Thin-slice (1–3 days):
- Day 1: saved connections UI + attach to integrations.
- Day 2: add auth slots (account A/account B) in connection model.
- Day 3: add debug logs and optional log streaming export.

Evidence links:
- `competitors/evidence/tray-io.md`

### Merge.dev (adjacent)

- Category: unified APIs + linking flow + webhooks + sync status
- Website: https://www.merge.dev
- What they sell: linking flow (“Merge Link”), linked accounts, sync status, and webhooks.
- Admin/ops transfer insight: Merge’s primitives map cleanly to an ecommerce admin “Integrations” section: link → linked accounts → sync status → webhooks.

Notable features (5–10):
- Merge Link single integration flow: https://docs.merge.dev/guides/merge-link/single-integration/
- Linked accounts: https://docs.merge.dev/hris/linked-accounts/
- Sync status: https://docs.merge.dev/hris/sync-status/
- Webhooks overview: https://docs.merge.dev/basics/webhooks/overview/

Copyable workflows (2–4):
1) Merchant linking flow: link → linked account appears → manage connected accounts  
   Evidence: https://docs.merge.dev/guides/merge-link/single-integration/  
   Evidence: https://docs.merge.dev/hris/linked-accounts/
2) Operate: monitor sync status and handle events via webhooks  
   Evidence: https://docs.merge.dev/hris/sync-status/  
   Evidence: https://docs.merge.dev/basics/webhooks/overview/

What we can steal:
- Easy: make “linked accounts” a named object in admin (per merchant per integration).
- Medium: sync status panel + retry/resync UI patterns.
- Hard: full unified API breadth — use as UX reference.

Thin-slice (1–3 days):
- Day 1: linking UI (generate link token → link flow → connected account shows).
- Day 2: linked accounts table + connection status badges + disconnect.
- Day 3: sync status panel + webhook subscription UI + run logs.

Evidence links:
- `competitors/evidence/merge-dev.md`
### ConfigCat (adjacent)

- Category: feature flags
- Website: https://configcat.com
- What they sell: feature flag service with “reasonable price” + unlimited seats messaging.
- Admin/ops transfer insight: simpler, cost-conscious competitor proves demand for “flags that don’t feel enterprise”.

Notable features (5–10):
- Strong “reasonable price / unlimited seats” packaging signal
- Pricing page clearly describes “all features included; limits differ”

Copyable workflows (2–4):
1) Create flag → configure targeting → ship to environments → monitor usage
2) Team onboarding: add teammates → manage flag ownership → review changes

What we can steal:
- Easy: straightforward pricing/limits communication patterns
- Medium: simple flag UI that non-engineers can safely use
- Hard: global scale + SDK ecosystem

Evidence links:
- `competitors/evidence/configcat.md`

---

## 4) Additional deepened set (batch 3)

### Airbyte (adjacent)

- Category: ELT (oss)
- Website: https://airbyte.com
- What they sell: connector library + ELT pipelines (OSS + commercial) for moving data between systems.
- Admin/ops transfer insight: “connectors + sync status + failures” is a reusable admin pattern (and a possible accelerator for integrations).

Notable features (5–10):
- Large connector ecosystem (value = breadth)
- Sync status / failures are core UX surfaces (common in ELT tools)

Copyable workflows (2–4):
1) Choose source → choose destination → configure creds → run sync → monitor failures
2) Manage connector health → retries → alerts → audit changes

What we can steal:
- Easy: “integration setup wizard” UX patterns (steps, validation, testing)
- Medium: integration run logs + retries UI (generic pattern)
- Hard: connector ecosystem breadth + maintenance

Evidence links:
- `competitors/evidence/airbyte.md`

### Appwrite (adjacent)

- Category: backend platform (oss)
- Website: https://appwrite.io
- What they sell: backend primitives (auth, DB, storage) for developers; useful “platform admin” patterns.
- Admin/ops transfer insight: admin consoles for auth/storage/DB are a goldmine for permissions and auditability patterns.

Notable features (5–10):
- “backend primitives” suite framing
- Variant pages captured (docs/features/pricing)

Copyable workflows (2–4):
1) Create project → configure auth/DB/storage → issue API keys → ship client integration
2) Admin loop: manage users/roles → monitor usage → rotate secrets

What we can steal:
- Easy: admin console IA patterns (projects, keys, logs, quotas)
- Medium: secret/key rotation workflows + audit surfaces
- Hard: full backend platform scope

Evidence links:
- `competitors/evidence/appwrite.md`

### Firebase (adjacent)

- Category: backend platform
- Website: https://firebase.google.com
- What they sell: backend primitives (auth, db, hosting, messaging) with strong developer onboarding.
- Admin/ops transfer insight: “onboarding + console UX” is best-in-class for getting teams productive fast.

Notable features (5–10):
- Strong onboarding + console-driven setup
- Platform primitives breadth

Copyable workflows (2–4):
1) Create project → enable auth/db → integrate SDK → monitor usage
2) Admin loop: manage keys → configure rules → monitor errors

What we can steal:
- Easy: onboarding wizard + “getting started” information architecture
- Medium: configuration + rules UX patterns (guardrails)
- Hard: platform breadth + compliance surface

Evidence links:
- `competitors/evidence/firebase.md`

### Pipedream (adjacent)

- Category: workflow automation
- Website: https://pipedream.com
- What they sell: developer automation platform (workflows, triggers, integrations).
- Admin/ops transfer insight: strong “developer-friendly automation” patterns for building internal ops automations quickly.

Notable features (5–10):
- Triggers are a first-class workflow step (explicit trigger catalog): https://pipedream.com/docs/workflows/steps/triggers/
- Environment variables for config/secrets separation (config hygiene): https://pipedream.com/docs/environment-variables/
- “Trigger + steps/actions” workflow mental model: https://pipedream.com/docs/workflows/steps/triggers/

Copyable workflows (2–4):
1) Build: pick trigger → add steps/actions → test → deploy  
   Evidence: https://pipedream.com/docs/workflows/steps/triggers/
2) Operate: manage config/secrets separately from logic (rotate without editing workflow)  
   Evidence: https://pipedream.com/docs/environment-variables/

What we can steal:
- Easy: “trigger catalog” onboarding patterns + “test/preview” flows.
- Medium: variable-backed config per merchant/store (secrets + config) to avoid hardcoding.
- Hard: integration catalog breadth + event source normalization + execution scaling.

Thin-slice (1–3 days):
- Day 1: ship 3 triggers (Order created, Order refunded, Inventory low) + 3 actions (Email, Slack, Webhook).
- Day 2: add “Variables” screen (per-merchant secrets/config) and let rules reference variables.
- Day 3: add “Test run” simulation with sample payload and step outputs.

Evidence links:
- `competitors/evidence/pipedream.md`

### PocketBase (adjacent)

- Category: backend platform (oss)
- Website: https://pocketbase.io
- What they sell: lightweight backend in a single binary; rapid prototyping and small services.
- Admin/ops transfer insight: “small, low-cost primitives” align with vibe-coding and rapid integration.

Notable features (5–10):
- Lightweight “backend in a file/binary” posture
- Good fit for sidecar/prototype modules

Copyable workflows (2–4):
1) Spin up backend → define collections → add auth → build admin UI quickly
2) Deploy as sidecar → keep scope tight → integrate via HTTP

What we can steal:
- Easy: prototype patterns for fast MVPs
- Medium: sidecar architecture for isolated modules
- Hard: making it a core platform dependency (avoid)

Evidence links:
- `competitors/evidence/pocketbase.md`

### Meltano (adjacent)

- Category: ELT (oss)
- Website: https://meltano.com
- What they sell: OSS ELT framework; “pipelines as code” orientation (often developer-led).
- Admin/ops transfer insight: useful for how to represent pipeline config and run states in an admin UI.

Notable features (5–10):
- OSS ELT framework positioning

Copyable workflows (2–4):
1) Configure pipeline → run → monitor → debug failures
2) Version changes → review → deploy updates safely

What we can steal:
- Easy: pipeline status UI patterns
- Medium: “config diff + approvals” patterns
- Hard: connector ecosystem breadth

Evidence links:
- `competitors/evidence/meltano.md`

### Supabase (adjacent)

- Category: backend platform
- Website: https://supabase.com
- What they sell: backend primitives (Postgres + auth + storage) with strong dashboard UX.
- Admin/ops transfer insight: dashboard UX patterns for auth/storage/DB management are directly reusable.

Notable features (5–10):
- Strong dashboard UX + developer onboarding
- Platform primitives breadth

Copyable workflows (2–4):
1) Create project → configure auth/DB/storage → ship integration → monitor usage
2) Admin loop: rotate keys → manage policies → audit changes

What we can steal:
- Easy: dashboard information architecture + onboarding
- Medium: policy/rules UX patterns and safe defaults
- Hard: full platform parity scope

Evidence links:
- `competitors/evidence/supabase.md`

### Zapier (adjacent)

- Category: workflow automation
- Website: https://zapier.com
- What they sell: automation platform; massive connector breadth + non-technical UX.
- Admin/ops transfer insight: “non-technical automation builder” is a best-in-class UX target.

Notable features (5–10):
- Trigger → actions mental model (“a Zap”): https://help.zapier.com/hc/en-us/articles/8496223930381-What-is-a-Zap
- Multi-step Zaps (multiple actions in a workflow): https://help.zapier.com/hc/en-us/articles/8496309473421-Use-multi-step-Zaps
- Human-in-the-loop approvals (“Approval by Zapier”): https://help.zapier.com/hc/en-us/articles/8496354423693-Get-started-with-Approval-by-Zapier

Copyable workflows (2–4):
1) Build: pick trigger → pick action(s) → test → enable  
   Evidence: https://help.zapier.com/hc/en-us/articles/8496223930381-What-is-a-Zap  
   Evidence: https://help.zapier.com/hc/en-us/articles/8496309473421-Use-multi-step-Zaps
2) Operate: run history (status/errors) → inspect → fix  
   Evidence: https://help.zapier.com/hc/en-us/articles/8496257531797-View-your-Zap-history

What we can steal:
- Easy: approachable automation setup UX (language, defaults, validation)
- Medium: approvals as a step type for high-risk admin actions (refunds/fulfillment holds/price changes).
- Hard: connector breadth + consistent auth + reliable retries at scale.

Thin-slice (1–3 days):
- Day 1: “Automation Rules” page with fixed triggers/actions + “Test” and “Enable” flow.
- Day 1: “Run history” list (status, timestamp, payload preview) inspired by Zap history.
- Day 2: add `IF` guardrails (one condition per rule) inspired by Filters: https://help.zapier.com/hc/en-us/articles/8496223368085-Use-filters-in-Zaps
- Day 3: add “Approval required” toggle that inserts an approval step before executing sensitive actions.

Evidence links:
- `competitors/evidence/zapier.md`

### Webflow (adjacent)

- Category: site builder
- Website: https://webflow.com
- What they sell: visual site builder + CMS patterns; strong publishing workflows.
- Admin/ops transfer insight: publishing workflows (draft/preview/publish) and permissioned changes are broadly reusable.

Notable features (5–10):
- Strong publishing lifecycle UX patterns

Copyable workflows (2–4):
1) Design/edit → preview → publish → monitor → iterate
2) Collaboration: roles → approvals → change management

What we can steal:
- Easy: draft/preview/publish UI state machine patterns
- Medium: approvals + collaboration patterns
- Hard: full visual builder scope

Evidence links:
- `competitors/evidence/webflow.md`

### Contentful (adjacent)

- Category: headless CMS
- Website: https://www.contentful.com
- What they sell: enterprise headless CMS (content ops) with rich workflow patterns.
- Admin/ops transfer insight: content modeling + workflows are templates for any “admin-managed objects” system.

Notable features (5–10):
- Enterprise content ops framing (models + workflows)

Copyable workflows (2–4):
1) Define content model → create entries → review → publish
2) Manage roles/permissions → maintain quality and governance

What we can steal:
- Easy: content modeling UX patterns (fields, validations, previews)
- Medium: editorial workflow stages + roles
- Hard: enterprise-scale content ops suite

Evidence links:
- `competitors/evidence/contentful.md`

---

## 5) Additional deepened set (batch 4)

### Sanity (adjacent)

- Category: headless CMS
- Website: https://www.sanity.io
- What they sell: content platform with strong editorial workflows and schema-driven content modeling.
- Admin/ops transfer insight: schema-driven “types + validations + previews” is reusable for any admin-managed object system.

Notable features (5–10):
- Content modeling + workflows emphasis
- Variant pages captured (pricing/docs/features)

Copyable workflows (2–4):
1) Define schema → create content → review → publish → iterate
2) Manage roles/permissions → enforce governance → audit changes

What we can steal:
- Easy: content modeling UX patterns (fields, validations, previews)
- Medium: workflow stages + review/approval patterns
- Hard: full editorial suite + collaboration depth

Evidence links:
- `competitors/evidence/sanity.md`

### Prismic (adjacent)

- Category: headless CMS
- Website: https://prismic.io
- What they sell: headless CMS + page/content workflows; good editorial UX patterns.

Notable features (5–10):
- Editorial workflow emphasis
- Variant pages captured (pricing/docs/features)

Copyable workflows (2–4):
1) Create content → preview → publish → measure → iterate
2) Model content types → reuse components/slices → keep consistency

What we can steal:
- Easy: preview/publish flows and “slice/component” pattern mental model
- Medium: content modeling UX for non-technical users
- Hard: full content platform ecosystem

Evidence links:
- `competitors/evidence/prismic.md`

### Storyblok (adjacent)

- Category: headless CMS
- Website: https://www.storyblok.com
- What they sell: visual + headless content workflows; collaboration patterns.

Notable features (5–10):
- Visual editing + structured content positioning
- Variant pages captured (pricing/docs/features)

Copyable workflows (2–4):
1) Build content blocks → compose pages → preview → publish
2) Collaborate: roles → approvals → publish governance

What we can steal:
- Easy: block-based content authoring UI patterns
- Medium: collaboration/approval flows for admin changes
- Hard: visual editor depth

Evidence links:
- `competitors/evidence/storyblok.md`

### Builder.io (adjacent)

- Category: page builder
- Website: https://www.builder.io
- What they sell: visual page building + composable content; useful for “non-dev editing” UX patterns.

Notable features (5–10):
- Visual editing + page building positioning
- Variant pages captured (pricing/docs/features)

Copyable workflows (2–4):
1) Compose page visually → preview → publish → iterate
2) Manage components/blocks → reuse patterns → govern changes

What we can steal:
- Easy: visual editor patterns (component library, drag/drop, previews)
- Medium: approval + versioning patterns for changes
- Hard: full visual builder engine

Evidence links:
- `competitors/evidence/builder-io.md`

### Temporal (adjacent)

- Category: workflow engine (oss)
- Website: https://temporal.io
- What they sell: durable workflow execution engine (developer-led; heavier integration).
- Admin/ops transfer insight: durable workflows are the “hard mode” automation primitive; even if we don’t adopt, the concepts help.

Notable features (5–10):
- Workflows as durable executions (first-class “Workflow” concept): https://docs.temporal.io/workflows
- Visibility as a first-class product area (observable/queryable runs): https://docs.temporal.io/visibility
- Retry policies as a first-class reliability primitive: https://docs.temporal.io/retry-policies

Copyable workflows (2–4):
1) Reliable job orchestration: define workflow → run → observe state → recover with retries  
   Evidence: https://docs.temporal.io/workflows  
   Evidence: https://docs.temporal.io/retry-policies
2) Operate: search/inspect workflow runs (visibility), debug incidents  
   Evidence: https://docs.temporal.io/visibility

What we can steal:
- Easy: model “workflow/job runs” with explicit states and a visibility/search UI.
- Medium: reusable policy objects (retry policy, timeout policy) attached to automations/jobs.
- Hard: adopt a full workflow engine (operational overhead + deep integration).

Thin-slice (1–3 days):
- Day 1: define a `job_runs` model with explicit states and searchable run history (visibility).
- Day 2: implement retry policy object (attempts, backoff) attachable to automations.
- Day 3: add “re-run with same inputs” for failed jobs + incident-friendly run detail view.

Evidence links:
- `competitors/evidence/temporal.md`

### Umami (adjacent)

- Category: web analytics (oss)
- Website: https://umami.is
- What they sell: OSS analytics with self-host posture; useful low-cost analytics patterns.

Notable features (5–10):
- OSS + self-host analytics framing
- Variant pages captured (docs/features/pricing)

Copyable workflows (2–4):
1) Install → capture events → dashboards → iterate
2) Configure privacy-friendly tracking defaults → audit data handling

What we can steal:
- Easy: minimal analytics dashboard patterns
- Medium: privacy-first settings UX patterns
- Hard: full analytics pipeline breadth

Evidence links:
- `competitors/evidence/umami.md`

### dbt (adjacent)

- Category: analytics engineering
- Website: https://www.getdbt.com
- What they sell: transformation framework (workflow + governance patterns for data).
- Admin/ops transfer insight: “models, runs, tests, artifacts” is a reusable pattern for any pipeline execution UI.

Notable features (5–10):
- Run/test/validate mental model
- Variant pages captured (pricing/docs/features)

Copyable workflows (2–4):
1) Define models → run transforms → test → publish artifacts → iterate
2) Monitor runs → debug failures → enforce standards

What we can steal:
- Easy: pipeline run status and artifact browsing UX patterns
- Medium: change review + approvals patterns
- Hard: full data stack ownership

Evidence links:
- `competitors/evidence/dbt.md`

### Convert.com (adjacent)

- Category: experimentation
- Website: https://www.convert.com
- What they sell: A/B testing/experimentation platform; good baseline optimization loop patterns.

Notable features (5–10):
- Experimentation workflow positioning
- Variant pages captured (pricing/docs/features)

Copyable workflows (2–4):
1) Define hypothesis → create variants → run test → analyze results → ship winner
2) Manage experiment library → reuse learnings → increase iteration velocity

What we can steal:
- Easy: experiment setup + results UI patterns
- Medium: reporting + guardrails for tests
- Hard: full stats engine + personalization depth

Evidence links:
- `competitors/evidence/convert-com.md`

### Make (Integromat) (adjacent)

- Category: workflow automation
- Website: https://www.make.com
- What they sell: automation workflows (visual builder); strong “scenario” mental model patterns.

Notable features (5–10):
- Visual automation builder patterns
- Variant pages captured (pricing/docs/features)

Copyable workflows (2–4):
1) Choose trigger → build scenario → test → schedule/enable → monitor runs
2) Error handling: retries → alerts → run history review

What we can steal:
- Easy: visual automation builder UX patterns (nodes/steps, testing)
- Medium: templates/gallery patterns for common automations
- Hard: connector breadth + reliability

Evidence links:
- `competitors/evidence/make-integromat.md`

### Split.io (adjacent)

- Category: feature flags
- Website: https://www.split.io
- What they sell: feature management + experimentation; currently under Harness branding in snapshots.

Notable features (5–10):
- Feature management platform positioning
- Pricing under Harness + product surfaces captured

Copyable workflows (2–4):
1) Create flag → target segment → gradual rollout → monitor → rollback
2) Attach metrics → run experiment → decide winner → promote

What we can steal:
- Easy: rollout UI patterns (segments, envs, percentage)
- Medium: per-tenant flags + auditability in our admin
- Hard: enterprise suite breadth

Evidence links:
- `competitors/evidence/split-io.md`
