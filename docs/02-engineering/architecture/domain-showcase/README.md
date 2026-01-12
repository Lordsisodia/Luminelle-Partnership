# Lumelle Domain Architecture Showcase

**A Domain-Driven Design Approach to Frontend Architecture**

---

## 🏛️ The Big Picture

Lumelle's architecture is organized around **business domains**, not technical layers. This makes the codebase intuitive, scalable, and easy to navigate.

```
src/domains/
├── admin/          # Admin panel & management
├── blog/           # Blog functionality
├── client/         # Customer-facing features
├── creator/        # Creator portal
├── partnerships/   # Partnership features
├── platform/       # Platform services (auth, commerce, etc.)
├── shared/         # Shared utilities
└── ui-kit/         # Reusable component library
```

---

## 🎯 The 4 Main Application Domains

These are the primary business-facing domains that power the Lumelle application:

| Domain | Purpose | Example Features |
|--------|---------|------------------|
| **Admin** | Administrative interface | Analytics, catalog management, orders, settings |
| **Blog** | Content publishing | Blog posts, articles, content management |
| **Client** | Customer experience | Shopping, account, marketing, rewards |
| **Creator** | Creator portal | Creator-specific features and tools |

---

## 📐 The Universal Subdomain Pattern

Every subdomain within the main domains follows a **consistent, predictable structure**:

```
subdomain-name/
├── .docs/              # 📚 Documentation (what this does)
├── data/               # 💾 Data fixtures, static data, config
├── hooks/              # 🪝 Custom React hooks
├── logic/              # 🧠 Pure business logic & utilities
├── providers/          # ⚡ React context providers
├── state/              # 🔄 State management (stores, reducers)
└── ui/                 # 🎨 All UI components
    ├── components/     # Reusable components
    ├── pages/          # Page-level components
    ├── sections/       # Section components
    └── layouts/        # Layout wrappers
```

### Folder Purpose Guide

| Folder | What Lives Here | Examples |
|--------|----------------|----------|
| **`.docs/`** | Documentation, READMEs, architecture notes | Purpose, integration guides, roadmap |
| **`data/`** | Static data, fixtures, configuration | Product catalogs, form fixtures, mock data |
| **`hooks/`** | Custom React hooks specific to this subdomain | `useProduct()`, `useCart()`, `useCheckout()` |
| **`logic/`** | Pure business logic (no UI dependencies) | Price calculations, validation, utilities |
| **`providers/`** | Context providers for state management | `CartProvider`, `AuthProvider` |
| **`state/`** | State stores, reducers, selectors | Redux stores, Zustand stores |
| **`ui/`** | All UI components (organized by type) | Components, pages, sections, layouts |

---

## 🎨 Domain Deep Dives

### 1. Admin Domain (`src/domains/admin/`)

**Purpose:** Administrative interface for managing the entire platform.

#### Subdomains

```
admin/
├── analytics/          # 📊 Analytics dashboard
├── blog/               # ✍️ Blog management
├── catalog/            # 📦 Product catalog management
├── media/              # 🖼️ Media library
├── orders/             # 🛒 Order management
├── pages/              # 📄 Page builder
├── profile/            # 👤 Admin profile
├── settings/           # ⚙️ Settings (legacy)
├── settings-siso/      # ⚙️ Settings (new modular version)
└── shared/             # 🔗 Shared admin utilities
```

#### Example: `admin/catalog/`

```
catalog/
├── .docs/              # Catalog domain documentation
├── data/               # Product fixtures, catalog config
└── ui/
    ├── cards/          # Product cards
    ├── components/     # Reusable catalog components
    ├── layouts/        # Catalog layouts
    ├── pages/          # Catalog pages
    ├── preview/        # Preview components
    └── sections/       # Catalog sections
```

#### Example: `admin/settings-siso/` (Modular Settings)

A beautiful example of the subdomain pattern with **numbered modules**:

```
settings-siso/
├── 01-general/         # General settings
├── 02-my-account/      # Account settings
├── 03-profile/         # Profile settings
├── 04-devices/         # Connected devices
├── 05-security/        # Security settings
├── 06-privacy/         # Privacy settings
├── 07-legal/           # Legal settings
├── 08-integrations/    # Third-party integrations
├── 09-wallet/          # Wallet settings
└── shared/             # Shared settings utilities
```

Each module follows the full pattern:
```
01-general/
├── application/        # Use cases & orchestration
├── data/               # Settings fixtures & config
├── docs/               # Documentation
├── domain/             # Domain models & types
├── infrastructure/     # External integrations
└── ui/                 # Settings UI components
```

---

### 2. Blog Domain (`src/domains/blog/`)

**Purpose:** Blog functionality for content publishing.

```
blog/
├── .docs/              # Blog domain documentation
├── data/               # Blog posts, articles, fixtures
├── hooks/              # `useBlogPost()`, `useBlogList()`
├── logic/              # Blog utilities, formatters
└── ui/                 # Blog UI components
```

**Clean & Simple:** The blog domain is a perfect example of the pattern in its purest form.

---

### 3. Client Domain (`src/domains/client/`)

**Purpose:** All customer-facing features.

#### Subdomains

```
client/
├── account/            # 👤 User account management
├── marketing/          # 📢 Marketing sections (hero, testimonials, etc.)
├── rewards/            # 🎁 Rewards program
└── shop/               # 🛍️ Shopping features
```

#### Example: `client/shop/` (Full Ecommerce)

The **shop subdomain** is the most comprehensive example:

```
shop/
├── cart/               # Shopping cart
├── checkout/           # Checkout flow
└── products/           # Product catalog
```

##### Deep Dive: `client/shop/products/`

```
products/
├── .docs/              # Product domain documentation
├── data/               # Product fixtures, galleries, config
├── hooks/              # `useProduct()`, `useProductVariant()`
├── logic/              # Price calculations, availability checks
├── providers/          # Product context providers
└── state/              # Product state management
└── ui/
    ├── components/     # Product components
    ├── layouts/        # Product layouts
    ├── pages/          # Product pages (PDP)
    │   └── ProductPage/
    │       ├── sections/
    │       │   ├── details-accordion/
    │       │   ├── faq-mini/
    │       │   ├── feature-callouts/
    │       │   ├── hero-proof-strip/
    │       │   ├── reviews-auto-carousel/
    │       │   └── ...
    └── sections/       # Product sections
```

**What's in each folder:**

- **`data/`**: Product configurations, image galleries, fixtures
  - `product-config.ts` - Product definitions
  - `gallery-config.ts` - Image galleries
  - `product-fixtures.ts` - Mock data for development

- **`hooks/`**: React hooks for product logic
  - `useProduct()` - Fetch product data
  - `useProductVariant()` - Handle variant selection
  - `useProductPrice()` - Price calculations

- **`logic/`**: Pure business logic
  - `priceCalculations.ts` - Discount logic
  - `availabilityUtils.ts` - Stock checks
  - `variantUtils.ts` - Variant matching

- **`providers/`**: State management
  - `ProductProvider.tsx` - Product context

- **`ui/`**: All product UI
  - `components/` - Reusable product components
  - `pages/ProductPage/` - Full product page
  - `sections/` - Feature-specific sections (reviews, FAQ, etc.)

#### Example: `client/marketing/`

Marketing sections organized by feature:

```
marketing/ui/sections/
├── hero-shop/                  # Hero sections
├── success/                    # Success stories / testimonials
├── final-cta-section/          # Call-to-action (spin wheel!)
└── product-spotlight-section/  # Product features
```

---

### 4. Creator Domain (`src/domains/creator/`)

**Purpose:** Creator portal and features.

```
creator/
├── .docs/              # Creator domain documentation
└── ui/
    ├── pages/          # Creator pages
    └── sections/       # Creator sections
```

---

## 🔄 Platform Domains (Shared Services)

Platform domains provide **shared services** used by application domains:

```
platform/
├── auth/               # 🔐 Authentication & authorization
├── cms/                # 📝 CMS integration
├── commerce/           # 💰 Commerce integrations (Shopify, payments)
├── content/            # 📄 Content management
├── design-tokens/      # 🎨 Design system
├── feature-flags/      # 🚩 Feature flagging
├── http/               # 🌐 HTTP utilities
├── observability/      # 📊 Monitoring & logging
├── payments/           # 💳 Payment processing
├── ports/              # 🔌 Port interfaces
├── seo/                # 🔍 SEO utilities
└── storage/            # 📦 Storage solutions
```

### Key Pattern: Ports & Adapters

Platform domains use the **Hexagonal Architecture** pattern:

```
[Client Domain] → [Port Interface] → [Adapter] → [Vendor]
```

**Example:**

```typescript
// Port: Define what we need
interface CheckoutPort {
  startCheckout(items: CartItem[]): Promise<CheckoutURL>
}

// Adapter: Implement for a vendor
class ShopifyCheckoutAdapter implements CheckoutPort {
  async startCheckout(items) {
    return shopify.checkout.create(items)
  }
}
```

**Benefits:**
- ✅ Vendor independence (swap Shopify without touching UI)
- ✅ Testability (mock ports for testing)
- ✅ Clear boundaries

---

## 🎨 UI Kit Domain (`src/domains/ui-kit/`)

**Purpose:** Shared, reusable component library.

```
ui-kit/
├── .docs/              # Component documentation
├── components/         # Reusable UI components
└── stories/            # Component stories (Storybook)
```

This is the **atomic layer** that all other domains build upon.

---

## 📊 Domain Hierarchy Visualization

```
Lumelle Application
│
├── 🏢 Admin Domain
│   ├── Analytics
│   ├── Blog Management
│   ├── Catalog
│   ├── Orders
│   ├── Settings (modular: 01-09)
│   └── Shared Utilities
│
├── 📝 Blog Domain
│   ├── Blog Posts
│   └── Articles
│
├── 🛍️ Client Domain
│   ├── Account
│   ├── Marketing (hero, testimonials, CTA)
│   ├── Rewards
│   └── Shop
│       ├── Cart
│       ├── Checkout
│       └── Products
│
├── 👩‍🎨 Creator Domain
│   └── Creator Portal
│
├── 🔧 Platform Services
│   ├── Auth
│   ├── Commerce (Shopify, payments)
│   ├── CMS
│   ├── Content
│   └── ... (shared services)
│
├── 🎨 UI Kit
│   └── Reusable Components
│
└── 🔗 Shared Utilities
    ├── Hooks
    ├── UI Helpers
    └── Utilities
```

---

## 🚀 Why This Architecture Works

### 1. **Predictable Structure**

Every subdomain follows the same pattern. Once you learn it, you can navigate any domain instantly.

### 2. **Separation of Concerns**

- **Data** is separate from **UI**
- **Logic** is separate from **React**
- **Domain** is separate from **Infrastructure**

### 3. **Vendor Independence**

Platform domains abstract away vendor specifics through ports and adapters.

### 4. **Scalability**

Add new features by:
1. Creating a new subdomain (or extending an existing one)
2. Following the established pattern
3. Documenting in `.docs/`

### 5. **Collaboration**

Different team members can work on different domains without conflicts.

### 6. **AI-Friendly**

The consistent structure makes it easy for AI agents to understand and modify the codebase.

---

## 📚 Quick Navigation Guide

| I want to... | Go to... |
|--------------|----------|
| Add a new admin feature | `src/domains/admin/<relevant-subdomain>/` |
| Create a new product page | `src/domains/client/shop/products/ui/pages/` |
| Add a marketing section | `src/domains/client/marketing/ui/sections/` |
| Implement cart logic | `src/domains/client/shop/cart/logic/` |
| Manage authentication | `src/domains/platform/auth/` |
| Integrate payments | `src/domains/platform/commerce/` |
| Create a reusable component | `src/domains/ui-kit/components/` |
| Understand a domain | Look for the `.docs/` folder first! |

---

## 🎯 Best Practices

### 1. Always Document

Every domain/subdomain should have a `.docs/README.md` explaining:
- Purpose
- Key features
- How to use it
- Integration points

### 2. Keep Folders Focused

- **`data/`**: Static data only (no API calls)
- **`logic/`**: Pure functions only (no React)
- **`ui/`**: All UI goes here

### 3. Use Platform Services

Don't duplicate vendor integrations. Use platform domains:
- Need auth? → `@platform/auth`
- Need payments? → `@platform/commerce`
- Need storage? → `@platform/storage`

### 4. Share Through ui-kit

Reusable UI components go in `ui-kit`, not in individual domains.

---

## 🔍 Real-World Examples

### Adding a New Product Feature

**Scenario:** Add product reviews to the shop

```
1. Create feature in client/shop/products/
   ├── logic/reviews.ts          # Review calculations
   ├── hooks/useReviews.ts       # Review data hook
   └── ui/sections/reviews/      # Review UI
       ├── ReviewCard.tsx
       └── ReviewList.tsx

2. Document it
   └── .docs/reviews-feature.md

3. Use platform services
   └── Import from @platform/content for CMS storage
```

### Adding a New Admin Section

**Scenario:** Add newsletter management to admin

```
1. Create new subdomain
   admin/newsletter/
   ├── .docs/
   ├── data/
   ├── hooks/
   ├── logic/
   └── ui/
       ├── components/
       └── pages/

2. Follow the pattern
   └── Each folder has a clear purpose

3. Use shared admin utilities
   └── Import from admin/shared/
```

---

## 📖 Related Documentation

- **Main Architecture Overview:** `../ARCHITECTURE-OVERVIEW.md`
- **Platform Services:** `../../platform/README.md`
- **UI Kit Guide:** `../../../domains/ui-kit/.docs/README.md`
- **Domain Improvements:** `../../../05-planning/research/lumelle-architecture-improvements.md`

---

**Architecture Version:** 1.0
**Last Updated:** 2026-01-12
**Status:** ✅ Active & Evolving
