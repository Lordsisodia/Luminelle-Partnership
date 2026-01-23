#!/bin/bash

ISSUE_ID=$1
TITLE=$2
PRIORITY=$3
LINES=$4
FILE_COUNT=$5
AREA=$6
DAYS=$7

WORKLOG_FILE="docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-${ISSUE_ID}.md"

cat > "$WORKLOG_FILE" << EOF
# Issue $ISSUE_ID — $TITLE

**Owner:** Architecture Audit  
**Date:** 2026-01-15  
**Area:** $AREA  
**Priority:** $PRIORITY  
**Status:** UNTRIAGED  
**Worklog:** [ARCH-2026-01-15_architecture-audit-cart-context.md](../ARCH-2026-01-15_architecture-audit-cart-context.md)

---

## 1) Problem Statement

$TITLE

---

## 2) Evidence

**Files Affected:** $FILE_COUNT
**Lines of Code:** $LINES

---

## 3) Root Causes

1. **Architectural Violation**
   - Inconsistent with domain-driven design
   - Violates Single Responsibility Principle

2. **Incremental Development**
   - Added without architectural review
   - No refactoring over time

---

## 4) Impact Assessment

### Maintainability
**Risk Level:** 🔴 High / 🟡 Medium / 🟢 Low

- Difficult to maintain and extend
- Changes risk breaking adjacent features

### Code Quality
**Risk Level:** 🔴 High / 🟡 Medium / 🟢 Low

- Accumulates technical debt
- Harder to reason about

---

## 5) Proposed Solution

See detailed refactoring plan in main audit document.

---

## 6) Success Criteria

- [ ] Refactoring complete
- [ ] Tests added
- [ ] Documentation updated
- [ ] No regressions

---

## 7) Dependencies

### Blocking
- None

### Related Issues
- Issue 193: CartContext refactoring
- Issue 194: Analytics domain (for issue 194)

---

## 8) Effort Estimate

**Total Effort:** $DAYS

---

## 9) Research Needed

- [ ] Research specific patterns
- [ ] Find examples from production codebases

---

## 10) Next Steps

1. ✅ **Documented** - Issue created in tracker
2. ⏳ **Plan** - Create detailed refactoring plan
3. ⏳ **Approve** - Get stakeholder sign-off
4. ⏳ **Execute** - Implement refactoring

---

**Status**: UNTRIAGED  
**Next Action**: Wait for research and create detailed plan
EOF

echo "Created worklog for issue ${ISSUE_ID}"
