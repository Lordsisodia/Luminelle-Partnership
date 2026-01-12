# Claude Skills

This directory contains custom skills for Claude Code.

## Available Skills

### /test-app

Automated testing skill for web applications.

**Usage:**
```
/test-app [type] [url]
```

**Types:**
- `console` - Quick console error check (default)
- `full` - Comprehensive Playwright test suite
- `integrated` - Full test suite with accessibility checks
- `demo` - Show all testing capabilities

**Examples:**
```
/test-app
/test-app console
/test-app full http://localhost:3000
/test-app integrated
/test-app demo
```

**What it does:**
- Monitors console for errors and warnings
- Tests page structure and accessibility
- Captures screenshots at multiple viewports
- Validates navigation and user flows
- Generates detailed reports
- Provides actionable insights

**Output:**
- Real-time console feedback
- Error and warning summaries
- Screenshots in `test-results/screenshots/`
- JSON reports in `test-results/`
- Suggestions for fixes

## Creating New Skills

1. Create a new `.md` file in this directory
2. Create a corresponding `.skill.mjs` implementation
3. Make it executable: `chmod +x skill-name.skill.mjs`
4. Update this README

## Skill Structure

```
.claude/skills/
├── README.md                    # This file
├── test-app.md                  # Skill documentation
├── test-app.skill.mjs          # Skill implementation
└── [new-skill]/
    ├── [new-skill].md
    └── [new-skill].skill.mjs
```

## Resources

- [Claude Code Skills Documentation](https://github.com/anthropics/claude-code)
- [Testing Automation Docs](../../docs/TESTING-AUTOMATION.md)
- [Quick Testing Guide](../../docs/QUICK-TESTING-GUIDE.md)
