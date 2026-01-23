#!/usr/bin/env python3
"""
Convert Brain Dump to Kanban Cards
Parse your brain-dump.md and create organized Kanban cards.
"""

import sys
import os
from pathlib import Path
import json
import re
from datetime import datetime

os.chdir('/Users/shaansisodia/DEV/client-projects/lumelle')

print("🎯 Converting Brain Dump to Kanban Cards")
print("=" * 70)
print()

# Load brain dump
braindump_file = Path(".blackbox/.plans/brain-dump.md")

if not braindump_file.exists():
    print("❌ Brain dump not found!")
    print(f"   Run: python3 .blackbox/.plans/braindump.py")
    sys.exit(1)

with open(braindump_file, 'r') as f:
    content = f.read()

print("📝 Parsing brain dump...")
print()

# Parse sections and create cards
cards_by_type = {
    "feature": [],
    "research": [],
    "ui_improvement": [],
    "bug": [],
    "refactor": [],
    "documentation": [],
    "performance": [],
    "security": [],
    "testing": [],
    "other": []
}

# Mapping of emoji to card type
emoji_mapping = {
    "🎨": "feature",
    "🔬": "research",
    "✨": "ui_improvement",
    "🐛": "bug",
    "🔧": "refactor",
    "📚": "documentation",
    "⚡": "performance",
    "🔒": "security",
    "🧪": "testing",
    "🎯": "other"
}

# Parse the brain dump
current_type = None
current_section = None

for line in content.split('\n'):
    # Check for section headers (emoji + category)
    for emoji, card_type in emoji_mapping.items():
        if emoji in line and "##" in line:
            current_section = line.replace("##", "").strip()
            current_type = card_type
            break

    # Check for task items (- [ ] or - [x])
    if line.strip().startswith("- [ ]") or line.strip().startswith("- [x]"):
        # Extract the task
        task_text = re.sub(r'^-\s+\[[ x]\]\s+', '', line.strip())

        # Determine priority based on context
        priority = "medium"
        if "Critical" in content[max(0, content.find(line)-200):content.find(line)]:
            priority = "critical"
        elif "High" in content[max(0, content.find(line)-200):content.find(line)]:
            priority = "high"
        elif "Low" in content[max(0, content.find(line)-200):content.find(line)]:
            priority = "low"
        elif "Do First" in content[max(0, content.find(line)-200):content.find(line)]:
            priority = "critical"
        elif "Quick Wins" in content[max(0, content.find(line)-200):content.find(line)]:
            priority = "high"
        elif "Nice to have" in content[max(0, content.find(line)-200):content.find(line)]:
            priority = "low"

        # Estimate based on task description
        estimate = "TBD"
        if any(x in task_text.lower() for x in ["quick", "simple", "small", "minor", "typo"]):
            estimate = "2-4 hours"
        elif any(x in task_text.lower() for x in ["cleanup", "update", "fix", "improve"]):
            estimate = "1-2 days"
        elif any(x in task_text.lower() for x in ["refactor", "redesign", "implement"]):
            estimate = "3-5 days"
        elif any(x in task_text.lower() for x in ["build", "create", "develop"]):
            estimate = "5-10 days"

        # Create card
        card = {
            "title": task_text,
            "type": current_type or "other",
            "category": current_section or "General",
            "priority": priority,
            "estimate": estimate,
            "completed": line.strip().startswith("- [x]"),
            "context": ""
        }

        cards_by_type[current_type or "other"].append(card)

# Summary
total_cards = sum(len(cards) for cards in cards_by_type.values())
completed_cards = sum(sum(1 for c in cards if c.get("completed", False)) for cards in cards_by_type.values())

print(f"📊 Brain Dump Analysis")
print(f"   Total Ideas: {total_cards}")
print(f"   Completed: {completed_cards}")
print(f"   Remaining: {total_cards - completed_cards}")
print()

print("📋 Breakdown by Type:")
for card_type, cards in cards_by_type.items():
    if cards:
        completed = sum(1 for c in cards if c.get("completed", False))
        print(f"   {card_type:20} {len(cards):3} cards ({completed} done)")
print()

# Show top items from each category
print("=" * 70)
print("🎯 TOP PRIORITY ITEMS (Not Completed)")
print("=" * 70)
print()

priority_order = ["critical", "high", "medium", "low"]
for priority in priority_order:
    print(f"🔴 {priority.upper()} Priority:")
    found = False
    for card_type, cards in cards_by_type.items():
        for card in cards:
            if card["priority"] == priority and not card.get("completed", False):
                if not found:
                    found = True
                print(f"   [{card['type']}] {card['title']}")
                print(f"      Category: {card['category']}")
                print(f"      Estimate: {card['estimate']}")
                print()
    if found:
        print()

# Save parsed cards
output_file = Path(".blackbox/.plans/brain-dump-cards.json")
with open(output_file, 'w') as f:
    json.dump({
        "generated_at": datetime.now().isoformat(),
        "total_cards": total_cards,
        "completed_cards": completed_cards,
        "cards_by_type": cards_by_type
    }, f, indent=2)

print(f"💾 Parsed cards saved to: {output_file}")
print()

print("=" * 70)
print("✅ BRAIN DUMP CONVERSION COMPLETE!")
print("=" * 70)
print()

print("🚀 Next Steps:")
print()
print("1. Add these cards to Kanban board:")
print("   python3 .blackbox/.plans/braindump-to-kanban.py")
print()
print("2. Or manually select tasks for your sprint:")
print("   python3 .blackbox/.plans/plan-sprint.py")
print()
print("3. View and edit your brain dump:")
print(f"   code {braindump_file}")
print()
