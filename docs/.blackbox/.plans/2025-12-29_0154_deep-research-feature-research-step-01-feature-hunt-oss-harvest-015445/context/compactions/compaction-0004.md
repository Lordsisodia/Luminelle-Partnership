---
compaction: 0004
created_at: "2025-12-30 17:37"
range: "0029-0038"
max_bytes: 1048576
per_step_budget_bytes: 98304
---

# Compaction 0004 (0029–0038)

## ✅ Summary (fill this after compaction)

- <3–7 bullets capturing the durable takeaways>

## 🧩 Patterns / heuristics (fill this after compaction)

- Prompt improvements:
- Checklist improvements:
- Better stop conditions:

## Steps compacted (trimmed)

### 0029_checkpoint-cycle-26-b2b-subscription-ops-feature-universe-evidence.md

---
step: 0029
created_at: "2025-12-29 22:20"
title: "Checkpoint: Cycle 26 — B2B subscription ops feature universe + evidence"
---

# Step 0029: Checkpoint: Cycle 26 — B2B subscription ops feature universe + evidence

## ✅ What I did (facts)

- Added Tranche #26 “B2B subscription ops” in `artifacts/features-catalog.md` with 15 feature bullets covering accounts, hierarchy, seats/entitlements, quotes, invoices, approvals, and bulk contract updates.
- Added evidence IDs S187–S193 in `artifacts/sources.md` (Chargebee: account hierarchy/quotes/invoices/advance invoices/entitlements; Recurly: accounts/invoices).
- Added OSS pointers for B2B billing patterns and governance primitives in `artifacts/oss-catalog.md` (Invoice Ninja, Kill Bill, ERPNext, OpenFGA, OPA) as pointers only for Step-04 follow-up.
- Updated required logs: `artifacts/search-log.md`, `artifacts/summary.md`, `artifacts/prompt-log.md`, `artifacts/skills-log.md`, and `artifacts/output-index.md`.

## 🧠 What I learned (new information)

- B2B subscription ops is driven by procurement artifacts: quote→invoice flows and billing contacts are as critical as subscription lifecycle.
- Account hierarchy is a first-class concept for consolidated billing and enterprise org structures, not an edge case. (S187)
- Entitlements/feature management is the clean bridge between billing (seats/plans) and product enforcement (limits/features). (S193)

## 🧭 What changes because of this

- The thin-slice roadmap for B2B should start with account + invoice primitives and only then deepen into complex payment terms/automation.
- Seat-based pricing should be implemented with clear audit trails (seat roster history) to prevent invoicing disputes.

## ➡️ Next step

- Run tranche on “Promotions measurement” (ROI, cohorts, LTV impact) or “Warehouse picking exceptions” depending on priority.

## 🔗 Links / references

- `artifacts/features-catalog.md` — Tranche #26 B2B subscription ops additions.
- `artifacts/sources.md` — S187–S193 (new B2B subscription ops evidence).
- Chargebee account hierarchy: https://www.chargebee.com/docs/billing/2.0/customers/account-hierarchy
- Chargebee quotes: https://www.chargebee.com/docs/billing/2.0/invoices-credit-notes-and-quotes/quotes
- Recurly invoices: https://docs.recurly.com/recurly-subscriptions/docs/invoices

---

### 0030_checkpoint-cycle-27-promotions-measurement-feature-universe-evidence.md

---
step: 0030
created_at: "2025-12-29 22:29"
title: "Checkpoint: Cycle 27 — Promotions measurement feature universe + evidence"
---

# Step 0030: Checkpoint: Cycle 27 — Promotions measurement feature universe + evidence

## ✅ What I did (facts)

- Added Tranche #27 “Promotions measurement” in `artifacts/features-catalog.md` with 15 feature bullets covering event taxonomy, ROI dashboards, cohorts/LTV, holdouts, stacking overlap, abuse monitoring, metric registry, and data quality checks.
- Added evidence IDs S194–S199 in `artifacts/sources.md` (GA4 events reference, GrowthBook OSS, Cube semantic layer, dbt transformations, PostHog insights/cohorts, Snowplow event pipeline framing).
- Added OSS pointers for promotions measurement in `artifacts/oss-catalog.md` (GrowthBook, PostHog, Cube, dbt-core, Superset) as pointers only for Step-04 follow-up.
- Updated required logs: `artifacts/search-log.md`, `artifacts/summary.md`, `artifacts/prompt-log.md`, `artifacts/skills-log.md`, and `artifacts/output-index.md`.

## 🧠 What I learned (new information)

- Reliable promotions measurement starts with instrumentation and definitions: without a stable event taxonomy and metric formulas, “ROI” becomes inconsistent across teams. (S194, S196)
- Incremental lift requires a counterfactual (holdout/control) even for “simple” promos; experiment tooling patterns map well to promotions. (S195)
- Cohort measurement is the clean way to connect promos to longer-term retention/LTV impact. (S198)

## 🧭 What changes because of this

- Thin-slice roadmap should begin with redemption KPIs + discount spend + new/returning breakdown and a simple holdout flag, before adding complex attribution models.
- Metric governance (registry + versioning) should ship early to prevent drift as dashboards proliferate.

## ➡️ Next step

- Run tranche on “Warehouse picking exceptions” (short picks, mispicks, QA checks) or “Backoffice finance ops” (refunds, chargebacks, payouts).

## 🔗 Links / references

- `artifacts/features-catalog.md` — Tranche #27 promotions measurement additions.
- `artifacts/sources.md` — S194–S199 (new measurement evidence sources).
- GA4 events reference: https://developers.google.com/analytics/devguides/collection/ga4/reference/events
- GrowthBook OSS: https://github.com/growthbook/growthbook
- PostHog insights/cohorts: https://posthog.com/docs/product-analytics/insights

---

### 0031_checkpoint-cycle-28-build-vs-integrate-rubric-returns-rma-classification.md

---
step: 0031
created_at: "2025-12-30 17:08"
title: "Checkpoint: Cycle 28 — Build vs integrate rubric + Returns/RMA classification"
---

# Step 0031: Checkpoint: Cycle 28 — Build vs integrate rubric + Returns/RMA classification

## ✅ What I did (facts)

- Created `artifacts/build-vs-integrate-agent.md` with a decision rubric for choosing Shopify API vs 3P API vs OSS vs custom build.
- Created `artifacts/build-vs-integrate-matrix.md` and populated the first tranche (Returns/RMA) with concrete “best leverage” recommendations and thin slices.
- Added Shopify Admin GraphQL primitives to evidence: `refundCreate`, `giftCardCreate`, and `Return/returnCreate` as S200–S202 in `artifacts/sources.md`.
- Updated required logs for this cycle: `artifacts/search-log.md`, `artifacts/summary.md`, `artifacts/prompt-log.md`, `artifacts/output-index.md`, `artifacts/skills-log.md`.

## 🧠 What I learned (new information)

- Shopify exposes **returns as first-class primitives** (Return object + `returnCreate`), so return initiation can be executed directly against Shopify rather than only tracked in an external system. (S202)
- Refund execution can be treated as a Shopify source-of-truth mutation (`refundCreate`), making it safer to avoid “shadow refund” state. (S200)
- Store credit can be implemented as a Shopify primitive using gift cards (`giftCardCreate`) while keeping “bonus/eligibility” logic in our app. (S201)

## 🧭 What changes because of this

- For Returns/RMA, the “product” should be positioned as **ops UX + policy + analytics**, not as a separate commerce backend: Shopify remains truth for Return/Refund/GiftCard.
- “Label + scan events” remain best handled via 3P carrier/tracking APIs; our app should store a derived timeline and tasks driven by webhook events. (S16, S18, S179, S182)

## ➡️ Next step

- Apply the same matrix classification to Tranche #2 Shipping exceptions (decide Shopify vs tracking 3P APIs vs custom ops inbox).

## 🔗 Links / references

- `artifacts/build-vs-integrate-agent.md` — rubric.
- `artifacts/build-vs-integrate-matrix.md` — Returns/RMA tranche classification.
- `artifacts/sources.md` — S200–S202 (Shopify Admin API primitives used for decisions).

---

### 0032_checkpoint-cycle-29-shipping-exceptions-build-vs-integrate-classification.md

---
step: 0032
created_at: "2025-12-30 17:13"
title: "Checkpoint: Cycle 29 — Shipping exceptions build vs integrate classification"
---

# Step 0032: Checkpoint: Cycle 29 — Shipping exceptions build vs integrate classification

## ✅ What I did (facts)

- Extended `artifacts/build-vs-integrate-matrix.md` with a full “Tranche #2 — Shipping / Delivery exceptions” section (classification rows + thin slices + evidence).
- Added Shopify Admin GraphQL evidence for fulfillment and webhook primitives (S203–S209) so the tranche decisions rely on stable `shopify.dev` docs rather than blocked help pages.
- Updated required logs for this cycle: `artifacts/agent-plan.md`, `artifacts/search-log.md`, `artifacts/summary.md`, `artifacts/prompt-log.md`, `artifacts/output-index.md`, `artifacts/skills-log.md`, and `context/context.md`.

## 🧠 What I learned (new information)

- Shopify Admin GraphQL exposes fulfillments, fulfillment orders, and fulfillment holds as primitives; holds can be placed/released via mutations. (S203–S205, S207–S209)
- Webhook subscription management primitives exist in Shopify Admin API, enabling “integration admin” pages that list subscriptions without depending on Shopify Help. (S206)
- Carrier scan event coverage and exception status modeling still maps better to tracking providers’ webhooks and enums (AfterShip/Shippo/ShipEngine/EasyPost patterns). (S14, S18, S182, S185)

## 🧭 What changes because of this

- Shipping exceptions should be built as a **derived-state system**: ingest scan events → compute canonical status + scan-gap → drive exception inbox/playbooks/comms.
- Shopify stays the source-of-truth for fulfillment state, tracking numbers, and holds; avoid duplicating those primitives in our database.

## ➡️ Next step

- Apply the same classification to Tranche #5 Analytics & QA (decide: Shopify webhooks → our DB vs OSS analytics stack vs 3P tools).

## 🔗 Links / references

- `artifacts/build-vs-integrate-matrix.md` — Tranche #2 classification.
- `artifacts/sources.md` — S203–S209 (Shopify fulfillment + webhook + holds primitives).

---

### 0033_checkpoint-cycle-30-analytics-qa-build-vs-integrate-classification.md

---
step: 0033
created_at: "2025-12-30 17:17"
title: "Checkpoint: Cycle 30 — Analytics & QA build vs integrate classification"
---

# Step 0033: Checkpoint: Cycle 30 — Analytics & QA build vs integrate classification

## ✅ What I did (facts)

- Extended `artifacts/build-vs-integrate-matrix.md` with “Tranche #5 — Analytics & QA” (classification rows, storage boundaries, thin slices, and evidence).
- Added Shopify Admin GraphQL primitives for analytics ingestion (orders query/count + bulk exports) as evidence IDs S210–S211 in `artifacts/sources.md`.
- Updated required logs: `artifacts/agent-plan.md`, `artifacts/search-log.md`, `artifacts/summary.md`, `artifacts/skills-log.md`, `artifacts/output-index.md`, `artifacts/prompt-log.md`, and `context/context.md`.

## 🧠 What I learned (new information)

- For analytics, Shopify Admin API should be used primarily as **an ingestion source** (webhooks + bulk exports), not as a live reporting backend for dashboards. (S211)
- A durable analytics system needs metric governance (definitions + versioning) to prevent drift as dashboards proliferate. (S196, S197)
- QA workflows (rubrics, sampling, coaching) are domain UX and should remain custom even if we use OSS for reporting plumbing. (S41)

## 🧭 What changes because of this

- Analytics features should default to “upstream truth → warehouse → derived tables → dashboards” with explicit boundaries:
  - Upstream truth: Shopify orders/fulfillments; support tool tickets/CSAT.
  - Derived truth: our metric tables, joins, and scorecards.
- OSS should be considered for semantic layer/ETL/BI acceleration, not as the core QA program implementation.

## ➡️ Next step

- Apply the same classification to Tranche #8 Security & compliance (RBAC/audit/SSO) to decide OSS vs custom vs platform APIs.

## 🔗 Links / references

- `artifacts/build-vs-integrate-matrix.md` — Tranche #5 classification.
- `artifacts/sources.md` — S210–S211 (Shopify analytics ingestion primitives).

---

### 0034_checkpoint-cycle-31-security-compliance-build-vs-integrate-classification.md

---
step: 0034
created_at: "2025-12-30 17:21"
title: "Checkpoint: Cycle 31 — Security & compliance build vs integrate classification"
---

# Step 0034: Checkpoint: Cycle 31 — Security & compliance build vs integrate classification

## ✅ What I did (facts)

- Extended `artifacts/build-vs-integrate-matrix.md` with “Tranche #8 — Security & compliance” (RBAC/authz, SSO/MFA, audit log, approvals, keys, webhook security, retention, posture).
- Added stable Shopify Admin GraphQL evidence IDs S212–S214 (staff listing, access scopes introspection, events feed) to support “integration posture” and activity feed inputs without relying on blocked Shopify Help pages.
- Updated required logs for this cycle: `artifacts/agent-plan.md`, `artifacts/search-log.md`, `artifacts/summary.md`, `artifacts/skills-log.md`, `artifacts/output-index.md`, `artifacts/prompt-log.md`, and `context/context.md`.

## 🧠 What I learned (new information)

- Security is best decomposed into: (1) identity (SSO/MFA/session lifecycle), (2) authorization (policy/relationship checks), and (3) governance surfaces (audit, approvals, posture).
- Shopify can contribute useful inputs (staff list, app scopes, events feed), but it is not a replacement for our own multi-tenant RBAC and audit logging.

## 🧭 What changes because of this

- Default stance becomes: use an IdP (hosted or OSS) + OSS authz engine, and focus custom build on the admin UX and safe operations (approvals + audit + posture).
- Shopify primitives are treated as “context signals” for integration security posture rather than the core access model.

## ➡️ Next step

- Apply the build-vs-integrate rubric to Tranche #23 Subscription ops or Tranche #17 Observability (both are high leverage for implementation planning).

## 🔗 Links / references

- `artifacts/build-vs-integrate-matrix.md` — Tranche #8 classification.
- `artifacts/sources.md` — S212–S214 (Shopify staff/scopes/events primitives used as evidence).

---

### 0035_checkpoint-cycle-32-observability-build-vs-integrate-classification.md

---
step: 0035
created_at: "2025-12-30 17:25"
title: "Checkpoint: Cycle 32 — Observability build vs integrate classification"
---

# Step 0035: Checkpoint: Cycle 32 — Observability build vs integrate classification

## ✅ What I did (facts)

- Extended `artifacts/build-vs-integrate-matrix.md` with “Tranche #17 — Observability” and classified each sub-feature into OSS/hosted backends vs minimal custom “ops playbook” surfaces.
- Added stable evidence IDs S215–S220 (OpenTelemetry Collector + overview + metrics spec; Prometheus; Grafana; Sentry) in `artifacts/sources.md` to ground the observability stack decisions.
- Updated required logs for this cycle: `artifacts/agent-plan.md`, `artifacts/search-log.md`, `artifacts/summary.md`, `artifacts/skills-log.md`, `artifacts/output-index.md`, `artifacts/prompt-log.md`, and `context/context.md`.

## 🧠 What I learned (new information)

- Observability is almost entirely horizontal infra; the fastest path is to standardize on OpenTelemetry for instrumentation and then pick OSS/hosted backends for storage + UI.
- The “product value” lives in linking operational runbooks, saved queries, and integration-specific health views to those standard backends.

## 🧭 What changes because of this

- Default stance becomes: adopt OSS/hosted observability stacks (OTel + Prometheus/Grafana + error tracking) and avoid building bespoke logging/tracing UIs.
- Implement only lightweight internal surfaces that connect incidents/alerts to playbooks and integration debugging (webhooks/retries).

## ➡️ Next step

- Apply the same build-vs-integrate rubric to Tranche #23 Subscription ops (billing retries/dunning/schedules) or Tranche #15 Approvals & tasks (workflow/task engine leverage).

## 🔗 Links / references

- `artifacts/build-vs-integrate-matrix.md` — Tranche #17 classification.
- `artifacts/sources.md` — S215–S220 (observability primitives).

---

### 0036_checkpoint-cycle-33-subscription-ops-build-vs-integrate-classification.md

---
step: 0036
created_at: "2025-12-30 17:29"
title: "Checkpoint: Cycle 33 — Subscription ops build vs integrate classification"
---

# Step 0036: Checkpoint: Cycle 33 — Subscription ops build vs integrate classification

## ✅ What I did (facts)

- Extended `artifacts/build-vs-integrate-matrix.md` with “Tranche #23 — Subscription ops” and classified portal actions, billing recovery, and batch ops into Shopify subscription primitives vs custom UX/policy logic.
- Added stable Shopify subscription evidence IDs S221–S228 (SubscriptionContract, drafts, billing attempts, subscription apps docs) in `artifacts/sources.md`.
- Updated required logs for this cycle: `artifacts/agent-plan.md`, `artifacts/search-log.md`, `artifacts/summary.md`, `artifacts/skills-log.md`, `artifacts/output-index.md`, `artifacts/prompt-log.md`, and `context/context.md`.

## 🧠 What I learned (new information)

- Shopify exposes subscription contracts, staged draft changes, and billing attempts as first-class primitives, enabling a “custom portal UX” that still writes to Shopify as source-of-truth. (S221, S227, S225)
- The ops “hard parts” are cutoffs, scheduling/retry policy, and auditability — these should be built as policy + workflows around upstream contract primitives, not as a parallel subscription system. (S223, S65)

## 🧭 What changes because of this

- Subscription portal features should default to “Shopify contract truth + custom UX” and treat other subscription providers as the truth only when the merchant’s subscription program is run by that provider.
- For dunning/retries, we can keep policy and timers in our system (optional OSS scheduler), while using Shopify billing attempt feeds as the operational signal for queues. (S226, S55)

## ➡️ Next step

- Apply the rubric to Tranche #15 Approvals & tasks or Tranche #24 Returns analytics + fraud gating.

## 🔗 Links / references

- `artifacts/build-vs-integrate-matrix.md` — Tranche #23 classification.
- `artifacts/sources.md` — S221–S228 (Shopify subscription primitives and apps docs).

---

### 0037_checkpoint-cycle-34-approvals-tasks-build-vs-integrate-classification.md

---
step: 0037
created_at: "2025-12-30 17:33"
title: "Checkpoint: Cycle 34 — Approvals & tasks build vs integrate classification"
---

# Step 0037: Checkpoint: Cycle 34 — Approvals & tasks build vs integrate classification

## ✅ What I did (facts)

- Extended `artifacts/build-vs-integrate-matrix.md` with “Tranche #15 — Approvals & tasks” and classified tasks/approvals UX vs background reliability primitives.
- Added evidence IDs S229–S230 (BullMQ + Quartz scheduler docs) in `artifacts/sources.md` to ground the “use OSS queues/schedulers” decision.
- Updated required logs for this cycle: `artifacts/agent-plan.md`, `artifacts/search-log.md`, `artifacts/summary.md`, `artifacts/skills-log.md`, `artifacts/output-index.md`, `artifacts/prompt-log.md`, and `context/context.md`.

## 🧠 What I learned (new information)

- Approvals/tasks are best split into: (1) domain UX + auditability (custom build) and (2) time-based reliability (queues/schedulers for reminders, retries, escalations).
- OSS job queues/schedulers provide first-class primitives for delayed jobs and retries that map directly to reminders/escalations without rebuilding infrastructure.

## 🧭 What changes because of this

- Default stance becomes: build the task and approval UIs + data model; use OSS queues/schedulers for timers/retries; use 3P comms delivery for notifications where needed.
- This reduces risk of “lost reminders” and simplifies future automation features (workflows) by reusing the same queue foundation.

## ➡️ Next step

- Apply the rubric to Tranche #18 Admin IA (navigation/search/saved views) or Tranche #24 Returns analytics + fraud gating (policy + risk).

## 🔗 Links / references

- `artifacts/build-vs-integrate-matrix.md` — Tranche #15 classification.
- `artifacts/sources.md` — S229–S230 (queues/schedulers evidence).

---

### 0038_checkpoint-cycle-35-returns-fraud-gating-build-vs-integrate-classification.md

---
step: 0038
created_at: "2025-12-30 17:37"
title: "Checkpoint: Cycle 35 — Returns fraud gating build vs integrate classification"
---

# Step 0038: Checkpoint: Cycle 35 — Returns fraud gating build vs integrate classification

## ✅ What I did (facts)

- <fill>

## 🧠 What I learned (new information)

- <fill>

## 🧭 What changes because of this

- <fill>

## ➡️ Next step

- <fill>

## 🔗 Links / references

- <fill>

---

## Cleanup notes

- Step files compacted: 10 (and removed from steps/)
- Compaction file is capped at ~1048576 bytes (configurable via BLACKBOX_CONTEXT_MAX_BYTES).
