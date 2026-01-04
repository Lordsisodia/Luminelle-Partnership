# A/B Testing Components — Plan (Hybrid-first)

Purpose: improve **purchase conversion** (our value moment) by running small, safe UI experiments (hero, PDP, checkout messaging) and combining:
- **Quantitative** measurement (funnel + variant lift)
- **Qualitative** understanding (heatmaps + session replay)

Constraints:
- Free-first (avoid client surprise costs)
- Hosted on Cloudflare (Pages + Workers)
- Supabase storage is tight; avoid raw click/event firehose in Supabase

Recommended default stack:
- **PostHog** (feature flags + funnels; strict event budget)
- **Microsoft Clarity** (heatmaps + replays; free)
- Optional lean DB layer (Supabase/Turso) for configs/rollups only (not raw events)

This repo’s end-to-end integration plan lives here:
- `docs/05-planning/future-features/A-B testing components/integration-plan.md`
- `docs/05-planning/future-features/A-B testing components/implementation-plan.md`

---

## What we ship first (minimum viable measurement)

### Surfaces (first 30–60 days)
- Landing: hero CTA copy/style, social proof placement.
- PDP: buy box layout, guarantee badge copy.
- Checkout handoff: messaging + trust badges (no price personalization).

### Event schema (keep tiny)
We do **not** track all clicks. We only capture “business events”:
- `experiment_exposure` (once/session/experiment)
- `cta_click`
- `add_to_cart`
- `begin_checkout`
- `purchase` (server-side via Shopify order webhook)

### Why server-side `purchase` matters
- Checkout happens on Shopify (different domain).
- The reliable conversion signal is Shopify order creation.
- We attribute purchase back to the experiment variant by writing cart attributes before redirect.

---

## Current state in this repo (already implemented, env-gated)

PostHog integration exists and is gated behind env flags:
- PostHog client wrapper: `src/lib/analytics/posthog.ts`
  - autocapture/pageviews/replay disabled (free-tier friendly)
  - feature flag reads use `{ send_event: false }` to avoid `$feature_flag_called` spam
- Feature flag hook: `src/lib/analytics/useFeatureFlagVariant.ts`
- First experiment (hero CTA): `src/domains/landing/ui/sections/shop/hero-shop/HeroShop.tsx`
- Funnel events:
  - `add_to_cart`: `src/domains/products/ui/pages/ProductPage/index.tsx`
  - `begin_checkout` + cart attributes before redirect: `src/domains/cart/ui/pages/CartPage.tsx`, `src/domains/checkout/ui/pages/CheckoutPage.tsx`
- Server-side purchase event → PostHog (Shopify webhook): `api/shopify/webhooks/orders-create.ts`

So “implementing PostHog” now is mostly:
1) configure PostHog project + flags
2) set env vars in staging
3) verify the funnel end-to-end with a staging order

---

## Rollout plan (staging → prod)

1) Staging:
   - enable tracking (control-only first)
   - verify event volumes stay low
   - verify purchase attribution from webhook joins to the same `distinct_id`
2) Production:
   - 24h control-only baseline
   - 50/50 experiment
   - ship winner; log decision

See the step-by-step runbook:
- `docs/05-planning/future-features/A-B testing components/staging-runbook.md`

---

## Fallback (only if PostHog flags are blocked)

If we ever need a portable in-repo assignment system:
- use the deterministic provider under `src/experiments/*`
- keep configs/rollups in a **lean** DB (Turso recommended if Supabase storage is a concern)
- still send measurement events to PostHog (not to Supabase raw tables)

The “DB-first” plan is kept as a legacy reference inside:
- `docs/05-planning/future-features/A-B testing components/checklist.md`
