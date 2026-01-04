export type PageSection = {
  title: string
  body: string
  hint?: string
}

export type AdminPage = {
  slug: string
  title: string
  type: 'Marketing' | 'Story' | 'Legal'
  status: 'Published' | 'Draft' | 'In review'
  updatedAt: string
  publishedAt?: string
  summary: string
  hero: {
    eyebrow: string
    heading: string
    subheading: string
    cta: string
    badge?: string
  }
  sections: PageSection[]
  seo: { title: string; description: string }
  notes?: string
  tone?: string
}

export const PAGES: AdminPage[] = [
  {
    slug: 'creators',
    title: 'Creators',
    type: 'Marketing',
    status: 'Published',
    updatedAt: 'Dec 14, 2025',
    publishedAt: 'Dec 12, 2025',
    summary: 'Spotlight featured partners, UGC reels, and the submission CTA.',
    hero: {
      eyebrow: 'Community',
      heading: 'Real creators. Real routines.',
      subheading: 'See how stylists and founders use Lumelle daily — practical swaps, rituals, and no-retouch receipts.',
      cta: 'View creator lineup',
      badge: 'Updated weekly',
    },
    sections: [
      { title: 'Featured carousel', body: '3 hero creators with 30s video loops + quick stats.' },
      { title: 'Routine blocks', body: 'Step cards (product, why it matters, time stamp).' },
      { title: 'Submission CTA', body: '“Want to collab?” form entry with review SLA badge.' },
    ],
    seo: {
      title: 'Lumelle Creators | Routines that actually work',
      description: 'Meet the bar-raising creators using Lumelle. Watch their routines and shop their kits.',
    },
    tone: 'Warm, first-person, proof-first',
  },
  {
    slug: 'brand-story',
    title: 'Brand Story',
    type: 'Story',
    status: 'Published',
    updatedAt: 'Dec 11, 2025',
    publishedAt: 'Dec 11, 2025',
    summary: 'Mission, founding story, materials promise, and team strip.',
    hero: {
      eyebrow: 'Why Lumelle',
      heading: 'Built for restless hair optimists.',
      subheading: 'From late-night prototypes to a material-first line that respects your time and texture.',
      cta: 'Read our story',
      badge: 'Brand',
    },
    sections: [
      { title: 'Timeline', body: 'Milestones with product and community highlights.' },
      { title: 'Materials promise', body: 'Recycled satin, traceable cotton, clean ink.' },
      { title: 'Team strip', body: '4 portraits with one-line superpowers.' },
    ],
    seo: {
      title: 'About Lumelle | Purpose-built hair tools',
      description: 'Our founding story, materials promise, and the team building better hair days.',
    },
    tone: 'Narrative, confident, concise',
  },
  {
    slug: 'landing',
    title: 'Landing Page',
    type: 'Marketing',
    status: 'Published',
    updatedAt: 'Dec 15, 2025',
    publishedAt: 'Dec 15, 2025',
    summary: 'Hero, value stack, social proof, before/after grid, and FAQ.',
    hero: {
      eyebrow: 'New drop',
      heading: 'Your no-heat routine, simplified.',
      subheading: 'Wake up to smooth, frizz-minimal hair with the 3-piece Overnight Set.',
      cta: 'Shop the set',
      badge: 'A/B: Variant B live',
    },
    sections: [
      { title: 'Value stack', body: '3 tiles: frictionless, fabric-safe, dermatologist reviewed.' },
      { title: 'Proof wall', body: 'UGC grid + press logos + 4.8 rating pill.' },
      { title: 'FAQ', body: '8 questions, collapsible, last updated Dec 10.' },
    ],
    seo: {
      title: 'Lumelle Overnight Set | Heatless, effort-light hair',
      description: 'Skip hot tools. Sleep-in satin kit with 4.8-star reviews and dermatologist notes.',
    },
    tone: 'Direct response, skimmable',
  },
  {
    slug: 'terms',
    title: 'Terms & Conditions',
    type: 'Legal',
    status: 'Published',
    updatedAt: 'Dec 01, 2025',
    publishedAt: 'Dec 01, 2025',
    summary: 'Purchasing, shipping, returns, arbitration, and jurisdiction.',
    hero: {
      eyebrow: 'Legal',
      heading: 'Terms that stay readable.',
      subheading: 'Plain-language policies for shopping, returns, subscriptions, and promotions.',
      cta: 'View terms',
    },
    sections: [
      { title: 'Purchases & subscriptions', body: 'Billing cadence, renewals, and promo stacking.' },
      { title: 'Returns & exchanges', body: '30-day window, condition rules, prepaid label flow.' },
      { title: 'Arbitration & venue', body: 'Binding arbitration; California law; San Francisco venue.' },
    ],
    seo: {
      title: 'Lumelle Terms & Conditions',
      description: 'Purchase rules, subscriptions, returns, and dispute resolution in plain language.',
    },
    notes: 'Lock edits to Legal role. Versioned with effective date banner.',
    tone: 'Neutral, precise',
  },
  {
    slug: 'privacy',
    title: 'Privacy Policy',
    type: 'Legal',
    status: 'Published',
    updatedAt: 'Dec 01, 2025',
    publishedAt: 'Dec 01, 2025',
    summary: 'Data we collect, cookie preferences, opt-outs, and deletion requests.',
    hero: {
      eyebrow: 'Privacy',
      heading: 'Your data, clearly managed.',
      subheading: 'What we collect, why we collect it, and how to opt-out or delete your data.',
      cta: 'Read privacy policy',
    },
    sections: [
      { title: 'Data collected', body: 'Checkout, analytics, support logs; no biometric data.' },
      { title: 'Controls', body: 'Delete/export request form, cookie preferences, email opt-outs.' },
      { title: 'Vendors', body: 'Shopify, Supabase, Clerk, PostHog — DPIAs on file.' },
    ],
    seo: {
      title: 'Lumelle Privacy Policy',
      description: 'How Lumelle collects, uses, and protects personal data plus your control options.',
    },
    notes: 'Show “Effective date” and last audit badge.',
    tone: 'Assuring, specific',
  },
]

