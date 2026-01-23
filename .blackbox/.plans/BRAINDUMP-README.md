# 🧠 Brain Dump System - Quick Start

## What is This?

A simple system to **dump all your ideas** out of your head and organize them into actionable tasks.

## 🚀 Quick Start

### Step 1: Brain Dump (5 minutes)

**Option A: Interactive (Recommended)**
```bash
python3 .blackbox/.plans/braindump-interactive.py
```
Then just type your ideas one by one:
1. Pick a category (1-10)
2. Type your idea
3. Pick priority (1=high, 2=medium, 3=low)
4. Repeat!

**Option B: Edit the file directly**
```bash
code .blackbox/.plans/brain-dump.md
```
Add your ideas under the appropriate sections.

### Step 2: Convert to Kanban Cards

```bash
python3 .blackbox/.plans/braindump-to-kanban.py
```

This will:
- Parse all your ideas
- Categorize them
- Assign priorities
- Estimate effort
- Save to JSON for processing

### Step 3: Plan Your Sprint

```bash
python3 .blackbox/.plans/plan-sprint.py
```

Select which tasks to work on this sprint.

## 📋 Categories

| # | Category | Emoji | Examples |
|---|----------|-------|----------|
| 1 | Features | 🎨 | New functionality to build |
| 2 | Research | 🔬 | Investigations, spikes, competitor analysis |
| 3 | UI Improvements | ✨ | Visual/UX enhancements |
| 4 | Bugs | 🐛 | Things that are broken |
| 5 | Refactoring | 🔧 | Code quality improvements |
| 6 | Documentation | 📚 | Docs and guides |
| 7 | Performance | ⚡ | Speed and optimization |
| 8 | Security | 🔒 | Security improvements |
| 9 | Testing | 🧪 | Test coverage |
| 10 | Other | 🎯 | Anything else |

## 💡 Tips

1. **Dump Everything**: Don't filter, don't organize, just get it out
2. **Be Specific**: Instead of "improve cart", say "add quantity stepper"
3. **Think Big**: Include wild ideas, moonshots, "nice to haves"
4. **Think Small**: Include quick wins, polish, bugs
5. **Review Regularly**: Update priorities, cross off done items

## 📊 Example Brain Dump Session

```
Category: 1
🎨 Your idea: Product wishlists
Priority: 1
✅ Saved: Product wishlists

Category: 3
✨ Your idea: Better product image gallery
Priority: 2
✅ Saved: Better product image gallery

Category: 4
🐛 Your idea: Fix cart drawer on mobile
Priority: 1
✅ Saved: Fix cart drawer on mobile
```

## 🔄 Workflow

```
Brain Dump → Categorize → Prioritize → Plan Sprint → Execute
     ↑                                                        ↓
     └────────────────────── Review & Update ──────────────────┘
```

## 📁 Files Created

- `brain-dump.md` - Your master list of ideas
- `brain-dump-cards.json` - Parsed cards ready for Kanban
- Kanban board will be updated with your cards

## 🎯 Next Steps

After brain dumping:
1. Review and prioritize your ideas
2. Select top 3 for your sprint
3. Convert to Kanban cards
4. Start executing!

---

**Remember**: The best brain dump is a complete brain dump. Get it ALL out! 🧠
