import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { chromium } from 'playwright'

function ensureTrailingSlash(url) {
  return url.endsWith('/') ? url : `${url}/`
}

function safeName(input) {
  return String(input)
    .trim()
    .toLowerCase()
    .replace(/https?:\/\//g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function parseIntEnv(name, fallback) {
  const raw = process.env[name]
  if (!raw) return fallback
  const n = Number.parseInt(raw, 10)
  return Number.isFinite(n) ? n : fallback
}

async function disableAnimations(page) {
  await page.addStyleTag({
    content: `
      *,
      *::before,
      *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
        scroll-behavior: auto !important;
        caret-color: transparent !important;
      }
    `,
  })
}

async function waitForFonts(page) {
  try {
    await page.evaluate(async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fonts = /** @type {any} */ (document).fonts
      if (fonts && fonts.ready) await fonts.ready
    })
  } catch {
    // ignore
  }
}

async function captureForViewport({ browser, name, url, outDir, contextOptions, sectionIds, scrollSteps }) {
  const context = await browser.newContext(contextOptions)
  const page = await context.newPage()

  page.setDefaultTimeout(60_000)
  page.setDefaultNavigationTimeout(60_000)

  await page.goto(url, { waitUntil: 'networkidle' })
  await disableAnimations(page)
  await waitForFonts(page)

  // Full-page (compressed to keep repo size reasonable for AI inputs)
  await page.screenshot({
    path: path.join(outDir, `${name}-full.jpeg`),
    fullPage: true,
    type: 'jpeg',
    quality: 80,
  })

  // Viewport shots while scrolling down
  if (scrollSteps >= 2) {
    const { scrollHeight, viewportHeight } = await page.evaluate(() => ({
      scrollHeight: document.documentElement.scrollHeight,
      viewportHeight: window.innerHeight,
    }))

    const maxScroll = Math.max(0, scrollHeight - viewportHeight)
    for (let i = 0; i < scrollSteps; i += 1) {
      const t = scrollSteps === 1 ? 0 : i / (scrollSteps - 1)
      const y = Math.round(maxScroll * t)
      await page.evaluate((yy) => window.scrollTo(0, yy), y)
      await page.waitForTimeout(250)
      await page.screenshot({
        path: path.join(outDir, `${name}-scroll-${String(i + 1).padStart(2, '0')}.png`),
        fullPage: false,
      })
    }
  }

  // Section screenshots (useful for AI chunked analysis)
  for (const id of sectionIds) {
    const matches = page.locator(`#${id}`)
    const count = await matches.count()
    if (count === 0) continue

    for (let i = 0; i < count; i += 1) {
      const locator = matches.nth(i)
      const suffix = count > 1 ? `-${String(i + 1).padStart(2, '0')}` : ''

      try {
        await locator.scrollIntoViewIfNeeded({ timeout: 5_000 })
        await page.waitForTimeout(250)

        // Some sections can be intentionally empty (zero height) or conditionally hidden.
        // In those cases, Playwright considers them "not visible" and screenshots will time out.
        const box = await locator.boundingBox()
        if (!box || box.width < 2 || box.height < 2) {
          // eslint-disable-next-line no-console
          console.warn(`Skipping section screenshot (not visible): #${id}${suffix}`)
          continue
        }

        await locator.screenshot({
          path: path.join(outDir, `${name}-section-${safeName(id)}${suffix}.png`),
          timeout: 10_000,
        })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn(`Skipping section screenshot (#${id}${suffix}): ${err?.message ?? err}`)
      }
    }
  }

  await context.close()
}

async function main() {
  const args = process.argv.slice(2)
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Capture landing page screenshots for AI analysis.

Usage:
  BASE_URL=http://localhost:5173 npm run snapshots:landing
  BASE_URL=https://your-site.example npm run snapshots:landing

Env vars:
  BASE_URL      Base URL to capture (default: http://localhost:5173)
  ROUTE         Path to capture (default: /)
  OUT_DIR       Output directory (default: docs/ai-snapshots/landing/latest)
  SCROLL_STEPS  Number of viewport scroll screenshots (default: 6)
  HEADLESS      Set to 0 to watch the browser (default: 1)
`)
    process.exit(0)
  }

  const baseUrl = ensureTrailingSlash(process.env.BASE_URL || 'http://localhost:5173')
  const route = process.env.ROUTE || '/'
  const outDir = process.env.OUT_DIR || 'docs/ai-snapshots/landing/latest'
  const scrollSteps = parseIntEnv('SCROLL_STEPS', 6)
  const headless = (process.env.HEADLESS || '1') !== '0'

  const url = new URL(route, baseUrl).toString()

  fs.mkdirSync(outDir, { recursive: true })

  const browser = await chromium.launch({ headless })
  try {
    const sectionIds = ['hero', 'benefits', 'reviews', 'faq']

    await captureForViewport({
      browser,
      name: 'desktop-1440x900',
      url,
      outDir,
      sectionIds,
      scrollSteps,
      contextOptions: { viewport: { width: 1440, height: 900 } },
    })

    await captureForViewport({
      browser,
      name: 'mobile-390x844',
      url,
      outDir,
      sectionIds,
      scrollSteps,
      contextOptions: {
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
        deviceScaleFactor: 2,
      },
    })
  } finally {
    await browser.close()
  }

  console.log(`Saved screenshots to: ${outDir}`)
  console.log(`Captured URL: ${url}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
