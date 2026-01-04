---
status: active
last_reviewed: 2025-12-30
owner: agent
---

# Build vs Integrate Agent (Step-01 extension)

Goal: for each feature cluster + feature bullet, decide the **best leverage path**:

- **🛍️ Shopify API** (use platform primitives; don’t re-implement commerce truth)
- **🔌 Third-party API** (specialist networks: shipping/tracking, returns logistics, SMS, support desk, billing, etc.)
- **🧰 OSS** (self-host / embed generic primitives: workflow engine, queues, analytics plumbing, admin scaffolding)
- **🧑‍💻 Custom build** (our UX + policy logic + derived data + ops queues)

## 🧭 Decision rubric (fast)

- **Choose 🛍️ Shopify API when:**
  - The merchant is already on Shopify AND the object is a Shopify “system-of-record” primitive (order, return, refund, discount, gift card, inventory, customer).
  - The action must reflect in Shopify admin / checkout behavior.
  - We want to avoid data divergence (duplicate order state).

- **Choose 🔌 Third-party API when:**
  - There’s a network or regulatory dependency (carriers, address verification, tracking events, SMS delivery, IDV/KYC, payments/billing for non-Shopify contexts).
  - The platform primitive exists but is not sufficient across carriers/services.

- **Choose 🧰 OSS when:**
  - It’s horizontal infrastructure (workflow orchestration, job queues, event bus, webhook relay, analytics UI/semantic layer, feature flags).
  - We can safely self-host without becoming a commerce platform.
  - License posture is permissive (MIT/Apache/BSD preferred; flag GPL/AGPL/BUSL/unknown).

- **Choose 🧑‍💻 Custom build when:**
  - The differentiation is **ops UX + policies + exception handling**.
  - The work is stitching primitives together (e.g., a return portal that calls Shopify `returnCreate` + triggers label generation + sets tasks).
  - The features are “derived state” (queues, SLAs, playbooks, analytics rollups).

## 🧱 Output format (update each cycle)

Update: `artifacts/build-vs-integrate-matrix.md`

Each evaluated item should include:

- **Feature / cluster**
- **Recommended leverage** (Shopify API vs 3P API vs OSS vs Custom)
- **What we store** (truth vs derived)
- **Thin slice (1–3 days)**
- **Evidence** (URLs or evidence file path; prefer `S###` IDs from `artifacts/sources.md`)

## 🔁 Cycle loop (45 minutes)

- Pick **1 tranche** (start with Tranche #1 Returns/RMA; then Tranche #5 Analytics; then Tranche #2 Shipping exceptions).
- Classify **N=10–25 feature bullets** into Build vs Integrate paths.
- Add **3–8 OSS pointers** only if needed to justify the OSS path (deep OSS mapping belongs to Step-04).
- Update required logs + checkpoint step file.

## ✅ Guardrails

- Don’t propose “build a commerce backend”; assume Shopify is source-of-truth for commerce objects.
- Prefer **Shopify webhooks + our own DB** for analytics, tasks, queues, and derived state.
- When a feature depends on carrier scan events, assume **🔌 tracking API/webhooks** (EasyPost/ShipEngine/AfterShip/Shippo) unless Shopify provides sufficient coverage for the merchant’s carriers.

## 🧩 Default architecture (Shopify-connected ops product)

- 🎯 Goal: build an **ops control plane** (queues, playbooks, approvals, analytics) while keeping commerce truth in Shopify.

### 🧱 System-of-record boundaries

- 🛍️ Shopify (truth):
  - Orders / customers / catalog (feeds + mutations) (S210, S244–S246)
  - Returns / refunds / store credit primitives (S200–S202)
  - Fulfillment + shipment + holds (S203–S205, S208–S209)
  - Inventory primitives (locations, inventory levels, adjustments) (S260–S266)
  - Shopify Payments finance primitives (if enabled) (S250–S254)
  - App billing primitives (if applicable) (S255–S259)

- 🔌 3P providers (truth, when used):
  - Shipping labels + scan events + address verification (S16–S18, S17)
  - Support ticket system objects (Zendesk/Gorgias/etc.) (S36, S30)
  - Identity verification (optional) (S267)

- 🧑‍💻 Our app (truth):
  - Playbooks/workflows definitions + versions (S55)
  - Tasks/approvals + ownership + due dates (S101, S65)
  - Audit log of our actions + configuration changes (S65)
  - Derived “ops state” (exception queues, SLAs, risk tiers, reconciliation matches) (S229, S196)

### 🔁 Data flow (reliable-by-default)

- 📥 Ingest:
  - Shopify webhooks → internal event stream (S89, S206)
  - Bulk backfills via Shopify bulk operations (S211)
  - Optional: 3P webhooks/events (tracking, support, payments) (S18, S93)

- 🧠 Process:
  - Durable workflows for long-running ops playbooks (Temporal) (S55)
  - Job queue for retries/schedules/alerts (BullMQ) (S229)

- 📤 Act:
  - All commerce side-effects happen through Shopify primitives (refundCreate, returnCreate, holds, inventory adjustments, catalog mutations) (S200–S202, S208–S209, S264–S265, S244–S246)

### 🔎 Observability (must-have)

- Store correlation IDs (tenant_id, request_id, event_id) in logs/traces (S216)
- Prefer OSS/hosted observability backends; store only links/ownership metadata in our DB (S218–S220)

## 🧠 Decision tree (5 questions)

- 1) Is there a Shopify system-of-record object for this?
  - ✅ Yes → Shopify is truth; we build UX/policies around it (S210, S200–S202)
- 2) Does it require network coverage (carriers/SMS/IDV) or regulation?
  - ✅ Yes → use a 3P API; store derived links + logs (S16–S18, S267)
- 3) Is it horizontal infrastructure (queues/workflows/observability/search)?
  - ✅ Yes → use OSS/hosted; do not rebuild (S55, S229, S216–S220)
- 4) Is the product value “ops UX + exceptions + governance”?
  - ✅ Yes → build custom surfaces; store derived state + audit trails (S65)
- 5) Will building this create a second source of truth?
  - ✅ Yes → stop; treat upstream as truth and store only derived data

## 🧾 Minimum internal data model (thin-slice friendly)

- `integration_installations` (shopify shop id, scopes, status) (S214, S89)
- `events` (event_id, topic, payload_ref, received_at) (S89)
- `jobs` / `runs` (type, status, attempts, last_error) (S229, S55)
- `tasks` (title, status, owner, due_at, source_ref) (S101)
- `approvals` (task_id, requested_by, decided_by, decision) (S65)
- `audit_events` (actor, action, object_ref, metadata) (S65)
- `derived_metrics` (metric_key, dimensions, day, value) (S196, S197)
