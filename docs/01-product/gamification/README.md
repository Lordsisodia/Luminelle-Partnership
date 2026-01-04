# Gamification (Planning Hub)

This folder is the home for **all planning related to gamification** inside Lumelle:

- Customer loyalty (points, rewards, tiers)
- Creator program progression (missions, streaks, leaderboards, badges)
- On-site “micro wins” (progress cues, unlocks, milestones)

The goal is to keep this work **research-backed**, **ethical**, and **shippable** (starting with an MVP).

## What’s live right now (Dec 2025)

- `/rewards` page: points summary + claimable actions + recent history
- Supabase MVP:
  - `loyalty_points_ledger` (append-only points)
  - `loyalty_task_claims` (one claim per action per account)
  - RPC helpers: `get_loyalty_points_summary`, `claim_loyalty_task`
- Purchase points: awarded on Shopify `fulfillments/create` when the checkout includes `lumelle_user_id` (reversed on full refunds)
- Welcome wheel: 1× per account unlock tracked in `welcome_wheel_claims`

## Why we’re doing this

Lumelle is already “gamified” in spirit (creator proof, leaderboards, social momentum). The next step is to make that
loop **explicit** and **measurable**:

- Drive repeat purchases (retention) without feeling spammy
- Increase creator participation and consistency
- Increase review/referral activity
- Make progress feel visible (“I’m close to something”)

## Principles (high level)

1. **Progress beats prizes**: show users they’re getting closer to a goal (progress bars, milestones).
2. **Rewards should reinforce identity**: “I’m a Lumelle regular / creator” not “I’m being bribed”.
3. **Make it fair + predictable**: points should be transparent, explainable, and reversible on refunds.
4. **Avoid dark patterns**: no gambling-like mechanics, no deceptive urgency.
5. **Use a ledger**: treat points like money (audit trail, idempotency, reversals).

## Docs index

- `docs/01-product/gamification/research.md` — psychology + evidence-backed gamification notes
- `docs/01-product/gamification/lumelle-gameplan.md` — behaviors, loops, and feature modules tailored to Lumelle
- `docs/01-product/gamification/loyalty-points-mvp.md` — a pragmatic points + rewards MVP spec
- `docs/01-product/gamification/implementation.md` — backend + UI integration approach (Supabase + Shopify)
- `docs/01-product/gamification/roadmap.md` — phased rollout plan (MVP → redemption → tiers → creator progression)

## What we will measure

Suggested “north star” + supporting metrics:

- **North star**: repeat purchase rate (30/60/90 days) for logged-in users
- **Supporting**:
  - redemption rate (% of users who redeem within 60 days)
  - points earned per active customer (median; avoid being skewed by whales)
  - points liability (unredeemed points balance)
  - creator weekly active rate (WAU) + streak completion
  - review rate / referral rate

## Glossary

- **Points / XP**: numeric progress currency (earnable, spendable, or both)
- **Ledger**: immutable list of point transactions (earn/burn/reversal)
- **Tier**: status level unlocked by cumulative spend/activity
- **Mission**: discrete task (“post 2 videos this week”) with a reward
- **Streak**: repeated behavior with escalating reward (“post weekly for 4 weeks”)
- **Unlock**: content/reward that becomes available after a milestone
