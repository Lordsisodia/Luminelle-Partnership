# State of Play (A/B + Heatmap)

What exists (hybrid-first; code is present but gated by env flags)
- Plan + checklist + roadmap: `ab-testing-components.md`, `checklist.md`, `implementation-plan.md`.
- Integration plan (hybrid-first): `integration-plan.md`.
- Backend schema draft: `server/migrations/2025-12-11_experiments.sql` (tables, view, seed row, RLS stubs).
- PostHog client integration:
  - `src/lib/analytics/posthog.ts` and `src/lib/analytics/useFeatureFlagVariant.ts`
  - `src/main.tsx` initializes PostHog early (still env-gated)
- Hero CTA experiment wiring (PostHog flag `hero_cta_copy`): `src/domains/landing/ui/sections/shop/hero-shop/HeroShop.tsx`
- Funnel tracking + checkout attribution:
  - PDP emits `add_to_cart`
  - Cart/Checkout pages emit `begin_checkout` and write cart attributes (anon/session + `ph_distinct_id` + `exp_*`)
- Shopify purchase attribution:
  - Cloudflare Pages Functions: `functions/api/shopify/webhooks/orders-create.ts` sends server-side `purchase` to PostHog if `POSTHOG_API_KEY` is set
  - (Legacy / Node/Vercel) `api/shopify/webhooks/orders-create.ts` does the same for non-Workers deployments
- Client SDK scaffold (fallback): `src/experiments/*` (hash, identity, config fetch, track queue, provider); not mounted.
- Server/client stubs: `server-stub.md`, `client-stub.md` (env-gated examples).
- Env/runbooks/specs: `env-flags.md`, `staging-runbook.md`, `handoff-into-code.md`, `first-experiment-spec.md`.
- Dashboards/SQL: `dashboard-template.md`, `srm-missing-exposure-cron.sql`, `heatmap-overlay.md`.
- QA/test/privacy: `qa-checklist.md`, `test-plan.md`, `privacy-consent.md`.
- Worklog + current doc status: `build-steps-worklog.md`.

What’s left before touching app code
- Decide staging Supabase credentials and enable flags there only.
- Confirm the analytics/heatmap tooling choice (recommended: `hybrid-analytics-heatmaps-stack.md`).
- Confirm storage strategy: avoid raw event logs in Supabase (500MB concern); keep DB layer lean and use PostHog/Clarity for event-heavy data.
- Apply migration to staging; verify seed + view.
- Move stubs into code behind env flags; wire provider around app shell.
- Enable hero CTA experiment only on staging; run QA checklist.
- Baseline heatmap run (staging) 3–7 days; review hotspots.

What to flip for prod later
- Turn on flags with 100% control split first; monitor; then 50/50 hero CTA.
- Keep kill switch and DNT/consent gating in place.
