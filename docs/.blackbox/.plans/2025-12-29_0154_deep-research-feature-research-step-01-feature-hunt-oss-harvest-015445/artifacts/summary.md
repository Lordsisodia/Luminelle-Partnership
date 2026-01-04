---
status: draft
last_reviewed: 2025-12-28
owner: agent
---

# Summary (Step 01 — Feature Hunt + OSS Harvest)

- ✅ Tranche #1 completed: expanded Returns / Exchanges / RMA automation into a detailed feature universe with stealable workflows + thin slices in `artifacts/features-catalog.md`.
- ✅ Evidence pack added for returns primitives and vendor workflow patterns (Shopify help center, AfterShip, Narvar, Happy Returns, ReturnGO, Reuters) in `artifacts/sources.md` (S1–S9).
- ✅ OSS pointers added (8) for returns/RMA-adjacent patterns (Medusa, Saleor, Vendure, Sylius, Spree, VTEX return-app, OCA/rma, WooCommerce RMA plugin) in `artifacts/oss-catalog.md`.
- ✅ Search reproducibility updated with queries and top hits in `artifacts/search-log.md`.
- 🔥 Fastest thin slices (1–3 days): return initiation portal + policy gating; exchange-to-any SKU (credit-only delta); manual review queue + approve/deny + templated comms.
- 🧱 High-leverage follow-ons (1–2 weeks): scan/event-driven refunds; routing + consolidation; inventory reservation + ship-first/receive-first controls.
- ❓ Open decisions: exchange price-delta handling (split tender vs credit-only); refund trigger milestone policy (scan vs received); store credit instrument choice (gift card vs ledger balance).

- ✅ Tranche #2 started: Shipping / delivery exception management feature cluster added with workflows + thin slices (tracking ingestion, exception queues, holds, comms) in `artifacts/features-catalog.md`.
- 🧠 Durable pattern: shipping exceptions are an **event ingestion + normalization + task queue** problem (canonical status enums + “last scan age” rules) more than a “UI-only” problem. (S14, S16, S19)
- 🔥 Fastest thin slices (1–3 days): webhook endpoint + “shipment timeline”; exception queue + manual resolution notes; fulfillment hold/unhold with reasons. (S16, S18, S12)
- 🧱 High-leverage follow-ons (1–2 weeks): proactive notification rules by event + SLA; address verification + correction loop; carrier claims tracker with attachments. (S15, S17, S16)
- ⚖️ OSS posture: shipping exception “platforms” are mostly SaaS; OSS is strongest as primitives (carrier integration layers + address parsing/geocoding) and should be treated as accelerators, not full solutions. (GitHub pointers in `artifacts/sources.md`)

- ✅ Tranche #3 started: Inventory / fulfillment exception management feature cluster added (multi-location inventory, routing, split/merge, transfers, oversell/backorder) with workflows + thin slices in `artifacts/features-catalog.md`.
- 🧠 Durable pattern: inventory/fulfillment exceptions collapse into **(a) location-aware inventory ledger**, **(b) routing/assignment engine**, and **(c) exception queues** (backorder, transfer aging, partial fulfillments). (S22, S21, S28)
- 🔥 Fastest thin slices (1–3 days): partial fulfillment (split) + customer comms; inventory transfers with receive UI; bulk inventory edit with row-level errors. (S28, S23, S25)
- 🧱 High-leverage follow-ons (1–2 weeks): fulfillable-inventory gating by ship-to zones; inventory reservations (committed vs available) + auto-release; low-stock tasking per location. (S29, S22)
- ⚖️ OSS posture: mature inventory/WMS patterns mostly live in OSS ERP/WMS suites (ERPNext/Odoo/OpenBoxes) as reference for flows and edge cases; treat as pattern extraction until Step-04. (GitHub pointers in `artifacts/sources.md`)

- ✅ Tranche #4 started: Support desk ops feature cluster added (views/queues, macros, canned responses, rules, auto-assign, SLAs, audit trail) with workflows + thin slices in `artifacts/features-catalog.md`.
- 🧠 Durable pattern: support desks are **queue primitives (views) + automation primitives (rules/macros) + time primitives (SLAs)**. (S36, S31, S35)
- 🔥 Fastest thin slices (1–3 days): canned responses + variables; macro actions (tag/assign/status + draft reply); SLA breach view + overdue badges. (S33, S30, S35)
- 🧱 High-leverage follow-ons (1–2 weeks): ecommerce side panel (order/return/shipment context) + 1-click ops actions; collision avoidance/presence; spam/OOO hygiene via rules. (S30, S34)
- ⚖️ OSS posture: full helpdesks exist in OSS (Chatwoot/Zammad/osTicket), but license/posture varies; treat as reference until Step-04 verifies licenses and integration fit. (GitHub pointers in `artifacts/sources.md`)

- ✅ Tranche #5 started: Analytics & QA feature cluster added (metrics dictionary, agent performance, queue health, CSAT, QA rubrics/scorecards, coaching) with workflows + thin slices in `artifacts/features-catalog.md`.
- 🧠 Durable pattern: analytics/QA is a **measurement layer** over the same event system used by rules/macros/SLAs (ticket events + automation executions + timers). (S37, S35)
- 🔥 Fastest thin slices (1–3 days): CSAT capture (2-choice) + DSAT escalation; agent performance dashboard (first reply time + tickets solved); simple QA rubric + evaluation form. (S39, S40, S41)
- 🧱 High-leverage follow-ons (1–2 weeks): calibration sessions (grader variance), coaching plans linked to QA findings, combined “speed + quality” scorecard to prevent gaming. (S41)
- ⚖️ OSS posture: analytics is easiest to accelerate via OSS BI/telemetry stacks (Superset/Metabase/Grafana/OTel) while keeping domain metrics in-app; licenses vary and need Step-04 verification. (GitHub pointers in `artifacts/sources.md`)

- ✅ Tranche #6 started: Customer self-serve / deflection feature cluster added (order lookup, status/tracking pages, customer accounts, help center + search, deflection analytics) with workflows + thin slices in `artifacts/features-catalog.md`.
- 🧠 Durable pattern: self-serve is a **content + search + contextual status surfaces** problem, plus instrumentation to measure “contact anyway” behavior. (S45, S46, S42)
- 🔥 Fastest thin slices (1–3 days): order lookup page + tracking link; help center 10 articles + basic search; contact form with structured reasons and prefilled order context. (S44, S49, S31)
- 🧱 High-leverage follow-ons (1–2 weeks): contextual status modules (delayed/exception guidance), recommended articles on contact page, deflection analytics linking search→contact sessions. (S45, S43, S48)
- ⚖️ OSS posture: help centers and search can be accelerated with OSS (Docusaurus + Meilisearch/DocSearch) but search licenses vary; defer license verification to Step-04. (GitHub pointers in `artifacts/sources.md`)

- ✅ Tranche #7 started: Workflow builder / automation feature cluster added (triggers, actions, condition builder, visual editor, run history, approvals, retries) with workflows + thin slices in `artifacts/features-catalog.md`.
- 🧠 Durable pattern: automation is a **unifying layer** across returns/shipping/inventory/support, with a shared trigger/action/condition model and audit history. (S51, S50)
- 🔥 Fastest thin slices (1–3 days): linear flow editor + 10 triggers/actions; test runner with sample payload; run history list with errors. (S50, S53)
- 🧱 High-leverage follow-ons (1–2 weeks): approval step for risky actions; rate limiting + dedupe; connector packaging (“pieces/nodes”) for rapid integrations. (S52, S54, S55)
- ⚖️ OSS posture: OSS exists at multiple layers (builder UI, connector model, durable runtime) but licenses vary (notably n8n historically source-available); defer license verification to Step-04. (GitHub pointers in `artifacts/sources.md`)

- ✅ Tranche #8 started: Security & compliance feature cluster added (RBAC, MFA, SSO/SCIM, sessions, audit logs, approvals, webhook security) with workflows + thin slices in `artifacts/features-catalog.md`.
- 🧠 Durable pattern: security features are **control plane primitives** that every other tranche depends on (permissions + auditability + safe automation). (S56, S65)
- 🔥 Fastest thin slices (1–3 days): fixed roles + permission checks on risky actions; audit log (20 events + filters + CSV export); webhook signature verification + rotation UI. (S56, S65, S64)
- 🧱 High-leverage follow-ons (1–2 weeks): enforce MFA and session revocation; SSO (SAML) + SCIM provisioning with group→role mapping; two-person approvals for refunds and role changes. (S57, S58, S59)
- ⚖️ OSS posture: identity + authz layers have strong OSS options (Keycloak/OpenFGA/OPA/Casbin), but integration and license posture must be validated in Step-04. (GitHub pointers in `artifacts/sources.md`)

- ✅ Tranche #9 started: Inventory forecasting + replenishment feature cluster added (POs, vendors, reorder rules, suggested quantities, inbound visibility, transfers vs buy, forecasting layer) with workflows + thin slices in `artifacts/features-catalog.md`.
- 🧠 Durable pattern: replenishment is **rules-first** (min/max, reorder levels, lead times) and forecasting is an optional layer that should start as advisory. (S68, S69, S70)
- 🔥 Fastest thin slices (1–3 days): PO create + partial receiving; reorder point table + daily suggestions; days-of-cover risk dashboard. (S66, S68, S67)
- 🧱 High-leverage follow-ons (1–2 weeks): transfer-vs-buy suggestions; ABC classification with policy defaults; forecasting POC report for top SKUs (no auto-order). (S67, S70)
- ⚖️ OSS posture: ERP/WMS suites provide mature replenishment flows (ERPNext/Odoo); forecasting libs (Prophet/Darts) can accelerate models, but licensing/ops fit need Step-04 verification. (GitHub pointers in `artifacts/sources.md`)

- ✅ Tranche #10 started: Pricing & billing admin feature cluster added (plans/catalog, subscriptions, proration previews, invoices, taxes/tax IDs, dunning, billing portal) with workflows + thin slices in `artifacts/features-catalog.md`.
- 🧠 Durable pattern: billing admin is **catalog + subscription lifecycle + invoice lifecycle**, with proration as the “edge-case engine” and taxes as a compliance layer. (S71, S72, S73)
- 🔥 Fastest thin slices (1–3 days): invoice list/detail + PDF; hosted billing portal link; tax ID capture and show on invoice. (S72, S71, S74)
- 🧱 High-leverage follow-ons (1–2 weeks): proration previews and change confirmations; dunning settings with grace-period access states; approvals for refunds/credits. (S73, S71, S63)
- ⚖️ OSS posture: full billing engines exist (Kill Bill) and can inform data models; many teams integrate Stripe/Paddle/Chargebee for faster compliance and operations. (S71, S75, S76)

- ✅ Tranche #11 started: Fraud & risk feature cluster added (order risk panels, review queues, risk rules, disputes/chargebacks inbox, evidence packets, return-fraud gating) with workflows + thin slices in `artifacts/features-catalog.md`.
- 🧠 Durable pattern: fraud/risk is **signals → score/rules → queue → action**, plus a separate disputes lifecycle with deadlines and evidence packaging. (S77, S78)
- 🔥 Fastest thin slices (1–3 days): order risk panel + manual review queue + “hold order”; dispute inbox with due dates; evidence packet export (PDF/ZIP). (S80, S78, S79)
- 🧱 High-leverage follow-ons (1–2 weeks): verification flows, velocity controls, and return-fraud gating integrated into returns portal; audit trail for all overrides and evidence submissions. (S77, S9, S65)
- ⚖️ OSS posture: OSS helps mostly with primitives (geo/risk signals, explainability, monitoring) while payment/dispute lifecycles are typically provider-integrated. (S77, S78)

- ✅ Tranche #12 started: Analytics for finance feature cluster added (MRR/ARR, churn, NRR bridges, cohorts, LTV, loss impact) with workflows + thin slices in `artifacts/features-catalog.md`.
- 🧠 Durable pattern: finance analytics needs a **metrics dictionary + transparent drilldowns**, otherwise numbers won’t be trusted by operators. (S82, S84)
- 🔥 Fastest thin slices (1–3 days): MRR dashboard + plan breakdown; churn dashboard; refunds/chargebacks impact chart. (S82, S83, S78)
- 🧱 High-leverage follow-ons (1–2 weeks): cohort retention tables, NRR/GRR bridges, and invoice-vs-MRR reconciliation views. (S84, S82)
- ⚖️ OSS posture: BI stacks (Superset/Metabase) and semantic layers (Cube) accelerate dashboards, but licenses vary and need Step-04 verification. (GitHub pointers in `artifacts/sources.md`)

- ✅ Tranche #13 started: Data import/export + integrations admin feature cluster added (connector catalog, webhook management, bulk exports, sync run history, retries) with workflows + thin slices in `artifacts/features-catalog.md`.
- 🧠 Durable pattern: integrations need **three control planes** — credentials/scopes, delivery/run observability, and safe retry/replay controls. (S87, S91, S93)
- 🔥 Fastest thin slices (1–3 days): webhook endpoint manager + delivery log + replay; CSV import/export center with dry-run validation; connector run history with retry button. (S87, S90, S91)
- 🧱 High-leverage follow-ons (1–2 weeks): schema mapping/transforms, per-connector schedules, and event subscription manager (topic selection + sample payload viewer). (S92, S88, S89)
- ⚖️ OSS posture: ELT/connectors (Airbyte/Meltano/Singer) and webhook delivery (Svix) provide strong patterns, but licenses and integration shape need Step-04 validation. (GitHub pointers in `artifacts/sources.md`)

- ✅ Tranche #14 started: Mobile ops feature cluster added (scan-to-receive, offline-first scanning, push alerts, mobile task inbox) with workflows + thin slices in `artifacts/features-catalog.md`.
- 🧠 Durable pattern: mobile ops success depends on **offline-first queues + conflict resolution**, plus fast scan UX and device compatibility constraints. (S98, S95, S94)
- 🔥 Fastest thin slices (1–3 days): scan-to-receive transfer (online); push alerts for 2 events; basic offline queue for scans with “sync now”. (S95, S97, S98)
- 🧱 High-leverage follow-ons (1–2 weeks): offline photo/evidence capture and upload retries; pick/pack scan confirmation; device/scanner test screen. (S98, S94)
- ⚖️ OSS posture: mobile scaffolding and storage primitives exist (Expo/AsyncStorage/ZXing), but barcode scanning often relies on platform SDKs (e.g., ML Kit). (S99, S100)

- ✅ Tranche #15 started: Approvals & tasks feature cluster added (task object, views, templates/playbooks, approvals inbox, reminders/escalations) with workflows + thin slices in `artifacts/features-catalog.md`.
- 🧠 Durable pattern: approvals/tasks are the **execution layer** that ties automation, security, and mobile together (queue + state machine + due dates). (S102, S35)
- 🔥 Fastest thin slices (1–3 days): task CRUD + “My tasks” view; approval request object + approval inbox; email approve/deny deep links with auth gate. (S101, S36, S105)
- 🧱 High-leverage follow-ons (1–2 weeks): task templates/playbooks + checklist steps; escalations and reminders; kanban board view for ops teams. (S102, S104)
- ⚖️ OSS posture: OSS boards and issue trackers provide strong UI patterns (Focalboard/OpenProject), but licenses vary; Step-04 should verify before reuse. (GitHub pointers in `artifacts/sources.md`)

- ✅ Tranche #16 started: Localization feature cluster added (multi-currency, translations, time zones) with workflows + thin slices in `artifacts/features-catalog.md`.
- 🧠 Durable pattern: localization is a **data model + formatting runtime** problem (CLDR/ICU), not just “translate strings”; correct money math + rounding is a core risk surface. (S108, S109, S112)
- 🔥 Fastest thin slices (1–3 days): tenant locale defaults applied across UI; FX rate snapshot displayed on order; missing translation keys report + export. (S109, S106, S111)
- 🧱 High-leverage follow-ons (1–2 weeks): per-market price lists and conversion policies (rate lock windows) + audit log; locale-aware input parsing for admin pricing. (S106, S107, S108)
- ⚖️ OSS posture: strong OSS primitives exist for i18n runtime/message formatting and money math (FormatJS, i18next, Dinero.js), but licensing and fit should be verified in Step-04. (S110, S111, S112)

- ✅ Tranche #17 started: Observability feature cluster added (logs, tracing, alerts, SLOs) with workflows + thin slices in `artifacts/features-catalog.md`.
- 🧠 Durable pattern: observability is an **ops control plane** (schemas + routing + policy) as much as a “dashboard”; without semantic conventions, search/correlation collapses. (S114, S113)
- 🔥 Fastest thin slices (1–3 days): log search with saved queries; trace lookup by trace_id/request_id; alert routing + silences; basic incident object with timeline notes. (S117, S119, S116, S122)
- 🧱 High-leverage follow-ons (1–2 weeks): SLOs + burn-rate alerts + error budgets; PII redaction and sampling policies; release markers on charts and error inbox for fast regressions. (S121, S113, S120)
- ⚖️ OSS posture: strong OSS exists across the stack (OTel Collector, Prometheus/Alertmanager, Loki/Tempo/Jaeger), but licensing varies and should be validated in Step-04 before adoption. (S113, S115, S117, S119)

- ✅ Tranche #18 started: Admin IA feature cluster added (navigation, search, saved views, shortcuts) with workflows + thin slices in `artifacts/features-catalog.md`.
- 🧠 Durable pattern: admin IA is “**reduce repeated work**” via saved views + deep links; global search and command palettes shift the UI from “browse” to “lookup”. (S123, S124, S126)
- 🔥 Fastest thin slices (1–3 days): saved views (filters + sort) on one list; ⌘K command palette for navigation; shortcuts overlay; shareable deep links to queue states. (S123, S125, S129)
- 🧱 High-leverage follow-ons (1–2 weeks): advanced search syntax + builder UI; table personalization (columns/density) per view; bulk actions with selection persistence; permission-aware navigation for reduced confusion. (S127, S128, S123)
- ⚖️ OSS posture: strong OSS primitives exist for command palettes, keyboard shortcuts, fuzzy search, and table state (cmdk/kbar/Fuse/FlexSearch/TanStack Table), but licenses should be verified in Step-04. (S129)

- ✅ Tranche #19 started: Data governance feature cluster added (retention, exports, privacy requests) with workflows + thin slices in `artifacts/features-catalog.md`.
- 🧠 Durable pattern: governance is **policy + execution + proof** — policy registry (retention/DSAR rules), jobs/workflows to execute, and audit logs proving outcomes. (S130, S135, S137)
- 🔥 Fastest thin slices (1–3 days): privacy request inbox + due dates; export pack generator for 3 tables; retention registry + enforcement run history; audit log filters + CSV export. (S131, S130, S135, S137)
- 🧱 High-leverage follow-ons (1–2 weeks): legal hold integration into retention and erasure; identity verification gating; PII classification registry drives redaction/export safety; request reporting dashboards for compliance readiness. (S136, S131, S134)
- ⚖️ OSS posture: OSS exists for PII detection/anonymization and governance/catalog patterns (Presidio, DataHub/OpenMetadata/Atlas), but operational fit and licenses should be validated in Step-04. (S134)

- ✅ Tranche #20 started: Merchandising rules feature cluster added (search tuning, boosts, synonyms) with workflows + thin slices in `artifacts/features-catalog.md`.
- 🧠 Durable pattern: merchandising is a **closed loop**: search analytics → tuning primitives (synonyms/rules/boosts) → preview/sandbox → publish → rollback. (S140, S142)
- 🔥 Fastest thin slices (1–3 days): synonyms CRUD + publish; pin/promote rules for top queries; zero-results playbook; basic search analytics (top queries + zero results). (S139, S143, S146)
- 🧱 High-leverage follow-ons (1–2 weeks): segment-scoped merchandising (market/customer group), rule conflict detection, and safer rollout via scheduled campaigns and governance/audit trails. (S138, S141)
- ⚖️ OSS posture: OSS search engines often expose the primitives (synonyms/curation/facets), but licenses vary (Typesense often GPL); treat as accelerators pending Step-04 verification. (S141, S143, S144)

- ✅ Tranche #21 started: Catalog governance feature cluster added (product QA, bulk edits, versioning) with workflows + thin slices in `artifacts/features-catalog.md`.
- 🧠 Durable pattern: catalog governance is a **data quality pipeline** — status gating (draft/active), validation rules, bulk ops safety (dry-run + rollback), and audit trails. (S148, S149, S151)
- 🔥 Fastest thin slices (1–3 days): status field + publish gate; bulk editor with row-level errors; CSV import validator; completeness badges and a “needs review” QA queue. (S147, S149, S151)
- 🧱 High-leverage follow-ons (1–2 weeks): change history with diffs + rollback per batch; controlled vocabularies (vendor/type/tag merge); channel readiness profiles; approval workflow for high-risk fields (price/SKU). (S147, S150)
- ⚖️ OSS posture: OSS PIMs and data validation stacks exist (Akeneo/Pimcore/OpenRefine/Great Expectations/frictionless), but adoption/licensing needs Step-04 verification; treat as workflow/reference accelerators. (S149)

- ✅ Tranche #22 started: Promotions admin feature cluster added (coupons, discounts, eligibility) with workflows + thin slices in `artifacts/features-catalog.md`.
- 🧠 Durable pattern: promotions are a **rules engine + safety rails** problem (eligibility + scope + stacking + schedule) plus a separate measurement loop (redemptions + ROI). (S152, S156, S157)
- 🔥 Fastest thin slices (1–3 days): single code discount + schedule; automatic discount with min spend; usage limits; promo list view + filters; redemption counts export. (S154, S155, S157)
- 🧱 High-leverage follow-ons (1–2 weeks): bulk code generation + tracking, preview/test-cart simulator, conflict detection for stacking/priority, and abuse monitoring on redemptions. (S158, S156)
- ⚖️ OSS posture: OSS commerce cores (Saleor/Vendure/Sylius/Medusa) contain promotion primitives worth mining, but licenses and fit should be verified in Step-04. (S152, S156)

- ✅ Returns / Exchanges refresh: added printerless/QR flows, boxless returns, and explicit auto-refunds rule concepts into the returns feature universe. (S160, S161, S166)
- 🧠 Durable pattern: returns “speed” upgrades come in layers — label delivery friction (QR), logistics method (boxless/drop-off), and refund policy (event-driven + guarded). (S160, S161, S166)
- 🔥 Fastest thin slices (1–3 days): add a QR return-label delivery variant; add a return timeline with “drop-off scanned/received”; implement one auto-refund rule with threshold + audit log. (S160, S166)
- 🧱 High-leverage follow-ons (1–2 weeks): instant exchange deposit/hold flows (ship-first) and “instant refund” eligibility gating (financing layer) for high-trust customers. (S165, S163, S164)
- ⚠️ Risk note: “instant” features (refunds/exchanges) must be gated by risk scoring/abuse heuristics and have clear timeouts/capture rules. (S162, S166)

- ✅ Tranche #23 started: Subscription ops feature cluster added (swap/skip/pause, renewals, retries) with workflows + thin slices in `artifacts/features-catalog.md`. (S167–S175)
- 🧠 Durable pattern: subscription ops is “**schedule + cutoffs + state**” — almost every action (skip/swap/pause) is a schedule mutation with a cutoff window and an audit trail. (S167, S170)
- 🔥 Fastest thin slices (1–3 days): upcoming order preview (read-only); skip-next; pause for N cycles; payment-failure queue with “past due” status; renewal notice email. (S172, S168, S71, S72)
- 🧱 High-leverage follow-ons (1–2 weeks): cancellation save offers (pause/skip), swap + add-ons, dunning retries with grace + suspend, and bulk migrations with dry-run + results export. (S175, S171)
- ⚖️ OSS posture: durable execution/scheduling is the acceleration lever (Temporal/BullMQ/Quartz), while billing engines (Kill Bill/Lago) are deeper reference candidates pending Step-04 license + fit checks. (S171)

- ✅ Tranche #24 started: Returns analytics + fraud gating feature cluster added (dashboards, risk scoring, IDV gating, leakage audits) with workflows + thin slices in `artifacts/features-catalog.md`. (S1, S4, S166, S176–S178)
- 🧠 Durable pattern: returns “fraud gating” is **policy + evidence + audit** — risk segmentation decides what’s allowed, evidence capture supports decisions, and audit logs prove why outcomes happened. (S166, S176, S65)
- 🔥 Fastest thin slices (1–3 days): returner profile (simple history metrics), risk tier flag with “why”, controlled auto-refunds cap, SLA breach queue, and a leakage report (“refunded but not received after N days”). (S176, S166, S1)
- 🧱 High-leverage follow-ons (1–2 weeks): ID verification gating for high-risk instant flows, serial/IMEI mismatch checks, returns ↔ chargebacks linkage dashboards, and analyst workbench with bulk actions + audit trail. (S177, S178, S78, S81)
- ⚖️ OSS posture: risk/ops acceleration comes from policy evaluation + monitoring tooling (OPA + Evidently/Feast patterns), but licenses and operational fit should be validated in Step-04. (S176)

- ✅ Tranche #25 started: Shipping exceptions refresh feature cluster added (missed scans v2, webhook debugging, branded tracking, comms suppression, address issue playbooks, POR flows). (S179–S186)
- 🧠 Durable pattern: shipping exception ops is **event reliability + playbooks** — if webhook ingestion is unreliable, every downstream exception queue and comms policy fails silently. (S182, S186)
- 🔥 Fastest thin slices (1–3 days): webhook delivery log page, scan-gap “hours since last update” column, branded tracking page with one issue intake form, and comms audit trail on the shipment timeline. (S179, S183, S186)
- 🧱 High-leverage follow-ons (1–2 weeks): address confirmation workflow with cutoff rules, POR (delivered-not-received) policy engine, and escalation cases (“missing package”) with SLA tracking. (S17, S180, S14)
- ⚖️ OSS posture: event delivery/retries + observability (Svix + OTel) and portal analytics (PostHog) are accelerators; licenses and hosted-vs-OSS tradeoffs belong to Step-04. (S186, S113)

- ✅ Tranche #26 started: B2B subscription ops feature cluster added (accounts + hierarchy, seats/entitlements, quotes, invoice workflows, approvals, bulk contract updates). (S187–S193)
- 🧠 Durable pattern: B2B billing is “**accounts + procurement artifacts**” — account hierarchy, billing contacts, and quote→invoice flows matter as much as subscription lifecycle controls. (S187, S188, S189)
- 🔥 Fastest thin slices (1–3 days): company account + billing contacts, invoice record with due date + manual mark-paid, quote object with approval status, and seat quantity field with non-prorated next-cycle billing. (S189, S188, S193)
- 🧱 High-leverage follow-ons (1–2 weeks): consolidated billing across child accounts, approval gates for enterprise plan/seat changes, bulk contract updates with dry-run + results export, and entitlement enforcement hooks in-product. (S187, S171, S193)
- ⚠️ Risk note: B2B invoice disputes and procurement metadata (PO numbers, net terms) are the “gotchas” that drive support churn if omitted; model them early. (S188, S189)

- ✅ Tranche #27 started: Promotions measurement feature cluster added (event taxonomy, ROI dashboards, cohorts/LTV, holdouts, abuse monitoring, metric registry, data-quality checks). (S194–S199, S157)
- 🧠 Durable pattern: promo measurement is **events + definitions + counterfactuals** — instrumentation (events), consistent formulas (ROI/spend), and holdouts to estimate incremental lift. (S194, S196, S195)
- 🔥 Fastest thin slices (1–3 days): redemption KPI dashboard + export, discount spend totals, new vs returning breakdown, and a simple holdout flag with conversion comparison. (S152, S157, S195)
- 🧱 High-leverage follow-ons (1–2 weeks): cohort LTV tables by promo, stacking overlap detection, and scheduled weekly reports with delivery logs. (S198, S196)
- ⚠️ Risk note: Shopify reports URLs are frequently blocked (403) in automated access; rely on event schema + BI tooling evidence for reproducible measurement references. (blocked_evidence: Shopify reports)

- ✅ Build-vs-integrate pass started: created a rubric and initial matrix to decide “Shopify API vs 3P API vs OSS vs custom build”, starting with Returns/RMA. (S200–S202)
- 🧠 Durable pattern: most “returns products” are a **custom UX + policy layer** that triggers Shopify primitives (Return/Refund/GiftCard) and then integrates 3P logistics for labels + scans. (S1, S4, S200–S202)
- 🔥 Fastest thin slices (1–3 days): portal submit → Shopify `returnCreate`; ops button → Shopify `refundCreate`; store credit via `giftCardCreate`; label generation via EasyPost tracker + webhook timeline. (S16, S18, S200–S202)
- ⚖️ OSS posture (for later): use OSS for horizontal plumbing (workflows/queues/analytics), but keep commerce truth in Shopify to avoid drift (deep OSS analysis belongs to Step-04). (S55, S197)

- ✅ Build-vs-integrate tranche #2 completed: classified Shipping/Delivery exceptions into Shopify fulfillment truth + 3P scan events + custom exception ops UX. (S203–S209, S14, S19)
- 🧠 Durable pattern: shipping exceptions are “**scan events + policies + queues**” — Shopify gives you fulfillments and holds, but exception detection needs carrier event coverage and reliable webhooks. (S203–S205, S182, S185)
- 🔥 Fastest thin slices (1–3 days): exception inbox + canonical status mapping; webhook delivery log page; scan-gap (“hours since last checkpoint”) detector; hold/unhold via Shopify fulfillment holds. (S14, S186, S179, S208)
- 🧱 High-leverage follow-ons (1–2 weeks): branded tracking page + issue intake; lost-package playbook wired to refunds; address confirmation loop backed by verification; analytics by carrier/service/region. (S183, S200, S17, S196)

- ✅ Build-vs-integrate tranche #5 completed: classified Analytics & QA into “3P support data + Shopify commerce data → our DB → derived dashboards”, with OSS reserved for analytics plumbing (not QA workflows). (S37–S41, S210–S211, S196–S197)
- 🧠 Durable pattern: analytics is best treated as **event + warehouse + semantic layer** — APIs/webhooks feed the warehouse, and metric definitions must be versioned to prevent drift. (S196, S197)
- 🔥 Fastest thin slices (1–3 days): metrics dictionary page + 3 KPI agent dashboard; queue aging buckets; CSAT capture; and one “joined drilldown” view (ticket → order → shipment status). (S37, S35, S39, S210)
- ⚠️ Boundary: QA programs (rubrics, sampling, coaching) are domain workflows that should be custom-built; OSS is mainly for horizontal reporting/ETL, not for coaching UX. (S41, S197)

- ✅ Build-vs-integrate tranche #8 completed: classified Security & compliance into OSS authorization + IdP (hosted or OSS) for SSO/MFA, with custom product surfaces for roles UI, audit log UX, approvals, and posture checklist. (S60–S65, S61–S62, S212–S214)
- 🧠 Durable pattern: don’t build identity/auth from scratch — use an IdP + OSS authz engines, then build differentiated “ops-safe” controls (approvals + audit + posture). (S60, S61, S62)
- 🔥 Fastest thin slices (1–3 days): 4 fixed roles enforced via policy checks; append-only audit log with filters/export; webhook signing verification snippet + secret rotation UI; and a 10-item posture checklist. (S61, S65, S64, S63)
- ⚠️ Boundary: Shopify staff permissions are separate from our app’s staff permissions; treat Shopify staff/app scopes/events as inputs for “integration posture” dashboards, not as a substitute for our own RBAC. (S212, S213, S214)

- ✅ Build-vs-integrate tranche #17 completed: classified Observability into OSS standards (OpenTelemetry/Prometheus/Grafana) plus minimal custom “ops playbook” surfaces (saved queries, runbooks, integration health). (S113–S122, S215–S220)
- 🧠 Durable pattern: don’t build observability backends — adopt OSS/hosted stacks and standardize correlation context early (tenant IDs + request IDs) to make every other ops feature debuggable. (S216, S114)
- 🔥 Fastest thin slices (1–3 days): add correlation fields to logs + traces, one golden-signal dashboard, one alert rule with routing/silence, and runbook links on alerts. (S115, S116, S122)
- ⚠️ Boundary: error tracking inboxes (Sentry-like) are usually better as hosted/OSS tools; we should store only links/ownership metadata rather than duplicating issue state. (S220)

- ✅ Build-vs-integrate tranche #23 completed: classified Subscription ops into “Shopify SubscriptionContract truth + custom portal/policy UX”, with optional OSS scheduling/workflows for dunning and batch jobs. (S221–S228, S55, S65)
- 🧠 Durable pattern: subscription ops is **schedule mutations + cutoffs + audit** — implement the UX (skip/pause/swap/save offers) but keep contract state in the upstream subscription system. (S221, S223, S65)
- 🔥 Fastest thin slices (1–3 days): upcoming order preview; skip next with cutoff; pause 1/2/3 cycles; cancellation reason + save offer; failed billing attempts queue based on billing attempts. (S222, S223, S224, S226)
- ⚠️ Boundary: merchants using a subscription app/provider may require that provider’s API for portal actions; Shopify subscription apps docs are the anchor for mapping contract behavior. (S228, S172–S175)

- ✅ Build-vs-integrate tranche #15 completed: classified Approvals & tasks into “custom ops UX + OSS queues/schedulers for reliability + 3P comms for notifications.” (S101–S105, S55, S229–S230)
- 🧠 Durable pattern: tasks/approvals are the *execution UX*; workflow engines are the *execution reliability* — build the former, leverage OSS for the latter. (S55, S229)
- 🔥 Fastest thin slices (1–3 days): task CRUD + 4 default views; approval request + inbox; signed approve/deny email links; overdue reminder job with escalation. (S101, S35, S105, S229)

- ✅ Build-vs-integrate tranche #24 completed: classified Returns analytics + fraud gating into “Shopify returns/refunds truth + custom policy/risk UI”, with 3P IDV as a gated add-on and OSS policy engines optional for versioned decisions. (S200, S202, S176–S178, S61)
- 🧠 Durable pattern: treat risk scoring as **derived state with auditability**; keep financial side-effects (refunds) in Shopify primitives and cap “instant” flows behind explicit thresholds. (S200, S166, S65)
- 🔥 Fastest thin slices (1–3 days): returner profile (history metrics) + heuristics tier (low/med/high) + one gating rule (“fast refund disabled if high risk”) + leakage audit report (“refunded but not received after N days”). (S176, S166)

- ✅ Build-vs-integrate tranche #18 completed: classified Admin IA into “custom ops-native UX” plus OSS building blocks (tables, command palette, search engine), with permission-aware nav powered by the authz layer. (S232–S238, S61–S62)
- 🧠 Durable pattern: admin productivity is won via **saved views + deep links + bulk actions + global search**; leverage OSS primitives, but keep IA and permission behaviors custom. (S123, S234)
- 🔥 Fastest thin slices (1–3 days): global search across 2 entities; ⌘K command palette for 10 routes; saved views (filters+sort); column toggles + bulk tag action. (S235, S123, S234)

- ✅ Build-vs-integrate tranche #20 completed: classified Merchandising rules into “Shopify catalog truth → external search index”, with a custom merch rules UI controlling synonyms/rules/facets/suggestions. (S239–S243, S237–S238)
- 🧠 Durable pattern: if you need synonyms/pinning/facets governance, you need a dedicated search layer; treat merch rules like versioned config with preview + audit. (S242, S65)
- 🔥 Fastest thin slices (1–3 days): product sync into search index; synonyms CRUD + publish; pin top 3 products for 5 queries; out-of-stock demotion; simple preview for one query. (S239, S242, S241)

- ✅ Build-vs-integrate tranche #21 completed: classified Catalog governance into “Shopify catalog truth + custom QA/bulk UX”, using Shopify mutations for execution and internal governance metadata for safety. (S244–S246, S65, S211)
- 🧠 Durable pattern: catalog governance is “safe batch ops”: preflight validation + row-level errors + change history + role-based locks, not just CRUD. (S149, S65)
- 🔥 Fastest thin slices (1–3 days): completeness rules + badge; CSV dry-run validator; spreadsheet bulk edit for 5 fields; export history table; change log view for one product. (S151, S149, S234)

- ✅ Build-vs-integrate tranche #22 completed: classified Promotions admin into “Shopify discounts truth + custom ops UX + custom measurement/abuse monitoring layer.” (S152–S155, S247, S196)
- 🧠 Durable pattern: keep promo application logic in Shopify; build a safer control plane (preview, import/export, audit history) and a separate measurement layer (events + metric registry). (S152, S194, S196)
- 🔥 Fastest thin slices (1–3 days): create single code discount + schedule; promo list view from discountNodes; redemption export (usage count + discount total); and a “promo preview” test cart simulator. (S154, S247, S157)

- ✅ Build-vs-integrate tranche #19 completed: classified Data governance into custom governance UX (retention, DSAR workflows, export packs) plus OSS schedulers for enforcement and strong audit trails. (S130–S137, S229, S211)
- 🧠 Durable pattern: governance is “safe batch ops for sensitive data”: identity verification gating + expiring links + access logs first, then scale exports/deletions. (S131, S137)
- 🔥 Fastest thin slices (1–3 days): DSAR inbox + verification gate + export pack of 3 tables; retention policy registry + nightly preview run + run history. (S131, S135, S211)

- ✅ Build-vs-integrate tranche #14 completed: classified Mobile ops into “custom mobile execution UX + OSS/offline primitives”, with optional Shopify POS extension surface (vs standalone app) and push infra for alerts. (S94–S100, S248, S249)
- 🧠 Durable pattern: mobile is won by **task execution + scanning + offline queues** — Shopify can remain the source-of-truth for inventory/transfer primitives, but offline sync and scan UX are our product. (S94, S95, S98, S99)
- 🔥 Fastest thin slices (1–3 days): online-first scan-to-receive flow; a mobile task inbox; push notifications for 1–2 exception events; and a “sync later” queued scan prototype with one conflict rule. (S95, S101, S248, S98)
- ⚠️ Boundary: POS UI extensions can accelerate adoption (hardware + existing POS context) but may constrain offline + scanning flows; treat “POS extension vs standalone app” as a product decision, not a technical afterthought. (S249, S94)

- ✅ Build-vs-integrate tranche #12 completed: classified Finance analytics into “Shopify orders/refunds/transactions truth + Shopify Payments primitives (if enabled) + custom derived reporting + reconciliation UX.” (S210, S200, S250–S254)
- 🧠 Durable pattern: finance reporting is a **derived warehouse problem** — keep truth in Shopify (and processor APIs), then build normalized ledgers + payout reconciliation tables + alerts on top. (S253, S252, S196)
- 🔥 Fastest thin slices (1–3 days): transaction ledger for last 30 days; payout timeline with “unreconciled” badges; dispute inbox with owners/due dates; and 3 finance alerts (refund spike, dispute spike, payout drop). (S253, S250, S254, S229)
- ⚠️ Boundary: non-Shopify processors require separate integrations; do not assume “finance truth” is complete unless the merchant uses Shopify Payments. (S250, S251)

- ✅ Build-vs-integrate tranche #10 completed: classified Pricing & billing admin (app billing) into “Shopify Billing API primitives for charges + custom plan/entitlement UX”, with external billing (Stripe/Chargebee) only when Shopify billing is not applicable. (S255–S259)
- 🧠 Durable pattern: treat billing as **a platform primitive** (charge creation/cancel/usage records) and keep internal state to “entitlements + audit”; don’t replicate invoices/charges as truth in our DB. (S255, S256, S259)
- 🔥 Fastest thin slices (1–3 days): 3-tier plan catalog + gating; upgrade flow (`appSubscriptionCreate`); cancel flow (`appSubscriptionCancel`) with reason capture; and one usage meter (`appUsageRecordCreate`) with an audit table. (S256, S257, S259, S65)
- ⚠️ Boundary: billing approach depends on distribution/eligibility — don’t assume Stripe is “better” if Shopify billing is required for the product motion. (S255)

- ✅ Build-vs-integrate tranche #13 completed: classified Integrations admin into “Shopify webhook/bulk ops primitives + custom operability UX”, with OSS/3P used for generic connector frameworks and webhook delivery infrastructure. (S206, S89, S90, S211, S91–S93, S229)
- 🧠 Durable pattern: integrations products win on **reliability surfaces** (delivery logs, retries, DLQ, alerts, audit), not on “having an API connection” — Shopify provides the primitives, we provide the control plane. (S206, S229, S65)
- 🔥 Fastest thin slices (1–3 days): webhook inventory diff + fix button; delivery log table; DLQ view + replay; and one bulk export “initial sync” with run history. (S206, S93, S229, S211)
- ⚠️ Boundary: shipping webhooks to many downstream endpoints is an operational tax; prefer a specialized delivery layer (Svix-like) or heavily constrain v1 scope (one destination, one payload). (S93)

- ✅ Build-vs-integrate tranche #3 completed: classified Inventory/Fulfillment exceptions into “Shopify inventory + fulfillment primitives truth + custom exception queues/playbooks + OSS jobs for detection and bulk fixes.” (S260–S266, S204, S229)
- 🧠 Durable pattern: inventory is a **safety + auditability** problem — don’t reimplement inventory truth; build mismatch detection, safe bulk tools, and approvals on top of Shopify primitives. (S263, S264, S65)
- 🔥 Fastest thin slices (1–3 days): nightly inventory snapshot + negative/low detector; cycle count session that submits via `inventorySetOnHandQuantities`; and a fulfillment exceptions queue for 2 aging states. (S263, S265, S204)
- ⚠️ Boundary: help-center guidance (bulk edits, “continue selling”) is useful for UX decisions, but stable implementation should anchor on Shopify dev API primitives where possible. (S25, S27, S263)

- ✅ Build-vs-integrate tranche #4 completed: classified Support desk ops into “integrate existing support platform APIs + build custom ops control plane joins + optional OSS workflows/analytics plumbing.” (S30–S32, S35–S37, S39–S40, S210, S55, S229)
- 🧠 Durable pattern: don’t rebuild ticketing — build the **joined ops surface** (ticket ↔ order ↔ shipment) and the automation/audit layer around it; keep ticket truth upstream. (S36, S210, S65)
- 🔥 Fastest thin slices (1–3 days): 2 queue views + deep links; ticket detail order/shipment panel; macro picker + usage log; and a basic SLA breach badge list. (S36, S210, S30, S35)
- ⚠️ Boundary: if a merchant lacks a support platform, start with a minimal “cases inbox” but expect pressure to integrate once volume grows; integration posture should be first-class in the product. (S36, S88)

- ✅ Build-vs-integrate tranche #7 completed: classified Workflow builder/automation into “OSS workflow engine for durable execution + custom playbook UX”, using Shopify + 3P APIs as action targets (not the runtime). (S50–S55, S89, S206, S200, S202, S229)
- 🧠 Durable pattern: don’t build a workflow engine — build the ops playbook UX + auditability; outsource retries/timers/idempotency to a proven engine (Temporal) and jobs queue where needed. (S55, S229)
- 🔥 Fastest thin slices (1–3 days): define 5 triggers + 5 actions; run one playbook end-to-end with retry; show run history timeline + replay; and add a single approval gate step. (S51, S55, S65)
- ⚠️ Boundary: Shopify Flow is a good reference model, but it’s not your runtime; avoid “Flow parity” and stay focused on the ops playbooks that reduce support load. (S52, S36)

- ✅ Build-vs-integrate tranche #11 completed: classified Fraud & risk into “Shopify risk/dispute primitives + processor APIs + custom risk analyst UX/policies/queues”, with OSS optional for policy evaluation + jobs. (S231, S254, S77–S79, S61, S229)
- 🧠 Durable pattern: treat risk scoring as **derived state with auditability**; keep enforcement side-effects (refunds, holds) in Shopify primitives, and keep processor-specific dispute workflows behind an integration boundary. (S200, S208, S65)
- 🔥 Fastest thin slices (1–3 days): ingest OrderRisk; manual review queue with outcomes; refund gating (disable instant refunds if high risk); and a disputes inbox (Shopify Payments or provider API) with due date reminders. (S231, S200, S254, S229)
- ⚠️ Boundary: disputes and fraud controls vary heavily by payment stack; do not assume Shopify Payments primitives apply to every merchant. (S250, S254, S78)

- ✅ Cycle 49 completed: tightened the “default architecture one-pager” for Build-vs-Integrate into an executable decision tree + system-of-record boundaries + minimum internal data model. (`artifacts/build-vs-integrate-agent.md`) (S89, S211, S55, S229, S65)
- 🧠 Durable pattern: for Shopify-connected products, differentiation is almost always **derived ops state + governance UX** (queues, approvals, analytics), not copying commerce truth. (S210, S200–S202, S65)
- 🔥 Fastest thin slices (1–3 days): ingest webhooks → derived DB tables; build one queue + one playbook + one audit log view; execute one Shopify side-effect (refund/hold/adjust) via API; add run history timeline. (S89, S229, S55, S200)

- ✅ Build-vs-integrate tranche #9 completed: classified Inventory forecasting/replenishment into “Shopify inventory truth + custom rules/PO/receiving UX + optional forecasting as derived,” with OSS jobs + analytics plumbing for alerts and KPIs. (S263, S260, S66–S70, S229)
- 🧠 Durable pattern: planning layers (forecasting/replenishment) should be **derived and explainable**; deterministic reorder rules ship first, forecasting comes later as an optional input. (S68, S67, S70)
- 🔥 Fastest thin slices (1–3 days): min/max reorder rules for 20 SKUs; reorder suggestions list w/ reasons; create PO with 5 lines; receive items and write inventory changes via Shopify inventory mutations. (S68, S66, S265, S264)

- ✅ Build-vs-integrate tranche #16 completed: classified Localization into “Shopify markets/currency truth + OSS i18n/formatting libs + custom preference/QA surfaces,” avoiding bespoke currency logic. (S106–S112)
- 🧠 Durable pattern: localization is two layers — commerce context (markets/currency) should follow Shopify truth, while our UI localization should use standard i18n libraries and locale datasets. (S106, S107, S111)
- 🔥 Fastest thin slices (1–3 days): add 2 UI languages with a toggle; implement currency + date formatting for 3 locales; and store per-user language preference. (S111, S110, S112)

- ✅ Cycle 52 completed: ran a matrix consistency pass and added “default architecture alignment” notes to the newest tranches to reduce second-source-of-truth drift. (`artifacts/build-vs-integrate-matrix.md`) (`artifacts/build-vs-integrate-agent.md`)
- 🧠 Durable pattern: if a tranche doesn’t explicitly state “what is truth vs derived,” implementations tend to quietly diverge; enforcing this note prevents rework later.

- ✅ Build-vs-integrate tranche #6 completed: classified Customer self-serve/deflection into “Shopify self-serve surfaces + 3P tracking events + custom intake/analytics,” keeping order truth in Shopify and storing derived deflection outcomes internally. (S44–S48, S202, S15)
- 🧠 Durable pattern: self-serve wins by combining (1) reliable status timelines (tracking events) and (2) structured issue intake that creates tasks/playbooks instead of tickets by default. (S48, S101, S36)
- 🔥 Fastest thin slices (1–3 days): WISMO lookup page (email+zip) → status card; branded tracking page via tracking API; and a “delivery issue” form that creates a task and routes by issue type. (S44, S48, S101)

- ✅ Build-vs-integrate tranche #5 completed: classified Analytics & QA into “upstream truth → derived warehouse tables → dashboards” + custom QA workflows, with OSS reserved for transformations/semantic layer and jobs for sampling/schedules. (S37–S41, S210–S211, S196–S197)
- 🧠 Durable pattern: metrics are a product surface (definitions + ownership + versioning); treat QA as a domain workflow, not a BI problem. (S41, S196)
- 🔥 Fastest thin slices (1–3 days): metrics dictionary + 3 KPI cards; joined drilldown (ticket → order → shipment); and one QA rubric + weekly sample queue. (S37, S210, S41, S229)

- ✅ Build-vs-integrate tranche #27 completed: classified Promotions measurement into “Shopify discount/order truth + derived event/metric tables + optional holdout/experimentation tooling,” with OSS reserved for experimentation + analytics plumbing. (S247, S210, S195–S199, S196)
- 🧠 Durable pattern: promo ROI is only as good as metric governance — treat metric definitions as versioned artifacts (registry) and explicitly track promo stacking/overlap. (S196, S197)
- 🔥 Fastest thin slices (1–3 days): discount inventory list (discountNodes); daily “orders with promo” rollup; 1 cohort chart; and 2 abuse rules with alerts. (S247, S210, S198, S229)

- ✅ Build-vs-integrate tranche #25 completed: classified Shipping exceptions refresh into “Shopify fulfillment/holds/refunds truth + tracking provider scan events + custom exception inbox/playbooks + webhook delivery diagnostics.” (S203–S206, S208–S209, S179, S182, S186)
- 🧠 Durable pattern: v2 exceptions require **delivery observability** (webhook delivery logs + replay) and **timers** (scan gaps) as first-class features; without those, ops UX degrades fast. (S186, S229)
- 🔥 Fastest thin slices (1–3 days): scan-gap detector (48h no scan) → exception list; hold/unhold buttons; and a delivery log page for tracking webhooks with a “replay” action. (S179, S208, S186)

- ✅ Cycle 57 completed: consolidated Shipping exceptions by explicitly labeling Tranche #2 as “foundation” and Tranche #25 as “extensions/v2 refresh” to reduce duplication and enforce sequencing. (`artifacts/build-vs-integrate-matrix.md`)
- 🧠 Durable pattern: tranches that evolve (v1 → v2) should be captured as “base + extensions” so implementation teams don’t accidentally ship the hard parts (diagnostics/playbooks) without the ingestion foundations.

- ✅ Build-vs-integrate tranche #26 completed: classified B2B subscription ops into “Shopify subscriptions OR billing-provider truth (Chargebee/Recurly) + custom ops control plane,” emphasizing no second billing truth. (S187–S193, S221–S227)
- 🧠 Durable pattern: B2B needs **invoicing + procurement flows** (quotes, net terms, consolidated accounts) — treat billing provider objects as truth when used; treat Shopify contracts/billing attempts as truth when subscriptions are Shopify-native. (S188–S190, S221–S226)
- 🔥 Fastest thin slices (1–3 days): (1) Shopify subscription contract list + filters, (2) failed billing attempts queue + timers, (3) basic account-hierarchy viewer + mapping table (Shopify customer → billing account), and (4) invoice list + download links + internal “needs follow-up” tags. (S221–S227, S187–S189, S229)
- ⚠️ Boundary: don’t build invoicing/quote lifecycle yourself unless you are intentionally becoming a billing platform; instead, build the ops UX (queues, approvals, audit) around the upstream invoice/quote owner. (S189, S188, S65)

- ✅ Build-vs-integrate tranche #23 updated: refactored Subscription ops into explicit “modes” (Shopify-native vs subscription provider vs B2B billing) so we don’t accidentally create a second subscription/billing truth. (S221–S228, S172–S175, S187–S193)
- 🧠 Durable pattern: subscription UX can be unified (skip/pause/swap/dunning) but the **write paths must branch** by source-of-truth (Shopify contracts vs provider contracts). Put the mode in the UI and data model (and log it). (S228, S65)
- 🔥 Fastest thin slices (1–3 days): (1) Shopify contracts “next order” preview + skip/pause actions, (2) billing attempts “past due” queue + timers via jobs, and (3) per-merchant “source of truth” badge + mode selection with guardrails. (S221–S227, S225–S226, S229)

- ✅ Cycle 60 completed: cleaned up duplication in Tranche #5 by splitting **Analytics & QA** into “foundation” (support ops + QA program) and “extensions” (warehouse + semantic layer). (`artifacts/build-vs-integrate-matrix.md`)
- 🧠 Durable pattern: analytics work is two layers — (1) ops workflows (QA rubrics/evaluations/coaching) and (2) analytics plumbing (warehouse backfills, transformations, semantic layer); mixing them makes sequencing unclear and increases drift risk.
- 🔥 Fastest thin slices (1–3 days): ship a single bulk export + job history (Shopify bulk ops), one dbt model for rollups, and one semantic-layer endpoint for 3 metrics — without touching QA workflow UX. (S211, S197, S196)
