# 002 — Missing `.env.example` + `APP_URL` vs `SHOPIFY_APP_URL` mismatch (breaks onboarding & Shopify OAuth)

## Summary
Two related issues:

1. The root README instructs copying `.env.example`, but **`.env.example` is not present** in the repo.
2. The root `.env` uses `APP_URL=…` (tunnel URL), but Shopify OAuth code reads `process.env.SHOPIFY_APP_URL`.

If `SHOPIFY_APP_URL` is not set, the auth code falls back to `url.origin`, which is often **the wrong public URL** in local dev (e.g. `http://localhost:5174`), and Shopify redirects/whitelisting can fail.

## Impact
- **Medium/High**: onboarding “copy env example” step is broken.
- **High (dev auth)**: Shopify OAuth can break when the backend is accessed via localhost but Shopify expects the public tunnel URL.

## Evidence
- README says: “Copy `.env.example` to `.env` …” but no `.env.example` exists.
- Shopify OAuth entrypoint reads:
  - `process.env.SHOPIFY_APP_URL || url.origin`
  - but local env uses `APP_URL`, not `SHOPIFY_APP_URL`.

## Repro (common failure)
1. Start the app locally and hit `/api/shopify/auth?shop=…`
2. If `SHOPIFY_APP_URL` is not set, the computed `redirect_uri` uses `url.origin`.
3. With a plain localhost origin, Shopify typically rejects the callback unless explicitly configured (and https is commonly required).

## Likely Root Cause
Environment variables drifted:
- docs talk about `SHOPIFY_APP_URL`
- local `.env` uses `APP_URL`
- the app code never reads `APP_URL`

## Fix Direction
- Add a committed `.env.example` containing *only variable names* (no secrets).
- Standardize on one variable name:
  - either rename `APP_URL` → `SHOPIFY_APP_URL`, or
  - update code to prefer `APP_URL` (while keeping `SHOPIFY_APP_URL` for backward compatibility).
- In docs, clearly separate:
  - **public app URL** used for OAuth redirects
  - **frontend dev server URL** used for local browsing

