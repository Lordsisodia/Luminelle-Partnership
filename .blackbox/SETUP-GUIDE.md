# 🎯 Blackbox4 Setup Guide for Lumelle

**Current Status:** Framework structure is ready, optional components need setup

---

## ✅ What's Already Ready

### 1. Core Framework Structure
```
.blackbox/
├── .memory/working/shared/  ✅ Your journal.md & tasks.md
├── .plans/                   ✅ Your active plans
├── 3-modules/research/       ✅ deepresearch & oss-catalog
├── 1-agents/.skills/         ✅ 33 production skills
└── 4-scripts/                ✅ Automation scripts
```

### 2. Available Now (No Setup Required)
- ✅ **Read journal & tasks** - Project tracking files
- ✅ **Use agent skills** - Skills work without setup
- ✅ **Run scripts** - Maintenance and automation tools
- ✅ **Access research** - All deepresearch and OSS catalog

---

## 🔧 Optional Setup (For Advanced Features)

### Option 1: Semantic Memory Search (Recommended)

**What it does:** Search your project memory by meaning (70% better than grep)

**Requirements:**
- Docker (recommended) OR Python 3.10+
- PostgreSQL with pgvector extension

**Quick Setup with Docker:**

```bash
# 1. Start the brain services
cd .blackbox
docker-compose up -d postgres neo4j brain-api

# 2. Wait for services to be healthy
docker-compose ps

# 3. Ingest your project metadata
cd 9-brain/ingest
python ingester.py ../../

# 4. Test semantic search
./search-memory "architecture audit"
```

**Without Docker (Local Python):**

```bash
# 1. Install dependencies
cd .blackbox/9-brain
pip install -r api/requirements.txt

# 2. Start PostgreSQL
brew services start postgresql
# or use Docker: docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=blackbox4brain pgvector/pgvector:pg16

# 3. Create database
createdb blackbox4_brain
psql -d blackbox4_brain -f databases/init.sql

# 4. Configure environment
export PGHOST=localhost
export PGPORT=5432
export PGDATABASE=blackbox4_brain
export PGUSER=postgres
export PGPASSWORD=blackbox4brain

# 5. Ingest and search
cd ingest
python ingester.py ../../ --local
```

### Option 2: Ralph TUI Runtime (Advanced)

**What it does:** Terminal UI for autonomous agent execution with real-time monitoring

**Setup:**
```bash
cd .blackbox/core/tui
# Follow README in that directory
```

### Option 3: MCP Servers (If using MCP)

**What it does:** Model Context Protocol integrations (Supabase, Shopify, GitHub, etc.)

**Setup:**
1. Configure in `.config/mcp-servers.json`
2. Update your Claude Code settings to use the config

---

## 🚀 Quick Start (No Setup Required)

### 1. Read Your Project Memory

```bash
# Journal - Project history
cat .blackbox/.memory/working/shared/journal.md

# Tasks - Current work
cat .blackbox/.memory/working/shared/tasks.md

# Plans - Active plans
cat .blackbox/.plans/README.md
```

### 2. Use Agent Skills

Skills work automatically - just mention them in your requests:

```bash
# Examples:
"Use test-driven development to build this feature"
"Debug this using systematic debugging"
"Create an MCP server for the GitHub API"
"Use deep research to analyze this topic"
```

### 3. Access Research Knowledge

```bash
# Deep research notes
ls .blackbox/3-modules/research/deepresearch/

# OSS catalog
ls .blackbox/3-modules/research/oss-catalog/
```

---

## 📊 Current Project Status

### Active Work
- **Systematic Refactoring Agent** - Phase 1: Critical Issues
- **33-43 architectural issues** documented
- **Timeline:** 25-37 weeks (6-9 months)

### Memory Files
- `journal.md` - Complete project history
- `tasks.md` - Current tasks and status

### Available Resources
- 15,338+ files of research and documentation
- 33 production agent skills
- 3 active plans
- Complete OSS component catalog

---

## 🎯 Recommended Setup Path

### Minimal Setup (5 minutes)
1. ✅ **Already done!** - Framework is ready to use
2. Read `journal.md` and `tasks.md` to understand current work
3. Use agent skills by mentioning them in requests

### Standard Setup (15 minutes)
1. Complete minimal setup above
2. **Set up semantic search** (Option 1 above)
3. Test with: `./search-memory "cart context"`

### Advanced Setup (30+ minutes)
1. Complete standard setup
2. **Set up Ralph TUI** (Option 2 above)
3. **Configure MCP servers** (Option 3 above)
4. Run demo: `./demo-agent-workflow.sh`

---

## 📖 Key Documentation

- `QUICK-REF.txt` - Command reference card
- `README.md` - Complete framework documentation
- `SETUP-LUMELLE.md` - Lumelle-specific setup
- `9-brain/QUICKSTART-EMBEDDINGS.md` - Semantic search details

---

## 🆘 Troubleshooting

### "ModuleNotFoundError: No module named 'hybrid_embedder'"
**Solution:** Set up semantic search (Option 1 above) or skip it - not required for basic usage

### "docker: command not found"
**Solution:** Install Docker Desktop or use local Python setup

### "Cannot connect to PostgreSQL"
**Solution:** Check that postgres is running: `docker-compose ps` or `brew services list`

---

**Status:** ✅ Framework ready, choose your setup level above
