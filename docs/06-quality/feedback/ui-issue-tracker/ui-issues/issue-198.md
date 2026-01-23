# Issue 198 — Platform Commerce Runtime Duplication

**Owner:** Architecture Audit  
**Date:** 2026-01-15  
**Area:** Platform / Commerce / Runtime  
**Priority:** P2 (Medium)  
**Status:** UNTRIAGED  
**Worklog:** [ARCH-2026-01-15_architecture-audit-cart-context.md](../ARCH-2026-01-15_architecture-audit-cart-context.md)

---

## 1) Problem Statement

The platform commerce runtime.ts file (148 lines) contains mock, disabled, and real implementations inline, making the file complex and difficult to test.

**Files Affected:**
- `src/domains/platform/commerce/runtime.ts` (148 lines)

---

## 2) Evidence

### Current Structure
```typescript
// runtime.ts (148 lines)
const isDev = () => import.meta.env.DEV
const isShopifyConfigured = () => { /* ... */ }
const shouldUseRealCommerceInDev = () => { /* ... */ }

const createMock = (): CommerceRuntime => { /* mock implementation */ }
const createDisabled = (code: 'NOT_CONFIGURED' | 'UNAVAILABLE'): CommerceRuntime => { /* disabled implementation */ }
const createReal = (): CommerceRuntime => { /* real implementation */ }

export const commerce = createCommerce()
```

### Complexity Issues

- Three different implementations mixed in one file
- Environment checks scattered
- 148 lines for what could be separate files
- No clear separation of concerns
- Difficult to test individual implementations

---

## 3) Root Causes

1. **No Factory Pattern**
   - Mock, disabled, and real implementations created inline
   - Should follow factory pattern like analytics
   - Makes it hard to add new implementations

2. **Environment Logic Scattered**
   - `isDev()`, `isShopifyConfigured()`, `shouldUseRealCommerceInDev()` checks
   - Logic mixed with implementation
   - Hard to reason about runtime behavior

3. **No Separation of Concerns**
   - Environment checks, implementation creation, and runtime logic all in one function
   - Should be in separate functions/files

4. **Missing Abstraction**
   - No clear interface for commerce runtime
   - No factory function for creating different runtimes
   - Difficult to test or swap implementations

---

## 4) Impact Assessment

### Maintainability
**Risk Level:** 🟢 Low

**Impact:**
- Runtime file is moderately complex
- Adding new implementations requires modifying 148-line file
- Difficult to test specific implementations

### Testability
**Risk Level:** 🟡 Medium

**Impact:**
- Hard to test mock implementation independently
- No clear way to inject test doubles
- Environment checks scattered across code

### Code Quality
**Risk Level:** 🟡 Medium

**Impact:**
- Single responsibility violation
- Mixed concerns in one file
- No clear separation between environment, implementation, and logic

---

## 5) Implementations

### Phase A: Extract Mock Implementation (1 day)

**A1.1 Create Mock Commerce Runtime**
```typescript
// src/domains/platform/commerce/mocks/mockCommerce.ts
export function createMockCommerceRuntime(): CommerceRuntime {
  return {
    // Cart operations
    getCart: async () => null,
    addLine: async () => { success: false },
    
    // Checkout operations
    getCapabilities: () => ({ supported: [] }),
    beginCheckout: async () => { checkoutUrl: '' },
    
    // Get capabilities
    getCapabilities: () => ({
      provider: 'mock',
      supported: [],
      supportsPersistence: false,
      supportsFeatureFlags: false,
    })
  }
}
```

### Phase B: Extract Disabled Implementation (1 day)

**B1.1 Create Disabled Commerce Runtime**
```typescript
// src/domains/platform/commerce/mocks/disabledCommerce.ts
export function createDisabledCommerceRuntime(code: 'NOT_CONFIGURED' | 'UNAVAILABLE', message: string): CommerceRuntime {
  return {
    // Cart operations
    getCart: async () => { throw new Error(code, message) },
    
    // Checkout operations
    getCapabilities: () => ({ supported: [] }),
    beginCheckout: async () => { throw new Error(code, message) },
    
    // Get capabilities
    getCapabilities: () => ({
      provider: 'disabled',
      supported: [],
      supportsPersistence: false,
      supportsFeatureFlags: false,
    })
  }
}
```

### Phase C: Extract Real Implementation (1-2 days)

**C1.1 Create Real Commerce Runtime**
```typescript
// src/domains/platform/commerce/adapters/shopify/internal-api/real-commerce.ts
import { commerce } from '@platform/commerce/ports'
import type { CommercePort } from '@platform/commerce/ports/commerce'

export class ShopifyCommerceRuntime implements CommercePort {
  private shopify: any

  constructor(config: ShopifyConfig) {
    this.shopify = config.shopify
  }

  async getCart() { /* ... */ }
  async addLine() { /* ... */ }
  // ... rest of methods
}
```

**C1.2 Update Runtime to Use Real Implementation**
```typescript
// src/domains/platform/commerce/runtime.ts (refactored)
import { createRealCommerceRuntime } from './adapters/shopify/internal-api/real-commerce'

export const commerce = createRealCommerceRuntime()
```

---

## 6) Success Criteria

- [ ] Mock implementation extracted to separate file
- [ ] Disabled implementation extracted to separate file
- [ ] Real implementation extracted to separate file
- [ ] Runtime.ts simplified to factory function
- [ ] Factory pattern implemented
- [ ] Each implementation follows CommercePort interface
- [ ] Tests added for each implementation
- [ ] No breaking changes in commerce functionality
- [ ] Runtime file reduced to < 50 lines
- [ ] LSP diagnostics clean on changed files

---

## 7) Dependencies

### Blocking
- Issue #193 (CartContext) - Should follow new runtime patterns
- Issue #194 (Analytics) - Should follow similar factory pattern

### Related Issues
- All platform services should follow this pattern

---

## 8) Effort Estimate

- **Phase A:** 1 day
- **Phase B:** 1 day
- **Phase C:** 1-2 days

**Total Effort:** 3-4 days

---

## 9) Research Needed

✅ **COMPLETE** - Research complete from exploration:
- Factory pattern for platform services
- Runtime implementation best practices
- Port/adapter separation strategies

---

## 10) Next Steps

1. ✅ **Documented** - Issue created in tracker
2. ⏳ **Plan** - Detailed implementation plan complete
3. ⏳ **Approve** - Get stakeholder sign-off on approach
4. ⏳ **Execute** - Begin Phase A: Extract mock implementation
5. ⏳ **Verify** - Add tests and validate no regressions
6. ⏳ **Complete** - Update documentation and mark done

---

**Status:** UNTRIAGED  
**Next Action:** Begin Phase A implementation

---

**Effort:** 3-4 days  
**Risk:** Low - Follows established platform patterns
---

**Priority:** P2 (Medium) - Code Organization and Maintainability
