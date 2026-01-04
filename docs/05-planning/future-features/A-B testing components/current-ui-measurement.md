# Current UI Measurement Plan (no new variants yet)

Objective: measure how the existing UI performs (click timing, click hotspots, drop-off points) before adding variants.

## What to collect (per session)
- anon_id, session_id, page_path, timestamp
- Click events: element identifier (data-click-id/css selector), x/y position relative to viewport, scroll_y at click, device/viewport size
- Time-to-first-click (TTFC) and time-to-first-CTA-click
- Scroll depth milestones (25/50/75/100%)
- Exit point: last page_path + scroll_y

## How to collect (client)
1) Add a lightweight click listener on the document:
   - Skip if `exp_disable=1` or consent not granted.
   - Capture: `click_id` (from `data-click-id` attribute), `page_path`, `x`, `y`, `viewport_w/h`, `scroll_y`, `ttfc_ms` (first click per session), `ttfcta_ms` (first click on CTA-marked element).
   - Batch events via existing `/api/experiment/track` as `event` rows with `name: 'click'` and metadata payload.
2) Scroll depth: on scroll, when passing 25/50/75/100% thresholds, send `event` with `name: 'scroll_depth'` and `depth_pct`.
3) Exit: on `beforeunload`/visibility change, send last known `page_path`, `scroll_y` as `event` name `exit` (best-effort).
4) Tag key elements with `data-click-id` (hero-cta, pdp-add-to-cart, email-form-submit, nav-link, popup-close, etc.) to make hotspots interpretable.

## Storage mapping (Supabase `events` table)
- `name`: `click`, `scroll_depth`, `exit`
- `metadata`:
  - click: `{click_id, x, y, viewport_w, viewport_h, scroll_y, ttfc_ms?, ttfcta_ms?}`
  - scroll_depth: `{depth_pct}`
  - exit: `{scroll_y}`
- `experiment_key/variant`: null for baseline; filled automatically once experiments go live.

## Heatmap & timing analysis
- Heatmap: export clicks per page into a grid (e.g., 40x40). SQL example to bin:
  ```sql
  select
    page_path,
    floor((metadata->>'x')::float / 40) as bin_x,
    floor((metadata->>'y')::float / 40) as bin_y,
    count(*) as clicks
  from events
  where name = 'click'
  group by 1,2,3;
  ```
  Render overlay in a simple admin page (canvas) or notebook.
- TTFC/TTFCTA: `percentile_cont(0.5)` over `metadata->>'ttfc_ms'` grouped by page or device.
- Drop-off: for each session, take last event per page to infer exit scroll; correlate with CTA click presence.

## Guardrails & performance
- Debounce click logging to one event per animation frame; cap payload size (<1KB each); batch send.
- Respect DNT/consent toggle; do not store PII.
- Avoid third-party heatmap scripts to keep bundle lean; use in-house rendering from stored coordinates.

## Action loop
1) Enable baseline tracking across current UI (no variants). Run for 3–7 days.
2) Review heatmaps + TTFC to locate dead zones or slow-engagement areas.
3) Turn insights into experiment hypotheses (e.g., move CTA to hotspot; simplify section with low engagement).
4) Then launch A/B variants targeting those surfaces and reuse the same events to measure lift.
