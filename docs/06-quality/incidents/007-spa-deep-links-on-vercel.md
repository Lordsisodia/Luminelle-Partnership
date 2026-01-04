# 007 — SPA deep links can 404 on Vercel without an explicit rewrite

## Summary
This is a React Router SPA (client-side routes like `/cart`, `/product/:handle`, `/account/*`).

On static hosts, deep links (or browser refresh) require a rewrite rule so that unknown paths serve `index.html`.

The repo contains a Netlify-style rewrite file:
- `public/_redirects`: `/* /index.html 200`

But `vercel.json` has no equivalent SPA rewrite configuration.

## Impact
- **High (production UX)** if deploying to Vercel static hosting without SPA rewrites:
  - `/cart` works when navigated to inside the app
  - `/cart` 404s on refresh or direct visit

## Evidence
- React Router routes are defined in `src/App.tsx` (non-file-system routes).
- `public/_redirects` exists (Netlify-style).
- `vercel.json` does not define `rewrites` or a catch-all route.

## Repro
1. Deploy to Vercel as a static build (`dist/` output).
2. Visit `/cart` directly (not via in-app navigation) or refresh the page.
3. If no rewrite exists, you get a 404 from the host.

## Fix Direction
- If Vercel is the target:
  - add an explicit rewrite to serve `/index.html` for non-asset routes (and document it).
- If Netlify/Cloudflare Pages is the target:
  - keep `_redirects`, and document that Vercel requires different config.

