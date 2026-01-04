# Rolling Context (read first)

Keep this compact and current. This file is the “always read” memory.

## Current goal

- Build a comprehensive “feature universe” for e-commerce merchant admin + ops workflows, with stealable workflows and thin-slice scopes.
- Keep evidence-first: every feature/workflow includes URLs (or evidence files) and stable source IDs in `artifacts/sources.md`.

## Current assumptions / constraints

- Role: step-01 (feature hunt + initial OSS pointers only; deep OSS mapping is Step-04).
- License posture: prefer MIT/Apache/BSD; flag GPL/AGPL/BUSL/SUL/ELv2/unknown for later review.
- Work in 45-minute cycles; each cycle updates artifacts + writes a checkpoint step file.

## Current best candidates / hypotheses

- Returns/exchanges are a high-leverage ops area: policies + resolutions + logistics events + analytics.
- Shipping exceptions and delivery tracking are the next highest-leverage ops/support reducers (proactive status + exception queues).
- Inventory/fulfillment exceptions are the next core ops driver: multi-location routing, split/merge fulfillment, transfers/receiving, and backorder controls.
- Support desk ops is the “control plane” that ties exceptions into a queue + automation + SLA discipline (macros/rules/views).
- Analytics & QA is the “measurement layer”: CSAT + performance + rubric-based QA + coaching loops.
- Customer self-serve/deflection is the “front door”: order status/tracking, accounts, help center + search, and structured contact intake.
- Workflow builder/automation is the “glue”: a consistent trigger/action/condition system that runs cross-domain ops playbooks with auditability.
- Security & compliance is the “guardrail layer”: permissions, strong auth, audit trails, and approvals that make ops safe.
- Inventory forecasting/replenishment is the “planning layer”: reorder rules + purchasing workflows + optional forecasting.
- Fraud & risk is the “loss prevention layer”: risk scoring, review queues, disputes lifecycle, and return-fraud gating.
- Finance analytics is the “exec layer”: MRR/churn/cohorts/LTV with drilldowns tied to billing events and disputes.
- Integrations admin is the “operability layer”: connector setup, webhook delivery observability, bulk import/export, and retries.
- Mobile ops is the “frontline layer”: scanning, offline queues, push alerts, and task execution in warehouses/stores.
- Approvals & tasks is the “execution backbone”: tasks, playbooks, and approvals unify cross-domain ops work.

## Open questions / decisions needed

1) For exchanges: handle price deltas via split tender vs “credit-only delta” for thin slice?
2) For shipping exceptions: when to notify and when to auto-create tasks (scan events vs manual rules)?

## Recent progress (latest 3–5)

- Tranche #1 completed: Returns/Exchanges/RMA feature cluster expanded with workflows + thin slices and sources S1–S9.
- OSS pointers list seeded for returns-adjacent patterns (to be deepened in Step-04).
- Tranche #2 completed: Shipping/delivery exceptions feature cluster expanded with workflows + thin slices and sources S10–S19.
- Tranche #3 started: Inventory/fulfillment exceptions feature cluster expanded with workflows + thin slices and sources S20–S29.
- Tranche #4 started: Support desk ops feature cluster expanded with workflows + thin slices and sources S30–S36.
- Tranche #5 started: Analytics & QA feature cluster expanded with workflows + thin slices and sources S37–S41.
- Tranche #6 started: Customer self-serve/deflection feature cluster expanded with workflows + thin slices and sources S42–S49.
- Tranche #7 started: Workflow builder/automation feature cluster expanded with workflows + thin slices and sources S50–S55.
- Tranche #8 started: Security & compliance feature cluster expanded with workflows + thin slices and sources S56–S65.
- Tranche #9 started: Inventory forecasting/replenishment feature cluster expanded with workflows + thin slices and sources S66–S70.
- Tranche #10 started: Pricing & billing admin feature cluster expanded with workflows + thin slices and sources S71–S76.
- Tranche #11 started: Fraud & risk feature cluster expanded with workflows + thin slices and sources S77–S81.
- Tranche #12 started: Finance analytics feature cluster expanded with workflows + thin slices and sources S82–S86.
- Tranche #13 started: Integrations admin feature cluster expanded with workflows + thin slices and sources S87–S93.
- Tranche #14 started: Mobile ops feature cluster expanded with workflows + thin slices and sources S94–S100.
- Tranche #15 started: Approvals & tasks feature cluster expanded with workflows + thin slices and sources S101–S105.
- Tranche #16 started: Localization feature cluster expanded (multi-currency, translations, time zones) with workflows + thin slices and sources S106–S112.
- Tranche #17 started: Observability feature cluster expanded (logs, tracing, alerts, SLOs) with workflows + thin slices and sources S113–S122.
- Tranche #18 started: Admin IA feature cluster expanded (navigation, search, saved views, shortcuts) with workflows + thin slices and sources S123–S129.
- Tranche #19 started: Data governance feature cluster expanded (retention, exports, privacy requests) with workflows + thin slices and sources S130–S137.
- Tranche #20 started: Merchandising rules feature cluster expanded (search tuning, boosts, synonyms) with workflows + thin slices and sources S138–S146.
- Tranche #21 started: Catalog governance feature cluster expanded (product QA, bulk edits, versioning) with workflows + thin slices and sources S147–S151.
- Tranche #22 started: Promotions admin feature cluster expanded (coupons, discounts, eligibility) with workflows + thin slices and sources S152–S159.
- Returns tranche #1 refreshed: added printerless QR labels, boxless drop-off, instant refunds/returns, instant exchange authorization, and auto-refunds rules with sources S160–S166.
- Tranche #23 started: Subscription ops feature cluster expanded (skip/swap/pause, renewals, retries) with workflows + thin slices and sources S167–S175.
- Tranche #24 started: Returns analytics + fraud gating feature cluster expanded (dashboards, risk scoring, ID verification gating, leakage audits) with sources S176–S178 (plus returns primitives S1/S4/S166).
- Tranche #25 started: Shipping exceptions refresh feature cluster expanded (missed scans v2, webhook debugging, branded tracking page v2, address issue playbook, POR workflow) with sources S179–S186.
- Tranche #26 started: B2B subscription ops feature cluster expanded (accounts + hierarchy, seats/entitlements, quotes, invoice workflows, approvals) with sources S187–S193.
- Tranche #27 started: Promotions measurement feature cluster expanded (ROI dashboards, cohorts/LTV, holdouts, abuse monitoring, metric registry) with sources S194–S199.
- Build-vs-integrate evaluation started: created rubric + matrix and classified Tranche #1 Returns/RMA into Shopify API vs 3P APIs vs OSS vs custom build. (S200–S202)
- Build-vs-integrate evaluation continued: classified Tranche #2 Shipping/Delivery exceptions into Shopify fulfillment truth + 3P tracking webhooks + custom exception ops inbox/playbooks. (S203–S209, S182, S186)
- Build-vs-integrate evaluation continued: classified Tranche #5 Analytics & QA into “Shopify + support platform APIs → our DB/warehouse → derived dashboards”, with OSS optional for semantic layer/ETL. (S210–S211, S196–S197)
- Build-vs-integrate evaluation continued: classified Tranche #8 Security & compliance into OSS authorization + IdP (SSO/MFA) with custom audit log UX, approvals, and posture checklist. (S61–S65, S212–S214)
- Build-vs-integrate evaluation continued: classified Tranche #17 Observability into OSS/hosted observability stacks plus custom ops surfaces (runbooks, saved queries, integration health). (S113–S122, S215–S220)
- Build-vs-integrate evaluation continued: classified Tranche #23 Subscription ops into Shopify subscription contract primitives + custom portal/policy UX and derived queues for billing recovery. (S221–S228, S225–S226)
- Build-vs-integrate evaluation continued: classified Tranche #15 Approvals & tasks into custom task/approval UX plus OSS queues/schedulers for reminders/escalations. (S101–S105, S229–S230)
- Build-vs-integrate evaluation continued: classified Tranche #24 Returns analytics + fraud gating into Shopify Return/Refund truth plus custom risk/policy workbench and optional 3P IDV. (S200, S202, S176–S178, S231)
- Build-vs-integrate evaluation continued: classified Tranche #18 Admin IA into custom ops-native UX plus OSS admin building blocks (tables/search/command palette) and permission-aware nav tied to the authz layer. (S232–S238, S61–S62)
- Build-vs-integrate evaluation continued: classified Tranche #20 Merchandising rules into Shopify catalog truth feeding an external search layer plus custom merch tuning UI (synonyms, pinning, facets). (S239–S243, S242)
- Build-vs-integrate evaluation continued: classified Tranche #21 Catalog governance into Shopify catalog truth plus custom QA/bulk edit UX and internal governance metadata. (S244–S246, S149, S65)
- Build-vs-integrate evaluation continued: classified Tranche #22 Promotions admin into Shopify discount primitives for truth plus custom ops UX and measurement/abuse monitoring layer. (S152–S155, S247, S196)
- Build-vs-integrate evaluation continued: classified Tranche #19 Data governance into custom retention/DSAR/export workflows plus OSS jobs for enforcement and strong auditability. (S130–S137, S211, S229)
- Build-vs-integrate evaluation continued: classified Tranche #14 Mobile ops into custom mobile execution UX + OSS/offline primitives, with optional Shopify POS extension surface and push infra for alerts. (S94–S100, S248, S249)
- Build-vs-integrate evaluation continued: classified Tranche #12 Finance analytics into Shopify orders/refunds/transactions truth + Shopify Payments primitives + custom derived reporting and reconciliation tooling. (S210, S200, S250–S254)
- Build-vs-integrate evaluation continued: classified Tranche #10 Pricing & billing admin (app billing) into Shopify Billing API primitives + custom plan/entitlement UX, with external billing provider only when Shopify billing is not applicable. (S255–S259)
- Build-vs-integrate evaluation continued: classified Tranche #13 Integrations admin into Shopify webhooks/bulk ops primitives plus custom operability UX (delivery logs, retries, DLQ, alerts), with OSS/3P as optional connector and webhook delivery layers. (S206, S89–S93, S211, S229)
- Build-vs-integrate evaluation continued: classified Tranche #3 Inventory/Fulfillment exceptions into Shopify inventory primitives as truth + custom exception UX + OSS jobs for anomaly detection and safe bulk ops. (S260–S266, S204, S229)
- Build-vs-integrate evaluation continued: classified Tranche #4 Support desk ops into “integrate support platform APIs + build joined ops control plane + optional OSS workflows/jobs”, anchored on queues/SLAs/macros and Shopify order joins. (S30–S32, S35–S37, S39–S40, S210, S55, S229)
- Build-vs-integrate evaluation continued: classified Tranche #7 Workflow builder/automation into OSS workflow engine execution + custom playbook UX, with Shopify and 3P APIs as action targets and strong run-history auditability. (S50–S55, S65, S89, S200, S202, S229)
- Build-vs-integrate evaluation continued: classified Tranche #11 Fraud & risk into Shopify risk/dispute primitives + processor APIs + custom risk analyst UX/policies/queues and auditability. (S231, S254, S77–S79, S65)
- Build-vs-integrate evaluation continued: tightened the default architecture decision tree and system-of-record boundaries in `artifacts/build-vs-integrate-agent.md` to reduce drift when classifying new tranches. (S89, S211, S55, S229, S65)
- Build-vs-integrate evaluation continued: classified Tranche #9 Inventory forecasting/replenishment into Shopify inventory truth + custom rules/PO/receiving UX + optional forecasting as derived input, with OSS jobs for alerts and scheduling. (S263, S66–S70, S229)
- Build-vs-integrate evaluation continued: classified Tranche #16 Localization into Shopify markets/currency truth + OSS i18n/formatting libraries + custom preference/QA surfaces. (S106–S112)
- Build-vs-integrate evaluation continued: ran a matrix consistency pass to align the newest tranches to the default architecture one-pager and reduce second-source-of-truth drift. (`artifacts/build-vs-integrate-agent.md`)
- Build-vs-integrate evaluation continued: classified Tranche #6 Customer self-serve/deflection into Shopify self-serve surfaces + 3P tracking events + custom intake/analytics, keeping order truth in Shopify. (S44–S48, S202, S15)
- Build-vs-integrate evaluation continued: classified Tranche #5 Analytics & QA into “upstream truth → derived warehouse tables → dashboards” plus custom QA workflows (rubrics/sampling/coaching), with OSS for transformations/semantic layer. (S37–S41, S210–S211, S196–S197)
- Build-vs-integrate evaluation continued: classified Tranche #27 Promotions measurement into Shopify discount/order truth + derived event/metric tables + optional experimentation/holdouts and abuse monitoring. (S247, S210, S195–S199, S229)
- Build-vs-integrate evaluation continued: classified Tranche #25 Shipping exceptions refresh into Shopify fulfillment/holds/refunds truth + tracking provider scan events + custom exception inbox/playbooks + webhook delivery diagnostics. (S179, S182, S186, S208–S209, S206)
- Build-vs-integrate evaluation continued: consolidated Shipping exceptions by marking Tranche #2 as foundations and Tranche #25 as extensions (v2 refresh) to reduce duplication and improve sequencing. (`artifacts/build-vs-integrate-matrix.md`)
- Build-vs-integrate evaluation continued: classified Tranche #26 B2B subscription ops into “Shopify subscription contracts OR billing-provider-led B2B billing truth” with our app as the ops control plane (queues/approvals/audit), explicitly avoiding a second billing system of record. (S187–S193, S221–S227, S229, S65)
- Build-vs-integrate evaluation continued: updated Tranche #23 Subscription ops to explicitly separate Shopify-native subscriptions vs subscription-provider mode vs B2B billing-provider mode (cross-link to Tranche #26) and corrected evidence alignment for billing failure queues and timers. (S221–S228, S172–S175, S187–S193, S229)
