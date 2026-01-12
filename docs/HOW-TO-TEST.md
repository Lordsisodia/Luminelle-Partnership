# How to Test the Testing Setup

## Quick Test Options

### Option 1: Quickest - Direct Script (Recommended)

```bash
npm run test:headless
```

This runs a fast console-only check in headless mode. Takes ~5 seconds.

### Option 2: Using the Skill

In Claude Code, simply type:
```
/test-app
```

This will run the headless console check by default.

### Option 3: Interactive Test with Chrome DevTools MCP

In Claude Code, say:
```
Navigate to http://localhost:5174 and check for console errors
```

This will:
1. Navigate to your app
2. Check console for errors
3. Show you what it found

### Option 4: Full Automated Test

```bash
npm run test:playwright
```

This runs comprehensive tests including:
- Console monitoring
- Page structure checks
- Screenshots
- Detailed report

Takes ~30 seconds.

### Option 5: Complete Test Suite

```bash
npm run test:integrated
```

This runs everything:
- All console checks
- Page structure
- Accessibility checks
- Responsive design testing
- Navigation testing
- Screenshots at multiple viewports

Takes ~2 minutes.

## Step-by-Step Testing Guide

### Test 1: Quick Console Check (5 seconds)

```bash
npm run test:headless
```

**Expected output:**
```
🔍 Quick Headless Console Check
================================

Testing: http://localhost:5174

⏳ Loading page...
✅ Page loaded successfully
⏳ Waiting for console messages...

📊 Results
==========
Total Errors: X
Total Warnings: Y

[Details of any errors found...]

✅ Test complete!
```

### Test 2: Verify Skill Works (5 seconds)

In Claude Code:
```
/test-app
```

Should run the same headless check.

### Test 3: Test with Custom URL (5 seconds)

```bash
node scripts/test-headless.mjs https://example.com
```

Tests any URL, not just localhost.

### Test 4: Full Playwright Test (30 seconds)

```bash
npm run test:playwright
```

**What you'll see:**
- Browser launching (headless)
- Page loading
- Console monitoring
- Screenshot capture
- Report generation
- Results saved to `test-results/`

**Expected output:**
```
🎭 Automated Testing with Playwright
===================================

Target URL: http://localhost:5174

🚀 Starting browser...
📍 Navigating to: http://localhost:5174
✅ Page loaded successfully

⏳ Waiting for page stability...
🔍 Performing basic checks...
   Page Title: LUMELLE™ | Satin-lined waterproof shower cap
   ✅ Meta description found
   H1 headings: 1
   Images found: X

📸 Screenshot saved: test-results/screenshots/initial-...
📸 Screenshot saved: test-results/screenshots/full-page-...

📊 Test Report
==============
Total Console Messages: X
Errors: X
Warnings: X

[Detailed report...]

✅ Test passed
```

### Test 5: Interactive Chrome DevTools Test (Variable)

In Claude Code:
```
Navigate to http://localhost:5174, take a snapshot, and check console for errors
```

This will:
1. Navigate to your app
2. Take a snapshot showing page structure
3. List all console messages
4. Highlight any errors

## Testing Different Scenarios

### Test Console Error Detection

Create a temporary error in your code to verify detection:

```javascript
// Add to any component
useEffect(() => {
  console.error('Test error - this should be detected');
}, []);
```

Then run:
```bash
npm run test:headless
```

Should detect the error and report it.

### Test Responsive Design

```bash
npm run test:integrated
```

This will test at multiple screen sizes:
- Mobile (375x667)
- Tablet (768x1024)
- Desktop (1920x1080)

### Test Navigation

```bash
npm run test:integrated
```

The integrated suite tests:
- Navigation links
- Page routing
- User flows

### Test Error Reporting

1. Check the report is saved:
```bash
ls -la test-results/
```

2. View the JSON report:
```bash
cat test-results/*/report-*.json | head -50
```

3. Check screenshots:
```bash
ls -la test-results/screenshots/
```

## Verification Checklist

Run through this checklist to verify everything works:

- [ ] Dev server is running (`npm run dev`)
- [ ] Quick headless test works (`npm run test:headless`)
- [ ] Skill works in Claude Code (`/test-app`)
- [ ] Full Playwright test works (`npm run test:playwright`)
- [ ] Integrated suite works (`npm run test:integrated`)
- [ ] Screenshots are saved (`test-results/screenshots/`)
- [ ] JSON reports are generated (`test-results/*/report-*.json`)
- [ ] Tests detect errors (try adding `console.error()`)
- [ ] Tests run headlessly (no browser windows open)
- [ ] Exit code is 1 when errors found, 0 when clean

## Troubleshooting

### "Server not running"
```bash
# Check if server is running
lsof -i :5174

# Start server
npm run dev
```

### "Playwright not installed"
```bash
npx playwright install chromium
```

### "Tests timing out"
- Check server is responding
- Try accessing URL in browser
- Check firewall settings

### "No errors found but I know there are errors"
- Make sure server is running on correct port
- Check if errors are in a different route
- Try testing the specific URL where errors occur

## Advanced Testing

### Test Specific Routes

```bash
node scripts/test-headless.mjs http://localhost:5174/contact
```

### Test with Environment Variables

```bash
TEST_URL=http://localhost:5174 npm run test:headless
```

### Continuous Testing

Watch mode for development:
```bash
# In one terminal
npm run dev

# In another terminal
while true; do npm run test:headless; sleep 30; done
```

### Test Multiple URLs

Create a test script:
```bash
#!/bin/bash
URLS=(
  "http://localhost:5174"
  "http://localhost:5174/shop"
  "http://localhost:5174/about"
)

for url in "${URLS[@]}"; do
  echo "Testing $url"
  node scripts/test-headless.mjs "$url"
done
```

## What to Look For

### Successful Test Output
```
✅ Page loaded successfully
Total Errors: 0
Total Warnings: 0
🎉 No errors or warnings detected!
✅ Test complete!
```

### Error Detection
```
❌ Error: [error message]
   📍 [file:line]
Total Errors: 1
```

### Test Report Files
```
test-results/
├── screenshots/
│   ├── initial-1234567890.png
│   └── full-page-1234567890.png
└── integrated/
    └── report-1234567890.json
```

## Quick Test Command

For the fastest verification, just run:

```bash
npm run test:headless
```

This will tell you immediately if:
- ✅ The setup works
- ✅ Your server is running
- ✅ There are any console errors
- ✅ The tests run headlessly

That's it! You're ready to test! 🚀
