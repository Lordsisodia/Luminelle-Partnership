# Core Web Vitals (PSI/Lighthouse) Runbook

Goal: monitor and target LCP < 2.5s, INP < 200ms, CLS < 0.1 on key pages (`/`, `/product/shower-cap`, `/blog/{slug}`) for mobile & desktop.

## Quick PSI (web)
1) Go to https://pagespeed.web.dev/ and test:
   - https://lumelle.com/
   - https://lumelle.com/product/shower-cap
   - https://lumelle.com/blog/lumelle-journal-launch
2) Toggle “Mobile” and “Desktop”; record LCP, INP, CLS and “Passed/Failed”.
3) Expand “Opportunities” to note top 3 offenders (render-blocking, main-thread work, image size).

## CLI alternative
```bash
npm i -g psi
PSI_API_KEY=your_key_here psi https://lumelle.com/ --strategy=mobile --format=json > psi-home-mobile.json
PSI_API_KEY=your_key_here psi https://lumelle.com/product/shower-cap --strategy=mobile --format=json > psi-pdp-mobile.json
```
Parse `loadingExperience.metrics` for field data and `lighthouseResult.audits` for lab issues.

> Tip: Set env `PSI_API_KEY` to avoid shared quota errors.

## What to watch
- **LCP element**: usually hero image. Ensure preload + correct `sizes/srcset`. Already preloaded.
- **INP**: check “Main-thread work”, “Long tasks”, and “Third-party usage” (TikTok/Shopify scripts). Defer embeds (done), keep Storefront/App Bridge off non-shop pages if possible.
- **CLS**: ensure `width/height` on images; avoid font swaps; keep skeleton sizes fixed.
- **Render-blocking**: fonts/css; ensure font-display: swap (via CSS import) and preconnect (done).

## Fix loop
1) Run PSI.
2) List top 3 issues per page (lab).
3) Map to fixes:
   - Render-blocking: inline critical CSS or split CSS; reduce @import chains.
   - Long tasks: split big components, lazy-load carousels/embeds; reduce bundle (code splitting done).
   - Payload: compress/serve AVIF/WebP; remove unused JS/CSS.
4) Implement, redeploy, re-run PSI; log metrics delta.

## Logging template
Use a simple table in `docs/perf-log.md`:
```
Date | URL | Device | LCP | INP | CLS | Passed? | Top issues | Fixes planned
```
