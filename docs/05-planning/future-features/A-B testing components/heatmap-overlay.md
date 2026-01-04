# Heatmap Overlay (notebook/admin page blueprint)

Data source: `events` where `name='click'` and metadata contains x/y + viewport.

> ⚠️ Note (recommended hybrid): If we adopt Clarity/Hotjar/OpenReplay for heatmaps, this internal overlay becomes **optional**.
> It’s only worth building if we explicitly want a vendor-free heatmap, and even then it should be **sampled** to avoid database bloat.

## Steps
1) Query binned clicks (SQL in `dashboard-template.md`): returns `page_path, bin_x, bin_y, clicks`.
2) Fetch a reference screenshot per page (static asset or playwright shot) sized to same viewport grid.
3) Render in a small React/Canvas page or notebook:
   - Normalize bins: `intensity = clicks / max_clicks`.
   - Color scale: e.g., rgba(255,0,0, intensity^0.5 * 0.7).
   - Draw rectangles at `bin_x * bin_size`, `bin_y * bin_size` with size = bin_size (e.g., 40px).
4) Add filters: `page_path`, date range, device bucket (if stored), `click_id` includes.
5) Export: save PNG/HTML for sharing; keep data on our infra (no third-party pixel).

## Minimal Canvas snippet (pseudo)
```ts
const binSize = 40
for (const bin of bins) {
  const intensity = bin.clicks / maxClicks
  ctx.fillStyle = `rgba(255,0,0, ${Math.pow(intensity, 0.5) * 0.7})`
  ctx.fillRect(bin.bin_x * binSize, bin.bin_y * binSize, binSize, binSize)
}
```

## Notes
- Keep payload small: pre-aggregate in SQL before sending to client.
- If using Clarity/Hotjar/OpenReplay instead, this overlay is optional; prefer their built-in heatmaps.
- Match viewport: if pages are responsive, generate separate bins per viewport bucket (mobile/desktop).
