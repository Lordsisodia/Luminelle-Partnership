# Performance & FOUC Plan (draft)

Objectives
- Zero FOUC when swapping/booting themes.
- Style recalc for runtime theme swap <4ms on mid-tier laptop; negligible layout shift.

Planned techniques
- Inline critical CSS vars in `<head>` during SSR or initial HTML payload (embed active brand tokens or defaults).
- Load remaining CSS asynchronously but keep vars available immediately.
- Use `runtime-theme.ts` to update vars via a single `<style>` block (avoids per-element writes).
- Cache token JSON in `localStorage` with `etag/version`; reuse on next load; validate freshness in background.
- Avoid heavy gradients in critical path; keep hero gradient as background-image var to prevent repaint churn.

Measurements to run (post-integration)
- Lighthouse/CLS/TTFB unchanged vs. baseline.
- DevTools Performance: measure style recalculation when calling `applyBrandTheme`; target <4ms.
- Chrome trace: ensure <1 layout shift on swap; monitor paint counts.
- Screen flicker check on slow 3G throttling with cache cold/hot.

Fallbacks
- If runtime swap exceeds budget, precompute per-brand CSS file and swap `href` with `prefers-reduced-motion` safe guard.
