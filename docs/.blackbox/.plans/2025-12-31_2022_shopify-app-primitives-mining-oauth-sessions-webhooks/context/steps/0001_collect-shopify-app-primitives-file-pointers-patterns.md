---
step: 0001
created_at: "2025-12-31 20:22"
title: "Collect Shopify app primitives file pointers + patterns"
---

# Step 0001: Collect Shopify app primitives file pointers + patterns

## ✅ What I did (facts)

- Inspected the highest-signal Shopify embedded app starter repos using `gh api` (no cloning) and pulled the exact file paths where auth/session/webhook primitives live.
- Mined concrete implementation patterns from:
  - `kinngh/shopify-nextjs-prisma-app` (Next.js + Prisma; JWT/session token exchange; encrypted sessions; webhook + proxy routes)
  - `carstenlebek/shopify-node-app-starter` (TypeScript; Next.js middleware gating; Redis session store; webhook registry)
- Confirmed the key “primitive boundaries” we should implement in Lumelle:
  - install/auth + online/offline tokens
  - session store (encrypted + TTL)
  - request verification + CSP
  - webhook inbox (raw body, HMAC, dedupe, dispatch)
  - app proxy signature verification
  - optional Admin GraphQL proxy

## 🧠 What I learned (new information)

- `carstenlebek/shopify-node-app-starter` uses `Shopify.Session.CustomSessionStorage` backed by Upstash Redis and applies TTL only to non-offline sessions:
  - `src/lib/sessionStorage.ts`
- `carstenlebek/shopify-node-app-starter` gates most routes via Next.js middleware and redirects to offline auth if needed, while also setting `frame-ancestors` CSP:
  - `src/middleware.ts` + `src/middleware/verify-request.ts`
- `kinngh/shopify-nextjs-prisma-app`’s verification path uses JWT session tokens and performs token exchange for both online and offline sessions:
  - `utils/middleware/verifyRequest.js`
- `kinngh/shopify-nextjs-prisma-app` stores sessions encrypted at rest (Cryptr) in a Prisma model:
  - `utils/sessionHandler.js` + `utils/cryption.js` + `prisma/schema.prisma`
- `kinngh/shopify-nextjs-prisma-app` implements Shopify app proxy signature verification using a sorted query string excluding `signature`:
  - `utils/middleware/verifyProxy.js`

## 🧭 What changes because of this

- We have enough signal to stop “searching for more Shopify app templates” and instead mine these two sources into stable primitives + schemas.
- We can now document a single canonical blueprint and link it from the reliability lane + source map so future loops don’t rediscover the same patterns.

## ➡️ Next step

- Publish a canonical blueprint doc for Shopify app primitives and wire it into:
  - `docs/.blackbox/oss-catalog/component-source-map.md`
  - `docs/.blackbox/oss-catalog/lanes/reliability-webhooks-idempotency.md`

## 🔗 Links / references

- Curation:
  - `docs/.blackbox/oss-catalog/curation.json`
- Storefront + app primitives file pointers:
  - `docs/.blackbox/oss-catalog/component-source-map.md`
- Repos:
  - `kinngh/shopify-nextjs-prisma-app`
  - `carstenlebek/shopify-node-app-starter`
