# Issue 189: Account “Payment methods” has dev artifacts; consider removing or simplifying (Shopify is the payment source-of-truth)

Source: Client feedback screenshot `codex-clipboard-iQAwr3.png` (Jan 2026)
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `NEEDS_DECISION`
- Area: `Client`
- Impact (1–5): `3`
- Reach (1–5): `3`
- Effort (1–5): `2`
- Confidence (1–3): `2`
- Priority: `(3×3×2)−2 = 16`
- Owner: `AI`
- Created: `2026-01-07`

---

## Problem statement

The account “Payment methods” section contains development/debug UX, but payments are handled via Shopify checkout. The client suggests removing payment methods entirely, while keeping orders/history.

---

## 🔁 Multi-agent workflow (runbook)

### Agent 1 — Research + recommendation (NO CODE CHANGES)

**Goal:** decide what the account area should contain and propose 3 options.

#### Tasks

1. Identify the current Payment Methods page
2. Determine what is actually stored where (Shopify vs app)
3. Propose 3 options:
   - remove tile/page
   - replace with “Payment handled at Shopify checkout” help page
   - deep-link to Shopify account portal if available

#### Deliverable

- `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-189-research.md`

---

## Worklog

- 2026-01-08 18:19 UTC — Triage batch 3: set status to `NEEDS_DECISION` (product decision: remove vs replace vs deep-link; needs clarity on Shopify account source-of-truth).
