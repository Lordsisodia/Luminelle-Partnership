# Lumelle Architecture Overview

**Last Updated:** 2026-01-12
**Status:** Active
**Purpose:** High-level architecture guide for onboarding and understanding the codebase structure

---

## Table of Contents

1. [Introduction](#introduction)
2. [The .blackbox System](#the-blackbox-system)
3. [Documentation Structure (1-8)](#documentation-structure-1-8)
4. [Meta-Skills Section](#meta-skills-section)
5. [Source Code Layout](#source-code-layout)
6. [Domain Architecture](#domain-architecture)
7. [Key Architectural Patterns](#key-architectural-patterns)

---

## Introduction

Lumelle is a headless ecommerce application built with React, using a domain-driven design approach. The architecture emphasizes:

- **Separation of concerns** through domain boundaries
- **Vendor independence** via ports and adapters pattern
- **AI-assisted development** with comprehensive documentation and skills
- **Progressive enhancement** with clear upgrade paths

The codebase is organized around **business domains** rather than technical layers, making it easier to locate features and understand how different parts of the system interact.

---

## The .blackbox System

Located at `docs/.blackbox/`, this is the **AI agent runtime and knowledge vault** for the project.

### Purpose

The `.blackbox` serves as a high-signal workspace for:
- Repeatable playbooks and templates
- Agent runtime configuration
- "Known good" code snippets
- Research outputs and artifacts
- Task tracking and execution logs

### Core Structure

```
.blackbox/
├── .plans/           # Timestamped plan folders (what we did, step-by-step)
├── .prompts/         # Prompt packs for agent runs
├── .skills/          # Reusable skill files (how to do things)
├── .timeline/        # Append-only activity feed
├── agents/           # Self-contained agent packages
├── deepresearch/     # Evergreen research outputs
├── experiments/      # Drafts and dead-ends
├── oss-catalog/      # Open-source discovery and curation
├── schemas/          # Agent output schema templates
├── scripts/          # Helper scripts for operations
└── snippets/         # Copy/paste code snippets
```

### Key Files

- **`protocol.md`** - How the .blackbox works (read first)
- **`context.md`** - Current situation and constraints
- **`tasks.md`** - Active checklist and backlog
- **`journal.md`** - Append-only log (why we did things)
- **`manifest.yaml`** - Machine-readable index

### Agent Workflow

When agents work on tasks:

1. Read `protocol.md`, `context.md`, and `tasks.md`
2. Create a timestamped plan folder for multi-step work
3. Execute work in appropriate `docs/` categories
4. Capture artifacts in the plan folder
5. Append to `docs/08-meta/repo/docs-ledger.md`

### Helper Scripts

```bash
# Create a new timestamped plan
./.blackbox/scripts/new-plan.sh "feature-name"

# Create a repeatable run
./.blackbox/scripts/new-run.sh deep-research "topic" --prompt path/to/prompt.md

# Create a new agent package
./.blackbox/scripts/new-agent.sh "Agent Name"
```

---

## Documentation Structure (1-8)

The `docs/` folder is organized into **8 top-level categories** to maintain readability and discoverability.

### The 8 Categories

```
docs/
├── 01-product/       # Product + UX (features, flows, copy, domains)
├── 02-engineering/   # Architecture, setup, integrations, hosting
├── 03-ai/            # AI playbooks, experiments, snapshots
├── 04-growth/        # SEO, marketing, social, content
├── 05-planning/      # Research, strategy, roadmap
├── 06-quality/       # Feedback, reviews, incidents, UI archive
├── 07-templates/     # Reusable templates and reference material
└── 08-meta/          # Repo hygiene and internal documentation rules
```

### 1. Product (`01-product/`)

Contains product surface area documentation:
- Admin UX and flows
- Design specs and wireframes
- Gamification features
- Domain models

**Example:** `01-product/design/WIREFRAMES-LANDING-PDP.md`

### 2. Engineering (`02-engineering/`)

Technical guides and implementation:
- Architecture documentation
- Project setup and branding
- Shopify integration
- Technical decisions (mini ADRs)
- Runbooks and operational procedures

**Key folders:**
- `architecture/` - System design and patterns
- `project-setup/` - Initial setup guides
- `decisions/` - Architectural Decision Records
- `runbooks/` - Operational checklists

### 3. AI (`03-ai/`)

AI-related assets:
- Playbooks for AI workflows
- Experiment results
- AI testing snapshots

### 4. Growth (`04-growth/`)

Marketing and acquisition:
- SEO strategy and validation
- Social media content
- Content calendar
- Growth experiments

### 5. Planning (`05-planning/`)

Future-facing work:
- Feature plans
- Research outputs
- Strategy documents
- Roadmaps

### 6. Quality (`06-quality/`)

Quality assurance and feedback:
- Client feedback logs
- Code reviews
- Incident reports
- UI component archive
- Quality runbooks

### 7. Templates (`07-templates/`)

Reusable assets:
- Agent communication templates
- Library of reusable doc templates
- Reference material

### 8. Meta (`08-meta/`)

Documentation hygiene:
- Maintenance procedures
- Repository documentation
- Process documentation
- The `docs-ledger.md` (append-only artifact registry)

### Folder Count Rules

To maintain readability:
- **Root level:** 6-10 visible folders (excluding hidden like `.blackbox/`)
- **Category level:** 6-10 direct child folders per category
- **Subfolder level:** If exceeding ~10 children, add a grouping layer

### Documentation Ledger

All meaningful doc changes are tracked in `docs/08-meta/repo/docs-ledger.md`:
- Append-only format
- Tracks: date, type, topic, canonical path, and plan artifacts
- Enables finding: "Where did we put X?"

---

## Meta-Skills Section

The `docs/skills/` folder contains **skill files**: reusable frameworks for AI agents to perform work consistently.

### Structure

```
docs/skills/
└── mcp-skills/
    ├── 1-supabase-skills.md
    ├── 2-shopify-skills.md
    ├── 3-github-skills.md
    ├── 4-serena-skills.md
    ├── 5-chrome-devtools-skills.md
    ├── 6-playwright-skills.md
    ├── 7-filesystem-skills.md
    ├── 8-sequential-thinking-skills.md
    ├── 9-siso-internal-skills.md
    └── README.md
```

### What is a Skill?

A skill file defines:
- **When to use it** (trigger conditions)
- **Inputs to collect** (what's needed)
- **Artifacts to create** (plans, notes, outputs)
- **Step-by-step process** (with checklists)
- **How to track progress** (ticking off steps)

### Example Skills

1. **Supabase Skills** - Database operations, migrations, type generation
2. **Shopify Skills** - Store operations, webhooks, product management
3. **GitHub Skills** - Repository operations, issue management
4. **Chrome DevTools Skills** - Debugging, performance profiling
5. **Playwright Skills** - E2E testing, browser automation
6. **Sequential Thinking Skills** - Complex problem-solving methodology

### Black Box Skills

Located in `docs/.blackbox/.skills/`:
- `deep-research.md` - Research methodology
- `docs-routing.md` - Where to put documentation
- `feedback-triage.md` - Processing client feedback
- `github-cli.md` - GitHub CLI usage
- `long-run-ops.md` - Long-running agent operations
- `notifications-telegram.md` - Notification handling

---

## Source Code Layout

The `src/` folder follows a **domain-oriented structure** rather than traditional layers.

### Top-Level Structure

```
src/
├── App.tsx              # Application entry
├── main.tsx             # React mount point
├── router.tsx           # Route configuration
├── index.css            # Global styles
├── assets/              # Static assets
├── components/          # Shared components (ui-kit consumers)
├── config/              # Configuration files
├── content/             # Content data and config
├── domains/             # Business domains (see below)
├── hooks/               # Custom React hooks
├── layouts/             # Layout components
├── lib/                 # Utility libraries
├── theme/               # Theme configuration
└── types/               # Shared TypeScript types
```

### Key Folders

- **`components/`** - Shared UI components built on the ui-kit domain
- **`content/`** - CMS-like content (hero sections, features, etc.)
- **`domains/`** - Business logic organized by domain
- **`lib/`** - Third-party library integrations and utilities
- **`config/`** - Environment and feature configuration

---

## Domain Architecture

The `src/domains/` folder is the heart of the application, organized by **business domain** rather than technical layer.

### Domain Structure

```
src/domains/
├── admin/              # Admin panel domains
│   └── settings-siso/  # Settings management
├── blog/               # Blog functionality
├── client/             # Client-facing features
│   ├── account/        # User account management
│   ├── marketing/      # Marketing sections (hero, testimonials, etc.)
│   ├── rewards/        # Rewards program
│   └── shop/           # Shopping features (cart, products, checkout)
├── creator/            # Creator portal
├── partnerships/       # Partnership features
├── platform/           # Platform-level services
│   ├── auth/           # Authentication
│   ├── cms/            # CMS integration
│   ├── commerce/       # Commerce integrations (Shopify, payments)
│   ├── content/        # Content management
│   ├── design-tokens/  # Design system
│   ├── feature-flags/  # Feature flagging
│   ├── http/           # HTTP utilities
│   ├── observability/  # Monitoring and logging
│   ├── payments/       # Payment processing
│   ├── ports/          # Port interfaces
│   ├── seo/            # SEO utilities
│   └── storage/        # Storage solutions
├── shared/             # Shared domain utilities
└── ui-kit/             # Reusable UI component library
```

### Domain Anatomy

Each domain follows a consistent internal structure:

```
domain-name/
├── .docs/              # Domain-specific documentation
├── application/        # Application services (use-cases)
├── domain/             # Domain models and business logic
├── infrastructure/     # External integrations
├── data/               # Data access and fixtures
└── ui/                 # User interface components
    ├── components/     # Reusable components
    ├── pages/          # Page components
    ├── sections/       # Section components
    └── hooks/          # Domain-specific hooks
```

### Platform Domains (Deep Dive)

#### 1. Platform Commerce (`platform/commerce/`)

**Purpose:** Commerce integrations shared across apps

**Structure:**
```
platform/commerce/
├── adapters/           # Vendor implementations
│   └── shopify/        # Shopify integration
│       ├── internal-api/    # Internal API wrappers
│       └── ...
├── ports/              # Port interfaces (DTOs, contracts)
└── .docs/              # Documentation
```

**Key Concepts:**
- **Ports:** Interfaces defining what commerce operations are needed
- **Adapters:** Vendor implementations (Shopify, etc.)
- **DTOs:** Data Transfer Objects for vendor independence

**Example:** `CartContext.tsx` (client/shop) uses commerce ports to interact with Shopify

#### 2. Platform Auth (`platform/auth/`)

**Purpose:** Authentication and authorization

**Components:**
- `providers/` - Auth providers (Supabase, etc.)
- `logic/` - Authentication business logic
- `hooks/` - Auth React hooks
- `data/` - User data access

#### 3. Platform Content (`platform/content/`)

**Purpose:** Content management integration

**Components:**
- `adapters/` - CMS adapters
- `ports/` - Content port interfaces

### Client Domains (Deep Dive)

#### 1. Client Shop (`client/shop/`)

**Purpose:** Shopping and checkout features

**Structure:**
```
client/shop/
├── cart/               # Shopping cart
│   ├── providers/      # Cart context
│   ├── logic/          # Cart calculations
│   └── ui/             # Cart components
├── products/           # Product catalog
│   ├── data/           # Product data and fixtures
│   ├── ui/             # Product components
│   └── pages/          # Product pages
└── checkout/           # Checkout flow
```

**Key Features:**
- Volume discounts
- Cart management
- Product pages with pricing
- Checkout integration

#### 2. Client Marketing (`client/marketing/`)

**Purpose:** Marketing sections and landing page components

**Structure:**
```
client/marketing/
└── ui/
    └── sections/
        ├── hero-shop/              # Hero sections
        ├── success/                # Success stories
        ├── final-cta-section/      # CTA sections
        └── product-spotlight-section/  # Product features
```

### Domain Communication Patterns

#### 1. Ports and Adapters

Domains communicate through **ports** (interfaces) and **adapters** (implementations):

```
[Client Domain] → [Port Interface] → [Platform Adapter] → [Vendor]
```

**Example:**
```typescript
// Port interface
interface CheckoutPort {
  startCheckout(items: CartItem[]): Promise<CheckoutURL>
}

// Shopify adapter
class ShopifyCheckoutAdapter implements CheckoutPort {
  async startCheckout(items) {
    return shopify.checkout.create(items)
  }
}
```

#### 2. Dependency Direction

- **Client domains** depend on **Platform ports** (interfaces)
- **Platform adapters** implement ports and talk to vendors
- UI never directly imports vendor-specific code (Shopify, Supabase, etc.)

#### 3. Data Flow

```
UI Component → Domain Hook → Application Service → Port → Adapter → Vendor
```

### Domain Documentation

Each domain has a `.docs/` folder with:
- **README.md** - Domain purpose and overview
- Integration guides
- Usage examples
- Roadmap

**Example:** `src/domains/platform/commerce/.docs/README.md`

---

## Key Architectural Patterns

### 1. Domain-Driven Design (DDD)

- **Bounded contexts** around business domains
- **Ubiquitous language** in code and documentation
- **Domain models** separate from technical concerns

### 2. Ports and Adapters (Hexagonal Architecture)

- **Inside:** Business logic and domain models
- **Ports:** Interfaces for external dependencies
- **Adapters:** Vendor implementations

**Benefits:**
- Vendor independence (swap Shopify without touching UI)
- Testability (mock ports for testing)
- Clear boundaries

### 3. Component Composition

- **UI Kit:** Atomic, reusable components
- **Domain UI:** Business-specific components built on ui-kit
- **Pages/Sections:** Composed from domain and ui-kit components

### 4. Configuration-Driven Content

Content is data-driven:
```typescript
// src/content/home.config.ts
export const homeSections = [
  { type: 'hero', props: { ... } },
  { type: 'product-spotlight', props: { ... } },
  // ...
]
```

### 5. AI-Augmented Development

- **.blackbox:** Agent runtime and knowledge base
- **Skills:** Repeatable AI workflows
- **Documentation:** Comprehensive, AI-readable docs
- **Automated research:** OSS discovery, market intelligence

### 6. Progressive Enhancement

- Clear upgrade paths for features
- Feature flags for gradual rollout
- Architectural improvements tracked in plans

---

## Quick Reference

### Common Tasks

**Add a new feature:**
1. Identify the domain (client vs platform)
2. Create/update domain models
3. Implement application service
4. Build UI components
5. Document in `docs/`

**Integrate a new vendor:**
1. Define port interface in `platform/*/ports/`
2. Implement adapter in `platform/*/adapters/`
3. Configure in `platform/*/infrastructure/`
4. Update domain to use port

**Update documentation:**
1. Place in appropriate `01-08/` category
2. Add entry to `docs/08-meta/repo/docs-ledger.md`
3. Create plan in `.blackbox/.plans/` for tracking

### File Location Guide

| What you need | Where to look |
|---------------|---------------|
| Product features | `src/domains/client/` or `src/domains/admin/` |
| Shopping logic | `src/domains/client/shop/` |
| Commerce integration | `src/domains/platform/commerce/` |
| Auth logic | `src/domains/platform/auth/` |
| UI components | `src/domains/ui-kit/components/` |
| Marketing sections | `src/domains/client/marketing/ui/sections/` |
| Configuration | `src/config/` and `src/content/` |
| Architecture docs | `docs/02-engineering/architecture/` |
| Plans and research | `docs/05-planning/` |
| Feedback and issues | `docs/06-quality/feedback/` |

---

## Related Documentation

- **Project Setup:** `docs/02-engineering/project-setup/01-PROJECT-OVERVIEW.md`
- **Technical Architecture:** `docs/02-engineering/project-setup/03-TECHNICAL-ARCHITECTURE.md`
- **Domain Improvements:** `docs/05-planning/research/lumelle-architecture-improvements.md`
- **Black Box Protocol:** `docs/.blackbox/protocol.md`
- **Docs Index:** `docs/INDEX.md`

---

**Document Status:** Active
**Next Review:** When major architectural changes occur
