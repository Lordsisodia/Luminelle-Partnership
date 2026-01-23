#!/usr/bin/env python3
"""
Break down major goals into executable tasks.

Converts high-level goals like "Admin UI Finalization" into concrete,
actionable tasks that can be executed and tested.
"""

import json
import sys
from pathlib import Path

# Add paths
sys.path.insert(0, '.blackbox/3-modules/kanban')
from board import KanbanBoard, Priority

def load_executable_tasks():
    """Load executable task definitions."""
    return [
        # ===== PHASE 1: AUDIT & DASHBOARD =====
        {
            "title": "Task 1.1: Catalog All Admin Routes",
            "description": "Find and document every admin page route",
            "category": "audit",
            "phase": 1,
            "estimated_hours": 2,
            "steps": [
                "Search for all admin routes in codebase",
                "List all page files under /admin",
                "Document each route and its purpose",
                "Note any missing routes",
                "Create admin route map"
            ],
            "test_criteria": [
                "All admin routes documented",
                "Route map created",
                "Missing routes identified",
                "Purpose of each route clear"
            ],
            "agents": ["architect"],
            "files_to_check": ["apps/web/src/app/admin"],
            "output": "admin-routes-map.md"
        },
        {
            "title": "Task 1.2: Test Dashboard Page Load",
            "description": "Verify dashboard loads without errors",
            "category": "testing",
            "phase": 1,
            "estimated_hours": 2,
            "steps": [
                "Start dev server",
                "Navigate to /admin/dashboard",
                "Open browser console",
                "Check for errors",
                "Verify all widgets load",
                "Check data refresh works",
                "Test on mobile viewport"
            ],
            "test_criteria": [
                "Page loads in <3s",
                "No console errors",
                "All widgets display",
                "Data refreshes correctly",
                "Mobile layout works"
            ],
            "agents": ["qa-agent"],
            "files_to_check": ["apps/web/src/app/admin/dashboard"],
            "output": "dashboard-test-report.md"
        },
        {
            "title": "Task 1.3: Verify Dashboard Data Sources",
            "description": "Test all dashboard API endpoints",
            "category": "testing",
            "phase": 1,
            "estimated_hours": 3,
            "steps": [
                "Identify all dashboard API calls",
                "Test each endpoint directly",
                "Verify data structure matches",
                "Check error handling",
                "Test with sample data",
                "Verify authentication"
            ],
            "test_criteria": [
                "All endpoints return data",
                "Data structure correct",
                "Error handling works",
                "Auth required and enforced"
            ],
            "agents": ["qa-agent"],
            "files_to_check": ["apps/web/src/app/admin/dashboard", "apps/api/routes/admin"],
            "output": "dashboard-api-test-report.md"
        },

        # ===== PHASE 2: PRODUCTS MANAGEMENT =====
        {
            "title": "Task 2.1: Test Products Listing Page",
            "description": "Verify products list loads and filters work",
            "category": "testing",
            "phase": 2,
            "estimated_hours": 4,
            "steps": [
                "Navigate to /admin/products",
                "Verify products display",
                "Test pagination",
                "Test search functionality",
                "Test category filter",
                "Test status filter",
                "Test sorting",
                "Check responsive design",
                "Verify no console errors"
            ],
            "test_criteria": [
                "All products load",
                "Pagination works",
                "Search returns results",
                "Filters apply correctly",
                "Sorting works",
                "Mobile responsive",
                "No errors"
            ],
            "agents": ["qa-agent"],
            "files_to_check": ["apps/web/src/app/admin/products"],
            "output": "products-listing-test-report.md"
        },
        {
            "title": "Task 2.2: Test Product Creation Form",
            "description": "Verify new product can be created",
            "category": "testing",
            "phase": 2,
            "estimated_hours": 3,
            "steps": [
                "Navigate to /admin/products/new",
                "Fill in required fields",
                "Upload test image",
                "Add variants",
                "Set inventory",
                "Submit form",
                "Verify product created",
                "Check database",
                "Test validation errors"
            ],
            "test_criteria": [
                "Form validation works",
                "Image uploads successfully",
                "Variants save correctly",
                "Product appears in list",
                "Database record created",
                "Errors handled gracefully"
            ],
            "agents": ["qa-agent"],
            "files_to_check": ["apps/web/src/app/admin/products/new"],
            "output": "product-creation-test-report.md"
        },
        {
            "title": "Task 2.3: Test Product Edit Form",
            "description": "Verify existing product can be edited",
            "category": "testing",
            "phase": 2,
            "estimated_hours": 2,
            "steps": [
                "Open existing product",
                "Modify name",
                "Update price",
                "Change variants",
                "Upload new image",
                "Save changes",
                "Verify updates saved",
                "Check database",
                "Test cancel functionality"
            ],
            "test_criteria": [
                "Form pre-fills correctly",
                "Changes save properly",
                "Images update",
                "Variants modify correctly",
                "Cancel works without saving"
            ],
            "agents": ["qa-agent"],
            "files_to_check": ["apps/web/src/app/admin/products/edit"],
            "output": "product-edit-test-report.md"
        },

        # ===== PHASE 3: ORDERS MANAGEMENT =====
        {
            "title": "Task 3.1: Test Orders Listing Page",
            "description": "Verify orders list loads and filters work",
            "category": "testing",
            "phase": 3,
            "estimated_hours": 3,
            "steps": [
                "Navigate to /admin/orders",
                "Verify orders display",
                "Test pagination",
                "Test date range filter",
                "Test status filter",
                "Test customer search",
                "Verify order details",
                "Check responsive design"
            ],
            "test_criteria": [
                "All orders load",
                "Pagination works",
                "Date filter works",
                "Status filter works",
                "Search finds orders",
                "Order details accurate",
                "Mobile responsive"
            ],
            "agents": ["qa-agent"],
            "files_to_check": ["apps/web/src/app/admin/orders"],
            "output": "orders-listing-test-report.md"
        },
        {
            "title": "Task 3.2: Test Order Detail View",
            "description": "Verify order details display correctly",
            "category": "testing",
            "phase": 3,
            "estimated_hours": 2,
            "steps": [
                "Open specific order",
                "Verify line items display",
                "Check customer info",
                "Verify shipping address",
                "Check payment status",
                "Test status update",
                "Add order notes",
                "Send notification"
            ],
            "test_criteria": [
                "Line items accurate",
                "Customer info correct",
                "Shipping address accurate",
                "Payment status shows",
                "Status update works",
                "Notes save",
                "Notifications send"
            ],
            "agents": ["qa-agent"],
            "files_to_check": ["apps/web/src/app/admin/orders/[id]"],
            "output": "order-detail-test-report.md"
        },

        # ===== PHASE 4: CUSTOMERS MANAGEMENT =====
        {
            "title": "Task 4.1: Test Customers Listing",
            "description": "Verify customers list loads and search works",
            "category": "testing",
            "phase": 4,
            "estimated_hours": 2,
            "steps": [
                "Navigate to /admin/customers",
                "Verify customers display",
                "Test search by name",
                "Test search by email",
                "Test filters",
                "Check pagination",
                "Verify responsive design"
            ],
            "test_criteria": [
                "Customers load",
                "Name search works",
                "Email search works",
                "Filters apply",
                "Pagination works",
                "Mobile responsive"
            ],
            "agents": ["qa-agent"],
            "files_to_check": ["apps/web/src/app/admin/customers"],
            "output": "customers-listing-test-report.md"
        },
        {
            "title": "Task 4.2: Test Customer Detail View",
            "description": "Verify customer history displays correctly",
            "category": "testing",
            "phase": 4,
            "estimated_hours": 2,
            "steps": [
                "Open specific customer",
                "Verify customer info",
                "Check order history",
                "Verify total spent",
                "Test customer edit",
                "Add customer tags",
                "View customer analytics"
            ],
            "test_criteria": [
                "Info accurate",
                "Order history complete",
                "Total spent correct",
                "Edits save",
                "Tags apply",
                "Analytics display"
            ],
            "agents": ["qa-agent"],
            "files_to_check": ["apps/web/src/app/admin/customers/[id]"],
            "output": "customer-detail-test-report.md"
        },

        # ===== PHASE 5: CONTENT/PAGES MANAGEMENT =====
        {
            "title": "Task 5.1: Test Content Listing",
            "description": "Verify content pages list and manage",
            "category": "testing",
            "phase": 5,
            "estimated_hours": 2,
            "steps": [
                "Navigate to /admin/content",
                "Verify pages display",
                "Test page creation",
                "Test page editing",
                "Test rich text editor",
                "Upload images",
                "Test page preview",
                "Test publish workflow"
            ],
            "test_criteria": [
                "Pages list loads",
                "Create works",
                "Editor functions",
                "Images upload",
                "Preview works",
                "Publish workflow works"
            ],
            "agents": ["qa-agent"],
            "files_to_check": ["apps/web/src/app/admin/content"],
            "output": "content-management-test-report.md"
        },

        # ===== PHASE 6: SETTINGS PAGES =====
        {
            "title": "Task 6.1: Test Settings Pages",
            "description": "Verify all settings pages work",
            "category": "testing",
            "phase": 6,
            "estimated_hours": 3,
            "steps": [
                "Navigate to /admin/settings/general",
                "Test general settings save",
                "Navigate to /admin/settings/shipping",
                "Test shipping settings",
                "Navigate to /admin/settings/payments",
                "Test payment settings",
                "Navigate to /admin/settings/taxes",
                "Test tax settings",
                "Test email notifications",
                "Verify validation"
            ],
            "test_criteria": [
                "General settings save",
                "Shipping settings work",
                "Payment settings work",
                "Tax settings work",
                "Email settings save",
                "Validation works",
                "Changes persist"
            ],
            "agents": ["qa-agent"],
            "files_to_check": ["apps/web/src/app/admin/settings"],
            "output": "settings-test-report.md"
        },

        # ===== PHASE 7: ANALYTICS/REPORTS =====
        {
            "title": "Task 7.1: Test Analytics Pages",
            "description": "Verify analytics and reports work",
            "category": "testing",
            "phase": 7,
            "estimated_hours": 3,
            "steps": [
                "Navigate to /admin/analytics",
                "Verify sales report loads",
                "Test date range selector",
                "Check data accuracy",
                "Test export functionality",
                "Test customer analytics",
                "Test product analytics",
                "Verify chart displays"
            ],
            "test_criteria": [
                "Reports load",
                "Date filter works",
                "Data accurate",
                "Export works",
                "Customer analytics work",
                "Product analytics work",
                "Charts display"
            ],
            "agents": ["qa-agent"],
            "files_to_check": ["apps/web/src/app/admin/analytics"],
            "output": "analytics-test-report.md"
        },

        # ===== PHASE 8: API VERIFICATION =====
        {
            "title": "Task 8.1: Test Admin API Endpoints",
            "description": "Verify all admin API endpoints work",
            "category": "testing",
            "phase": 8,
            "estimated_hours": 4,
            "steps": [
                "List all admin API routes",
                "Test GET endpoints",
                "Test POST endpoints",
                "Test PUT/PATCH endpoints",
                "Test DELETE endpoints",
                "Verify authentication",
                "Test error responses",
                "Check rate limiting",
                "Verify CORS"
            ],
            "test_criteria": [
                "All endpoints respond",
                "GET works",
                "POST creates data",
                "PUT updates data",
                "DELETE removes data",
                "Auth enforced",
                "Errors handled",
                "CORS configured"
            ],
            "agents": ["qa-agent"],
            "files_to_check": ["apps/api/routes/admin"],
            "output": "admin-api-test-report.md"
        },

        # ===== PHASE 9: SUMMARY & DOCUMENTATION =====
        {
            "title": "Task 9.1: Document Admin UI Status",
            "description": "Create comprehensive admin UI audit report",
            "category": "documentation",
            "phase": 9,
            "estimated_hours": 4,
            "steps": [
                "Gather all test reports",
                "Identify issues found",
                "Categorize by severity",
                "List fixes needed",
                "Estimate fix times",
                "Create issue cards",
                "Generate final report",
                "Create recommendations"
            ],
            "test_criteria": [
                "All reports compiled",
                "Issues categorized",
                "Fix estimates created",
                "Cards added to Kanban",
                "Report generated",
                "Recommendations clear"
            ],
            "agents": ["architect"],
            "files_to_check": [".blackbox/.memory/test-reports"],
            "output": "admin-ui-audit-final-report.md"
        }
    ]

def create_executable_tasks():
    """Create executable task cards on Kanban board."""
    board = KanbanBoard("lumelle-refactoring")
    tasks = load_executable_tasks()

    print("=" * 60)
    print("🎯 Creating Executable Tasks for Admin UI Finalization")
    print("=" * 60)
    print()

    created = []
    for task in tasks:
        # Create metadata
        metadata = {
            "phase": task["phase"],
            "category": task["category"],
            "estimated": f"{task['estimated_hours']}h",
            "steps": len(task["steps"]),
            "agents": task["agents"],
            "files_to_check": task["files_to_check"],
            "output": task["output"]
        }

        # Create labels
        labels = [
            f"phase-{task['phase']}",
            task["category"],
            "admin-ui",
            "executable"
        ]

        # Add priority based on phase
        priority = Priority.HIGH if task["phase"] <= 3 else Priority.MEDIUM

        # Create card
        try:
            card_id = board.create_card(
                title=task["title"],
                description=task["description"],
                column_id="backlog",
                priority=priority,
                labels=labels,
                metadata=metadata
            )

            if not card_id:
                print(f"❌ Failed to create card: {task['title']}")
                continue

            # Add checklist items (steps)
            for i, step in enumerate(task["steps"], 1):
                board.add_checklist_item(
                    card_id,
                    f"{i}. {step}"
                )

            # Add test criteria as checklist
            board.add_checklist_item(
                card_id,
                "--- Test Criteria ---"
            )
            for criteria in task["test_criteria"]:
                board.add_checklist_item(
                    card_id,
                    f"✓ {criteria}"
                )

            created.append({
                "id": card_id,
                "title": task["title"],
                "phase": task["phase"],
                "hours": task["estimated_hours"]
            })

            print(f"✅ Created: {task['title']} ({task['estimated_hours']}h)")

        except Exception as e:
            print(f"❌ Error creating {task['title']}: {e}")

    print()
    print("=" * 60)
    print(f"✅ Created {len(created)} executable tasks")
    print("=" * 60)
    print()

    # Group by phase
    by_phase = {}
    for task in created:
        phase = task["phase"]
        if phase not in by_phase:
            by_phase[phase] = []
        by_phase[phase].append(task)

    print("📊 Tasks by Phase:")
    print()
    total_hours = 0
    for phase in sorted(by_phase.keys()):
        tasks_in_phase = by_phase[phase]
        phase_hours = sum(t["hours"] for t in tasks_in_phase)
        total_hours += phase_hours
        print(f"Phase {phase}: {len(tasks_in_phase)} tasks, {phase_hours}h")
        for task in tasks_in_phase:
            print(f"  - {task['title']} ({task['hours']}h)")

    print()
    print(f"Total: {len(created)} tasks, {total_hours} hours")
    print()

    return created

if __name__ == "__main__":
    create_executable_tasks()
