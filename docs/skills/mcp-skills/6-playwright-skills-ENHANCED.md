# Playwright MCP - Enhanced Testing Guide

Complete guide to intelligent E2E testing with Playwright MCP, including AI-powered analysis and smart feedback loops.

## Quick Start Setup

First, ensure Playwright MCP is installed and configured:

```bash
# Install Playwright MCP
npm install -g @modelcontextprotocol/server-playwright

# Install browser binaries
npx playwright install chromium firefox webkit

# Add to your Claude settings.json
# "mcpServers": {
#   "playwright": {
#     "command": "npx",
#     "args": ["@modelcontextprotocol/server-playwright"]
#   }
# }
```

---

## Smart Testing Workflows

### 1. Automated Visual Testing Suite

Run comprehensive visual tests with AI analysis:

```javascript
// Test suite configuration
const testSuite = {
  name: 'E-commerce Visual Tests',
  baseUrl: 'http://localhost:5173',
  viewports: [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1920, height: 1080 }
  ],
  pages: [
    { path: '/', name: 'homepage' },
    { path: '/products', name: 'products' },
    { path: '/cart', name: 'cart' },
    { path: '/checkout', name: 'checkout' }
  ],
  themes: ['light', 'dark']
};

// Execute test suite
for (const viewport of testSuite.viewports) {
  for (const page of testSuite.pages) {
    for (const theme of testSuite.themes) {
      const testName = `${page.name}-${viewport.name}-${theme}`;

      // 1. Launch browser with viewport
      mcp__playwright__launch(
        browser="chromium",
        headless=true,
        viewport={ width: viewport.width, height: viewport.height }
      );

      // 2. Navigate to page
      mcp__playwright__navigate(
        url=`${testSuite.baseUrl}${page.path}`,
        wait_until="networkidle"
      );

      // 3. Set theme
      mcp__playwright__evaluate(
        code=`document.documentElement.setAttribute('data-theme', '${theme}')`
      );

      // 4. Wait for stability
      mcp__playwright__wait_for_timeout(timeout=2000);

      // 5. Take screenshot
      mcp__playwright__screenshot(
        full_page=true,
        path=`test-results/visual/${testName}.png`
      );

      // 6. Check for console errors
      const browser = await mcp__playwright__evaluate(
        code=`window.location.href`
      );

      // 7. Analyze with AI vision
      /*
      Read screenshot at: test-results/visual/${testName}.png

      Analyze for:
      1. Visual quality issues
      2. Theme consistency
      3. Responsive design problems
      4. Accessibility concerns
      5. Brand alignment

      Generate report with severity levels and specific fixes.
      */

      // 8. Close browser
      mcp__playwright__close();

      console.log(`✅ Completed: ${testName}`);
    }
  }
}
```

---

### 2. Component Isolation Testing

Test individual components with Playwright:

```javascript
// Component test framework
async function testComponent(config) {
  const {
    pageUrl,
    selector,
    componentName,
    tests = []
  } = config;

  console.log(`\n🧩 Testing component: ${componentName}\n`);

  // 1. Navigate to page
  mcp__playwright__launch(browser="chromium", headless=true);
  mcp__playwright__navigate(url=pageUrl);
  mcp__playwright__wait_for_selector(selector=selector, timeout=5000);

  // 2. Isolate component visually
  mcp__playwright__evaluate(code=`
    const component = document.querySelector('${selector}');
    // Highlight component
    component.style.border = '3px solid red';
    component.style.boxShadow = '0 0 20px rgba(255,0,0,0.5)';
    // Dim background
    document.body.style.filter = 'brightness(0.3)';
  `);

  // 3. Screenshot component
  mcp__playwright__screenshot(
    selector=selector,
    path=`test-results/components/${componentName}-isolated.png`
  );

  // 4. Run component tests
  const results = [];

  for (const test of tests) {
    const result = await runComponentTest(test, selector);
    results.push(result);
  }

  // 5. Restore page
  mcp__playwright__evaluate(code=`
    document.body.style.filter = '';
    const component = document.querySelector('${selector}');
    component.style.border = '';
    component.style.boxShadow = '';
  `);

  // 6. Generate component report
  generateComponentReport(componentName, results);

  mcp__playwright__close();
}

// Example usage
testComponent({
  pageUrl: 'http://localhost:5173/products',
  selector: '.product-card',
  componentName: 'product-card',
  tests: [
    {
      name: 'visibility',
      check: async () => {
        const visible = mcp__playwright__is_visible(selector='.product-card');
        return { passed: visible, message: 'Component is visible' };
      }
    },
    {
      name: 'accessibility',
      check: async () => {
        const hasHeading = mcp__playwright__evaluate(
          code=`document.querySelector('.product-card').querySelector('h2, h3') !== null`
        );
        const hasAltText = mcp__playwright__evaluate(
          code=`document.querySelector('.product-card img')?.getAttribute('alt')`
        );
        return {
          passed: hasHeading && hasAltText,
          message: hasHeading && hasAltText ? 'Accessible' : 'Missing accessibility attributes'
        };
      }
    },
    {
      name: 'interactive',
      check: async () => {
        mcp__playwright__hover(selector='.product-card');
        mcp__playwright__wait_for_timeout(timeout=500);
        const hasHoverState = mcp__playwright__evaluate(
          code=`window.getComputedStyle(document.querySelector('.product-card')).getPropertyValue('transform') !== 'none'`
        );
        return { passed: hasHoverState, message: 'Hover state works' };
      }
    }
  ]
});
```

---

### 3. Multi-Step User Flow Testing

Test complete user journeys with validation:

```javascript
// Flow test framework
async function testFlow(flowConfig) {
  const {
    name,
    baseUrl,
    steps,
    screenshotEachStep = true
  } = flowConfig;

  console.log(`\n🔄 Testing flow: ${name}\n`);

  // Track results
  const flowResults = {
    name,
    startTime: new Date(),
    steps: [],
    status: 'running'
  };

  // Launch browser
  mcp__playwright__launch(browser="chromium", headless=true);

  try {
    // Execute each step
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      const stepNum = i + 1;

      console.log(`\n📍 Step ${stepNum}: ${step.description || step.action}`);

      const stepResult = {
        step: stepNum,
        action: step.action,
        startTime: new Date(),
        status: 'running'
      };

      try {
        // Execute action
        switch (step.action) {
          case 'navigate':
            mcp__playwright__navigate(url=`${baseUrl}${step.path}`);
            break;

          case 'click':
            mcp__playwright__click(selector=step.selector);
            break;

          case 'fill':
            mcp__playwright__fill(selector=step.selector, value=step.value);
            break;

          case 'select':
            mcp__playwright__select(selector=step.selector, value=step.value);
            break;

          case 'wait':
            if (step.selector) {
              mcp__playwright__wait_for_selector(
                selector=step.selector,
                timeout=step.timeout || 5000
              );
            } else {
              mcp__playwright__wait_for_timeout(timeout=step.timeout || 1000);
            }
            break;

          case 'assert':
            await runAssertion(step);
            break;

          case 'upload':
            mcp__playwright__upload_file(
              selector=step.selector,
              file_path=step.filePath
            );
            break;
        }

        // Screenshot if requested
        if (screenshotEachStep) {
          const screenshotPath = `test-results/flows/${name}-step-${stepNum}.png`;
          mcp__playwright__screenshot(full_page=true, path=screenshotPath);

          // Analyze with AI
          /*
          Read screenshot at: ${screenshotPath}

          Verify:
          1. Page rendered correctly
          2. No visual errors
          3. Expected elements visible
          4. No layout issues
          5. Good visual hierarchy

          Report any issues found.
          */
        }

        // Validate expected result
        if (step.expect) {
          const validation = await validateExpectation(step.expect);
          if (!validation.passed) {
            throw new Error(validation.message);
          }
        }

        stepResult.status = 'passed';
        stepResult.endTime = new Date();
        stepResult.duration = stepResult.endTime - stepResult.startTime;

        console.log(`   ✅ Passed`);

      } catch (error) {
        stepResult.status = 'failed';
        stepResult.error = error.message;
        stepResult.endTime = new Date();

        // Screenshot error state
        mcp__playwright__screenshot(
          full_page=true,
          path=`test-results/flows/${name}-step-${stepNum}-error.png`
        );

        console.error(`   ❌ Failed: ${error.message}`);

        flowResults.status = 'failed';
        flowResults.failedAt = stepNum;
        break;
      }

      flowResults.steps.push(stepResult);
    }

    flowResults.endTime = new Date();
    flowResults.duration = flowResults.endTime - flowResults.startTime;
    flowResults.status = flowResults.status === 'failed' ? 'failed' : 'passed';

  } finally {
    mcp__playwright__close();
  }

  // Generate flow report
  generateFlowReport(flowResults);

  return flowResults;
}

// Example: E-commerce checkout flow
testFlow({
  name: 'guest-checkout',
  baseUrl: 'http://localhost:5173',
  steps: [
    {
      action: 'navigate',
      path: '/products',
      description: 'Navigate to products page'
    },
    {
      action: 'click',
      selector: '.product-card:first-child .add-to-cart',
      description: 'Add first product to cart'
    },
    {
      action: 'wait',
      selector: '.cart-badge',
      description: 'Wait for cart to update',
      timeout: 3000
    },
    {
      action: 'click',
      selector: '.cart-icon',
      description: 'Open cart'
    },
    {
      action: 'assert',
      selector: '.cart-item',
      expect: 'visible',
      description: 'Verify item in cart'
    },
    {
      action: 'click',
      selector: '.checkout-button',
      description: 'Proceed to checkout'
    },
    {
      action: 'wait',
      selector: 'form[name="checkout"]',
      description: 'Wait for checkout form'
    },
    {
      action: 'fill',
      selector: 'input[name="email"]',
      value: 'test@example.com',
      description: 'Enter email'
    },
    {
      action: 'fill',
      selector: 'input[name="shipping.name"]',
      value: 'Test User',
      description: 'Enter name'
    },
    {
      action: 'fill',
      selector: 'input[name="shipping.address"]',
      value: '123 Test St',
      description: 'Enter address'
    },
    {
      action: 'fill',
      selector: 'input[name="shipping.city"]',
      value: 'Test City',
      description: 'Enter city'
    },
    {
      action: 'select',
      selector: 'select[name="shipping.country"]',
      value: 'US',
      description: 'Select country'
    },
    {
      action: 'click',
      selector: 'button[type="submit"]',
      description: 'Submit order'
    },
    {
      action: 'wait',
      selector: '.order-confirmation',
      description: 'Wait for confirmation',
      timeout: 5000
    },
    {
      action: 'assert',
      text: 'Thank you for your order',
      expect: 'visible',
      description: 'Verify confirmation message'
    },
    {
      action: 'screenshot',
      description: 'Capture final state'
    }
  ]
});
```

---

### 4. Visual Regression Testing

Automated visual comparison:

```javascript
// Visual regression test suite
async function visualRegressionTest(config) {
  const {
    name,
    pages,
    baselineDir = 'test-results/baseline',
    currentDir = 'test-results/current',
    diffDir = 'test-results/diff'
  } = config;

  const results = [];

  for (const page of pages) {
    console.log(`\n📸 Testing: ${page.name}\n`);

    // 1. Take current screenshot
    mcp__playwright__launch(browser="chromium", headless=true);
    mcp__playwright__navigate(url=page.url);
    mcp__playwright__wait_for_timeout(timeout=2000);

    const currentPath = `${currentDir}/${page.name}.png`;
    mcp__playwright__screenshot(full_page=true, path=currentPath);

    mcp__playwright__close();

    // 2. Check if baseline exists
    const baselinePath = `${baselineDir}/${page.name}.png`;

    // 3. Compare with baseline
    /*
    Compare these two images:
    - Baseline: ${baselinePath}
    - Current: ${currentPath}

    Identify:
    1. Any pixel differences
    2. Layout shifts
    3. Color changes
    4. Missing/added elements
    5. Text changes

    For each difference:
    - Location (x, y coordinates)
    - Severity (critical/minor)
    - Type of change
    - Is this a regression?

    Overall assessment:
    - Does this require fixing?
    - Or should baseline be updated?
    */

    results.push({
      page: page.name,
      hasChanges: false, // From comparison
      severity: null, // From comparison
      recommendation: null // From comparison
    });
  }

  // Generate regression report
  generateRegressionReport(name, results);
}
```

---

### 5. Smart Feedback & Analysis

AI-powered test analysis:

```javascript
// After running tests, analyze results
async function analyzeTestResults(testResults) {
  const analysisPrompt = `
Analyze these test results and provide comprehensive feedback:

**Test Summary:**
- Total tests: ${testResults.total}
- Passed: ${testResults.passed}
- Failed: ${testResults.failed}
- Flaky: ${testResults.flaky || 0}

**Failed Tests:**
${JSON.stringify(testResults.failures, null, 2)}

**Performance:**
- Average load time: ${testResults.avgLoadTime}ms
- Slowest test: ${testResults.slowestTest}
- Total duration: ${testResults.duration}ms

**Console Errors:**
${JSON.stringify(testResults.consoleErrors, null, 2)}

**Visual Issues:**
${JSON.stringify(testResults.visualIssues, null, 2)}

Please provide:

1. **Issue Analysis**
   - Categorize failures (flaky/real/broken)
   - Identify root causes
   - Find common patterns

2. **Prioritized Fixes**
   For each critical issue:
   - Specific fix with code
   - File and line number
   - Estimated effort
   - Test to add

3. **Performance Recommendations**
   - Bottlenecks to address
   - Optimization opportunities
   - Best practices

4. **Test Improvements**
   - Missing test coverage
   - Flaky test fixes
   - New test scenarios

5. **Action Plan**
   Ordered by priority:
   - P0: Fix immediately
   - P1: Fix this sprint
   - P2: Fix next sprint
   - P3: Backlog

6. **Trend Analysis**
   - Improvements made
   - New issues introduced
   - Regression detection
`;

  // Use this prompt with AI to get detailed analysis
  return analysisPrompt;
}

// Example: Generate smart feedback
const testResults = {
  total: 50,
  passed: 42,
  failed: 8,
  flaky: 2,
  failures: [
    {
      test: 'checkout-flow',
      error: 'Timeout waiting for .order-confirmation',
      stack: '...'
    },
    {
      test: 'product-card',
      error: 'Element .product-card not found',
      stack: '...'
    }
  ],
  consoleErrors: [
    { message: 'Failed to fetch /api/products', url: '/products' }
  ],
  visualIssues: [
    {
      image: 'homepage.png',
      issues: ['Low contrast on CTA button', 'Misaligned navigation']
    }
  ],
  avgLoadTime: 2400,
  slowestTest: 'checkout-flow (8.5s)',
  duration: 45000
};

const feedback = await analyzeTestResults(testResults);
console.log(feedback);
```

---

### 6. Cross-Browser Testing Matrix

Test across all browsers:

```javascript
const browsers = ['chromium', 'firefox', 'webkit'];
const testPages = [
  { path: '/', name: 'homepage' },
  { path: '/products', name: 'products' },
  { path: '/cart', name: 'cart' }
];

for (const browser of browsers) {
  console.log(`\n🌐 Testing in: ${browser}\n`);

  for (const page of testPages) {
    mcp__playwright__launch(browser=browser, headless=true);
    mcp__playwright__navigate(url=`http://localhost:5173${page.path}`);
    mcp__playwright__wait_for_timeout(timeout=2000);

    // Take screenshot
    mcp__playwright__screenshot(
      full_page=true,
      path=`test-results/cross-browser/${browser}-${page.name}.png`
    );

    // Run browser-specific checks
    const browserChecks = mcp__playwright__evaluate(code=`
      ({
        userAgent: navigator.userAgent,
        viewport: { width: window.innerWidth, height: window.innerHeight },
        features: {
          es6: typeof Symbol !== 'undefined',
          webgl: !!document.createElement('canvas').getContext('webgl'),
          touch: 'ontouchstart' in window
        }
      })
    `);

    // Check for console errors
    mcp__playwright__evaluate(code=`
      window.playwrightErrors = [];
      console.error = function(...args) {
        window.playwrightErrors.push(args.join(' '));
      };
    `);

    mcp__playwright__close();
  }

  // Compare results across browsers
  /*
  Read all screenshots for: ${testPages.map(p => p.name).join(', ')}

  Compare across browsers:
  1. Visual consistency
  2. Layout differences
  3. Browser-specific issues
  4. Feature compatibility

  Report:
  - Inconsistencies found
  - Browser-specific bugs
  - Compatibility fixes needed
  */
}
```

---

## Test Result Dashboard

Generate comprehensive test reports:

```javascript
async function generateTestReport(results) {
  const report = `
# Test Execution Report
**Generated:** ${new Date().toISOString()}

## Summary
- **Total Tests:** ${results.total}
- **Passed:** ${results.passed} ✅
- **Failed:** ${results.failed} ❌
- **Skipped:** ${results.skipped || 0} ⏭️
- **Duration:** ${results.duration}ms

## Failed Tests
${results.failures.map(f => `
### ${f.test}
- **Error:** ${f.error}
- **Stack:** \`${f.stack}\`
- **Screenshot:** ${f.screenshot}
`).join('\n')}

## Performance Issues
${results.performance.map(p => `
### ${p.test}
- **Load Time:** ${p.time}ms
- **Threshold:** ${p.threshold}ms
- **Status:** ${p.time > p.threshold ? '❌ Too slow' : '✅ OK'}
`).join('\n')}

## Visual Issues
${results.visual.map(v => `
### ${v.page}
- **Screenshot:** ${v.screenshot}
- **Issues:**
${v.issues.map(i => `  - ${i}`).join('\n')}
`).join('\n')}

## Recommendations
${generateRecommendations(results)}

## Action Items
1. ${results.p0?.map(i => `[P0] ${i}`).join('\n2. ') || 'No critical issues'}
2. ${results.p1?.map(i => `[P1] ${i}`).join('\n2. ') || 'No high priority issues'}
3. ${results.p2?.map(i => `[P2] ${i}`).join('\n2. ') || 'No medium priority issues'}
`;

  // Save report
  await fs.writeFile('test-results/report.md', report);
  console.log('\n📄 Report saved: test-results/report.md\n');

  return report;
}
```

---

## Best Practices

✅ **Always:**
- Use explicit waits over timeouts
- Test on multiple browsers/devices
- Capture screenshots on failures
- Analyze results with AI
- Maintain visual baselines
- Test both light/dark themes
- Check accessibility in each test

✅ **For Flaky Tests:**
- Increase timeouts if needed
- Use better selectors
- Wait for specific conditions
- Retry failed assertions
- Check for race conditions

✅ **For Performance:**
- Run tests in parallel
- Reuse browser contexts
- Use headless mode in CI
- Optimize test data
- Cache expensive operations

---

## Quick Commands Reference

```
# Browser Control
playwright_launch(browser="chromium", headless=true)
playwright_navigate(url="URL", wait_until="networkidle")
playwright_close()

# Interaction
playwright_click(selector=".button")
playwright_fill(selector="#email", value="test@example.com")
playwright_type(selector="#search", text="query", delay=100)
playwright_select(selector="#country", value="US")
playwright_check(selector="#terms")
playwright_hover(selector=".menu-item")

# Waiting
playwright_wait_for_selector(selector=".modal", timeout=5000)
playwright_wait_for_navigation()
playwright_wait_for_timeout(timeout=1000)
playwright_wait_for_response(url="/api/data")

# Information
playwright_get_text(selector="h1")
playwright_get_html(selector=".content")
playwright_get_attribute(selector="a", attribute="href")
playwright_get_element_count(selector=".item")
playwright_is_visible(selector=".modal")
playwright_is_enabled(selector="button")

# Screenshots
playwright_screenshot(full_page=true, path="screenshot.png")
playwright_pdf(path="doc.pdf")

# JavaScript
playwright_evaluate(code="document.title")
playwright_evaluate_async(code="await fetch('/api')")

# Context
playwright_set_viewport(width=1920, height=1080)
playwright_emulate_device(device="iPhone 12")
playwright_set_geolocation(latitude=40.7, longitude=-74.0)
playwright_set_offline(offline=true)
```

---

## Troubleshooting

**Test is flaky:**
- Use explicit waits
- Check for async operations
- Verify selectors are stable
- Increase timeouts slightly

**Element not found:**
- Wait for element
- Check if in iframe
- Verify selector is correct
- Use browser DevTools

**Screenshot blurry:**
- Wait for fonts to load
- Check image optimization
- Verify device pixel ratio
- Use full-page screenshots

**Performance slow:**
- Run tests in parallel
- Use headless mode
- Reuse browser context
- Optimize test data

**AI analysis not helpful:**
- Provide more context
- Ask specific questions
- Request code-level fixes
- Demand severity levels

---

## Integration with Other Tools

**Combine with Chrome DevTools MCP:**
- Use Playwright for automation
- Use Chrome DevTools for debugging
- Share test results between both

**Use with Vision Analysis:**
- Capture screenshots with Playwright
- Analyze with 4.5v MCP vision model
- Get detailed visual feedback

**Test Result Aggregation:**
- Combine results from multiple test runs
- Track trends over time
- Generate dashboards and reports

---

**Need help?** Just ask: "Use Playwright to test [X] and analyze the results"
