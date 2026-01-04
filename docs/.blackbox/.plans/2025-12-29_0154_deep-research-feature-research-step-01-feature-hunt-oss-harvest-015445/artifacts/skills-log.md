---
status: active
last_reviewed: 2025-12-29
owner: agent
---

# Skills log (what skills were used)

## Cycle 1 — 2025-12-29

- Context loading — read config + latest checkpoint to avoid drift.
- Planning — set theme + N limit + next actions.
- Web research — pulled authoritative docs for tracking statuses, fulfillments/holds, and webhook-based event delivery.
- Extraction — converted docs into “stealable workflows” and 1–3 day thin slices.
- Evidence curation — added stable source IDs (S10–S19) so features can cite evidence without repeating URLs.
- OSS harvesting (light) — captured OSS pointers for carrier/address primitives and flagged license review for Step-04.

## Cycle 2 — 2025-12-29

- Planning — selected inventory/fulfillment exceptions to close a core ops gap after shipping/returns.
- Web research — sourced multi-location inventory, routing, split/merge fulfillment, transfers, oversell policy docs. (S20–S29)
- Extraction — converted those primitives into 15+ build-ready workflows with 1–3 day thin slices.
- Evidence indexing — extended stable source IDs and linked features to them.
- OSS harvesting (light) — added ERP/WMS OSS pointers for pattern reference and flagged licenses for Step-04.

## Cycle 3 — 2025-12-29

- Planning — picked support desk ops to connect returns/shipping/inventory exception queues to agent workflows.
- Web research — sourced macros, rules, auto-assignment, canned responses, SLA policies, and queue/views docs. (S30–S36)
- Extraction — translated helpdesk primitives into 15+ “stealable workflows” and 1–3 day thin slices.
- Evidence indexing — added stable source IDs for support desk evidence and referenced them from features.
- OSS harvesting (light) — captured OSS helpdesk platform pointers and flagged license posture for Step-04.

## Cycle 4 — 2025-12-29

- Planning — selected analytics & QA to close the measurement/coaching gap after support desk primitives.
- Web research — gathered KPI definitions, performance reporting, CSAT API modeling, and QA rubric evidence. (S37–S41)
- Synthesis — mapped analytics/QA into thin slices that reuse existing primitives (events, rules, queues).
- Evidence indexing — extended stable source IDs for analytics/QA and referenced them from feature bullets.
- OSS harvesting (light) — added OSS dashboard/telemetry pointers and flagged license posture for Step-04.

## Cycle 5 — 2025-12-29

- Planning — selected customer self-serve/deflection to reduce inbound tickets by improving help surfaces.
- Web research — gathered order status tracking/customization, customer accounts, search customization, and branded tracking evidence. (S42–S48)
- Extraction — translated self-serve surfaces into 15+ workflows with 1–3 day thin slices (order lookup, help center, structured contact forms).
- Evidence indexing — extended stable source IDs for self-serve evidence and referenced them from feature bullets.
- OSS harvesting (light) — added OSS pointers for help center/search stacks and flagged licenses for Step-04.

## Cycle 6 — 2025-12-29

- Planning — selected workflow builder/automation to unify ops workflows across returns/shipping/support.
- Web research — gathered evidence for trigger/action workflow models and flow-based builders. (S50–S55)
- Extraction — produced 10+ automation features with workflows + thin slices (editor, test runner, audit log, approvals).
- Evidence indexing — added stable source IDs for automation evidence and referenced them from feature bullets.
- OSS harvesting (light) — captured OSS pointers for builders and durable workflow runtimes; flagged license posture for Step-04.

## Cycle 7 — 2025-12-29

- Planning — selected security & compliance as the control-plane foundation for safe ops and automation.
- Web research — gathered evidence for RBAC/staff permissions, MFA, SSO/SCIM concepts, webhook signing, audit log patterns, and security baselines. (S56–S65)
- Extraction — translated those baselines into 10+ build-ready workflows (audit logs, approvals, API keys, session revocation).
- Evidence indexing — extended stable source IDs for security evidence and referenced them from feature bullets.
- OSS harvesting (light) — captured OSS pointers for identity and authorization layers; flagged license posture for Step-04.

## Cycle 8 — 2025-12-29

- Planning — selected replenishment/forecasting to close the inventory planning gap after execution workflows.
- Web research — gathered evidence for purchase orders, replenishment settings, reordering rules, reorder levels, and forecasting concepts. (S66–S70)
- Extraction — translated replenishment patterns into 10+ workflows (PO lifecycle, reorder rules, suggestions, inbound visibility, risk dashboards).
- Evidence indexing — extended stable source IDs for replenishment evidence and referenced them from feature bullets.
- OSS harvesting (light) — captured ERP and forecasting library pointers; flagged license posture for Step-04.

## Cycle 9 — 2025-12-29

- Planning — selected pricing & billing admin to cover revenue ops surfaces and customer self-serve billing needs.
- Web research — gathered evidence for subscription billing, invoices, proration, and tax ID workflows. (S71–S74)
- Extraction — translated billing surfaces into 10+ workflows (catalog/plans, subscription lifecycle, invoice list/detail, dunning settings).
- Evidence indexing — extended stable source IDs for billing evidence and referenced them from feature bullets.
- OSS harvesting (light) — captured OSS billing engine/testing tooling pointers; flagged license posture for Step-04.

## Cycle 10 — 2025-12-29

- Planning — selected fraud & risk to cover revenue protection and operational dispute handling.
- Web research — gathered evidence for fraud prevention/risk evaluation surfaces and dispute/chargeback lifecycles. (S77–S81)
- Extraction — translated risk workflows into 10+ features (risk panels, review queues, rules, disputes inbox, evidence packets, playbooks).
- Evidence indexing — extended stable source IDs for fraud/disputes evidence and referenced them from feature bullets.
- OSS harvesting (light) — captured OSS pointers for risk signal primitives and explainability; flagged license posture for Step-04.

## Cycle 11 — 2025-12-29

- Planning — selected finance analytics to connect billing, churn, and disputes into decision dashboards.
- Web research — gathered evidence for MRR and subscription metrics definitions plus SaaS metrics vocabulary. (S82–S86)
- Extraction — translated finance analytics needs into 10+ build-ready metrics/workflows (MRR, churn, cohorts, NRR bridge, drilldowns).
- Evidence indexing — extended stable source IDs for finance analytics evidence and referenced them from feature bullets.
- OSS harvesting (light) — captured BI/semantic layer pointers (Superset/Metabase/Cube) and flagged license posture for Step-04.

## Cycle 12 — 2025-12-29

- Planning — selected data import/export + integrations admin to cover operability surfaces (connectors, webhooks, bulk jobs).
- Web research — gathered evidence for webhook admin patterns, bulk export operations, and connector-based ELT models. (S87–S93)
- Extraction — translated integration control-plane needs into 10+ workflows (connector catalog, auth setup, webhook logs, retries, run history).
- Evidence indexing — extended stable source IDs for integration evidence and referenced them from feature bullets.
- OSS harvesting (light) — captured ELT/webhook OSS pointers (Airbyte/Meltano/Singer/Svix) and flagged license posture for Step-04.

## Cycle 13 — 2025-12-29

- Planning — selected mobile ops to cover frontline warehouse workflows and reduce latency from desktop-only tools.
- Web research — gathered evidence for barcode scanning workflows, offline support patterns, and push notification delivery. (S94–S100)
- Extraction — translated mobile operational needs into 8+ workflows (scan-to-receive, offline queues, mobile task inbox, evidence photos).
- Evidence indexing — extended stable source IDs for mobile evidence and referenced them from feature bullets.
- OSS harvesting (light) — captured OSS pointers for mobile scaffolding/storage/scanning primitives; flagged license posture and noted non-OSS SDK dependencies.

## Cycle 14 — 2025-12-29

- Planning — selected approvals & tasks to unify execution across returns/shipping/inventory and connect to mobile + automation.
- Web research — gathered evidence for task models, workflow transitions, issue tracking primitives, and approval routing patterns. (S101–S105)
- Extraction — translated task/approval patterns into 10+ build-ready workflows (task object, templates, approval inbox, escalations).
- Evidence indexing — extended stable source IDs for approvals/tasks evidence and referenced them from feature bullets.
- OSS harvesting (light) — captured OSS pointers for boards and playbooks (Focalboard/OpenProject/Outline) and flagged license posture for Step-04.

## Cycle 15 — 2025-12-29

- Planning — selected localization (multi-currency, translations, time zones) to cover international selling and global ops consistency.
- Web research — gathered evidence for markets/multi-currency concepts plus CLDR/ICU and i18n runtime patterns. (S106–S112)
- Extraction — translated localization primitives into build-ready workflows (locale defaults, FX snapshot, currency policies, translation QA, timezone-aware reporting).
- Evidence indexing — referenced stable source IDs (S106–S112) from each feature bullet for auditability.
- OSS harvesting (light) — captured OSS pointers for i18n runtime/message formatting and money math; flagged licenses for Step-04 verification.

## Cycle 16 — 2025-12-29

- Planning — selected observability (logs, tracing, alerts, SLOs) to cover operational control-plane needs for merchant admin + internal ops.
- Web research — gathered evidence for OpenTelemetry primitives, Prometheus alerting, Loki logging patterns, tracing UIs, and SLO/incident lifecycle concepts. (S113–S122)
- Extraction — translated observability primitives into build-ready workflows (log search, trace explorer, alert routing/silences, incident records, SLOs and burn-rate alerts).
- Evidence indexing — added stable source IDs S113–S122 and referenced them from every feature bullet.
- OSS harvesting (light) — captured OSS pointers for core observability stacks and flagged licenses for Step-04 verification (Loki/Tempo/SigNoz/Sentry).

## Cycle 17 — 2025-12-29

- Planning — selected admin IA (navigation, search, saved views, shortcuts) to reduce operator friction and repeated work across all ops domains.
- Web research — gathered evidence for saved views/filters/sorts, global search patterns, keyboard shortcuts, and advanced query language/syntax patterns. (S123–S128)
- Extraction — converted IA primitives into build-ready workflows (global search, command palette, saved views/defaults, deep links, table personalization, bulk actions).
- Evidence indexing — added stable source IDs S123–S129 and referenced them from each feature bullet; logged Shopify admin search as blocked evidence URL.
- OSS harvesting (light) — captured OSS pointers for command palette, shortcuts, fuzzy search, and table state; flagged license posture for Step-04 verification.

## Cycle 18 — 2025-12-29

- Planning — selected data governance (retention, exports, privacy requests) to cover compliance, risk reduction, and safe operational data handling.
- Web research — gathered evidence for GDPR/CCPA rights framing, DSAR/erasure guidance, privacy governance frameworks, and retention/audit patterns. (S130–S137)
- Extraction — translated governance requirements into build-ready workflows (retention policy registry + runs, legal hold, privacy request inbox, secure exports, delete/anonymize modes, governance audit logs).
- Evidence indexing — added stable source IDs S130–S137 and referenced them across all features for auditability.
- OSS harvesting (light) — captured OSS pointers for PII detection/anonymization and governance/catalog patterns; flagged licenses for Step-04 verification.

## Cycle 19 — 2025-12-29

- Planning — selected merchandising rules (search tuning, boosts, synonyms) to cover CRO-driving admin workflows.
- Web research — gathered evidence for rules/curation, synonyms, ranking and curation primitives, and autocomplete suggesters. (S138–S146)
- Extraction — translated search tuning needs into build-ready workflows (synonyms manager, pin/promote rules, zero-results playbooks, preview/sandbox, rollback).
- Evidence indexing — added stable source IDs S138–S146 and referenced them across feature bullets for auditability.
- OSS harvesting (light) — captured OSS pointers for search engines/primitives and flagged license posture for Step-04 verification.

## Cycle 20 — 2025-12-29

- Planning — selected catalog governance (product QA, bulk edits, versioning) to reduce operational errors and improve channel readiness.
- Web research — gathered evidence for product schemas/status, import/export workflows, and canonical product attribute models. (S147–S151)
- Extraction — translated catalog governance needs into build-ready workflows (status gating, bulk editor errors, CSV preflight, completeness rules, QA queues, change logs, rollback).
- Evidence indexing — added stable source IDs S147–S151 and referenced them across feature bullets; logged Shopify Help Center URLs as blocked evidence where applicable.
- OSS harvesting (light) — captured OSS pointers for PIM/data quality and CSV validation primitives; flagged license posture for Step-04 verification.

## Cycle 22 — 2025-12-29

- Planning — returned to returns/RMA to deepen “instant/printerless” workflows that reduce friction + tickets.
- Web research — gathered evidence for printerless/QR return labels, boxless drop-off returns, instant refunds/returns positioning, instant exchanges setup, and auto-refunds rules docs. (S160–S166)
- Extraction — mapped evidence into build-ready admin workflows (QR label delivery, boxless drop-off, auto-refunds rule, deposit/hold instant exchange, instant refund eligibility).
- Evidence indexing — added stable source IDs S160–S166 and referenced them from new/updated return feature bullets.
- OSS harvesting (light) — captured OSS building blocks for QR code and PDF label generation and flagged licenses for Step-04 verification.

## Cycle 23 — 2025-12-29

- Planning — selected subscription ops (skip/swap/pause, renewals, retries) to cover high-frequency retention + support load drivers for subscription merchants.
- Web research — gathered evidence for subscription lifecycle primitives, pause/reactivation workflows, subscription item update APIs, and bulk operations patterns. (S167–S171)
- Market scan — captured subscription platform positioning for subscriber portal expectations (skip/swap/pause, program ops). (S172–S175)
- Extraction — translated subscription lifecycle into build-ready workflows (upcoming order preview, skip/pause, swap/edit-next, renewal notices, payment-failure queues, dunning schedule, bulk migrations).
- OSS harvesting (light) — identified durable scheduling/execution primitives (Temporal/BullMQ/Quartz) and billing engine references (Kill Bill/Lago) for Step-04 license/fit validation.

## Cycle 24 — 2025-12-29

- Planning — selected returns analytics + fraud gating to cover margin leakage + operational consistency for high-volume returns programs.
- Web research — gathered evidence for returns/claims abuse magnitude and identity verification as a gating control (IDV/KYC). (S176–S178)
- Extraction — expanded returns features into measurable dashboards and policy controls (SLA metrics, method mix, exception rates, leakage audits, risk tiers, eligibility caps, analyst workbench).
- Evidence indexing — referenced S176–S178 alongside existing returns primitives (S1/S4/S166) for each new feature bullet.
- OSS harvesting (light) — captured OSS pointers for policy evaluation and risk monitoring/feature patterns (OPA + Evidently/Feast + scikit-learn; licenses flagged for Step-04).

## Cycle 25 — 2025-12-29

- Planning — selected shipping exceptions refresh to reduce WISMO and prevent silent tracking outages (missed scans, address issues, proactive comms).
- Web research — gathered evidence for tracking object models, webhooks, webhook debugging, branded tracking pages, and “missing mail” escalation framing. (S179–S186)
- Extraction — expanded shipping exception workflows into build-ready features (scan-gap v2, webhook debug console, comms suppression, address confirmation playbook, POR intake + policy).
- Evidence indexing — added stable source IDs S179–S186 and referenced them from each new feature bullet for auditability.
- OSS harvesting (light) — identified webhook delivery/observability and portal analytics accelerators (Svix + OTel + PostHog), with licenses flagged for Step-04 verification.

## Cycle 26 — 2025-12-29

- Planning — selected B2B subscription ops to cover procurement-driven billing workflows (accounts, quotes, invoices) and seat-based packaging controls.
- Web research — gathered evidence for account hierarchy, invoices, quotes, advance invoices, and entitlements/feature management patterns (Chargebee + Recurly). (S187–S193)
- Extraction — mapped B2B primitives into build-ready workflows (company account + contacts, quote→subscription, invoice net terms, PO capture, approvals, bulk contract updates).
- Evidence indexing — added stable source IDs S187–S193 and referenced them from each feature bullet for auditability.
- OSS harvesting (light) — captured OSS pointers for invoices/quotes patterns and policy/authorization controls (Invoice Ninja, Kill Bill, ERPNext, OpenFGA/OPA); licenses flagged for Step-04.

## Cycle 27 — 2025-12-29

- Planning — selected promotions measurement to close the loop on promo creation with ROI and incremental lift (cohorts + holdouts + definitions).
- Web research — gathered evidence for event taxonomy (GA4 events), experimentation/holdouts (GrowthBook OSS), semantic layer/metrics definitions (Cube), and cohort measurement (PostHog). (S194–S198)
- Extraction — translated measurement needs into build-ready workflows (redemption KPIs, discount spend, new vs returning, LTV cohorts, channel attribution, stacking overlap, abuse alerts, scheduled reports, metric registry).
- Evidence indexing — added stable source IDs S194–S199 and referenced them per feature bullet for auditability.
- OSS harvesting (light) — captured OSS pointers for experimentation, BI, transformations, and metrics modeling (GrowthBook, PostHog, Cube, dbt-core, Superset); licenses flagged for Step-04.

## Cycle 28 — 2025-12-30

- Planning — shifted Step-01 into a meta-pass: “build vs integrate” decisions per feature cluster (Shopify API vs 3P APIs vs OSS vs custom).
- Docs lookup — verified Shopify Admin GraphQL primitives exist for returns, refunds, and store credit via gift cards. (S200–S202)
- Synthesis — wrote a reusable decision rubric and matrix format to apply tranche-by-tranche without re-litigating criteria each cycle.
- Extraction — classified core Returns/RMA workflows into (a) custom UX/policy (b) Shopify primitives (Return/Refund/GiftCard) and (c) logistics 3P APIs for labels + scan events.

## Cycle 29 — 2025-12-30

- Planning — selected Shipping/Delivery exceptions as the next tranche to classify (Shopify fulfillment truth vs carrier scan events vs ops inbox UX).
- Docs lookup — validated Shopify Admin GraphQL primitives for fulfillments, fulfillment orders, webhook subscription listing, and fulfillment holds. (S203–S209)
- Extraction — mapped shipping features into the most leveraged split: Shopify for tracking numbers + holds; 3P tracking APIs for scan events; custom for canonical status, exception queue, playbooks, comms, and analytics.
- Evidence indexing — extended the sources index with S203–S209 to avoid relying on blocked Shopify Help pages for fulfillment/hold features.

## Cycle 30 — 2025-12-30

- Planning — selected Analytics & QA to classify “build vs integrate” for dashboards, metric governance, and QA workflows.
- Docs lookup — validated Shopify Admin GraphQL order querying and bulk export primitives as the backbone for our analytics warehouse ingestion. (S210–S211)
- Extraction — mapped analytics features into: 3P support APIs for ticket truth, Shopify APIs/webhooks for commerce truth, and custom-built metric dictionary + dashboards on derived tables.
- Synthesis — identified OSS as optional acceleration for semantic layer + transformations + BI, not for QA/coaching workflows.

## Cycle 31 — 2025-12-30

- Planning — selected Security & compliance to classify “build vs integrate” for RBAC, SSO, MFA, audit logs, approvals, and key management.
- Docs lookup — validated Shopify Admin GraphQL primitives for staff listing, app access scopes introspection, and events feed to support “integration posture” inputs. (S212–S214)
- Extraction — mapped security features into: OSS authorization engines (OPA/OpenFGA), hosted/OSS IdP (Keycloak/Okta/Entra) for SSO+MFA, and custom-built admin surfaces for roles UI, approvals, audit log UX, and posture checklist.
- Evidence indexing — added S212–S214 sources so security posture discussion can reference stable Shopify dev docs rather than blocked Shopify Help pages.

## Cycle 32 — 2025-12-30

- Planning — selected Observability to classify “build vs integrate” for logs/traces/alerts/SLOs and operational runbooks.
- Web research — gathered stable evidence for OSS observability primitives (OpenTelemetry Collector, Prometheus, Grafana) and error tracking workflows (Sentry). (S215–S220)
- Extraction — mapped observability features to “use OSS/hosted backends; build minimal ops surfaces” (saved playbook queries, runbook links, integration health views).
- Evidence indexing — added S215–S220 so observability decisions are backed by stable upstream docs.

## Cycle 33 — 2025-12-30

- Planning — selected Subscription ops to classify “build vs integrate” for subscriber portal actions and billing recovery workflows.
- Docs lookup — validated Shopify Admin GraphQL subscription primitives (contracts, drafts, billing attempts) and Shopify subscription app conceptual docs. (S221–S228)
- Extraction — mapped subscription features into: Shopify subscription contract truth + custom portal UX (skip/pause/swap/cancel) + derived queues (failed billing attempts) + optional OSS scheduler for retries/batch jobs.
- Evidence indexing — added S221–S228 to ground subscription decisions in stable Shopify dev docs.

## Cycle 34 — 2025-12-30

- Planning — selected Approvals & tasks to classify “build vs integrate” for ops execution backbones (tasks, approvals, reminders).
- Web research — gathered stable evidence for OSS queue/scheduler primitives to power delayed jobs, retries, and time-based escalations. (S229–S230)
- Extraction — mapped approvals/tasks into: custom UX + data model for tasks/approvals + audit, plus OSS queues/schedulers for reminders/escalations, plus 3P comms for notifications.
- Evidence indexing — added S229–S230 to avoid hand-wavy “we’ll add a queue” claims without pointers.

## Cycle 35 — 2025-12-30

- Planning — selected Returns analytics + fraud gating to classify “build vs integrate” for risk scoring, policy enforcement, and leakage audits.
- Docs lookup — validated Shopify OrderRisk object as a potential input signal and reinforced Shopify Return/Refund as source-of-truth primitives. (S231, S200, S202)
- Extraction — mapped fraud gating features into: custom risk scoring + analyst workbench + audit trails, 3P IDV for high-risk segments, and OSS policy engines (OPA) as optional for versioned decisions.
- Evidence indexing — added S231 so “risk signal” claims can reference stable Shopify dev docs.

## Cycle 36 — 2025-12-30

- Planning — selected Admin IA to classify “build vs integrate” for global search, saved views, and power-user shortcuts.
- Web research — gathered stable evidence for OSS admin scaffolding and UI primitives (React Admin, Refine, TanStack Table, cmdk/kbar) and OSS search engines (Meilisearch/Typesense). (S232–S238)
- Extraction — mapped Admin IA into custom ops-native UX over OSS building blocks, and tied permission-aware navigation to the OSS authz layer (OPA/OpenFGA).
- Evidence indexing — added S232–S238 to ground UI building-block recommendations in concrete upstream docs.

## Cycle 37 — 2025-12-30

- Planning — selected Merchandising rules to classify “build vs integrate” for synonyms, pinning, facets, and typeahead.
- Docs lookup — validated Shopify catalog primitives (products/collections/metafields) as the feed for search indexes, and search tooling docs (Algolia/Elastic) as reference for tuning knobs. (S239–S243)
- Extraction — mapped merchandising into custom rules UI that writes to the search layer (OSS/hosted search engine) rather than trying to tune Shopify’s built-in search surfaces.
- Evidence indexing — added S239–S243 to ground “external search layer” recommendations in stable docs.

## Cycle 38 — 2025-12-30

- Planning — selected Catalog governance to classify “build vs integrate” for bulk edits, imports/exports, completeness, and change history.
- Docs lookup — validated Shopify catalog mutation primitives for executing governed changes (productCreate/productUpdate/productSet, variants bulk create, metafieldsSet). (S244–S246)
- Extraction — mapped catalog governance into custom QA/bulk UX + internal job/audit metadata, while keeping Shopify as source-of-truth for product state and executing changes via Shopify mutations.
- Evidence indexing — added S244–S246 to ground catalog governance decisions in stable Shopify dev docs.

## Cycle 39 — 2025-12-30

- Planning — selected Promotions admin to classify “build vs integrate” for discount creation, lifecycle, bulk ops, and measurement hooks.
- Docs lookup — validated Shopify discount primitives (discount nodes, create mutations, list/count queries) as source-of-truth for promo objects. (S152–S155, S247)
- Extraction — mapped promotions into: Shopify for discount truth and application, custom admin UX for governance (preview, audit, bulk ops), and custom measurement/abuse monitoring on top of an event+metrics layer.
- Evidence indexing — added S247 to avoid relying on blocked Shopify Help pages for promo list/reporting surfaces.

## Cycle 40 — 2025-12-30

- Planning — selected Data governance to classify “build vs integrate” for retention, DSAR intake, exports, and deletion workflows.
- Docs lookup — validated privacy rights framing sources (GDPR/ICO/NIST) and Shopify bulk export primitives for DSAR packs. (S130–S134, S211)
- Extraction — mapped governance into: custom policy registry + inbox workflows + secure delivery + audit logs, plus OSS schedulers/jobs for enforcement runs and previews.

## Cycle 41 — 2025-12-30

- Planning — selected Mobile ops to classify “build vs integrate” for frontline scanning, offline sync, push alerts, and POS extension vs standalone app decision.
- Docs lookup — gathered stable upstream evidence for push notifications (Expo) and the Shopify POS UI Extensions surface. (S248, S249)
- Extraction — mapped mobile ops into: custom React Native UX + offline queues + sync rules, while keeping inventory/transfer truth in Shopify and optionally embedding experiences inside POS.
- Evidence indexing — ensured mobile surface evidence is captured in `sources.md` and referenced from the build-vs-integrate matrix.

## Cycle 42 — 2025-12-30

- Planning — selected Finance analytics to classify “build vs integrate” for transaction ledgers, payouts/fees, disputes, and reconciliation.
- Docs lookup — validated Shopify Admin API finance primitives (shopifyPaymentsAccount, ShopifyPaymentsBalanceTransaction, ShopifyPaymentsDispute, OrderTransaction). (S250–S254)
- Extraction — mapped finance into: Shopify as truth for orders/refunds/transactions and Shopify Payments as truth for payouts/balance/disputes (if enabled), with custom derived tables and reconciliation UX for reporting/alerts.
- Evidence indexing — added S250–S254 to `sources.md` to ground finance recommendations in stable Shopify dev docs (avoiding blocked Help/Reports pages).

## Cycle 43 — 2025-12-30

- Planning — selected Pricing & billing admin (app billing) to classify “build vs integrate” for plan tiers, upgrades, cancellations, one-time charges, and usage-based billing.
- Docs lookup — validated Shopify billing docs and Admin GraphQL billing mutations (appSubscriptionCreate/cancel, appPurchaseOneTimeCreate, appUsageRecordCreate). (S255–S259)
- Extraction — mapped billing into: Shopify billing as truth (charges/usage records), custom plan catalog + entitlements + billing admin UX, and external billing providers only when Shopify billing isn’t applicable.
- Evidence indexing — added S255–S259 to `sources.md` to ground billing recommendations in stable Shopify dev docs.

## Cycle 44 — 2025-12-30

- Planning — selected Integrations admin to classify “build vs integrate” for connector setup, webhook inventory, delivery logs, retries/DLQ, bulk exports, and integration health.
- Docs lookup — reused existing evidence for Shopify webhooks, bulk operations, and integration/wbhook delivery models (Shopify webhooks, webhookSubscriptions, bulkOperationRunQuery; Svix, Airbyte, Meltano). (S89, S206, S211, S93, S91, S92)
- Extraction — mapped integrations into: Shopify-side primitives (subscriptions, bulk exports) + custom operability UX (health, retries, alerting) + OSS jobs for sync reliability (BullMQ) and optional connector frameworks for ELT-style syncs. (S229, S91, S92)

## Cycle 45 — 2025-12-30

- Planning — selected Inventory/Fulfillment exceptions to classify “build vs integrate” for multi-location inventory, cycle counts, adjustments, and fulfillment order aging queues.
- Docs lookup — validated stable Shopify Admin GraphQL inventory primitives (Location, InventoryItem, InventoryLevel, adjust/set quantities, activate inventory) and reused fulfillment order primitives as the upstream truth model. (S260–S266, S204)
- Extraction — mapped this tranche into: Shopify as truth for inventory and fulfillment objects, custom exception queues/playbooks and approvals for safe ops, and OSS jobs for anomaly detection and bulk fix automation. (S229, S65)

## Cycle 46 — 2025-12-30

- Planning — selected Support desk ops to classify “build vs integrate” for queues, SLAs, routing/macros, CSAT/KPIs, and cross-domain joins (ticket ↔ order ↔ shipment).
- Evidence reuse — relied on existing support desk primitives evidence (macros, rules, auto-assign, views, SLAs, CSAT) plus Shopify orders/fulfillment primitives for joins. (S30–S32, S35–S37, S39–S40, S210, S203)
- Extraction — mapped support ops into “integrate-first”: keep ticket truth in the support platform, build a custom ops control plane for joined drilldowns + automation/auditability, and use OSS jobs/workflows for reminders and rule runs. (S55, S229, S65)

## Cycle 47 — 2025-12-30

- Planning — selected Workflow builder/automation to classify “build vs integrate” for triggers/actions, durable execution, approvals, and run history.
- Evidence reuse — relied on workflow model references (n8n/Zapier/Node-RED/Shopify Flow) and durable execution primitives (Temporal) plus Shopify API action targets and OSS job queues. (S50–S55, S89, S200, S202, S229)
- Extraction — mapped automation into: OSS workflow engine for retries/timers/idempotency + custom playbook UX + strong run-history/auditability, avoiding “Shopify Flow parity” as a goal. (S55, S65)

## Cycle 48 — 2025-12-30

- Planning — selected Fraud & risk to classify “build vs integrate” for risk scoring, review queues, refund gating, holds, disputes/chargebacks, and evidence workflows.
- Evidence reuse — relied on Shopify OrderRisk + refunds + fulfillment holds and processor fraud/dispute references (Stripe Radar + disputes lifecycle/evidence; Shopify Payments disputes object). (S231, S200, S208–S209, S77–S79, S254)
- Extraction — mapped fraud/risk into: custom policy registry + analyst workbench + audit trails, with enforcement actions executed via Shopify primitives and processor-specific dispute flows isolated behind integration boundaries.
- Docs lookup — added Stripe Identity as an optional gated add-on for high-risk segments. (S267)

## Cycle 49 — 2025-12-30

- Planning — prioritized reducing drift by writing a “default architecture one-pager” that makes build-vs-integrate decisions repeatable across new tranches.
- Synthesis — consolidated system-of-record boundaries (Shopify vs 3P vs our app) and the default data flow (webhooks/bulk backfill → derived DB → jobs/workflows → Shopify side-effects). (S89, S211, S55, S229)
- Extraction — wrote a 5-question decision tree and a minimum internal data model to make thin-slice scoping consistent (events, runs, tasks, approvals, audit events, derived metrics). (S65, S196, S101)

## Cycle 50 — 2025-12-30

- Planning — selected Inventory forecasting/replenishment to classify “build vs integrate” for reorder rules, purchasing workflows, receiving, and optional forecasting.
- Evidence reuse — relied on purchase order/replenishment references (Shopify/Stocky), reordering rules patterns (Odoo/ERPNext), and Shopify inventory primitives (inventory levels + adjustments) plus jobs/alerts primitives. (S66–S70, S263–S265, S229)
- Extraction — mapped replenishment into: Shopify as truth for inventory, custom rules/PO/receiving UX as product surfaces, and forecasts as optional derived inputs rather than system-of-record.

## Cycle 51 — 2025-12-30

- Planning — selected Localization to classify “build vs integrate” for multi-currency context, UI translations, and locale formatting.
- Evidence reuse — relied on Shopify multi-currency/Markets references and standard locale/i18n tooling (CLDR/ICU/FormatJS/i18next/Dinero.js). (S106–S112)
- Extraction — mapped localization into “two layers”: Shopify for commerce context truth (markets/currencies), OSS for our UI localization and formatting correctness, and custom UX for user preferences and QA surfaces.

## Cycle 52 — 2025-12-30

- Planning — selected a consistency pass to reduce drift after adding multiple new tranches in a row.
- Editing — added explicit “default architecture alignment” notes to the newest tranches so each one states truth vs derived and references the one-pager in `artifacts/build-vs-integrate-agent.md`.
- Synthesis — reinforced a consistent system-of-record posture across billing, integrations, inventory, support, workflows, risk, replenishment, and localization.

## Cycle 53 — 2025-12-30

- Planning — selected Customer self-serve/deflection to classify “build vs integrate” for order status, tracking, help center search, and structured intake.
- Evidence reuse — relied on Shopify order status/accounts references and AfterShip tracking UX/API references plus notifications sources. (S44–S48, S46, S15)
- Extraction — mapped self-serve into Shopify surfaces as truth, tracking providers for scan-event timelines, and custom intake + task creation + deflection analytics as our product value.

## Cycle 54 — 2025-12-30

- Planning — selected Analytics & QA to classify “build vs integrate” for measurement (KPIs/rollups), joined drilldowns, and QA program workflows.
- Evidence reuse — relied on support analytics/CSAT/agent performance definitions and QA rubric concepts, plus Shopify order/fulfillment primitives and analytics plumbing references (dbt/Cube). (S37–S41, S210–S211, S196–S197)
- Extraction — mapped analytics into derived warehouse tables + semantic layer and kept QA workflows (rubrics, sampling, coaching) as custom product surfaces with jobs for sampling schedules. (S41, S229, S55)

## Cycle 55 — 2025-12-30

- Planning — selected Promotions measurement to classify “build vs integrate” for ROI dashboards, cohorts, holdouts/experiments, stacking overlap, and abuse monitoring.
- Evidence reuse — relied on Shopify discount inventory primitives + order truth, plus experimentation/event/analytics plumbing references (GrowthBook, GA4 events, PostHog, Snowplow) and OSS jobs for scheduled monitoring. (S247, S210, S195, S194, S198, S199, S229)
- Extraction — mapped promos measurement into: Shopify for promo/order truth, our derived metric tables and registry for KPI governance, OSS experimentation tooling for holdouts, and custom abuse monitoring alerts.

## Cycle 56 — 2025-12-30

- Planning — selected Shipping exceptions refresh to classify “build vs integrate” for scan-gap detection, webhook delivery diagnostics, and claims/playbook flows.
- Evidence reuse — relied on tracking provider scan-event webhooks and webhook debugging references, plus Shopify holds/refunds primitives and notifications primitives. (S179, S182, S186, S208–S209, S200, S15)
- Extraction — mapped shipping exceptions into: tracking provider for scan events truth, Shopify for holds/refunds truth, and our custom exception inbox + playbooks + delivery observability as differentiated ops UX (with jobs for timers/escalations). (S229, S35)

## Cycle 57 — 2025-12-30

- Planning — selected a consolidation pass to reduce duplication between Shipping exceptions foundations (Tranche #2) and the Shipping exceptions refresh/extensions tranche (Tranche #25).
- Editing — added explicit “foundation vs extensions” notes in `artifacts/build-vs-integrate-matrix.md` to guide sequencing and prevent implementing v2 diagnostics without v1 ingestion foundations.
- Synthesis — reinforced the “base + extensions” pattern for evolving tranches so the matrix remains implementation-friendly.

## Cycle 58 — 2025-12-30

- Planning — selected B2B subscription ops (Tranche #26) to classify “build vs integrate” for account hierarchy, quotes, invoices, entitlements, and Shopify-native subscription contracts.
- Evidence reuse — relied on Chargebee/Recurly billing primitives (account hierarchy/quotes/invoices/entitlements) and Shopify subscription primitives (contracts/drafts/billing attempts) without new web lookups. (S187–S193, S221–S227)
- Extraction — mapped the domain into a “two-mode” architecture: Shopify-native subscriptions (Shopify truth) vs billing-provider-led B2B (provider truth), with our app as the ops control plane (queues/approvals/audit). (S188–S190, S221–S226, S65)
- Editing — added tranche #26 section + rows to `artifacts/build-vs-integrate-matrix.md` with thin slices and explicit truth-vs-derived boundaries.

## Cycle 59 — 2025-12-30

- Planning — selected tranche #23 “Subscription ops” for a consistency pass after adding B2B billing tranche #26.
- Evidence alignment — removed/adjusted mismatched evidence IDs and tightened “source-of-truth” language so Shopify billing-attempt evidence isn’t mixed with external billing evidence. (S221–S227, S229)
- Editing — refactored tranche #23 into explicit modes (Shopify-native vs subscription provider vs B2B billing-provider mode) and cross-linked to tranche #26 to avoid implementing invoicing inside consumer subscription ops. (S228, S172–S175, S187–S193)
- Synthesis — captured the durable pattern: unify UX, branch write paths; store only derived ops state internally with auditability. (S65)
