# Complete List of Your MCP Servers

## Currently Installed & Configured

### ✅ Installed Locally

1. **@shopify/dev-mcp** (v1.5.1)
   - Purpose: Shopify development and API integration
   - Status: Installed via npm
   - Config: HTTP proxy at `http://localhost:3000/mcp/shopify`

2. **@supabase/mcp-server-supabase** (v0.5.9)
   - Purpose: Supabase database operations
   - Status: Installed via npm
   - Config: HTTP endpoint at `https://mcp.supabase.com/mcp`

---

## Available in Claude Plugins

### 📦 Plugin Directory MCP Servers

3. **Asana MCP**
   - Purpose: Project management, task tracking
   - Type: HTTP/SSE
   - URL: `https://mcp.asana.com/sse`
   - Install: Available in plugins

4. **Context7**
   - Purpose: Context management and documentation
   - Type: Custom command
   - Install: Available in plugins

5. **Firebase**
   - Purpose: Firebase database and services
   - Type: HTTP
   - URL: Firebase MCP endpoint
   - Install: Available in plugins

6. **GitHub**
   - Purpose: GitHub repository management, issues, PRs
   - Type: HTTP
   - URL: `https://api.githubcopilot.com/mcp/`
   - Install: Available in plugins

7. **GitLab**
   - Purpose: GitLab repository management
   - Type: HTTP
   - URL: `https://gitlab.com/api/v4/mcp`
   - Install: Available in plugins

8. **Greptile**
   - Purpose: Code intelligence and analysis
   - Type: HTTP
   - URL: `https://api.greptile.com/mcp`
   - Install: Available in plugins

9. **Laravel Boost**
   - Purpose: Laravel framework development
   - Type: PHP command
   - Install: Available in plugins

10. **Linear**
    - Purpose: Issue tracking and project management
    - Type: HTTP
    - URL: `https://mcp.linear.app/mcp`
    - Install: Available in plugins

11. **Playwright**
    - Purpose: Browser automation and testing
    - Type: npx command (Python uvx also available)
    - Status: Installed and available
    - Install: `npx @playwright/mcp-server`

12. **Serena**
    - Purpose: AI-powered development assistance
    - Type: npx command
    - Install: Available in plugins

13. **Slack**
    - Purpose: Slack messaging and integration
    - Type: HTTP/SSE
    - URL: `https://mcp.slack.com/sse`
    - Install: Available in plugins

14. **Stripe**
    - Purpose: Stripe payments and API
    - Type: HTTP
    - URL: `https://mcp.stripe.com`
    - Install: Available in plugins

---

## Project-Level MCP Configurations

### 📁 Projects with MCP Servers

1. **lumelle** (current project)
   - Supabase (HTTP)
   - Shopify (HTTP proxy)

2. **lumelle-blogfix**
   - Has `.mcp.json` configured

3. **Restraunt**
   - Has `.mcp.json` configured

4. **WE ARE EXCLUSIONS/mallocra-activities-new**
   - Has `.mcp.json` configured (both in root and `.cursor/`)

---

## Previously Used (Now Disabled)

These MCP servers were running but have been disabled for resource optimization:

- **chrome-devtools-mcp** - Chrome DevTools integration
- **duckduckgo-mcp-server** - DuckDuckGo search
- **serena-mcp-server** - Serena AI assistance
- **mcp-server-playwright** - Playwright automation (still available, just disabled)

---

## Quick Install Commands

### To enable any of the above MCP servers:

```bash
# For HTTP-based MCPs (Asana, Linear, Slack, Stripe)
# Just add to .mcp.json:
{
  "mcpServers": {
    "asana": {
      "type": "http",
      "url": "https://mcp.asana.com/sse",
      "headers": {
        "Authorization": "Bearer YOUR_TOKEN"
      }
    }
  }
}

# For npx-based MCPs (Playwright, Serena)
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp-server"]
    }
  }
}

# For GitHub
{
  "mcpServers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/",
      "headers": {
        "Authorization": "Bearer YOUR_GITHUB_TOKEN"
      }
    }
  }
}
```

---

## Additional MCP Servers You Can Install

### Popular Official MCP Servers

```bash
# Filesystem access
npm install -g @modelcontextprotocol/server-filesystem

# PostgreSQL database
npm install -g @modelcontextprotocol/server-postgres

# Google Drive
npm install -g @modelcontextprotocol/server-gdrive

# Brave Search
npm install -g @modelcontextprotocol/server-brave-search

# Google Maps
npm install -g @modelcontextprotocol/server-google-maps

# Memory (knowledge base)
npm install -g @modelcontextprotocol/server-memory

# Puppeteer (alternative to Playwright)
npm install -g @modelcontextprotocol/server-puppeteer

# SQLite
npm install -g @modelcontextprotocol/server-sqlite
```

---

## Summary

**You have access to 14+ MCP servers:**

- **2 currently active** (Supabase, Shopify)
- **12 available in plugins** (Asana, Context7, Firebase, GitHub, GitLab, Greptile, Laravel Boost, Linear, Playwright, Serena, Slack, Stripe)
- **4 disabled for optimization** (chrome-devtools, duckduckgo, serena, playwright)

**Plus dozens more available** via npm `@modelcontextprotocol` packages!

---

**Need to enable any specific MCP server?** Just let me know which one and I'll configure it for you!
