# Gamification Roadmap (Phased)

This roadmap keeps gamification **shippable** and reduces risk by proving value early.

## Phase 0 — Planning + UI scaffolding (1–2 days)

- Finalize MVP decisions (earn rate, award timing, reward catalog)
- Add placeholder UI components (read-only):
  - points balance pill
  - rewards drawer / page shell
  - “earn X points” line on PDP
- Instrument events (view rewards, click redeem) even before backend

Status (Dec 2025):
- ✅ `/rewards` page shipped with points summary + earn actions + history (manual claims for now)

## Phase 1 — Points ledger MVP (3–7 days)

- Add Supabase tables:
  - `loyalty_points_ledger`
  - `loyalty_rewards`
  - `loyalty_redemptions`
- Read endpoints:
  - balance
  - ledger history
  - rewards list
- Award points via Shopify webhook (fulfilled → award, refund → reverse)
- Display points in account + cart

Status (Dec 2025):
- ✅ `loyalty_points_ledger` + `loyalty_task_claims` + RPC helpers are live
- ✅ Shopify webhook awarding (fulfillment → award, refunded → reverse) is live
- ⏳ Redemption catalog + issuing rewards still pending

Exit criteria:
- points reliably credit once per order (idempotent)
- refund reversals work
- basic UI shows correct balance

## Phase 2 — Redemption MVP (3–7 days)

- Implement redemption endpoint:
  - verify balance
  - deduct points (ledger)
  - issue reward (Shopify discount code or in-app cart adjustment)
- UX: confirm redemption + show applied reward

Exit criteria:
- redemption works end-to-end without support intervention
- cannot redeem beyond balance

## Phase 3 — Activation + progress UI (1–3 days)

- Endowed progress:
  - welcome bonus ledger entry
- Progress UI:
  - “points to next reward”
  - progress bar
- “Double points weekend” promo flag (simple config)
- Optional: **bonus wheel** (everyone wins)
  - recommended as a **guaranteed unlock** (“10% off + free shipping”)
  - limit spins (welcome 1× per account, or post-purchase with strict limits)
  - server-side issuance + idempotency

## Phase 4 — Tiering + experiments (optional)

- Tiers with clear perks (avoid complexity):
  - multipliers (earn faster)
  - early access drops
- A/B tests:
  - default next reward
  - endowed progress size
  - reward assortment

## Phase 5 — Creator progression (separate track)

- Missions + streaks (weekly)
- XP ledger + badges
- Attribution to sales (careful: data + fairness)
