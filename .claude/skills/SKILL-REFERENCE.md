# Test App Skill - Quick Reference

## Basic Usage

```
/test-app
```
🔍 Quick console check on localhost:5173

```
/test-app console
```
Check console errors and warnings

```
/test-app full
```
Run comprehensive Playwright tests

```
/test-app integrated
```
Full test suite with accessibility checks

```
/test-app demo
```
Show all testing capabilities

## With Custom URL

```
/test-app full http://localhost:3000
```
Test different port/URL

## Test Types Comparison

| Type | Speed | Coverage | Best For |
|------|-------|----------|----------|
| `console` | ⚡ Fast | Console only | Quick dev checks |
| `full` | 🚀 Medium | Console + Visual | Pre-commit testing |
| `integrated` | 🐢 Slow | Everything | CI/CD, comprehensive |
| `demo` | - | - | Learning capabilities |

## What Gets Checked

### Console (Fast)
- ✅ JavaScript errors
- ✅ Console warnings
- ✅ Failed API calls
- ✅ Resource loading errors

### Full (Medium)
- All console checks
- ✅ Page structure
- ✅ Screenshots
- ✅ Responsive design
- ✅ Network requests

### Integrated (Comprehensive)
- All full checks
- ✅ Accessibility (alt text, labels)
- ✅ Navigation testing
- ✅ SEO validation (meta tags)
- ✅ Multiple viewports
- ✅ User flow testing

## Output Location

```
test-results/
├── screenshots/
│   ├── initial-*.png
│   ├── full-page-*.png
│   └── responsive-*.png
└── report-*.json
```

## Examples

### Quick Check During Development
```bash
npm run dev
# In Claude Code:
/test-app console
```

### Before Commit
```bash
/test-app full
```

### Before Deploy
```bash
/test-app integrated
```

### Test Different Environment
```bash
/test-app full https://staging.example.com
```

## Tips

💡 **Start with `console`** - Fastest way to catch errors
💡 **Use `full` before commits** - Good balance of speed/coverage
💡 **Use `integrated` for CI/CD** - Most comprehensive
💡 **Run `demo` first** - See all capabilities
💡 **Check test-results/** - Detailed reports saved there

## Integration

### Pre-commit Hook
```bash
#!/bin/bash
npm run test:integrated:ci
```

### CI/CD Pipeline
```yaml
- run: npm run dev &
- run: sleep 10
- run: npm run test:integrated:ci
```

### Package.json
```json
{
  "scripts": {
    "test": "npm run test:integrated:ci"
  }
}
```

## Troubleshooting

**Server not running?**
```bash
npm run dev
```

**Playwright not installed?**
```bash
npm run playwright:install
```

**Tests timing out?**
- Check server is responding
- Increase timeout in script
- Check network connectivity

## See Also

- [Full Documentation](../../docs/TESTING-AUTOMATION.md)
- [Quick Start Guide](../../docs/QUICK-TESTING-GUIDE.md)
- [Testing Summary](../../docs/TESTING-SUMMARY.md)
