# UI-185 research — Mobile horizontal scroll

Date: 2026-01-08

## Summary

UI-185 reports that the **entire site can be scrolled horizontally on mobile**.

Local repro attempts (Playwright + Vite) did **not** show any document-level overflow on common routes.
Because this issue can be caused by environment-specific factors (fonts, third-party injected elements, auth-driven UI, etc),
the fix here is a **minimal, defensive global clamp** to prevent app-root horizontal panning even when a child overflows.

## What I checked

### Automated viewport checks (local dev)

Using Playwright with mobile viewports, verified on routes:

- `/`
- `/product/lumelle-shower-cap`
- `/account`
- `/terms`
- `/privacy`
- `/creators`
- `/blog`

and viewports:

- 320×700
- 360×740
- 390×844

Result: `document.documentElement.scrollWidth === document.documentElement.clientWidth` (no overflow).

### Notes / constraints

- This repo renders a “Configuration required” screen when `VITE_CLERK_PUBLISHABLE_KEY` is missing (local dev).
- Forcing a dummy `VITE_CLERK_PUBLISHABLE_KEY` causes ClerkProvider to error/blank the app, which limits realistic UI reproduction
  for authenticated pages (menu/cart drawers, account, etc).

## Likely causes (production / device-specific)

Even when we can’t reproduce locally, site-wide horizontal panning is usually due to one (or more) of:

- An off-canvas element that extends past the viewport (e.g. fixed drawer/backdrop, translated elements).
- A child that uses a width larger than the viewport (e.g. `100vw` + padding, long unbroken text, wide images).
- An injected third-party element (cookie banner, analytics widget, etc).
- iOS Safari allowing panning even when `html/body { overflow-x: hidden; }` (app-root overflow edge cases).

## Fix options (tradeoffs)

### Option A (implemented): defensive global clamp

Add `overflow-x: hidden` on `#root` and use `overflow-x: clip` where supported for `html`, `body`, and `#root`.

- ✅ Minimal and low-risk.
- ✅ Keeps intentional inner carousels working (they still scroll inside their own containers).
- ⚠️ Can “hide” a real overflow bug instead of fixing the exact culprit (but that’s acceptable as a first containment step).

### Option B: find the exact offender and fix locally

Use DevTools on a real device + production build and identify the widest element (common culprits: drawers, fixed CTAs, carousels).

- ✅ Best long-term correctness.
- ❌ Takes longer; requires production-like environment.

### Option C: stricter global constraints

Apply `max-width: 100%` / `min-width: 0` defaults to more elements / wrappers.

- ✅ Can prevent some overflow classes of bugs.
- ❌ Higher risk of layout regressions; not recommended without a clear offender.

## Implemented change

See: `src/index.css` — added root-level horizontal overflow clamping (`#root` + `overflow: clip` support).

