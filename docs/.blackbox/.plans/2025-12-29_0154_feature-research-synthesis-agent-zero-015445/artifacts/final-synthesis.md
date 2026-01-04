---
status: draft
last_reviewed: 2025-12-28
owner: agent-zero
---

# Final Synthesis (Build-Ready)

Purpose: convert research into a plan we can execute.

## ✅ 0) One-line headline

We now have **102 competitors breadth-scanned** and **102 evidence-backed deep dives** (53 core + 49 adjacent), enough to start ranking “build vs integrate” decisions for a merchant-admin-first platform.

## 🎯 1) The single best next move (if we only do one thing)

- Recommendation: ship **per-tenant feature flags + staged rollouts** (and wire changes into an audit log).
- Why now: it makes every other “vibe coding” feature safer to ship and easier to roll back.
- Fastest path: integrate (Unleash/Flagsmith) + build thin admin UI
- 1-day slice: gate one admin feature per tenant + toggle UI.
- 1-week slice: environments + gradual rollout + audit log for flag changes.

## 🧭 1b) Recommended product wedge (merchant value): Ops Action Center (“workflow compression”)

- Wedge recommendation: ship a **Merchant Ops Action Center** that lets a team resolve order issues (shipping/returns/refunds/exchanges) without tool-switching.
- Why this wedge: it is the repeated “best in class” pattern across core competitors (support inbox + returns + shipping), and it naturally justifies RBAC/audit log/workflow automation primitives.
- How it relates to “feature flags first”: feature flags + audit log are the **safety rails** that let us ship this wedge incrementally and roll back per-tenant.
- Evidence (core competitors proving this demand):
  - Support inbox + embedded actions: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/gorgias.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/re-amaze.md`
  - Returns routing & exchange-first: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/loop-returns.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/returngo.md`
  - Shipping batch ops/rules: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/shipstation.md`
  - Store credit refunds as retention lever (returns economics): `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/rise-ai.md`

## 🧱 1c) MVP workflow spec (first value): resolve an order issue end-to-end

- Goal: resolve a “where is my order / I want to return / I need a refund” issue **in one place**, with auditability and guardrails.
- Primary users: internal ops (support + ops manager), merchant admin (owner/operator), optional: retail associate (POS) for redemption.
- Core objects (minimum):
  - Order
  - Customer
  - Shipment / label
  - Return request
  - Resolution (refund / exchange / store credit)
  - Audit log entry
- Required states (minimum):
  - Return: requested → approved/denied → in_transit → received → resolved
  - Shipment: pending → labeled → in_transit → delivered → exception

### Workflow steps (MVP)

1) Open a conversation/ticket/order → load **order context panel** (items, payment status, fulfillment status, prior returns).
2) If return requested → run **policy rules**:
   - eligibility window, reasons, item condition, fraud gates, recommended outcome
3) If approval required → route to **manager approval queue** with context + recommendation.
4) If approved:
   - generate return label (or choose label provider)
   - issue refund OR issue store credit OR create an exchange order
   - update inventory/restock state when received
5) Write **audit log** for every action (who/what/when/previous value) and store “why” when overriding recommendations.
6) Close loop:
   - customer message template + status link
   - internal note summarizing resolution and rationale

### Success metrics (MVP)

- Median time-to-resolution (TTR) ↓
- % tickets resolved without tool switching ↑
- Exchange/store-credit rate ↑ (where policy allows)
- Audit completeness (100% for “money-moving” actions) ↑

## 🔥 2) Top 10 things to build next (ranked)

1) Feature flags + staged rollouts — ship faster/safer — integrate — wire Unleash + add toggle UI
2) Workflow automation hooks — compounding ops value — integrate — prototype n8n “trigger → action → run log”
3) Audit log — reduces ops mistakes — build — log key admin actions + filtering
4) RBAC + permissions — table stakes — build — roles for critical resources + role templates
5) Returns portal + exchange-first — ops savings — build/integrate — returns intake + routing basics
6) Unified order timeline — fewer context switches — build/integrate — single order view + embedded panels
7) Admin usage analytics — build what’s proven — integrate — capture events + dashboard
8) Search + merchandising rules — CRO wins — integrate — search service + synonyms/boost UI
9) Support inbox → action center — reduce handling time — build — order context panel + safe actions
10) CMS for admin/marketing content ops — reduces bottlenecks — integrate — Payload read-only embed first

For each item, include:
- Target user (merchant admin vs internal ops)
- “Thin slice” (what we can ship fast)
- Evidence (2–3 sources)

## 🧩 3) Top OSS accelerators (ranked)

1) `marmelab/react-admin` — admin UI scaffolding — 1-day read-only POC — low risk (MIT)
2) `refinedev/refine` — admin framework patterns — 1-day read-only POC — low risk (MIT)
3) `Unleash/unleash` — feature flags backend — 1-day tenant gating — medium ops (Apache-2.0)
4) `payloadcms/payload` — content/admin UX — 1-day content embed — medium ops (MIT)
5) `Flagsmith/flagsmith` — flags + remote config — 1-day gating — license safe, Python service boundary
6) `novuhq/novu` — notifications primitives — 1-day event → notify POC — license safe (MIT)
7) `open-policy-agent/opa` — policy engine — guardrails for risky actions — license safe (Apache-2.0)
8) `temporalio/temporal` — workflow orchestration — heavier but compounding leverage — license safe (MIT)

For each repo/tool, include:
- License note (permissive vs flagged)
- Integration style (embed vs service boundary)
- 1-day POC slice

## ⚡ 4) Quick wins (1–3 days)

- Feature flags thin slice (1 feature, 1 tenant, 1 toggle UI).
- Audit log for the 10 most important admin actions.
- Admin usage tracking for 10 key flows (setup, orders, returns).

## 🧱 5) Medium scope (1–2 weeks)

- Workflow automation “starter kit”: 3 triggers + 5 actions + approvals + run log UI.
- Unified order timeline with embedded shipping/returns/support context.
- Returns/exchange flow MVP (intake → review queue → resolution states).

## ⚠️ 6) Avoid / danger zones

- Don’t build a full analytics/BI stack from scratch early; integrate first, keep PII rules explicit.
- Don’t adopt copyleft/unclear OSS for core product embedding without confirming license terms.
- Don’t try to “replace Shopify” breadth; extract one high-leverage workflow at a time.

## 🧾 7) Build vs Integrate vs Buy (rules of thumb)

- Build when: the feature is core to our differentiated admin UX and depends on our domain model (RBAC, audit log, order timeline).
- Integrate when: OSS gives us a stable primitive and we can keep it behind a service boundary (flags, automation engine, BI, CMS).
- Buy when: it’s a commoditized, compliance-heavy suite where integration is cheaper than owning the surface area (enterprise support/CRM breadth).

## 🔗 8) Links to evidence

- Evidence crosswalk: `artifacts/evidence-index.md`
- Features ranked: `artifacts/features-ranked.md`
- OSS ranked: `artifacts/oss-ranked.md`
- Competitor matrices:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/artifacts/competitor-matrix.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/artifacts/competitor-matrix.md`
- OSS candidates:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/artifacts/oss-shortlist.md`
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/live-web-research-tranche-005-oss-expansion.md`
