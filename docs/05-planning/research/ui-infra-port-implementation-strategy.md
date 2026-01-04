# Port Implementation Strategy (internal API vs client Storefront)

We have two valid ways to implement the ports described in:
- `docs/05-planning/research/ui-infra-plugin-architecture.md`
- `docs/05-planning/research/ui-infra-ports-dtos.md`

This note decides **where** the port implementations should live and **how** UI should consume them, without coupling to Shopify today (or Stripe later).

Status: planning only (no code changes in this doc).

---

## Why this decision exists (evidence)

This repo has a clear internal-API boundary for commerce/content:

Server-side Storefront + internal endpoints:
- `functions/_lib/storefront.ts` (exports `runStorefront`)
- `functions/api/storefront/product/*` and `functions/api/storefront/cart/*`

Also, checkout handoff/proxying is explicitly server-side:
- `functions/_lib/shopifyCheckoutProxy.ts`
- `functions/cart/c/[[catchall]].ts`
- `functions/checkouts/[[catchall]].ts`

And the client app already consumes these via a port-driven runtime:
- `src/domains/platform/commerce/runtime.ts`
- `src/domains/platform/commerce/adapters/shopify/internal-api/*`

So we need an opinionated default: ports should call **internal API** by default, or call **client Storefront** by default, or be **hybrid**.

---

## Option A — Internal API first (recommended default)

Meaning:
- `CatalogPort`, `ContentPort`, `CartPort`, `CheckoutPort` call internal endpoints (Pages Functions / server).
- UI never needs Shopify Storefront tokens or Shopify endpoints directly.

Pros:
- Strongest “UI is plug‑in” property (UI is vendor-agnostic and infra-agnostic).
- Better security posture (tokens and vendor endpoints stay server-side).
- Easier to evolve vendors (Shopify → Stripe) behind internal endpoints without touching UI.
- Lets you centralize caching/rate limiting/observability in one place.
- Matches existing checkout reality: checkout proxy/handoff routes are already server-side infra.

Cons:
 - Requires good internal API ergonomics (typed responses, errors, latency discipline).
 - More moving parts in local dev (functions must run).

When to choose:
- If “interchangeable UI” is the priority (sounds like it is).
- If you expect multiple providers over time.

Acceptance checks (architecture-level):
- UI imports only `@platform/*` ports and never imports vendor code.
- Vendors can change without any UI build-time changes.

---

## Option B — Client Storefront first

Meaning:
- Ports are implemented in the client app and call Shopify Storefront directly today.
- Stripe later might require a second client-side SDK (or still use server for payments).

Pros:
- Fewer hops (potentially lower latency).
- Simpler dev server setup.

Cons:
- “Infra leaks” risk increases (tokens, endpoints, vendor errors are closer to UI).
- Makes the “Stripe later” story harder (payments almost certainly want server-side).
- Harder to enforce import/layering rules because vendor logic is in the same runtime as UI.

When to choose:
 - If you want maximum simplicity for a short-lived prototype and accept more vendor proximity.
 - (Note: this repo currently favors internal API first; treat client-side Storefront as an escape hatch.)

Acceptance checks:
- Client-side vendors still remain behind ports (no UI importing Shopify modules directly).

---

## Option C — Hybrid (explicitly capability-driven)

Meaning:
- Ports choose implementation per capability and environment:
  - `CheckoutPort` always uses server-side proxy/handoff (because it already does).
  - `CartPort` could use server-side endpoints for mutations (and optionally client cache).
  - `CatalogPort`/`ContentPort` can use server-side in prod, client-side in dev (or vice versa).

Pros:
- Best of both worlds, if disciplined.
- Gives escape hatches for performance hotspots.

Cons:
- Requires discipline to avoid “two sources of truth”.
- Needs very clear rules for what calls what and where config is read.

When to choose:
- If you want internal API as the long-term default, but need pragmatic shortcuts early.

Acceptance checks:
- There remains exactly one consumer surface (`@platform/commerce`, `@platform/content`).
- Switching between implementations is done behind the port entrypoint (not in UI).

---

## Decision (v1 default)

We choose **Option A: Internal API first** as the v1 default (and it matches the current runtime), with **Option C (hybrid)** as a controlled escape hatch for:
- dev ergonomics, and/or
- performance hotspots after you can measure them.

Reason:
- It makes the UI and the vendor boundary the cleanest, and it matches existing reality (checkout proxy is already server-side).

Additional default (checkout URL policy):
- When checkout is available and proxy/handoff routes exist, prefer returning a **first-party** URL from `CheckoutPort.beginCheckout()` (proxy/handoff), not a vendor URL.

## Practical implications (what this means in code later)

- UI/domain will call `@platform/commerce` ports.
- Those port implementations should, by default, call internal HTTP endpoints (Pages Functions) such as:
  - product fetch (by handle): `functions/api/storefront/product/by-handle.ts`
  - sections fetch: `functions/api/storefront/product/sections.ts`
  - cart operations: `functions/api/storefront/cart/*`
  - checkout link proxy/handoff: `functions/_lib/shopifyCheckoutProxy.ts` plus route handlers (`functions/cart/c/[[catchall]].ts`, `functions/checkouts/[[catchall]].ts`)

Hybrid escape hatch examples (allowed, but must stay behind ports):
- Dev mode may use client Storefront querying for `CatalogPort` to reduce local dev friction.
- A measured performance hotspot could move `CatalogPort.searchProducts()` client-side, while leaving cart/checkout server-side.

---

## Next decision: what’s the “port boundary” exactly?

If Option A:
- Decide whether “ports” are implemented as:
  1) a direct in-app client wrapper around internal HTTP endpoints, or
  2) a dependency-injected service object created once at app startup.

Either way:
- UI imports only the ports’ public entrypoints.

---

## Environment policy (dev vs prod)

Goal: remove scattered vendor branching (`shopifyEnabled`) by making environment behavior a **platform responsibility**.

Rules:
- **Only the platform entrypoint** chooses an adapter implementation (Shopify vs mock).
- UI/domain code must never:
  - read vendor flags (e.g. `shopifyEnabled`),
  - construct vendor URLs (e.g. Shopify checkout domains),
  - or special-case vendors in error handling.

Recommended behavior:

| Scenario | Dev (local) | Prod (deployed) |
|---|---|---|
| Provider not configured (e.g. missing env vars) | Use a **mock adapter** or show a clear dev-only banner | Throw `PortError(code: 'NOT_CONFIGURED')` and show a “store temporarily unavailable” fallback |
| Upstream outage / network | Throw `PortError('UNAVAILABLE')` | Throw `PortError('UNAVAILABLE')` |
| Resource missing (product handle not found) | Throw `PortError('NOT_FOUND')` | Throw `PortError('NOT_FOUND')` |

Where configured:
- Platform entrypoints (design target):
  - `src/domains/platform/commerce/index.ts`
  - `src/domains/platform/content/index.ts`

The decision inputs should be:
- environment (“dev vs prod”), and
- config presence (provider env vars), and
- explicit overrides (only in platform).
