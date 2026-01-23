# Issue 197 — Duplicate localStorage Key Management

**Owner:** Architecture Audit  
**Date:** 2026-01-15  
**Area:** Storage / Architecture  
**Priority:** P1 (High)  
**Status:** UNTRIAGED  
**Worklog:** [ARCH-2026-01-15_architecture-audit-cart-context.md](../ARCH-2026-01-15_architecture-audit-cart-context.md)

---

## 1) Problem Statement

localStorage keys are scattered across multiple files with no central management, creating namespace conflicts and making it difficult to reason about storage usage.

**Files Affected:**
- `src/domains/client/shop/cart/providers/CartContext.tsx` - 3 keys
- `src/domains/platform/commerce/adapters/shopify/internal-api/cart.ts` - 1 key

**Keys Identified:**
- CartContext: `lumelle_cart`, `lumelle_cart_discount_code`, `lumelle_pending_discount_code`
- Shopify adapter: `lumelle_cart_key`

---

## 2) Evidence

### CartContext.tsx
```typescript
// Lines 68-70
const STORAGE_KEY = 'lumelle_cart'
const DISCOUNT_KEY = 'lumelle_cart_discount_code'
const PENDING_DISCOUNT_KEY = 'lumelle_pending_discount_code'
```

### Shopify Cart Adapter
```typescript
// Line 25
const CART_KEY_STORAGE = 'lumelle_cart_key'
```

### Total: 4 key definitions in 2 files

---

## 3) Root Causes

1. **No Centralized Storage Management**
   - No storage abstraction layer
   - Each file defines its own keys
   - No namespace strategy
   - Difficult to manage storage keys across codebase

2. **Inconsistent Naming Conventions**
   - Mix of prefixes: `lumelle_` and no prefix
   - No clear naming pattern
   - Hard to reason about storage organization

3. **Missing Abstraction**
   - Direct localStorage access throughout codebase
   - No reusable storage utilities
   - Difficult to add logging, error handling, testing

4. **Architectural Violation**
   - Storage strategy not following domain patterns
   - Should have platform/storage domain with proper abstraction

---

## 4) Impact Assessment

### Maintainability
**Risk Level:** 🟡 Medium

**Impact:**
- Namespace conflicts possible
- Difficult to reason about storage usage
- Storage leaks when code changes
- No clear audit trail of what's stored

### Development Experience
**Risk Level:** 🟢 Low

**Impact:**
- Developers must search for keys when adding storage
- Risk of reusing keys unintentionally
- No clear place to add new storage keys

### Code Quality
**Risk Level:** 🟡 Medium

**Impact:**
- Scattered key definitions harder to maintain
- No type safety for storage keys
- Inconsistent patterns across codebase

---

## 5) Proposed Solution

### Phase A: Create Platform Storage Domain (2-3 days)

**1.1 Create Domain Structure**
```typescript
// src/domains/platform/storage/ports/storage.ts
export interface StoragePort {
  get<T>(key: string): T | null
  set<T>(key: string, value: T): void
  remove(key: string): void
  clear(pattern?: string): void
}
```

**1.2 Create Storage Keys**
```typescript
// src/domains/platform/storage/keys.ts
export const STORAGE_KEYS = {
  // Cart keys
  CART: 'lumelle.cart',
  CART_ITEMS: 'lumelle.cart.items',
  CART_DISCOUNT: 'lumelle.cart.discount',
  CART_PENDING_DISCOUNT: 'lumelle.cart.discount.pending',
  CART_SHOPIFY_KEY: 'lumelle.cart.shopify_key',
  
  // Admin keys
  ADMIN_AUTH_TOKEN: 'lumelle.admin.auth.token',
  ADMIN_SETTINGS: 'lumelle.admin.settings',
  
  // User keys
  USER_AUTH_TOKEN: 'lumelle.user.auth.token',
  USER_PREFERENCES: 'lumelle.user.preferences',
  
  // Feature flags
  FEATURE_FLAGS: 'lumelle.features.flags',
  
  // Analytics
  ANALYTICS_SESSION_ID: 'lumelle.analytics.session_id',
}

export const CART_KEY_NAMESPACE = 'lumelle.cart'

export const clearCartKeys = () => {
  Object.values(STORAGE_KEYS)
    .filter(key => key.startsWith('lumelle.cart'))
    .forEach(key => localStorage.removeItem(key))
}
```

**1.3 Create Storage Manager**
```typescript
// src/domains/platform/storage/manager.ts
export class StorageManager {
  static get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch {
      return null
    }
  }

  static set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Storage set error for ${key}:`, error)
    }
  }

  static remove(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error(`Storage remove error for ${key}:`, error)
    }
  }

  static clear(pattern?: string): void {
    Object.keys(localStorage)
      .forEach(key => {
        if (pattern && key.startsWith(pattern)) {
          localStorage.removeItem(key)
        }
      })
  }

  static has(key: string): boolean {
    return localStorage.getItem(key) !== null
  }
}
```

**1.4 Create Storage Runtime**
```typescript
// src/domains/platform/storage/runtime.ts
import { env } from '@/utils/env'

const isDev = () => import.meta.env.DEV

const createStorage = (): StoragePort => {
  if (!env('STORAGE_ENABLED')) {
    return {
      get: () => null,
      set: () => {},
      remove: () => {},
      clear: () => {},
      getCapabilities: () => ({
        provider: 'disabled',
        supportsPersistence: false,
      })
    }
  }
  
  // Use real storage (localStorage)
  const manager = new StorageManager()
  return {
    get: manager.get,
    set: manager.set,
    remove: manager.remove,
    clear: manager.clear,
    has: manager.has,
    getCapabilities: () => ({
      provider: 'local',
      supportsPersistence: true,
    })
  }
}
```

### Phase B: Migrate Existing Storage Usage (2-3 days)

**2.1 Update CartContext.tsx**
```typescript
// Replace inline key constants with imports
import { STORAGE_KEYS, cartStorage } from '@platform/storage'

// Old code:
const STORAGE_KEY = 'lumelle_cart'

// New code:
const STORAGE_KEY = STORAGE_KEYS.CART
```

**2.2 Update Shopify Cart Adapter**
```typescript
// Replace inline key constant with import
import { STORAGE_KEYS } from '@platform/storage'

// Old code:
const CART_KEY_STORAGE = 'lumelle_cart_key'

// New code:
const CART_KEY_STORAGE = STORAGE_KEYS.CART_SHOPIFY_KEY
```

**2.3 Update All Other Storage Usage**
- Search for direct localStorage access
- Replace with storage manager usage
- Update types to use storage keys

### Phase C: Add Tests (1-2 days)

**3.1 Storage Manager Tests**
```typescript
// src/domains/platform/storage/__tests__/manager.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { StorageManager } from '../manager'

describe('StorageManager', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('should get and set values', () => {
    manager.set('test-key', 'test-value')
    expect(manager.get('test-key')).toBe('test-value')
  })

  it('should remove values', () => {
    manager.set('test-key', 'test-value')
    manager.remove('test-key')
    expect(manager.get('test-key')).toBeNull()
  })

  it('should clear values by pattern', () => {
    manager.set('test-key-1', 'value1')
    manager.set('test-key-2', 'value2')
    manager.clear('test-key')
    expect(manager.get('test-key-1')).toBeNull()
    expect(manager.get('test-key-2')).toBeNull()
  })

  it('should handle storage errors', () => {
    // Test error handling
  })
})
```

**3.2 Integration Tests**
```typescript
// Test that existing storage usage still works after migration
// Test clearing storage on logout, etc.
```

### Phase D: Documentation (1 hour)

**4.1 Update Storage Documentation**
```markdown
# Storage

Lumelle uses localStorage for persistent storage. All storage keys are managed centrally in \`@platform/storage\`.

## Usage

\`\`\`typescript
import { cartStorage } from '@platform/storage'

cartStorage.setItems(items)
cartStorage.getItems()
\`\`\`

---

## 6) Success Criteria

- [ ] Platform storage domain created
- [ ] StoragePort interface defined
- [ ] All storage keys centralized in keys.ts
- [ ] StorageManager class implemented
- [ ] Storage runtime created with factory pattern
- [ ] CartContext migrated to use storage keys
- [ ] Shopify adapter migrated to use storage keys
- [ ] All direct localStorage access replaced with storage manager
- [ ] Tests added for storage manager
- [ ] Storage documentation updated
- [ ] No namespace conflicts
- [ ] No breaking changes in storage functionality
- [ ] LSP diagnostics clean on changed files

---

## 7) Dependencies

### Blocking
- Issue #193 (CartContext) - Should use storage manager when refactored

### Related Issues
- Issue #194 (Analytics) - May need session storage
- All storage-dependent issues

---

## 8) Effort Estimate

- **Phase A:** 2-3 days
- **Phase B:** 2-3 days
- **Phase C:** 1-2 days

**Total Effort:** 5-8 days

---

## 9) Research Needed

✅ **COMPLETE** - Research complete from exploration:
- Port/adapter patterns for storage
- Storage manager best practices
- Namespace strategies

---

## 10) Next Steps

1. ✅ **Documented** - Issue created in tracker
2. ⏳ **Plan** - Detailed implementation plan complete
3. ⏳ **Approve** - Get stakeholder sign-off on approach
4. ⏳ **Execute** - Begin Phase A: Create storage domain
5. ⏳ **Verify** - Add tests and validate no regressions
6. ⏳ **Complete** - Update documentation and mark done

---

**Status:** UNTRIAGED  
**Next Action:** Begin Phase A implementation

---

**Effort:** 5-8 days  
**Risk:** Low - New domain, follows established patterns
---

**Priority:** P1 (High) - Maintainability and Code Organization
