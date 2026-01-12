# Complete MCP Server Inventory

## Your Supabase Instances

### 1. SISO Internal Supabase (Global)
- **Project Ref:** `avdgyrepwrvsvwgxrccr`
- **URL:** `https://avdgyrepwrvsvwgxrccr.supabase.co`
- **Access Token:** `sbp_46f04e75f8bba39917efda341bbf260ac60d3c8d`
- **Purpose:** SISO internal operations
- **Config Location:** `~/.claude/.env` (global)
- **Used in:** SISO-INTERNAL project

### 2. Lumelle Project Supabase
- **Project Ref:** `tmsbyiwqzesmirbargxv`
- **URL:** `https://tmsbyiwqzesmirbargxv.supabase.co`
- **Purpose:** Lumelle project database
- **Config Location:** `/Users/shaansisodia/DEV/client-projects/lumelle/.mcp.json`
- **Current Config:** HTTP endpoint at `https://mcp.supabase.com/mcp`

---

## All Your MCP Servers (Complete List)

### Currently Active (6)

1. **Supabase** (2 instances)
   - SISO Internal (global)
   - Lumelle Project

2. **Shopify Dev**
   - Package: `@shopify/dev-mcp@1.5.1`
   - Config: HTTP proxy at `http://localhost:3000/mcp/shopify`

3. **Context7**
   - Purpose: Documentation search
   - Type: HTTP via plugins

4. **GitHub**
   - Purpose: GitHub repository management
   - URL: `https://api.githubcopilot.com/mcp/`

5. **Chrome DevTools**
   - Purpose: Browser automation & debugging
   - Type: STDIO (local)

6. **Playwright**
   - Purpose: E2E testing
   - Type: STDIO (local)

---

### Installed But Disabled (9)

7. **Asana** - Project management
8. **Firebase** - Firebase services
9. **GitLab** - GitLab repositories
10. **Greptile** - AI code search
11. **Laravel Boost** - Laravel framework
12. **Linear** - Issue tracking
13. **Serena** - AI assistance (note: you mentioned keeping this twice)
14. **Slack** - Messaging
15. **Stripe** - Payments
16. **DuckDuckGo** - Search

---

### Additional MCPs Found in SISO Projects

From `~/DEV/ARCHIVE/SISO-INTERNAL-WORKING/SISO-INTERNAL/.mcp.json`:

1. **mcp-filesystem** - Filesystem access
2. **mcp-sequential-thinking** - Enhanced reasoning
3. **mcp-context7** - Context management (same as Context7)

---

## Configuration Summary

### Global Config (`~/.claude/.env`)
```
SISO Internal Supabase:
- URL: https://avdgyrepwrvsvwgxrccr.supabase.co
- Project Ref: avdgyrepwrvsvwgxrccr
```

### Project Config (`lumelle/.mcp.json`)
```json
{
  "mcpServers": {
    "lumelle-supabase": {
      "type": "http",
      "url": "https://mcp.supabase.com/mcp"
    },
    "shopify-dev-mcp": {
      "type": "http",
      "url": "http://localhost:3000/mcp/shopify"
    }
  }
}
```

---

## Question: Do You Want To?

1. **Add SISO Internal Supabase** to your global config so it's always available?
2. **Keep Serena MCP enabled** (you mentioned it twice in your list)?
3. **Add any of the SISO project MCPs** (filesystem, sequential-thinking)?

---

## Recommendation

To support **both Supabase instances**, I can configure:

**Option A:** Add SISO Supabase to your global config
**Option B:** Create separate Claude instances for each project
  - `claude-siso` - With SISO Supabase
  - `claude-lumelle` - With Lumelle Supabase + Shopify

**What would you prefer?**
