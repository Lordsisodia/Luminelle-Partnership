# Smart Testing Framework - Complete Guide

AI-powered testing framework with visual analysis, smart feedback, and intelligent test automation.

## 🎯 Overview

This testing framework combines:
- **Browser Automation** - Chrome DevTools & Playwright MCPs
- **Visual Testing** - Screenshot capture with AI analysis
- **Flow Testing** - Multi-step user journey validation
- **Smart Feedback** - AI-powered test analysis and recommendations
- **Trend Tracking** - Compare results over time

## 📁 File Structure

```
lumelle/
├── .claude/skills/
│   ├── test-app.skill.mjs              # Main testing skill
│   └── smart-test-feedback.skill.mjs   # Feedback analysis skill
├── docs/skills/mcp-skills/
│   ├── 5-chrome-devtools-skills-ENHANCED.md
│   └── 6-playwright-skills-ENHANCED.md
├── scripts/
│   ├── test-visual-smart.mjs           # Visual testing with AI
│   ├── test-user-flows.mjs             # User flow testing
│   ├── demo-chrome-devtools.mjs        # Chrome DevTools demo
│   └── test-with-playwright.mjs        # Playwright test runner
└── test-results/                       # Test results directory
    ├── visual-smart/
    ├── flows/
    └── screenshots/
```

## 🚀 Quick Start

### 1. Prerequisites

```bash
# Install dependencies
npm install --save-dev playwright

# Install browser binaries
npx playwright install chromium

# Make scripts executable
chmod +x scripts/*.mjs
```

### 2. Run Your First Test

```bash
# Visual testing
node scripts/test-visual-smart.mjs http://localhost:5173

# User flow testing
node scripts/test-user-flows.mjs checkout

# Basic Playwright test
node scripts/test-with-playwright.mjs http://localhost:5173
```

## 🎨 Visual Testing

### Test All Viewports & Themes

```bash
node scripts/test-visual-smart.mjs http://localhost:5173
```

**What it does:**
- Tests desktop, tablet, and mobile viewports
- Tests both light and dark themes
- Captures screenshots for each combination
- Generates AI analysis prompts
- Monitors console for errors

**Results:**
```
test-results/visual-smart/
├── desktop-light.png
├── desktop-dark.png
├── tablet-light.png
├── tablet-dark.png
├── mobile-light.png
├── mobile-dark.png
├── report.json
└── analysis-prompts.md
```

**AI Analysis:**
After running tests, use the generated prompts with vision model to analyze screenshots for:
- Visual alignment issues
- Typography problems
- Color contrast (WCAG AA)
- Layout issues
- Accessibility concerns
- Responsive design bugs

### Custom Visual Test

Edit the configuration in `test-visual-smart.mjs`:

```javascript
const config = {
  url: 'http://localhost:5173/products',
  resultsDir: './test-results/custom',
  screenshots: {
    viewport: { width: 1920, height: 1080 },
    fullPage: true,
    types: ['desktop', 'mobile'] // Only test these
  },
  themes: ['light'], // Only test light theme
  analyze: true
};
```

## 🔄 User Flow Testing

### Available Flows

```bash
# Test checkout flow
node scripts/test-user-flows.mjs checkout

# Test user registration
node scripts/test-user-flows.mjs user-registration

# Test product search
node scripts/test-user-flows.mjs product-search
```

### Create Custom Flow

Add your flow to `test-user-flows.mjs`:

```javascript
const flows = {
  'my-flow': {
    name: 'My Custom Flow',
    baseUrl: 'http://localhost:5173',
    steps: [
      {
        name: 'Navigate to page',
        action: 'navigate',
        path: '/my-page',
        waitFor: 'networkidle',
        screenshot: true
      },
      {
        name: 'Click button',
        action: 'click',
        selector: '.my-button',
        waitFor: { selector: '.result', timeout: 3000 },
        screenshot: true
      },
      {
        name: 'Verify result',
        action: 'assert',
        check: 'visible',
        selector: '.result',
        expect: true
      }
    ]
  }
};
```

**Flow Actions:**
- `navigate` - Go to URL
- `click` - Click element
- `fill` - Fill input field
- `select` - Select dropdown option
- `check` - Check checkbox
- `press` - Press keyboard key
- `assert` - Run assertion (visible, text, url)

**Flow Results:**
```
test-results/flows/my-flow/
├── step-1-navigate-to-page.png
├── step-2-click-button.png
├── step-3-verify-result.png
├── report.json
└── analysis-prompt.md
```

## 🧪 Component Testing

### Test a Component

Using Claude Code with Chrome DevTools MCP:

```
1. Navigate to http://localhost:5173
2. Take snapshot to find component
3. Highlight component with border
4. Screenshot component
5. Extract HTML and CSS
6. Check accessibility
7. Analyze with vision model
```

**Example commands:**
```javascript
mcp__chrome-devtools__navigate_page(url="http://localhost:5173")
mcp__chrome-devtools__take_snapshot()
// Find component uid in snapshot
mcp__chrome-devtools__evaluate(code=`
  document.querySelector('.product-card').style.border = '3px solid red';
`)
mcp__chrome-devtools__take_screenshot(filePath="component.png")
```

## 🤖 Smart Feedback & Analysis

### Analyze Test Results

Use the smart feedback skill to analyze test results:

```javascript
import smartTestFeedback from './.claude/skills/smart-test-feedback.skill.mjs';

// Load test results
const results = JSON.parse(readFileSync('test-results/report.json'));

// Generate smart feedback
const feedback = await smartTestFeedback({
  testResults: results,
  analyze: ['issues', 'patterns', 'performance', 'trends'],
  priority: 'P2' // Report P2 and above
});

console.log(feedback);
```

**Feedback includes:**
- **Issue Analysis** - Categorized by severity (P0-P3)
- **Pattern Detection** - Common failure patterns
- **Performance Issues** - Slow tests and bottlenecks
- **Trend Analysis** - Improvements and regressions
- **Action Plan** - Prioritized fixes with effort estimates
- **Recommendations** - Specific code fixes

### Analyze Screenshots with AI

After capturing screenshots:

```
Read the screenshot file and use vision model:

Analyze this UI screenshot for:

1. **Visual Issues**
   - Alignment problems
   - Spacing inconsistencies
   - Typography issues
   - Color contrast

2. **Layout Issues**
   - Overflow problems
   - Hidden content
   - Responsive design issues

3. **Accessibility**
   - Low contrast areas
   - Missing labels
   - Touch target sizes

4. **Overall Quality**
   - Visual polish score (1-10)
   - Professional appearance
   - Brand consistency

For each issue, provide:
- Severity level (critical/warning/info)
- Exact location (x, y coordinates or CSS selector)
- Suggested fix with code
- Priority (P0/P1/P2)
```

## 📊 Test Result Management

### Result Structure

```json
{
  "url": "http://localhost:5173",
  "timestamp": "2024-01-15T10:30:00Z",
  "summary": {
    "totalTests": 50,
    "passed": 42,
    "failed": 8,
    "duration": 45000
  },
  "screenshots": [
    {
      "name": "desktop-light",
      "path": "/path/to/screenshot.png",
      "viewport": "Desktop",
      "theme": "light",
      "status": "clean"
    }
  ],
  "failures": [
    {
      "test": "checkout-flow",
      "error": "Timeout waiting for .confirmation",
      "stack": "...",
      "screenshot": "/path/to/error.png"
    }
  ],
  "consoleErrors": [
    {
      "type": "error",
      "text": "Failed to fetch /api/products",
      "url": "/products"
    }
  ],
  "visualIssues": [
    {
      "page": "homepage",
      "issues": [
        "Low contrast on CTA button",
        "Misaligned navigation"
      ]
    }
  ]
}
```

### Baseline Management

Create visual baselines for regression testing:

```bash
# Initial baseline
node scripts/test-visual-smart.mjs http://localhost:5173
mv test-results/visual-smart test-results/baseline/$(date +%Y-%m-%d)

# After changes
node scripts/test-visual-smart.mjs http://localhost:5173

# Compare with baseline using vision model:
"""
Compare these screenshots:
- Baseline: test-results/baseline/2024-01-15/desktop-light.png
- Current: test-results/visual-smart/desktop-light.png

Identify:
- Visual differences
- Layout shifts
- Color changes
- Missing/added elements

Report:
- Is this a regression?
- Severity of changes
- Recommended action
"""
```

## 🎯 Testing Strategies

### 1. Smoke Testing

Quick validation after deployment:

```bash
# Test critical pages
node scripts/test-visual-smart.mjs http://localhost:5173
node scripts/test-user-flows.mjs checkout
```

### 2. Regression Testing

Before releases:

```bash
# Run all visual tests
node scripts/test-visual-smart.mjs http://localhost:5173

# Run all flow tests
node scripts/test-user-flows.mjs checkout
node scripts/test-user-flows.mjs user-registration
node scripts/test-user-flows.mjs product-search

# Compare with baseline
# Use AI to detect regressions
```

### 3. Component Testing

During development:

```
1. Make component changes
2. Navigate to component page
3. Screenshot component in isolation
4. Analyze with AI for issues
5. Test all component states
6. Verify accessibility
```

### 4. Responsive Testing

Test all breakpoints:

```javascript
// Edit test-visual-smart.mjs
const viewports = {
  mobile: { width: 375, height: 667, label: 'Mobile' },
  'mobile-large': { width: 414, height: 896, label: 'Mobile Large' },
  tablet: { width: 768, height: 1024, label: 'Tablet' },
  'tablet-landscape': { width: 1024, height: 768, label: 'Tablet Landscape' },
  desktop: { width: 1920, height: 1080, label: 'Desktop' },
  'wide': { width: 2560, height: 1440, label: 'Wide Screen' }
};
```

### 5. Cross-Browser Testing

Test across browsers:

```javascript
// In Playwright script
const browsers = ['chromium', 'firefox', 'webkit'];

for (const browser of browsers) {
  const pw = await playwright[browser].launch();
  // Run tests
}
```

## 🔧 Configuration

### Environment Variables

```bash
# .env
BASE_URL=http://localhost:5173
TEST_RESULTS_DIR=./test-results
SCREENSHOTS_DIR=./test-results/screenshots
HEADLESS=true
ANALYZE_SCREENSHOTS=true
```

### Test Configuration

```javascript
// config/test.js
export default {
  baseUrl: process.env.BASE_URL || 'http://localhost:5173',
  timeouts: {
    default: 5000,
    navigation: 30000,
    assertion: 5000
  },
  viewports: {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1920, height: 1080 }
  },
  themes: ['light', 'dark'],
  browsers: ['chromium', 'firefox', 'webkit']
};
```

## 📈 CI/CD Integration

### GitHub Actions

```yaml
# .github/workflows/test.yml
name: Smart Tests

on:
  push:
    branches: [main, dev]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium

      - name: Start development server
        run: npm run dev &
        wait-on http://localhost:5173

      - name: Run visual tests
        run: node scripts/test-visual-smart.mjs http://localhost:5173

      - name: Run flow tests
        run: |
          node scripts/test-user-flows.mjs checkout
          node scripts/test-user-flows.mjs user-registration

      - name: Upload results
        uses: actions/upload-artifact@v3
        with:
          name: test-results
          path: test-results/

      - name: Generate report
        run: |
          echo "## Test Results" >> $GITHUB_STEP_SUMMARY
          echo "✅ Visual tests completed" >> $GITHUB_STEP_SUMMARY
          echo "✅ Flow tests completed" >> $GITHUB_STEP_SUMMARY
```

## 💡 Best Practices

### ✅ DO

- **Test early and often** - Run tests after every significant change
- **Use explicit waits** - Wait for specific conditions, not fixed timeouts
- **Maintain baselines** - Keep visual baselines for regression testing
- **Analyze with AI** - Use vision models to detect issues
- **Test all themes** - Verify both light and dark modes
- **Check accessibility** - Include WCAG compliance checks
- **Monitor console** - Always check for JavaScript errors
- **Document flaky tests** - Track and fix unreliable tests

### ❌ DON'T

- **Don't use brittle selectors** - Prefer data-testid over nth-child
- **Don't ignore console errors** - Even small errors can indicate problems
- **Don't skip edge cases** - Test error states and boundary conditions
- **Don't hardcode waits** - Use explicit wait conditions
- **Don't test only in one browser** - Test on multiple browsers
- **Don't forget mobile** - Always test responsive design
- **Don't rely on manual testing** - Automate repetitive tests

## 🐛 Troubleshooting

### Test fails with "Element not found"

**Cause:** Selector is incorrect or element not loaded

**Fix:**
1. Take a snapshot to verify selector
2. Add explicit wait for element
3. Check if element is in iframe
4. Use browser DevTools to test selector

### Screenshot is blurry

**Cause:** Fonts or images not fully loaded

**Fix:**
1. Add wait for networkidle
2. Wait for specific elements to be visible
3. Increase wait time before screenshot
4. Check device pixel ratio settings

### Console has errors

**Cause:** JavaScript errors in application

**Fix:**
1. Get detailed error information
2. Check stack trace for file and line
3. Review error context in source code
4. Fix underlying issue, not just test

### AI analysis not helpful

**Cause:** Prompt not specific enough

**Fix:**
1. Provide more context in prompt
2. Ask for specific checks
3. Request severity levels
4. Demand code-level fixes
5. Include CSS selector for precise location

## 📚 Additional Resources

### Documentation
- [Chrome DevTools Enhanced Guide](./docs/skills/mcp-skills/5-chrome-devtools-skills-ENHANCED.md)
- [Playwright Enhanced Guide](./docs/skills/mcp-skills/6-playwright-skills-ENHANCED.md)

### Skills
- [Test App Skill](./.claude/skills/test-app.skill.mjs)
- [Smart Feedback Skill](./.claude/skills/smart-test-feedback.skill.mjs)

### Scripts
- [Visual Testing Script](./scripts/test-visual-smart.mjs)
- [Flow Testing Script](./scripts/test-user-flows.mjs)
- [Playwright Test Runner](./scripts/test-with-playwright.mjs)

---

## 🎓 Getting Started Checklist

- [ ] Install dependencies (`npm install`)
- [ ] Install browser binaries (`npx playwright install`)
- [ ] Run first visual test
- [ ] Run first flow test
- [ ] Review test results
- [ ] Analyze screenshots with AI
- [ ] Create visual baselines
- [ ] Set up CI/CD integration
- [ ] Document custom flows
- [ ] Schedule regular tests

---

**Need help?** Ask Claude: "Help me test [X] with smart visual testing"
