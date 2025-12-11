# A/B Testing Components — Implementation Notes

This is a practical guide to wire the endpoints and client SDK that were scaffolded.

## API contracts
- `GET /api/experiment/config`
  - Returns: array of live experiments `{ key, status, default_split, targeting? }`.
  - Cache: set `ETag`, `Cache-Control: public, max-age=60, stale-while-revalidate=240`.
  - Filters: status = live, start_at <= now, (end_at is null or future).

- `POST /api/experiment/track`
  - Body: JSON array of items where each item is either:
    - Exposure: `{type:'exposure', experiment_key, variant, anon_id, session_id, page_path?, user_agent?, user_id?}`
    - Event: `{type:'event', name, experiment_key?, variant?, anon_id, session_id, cart_value?, metadata?, user_id?}`
  - Validation: max 50 items; reject if missing anon/session; experiment must be live if experiment_key present.
  - Idempotency: compute key `anon_id:session_id:type:experiment_key:variant:name:timebucket(5m)`; ignore duplicates.
  - Response: `{accepted: n, rejected: [{index, reason}]}`.

## Server wiring (Express example)
Pseudo-code outline to drop into `server/index.ts` or a router:
```ts
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!)

app.get('/api/experiment/config', async (_req, res) => {
  const { data, error } = await supabase
    .from('experiments')
    .select('key,status,default_split,targeting,start_at,end_at')
    .eq('status','live')
    .lte('start_at', new Date().toISOString())
    .or('end_at.is.null,end_at.gt.' + new Date().toISOString())
  if (error) return res.status(500).json({ error: error.message })
  res.set('Cache-Control','public, max-age=60, stale-while-revalidate=240')
  res.json(data || [])
})

app.post('/api/experiment/track', async (req, res) => {
  const items = Array.isArray(req.body) ? req.body : []
  if (items.length === 0 || items.length > 50) return res.status(400).json({ error:'invalid batch' })
  const exposures = items.filter(i => i.type === 'exposure')
  const events = items.filter(i => i.type === 'event')
  // Optional: check experiments live via in-memory cache or quick query
  const { error: exErr } = await supabase.from('experiment_exposures').insert(exposures)
  const { error: evErr } = await supabase.from('events').insert(events)
  if (exErr || evErr) return res.status(400).json({ error: exErr?.message || evErr?.message })
  res.json({ accepted: items.length, rejected: [] })
})
```

## Validation rules to add
- Limit `page_path` length (<= 512), `metadata` size (<= 2KB), `user_agent` (<= 256).
- Allow only known event names: `['view_item','add_to_cart','begin_checkout','purchase','email_capture_submit']`.
- Reject exposures where experiment is not live.
- SRM soft-check: if batch shows >5% deviation from split over last 1k rows, log warning (do not reject).

## Client SDK integration checklist
- Wrap app root with `ExperimentProvider`.
- On each instrumented component:
  - Call `const { variant, trackEvent } = useExperiment('hero_cta_copy')` (example).
  - Render per-variant UI.
  - Fire `trackEvent('click_cta')` on interactions; ensure form submit sends `email_capture_submit`.
- Add debug aids: query param `?exp_disable=1` to short-circuit provider; `?exp_key=variant` override for QA.

## Deployment & env
- Add env vars: `SUPABASE_URL`, `SUPABASE_SERVICE_KEY` for server; `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` already used client-side.
- Ensure service key is never shipped to client bundles.

## Observability
- Log rejected payload reasons; count them in metrics.
- Add simple health metric: last successful insert timestamp.
- Cron SQL (daily):
  - SRM check per experiment (expected split vs observed exposures). 
  - Missing-exposure check (events where no exposure exists for same session/experiment).

## Data retention (defaults)
- Keep raw events/exposures 180 days; keep aggregates/view indefinitely.

## Rollout runbook (first test)
1) Apply migration to Supabase (replace role names if needed).
2) Implement config + track routes; deploy.
3) Enable provider in app; ship hero CTA experiment to 50/50.
4) Verify after 24h: exposures ~ events, no SRM, conversion numbers plausible.
5) Decide winner criteria and roll to 100/0 via `default_split` update.
