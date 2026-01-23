# Issue 194 — Analytics Placement Violates Domain Architecture

**Owner:** Architecture Audit  
**Date:** 2026-01-15  
**Area:** Platform / Analytics  
**Priority:** P0 (Critical)  
**Status:** UNTRIAGED  
**Worklog:** [ARCH-2026-01-15_architecture-audit-cart-context.md](../ARCH-2026-01-15_architecture-audit-cart-context.md)

---

## 1) Problem Statement

Analytics code in `src/lib/analytics/` violates domain-driven architecture and should follow ports/adapters pattern like `@platform/commerce`.

**Files:**
- `metapixel.ts` (179 lines)
- `posthog.ts` (209 lines)
- `useFeatureFlagVariant.ts` (45 lines)

---

## 2) Evidence

**Current Location:**
```
src/lib/analytics/
├── metapixel.ts (179 lines)
├── posthog.ts (209 lines)
└── useFeatureFlagVariant.ts (45 lines)
```

**Violates:**
- `src/lib/README.md` says "Avoid adding new files here"
- Should follow domain pattern: `src/domains/platform/analytics/`
- No ports/adapters abstraction like commerce

---

## 3) Root Causes

1. **Architectural Inconsistency**
   - Analytics added without checking domain patterns
   - No reference to `src/domains/README.md` rules

2. **Missing Platform Service Pattern**
   - Should be: `@platform/analytics` with ports/adapters
   - Similar to `@platform/commerce`, `@platform/auth`

3. **No Vendor Abstraction**
   - Direct Meta Pixel and PostHog imports throughout codebase
   - Cannot mock or swap providers easily

---

## 4) Impact Assessment

**Consistency:** 🟡 Medium
- Other developers confused about where to put integrations
- Inconsistent with rest of codebase

**Maintainability:** 🟡 Medium
- Harder to refactor or swap analytics providers
- Mixed Meta/PostHog logic in same files

**Testability:** 🟡 Medium
- Cannot mock or swap providers easily
- Feature flagging tightly coupled to PostHog

---

## 5) Proposed Solution

### Create Analytics Domain Following Ports/Adapters Pattern

**Phase 1: Create Domain Structure** (Day 1-2)

```typescript
// src/domains/platform/analytics/ports/analytics.ts

export interface AnalyticsEvent {
  name: string
  properties?: Record<string, unknown>
  timestamp?: Date
}

export interface UserIdentity {
  userId?: string
  email?: string
  anonymousId?: string
  properties?: Record<string, unknown>
}

export interface AnalyticsCapabilities {
  provider: string
  supportsEcommerce: boolean
  supportsFeatureFlags: boolean
  supportsSessionRecording: boolean
  supportsCustomEvents: boolean
}

export interface AnalyticsPort {
  track(event: AnalyticsEvent): Promise<void>
  identify(user: UserIdentity): Promise<void>
  page(path?: string, properties?: Record<string, unknown>): Promise<void>
  getFeatureFlag(key: string): Promise<boolean | string | undefined>
  onFeatureFlagsChanged(callback: (flags: Record<string, any>) => void): () => void
  getCapabilities(): AnalyticsCapabilities
  initialize(): Promise<void>
  isInitialized(): boolean
}
```

**Phase 2: Implement Adapters** (Day 3-5)

```typescript
// src/domains/platform/analytics/adapters/meta/internal-api/index.ts
export class MetaPixelAdapter implements AnalyticsPort { ... }

// src/domains/platform/analytics/adapters/posthog/internal-api/index.ts
export class PostHogAdapter implements AnalyticsPort { ... }
```

**Phase 3: Create Runtime** (Day 5-6)

```typescript
// src/domains/platform/analytics/runtime.ts
export const createAnalytics = (): AnalyticsRuntime => {
  const adapters: AnalyticsPort[] = []
  if (env('VITE_POSTHOG_KEY')) {
    adapters.push(createPostHogAdapter(...))
  }
  if (env('VITE_META_PIXEL_ID')) {
    adapters.push(createMetaPixelAdapter(...))
  }
  return { primary: adapters[0], secondary: adapters.slice(1) }
}

export const analytics = createAnalytics()
```

**Phase 4: Migrate Existing Code** (Day 6-7)

- Replace direct imports with `@platform/analytics`
- Update feature flag hook to use new port
- Test all analytics events

---

## 6) Success Criteria

- [ ] Analytics moved to `@platform/analytics`
- [ ] Ports and adapters implemented
- [ ] All existing code migrated to new domain
- [ ] Old `src/lib/analytics/` files removed
- [ ] Tests added for adapters
- [ ] Documentation updated

---

## 7) Dependencies

**Blocking:** None

**Related Issues:**
- Issue 193: CartContext refactoring
- Issue 197: Storage keys centralization

---

## 8) Effort Estimate

- **Phase 1**: 1-2 days
- **Phase 2**: 2-3 days
- **Phase 3**: 1-2 days
- **Phase 4**: 2-3 days
- **Testing & Review**: 1-2 days

**Total Effort**: 7-12 days (~2 weeks)

---

## 9) Research Needed

✅ **COMPLETE** - Explore agent provided comprehensive research on:
- Analytics ports/adapters architecture
- Meta Pixel and PostHog adapter implementations
- Analytics runtime factory pattern
- Event typing and type safety strategies
- Feature flag integration patterns

---

## 10) Next Steps

1. ✅ **Documented** - Issue created in tracker
2. ✅ **Research** - Comprehensive research complete
3. ⏳ **Plan** - Create detailed implementation plan
4. ⏳ **Approve** - Get stakeholder sign-off
5. ⏳ **Execute** - Implement @platform/analytics domain

---

**Status**: UNTRIAGED → Ready for Planning  
**Next Action**: Create detailed implementation plan and begin execution
