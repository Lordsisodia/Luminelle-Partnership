# AI UI testing for the Lumelle landing page (2025 Q3+)

Last updated: **2025-12-26**

This doc answers:

- “How can my AI *see* my landing page properly (elements, structure)?”
- “What’s the most up-to-date (2025 Q3+) approach for automated testing?”

## TL;DR (recommended setup)

1) **Deterministic automated testing (CI-safe):** use **Playwright Test** (`@playwright/test`) for:
   - E2E / functional checks (clicks, forms, routing)
   - Visual regression (screenshots + diffs)
   - Accessibility checks (axe + role-based locators)

2) **AI/agent “sees the page” (interactive exploration):** use **Playwright MCP** (`@playwright/mcp`).
   - It exposes the page via the **accessibility tree** (structured snapshots), so an LLM can reliably “see” headings, buttons, links, form fields, etc. without fragile screenshot-guessing.
   - Use it to **explore pages, find stable locators, and generate tests**.

3) **Best-in-class visual testing (optional, paid):** use **Applitools Eyes for Playwright** when pixel-diff snapshots are too flaky/noisy.
   - This is the “AI visual regression” category (ignore dynamic regions, match by layout/content rules, manage baselines in a dashboard).

4) **Optional: vision-based UI reasoning:** keep this as a *secondary* signal (exploratory/design/layout checks), not the only gate in CI.
   - Use screenshot-based “computer use” agents when you need true pixel-level reasoning, but expect less determinism than accessibility-tree automation.

## Why this is “best practice” in 2025

### Playwright Test = reliable + debuggable
Playwright remains the default choice for modern web E2E because it is fast, deterministic, and has first-class tooling (traces, screenshots, retries, CI integrations).

### Playwright MCP = best way for an LLM to “see” UI elements
Playwright MCP is explicitly designed for LLM browser automation using **structured accessibility snapshots** (no vision model required) and aims to be deterministic vs. screenshot-based ambiguity.

That maps directly to your “AI needs to see elements properly” problem.

## Approach options (pick based on what you need)

### Quick comparison (what’s actually “better” depends on the goal)

| Goal | Best default | Better option when… | Why |
|---|---|---|---|
| CI pass/fail E2E checks | Playwright Test | — | Deterministic, debuggable, stable locators |
| LLM “sees” elements/structure | Playwright MCP | Stagehand / browser-use | MCP = structured a11y snapshots; wrappers add “Act/Extract/Observe” + self-healing |
| “Did the page *look* right?” | Playwright `toHaveScreenshot` | Applitools Eyes | Eyes handles dynamic content/region ignores/match levels better than raw pixel diffs |
| Component-level UI regression | Storybook + Chromatic | — | Snapshot every component state (not just one E2E route) |
| Automate arbitrary desktop/apps | — | OpenAI / Anthropic computer use | Coordinate + screenshot control for non-web / non-semantic UIs (less deterministic) |

### Option A — “Real automated testing” (recommended for CI)
Use **Playwright Test** for your actual pass/fail pipeline:

- Assertions like “hero heading exists”, “CTA goes to PDP”, “email capture renders”, “FAQ accordion opens”
- Visual regression with `toHaveScreenshot`
- Accessibility checks (axe)

This is how you avoid flaky AI tests breaking production deploys.

### Option B — “AI helps me write tests” (recommended for speed)
Use **Playwright MCP** (or a higher-level AI wrapper like Stagehand) for:

- exploring pages
- finding semantic elements
- generating locators and test code

Then commit those tests as normal Playwright tests.

### Option C — “AI drives the browser like a human” (use carefully)
Using “computer use”/vision-driven agents can be great for exploratory testing, but it’s harder to keep deterministic. Use it for:

- one-off investigative runs
- quickly identifying broken flows
- generating bug repro steps

…and then convert the findings into deterministic Playwright assertions.

## What “seeing the landing page” means technically

There are 3 complementary “views” of a page:

1) **DOM/HTML** (what exists in markup)
2) **Accessibility tree** (what’s semantically exposed as headings/buttons/links/inputs)
3) **Pixels** (screenshots; the literal visual output)

For reliable automated testing:

- Prefer (2) + (1) for element-finding and assertions.
- Use (3) for visual regressions and layout/design checks.

## Playwright MCP setup (so your AI can browse locally)

Playwright MCP is a server you add to your MCP client (Cursor, Claude Desktop, Codex CLI, etc.).

This repo already has an MCP config at `.mcp.json` — you can add a `playwright` entry under `mcpServers`.

Minimal MCP config looks like:

```jsonc
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

Notes:

- Keep your app running locally (for Vite, usually `npm run dev`) so the MCP-driven browser can load it.
- The MCP server can be used in many clients; check your client’s MCP config location (Codex CLI, Cursor settings, etc.).
- If your agent should only browse *your* site during tests, lock it down with Playwright MCP flags like `--allowed-hosts` / `--blocked-origins` so the model can’t wander off-domain.

## Playwright Test setup (deterministic E2E + VRT)

### 1) Install

```bash
npm i -D @playwright/test
npm run playwright:install
```

## Generate landing screenshots (for AI analysis)

This repo includes a ready-to-run Playwright script that will:

- load the landing page
- scroll down in steps (viewport screenshots)
- capture a full-page screenshot
- capture key section screenshots (`#hero`, `#benefits`, `#reviews`, `#faq`)

Script:

- `scripts/capture-landing-screenshots.mjs`

Output directory (default):

- `docs/ai-snapshots/landing/latest`

### Run against local dev server (recommended)

Terminal A:

```bash
npm run dev
```

Terminal B:

```bash
BASE_URL=http://localhost:5173 npm run snapshots:landing
```

### Run against production (quickest)

```bash
BASE_URL=https://lumelle.com npm run snapshots:landing
# or: BASE_URL=https://your-production-domain.example npm run snapshots:landing
```

### Useful knobs

- `SCROLL_STEPS=10` to capture more viewport slices
- `HEADLESS=0` to watch the browser while it scrolls

### 2) Add a simple landing page test

For Lumelle, `/` renders `ShopLandingPage` and uses section anchors like `#hero`, `#benefits`, `#reviews`, `#faq`.

Example test (`tests/landing.spec.ts`):

```ts
import { test, expect } from '@playwright/test'

test('landing page smoke', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/LUMELLE/i)

  // Section anchors used by the MarketingLayout nav
  await expect(page.locator('#hero')).toBeVisible()
  await expect(page.locator('#benefits')).toBeVisible()
  await expect(page.locator('#reviews')).toBeVisible()
  await expect(page.locator('#faq')).toBeVisible()

  // Main hero heading comes from `homeConfig.hero.headline`
  await expect(
    page.getByRole('heading', { level: 1, name: /Luxury shower cap that keeps hair frizz-free/i }),
  ).toBeVisible()
})
```

### 3) Add visual regression (screenshot diffs)

Use visual snapshots for “did the landing page render correctly?” checks:

```ts
import { test, expect } from '@playwright/test'

test('landing page visual', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveScreenshot('landing-desktop.png', { fullPage: true })
})
```

Tips to reduce flaky diffs:

- Run with consistent viewport sizes
- Disable animations (global CSS override in the test)
- Wait for `networkidle` or known UI-ready selectors

### 4) Add accessibility checks (axe)

Playwright pairs well with `@axe-core/playwright`:

```ts
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('landing page a11y', async ({ page }) => {
  await page.goto('/')

  const results = await new AxeBuilder({ page }).analyze()
  expect(results.violations).toEqual([])
})
```

## Better visual regression (when pixel diffs are too noisy): Applitools Eyes

If your landing page has any of these:

- dynamic reviews / user-generated content
- marketing banners that change
- subtle layout shifts caused by fonts/images

…then raw `toHaveScreenshot()` diffs can get noisy fast.

Applitools Eyes integrates with Playwright via `@applitools/eyes-playwright` and gives you:

- visual checkpoints (`eyes.check`) with options like “match by layout/content/strict”
- ignore regions for dynamic content
- baseline management and approvals in a dashboard

## Component-level regression (often the fastest wins): Storybook + Chromatic

This repo already has Storybook scripts (`npm run storybook`).

Chromatic (made by the Storybook team) can automatically run:

- visual regression tests on stories (component states)
- interaction tests
- accessibility tests

This is often “better than E2E-only” because it catches UI regressions at the component level (Hero, TrustBar, FAQ accordion) without the complexity of full navigation flows.

## Make the page more “AI + test friendly” (high ROI)

Even if you use AI, the *best* way to get reliable element targeting is:

1) **Semantic HTML** (real `<button>`, `<a>`, proper headings)
2) **Accessible names** (`aria-label`, visible text, alt text)
3) **Stable identifiers** where needed (`data-testid`)

Practical suggestions:

- Add `data-testid` only to “key” things you assert on a lot (hero CTA, email capture input, primary nav).
- Prefer Playwright’s role-based locators (`getByRole`) for most interactions.
- Avoid asserting on dynamic classes generated by styling systems.

## When an AI wrapper helps (vs. raw Playwright)

If you want “write tests from natural language” workflows, AI wrappers on top of Playwright can help you:

- create flows quickly
- survive minor UI refactors (self-healing)
- extract structured data from pages without hand-written selectors

Still: convert the final checks into deterministic Playwright assertions whenever possible.

## Other “AI can browse the web” options (2025 Q3+)

If Playwright MCP is not enough (or you want more “agent” features out of the box), these are common alternatives:

### Stagehand (TypeScript)

- Browser automation SDK aimed at developers + LLMs with primitives like `act()` / `extract()` / `observe()` and “self-healing” behavior.
- Compatible with Playwright (so you can incrementally adopt it where selectors are painful).

### browser-use (Python)

- Agent-first approach: “make websites accessible for AI agents”, with local + cloud options.
- Useful if your AI stack is Python-centric and you want a higher-level web agent abstraction.

## “Computer use” agents (OpenAI / Anthropic): when to use them

If you truly need pixel-level reasoning (e.g., “is this element overlapping?” or “is the CTA below the fold on iPhone?”), then “computer use” agents can help:

- They operate on a loop of **screenshots** + **mouse/keyboard actions** (coordinate clicks, typing).
- They are great for exploratory checks, but less deterministic than accessibility-tree approaches.

Important safety note (especially in CI): computer-use tools are commonly described as beta/preview and vendors explicitly warn against using them in fully authenticated or high-stakes environments.

## Google “Antigravity” vs Puppeteer vs Playwright (what’s actually better?)

It sounds like there are *three different things* getting mixed together:

1) **Google Antigravity** (the product): an **agent-first IDE** (Gemini-powered) where agents can operate across editor/terminal/browser and produce “artifacts” like screenshots/recordings to verify work.
2) **Puppeteer** (the library): Google’s **browser automation library** (DevTools Protocol / WebDriver BiDi) you import into your code.
3) **Playwright** (the library + test runner): Microsoft’s browser automation library + a first-party test runner (`@playwright/test`).

### Is “Google Antigravity” a better Playwright/Puppeteer?

Not really — it’s not the same category.

- Antigravity is an IDE/workflow product with browser control.
- Puppeteer/Playwright are libraries you run in your repo and in CI.

If your goal is **automated testing in CI** for Lumelle, you still want Playwright Test (or a similar dedicated test runner) regardless of which IDE you write code in.

### If you want the best “Google” browser automation library

That’s **Puppeteer**.

What Puppeteer is best at:

- Chrome/Firefox automation with tight integration to Chrome DevTools Protocol (great for performance-style automation and Chrome-specific work).

Where Puppeteer is weaker for *testing* workflows:

- No first-party test runner (you usually pair it with Jest/Mocha/etc.)
- No first-class WebKit/Safari engine coverage for cross-browser UI testing

### If you want the best overall testing experience (especially for landing pages)

That’s usually **Playwright + Playwright Test**:

- Built-in test runner + parallelism + retries + HTML reports + traces
- Strong locator strategy (`getByRole`, `getByLabel`, etc.)
- Cross-browser engines (Chromium + Firefox + WebKit)

### If you want “AI can see elements properly” (not just pixels)

Playwright MCP is currently one of the cleanest setups because it’s explicitly designed to let an LLM interact with pages via **structured accessibility snapshots**, which makes element selection more deterministic than screenshot-only agents.

## Recommended workflow for you (fastest unblock)

1) **Use Playwright MCP** in your AI client to browse `http://localhost:5173/` and identify the key elements + user journeys.
2) **Turn those into Playwright Test specs** (smoke + visual + a11y).
3) Add CI later once tests are stable.

## References (2025 Q3+)

- Playwright MCP (`@playwright/mcp`): https://github.com/microsoft/playwright-mcp
- Playwright best practices + locators: https://playwright.dev/docs/best-practices
- Playwright visual comparisons (`toHaveScreenshot`): https://playwright.dev/docs/test-snapshots
- axe-core + Playwright: https://playwright.dev/docs/accessibility-testing
- Stagehand (AI browser automation on top of Playwright): https://stagehand.dev/
- browser-use (Python AI web agent): https://github.com/browser-use/browser-use
- OpenAI “computer use” tool: https://platform.openai.com/docs/guides/tools-computer-use
- Anthropic “computer use” tool: https://docs.anthropic.com/en/docs/build-with-claude/computer-use
- Applitools Eyes for Playwright: https://applitools.com/docs/eyes/playwright/integration-with-playwright
- Chromatic for Storybook: https://www.chromatic.com/docs/storybook
- Google Antigravity (overview/news): https://arstechnica.com/gadgets/2025/11/google-unveils-antigravity-an-ai-first-coding-environment-that-creates-artifacts/
- Google Cloud blog on Antigravity + MCP servers: https://cloud.google.com/blog/products/application-development/mcp-servers-now-available-in-gemini-cli-and-gemini-code-assist
- Puppeteer official docs: https://pptr.dev/
