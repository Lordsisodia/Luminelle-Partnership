---
step: 0002
created_at: "2025-12-31 20:30"
title: "Publish Shopify app primitives blueprint"
---

# Step 0002: Publish Shopify app primitives blueprint

## ✅ What I did (facts)

- Published a canonical “Shopify app primitives” blueprint doc to lock the findings from Step 0001 into a reusable reference (so we don’t keep rediscovering the same OAuth/session/webhook patterns).
- Wired the blueprint into the rest of the OSS catalog so it’s discoverable from the relevant lanes and file-pointer maps.
- Ensured the blueprint stays implementation-focused (primitives + boundaries + checklists) and does **not** depend on any single starter repo architecture.

## 🧠 What I learned (new information)

- The reusable “embedded app substrate” is a small set of primitives; once those are stable, most Shopify app templates become redundant to search for.
- The most error-prone pieces are:
  - correctly separating online vs offline sessions and storage lifetime
  - webhook raw-body verification + idempotency/dedupe
  - app proxy signature verification and query normalization rules
- Keeping “file pointers” (exact paths in reference repos) is higher leverage than keeping more repos in curation.

## 🧭 What changes because of this

- Future discovery cycles can stay focused on *new* primitives (returns/shipping/policy/admin) rather than repeatedly pulling Shopify app starters.
- The reliability lane (webhooks + idempotency) now has a concrete Shopify-specific implementation reference to align decisions/logging/outbox patterns.

## ➡️ Next step

- Update storefront mining contracts to explicitly point to the canonical storefront reference set (incl. `vercel/commerce`) so “storefront discovery” also moves into mining mode.

## 🔗 Links / references

- Blueprint: `docs/.blackbox/oss-catalog/shopify-app-primitives.md`
- File pointers: `docs/.blackbox/oss-catalog/component-source-map.md`
- Reliability lane: `docs/.blackbox/oss-catalog/lanes/reliability-webhooks-idempotency.md`
- Primary sources (reference repos):
  - `kinngh/shopify-nextjs-prisma-app`
  - `carstenlebek/shopify-node-app-starter`
