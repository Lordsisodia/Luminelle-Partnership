# Your Final MCP Server Configuration

## ✅ Complete Setup - All Configured

### Global MCP Servers (`~/.mcp.json`)

1. **SISO Internal Supabase**
   - Project: `avdgyrepwrvsvwgxrccr`
   - URL: `https://avdgyrepwrvsvwgxrccr.supabase.co`
   - Purpose: SISO internal operations
   - Available: In all Claude instances globally

2. **Filesystem MCP**
   - Command: `@modelcontextprotocol/server-filesystem`
   - Path: `/Users/shaansisodia`
   - Purpose: File system access across your entire user directory
   - Available: Globally

3. **Sequential Thinking MCP**
   - Command: `@modelcontextprotocol/server-sequential-thinking`
   - Purpose: Enhanced reasoning capabilities
   - Available: Globally

---

### Project MCP Servers (Lumelle - `.mcp.json`)

4. **Lumelle Supabase**
   - Project: `tmsbyiwqzesmirbargxv`
   - Type: HTTP (`https://mcp.supabase.com/mcp`)
   - Purpose: Lumelle project database
   - Available: In Lumelle project only

5. **Shopify Dev**
   - Package: `@shopify/dev-mcp@1.5.1`
   - Type: HTTP proxy (`http://localhost:3000/mcp/shopify`)
   - Purpose: Shopify development
   - Available: In Lumelle project only

---

### Plugin MCP Servers (Available via Claude Plugins)

6. **Context7** - Documentation search
7. **GitHub** - Repository management
8. **Serena** - AI assistance ✅ **ENABLED**
9. **Chrome DevTools** - Browser automation
10. **Playwright** - E2E testing

---

## Summary

**Total Active MCP Servers: 10**

### Global (3) - Always Available
- SISO Internal Supabase
- Filesystem
- Sequential Thinking

### Project-Specific (2) - Lumelle Only
- Lumelle Supabase
- Shopify Dev

### Plugin-Based (5) - Via Claude Plugins
- Context7
- GitHub
- Serena ✅
- Chrome DevTools
- Playwright

---

## Disabled (8) - Can Enable If Needed

- Asana
- Firebase
- GitLab
- Greptile
- Laravel Boost
- Linear
- Slack
- Stripe
- DuckDuckGo

---

## Usage

All these MCP servers are **automatically available** when you run:

```bash
claude-light   # For most work
claude-full    # When you need everything
claude-med      # For database work
```

**No additional configuration needed!** Just open a new VS Code terminal and start coding.

---

## Your Two Supabase Instances

### 1. SISO Internal (Global)
- Available in **all** projects and Claude instances
- Used for SISO internal operations
- Configured in: `~/.mcp.json`

### 2. Lumelle (Project-Specific)
- Only available in the Lumelle project
- Used for Lumelle project data
- Configured in: `lumelle/.mcp.json`

Claude will automatically use the correct Supabase based on which project you're working in!

---

**All done! Everything is configured and ready to use.** 🎉
