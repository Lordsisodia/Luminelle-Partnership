# Issue 185: Entire site allows horizontal scrolling on mobile (layout should be flush + centered)

Source: Client report (Jan 7, 2026)
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `4`
- Reach (1–5): `5`
- Effort (1–5): `2`
- Confidence (1–3): `2`
- Priority: `(4×5×2)−2 = 38`
- Owner: `AI`
- Created: `2026-01-07`

---

## Problem statement

On mobile, the site can be scrolled horizontally across pages. This is a UX bug:

- Content should be centered with consistent left/right padding.
- The page itself should not scroll sideways (only intentional inner carousels should scroll).

---

## 🔁 Multi-agent workflow (runbook)

### Agent 1 — Research + codebase understanding (NO CODE CHANGES)

**Goal:** reproduce and find the overflow culprit(s), then propose 3 fix options.

#### Tasks

1. Reproduce across multiple routes
   - `/`
   - `/product/lumelle-shower-cap`
   - `/account`
   - any other top routes
   - Confirm whether the horizontal scroll happens when the drawer is closed and when it is open.

2. Identify what causes overflow
   - In DevTools console:
     - Compare `document.documentElement.scrollWidth` vs `clientWidth`
   - Find elements that exceed viewport width
     - Look for `w-screen`, `100vw`, negative margins, fixed off-canvas elements, large shadows, or translated elements.

3. Map where the overflow originates
   - Global layout wrappers and providers:
     - `src/router.tsx`
     - `src/layouts/*`
     - `src/ui/providers/DrawerProvider.tsx`
   - Global styles:
     - `src/index.css`

4. Write up findings + propose options
   - Create/update: `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-185-research.md`
   - Include **3 solutions** with tradeoffs and implementation notes.

#### Deliverable

- `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-185-research.md`

---

## Acceptance criteria (for the later implementation agent)

- On mobile, `scrollWidth === clientWidth` for the root document element on all primary routes.
- No page-level horizontal scroll.
- Intentional inner horizontal carousels still work (if present), but do not cause page overflow.

---

## Work log

- 2026-01-08: Marked `IN_PROGRESS` and starting overflow investigation.
- 2026-01-08: Validated locally (Playwright mobile emulation) — `document.documentElement.scrollWidth === clientWidth` across key routes (see `issue-185-research.md`). No horizontal scroll reproduced in current `dev` code; suspected fixed already by `src/index.css` (`fix(ui): prevent horizontal scroll on mobile`, commit `6ee9d168`).
- 2026-01-08: Marked `DONE` (fix already present on `dev`; remaining work is to move this worklog to `done-issues/` as part of the tracker hygiene).
