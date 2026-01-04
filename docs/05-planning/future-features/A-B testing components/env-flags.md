# Env Flags (draft, not applied)

Now added to the repo root `.env.example`; keep prod defaults off until launch.
```
# Experiments & analytics (browser)
VITE_EXPERIMENTS_ENABLED=false
VITE_ANALYTICS_ENABLED=false
VITE_HEATMAP_ENABLED=false

# Heatmaps/replay (Clarity)
VITE_CLARITY_PROJECT_ID=

# Quant analytics + funnels (PostHog)
VITE_POSTHOG_KEY=
VITE_POSTHOG_HOST=   # e.g. https://us.i.posthog.com or https://eu.i.posthog.com (ingestion host)

# Experiments (server-side / config store) — only needed if we keep DB-backed configs
EXPERIMENTS_ENABLED=false

# Supabase service (server-side only; never ship to client)
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

# PostHog server-side capture (Shopify webhooks → purchase event)
# This can be the same project key as `VITE_POSTHOG_KEY`, but keep it as a server secret.
POSTHOG_API_KEY=
POSTHOG_HOST=        # e.g. https://us.i.posthog.com or https://eu.i.posthog.com (ingestion host)

# Optional: Turso (lean DB layer for experiment configs/rollups)
TURSO_URL=
TURSO_AUTH_TOKEN=
```

Usage:
- Client-side:
  - Experiments provider skips when `VITE_EXPERIMENTS_ENABLED=false`.
  - PostHog init skips when `VITE_ANALYTICS_ENABLED=false`.
  - Clarity init skips when `VITE_HEATMAP_ENABLED=false`.
- Server-side:
  - DB-backed experiment routes (if used) return 404 when `EXPERIMENTS_ENABLED=false`.
  - Shopify webhooks should remain enabled (unrelated to experiments).
