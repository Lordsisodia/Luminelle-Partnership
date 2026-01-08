# Issue 186: “Trusted by 10k users” avatars repeat (needs more authentic social proof)

Source: Client feedback screenshot `codex-clipboard-Alx6MA.png` (Jan 2026)
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DEFERRED`
- Area: `Client`
- Impact (1–5): `2`
- Reach (1–5): `5`
- Effort (1–5): `2`
- Confidence (1–3): `2`
- Priority: `(2×5×2)−2 = 18`
- Owner: `AI`
- Created: `2026-01-07`

---

## Problem statement

In the “Trusted by 10k users” section, the profile images look repeated/placeholder-like. The client wants more authenticity (ideally real profiles).

---

## 🔁 Multi-agent workflow (runbook)

### Agent 1 — Research + solution options (NO CODE CHANGES)

**Goal:** determine a realistic way to show authentic social proof without privacy risk or heavy infra.

#### Tasks

1. Identify where the avatars are sourced
   - Find the component rendering the trust strip avatars.
   - Confirm whether images are hard-coded or pulled from content/CMS.

2. Collect constraints
   - Do we have permission to use real customer photos?
   - Do we want to avoid personally identifying info?
   - Does the brand have a UGC library (TikTok creators or customers who consented)?

3. Write 3 solution options (tradeoffs)
   - Create/update: `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-186-research.md`

#### Deliverable

- `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-186-research.md`
