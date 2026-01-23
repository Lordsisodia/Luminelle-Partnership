# Issue 199 — Debug Code in Production Files

**Owner:** Architecture Audit  
**Date:** 2026-01-15  
**Area:** Code Quality / Production  
**Priority:** P3 (Low)  
**Status:** UNTRIAGED  
**Worklog:** [ARCH-2026-01-15_architecture-audit-cart-context.md](../ARCH-2026-01-15_architecture-audit-cart-context.md)

---

## 1) Problem Statement

Production files contain 59 console.log statements with emoji prefixes, making the codebase look unprofessional and potentially exposing internal details to end users.

**Files Affected:**
- `src/domains/platform/commerce/adapters/shopify/internal-api/cart.ts` (lines 149-207)

---

## 2) Evidence

### Examples Found
```typescript
// Line 149
console.log('[🔍 SHOPIFY-CART-DIAGNOSTIC] addLine called', { variantKey, qty })

// Line 156
console.log('[🔍 SHOPIFY-CART-DIAGNOSTIC] Stored cart key', { stored })

// Line 167
console.log('[🔍 SHOPIFY-CART-DIAGNOSTIC] No cart exists, creating new cart')

// Lines 180-207
console.log('[🔍 SHOPIFY-CART-DIAGNOSTIC] getCart called')
console.log('[🔍 SHOPIFY-CART-DIAGNOSTIC] Cart:', cart)

// And 51 more console.log statements
```

### Total: 59 debug statements

---

## 3) Root Causes

1. **Temporary Debug Left In**
   - Debug code added during development
   - Never removed or gated with environment variable
   - No process to clean up debug code before production

2. **No Debugging Strategy**
   - No clear debug logging strategy
   - No proper logging library in place
   - Debug statements not following any convention

3. **Missing Quality Gates**
   - No pre-commit hooks to prevent debug code
   - No CI checks to catch debug statements
   - No linting rules for console statements

4. **Professionalism Gap**
   - Emoji prefixes look unprofessional
   - Console logs exposed to production users

---

## 4) Impact Assessment

### Security
**Risk Level:** 🟢 Low

**Impact:**
- Internal details potentially exposed to end users
- Debug code could leak sensitive information
- No clear audit trail for production issues

### User Experience
**Risk Level:** 🟢 Low

**Impact:**
- Console logs visible in production (looks unprofessional)
- Performance impact from 59 console.log statements
- Confusing for users if they check browser console

### Code Quality
**Risk Level:** 🟡 Medium

**Impact:**
- Dead code in production
- Makes codebase look unprofessional
- Violates clean code principles
- Adds noise to legitimate console output

---

## 5) Proposed Solution

### Phase A: Remove All Debug Statements (2 hours)

**A1.1 Search and Remove**
```bash
# Find all console.log statements in Shopify adapter
grep -rn "console.log\["'\'" src/domains/platform/commerce/adapters/shopify/internal-api/cart.ts
# Remove all lines
sed -i '/console.log/d' src/domains/platform/commerce/adapters/shopify/internal-api/cart.ts
```

**A1.2 Remove from Other Files**
- Search entire codebase for console.log statements
- Remove all debug statements
- Ensure no remaining debug code in production

### Phase B: Implement Debug Strategy (1 hour)

**B1.1 Create Logging Utility**
```typescript
// src/lib/observability/logger.ts
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

export const logger = {
  debug: (message: string, ...args: any[]) => {
    if (import.meta.env.PROD || import.meta.env.DEBUG_SHOPIFY_CART) {
      console.log(`[DEBUG] ${message}`, ...args)
    }
  },
  info: (message: string, ...args: any[]) => {
    console.log(`[INFO] ${message}`, ...args)
  },
  warn: (message: string, ...args: any[]) => {
    console.warn(`[WARN] ${message}`, ...args)
  },
  error: (message: string, ...args: any[]) => {
    console.error(`[ERROR] ${message}`, ...args)
  },
}
```

**B1.2 Add Debug Flag**
```typescript
// .env.example
# Debug logging (for development)
DEBUG_SHOPIFY_CART=false
DEBUG_ANALYTICS=false

# Production (default)
DEBUG_SHOPIFY_CART=false
```

**B1.3 Replace Console.Log with Logger**
```typescript
// Before:
console.log('[🔍 SHOPIFY-CART-DIAGNOSTIC] addLine called', { variantKey, qty })

// After:
logger.debug('addLine called', { variantKey, qty })
```

---

## 6) Success Criteria

- [ ] All 59 console.log statements removed from production code
- [ ] No console.log statements in any production files
- [ ] Logging utility created in src/lib/observability/logger.ts
- [ ] Debug environment variables added to .env.example
- [ ] All debug code replaced with logger calls
- [ ] No breaking changes in functionality
- [ ] Codebase looks professional without debug statements
- [ ] LSP diagnostics clean on changed files

---

## 7) Dependencies

### Blocking
- None - can start immediately

### Related Issues
- All platform services could benefit from proper logging

---

## 8) Effort Estimate

- **Phase A:** 2 hours
- **Phase B:** 1 hour

**Total Effort:** 3 hours

---

## 9) Research Needed

None - Clear solution

---

## 10) Next Steps

1. ✅ **Documented** - Issue created in tracker
2. ⏳ **Plan** - Simple removal strategy defined
3. ⏳ **Approve** - Get stakeholder sign-off on approach
4. ⏳ **Execute** - Remove all debug statements
5. ✅ **Complete** - Create logger utility and mark done

---

**Status:** UNTRIAGED  
**Next Action:** Remove all debug statements

---

**Effort:** 3 hours  
**Risk:** Very Low - Simple search and replace operation

---

**Priority:** P3 (Low) - Code Professionalism
