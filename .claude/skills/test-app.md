# Test Web App

Automated testing skill for web applications using Chrome DevTools MCP and Playwright.

**All tests run HEADLESS by default** - won't disrupt your work!

## Usage

```
/test-app [type] [url]
```

### Options

- `type` (optional): Test type to run
  - `console` - Quick console error check (default, fastest)
  - `headless` - Quick headless console check
  - `full` - Comprehensive testing with Playwright
  - `integrated` - Full test suite with accessibility
  - `demo` - Show testing capabilities

- `url` (optional): URL to test (defaults to http://localhost:5174)

### Examples

```
/test-app
```
Runs quick headless console check on localhost:5174

```
/test-app console
```
Check console for errors and warnings

```
/test-app headless
```
Quick headless console check (fastest option)

```
/test-app full http://localhost:3000
```
Run comprehensive Playwright tests on specified URL

```
/test-app integrated
```
Run full integrated test suite

```
/test-app demo
```
Show available testing capabilities

## What It Does

### Console Testing (type: console)
- Navigates to the specified URL
- Monitors all console messages
- Reports errors, warnings, and info
- Provides detailed error information
- Suggests fixes when possible

### Full Testing (type: full)
- Console error monitoring
- Page structure validation
- Screenshot capture
- Responsive design testing
- Network request monitoring
- Detailed JSON report generation

### Integrated Testing (type: integrated)
- All full testing features
- Accessibility checks (alt text, labels)
- Navigation testing
- Multiple viewport testing
- SEO validation (meta tags)
- Comprehensive test report

## Implementation

When invoked, this skill:

1. Checks if dev server is running
2. Determines test type from arguments
3. Executes appropriate testing approach:
   - Chrome DevTools MCP for interactive testing
   - Playwright for automated testing
4. Generates detailed report
5. Provides actionable insights

## Output

- Real-time console feedback
- Error and warning summaries
- Screenshots (for full/integrated tests)
- JSON report (saved to test-results/)
- Suggestions for fixes

## Requirements

- Dev server running on specified port
- Chrome DevTools MCP configured
- Playwright installed (for full/integrated tests)
- Node.js environment

## Tips

- Use `console` type for quick checks during development
- Use `full` type before commits
- Use `integrated` type for comprehensive validation
- Run `demo` first to see all capabilities
- Check test-results/ directory for detailed reports
