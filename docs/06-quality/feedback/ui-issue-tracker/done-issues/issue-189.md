# Issue 189: Account “Payment methods” has dev artifacts; consider removing or simplifying (Shopify is the payment source-of-truth)

Source: Client feedback screenshot `codex-clipboard-iQAwr3.png` (Jan 2026)
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `3`
- Reach (1–5): `3`
- Effort (1–5): `2`
- Confidence (1–3): `2`
- Priority: `(3×3×2)−2 = 16`
- Owner: `AI`
- Created: `2026-01-07`
- Closed: `2026-01-08`
- PR: `#14`

---

## Problem statement

The account “Payment methods” section contains development/debug UX, but payments are handled via Shopify checkout. The client suggests removing payment methods entirely, while keeping orders/history.

---

## Resolution

The “Payments” section is now treated as an informational/help page (not a place to manage saved cards), matching the reality that payments are handled via Shopify checkout.

Additionally, any remaining local-only “saved payments” scaffolding was removed to avoid reintroducing mock/debug UX.

## What changed

- The `/account/payments` route renders a “Payments are handled securely at Shopify checkout” help page with cart + support CTAs (no mock “saved cards” UI).
- Removed unused localStorage-backed account store code that previously included a “payments” concept (`lumelle_payments`), which is not a real source of truth.

## Notes

- Research notes: `docs/06-quality/feedback/ui-issue-tracker/done-issues/issue-189-research.md`
