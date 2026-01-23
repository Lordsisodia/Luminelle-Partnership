# Issue 195 — Oversized UI Components

**Owner:** Architecture Audit  
**Date:** 2026-01-15  
**Area:** Admin / Components  
**Priority:** P1 (High)  
**Status:** UNTRIAGED  
**Worklog:** [ARCH-2026-01-15_architecture-audit-cart-context.md](../ARCH-2026-01-15_architecture-audit-cart-context.md)

---

## 1) Problem Statement

Two admin page components exceed 2,000 lines, making them difficult to maintain and navigate.

**Files Affected:**
- `src/domains/admin/media/ui/pages/MediaPage.tsx` (2,197 lines)
- `src/domains/admin/catalog/ui/pages/ProductsPage.tsx` (2,144 lines)

---

## 2) Evidence

### File Statistics
```bash
$ wc -l src/domains/admin/media/ui/pages/MediaPage.tsx
  2197 src/domains/admin/media/ui/pages/MediaPage.tsx

$ wc -l src/domains/admin/catalog/ui/pages/ProductsPage.tsx
  2144 src/domains/admin/catalog/ui/pages/ProductsPage.tsx
```

### Complexity Metrics

**MediaPage.tsx:**
- 2,197 lines total
- 15+ state variables
- Multiple responsibilities (filters, bucket management, grid/list views, pagination)
- Mixed business logic with UI rendering

**ProductsPage.tsx:**
- 2,144 lines total
- 12+ state variables
- Multiple responsibilities (product editing, preview sync, navigation, sections)
- Mixed business logic with UI rendering

### Architectural Violations

1. **Single Responsibility Violation**
   - Each file handles: state, data fetching, UI rendering, form validation, navigation
   - Should be separated into focused components

2. **Missing Subdomain Structure**
   - Should follow domain pattern:
     ```
     admin/media/
     ├── ui/
     │   ├── pages/MediaPage.tsx (≤ 200 lines - orchestration only)
     │   ├── components/MediaFilters/
     │   ├── components/BucketManager/
     │   ├── components/MediaGrid/
     │   └── hooks/useMediaState.ts
     ```

---

## 3) Root Causes

1. **Incremental Feature Addition**
   - Features added over time without component extraction
   - No size thresholds or reviews enforced
   - Complex features "just worked" into existing page

2. **Missing Component Extraction**
   - No clear guidelines for when to extract subcomponents
   - UI patterns not systematically applied
   - Developers unsure about extraction boundaries

3. **Complex State Management**
   - All state mixed in one component
   - No custom hooks for state abstraction
   - Direct localStorage/database access in page component

---

## 4) Impact Assessment

### Maintainability
**Risk Level:** 🔴 High

**Impact:**
- Changes require navigating 2,000+ lines
- High merge conflict risk
- Code review is difficult and time-consuming
- New developers must understand entire file before making changes

### Developer Velocity
**Risk Level:** 🟡 Medium

**Impact:**
- Adding new features takes longer due to complexity
- Refactoring is risky without tests
- Confidence in making changes is low

### Code Quality
**Risk Level:** 🟡 Medium

**Impact:**
- Mixed concerns make it harder to maintain quality standards
- Difficult to test individual features in isolation
- Risk of regression when making changes

---

## 5) Proposed Solution

### Phase A: State Extraction (Week 1)

**A1. Extract Custom Hooks** (2-3 days)
```typescript
// admin/media/hooks/useMediaState.ts
export function useMediaState() {
  const [media, setMedia] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const fetchMedia = async () => { /* ... */ }
  const createMedia = async (item) => { /* ... */ }
  const updateMedia = async (id, updates) => { /* ... */ }
  const deleteMedia = async (id) => { { ... */ }
  
  return { media, loading, error, fetchMedia, createMedia, updateMedia, deleteMedia }
}

// admin/catalog/hooks/useProductsState.ts
export function useProductsState() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  
  const fetchProducts = async () => { /* ... */ }
  const selectProduct = (product) => setSelectedProduct(product)
  const updateProduct = async (id, updates) => { /* ... */ }
  const deleteProduct = (id) => { /* ... */ }
  
  return { products, selectedProduct, isEditing, fetchProducts, selectProduct, updateProduct, deleteProduct }
}
```

**A2. Move Business Logic to `logic/`** (1-2 days)
```typescript
// admin/media/logic/mediaOperations.ts
export function filterMedia(items: MediaItem[], filters: MediaFilters): MediaItem[] {
  // Extract filtering logic from page component
}

// admin/catalog/logic/productOperations.ts
export function validateProductData(data: ProductData): ValidationResult {
  // Extract validation logic from page component
}
```

### Phase B: Component Extraction (Weeks 2-3)

**B1. Extract UI Subcomponents** (3-5 days per page)

**MediaPage Structure:**
```
admin/media/
├── ui/
│   ├── pages/MediaPage.tsx (≤ 200 lines)
│   ├── components/MediaFilters/
│   │   ├── MediaFilters.tsx (150-200 lines)
│   │   └── MediaFilters.test.tsx
│   ├── components/BucketManager/
│   │   ├── BucketManager.tsx (150-200 lines)
│   │   └── BucketManager.test.tsx
│   ├── components/MediaGrid/
│   │   ├── MediaGrid.tsx (200-300 lines)
│   │   ├── MediaGridItem.tsx (100-150 lines)
│   │   └── MediaGrid.test.tsx
│   └── hooks/useMediaState.ts
```

**ProductsPage Structure:**
```
admin/catalog/
├── ui/
│   ├── pages/ProductsPage.tsx (≤ 200 lines)
│   ├── components/ProductEditor/
│   │   ├── ProductEditor.tsx (150-200 lines)
│   │   ├── ProductEditor.test.tsx
│   │   ├── components/sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── PricingSection.tsx
│   │   │   └── VariantsSection.tsx
│   │   └── hooks/useProductsState.ts
│   ├── components/ProductPreview/
│   │   ├── ProductPreview.tsx (100-150 lines)
│   │   └── ProductPreview.test.tsx
│   └── components/ProductNavigation/
│   │       ├── ProductNavigation.tsx
│   │       └── ProductNavigation.test.tsx
│   └── hooks/useProductsState.ts
```

**B2. Implement Component Patterns** (ongoing during extraction)

```typescript
// Use compound component pattern for complex forms
const ProductEditor = ({ children }) => {
  return (
    <EditorProvider>
      <HeroSection />
      <PricingSection />
      <VariantsSection />
    </EditorProvider>
  )
}

ProductEditor.HeroSection = HeroSection
ProductEditor.PricingSection = PricingSection
ProductEditor.VariantsSection = VariantsSection
```

### Phase C: Page Refactoring (Week 4)

**C1. Reduce Page Components to Orchestration** (1 week)

**MediaPage.tsx (final):**
```typescript
// admin/media/ui/pages/MediaPage.tsx (≤ 200 lines)
export function MediaPage() {
  const state = useMediaState()
  const operations = useMediaOperations()
  
  return (
    <PageLayout>
      <PageHeader title="Media Library" />
      <MediaFilters />
      <BucketManager />
      <MediaGrid media={state.media} />
      <MediaPagination />
    </PageLayout>
  )
}
```

**ProductsPage.tsx (final):**
```typescript
// admin/catalog/ui/pages/ProductsPage.tsx (≤ 200 lines)
export function ProductsPage() {
  const state = useProductsState()
  const operations = useProductsOperations()
  
  return (
    <PageLayout>
      <PageHeader title="Products" />
      <ProductFilters />
      <ProductEditor />
      <ProductPreview />
      <ProductNavigation />
      <ProductsGrid products={state.products} />
      <ProductsPagination />
    </PageLayout>
  )
}
```

---

## 6) Success Criteria

- [ ] MediaPage.tsx reduced to < 200 lines
- [ ] ProductsPage.tsx reduced to < 200 lines
- [ ] All business logic extracted to `logic/` folders
- [ ] All state extracted to custom hooks
- [ ] All subcomponents extracted and in separate files
- [ ] Tests added for all extracted components
- [ ] No breaking changes in media or catalog functionality
- [ ] LSP diagnostics clean on all changed files
- [ ] Component patterns consistent across admin domain

---

## 7) Dependencies

### Blocking
- None - can start immediately

### Related Issues
- Issue #193: CartContext refactoring (should follow similar extraction patterns)

---

## 8) Effort Estimate

- **Phase A (State Extraction):** 3-5 days
- **Phase B (Component Extraction):** 6-10 days (3-5 per page)
- **Phase C (Page Refactoring):** 7 days (1 per page + testing)
- **Testing & Refinement:**** 2-3 days

**Total Effort:** 18-25 days (~3-5 weeks)

---

## 9) Research Needed

✅ **COMPLETE** - Research complete from exploration:
- Component extraction strategies identified
- File organization patterns documented
- Testing strategies defined

---

## 10) Next Steps

1. ✅ **Documented** - Issue created in tracker
2. ⏳ **Plan** - Detailed implementation plan complete
3. ⏳ **Approve** - Get stakeholder sign-off on approach
4. ⏳ **Execute** - Begin Phase A: Extract state hooks

---

**Status:** UNTRIAGED  
**Next Action:** Wait for stakeholder approval, then begin Phase A

---

**Effort:** 18-25 days (3-5 weeks)  
**Risk:** Medium - Large refactoring, but well-planned with extraction strategy

---

**Priority:** P1 (High) - Developer velocity and maintainability improvements
