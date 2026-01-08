# Issue 185 — Research Notes (Agent 1)

Owner: `AI`
Date started: `2026-01-07`

## 1) Repro summary

- Environment: Local dev (`npm run dev` via Vite)
- Routes tested:
  - `/`
  - `/product/shower-cap`
  - `/brand`
  - `/search`
  - (spot-check) `/cart`, `/checkout`, `/account`, `/admin`, `/blog`
- Device: Playwright mobile emulation (`iPhone 12`, Chromium)
- Expected: `document.documentElement.scrollWidth === clientWidth` and `window.scrollX` stays `0` (no page-level horizontal scroll)
- Actual: Matches expected on all routes tested (no overflow detected)

## 2) Evidence collected

- Evidence run date: `2026-01-08`
- `document.documentElement.clientWidth`: `390px`
- `document.documentElement.scrollWidth`: `390px`
- Culprit element(s): Not reproducible in current `dev` codebase state.
  - Likely historical culprits (based on common patterns in this codebase):
    - Off-canvas drawer / fixed panels translated off-screen
    - Media elements (images/iframes/video/canvas) rendering wider than their containers
    - Negative margins on horizontal carousels (e.g. `-mx-*`) without a containing `overflow-x-clip/hidden`

## 3) Root cause hypothesis

- Hypothesis A: A fixed off-canvas element (drawer) contributed to scroll overflow on some mobile browsers.
- Hypothesis B: Unconstrained media caused occasional overflow on narrow viewports.
- Hypothesis C: Negative-margin carousel sections caused overflow when nested under certain wrappers.

## 4) Three solution options

### Option 1 — Fix the specific overflowing element(s)

- What: Identify the single element with a bounding rect wider than viewport and constrain it (e.g. `max-w-full`, remove `100vw`, adjust negative margins).
- Pros: Most correct; avoids hiding layout bugs.
- Cons: Requires repro + route-specific debugging; not always stable across browsers.

### Option 2 — Layout-system correction (consistent container padding + max-width)

- What: Ensure all marketing/layout shells use a consistent `max-w-*` container and predictable `px-*` gutters, and carousels “bleed” within an `overflow-x-hidden` wrapper.
- Pros: Prevents recurrence; improves overall layout consistency.
- Cons: Higher blast radius; risk of changing intended spacing/site design.

### Option 3 — Defensive global `overflow-x` containment (mitigation)

- What: Apply global page-level `overflow-x: hidden` and constrain media to `max-width: 100%` so accidental overflows don’t create horizontal scroll.
- Pros: Low effort; prevents the worst UX symptom.
- Cons: Can hide underlying layout bugs if over-used.

## 5) Recommendation

- Suggested option: Option 3 (already implemented) + keep watch for any specific offender reports from real iOS Safari.
- Why: The current codebase already contains a defensive fix in `src/index.css` (`overflow-x: hidden` on `html, body`, plus `max-width: 100%` for media). With no current repro, this is the lowest-risk posture.
