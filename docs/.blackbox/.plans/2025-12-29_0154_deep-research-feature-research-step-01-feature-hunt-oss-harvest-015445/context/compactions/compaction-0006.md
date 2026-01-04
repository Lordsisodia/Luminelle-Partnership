---
compaction: 0006
created_at: "2025-12-30 18:55"
range: "0048-0057"
max_bytes: 1048576
per_step_budget_bytes: 98304
---

# Compaction 0006 (0048–0057)

## ✅ Summary (fill this after compaction)

- <3–7 bullets capturing the durable takeaways>

## 🧩 Patterns / heuristics (fill this after compaction)

- Prompt improvements:
- Checklist improvements:
- Better stop conditions:

## Steps compacted (trimmed)

### 0048_checkpoint-cycle-44-integrations-admin-build-vs-integrate-classification.md

---
step: 0048
created_at: "2025-12-30 18:21"
title: "Checkpoint: Cycle 44 — Integrations admin build vs integrate classification"
---

# Step 0048: Checkpoint: Cycle 44 — Integrations admin build vs integrate classification

## ✅ What I did (facts)

- Added “Tranche #13 — Integrations admin” to `artifacts/build-vs-integrate-matrix.md` with concrete rows for connector setup, Shopify webhook inventory, delivery logs, retries/DLQ, bulk exports, transforms, and health dashboards.
- Reused existing evidence IDs for Shopify webhooks + webhookSubscriptions + bulk operations, plus integration admin references (Svix, Airbyte, Meltano) and OSS job queue primitives (BullMQ). (S89, S206, S211, S91–S93, S229)
- Updated required logs for this cycle: `artifacts/agent-plan.md`, `artifacts/search-log.md`, `artifacts/summary.md`, `artifacts/output-index.md`, `artifacts/skills-log.md`, `artifacts/prompt-log.md`, and `context/context.md`.

## 🧠 What I learned (new information)

- Integrations are mostly an “operability product”: delivery logs, retries, DLQ, alerts, and auditability create the real value; APIs/webhooks are just the inputs. (S93, S229, S65)
- Shopify provides strong Shopify-side primitives (webhook subscriptions + bulk exports), but cross-system reliability requires our own job/retry layer. (S206, S211, S229)

## 🧭 What changes because of this

- Default stance: build the integration control plane (setup + health + retries + audit) and keep Shopify-side truth in Shopify; optionally lean on a specialized webhook delivery layer if we need many downstream endpoints. (S206, S93)

## ➡️ Next step

- Tighten the “default architecture” one-pager in `artifacts/build-vs-integrate-agent.md`, then continue with another tranche (e.g., Inventory/Fulfillment exceptions or Support desk ops).

## 🔗 Links / references

- `artifacts/build-vs-integrate-matrix.md` — Tranche #13 classification.
- `artifacts/sources.md` — S89 (Shopify webhooks), S206 (webhookSubscriptions), S211 (bulk ops), S91–S93 (Airbyte/Meltano/Svix), S229 (BullMQ).

---

### 0049_checkpoint-cycle-45-inventory-fulfillment-exceptions-build-vs-integrate-classification.md

---
step: 0049
created_at: "2025-12-30 18:26"
title: "Checkpoint: Cycle 45 — Inventory & fulfillment exceptions build vs integrate classification"
---

# Step 0049: Checkpoint: Cycle 45 — Inventory & fulfillment exceptions build vs integrate classification

## ✅ What I did (facts)

- Added “Tranche #3 — Inventory / fulfillment exceptions” to `artifacts/build-vs-integrate-matrix.md`, classifying multi-location inventory snapshots, cycle counts, adjustments, bulk updates, and fulfillment-order exception queues into Shopify primitives + custom exception UX + OSS jobs.
- Added stable Shopify Admin GraphQL inventory primitives to `artifacts/sources.md` as S260–S266 (Location, InventoryItem, InventoryLevel, adjust/set/activate inventory).
- Updated required logs for this cycle: `artifacts/agent-plan.md`, `artifacts/search-log.md`, `artifacts/summary.md`, `artifacts/output-index.md`, `artifacts/skills-log.md`, `artifacts/prompt-log.md`, and `context/context.md`.

## 🧠 What I learned (new information)

- Shopify has explicit inventory primitives (inventory items/levels + set/adjust quantity + activate inventory) that are sufficient as the “truth layer” for inventory ops; our product should avoid duplicating inventory truth and instead focus on exception detection + safe resolution UX. (S262–S266)
- Inventory exception handling tends to require auditability and approvals around bulk operations and adjustments, which is not “free” from the API layer alone. (S65)

## 🧭 What changes because of this

- Default recommendation becomes: build an “inventory exception control plane” (queues, anomaly flags, playbooks, bulk fix tooling) that executes changes through Shopify primitives and stores audit trails + run history.

## ➡️ Next step

- Classify Support desk ops (Tranche #4) next, since it becomes the cross-domain “control plane” for most exception queues.

## 🔗 Links / references

- `artifacts/build-vs-integrate-matrix.md` — Tranche #3 classification.
- `artifacts/sources.md` — S260–S266 (Shopify inventory primitives), S204 (FulfillmentOrder).
- `artifacts/search-log.md` — Shopify inventory primitives lookups used for evidence.

---

### 0050_checkpoint-cycle-46-support-desk-ops-build-vs-integrate-classification.md

---
step: 0050
created_at: "2025-12-30 18:30"
title: "Checkpoint: Cycle 46 — Support desk ops build vs integrate classification"
---

# Step 0050: Checkpoint: Cycle 46 — Support desk ops build vs integrate classification

## ✅ What I did (facts)

- Added “Tranche #4 — Support desk ops” to `artifacts/build-vs-integrate-matrix.md`, classifying queues, SLAs, macros/routing, CSAT/KPIs, and ticket ↔ order ↔ shipment join surfaces.
- Anchored the tranche on existing evidence for support desk primitives (views/queues, SLA policies, macros, rules/auto-assign, CSAT, metrics) and Shopify order/fulfillment primitives for joins. (S30–S32, S35–S37, S39–S40, S210, S203)
- Updated required logs for this cycle: `artifacts/agent-plan.md`, `artifacts/search-log.md`, `artifacts/summary.md`, `artifacts/output-index.md`, `artifacts/skills-log.md`, `artifacts/prompt-log.md`, and `context/context.md`.

## 🧠 What I learned (new information)

- Support desk differentiation is rarely “ticket CRUD” — it’s the joined operational context and automation/auditability layer on top of an existing ticket system. (S36, S210, S65)
- A reliable support-control-plane needs jobs/workflows (reminders, SLAs, rule runs) even when the ticket system is external. (S229, S55)

## 🧭 What changes because of this

- Default recommendation becomes: integrate-first (Zendesk/Gorgias/etc.) + build the “single pane of glass” joins and automation surfaces; only build a minimal “cases inbox” if merchants lack a support tool.

## ➡️ Next step

- Continue with Tranche #7 Workflow builder/automation or tighten the “default architecture” one-pager in `artifacts/build-vs-integrate-agent.md`.

## 🔗 Links / references

- `artifacts/build-vs-integrate-matrix.md` — Tranche #4 Support desk ops classification.
- `artifacts/sources.md` — S30–S32, S35–S37, S39–S40 (support primitives), S210/S203 (Shopify joins), S55/S229 (workflow/jobs).

---

### 0051_checkpoint-cycle-47-workflow-builder-automation-build-vs-integrate-classification.md

---
step: 0051
created_at: "2025-12-30 18:33"
title: "Checkpoint: Cycle 47 — Workflow builder automation build vs integrate classification"
---

# Step 0051: Checkpoint: Cycle 47 — Workflow builder automation build vs integrate classification

## ✅ What I did (facts)

- Added “Tranche #7 — Workflow builder / automation” to `artifacts/build-vs-integrate-matrix.md`, classifying trigger/action catalogs, durable execution, approvals, run history/replay, scheduling, and failures inbox.
- Anchored this tranche on existing evidence for automation platform models (n8n/Zapier/Node-RED/Shopify Flow) and durable workflow execution primitives (Temporal) plus OSS jobs (BullMQ). (S50–S55, S229)
- Updated required logs for this cycle: `artifacts/agent-plan.md`, `artifacts/search-log.md`, `artifacts/summary.md`, `artifacts/output-index.md`, `artifacts/skills-log.md`, `artifacts/prompt-log.md`, and `context/context.md`.

## 🧠 What I learned (new information)

- The main “buy vs build” boundary is the workflow runtime: using a proven engine (Temporal) avoids re-implementing retries/timers/idempotency and lets us focus on the playbook UX + auditability. (S55)
- Shopify Flow is a useful reference for trigger/action patterns, but parity is a trap; we should stay focused on ops-specific playbooks and run-history traceability. (S52, S65)

## 🧭 What changes because of this

- Default recommendation becomes: build an ops playbook builder backed by an OSS workflow engine, with explicit run history, replay, and approval gates as first-class product surfaces.

## ➡️ Next step

- Tighten the “default architecture” one-pager in `artifacts/build-vs-integrate-agent.md`, or continue with Tranche #11 Fraud & risk (risk queues + disputes/chargebacks + policy gating).

## 🔗 Links / references

- `artifacts/build-vs-integrate-matrix.md` — Tranche #7 Workflow builder/automation classification.
- `artifacts/sources.md` — S50–S55 (automation models + Temporal), S229 (jobs), S65 (audit patterns).

---

### 0052_checkpoint-cycle-48-fraud-risk-build-vs-integrate-classification.md

---
step: 0052
created_at: "2025-12-30 18:37"
title: "Checkpoint: Cycle 48 — Fraud & risk build vs integrate classification"
---

# Step 0052: Checkpoint: Cycle 48 — Fraud & risk build vs integrate classification

## ✅ What I did (facts)

- Added “Tranche #11 — Fraud & risk” to `artifacts/build-vs-integrate-matrix.md`, classifying risk ingestion, policy registry, review queue, holds/refund gating, disputes inbox, evidence workflow, and risk analytics.
- Added an evidence pointer for optional identity verification (Stripe Identity) as S267 in `artifacts/sources.md` and referenced it as a gated add-on for high-risk flows.
- Updated required logs for this cycle: `artifacts/agent-plan.md`, `artifacts/search-log.md`, `artifacts/summary.md`, `artifacts/output-index.md`, `artifacts/skills-log.md`, `artifacts/prompt-log.md`, and `context/context.md`.

## 🧠 What I learned (new information)

- The core architecture boundary is “derived risk vs source-of-truth financial actions”: keep refunds/holds/disputes in upstream primitives, and keep risk policies + decisions internal with auditability. (S200, S208, S65)
- Disputes tooling must be processor-aware; Shopify Payments primitives help only when the merchant uses Shopify Payments. (S254, S78)

## 🧭 What changes because of this

- Default recommendation becomes: build a risk control plane (policies + queues + audit) that orchestrates Shopify actions and processor workflows instead of trying to centralize fraud logic in a single system-of-record.

## ➡️ Next step

- Continue with Tranche #9 Inventory forecasting/replenishment or tighten the “default architecture” one-pager in `artifacts/build-vs-integrate-agent.md`.

## 🔗 Links / references

- `artifacts/build-vs-integrate-matrix.md` — Tranche #11 Fraud & risk classification.
- `artifacts/sources.md` — S231 (OrderRisk), S254 (ShopifyPaymentsDispute), S77–S79 (disputes/evidence), S267 (Stripe Identity).

---

### 0053_checkpoint-cycle-49-default-architecture-one-pager-build-vs-integrate.md

---
step: 0053
created_at: "2025-12-30 18:41"
title: "Checkpoint: Cycle 49 — Default architecture one-pager (build vs integrate)"
---

# Step 0053: Checkpoint: Cycle 49 — Default architecture one-pager (build vs integrate)

## ✅ What I did (facts)

- Added a “Default architecture (Shopify-connected ops product)” one-pager to `artifacts/build-vs-integrate-agent.md`, including system-of-record boundaries, default data flow, a 5-question decision tree, and a minimum internal data model.
- Anchored the one-pager to stable source IDs already in `artifacts/sources.md` (Shopify truth primitives, webhooks/bulk ops ingestion, OSS workflow/jobs, audit/observability).
- Updated required logs for this cycle: `artifacts/agent-plan.md`, `artifacts/search-log.md`, `artifacts/summary.md`, `artifacts/output-index.md`, `artifacts/skills-log.md`, `artifacts/prompt-log.md`, and `context/context.md`.

## 🧠 What I learned (new information)

- Writing down the system-of-record boundaries exposes a consistent “architecture invariant”: Shopify truth + derived ops control plane + OSS reliability primitives.
- The decision tree makes tranche classification faster and reduces “second source of truth” drift.

## 🧭 What changes because of this

- New tranches can be classified by default without re-arguing fundamentals; we only need to resolve the boundary cases (e.g., payment stack, carrier coverage, merchant support tool).

## ➡️ Next step

- Classify Tranche #9 Inventory forecasting/replenishment next (reorder rules, purchasing loops) or tighten remaining gaps in the matrix.

## 🔗 Links / references

- `artifacts/build-vs-integrate-agent.md` — default architecture one-pager.
- `artifacts/sources.md` — S89 (Shopify webhooks), S211 (bulk ops), S55 (Temporal), S229 (BullMQ), S65 (audit patterns), S216–S220 (observability).

---

### 0054_checkpoint-cycle-50-forecasting-replenishment-build-vs-integrate-classification.md

---
step: 0054
created_at: "2025-12-30 18:44"
title: "Checkpoint: Cycle 50 — Forecasting & replenishment build vs integrate classification"
---

# Step 0054: Checkpoint: Cycle 50 — Forecasting & replenishment build vs integrate classification

## ✅ What I did (facts)

- Added “Tranche #9 — Inventory forecasting / replenishment” to `artifacts/build-vs-integrate-matrix.md`, classifying inventory baselines, reorder rules, reorder suggestions, PO creation, receiving, alerts, and optional forecasting inputs.
- Anchored the tranche on existing evidence for PO/replenishment workflows and reordering rules patterns, plus Shopify inventory primitives as the source-of-truth for current stock. (S66–S70, S263, S265, S264)
- Updated required logs for this cycle: `artifacts/agent-plan.md`, `artifacts/search-log.md`, `artifacts/summary.md`, `artifacts/output-index.md`, `artifacts/skills-log.md`, `artifacts/prompt-log.md`, and `context/context.md`.

## 🧠 What I learned (new information)

- Forecasts should remain derived inputs; deterministic min/max + lead time rules ship earlier and are more explainable for merchant ops. (S68, S67)
- Receiving must write inventory truth back via Shopify inventory mutations; planning artifacts (POs, vendor mapping, suggestions) can live in our DB. (S265, S263)

## 🧭 What changes because of this

- Default recommendation becomes: ship “rules + PO + receiving” first, add forecasting later as an optional feed and never as a system-of-record.

## ➡️ Next step

- Continue with Tranche #16 Localization or tighten matrix consistency (ensure every tranche references the default architecture one-pager).

## 🔗 Links / references

- `artifacts/build-vs-integrate-matrix.md` — Tranche #9 classification.
- `artifacts/sources.md` — S66–S70 (replenishment + forecasting references), S263–S265 (inventory primitives), S229 (jobs).

---

### 0055_checkpoint-cycle-51-localization-build-vs-integrate-classification.md

---
step: 0055
created_at: "2025-12-30 18:48"
title: "Checkpoint: Cycle 51 — Localization build vs integrate classification"
---

# Step 0055: Checkpoint: Cycle 51 — Localization build vs integrate classification

## ✅ What I did (facts)

- Added “Tranche #16 — Localization” to `artifacts/build-vs-integrate-matrix.md`, classifying multi-currency/Markets awareness, our UI translations, locale formatting, and localization QA into Shopify truth + OSS i18n/formatting libs + custom preference surfaces.
- Anchored this tranche on existing evidence for Shopify multi-currency and Markets concepts plus standard locale datasets and i18n/money libraries (CLDR/ICU/FormatJS/i18next/Dinero). (S106–S112)
- Updated required logs for this cycle: `artifacts/agent-plan.md`, `artifacts/search-log.md`, `artifacts/summary.md`, `artifacts/output-index.md`, `artifacts/skills-log.md`, `artifacts/prompt-log.md`, and `context/context.md`.

## 🧠 What I learned (new information)

- Localization is easiest to reason about as two layers: commerce context (markets/currencies) comes from Shopify, and our app UI localization should use proven libraries/datasets rather than bespoke formatting.

## 🧭 What changes because of this

- Default recommendation becomes: treat Shopify as truth for currencies/markets, and treat our app localization as a separate concern implemented via OSS i18n/formatting libraries.

## ➡️ Next step

- Tighten matrix consistency pass (ensure each tranche aligns with the default architecture one-pager), or classify the remaining unclassified tranches with the decision tree.

## 🔗 Links / references

- `artifacts/build-vs-integrate-matrix.md` — Tranche #16 Localization classification.
- `artifacts/sources.md` — S106–S112 (localization references).

---

### 0056_checkpoint-cycle-52-matrix-consistency-pass.md

---
step: 0056
created_at: "2025-12-30 18:51"
title: "Checkpoint: Cycle 52 — Matrix consistency pass"
---

# Step 0056: Checkpoint: Cycle 52 — Matrix consistency pass

## ✅ What I did (facts)

- Ran a consistency pass on `artifacts/build-vs-integrate-matrix.md`, adding explicit “Default architecture alignment” notes to the newest tranches to keep system-of-record boundaries (truth vs derived) consistent.
- Ensured the notes reference the decision tree and boundaries in `artifacts/build-vs-integrate-agent.md` rather than re-explaining the architecture inside each tranche.
- Updated required logs for this cycle: `artifacts/agent-plan.md`, `artifacts/search-log.md`, `artifacts/summary.md`, `artifacts/output-index.md`, `artifacts/skills-log.md`, `artifacts/prompt-log.md`, and `context/context.md`.

## 🧠 What I learned (new information)

- Consistency notes act like “lint” for the matrix: they catch accidental second sources of truth before implementation starts.

## 🧭 What changes because of this

- New tranche additions can follow a predictable pattern (truth boundaries + derived state + thin slice) without re-arguing fundamentals.

## ➡️ Next step

- Continue with the next unclassified tranche in the matrix backlog (or revisit older tranches for API-primitive upgrades where help-center sources were used).

## 🔗 Links / references

- `artifacts/build-vs-integrate-matrix.md` — consistency edits (“Default architecture alignment” notes).
- `artifacts/build-vs-integrate-agent.md` — default architecture one-pager and decision tree.

---

### 0057_checkpoint-cycle-53-customer-self-serve-deflection-build-vs-integrate-classification.md

---
step: 0057
created_at: "2025-12-30 18:55"
title: "Checkpoint: Cycle 53 — Customer self-serve deflection build vs integrate classification"
---

# Step 0057: Checkpoint: Cycle 53 — Customer self-serve deflection build vs integrate classification

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
