---
compaction: 0005
created_at: "2025-12-30 18:21"
range: "0039-0048"
max_bytes: 1048576
per_step_budget_bytes: 98304
---

# Compaction 0005 (0039–0048)

## ✅ Summary (fill this after compaction)

- <3–7 bullets capturing the durable takeaways>

## 🧩 Patterns / heuristics (fill this after compaction)

- Prompt improvements:
- Checklist improvements:
- Better stop conditions:

## Steps compacted (trimmed)

### 0039_checkpoint-cycle-35-returns-fraud-gating-build-vs-integrate-classification.md

---
step: 0039
created_at: "2025-12-30 17:37"
title: "Checkpoint: Cycle 35 — Returns fraud gating build vs integrate classification"
---

# Step 0039: Checkpoint: Cycle 35 — Returns fraud gating build vs integrate classification

## ✅ What I did (facts)

- Extended `artifacts/build-vs-integrate-matrix.md` with “Tranche #24 — Returns analytics + fraud gating” and classified each sub-feature into Shopify primitives vs custom risk/policy layer vs 3P IDV integrations.
- Added Shopify OrderRisk evidence (S231) in `artifacts/sources.md` to support using platform risk signals as an input to our gating decisions.
- Updated required logs for this cycle: `artifacts/agent-plan.md`, `artifacts/search-log.md`, `artifacts/summary.md`, `artifacts/skills-log.md`, `artifacts/output-index.md`, `artifacts/prompt-log.md`, and `context/context.md`.

## 🧠 What I learned (new information)

- Shopify exposes an OrderRisk object model that can be surfaced in operator tooling as a signal; it should not replace a dedicated returns risk policy but can inform it. (S231)
- The “safe” architecture is: Shopify Return/Refund truth + derived risk tiers + explicit caps + strong auditability for every gated decision. (S200, S65)

## 🧭 What changes because of this

- Returns fraud work should be treated as a policy engine + analyst workbench rather than “more returns UI”: focus on explainability, caps, and leakage audits first.
- IDV should be an optional escalation step for high-risk segments, not a default requirement that increases friction for low-risk customers. (S177, S178)

## ➡️ Next step

- Apply the rubric to Tranche #18 Admin IA or Tranche #20 Merchandising rules next.

## 🔗 Links / references

- `artifacts/build-vs-integrate-matrix.md` — Tranche #24 classification.
- `artifacts/sources.md` — S231 (OrderRisk evidence).

---

### 0040_checkpoint-cycle-36-admin-ia-build-vs-integrate-classification.md

---
step: 0040
created_at: "2025-12-30 17:42"
title: "Checkpoint: Cycle 36 — Admin IA build vs integrate classification"
---

# Step 0040: Checkpoint: Cycle 36 — Admin IA build vs integrate classification

## ✅ What I did (facts)

- Extended `artifacts/build-vs-integrate-matrix.md` with “Tranche #18 — Admin IA” and classified global search, saved views, tables, bulk actions, and power-user navigation into custom UX vs OSS building blocks.
- Added evidence IDs S232–S238 in `artifacts/sources.md` (React Admin, Refine, TanStack Table, cmdk, kbar, Meilisearch, Typesense) to ground the admin IA leverage decisions.
- Updated required logs for this cycle: `artifacts/agent-plan.md`, `artifacts/search-log.md`, `artifacts/summary.md`, `artifacts/skills-log.md`, `artifacts/output-index.md`, `artifacts/prompt-log.md`, and `context/context.md`.

## 🧠 What I learned (new information)

- Admin productivity features are primarily “UX glue” (saved views, deep links, bulk actions, command palette) and are best built in-house over OSS primitives rather than sourcing from Shopify APIs.
- OSS is most valuable for foundational UI and search primitives (tables, command palette, search indexing), while information architecture and permission-aware UX remain custom.

## 🧭 What changes because of this

- Default stance becomes: build admin IA as a first-class product surface (global search, saved views, shortcuts) but accelerate implementation using OSS admin scaffolding/table/search components.
- Tie permission-aware navigation/actions to the existing authorization layer (OPA/OpenFGA), not ad-hoc UI rules.

## ➡️ Next step

- Apply the rubric to Tranche #20 Merchandising rules or Tranche #21 Catalog governance next.

## 🔗 Links / references

- `artifacts/build-vs-integrate-matrix.md` — Tranche #18 classification.
- `artifacts/sources.md` — S232–S238 (admin IA building blocks evidence).

---

### 0041_checkpoint-cycle-37-merchandising-rules-build-vs-integrate-classification.md

---
step: 0041
created_at: "2025-12-30 17:46"
title: "Checkpoint: Cycle 37 — Merchandising rules build vs integrate classification"
---

# Step 0041: Checkpoint: Cycle 37 — Merchandising rules build vs integrate classification

## ✅ What I did (facts)

- Extended `artifacts/build-vs-integrate-matrix.md` with “Tranche #20 — Merchandising rules” and classified synonyms, pinning/curation, facets, suggestions, and governance into a custom merch rules UI over a tunable search layer.
- Added evidence IDs S239–S243 in `artifacts/sources.md` (Shopify products/collections/metafields for catalog truth; Algolia/Elastic docs as tuning knobs reference).
- Updated required logs for this cycle: `artifacts/agent-plan.md`, `artifacts/search-log.md`, `artifacts/summary.md`, `artifacts/skills-log.md`, `artifacts/output-index.md`, `artifacts/prompt-log.md`, and `context/context.md`.

## 🧠 What I learned (new information)

- Merchandising rules require a system where ranking is tunable (synonyms, pinning, facets, suggestions); Shopify APIs provide the catalog feed, but the tuning knobs usually live in an external search layer.
- Merch rules should be treated like versioned config: previewable, schedulable, and auditable.

## 🧭 What changes because of this

- Default stance becomes: keep Shopify as product/collection truth, push those into a search index (OSS/hosted), and build a merch rules UI that writes to that search layer and records audit history.

## ➡️ Next step

- Apply the rubric to Tranche #21 Catalog governance next (bulk edits, import/export, completeness rules).

## 🔗 Links / references

- `artifacts/build-vs-integrate-matrix.md` — Tranche #20 classification.
- `artifacts/sources.md` — S239–S243 (catalog + search tuning evidence).

---

### 0042_checkpoint-cycle-38-catalog-governance-build-vs-integrate-classification.md

---
step: 0042
created_at: "2025-12-30 17:49"
title: "Checkpoint: Cycle 38 — Catalog governance build vs integrate classification"
---

# Step 0042: Checkpoint: Cycle 38 — Catalog governance build vs integrate classification

## ✅ What I did (facts)

- Extended `artifacts/build-vs-integrate-matrix.md` with “Tranche #21 — Catalog governance” and classified catalog lifecycle, bulk edits, import/export, completeness rules, and change history into Shopify primitives + custom governance UX.
- Added evidence IDs S244–S246 in `artifacts/sources.md` for Shopify catalog mutation primitives (product CRUD/set, variants bulk create, metafieldsSet).
- Updated required logs for this cycle: `artifacts/agent-plan.md`, `artifacts/search-log.md`, `artifacts/summary.md`, `artifacts/skills-log.md`, `artifacts/output-index.md`, `artifacts/prompt-log.md`, and `context/context.md`.

## 🧠 What I learned (new information)

- The “hard parts” of catalog governance are safety and scale: preflight validation, row-level errors, and audit history; Shopify mutations provide the execution path while we provide governance.
- Metafields are a key mechanism for attribute governance and completeness scoring without changing the core product schema.

## 🧭 What changes because of this

- Default stance becomes: keep Shopify as the catalog system-of-record, and build a governed “batch ops” layer (validator + bulk editor + history) on top.

## ➡️ Next step

- Apply the rubric to Tranche #22 Promotions admin next (discount primitives + schedule + stacking + measurement hooks).

## 🔗 Links / references

- `artifacts/build-vs-integrate-matrix.md` — Tranche #21 classification.
- `artifacts/sources.md` — S244–S246 (Shopify catalog mutation evidence).

---

### 0043_checkpoint-cycle-39-promotions-admin-build-vs-integrate-classification.md

---
step: 0043
created_at: "2025-12-30 17:54"
title: "Checkpoint: Cycle 39 — Promotions admin build vs integrate classification"
---

# Step 0043: Checkpoint: Cycle 39 — Promotions admin build vs integrate classification

## ✅ What I did (facts)

- Extended `artifacts/build-vs-integrate-matrix.md` with “Tranche #22 — Promotions admin” and classified discount creation/lifecycle into Shopify primitives plus custom ops UX (preview, bulk ops, audit), with separate measurement/abuse monitoring.
- Added evidence ID S247 in `artifacts/sources.md` for Shopify discount listing/count primitives (`discountNodes`, `discountCodesCount`, `discountNodesCount`) to support promo list views without relying on blocked Shopify Help pages.
- Updated required logs for this cycle: `artifacts/agent-plan.md`, `artifacts/search-log.md`, `artifacts/summary.md`, `artifacts/skills-log.md`, `artifacts/output-index.md`, `artifacts/prompt-log.md`, and `context/context.md`.

## 🧠 What I learned (new information)

- Shopify exposes discount objects and create mutations as stable primitives; the missing pieces are safe preview/testing and measurement/abuse monitoring loops.
- The most defensible architecture separates (1) discount truth and application (Shopify) from (2) reporting/measurement (our warehouse/events/metrics definitions).

## 🧭 What changes because of this

- Promotions work should be implemented as “Shopify discount primitives + ops-safe control plane”: list/search, audit history, bulk ops, preview simulator, and governance.
- Treat promo measurement as a first-class layer (metric registry + scheduled reports) to prevent ROI drift and enable abuse monitoring.

## ➡️ Next step

- Apply the rubric to Tranche #19 Data governance next (retention policies, exports, privacy requests) or Tranche #14 Mobile ops.

## 🔗 Links / references

- `artifacts/build-vs-integrate-matrix.md` — Tranche #22 classification.
- `artifacts/sources.md` — S247 (Shopify discount listing/count primitives).

---

### 0044_checkpoint-cycle-40-data-governance-build-vs-integrate-classification.md

---
step: 0044
created_at: "2025-12-30 17:57"
title: "Checkpoint: Cycle 40 — Data governance build vs integrate classification"
---

# Step 0044: Checkpoint: Cycle 40 — Data governance build vs integrate classification

## ✅ What I did (facts)

- Extended `artifacts/build-vs-integrate-matrix.md` with “Tranche #19 — Data governance” and classified retention registry, DSAR inbox, export packs, secure delivery, and deletion dry-runs into custom governance workflows plus OSS jobs.
- Reused existing evidence for GDPR/ICO/NIST privacy governance and Shopify bulk exports to ground decisions (S130–S137, S211).
- Updated required logs for this cycle: `artifacts/agent-plan.md`, `artifacts/search-log.md`, `artifacts/summary.md`, `artifacts/skills-log.md`, `artifacts/output-index.md`, `artifacts/prompt-log.md`, and `context/context.md`.

## 🧠 What I learned (new information)

- Data governance is primarily “policy + workflow + auditability”; the technical execution is batch jobs (preview → approve → run) and safe delivery (expiring links + access logs).
- Shopify bulk exports are a useful execution primitive for large DSAR packs, but the DSAR workflow (verification, deadlines, denial reasons) remains our product responsibility.

## 🧭 What changes because of this

- Default stance becomes: build a governance control plane (retention rules + DSAR inbox + audit log) that orchestrates exports and deletions across systems, rather than trying to centralize all data in one place first.
- Ship identity verification gating + secure delivery before scaling “one-click export everything”.

## ➡️ Next step

- Apply the rubric to Tranche #14 Mobile ops or Tranche #12 Finance analytics next.

## 🔗 Links / references

- `artifacts/build-vs-integrate-matrix.md` — Tranche #19 classification.
- `artifacts/sources.md` — S130–S137 (privacy governance), S211 (Shopify bulk exports), S229 (job queue primitives).

---

### 0045_checkpoint-cycle-41-mobile-ops-build-vs-integrate-classification.md

---
step: 0045
created_at: "2025-12-30 18:04"
title: "Checkpoint: Cycle 41 — Mobile ops build vs integrate classification"
---

# Step 0045: Checkpoint: Cycle 41 — Mobile ops build vs integrate classification

## ✅ What I did (facts)

- Confirmed `artifacts/build-vs-integrate-matrix.md` includes Tranche #14 — Mobile ops, with concrete rows for scan-to-receive, offline scan queues, push alerts, and a mobile task inbox.
- Added/linked stable evidence for mobile “surface primitives”: Expo notifications (push delivery patterns) and Shopify POS UI Extensions (embedded POS experiences) and referenced them as S248–S249 in the tranche. (S248, S249)
- Updated required cycle logs: `artifacts/agent-plan.md`, `artifacts/search-log.md`, `artifacts/summary.md`, `artifacts/output-index.md`, `artifacts/skills-log.md`, `artifacts/prompt-log.md`, and `context/context.md`.

## 🧠 What I learned (new information)

- Mobile ops is dominated by “offline sync + UX”: carrier-grade reliability comes from explicit local queues, retry semantics, and conflict rules, not from Shopify primitives alone. (S98, S99)
- “Standalone warehouse app vs POS extension” is the key architecture/product tradeoff: POS extensions can accelerate adoption (hardware + POS context) but may constrain offline/scanning flows. (S249)
- Push notifications are best treated as an infrastructure primitive (delivery + targeting + logs) that we own, while notification *triggers* come from our ops workflows and exception detection. (S248)

## 🧭 What changes because of this

- Default recommendation becomes: ship an online-first mobile thin slice (scan-to-receive + task inbox) and then add offline queues/sync as a second step, rather than trying to “solve offline” in v1.
- Treat POS extension support as an optional integration path (later tranche) unless the merchant base is already heavily POS-centric.

## ➡️ Next step

- Apply the rubric to Tranche #12 Finance analytics next (payout reconciliation, fees, disputes, and derived KPI warehouse).

## 🔗 Links / references

- `artifacts/build-vs-integrate-matrix.md` — Tranche #14 Mobile ops classification.
- `artifacts/sources.md` — S248 (Expo Notifications), S249 (Shopify POS UI Extensions).
- `artifacts/search-log.md` — Expo + POS extension docs lookups used for evidence.

---

### 0046_checkpoint-cycle-42-finance-analytics-build-vs-integrate-classification.md

---
step: 0046
created_at: "2025-12-30 18:09"
title: "Checkpoint: Cycle 42 — Finance analytics build vs integrate classification"
---

# Step 0046: Checkpoint: Cycle 42 — Finance analytics build vs integrate classification

## ✅ What I did (facts)

- Added Tranche #12 — Finance analytics to `artifacts/build-vs-integrate-matrix.md`, classifying transaction ledgers, payouts/fees, disputes, reconciliation, and alerts into Shopify primitives + custom derived reporting tables.
- Added Shopify Admin API evidence for finance primitives into `artifacts/sources.md` (S250–S254) and referenced them in the tranche rows.
- Updated required logs for this cycle: `artifacts/agent-plan.md`, `artifacts/search-log.md`, `artifacts/summary.md`, `artifacts/output-index.md`, `artifacts/skills-log.md`, `artifacts/prompt-log.md`, and `context/context.md`.

## 🧠 What I learned (new information)

- Shopify has explicit primitives for finance data when Shopify Payments is enabled (balance transactions + disputes), which makes “custom reporting layer over canonical primitives” the default approach. (S250, S252, S254)
- A usable finance product needs a normalized ledger + reconciliation tables; raw API data alone is not enough for ops workflows (variance reasons, alerts, ownership, and audit trails).

## 🧭 What changes because of this

- Default architecture recommendation tightens: **Shopify as truth + our derived tables** (ledger, rollups, reconciliation) + jobs for scheduled reports/alerts.
- Finance should be designed to degrade gracefully when Shopify Payments is not present (merchant may use other processors); treat processor integrations as optional, not assumed.

## ➡️ Next step

- Apply the rubric to Tranche #10 Pricing & billing admin next, splitting “merchant pricing/promos” from “our app billing”.

## 🔗 Links / references

- `artifacts/build-vs-integrate-matrix.md` — Tranche #12 classification.
- `artifacts/sources.md` — S250–S254 (Shopify finance primitives).
- `artifacts/search-log.md` — Shopify finance primitive lookups used for evidence.

---

### 0047_checkpoint-cycle-43-pricing-billing-admin-build-vs-integrate-classification.md

---
step: 0047
created_at: "2025-12-30 18:16"
title: "Checkpoint: Cycle 43 — Pricing & billing admin build vs integrate classification"
---

# Step 0047: Checkpoint: Cycle 43 — Pricing & billing admin build vs integrate classification

## ✅ What I did (facts)

- Added Tranche #10 — Pricing & billing admin (app billing) to `artifacts/build-vs-integrate-matrix.md`, classifying plan tiers, upgrades, cancellations, one-time charges, and usage records into Shopify Billing API primitives + custom entitlements/admin UX.
- Added Shopify billing evidence to `artifacts/sources.md` (S255–S259) and referenced the billing primitives directly in the tranche rows.
- Updated required logs for this cycle: `artifacts/agent-plan.md`, `artifacts/search-log.md`, `artifacts/summary.md`, `artifacts/output-index.md`, `artifacts/skills-log.md`, `artifacts/prompt-log.md`, and `context/context.md`.

## 🧠 What I learned (new information)

- Shopify provides explicit billing primitives (subscription create/cancel, one-time purchase, usage records) that map cleanly to plan catalog + entitlement UX patterns. (S256–S259)
- The hard part is not charging — it’s entitlement correctness + auditability (why a merchant was billed / what they unlocked), which should stay in our domain. (S65, S259)

## 🧭 What changes because of this

- Default recommendation becomes: build a lightweight entitlement system and keep billing truth upstream (Shopify billing when applicable), rather than storing “our own invoices” as truth.
- Treat “external billing provider” as a deliberate capability flag driven by distribution/eligibility, not as a default assumption.

## ➡️ Next step

- Apply the rubric to Tranche #13 Integrations admin next (webhook delivery, retries, import/export, integration health).

## 🔗 Links / references

- `artifacts/build-vs-integrate-matrix.md` — Tranche #10 app billing classification.
- `artifacts/sources.md` — S255–S259 (Shopify billing primitives).
- `artifacts/search-log.md` — Shopify billing docs lookups used for evidence.

---

### 0048_checkpoint-cycle-44-integrations-admin-build-vs-integrate-classification.md

---
step: 0048
created_at: "2025-12-30 18:21"
title: "Checkpoint: Cycle 44 — Integrations admin build vs integrate classification"
---

# Step 0048: Checkpoint: Cycle 44 — Integrations admin build vs integrate classification

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
