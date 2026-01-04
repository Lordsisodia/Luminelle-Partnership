---
step: 0001
created_at: "2025-12-31 21:33"
title: "Baseline: confirm existing returns gaps + targets"
---

# Step 0001: Baseline: confirm existing returns gaps + targets

## ✅ What I did (facts)

- Confirmed our current catalog/curation still has a real “returns gap”:
  - `returns` tag coverage is extremely low relative to adjacent ops primitives (shipping/search/admin).
- Confirmed that repeated GitHub discovery runs are now diminishing returns for RMA:
  - the returns lane already documents that both “min-stars 50” and “low-stars” passes are saturated/noisy.
- Defined the target primitives we need to mine (so subsequent steps have a clear extraction checklist).

## 🧠 What I learned (new information)

- The highest ROI path for returns is **mining models and flows** from mature platforms we already track (Saleor/Solidus/Spree), not finding more “returns repos”.
- The key missing pieces are not UI components; they’re:
  - a return/RMA lifecycle state machine
  - refund + payment adjustment rules
  - store credit issuance/redemption modeled as a ledger with auditability

## 🧭 What changes because of this

- We stop “search mode” for returns and switch to “mining mode”:
  - fewer discovery cycles
  - more exact file pointers + domain model mapping
- Our success metric becomes: “could an engineer implement Returns v0 from this doc set?” not “did we add more repos?”

## ➡️ Next step

- Mine Saleor first (strong Python/GraphQL domain modeling), focusing on:
  - return/fulfillment/refund concepts (and any gift-card/store-credit analogs)
  - the event/audit hooks around those transitions

## 🔗 Links / references

- Inventory snapshot: `docs/.blackbox/oss-catalog/inventory.md` (returns tag count)
- Returns lane: `docs/.blackbox/oss-catalog/lanes/returns-store-credit.md`
- Source map: `docs/.blackbox/oss-catalog/component-source-map.md`
- Curation list: `docs/.blackbox/oss-catalog/curation.json`
