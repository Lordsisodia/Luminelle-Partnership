# Gamification (Planning Hub)

This folder is the home for **all planning related to gamification** inside Lumelle:

- Customer loyalty (points, rewards, tiers)
- Creator program progression (missions, streaks, leaderboards, badges)
- On-site “micro wins” (progress cues, unlocks, milestones)

The goal is to keep this work **research-backed**, **ethical**, and **shippable** (starting with an MVP).

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

- `docs/gamification/research.md` — psychology + evidence-backed gamification notes
- `docs/gamification/lumelle-gameplan.md` — behaviors, loops, and feature modules tailored to Lumelle
- `docs/gamification/loyalty-points-mvp.md` — a pragmatic points + rewards MVP spec
- `docs/gamification/implementation.md` — backend + UI integration approach (Supabase + Shopify)
- `docs/gamification/roadmap.md` — phased rollout plan (MVP → redemption → tiers → creator progression)

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
