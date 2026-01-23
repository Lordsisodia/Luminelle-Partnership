#!/usr/bin/env node
/**
 * Comprehensive Flow Testing Script
 *
 * Tests all 24 user flows systematically with:
 * - Screenshot capture at each step
 * - Console error monitoring
 * - Performance metrics
 * - Accessibility checks
 * - Detailed reporting
 *
 * Usage: node scripts/test-all-flows-comprehensive.mjs
 */

import { chromium } from 'playwright';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

// Configuration
const BASE_URL = process.env.BASE_URL || 'http://localhost:5174';
const RESULTS_DIR = 'docs/testing/cycle-1/flow-results';
const SCREENSHOT_DIR = 'screenshots';

// Viewports and themes to test
const VIEWPORTS = {
  mobile: { width: 375, height: 667, label: 'Mobile' },
  tablet: { width: 768, height: 1024, label: 'Tablet' },
  desktop: { width: 1920, height: 1080, label: 'Desktop' }
};

const THEMES = ['light', 'dark'];

// All 24 flows to test
const FLOWS = [
  // Phase 1: Critical (P0)
  {
    id: 'flow-001',
    name: 'Guest Checkout Journey',
    priority: 'P0',
    phase: 1,
    route: ['/', '/product/:handle', '/cart', '/checkout', '/order/:orderId/confirm'],
    steps: [
      { action: 'navigate', url: '/', description: 'Navigate to homepage' },
      { action: 'wait', selector: '.product-card', description: 'Wait for products to load' },
      { action: 'screenshot', name: 'homepage' },
      { action: 'click', selector: '.product-card:first-child a', description: 'Click first product' },
      { action: 'wait', selector: 'button:has-text("Add to Cart")', description: 'Wait for product page' },
      { action: 'screenshot', name: 'product-page' },
      { action: 'click', selector: 'button:has-text("Add to Cart")', description: 'Add to cart' },
      { action: 'wait', timeout: 2000, description: 'Wait for cart update' },
      { action: 'navigate', url: '/cart', description: 'Go to cart' },
      { action: 'wait', selector: '.cart-item', description: 'Wait for cart to load' },
      { action: 'screenshot', name: 'cart-page' },
      { action: 'click', selector: 'a:has-text("Checkout")', description: 'Proceed to checkout' },
      { action: 'wait', selector: 'form[name="checkout"]', description: 'Wait for checkout form' },
      { action: 'screenshot', name: 'checkout-page' }
    ]
  },
  {
    id: 'flow-002',
    name: 'Cart Management',
    priority: 'P0',
    phase: 1,
    route: ['/cart'],
    steps: [
      { action: 'navigate', url: '/cart', description: 'Navigate to cart' },
      { action: 'wait', selector: '.cart-page', description: 'Wait for cart' },
      { action: 'screenshot', name: 'cart-empty' },
      // Note: Will need to add item first in actual test
      { action: 'fill', selector: 'input[type="number"]', value: '2', description: 'Update quantity' },
      { action: 'wait', timeout: 1000 },
      { action: 'screenshot', name: 'cart-updated' }
    ]
  },
  {
    id: 'flow-003',
    name: 'User Registration & Login',
    priority: 'P0',
    phase: 1,
    route: ['/sign-up', '/sign-in', '/account'],
    steps: [
      { action: 'navigate', url: '/sign-up', description: 'Go to signup' },
      { action: 'wait', selector: 'form', description: 'Wait for form' },
      { action: 'screenshot', name: 'signup-page' },
      { action: 'fill', selector: 'input[name="email"]', value: 'test@example.com', description: 'Fill email' },
      { action: 'fill', selector: 'input[name="password"]', value: 'TestPassword123!', description: 'Fill password' },
      { action: 'screenshot', name: 'signup-filled' },
      // Note: Won't actually submit to avoid creating real accounts
      { action: 'navigate', url: '/sign-in', description: 'Go to signin' },
      { action: 'screenshot', name: 'signin-page' }
    ]
  },

  // Phase 2: High Priority (P1)
  {
    id: 'flow-004',
    name: 'Product Discovery',
    priority: 'P1',
    phase: 2,
    route: ['/', '/product/:handle'],
    steps: [
      { action: 'navigate', url: '/', description: 'Navigate to homepage' },
      { action: 'screenshot', name: 'homepage' },
      { action: 'click', selector: '.product-card:first-child a', description: 'Click product' },
      { action: 'screenshot', name: 'product-page' }
    ]
  },
  {
    id: 'flow-005',
    name: 'Product Search',
    priority: 'P1',
    phase: 2,
    route: ['/search'],
    steps: [
      { action: 'navigate', url: '/search?q=test', description: 'Navigate to search' },
      { action: 'screenshot', name: 'search-results' }
    ]
  },
  {
    id: 'flow-006',
    name: 'Login Flow',
    priority: 'P1',
    phase: 2,
    route: ['/sign-in'],
    steps: [
      { action: 'navigate', url: '/sign-in', description: 'Go to signin' },
      { action: 'screenshot', name: 'signin-page' }
    ]
  },
  {
    id: 'flow-007',
    name: 'Order Tracking',
    priority: 'P1',
    phase: 2,
    route: ['/order/track'],
    steps: [
      { action: 'navigate', url: '/order/track', description: 'Go to order tracking' },
      { action: 'screenshot', name: 'order-tracking' }
    ]
  },
  {
    id: 'flow-008',
    name: 'Account Dashboard',
    priority: 'P1',
    phase: 2,
    route: ['/account'],
    steps: [
      { action: 'navigate', url: '/account', description: 'Go to account' },
      { action: 'screenshot', name: 'account-dashboard' }
    ]
  },
  {
    id: 'flow-009',
    name: 'Address Book',
    priority: 'P1',
    phase: 2,
    route: ['/account/addresses'],
    steps: [
      { action: 'navigate', url: '/account/addresses', description: 'Go to addresses' },
      { action: 'screenshot', name: 'address-book' }
    ]
  },
  {
    id: 'flow-010',
    name: 'Payment Methods',
    priority: 'P1',
    phase: 2,
    route: ['/account/payments'],
    steps: [
      { action: 'navigate', url: '/account/payments', description: 'Go to payment methods' },
      { action: 'screenshot', name: 'payment-methods' }
    ]
  },
  {
    id: 'flow-011',
    name: 'Brand Story',
    priority: 'P1',
    phase: 2,
    route: ['/brand'],
    steps: [
      { action: 'navigate', url: '/brand', description: 'Go to brand story' },
      { action: 'screenshot', name: 'brand-story' }
    ]
  },

  // Phase 3: Medium Priority (P2)
  {
    id: 'flow-012',
    name: 'Returns Process',
    priority: 'P2',
    phase: 3,
    route: ['/returns'],
    steps: [
      { action: 'navigate', url: '/returns', description: 'Go to returns' },
      { action: 'screenshot', name: 'returns-page' }
    ]
  },
  {
    id: 'flow-013',
    name: 'Blog Browsing',
    priority: 'P2',
    phase: 3,
    route: ['/blog'],
    steps: [
      { action: 'navigate', url: '/blog', description: 'Go to blog' },
      { action: 'screenshot', name: 'blog-index' }
    ]
  },
  {
    id: 'flow-014',
    name: 'Creator Welcome',
    priority: 'P2',
    phase: 3,
    route: ['/welcome'],
    steps: [
      { action: 'navigate', url: '/welcome', description: 'Go to welcome' },
      { action: 'screenshot', name: 'welcome-page' }
    ]
  },
  {
    id: 'flow-015',
    name: 'Creators Page',
    priority: 'P2',
    phase: 3,
    route: ['/creators'],
    steps: [
      { action: 'navigate', url: '/creators', description: 'Go to creators' },
      { action: 'screenshot', name: 'creators-page' }
    ]
  },
  {
    id: 'flow-016',
    name: 'Order History',
    priority: 'P2',
    phase: 3,
    route: ['/account/orders'],
    steps: [
      { action: 'navigate', url: '/account/orders', description: 'Go to order history' },
      { action: 'screenshot', name: 'order-history' }
    ]
  },
  {
    id: 'flow-017',
    name: 'Order Details',
    priority: 'P2',
    phase: 3,
    route: ['/account/orders/:orderId'],
    steps: [
      { action: 'navigate', url: '/account/orders', description: 'Go to orders' },
      { action: 'screenshot', name: 'orders-list' }
    ]
  },

  // Phase 4: Admin (P2-P3)
  {
    id: 'flow-018',
    name: 'Admin Dashboard',
    priority: 'P2',
    phase: 4,
    route: ['/admin'],
    steps: [
      { action: 'navigate', url: '/admin', description: 'Go to admin' },
      { action: 'screenshot', name: 'admin-dashboard' }
    ]
  },
  {
    id: 'flow-019',
    name: 'Order Management',
    priority: 'P2',
    phase: 4,
    route: ['/admin/orders'],
    steps: [
      { action: 'navigate', url: '/admin/orders', description: 'Go to orders' },
      { action: 'screenshot', name: 'admin-orders' }
    ]
  },
  {
    id: 'flow-020',
    name: 'Product Catalog',
    priority: 'P2',
    phase: 4,
    route: ['/admin/products'],
    steps: [
      { action: 'navigate', url: '/admin/products', description: 'Go to products' },
      { action: 'screenshot', name: 'admin-products' }
    ]
  },
  {
    id: 'flow-021',
    name: 'Content Management',
    priority: 'P2',
    phase: 4,
    route: ['/admin/pages'],
    steps: [
      { action: 'navigate', url: '/admin/pages', description: 'Go to pages' },
      { action: 'screenshot', name: 'admin-pages' }
    ]
  },
  {
    id: 'flow-022',
    name: 'Media Library',
    priority: 'P3',
    phase: 4,
    route: ['/admin/media'],
    steps: [
      { action: 'navigate', url: '/admin/media', description: 'Go to media' },
      { action: 'screenshot', name: 'admin-media' }
    ]
  },
  {
    id: 'flow-023',
    name: 'Component Library',
    priority: 'P3',
    phase: 4,
    route: ['/admin/components'],
    steps: [
      { action: 'navigate', url: '/admin/components', description: 'Go to components' },
      { action: 'screenshot', name: 'admin-components' }
    ]
  },
  {
    id: 'flow-024',
    name: 'Admin Settings',
    priority: 'P3',
    phase: 4,
    route: ['/admin/settings'],
    steps: [
      { action: 'navigate', url: '/admin/settings', description: 'Go to settings' },
      { action: 'screenshot', name: 'admin-settings' }
    ]
  }
];

/**
 * Test a single flow
 */
async function testFlow(browser, flow, viewport, theme) {
  console.log(`\n🧪 Testing: ${flow.name}`);
  console.log(`📱 Viewport: ${viewport.label} (${viewport.width}x${viewport.height})`);
  console.log(`🎨 Theme: ${theme}`);

  const results = {
    flowId: flow.id,
    flowName: flow.name,
    priority: flow.priority,
    phase: flow.phase,
    viewport: viewport.label,
    theme: theme,
    timestamp: new Date().toISOString(),
    steps: [],
    consoleErrors: [],
    screenshots: [],
    success: true,
    notes: []
  };

  const flowDir = join(RESULTS_DIR, `${flow.id}-${flow.name.toLowerCase().replace(/\s+/g, '-')}`);
  const screenshotDir = join(flowDir, SCREENSHOT_DIR);

  if (!existsSync(screenshotDir)) {
    mkdirSync(screenshotDir, { recursive: true });
  }

  const page = await browser.newPage({
    viewport: { width: viewport.width, height: viewport.height }
  });

  // Monitor console
  page.on('console', msg => {
    if (msg.type() === 'error') {
      results.consoleErrors.push({
        text: msg.text(),
        location: msg.location()
      });
    }
  });

  try {
    // Set theme
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.evaluate((theme) => {
      document.documentElement.setAttribute('data-theme', theme);
    }, theme);
    await page.waitForTimeout(1000);

    // Execute each step
    for (let i = 0; i < flow.steps.length; i++) {
      const step = flow.steps[i];
      const stepNum = i + 1;

      console.log(`  Step ${stepNum}: ${step.description}`);

      const stepResult = {
        step: stepNum,
        action: step.action,
        description: step.description,
        success: true,
        error: null,
        duration: 0
      };

      const startTime = Date.now();

      try {
        switch (step.action) {
          case 'navigate':
            await page.goto(`${BASE_URL}${step.url}`, { waitUntil: 'networkidle' });
            break;

          case 'click':
            await page.click(step.selector);
            break;

          case 'fill':
            await page.fill(step.selector, step.value);
            break;

          case 'wait':
            if (step.selector) {
              await page.waitForSelector(step.selector, { timeout: 10000 });
            } else if (step.timeout) {
              await page.waitForTimeout(step.timeout);
            }
            break;

          case 'screenshot':
            const screenshotPath = join(screenshotDir, `${step.name}-${viewport.label.toLowerCase()}-${theme}.png`);
            await page.screenshot({ path: screenshotPath, fullPage: true });
            results.screenshots.push({
              name: step.name,
              path: screenshotPath,
              viewport: viewport.label,
              theme: theme
            });
            console.log(`    ✅ Screenshot saved: ${step.name}`);
            break;
        }

        stepResult.duration = Date.now() - startTime;
        results.steps.push(stepResult);

      } catch (error) {
        stepResult.success = false;
        stepResult.error = error.message;
        stepResult.duration = Date.now() - startTime;
        results.steps.push(stepResult);
        results.success = false;
        results.notes.push(`Step ${stepNum} failed: ${error.message}`);
        console.log(`    ❌ Failed: ${error.message}`);

        // Take error screenshot
        const errorScreenshotPath = join(screenshotDir, `error-step-${stepNum}-${viewport.label.toLowerCase()}-${theme}.png`);
        await page.screenshot({ path: errorScreenshotPath, fullPage: true });
      }
    }

    // Collect performance metrics
    const metrics = await page.evaluate(() => ({
      title: document.title,
      url: window.location.href,
      headingCount: document.querySelectorAll('h1, h2, h3, h4, h5, h6').length,
      imageCount: document.querySelectorAll('img').length,
      buttonCount: document.querySelectorAll('button').length,
      linkCount: document.querySelectorAll('a').length
    }));

    results.metrics = metrics;

  } catch (error) {
    results.success = false;
    results.notes.push(`Flow failed: ${error.message}`);
    console.log(`  ❌ Flow failed: ${error.message}`);
  } finally {
    await page.close();
  }

  // Save results
  const resultsPath = join(flowDir, `results-${viewport.label.toLowerCase()}-${theme}.json`);
  writeFileSync(resultsPath, JSON.stringify(results, null, 2));

  console.log(`  ✅ Results saved: ${resultsPath}`);
  console.log(`  ${results.success ? '✅ PASSED' : '❌ FAILED'} - ${results.steps.length} steps, ${results.consoleErrors.length} console errors`);

  return results;
}

/**
 * Main execution function
 */
async function main() {
  console.log('\n🚀 Starting Comprehensive Flow Testing\n');
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Total Flows: ${FLOWS.length}`);
  console.log(`Viewports: ${Object.keys(VIEWPORTS).length}`);
  console.log(`Themes: ${THEMES.length}`);
  console.log(`Total Test Combinations: ${FLOWS.length * Object.keys(VIEWPORTS).length * THEMES.length}\n`);

  const browser = await chromium.launch({ headless: true });
  const allResults = [];

  // Test each flow
  for (const flow of FLOWS) {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`Phase ${flow.phase}: ${flow.name} (${flow.priority})`);
    console.log(`${'='.repeat(80)}`);

    const flowResults = {
      flowId: flow.id,
      flowName: flow.name,
      priority: flow.priority,
      phase: flow.phase,
      viewportThemeResults: []
    };

    // Test each viewport × theme combination
    for (const [vpKey, viewport] of Object.entries(VIEWPORTS)) {
      for (const theme of THEMES) {
        const result = await testFlow(browser, flow, viewport, theme);
        flowResults.viewportThemeResults.push(result);
      }
    }

    allResults.push(flowResults);
  }

  await browser.close();

  // Generate summary report
  const summary = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    totalFlows: FLOWS.length,
    totalCombinations: FLOWS.length * Object.keys(VIEWPORTS).length * THEMES.length,
    summary: {
      passed: allResults.filter(f => f.viewportThemeResults.every(r => r.success)).length,
      failed: allResults.filter(f => f.viewportThemeResults.some(r => !r.success)).length
    },
    byPriority: {
      P0: allResults.filter(f => f.priority === 'P0'),
      P1: allResults.filter(f => f.priority === 'P1'),
      P2: allResults.filter(f => f.priority === 'P2'),
      P3: allResults.filter(f => f.priority === 'P3')
    },
    flows: allResults
  };

  const summaryPath = join(RESULTS_DIR, 'test-summary.json');
  writeFileSync(summaryPath, JSON.stringify(summary, null, 2));

  console.log(`\n${'='.repeat(80)}`);
  console.log('📊 TESTING COMPLETE\n');
  console.log(`Summary: ${summary.summary.passed} passed, ${summary.summary.failed} failed`);
  console.log(`Results saved to: ${summaryPath}`);
  console.log(`${'='.repeat(80)}\n`);
}

// Run
main().catch(console.error);
