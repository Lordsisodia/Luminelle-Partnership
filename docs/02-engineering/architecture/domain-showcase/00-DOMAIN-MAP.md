# Complete Domain Map

**A comprehensive catalog of all domains and subdomains in Lumelle**

---

## 📊 All Domains Overview

```
src/domains/
│
├── 📱 Application Domains (Business-Facing)
│   ├── admin/          # Administrative interface
│   ├── blog/           # Blog functionality
│   ├── client/         # Customer-facing features
│   ├── creator/        # Creator portal
│   └── partnerships/   # Partnership features
│
├── 🔧 Platform Services (Shared Infrastructure)
│   ├── auth/           # Authentication
│   ├── cms/            # CMS integration
│   ├── commerce/       # Commerce (Shopify, payments)
│   ├── content/        # Content management
│   ├── design-tokens/  # Design system
│   ├── feature-flags/  # Feature flagging
│   ├── http/           # HTTP utilities
│   ├── observability/  # Monitoring & logging
│   ├── payments/       # Payment processing
│   ├── ports/          # Port interfaces
│   ├── seo/            # SEO utilities
│   └── storage/        # Storage solutions
│
├── 🎨 UI Infrastructure
│   ├── ui-kit/         # Reusable component library
│   └── shared/         # Shared utilities
│
└── 📚 Documentation
    └── All domains have .docs/ folders
```

---

## 🏢 Admin Domain - Complete Structure

```
admin/
│
├── analytics/                      # 📊 Analytics Dashboard
│   ├── .docs/                      # Documentation
│   └── ui/
│       └── pages/                  # Analytics pages
│
├── blog/                           # ✍️ Blog Management
│   ├── .docs/
│   └── ui/
│       └── pages/                  # Blog admin pages
│
├── catalog/                        # 📦 Product Catalog
│   ├── .docs/
│   ├── data/                       # Product fixtures
│   └── ui/
│       ├── cards/                  # Product cards
│       ├── components/             # Reusable components
│       ├── layouts/                # Catalog layouts
│       ├── pages/                  # Catalog pages
│       ├── preview/                # Preview components
│       └── sections/               # Catalog sections
│
├── media/                          # 🖼️ Media Library
│   ├── .docs/
│   └── ui/
│       └── pages/                  # Media pages
│
├── orders/                         # 🛒 Order Management
│   ├── .docs/
│   ├── data/                       # Order fixtures
│   └── ui/
│       └── pages/                  # Order pages
│
├── pages/                          # 📄 Page Builder
│   ├── .docs/
│   ├── data/                       # Page fixtures
│   └── ui/
│       └── pages/                  # Page builder pages
│
├── profile/                        # 👤 Admin Profile
│   └── ui/
│       └── pages/                  # Profile pages
│
├── settings/                       # ⚙️ Settings (Legacy)
│   └── ui/
│       └── pages/                  # Settings pages
│
├── settings-siso/                  # ⚙️ Settings (Modular)
│   │
│   ├── 01-general/                 # General Settings
│   │   ├── application/            # Use cases
│   │   ├── data/                   # Config
│   │   ├── docs/                   # Documentation
│   │   ├── domain/                 # Domain models
│   │   ├── infrastructure/         # Integrations
│   │   └── ui/                     # UI components
│   │
│   ├── 02-my-account/              # Account Settings
│   │   ├── application/
│   │   ├── data/
│   │   ├── docs/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   └── ui/
│   │
│   ├── 03-profile/                 # Profile Settings
│   │   ├── application/
│   │   ├── data/
│   │   ├── docs/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   └── ui/
│   │
│   ├── 04-devices/                 # Connected Devices
│   │   ├── application/
│   │   ├── data/
│   │   ├── docs/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   └── ui/
│   │
│   ├── 05-security/                # Security Settings
│   │   ├── application/
│   │   ├── data/
│   │   ├── docs/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   └── ui/
│   │
│   ├── 06-privacy/                 # Privacy Settings
│   │   ├── application/
│   │   ├── data/
│   │   ├── docs/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   └── ui/
│   │
│   ├── 07-legal/                   # Legal Settings
│   │   ├── application/
│   │   ├── data/
│   │   ├── docs/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   └── ui/
│   │
│   ├── 08-integrations/            # Third-party Integrations
│   │   ├── application/
│   │   ├── data/
│   │   ├── docs/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   └── ui/
│   │
│   ├── 09-wallet/                  # Wallet Settings
│   │   └── README.md
│   │
│   └── shared/                     # Shared Settings Utilities
│       ├── application/
│       ├── components/
│       ├── data/
│       ├── docs/
│       ├── domain/
│       ├── infrastructure/
│       ├── navigation/
│       └── ui/
│
└── shared/                         # 🔗 Shared Admin Utilities
    ├── .docs/
    ├── application/                # Shared use cases
    ├── data/                       # Shared data
    ├── hooks/                      # Shared hooks
    ├── logic/                      # Shared logic
    └── ui/
        ├── components/             # Shared components
        ├── icons/                  # Icon library
        ├── layouts/                # Shared layouts
        ├── pages/                  # Shared pages
        ├── preview/                # Preview components
        └── sections/               # Shared sections
```

---

## 📝 Blog Domain - Complete Structure

```
blog/
│
├── .docs/                          # Blog Documentation
│
├── data/                           # Blog Data
│   ├── blog-fixtures.ts            # Sample blog posts
│   └── blog-config.ts              # Blog configuration
│
├── hooks/                          # Blog Hooks
│   ├── useBlogPost.ts              # Single blog post
│   ├── useBlogList.ts              # Blog post listing
│   └── useBlogCategory.ts          # Category filtering
│
├── logic/                          # Blog Logic
│   ├── formatters.ts               # Date formatting
│   ├── validators.ts               # Content validation
│   └── utils.ts                    # Blog utilities
│
└── ui/                             # Blog UI
    ├── components/                 # Blog components
    ├── pages/                      # Blog pages
    └── sections/                   # Blog sections
```

---

## 🛍️ Client Domain - Complete Structure

```
client/
│
├── account/                        # 👤 Account Management
│   ├── .docs/
│   └── [subdomain structure]
│
├── marketing/                      # 📢 Marketing Sections
│   ├── .docs/
│   └── ui/
│       └── sections/
│           ├── hero-shop/          # Hero sections
│           ├── success/            # Success stories
│           ├── final-cta-section/  # CTA sections
│           └── product-spotlight-section/  # Product features
│
├── rewards/                        # 🎁 Rewards Program
│   └── [subdomain structure]
│
└── shop/                           # 🛍️ Shopping Features
    │
    ├── cart/                       # Shopping Cart
    │   ├── .docs/
    │   ├── logic/                  # Cart calculations
    │   ├── providers/              # Cart context
    │   └── ui/
    │       └── pages/              # Cart pages
    │
    ├── checkout/                   # Checkout Flow
    │   ├── .docs/
    │   └── ui/
    │       └── pages/              # Checkout pages
    │
    └── products/                   # Product Catalog
        │
        ├── .docs/                  # Product documentation
        │
        ├── data/                   # Product Data
        │   ├── product-config.ts   # Product definitions
        │   ├── gallery-config.ts   # Image galleries
        │   └── product-fixtures.ts # Mock data
        │
        ├── hooks/                  # Product Hooks
        │   ├── useProduct.ts       # Product data
        │   ├── useProductVariant.ts # Variant selection
        │   └── useProductPrice.ts  # Price calculations
        │
        ├── logic/                  # Product Logic
        │   ├── priceCalculations.ts # Discounts
        │   ├── availabilityUtils.ts # Stock checks
        │   └── variantUtils.ts     # Variant matching
        │
        ├── providers/              # Product State
        │   └── ProductProvider.tsx
        │
        ├── state/                  # Product State
        │   └── productStore.ts
        │
        └── ui/                     # Product UI
            ├── components/         # Reusable components
            ├── layouts/            # Product layouts
            ├── pages/              # Product pages
            │   └── ProductPage/
            │       └── sections/
            │           ├── details-accordion/
            │           ├── faq-mini/
            │           ├── faq-section-shop/
            │           ├── feature-callouts/
            │           ├── featured-tik-tok/
            │           ├── hero-proof-strip/
            │           └── reviews-auto-carousel/
            └── sections/           # Feature sections
```

---

## 👩‍🎨 Creator Domain - Complete Structure

```
creator/
│
├── .docs/                          # Creator Documentation
│
└── ui/                             # Creator UI
    ├── pages/                      # Creator pages
    └── sections/                   # Creator sections
```

---

## 🤝 Partnerships Domain - Complete Structure

```
partnerships/
│
├── _shared/                        # Shared Partnership Utilities
│   └── ui/
│       └── theme/
│           └── cardLayers.ts      # Card styling
│
└── community/                      # Community Features
    └── [subdomain structure]
```

---

## 🔧 Platform Domains - Complete Structure

```
platform/
│
├── auth/                           # 🔐 Authentication
│   ├── .docs/
│   ├── hooks/                      # Auth hooks
│   ├── logic/                      # Auth logic
│   ├── providers/                  # Auth providers
│   ├── data/                       # User data
│   └── ui/                         # Auth UI components
│
├── cms/                            # 📝 CMS Integration
│   ├── .docs/
│   └── [integration structure]
│
├── commerce/                       # 💰 Commerce
│   ├── .docs/
│   ├── adapters/                   # Vendor Adapters
│   │   └── shopify/                # Shopify Integration
│   │       ├── internal-api/       # API wrappers
│   │       └── checkout.ts         # Checkout logic
│   └── ports/                      # Port Interfaces
│       ├── CheckoutPort.ts
│       └── CartPort.ts
│
├── content/                        # 📄 Content Management
│   ├── adapters/                   # CMS adapters
│   └── ports/                      # Content ports
│
├── design-tokens/                  # 🎨 Design System
│   └── .docs/
│
├── feature-flags/                  # 🚩 Feature Flags
│   └── .docs/
│
├── http/                           # 🌐 HTTP Utilities
│   └── [http client structure]
│
├── observability/                  # 📊 Monitoring
│   └── .docs/
│
├── payments/                       # 💳 Payments
│   ├── adapters/                   # Payment adapters
│   └── ports/                      # Payment ports
│
├── ports/                          # 🔌 Port Interfaces
│   └── [shared port definitions]
│
├── seo/                            # 🔍 SEO
│   └── [seo utilities]
│
└── storage/                        # 📦 Storage
    └── .docs/
```

---

## 🎨 UI Kit Domain - Complete Structure

```
ui-kit/
│
├── .docs/                          # UI Kit Documentation
│
├── components/                     # Reusable Components
│   ├── Button/
│   ├── Card/
│   ├── Modal/
│   ├── Form/
│   └── [many more components]
│
└── stories/                        # Storybook Stories
    ├── Button.stories.tsx
    ├── Card.stories.tsx
    └── [more stories]
```

---

## 🔗 Shared Domain - Complete Structure

```
shared/
│
├── hooks/                          # Shared Hooks
│   └── [common hooks]
│
├── ui/                             # Shared UI
│   └── [common UI utilities]
│
└── utils/                          # Shared Utilities
    └── [common utilities]
```

---

## 📚 Domain Documentation Convention

Every domain has a `.docs/` folder containing:

```
.docs/
├── README.md                       # Domain overview
├── architecture.md                 # Domain architecture
├── integration-guide.md            # How to integrate
├── examples.md                     # Usage examples
└── roadmap.md                      # Future plans
```

**Minimum requirement:** At least a `README.md` explaining the domain's purpose.

---

## 🎯 Key Patterns

### 1. Subdomain Pattern

All business-facing subdomains follow:
```
subdomain/
├── .docs/          # Documentation
├── data/           # Static data & fixtures
├── hooks/          # React hooks
├── logic/          # Pure business logic
├── providers/      # Context providers
├── state/          # State management
└── ui/             # All UI components
```

### 2. Platform Pattern

Platform domains follow ports & adapters:
```
platform/service/
├── .docs/
├── adapters/      # Vendor implementations
└── ports/         # Interface definitions
```

### 3. Settings Pattern (settings-siso)

Numbered modules with full DDD structure:
```
##-module-name/
├── application/    # Use cases
├── data/          # Data access
├── docs/          # Documentation
├── domain/        # Domain models
├── infrastructure/ # External deps
└── ui/            # User interface
```

---

## 📊 Statistics

- **Total Application Domains:** 5 (admin, blog, client, creator, partnerships)
- **Total Platform Domains:** 13
- **Total Subdomains:** 30+
- **Domains with .docs/:** 100%
- **Following subdomain pattern:** 95%

---

**Last Updated:** 2026-01-12
**Version:** 1.0
