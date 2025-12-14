import { AdminPageLayout } from '@admin/ui/layouts'

export default function ProductsPage() {
  return (
    <AdminPageLayout
      title="Products"
      subtitle="Planned: editable product copy, SEO, and galleries (cms_products + cms_product_media)."
    >
      <div className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5">
        <div className="text-sm font-semibold text-semantic-text-primary">Not wired yet</div>
        <p className="mt-2 text-sm text-semantic-text-primary/70">
          This will start as a searchable list of `cms_products` and a detail page with tabs for Copy, Media, and SEO.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/50 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">Copy</div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-semantic-text-primary/80">
              <li>Title, short/long description</li>
              <li>Badges, specs, FAQ blocks</li>
              <li>Status + publish controls</li>
            </ul>
          </div>
          <div className="rounded-xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/50 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">Media</div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-semantic-text-primary/80">
              <li>Sortable gallery (`cms_product_media.sort`)</li>
              <li>Alt text required, focal point support</li>
              <li>Replace flow that preserves references</li>
            </ul>
          </div>
        </div>
      </div>
    </AdminPageLayout>
  )
}

