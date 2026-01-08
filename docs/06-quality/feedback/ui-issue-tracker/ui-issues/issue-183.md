# Issue 183: Mobile account + footer has weird padding / horizontal scroll (should not scroll sideways)

Source: Client feedback screenshots `codex-clipboard-lLC8mw.png`, `codex-clipboard-RZrEtx.png` (Jan 2026)
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `IN_PROGRESS`
- Area: `Client`
- Impact (1–5): `3`
- Reach (1–5): `5`
- Effort (1–5): `2`
- Confidence (1–3): `2`
- Priority: `(3×5×2)−2 = 28`
- Owner: `AI`
- Created: `2026-01-07`

---

## Worklog

- `2026-01-09 01:16 (+07)` Started implementation pass: set tracker/worklog → `IN_PROGRESS`, then reproduce overflow and apply minimal CSS/layout fix with incremental commits.

---

## ✅ Outputs (what “done” produces)

- Verified repro of horizontal scrolling on mobile and/or missing padding on account + footer.
- Root-cause explanation (which element overflows and why).
- A decision doc with **three viable solutions** and a recommendation.
- Acceptance criteria (testable) for the later implementation agent.

---

## Problem statement

On mobile view (notably the account page + footer), the layout appears to have:

- Insufficient left/right padding (text runs too close to edges), and/or
- Unwanted horizontal scrolling (page can scroll sideways)

Horizontal scrolling should not be possible under normal layout.

---

## 🔁 Multi-agent workflow (runbook)

### Agent 1 — Research + codebase understanding (NO CODE CHANGES)

**Goal:** reproduce the overflow, find the overflowing element(s), and propose 3 fix options.

#### Tasks

1. Reproduce
   - Use iPhone XR viewport (or equivalent) and visit:
     - `/account`
     - footer section at the bottom of the page
   - Verify if horizontal scroll occurs when swiping left/right.
   - Confirm whether padding is actually missing vs being visually crowded due to overflow.

2. Identify the overflow culprit(s)
   - Use DevTools:
     - Inspect `document.documentElement.scrollWidth` vs `clientWidth`
     - Temporarily apply `* { outline: 1px solid red }` or use DevTools “Layout” tools
   - Find the element with width > viewport (common causes: `w-screen`, `100vw` + padding, fixed-position elements, large shadows, absolute-positioned badges, etc.)

3. Map the code structure
   - Identify the page component(s) for `/account`
   - Identify footer component(s) and global layout wrappers
   - Document any CSS utilities that can cause overflow (e.g. `w-screen`, `translate-x-*`, `min-w-*`, negative margins)

4. Write up findings + propose options
   - Create/update: `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-183-research.md`
   - Include **3 solutions** with tradeoffs and implementation notes.

#### Deliverable

- `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-183-research.md`

---

## Candidate code hotspots (starting points)

- Account page(s):
  - `src/domains/client/account/ui/pages/*`
- Global layouts and wrappers:
  - `src/layouts/*`
  - `src/router.tsx`
- Footer:
  - `src/ui/components/GlobalFooter.tsx`
- Global styles:
  - `src/index.css`

---

## Acceptance criteria (for the later implementation agent)

- On mobile, `document.documentElement.scrollWidth === document.documentElement.clientWidth` (no horizontal overflow).
- Footer and account content have consistent, comfortable side padding (no edge-to-edge text).
- No regressions to drawer/checkout overlays (they should still slide correctly).
