---
step: 0002
created_at: "2025-12-30 17:43"
title: "Checkpoint: shipping carriers v2 + Shippo POC"
---

# Step 0002: Checkpoint: shipping carriers v2 + Shippo POC

## ✅ What I did (facts)

- Ran a carrier-specific shipping discovery pass (UPS/FedEx/DHL/USPS + Shippo/EasyPost/Sendcloud/AfterShip).
- Seeded 15 new candidates into curation and rendered the catalog.
- Promoted `goshippo/shippo-php-client` to a 1-day POC for carrier-agnostic rates/labels/tracking patterns.
- Rejected one flagged-license carrier client.

## 🧠 What I learned (new information)

- Carrier SDKs and shipping aggregator SDKs (Shippo, Postmen/AfterShip) are the highest-signal “shipping integration primitives” we can catalog.\n- These repos are often small (low stars) but still valuable for extracting the integration sequence + normalized shipment data model.

## 🧭 What changes because of this

- We should keep a dedicated “shipping integrations” track and promote 1 SDK at a time into a short POC to extract reusable integration checklists and schemas.

## ➡️ Next step

- Deepen the Shippo POC: document the exact rate/label/tracking lifecycle + DB schema and compare against the EasyPost POC to decide our internal abstraction.

## 🔗 Links / references

- Query pack: `.blackbox/.local/github-search-queries.shipping-carriers-v2.md`
- Plan: `.blackbox/.plans/2025-12-30_1741_oss-discovery-github-oss-discovery-cycle-174112`
- POC backlog: `.blackbox/oss-catalog/poc-backlog.md`
