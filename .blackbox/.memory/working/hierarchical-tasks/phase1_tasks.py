#!/usr/bin/env python3
"""
Generate hierarchical task structures for Phase 1 critical issues.
"""

import sys
import os

# Change to project root and add to path
os.chdir('/Users/shaansisodia/DEV/client-projects/lumelle')
sys.path.insert(0, '.blackbox/4-scripts/lib/hierarchical-tasks')

from hierarchical_task import HierarchicalTask

def create_task(description, expected_output="", parent=None):
    """Helper to create a hierarchical task."""
    return HierarchicalTask(
        description=description,
        expected_output=expected_output,
        parent_task=parent
    )
import json
from pathlib import Path

# Issue #193: CartContext.tsx Refactoring
issue_193 = HierarchicalTask(
    description="Issue #193: CartContext.tsx Refactoring",
    expected_output="CartContext reduced from 562 to <300 lines with proper separation of concerns",
    metadata={
        'priority': 'P0',
        'estimated_days': '8-12',
        'phase': 'Phase 1',
        'issue_number': 193,
        'current_lines': 562,
        'target_lines': 300
    }
)

# Subtasks for Issue #193
create_task("Analyze CartContext dependencies and usage patterns", parent=issue_193)
create_task("Extract cart state management into separate contexts", parent=issue_193)
create_task("Create cart operations module (add, remove, update)", parent=issue_193)
create_task("Create cart calculations module (totals, discounts, taxes)", parent=issue_193)
create_task("Refactor CartContext to use new modules", parent=issue_193)
create_task("Update all components consuming CartContext", parent=issue_193)
create_task("Add unit tests for new modules", parent=issue_193)
create_task("Add integration tests for cart flows", parent=issue_193)
create_task("Performance testing and optimization", parent=issue_193)
create_task("Documentation updates", parent=issue_193)

# Issue #194: Analytics Domain Migration
issue_194 = HierarchicalTask(
    description="Issue #194: Analytics Domain Migration",
    expected_output="Analytics tracking migrated to correct domain with verified data",
    metadata={
        'priority': 'P0',
        'estimated_days': '7-12',
        'phase': 'Phase 1',
        'issue_number': 194,
        'problem': 'Analytics tracking on wrong domain'
    }
)

# Subtasks for Issue #194
create_task("Audit all analytics events and tracking calls", parent=issue_194)
create_task("Identify correct domain configuration", parent=issue_194)
create_task("Update analytics provider configuration", parent=issue_194)
create_task("Migrate event tracking to correct domain", parent=issue_194)
create_task("Test event tracking on development", parent=issue_194)
create_task("Test event tracking on staging", parent=issue_194)
create_task("Verify data in analytics dashboard", parent=issue_194)
create_task("Update documentation", parent=issue_194)
create_task("Monitor for 1 week post-deployment", parent=issue_194)
create_task("Create migration rollback plan", parent=issue_194)

# Issue #195: DrawerProvider Split
issue_195 = HierarchicalTask(
    description="Issue #195: DrawerProvider Split",
    expected_output="DrawerProvider split into focused, single-responsibility providers",
    metadata={
        'priority': 'P0',
        'estimated_days': 'TBD',
        'phase': 'Phase 1',
        'issue_number': 195,
        'current_lines': 860
    }
)

# Subtasks for Issue #195
create_task("Analyze DrawerProvider responsibilities", parent=issue_195)
create_task("Identify separate concerns (cart drawer, menu drawer, etc.)", parent=issue_195)
create_task("Create individual drawer providers", parent=issue_195)
create_task("Migrate components to new providers", parent=issue_195)
create_task("Remove old DrawerProvider", parent=issue_195)
create_task("Test all drawer interactions", parent=issue_195)
create_task("Performance testing", parent=issue_195)
create_task("Documentation updates", parent=issue_195)

# Issue #196: TypeScript Configuration
issue_196 = HierarchicalTask(
    description="Issue #196: TypeScript Configuration",
    expected_output="Proper TypeScript configuration with strict type checking",
    metadata={
        'priority': 'P0',
        'estimated_days': '2-3',
        'phase': 'Phase 1',
        'issue_number': 196
    }
)

# Subtasks for Issue #196
create_task("Audit current TypeScript configuration", parent=issue_196)
create_task("Identify configuration issues", parent=issue_196)
create_task("Update tsconfig.json with proper settings", parent=issue_196)
create_task("Fix type errors throughout codebase", parent=issue_196)
create_task("Add stricter type checking rules", parent=issue_196)
create_task("Update build scripts", parent=issue_196)
create_task("Test build process", parent=issue_196)
create_task("Update CI/CD pipelines", parent=issue_196)

# Issue #197: localStorage Key Management
issue_197 = HierarchicalTask(
    description="Issue #197: localStorage Key Management",
    expected_output="Centralized, namespaced localStorage key management",
    metadata={
        'priority': 'P0',
        'estimated_days': '4-6 hours',
        'phase': 'Phase 1',
        'issue_number': 197
    }
)

# Subtasks for Issue #197
create_task("Audit all localStorage usage", parent=issue_197)
create_task("Create centralized key management", parent=issue_197)
create_task("Replace hardcoded keys with constants", parent=issue_197)
create_task("Add key prefixing for namespacing", parent=issue_197)
create_task("Add type safety for localStorage values", parent=issue_197)
create_task("Test localStorage operations", parent=issue_197)
create_task("Documentation updates", parent=issue_197)

# Issue #198: Platform Commerce Runtime
issue_198 = HierarchicalTask(
    description="Issue #198: Platform Commerce Runtime",
    expected_output="Fixed platform commerce runtime configuration",
    metadata={
        'priority': 'P0',
        'estimated_days': '4-6 hours',
        'phase': 'Phase 1',
        'issue_number': 198
    }
)

# Subtasks for Issue #198
create_task("Identify platform commerce runtime issues", parent=issue_198)
create_task("Fix runtime configuration", parent=issue_198)
create_task("Add error handling", parent=issue_198)
create_task("Test commerce platform integration", parent=issue_198)
create_task("Add monitoring and logging", parent=issue_198)
create_task("Documentation updates", parent=issue_198)

# Issue #199: Debug Code Cleanup
issue_199 = HierarchicalTask(
    description="Issue #199: Debug Code Cleanup",
    expected_output="All debug code removed, proper logging in place",
    metadata={
        'priority': 'P0',
        'estimated_days': '2-3 hours',
        'phase': 'Phase 1',
        'issue_number': 199
    }
)

# Subtasks for Issue #199
create_task("Search for console.log statements", parent=issue_199)
create_task("Search for debugger statements", parent=issue_199)
create_task("Remove all debug code", parent=issue_199)
create_task("Add proper logging where needed", parent=issue_199)
create_task("Test functionality after cleanup", parent=issue_199)

# Issue #200: Volume Discount Duplication
issue_200 = HierarchicalTask(
    description="Issue #200: Volume Discount Duplication",
    expected_output="Single source of truth for volume discount logic",
    metadata={
        'priority': 'P0',
        'estimated_days': '4-6 hours',
        'phase': 'Phase 1',
        'issue_number': 200
    }
)

# Subtasks for Issue #200
create_task("Identify duplicate volume discount logic", parent=issue_200)
create_task("Consolidate into single source of truth", parent=issue_200)
create_task("Update all references", parent=issue_200)
create_task("Add unit tests for discount calculations", parent=issue_200)
create_task("Test discount application", parent=issue_200)
create_task("Documentation updates", parent=issue_200)

# Create root task for Phase 1
phase1_root = HierarchicalTask(
    description="Phase 1: Critical Issues Resolution",
    expected_output="All 8 critical issues resolved with tests and documentation",
    metadata={
        'phase': 'Phase 1',
        'duration': 'Weeks 1-4',
        'total_issues': 8,
        'priority_level': 'P0'
    }
)

# Add all issues as children of Phase 1
phase1_root.add_child(issue_193)
phase1_root.add_child(issue_194)
phase1_root.add_child(issue_195)
phase1_root.add_child(issue_196)
phase1_root.add_child(issue_197)
phase1_root.add_child(issue_198)
phase1_root.add_child(issue_199)
phase1_root.add_child(issue_200)

# Save to JSON
output_dir = Path('.blackbox/.memory/working/hierarchical-tasks')
output_dir.mkdir(parents=True, exist_ok=True)

# Save each issue
issues = [issue_193, issue_194, issue_195, issue_196, issue_197, issue_198, issue_199, issue_200]

for issue in issues:
    issue_data = issue.to_dict()
    issue_number = issue.metadata.get('issue_number', 'unknown')
    output_file = output_dir / f'issue-{issue_number}.json'
    with open(output_file, 'w') as f:
        json.dump(issue_data, f, indent=2, default=str)
    print(f"✅ Saved Issue #{issue_number} to {output_file}")

# Save Phase 1 root
phase1_data = phase1_root.to_dict()
phase1_file = output_dir / 'phase1-root.json'
with open(phase1_file, 'w') as f:
    json.dump(phase1_data, f, indent=2, default=str)
print(f"✅ Saved Phase 1 root to {phase1_file}")

# Generate checklist
checklist_file = output_dir / 'phase1-checklist.md'
with open(checklist_file, 'w') as f:
    f.write("# Phase 1: Critical Issues - Task Checklist\n\n")
    f.write(phase1_root.to_checklist_item() + "\n\n")
    for issue in issues:
        f.write(issue.to_checklist_item() + "\n")
        for child in issue.children:
            f.write(child.to_checklist_item() + "\n")
        f.write("\n")

print(f"✅ Saved checklist to {checklist_file}")

# Print summary
print("\n" + "="*60)
print("📋 PHASE 1 HIERARCHICAL TASKS SUMMARY")
print("="*60)
print(f"Total Issues: {len(issues)}")
print(f"Total Subtasks: {sum(len(issue.children) for issue in issues)}")
print("\nBreakdown by issue:")
for issue in issues:
    issue_number = issue.metadata.get('issue_number', 'unknown')
    estimated = issue.metadata.get('estimated_days', 'TBD')
    print(f"  Issue #{issue_number}: {len(issue.children)} subtasks ({estimated})")
print("\n" + "="*60)
