---
status: active
last_reviewed: 2025-12-29
owner: agent-zero
---

# 🌐 Live Web Research — Tranche 006 (Returns/Risk/OMS/Pricing primitives)

Goal: identify **high-leverage, low-friction** building blocks (OSS + proven UX patterns) for ecommerce admin workflows:
- Returns/RMA
- Fraud/risk + guardrails
- OMS/WMS-light operations
- Pricing/promotions + approvals

This tranche is designed to feed directly into:
- `artifacts/top-50-market-features.md`
- `artifacts/oss-deep-audits/*` (step-by-step integration plans)

## ✅ What we produced in this tranche (concrete outputs)

- 10 OSS deep audits (step-by-step templates, ready to fill in with repo-specific details):
  - `artifacts/oss-deep-audits/unleash-unleash.md`
  - `artifacts/oss-deep-audits/flagsmith-flagsmith.md`
  - `artifacts/oss-deep-audits/posthog-posthog.md`
  - `artifacts/oss-deep-audits/novuhq-novu.md`
  - `artifacts/oss-deep-audits/open-policy-agent-opa.md`
  - `artifacts/oss-deep-audits/casbin-casbin.md`
  - `artifacts/oss-deep-audits/temporalio-temporal.md`
  - `artifacts/oss-deep-audits/vendure-ecommerce-vendure.md`
  - `artifacts/oss-deep-audits/medusajs-medusa.md`
  - `artifacts/oss-deep-audits/karrioapi-karrio.md`

## 🧩 Mapping to our execution map (Top-50)

Use these rows as the “spine”:

1) Feature flags + staged rollouts (per-tenant)
2) Workflow automation hooks (triggers → actions → approvals)
3) Audit log (“who changed what”)
4) RBAC + granular permissions
5) Returns portal + exchange-first flow
6) Unified order timeline (“single pane of glass”)
7) Admin usage analytics
8) Search + merchandising rules
9) Support inbox → action center
10) Draft/preview/publish approvals (generic primitive)

Reference: `artifacts/top-50-market-features.md`

## 🏗️ What we should build vs integrate (fast guidance)

### ✅ Build (core UX primitives)

- Returns workflow UI + state machine (thin slice first)
- Exceptions queues (“needs attention”) + bulk actions
- Unified timeline (order/customer) + safe action panel
- Audit log + approvals + RBAC (foundational guardrails)

### 🔌 Integrate (service-boundary primitives)

- Feature flags control plane (Unleash / Flagsmith)
- Workflow orchestration (Temporal) for long-running ops
- Notifications (Novu) for merchant ops alerts
- Policy/guardrails evaluation (OPA / Casbin) for safe actions
- Shipping labels service (Karrio) as a boundary (if used)

## 🧰 OSS candidates (license status from our stored GitHub metadata)

Legend:
- ✅ permissive: MIT/Apache/BSD/etc.
- ⚠️ verify: metadata may be `NOASSERTION` or dual-license (verify before embedding)
- 🧨 flagged: copyleft or proprietary/commercial restrictions (treat as “avoid embedding” unless explicitly approved)

| Area | Repo | License | Why it matters | Integration posture |
|---|---|---|---|---|
| Guardrails / staged rollout | Unleash | ✅ Apache-2.0 | safer shipping velocity + rollback | service boundary |
| Guardrails / staged rollout | Flagsmith | ✅ BSD-3-Clause | remote config + flags | service boundary |
| Audit + usage analytics | PostHog | ✅ MIT (non-EE parts; repo has EE carve-outs) | understand admin usage + funnels | service boundary (or embed dashboards) |
| Notifications | Novu | 🧨 Proprietary / commercial restrictions (LICENSE-ENTERPRISE) | in-product alerts + routing | avoid embedding; use as inspiration only |
| Policy | OPA | ✅ Apache-2.0 | guard “dangerous actions” | service boundary |
| RBAC/ABAC | Casbin | ✅ Apache-2.0 | enforce permissions consistently | library in backend |
| Workflows | Temporal | ✅ MIT | reliable long-running tasks (returns/shipping) | service boundary |
| Ecommerce core | Medusa | ✅ MIT | returns/promotions workflows to study/borrow | inspiration / partial adoption |
| Ecommerce core | Vendure | 🧨 GPL-3.0 (dual-licensed w/ commercial option) | plugin patterns + promotions model | inspiration-only unless commercial license |
| Shipping labels | Karrio | 🧨 LGPL-3.0 (plus EE carve-outs) | shipping service boundary pattern | service boundary (license review needed) |

License evidence:
- `artifacts/license-verification-tranche-006.md`

## 🔔 Replacement candidates for “notifications / inbox” (permissive)

If we want notifications primitives without proprietary constraints:

- ✅ `binwiederhier/ntfy` (Apache-2.0) — push-style notifications service (service boundary).
  - Deep audit: `artifacts/oss-deep-audits/binwiederhier-ntfy.md`
- ✅ `gotify/server` (MIT; verified via LICENSE text) — simple notification server + apps (service boundary).
  - Deep audit: `artifacts/oss-deep-audits/gotify-server.md`
- ✅ `caronc/apprise` (BSD-2-Clause) — notification fan-out library (great for “send to many providers”).
  - Deep audit: `artifacts/oss-deep-audits/caronc-apprise.md`

Note: these are “primitives”, not full Novu-equivalent admin UX — we still build the “action center / inbox” UI ourselves.

## 🧾 Competitor evidence anchors (already captured)

Use these evidence files as the “truth” for market demand:

- Returns:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/loop-returns.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/aftership.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/happy-returns.md`

- Shipping ops / batch labels:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/shipstation.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/shippo.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/easypost.md`

- Support action center (context + safe actions):
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/gorgias.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/zendesk.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/intercom.md`

## ➡️ Next step (keep it simple)

1) Pick **3** rows from `top-50-market-features.md` (recommended: returns, action center, approvals).
2) For each, fill:
   - 1-day POC plan
   - 1-week integration plan
   - OSS accelerator choice (or “build”)
3) For OSS, verify any ⚠️ `NOASSERTION` licenses by checking each repo’s LICENSE file before adoption.
