# Implementation Notes (Backend + UI)

This doc outlines a practical way to implement **customer loyalty points** (and later creator progression) in Lumelle.

The guiding constraint: **keep it auditable and hard to break**.

---

## Current implementation (Dec 2025)

This is what’s already live in the codebase:

### Rewards page (UI)

- Route: `/rewards`
- File: `src/domains/rewards/ui/pages/RewardsPage.tsx`
- Shows:
  - points summary (balance / earned / spent)
  - claimable “earn actions” (manual for now; one per task per account)
  - recent points history
  - welcome wheel status + apply-to-cart shortcut

### Supabase schema (MVP)

- Migration: `server/migrations/2025-12-14_loyalty_points.sql`
- Tables:
  - `loyalty_points_ledger` (append-only points)
  - `loyalty_task_claims` (one claim per `task_key` per user)
- RPC:
  - `get_loyalty_points_summary()` → `{ balance, lifetime_earned, lifetime_spent }`
  - `claim_loyalty_task(p_task_key, p_meta?)` → atomic claim + ledger insert

### Welcome wheel (direct issuance)

- Supabase table: `welcome_wheel_claims` (1× per account)
- UI: `src/domains/landing/ui/sections/shop/final-cta-section/SpinWheelLocal.tsx`
- Auto-apply to cart: `src/domains/cart/providers/CartContext.tsx`

### Purchase points (Shopify webhooks)

We now award points from Shopify events (authoritative) instead of trusting the client.

How it works:

1) **Checkout attaches identity**
   - On `/checkout`, if the shopper is signed in with Clerk, we attach:
     - `lumelle_user_id` (Clerk user id)
     - `lumelle_user_email` (optional)
   - This is written into Shopify order `note_attributes` via cart attributes update.

2) **Award on fulfillment**
   - Webhook: `fulfillments/create`
   - If an order has `lumelle_user_id`, we insert a positive entry into `loyalty_points_ledger` with source:
     - `shopify:fulfillment:{shop}:{order_id}`
   - Idempotency: we use `ShopWebhookDeliveries` to dedupe by order (`loyalty:award:fulfillment:{shop}:{order_id}`)

3) **Reverse on full refund**
   - Webhook: `orders/updated`
   - If `financial_status=refunded`, we insert a negative ledger entry with source:
     - `shopify:refund:{shop}:{order_id}`
   - Idempotency: `loyalty:reverse:refund:{shop}:{order_id}`

Files:
- `src/domains/checkout/ui/pages/CheckoutPage.tsx`
- `api/shopify/webhooks/fulfillments-create.ts`
- `api/shopify/webhooks/orders-updated.ts`
- (Cloudflare parity) `functions/api/shopify/webhooks/*`

---

## 0) Architecture summary (MVP)

**Data store**: Supabase Postgres  
**Event sources**:
- Shopify order/fulfillment/refund webhooks (authoritative purchase events)
- App events (optional later): reviews, referrals, missions

**Core pattern**: a points **ledger** (append-only entries) + derived **balance**.

---

## 1) Data model (recommended)

### `loyalty_points_ledger`
Immutable point transactions.

Fields (suggested):
- `id` (uuid, pk)
- `user_id` (uuid / text) — internal user id (Clerk)
- `email` (text, nullable) — optional (useful for support/debugging even if logged-in only)
- `delta_points` (int) — positive for earn, negative for spend/reversal
- `reason` (text) — e.g. `order_fulfilled`, `reward_redeemed`, `refund`, `welcome_bonus`, `wheel_bonus`
- `source_type` (text) — e.g. `shopify_order`, `reward`, `wheel`
- `source_id` (text) — e.g. Shopify order id, reward redemption id
- `idempotency_key` (text, unique) — prevents double-crediting
- `created_at` (timestamptz)

Rules:
- Never “update” old entries; create reversals.
- Unique `idempotency_key` across all events.

### `loyalty_rewards`
The reward catalog.

Fields:
- `id` (uuid)
- `code` (text, unique) — stable identifier: `free_shipping_500`
- `title` (text)
- `description` (text)
- `cost_points` (int)
- `reward_type` (enum/text): `discount_code`, `free_shipping`, `bundle`
- `metadata` (jsonb) — anything needed for redemption (min basket, % off, etc.)
- `active` (bool)
- `created_at`

### `loyalty_redemptions`
One row per redemption.

Fields:
- `id` (uuid)
- `user_id` and/or `email`
- `reward_id`
- `status` (`created`, `issued`, `used`, `cancelled`)
- `external_reference` (text) — e.g. Shopify discount code id
- `created_at`

### Balance
Two options:
- Compute on read: `SUM(delta_points)` per user/email (simple, slower at scale)
- Maintain a materialized view or cached table updated transactionally (faster)

MVP recommendation:
- Compute on read for simplicity, add caching later if needed.

---

## 2) Identity mapping (important)

Points must map to a person reliably. Two feasible approaches:

### Option A: Logged-in only (simple)
- Only award points to known `user_id` accounts.
- Upside: simplest.
- Downside: users who checkout without logging in don’t get points.

Decision (Lumelle):
- **Logged-in only** (award points to authenticated users)

### Option B: Email-first (recommended for Shopify)
- Award points based on the **checkout email** in the Shopify order webhook.
- If/when the user logs in later (Clerk), “claim” the email and attach history.

Implementation note:
- Store `email` on ledger entries even if `user_id` exists (helps debugging and reconciliation).

---

## 3) Awarding logic (Shopify)

### When to award
MVP recommendation:
- Award on **fulfillment** (reduces fraud; matches “we shipped it”).

### How to compute points
Example:
- points = `floor(subtotal_gbp * earn_rate_points_per_pound)`  
- keep it integer, always.

Note:
- Earn rate and reward costs are separate. See `docs/01-product/gamification/loyalty-points-mvp.md`.

### Webhooks needed
At minimum:
- `orders/fulfilled` (or `fulfillments/create`) → award points
- `refunds/create` (or `orders/updated` with refund info) → reverse points

Idempotency:
- `idempotency_key = "shopify:fulfill:{order_id}"` for award
- `idempotency_key = "shopify:refund:{refund_id}"` for reversal

---

## 4) Redemption flow

### UX
- User opens “Rewards”
- Picks reward
- Confirms redemption
- Reward is applied (discount code/coupon) and points are deducted

### Backend steps (transaction)
1) Verify available points (sum ledger)
2) Create redemption record
3) Deduct points (ledger entry: negative delta)
4) Issue reward (e.g. create Shopify discount code)
5) Mark redemption `issued`

If step 4 fails:
- either rollback (single transaction if possible)
- or mark redemption failed and add an automatic refund ledger entry

---

## 5) UI surfaces (where to integrate)

Minimum viable UI:
- **Account page**:
  - points balance
  - ledger history
  - rewards catalog + redemption
- **Cart drawer**:
  - “You have 850 points”
  - “Redeem: free shipping in 150 points”
- **Product page**:
  - “Earn X points with this order”

“Progress UI” that drives the loop:
- “120 points to free shipping” badge
- progress bar (current points → next reward)

---

## 6) Observability + metrics

Log + track:
- points earned / redeemed per day
- redemption conversion rate
- negative balances (refund edge cases)
- double-award prevention hits (idempotency conflicts)

Analytics events (nice-to-have):
- `loyalty_points_earned`
- `loyalty_reward_viewed`
- `loyalty_reward_redeemed`

---

## 7) Security + abuse prevention

- Never accept client-reported “purchase” events.
- Award only from Shopify webhooks.
- Use idempotency keys everywhere.
- Rate-limit redemption endpoints.
- Always validate reward eligibility server-side (min basket, region, etc.).

---

## 8) Bonus wheel (optional)

Requirement (Lumelle):
- The wheel should **always** grant the outcome that enables **10% off + free shipping**.

So the “wheel” is effectively a **guaranteed unlock** with playful animation.

Key requirement:
- the **server** issues and records the reward (the client can’t forge it)
- don’t imply randomness if the outcome is guaranteed (copy/legal/trust)

Suggested implementation:

### Data
- Prefer issuing a **bundle reward redemption** instead of raw points:
  - Create a `loyalty_redemptions` row for the combo reward (10% + free ship)
  - Add a ledger spend entry only if you decide to “charge points” for it (optional)

If you still want it as points:
- Reuse `loyalty_points_ledger` with:
  - `reason = wheel_bonus`
  - `source_type = wheel`
  - `source_id = welcome | order:<shopify_order_id> | week:<iso_week>`
  - `idempotency_key = wheel:<user_id>:<source_id>`

### Endpoint (example)
- `POST /api/loyalty/wheel/spin`
  - Auth required
  - Server checks eligibility (e.g. not already spun this week)
  - Server issues the combo reward (10% + free shipping)
  - Returns `{ reward, redemptionId }` (and balance if points are involved)

### UX rules
- “Guaranteed reward” (not random)
- Hard limit per user per period
- If tied to purchase: include order id in idempotency key

---

## 9) Next step after MVP: creator progression

Keep customer points and creator XP separate.

Creator XP events could come from:
- content submissions (manual review or integrations)
- sales performance (Shopify affiliate attribution)
- onboarding completion

Data model can reuse the same ledger pattern:
- `creator_xp_ledger` + `creator_badges` + `creator_missions`
