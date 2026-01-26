# Lumelle - Blackbox5 Memory System

**READ THIS FIRST** - This document tells you how to use the Blackbox5 memory system for this project.

---

## Quick Check: Should You Use Blackbox5?

**Use Blackbox5 for:**
- Multi-agent workflows (2+ agents working together)
- Complex planning (architecture, PRDs, epic breakdown)
- Research tasks ( STACK analysis, competitive analysis)
- Tasks that need persistent memory across sessions

**Skip Blackbox5 for:**
- Simple file edits (just use @file references)
- Quick questions (ask directly)
- Single-shot bug fixes
- Git operations (use standard commands)

---

## What is Blackbox5?

Blackbox5 is a **multi-agent orchestration system** with **persistent project memory**.

**Key Benefits:**
- Multiple agents can work on the same task and share context
- All decisions, research, and tasks are persisted to `blackbox5/5-project-memory/lumelle/`
- Session-agnostic: any agent can pick up where another left off
- Automatic timeline tracking and changelog

---

## Project Memory Structure

```
blackbox5/5-project-memory/lumelle/
├── operations/          # Session tracking and logs
│   ├── sessions/       # Session transcripts and metrics
│   └── session-log.txt # Session history log
├── project/            # Project identity and direction
│   ├── _meta/         # Meta configuration files
│   └── timeline.yaml  # Phases, milestones, changelog
└── tasks/              # What we're working on
    ├── working/        # Currently in progress
    ├── completed/      # Finished tasks
    └── active/         # Active task reference files
```

---

## How to Use This System

### Step 1: Read Current State

ALWAYS start by reading the project state:

```bash
# Read timeline (what happened? what's next?)
Read blackbox5/5-project-memory/lumelle/project/timeline.yaml

# Check session log (recent activity)
Read blackbox5/5-project-memory/lumelle/operations/session-log.txt
```

### Step 2: Check for Active Tasks

```bash
# List working tasks
Glob blackbox5/5-project-memory/lumelle/tasks/working/*/

# List active task references
Glob blackbox5/5-project-memory/lumelle/tasks/active/*

# Read the plan for the current task
Read blackbox5/5-project-memory/lumelle/tasks/working/[task-name]/plan.md
```

### Step 3: Work on Tasks

When working on a task:

1. **Read the task plan** first
2. **Update task status** as you progress:
   - Move from `working/` to `completed/` when done
3. **Update timeline** when milestones are reached
4. **Log to session-log.txt** with your session summary

### Step 4: Persist Session Memory

At the end of your session:
- Move completed tasks to `tasks/completed/`
- Update `project/timeline.yaml` with any milestones
- Append session summary to `operations/session-log.txt`

---

## Agent Specialists

The Lumelle project can use specialized agents for different work types:

| Agent | Role | When to Use |
|-------|------|-------------|
| **Planner** | Planning, documentation, research | "Create a plan for..." |
| **Mobile UI** | Mobile-specific implementation | "Fix this mobile layout..." |
| **Desktop UI** | Desktop-specific implementation | "Fix this desktop issue..." |

Ask the user which agent to use, or let them assign you a role.

---

## Important: Memory Persistence Rules

**ALWAYS:**
1. Read `timeline.yaml` before starting work
2. Read the task plan in `tasks/working/[task-name]/` before implementing
3. Move tasks to `completed/` when done
4. Update `timeline.yaml` when reaching milestones
5. Log your session to `session-log.txt`

**NEVER:**
1. Work on a task without reading its plan first
2. Leave completed tasks in `working/`
3. Make architecture changes without updating the timeline
4. Assume the next agent knows what you did

---

## Environment Variables

The system uses these paths (defaults shown):

- `BLACKBOX5_MEMORY_PATH` = `./blackbox5/5-project-memory/lumelle`
- `BLACKBOX5_ENGINE_PATH` = `./blackbox5/2-engine`

---

## Quick Reference Commands

```bash
# Check what's active
Glob blackbox5/5-project-memory/lumelle/tasks/working/*/

# Read the timeline
Read blackbox5/5-project-memory/lumelle/project/timeline.yaml

# Read a task plan
Read blackbox5/5-project-memory/lumelle/tasks/working/[task-name]/plan.md

# Move task to completed (use bash mv command)
mv blackbox5/5-project-memory/lumelle/tasks/working/[task-name] \
   blackbox5/5-project-memory/lumelle/tasks/completed/

# Update timeline (edit the file directly)
Read blackbox5/5-project-memory/lumelle/project/timeline.yaml
# Then use Edit tool to add milestones or update events
```

---

## Getting Help

If you're unsure:
1. Read the timeline (`project/timeline.yaml`) for recent work
2. Check `session-log.txt` for what other agents have done
3. Look at completed tasks in `tasks/completed/` for patterns
4. Ask the user for clarification

---

**Remember:** This system only works if you use it. Always read first, then update as you go.
