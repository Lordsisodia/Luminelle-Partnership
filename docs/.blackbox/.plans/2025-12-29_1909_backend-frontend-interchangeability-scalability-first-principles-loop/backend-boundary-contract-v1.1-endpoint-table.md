# Backend Boundary Contract v1.1 — Endpoint Table (current surface)

This is a machine-derived table of the current `/api/*` surface (from `functions/api/**`) plus the v1 contract expectations.

Evidence:
- Route inventory: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-files.clean.find.txt`
- Handler inventory: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-handlers.clean.rg.txt`
- Cue matrix (auth/tenant/cache/security): `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-cues.matrix.txt`
- Auth/tenant cue grep: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-auth-tenant-cues.rg.txt`
- Cache cue grep: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-cache-cues.rg.txt`
- Shopify security cue grep: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-shopify-security-cues.rg.txt`

Legend:
- `auth_cues`: header/token usage found in file body (heuristic)
- `tenant_cues`: host/tenant strings found in file body (heuristic; may be handled in shared `_lib`)
- `cache_cues`: Cache-Control/ETag/Vary strings found (heuristic)
- `shopify_security_cues`: hmac/signature/webhook strings found (heuristic)

---
## Health

| Endpoint file | Tier (required) | Tenant (required) | Cache (required) | Maps to | auth_cues | tenant_cues | cache_cues | shopify_security_cues |
|---|---:|---:|---:|---|---:|---:|---:|---:|
| `functions/api/health.ts` | `public` | `no` | `no-store` | health/diagnostics | 0 | 0 | 0 | 0 |

## Storefront

| Endpoint file | Tier (required) | Tenant (required) | Cache (required) | Maps to | auth_cues | tenant_cues | cache_cues | shopify_security_cues |
|---|---:|---:|---:|---|---:|---:|---:|---:|
| `functions/api/storefront/cart/add-lines.ts` | `public_or_user` | `yes` | `no-store` | cart | 0 | 0 | 0 | 0 |
| `functions/api/storefront/cart/attributes-update.ts` | `public_or_user` | `yes` | `no-store` | cart | 0 | 0 | 0 | 0 |
| `functions/api/storefront/cart/create.ts` | `public_or_user` | `yes` | `no-store` | cart | 0 | 0 | 0 | 0 |
| `functions/api/storefront/cart/discount-codes-update.ts` | `public_or_user` | `yes` | `no-store` | cart | 0 | 0 | 0 | 0 |
| `functions/api/storefront/cart/fetch.ts` | `public_or_user` | `yes` | `no-store` | cart | 0 | 0 | 0 | 0 |
| `functions/api/storefront/cart/remove-lines.ts` | `public_or_user` | `yes` | `no-store` | cart | 0 | 0 | 0 | 0 |
| `functions/api/storefront/cart/set-buyer-identity.ts` | `public_or_user` | `yes` | `no-store` | cart | 0 | 0 | 0 | 0 |
| `functions/api/storefront/cart/update-line.ts` | `public_or_user` | `yes` | `no-store` | cart | 0 | 0 | 0 | 0 |
| `functions/api/storefront/landing/sections.ts` | `public` | `yes` | `edge-cacheable` | content sections | 0 | 1 | 1 | 1 |
| `functions/api/storefront/product/by-handle.ts` | `public` | `yes` | `edge-cacheable` | catalog + sections | 0 | 1 | 1 | 0 |
| `functions/api/storefront/product/sections.ts` | `public` | `yes` | `edge-cacheable` | catalog + sections | 0 | 1 | 1 | 0 |

## Payments

| Endpoint file | Tier (required) | Tenant (required) | Cache (required) | Maps to | auth_cues | tenant_cues | cache_cues | shopify_security_cues |
|---|---:|---:|---:|---|---:|---:|---:|---:|
| `functions/api/payments/intent/create.ts` | `user_or_public` | `yes` | `no-store` | payments | 1 | 0 | 0 | 0 |

## Customer Auth

| Endpoint file | Tier (required) | Tenant (required) | Cache (required) | Maps to | auth_cues | tenant_cues | cache_cues | shopify_security_cues |
|---|---:|---:|---:|---|---:|---:|---:|---:|
| `functions/api/customer-auth/callback.ts` | `mixed` | `yes` | `no-store` | customer auth | 1 | 0 | 1 | 0 |
| `functions/api/customer-auth/logout.ts` | `mixed` | `yes` | `no-store` | customer auth | 0 | 0 | 1 | 0 |
| `functions/api/customer-auth/start.ts` | `mixed` | `yes` | `no-store` | customer auth | 1 | 0 | 1 | 1 |

## Customer

| Endpoint file | Tier (required) | Tenant (required) | Cache (required) | Maps to | auth_cues | tenant_cues | cache_cues | shopify_security_cues |
|---|---:|---:|---:|---|---:|---:|---:|---:|
| `functions/api/customer/order.ts` | `user` | `yes` | `no-store` | customer data | 1 | 0 | 1 | 1 |
| `functions/api/customer/orders.ts` | `user` | `yes` | `no-store` | customer data | 1 | 0 | 1 | 1 |

## Admin

| Endpoint file | Tier (required) | Tenant (required) | Cache (required) | Maps to | auth_cues | tenant_cues | cache_cues | shopify_security_cues |
|---|---:|---:|---:|---|---:|---:|---:|---:|
| `functions/api/admin/media/delete.ts` | `admin` | `yes` | `no-store` | admin backoffice | 1 | 0 | 1 | 0 |
| `functions/api/admin/media/list-all.ts` | `admin` | `yes` | `no-store` | admin backoffice | 1 | 0 | 1 | 0 |
| `functions/api/admin/media/list.ts` | `admin` | `yes` | `no-store` | admin backoffice | 1 | 0 | 1 | 0 |
| `functions/api/admin/media/upsert.ts` | `admin` | `yes` | `no-store` | admin backoffice | 1 | 0 | 1 | 0 |
| `functions/api/admin/orders/get.ts` | `admin` | `yes` | `no-store` | admin backoffice | 1 | 0 | 0 | 0 |
| `functions/api/admin/orders/list.ts` | `admin` | `yes` | `no-store` | admin backoffice | 1 | 0 | 0 | 0 |
| `functions/api/admin/sections/get.ts` | `admin` | `yes` | `no-store` | admin backoffice | 1 | 0 | 0 | 1 |
| `functions/api/admin/sections/update.ts` | `admin` | `yes` | `no-store` | admin backoffice | 1 | 0 | 0 | 1 |

## Exports

| Endpoint file | Tier (required) | Tenant (required) | Cache (required) | Maps to | auth_cues | tenant_cues | cache_cues | shopify_security_cues |
|---|---:|---:|---:|---|---:|---:|---:|---:|
| `functions/api/exports/customers.ts` | `admin` | `yes` | `no-store` | exports | 1 | 0 | 0 | 0 |
| `functions/api/exports/orders.ts` | `admin` | `yes` | `no-store` | exports | 1 | 0 | 0 | 0 |

## Metrics

| Endpoint file | Tier (required) | Tenant (required) | Cache (required) | Maps to | auth_cues | tenant_cues | cache_cues | shopify_security_cues |
|---|---:|---:|---:|---|---:|---:|---:|---:|
| `functions/api/metrics/daily.ts` | `admin` | `yes` | `no-store` | metrics | 1 | 0 | 0 | 0 |
| `functions/api/metrics/refund-rate.ts` | `admin` | `yes` | `no-store` | metrics | 1 | 0 | 0 | 0 |
| `functions/api/metrics/refunds-by-sku.ts` | `admin` | `yes` | `no-store` | metrics | 1 | 0 | 0 | 0 |
| `functions/api/metrics/repeat.ts` | `admin` | `yes` | `no-store` | metrics | 1 | 0 | 0 | 0 |
| `functions/api/metrics/source-revenue.ts` | `admin` | `yes` | `no-store` | metrics | 1 | 0 | 0 | 0 |
| `functions/api/metrics/summary.ts` | `admin` | `yes` | `no-store` | metrics | 1 | 0 | 0 | 0 |
| `functions/api/metrics/top-skus.ts` | `admin` | `yes` | `no-store` | metrics | 1 | 0 | 0 | 0 |
| `functions/api/metrics/utm-sources.ts` | `admin` | `yes` | `no-store` | metrics | 1 | 0 | 0 | 0 |

## Orders

| Endpoint file | Tier (required) | Tenant (required) | Cache (required) | Maps to | auth_cues | tenant_cues | cache_cues | shopify_security_cues |
|---|---:|---:|---:|---|---:|---:|---:|---:|
| `functions/api/orders/by-email.ts` | `admin_or_service` | `yes` | `no-store` | order lookup | 1 | 0 | 0 | 0 |
| `functions/api/orders/by-name.ts` | `admin_or_service` | `yes` | `no-store` | order lookup | 1 | 0 | 0 | 0 |
| `functions/api/orders/get.ts` | `admin_or_service` | `yes` | `no-store` | order lookup | 1 | 0 | 0 | 0 |

## Experiment

| Endpoint file | Tier (required) | Tenant (required) | Cache (required) | Maps to | auth_cues | tenant_cues | cache_cues | shopify_security_cues |
|---|---:|---:|---:|---|---:|---:|---:|---:|
| `functions/api/experiment/config.ts` | `public` | `yes` | `edge-cacheable` | experiments/flags config | 0 | 1 | 1 | 0 |
| `functions/api/experiment/track.ts` | `public` | `yes` | `no-store` | experiments/ingest | 0 | 0 | 0 | 0 |

## Shopify

| Endpoint file | Tier (required) | Tenant (required) | Cache (required) | Maps to | auth_cues | tenant_cues | cache_cues | shopify_security_cues |
|---|---:|---:|---:|---|---:|---:|---:|---:|
| `functions/api/shopify/auth.ts` | `integration` | `yes` | `no-store` | provider auth/session | 0 | 1 | 1 | 1 |
| `functions/api/shopify/auth/callback.ts` | `integration` | `yes` | `no-store` | provider auth/session | 0 | 1 | 1 | 1 |
| `functions/api/shopify/ping.ts` | `integration` | `yes` | `no-store` | provider auth/session | 1 | 0 | 0 | 0 |
| `functions/api/shopify/session.ts` | `integration` | `yes` | `no-store` | provider auth/session | 0 | 0 | 0 | 0 |

## Shopify Webhooks

| Endpoint file | Tier (required) | Tenant (required) | Cache (required) | Maps to | auth_cues | tenant_cues | cache_cues | shopify_security_cues |
|---|---:|---:|---:|---|---:|---:|---:|---:|
| `functions/api/shopify/webhooks/app-uninstalled.ts` | `integration` | `yes` | `no-store` | provider plumbing | 0 | 0 | 0 | 1 |
| `functions/api/shopify/webhooks/customers-create.ts` | `integration` | `yes` | `no-store` | provider plumbing | 0 | 0 | 0 | 1 |
| `functions/api/shopify/webhooks/customers-data-request.ts` | `integration` | `yes` | `no-store` | provider plumbing | 0 | 0 | 0 | 1 |
| `functions/api/shopify/webhooks/customers-delete.ts` | `integration` | `yes` | `no-store` | provider plumbing | 0 | 0 | 0 | 1 |
| `functions/api/shopify/webhooks/customers-redact.ts` | `integration` | `yes` | `no-store` | provider plumbing | 0 | 0 | 0 | 1 |
| `functions/api/shopify/webhooks/customers-update.ts` | `integration` | `yes` | `no-store` | provider plumbing | 0 | 0 | 0 | 1 |
| `functions/api/shopify/webhooks/fulfillments-create.ts` | `integration` | `yes` | `no-store` | provider plumbing | 1 | 0 | 0 | 1 |
| `functions/api/shopify/webhooks/orders-create.ts` | `integration` | `yes` | `no-store` | provider plumbing | 0 | 0 | 0 | 1 |
| `functions/api/shopify/webhooks/orders-updated.ts` | `integration` | `yes` | `no-store` | provider plumbing | 1 | 0 | 0 | 1 |
| `functions/api/shopify/webhooks/shop-redact.ts` | `integration` | `yes` | `no-store` | provider plumbing | 0 | 0 | 0 | 1 |

## Webhooks

| Endpoint file | Tier (required) | Tenant (required) | Cache (required) | Maps to | auth_cues | tenant_cues | cache_cues | shopify_security_cues |
|---|---:|---:|---:|---|---:|---:|---:|---:|
| `functions/api/webhooks/clerk.ts` | `integration` | `yes` | `no-store` | provider webhooks | 1 | 0 | 0 | 1 |

## Other

| Endpoint file | Tier (required) | Tenant (required) | Cache (required) | Maps to | auth_cues | tenant_cues | cache_cues | shopify_security_cues |
|---|---:|---:|---:|---|---:|---:|---:|---:|
| `functions/api/cloudinary/sign.ts` | `unknown` | `unknown` | `unknown` |  | 0 | 0 | 0 | 1 |
| `functions/api/newsletter/subscribe.ts` | `unknown` | `unknown` | `unknown` |  | 0 | 0 | 0 | 0 |

