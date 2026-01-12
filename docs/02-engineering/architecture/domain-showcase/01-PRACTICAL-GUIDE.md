# Practical Guide: Working With Domains

**Real-world examples of how to use Lumelle's domain architecture**

---

## 🎯 Quick Reference: What Goes Where?

```
I need to...                              → Put it in...
─────────────────────────────────────────────────────────
Add a product feature                     → client/shop/products/
Build cart functionality                  → client/shop/cart/
Create a marketing section                → client/marketing/ui/sections/
Manage admin settings                     → admin/settings-siso/##-module/
Add blog posts                            → blog/data/
Handle authentication                     → platform/auth/
Process payments                          → platform/commerce/ or platform/payments/
Create a reusable component               → ui-kit/components/
Store shared utilities                    → shared/utils/
```

---

## 📦 Example 1: Adding a New Product Feature

**Scenario:** Add a "Compare Products" feature to the shop

### Step 1: Understand the Domain Structure

```
client/shop/products/
├── .docs/              # Read this first!
├── data/               # Product data
├── hooks/              # React hooks
├── logic/              # Business logic
├── providers/          # Context providers
├── state/              # State management
└── ui/                 # All UI
```

### Step 2: Add Business Logic

**File:** `client/shop/products/logic/compareProducts.ts`

```typescript
/**
 * Compare Products Logic
 * Pure functions - no React dependencies
 */

import type { Product, ProductVariant } from './types'

export type ComparisonProduct = {
  id: string
  title: string
  price: number
  features: string[]
  specifications: Record<string, string>
}

/**
 * Filter products to only include comparable ones
 */
export function filterComparableProducts(
  products: Product[],
  category: string
): Product[] {
  return products.filter(p => p.category === category)
}

/**
 * Extract comparison data from products
 */
export function extractComparisonData(
  products: Product[]
): ComparisonProduct[] {
  return products.map(p => ({
    id: p.id,
    title: p.title,
    price: p.price,
    features: p.features || [],
    specifications: p.specifications || {},
  }))
}

/**
 * Get unique specification keys across all products
 */
export function getSpecificationKeys(
  products: ComparisonProduct[]
): string[] {
  const keys = new Set<string>()
  products.forEach(p => {
    Object.keys(p.specifications).forEach(key => keys.add(key))
  })
  return Array.from(keys)
}
```

### Step 3: Create React Hook

**File:** `client/shop/products/hooks/useProductComparison.ts`

```typescript
/**
 * Product Comparison Hook
 * React-specific logic
 */

import { useMemo } from 'react'
import { useProducts } from './useProducts'
import {
  filterComparableProducts,
  extractComparisonData,
  getSpecificationKeys,
} from '../logic/compareProducts'
import type { ComparisonProduct } from '../logic/compareProducts'

export function useProductComparison(category: string) {
  const { products, loading } = useProducts()

  const comparableProducts = useMemo(() => {
    if (!products) return []
    const filtered = filterComparableProducts(products, category)
    return extractComparisonData(filtered)
  }, [products, category])

  const specificationKeys = useMemo(() => {
    return getSpecificationKeys(comparableProducts)
  }, [comparableProducts])

  return {
    products: comparableProducts,
    specificationKeys,
    loading,
  }
}
```

### Step 4: Create UI Components

**File:** `client/shop/products/ui/components/ProductComparisonTable.tsx`

```typescript
/**
 * Product Comparison Table
 * Display products side-by-side
 */

import { useProductComparison } from '../../hooks/useProductComparison'

export function ProductComparisonTable({ category }: { category: string }) {
  const { products, specificationKeys, loading } = useProductComparison(category)

  if (loading) return <div>Loading comparison...</div>
  if (products.length === 0) return <div>No products to compare</div>

  return (
    <div className="comparison-table">
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            {products.map(p => (
              <th key={p.id}>{p.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Price row */}
          <tr>
            <td>Price</td>
            {products.map(p => (
              <td key={p.id}>£{p.price}</td>
            ))}
          </tr>

          {/* Specifications */}
          {specificationKeys.map(key => (
            <tr key={key}>
              <td>{key}</td>
              {products.map(p => (
                <td key={p.id}>
                  {p.specifications[key] || '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
```

### Step 5: Add to Product Page

**File:** `client/shop/products/ui/pages/ProductPage/sections/comparison/ComparisonSection.tsx`

```typescript
/**
 * Comparison Section on Product Page
 */

import { ProductComparisonTable } from '../../../components/ProductComparisonTable'

export function ComparisonSection({
  productCategory,
}: {
  productCategory: string
}) {
  return (
    <section className="comparison-section">
      <h2>Compare Products</h2>
      <ProductComparisonTable category={productCategory} />
    </section>
  )
}
```

### Step 6: Document It

**File:** `client/shop/products/.docs/comparison-feature.md`

```markdown
# Product Comparison Feature

## Purpose
Allow customers to compare products side-by-side

## Implementation

### Logic
- `logic/compareProducts.ts` - Pure comparison functions

### Hooks
- `hooks/useProductComparison.ts` - React hook for comparison data

### UI
- `ui/components/ProductComparisonTable.tsx` - Comparison table
- `ui/pages/ProductPage/sections/comparison/` - Product page section

## Usage

```tsx
import { ComparisonSection } from '@client/shop/products'

<ComparisonSection productCategory="shower-caps" />
```

## Future Enhancements
- [ ] Add select/deselect products
- [ ] Highlight differences
- [ ] Export comparison
```

---

## 🎨 Example 2: Creating a Marketing Section

**Scenario:** Add a "Featured Reviews" section to the landing page

### Step 1: Create Section Folder

```
client/marketing/ui/sections/featured-reviews/
├── FeaturedReviews.tsx         # Main section component
├── ReviewCard.tsx              # Individual review card
└── .docs/                     # Documentation
```

### Step 2: Create Data Structure

**File:** `client/marketing/data/featured-reviews.ts`

```typescript
export interface FeaturedReview {
  id: string
  customerName: string
  rating: number
  title: string
  content: string
  date: string
  verified: boolean
  imageUrl?: string
}

export const featuredReviews: FeaturedReview[] = [
  {
    id: '1',
    customerName: 'Sarah M.',
    rating: 5,
    title: 'Best shower cap ever!',
    content: 'I love this product. No frizz, stays on all night.',
    date: '2025-12-15',
    verified: true,
  },
  // ... more reviews
]
```

### Step 3: Create Section Component

**File:** `client/marketing/ui/sections/featured-reviews/FeaturedReviews.tsx`

```typescript
/**
 * Featured Reviews Section
 * Marketing section for landing page
 */

import { featuredReviews } from '../../../data/featured-reviews'
import { ReviewCard } from './ReviewCard'

export function FeaturedReviews() {
  return (
    <section className="featured-reviews-section">
      <div className="container">
        <h2>What Our Customers Say</h2>
        <p className="subtitle">
          Join thousands of happy customers
        </p>

        <div className="reviews-grid">
          {featuredReviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

### Step 4: Add to Landing Page Config

**File:** `src/content/home.config.ts`

```typescript
import { FeaturedReviews } from '@client/marketing/ui/sections/featured-reviews'

export const homeSections = [
  // ... other sections
  {
    type: 'featured-reviews',
    component: FeaturedReviews,
    props: {},
  },
]
```

---

## ⚙️ Example 3: Adding an Admin Settings Module

**Scenario:** Add a "Notifications" module to admin settings

### Step 1: Create New Module

```
admin/settings-siso/10-notifications/
├── application/               # Use cases
│   └── useNotificationSettings.ts
├── data/                      # Default settings
│   └── notificationDefaults.ts
├── docs/                      # Documentation
│   └── README.md
├── domain/                    # Types & schemas
│   ├── types.ts
│   └── schema.ts
├── infrastructure/            # External services
│   └── notificationService.ts
└── ui/                        # UI components
    ├── components/
    │   ├── NotificationPreferences.tsx
    │   └── EmailToggle.tsx
    └── pages/
        └── NotificationsSettingsPage.tsx
```

### Step 2: Define Domain Types

**File:** `admin/settings-siso/10-notifications/domain/types.ts`

```typescript
export interface NotificationSettings {
  email: {
    marketing: boolean
    orderUpdates: boolean
    recommendations: boolean
  }
  push: {
    enabled: boolean
    orderUpdates: boolean
    recommendations: boolean
  }
  sms: {
    enabled: boolean
    orderUpdates: boolean
  }
}

export type NotificationChannel = 'email' | 'push' | 'sms'
export type NotificationType =
  | 'marketing'
  | 'orderUpdates'
  | 'recommendations'
```

### Step 3: Create Application Service

**File:** `admin/settings-siso/10-notifications/application/useNotificationSettings.ts`

```typescript
/**
 * Notification Settings Application Service
 * Orchestrates business logic
 */

import { useState, useEffect } from 'react'
import type { NotificationSettings } from '../../domain/types'
import { defaultNotificationSettings } from '../../data/notificationDefaults'
import { notificationService } from '../../infrastructure/notificationService'

export function useNotificationSettings() {
  const [settings, setSettings] = useState<NotificationSettings>(
    defaultNotificationSettings
  )
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    setLoading(true)
    try {
      const loaded = await notificationService.getSettings()
      setSettings(loaded)
    } catch (error) {
      console.error('Failed to load notification settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateSettings = async (
    updates: Partial<NotificationSettings>
  ) => {
    setSaving(true)
    try {
      const updated = await notificationService.updateSettings(updates)
      setSettings(updated)
    } catch (error) {
      console.error('Failed to update notification settings:', error)
      throw error
    } finally {
      setSaving(false)
    }
  }

  return {
    settings,
    loading,
    saving,
    updateSettings,
  }
}
```

### Step 4: Create UI

**File:** `admin/settings-siso/10-notifications/ui/pages/NotificationsSettingsPage.tsx`

```typescript
/**
 * Notifications Settings Page
 */

import { useNotificationSettings } from '../../application/useNotificationSettings'
import { NotificationPreferences } from '../components/NotificationPreferences'

export function NotificationsSettingsPage() {
  const { settings, loading, saving, updateSettings } =
    useNotificationSettings()

  if (loading) return <div>Loading...</div>

  return (
    <div className="notifications-settings-page">
      <h1>Notification Preferences</h1>

      <NotificationPreferences
        settings={settings}
        onUpdate={updateSettings}
        saving={saving}
      />
    </div>
  )
}
```

---

## 🔌 Example 4: Creating a Platform Service Integration

**Scenario:** Add a new payment provider to the platform

### Step 1: Define Port Interface

**File:** `platform/payments/ports/PaymentPort.ts`

```typescript
/**
 * Payment Port Interface
 * Defines what payment operations we need
 */

export interface PaymentCheckout {
  amount: number
  currency: string
  orderId: string
  customerEmail: string
  metadata?: Record<string, any>
}

export interface PaymentResult {
  success: boolean
  transactionId?: string
  error?: string
  redirectUrl?: string
}

export interface PaymentPort {
  /**
   * Initiate a payment checkout
   */
  createCheckout(checkout: PaymentCheckout): Promise<PaymentResult>

  /**
   * Verify a payment webhook
   */
  verifyWebhook(signature: string, payload: any): boolean

  /**
   * Get payment status
   */
  getPaymentStatus(transactionId: string): Promise<'pending' | 'complete' | 'failed'>
}
```

### Step 2: Implement Adapter for Vendor

**File:** `platform/payments/adapters/StripeAdapter.ts`

```typescript
/**
 * Stripe Payment Adapter
 * Implements PaymentPort for Stripe
 */

import type { PaymentPort, PaymentCheckout, PaymentResult } from '../../ports/PaymentPort'

export class StripeAdapter implements PaymentPort {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async createCheckout(checkout: PaymentCheckout): Promise<PaymentResult> {
    try {
      const session = await this.createStripeSession(checkout)
      return {
        success: true,
        transactionId: session.id,
        redirectUrl: session.url,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  }

  verifyWebhook(signature: string, payload: any): boolean {
    // Stripe webhook verification logic
    return this.verifyStripeSignature(signature, payload)
  }

  async getPaymentStatus(transactionId: string): Promise<'pending' | 'complete' | 'failed'> {
    const session = await this.stripe.checkout.sessions.retrieve(transactionId)
    return session.payment_status === 'paid' ? 'complete' : 'pending'
  }

  // Private helper methods...
}
```

### Step 3: Use in Client Domain

**File:** `client/shop/checkout/logic/processPayment.ts`

```typescript
/**
 * Payment Processing Logic
 * Uses platform payment port (vendor-agnostic)
 */

import { paymentPort } from '@platform/payments'
import type { PaymentCheckout } from '@platform/payments/ports'

export async function startPayment(cart: Cart): Promise<PaymentResult> {
  const checkout: PaymentCheckout = {
    amount: cart.total,
    currency: 'GBP',
    orderId: cart.id,
    customerEmail: cart.customerEmail,
  }

  // This works with ANY payment provider that implements the port!
  return paymentPort.createCheckout(checkout)
}
```

**Key Benefit:** If you switch from Stripe to PayPal, you only change the adapter. The client domain code remains untouched!

---

## 📚 Example 5: Adding Documentation

Every domain should have a `.docs/` folder. Here's a template:

**File:** `client/shop/.docs/README.md`

```markdown
# Shop Domain

## Purpose
Handles all shopping-related features for customers: browsing products, managing cart, and checkout.

## Key Features

### Product Management
- Product catalog with variants
- Product pages with galleries
- Product search and filtering

### Cart
- Add/remove items
- Quantity management
- Volume discounts
- Cart persistence

### Checkout
- Multi-step checkout
- Payment integration
- Order confirmation

## Structure

```
shop/
├── cart/           # Shopping cart
├── checkout/       # Checkout flow
└── products/       # Product catalog
```

## Integration

### Platform Services Used
- `@platform/commerce` - Shopify integration
- `@platform/payments` - Payment processing
- `@platform/storage` - Cart persistence

### How to Use

#### Add Product to Cart

```tsx
import { useCart } from '@client/shop/cart/providers/CartContext'

function AddToCartButton({ productId }) {
  const { add } = useCart()

  return (
    <button onClick={() => add({ id: productId, qty: 1 })}>
      Add to Cart
    </button>
  )
}
```

#### Display Product Page

```tsx
import { ProductPage } from '@client/shop/products/ui/pages/ProductPage'

<ProductPage productId="lumelle-shower-cap" />
```

## State Management

### Cart Context
- Location: `cart/providers/CartContext.tsx`
- Scope: Global cart state
- Persistence: Local storage + platform storage

### Product State
- Location: `products/state/productStore.ts`
- Scope: Individual product
- Cache: React Query

## Testing

```bash
# Run shop domain tests
npm test -- shop

# Run specific feature
npm test -- cart
npm test -- products
```

## Roadmap

- [ ] Add wishlist functionality
- [ ] Implement product comparison
- [ ] Add guest checkout
- [ ] Multi-currency support

## Related Documentation

- Platform Commerce: `src/domains/platform/commerce/.docs/README.md`
- Product Configuration: `data/product-config.ts`
```

---

## 🎯 Best Practices Summary

### 1. Separation of Concerns

```
✅ DO:
- logic/     → Pure functions, no React
- hooks/     → React-specific logic
- ui/        → All components

❌ DON'T:
- Put React code in logic/
- Put business logic in components
- Mix concerns
```

### 2. Platform Independence

```
✅ DO:
- Use platform ports (interfaces)
- Depend on abstractions
- Keep vendor code in adapters/

❌ DON'T:
- Import vendor SDKs directly in client domains
- Hardcode vendor-specific logic in UI
- Tight coupling to external services
```

### 3. Documentation

```
✅ DO:
- Add .docs/ folder for every domain
- Document purpose and usage
- Keep READMEs up to date

❌ DON'T:
- Skip documentation
- Let docs get stale
- Assume code is self-documenting
```

### 4. File Naming

```
✅ DO:
- kebab-case for files: `product-card.tsx`
- PascalCase for components: `ProductCard`
- camelCase for utilities: `formatPrice.ts`

❌ DON'T:
- Inconsistent naming
- Spaces in filenames
- Unclear abbreviations
```

### 5. Imports

```
✅ DO:
import { useCart } from '@client/shop/cart/providers'
import { productPort } from '@platform/commerce/ports'

❌ DON'T:
import { useCart } from '../../../cart/providers'
import shopify from '@shopify/shopify-api'
```

---

## 🚀 Quick Start Checklist

When adding a new feature:

- [ ] Identify the correct domain
- [ ] Create subdomain folder (if needed)
- [ ] Add .docs/ folder with README
- [ ] Implement logic (pure functions)
- [ ] Create hooks (React logic)
- [ ] Build UI components
- [ ] Add data fixtures (if needed)
- [ ] Document usage
- [ ] Test thoroughly
- [ ] Update relevant docs

---

**Last Updated:** 2026-01-12
