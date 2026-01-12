# Automated Testing with Chrome DevTools & Playwright

This directory contains automated testing tools that combine Chrome DevTools MCP for console monitoring and Playwright for UI testing.

## Overview

The testing setup provides three main approaches:

1. **Chrome DevTools MCP** - Real-time browser control and console monitoring
2. **Playwright Automation** - Comprehensive UI testing with console monitoring
3. **Combined Approach** - Best of both worlds

## Quick Start

### 1. Install Dependencies

```bash
npm run playwright:install
```

### 2. Start Your Dev Server

```bash
npm run dev
```

### 3. Run Tests

#### Option A: Quick Console Check (Playwright)

```bash
npm run test:playwright
```

This will:
- Navigate to `http://localhost:5173`
- Monitor all console messages
- Check for errors and warnings
- Take screenshots
- Generate a detailed report

#### Option B: Interactive Testing with Chrome DevTools MCP

```bash
npm run test:demo
```

This shows you how to use Chrome DevTools MCP tools directly in Claude Code.

## Available Scripts

### `npm run test:console`

Shows instructions for console monitoring with Chrome DevTools MCP.

**Best for:** Real-time console monitoring during interactive testing

### `npm run test:playwright [url]`

Runs automated Playwright tests with console monitoring.

**Best for:** Comprehensive automated testing, CI/CD pipelines

**Features:**
- Console error/warning detection
- Page error monitoring
- Failed request detection
- Screenshot capture
- Detailed JSON reports
- Basic accessibility checks

**Example:**
```bash
npm run test:playwright http://localhost:5173
```

### `npm run test:playwright:ci`

Same as above but with default URL.

**Best for:** CI/CD pipelines

### `npm run test:demo`

Displays comprehensive documentation for Chrome DevTools MCP testing.

**Best for:** Learning available tools and workflows

## Chrome DevTools MCP Tools

When using Chrome DevTools MCP in Claude Code, you have access to these tools:

### Navigation & Page Control

- `navigate_page(url)` - Navigate to a URL
- `go_back()` - Go back in history
- `go_forward()` - Go forward in history
- `reload_page()` - Reload the page

### Console Monitoring

- `list_console_messages(types=[], pageIdx=0)` - List console messages
  - Types: `log`, `debug`, `info`, `error`, `warning`
- `get_console_message(msgid)` - Get detailed message info

### Visual Testing

- `take_snapshot(verbose=false)` - Get accessibility tree snapshot
- `take_screenshot(fullPage=false, format="png")` - Capture screenshot
- `resize_page(width, height)` - Resize viewport

### Interaction

- `click(uid, doubleClick=false)` - Click element
- `fill(uid, value)` - Fill input field
- `fill_form(elements[])` - Fill multiple form fields
- `hover(uid)` - Hover over element
- `press_key(key)` - Press keyboard key

### Network Monitoring

- `list_network_requests(resourceTypes=[])` - List network requests
- `get_network_request(reqid)` - Get request details

### Advanced

- `wait_for(text, timeout)` - Wait for text to appear
- `evaluate_script(function)` - Execute JavaScript
- `emulate(cpuThrottlingRate, geolocation, networkConditions)` - Emulate conditions

## Common Testing Workflows

### 1. Console Error Detection

```javascript
// In Claude Code, run:
mcp__chrome-devtools__navigate_page(url="http://localhost:5173")
mcp__chrome-devtools__list_console_messages(types=["error", "warning"])
```

### 2. Form Testing

```javascript
mcp__chrome-devtools__navigate_page(url="http://localhost:5173/contact")
mcp__chrome-devtools__take_snapshot()
// Find UIDs from snapshot
mcp__chrome-devtools__fill_form(elements=[
  {uid: "email-input", value: "test@example.com"},
  {uid: "message-input", value: "Hello!"}
])
mcp__chrome-devtools__click(uid="submit-button")
mcp__chrome-devtools__list_console_messages(types=["error"])
```

### 3. Visual Regression Testing

```javascript
mcp__chrome-devtools__navigate_page(url="http://localhost:5173")
mcp__chrome-devtools__take_screenshot(fullPage=true, filePath="test-results/baseline.png")
```

### 4. Responsive Testing

```javascript
mcp__chrome-devtools__navigate_page(url="http://localhost:5173")
mcp__chrome-devtools__resize_page(width=375, height=667)  // Mobile
mcp__chrome-devtools__take_screenshot(filePath="test-results/mobile.png")
mcp__chrome-devtools__resize_page(width=1920, height=1080)  // Desktop
mcp__chrome-devtools__take_screenshot(filePath="test-results/desktop.png")
```

## Playwright Test Report

When you run `npm run test:playwright`, it generates:

1. **Console Output** - Real-time feedback
2. **Screenshots** - Visual documentation in `test-results/screenshots/`
3. **JSON Report** - Detailed data in `test-results/screenshots/test-report-{timestamp}.json`

### Report Structure

```json
{
  "url": "http://localhost:5173",
  "timestamp": "2025-01-09T...",
  "summary": {
    "totalMessages": 42,
    "errors": 0,
    "warnings": 2
  },
  "errors": [
    {
      "type": "error",
      "text": "Error message",
      "location": {...},
      "timestamp": "..."
    }
  ],
  "warnings": [...],
  "allMessages": [...]
}
```

## Best Practices

### 1. Test Early, Test Often

- Run console checks after each feature addition
- Use Playwright for comprehensive testing before commits
- Use Chrome DevTools MCP during development

### 2. Check Console After Interactions

Always check console messages after:
- Form submissions
- Page navigations
- API calls
- User interactions

### 3. Take Screenshots

Capture screenshots at:
- Initial page load
- After key interactions
- When errors occur
- Different viewport sizes

### 4. Use Snapshots for Understanding

Before interacting with a page:
1. Take a snapshot to see the structure
2. Find element UIDs
3. Plan your interactions
4. Execute tests

### 5. Monitor Network Requests

Check for:
- Failed API calls
- Slow requests
- Missing resources
- Unexpected 404s

## Integration with CI/CD

### GitHub Actions Example

```yaml
name: Test
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run playwright:install
      - run: npm run dev &
      - run: sleep 10  # Wait for server to start
      - run: npm run test:playwright:ci
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: test-results
          path: test-results/
```

## Advanced Usage

### Custom Test Scenarios

Create custom test scripts in the `scripts/` directory:

```javascript
import { chromium } from 'playwright';

async function testCustomScenario() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Your custom test logic here

  await browser.close();
}

testCustomScenario();
```

### Integration with AI Testing

The Chrome DevTools MCP approach is particularly powerful when combined with AI:

1. **AI analyzes console output** - Identifies patterns in errors
2. **AI suggests fixes** - Based on error context
3. **AI generates tests** - Creates test cases automatically
4. **AI validates UI** - Checks for visual issues

## Troubleshooting

### Issue: "Cannot connect to Chrome DevTools"

**Solution:** Make sure Chrome DevTools MCP server is running in Claude Code settings.

### Issue: "Playwright browser not found"

**Solution:** Run `npm run playwright:install`

### Issue: "Port already in use"

**Solution:** Either stop the other process or change the port in your Vite config.

### Issue: "Console messages not captured"

**Solution:** Make sure you're checking after page load completes. Use `wait_for` or `waitForTimeout`.

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/)
- [MCP Documentation](https://modelcontextprotocol.io/)
- [Project Documentation](./README.md)

## Next Steps

1. ✅ Run `npm run test:demo` to see all available tools
2. ✅ Try `npm run test:playwright` for automated testing
3. ✅ Use Chrome DevTools MCP interactively in Claude Code
4. ✅ Integrate into your CI/CD pipeline
5. ✅ Create custom test scripts for your specific needs

Happy testing! 🎉
