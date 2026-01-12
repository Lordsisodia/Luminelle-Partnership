# MCP Skills & Server Guide

Complete guide to MCP (Model Context Protocol) servers and skills for Claude Code.

## Table of Contents
- [What are MCP Servers?](#what-are-mcp-servers)
- [Installation](#installation)
- [Available MCP Servers](#available-mcp-servers)
- [Configuration](#configuration)
- [Usage Examples](#usage-examples)

---

## What are MCP Servers?

MCP (Model Context Protocol) servers extend Claude's capabilities by connecting it to external tools, databases, and services. Each MCP server provides specific skills that Claude can use.

---

## Installation

### Global Installation (Recommended)
```bash
# Install an MCP server globally
npm install -g @modelcontextprotocol/server-<name>

# Or use npx without installing
npx -y @modelcontextprotocol/server-<name>
```

### Project Installation
```bash
npm install --save-dev @modelcontextprotocol/server-<name>
```

---

## Available MCP Servers

### 1. Supabase MCP Server

**Capabilities:**
- Database queries and mutations
- Schema inspection
- Row-level security policies
- Database management
- Real-time subscriptions

**Installation:**
```bash
npm install -g @supabase/mcp-server-supabase
```

**Configuration (.mcp.json):**
```json
{
  "mcpServers": {
    "supabase": {
      "type": "http",
      "url": "https://mcp.supabase.com/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_SUPABASE_ACCESS_TOKEN"
      }
    }
  }
}
```

**Or STDIO (local):**
```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server-supabase@latest", "--project-ref=your-project-ref"],
      "env": {
        "SUPABASE_URL": "https://your-project.supabase.co",
        "SUPABASE_ANON_KEY": "your-anon-key",
        "SUPABASE_SERVICE_ROLE_KEY": "your-service-role-key",
        "SUPABASE_ACCESS_TOKEN": "your-access-token"
      }
    }
  }
}
```

**Skills & Commands:**
- `supabase_query` - Execute SQL queries
- `supabase_select` - Select rows from a table
- `supabase_insert` - Insert new rows
- `supabase_update` - Update existing rows
- `supabase_delete` - Delete rows
- `supabase_list_tables` - List all tables
- `supabase_describe_table` - Get table schema
- `supabase_execute_rpc` - Call PostgreSQL functions

**Documentation:**
- Official: https://supabase.com/docs/guides/ai/claude-mcp
- GitHub: https://github.com/supabase/mcp-server-supabase

---

### 2. Sentry MCP Server

**Capabilities:**
- Error tracking and monitoring
- Issue management
- Event querying
- Release tracking
- Performance monitoring

**Installation:**
```bash
npm install -g @sentry/mcp-server
# Or
npm install -g @modelcontextprotocol/server-sentry
```

**Configuration (.mcp.json):**
```json
{
  "mcpServers": {
    "sentry": {
      "command": "npx",
      "args": ["-y", "@sentry/mcp-server"],
      "env": {
        "SENTRY_DSN": "https://your-dsn@sentry.io/project-id",
        "SENTRY_AUTH_TOKEN": "your-auth-token",
        "SENTRY_ORG_SLUG": "your-org",
        "SENTRY_PROJECT_SLUG": "your-project"
      }
    }
  }
}
```

**Skills & Commands:**
- `sentry_list_issues` - List all issues
- `sentry_get_issue` - Get issue details
- `sentry_create_issue` - Create a new issue
- `sentry_update_issue` - Update issue status
- `sentry_list_events` - List events for an issue
- `sentry_get_event` - Get event details
- `sentry_query` - Execute Sentry API queries
- `sentry_get_releases` - List releases

**Documentation:**
- Sentry Docs: https://docs.sentry.io/
- MCP Integration: Check Sentry's integration guides

---

### 3. Chrome DevTools MCP Server

**Capabilities:**
- Browser automation
- DevTools protocol access
- Page inspection and manipulation
- Performance monitoring
- CSS and JavaScript debugging

**Installation:**
```bash
npm install -g chrome-devtools-mcp
# Or
npm install -g @modelcontextprotocol/server-chrome-devtools
```

**Configuration (.mcp.json):**
```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp"],
      "env": {
        "CHROME_PATH": "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
      }
    }
  }
}
```

**Skills & Commands:**
- `chrome_navigate` - Navigate to URL
- `chrome_evaluate` - Execute JavaScript in page
- `chrome_screenshot` - Take screenshot
- `chrome_get_html` - Get page HTML
- `chrome_click` - Click element
- `chrome_fill` - Fill form fields
- `chrome_select` - Select page elements
- `chrome_console` - Access console logs
- `chrome_network` - Monitor network requests
- `chrome_performance` - Get performance metrics

**Documentation:**
- Chrome DevTools Protocol: https://chromedevtools.github.io/devtools-protocol/
- Package: Search npm for `chrome-devtools-mcp`

---

### 4. Playwright MCP Server

**Capabilities:**
- Cross-browser automation (Chrome, Firefox, Safari)
- End-to-end testing
- Page interaction and manipulation
- Screenshot and PDF generation
- Network interception
- Mobile emulation

**Installation:**
```bash
npm install -g @playwright/mcp-server
# Or
npm install -g @modelcontextprotocol/server-playwright
# Or
npx -y @playwright/mcp-server
```

**Configuration (.mcp.json):**
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp-server"],
      "env": {
        "HEADLESS": "true"
      }
    }
  }
}
```

**Skills & Commands:**
- `playwright_navigate` - Navigate to URL
- `playwright_click` - Click element
- `playwright_fill` - Fill input fields
- `playwright_select` - Select elements
- `playwright_screenshot` - Take screenshot
- `playwright_pdf` - Generate PDF
- `playwright_evaluate` - Execute JavaScript
- `playwright_wait` - Wait for conditions
- `playwright_get_text` - Extract text content
- `playwright_get_html` - Get page HTML
- `playwright_set_viewport` - Set viewport size
- `playwright_emulate_device` - Emulate mobile devices

**Documentation:**
- Official: https://playwright.dev/
- MCP Server: Check npm for `@playwright/mcp-server`

---

## Other Popular MCP Servers

### Filesystem MCP
```bash
npm install -g @modelcontextprotocol/server-filesystem
```
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/allowed/path"]
    }
  }
}
```

### GitHub MCP
```bash
npm install -g @modelcontextprotocol/server-github
```
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "your-github-token"
      }
    }
  }
}
```

### Google Drive MCP
```bash
npm install -g @modelcontextprotocol/server-gdrive
```

### Slack MCP
```bash
npm install -g @modelcontextprotocol/server-slack
```

### Postgres MCP
```bash
npm install -g @modelcontextprotocol/server-postgres
```

---

## Configuration

### Project-Level (.mcp.json)

Create `.mcp.json` in your project root:

```json
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "@package/name"],
      "env": {
        "API_KEY": "your-key"
      }
    }
  }
}
```

### Global Settings (~/.claude/settings.json)

```json
{
  "enableAllProjectMcpServers": true,
  "disabledMcpjsonServers": ["server-to-disable"]
}
```

### HTTP Transport (Recommended for multiple instances)

```json
{
  "mcpServers": {
    "server-name": {
      "type": "http",
      "url": "http://localhost:3000/mcp",
      "headers": {
        "Authorization": "Bearer token"
      }
    }
  }
}
```

---

## Usage Examples

### Example 1: Query Supabase Database

```
You: "Get all users from the users table where status is active"
Claude: [Uses supabase_select tool to fetch data]
```

### Example 2: Automate Browser with Playwright

```
You: "Go to example.com, click the login button, and take a screenshot"
Claude: [Uses playwright_navigate, playwright_click, playwright_screenshot]
```

### Example 3: Debug with Chrome DevTools

```
You: "Inspect the elements on the homepage and get their CSS"
Claude: [Uses chrome_devtools to inspect and extract CSS]
```

### Example 4: Monitor Sentry Errors

```
You: "Show me the 5 most recent errors from production"
Claude: [Uses sentry_list_issues and sentry_get_event]
```

---

## Best Practices

1. **Use HTTP transport for multiple Claude instances** - Reduces resource usage
2. **Disable unused MCP servers** - Saves memory and CPU
3. **Keep API keys secure** - Use environment variables, never commit them
4. **Test MCP servers individually** - Verify they work before integrating
5. **Monitor resource usage** - Each MCP server adds 50-150MB memory overhead

---

## Troubleshooting

### MCP Server Not Starting
```bash
# Test the MCP server directly
npx -y @package/name --help

# Check logs
tail -f ~/claude-monitor.log
```

### Permission Errors
```bash
# Make sure Claude has access to required directories
# Check ~/.claude/settings.json permissions section
```

### Connection Issues
```bash
# For HTTP MCPs, test the endpoint
curl http://localhost:3000/health

# Check if proxy server is running
ps aux | grep mcp-proxy
```

---

## Resources

- [Official MCP Documentation](https://modelcontextprotocol.io/)
- [Claude Code MCP Guide](https://code.claude.com/docs/en/mcp)
- [MCP Server Registry](https://github.com/modelcontextprotocol/servers)
- [MCP Community](https://discord.gg/mcp)

---

**Last Updated:** January 11, 2026
