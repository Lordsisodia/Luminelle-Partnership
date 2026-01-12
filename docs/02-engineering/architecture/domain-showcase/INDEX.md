# 🏛️ Lumelle Domain Architecture Showcase

**Welcome! This is your guide to understanding Lumelle's unique domain-driven architecture.**

---

## 🎯 Where to Start?

### New to the architecture?
Start here: **[README.md](./README.md)** - The complete overview with examples

### Want to see everything?
Check out: **[00-DOMAIN-MAP.md](./00-DOMAIN-MAP.md)** - Complete catalog of all domains

### Ready to build?
Jump to: **[01-PRACTICAL-GUIDE.md](./01-PRACTICAL-GUIDE.md)** - Real-world examples and best practices

---

## 📊 At a Glance

```
Lumelle is organized around BUSINESS DOMAINS, not technical layers

📱 Application Domains (What users see)
├── admin/          → Administrative interface
├── blog/           → Blog functionality
├── client/         → Customer features (shop, account, etc.)
├── creator/        → Creator portal
└── partnerships/   → Partnership features

🔧 Platform Services (Shared infrastructure)
├── auth/           → Authentication
├── commerce/       → Ecommerce (Shopify, payments)
├── cms/            → Content management
├── content/        → Content delivery
└── ... (9 more services)

🎨 UI Infrastructure
├── ui-kit/         → Reusable component library
└── shared/         → Shared utilities
```

---

## 🎨 The Universal Pattern

Every subdomain follows the **same predictable structure**:

```
subdomain/
├── .docs/          # 📚 Documentation (always start here!)
├── data/           # 💾 Static data, fixtures, config
├── hooks/          # 🪝 Custom React hooks
├── logic/          # 🧠 Pure business logic
├── providers/      # ⚡ Context providers
├── state/          # 🔄 State management
└── ui/             # 🎨 All UI components
    ├── components/ # Reusable bits
    ├── pages/      # Full pages
    └── sections/   # Page sections
```

**Why this rocks:** Once you learn the pattern, you can navigate ANY domain instantly.

---

## 🌟 Key Features

### ✅ Predictable
- Same structure everywhere
- Easy to find things
- Quick to onboard

### ✅ Scalable
- Add features without clutter
- Clear boundaries
- Independent development

### ✅ Maintainable
- Separation of concerns
- Vendor independence
- Clear ownership

### ✅ AI-Friendly
- Consistent patterns
- Well-documented
- Easy to modify

---

## 📚 Document Guide

| Document | What It Covers | When to Read |
|----------|----------------|--------------|
| **[README.md](./README.md)** | Complete architecture overview with deep dives into each domain | Getting started, understanding the big picture |
| **[00-DOMAIN-MAP.md](./00-DOMAIN-MAP.md)** | Complete catalog of every domain and subdomain | Finding where something lives, seeing the full structure |
| **[01-PRACTICAL-GUIDE.md](./01-PRACTICAL-GUIDE.md)** | Real examples: adding features, creating sections, working with domains | Building something new, need examples |
| **[02-ADVANCED-PATTERNS.md](./02-ADVANCED-PATTERNS.md)** | Deep dive: Ports & Adapters, runtime config, DDD layering, Zod schemas | Understanding advanced architectural patterns |
| **[03-SHARED-INFRASTRUCTURE.md](./03-SHARED-INFRASTRUCTURE.md)** | UI Kit, shared domain, lib utilities, config, content structure | Understanding shared infrastructure |
| **[VISUAL-SUMMARY.md](./VISUAL-SUMMARY.md)** | Visual diagrams and quick reference maps | Quick lookup, visual learners |
| **[../ARCHITECTURE-OVERVIEW.md](../ARCHITECTURE-OVERVIEW.md)** | Broader architecture including .blackbox, docs structure, skills | Understanding the entire system architecture |

---

## 🎯 Common Tasks

| Task | Location |
|------|----------|
| **Add a product feature** | `client/shop/products/` |
| **Create marketing section** | `client/marketing/ui/sections/` |
| **Build admin page** | `admin/{subdomain}/ui/pages/` |
| **Add settings module** | `admin/settings-siso/##-module-name/` |
| **Integrate payment** | `platform/commerce/adapters/` |
| **Create reusable component** | `ui-kit/components/` |
| **Understand a domain** | Look for `.docs/` folder first! |

---

## 💡 Key Concepts

### 1. Domain-Driven Design (DDD)
We organize around **business domains**, not technical layers. This means code mirrors the real world.

### 2. Ports & Adapters
Platform services use **interfaces** (ports) and **implementations** (adapters). This keeps vendor dependencies isolated.

```
[Client Code] → [Port Interface] → [Adapter] → [Vendor]
```

### 3. Consistent Structure
Every subdomain follows the same folder pattern. Learn it once, use it everywhere.

### 4. Documentation First
Every domain has a `.docs/` folder explaining what it does and how to use it.

---

## 🚀 Quick Examples

### Add a new product feature:
```bash
# 1. Go to the domain
cd src/domains/client/shop/products

# 2. Add logic
touch logic/feature.ts

# 3. Create hook
touch hooks/useFeature.ts

# 4. Build UI
mkdir -p ui/components/feature
touch ui/components/feature/Feature.tsx

# 5. Document it
echo "# Feature" > .docs/feature.md
```

### Find where something is:
```bash
# Search domains
find src/domains -type d -name "cart"
# → src/domains/client/shop/cart

# Find documentation
find src/domains -name "README.md" -path "*/.docs/*"
```

---

## 🎨 Visual Hierarchy

```
Lumelle Application
│
├── 📱 App Domains (Business Features)
│   ├── Admin (settings, catalog, orders...)
│   ├── Blog (posts, articles...)
│   ├── Client (shop, account, marketing...)
│   ├── Creator (portal, tools...)
│   └── Partnerships (community...)
│
├── 🔧 Platform Services (Infrastructure)
│   ├── Auth (login, sessions...)
│   ├── Commerce (Shopify, payments...)
│   ├── CMS (content management...)
│   └── ... (10 more services)
│
├── 🎨 UI Foundation
│   ├── UI Kit (reusable components)
│   └── Shared (utilities, hooks)
│
└── 📚 Documentation (.docs/ in every domain)
```

---

## 📖 How to Use This Guide

### For Onboarding
1. Read [README.md](./README.md) - Get the big picture
2. Browse [00-DOMAIN-MAP.md](./00-DOMAIN-MAP.md) - See everything
3. skim [01-PRACTICAL-GUIDE.md](./01-PRACTICAL-GUIDE.md) - See examples

### For Development
1. Find your domain in [00-DOMAIN-MAP.md](./00-DOMAIN-MAP.md)
2. Read the `.docs/README.md` in that domain
3. Follow examples in [01-PRACTICAL-GUIDE.md](./01-PRACTICAL-GUIDE.md)

### For Architecture Decisions
1. Review [README.md](./README.md) - Understand patterns
2. Check [../ARCHITECTURE-OVERVIEW.md](../ARCHITECTURE-OVERVIEW.md) - System-wide view
3. Consult relevant `.docs/` folders

---

## 🎯 Why This Architecture?

### Traditional Layered Architecture ❌
```
src/
├── components/
├── services/
├── utils/
└── pages/
```
**Problem:** Hard to find features, unclear relationships, technical concerns mixed with business

### Domain-Driven Architecture ✅
```
src/domains/
├── admin/
├── client/
│   └── shop/
│       ├── cart/
│       └── products/
└── platform/
```
**Benefits:**
- ✅ Features are easy to locate
- ✅ Business logic stays together
- ✅ Clear boundaries
- ✅ Team can work in parallel
- ✅ Easy to test and maintain

---

## 📊 Stats

- **Total Domains:** 18
- **Application Domains:** 5
- **Platform Services:** 13
- **Subdomains:** 30+
- **Consistent Pattern Coverage:** 95%

---

## 🔗 Related Resources

- **Main Architecture:** [../ARCHITECTURE-OVERVIEW.md](../ARCHITECTURE-OVERVIEW.md)
- **.blackbox System:** [../../../.blackbox/README.md](../../../.blackbox/README.md)
- **Documentation Guide:** [../../../INDEX.md](../../../INDEX.md)
- **Domain Improvements:** [../../../05-planning/research/lumelle-architecture-improvements.md](../../../05-planning/research/lumelle-architecture-improvements.md)

---

## 🚀 Getting Started

1. **Pick a document** from the guide above
2. **Read the relevant .docs/** folders in source code
3. **Explore the actual domains** in `src/domains/`
4. **Start building!** Follow the patterns you see

---

**Architecture Version:** 1.0
**Last Updated:** 2026-01-12
**Status:** ✅ Active & Evolving

---

*Built with 💜 using Domain-Driven Design & Ports & Adapters*
