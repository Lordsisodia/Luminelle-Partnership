---
step: 0062
created_at: "2025-12-30 19:19"
title: "Checkpoint: Cycle 58 — B2B subscription ops build vs integrate classification"
---

# Step 0062: Checkpoint: Cycle 58 — B2B subscription ops build vs integrate classification

## ✅ What I did (facts)

- Added **Tranche #26 — B2B subscription ops** to `artifacts/build-vs-integrate-matrix.md` with 12 rows covering: account hierarchy, quotes, invoices, advance invoices, Shopify subscription contracts/updates/cancel, drafts, billing-failure queues (dunning), entitlements, and seat provisioning.
- Mapped each workflow slice to a **best-leverage path** (Shopify API vs billing-provider API vs OSS jobs vs custom ops UX) and explicitly stated “truth vs derived” storage posture per row.
- Anchored the tranche on existing evidence IDs for billing-provider primitives (Chargebee/Recurly) and Shopify subscription primitives. (S187–S193, S221–S227, S229)
- Updated cycle logs: `artifacts/search-log.md`, `artifacts/summary.md`, `artifacts/output-index.md`, `artifacts/skills-log.md`, `artifacts/prompt-log.md`, and `context/context.md`.

## 🧠 What I learned (new information)

- “B2B subscription ops” is often **two different product modes**:
  - **Shopify-native subscriptions**: treat Shopify subscription contracts + billing attempts as truth; build ops UX around them. (S221–S226)
  - **Billing-provider-led B2B**: treat billing provider as truth for account hierarchy + quotes + invoices + entitlements; build ops UX around those objects and store only derived state internally. (S187–S193)
- The highest-risk failure mode is creating a **second billing system of record** (duplicated invoice state, duplicated contract state); the safe pattern is “upstream truth + our ops control plane.” (S189, S65)

## 🧭 What changes because of this

- We can treat “subscriptions” as a shared UX layer (queues, approvals, audit) but must **branch the write paths** by upstream system-of-record (Shopify vs billing provider) to avoid drift.
- Thin slices should prioritize **ops queues** (contract list, failed billing attempts) over complex B2B invoice logic; invoice truth stays upstream.

## ➡️ Next step

- Optional consistency cleanup: revisit Tranche #23 Subscription ops to add an explicit “B2B billing provider mode” note so subscription sections don’t conflict. (S221–S227, S187–S193)
- Continue build-vs-integrate classification for the next highest-leverage missing tranche in `artifacts/build-vs-integrate-matrix.md` (pick 1 tranche; add 8–14 rows).

## 🔗 Links / references

- Matrix update: `artifacts/build-vs-integrate-matrix.md`
- Rubric / decision tree: `artifacts/build-vs-integrate-agent.md`
- Evidence index: `artifacts/sources.md` (S187–S193, S221–S227, S229, S65)
