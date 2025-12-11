// Sample Playwright VRT script (not wired). Place in scripts/ when running pilot.
import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'
import tokensDefault from './tokens.default.json' assert { type: 'json' }
import tokensNoir from './tokens.alt-noir.json' assert { type: 'json' }

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173'
const OUT_DIR = process.env.VRT_OUT || 'tmp/vrt'

const routes = ['/', '/products/example', '/checkout']

async function snap(name: string, tokens: any) {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } })

  await page.addInitScript(({ tokens }) => {
    // Option A: expose tokens for runtime-theme.ts to pick up
    ;(window as any).__BRAND_TOKENS__ = tokens
  }, { tokens })

  for (const route of routes) {
    await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' })
    const safe = route === '/' ? 'home' : route.replace(/\//g, '-')
    const file = path.join(OUT_DIR, `${name}-${safe}.png`)
    fs.mkdirSync(path.dirname(file), { recursive: true })
    await page.screenshot({ path: file, fullPage: true })
    console.log('saved', file)
  }

  await browser.close()
}

async function main() {
  await snap('lumelle', tokensDefault)
  await snap('noir', tokensNoir)
}

main()
