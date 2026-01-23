#!/usr/bin/env python3
"""
Interactive Brain Dump - Quickly capture your ideas
"""

import sys
import os
from pathlib import Path
from datetime import datetime

os.chdir('/Users/shaansisodia/DEV/client-projects/lumelle')

print("🧠 INTERACTIVE BRAIN DUMP")
print("=" * 70)
print()
print("Type your ideas one at a time. Press Enter to save, 'q' to quit.")
print()

braindump_file = Path(".blackbox/.plans/brain-dump.md")

# Load existing content
if braindump_file.exists():
    with open(braindump_file, 'r') as f:
        existing_content = f.read()
else:
    existing_content = "# 🧠 Brain Dump\n\n"

# Show categories
print("Categories (use number or type name):")
categories = {
    "1": ("feature", "🎨", "Features"),
    "2": ("research", "🔬", "Research"),
    "3": ("ui", "✨", "UI Improvements"),
    "4": ("bug", "🐛", "Bugs"),
    "5": ("refactor", "🔧", "Refactoring"),
    "6": ("docs", "📚", "Documentation"),
    "7": ("performance", "⚡", "Performance"),
    "8": ("security", "🔒", "Security"),
    "9": ("testing", "🧪", "Testing"),
    "10": ("other", "🎯", "Other")
}

for num, (key, emoji, name) in [(k, v) for k, v in categories.items()]:
    print(f"   {num}. {emoji} {name}")
print()

# Buffer for new ideas
new_ideas = []

print("Start typing your ideas! (or 'q' to quit)")
print()

while True:
    try:
        # Get category
        category_input = input("Category (number or name): ").strip()

        if category_input.lower() == 'q':
            break

        # Resolve category
        if category_input in categories:
            category_key, category_emoji, category_name = categories[category_input]
        elif category_input.lower() in [v[0] for v in categories.values()]:
            for key, val in categories.items():
                if val[0] == category_input.lower():
                    category_key, category_emoji, category_name = val
                    break
        else:
            print("❌ Unknown category. Using 'Other'")
            category_key, category_emoji, category_name = categories["10"]

        # Get idea
        idea = input(f"{category_emoji} Your idea: ").strip()

        if not idea:
            continue

        if idea.lower() == 'q':
            break

        # Get priority
        priority_input = input("Priority (1=high, 2=medium, 3=low) [Enter=medium]: ").strip()
        priority_map = {"1": "high", "2": "medium", "3": "low", "": "medium"}
        priority = priority_map.get(priority_input, "medium")

        # Add to buffer
        new_ideas.append({
            "category": category_name,
            "category_key": category_key,
            "emoji": category_emoji,
            "idea": idea,
            "priority": priority,
            "timestamp": datetime.now().isoformat()
        })

        print(f"   ✅ Saved: {idea}")
        print()

    except KeyboardInterrupt:
        break

# Append to brain dump file
if new_ideas:
    # Group by category
    ideas_by_category = {}
    for idea in new_ideas:
        cat = idea["category"]
        if cat not in ideas_by_category:
            ideas_by_category[cat] = []
        ideas_by_category[cat].append(idea)

    # Build content to append
    append_content = f"\n\n## 📝 New Brain Dump ({datetime.now().strftime('%Y-%m-%d %H:%M')})\n\n"

    for category, ideas in ideas_by_category.items():
        append_content += f"### {category}\n\n"
        for idea in ideas:
            priority_emoji = {"high": "🔴", "medium": "🟡", "low": "🟢"}.get(idea["priority"], "🟡")
            append_content += f"- [ ] {priority_emoji} {idea['idea']}\n"
        append_content += "\n"

    # Append to file
    with open(braindump_file, 'a') as f:
        f.write(append_content)

    print("=" * 70)
    print(f"✅ Saved {len(new_ideas)} ideas to brain dump!")
    print(f"   Location: {braindump_file}")
    print()

    print("📊 Summary:")
    for category, ideas in ideas_by_category.items():
        print(f"   {category}: {len(ideas)} ideas")
    print()

    print("🚀 Next Steps:")
    print()
    print("1. View your brain dump:")
    print(f"   cat {braindump_file}")
    print()
    print("2. Convert to Kanban cards:")
    print("   python3 .blackbox/.plans/braindump-to-kanban.py")
    print()
else:
    print("No ideas captured. Exiting...")
