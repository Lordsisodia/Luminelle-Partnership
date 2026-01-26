# Blackbox4 → Blackbox5 FULL Migration Plan

**Date:** 2026-01-26
**Strategy:** Complete Migration → Archive Blackbox4 → Single Source of Truth (Blackbox5)

---

## 🎯 **OBJECTIVE**

Migrate **ALL** content from Blackbox4 (`.blackbox/`) to Blackbox5's project memory system, then archive or remove Blackbox4 to eliminate confusion and establish Blackbox5 as the single source of truth.

---

## 📦 **Phase 0: Pre-Migration Preparation**

### Task 0.1: Identify All Blackbox4 Content
```bash
# Find ALL blackbox4 locations
find .blackbox -type f -name "*.md" -o -name "*.json" -o -name "*.yaml" -o -name "*.py" -o -name "*.sh" | wc -l

# Check directory sizes
du -sh .blackbox/
du -sh blackbox5/5-project-memory/blackbox5/
```

### Task 0.2: Create Backup
```bash
# Create timestamped backup
BACKUP_DATE=$(date +%Y%m%d_%H%M%S)
tar -czf lumelle-blackbox4-backup-${BACKUP_DATE}.tar.gz .blackbox/

# Verify backup
tar -tzf lumelle-blackbox4-backup-${BACKUP_DATE}.tar.gz .blackbox/
```

### Task 0.3: Create Migration Scripts
```bash
# Create comprehensive migration scripts
mkdir -p blackbox5/migration-scripts
```

---

## 📦 **Phase 1: Migrate Core Memory System**

### Task 1.1: Migrate Working Memory (.memory/working/)

**Source:** `.blackbox/.memory/working/`
**Destination:** `blackbox5/5-project-memory/blackbox5/memory/working/`

**Files to migrate:**
- `shared/journal.md` → `blackbox5/memory/working/shared/journal.md`
- `shared/tasks.md` → `blackbox5/memory/working/shared/tasks.md`
- `shared/lumelle-first-principles-analysis.md` → `blackbox5/memory/working/shared/first-principles.md`
- `agents/` (all tracking docs) → `blackbox5/memory/working/agents/`
- `hierarchical-tasks/*.json` (241 files) → `blackbox5/memory/working/hierarchical/*.json`

### Task 1.2: Migrate Extended Memory (.memory/extended/)

**Source:** `.blackbox/.memory/extended/`
**Destination:** `blackbox5/5-project-memory/blackbox5/memory/extended/`

**Action:** Copy ChromaDB vector store
```bash
mkdir -p blackbox5/5-project-memory/blackbox5/memory/extended/chroma-db
cp -r .blackbox/.memory/extended/chroma-db/* blackbox5/5-project-memory/blackbox5/memory/extended/chroma-db/
```

**Note:** ChromaDB is Blackbox4's semantic search. Blackbox5 has 6 different memory systems. We'll keep ChromaDB for now but may need to migrate to Blackbox5's Enhanced Production Memory later.

### Task 1.3: Migrate Archival Memory (.memory/archival/)

**Source:** `.blackbox/.memory/archival/`
**Destination:** `blackbox5/5-project-memory/blackbox5/memory/archival/`

**Action:** Copy if non-empty
```bash
if [ "$(ls -A .blackbox/.memory/archival/)" ]; then
  cp -r .blackbox/.memory/archival/* blackbox5/5-project-memory/blackbox5/memory/archival/
fi
```

---

## 📦 **Phase 2: Migrate Plans System**

### Task 2.1: Migrate Active Plans (.plans/)

**Source:** `.blackbox/.plans/`
**Destination:** `blackbox5/5-project-memory/blackbox5/plans/`

**Files to migrate:**
- `2026-01-15_systematic-refactoring-master/` → `active/systematic-refactoring/`
- `2026-01-11_1631_landing-page-ui-updates-jan-2026/` → `active/landing-page-ui/`
- `2026-01-02_0012_reverse-engineer-shopify-webhookinbox/` → `active/webhook-inbox-reverse/`

```bash
# Copy all active plans
cp -r .blackbox/.plans/* blackbox5/5-project-memory/blackbox5/plans/active/
```

### Task 2.2: Migrate Archived Plans (.plans/_archive/)

**Source:** `.blackbox/.plans/_archive/`
**Destination:** `blackbox5/5-project-memory/blackbox5/plans/archived/`

```bash
if [ -d ".blackbox/.plans/_archive" ]; then
  cp -r .blackbox/.plans/_archive/* blackbox5/5-project-memory/blackbox5/plans/archived/
fi
```

---

## 📦 **Phase 3: Migrate Research Modules**

### Task 3.1: Migrate Deep Research

**Source:** `.blackbox/3-modules/research/deepresearch/`
**Destination:** `blackbox5/5-project-memory/blackbox5/knowledge/research/deepresearch/`

```bash
# Already done in previous migration
# Files are already in place
```

### Task 3.2: Migrate OSS Catalog

**Source:** `.blackbox/3-modules/research/oss-catalog/`
**Destination:** `blackbox5/5-project-memory/blackbox5/knowledge/research/oss-catalog/`

```bash
# Already done in previous migration
# Files are already in place
```

---

## 📦 **Phase 4: Migrate Agent System

### Task 4.1: Migrate Skills (.1-agents/.skills/)

**Source:** `.blackbox/1-agents/.skills/`
**Destination:** `blackbox5/5-project-memory/blackbox5/agents/skills/`

**Note:** Blackbox5 has a different skills architecture (02-agents/capabilities/). We'll copy as reference but may need reorganization.

```bash
cp -r .blackbox/1-agents/.skills/* blackbox5/5-project-memory/blackbox5/agents/legacy-skills/
```

### Task 4.2: Migrate Agent Definitions (.1-agents/)

**Source:** `.blackbox/1-agents/4-specialists/`
**Destination:** `blackbox5/5-project-memory/blackbox5/agents/legacy-agents/`

```bash
cp -r .blackbox/1-agents/4-specialists/* blackbox5/5-project-memory/blackbox5/agents/legacy-agents/
```

### Task 4.3: Migrate Agent Sessions

**Source:** `.blackbox/1-agents/4-specialists/lumelle-*/` and `.blackbox/1-agents/5-enhanced/ralph-agent/session-*/`
**Destination:** `blackbox5/5-project-memory/blackbox5/memory/working/agents/sessions/`

```bash
mkdir -p blackbox5/5-project-memory/blackbox5/memory/working/agents/sessions
cp -r .blackbox/1-agents/4-specialists/lumelle-*/ blackbox5/5-project-memory/blackbox5/memory/working/agents/sessions/
cp -r .blackbox/1-agents/5-enhanced/ralph-agent/session-*/ blackbox5/5-project-memory/blackbox5/memory/working/agents/sessions/
```

---

## 📦 **Phase 5: Migrate Scripts & Tools**

### Task 5.1: Migrate Core Scripts (.4-scripts/)

**Source:** `.blackbox/4-scripts/`
**Destination:** `blackbox5/5-project-memory/blackbox5/tools/legacy-scripts/`

```bash
cp -r .blackbox/4-scripts/* blackbox5/5-project-memory/blackbox5/tools/legacy-scripts/
```

### Task 5.2: Migrate Demo & Status Scripts

**Source:** `.blackbox/*.sh` (demo-agent-workflow.sh, search-memory, etc.)
**Destination:** `blackbox5/tools/`

```bash
cp -r .blackbox/demo-agent-workflow.sh .blackbox/search-memory-simple* .blackbox/semsearch blackbox5/tools/
```

---

## 📦 **Phase 6: Migrate Configuration & Templates**

### Task 6.1: Migrate Manifest & Config

**Source:** `.blackbox/manifest.yaml`
**Destination:** `blackbox5/config/legacy-manifest.yaml`

```bash
cp .blackbox/manifest.yaml blackbox5/config/legacy-manifest.yaml
cp .blackbox/.gitignore blackbox5/config/
```

### Task 6.2: Migrate Core Templates (.5-templates/)

**Source:** `.blackbox/5-templates/`
**Destination:** `blackbox5/5-project-memory/blackbox5/templates/legacy-templates/`

```bash
cp -r .blackbox/5-templates/* blackbox5/5-project-memory/blackbox5/templates/legacy-templates/
```

---

## 📦 **Phase 7: Migrate Documentation**

### Task 7.1: Migrate Core Documentation

**Source:** `.blackbox/README.md`, `.blackbox/SETUP-GUIDE.md`, `.blackbox/BRAIN-ARCHITECTURE-v2.md`
**Destination:** `blackbox5/5-project-memory/blackbox5/docs/legacy-blackbox4/`

```bash
mkdir -p blackbox5/5-project-memory/blackbox5/docs/legacy-blackbox4/
cp .blackbox/README.md blackbox5/5-project-memory/blackbox5/docs/legacy-blackbox4/
cp .blackbox/SETUP-GUIDE.md blackbox5/5-project-memory/blackbox5/docs/legacy-blackbox4/
cp .blackbox/BRAIN-ARCHITECTURE-v2.md blackbox5/5-project-memory/blackbox5/docs/legacy-blackbox4/
```

### Task 7.2: Migrate Quick Reference

**Source:** `.blackbox/QUICK-REF.txt`
**Destination:** `blackbox5/5-project-memory/blackbox5/docs/legacy-blackbox4/QUICK-REF.txt`

```bash
cp .blackbox/QUICK-REF.txt blackbox5/5-project-memory/blackbox5/docs/legacy-blackbox4/QUICK-REF.txt
```

---

## 📦 **Phase 8: Create Migration Manifest

### Task 8.1: Generate Inventory Manifest

Create `blackbox5/MIGRATION-MANIFEST.md` with:

```markdown
# Blackbox4 → Blackbox5 Complete Migration

**Migration Date:** [DATE]
**Total Items Migrated:** [COUNT]

## Migration Inventory

### Memory System
- Working Memory: [N] files
- Extended Memory: ChromaDB vector store
- Archival Memory: [N] files

### Plans System
- Active Plans: [N] plans
- Archived Plans: [N] plans

### Research System
- Deep Research: [N] files
- OSS Catalog: [N] files

### Agent System
- Skills: [N] skills
- Agent Definitions: [N] agents
- Sessions: [N] sessions

### Scripts & Tools
- Core Scripts: [N] scripts
- Demo Scripts: [N] scripts

### Documentation
- Core Docs: [N] files
- Quick Reference: 1 file
```

---

## 📦 **Phase 9: Verification**

### Task 9.1: Verify Nothing Lost

```bash
# Count files before and after migration
echo "Blackbox4 files:"
find .blackbox -type f | wc -l
echo "Blackbox5 files:"
find blackbox5/5-project-memory/blackbox5 -type f | wc -l

# Verify specific critical files exist
for file in .blackbox/.memory/working/shared/journal.md .blackbox/.memory/working/shared/tasks.md; do
  if [ ! -f "blackbox5/5-project-memory/blackbox5/memory/working/shared/$(basename $file)" ]; then
    echo "⚠️ MISSING: $file"
  fi
done
```

### Task 9.2: Test Blackbox5 with Migrated Data

```bash
# Start Blackbox5
cd blackbox5
./start.sh

# Test that migrated content is accessible
curl -X POST http://localhost:8000/chat -H "Content-Type: application/json" -d '{"message": "What is our systematic refactoring plan?"}'
```

---

## 📦 **Phase 10: Archive or Remove Blackbox4**

### Task 10.1: Archive Blackbox4 Directory

**CRITICAL:** Only execute after full verification!

```bash
# Rename instead of delete (safer)
mv .blackbox .blackbox4-archive
```

### Task 10.2: Create Archive Notice

Create `.blackbox4-archive/README.md`:

```markdown
# Blackbox4 - Archived

**Archived:** 2026-01-26
**Reason:** Full migration to Blackbox5
**Location:** `.blackbox4-archive/`
**Access:** This directory is preserved as historical reference only.

**Note:** Blackbox5 is now the active system. All new work should use Blackbox5.

**How to Access:**
```bash
# Read old documentation
cat .blackbox4-archive/README.md

# Use old semantic search (if needed)
.blackbox4-archive/search-memory-simple "query"
```

---

## ⚠️ **Migration Considerations**

### Data Format Differences

| Blackbox4 | Blackbox5 | Migration Strategy |
|-------------|-------------|-------------------|
| **Memory** | 3-tier (working/extended/archival) | 6 advanced systems | Keep ChromaDB, migrate to Enhanced Production Memory gradually |
| **Plans** | Markdown in .plans/ | Migrated to 5-project-memory/plans/ | Direct copy, keep structure |
| **Research** | Flat file structure | Organized in knowledge/ | Direct copy, reorganize as needed |
| **Agents** | 33 skills in .skills/ | Skills in 02-agents/capabilities/ | Copy to legacy-skills/ for reference |
| **Tasks** | Manual tracking in tasks.md | Hierarchical JSON + Vibe Kanban | Copy JSON, track via Vibe Kanban |

### Blackbox5 Features to Leverage

1. **Enhanced Production Memory** - 90% token reduction with semantic retrieval
2. **Knowledge Brain** - Neo4j graph database for complex queries
3. **Three Core Agents** - Architect, Developer, Analyst
4. **Vibe Kanban Integration** - Task management
5. **Self-Improving Autonomous Agents** - Ralph Loop architecture
6. **Safety Systems** - KillSwitch, SafeMode, Constitutional Classifier

---

## ✅ **Success Criteria**

Migration is complete when:
- [ ] All 10 phases completed
- [ ] Migration manifest created
- [ ] Verification passed (no data loss)
- [ ] Blackbox5 tested with migrated data
- [ ] Blackbox4 archived (not deleted)
- [ ] Archive notice created
- [ ] This document updated with actual migration statistics

---

**Next Action:** Execute Phase 0 (Pre-Migration Preparation) - Create backup and identify all content.

**Last Updated:** 2026-01-26
**Status:** ⚠️ **Plan Created - Awaiting Execution**
