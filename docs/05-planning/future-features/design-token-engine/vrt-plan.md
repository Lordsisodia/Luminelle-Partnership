# Visual Regression & Theming VRT Plan (pilot)

Tools: Playwright (headed=false), 1280x720 viewport, light mode.

Pages to capture
- `/products/example` (PDP) — hero, gallery, buy box, reviews.
- `/checkout` (mock) — form, totals, CTA.
- `/` (landing hero + CTA strip) — gradient + badges.

Brands to render
- Default (Lumelle / tokens.default.json)
- Noir (tokens.alt-noir.json)

Suggested script (pseudo)
```ts
import { chromium } from 'playwright'
import fs from 'fs'
import tokensDefault from './src/theme/tokens.default.json'
import tokensNoir from './src/theme/tokens.alt-noir.json'
import { applyBrandTheme } from './src/theme/runtime-theme'

async function snap(brandName, tokens) {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } })
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' })
  await page.addInitScript(({ tokens }) => {
    window.__BRAND_TOKENS__ = tokens
  }, { tokens })
  // Navigate and snap
  for (const path of ['/', '/products/example', '/checkout']) {
    await page.goto(`http://localhost:5173${path}`, { waitUntil: 'networkidle' })
    await page.screenshot({ path: `./tmp/vrt-${brandName}${path.replace(/\//g,'-') || '-home'}.png`, fullPage: true })
  }
  await browser.close()
}

await snap('lumelle', tokensDefault)
await snap('noir', tokensNoir)
```

Diffing
- Use `pixelmatch` or Playwright trace comparison; store outputs under `tmp/vrt-diff/`.

Acceptance
- No visual change for default brand vs baseline screenshots (within noise).
- Noir variant renders legible AA text and consistent theming.
