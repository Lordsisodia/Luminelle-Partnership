# Sources

## OSS repos (mined via `gh api`, no cloning)

- https://github.com/kinngh/shopify-nextjs-prisma-app
  - Supports: request verification (JWT/session token), token exchange (online/offline), Prisma session storage + encryption, webhook validation, app proxy signature verification, GDPR endpoints.
  - Accessed: 2025-12-31
  - Confidence: High

- https://github.com/carstenlebek/shopify-node-app-starter
  - Supports: TypeScript-first Shopify embedded app wiring (Next.js middleware), online/offline OAuth routes, webhook registry processing, Redis-backed session storage with TTL, CSP `frame-ancestors`.
  - Accessed: 2025-12-31
  - Confidence: High

- https://github.com/vercel/commerce
  - Supports: storefront UI patterns (PLP/PDP/cart/search), App Router + Server Actions, optimistic cart UX (`useOptimistic`), URL-synced variant selection, tag-based cache revalidation.
  - Accessed: 2025-12-31
  - Confidence: High

## Internal docs updated/created

- docs/.blackbox/oss-catalog/shopify-app-primitives.md
  - Supports: our internal “what to implement” blueprint for Shopify app primitives + file pointers.
  - Accessed: 2025-12-31
  - Confidence: High

- docs/.blackbox/oss-catalog/component-source-map.md
  - Supports: canonical file pointers for Shopify app primitives + storefront patterns.
  - Accessed: 2025-12-31
  - Confidence: High

- docs/.blackbox/oss-catalog/lanes/reliability-webhooks-idempotency.md
  - Supports: reliability checklist + pointers for webhook/HMAC/session primitives.
  - Accessed: 2025-12-31
  - Confidence: High

- docs/.blackbox/oss-catalog/blocks-kit-contracts.md
  - Supports: storefront UI contracts updated to include Vercel Commerce mining sources.
  - Accessed: 2025-12-31
  - Confidence: Medium

## License verification evidence

- docs/.blackbox/.plans/2025-12-31_2014_oss-license-verification-oss-license-verification-for-poc-gate/artifacts/license-verification.md
  - Supports: POC license gating (e.g., n8n Sustainable Use License detected).
  - Accessed: 2025-12-31
  - Confidence: High
