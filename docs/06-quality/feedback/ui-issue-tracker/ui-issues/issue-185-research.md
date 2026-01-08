# Issue 185 — Research Notes (Agent 1)

Owner: `AI`
Date started: `2026-01-07`

## 1) Repro summary

- Environment: local repo snapshot on `vk/6dd9-ui-185-client-p3` (2026-01-08)
- Routes tested: not reproducible end-to-end in this workspace without a valid `VITE_CLERK_PUBLISHABLE_KEY` (the app renders a “Configuration required” fallback and does not mount the router).
- Device: N/A (code inspection + defensive fix)
- Expected: no page-level horizontal scroll on mobile; content remains centered with consistent padding.
- Actual (reported): site can be scrolled horizontally across pages on mobile.

## 2) Evidence collected

- `document.documentElement.clientWidth`: N/A in this run (no browser repro in this environment).
- `document.documentElement.scrollWidth`: N/A in this run (no browser repro in this environment).
- Culprit element(s): not conclusively identified in this run.
  - Likely contributors (based on code patterns):
    - Off-canvas UI (drawer) and other fixed/translated elements can occasionally contribute to scrollable overflow geometry on mobile browsers.
    - Small “+1px” layout overflows from long inline content / carousels / negative margins can manifest as sideways drag on mobile.

## 3) Root cause hypothesis

- Hypothesis A: one or more components slightly exceed viewport width (1–2px) due to layout math (padding + max widths + flex gaps + long text), causing document overflow on mobile.
- Hypothesis B: a fixed-position off-canvas element (or similar overlay) contributes to the document’s horizontal overflow region on some mobile browsers.
- Hypothesis C: the browser allows horizontal overscroll “rubber band” even when the actual layout overflow is minimal; users perceive this as horizontal scrolling.

## 4) Three solution options

### Option 1 — Fix the specific overflowing element(s)

- What: reproduce with DevTools, identify the widest element(s), and adjust those components (remove negative margins, clamp widths, wrap long text, etc.).
- Pros: best long-term correctness; keeps intended edge-to-edge patterns where desired.
- Cons: requires reliable reproduction and route coverage.

### Option 2 — Layout-system correction (consistent container padding + max-width)

- What: standardize page shells so that all top-level layouts share a consistent “container” strategy (e.g., `mx-auto max-w-* px-*`) and ensure any edge-to-edge content is clipped by an outer `overflow-x-clip` wrapper.
- Pros: prevents recurrence; makes layout behavior predictable across routes.
- Cons: higher touch surface area; some sections may need redesign to preserve intended visuals.

### Option 3 — Defensive global `overflow-x` containment (mitigation)

- What: apply global overflow containment to prevent page-level horizontal scroll even if a child overflows slightly.
- Pros: quickest risk-reduction; addresses “site-wide” symptom immediately.
- Cons: can mask underlying causes; may clip intentionally overflowing visuals at viewport edges if not scoped carefully.

## 5) Recommendation

- Suggested option: Option 3 as an immediate mitigation, followed by Option 1 once mobile repro is available.
- Why: the client impact is broad (entire site) and the fix is low-risk if applied at the page/root level without breaking inner carousels.
