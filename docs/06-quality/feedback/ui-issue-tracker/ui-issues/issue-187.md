# Issue 187: Landing reviews section feels bland on desktop (needs higher-impact design)

Source: Client feedback screenshots `codex-clipboard-jE4R1d.png`, `codex-clipboard-RYUPHK.png`, `codex-clipboard-uVgGnF.png`, `codex-clipboard-2NQI2l.png` (Jan 2026)
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `NEEDS_DECISION`
- Area: `Client`
- Impact (1–5): `3`
- Reach (1–5): `5`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `(3×5×2)−3 = 27`
- Owner: `AI`
- Created: `2026-01-07`

---

## Client request

- Make the reviews section “less bland” on desktop
- Ideas mentioned:
  - Make the section scroll (or similar)
  - Increase text size
  - Remove the “girls” images (or reduce reliance on them)
  - Potentially add 1–2 more lines of content in the preview

---

## 🔁 Multi-agent workflow (runbook)

### Agent 1 — Research + design options (NO CODE CHANGES)

**Goal:** understand current implementation and propose 3 design directions that are feasible within the codebase.

#### Tasks

1. Identify current component(s)
   - Landing page reviews section and its props/data

2. Assess constraints
   - What review content is available (text only vs images)?
   - Mobile vs desktop requirements

3. Propose 3 options with tradeoffs
   - Create/update: `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-187-research.md`

#### Deliverable

- `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-187-research.md`

---

## Worklog

- 2026-01-08 18:19 UTC — Triage batch 3: set status to `NEEDS_DECISION` (design direction / content requirements needed before implementation).
