# Technical Stack

Complete technical context for AI-generated improvements.

---

## Frontend Architecture

### Core Technologies
```
React 18.3+          # UI library
TypeScript 5.9+      # Type safety
Vite 6.0+           # Build tool
```

### Styling
```
Tailwind CSS 3.4+   # Utility-first CSS
Tailwind Merge      # Style merging
CLSX               # Conditional classes
```

### State Management
```
Zustand 5.0+       # Lightweight state
TanStack Query 5.90+ # Server state
React Context      # Component state
```

### Routing
```
React Router 6.28+ # Client routing
```

### UI Components
```
Headless UI        # Accessible components
Lucide React 0.548+ # Icons
Framer Motion 12.23+ # Animations
```

---

## Backend & Services

### E-commerce
```
Shopify (Headless) # Product, cart, checkout
Storefront API     # Product data
Admin API          # Order management
Webhooks           # Real-time updates
```

### Authentication
```
Clerk 4.32+        # Auth, user management
```

### Database
```
Supabase 2.83+     # PostgreSQL, auth, storage
  - user_profiles
  - avatars
  - custom data
```

### Content Management
```
Shopify           # Product content
Markdown files    # Blog, static content
```

---

## Third-Party Integrations

### Analytics & Tracking
```
PostHog 1.306+           # Product analytics
Microsoft Clarity 1.0.2  # Heatmaps, sessions
MetaPixel               # Facebook/Instagram ads
Google Analytics        # Web analytics (future)
```

### Payment
```
Stripe              # Subscriptions (future)
Shopify Payments    # Primary payment
```

### Email Marketing
```
Klaviyo (planned)   # Email, SMS marketing
```

---

## Domain Structure

```
src/domains/
├── admin/                    # Admin dashboard
│   ├── analytics/            # Analytics, activity
│   ├── blog/                # Blog content management
│   ├── catalog/             # Product, component catalog
│   ├── orders/              # Order management
│   ├── pages/               # Page content management
│   ├── profile/             # Admin profile
│   ├── settings/            # Global settings
│   ├── settings-siso/       # Settings portal (SISO)
│   │   ├── 01-general/      # General settings
│   │   ├── 02-my-account/   # Account settings
│   │   ├── 03-profile/      # Profile management
│   │   ├── 04-devices/      # Device management
│   │   ├── 05-security/     # Security settings
│   │   ├── 06-privacy/      # Privacy settings
│   │   ├── 07-legal/        # Legal settings
│   │   └── 08-integrations/ # Integrations
│   └── shared/              # Shared admin components
│
├── blog/                    # Public blog
│   └── ui/pages/           # Blog index, post pages
│
├── client/                  # Client-facing
│   ├── account/            # User account
│   │   ├── ui/pages/      # Account, addresses, orders
│   │   └── providers/     # Account context
│   │
│   ├── marketing/          # Marketing pages
│   │   ├── brand/         # Brand story page
│   │   └── ui/
│   │       ├── pages/     # Landing, privacy, terms
│   │       └── sections/  # Hero, reviews, FAQ, etc.
│   │
│   ├── rewards/           # Loyalty program
│   │   └── ui/pages/     # Rewards page
│   │
│   └── shop/              # Shopping
│       ├── cart/         # Cart management
│       ├── checkout/     # Checkout flow
│       └── products/     # Product pages
│           └── ui/
│               ├── pages/ # Product page
│               └── sections/ # PDP sections
│
├── creator/               # Creator/affiliate program
│   └── ui/pages/         # Creator signup
│
└── platform/             # Platform-level
    ├── auth/            # Auth pages (signin, signup)
    ├── seo/             # SEO utilities
    └── shared/          # Shared platform code
```

---

## Key Components & Patterns

### Component Organization

Each domain follows this structure:
```
domain/
├── application/    # Use cases, hooks, business logic
├── data/          # Data access, API calls
├── domain/        # Types, interfaces, domain models
├── infrastructure/ # External integrations
└── ui/            # UI components
    ├── components/ # Reusable components
    ├── layouts/    # Page layouts
    ├── pages/      # Page components
    └── sections/   # Page sections
```

### State Management Patterns

1. **Server State** (TanStack Query)
   - Product data
   - Cart data
   - User data
   - Orders

2. **Client State** (Zustand)
   - UI state (modals, drawers)
   - Form state
   - Temporary selections

3. **URL State** (React Router)
   - Page location
   - Query params
   - Navigation history

---

## Performance Considerations

### Build Optimizations
```
- Code splitting (dynamic imports)
- Tree shaking (unused code elimination)
- Minification (terser)
- CSS purging (Tailwind JIT)
```

### Runtime Optimizations
```
- Lazy loading images
- Image optimization (Cloudinary)
- Framer Motion animations (GPU-accelerated)
- React.memo for expensive renders
```

### Core Web Vitals Targets
```
LCP (Largest Contentful Paint): < 2.5s
FID (First Input Delay): < 100ms
CLS (Cumulative Layout Shift): < 0.1
```

---

## SEO Architecture

### Meta Tags
```
- Dynamic title/description per page
- Open Graph tags
- Twitter Card tags
- Canonical URLs
- Structured data (JSON-LD)
```

### Sitemap
```
- Generated XML sitemap
- Product pages
- Blog posts
- Static pages
```

### Performance SEO
```
- Critical CSS inline
- Lazy load below-fold content
- Optimized images (WebP)
- Minimal JavaScript
```

---

## Deployment

### Platform
```
Vercel                    # Primary hosting
  - Automatic deploys from Git
  - Preview deployments
  - Edge functions
```

### Environment Variables
```
VITE_SHOPIFY_STOREFRONT_TOKEN
VITE_CLERK_PUBLISHABLE_KEY
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_POSTHOG_KEY
VITE_CLARITY_PROJECT_ID
```

---

## Development Workflow

### Local Development
```
npm run dev           # Start dev server
npm run typecheck     # TypeScript checking
npm run lint         # ESLint
npm run storybook    # Component development
```

### Build & Deploy
```
npm run build        # Production build
npm run preview      # Preview build
```

### Validation Scripts
```
npm run validate:blog-content     # Validate blog posts
npm run validate:boundaries       # Import boundaries
npm run validate:tokens           # Design tokens
npm run validate:profiles-schema  # Supabase schema
```

---

## Accessibility Standards

### WCAG 2.1 AA Compliance
```
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation
- Focus management
- Color contrast ratios
- Screen reader support
```

### Testing
```
- Manual keyboard testing
- Screen reader testing (NVDA, VoiceOver)
- Color contrast validation
- Automated a11y tests (Storybook addon)
```

---

## Security Considerations

### Authentication
```
- Clerk handles auth
- JWT tokens
- Protected routes
- Session management
```

### Data Protection
```
- HTTPS only
- Secure cookies
- API token management
- User data in Supabase (RLS policies)
```

### Payment Security
```
- Shopify Payments (PCI compliant)
- No card data stored locally
- 3D Secure support
```

---

## Known Technical Constraints

### Shopify Headless Limitations
```
- Cart API rate limits
- Checkout customization limited
- Webhook delivery delays
- Multi-currency complexity
```

### Team & Resources
```
- Small team (need efficient solutions)
- Limited budget for third-party tools
- Prefer open-source solutions
- Build vs buy decisions needed
```

### Performance Constraints
```
- Initial bundle size concerns
- Third-party script impact
- Image loading optimization needed
- Mobile performance priority
```

---

## Improvement Categories by Technical Area

### Frontend (UI/UX)
- Component enhancements
- Animation improvements
- Mobile responsiveness
- Accessibility upgrades
- Performance optimizations

### Backend (API/Services)
- API optimizations
- Webhook handling
- Data caching strategies
- Real-time features
- Error handling improvements

### Integrations
- Shopify customization
- Supabase optimization
- Clerk enhancements
- Analytics implementation
- Marketing tool integrations

### Infrastructure
- Build optimizations
- Deployment improvements
- Monitoring/alerting
- Error tracking
- Performance monitoring

---

## When Generating Technical Improvements

Consider:
1. **Effort**: xs/s/m/l/xl based on complexity
2. **Impact**: Performance, UX, conversion
3. **Risk**: Breaking changes, dependencies
4. **Maintenance**: Ongoing effort required
5. **Scalability**: Will it scale with growth?

Prioritize:
- High impact, low effort (quick wins)
- Performance improvements (user experience)
- Conversion-focused (business impact)
- Security/compliance (risk mitigation)
