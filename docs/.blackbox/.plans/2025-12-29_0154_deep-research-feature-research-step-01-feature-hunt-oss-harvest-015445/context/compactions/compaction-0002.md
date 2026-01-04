---
compaction: 0002
created_at: "2025-12-29 21:05"
range: "0010-0019"
max_bytes: 1048576
per_step_budget_bytes: 98304
---

# Compaction 0002 (0010–0019)

## ✅ Summary (fill this after compaction)

- <3–7 bullets capturing the durable takeaways>

## 🧩 Patterns / heuristics (fill this after compaction)

- Prompt improvements:
- Checklist improvements:
- Better stop conditions:

## Steps compacted (trimmed)

### 0010_checkpoint-cycle-8-inventory-forecasting-replenishment-feature-universe-evidence.md

---
step: 0010
created_at: "2025-12-29 22:10"
title: "Checkpoint: Cycle 8 — Inventory forecasting/replenishment feature universe + evidence"
---

# Step 0010: Checkpoint: Cycle 8 — Inventory forecasting/replenishment feature universe + evidence

## ✅ What I did (facts)

- Updated `artifacts/agent-plan.md` to Cycle 8 and selected theme “Inventory forecasting + replenishment”.
- Added tranche #9 replenishment/forecasting feature cluster (PO lifecycle, reorder rules, suggestions, inbound visibility, vendor settings, transfer-vs-buy, forecasting POC) with workflows + 1–3 day thin slices in `artifacts/features-catalog.md`.
- Added evidence IDs S66–S70 (Shopify Stocky POs/replenishment, Odoo reordering rules, ERPNext reorder levels, AWS Forecast overview) in `artifacts/sources.md`.
- Added OSS pointers for replenishment and forecasting (ERPNext, Odoo, InvenTree, Prophet, Darts, Statsmodels) in `artifacts/oss-catalog.md` and flagged licenses for Step-04.
- Appended reproducible queries in `artifacts/search-log.md`.
- Appended durable tranche insights + fastest thin slices to `artifacts/summary.md`.
- Logged cycle changes in `artifacts/output-index.md`, `artifacts/skills-log.md`, and appended the autopilot prompt in `artifacts/prompt-log.md`.
- Updated rolling context in `context/context.md` to reflect tranche #9 progress.

## 🧠 What I learned (new information)

- Replenishment automation is rules-first (min/max, reorder levels, lead times) and can ship without ML forecasting.
- Forecasting is best introduced as advisory reporting (top SKUs forecast report) before driving automatic reorder quantities. (S70)
- ERP suites provide mature procurement patterns that can inform edge cases (partial receiving, discrepancies, multi-vendor constraints). (S68, S69)

## 🧭 What changes because of this

- We can build a thin “replenishment cockpit” from existing inventory + transfer primitives: reorder rule table → suggestion list → create draft PO → receive.
- Forecasting should be optional and gated until data quality and inventory events are stable.
- OSS libraries can accelerate forecasting experimentation; Step-04 should validate licenses and operational fit.

## ➡️ Next step

- Run tranche on “Pricing & billing admin” (plans, invoices, prorations, tax IDs) to cover the revenue/admin back office surface.

## 🔗 Links / references

- Features: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-01-feature-hunt-oss-harvest-015445/artifacts/features-catalog.md`
- Sources: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-01-feature-hunt-oss-harvest-015445/artifacts/sources.md`
- Search log: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-01-feature-hunt-oss-harvest-015445/artifacts/search-log.md`
- OSS pointers: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-01-feature-hunt-oss-harvest-015445/artifacts/oss-catalog.md`
- Summary: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-01-feature-hunt-oss-harvest-015445/artifacts/summary.md`

---

### 0011_checkpoint-cycle-9-pricing-billing-admin-feature-universe-evidence.md

---
step: 0011
created_at: "2025-12-29 22:32"
title: "Checkpoint: Cycle 9 — Pricing & billing admin feature universe + evidence"
---

# Step 0011: Checkpoint: Cycle 9 — Pricing & billing admin feature universe + evidence

## ✅ What I did (facts)

- Updated `artifacts/agent-plan.md` to Cycle 9 and selected theme “Pricing & billing admin”.
- Added tranche #10 pricing/billing feature cluster (plans/catalog, subscriptions, proration preview, invoices, taxes/tax IDs, dunning, billing portal, refunds/credits) with workflows + 1–3 day thin slices in `artifacts/features-catalog.md`.
- Added evidence IDs S71–S74 for Stripe billing surfaces (billing overview, invoices, prorations, tax IDs) in `artifacts/sources.md` and added vendor references for MoR/subscription platforms (Paddle, Chargebee) as broader evidence (S75–S76).
- Added OSS pointers for billing patterns/testing (Kill Bill, Stripe CLI, stripe-mock, Lago, Svix) in `artifacts/oss-catalog.md` and flagged licenses for Step-04.
- Appended reproducible queries to `artifacts/search-log.md`.
- Appended durable tranche insights + fastest thin slices to `artifacts/summary.md`.
- Logged cycle changes in `artifacts/output-index.md`, `artifacts/skills-log.md`, and appended the autopilot prompt in `artifacts/prompt-log.md`.

## 🧠 What I learned (new information)

- Billing admin consistently revolves around catalog/prices → subscription lifecycle → invoice lifecycle, with proration rules bridging changes mid-cycle. (S71–S73)
- Tax IDs and tax configuration are a distinct compliance surface and must be represented in admin/portal flows. (S74)
- “Hosted billing portal + invoice surfaces” is a fast, low-risk thin slice because the provider handles payment UX and compliance.

## 🧭 What changes because of this

- For fast shipping, the best path is to build a thin billing admin UI backed by a provider (Stripe/Paddle/Chargebee) while keeping entitlements and plan packaging in-app.
- Proration should start as provider-preview (read-only) before implementing custom math.
- OSS billing engines can be used for pattern reference, but full adoption requires significant integration and Step-04 license/maintenance review.

## ➡️ Next step

- Run tranche on “Fraud & risk” (payments risk, return fraud, chargebacks) to complete the revenue protection feature universe.

## 🔗 Links / references

- Features: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-01-feature-hunt-oss-harvest-015445/artifacts/features-catalog.md`
- Sources: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-01-feature-hunt-oss-harvest-015445/artifacts/sources.md`
- Search log: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-01-feature-hunt-oss-harvest-015445/artifacts/search-log.md`
- OSS pointers: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-01-feature-hunt-oss-harvest-015445/artifacts/oss-catalog.md`
- Summary: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-01-feature-hunt-oss-harvest-015445/artifacts/summary.md`

---

### 0012_checkpoint-cycle-10-fraud-risk-feature-universe-evidence.md

---
step: 0012
created_at: "2025-12-29 22:58"
title: "Checkpoint: Cycle 10 — Fraud & risk feature universe + evidence"
---

# Step 0012: Checkpoint: Cycle 10 — Fraud & risk feature universe + evidence

## ✅ What I did (facts)

- Updated `artifacts/agent-plan.md` to Cycle 10 and selected theme “Fraud & risk”.
- Added tranche #11 “Fraud & risk” feature cluster (order risk panels, heuristics scoring, review queue, rules, verification, velocity controls, disputes inbox, evidence packets, playbooks, return-fraud gating) with workflows + 1–3 day thin slices in `artifacts/features-catalog.md`.
- Added evidence IDs S77–S81 (Stripe Radar, Stripe disputes lifecycle and categories, Shopify fraud analysis surface, Visa chargeback framing) in `artifacts/sources.md`.
- Added OSS pointers for risk primitives (GeoIP2, SHAP, tabular models, monitoring) in `artifacts/oss-catalog.md` and flagged license posture for Step-04.
- Appended reproducible queries in `artifacts/search-log.md`.
- Appended durable tranche insights + fastest thin slices into `artifacts/summary.md`.
- Logged cycle changes in `artifacts/output-index.md`, `artifacts/skills-log.md`, and appended the autopilot prompt in `artifacts/prompt-log.md`.
- Updated rolling context in `context/context.md` to include tranche #11 progress.

## 🧠 What I learned (new information)

- Fraud prevention surfaces typically combine risk evaluation + rules, and require operational workflows (review queues and overrides) to be effective. (S77)
- Disputes/chargebacks are a separate lifecycle with deadlines and evidence requirements; best treated as an inbox + checklist + packet builder. (S78, S79)
- Ecommerce admin platforms expose “fraud analysis” at the order level, reinforcing the “risk panel in order view” as a core workflow. (S80)

## 🧭 What changes because of this

- Fraud/risk should be implemented as signals→score/rules→queue→action with a full audit trail.
- The fastest shippable thin slices are: risk panel + hold action, disputes inbox with due dates, and evidence packet export.
- Return-fraud gating should connect directly to returns portal policies so risk decisions can reduce leakage without blocking legitimate returns.

## ➡️ Next step

- Run tranche on “Analytics for finance” (MRR, churn, cohorts, LTV) to tie billing, disputes, and ops into decision dashboards.

## 🔗 Links / references

- Features: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-01-feature-hunt-oss-harvest-015445/artifacts/features-catalog.md`
- Sources: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-01-feature-hunt-oss-harvest-015445/artifacts/sources.md`
- Search log: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-01-feature-hunt-oss-harvest-015445/artifacts/search-log.md`
- OSS pointers: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-01-feature-hunt-oss-harvest-015445/artifacts/oss-catalog.md`
- Summary: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-01-feature-hunt-oss-harvest-015445/artifacts/summary.md`

---

### 0013_checkpoint-cycle-11-finance-analytics-feature-universe-evidence.md

---
step: 0013
created_at: "2025-12-29 23:22"
title: "Checkpoint: Cycle 11 — Finance analytics feature universe + evidence"
---

# Step 0013: Checkpoint: Cycle 11 — Finance analytics feature universe + evidence

## ✅ What I did (facts)

- Updated `artifacts/agent-plan.md` to Cycle 11 and selected theme “Analytics for finance”.
- Added tranche #12 finance analytics feature cluster (metrics dictionary, MRR/ARR dashboards, churn, NRR bridges, cohorts, LTV, losses) with workflows + 1–3 day thin slices in `artifacts/features-catalog.md`.
- Added evidence IDs S82–S86 (Stripe MRR metrics, Stripe subscription metrics, SaaS metrics vocab from Baremetrics/Recurly, OpenMetrics conventions) in `artifacts/sources.md`.
- Added OSS pointers for finance analytics dashboards and semantic layers (Cube, Metabase, Superset, Prometheus, Grafana) in `artifacts/oss-catalog.md` and flagged license posture for Step-04.
- Appended reproducible queries in `artifacts/search-log.md`.
- Appended durable tranche insights + fastest thin slices to `artifacts/summary.md`.
- Logged cycle changes in `artifacts/output-index.md`, `artifacts/skills-log.md`, and appended the autopilot prompt in `artifacts/prompt-log.md`.
- Updated rolling context in `context/context.md` to reflect tranche #12 progress.

## 🧠 What I learned (new information)

- Finance dashboards need canonical definitions (MRR, churn, retention) grounded in billing/provider language; otherwise metrics drift. (S82, S83)
- SaaS metric vocab sources provide triangulation for formulas and edge cases, helping avoid “homegrown definitions” mistakes. (S84, S85)
- Metric naming/exposition conventions matter if we want consistent instrumentation and easier BI integration. (S86)

## 🧭 What changes because of this

- The minimum viable finance analytics product is a metrics dictionary + MRR/churn dashboards + drilldowns to underlying accounts/invoices.
- Loss impact (refunds/disputes) should be surfaced alongside MRR to connect finance and risk ops.
- OSS BI stacks can accelerate visualization, but a semantic layer and definition governance is still required.

## ➡️ Next step

- Run tranche on “Data import/export + integrations admin” (connectors, webhooks, ETL, retries) to complete platform-operability surfaces.

## 🔗 Links / references

- Features: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-01-feature-hunt-oss-harvest-015445/artifacts/features-catalog.md`
- Sources: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-01-feature-hunt-oss-harvest-015445/artifacts/sources.md`
- Search log: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-01-feature-hunt-oss-harvest-015445/artifacts/search-log.md`
- OSS pointers: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-01-feature-hunt-oss-harvest-015445/artifacts/oss-catalog.md`
- Summary: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-01-feature-hunt-oss-harvest-015445/artifacts/summary.md`

---

### 0014_checkpoint-cycle-12-integrations-admin-feature-universe-evidence.md

---
step: 0014
created_at: "2025-12-29 23:50"
title: "Checkpoint: Cycle 12 — Integrations admin feature universe + evidence"
---

# Step 0014: Checkpoint: Cycle 12 — Integrations admin feature universe + evidence

## ✅ What I did (facts)

- Updated `artifacts/agent-plan.md` to Cycle 12 and selected theme “Data import/export + integrations admin”.
- Added tranche #13 integrations admin feature cluster (connector catalog, credential setup, webhook endpoints + signing, delivery logs + replay, bulk import/export jobs, schedules, run history, retries) with workflows + 1–3 day thin slices in `artifacts/features-catalog.md`.
- Added evidence IDs S87–S93 (Stripe webhooks, Segment sources/destinations model, Shopify webhooks + bulk operations, Airbyte/Meltano docs, Svix docs) in `artifacts/sources.md`.
- Added OSS pointers for integrations admin (Airbyte, Meltano, Singer ecosystem, Svix, n8n) in `artifacts/oss-catalog.md` and flagged license posture for Step-04.
- Appended reproducible queries in `artifacts/search-log.md`.
- Appended durable tranche insights + fastest thin slices into `artifacts/summary.md`.
- Logged cycle changes in `artifacts/output-index.md`, `artifacts/skills-log.md`, and appended the autopilot prompt in `artifacts/prompt-log.md`.
- Updated rolling context in `context/context.md` to reflect tranche #13 progress.

## 🧠 What I learned (new information)

- Reliable integrations require first-class admin UX around webhook delivery attempts, retries, and replay; this is productized explicitly by webhook infrastructure platforms. (S93, S87)
- Connector platforms treat sync jobs and run history as core operational primitives; retry/resume flows are required for trust. (S91)
- “Sources → Destinations” is a useful mental model for presenting integrations consistently in admin. (S88)

## 🧭 What changes because of this

- Integrations admin should be treated as a control plane with: credentials/scopes, run/delivery observability, and safe retry/replay.
- The fastest build-ready slices are webhook endpoint manager + delivery logs, CSV import/export center, and connector run history + retry.
- OSS has strong reference implementations for ELT and webhooks, but licensing and operational fit should be validated in Step-04.

## ➡️ Next step

- Run tranche on “Mobile ops” (warehouse scanning, push alerts, offline mode) OR “Approvals & tasks” (tasks, playbooks, approvals) depending on priority.

## 🔗 Links / references

- Features: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-01-feature-hunt-oss-harvest-015445/artifacts/features-catalog.md`
- Sources: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-01-feature-hunt-oss-harvest-015445/artifacts/sources.md`
- Search log: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-01-feature-hunt-oss-harvest-015445/artifacts/search-log.md`
- OSS pointers: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-01-feature-hunt-oss-harvest-015445/artifacts/oss-catalog.md`
- Summary: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-01-feature-hunt-oss-harvest-015445/artifacts/summary.md`

---

### 0015_checkpoint-cycle-13-mobile-ops-feature-universe-evidence.md

---
step: 0015
created_at: "2025-12-29 23:58"
title: "Checkpoint: Cycle 13 — Mobile ops feature universe + evidence"
---

# Step 0015: Checkpoint: Cycle 13 — Mobile ops feature universe + evidence

## ✅ What I did (facts)

- Updated `artifacts/agent-plan.md` to Cycle 13 and selected theme “Mobile ops”.
- Added tranche #14 mobile ops feature cluster (scan-to-receive, offline-first scanning, cycle counts, pick/pack, push alerts, mobile task inbox, offline photo capture) with workflows + 1–3 day thin slices in `artifacts/features-catalog.md`.
- Added evidence IDs S94–S100 (Shopify barcode scanner hardware + receiving transfers, FCM push docs, Expo offline support, React Native AsyncStorage, ML Kit barcode scanning) in `artifacts/sources.md`.
- Added OSS pointers for mobile scaffolding/persistence/scanning primitives (Expo, AsyncStorage, ZXing, Firebase JS SDK) and noted non-OSS scanning SDK reference in `artifacts/oss-catalog.md`.
- Appended reproducible queries in `artifacts/search-log.md`.
- Appended durable tranche insights + fastest thin slices to `artifacts/summary.md`.
- Logged cycle changes in `artifacts/output-index.md` and `artifacts/skills-log.md`.
- Updated rolling context in `context/context.md` to reflect tranche #14 progress.

## 🧠 What I learned (new information)

- Warehouse scanning workflows are often constrained by hardware compatibility and connectivity; offline-first design is essential. (S94, S98)
- Push alerts require token lifecycle management and server-side delivery; best treated as a first-class ops feature, not a UI afterthought. (S97)
- Barcode decoding is frequently implemented via platform SDKs (e.g., ML Kit) even when OSS decoders exist; impacts dependency posture. (S100)

## 🧭 What changes because of this

- The mobile ops thin slice should start online-only (scan-to-receive) and then add offline queues + upload retries.
- Mobile tasks should be the execution surface for exception queues built earlier (shipping exceptions, transfer aging, etc.).
- Device/scanner test screens and compatibility docs reduce rollout friction significantly.

## ➡️ Next step

- Run tranche on “Approvals & tasks” (task queues, playbooks, approvals) to unify execution across desktop and mobile.

## 🔗 Links / references

- Features: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-01-feature-hunt-oss-harvest-015445/artifacts/features-catalog.md`
- Sources: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-01-feature-hunt-oss-harvest-015445/artifacts/sources.md`
- Search log: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-01-feature-hunt-oss-harvest-015445/artifacts/search-log.md`
- OSS pointers: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-01-feature-hunt-oss-harvest-015445/artifacts/oss-catalog.md`
- Summary: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-01-feature-hunt-oss-harvest-015445/artifacts/summary.md`

---

### 0016_checkpoint-cycle-14-approvals-tasks-feature-universe-evidence.md

---
step: 0016
created_at: "2025-12-30 00:10"
title: "Checkpoint: Cycle 14 — Approvals & tasks feature universe + evidence"
---

# Step 0016: Checkpoint: Cycle 14 — Approvals & tasks feature universe + evidence

## ✅ What I did (facts)

- Updated `artifacts/agent-plan.md` to Cycle 14 and selected theme “Approvals & tasks”.
- Added tranche #15 approvals & tasks feature cluster (task object, views, templates/playbooks, contextual creation, approval request object, approval inbox, approve/deny via links, escalations, audit trail, kanban view) with workflows + 1–3 day thin slices in `artifacts/features-catalog.md`.
- Added evidence IDs S101–S105 (Asana task model basics, Jira workflow concepts, Notion database properties, GitHub issues model, Slack workflow builder patterns) in `artifacts/sources.md`.
- Added OSS pointers for tasks/boards/playbooks (Focalboard, Mattermost, Outline, OpenProject, Plane) in `artifacts/oss-catalog.md` and flagged license posture for Step-04.
- Appended reproducible queries in `artifacts/search-log.md`.
- Appended durable tranche insights + fastest thin slices into `artifacts/summary.md`.
- Logged cycle changes in `artifacts/output-index.md`, `artifacts/skills-log.md`, and appended the autopilot prompt in `artifacts/prompt-log.md`.
- Updated rolling context in `context/context.md` to reflect tranche #15 progress.

## 🧠 What I learned (new information)

- Task systems converge on a common minimal schema: title, assignee, due date, status/state, and comments, with labels for categorization. (S101, S104)
- Playbooks and approvals naturally fit a workflow/state-machine model with transitions and time-based escalations. (S102, S35)
- Approvals routed via messaging/deep links are a common productivity pattern, but require strong auth and auditability. (S105, S65)

## 🧭 What changes because of this

- Tasks/approvals become the execution surface for all earlier tranches (shipping exceptions, disputes, transfers), and should share queue/view primitives.
- The fastest thin slices are task CRUD + views and approval request objects with a dedicated approval inbox.
- OSS boards can inform UI patterns, but adoption depends heavily on license posture and integration surface.

## ➡️ Next step

- Run tranche on “Localization” (multi-currency, translations, time zones) or “Observability” (logs/tracing/alerts/SLOs) depending on product priority.

## 🔗 Links / references

- Features: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-01-feature-hunt-oss-harvest-015445/artifacts/features-catalog.md`
- Sources: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-01-feature-hunt-oss-harvest-015445/artifacts/sources.md`
- Search log: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-01-feature-hunt-oss-harvest-015445/artifacts/search-log.md`
- OSS pointers: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-01-feature-hunt-oss-harvest-015445/artifacts/oss-catalog.md`
- Summary: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-01-feature-hunt-oss-harvest-015445/artifacts/summary.md`

---

### 0017_checkpoint-cycle-15-localization-feature-universe-evidence.md

---
step: 0017
created_at: "2025-12-29 20:48"
title: "Checkpoint: Cycle 15 — Localization feature universe + evidence"
---

# Step 0017: Checkpoint: Cycle 15 — Localization feature universe + evidence

## ✅ What I did (facts)

- Added tranche #16 “Localization (multi-currency, translations, time zones)” feature cluster to `artifacts/features-catalog.md` (and expanded it to 16 build-ready feature bullets).
- Corrected tranche header date to **2025-12-29** (was incorrectly set to 2025-12-30).
- Ensured every localization feature bullet includes evidence references via stable source IDs (S106–S112) defined in `artifacts/sources.md`.
- Added OSS pointers (pointers only; no deep dive) for i18n + money primitives to `artifacts/oss-catalog.md` and flagged licenses for Step-04 verification.
- Completed cycle bookkeeping: updated `artifacts/summary.md`, `artifacts/output-index.md`, `artifacts/skills-log.md`, `artifacts/prompt-log.md`, and rolling `context/context.md`.

## 🧠 What I learned (new information)

- Localization is mostly **standards + runtime correctness** (CLDR/ICU) rather than a “translate strings” checkbox; if you don’t standardize formats, you create downstream reconciliation/support pain. (S108, S109)
- Multi-currency needs explicit **FX snapshot + rate policy** decisions (when to lock rates, how to round) or numbers drift and disputes become unresolvable. (S106, S112)
- Translation systems benefit from operational surfaces (missing keys report/export) so localization stays complete over time. (S110, S111)
- Time zone handling impacts reporting accuracy (“today” boundaries) and scheduling safety (avoid accidental 3am notifications). (S109)

## 🧭 What changes because of this

- Adds a new top-level feature cluster that directly supports international merchants: tenant locale defaults, markets, pricing, and translation QA now have concrete thin slices to ship.
- Highlights a core implementation constraint for future build planning: use CLDR/ICU-backed formatting and integer money math to avoid correctness debt.
- Provides Step-04 a clean OSS shortlist to evaluate for licensing + adoption effort (FormatJS, i18next, Dinero.js, Unicode CLDR/ICU repos).

## ➡️ Next step

- Start Cycle 16 tranche on **Observability (logs, tracing, alerts, SLOs)** and produce N=15–20 feature bullets with evidence + 3–8 OSS pointers.

## 🔗 Links / references

- `artifacts/features-catalog.md` — tranche #16 localization section with workflows + thin slices
- `artifacts/sources.md` — evidence IDs S106–S112
- `artifacts/oss-catalog.md` — localization OSS pointers (pointers only)
- `artifacts/search-log.md` — localization search queries (Shopify markets/multi-currency; CLDR/ICU; FormatJS; i18next; Dinero.js)

---

### 0018_checkpoint-cycle-16-observability-feature-universe-evidence.md

---
step: 0018
created_at: "2025-12-29 20:57"
title: "Checkpoint: Cycle 16 — Observability feature universe + evidence"
---

# Step 0018: Checkpoint: Cycle 16 — Observability feature universe + evidence

## ✅ What I did (facts)

- Added tranche #17 “Observability (logs, tracing, alerts, SLOs)” feature cluster to `artifacts/features-catalog.md` with 18 build-ready feature bullets (each includes workflow + thin slice + evidence).
- Added evidence sources S113–S122 to `artifacts/sources.md` (OpenTelemetry, semantic conventions, Prometheus/Alertmanager, Loki, Jaeger, Sentry, SLOs and incident lifecycle).
- Appended reproducible queries to `artifacts/search-log.md` for observability topics.
- Added OSS pointers (pointers only; no deep evaluation) for core observability stack components to `artifacts/oss-catalog.md` and flagged licenses for Step-04 verification where unclear.
- Updated cycle bookkeeping artifacts: `artifacts/summary.md`, `artifacts/output-index.md`, `artifacts/skills-log.md`, `artifacts/prompt-log.md`, and rolling `context/context.md`.

## 🧠 What I learned (new information)

- The “stealable” admin value in observability is mostly **control-plane UX** (schemas, routing rules, silences, runbooks, incident records) rather than raw charting. (S114, S116, S122)
- Semantic conventions are a foundational leverage point: without consistent attribute names, filtering/correlation and saved queries degrade quickly. (S114)
- Alert fatigue is prevented by first-class routing and silencing controls; those are core surfaces, not “nice to have”. (S116)
- SLOs shift ops from reactive threshold alerts to goal-driven error budgets (burn-rate framing). (S121)

## 🧭 What changes because of this

- Adds a new feature cluster that supports internal ops and merchant-facing reliability: logs/traces/alerts/incidents now have concrete thin slices that can be shipped incrementally.
- Produces clear “thin-slice” sequencing: start with log explorer + trace lookup, then alert routing/silences, then incident object, then SLOs/burn rates.
- Provides Step-04 a concrete OSS shortlist for licensing + adoption evaluation (OTel Collector, Prometheus/Alertmanager, Loki/Tempo/Jaeger, SigNoz, Sentry).

## ➡️ Next step

- Start Cycle 17 tranche on **Admin IA (navigation, search, saved views, shortcuts)** with N=15–20 feature bullets + evidence + 3–8 OSS pointers.

## 🔗 Links / references

- `artifacts/features-catalog.md` — tranche #17 observability section with workflows + thin slices
- `artifacts/sources.md` — evidence IDs S113–S122
- `artifacts/oss-catalog.md` — observability OSS pointers (pointers only)
- `artifacts/search-log.md` — observability search queries

---

### 0019_checkpoint-cycle-17-admin-ia-feature-universe-evidence.md

---
step: 0019
created_at: "2025-12-29 21:05"
title: "Checkpoint: Cycle 17 — Admin IA feature universe + evidence"
---

# Step 0019: Checkpoint: Cycle 17 — Admin IA feature universe + evidence

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
