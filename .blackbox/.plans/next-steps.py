#!/usr/bin/env python3
"""
Show next actionable tasks.

When you ask "what's next", this shows:
1. The specific task to work on
2. Steps to execute
3. Test criteria
4. Which agent to use
"""

import json
import sys
from pathlib import Path

# Add paths
sys.path.insert(0, '.blackbox/3-modules/kanban')
from board import KanbanBoard

def get_next_task():
    """Get the next task to work on."""
    board = KanbanBoard("lumelle-refactoring")

    # Priority order: todo > backlog > in_progress
    priority_columns = ["todo", "backlog", "in_progress"]

    for column_id in priority_columns:
        column = board.columns[column_id]
        if not column["card_ids"]:
            continue

        # Get first card in column
        card_id = column["card_ids"][0]
        card = board.cards[card_id]

        return card, column_id

    return None, None

def display_next_task():
    """Display the next task to work on."""
    card, column_id = get_next_task()

    if not card:
        print("🎉 No tasks in backlog!")
        return

    # Get metadata
    metadata = card.get("metadata", {})

    # Print task header
    print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    print(f"🎯 NEXT TASK: {card['title']}")
    print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    print()

    # Print description
    if card.get("description"):
        print(f"📋 DESCRIPTION:")
        print(f"   {card['description']}")
        print()

    # Print what section
    print("📋 WHAT:")
    if "phase" in metadata:
        print(f"   Phase {metadata['phase']} task")
    if "category" in metadata:
        category_emoji = {
            "audit": "🔍",
            "testing": "🧪",
            "documentation": "📚"
        }.get(metadata["category"], "📌")
        print(f"   {category_emoji} {metadata['category'].title()}")
    print()

    # Print steps if checklist exists
    if card.get("checklist"):
        print("👣 STEPS:")
        steps = [item for item in card["checklist"] if not item.get("text", "").startswith("✓")]
        test_criteria_start = None

        for i, item in enumerate(steps):
            text = item.get("text", "")
            if text.startswith("--- Test Criteria ---"):
                test_criteria_start = i
                break

            checked = "✅" if item.get("checked") else "⬜"
            print(f"   {checked} {text}")

        print()

        # Print test criteria
        if test_criteria_start is not None:
            print("✅ TEST CRITERIA:")
            for item in steps[test_criteria_start + 1:]:
                text = item.get("text", "")
                if text.startswith("✓ "):
                    checked = "✅" if item.get("checked") else "⬜"
                    print(f"   {checked} {text[2:]}")
            print()

    # Print agents
    if "agents" in metadata:
        print("🤖 AGENTS:")
        for agent in metadata["agents"]:
            agent_info = {
                "architect": "Planning & architecture review",
                "qa-agent": "Create test plan and verify",
                "dev-agent": "Implement fixes",
                "performance": "Optimize performance",
                "security": "Security audit"
            }
            print(f"   1. {agent} → {agent_info.get(agent, 'Execute task')}")
        print()

    # Print estimated time
    if "estimated" in metadata:
        print(f"📊 ESTIMATED: {metadata['estimated']}")
        print()

    # Print files to check
    if "files_to_check" in metadata:
        print("📁 FILES TO CHECK:")
        for file_path in metadata["files_to_check"]:
            print(f"   - {file_path}")
        print()

    # Print output
    if "output" in metadata:
        print(f"📤 OUTPUT: {metadata['output']}")
        print()

    # Print context
    print("📋 CONTEXT:")
    print(f"   Card ID: {card['id']}")
    print(f"   Column: {column_id}")
    print(f"   Priority: {card['priority'].upper()}")
    if card.get("labels"):
        print(f"   Labels: {', '.join(card['labels'])}")
    print()

    # Print success
    print("✨ SUCCESS:")
    if "category" in metadata and metadata["category"] == "testing":
        print("   All test criteria pass. Feature works correctly.")
    elif "category" in metadata and metadata["category"] == "audit":
        print("   Documentation created. Ready for next phase.")
    else:
        print("   Task completed. Ready for review.")
    print()

    print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    print(f"Start this task? (Move to 'in_progress')")
    print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

if __name__ == "__main__":
    display_next_task()
