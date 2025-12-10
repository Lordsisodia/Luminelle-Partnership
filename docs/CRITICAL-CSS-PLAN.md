# Critical CSS Plan (Lumelle)

Goal: inline only above-the-fold CSS on key pages (`/`, `/product/shower-cap`) to improve LCP without inflating HTML.

## Approach (Vite)
- Use `critters` via `vite-plugin-ssr` or `vite-plugin-critical` in the build step, limited to selected routes.
- Alternatively, manual extraction with `penthouse` targeting two URLs and inlining into `index.html` (home) and a small `<style>` block for PDP (served conditionally by route).

## Minimal config option
Add `vite-plugin-critical`:
```ts
// vite.config.ts
import critical from 'vite-plugin-critical';
critical({
  inline: true,
  criticalUrl: 'https://lumelle.com/',
  criticalPages: [
    { uri: '/', template: 'index.html' },
    { uri: '/product/shower-cap', template: 'index.html' },
  ],
  width: 412, // mobile viewport
  height: 732,
})
```
> Note: requires accessible URLs at build time; for local, set `criticalBase` to local dev server.

## Manual penthouse fallback
1) `npm i -D penthouse critters`
2) Script:
```bash
node scripts/extract-critical.js https://lumelle.com/ dist/critical-home.css 412x732
node scripts/extract-critical.js https://lumelle.com/product/shower-cap dist/critical-pdp.css 412x732
```
3) Inline the critical CSS into `index.html` wrapped in `<style data-critical="home">` with a small guard to only apply on matching path (or serve via route-aware head component).

## Guards
- Keep inline critical under ~15KB.
- Ensure no FOUC by retaining font `display=swap`.
- Test LCP before/after with PSI.

## Rollout steps
- Run a local build + preview so Penthouse can read static CSS:
  - `npm run build && npm run preview -- --host --port 4173`
  - Then `node scripts/extract-critical.js http://localhost:4173/ critical-css/home.css 412x732`
  - And `node scripts/extract-critical.js http://localhost:4173/product/shower-cap critical-css/pdp.css 412x732`
- Keep inline critical under ~15KB; inline into `index.html` (home) and a route guard snippet for PDP if desired.
- Validate visually + PSI. If stable, consider automating in CI (optional).
