---
status: active
last_reviewed: 2025-12-29
owner: agent-zero
---

# Tranche 006 Brief — “Vibe-coding” ecommerce ops features

Purpose: run the **next research tranche** in a way that directly yields “easy to integrate” code + build-ready workflows.

## 🎯 Focus areas (what to research next)

1) **Returns / RMA**
   - states, approvals, exchanges, restock, refunds
   - exception queues + reason codes + recommended actions

2) **Fraud / risk / guardrails**
   - risk scoring, rule engine, manual review, approvals, audit trails
   - “safe actions” (refund/replace/reship) with permissioning + logging

3) **OMS / WMS-light**
   - allocations, holds, split shipments, picking/packing signals, inventory adjustments
   - “operations timeline” + “needs attention” queues

4) **Pricing / promotions**
   - rules UI, drafts/approvals, schedules, rollouts, rollback
   - audit + preview + staged rollout patterns

## ✅ Deliverables (what gets written)

Write these to the synthesis folder:

- `artifacts/live-web-research-tranche-006.md`
  - curated repo list (OSS) + competitor references
  - license flags (✅ permissive / ⚠️ verify / 🧨 copyleft)
  - “fastest integration” shortlist

- `artifacts/top-50-market-features.md`
  - ensure tranche-006 findings map to specific rows (add links)

## 🧪 Output style (keep it runnable)

For each finding (competitor feature or OSS repo), capture:

- **What it is**
- **What we’d steal** (UI pattern / data model / workflow stages)
- **Fastest integration path** (embed UI vs service boundary vs inspiration-only)
- **1-day POC**
- **1-week integration**
- **Risks** (license / security / maintenance / scope mismatch)

## 🔍 Deep-audit requirement (10 repos)

Pick **10 repos** from the tranche and do deeper audits using:
- `artifacts/oss-deep-audit-template.md`

The point is to move beyond “link dumps” into “we know how we’d integrate this”.

