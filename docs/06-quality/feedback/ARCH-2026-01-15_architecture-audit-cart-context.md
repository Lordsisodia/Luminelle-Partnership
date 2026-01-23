# Architecture Audit: Cart Context & Domain Organization

**Date:** 2026-01-15  
**Auditor:** Claude (AI Agent)  
**Type:** Architecture Review / Technical Debt

---

## Executive Summary

Comprehensive audit revealed **8 major architectural inefficiencies** across the codebase, with the most critical issue being a **562-line "God Context"** for cart functionality. These issues violate established Domain-Driven Design patterns, create maintainability risks, and introduce technical debt.

### Key Findings

🔴 **Critical Issues (2)**
1. CartContext.tsx - 562-line monolithic context provider
2. Analytics placement - Violates domain architecture

🟡 **Moderate Issues (3)**
3. Oversized UI components (2,000+ lines)
4. Lax TypeScript configuration
5. Duplicate localStorage key management

🟢 **Minor Issues (3)**
6. Platform commerce runtime duplication
7. Debug code in production
8. Complex volume discount logic (extracted but still complex)

---

## 🔴 Critical Issue #1: CartContext.tsx - The God Context

**File:** `src/domains/client/shop/cart/providers/CartContext.tsx`  
**Lines:** 562  
**Complexity:** 11 React hooks, 9 localStorage interactions

### Problems Identified

1. **God Context Pattern**
   - Single file handling: cart state, volume discounts, image normalization, checkout URL management, discount codes, queue management, localStorage persistence, vendor ID migration
   - Nearly impossible to test in isolation
   - High cognitive load for maintenance
   - Violates Single Responsibility Principle

2. **Mixed Responsibilities**
   ```typescript
   // Line 14-33: Image normalization (should be separate)
   const PRODUCT_PAGE_IMAGES: Record<string, string> = { ... }
   const normalizeCartImage = (variantKey: string, fallbackImage?: string): string | undefined => { ... }
   
   // Line 207-312: Volume discount logic (should be separate service)
   const syncVolumeDiscountFromItems = useCallback((nextItems: CartItem[]) => { ... }, [...])
   
   // Line 206: Queue management (should be separate)
   const queueRef = useRef<Promise<void>>(Promise.resolve())
   
   // Line 226-237: Error handling mixed with business logic
   const enqueue = useCallback((op: () => Promise<void>) => { ... }, [])
   ```

3. **Inline Business Logic**
   - Volume discount tier calculations (lines 282-312)
   - Discount code synchronization (lines 166-194)
   - Cart key migration (lines 124-148)
   - Image URL normalization (lines 25-33)

4. **Tight Coupling to Platform Commerce**
   ```typescript
   import { commerce } from '@platform/commerce'
   ```
   - Direct import of commerce runtime
   - Makes testing difficult
   - Violates dependency injection principle

### Impact

- **Maintainability:** ⚠️ High - Every cart-related feature changes risk breaking other features
- **Testability:** ⚠️ Very Low - Cannot test individual concerns in isolation
- **Onboarding:** ⚠️ Poor - New developers must understand 562 lines to work on cart
- **Bug Risk:** ⚠️ High - High chance of regression in adjacent features

### Root Causes

1. **Incremental Feature Addition**
   - Features added over time without refactoring
   - No architectural reviews before adding cart features

2. **Lack of Separation**
   - UI state mixed with business logic
   - Business logic mixed with infrastructure concerns

3. **Missing Subdomain Structure**
   - Should follow established domain pattern:
     ```
     client/shop/cart/
     ├── .docs/
     ├── hooks/
     ├── logic/
     ├── lib/
     ├── providers/
     └── types/
     ```

---

## 🔴 Critical Issue #2: Analytics Placement Violates Domain Architecture

**Location:** `src/lib/analytics/`  
**Files:**
- `metapixel.ts` (179 lines)
- `posthog.ts` (209 lines)
- `useFeatureFlagVariant.ts` (45 lines)

### Problems Identified

1. **Violates Established Architecture**
   - Placed in `src/lib/` despite documentation saying "Avoid adding new files here"
   - Should follow domain-driven pattern like `platform/commerce`
   - Creates inconsistency in how integrations are organized

2. **No Ports/Adapters Pattern**
   - Analytics should use same pattern as commerce:
     ```
     [Client Domain] → [Port Interface] → [Adapter] → [Vendor]
     ```

3. **Mixed Responsibilities**
   - Meta Pixel logic mixed with PostHog
   - Event tracking mixed with feature flagging
   - No clear separation of concerns

### Impact

- **Consistency:** ⚠️ Medium - Other developers confused about where to put integrations
- **Maintainability:** ⚠️ Medium - Harder to refactor or swap analytics providers
- **Testability:** ⚠️ Medium - Cannot mock or swap providers easily

### Root Causes

1. **Bypassed Architecture Review**
   - Analytics added without checking domain patterns
   - No reference to `src/domains/README.md` rules

2. **Missing Platform Service Pattern**
   - Should be: `@platform/analytics` with ports/adapters
   - Similar to `@platform/commerce`, `@platform/auth`

---

## 🟡 Moderate Issue #3: Oversized UI Components

**Files:**
- `src/domains/admin/media/ui/pages/MediaPage.tsx` (2,197 lines)
- `src/domains/admin/catalog/ui/pages/ProductsPage.tsx` (2,144 lines)

### Problems Identified

1. **Single Files Exceeding 2,000 Lines**
   - Multiple responsibilities in one file
   - Difficult to navigate and maintain
   - Risk of merge conflicts

2. **Likely Composition Issues**
   - Probably contain multiple sub-components that could be extracted
   - Mixed logic with UI rendering
   - Tight coupling to implementation details

### Impact

- **Maintainability:** ⚠️ Medium - Changes require navigating massive files
- **Collaboration:** ⚠️ Medium - Multiple developers can't work on different parts easily
- **Review:** ⚠️ Medium - PR reviews difficult due to file size

### Root Causes

1. **Incremental Feature Addition**
   - Features added without component extraction
   - No size thresholds or reviews

2. **Missing Component Libraries**
   - Reusable components not extracted to separate files
   - Sub-components not following atomic component pattern

---

## 🟡 Moderate Issue #4: Lax TypeScript Configuration

**File:** `tsconfig.app.json`

### Problems Identified

```json
{
  "noUnusedLocals": false,
  "noUnusedParameters": false
}
```

1. **Dead Code Not Flagged**
   - Unused variables accumulate over time
   - Makes code review harder
   - Increases bundle size unintentionally

### Impact

- **Code Quality:** ⚠️ Medium - Dead code accumulates
- **Bundle Size:** ⚠️ Low - Unused code may ship to production
- **Developer Experience:** ⚠️ Medium - Harder to spot issues early

### Root Causes

1. **Legacy Configuration**
   - Likely disabled during early development
   - Never re-enabled as codebase matured

2. **Lack of Incremental Fixing**
   - Should enable and fix warnings iteratively

---

## 🟡 Moderate Issue #5: Duplicate localStorage Key Management

**CartContext.tsx (lines 68-70):**
```typescript
const STORAGE_KEY = 'lumelle_cart'
const DISCOUNT_KEY = 'lumelle_cart_discount_code'
const PENDING_DISCOUNT_KEY = 'lumelle_pending_discount_code'
```

**Shopify cart adapter (cart.ts, line 25):**
```typescript
const CART_KEY_STORAGE = 'lumelle_cart_key'
```

### Problems Identified

1. **No Centralized Key Management**
   - Keys scattered across files
   - Risk of key collisions
   - Inconsistent naming patterns
   - Hard to reason about what's stored where

2. **Namespace Issues**
   - No clear namespace strategy
   - Mixed prefixes (`lumelle_`, no prefix)
   - Difficult to clear all domain-specific keys

### Impact

- **Debugging:** ⚠️ Medium - Hard to find all related storage keys
- **Migration:** ⚠️ Medium - Changing keys requires searching entire codebase
- **Collision Risk:** ⚠️ Low - Future features might accidentally reuse keys

### Root Causes

1. **No Storage Abstraction**
   - Direct localStorage access throughout codebase
   - No centralized storage service

2. **Missing Configuration Pattern**
   - Should have storage constants in shared location
   - Similar to environment variables

---

## 🟢 Minor Issue #6: Platform Commerce Runtime Duplication

**File:** `src/domains/platform/commerce/runtime.ts` (148 lines)

### Problems Identified

1. **Mock/Disabled Implementations Inline**
   - Creates mock, disabled, and real implementations in one file
   - Conditional logic mixed with implementation
   - Could benefit from factory pattern or dependency injection

2. **Environment Checks Scattered**
   ```typescript
   const isDev = () => import.meta.env.DEV
   const isShopifyConfigured = () => { ... }
   const shouldUseRealCommerceInDev = () => env('USE_REAL_COMMERCE') === 'true'
   ```

### Impact

- **Maintainability:** ⚠️ Low - Runtime file moderately complex
- **Testability:** ⚠️ Low - Hard to test different configurations

### Root Causes

1. **No Dependency Injection**
   - Runtime creates implementations directly
   - Cannot swap implementations without modifying code

---

## 🟢 Minor Issue #7: Debug Code in Production

**File:** `src/domains/platform/commerce/adapters/shopify/internal-api/cart.ts`

**Lines:** 149-207

### Problems Identified

1. **Console.log Statements with Emoji Prefixes**
   ```typescript
   console.log('[🔍 SHOPIFY-CART-DIAGNOSTIC] addLine called', { variantKey, qty })
   console.log('[🔍 SHOPIFY-CART-DIAGNOSTIC] Stored cart key', { stored })
   console.log('[🔍 SHOPIFY-CART-DIAGNOSTIC] No cart exists, creating new cart')
   // ... many more
   ```

2. **Should Be Gated or Removed**
   - Should use proper logging library with levels
   - Should not ship to production

### Impact

- **Security:** ⚠️ Low - May leak internal details
- **Performance:** ⚠️ Low - Unnecessary console operations
- **Professionalism:** ⚠️ Low - Looks unprofessional in production

### Root Causes

1. **Temporary Debug Left In**
   - Added during debugging, never removed
   - No process for cleaning up debug code

---

## 🟢 Minor Issue #8: Complex Volume Discount Logic (Already Extracted but Still Complex)

**Location:** `src/domains/client/shop/cart/logic/volumeDiscounts.ts`  
**Also:** Inline in CartContext (lines 207-312)

### Problems Identified

1. **Duplication of Logic**
   - Logic exists in `volumeDiscounts.ts` AND inline in context
   - Two sources of truth for discount calculation

2. **Complex Synchronization**
   ```typescript
   const syncVolumeDiscountFromItems = useCallback((nextItems: CartItem[]) => {
     const current = discountCodeRef.current ? discountCodeRef.current.toUpperCase() : null
     const currentIsVolume = current ? volumeDiscountCodes.has(current) : false
     const desiredTier = getDesiredVolumeDiscountTier(nextItems)
     const desired = desiredTier?.code ?? null
     const shouldManage = currentIsVolume || (!current && Boolean(desired))
     // ... more complex logic
   }, [getDesiredVolumeDiscountTier, volumeDiscountCodes])
   ```

### Impact

- **Maintainability:** ⚠️ Low - Discount logic is complex but extracted
- **Correctness:** ⚠️ Medium - Duplication risks inconsistencies

### Root Causes

1. **Incremental Implementation**
   - Discount logic added before extraction
   - Some code paths not migrated to extracted logic

---

## 📋 Proposed Refactoring Plan

### Phase 1: Critical Issues (Immediate - Week 1)

1. **Refactor CartContext.tsx**
   - Extract volume discount logic to `logic/volumeDiscounts.ts`
   - Extract image normalization to `logic/imageNormalization.ts`
   - Extract storage utilities to `lib/storage.ts`
   - Create separate hooks:
     - `hooks/useCartState.ts`
     - `hooks/useCartOperations.ts`
     - `hooks/useCartPersistence.ts`
     - `hooks/useVolumeDiscounts.ts`
   - Create composite provider with smaller providers

2. **Move Analytics to Proper Domain**
   - Create `src/domains/platform/analytics/`
   - Implement ports/adapters pattern:
     - `ports/analytics.ts` - Port interfaces
     - `adapters/meta/internal-api/index.ts` - Meta adapter
     - `adapters/posthog/internal-api/index.ts` - PostHog adapter
     - `runtime.ts` - Analytics runtime
   - Export from platform: `@platform/analytics`

### Phase 2: Moderate Issues (Weeks 2-3)

3. **Split Large Components**
   - Break down `MediaPage.tsx` and `ProductsPage.tsx`
   - Extract subcomponents
   - Target files under 500 lines

4. **Tighten TypeScript Configuration**
   - Enable `noUnusedLocals` and `noUnusedParameters`
   - Fix existing issues incrementally
   - Add pre-commit lint check

5. **Centralize Storage Keys**
   - Create `src/domains/platform/storage/keys.ts`
   - Export constants for all localStorage keys
   - Add validation/namespace management

### Phase 3: Minor Issues (Week 4)

6. **Improve Platform Commerce Runtime**
   - Consider factory pattern for creating implementations
   - Extract mock/disabled logic to separate files

7. **Clean Up Debug Code**
   - Remove or gate console.log statements
   - Use proper logging library with levels

8. **Consolidate Volume Discount Logic**
   - Remove duplication from CartContext
   - Ensure single source of truth

---

## 🎯 Success Criteria

- [ ] CartContext.tsx reduced to < 300 lines
- [ ] All cart concerns separated into focused files
- [ ] Analytics moved to `@platform/analytics`
- [ ] No files exceed 1,000 lines (hard cap: 1,500)
- [ ] TypeScript unused locals/params checks enabled
- [ ] All localStorage keys centralized
- [ ] No console.log statements in production code
- [ ] Volume discount logic consolidated

---

## 📊 Risk Assessment

| Issue | Risk Level | Business Impact | Effort | Priority |
|--------|-----------|------------------|---------|----------|
| CartContext | 🔴 High | Features hard to add/maintain | High (2-3 weeks) | P0 |
| Analytics Placement | 🔴 High | Inconsistent architecture | Medium (1 week) | P0 |
| Large Components | 🟡 Medium | Slow development velocity | Medium (1-2 weeks) | P1 |
| TypeScript Config | 🟡 Medium | Code quality degrades | Low (2-3 days) | P1 |
| Storage Keys | 🟡 Medium | Debugging/migration pain | Low (1 day) | P2 |
| Commerce Runtime | 🟢 Low | Moderate complexity | Low (1-2 days) | P2 |
| Debug Code | 🟢 Low | Minor performance/professionalism | Low (2 hours) | P3 |
| Volume Discount | 🟢 Low | Possible inconsistency | Low (1 day) | P3 |

---

## 🔗 Related Documentation

- **Domain Architecture:** `docs/02-engineering/architecture/domain-showcase/README.md`
- **Architecture How-To:** `docs/02-engineering/architecture/ARCHITECTURE-HOWTO.md`
- **Platform Services:** `src/domains/platform/README.md`
- **Domain Rules:** `src/domains/README.md`

---

## Next Steps

1. **Create detailed refactoring plan** for each critical issue
2. **Launch explore agents** to research:
   - Best practices for context provider composition
   - Analytics ports/adapter patterns
   - Large component splitting strategies
3. **Get stakeholder approval** for refactoring plan
4. **Execute refactoring** incrementally with tests

---

**Status:** 📝 Documented - Ready for Planning  
**Next Review:** After initial explore agent research
