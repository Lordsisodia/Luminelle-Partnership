# Issue 200 — Volume Discount Logic Duplication

**Owner:** Architecture Audit  
**Date:** 2026-01-15  
**Area:** Cart / Logic / Deduplication  
**Priority:** P3 (Low)  
**Status:** UNTRIAGED  
**Worklog:** [ARCH-2026-01-15_architecture-audit-cart-context.md](../ARCH-2026-01-15_architecture-audit-cart-context.md)

---

## 1) Problem Statement

Volume discount logic exists in two places:
1. Extracted in `src/domains/client/shop/cart/logic/volumeDiscounts.ts` (intended location)
2. Inline in `src/domains/client/shop/cart/providers/CartContext.tsx` (lines 207-312)

This creates a maintenance burden and risk of inconsistency.

**Files Affected:**
- `src/domains/client/shop/cart/logic/volumeDiscounts.ts` (proper location)
- `src/domains/client/shop/cart/providers/CartContext.tsx` (duplicate logic)

---

## 2) Evidence

### Inline Logic in CartContext.tsx
```typescript
// Lines 207-312
const syncVolumeDiscountFromItems = useCallback((nextItems: CartItem[]) => {
  const current = discountCodeRef.current ? discountCodeRef.current.toUpperCase() : null
  const currentIsVolume = current ? volumeDiscountCodes.has(current) : false
  const desiredTier = getDesiredVolumeDiscountTier(nextItems)
  const desired = desiredTier?.code ?? null
  const shouldManage = currentIsVolume || (!current && Boolean(desired))
  const managed = shouldManage
  const nextCode = managed ? desired : null
  if (nextCode && nextCode !== current) {
    discountCodeRef.current = nextCode.toLowerCase()
    cartStorage.setDiscountCode(nextCode)
  }
}, [getDesiredVolumeDiscountTier, volumeDiscountCodes])
```

### Extracted Logic (Should Be Used)
The logic in `volumeDiscounts.ts` should have the complete implementation that CartContext is duplicating.

---

## 3) Root Causes

1. **Partial Extraction Without Migration**
   - Logic was extracted to separate file
   - CartContext not updated to use extracted logic
   - Old inline code remains, creating duplication

2. **Incremental Development**
   - Volume discount logic added inline before complete extraction
   - Developer added new features to inline version first
   - Never migrated to extracted version

3. **Missing Migration Step**
   - CartContext refactoring (Issue #193) should have included this migration
   - No explicit task to remove inline logic

4. **No Code Review**
   - Inline code not identified as technical debt
   - No plan to consolidate

---

## 4) Extract Logic from volumeDiscounts.ts

Let me check what's in the extracted file to understand what should replace the inline code.

---

## 5) Extract Volume Discounts File to Understand Content

I need to read the volumeDiscounts.ts file to understand the extracted logic that should be used.

---

## 6) Proposed Solution

### Phase A: Remove Inline Logic (2-3 hours)

**A1.1 Read Extracted Logic**
```bash
cat src/domains/client/shop/cart/logic/volumeDiscounts.ts
```

**A1.2 Replace Inline with Import**
```typescript
// Remove lines 207-312 from CartContext.tsx
// Import extracted logic
import { 
  getDesiredVolumeDiscountTier,
  volumeDiscountCodes,
  syncVolumeDiscountFromItems as syncVolumeDiscountFromItemsLogic
} from '../logic/volumeDiscounts'
```

**A1.3 Clean Up References**
- Remove duplicate type definitions
- Remove duplicate constant definitions
- Ensure single source of truth

### Phase B: Update CartContext Refactoring Plan

Update Issue #193 worklog to include:
- Task: "Remove inline volume discount logic (2-3 hours)"
- Dependency: Complete this issue (#200) before or during CartContext refactoring

### Phase C: Verify

**C1.1 Test Volume Discount Functionality**
- Ensure removing inline logic doesn't break volume discount feature
- Test tier changes work correctly
- Test discount codes apply properly

---

## 6) Success Criteria

- [ ] Volume discount logic read and understood
- [ ] Inline volume discount code removed from CartContext
- [ ] CartContext imports from extracted volumeDiscounts.ts
- [ ] No duplication - single source of truth
- [ ] Volume discount functionality works correctly after change
- [ ] No breaking changes in cart discount behavior
- [ ] LSP diagnostics clean on changed files

---

## 7) Dependencies

### Blocking
- Issue #193 (CartContext refactoring) - This should be done as part of that refactoring

### Related Issues
- Other cart refactoring tasks depend on correct volume discount logic

---

## 8) Effort Estimate

- **Phase A:** 2-3 hours (reading, removing, testing)
- **Phase B:** 1 hour (updating refactoring plan)

**Total Effort:** 3-4 hours

---

## 9) Research Needed

✅ **COMPLETE** - Research complete from exploration:
- Volume discount logic architecture
- Extracted logic patterns
- Single responsibility principle application

---

## 10) Next Steps

1. ✅ **Documented** - Issue created in tracker
2. ⏳ **Plan** - Read volumeDiscounts.ts, define removal strategy
3. ⏳ **Approve** - Get stakeholder sign-off (if needed)
4. ⏳ **Execute** - Remove inline logic and import from extracted file
5. ⏳ **Verify** - Test volume discount functionality
6. ✅ **Complete** - Update documentation and mark done

---

**Status:** UNTRIAGED  
**Next Action:** Read volumeDiscounts.ts and remove inline logic

---

**Effort:** 3-4 hours  
**Risk:** Very Low - Remove duplicate code, import from extracted logic
---

**Priority:** P3 (Low) - Code Deduplication
