# 🚀 Blackbox Setup Guide for Lumelle

**Date:** 2026-01-15
**Status:** ✅ Ready to Use

## What is Blackbox4?

Blackbox4 is an AI Agent Orchestration Framework that provides:
- **Semantic Memory Search** - Find past work by meaning (70% better than keywords)
- **Agent Workflow Tracking** - Timeline and work queue management
- **Multi-Agent Coordination** - 5 agent categories with 33 production skills
- **Planning System** - Structured plans with progress tracking
- **MCP Integrations** - 13 built-in Model Context Protocol integrations

## 🎯 Quick Start (3 Steps)

### 1. Make the search tool executable

```bash
chmod +x .blackbox/search-memory
```

### 2. Test semantic search

```bash
cd /Users/shaansisodia/DEV/client-projects/lumelle
.blackbox/search-memory "architecture audit"
```

### 3. Run the demo workflow

```bash
cd .blackbox
./demo-agent-workflow.sh
```

## 📁 Your Lumelle Blackbox Structure

```
.blackbox/
├── .memory/working/shared/
│   ├── journal.md          # 📝 Project history
│   └── tasks.md            # 📋 Active tasks
├── .plans/
│   └── README.md           # 📋 Current plans
├── 3-modules/research/
│   ├── deepresearch/       # 🔬 Research notes
│   └── oss-catalog/        # 📦 OSS components
├── 1-agents/.skills/       # 🎭 Agent skills
└── 4-scripts/              # 🔧 Automation scripts
```

## 🔍 How to Use Semantic Search

Search your project memory by meaning:

```bash
# From project root
.blackbox/search-memory "cart context refactoring"
.blackbox/search-memory "analytics migration"
.blackbox/search-memory "shopify webhooks"
.blackbox/search-memory "testing patterns"
```

## 📋 Current Project Status

### Active Work
- **Systematic Refactoring Agent** - Phase 1: Critical Issues
- **33-43 architectural issues** identified and documented
- **Timeline:** 25-37 weeks (6-9 months)

### Memory Files
- `journal.md` - Complete project history (2025-12-28 to present)
- `tasks.md` - Current tasks and Phase 1 status

### Plans
- Architecture audit (2026-01-15)
- Landing page UI updates (2026-01-11)
- WebhookInbox reverse engineering (2026-01-02)

## 🎭 Agent Skills Available

### Development
- Test-Driven Development
- Systematic Debugging

### MCP Integrations (13)
- Supabase, Shopify, GitHub, Serena
- Chrome DevTools, Playwright, Filesystem
- Sequential Thinking, SISO Internal
- Artifacts Builder, DOCX, PDF, MCP Builder

### Git Workflow
- Git Worktrees for parallel development

### Documentation
- Docs Routing, Feedback Triage

### Automation
- GitHub CLI, Long-Run Ops, UI Cycle

### Collaboration
- Notifications (Local, Mobile, Telegram)
- Code Review, Skill Creator

### Thinking
- Deep Research, First Principles
- Intelligent Routing, Writing Plans

## 📊 Key Commands

```bash
# Search memory
.blackbox/search-memory "your query"

# Check timeline
cat .blackbox/.memory/working/shared/timeline.md

# View work queue
cat .blackbox/.memory/working/shared/work-queue.json

# Read journal
cat .blackbox/.memory/working/shared/journal.md

# View tasks
cat .blackbox/.memory/working/shared/tasks.md

# Run demo
cd .blackbox && ./demo-agent-workflow.sh
```

## 🎯 Next Steps

1. **Search before you start** - Use semantic search to find related work
2. **Update journal and tasks** - Keep project memory current
3. **Use agent skills** - Leverage the 33 production skills
4. **Track progress** - Update timeline and work queue as you go

## 📖 Documentation

- `QUICK-REF.txt` - Quick reference card
- `README.md` - Complete framework documentation
- `BRAIN-ARCHITECTURE-v2.md` - Memory system details

---

**Status:** ✅ Ready to use
**Memory:** 15,338+ files indexed
**Skills:** 33 production skills ready
**Plans:** 3 active plans documented
