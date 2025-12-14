import { AdminPageLayout } from '@admin/ui/layouts'

export default function GlobalsPage() {
  return (
    <AdminPageLayout
      title="Globals"
      subtitle="Planned: edit global settings like nav/footer/promo bars/default SEO (cms_globals)."
    >
      <div className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5">
        <div className="text-sm font-semibold text-semantic-text-primary">Not wired yet</div>
        <p className="mt-2 text-sm text-semantic-text-primary/70">
          Globals will be stored as typed JSON blobs keyed by `cms_globals.key` (e.g. `nav`, `footer`, `promo`, `seo_default`).
        </p>
        <div className="mt-4 rounded-xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/50 p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">Planned keys</div>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            {['nav', 'footer', 'promo', 'seo_default', 'social', 'contact'].map((k) => (
              <span
                key={k}
                className="rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-3 py-1 font-semibold text-semantic-text-primary/80"
              >
                {k}
              </span>
            ))}
          </div>
        </div>
      </div>
    </AdminPageLayout>
  )
}

