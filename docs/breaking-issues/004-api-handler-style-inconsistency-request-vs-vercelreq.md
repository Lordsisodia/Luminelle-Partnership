# 004 — API handler style inconsistency (`Request`/`Response` vs `VercelRequest`/`VercelResponse`)

## Status
**Resolved for Cloudflare Pages/Workers**: the production API surface is now implemented as **Cloudflare Pages Functions** under `functions/api/**` (Fetch-style `Request` → `Response` only). The legacy `api/**` folder is kept as a **Vercel snapshot** and remains mixed-style by design.

## Summary
The `api/` directory mixes two different handler styles:

1. Web standard style:
   - `export default async function handler(req: Request) { … return new Response(…) }`
   - Often uses `await req.json()` and `new URL(req.url)` (no base URL provided).
2. Vercel Node style:
   - `export default async function handler(req: VercelRequest, res: VercelResponse) { … }`

If your deploy/runtime expects only one style, or provides a different `req.url` shape, **some endpoints can hard-fail**.

## Impact
- **High (deploy risk)**: endpoints can break depending on how your serverless platform invokes functions.
- **High (maintenance)**: future changes to runtime/framework presets can “suddenly” break half the API surface.

## Evidence
Examples of Web standard style (expects `req.json()`, absolute `req.url`):
- `api/orders/get.ts`
- `api/shopify/auth.ts`
- many `api/storefront/*` and `api/metrics/*`

Examples of Vercel Node style:
- `api/og.ts`
- `api/test.ts`
- `api/webhooks/clerk.ts`
- `api/shopify/auth/callback.ts`

## Why this is risky
- In Node/Express style requests, `req.url` is typically a **path** (e.g. `/api/orders/get?id=…`), so `new URL(req.url)` throws unless a base is provided.
- Web standard `Request` expects `req.url` to be an **absolute URL** and provides `req.json()`.

## Repro (how to confirm in your environment)
Deploy (or run locally with your deployment tool) and hit a representative endpoint:
- Pick one “Web standard” endpoint that calls `req.json()` (e.g. a cart mutation).
- If the runtime passes a Node-style request object, you’ll see runtime errors like:
  - `req.json is not a function`
  - `TypeError: Invalid URL`

## Likely Root Cause
The API layer evolved over time and ended up with:
- some endpoints written to Vercel’s Node handler style
- some written to a Fetch/Web style (possibly copied from edge/worker code)

## Fix Direction
Standardize the API layer based on the deployment target:

- **Cloudflare Pages**: use `functions/api/**` (Pages Functions). This repo now follows this approach, so the “mixed handler” risk is avoided in production.
- **Vercel (snapshot)**: if you ever redeploy `api/**` to Vercel, you should still standardize it to a single runtime style (or add a wrapper), because it remains mixed.

At minimum:
- any usage of `new URL(req.url)` should be hardened to work with path-only URLs by providing a base (or using the runtime-provided origin).
