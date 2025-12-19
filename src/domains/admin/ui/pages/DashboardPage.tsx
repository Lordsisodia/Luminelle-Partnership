import { Link } from 'react-router-dom'
import { AdminPageLayout } from '@admin/ui/layouts'

type CardLink = {
  title: string
  description: string
  to: string
}

const contentLinks: CardLink[] = [
  { title: 'Pages', description: 'Edit landing pages and sections (cms_pages + cms_sections).', to: '/admin/pages' },
  { title: 'Products', description: 'Manage product copy, SEO, and media (cms_products).', to: '/admin/products' },
  { title: 'Blogs', description: 'Draft and publish blog posts (cms_blogs + cms_blog_blocks).', to: '/admin/blogs' },
  { title: 'Media', description: 'Upload + organize assets across buckets.', to: '/admin/media' },
  { title: 'Components', description: 'Navigation, footer, promo bar, spin wheel config (visual editor).', to: '/admin/components' },
]

const toolLinks: CardLink[] = [
  { title: 'Analytics', description: 'Orders, revenue, cohorts, refunds (API-backed).', to: '/admin/analytics' },
  { title: 'Product content', description: 'Edit Shopify metafield-backed sections (legacy).', to: '/admin/content' },
  { title: 'Activity', description: 'Audit trail across content changes (cms_audits).', to: '/admin/activity' },
]

export default function DashboardPage() {
  return (
    <AdminPageLayout
      title="Dashboard"
      subtitle="Quick links to content and tools. This is the starting point for the admin content self-service rollout."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5">
          <div className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">
            Content
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {contentLinks.map((card) => (
              <Link
                key={card.to}
                to={card.to}
                className="group rounded-2xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/60 p-4 transition hover:bg-white"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-semibold text-semantic-text-primary">{card.title}</div>
                  <span className="text-xs text-semantic-text-primary/60 transition group-hover:text-semantic-text-primary/90">
                    →
                  </span>
                </div>
                <p className="mt-2 text-xs text-semantic-text-primary/70">{card.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5">
          <div className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">
            Tools
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {toolLinks.map((card) => (
              <Link
                key={card.to}
                to={card.to}
                className="group rounded-2xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/60 p-4 transition hover:bg-white"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-semibold text-semantic-text-primary">{card.title}</div>
                  <span className="text-xs text-semantic-text-primary/60 transition group-hover:text-semantic-text-primary/90">
                    →
                  </span>
                </div>
                <p className="mt-2 text-xs text-semantic-text-primary/70">{card.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">
              Next build targets
            </div>
            <div className="mt-2 text-sm text-semantic-text-primary/80">
              Based on `docs/future features/admin content self-service/`:
            </div>
          </div>
        </div>
        <ul className="mt-4 grid gap-2 text-sm text-semantic-text-primary/80 md:grid-cols-2">
          <li className="rounded-xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/40 p-3">
            Pages list + detail editor (sections reorder + JSON schema forms)
          </li>
          <li className="rounded-xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/40 p-3">
            Media uploader with guardrails (≤25MB, ≤2500px, alt required)
          </li>
          <li className="rounded-xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/40 p-3">
            Preview / publish / rollback actions (Edge Functions)
          </li>
          <li className="rounded-xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/40 p-3">
            Activity log backed by `cms_audits` + version history UI
          </li>
        </ul>
      </section>
    </AdminPageLayout>
  )
}
