# Advanced Architecture Patterns

**Deep dive into the sophisticated patterns powering Lumelle's architecture**

---

## 🎯 Overview

This document covers the **advanced architectural patterns** that make Lumelle's domain system truly powerful:

1. **Ports & Adapters Implementation** - Real-world hexagonal architecture
2. **Domain Export Patterns** - How domains expose their APIs
3. **Runtime Configuration** - Mock vs Real adapters
4. **Type Safety Across Boundaries** - Shared primitives and DTOs
5. **DDD Layer Structure** - application/domain/infrastructure layers
6. **Schema Validation** - Zod schemas for type safety
7. **Shared Platform Primitives** - Cross-domain contracts

---

## 1. 🔌 Ports & Adapters - Complete Implementation

### The Pattern in Practice

Lumelle implements **Hexagonal Architecture** (Ports & Adapters) for platform services:

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT DOMAIN                           │
│  (e.g., client/shop/cart/providers/CartContext.tsx)         │
│                                                             │
│  import { commerce } from '@platform/commerce'             │
│  const cart = await commerce.cart.getCart()                │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Uses port interface (vendor-agnostic)
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  PORT INTERFACE                             │
│  (platform/commerce/ports/cart.ts)                          │
│                                                             │
│  export interface CartPort {                               │
│    getCart(): Promise<CartDTO>                             │
│    addLine(input): Promise<CartDTO>                        │
│    updateLine(input): Promise<CartDTO>                     │
│    removeLine(input): Promise<CartDTO>                     │
│  }                                                          │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Implemented by adapters
                            │
          ┌─────────────────┴─────────────────┐
          │                                   │
          ▼                                   ▼
┌──────────────────────┐          ┌──────────────────────┐
│   SHOPIFY ADAPTER    │          │   MOCK ADAPTER       │
│  (adapters/shopify/) │          │   (runtime.ts)       │
│                      │          │                      │
│  - Real Shopify API  │          │  - Dev mode          │
│  - Production        │          │  - Testing           │
└──────────────────────┘          └──────────────────────┘
```

### Real Example: Cart Port

**The Port Interface** (`platform/commerce/ports/cart.ts`):

```typescript
export interface CartPort {
  // Query
  getCart(): Promise<CartDTO>

  // Commands
  addLine(input: { variantKey: VariantKey; qty: number }): Promise<CartDTO>
  updateLine(input: { lineKey: CartLineKey; qty: number }): Promise<CartDTO>
  removeLine(input: { lineKey: CartLineKey }): Promise<CartDTO>

  // Optional operations
  applyDiscount?(code: string): Promise<CartDTO>
  setBuyerIdentity?(input: { email?: string }): Promise<CartDTO>
  setAttributes?(attrs: Record<string, string>): Promise<CartDTO>
}
```

**The Shopify Adapter** (`adapters/shopify/internal-api/cart.ts`):

```typescript
export const createShopifyCartPort = (): CartPort => {
  const client = createShopifyClient()

  return {
    async getCart() {
      const response = await client.get('/cart.js')
      return normalizeCart(response) // Converts Shopify → CartDTO
    },

    async addLine({ variantKey, qty }) {
      await client.post('/cart/add.js', {
        items: [{ id: variantKey, quantity: qty }]
      })
      return this.getCart()
    },

    // ... other methods
  }
}
```

**The Mock Adapter** (`runtime.ts`):

```typescript
const createMockCommerce = (): CommerceRuntime => {
  const cart: CartPort = {
    async getCart() {
      return {
        cartKey: 'mock-cart',
        lines: [],
        subtotal: { amount: 0, currencyCode: 'GBP' }
      }
    },
    async addLine() {
      return await this.getCart()
    },
    // ... other methods
  }
  return { catalog, cart, checkout }
}
```

### Benefits

1. **Vendor Independence**: Switch from Shopify to another platform without touching client code
2. **Testing**: Use mock adapters in tests without real API calls
3. **Development**: Work offline with mock data
4. **A/B Testing**: Run multiple adapters simultaneously

---

## 2. 📦 Domain Export Patterns

### How Domains Expose Their APIs

Each domain has an `index.ts` that controls what it exports:

#### Platform Domain Export Pattern

**File:** `platform/commerce/index.ts`

```typescript
export * from './ports'           // Public: Port interfaces
export * from './runtime'         // Public: Runtime instance
// Don't export: adapters (private)
```

**What this means:**
- ✅ Client code imports `CartPort` interface
- ✅ Client code imports `commerce` runtime
- ❌ Client code CANNOT import Shopify adapter directly
- ❌ Vendor details stay hidden

#### Auth Domain Export Pattern

**File:** `platform/auth/index.ts`

```typescript
export * from './data'            // Types, fixtures
export * from './hooks'           // useAuth, useUser, etc.
export * from './logic'           // Auth utilities
export * from './providers'       // AuthProvider
export * from './ui/pages'        // Auth pages
```

**Usage:**

```typescript
// In client domain
import { useAuth } from '@platform/auth/hooks'
import { AuthProvider } from '@platform/auth/providers'

// In platform domain
import { commerce } from '@platform/commerce'
```

### Export Strategy

| Layer | Exports? | Example |
|-------|----------|---------|
| **Ports** | ✅ Yes | Interfaces, DTOs, types |
| **Runtime** | ✅ Yes | Configured instances |
| **Adapters** | ❌ No | Vendor implementations (private) |
| **Internal API** | ❌ No | Vendor-specific logic (private) |

---

## 3. ⚙️ Runtime Configuration & Adapter Selection

### How the Right Adapter is Chosen

**File:** `platform/commerce/runtime.ts`

```typescript
export const createCommerce = (): CommerceRuntime => {
  const configured = isShopifyConfigured()

  if (!configured) {
    if (isDev()) return createMockCommerce()      // ← Dev mock
    return createDisabledCommerce(...)            // ← Production error
  }

  // In dev, default to mock unless explicitly enabled
  if (isDev() && !shouldUseRealCommerceInDev()) {
    return createMockCommerce()                   // ← Local dev
  }

  const adapter = createShopifyCommerceAdapter()  // ← Real Shopify
  return {
    catalog: adapter.catalog,
    cart: adapter.cart,
    checkout: adapter.checkout,
  }
}

export const commerce = createCommerce()  // Singleton instance
```

### Configuration Flow

```
Environment Variables
│
├── SHOPIFY_STORE_DOMAIN=xxx.myshopify.com
├── USE_REAL_COMMERCE=true
└── MODE=development
│
▼
createCommerce()
│
├── Check: Is Shopify configured?
│   ├── No → Is Dev?
│   │   ├── Yes → createMockCommerce()
│   │   └── No → createDisabledCommerce()
│   │
│   └── Yes → Is Dev?
│       ├── Yes → Is USE_REAL_COMMERCE=true?
│       │   ├── Yes → createShopifyCommerceAdapter()
│       │   └── No → createMockCommerce()
│       │
│       └── No → createShopifyCommerceAdapter()
│
▼
Singleton: commerce = createCommerce()
│
▼
Client domains import: { commerce } from '@platform/commerce'
```

### Why This Matters

1. **Zero-Config Local Dev**: Clone repo → `npm run dev` → works with mocks
2. **Easy Testing**: Tests automatically use mocks
3. **Graceful Degradation**: Production fails clearly if misconfigured
4. **Feature Flags**: Toggle real APIs with env vars

---

## 4. 🔐 Type Safety Across Boundaries

### Shared Primitives

**File:** `platform/ports/primitives.ts`

```typescript
export type ProductKey = string
export type VariantKey = string
export type CartKey = string
export type CartLineKey = string

export type MoneyDTO = {
  amount: number
  currencyCode: string
}
```

**Why?**
- ✅ Consistent typing across all domains
- ✅ Prevents "stringly typed" errors
- ✅ Clear semantic meaning (VariantKey ≠ string)

### Port-Specific DTOs

**File:** `platform/commerce/ports/cart.ts`

```typescript
export type CartLineDTO = {
  lineKey: CartLineKey        // ← Shared primitive
  variantKey: VariantKey      // ← Shared primitive
  title: string
  qty: number
  unitPrice: MoneyDTO         // ← Shared DTO
  compareAt?: MoneyDTO
  image?: string
}

export type CartDTO = {
  cartKey: CartKey
  lines: CartLineDTO[]
  subtotal: MoneyDTO
  currencyCode?: string
  discountCodes?: string[]
}
```

### Error Types

**File:** `platform/ports/errors.ts`

```typescript
export type PortErrorCode =
  | 'NOT_CONFIGURED'
  | 'UNAVAILABLE'
  | 'NOT_FOUND'
  | 'INVALID_INPUT'
  | 'RATE_LIMITED'
  | 'UNKNOWN'

export class PortError extends Error {
  public readonly code: PortErrorCode
  public readonly cause?: unknown
  public readonly details?: Record<string, unknown>

  constructor(
    code: PortErrorCode,
    message: string,
    opts?: { cause?: unknown; details?: Record<string, unknown> }
  ) {
    super(message)
    this.name = 'PortError'
    this.code = code
    this.cause = opts?.cause
    this.details = opts?.details
  }
}
```

**Usage:**

```typescript
const getCart = async (): Promise<CartDTO> => {
  if (!configured) {
    throw new PortError(
      'NOT_CONFIGURED',
      'Commerce provider is not configured',
      { details: { missing: ['SHOPIFY_STORE_DOMAIN'] } }
    )
  }
  // ...
}
```

---

## 5. 🏗️ DDD Layer Structure (application/domain/infrastructure)

### Where It's Used

The **full DDD layering** is used in complex domains like `admin/settings-siso`:

```
01-general/
├── application/           # Use cases & orchestration
│   └── sections/
│       └── notifications/
│           └── useNotificationSettings.ts
├── domain/                # Domain models & business rules
│   ├── types.ts           # Domain types
│   └── schema.ts          # Zod validation schemas
├── infrastructure/        # External integrations
│   └── notificationService.ts
└── ui/                    # User interface
    └── components/
```

### Application Layer (Use Cases)

**Purpose:** Orchestrate domain logic and infrastructure

**File:** `application/sections/notifications/useNotificationSettings.ts`

```typescript
/**
 * Application Service
 * Orchestrates business logic (doesn't hold it)
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

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    setLoading(true)
    try {
      // Call infrastructure
      const loaded = await notificationService.getSettings()
      setSettings(loaded)
    } catch (error) {
      console.error('Failed to load:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateSettings = async (updates: Partial<NotificationSettings>) => {
    // Could add validation logic here
    const updated = await notificationService.updateSettings(updates)
    setSettings(updated)
  }

  return { settings, loading, updateSettings }
}
```

### Domain Layer (Business Rules)

**Purpose:** Pure domain models, no external dependencies

**File:** `domain/types.ts`

```typescript
/**
 * Domain Types
 * Pure business concepts, no framework deps
 */

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
  frequency: 'immediate' | 'hourly' | 'daily' | 'weekly'
}
```

**File:** `domain/schema.ts`

```typescript
/**
 * Domain Schema
 * Validation rules for domain types
 */

import { z } from 'zod'

export const NotificationPreferencesSchema = z.object({
  email: z.boolean(),
  push: z.boolean(),
  inApp: z.boolean(),
  categories: z.object({
    deals: z.boolean(),
    messages: z.boolean(),
    tasks: z.boolean(),
    updates: z.boolean(),
    announcements: z.boolean(),
    reminders: z.boolean(),
  }),
  frequency: z.enum(['immediate', 'hourly', 'daily', 'weekly']),
  quietHours: z
    .object({
      enabled: z.boolean(),
      start: z.string(),
      end: z.string(),
    })
    .optional(),
})
```

### Infrastructure Layer (External Services)

**Purpose:** Integrations with external systems

**File:** `infrastructure/notificationService.ts`

```typescript
/**
 * Infrastructure Service
 * External system integration
 */

import type { NotificationSettings } from '../domain/types'

class NotificationService {
  async getSettings(): Promise<NotificationSettings> {
    // Call external API, database, etc.
    const response = await fetch('/api/notifications/settings')
    return response.json()
  }

  async updateSettings(
    updates: Partial<NotificationSettings>
  ): Promise<NotificationSettings> {
    const response = await fetch('/api/notifications/settings', {
      method: 'PATCH',
      body: JSON.stringify(updates),
    })
    return response.json()
  }
}

export const notificationService = new NotificationService()
```

### Layer Dependencies

```
┌─────────────────────────────────────────┐
│           UI Layer                      │
│  (React components, hooks)              │
│  Imports: application, domain types     │
└─────────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│      Application Layer                  │
│  (Use cases, orchestration)             │
│  Imports: domain, infrastructure        │
└─────────────────────────────────────────┘
                │
        ┌───────┴───────┐
        ▼               ▼
┌──────────────┐  ┌──────────────┐
│ Domain Layer │  │Infrastructure│
│ (Types,      │  │ (External    │
│  Schemas)    │  │  APIs, DB)   │
└──────────────┘  └──────────────┘
```

**Rules:**
- ✅ UI → Application
- ✅ Application → Domain + Infrastructure
- ❌ Domain → Infrastructure (domain stays pure)
- ❌ Infrastructure → Domain (infrastructure implements domain interfaces)

---

## 6. ✅ Schema Validation with Zod

### Runtime Type Checking

Every complex domain uses **Zod schemas** for validation:

**Why Zod?**
- ✅ Runtime validation (catch bad data)
- ✅ TypeScript inference (derive types from schemas)
- ✅ Error messages (helpful validation errors)
- ✅ Schema composition (reuse schemas)

**Example:** Settings Domain

```typescript
// 1. Define schema
export const AppearanceSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']),
  fontSize: z.enum(['small', 'medium', 'large', 'extra-large']),
  reducedMotion: z.boolean(),
  highContrast: z.boolean(),
  hapticsEnabled: z.boolean(),
  customAccentColor: z.string().optional(),
})

// 2. Infer type
export type AppearanceSettings = z.infer<typeof AppearanceSchema>

// 3. Validate at runtime
const parseAppearance = (data: unknown) => {
  return AppearanceSchema.parse(data) // ← Throws if invalid
}

// 4. Safe parse (no throw)
const result = AppearanceSchema.safeParse(data)
if (!result.success) {
  console.error(result.error) // ← Zod error details
}
```

### Schema Composition

```typescript
// Base schemas
export const MoneySchema = z.object({
  amount: z.number().min(0),
  currencyCode: z.string().length(3),
})

// Composed schemas
export const CartLineSchema = z.object({
  variantKey: z.string(),
  qty: z.number().int().positive(),
  unitPrice: MoneySchema,
})

export const CartSchema = z.object({
  cartKey: z.string(),
  lines: z.array(CartLineSchema),
  subtotal: MoneySchema,
})
```

---

## 7. 🔗 Shared Platform Contracts

### Cross-Domain Type Safety

The `platform/ports` folder defines **shared contracts** used across all domains:

**File:** `platform/ports/index.ts`

```typescript
export * from './errors'        // PortError class
export * from './primitives'    // ProductKey, MoneyDTO, etc.
```

**Usage in Commerce:**

```typescript
// platform/commerce/ports/cart.ts
import type { CartKey, CartLineKey, MoneyDTO, VariantKey } from '@platform/ports'

export type CartDTO = {
  cartKey: CartKey        // ← Shared type
  lines: CartLineDTO[]
  subtotal: MoneyDTO      // ← Shared type
}
```

**Usage in Client:**

```typescript
// client/shop/cart/providers/CartContext.tsx
import type { CartDTO, CartLineDTO } from '@platform/commerce/ports'

// Same types, guaranteed consistency
```

### Benefits

1. **Single Source of Truth**: One definition of `MoneyDTO` everywhere
2. **Compile-Time Safety**: TypeScript ensures contracts match
3. **Refactoring**: Change primitive → propagate everywhere
4. **Documentation**: Types serve as API documentation

---

## 8. 🎯 Key Architectural Principles

### 1. Dependency Inversion

**High-level modules shouldn't depend on low-level modules. Both should depend on abstractions.**

```
❌ Bad: Client → Shopify Adapter
✅ Good: Client → CartPort → ShopifyAdapter
```

### 2. Interface Segregation

**Clients shouldn't depend on interfaces they don't use.**

```typescript
❌ Bad: CartPort with 50 methods (some for admin, some for client)
✅ Good: CartPort (client), AdminCartPort (admin)
```

### 3. Single Responsibility

**Each layer has one job:**

| Layer | Responsibility |
|-------|---------------|
| UI | Display & user interaction |
| Application | Orchestrate use cases |
| Domain | Business rules |
| Infrastructure | External integrations |

### 4. Don't Repeat Yourself (DRY)

**Shared primitives avoid duplication:**

```typescript
❌ Bad: 'string' used for product IDs everywhere
✅ Good: ProductKey type used everywhere
```

---

## 9. 🔧 Advanced Patterns Summary

| Pattern | Where Used | Benefit |
|---------|-----------|---------|
| **Ports & Adapters** | Platform services | Vendor independence |
| **Runtime Config** | `runtime.ts` files | Zero-config dev, testing |
| **Shared Primitives** | `platform/ports` | Type safety across domains |
| **DTOs** | Port interfaces | Data transfer contracts |
| **DDD Layering** | `admin/settings-siso` | Complex business logic |
| **Zod Schemas** | Domain layer | Runtime validation |
| **Export Control** | Domain `index.ts` | Hide implementation |
| **Singleton Runtime** | Platform domains | Single configured instance |

---

## 10. 🚀 Real-World Example: Complete Cart Flow

### 1. Client Uses Port

```typescript
// client/shop/cart/providers/CartContext.tsx
import { commerce } from '@platform/commerce'
import type { CartDTO, CartLineDTO } from '@platform/commerce/ports'

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState<CartDTO | null>(null)

  const addToCart = async (variantKey: string, qty: number) => {
    // ← Calls port interface (vendor-agnostic)
    const updated = await commerce.cart.addLine({ variantKey, qty })
    setCart(updated)
  }

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}
```

### 2. Port Selects Adapter

```typescript
// platform/commerce/runtime.ts
export const commerce = createCommerce()
// ← Returns: { cart: CartPort, checkout: CheckoutPort, ... }

// In dev: Mock adapter
// In prod: Shopify adapter
```

### 3. Adapter Talks to Vendor

```typescript
// platform/commerce/adapters/shopify/internal-api/cart.ts
export const createShopifyCartPort = (): CartPort => {
  return {
    async addLine({ variantKey, qty }) {
      // ← Shopify-specific API call
      await fetch('/cart/add.js', {
        method: 'POST',
        body: JSON.stringify({ items: [{ id: variantKey, quantity: qty }] })
      })
      return this.getCart()
    }
  }
}
```

### 4. Data Flow Summary

```
User clicks "Add to Cart"
    ↓
UI: CartContext.addToCart()
    ↓
Port: commerce.cart.addLine()  ← Interface
    ↓
Adapter: ShopifyCartPort.addLine()  ← Implementation
    ↓
Vendor: Shopify /cart/add.js API
    ↓
Response: CartDTO  ← Normalized data
    ↓
UI: CartContext updates state
    ↓
User sees cart updated
```

---

## 📚 Related Documentation

- **Domain Map:** [00-DOMAIN-MAP.md](./00-DOMAIN-MAP.md)
- **Practical Guide:** [01-PRACTICAL-GUIDE.md](./01-PRACTICAL-GUIDE.md)
- **Main Overview:** [README.md](./README.md)
- **Visual Summary:** [VISUAL-SUMMARY.md](./VISUAL-SUMMARY.md)

---

**Last Updated:** 2026-01-12
**Version:** 1.0
**Status:** ✅ Advanced Patterns
