# Functions Auth Guards Spec (admin/user/integration)

Goal:
- Make auth enforcement consistent across `/api/*` so we don’t “accidentally expose” admin/metrics/exports endpoints.
- Keep the frontend swappable by treating auth as a backend concern (tiered), not as a frontend-specific SDK detail.

Evidence anchors:
- Current contract gaps: multiple admin/metrics/exports/order endpoints appear to have no auth cues by scan (risk surface):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/contract-gaps-report-v1.1.md`
- Internal bearer auth helper exists for server-to-server calls:  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-_lib-internalAuth.ts.head160.txt`
- Webhook signature verification helpers exist (Shopify), suggesting “integration tier” should be standardized similarly:  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-_lib-shopifyWebhooks.ts.head160.txt`
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-_lib-shopifyOAuth.ts.head160.txt`

---

## 1) Auth tiers (one set of semantics)

Define explicit tiers (matches backend contract v1):
- `public`: no auth required
- `user`: authenticated end-user (customer)
- `admin`: authenticated admin user + role
- `integration`: signed webhook / OAuth callback / shared secret (server-to-server)
- `internal`: service-to-service internal calls (bearer shared secret)

Contract grounding: `backend-boundary-contract-v1.md`

---

## 2) Where auth guard helpers must live

Create shared helpers under:
- `functions/_lib/authGuards.ts` (proposed)

Existing helper to reuse:
- `requireInternalAuth(request, env)` for `internal` tier.  
  Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-_lib-internalAuth.ts.head160.txt`

---

## 3) Guard behaviors (v1)

### 3.1 `public` guard

- No-op.
- May still require tenant context if endpoint is tenant-specific.

### 3.2 `internal` guard

- Use `requireInternalAuth(request, env)`.
- Return `401` on missing/invalid bearer token.

### 3.3 `integration` guard (Shopify webhooks)

- Use `verifyShopifyWebhook(request, env)` in webhook handlers.
- Return `401` (or `400`) on invalid signature; never proceed.

Evidence helper exists:  
`docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-_lib-shopifyWebhooks.ts.head160.txt`

### 3.4 `integration` guard (Shopify OAuth callback)

- Use `verifyShopifyHmac(env, url)` for auth callback routes.
- Return `401` on invalid HMAC.

Evidence helper exists:  
`docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-_lib-shopifyOAuth.ts.head160.txt`

### 3.5 `user` / `admin` guards

Design requirement:
- Do not scatter provider-specific auth parsing across endpoints.
- Instead, centralize “extract user identity + roles” in a shared helper.

Open question (must decide before implementation):
- Are user/admin tokens verified locally (JWT verification), or by calling Clerk, or by relying on existing server session cookies?

Evidence that the contract expects tiered auth (even if implementation differs):  
`docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/backend-boundary-contract-v1.md`

---

## 4) Acceptance checks (implementation phase)

- All `admin/**`, `exports/**`, and `metrics/**` endpoints are protected by `admin` or `internal` tier.
- All provider webhook routes are protected by `integration` tier verification.
- No endpoint invents its own ad-hoc auth rules.

