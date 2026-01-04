---
step: 0063
created_at: "2025-12-30 19:26"
title: "Checkpoint: Cycle 59 — Subscription ops mode separation (Shopify vs provider vs B2B)"
---

# Step 0063: Checkpoint: Cycle 59 — Subscription ops mode separation (Shopify vs provider vs B2B)

## ✅ What I did (facts)

- Updated **Tranche #23 — Subscription ops** in `artifacts/build-vs-integrate-matrix.md` to explicitly represent 3 operating modes:
  - Shopify-native subscriptions (Shopify contracts + billing attempts are truth)
  - Subscription provider mode (provider contracts are truth)
  - B2B billing-provider mode (quotes/invoices/account hierarchy live in Tranche #26)
- Edited multiple workflow rows (skip/pause/swap/add-ons/cadence/dunning) to use “Shopify API OR provider API” language to prevent an implicit assumption that Shopify contracts exist for every merchant.
- Corrected evidence alignment in billing-failure + dunning rows (removed external billing evidence where Shopify billing-attempt evidence is the correct anchor, added OSS queue evidence for timers). (S225–S226, S229)
- Added two new rows to Tranche #23 to cover “merchant mode configuration” and “backfills + run history” for subscription ingestion.

## 🧠 What I learned (new information)

- “Subscription ops” is a unifying UX layer, but the system-of-record can vary; if we don’t explicitly model that, we’ll drift into building duplicate contract/billing objects.
- The simplest “truth drift prevention” is operational:
  - show “source of truth” in the UI
  - route all writes to that upstream system
  - store only derived ops state (cutoffs, queues, audit)

## 🧭 What changes because of this

- Implementation sequencing becomes safer: teams can ship Shopify-native portal flows without accidentally inheriting B2B invoicing requirements.
- The matrix now clearly “points” B2B invoicing/quotes/account hierarchy work to Tranche #26, reducing scope creep in Tranche #23.

## ➡️ Next step

- Run a quick duplication cleanup pass: Tranche #5 appears twice (two different scopes); mark one as “foundation vs extensions” for implementation sequencing.
- Pick the next missing tranche from the feature catalog and add 8–14 build-vs-integrate rows (prefer a tranche that will influence architecture decisions).

## 🔗 Links / references

- Matrix: `artifacts/build-vs-integrate-matrix.md`
- Rubric: `artifacts/build-vs-integrate-agent.md`
- Evidence IDs: S221–S228, S172–S175, S225–S226, S229, S187–S193
