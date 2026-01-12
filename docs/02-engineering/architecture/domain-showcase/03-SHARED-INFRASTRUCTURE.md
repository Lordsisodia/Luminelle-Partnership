# Shared Infrastructure & Supporting Architecture

**The glue that holds the domain system together**

---

## 🎯 Overview

Beyond the main application and platform domains, Lumelle has critical **shared infrastructure** that enables the entire system to work:

1. **Shared Domain** - Cross-cutting utilities
2. **UI Kit Domain** - Component library
3. **Lib Utilities** - Third-party integrations
4. **Config Management** - Environment & constants
5. **Content Structure** - CMS-like content
6. **Component Architecture** - How components are composed

---

## 1. 🔗 Shared Domain (`src/domains/shared/`)

**Purpose:** Utilities and code used across multiple domains

### Structure

```
shared/
├── hooks/              # Shared React hooks
├── ui/                 # Shared UI utilities
└── utils/              # Pure utility functions
```

### What Goes Here

**✅ Should be in shared:**
- Generic utility functions (date formatting, string manipulation)
- Shared UI helpers (classnames wrappers, CSS utilities)
- Generic hooks (useDebounce, useLocalStorage)
- Constants used across domains

**❌ Should NOT be in shared:**
- Business logic (put in specific domain)
- Domain-specific types (put in domain or platform/ports)
- Vendor integrations (put in platform adapters)

### Examples

**File:** `shared/utils/format.ts` (hypothetical)

```typescript
export const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
  }).format(amount)
}

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-GB').format(date)
}
```

**Usage:**

```typescript
// In any domain
import { formatCurrency } from '@shared/utils'

const price = formatCurrency(29.99, 'GBP') // "£29.99"
```

---

## 2. 🎨 UI Kit Domain (`src/domains/ui-kit/`)

**Purpose:** Atomic, reusable component library

### Structure

```
ui-kit/
├── .docs/              # Component documentation
├── components/         # Reusable UI components
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   ├── Card/
│   ├── Modal/
│   ├── Form/
│   └── [100+ components]
└── stories/            # Storybook stories
    ├── Button.stories.tsx
    ├── Card.stories.tsx
    └── [more stories...]
```

### Design Philosophy

**UI Kit components are:**
- **Atomic**: Small, focused, single-purpose
- **Reusable**: Work in any domain
- **Unopinionated**: Minimal styling, easy to customize
- **Documented**: Every component has docs/tests

### Component Hierarchy

```
┌─────────────────────────────────────┐
│     Domain Components               │
│  (client/shop/products/ui/)         │
│                                     │
│  <ProductCard>                       │
│    <Button>Add to Cart</Button>     │
│    <StarRating rating={4} />         │
│  </ProductCard>                      │
└─────────────────────────────────────┘
                │
                │ Import from @ui-kit
                │
                ▼
┌─────────────────────────────────────┐
│       UI Kit Components             │
│  (src/domains/ui-kit/components/)   │
│                                     │
│  <Button />                          │
│  <StarRating />                      │
│  <Card />                            │
│  <Modal />                           │
└─────────────────────────────────────┘
                │
                │ Built on
                │
                ▼
┌─────────────────────────────────────┐
│      HTML Elements                  │
│                                     │
│  <button>, <div>, <input>...        │
└─────────────────────────────────────┘
```

### Example: Button Component

**File:** `ui-kit/components/Button/Button.tsx`

```typescript
import { clsx } from 'clsx'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        'btn',
        `btn-${variant}`,
        `btn-${size}`,
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
```

**Usage in Domain:**

```typescript
// In client/shop/products/ui/components/AddToCartButton.tsx
import { Button } from '@ui-kit/components/Button'

export const AddToCartButton = () => {
  return (
    <Button variant="primary" size="lg" onClick={handleAdd}>
      Add to Cart
    </Button>
  )
}
```

### When to Use UI Kit vs Domain Components

| Use UI Kit When... | Use Domain Components When... |
|-------------------|------------------------------|
| Generic UI element (buttons, inputs) | Business-specific (ProductCard, CheckoutForm) |
| Used across multiple domains | Specific to one domain |
| No business logic | Contains business logic |
| Purely presentational | Orchestrates multiple components |

---

## 3. 📦 Lib Utilities (`src/lib/`)

**Purpose:** Third-party library integrations and wrappers

### Structure

```
lib/
├── analytics/          # Analytics (PostHog, etc.)
├── anon.ts             # Anonymous tracking
├── cookieConsent.ts    # Cookie consent management
├── product.ts          # Product utilities
├── sections.ts         # Section utilities
├── seo.ts              # SEO utilities
├── serviceWorkerUpdates.ts
├── supabase.ts         # Supabase client
├── ui.ts               # UI utilities
└── utils/              # General utilities
```

### Key Libraries

#### Analytics (`lib/analytics/`)

```typescript
// PostHog or similar analytics
export const trackEvent = (event: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.posthog) {
    window.posthog.capture(event, properties)
  }
}
```

#### Supabase Client (`lib/supabase.ts`)

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

#### SEO (`lib/seo.ts`)

```typescript
export const getMetaTags = (props: {
  title: string
  description: string
  image?: string
}) => {
  return {
    title: props.title,
    description: props.description,
    openGraph: {
      title: props.title,
      description: props.description,
      images: props.image ? [{ url: props.image }] : [],
    },
  }
}
```

### Usage Pattern

**❌ Don't use libraries directly in domains:**

```typescript
// In client/shop/products/ui/pages/ProductPage.tsx
import { createClient } from '@supabase/supabase-js' // ← Bad
```

**✅ Use lib wrappers:**

```typescript
// In domain
import { supabase } from '@/lib/supabase' // ← Good

const product = await supabase
  .from('products')
  .select('*')
  .eq('id', productId)
  .single()
```

---

## 4. ⚙️ Config Management (`src/config/`)

**Purpose:** Environment-specific configuration and constants

### Structure

```
config/
├── clerk.ts            # Clerk auth config
├── constants.ts        # App-wide constants
└── README.md
```

### Constants (`config/constants.ts`)

```typescript
export const MAX_CART_ITEM_QTY = 10
export const FREE_SHIPPING_THRESHOLD_LABEL = 'Free shipping on orders over £50'
export const DEFAULT_CURRENCY = 'GBP'

export const ROUTES = {
  HOME: '/',
  SHOP: '/shop',
  PRODUCT: (handle: string) => `/shop/${handle}`,
  CART: '/cart',
  CHECKOUT: '/checkout',
  ACCOUNT: '/account',
} as const
```

### Clerk Config (`config/clerk.ts`)

```typescript
import { Clerk } from '@clerk/clerk-react'

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

export const clerk = new Clerk(clerkPubKey)
```

### Usage

```typescript
// In any domain
import { MAX_CART_ITEM_QTY, ROUTES } from '@/config/constants'
import { clerk } from '@/config/clerk'

if (qty > MAX_CART_ITEM_QTY) {
  setError(`Maximum quantity is ${MAX_CART_ITEM_QTY}`)
}

const navigate = useNavigate()
navigate(ROUTES.PRODUCT('shower-cap'))
```

---

## 5. 📄 Content Structure (`src/content/`)

**Purpose:** CMS-like content configuration

### Structure

```
content/
├── home.config.ts      # Landing page sections
├── home.types.ts       # Content type definitions
└── landing.ts          # Landing page content
```

### Home Config (`content/home.config.ts`)

```typescript
import { HeroShop } from '@client/marketing/ui/sections/hero-shop/HeroShop'
import { ProductSpotlightSection } from '@client/marketing/ui/sections/product-spotlight-section/ProductSpotlightSection'
// ... more sections

export const homeSections = [
  {
    type: 'hero',
    component: HeroShop,
    props: {
      headline: 'Beautiful Hair, Beautiful Planet',
      subhead: 'Satin shower caps & overnight curlers',
      ctaText: 'Shop Now',
      ctaLink: '/shop',
    },
  },
  {
    type: 'product-spotlight',
    component: ProductSpotlightSection,
    props: {
      productHandle: 'lumelle-shower-cap',
    },
  },
  // ... more sections
]
```

### Benefits

1. **Configuration-Driven UI**: Change layout without code
2. **A/B Testing**: Swap sections easily
3. **Content Management**: Update copy in config files
4. **Type Safety**: TypeScript ensures props match

---

## 6. 🧩 Component Architecture

### Component Composition Patterns

Lumelle uses **composition over inheritance** for UI components.

#### Pattern 1: Compound Components

```typescript
// ui-kit/components/Card/Card.tsx
export const Card = ({ children }: { children: React.ReactNode }) => {
  return <div className="card">{children}</div>
}

export const CardHeader = ({ children }: { children: React.ReactNode }) => {
  return <div className="card-header">{children}</div>
}

export const CardBody = ({ children }: { children: React.ReactNode }) => {
  return <div className="card-body">{children}</div>
}

// Usage
<Card>
  <CardHeader>Title</CardHeader>
  <CardBody>Content</CardBody>
</Card>
```

#### Pattern 2: Render Props

```typescript
// client/shop/products/ui/components/ProductGallery.tsx
export const ProductGallery = ({ images, render }: {
  images: string[]
  render: (image: string, index: number) => React.ReactNode
}) => {
  return (
    <div className="gallery">
      {images.map((img, i) => render(img, i))}
    </div>
  )
}

// Usage
<ProductGallery
  images={productImages}
  render={(img, i) => (
    <img key={i} src={img} alt={`Product view ${i + 1}`} />
  )}
/>
```

#### Pattern 3: Provider Pattern

```typescript
// client/shop/cart/providers/CartContext.tsx
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null)

  const addToCart = async (item) => {
    const updated = await commerce.cart.addLine(item)
    setCart(updated)
  }

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}

// Usage
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
```

---

## 7. 🔄 Import Path Conventions

### Path Aliases

Lumelle uses **path aliases** for clean imports:

```typescript
// tsconfig.json paths
{
  "paths": {
    "@/*": ["./src/*"],
    "@ui-kit/components/*": ["./src/domains/ui-kit/components/*"],
    "@platform/*": ["./src/domains/platform/*"],
    "@client/*": ["./src/domains/client/*"],
    "@admin/*": ["./src/domains/admin/*"],
    "@shared/*": ["./src/domains/shared/*"]
  }
}
```

### Import Patterns

**✅ Preferred:**

```typescript
// Domain imports
import { useCart } from '@client/shop/cart/providers'
import { commerce } from '@platform/commerce'
import { Button } from '@ui-kit/components/Button'

// Lib/config imports
import { supabase } from '@/lib/supabase'
import { MAX_CART_ITEM_QTY } from '@/config/constants'
```

**❌ Avoid:**

```typescript
// Relative imports (hard to maintain)
import { useCart } from '../../../shop/cart/providers'
import { Button } from '../../../../ui-kit/components/Button'

// Direct library imports (use lib wrapper)
import { createClient } from '@supabase/supabase-js'
```

---

## 8. 🎨 Theming & Design Tokens

### Design Tokens (`src/theme/`)

```
theme/
├── index.css           # Global styles
├── siso-color-system.css/  # Color system
└── siso-tw-animate.css     # Animations
```

### Token Categories

1. **Colors**: Semantic color tokens (primary, secondary, accent)
2. **Typography**: Font families, sizes, weights
3. **Spacing**: Scale for margins/padding
4. **Motion**: Animation durations, easings
5. **Breakpoints**: Responsive design tokens

### Usage

```css
/* In CSS */
.product-card {
  background: var(--color-surface);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
}

/* In TypeScript (via CSS-in-JS) */
const styles = {
  card: {
    backgroundColor: 'var(--color-surface)',
    padding: 'var(--spacing-md)',
  }
}
```

---

## 9. 🔧 State Management Strategy

Lumelle uses **multiple state management approaches** based on use case:

| State Type | Solution | Example |
|------------|----------|---------|
| **Local Component State** | `useState` | Form inputs, toggles |
| **Cross-Component State** | Context API | Cart, auth, theme |
| **Server State** | React Query (@tanstack/react-query) | Products, user data |
| **URL State** | React Router params | Filtering, sorting |
| **Form State** | React Hook Form | All forms |
| **Global Config** | Singleton exports | Feature flags |

### React Query Example

```typescript
// client/shop/products/hooks/useProduct.ts
import { useQuery } from '@tanstack/react-query'
import { commerce } from '@platform/commerce'

export const useProduct = (handle: string) => {
  return useQuery({
    queryKey: ['product', handle],
    queryFn: () => commerce.catalog.getProductByHandle(handle),
  })
}
```

---

## 10. 🚀 Routing Architecture

### File-Based Routing

```
src/
├── App.tsx                 # Main app
├── router.tsx              # Route definitions
└── domains/
    ├── client/
    │   └── shop/
    │       └── products/
    │           └── ui/
    │               └── pages/
    │                   └── ProductPage.tsx
    └── admin/
        └── settings-siso/
            └── 01-general/
                └── ui/
                    └── pages/
                        └── GeneralSettingsPage.tsx
```

### Route Definition (`router.tsx`)

```typescript
import { createBrowserRouter } from 'react-router-dom'
import { ProductPage } from '@client/shop/products/ui/pages/ProductPage'
import { GeneralSettingsPage } from '@admin/settings-siso/01-general/ui/pages/GeneralSettingsPage'

export const router = createBrowserRouter([
  {
    path: '/shop/:handle',
    element: <ProductPage />,
  },
  {
    path: '/admin/settings/general',
    element: <GeneralSettingsPage />,
  },
  // ... more routes
])
```

---

## 11. 📊 Data Flow Architecture

### Unidirectional Data Flow

```
┌─────────────────────────────────────────────────────┐
│                    User Action                      │
│                  (Click, Type, etc.)                │
└─────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│                   UI Component                      │
│  (Re-renders with new props/state)                 │
└─────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│              Event Handler / Hook                   │
│  (Captures user intent)                             │
└─────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│              Business Logic Layer                   │
│  (Pure functions, validation)                       │
└─────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│              State Update                           │
│  (Context, setState, React Query)                   │
└─────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│              External System                        │
│  (API call, database, port)                         │
└─────────────────────────────────────────────────────┘
                        │
                        ▼
                   Response Data
                        │
                        ▼
                  (Cycle repeats)
```

---

## 12. 🎯 Best Practices Summary

### Import Organization

```typescript
// 1. React imports
import { useState, useEffect } from 'react'

// 2. Third-party imports
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers'

// 3. Platform imports (ports, types)
import { commerce } from '@platform/commerce'
import type { CartDTO } from '@platform/commerce/ports'

// 4. Domain imports (cross-domain)
import { useAuth } from '@platform/auth/hooks'

// 5. Local domain imports
import { useCartAdd } from '../hooks/useCartAdd'

// 6. Shared imports
import { Button } from '@ui-kit/components/Button'
import { formatCurrency } from '@shared/utils'

// 7. Lib/config imports
import { supabase } from '@/lib/supabase'
import { MAX_QTY } from '@/config/constants'

// 8. Types (if not already imported)
import type { Product } from '../types'
```

### File Naming

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `ProductCard.tsx` |
| Hooks | camelCase with 'use' prefix | `useProduct.ts` |
| Utils | camelCase | `formatCurrency.ts` |
| Types | camelCase with 'types' suffix | `cartTypes.ts` or `types.ts` |
| Tests | ComponentName.test.tsx | `ProductCard.test.tsx` |
| Stories | ComponentName.stories.tsx | `Button.stories.tsx` |

### Folder Structure Rules

1. **Max 10 items per folder**: Add subfolders if more
2. **Index exports**: Use `index.ts` to expose public API
3. **Co-locate tests**: Tests next to source files
4. **Barrel exports**: Group related exports in index files

---

## 📚 Related Documentation

- **Domain Map:** [00-DOMAIN-MAP.md](./00-DOMAIN-MAP.md)
- **Practical Guide:** [01-PRACTICAL-GUIDE.md](./01-PRACTICAL-GUIDE.md)
- **Advanced Patterns:** [02-ADVANCED-PATTERNS.md](./02-ADVANCED-PATTERNS.md)
- **Main Overview:** [README.md](./README.md)

---

**Last Updated:** 2026-01-12
**Version:** 1.0
**Status:** ✅ Shared Infrastructure
