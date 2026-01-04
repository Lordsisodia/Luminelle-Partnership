---
compaction: 0003
created_at: "2025-12-29 22:20"
range: "0019-0028"
max_bytes: 1048576
per_step_budget_bytes: 98304
---

# Compaction 0003 (0019–0028)

## ✅ Summary (fill this after compaction)

- <3–7 bullets capturing the durable takeaways>

## 🧩 Patterns / heuristics (fill this after compaction)

- Prompt improvements:
- Checklist improvements:
- Better stop conditions:

## Steps compacted (trimmed)

### 0019_checkpoint-cycle-17-admin-ia-feature-universe-evidence.md

---
step: 0019
created_at: "2025-12-29 21:08"
title: "Checkpoint: Cycle 17 — Admin IA feature universe + evidence"
---

# Step 0019: Checkpoint: Cycle 17 — Admin IA feature universe + evidence

## ✅ What I did (facts)

- Added tranche #18 “Admin IA (navigation, search, saved views, shortcuts)” to `artifacts/features-catalog.md` with 16 build-ready feature bullets (each includes workflow + thin slice + evidence).
- Added evidence sources S123–S129 to `artifacts/sources.md` (saved views; global search; shortcuts; advanced query language patterns; fuzzy search primitives), plus a Shopify Admin search URL logged as blocked evidence.
- Appended reproducible queries to `artifacts/search-log.md` (Admin IA + OSS discovery).
- Added OSS pointers (pointers only; no deep evaluation) for command palette, keyboard shortcuts, fuzzy search, and table/list state to `artifacts/oss-catalog.md` and flagged licenses for Step-04 verification.
- Updated cycle bookkeeping artifacts: `artifacts/summary.md`, `artifacts/output-index.md`, `artifacts/skills-log.md`, `artifacts/prompt-log.md`, and rolling `context/context.md`.

## 🧠 What I learned (new information)

- Admin IA is a cross-cutting leverage area: saved views + deep links turn “ops work” into repeatable queues, not ad-hoc filtering. (S123)
- A scalable approach is “basic search + filters” first, then “power search” via qualifiers/query syntax instead of exploding the UI with filter widgets. (S127, S128)
- Keyboard-first surfaces (shortcuts + ⌘K palette) are the fastest thin slices for experienced operators, especially when combined with fuzzy search. (S125, S129)

## 🧭 What changes because of this

- Adds a new feature cluster that reduces friction across every other domain (returns/shipping/support/fraud): search, views, and navigation primitives now have concrete thin slices to ship.
- Produces an obvious “thin-slice order”: saved views + deep links → global search → ⌘K palette → table personalization + bulk actions.
- Gives Step-04 a clean OSS shortlist to validate for license + adoption (cmdk/kbar, Fuse/FlexSearch, react-hotkeys-hook, TanStack Table, react-window).

## ➡️ Next step

- Start Cycle 18 tranche on **Data governance (data retention, exports, privacy requests)** with N=15–20 feature bullets + evidence + 3–8 OSS pointers.

## 🔗 Links / references

- `artifacts/features-catalog.md` — tranche #18 admin IA section with workflows + thin slices
- `artifacts/sources.md` — evidence IDs S123–S129
- `artifacts/oss-catalog.md` — admin IA OSS pointers (pointers only)
- `artifacts/search-log.md` — admin IA queries and OSS discovery queries

---

### 0020_checkpoint-cycle-18-data-governance-feature-universe-evidence.md

---
step: 0020
created_at: "2025-12-29 21:14"
title: "Checkpoint: Cycle 18 — Data governance feature universe + evidence"
---

# Step 0020: Checkpoint: Cycle 18 — Data governance feature universe + evidence

## ✅ What I did (facts)

- Added tranche #19 “Data governance (data retention, exports, privacy requests)” feature cluster to `artifacts/features-catalog.md` with 16 build-ready feature bullets (each includes workflow + thin slice + evidence).
- Added evidence sources S130–S137 to `artifacts/sources.md` (GDPR, ICO DSAR/erasure guidance links, CCPA, NIST Privacy Framework, retention/lifecycle and audit log patterns via AWS docs).
- Appended reproducible queries to `artifacts/search-log.md` for data governance topics + OSS discovery.
- Added OSS pointers (pointers only; no deep evaluation) for governance primitives to `artifacts/oss-catalog.md` and flagged licenses for Step-04 verification.
- Updated cycle bookkeeping artifacts: `artifacts/summary.md`, `artifacts/output-index.md`, `artifacts/skills-log.md`, `artifacts/prompt-log.md`, and rolling `context/context.md`.

## 🧠 What I learned (new information)

- Governance features need three layers to be “real”: **policy definition**, **execution automation**, and **proof/auditability** (run history + actor logging). (S130, S137)
- Retention is easiest to ship as lifecycle-style rules with previews and run logs, then layer in holds and exceptions. (S135, S136)
- DSAR/erasure workflows are operationally similar to support queues: inbox + due dates + verification gate + export/delivery steps. (S131, S132)
- Privacy frameworks emphasize inventories/classification as a prerequisite to safe exports and redaction. (S134)

## 🧭 What changes because of this

- Adds a new feature cluster that directly reduces regulatory/compliance risk and operational thrash: retention, privacy requests, exports, and audit logs now have concrete thin slices to ship.
- Produces a clear thin-slice sequence: privacy request inbox + export pack → retention registry + enforcement runs → legal hold + anonymize modes → governance reporting.
- Provides Step-04 a shortlist of OSS candidates to validate for license and adoption (Presidio, DataHub/OpenMetadata/Atlas, OpenLineage/Marquez, gitleaks/trufflehog).

## ➡️ Next step

- Start Cycle 19 tranche on **Merchandising rules (search tuning, boosts, synonyms)** or **Catalog governance (product QA, bulk edits, versioning)**, depending on highest priority.

## 🔗 Links / references

- `artifacts/features-catalog.md` — tranche #19 data governance section with workflows + thin slices
- `artifacts/sources.md` — evidence IDs S130–S137
- `artifacts/oss-catalog.md` — data governance OSS pointers (pointers only)
- `artifacts/search-log.md` — data governance queries and OSS discovery queries

---

### 0021_checkpoint-cycle-19-merchandising-rules-feature-universe-evidence.md

---
step: 0021
created_at: "2025-12-29 21:19"
title: "Checkpoint: Cycle 19 — Merchandising rules feature universe + evidence"
---

# Step 0021: Checkpoint: Cycle 19 — Merchandising rules feature universe + evidence

## ✅ What I did (facts)

- Added tranche #20 “Merchandising rules (search tuning, boosts, synonyms)” feature cluster to `artifacts/features-catalog.md` with 16 build-ready feature bullets (each includes workflow + thin slice + evidence).
- Added evidence sources S138–S146 to `artifacts/sources.md` (rules/curation, synonyms, ranking, curation primitives, typeahead suggesters, and OSS search engine docs).
- Appended reproducible queries to `artifacts/search-log.md` for merchandising topics.
- Added OSS pointers (pointers only; no deep evaluation) for search engines/primitives to `artifacts/oss-catalog.md` and flagged licenses for Step-04 verification.
- Updated cycle bookkeeping artifacts: `artifacts/summary.md`, `artifacts/output-index.md`, `artifacts/skills-log.md`, and rolling `context/context.md`.

## 🧠 What I learned (new information)

- Merchandising is an operational feedback loop: analytics and zero-results reports drive the highest ROI tuning work (synonyms + rules) first. (S139, S140)
- “Curation/rules” primitives (pin/promote/hide) map directly to campaign workflows, but require preview and rollback to be safe. (S138, S143)
- Autocomplete/suggestions is a distinct subsystem from search and should have its own tuning surfaces. (S146)

## 🧭 What changes because of this

- Adds a feature cluster that drives immediate CRO and reduces shopper frustration: synonyms, rules, zero-results playbooks, and analytics now have thin slices to ship.
- Produces a pragmatic build order: synonyms CRUD → pin/promote rules → analytics + zero-results → preview/sandbox + rollback.
- Provides Step-04 a shortlist of OSS search primitives/engines to validate for license and adoption (Meilisearch, Typesense, OpenSearch; plus suggesters reference).

## ➡️ Next step

- Start Cycle 20 tranche on **Catalog governance (product QA, bulk edits, versioning)** or **Promotions admin (coupons, discounts, eligibility)**.

## 🔗 Links / references

- `artifacts/features-catalog.md` — tranche #20 merchandising rules section with workflows + thin slices
- `artifacts/sources.md` — evidence IDs S138–S146
- `artifacts/oss-catalog.md` — merchandising OSS pointers (pointers only)
- `artifacts/search-log.md` — merchandising queries

---

### 0022_checkpoint-cycle-20-catalog-governance-feature-universe-evidence.md

---
step: 0022
created_at: "2025-12-29 21:27"
title: "Checkpoint: Cycle 20 — Catalog governance feature universe + evidence"
---

# Step 0022: Checkpoint: Cycle 20 — Catalog governance feature universe + evidence

## ✅ What I did (facts)

- Added tranche #21 “Catalog governance (product QA, bulk edits, versioning)” feature cluster to `artifacts/features-catalog.md` with 16 build-ready feature bullets (each includes workflow + thin slice + evidence).
- Added evidence sources S147–S151 to `artifacts/sources.md` (Shopify GraphQL Product + ProductStatus, Adobe Commerce import workflow, BigCommerce product export, schema.org Product) plus relevant Shopify Help Center URLs captured as blocked evidence.
- Appended reproducible queries to `artifacts/search-log.md` for catalog governance topics + OSS discovery queries.
- Added OSS pointers (pointers only; no deep evaluation) for PIM/data quality/CSV validation primitives to `artifacts/oss-catalog.md` and flagged licenses for Step-04 verification where unclear.
- Updated cycle bookkeeping artifacts: `artifacts/summary.md`, `artifacts/output-index.md`, `artifacts/skills-log.md`, and rolling `context/context.md`.

## 🧠 What I learned (new information)

- Catalog governance is less about “catalog UI” and more about **safe bulk operations**: validation, dry-run previews, and rollback are the real differentiators that reduce risk. (S149, S150)
- A clean product lifecycle model (draft/active/archived) enables almost every governance feature (QA queues, approvals, channel readiness). (S148)
- A field/attribute schema baseline (even via public schema like schema.org) is useful as a practical anchor for completeness checks. (S151)

## 🧭 What changes because of this

- Adds a new feature cluster that improves operational correctness: catalog status gating, validation rules, QA queues, and bulk import/export now have concrete thin slices to ship.
- Produces a practical thin-slice order: status + publish gate → bulk editor errors → CSV preflight → QA queue → change logs/rollback.
- Provides Step-04 a shortlist of OSS candidates to validate for license and adoption (Akeneo/Pimcore/OpenRefine/Great Expectations/frictionless/csvkit).

## ➡️ Next step

- Start Cycle 21 tranche on **Promotions admin (coupons, discounts, eligibility)** or **Subscription ops (swap/skip/pause, renewals, retries)**.

## 🔗 Links / references

- `artifacts/features-catalog.md` — tranche #21 catalog governance section with workflows + thin slices
- `artifacts/sources.md` — evidence IDs S147–S151 (plus blocked Shopify Help Center URLs)
- `artifacts/oss-catalog.md` — catalog governance OSS pointers (pointers only)
- `artifacts/search-log.md` — catalog governance queries and OSS discovery queries

---

### 0023_checkpoint-cycle-21-promotions-admin-feature-universe-evidence.md

---
step: 0023
created_at: "2025-12-29 21:33"
title: "Checkpoint: Cycle 21 — Promotions admin feature universe + evidence"
---

# Step 0023: Checkpoint: Cycle 21 — Promotions admin feature universe + evidence

## ✅ What I did (facts)

- Added tranche #22 “Promotions admin (coupons, discounts, eligibility)” feature cluster to `artifacts/features-catalog.md` with 15 build-ready feature bullets (each includes workflow + thin slice + evidence).
- Added evidence sources S152–S159 to `artifacts/sources.md` (Shopify discount objects/mutations, WooCommerce coupon management, Stripe coupon/promo code primitives) and logged Shopify Help Center discounts URL as blocked evidence.
- Appended reproducible queries to `artifacts/search-log.md` for promotions topics + OSS discovery queries.
- Added OSS pointers (pointers only; no deep evaluation) for promotions primitives in OSS commerce cores to `artifacts/oss-catalog.md` and flagged licenses for Step-04 verification.
- Updated cycle bookkeeping artifacts: `artifacts/summary.md`, `artifacts/output-index.md`, `artifacts/skills-log.md`, `artifacts/prompt-log.md`, and rolling `context/context.md`.

## 🧠 What I learned (new information)

- Promotions are best treated as a governed rule system: eligibility + scope + schedule + stacking policies, plus a measurement loop for redemption/impact. (S152, S156)
- Separating “automatic discounts” from “code discounts” is a durable product primitive that simplifies admin UX and conflict rules. (S153, S152)
- Coupon systems consistently include redemption limits (total and per-customer) and duration/lifecycle concepts, which should surface directly in admin. (S157, S158)

## 🧭 What changes because of this

- Adds a new feature cluster that drives CRO and revenue ops: discounts/coupons now have concrete thin slices to ship safely (codes, auto discounts, limits, schedules, analytics).
- Produces a pragmatic thin-slice order: single code discount → auto discount → usage limits → list view + filters → redemption analytics → bulk codes + preview simulator.
- Provides Step-04 a shortlist of OSS repositories to mine for promotion rule models and edge cases (Saleor/Vendure/Sylius/Medusa).

## ➡️ Next step

- Start Cycle 22 tranche on **Subscription ops (swap/skip/pause, renewals, retries)** to cover lifecycle and retention-sensitive billing operations.

## 🔗 Links / references

- `artifacts/features-catalog.md` — tranche #22 promotions admin section with workflows + thin slices
- `artifacts/sources.md` — evidence IDs S152–S159 (plus blocked Shopify Help Center discounts URL)
- `artifacts/oss-catalog.md` — promotions OSS pointers (pointers only)
- `artifacts/search-log.md` — promotions queries and OSS discovery queries

---

### 0024_checkpoint-cycle-22-returns-exchanges-printerless-instant-refresh-evidence.md

---
step: 0024
created_at: "2025-12-29 21:44"
title: "Checkpoint: Cycle 22 — Returns/Exchanges (printerless/instant) refresh + evidence"
---

# Step 0024: Checkpoint: Cycle 22 — Returns/Exchanges (printerless/instant) refresh + evidence

## ✅ What I did (facts)

- Updated the returns/RMA feature universe with “printerless” and “instant” workflows in `artifacts/features-catalog.md` (added 5 incremental feature bullets under Tranche #1).
- Added new evidence sources S160–S166 in `artifacts/sources.md` covering QR/printerless labels, boxless drop-off, instant refunds/returns, instant exchanges setup, and auto-refunds rules.
- Added 3 lightweight OSS pointers for QR/PDF label building blocks in `artifacts/oss-catalog.md` (pointers only; licenses flagged for Step-04 verification).

## 🧠 What I learned (new information)

- Printerless returns (QR code) are explicitly documented as a first-class configuration in returns platforms (not just “send a PDF label”). (S160)
- Boxless/label-free drop-off changes the reverse logistics model: you often receive consolidated shipments/manifests, which needs different matching + receiving workflows. (S161)
- “Auto refunds” is best framed as a rules engine (trigger + conditions + safeguards) with audit logs and overrides, not as a one-off automation. (S166)
- “Instant” programs split into two different product layers: (1) instant exchange authorization/holds and (2) instant refund financing/eligibility. (S165, S163, S164)

## 🧭 What changes because of this

- Returns roadmap can be decomposed into a thin slice that delivers meaningful speed: QR label delivery + return event timeline + one guarded auto-refund rule (without needing financing on day 1).
- The returns data model should treat “return method” as a first-class enum (mail vs drop-off vs boxless) because it changes events, SLAs, and receiving.

## ➡️ Next step

- Run the next tranche on “Subscription ops” (swap/skip/pause, renewals, retries) and collect 10–25 features with workflows + thin slices + evidence.

## 🔗 Links / references

- `artifacts/features-catalog.md` — Returns/Exchanges Tranche #1 additions (printerless + instant + auto-refunds).
- `artifacts/sources.md` — S160–S166 (new returns evidence sources).
- `artifacts/search-log.md` — Cycle 22 return workflow queries and top hits.
- AfterShip printerless QR labels: https://www.aftership.com/docs/returns/faq/return-labels#how-can-i-set-up-printerless-return-labels-with-qr-code-
- Happy Returns ship-faster FAQs (boxless/QR positioning): https://www.happyreturns.com/resources/ship-faster-faqs/
- AfterShip auto-refunds setup: https://www.aftership.com/docs/returns/how-to/set-up-auto-refunds

---

### 0025_checkpoint-cycle-23-subscription-ops-feature-universe-evidence.md

---
step: 0025
created_at: "2025-12-29 21:55"
title: "Checkpoint: Cycle 23 — Subscription ops feature universe + evidence"
---

# Step 0025: Checkpoint: Cycle 23 — Subscription ops feature universe + evidence

## ✅ What I did (facts)

- Added a new subscription ops tranche (Tranche #23) in `artifacts/features-catalog.md` with 17 feature bullets (swap/skip/pause, renewals, payment failures, bulk migrations).
- Added new evidence sources S167–S175 in `artifacts/sources.md` (Chargebee lifecycle + pause/reactivation + API update + bulk ops; ReCharge/Appstle/Skio/Ordergroove market baselines).
- Appended subscription ops OSS pointers in `artifacts/oss-catalog.md` (Temporal/BullMQ/Quartz + billing engine references) as pointers only for Step-04 follow-up.
- Updated logs: `artifacts/search-log.md`, `artifacts/summary.md`, `artifacts/prompt-log.md`, `artifacts/skills-log.md`, and `artifacts/output-index.md`.

## 🧠 What I learned (new information)

- Subscription ops is mostly “schedule mutations with cutoffs”: skip, pause, swap, and cadence changes all boil down to editing what happens next and enforcing a cutoff window.
- Pause and reactivation are explicitly constrained operations (e.g., contract compatibility, limits), so they should be modeled as first-class state transitions, not ad-hoc flags. (S168, S169)
- Bulk ops is not a “nice-to-have”: migrations and policy changes require batch tools with dry-run + error export. (S171)

## 🧭 What changes because of this

- The thin-slice roadmap for subscriptions should start with a “Next order preview” + skip/pause + renewal notice + payment-failure queue, before attempting complex proration and full billing engine replacement.
- Subscription admin IA should prioritize “saved views + segments” and “override tools” because ops work is queue-driven and exception-heavy.

## ➡️ Next step

- Run tranche on “Returns analytics + fraud gating” (risk scoring, policy controls, chargeback/abuse adjacency) with evidence-first sources and a new checkpoint step file.

## 🔗 Links / references

- `artifacts/features-catalog.md` — Tranche #23 subscription ops additions.
- `artifacts/sources.md` — S167–S175 (new subscription ops evidence sources).
- `artifacts/search-log.md` — subscription ops queries and top hits.
- Chargebee pause subscription: https://www.chargebee.com/docs/billing/2.0/subscriptions/pause-subscription
- Chargebee subscription lifecycle: https://www.chargebee.com/docs/billing/2.0/subscriptions/subscriptions
- ReCharge subscriptions positioning: https://getrecharge.com/products/subscriptions/

---

### 0026_checkpoint-cycle-24-returns-analytics-fraud-gating-feature-universe-evidence.md

---
step: 0026
created_at: "2025-12-29 22:03"
title: "Checkpoint: Cycle 24 — Returns analytics + fraud gating feature universe + evidence"
---

# Step 0026: Checkpoint: Cycle 24 — Returns analytics + fraud gating feature universe + evidence

## ✅ What I did (facts)

- Added **Tranche #24 — Returns analytics + fraud gating** in `artifacts/features-catalog.md` with 15 feature bullets (dashboards, risk scoring, gating caps, ID verification, leakage audits, analyst workbench).
- Added new evidence sources S176–S178 in `artifacts/sources.md` for returns/claims abuse magnitude and ID verification as a gating lever.
- Added a new OSS pointers section in `artifacts/oss-catalog.md` for policy evaluation + monitoring/risk patterns (pointers only; licenses flagged for Step-04).
- Updated required logs: `artifacts/search-log.md`, `artifacts/summary.md`, `artifacts/prompt-log.md`, `artifacts/skills-log.md`, and `artifacts/output-index.md`.

## 🧠 What I learned (new information)

- Returns “fraud gating” is not one feature — it’s an operating system: **risk tiering → policy decisions → evidence capture → audit trail → leakage reporting**.
- ID verification is best modeled as a workflow state (“verification required / passed / failed / overridden”) that gates high-risk or instant flows (not just a one-time check). (S177, S178)
- The highest-leverage analytics are ops-first (SLA breach queues and leakage audits), not just executive dashboards.

## 🧭 What changes because of this

- The thin slice for fraud reduction should start with: returner profile + risk tier + capped auto-refunds + leakage report, before adding heavy ML or third-party scoring.
- “Instant” returns (refund at scan / ship-first exchange) should be implemented only behind gating policies and thresholds, with explicit overrides and logging.

## ➡️ Next step

- Run tranche on “Shipping exceptions” refresh (missed scans, address corrections, proactive comms), with the same evidence-first + checkpoint loop.

## 🔗 Links / references

- `artifacts/features-catalog.md` — Tranche #24 returns analytics + fraud gating additions.
- `artifacts/sources.md` — S176–S178 (new returns fraud + IDV evidence sources).
- Appriss return/claims abuse framing: https://apprissretail.com/blog/returns-and-claims-abuse-a-103b-finance-problem-retail-cfos-overlook/
- Stripe Identity: https://stripe.com/identity
- Trulioo identity verification: https://www.trulioo.com/solutions/identity-verification

---

### 0027_checkpoint-cycle-25-shipping-exceptions-refresh-feature-universe-evidence.md

---
step: 0027
created_at: "2025-12-29 22:12"
title: "Checkpoint: Cycle 25 — Shipping exceptions refresh feature universe + evidence"
---

# Step 0027: Checkpoint: Cycle 25 — Shipping exceptions refresh feature universe + evidence

## ✅ What I did (facts)

- Added Tranche #25 “Shipping exceptions refresh” in `artifacts/features-catalog.md` with 15 incremental feature bullets focused on missed scans, webhook debugging, branded tracking page v2, comms suppression, address issue playbooks, and POR workflows.
- Added evidence IDs S179–S186 in `artifacts/sources.md` covering tracking object models, tracking webhooks, webhook debugging, branded tracking pages, and missing-package escalation framing.
- Extended shipping OSS pointers in `artifacts/oss-catalog.md` with webhook delivery/observability and portal analytics accelerators (pointers only; licenses flagged for Step-04).
- Updated required logs: `artifacts/search-log.md`, `artifacts/summary.md`, `artifacts/prompt-log.md`, `artifacts/skills-log.md`, and `artifacts/output-index.md`.

## 🧠 What I learned (new information)

- Shipping exceptions are only as good as the tracking ingestion pipeline: webhook delivery retries/debugging needs to be an explicit admin surface, otherwise “no scan” and exception queues silently degrade. (S186, S182)
- Branded tracking pages are positioned as first-class features and are a natural place to host self-serve issue intake (package missing, POR, address issues). (S183, S47)
- “Missing mail” framing provides a concrete escalation playbook that can be modeled as a case workflow with checklist steps and outcomes. (S180)

## 🧭 What changes because of this

- Thin-slice roadmap should start with reliability + visibility: webhook delivery logs + scan-gap detection + comms audit trail + a basic branded tracking page, before adding heavy carrier integrations.
- Exception routing should be standardized via reason-code taxonomy and playbooks; comms should be rate-limited and explainable (“why we sent this”). (S19, S15)

## ➡️ Next step

- Run tranche on “B2B subscription ops” (seat-based, invoicing, tax IDs, approvals) or “Promotions measurement” depending on priorities.

## 🔗 Links / references

- `artifacts/features-catalog.md` — Tranche #25 shipping exceptions refresh additions.
- `artifacts/sources.md` — S179–S186 (new shipping exceptions evidence sources).
- ShipEngine branded tracking page docs: https://www.shipengine.com/docs/tracking/branded-tracking-page/
- ShipEngine tracking webhooks: https://www.shipengine.com/docs/tracking/webhooks/
- Shippo webhook debugging: https://docs.goshippo.com/docs/tracking/webhookdebugging/
- USPS missing mail: https://www.usps.com/help/missing-mail.htm

---

### 0028_checkpoint-cycle-26-b2b-subscription-ops-feature-universe-evidence.md

---
step: 0028
created_at: "2025-12-29 22:20"
title: "Checkpoint: Cycle 26 — B2B subscription ops feature universe + evidence"
---

# Step 0028: Checkpoint: Cycle 26 — B2B subscription ops feature universe + evidence

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
