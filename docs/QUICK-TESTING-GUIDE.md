# Quick Start: Testing Your App with Chrome DevTools MCP

## Step-by-Step Demo

### Step 1: Start Your Dev Server

In your terminal:
```bash
npm run dev
```

Your app should be running at `http://localhost:5173`

### Step 2: Open Claude Code with Chrome DevTools MCP

Make sure Chrome DevTools MCP is enabled in your Claude Code settings.

### Step 3: Navigate to Your App

In Claude Code, ask:
```
Navigate to http://localhost:5173 using Chrome DevTools
```

Claude will use the `navigate_page` tool to open your app.

### Step 4: Take a Snapshot

Ask Claude:
```
Take a snapshot of the page
```

This will show you the page structure with all interactive elements and their UIDs.

### Step 5: Check Console for Errors

Ask Claude:
```
Check the console for errors and warnings
```

Claude will use `list_console_messages` and show you any issues.

### Step 6: Interact with the Page

Based on the snapshot, you can ask Claude to:
- Click buttons
- Fill forms
- Navigate links
- Take screenshots

Example:
```
Click on the "Get Started" button and check for console errors
```

### Step 7: Generate Test Report

Ask Claude:
```
Generate a test report showing all console errors and warnings
```

## Example Conversations

### Conversation 1: Basic Console Check

```
You: Navigate to my app at localhost:5173 and check for console errors

Claude: I'll navigate to your app and check the console.
[Uses navigate_page, then list_console_messages]
I found 2 errors and 3 warnings. Would you like me to show the details?
```

### Conversation 2: Form Testing

```
You: Test the contact form on my site

Claude: I'll navigate to the contact form and test it.
[Uses navigate_page, take_snapshot, fill_form, click, list_console_messages]
The form submitted successfully but there's a warning about missing validation.
```

### Conversation 3: Visual Regression

```
You: Take screenshots of the homepage at different screen sizes

Claude: I'll capture screenshots at mobile, tablet, and desktop sizes.
[Uses resize_page and take_screenshot multiple times]
Screenshots saved. I notice the navigation menu is cut off at mobile size.
```

## Common Testing Commands

Here are some ready-to-use commands you can give Claude:

### Console Monitoring
- "Check for console errors"
- "Show me all console warnings"
- "Monitor console for 30 seconds and report any issues"

### Page Interaction
- "Click the first button on the page"
- "Fill out the contact form with test data"
- "Navigate through all pages in the main menu"

### Visual Testing
- "Take a full page screenshot"
- "Compare this page with the homepage"
- "Check if the page looks good on mobile"

### Network Monitoring
- "Show me all failed network requests"
- "Check how long the API calls take"
- "List all images that failed to load"

### Responsive Testing
- "Test the page on iPhone size"
- "Check if the layout works on tablet"
- "Take screenshots at 3 different screen sizes"

## Automated Testing with Playwright

For hands-off testing, use Playwright:

```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Run tests
npm run test:playwright
```

Playwright will:
1. Open your app
2. Monitor everything
3. Generate reports
4. Save screenshots
5. Exit with error code if issues found

## What Gets Checked

### Console Errors
- JavaScript errors
- Uncaught exceptions
- Promise rejections
- TypeError, ReferenceError, etc.

### Console Warnings
- Deprecation warnings
- Performance issues
- Invalid API usage
- Missing resources

### Page Errors
- Failed resource loads
- Network errors
- CORS issues
- Timeouts

### Accessibility (Basic)
- Page title
- Meta description
- Heading structure
- Image alt text

## Interpreting Results

### ✅ Green Test
```
No errors or warnings detected!
Test passed
```
Your app is running clean!

### ⚠️ Warnings
```
Warnings Found:
1. Using deprecated API
2. Missing meta description
```
Fix these to improve quality and SEO.

### ❌ Errors
```
Errors Found:
1. TypeError: Cannot read property 'x' of undefined
2. Failed to load: /api/users
```
These need immediate attention before deployment.

## Next Steps

1. **Make it a habit** - Run tests before each commit
2. **Add to CI/CD** - Automate tests in your pipeline
3. **Expand coverage** - Add more test scenarios
4. **Track regressions** - Compare reports over time
5. **Fix issues** - Address errors and warnings as they appear

## Pro Tips

💡 **Tip 1:** Start every testing session with console check

💡 **Tip 2:** Take screenshots before and after changes

💡 **Tip 3:** Test on multiple screen sizes

💡 **Tip 4:** Check console after every user interaction

💡 **Tip 5:** Keep test reports for regression tracking

💡 **Tip 6:** Use Claude to suggest fixes based on errors

💡 **Tip 7:** Combine with AI visual analysis for UI testing

💡 **Tip 8:** Test both happy path and error cases

💡 **Tip 9:** Monitor API responses for correctness

💡 **Tip 10:** Document test scenarios in a test plan

## Getting Help

If something doesn't work:

1. Check the server is running: `curl http://localhost:5173`
2. Verify MCP is enabled in Claude Code settings
3. Try the Playwright automated test: `npm run test:playwright`
4. Check the documentation: `npm run test:demo`
5. Look at example scripts in `scripts/` directory

Happy Testing! 🚀
