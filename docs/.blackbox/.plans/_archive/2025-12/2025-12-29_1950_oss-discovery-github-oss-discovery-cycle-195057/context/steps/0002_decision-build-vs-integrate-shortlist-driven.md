---
step: 0002
created_at: "2025-12-29 19:54"
title: "Decision: build vs integrate (shortlist-driven)"
---

# Step 0002: Decision: build vs integrate (shortlist-driven)

## ✅ What I did (facts)

- Wrote a short “build vs integrate” decision based on the current POC list + curated shortlist.
- Chose 3 items to build (core differentiation) and 3 to integrate (best OSS candidates).

## 🧠 What I learned (new information)

- Our strongest evidence-backed OSS candidates map cleanly to “policy”, “audit”, and “workflow runtime” primitives, while our differentiation is in returns/support/ops surfaces and Shopify-specific integration.

## 🧭 What changes because of this

- We stop evaluating random full-stack “ecommerce platforms” as replacements and focus discovery on primitives that plug into our platform.
- POCs should now be judged by “integration boundary clarity” (what we own vs what the OSS owns) instead of “feature completeness”.

## ➡️ Next step

- Timebox POCs against these decisions: confirm OPA + Retraced + (Kestra or SpiceDB) fit and integration boundaries, then convert to `adopt | deepen | reject`.

## 🔗 Links / references

- `.blackbox/oss-catalog/search-focus.md`
- `.blackbox/oss-catalog/poc-backlog.md`
- `.blackbox/oss-catalog/shortlist.md`

---

## Decision note (short + decisive)

### 3 things we should build ourselves (core differentiation)

1) **Returns/exchanges workflow + decisioning**
   - Why: this is Outcome B and where we differentiate (rules, store credit, exchange routing, warehouse receiving).
2) **Unified support + ops timeline**
   - Why: the “single pane of glass” across orders/returns/shipments/support is our product surface (Outcome C), and it must match our data model.
3) **Shopify-first integration + execution ledger**
   - Why: reliability (idempotency, retries, safe write-backs) and Shopify constraints are specific; we should own the connector framework and execution history.

### 3 things we should integrate (best OSS candidates)

1) **Policy engine** → `open-policy-agent/opa`
   - Why: mature policy-as-code core; we wrap it with our own policy input schemas + approvals UX.
2) **Audit log service/UI** → `retracedhq/retraced`
   - Why: fast path to immutable audit trails + UI, which we can embed into our ops surfaces.
3) **Workflow orchestration runtime** → `kestra-io/kestra`
   - Why: strong scheduling/retries/visibility primitives; we can treat it as the execution substrate while owning our domain workflows and connectors.
