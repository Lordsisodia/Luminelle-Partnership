# 🎨 Visual Architecture Summary

**Quick visual guides to Lumelle's domain structure**

---

## 🏗️ The High-Level View

```
┌─────────────────────────────────────────────────────────────────┐
│                        LUMELLE APPLICATION                      │
└─────────────────────────────────────────────────────────────────┘
                                  │
        ┌─────────────────────────┼─────────────────────────┐
        │                         │                         │
        ▼                         ▼                         ▼
┌──────────────┐        ┌──────────────┐        ┌──────────────┐
│   ADMIN      │        │   CLIENT     │        │   PLATFORM   │
│  Domain      │        │   Domain     │        │   Services   │
│              │        │              │        │              │
│ • Analytics  │        │ • Shop       │        │ • Auth       │
│ • Catalog    │        │ • Account    │        │ • Commerce   │
│ • Orders     │        │ • Marketing  │        │ • CMS        │
│ • Settings   │        │ • Rewards    │        │ • Payments   │
│              │        │              │        │ • Storage    │
└──────────────┘        └──────────────┘        └──────────────┘
        │                         │                         │
        └─────────────────────────┼─────────────────────────┘
                                  │
                                  ▼
                        ┌──────────────┐
                        │   UI KIT     │
                        │  (Shared)    │
                        │              │
                        │ • Buttons    │
                        │ • Cards      │
                        │ • Forms      │
                        │ • Modals     │
                        └──────────────┘
```

---

## 📦 The Subdomain Pattern (Universal)

```
┌──────────────────────────────────────────────────────────────┐
│                    SUBDOMAIN NAME                            │
└──────────────────────────────────────────────────────────────┘
│                                                               │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐          │
│  │ .docs/ │  │ data/  │  │ hooks/ │  │ logic/ │          │
│  │        │  │        │  │        │  │        │          │
│  │ README │  │ Fixtures│  │ React  │  │ Pure   │          │
│  │ Guide  │  │ Config │  │ Logic  │  │ Funcs  │          │
│  └────────┘  └────────┘  └────────┘  └────────┘          │
│                                                               │
│  ┌────────┐  ┌────────┐  ┌────────┐                       │
│  │providers│ │ state/ │  │  ui/   │                       │
│  │        │  │        │  │        │                       │
│  │Context │  │ Store  │  │  ┌─────┴──────┐               │
│  └────────┘  └────────┘  │  │ components │               │
│                           │  ├────────────┤               │
│                           │  │   pages    │               │
│                           │  ├────────────┤               │
│                           │  │  sections  │               │
│                           │  └────────────┘               │
│                           └─────────────┘                 │
└──────────────────────────────────────────────────────────────┘
```

---

## 🎯 Admin Domain Structure

```
admin/
│
├── 📊 analytics/              Simple: .docs/ + ui/pages/
├── ✍️ blog/                  Simple: .docs/ + ui/pages/
├── 📦 catalog/               Medium: .docs/ + data/ + ui/
│                              └── components, layouts, pages, sections
├── 🖼️ media/                 Simple: .docs/ + ui/pages/
├── 🛒 orders/                Medium: .docs/ + data/ + ui/pages/
├── 📄 pages/                 Medium: .docs/ + data/ + ui/pages/
├── 👤 profile/               Simple: ui/pages/
├── ⚙️ settings/              Simple: ui/pages/
│
└── ⚙️ settings-siso/         ★ COMPLEX: Numbered modules
    ├── 01-general/
    │   ├── application/      Use cases
    │   ├── data/            Config & fixtures
    │   ├── docs/            Documentation
    │   ├── domain/          Domain models
    │   ├── infrastructure/  External integrations
    │   └── ui/              UI components
    │
    ├── 02-my-account/       [same structure]
    ├── 03-profile/          [same structure]
    ├── 04-devices/          [same structure]
    ├── 05-security/         [same structure]
    ├── 06-privacy/          [same structure]
    ├── 07-legal/            [same structure]
    ├── 08-integrations/     [same structure]
    └── shared/              Shared utilities
```

---

## 🛍️ Client Domain Structure

```
client/
│
├── 👤 account/               [Standard subdomain pattern]
│
├── 📢 marketing/             UI-focused
│   └── ui/sections/
│       ├── hero-shop/               Hero sections
│       ├── success/                 Success stories
│       ├── final-cta-section/       CTA with spin wheel
│       └── product-spotlight/       Product features
│
├── 🎁 rewards/               [Standard subdomain pattern]
│
└── 🛍️ shop/                  ★ MOST COMPREHENSIVE
    │
    ├── 🛒 cart/
    │   ├── .docs/
    │   ├── logic/           Cart calculations
    │   ├── providers/       Cart context
    │   └── ui/pages/
    │
    ├── 💳 checkout/
    │   ├── .docs/
    │   └── ui/pages/
    │
    └── 📦 products/         ★ FULL EXAMPLE
        │
        ├── .docs/          Documentation
        ├── data/           Product fixtures & config
        ├── hooks/          React hooks
        ├── logic/          Pure business logic
        ├── providers/      Context providers
        ├── state/          State management
        └── ui/             All UI
            ├── components/         Reusable components
            ├── layouts/            Product layouts
            ├── pages/              Product pages
            │   └── ProductPage/
            │       └── sections/   Page sections
            │           ├── details-accordion/
            │           ├── faq-mini/
            │           ├── feature-callouts/
            │           ├── hero-proof-strip/
            │           └── reviews-auto-carousel/
            └── sections/           Feature sections
```

---

## 🔌 Platform Services (Ports & Adapters)

```
platform/
│
├── 🔐 auth/                 Authentication service
│   ├── hooks/              Auth hooks
│   ├── logic/              Auth logic
│   ├── providers/          Auth providers
│   ├── data/               User data
│   └── ui/                 Auth UI
│
├── 💰 commerce/             ★ EXAMPLE: Ports & Adapters
│   ├── adapters/           Vendor implementations
│   │   └── shopify/        Shopify integration
│   │       ├── internal-api/
│   │       └── checkout.ts
│   └── ports/              Interfaces
│       ├── CheckoutPort.ts
│       └── CartPort.ts
│
├── 📝 cms/                  CMS integration
├── 📄 content/              Content management
├── 🎨 design-tokens/        Design system
├── 🚩 feature-flags/        Feature flagging
├── 🌐 http/                 HTTP utilities
├── 📊 observability/        Monitoring
├── 💳 payments/             Payment processing
├── 🔌 ports/                Shared port interfaces
├── 🔍 seo/                  SEO utilities
└── 📦 storage/              Storage solutions
```

### How Ports & Adapters Work

```
┌────────────────────────────────────────────────────────────┐
│                     CLIENT DOMAIN                           │
│  (e.g., shop checkout)                                      │
│                                                             │
│  function startCheckout(cart) {                            │
│    return checkoutPort.createCheckout(cart)                │
│  }                                                          │
└────────────────────────────────────────────────────────────┘
                            │
                            │ Uses interface (port)
                            │
                            ▼
┌────────────────────────────────────────────────────────────┐
│                      PORT INTERFACE                         │
│  (platform/commerce/ports/CheckoutPort.ts)                 │
│                                                             │
│  interface CheckoutPort {                                  │
│    createCheckout(cart): Promise<CheckoutResult>           │
│  }                                                          │
└────────────────────────────────────────────────────────────┘
                            │
                            │ Implemented by
                            │
                            ▼
┌────────────────────────────────────────────────────────────┐
│                      ADAPTER                                │
│  (platform/commerce/adapters/shopify/)                     │
│                                                             │
│  class ShopifyCheckoutAdapter {                            │
│    async createCheckout(cart) {                            │
│      return shopifyAPI.createCheckout(cart)                │
│    }                                                        │
│  }                                                          │
└────────────────────────────────────────────────────────────┘
                            │
                            │ Calls vendor
                            │
                            ▼
┌────────────────────────────────────────────────────────────┐
│                       VENDOR                                │
│  Shopify API                                                │
└────────────────────────────────────────────────────────────┘
```

**Key Benefit:** Change vendor = change adapter only. Client domain untouched!

---

## 🎨 UI Kit Structure

```
ui-kit/
│
├── .docs/                    Component documentation
├── components/               Atomic components
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   ├── Card/
│   ├── Modal/
│   ├── Form/
│   └── [many more...]
│
└── stories/                  Storybook stories
    ├── Button.stories.tsx
    ├── Card.stories.tsx
    └── [more stories...]
```

---

## 📊 Data Flow Example

### Adding a Product to Cart

```
┌────────────────┐
│ UI Component   │
│ (Add to Cart)  │
└────────────────┘
        │
        │ 1. User clicks button
        │
        ▼
┌────────────────┐
│ React Hook     │
│ useCartAdd()   │
└────────────────┘
        │
        │ 2. Calls logic
        │
        ▼
┌────────────────┐
│ Logic Layer    │
│ validateAdd()  │
│ calculateQty() │
└────────────────┘
        │
        │ 3. Updates state
        │
        ▼
┌────────────────┐
│ Provider       │
│ CartContext    │
└────────────────┘
        │
        │ 4. Persists
        │
        ▼
┌────────────────┐
│ Platform Port  │
│ CartPort       │
└────────────────┘
        │
        │ 5. Adapter stores
        │
        ▼
┌────────────────┐
│ Storage        │
│ (LocalStorage │
│  + Shopify)    │
└────────────────┘
```

---

## 🔄 Feature Development Flow

```
1. UNDERSTAND
   │
   └─→ Read .docs/ folder
   └─→ Check domain structure
   └─→ Review existing code

2. DESIGN
   │
   └─→ Identify which folder needs what
   └─→ Plan logic vs hooks vs UI
   └─→ Check platform services needed

3. IMPLEMENT
   │
   └─→ Add logic (pure functions)
   └─→ Create hooks (React logic)
   └─→ Build UI (components)
   └─→ Add data (fixtures/config)

4. DOCUMENT
   │
   └─→ Update .docs/README.md
   └─→ Add usage examples
   └─→ Document integration points

5. TEST
   │
   └─→ Test logic (unit tests)
   └─→ Test hooks (integration tests)
   └─→ Test UI (component tests)
```

---

## 🎯 Quick Navigation Map

```
I want to...                          Go to...
─────────────────────────────────────────────────────
Add product feature              → client/shop/products/
Build cart functionality         → client/shop/cart/logic/
Create marketing section         → client/marketing/ui/sections/
Manage admin settings            → admin/settings-siso/##-module/
Handle user authentication       → platform/auth/hooks/
Process payments                 → platform/commerce/adapters/
Create reusable component        → ui-kit/components/
Store business logic             → {domain}/logic/
Add React-specific logic         → {domain}/hooks/
Manage state                     → {domain}/providers/ or /state/
Add static data/fixtures         → {domain}/data/
Understand a domain              → {domain}/.docs/README.md
```

---

## 💡 Pattern Recognition

### Simple Subdomain
```
feature-name/
├── .docs/
└── ui/
    └── pages/
```
*Examples: admin/analytics, admin/blog*

### Medium Subdomain
```
feature-name/
├── .docs/
├── data/
└── ui/
    ├── components/
    └── pages/
```
*Examples: admin/catalog, admin/orders*

### Full Subdomain
```
feature-name/
├── .docs/
├── data/
├── hooks/
├── logic/
├── providers/
├── state/
└── ui/
    ├── components/
    ├── pages/
    └── sections/
```
*Examples: client/shop/products, client/shop/cart*

### Platform Service
```
service-name/
├── .docs/
├── adapters/
│   └── vendor-name/
└── ports/
    └── ServicePort.ts
```
*Examples: platform/commerce, platform/payments*

---

## 🚀 Architecture Benefits

### ✅ Predictable
- Same structure everywhere
- Easy to find things
- Quick to onboard new developers

### ✅ Scalable
- Add features without clutter
- Clear boundaries prevent conflicts
- Independent team development

### ✅ Maintainable
- Separation of concerns
- Business logic isolated from UI
- Vendor dependencies contained

### ✅ Testable
- Pure logic easy to unit test
- Hooks easy to integration test
- Components easy to component test

### ✅ AI-Friendly
- Consistent patterns AI can learn
- Well-documented for context
- Clear structure for modifications

---

**Last Updated:** 2026-01-12
**Version:** 1.0
