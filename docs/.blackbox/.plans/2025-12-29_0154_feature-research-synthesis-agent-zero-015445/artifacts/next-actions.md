---
status: active
updated_at_utc: 2025-12-30T14:37:17Z
---

# ✅ Next Actions (gap-driven intelligence loop)

This is the actionable queue derived from `gaps-report.md`.

## 🎯 Current “build decisions” focus (recommended wedge)

- Wedge: **Merchant Ops Action Center** (“workflow compression”) — evidence and MVP workflow spec:
  - `artifacts/final-synthesis.md` (sections “1b” + “1c”)
  - `artifacts/summary.md` (3-epic backlog)
- Core evidence anchors:
  - Support actions: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/gorgias.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/re-amaze.md`
  - Returns/exchanges: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/loop-returns.md`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/returngo.md`
  - Store credit: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/rise-ai.md`

## 🧱 Execution queue (next 7–10 working days)

- ✅ Spec foundations are now written (event taxonomy, action catalog, return state machine, policy keys/defaults, exceptions lifecycle):
  - `artifacts/implementation-epics-action-center-exceptions.md`
  - `artifacts/open-questions.md`

- Week‑1 ticketization (ship read-only + one safe action):
  - Use: `artifacts/week-1-backlog.md`
  - Implementation target: Ticket list + ticket detail + order context panel + timeline + action runner skeleton

- Week‑2 ticketization (approvals + one money-moving action):
  - Use: `artifacts/week-2-backlog.md`
  - Pick exactly one: `ISSUE_STORE_CREDIT` OR `REFUND_PAYMENT`

- Week‑3 ticketization (volume + bulk + SLAs + robust exceptions loop):
  - Use: `artifacts/week-3-backlog.md`

- Decision to finalize before coding money-moving actions:
  - Choose the first MVP action (refund vs store credit) and lock thresholds as defaults per `artifacts/implementation-epics-action-center-exceptions.md`

## 🧪 Evidence-to-build validation (fast)

- Use the enriched 100-store matrix to keep “best models” decisions grounded in evidence:
  - Store matrix (human notes + snapshot signals): `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-stores-100.enriched.csv`
  - Snapshot scan source (raw): `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/reports/store-snapshots-summary.csv`
  - Niche playbook (model stores per niche): `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-niche-playbook.md`
  - Feature adoption matrix (tooling signals + examples): `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-feature-adoption-matrix.md`
  - Scored dataset (segment + heuristic score): `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-stores-100.scored.csv`
  - Shortlists (Top‑25): `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-model-stores-top25.md`
  - Shortlists (apparel-first): `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-model-stores-top25-apparel-first.md`
  - Conversion checklist (build/integrate order + evidence tiers): `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-conversion-feature-checklist.md`

- Run 3 manual funnel audits (women’s fashion) to convert hypotheses into screenshot-proof patterns:
  - Run plan + checklist: `artifacts/womens-fashion-next-3-audits.md`
  - Output: update `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/DASHBOARD.md` with 3 completed audits

## 🧾 Operator cadence (keep it simple)

- Each cycle: update at least 1 “decisioning artifact” (`final-synthesis.md`, `summary.md`, `next-actions.md`, `open-questions.md`) and add a checkpoint step file.
- Prefer decisions + specs over more competitor scraping unless a decision is blocked.
