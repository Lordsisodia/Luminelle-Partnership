# Client Stub (safe draft, not mounted)

## Env/flags
```
VITE_EXPERIMENTS_ENABLED=false
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
      onClick={() => trackEvent('click', { click_id: 'hero-cta' })}
    >
      {copy}
    </button>
  )
}
```

## Heatmap/TTFC capture (draft, gated)
```ts
// src/experiments/heatmap.ts
let firstClickTs: number | null = null
let firstCtaTs: number | null = null

export function enableHeatmapTracking(trackEvent: any) {
  if (typeof window === 'undefined') return
  const start = performance.now()
  const handler = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    const clickId = target.closest('[data-click-id]')?.getAttribute('data-click-id') ?? 'unknown'
    const now = performance.now()
    if (firstClickTs === null) firstClickTs = now - start
    if (!firstCtaTs && clickId.includes('cta')) firstCtaTs = now - start
    trackEvent('click', {
      click_id: clickId,
      x: e.clientX,
      y: e.clientY,
      viewport_w: window.innerWidth,
      viewport_h: window.innerHeight,
      scroll_y: window.scrollY,
      ttfc_ms: firstClickTs,
      ttfcta_ms: firstCtaTs ?? undefined,
    })
  }
  document.addEventListener('click', handler, { passive: true })
}
```

## Notes
- All snippets live in docs; not imported into the live bundle yet.
- When ready, move files from `src/experiments/*` (already scaffolded) into build with flag.
- Default flags off keeps production untouched.
```
