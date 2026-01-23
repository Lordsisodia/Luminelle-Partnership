# 🎯 Task Breakdown System

## The Problem

Goals like "Admin Section UI Finalization" are not executable. They need to be broken down into concrete tasks.

## Executable Task Format

Every task must answer:

1. **WHAT** - Specific action to take
2. **HOW** - Steps to execute
3. **TEST** - How to verify it works
4. **AGENT** - Which specialist to use

## Example Transformation

### ❌ Bad (Goal):
"Finalize Admin Section UI"

### ✅ Good (Executable Task):
**Task:** Test Products Listing Page Backend Connectivity

**Steps:**
1. Navigate to `/admin/products`
2. Verify page loads without console errors
3. Check that products display from API
4. Test pagination loads next page
5. Test search filters products
6. Test category filter
7. Test status filter
8. Verify all data matches database

**Test Criteria:**
- Page loads in <3s
- All products display correctly
- Filters work instantly
- No console errors
- Responsive on mobile

**Agent:** qa-agent for test creation, then dev-agent for fixes

**Estimated:** 2 hours

## Task Hierarchy

```
Major Goal (100h)
├── Phase 1: Audit & Dashboard (14h)
│   ├── Task 1.1: Audit admin routes (2h) ✓ EXECUTABLE
│   ├── Task 1.2: Test dashboard widgets (4h) ✓ EXECUTABLE
│   └── Task 1.3: Verify dashboard data sources (4h) ✓ EXECUTABLE
├── Phase 2: Products & Orders (22h)
│   ├── Task 2.1: Test products listing (4h) ✓ EXECUTABLE
│   ├── Task 2.2: Test product creation form (4h) ✓ EXECUTABLE
│   ├── Task 2.3: Test orders listing (3h) ✓ EXECUTABLE
│   └── ...
└── Phase 3: Customers & Content (etc.)
```

## When You Ask "What's Next?"

The system should return:

```bash
# You ask: "What's next?"

# System responds:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 NEXT TASK: Test Products Listing Page
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 WHAT:
   Verify the Products listing page loads data correctly
   and all filtering works properly.

👣 STEPS:
   1. Run dev server
   2. Navigate to /admin/products
   3. Open browser console
   4. Check for errors
   5. Test each filter
   6. Test search
   7. Test pagination
   8. Document results

✅ TEST:
   - Page loads in <3s
   - All products display
   - Filters work
   - Search works
   - No console errors
   - Mobile responsive

🤖 AGENTS:
   1. qa-agent → Create test plan
   2. dev-agent → Fix any issues

📊 ESTIMATED: 4 hours

📁 CONTEXT:
   - File: apps/web/src/app/admin/products/page.tsx
   - API: /api/admin/products
   - Dependent on: Nothing

✨ SUCCESS:
   All test criteria pass. Page is production ready.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Start this task? (yes/no/skip)
```

## Status Tracking

Each task has states:
- `pending` - Not started
- `planning` - Creating test plan
- `testing` - Running tests
- `fixing` - Addressing issues
- `verifying` - Re-testing after fixes
- `done` - Complete and verified

## Next Actions

1. Break down Admin UI goal into executable tasks
2. Add to Kanban as individual cards
3. Link each task to test plan
4. Assign appropriate agents
5. Track progress through states
