# Env Flags (draft, not applied)

Add to `.env.example` when ready; keep prod defaults off until launch.
```
# Experiments & tracking
EXPERIMENTS_ENABLED=false
HEATMAP_ENABLED=false
VITE_EXPERIMENTS_ENABLED=false

# Supabase service (server-side only; never ship to client)
SUPABASE_URL=
SUPABASE_SERVICE_KEY=
```

Usage:
- Server routes return 404 when `EXPERIMENTS_ENABLED=false`.
- Client skips provider when `VITE_EXPERIMENTS_ENABLED=false`.
- Heatmap listener never attaches when `HEATMAP_ENABLED=false`.
