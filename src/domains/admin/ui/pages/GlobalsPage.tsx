import { AdminPageLayout } from '@admin/ui/layouts'

export default function GlobalsPage() {
  return (
    <AdminPageLayout
      title="Globals"
      subtitle="Planned: edit global settings like nav/footer/promo bars/default SEO (cms_globals)."
    >
      <div className="rounded-2xl border border-brand-blush/60 bg-white p-5">
        <div className="text-sm font-semibold text-brand-cocoa">Not wired yet</div>
        <p className="mt-2 text-sm text-brand-cocoa/70">
          Globals will be stored as typed JSON blobs keyed by `cms_globals.key` (e.g. `nav`, `footer`, `promo`, `seo_default`).
        </p>
        <div className="mt-4 rounded-xl border border-brand-blush/60 bg-brand-porcelain/50 p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-cocoa/60">Planned keys</div>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            {['nav', 'footer', 'promo', 'seo_default', 'social', 'contact'].map((k) => (
              <span
                key={k}
                className="rounded-full border border-brand-blush/60 bg-white px-3 py-1 font-semibold text-brand-cocoa/80"
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

