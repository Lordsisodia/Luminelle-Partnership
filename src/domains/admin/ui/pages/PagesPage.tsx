import { useMemo, useState } from 'react'
import { AdminPageLayout } from '@admin/ui/layouts'
import { Clock3, FileText, ShieldCheck, Sparkles } from 'lucide-react'

type PageSection = {
  title: string
  body: string
  hint?: string
}

type AdminPage = {
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

const PAGES: AdminPage[] = [
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
    updatedAt: 'Nov 27, 2025',
    publishedAt: 'Nov 27, 2025',
    summary: 'Data collection, cookies, analytics, deletion and access requests.',
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

const STATUS_COLORS: Record<AdminPage['status'], string> = {
  Published: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Draft: 'bg-amber-50 text-amber-700 border-amber-200',
  'In review': 'bg-blue-50 text-blue-700 border-blue-200',
}

export default function PagesPage() {
  const [selectedSlug, setSelectedSlug] = useState<string>(PAGES[0].slug)
  const selected = useMemo(() => PAGES.find((p) => p.slug === selectedSlug) ?? PAGES[0], [selectedSlug])

  return (
    <AdminPageLayout
      title="Pages"
      subtitle="Pick a page to open its detail preview/editor."
    >
      <div className="grid gap-4 xl:grid-cols-[minmax(420px,520px)_1fr] items-start">
        <section className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">Pages</div>
            </div>
            <div className="flex gap-2 text-xs font-semibold text-semantic-text-primary/70">
              <span className="rounded-full bg-brand-porcelain px-3 py-1">Published</span>
              <span className="rounded-full bg-brand-porcelain px-3 py-1">Legal</span>
              <span className="rounded-full bg-brand-porcelain px-3 py-1">Story</span>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {PAGES.map((page) => {
              const active = page.slug === selectedSlug
              return (
                <button
                  key={page.slug}
                  onClick={() => setSelectedSlug(page.slug)}
                  className={`group relative flex w-full flex-col justify-between rounded-2xl border px-4 py-4 text-left transition hover:-translate-y-0.5 hover:shadow-sm ${
                    active
                      ? 'border-semantic-legacy-brand-cocoa bg-brand-porcelain/70'
                      : 'border-semantic-legacy-brand-blush/60 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-sm font-semibold text-semantic-text-primary">{page.title}</div>
                    <span
                      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ${STATUS_COLORS[page.status]}`}
                    >
                      {page.status}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-[12px] text-semantic-text-primary/70">
                    <FileText className="h-3.5 w-3.5" />
                    <span className="font-mono text-[11px]">/{page.slug}</span>
                    <span>• {page.type}</span>
                  </div>
                  <p className="mt-2 text-sm text-semantic-text-primary/80 line-clamp-3">{page.summary}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-[12px] text-semantic-text-primary/70">
                    <span className="rounded-full bg-brand-porcelain/80 px-2.5 py-1 font-semibold">Sections: {page.sections.length}</span>
                    {page.tone ? (
                      <span className="rounded-full bg-brand-porcelain/60 px-2.5 py-1 font-semibold">Tone: {page.tone}</span>
                    ) : null}
                    {page.hero.badge ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 font-semibold text-semantic-text-primary shadow-sm">
                        <Sparkles className="h-3.5 w-3.5 text-amber-500" /> {page.hero.badge}
                      </span>
                    ) : null}
                  </div>
                  {page.notes ? (
                    <div className="mt-2 inline-flex items-center gap-2 text-[12px] font-semibold text-semantic-text-primary/80">
                      <ShieldCheck className="h-4 w-4 text-blue-600" />
                      <span>{page.notes}</span>
                    </div>
                  ) : null}
                  <div className="mt-3 flex items-center gap-2 text-[12px] text-semantic-text-primary/60">
                    <Clock3 className="h-3.5 w-3.5" />
                    <span>Updated {page.updatedAt}</span>
                    {page.publishedAt ? <span>• Published {page.publishedAt}</span> : null}
                  </div>
                  {active ? (
                    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-semantic-legacy-brand-cocoa" />
                  ) : null}
                </button>
              )
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">Preview</div>
              <div className="mt-1 flex items-center gap-2 text-sm text-semantic-text-primary/80">
                <span className="font-semibold">{selected.title}</span>
                <span className="text-semantic-text-primary/50">•</span>
                <span className="font-mono text-[12px]">/{selected.slug}</span>
                <span className="text-semantic-text-primary/50">•</span>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-semantic-text-primary/60">{selected.type}</span>
              </div>
            </div>
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-[12px] font-semibold ${STATUS_COLORS[selected.status]}`}
            >
              {selected.status}
            </span>
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/50 p-4 shadow-inner">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-semantic-text-primary shadow-sm">
                {selected.hero.eyebrow}
                {selected.hero.badge ? (
                  <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-brand-porcelain/70 px-2 py-0.5 text-[11px] font-semibold text-semantic-text-primary">
                    <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                    {selected.hero.badge}
                  </span>
                ) : null}
              </div>
              <div className="text-xl font-semibold leading-tight text-semantic-text-primary md:text-2xl">{selected.hero.heading}</div>
              <p className="text-sm text-semantic-text-primary/80 md:text-base">{selected.hero.subheading}</p>
              <div className="inline-flex items-center gap-2 rounded-full bg-semantic-legacy-brand-cocoa px-4 py-2 text-sm font-semibold text-white shadow">
                {selected.hero.cta}
              </div>
            </div>
          </div>
        </section>
      </div>
    </AdminPageLayout>
  )
}
