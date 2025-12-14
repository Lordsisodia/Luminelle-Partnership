# Breaking Issues (Audit Notes)

Date: 2025-12-14

This folder documents **high-impact issues that can break the app** (build, deploy, or critical runtime flows), plus a few “foot‑guns” that routinely break new environments.

Notes:
- `npm run typecheck`, `npm run lint`, and `npm run build` succeed locally in this workspace, so the items below are mostly **deployment/runtime/config** breakages rather than compile errors.
- These are written to be actionable: each issue includes **impact**, **how to reproduce**, **likely root cause**, and **suggested fix direction**.

## Index

- [x] `001-submodule-dependency-siso-ui.md` — **Resolved**: removed install-time dependency on `.siso-app-factory`.
- [ ] `002-env-example-missing-and-app-url-mismatch.md` — Onboarding breaks + Shopify OAuth can point at the wrong URL. (Owned elsewhere.)
- [x] `003-server-folder-stale-and-non-runnable.md` — **Resolved**: removed stale `server/index.ts`; `server/` is migrations-only.
- [x] `004-api-handler-style-inconsistency-request-vs-vercelreq.md` — **Resolved for Cloudflare**: API is now standardized under `functions/api/**` (Pages Functions). `api/**` remains a Vercel snapshot.
- [ ] `005-cart-recovery-endpoints-are-stubs.md` — Cart recovery feature endpoints currently return placeholders / 501.
- [ ] `006-pwa-assets-and-service-worker-risks.md` — PWA service worker is always registered; verify assets ship and caching is safe.
- [ ] `007-spa-deep-links-on-vercel.md` — Risk of 404s on refresh/deep link without SPA rewrite.
- [ ] `008-cdn-url-duplication-causes-inconsistent-assets.md` — Two `cdnUrl()` implementations used inconsistently.
