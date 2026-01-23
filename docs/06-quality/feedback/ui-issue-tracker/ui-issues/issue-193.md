# Issue 193 — CartContext.tsx: 562-Line God Context

**Owner:** Architecture Audit  
**Date:** 2026-01-15  
**Area:** Platform / Cart  
**Priority:** P0 (Critical)  
**Status:** UNTRIAGED  
**Worklog:** [ARCH-2026-01-15_architecture-audit-cart-context.md](../ARCH-2026-01-15_architecture-audit-cart-context.md)

---

## 1) Problem Statement

`src/domains/client/shop/cart/providers/CartContext.tsx` is a **562-line monolithic context provider** that violates Single Responsibility Principle and makes cart functionality nearly impossible to test, maintain, or extend without risk of regression.

### Key Issues

- **God Context Pattern**: Single file handling 8+ distinct responsibilities
- **11 React hooks** mixed with business logic
- **9 localStorage interactions** scattered throughout
- **Tight coupling** to platform commerce runtime
- **Inline business logic** that should be in separate services

---

## 2) Evidence

### File Statistics

```bash
$ wc -l src/domains/client/shop/cart/providers/CartContext.tsx
562 src/domains/client/shop/cart/providers/CartContext.tsx
```

### Complexity Metrics

- **React hooks**: 11 (useState, useEffect, useMemo, useCallback, useRef)
- **localStorage interactions**: 9 direct accesses
- **Business functions**: 8+ inline functions
- **Mixed concerns**: Cart state + volume discounts + image normalization + checkout + queue + persistence + migration

### Violations of Domain Architecture

Current structure:
```
client/shop/cart/providers/
└── CartContext.tsx (562 lines)
```

Should be following domain pattern:
```
client/shop/cart/
├── .docs/
├── hooks/
│   ├── useCartState.ts
│   ├── useCartOperations.ts
│   ├── useCartPersistence.ts
│   └── useVolumeDiscounts.ts
├── logic/
│   ├── imageNormalization.ts (extracted)
│   └── volumeDiscounts.ts (exists, not fully used)
├── lib/
│   └── storage.ts (centralized storage)
├── providers/
│   ├── CartStateProvider.tsx
│   ├── CartOperationsProvider.tsx
│   ├── CartPersistenceProvider.tsx
│   └── CartDiscountProvider.tsx
└── types/
    └── cart.ts
```

---

## 3) Root Causes

### A. Incremental Feature Addition

Features added over time without architectural refactoring:
- Volume discounts → Added inline (lines 207-312)
- Image normalization → Added inline (lines 14-33)
- Queue management → Added inline (lines 206, 226-237)
- Vendor ID migration → Added inline (lines 124-148)

### B. Missing Separation of Concerns

No clear boundaries between:
- **UI state** (React hooks)
- **Business logic** (pure functions)
- **Infrastructure** (localStorage, HTTP, vendor integration)

### C. Direct Runtime Coupling

```typescript
import { commerce } from '@platform/commerce'
```

Cannot test cart logic without platform commerce runtime, making:
- Unit testing impossible
- Integration testing brittle
- Mocking difficult

---

## 4) Impact Assessment

### Maintainability

**Risk Level:** 🔴 **High**

- Every cart-related feature change risks breaking adjacent features
- New developers must understand 562 lines before contributing
- Code review requires full context understanding

### Testability

**Risk Level:** 🔴 **Very High**

- Cannot test individual concerns in isolation
- Business logic requires React to test
- No way to mock vendor integration

### Development Velocity

**Risk Level:** 🟡 **Medium**

- Adding cart features requires:
  1. Understanding entire 562-line file
  2. Identifying where new code fits
  3. Testing entire file for regressions
- Fear of breaking existing features

### Onboarding

**Risk Level:** 🟡 **Medium**

- New team members cannot understand cart architecture quickly
- No clear entry points for learning
- High cognitive load

---

## 5) Proposed Solution

### Phase A: Extract Logic (Week 1)

**A1. Move Image Normalization**
```typescript
// client/shop/cart/logic/imageNormalization.ts (NEW)

export const PRODUCT_PAGE_IMAGES: Record<string, string> = {
  'lumelle-shower-cap': '/uploads/luminele/shower-cap-01.webp',
  'satin-overnight-curler': '/uploads/curler/1.webp',
}

export const normalizeCartImage = (
  variantKey: string,
  fallbackImage?: string
): string | undefined => {
  const match = variantKey.match(/^variant\.([\w-]+)\./)
  if (!match) return fallbackImage
  const handle = match[1]
  return PRODUCT_PAGE_IMAGES[handle] ?? fallbackImage
}
```

**A2. Enhance Volume Discount Logic**
```typescript
// client/shop/cart/logic/volumeDiscounts.ts (ENHANCE)

// Already exists, ensure all context logic moves here
export const syncVolumeDiscountFromItems = (
  items: CartItem[],
  currentCode: string | null
): { managed: boolean; code: string | null } => {
  // Move lines 207-312 logic here
}
```

**A3. Create Storage Utilities**
```typescript
// client/shop/cart/lib/storage.ts (NEW)

const STORAGE_KEY = 'lumelle_cart'
const DISCOUNT_KEY = 'lumelle_cart_discount_code'
const PENDING_DISCOUNT_KEY = 'lumelle_pending_discount_code'

export const cartStorage = {
  getItems: (): CartItem[] => { /* ... */ },
  setItems: (items: CartItem[]): void => { /* ... */ },
  getDiscountCode: (): string | null => { /* ... */ },
  setDiscountCode: (code: string | null): void => { /* ... */ },
}
```

### Phase B: Extract Hooks (Week 1-2)

**B1. useCartState**
```typescript
// client/shop/cart/hooks/useCartState.ts (NEW)

export const useCartState = () => {
  const [items, setItems] = useState<CartItem[]>([])
  const [checkoutUrl, setCheckoutUrl] = useState<string | undefined>()
  const [checkoutStart, setCheckoutStart] = useState<CheckoutStart | undefined>()
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  
  const subtotal = useMemo(...)
  const qty = useMemo(...)
  
  return { items, setItems, checkoutUrl, setCheckoutUrl, ... }
}
```

**B2. useCartOperations**
```typescript
// client/shop/cart/hooks/useCartOperations.ts (NEW)

export const useCartOperations = (
  items: CartItem[],
  setItems: Dispatch<SetStateAction<CartItem[]>>
) => {
  const add = useCallback(async (item, qty = 1) => { /* ... */ })
  const setQty = useCallback(async (id, qty) => { /* ... */ })
  const remove = useCallback(async (id) => { /* ... */ })
  const clear = useCallback(async () => { /* ... */ })
  
  return { add, setQty, remove, clear }
}
```

**B3. useCartPersistence**
```typescript
// client/shop/cart/hooks/useCartPersistence.ts (NEW)

export const useCartPersistence = (
  items: CartItem[],
  setItems: Dispatch<SetStateAction<CartItem[]>>
) => {
  useEffect(() => {
    cartStorage.setItems(items)
  }, [items])
  
  // Rehydrate on mount
  useEffect(() => {
    const stored = cartStorage.getItems()
    if (stored.length > 0) {
      setItems(stored)
    }
  }, [])
}
```

**B4. useVolumeDiscounts**
```typescript
// client/shop/cart/hooks/useVolumeDiscounts.ts (NEW)

export const useVolumeDiscounts = (
  items: CartItem[],
  setDiscountCode: Dispatch<SetStateAction<string | null>>
) => {
  useEffect(() => {
    const { managed, code } = syncVolumeDiscountFromItems(items, discountCodeRef.current)
    if (managed) {
      setDiscountCode(code)
    }
  }, [items])
}
```

### Phase C: Create Composed Provider (Week 2)

```typescript
// client/shop/cart/providers/CartProvider.tsx (NEW, < 200 lines)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const state = useCartState()
  const operations = useCartOperations(state.items, state.setItems)
  useCartPersistence(state.items, state.setItems)
  useVolumeDiscounts(state.items, state.setDiscountCode)
  
  const value: CartState = {
    ...state,
    ...operations,
  }
  
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>
}
```

### Phase D: Add Tests (Week 2-3)

```typescript
// client/shop/cart/logic/imageNormalization.test.ts
// client/shop/cart/logic/volumeDiscounts.test.ts
// client/shop/cart/hooks/useCartState.test.ts
// client/shop/cart/hooks/useCartOperations.test.ts
```

---

## 6) Success Criteria

- [ ] CartContext.tsx reduced to < 300 lines
- [ ] All business logic extracted to `logic/` folder
- [ ] All hooks extracted to `hooks/` folder
- [ ] Storage utilities centralized in `lib/` folder
- [ ] Each file has single, clear responsibility
- [ ] Unit tests added for all extracted logic
- [ ] Integration tests for cart operations
- [ ] No direct platform commerce imports in hooks (use dependency injection)

---

## 7) Dependencies

### Blocking
- None - can start immediately

### Related Issues
- Issue 194: Analytics placement (domain architecture)
- Issue 196: Large components (general refactoring)

---

## 8) Effort Estimate

- **Phase A (Extract Logic)**: 2-3 days
- **Phase B (Extract Hooks)**: 2-3 days
- **Phase C (Create Provider)**: 1 day
- **Phase D (Add Tests)**: 2-3 days
- **Review & Refine**: 1-2 days

**Total Effort**: 8-12 days (~2 weeks)

---

## 9) Research Needed

- [ ] Best practices for React context composition
- [ ] Testing strategies for context providers
- [ ] Dependency injection patterns in React
- [ ] How to mock platform commerce runtime

---

## 10) Next Steps

1. ✅ **Documented** - Issue created in tracker
2. ⏳ **Research** - Launch explore agent to research context composition patterns
3. ⏳ **Plan** - Create detailed refactoring plan
4. ⏳ **Approve** - Get stakeholder sign-off on approach
5. ⏳ **Execute** - Incremental refactoring with tests

---

**Status**: UNTRIAGED  
**Next Action**: Launch explore agent to research React context composition and testing strategies
