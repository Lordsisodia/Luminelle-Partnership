# Client Stub (safe draft, not mounted)

## Env/flags
```
VITE_EXPERIMENTS_ENABLED=false
VITE_ANALYTICS_ENABLED=false
VITE_HEATMAP_ENABLED=false
```
Provider attaches only when flag true and consent granted.

## App shell integration (draft)
```tsx
// src/main.tsx (snippet idea)
import { ExperimentProvider } from '@/experiments/provider'
const enabled = import.meta.env.VITE_EXPERIMENTS_ENABLED === 'true'

const App = () => {
  const content = <Routes />
  return enabled ? (
    <ExperimentProvider>{content}</ExperimentProvider>
  ) : (
    content
  )
}
```

## Usage in components (draft)
```tsx
// Hero.tsx
import { useExperiment } from '@/experiments/provider'

export function HeroCTA() {
  const { variant, trackEvent } = useExperiment('hero_cta_copy', 'control')

  const copy = variant === 'bold' ? 'Try Lumelle today' : 'Shop the shower cap'
  const style = variant === 'bold' ? 'btn-primary' : 'btn-secondary'

  return (
    <button
      data-click-id="hero-cta"
      className={style}
      onClick={() => trackEvent('cta_click', { click_id: 'hero-cta' })}
    >
      {copy}
    </button>
  )
}
```

## Heatmaps & replay (recommended: Clarity, gated)

Recommended approach for heatmaps/replay is **not** “store click coordinates in our DB”.
Instead:
- Use Clarity/Hotjar for heatmaps + replays.
- Use our experiment assignment to **tag** sessions/recordings by variant (so you can filter “control vs variant”).

Clarity tagging snippet (draft):
```ts
// Example: after we know anonId + sessionId + variant
if (typeof window !== 'undefined' && typeof (window as any).clarity === 'function') {
  // Identify ties recordings to our anon/session ids (Clarity hashes custom-id client-side)
  ;(window as any).clarity('identify', anonId, sessionId)

  // Tag recordings/heatmaps by experiment + variant
  ;(window as any).clarity('set', `exp_${experimentKey}`, variant)
}
```

## Optional: vendor-free click telemetry (only if required)

If we truly need our own heatmap overlay, we must:
- sample heavily (e.g., 1% of sessions), and
- log **only** clicks with a `data-click-id` (not every document click), and
- enforce retention (delete after 30–90 days).

Otherwise, analytics tables will bloat quickly (especially on the Supabase free tier).

## Notes
- All snippets live in docs; not imported into the live bundle yet.
- When ready, move files from `src/experiments/*` (already scaffolded) into build with flag.
- Default flags off keeps production untouched.
```
