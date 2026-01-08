# Issue 188: Spin wheel needs visible % labels + “Congrats! You’ve won 20% off…” popup

Source: Client feedback screenshot `codex-clipboard-X26KIH.png` (Jan 2026)
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `NEEDS_DECISION`
- Area: `Client`
- Impact (1–5): `3`
- Reach (1–5): `4`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `(3×4×2)−3 = 21`
- Owner: `AI`
- Created: `2026-01-07`

---

## Client request

- Display percentage numbers directly on the wheel slices (e.g. `5, 10, 15, 5, 10, 15`).
- Add a popup: **“Congrats! You’ve won 20% off your next order.”**
- Review existing wheel code and propose an implementation approach.

⚠️ Open question to confirm:

- Should the wheel award **5/10/15** (matching labels), or is the popup **always 20%** regardless of the wheel?

---

## 🔁 Multi-agent workflow (runbook)

### Agent 1 — Research + implementation options (NO CODE CHANGES)

**Goal:** understand current wheel logic and propose 3 implementation options.

#### Tasks

1. Inspect current wheel implementation
   - Component(s)
   - Current discount code usage
   - How “winning” is determined

2. Propose 3 solution options
   - Create/update: `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-188-research.md`
   - Include:
     - how to render labels (SVG text, overlay divs rotated, canvas)
     - how to show popup (modal/toast)
     - how to integrate with Shopify checkout discounting (discount code application)

#### Deliverable

- `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-188-research.md`

---

## Worklog

- 2026-01-08 18:19 UTC — Triage batch 3: set status to `NEEDS_DECISION` (spec conflict: slice labels vs “always 20%” popup; also depends on a decided discount mechanism).
