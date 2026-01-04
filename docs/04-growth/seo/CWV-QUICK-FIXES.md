# CWV Quick Fixes (apply after PSI/Lighthouse)

Use these fixes in order of impact on LCP/INP/CLS.

## LCP (hero image/content)
- Keep hero preload + `fetchpriority="high"` (already in `index.html`); verify `sizes/srcset` match container.
- Inline critical CSS for the hero section (header + above-the-fold CTA) using Vite plugin or manual `<style>` in `index.html` for the smallest, stable set.
- Ensure hero container has fixed height on mobile to prevent reflow; set `min-height` with clamp in Tailwind.

## INP (interaction latency)
- Defer non-critical scripts: keep SW registration idle (done), avoid third-party scripts on non-shop pages, load analytics after `requestIdleCallback`.
- Split large components with `React.lazy` (done for routes); also lazy-load heavy sections (carousels/TikTok) when scrolled into view using `IntersectionObserver`.
- Reduce long tasks: audit bundle for unused Shopify/Clerk code on public pages; code-split admin/shopify pages (already route-split).

## CLS (layout shift)
- Ensure all `<img>` have width/height or aspect-ratio classes; keep font `display=swap` (done).
- Avoid dynamic content pushing layout (e.g., announcement bars); reserve space with fixed height.
- For iframes (TikTok), keep wrapper with fixed aspect ratio (done) and placeholder text sized similarly.

## Image strategy
- Serve AVIF/WebP via `cdnUrl` with `srcset`; cap `sizes` to container width.
- Lazy-load all below-the-fold images; keep only first hero and first blog hero eager.

## CSS/JS payload
- Enable CSS code-splitting (Vite default); remove unused global imports.
- Consider `vite-plugin-critical` or `critters` for SSR build to extract critical CSS.
- Tree-shake icons: import only used `lucide-react` icons or use `@lucide/react/dynamic`.

## Measurement loop
- Run PSI (mobile) on `/`, `/product/shower-cap`, `/blog/lumelle-journal-launch`.
- Log results in `docs/perf-log.md`; pick top 3 issues per URL; apply relevant fixes above.
- Re-run PSI after fixes; aim for LCP <2.5s, INP <200ms, CLS <0.1.
