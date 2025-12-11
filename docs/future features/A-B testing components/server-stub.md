# Server Stub (safe draft, not wired)

Purpose: show exactly how we’ll implement endpoints with env kill switches, without touching live app.

## Env flags
```
EXPERIMENTS_ENABLED=false
HEATMAP_ENABLED=false
SUPABASE_URL=...
SUPABASE_SERVICE_KEY=...
```

## Express route skeleton
```ts
// server/routes/experiments.ts (draft)
import express from 'express'
import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'

const router = express.Router()
const enabled = process.env.EXPERIMENTS_ENABLED === 'true'
const supabase = enabled
  ? createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!)
  : null

router.get('/config', async (_req, res) => {
  if (!enabled || !supabase) return res.sendStatus(404)
  const now = new Date().toISOString()
  const { data, error } = await supabase
    .from('experiments')
    .select('key,status,default_split,targeting,start_at,end_at')
    .eq('status', 'live')
    .lte('start_at', now)
    .or(`end_at.is.null,end_at.gt.${now}`)
  if (error) return res.status(500).json({ error: error.message })
  res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=240')
  res.json(data ?? [])
})

const TrackItem = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('exposure'),
    experiment_key: z.string(),
    variant: z.string(),
    anon_id: z.string(),
    session_id: z.string(),
    page_path: z.string().max(512).optional(),
    user_agent: z.string().max(256).optional(),
    user_id: z.string().optional(),
  }),
  z.object({
    type: z.literal('event'),
    name: z.enum(['view_item','add_to_cart','begin_checkout','purchase','email_capture_submit','click','scroll_depth','exit']),
    experiment_key: z.string().optional(),
    variant: z.string().optional(),
    anon_id: z.string(),
    session_id: z.string(),
    cart_value: z.number().optional(),
    metadata: z.record(z.any()).optional(),
    user_id: z.string().optional(),
  }),
])

router.post('/track', async (req, res) => {
  if (!enabled || !supabase) return res.sendStatus(404)
  const batch = Array.isArray(req.body) ? req.body : []
  if (batch.length === 0 || batch.length > 50) return res.status(400).json({ error: 'invalid batch' })

  const parsed = []
  for (let i = 0; i < batch.length; i++) {
    const r = TrackItem.safeParse(batch[i])
    if (!r.success) return res.status(400).json({ error: 'bad item', index: i })
    parsed.push(r.data)
  }

  const exposures = parsed.filter((i) => i.type === 'exposure')
  const events = parsed.filter((i) => i.type === 'event')

  if (exposures.length) {
    const { error } = await supabase.from('experiment_exposures').insert(exposures)
    if (error) return res.status(400).json({ error: error.message })
  }
  if (events.length) {
    const { error } = await supabase.from('events').insert(events)
    if (error) return res.status(400).json({ error: error.message })
  }
  return res.json({ accepted: parsed.length, rejected: [] })
})

export default router
```

## Wiring (draft)
```ts
// server/index.ts
import experimentRoutes from './routes/experiments'
app.use('/api/experiment', experimentRoutes)
```

## Notes
- 404 when flag is false → zero impact to live app until toggled.
- Schema validation uses zod; swap for yup/ajv if preferred.
- Idempotency/rate-limit hooks can be added before inserts; omitted here for brevity.
```
