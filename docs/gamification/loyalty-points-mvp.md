# Loyalty Points MVP (Customer)

This is the minimal, shippable spec for a **logged-in customer points system** where users:

- **earn points** from purchases (and optional bonuses)
- optionally get **bonus points** via a small “spin wheel”
- **spend points** on a reward catalog (discounts, free shipping, bundles)

The MVP is designed to be:
- simple (one currency)
- auditable (ledger-based)
- sustainable (we control reward costs + caps)

---

## Goals

- Increase repeat purchases + bundles
- Make progress feel visible (“I’m close to something”)
- Give marketing more levers (bonus points promos) without constant discounting

## Non-goals (MVP)

- Multiple currencies (coins/gems/tickets)
- Customer leaderboards
- Randomized / gambling-like mechanics as the *primary* feature
  - The wheel (if used) must be “everyone wins”, limited, and transparent

---

## Core decisions (current)

- Identity: **logged-in only** (points belong to the user account)
- Welcome bonus: yes (we’ll set the exact amount once the economy is finalized)
- Wheel: **welcome-only** (1× per account) “unlock” (see below)

---

## Points economy (how we avoid chaos)

Even if we don’t show a direct “£ per point” conversion, points still have **real cost**.

So we design the economy around:

1) **Target time to first meaningful reward**
- e.g. 2–3 purchases for “free shipping” or “5% off”

2) **Effective rebate range**
- e.g. average user gets ~3–7% back over time (depends on margin)

3) **Hard caps**
- % off rewards have a **max discount**
- rewards have **min spend** where needed

### Proposed starting earn rate (matches your mental model)

You mentioned: *“Spend £20 → get 1,000 points.”*

That implies:
- **Earn = 50 points per £1 spent**

This is fine *as long as reward costs are priced accordingly* (i.e., 1,000 points is **not** automatically “£20 off”).

---

## Earning points

### Base earn (MVP)

- Earn points on eligible spend: `points = floor(order_subtotal_gbp * 50)`
- Award when order is **fulfilled** (reduces fraud/returns complexity)

### Welcome bonus (logged-in only)

Recommended:
- **+500 points** on account creation (feels like a head start)

If you want a smaller “hello”:
- +100 or +200 points

### Bonus points (promos)

Safe, transparent bonuses:
- “Double points weekend”
- “Buy 2, bonus +500 points”
- “Review bonus +200 points (post-delivery)” (optional later)

---

## Bonus wheel (optional, “everyone wins”)

You suggested a wheel concept, but clarified an important requirement:

> The wheel should **always** land on whatever gives the user **10% off + free shipping**.

That changes the mechanic from “randomized reward” to a **guaranteed unlock**.

### Recommendation (keep it honest)

If we want the UX of a wheel **but** a guaranteed outcome, we should avoid implying randomness.
Two acceptable patterns:

1) **“Claim your reward”** (tap-to-reveal) with a wheel animation  
2) A wheel with **all segments identical** (“10% off + free shipping”) so it’s truthfully guaranteed

Avoid:
- a “random” wheel that is secretly deterministic (trust/legal risk)

### Welcome wheel: what the client wants

- **Welcome-only**: 1 spin per account, not post-purchase.
- **Deterministic outcome**: the wheel always unlocks the welcome deal.
- Purpose: dopamine moment → immediate perceived value → drives login.

### Recommended wheel rules (MVP-safe)

- Only available to **logged-in users**
- Trigger: **welcome reward** (1× per account)
- Guaranteed outcome: **10% off + free shipping**
- Server issues the reward (client cannot forge it)
- Clear copy: “Guaranteed reward” / “You unlocked…”

### How the reward is granted

Two implementation options:

1) **Direct reward issuance (recommended)**
- Wheel grants the welcome deal directly (no points required).
- This avoids awkward point math and keeps the “dopamine” moment immediate.

2) **Grant points that enable redemption**
- Wheel grants enough points to redeem both rewards from the catalog.
- This requires setting point costs so that the wheel award always covers them.

### Anti-abuse guardrails

- **One-time** welcome reward (best) or strict limits per user/order
- Minimum spend + maximum discount on 10% reward (margin safety)
- If tied to purchase: don’t allow spin without a valid paid order
- Track idempotency so refreshes don’t re-award

---

## Rewards catalog (MVP)

You want rewards like:
- 5% off / 10% off / 20% off
- free shipping
- “combo” rewards (e.g., 1000 pts = £10 off + free shipping)

### Important note about % off rewards

% off is “unbounded” unless we add:
- minimum spend
- max discount amount

Otherwise users can redeem 20% off on huge baskets and blow margins.

### Proposed reward menu (v0)

These are *starting suggestions* aligned with `50 pts/£1` earn rate:

1) **Free shipping**
- Cost: **1,000 points**
- Eligibility: UK shipping only (if needed)

2) **5% off**
- Cost: **1,500 points**
- Min spend: £19.99
- Max discount: £5

3) **10% off**
- Cost: **3,000 points**
- Min spend: £29.99
- Max discount: £10

4) **20% off**
- Cost: **6,000 points**
- Min spend: £49.99
- Max discount: £15

5) **Bundle booster**
- Cost: **2,000 points**
- Reward: extra 5% off when buying 2 (stacking rules required)

If you still want a “combo” like “£10 off + free shipping”:
- Make it expensive (e.g. **8,000–10,000 points**) and apply strict min spend/caps.

### New combo reward (to support the guaranteed wheel)

If the wheel always grants “10% off + free shipping”, treat it as a **single bundled reward**:

- Title: **10% off + Free shipping**
- Type: discount code (recommended)
- Rules:
  - min spend (e.g. £29.99)
  - max discount (e.g. £10)
  - shipping applies to eligible zones only
  - non-stackable with other % promos (define precedence)

### Current Shopify discount code: `LUMINEL10`

We can implement the welcome wheel as a **one-time unlock** that auto-applies a Shopify discount code.

Client-provided parameters for `LUMINEL10`:
- Minimum spend: **£20**
- Expiry: **none**
- Should stack with “Buy 2 save 10%”

Implementation notes:
- If “free shipping over £19.99” is already a store rule, then a `£20` minimum makes the welcome deal feel like
  “10% off + free shipping” without needing a separate shipping code.
- If “Buy 2 save 10%” is a real Shopify discount, the `combinesWith` settings must allow stacking accordingly.

---

## Redemption mechanism

Two implementation options:

1) **Shopify discount codes** (simplest)
- Generate unique code per redemption
- User applies at checkout

2) **In-app cart adjustment**
- Apply reward directly in the app/cart
- More control, more complexity

If checkout is Shopify-hosted, discount codes are typically easiest.

---

## UX surfaces (minimum)

- Account: balance, ledger history, rewards list + redeem
- Cart: points balance + “redeem” entry point
- PDP: “Earn X points” line

Progress UI that drives behavior:
- “You’re 420 points from free shipping”
- progress bar to next reward

---

## Open questions to confirm

Confirmed:
- Wheel trigger: **welcome-only (1× per account)**
- Wheel grant type: **direct reward issuance**

Remaining:
- Confirm the exact “free shipping” rule (store-wide threshold vs shipping discount code).
- Confirm stacking behavior with “Buy 2 save 10%” (Shopify combines-with settings).
