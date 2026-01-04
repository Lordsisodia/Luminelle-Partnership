# Test Plan (staging-first)

## Unit tests (to add when wiring code)
- Hashing/bucketing
  - Stable assignment for same anon_id
  - Weight distribution matches ratios over large sample
- Idempotency
  - Duplicate exposure batch does not increase rows
  - Duplicate event batch with same anon/session/name/timebucket ignored
- Validation
  - Reject payload >50 items; reject missing anon/session; reject oversized metadata/path/UA
  - Accept allowed event names only
- Provider
  - Emits single exposure per experiment per session
  - Respects query-param overrides and disable flag
  - Consent gate blocks tracking when false
- Heatmap listener
  - Does not attach when `HEATMAP_ENABLED=false`
  - Click payload contains required fields; TTFC computed only once

## Integration tests (staging)
- `/api/experiment/config`
  - 404 when flag off; returns live experiments when on
  - Honors start/end dates; excludes draft/paused
- `/api/experiment/track`
  - Accepts valid batch; inserts exposures/events
  - Rejects invalid item with index
  - Rate limit path (returns 429 when exceeded)
- Data flow
  - Exposure logged on first paint; CTA click logs event with variant
  - Heatmap click events stored with x/y; scroll_depth milestones fire once per threshold

## Manual QA (staging)
- Flip flags off → no UI change, endpoints 404
- Flip flags on → provider active, hero CTA variant renders per bucket; control matches current UI
- Consent off → no exposures/events; consent on → events flow
- Override `?exp_key=bold` → hero shows bold variant; exposures recorded as bold
- Kill switch → set env false; redeploy; endpoints 404; UI control

## Performance checks
- Bundle delta measured via `npm run build` diff (<5 KB gzip)
- Track batching: simulate 10 clicks; ensure ≤3 network posts
- Endpoint latency <150ms p50 on staging

## Data sanity
- SRM query runs clean after 24h (within ±5%)
- No orphan events (missing exposure) beyond expected noise
- Heatmap bins return non-zero rows for main pages
