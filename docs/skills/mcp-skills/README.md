# MCP Skills - Complete Reference

Complete guide to all MCP servers and their skills for Claude Code.

---

## 📚 Table of Contents

1. [Quick Reference](#quick-reference)
2. [Your MCP Servers](#your-mcp-servers)
3. [Skill Categories](#skill-categories)
4. [Common Workflows](#common-workflows)
5. [Tips & Best Practices](#tips--best-practices)

---

## Quick Reference

| MCP Server | Purpose | Key Skills |
|-------------|---------|------------|
| **Supabase (SISO)** | Internal task management | Projects, Tasks, Clients, Issues |
| **Supabase (Lumelle)** | Project database | Products, Orders, Users |
| **Shopify** | E-commerce | Products, Orders, Customers |
| **GitHub** | Repository management | Issues, PRs, Commits |
| **Serena** | AI code assistance | Analysis, Review, Optimization |
| **Chrome DevTools** | Browser debugging | Inspect, Console, Network |
| **Playwright** | E2E testing | Automation, Testing, Screenshot |
| **Filesystem** | File operations | Read, Write, Search, Organize |
| **Sequential Thinking** | Enhanced reasoning | Problem-solving, Analysis, Design |

---

## Your MCP Servers

### Global Servers (Available Everywhere)

1. **SISO Internal Supabase** - Internal task management system
   - Projects, tasks, clients, partnerships tracking
   - Team coordination and communications
   - Issue tracking and time logging
2. **Filesystem** - File access across your user directory
3. **Sequential Thinking** - Enhanced reasoning capabilities

### Project Servers (Lumelle Only)

4. **Lumelle Supabase** - Lumelle project database
5. **Shopify Dev** - E-commerce integration

### Plugin Servers (Via Claude Plugins)

6. **Context7** - Documentation search
7. **GitHub** - Repository management
8. **Serena** - AI-powered code assistance
9. **Chrome DevTools** - Browser automation & debugging
10. **Playwright** - End-to-end testing

---

## Skill Categories

### 🗄️ Database Skills

**Supabase (SISO)** → [SISO Internal Skills Guide](./9-siso-internal-skills.md)
- Internal task management
- Project and client tracking
- Team coordination
- Issue tracking

**Supabase (Lumelle)** → [Supabase Skills Guide](./1-supabase-skills.md)
- Lumelle application data
- Products, orders, users
- E-commerce functionality

---

### 🛒 E-commerce Skills

**Shopify MCP** → [Shopify Skills Guide](./2-shopify-skills.md)

- `shopify_get_store_info` - Get store details
- `shopify_get_products` - List products
- `shopify_create_product` - Add products
- `shopify_get_orders` - Get orders
- `shopify_create_order` - Create orders
- `shopify_get_customers` - Get customers
- `shopify_update_inventory` - Update stock levels

**Use for:**
- Product management
- Order processing
- Customer management
- Inventory tracking
- Partner integration

---

### 🔧 Code Management Skills

**GitHub MCP** → [GitHub Skills Guide](./3-github-skills.md)

- `github_list_repositories` - List repos
- `github_create_repository` - New repo
- `github_list_issues` - Get issues
- `github_create_issue` - Create issue
- `github_list_pull_requests` - List PRs
- `github_create_pull_request` - Create PR
- `github_list_commits` - Get commit history
- `github_get_file_contents` - Read file from repo

**Use for:**
- Repository management
- Issue tracking
- Pull requests
- Code collaboration
- Release management

---

### 🤖 AI Assistance Skills

**Serena MCP** → [Serena Skills Guide](./4-serena-skills.md)

- `serena_analyze_code` - Analyze code quality
- `serena_review_code` - Code review
- `serena_optimize_performance` - Performance optimization
- `serena_scan_security` - Security scanning
- `serena_explain_code` - Code explanation
- `serena_generate_docs` - Generate documentation
- `serena_generate_tests` - Generate unit tests
- `serena_explain_error` - Explain errors

**Use for:**
- Code review
- Performance optimization
- Security analysis
- Documentation
- Test generation

---

### 🌐 Browser Skills

**Chrome DevTools MCP** → [Chrome DevTools Skills Guide](./5-chrome-devtools-skills.md)

- `chrome_navigate` - Navigate to URL
- `chrome_click` - Click elements
- `chrome_fill` - Fill forms
- `chrome_screenshot` - Take screenshots
- `chrome_evaluate` - Execute JavaScript
- `chrome_get_console_logs` - Get console output
- `chrome_get_performance_metrics` - Performance data
- `chrome_get_network_logs` - Network requests

**Use for:**
- Browser automation
- Debugging
- Visual testing
- Performance analysis
- Console inspection

---

### 🧪 Testing Skills

**Playwright MCP** → [Playwright Skills Guide](./6-playwright-skills.md)

- `playwright_launch` - Launch browser
- `playwright_navigate` - Navigate to URL
- `playwright_click` - Click element
- `playwright_fill` - Fill form
- `playwright_screenshot` - Screenshot
- `playwright_wait_for_selector` - Wait for element
- `playwright_assert_text` - Assert text exists
- `playwright_evaluate` - Execute JavaScript

**Use for:**
- E2E testing
- Cross-browser testing
- Visual regression
- Form testing
- Mobile testing

---

### 📁 File Skills

**Filesystem MCP** → [Filesystem Skills Guide](./7-filesystem-skills.md)

- `filesystem_read_file` - Read file
- `filesystem_write_file` - Write file
- `filesystem_search_files` - Find files
- `filesystem_search_content` - Search in files
- `filesystem_list_directory` - List directory
- `filesystem_create_directory` - Create folder
- `filesystem_delete_file` - Delete file
- `filesystem_move_file` - Move/rename

**Use for:**
- File operations
- Code search
- Project organization
- Configuration management

---

### 🧠 Reasoning Skills

**Sequential Thinking MCP** → [Sequential Thinking Skills Guide](./8-sequential-thinking-skills.md)

- `sequential_thinking_break_down` - Break down problems
- `sequential_thinking_reason` - Logical reasoning
- `sequential_thinking_decide` - Make decisions
- `sequential_thinking_analyze_cause` - Root cause analysis
- `sequential_thinking_design_solution` - Design solutions
- `sequential_thinking_debug` - Systematic debugging
- `sequential_thinking_assess_risk` - Risk assessment
- `sequential_thinking_review_code` - Code review

**Use for:**
- Complex problem-solving
- Architecture design
- Algorithm development
- Root cause analysis
- Decision making

---

## Common Workflows

### 🎯 Feature Development Workflow

```
1. Sequential Thinking: Design the feature
   ↓
2. GitHub: Create feature branch
   ↓
3. Filesystem: Create component files
   ↓
4. Serena: Review and optimize code
   ↓
5. Chrome DevTools: Debug UI issues
   ↓
6. Playwright: Write E2E tests
   ↓
7. GitHub: Create PR and merge
```

### 🐛 Bug Fixing Workflow

```
1. Sequential Thinking: Analyze the bug
   ↓
2. Filesystem: Search for relevant code
   ↓
3. Serena: Code analysis and review
   ↓
4. Chrome DevTools: Browser debugging
   ↓
5. Supabase: Check database issues
   ↓
6. Sequential Thinking: Verify fix
```

### 🚀 Deployment Workflow

```
1. GitHub: Create release branch
   ↓
2. Playwright: Run E2E tests
   ↓
3. Sequential Thinking: Assess deployment risks
   ↓
4. GitHub: Create release PR
   ↓
5. GitHub: Tag and release
```

### 📊 Data Analysis Workflow

```
1. Supabase: Query database
   ↓
2. Filesystem: Export results
   ↓
3. Sequential Thinking: Analyze data
   ↓
4. Filesystem: Generate report
```

### 🛍️ E-commerce Workflow

```
1. Shopify: Get product data
   ↓
2. Supabase: Sync to local database
   ↓
3. Serena: Review integration code
   ↓
4. Playwright: Test checkout flow
   ↓
5. Chrome DevTools: Debug UI
```

---

## Tips & Best Practices

### General Tips

✅ **Start with exploration**
- Use Sequential Thinking to break down problems
- Search files with Filesystem MCP
- Check schemas with Supabase MCP

✅ **Use the right tool**
- Browser debugging → Chrome DevTools
- E2E testing → Playwright
- Code review → Serena
- Quick file ops → Filesystem

✅ **Work systematically**
- Plan before coding (Sequential Thinking)
- Review before committing (Serena)
- Test before deploying (Playwright)

✅ **Leverage AI assistance**
- Let Serena analyze your code
- Use Sequential Thinking for complex problems
- Ask for explanations, not just solutions

---

### MCP Server Selection Guide

| Task | Best MCP | Alternative |
|------|----------|-------------|
| Query database | Supabase | - |
| Browser debug | Chrome DevTools | Playwright |
| E2E test | Playwright | Chrome DevTools |
| Code review | Serena | Sequential Thinking |
| File search | Filesystem | GitHub |
| Create PR | GitHub | - |
| Take screenshot | Playwright | Chrome DevTools |
| Analyze problem | Sequential Thinking | Serena |

---

### Performance Tips

**For speed:**
- Use Filesystem for quick file operations
- Use Chrome DevTools for live debugging
- Keep database queries simple

**For accuracy:**
- Use Sequential Thinking for complex analysis
- Use Serena for comprehensive code review
- Use Playwright for thorough testing

**For automation:**
- Use Playwright for test automation
- Use GitHub for CI/CD integration
- Use Shopify scripts for bulk operations

---

### Resource Management

**Memory usage per MCP server:**
- HTTP-based (Supabase, Shopify): 50-100MB shared
- STDIO-based (others): 100-150MB per instance

**Tips:**
- Use HTTP MCPs when possible
- Disable unused MCPs
- Run fewer instances with more MCPs vs more instances with fewer MCPs
- Monitor memory usage

---

## Getting Help

Each MCP server has a comprehensive guide:

1. [Supabase](./1-supabase-skills.md) - Database operations
2. [Shopify](./2-shopify-skills.md) - E-commerce
3. [GitHub](./3-github-skills.md) - Repository management
4. [Serena](./4-serena-skills.md) - AI assistance
5. [Chrome DevTools](./5-chrome-devtools-skills.md) - Browser debugging
6. [Playwright](./6-playwright-skills.md) - Testing
7. [Filesystem](./7-filesystem-skills.md) - File operations
8. [Sequential Thinking](./8-sequential-thinking-skills.md) - Reasoning

---

## Quick Start

All MCP servers are automatically available. Just ask Claude:

```
"Use Playwright to test the login flow"
"Query Supabase for all active users"
"Review my code with Serena"
"Take a screenshot with Chrome DevTools"
"Search for all .ts files with Filesystem"
"Think through this problem step by step"
```

---

## Example Commands

### Database
```
"Get all users from SISO database"
"Insert new product into Lumelle database"
"Update order status to 'shipped'"
```

### Code
```
"Review src/components/Header.tsx"
"Find all TODO comments in the codebase"
"Generate unit tests for this function"
```

### Testing
```
"Test the login flow with Playwright"
"Take screenshot of homepage"
"Fill out the contact form and submit"
```

### Debugging
```
"Debug why the button doesn't work"
"Check console for errors"
"Analyze the performance issue"
```

### Files
```
"Find all configuration files"
"Create a new component directory"
"Search for 'authentication' in all files"
```

### Reasoning
```
"Break down this complex feature"
"Analyze the root cause of this bug"
"Design a solution for this problem"
```

---

**Last Updated:** January 11, 2026
**Total MCP Servers:** 10
**Total Skills:** 80+

---

**Need help?** Just ask Claude what you want to do, and Claude will automatically use the best MCP server for the job!
