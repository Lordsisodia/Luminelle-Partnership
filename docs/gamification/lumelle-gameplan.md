# Lumelle Gamification Gameplan (High-Level)

This doc maps the research/principles into **Lumelle-specific behaviors, loops, and feature modules**.

## Personas

### 1) Customer (Shopper)
Wants: great hair days, easy buying, trustworthy brand.

Desired behaviors:
- repeat purchase (restock / gifting / bundles)
- referral + review after satisfaction
- install PWA (faster return visits)

### 2) Creator (Affiliate)
Wants: momentum, clarity, support, and visible progress.

Desired behaviors:
- join WhatsApp + complete onboarding
- post consistently (weekly cadence)
- learn what converts (templates, scripts)
- generate sales + climb leaderboards

## Core loops

### Customer loop (loyalty)
Purchase → earn points → see progress to reward → redeem → repeat purchase

Key UI moments:
- post-checkout (“You earned +X points”)
- delivery + 2 days (review prompt; “bonus points for review”)
- account/cart (“You’re 120 pts from free shipping”)

### Creator loop (progression)
Complete mission → earn XP/badges → status unlocks perks → more confidence → more posting → more sales

Key UI moments:
- onboarding checklist
- weekly missions + streaks
- leaderboard placement change (“up 3 ranks”)

## Modules (ship in phases)

### Module A: Customer loyalty points (MVP)
See `docs/gamification/loyalty-points-mvp.md`.

### Module B: Rewards catalog
Simple set of redemptions:
- free shipping
- £ off coupon
- bundle discount
- “VIP drop” early access

### Module C: Tiers (optional)
Status levels that feel “identity based”:
- Bronze / Silver / Gold
Perks: multipliers, early access, limited drops, “priority dispatch”.

### Module D: Creator missions (separate track)
Avoid mixing customer points with creator XP (different incentives).
Examples:
- “Post 2 videos this week” → XP + badge
- “Hit 5 orders in 7 days” → bonus payout / perks

## What to avoid (anti-patterns)

- Random/slot-machine rewards (“spin to win”) as the *primary* mechanic
- Hard-to-understand point value (keep it simple, show equivalents)
- Too many currencies (points + gems + coins + tickets)
- Punishing expiration rules (use gentle reminders, not surprise loss)

## Decision log (to fill as we go)

- Currency naming: “Lumelle Points” vs “L-Points”
- Economy: earn rate (pts/£) + reward costs (points) + caps (min spend / max discount)
- Earn timing: order paid vs fulfilled vs delivered
- How we link identity: **logged-in account only** (decision)
- Welcome bonus: yes (amount to finalize with economy)
- Bonus wheel: optional (100/200/500/1000 outcomes + limits)
- Where rewards are redeemed: cart, account page, or checkout
