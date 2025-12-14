import { AdminPageLayout } from '@admin/ui/layouts'

export default function MediaPage() {
  return (
    <AdminPageLayout
      title="Media library"
      subtitle="Planned: upload + manage assets across buckets with guardrails and usage awareness."
    >
      <div className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5">
        <div className="text-sm font-semibold text-semantic-text-primary">Not wired yet</div>
        <p className="mt-2 text-sm text-semantic-text-primary/70">
          Initial build will focus on a safe upload flow: client-side WebP conversion, max size/dimensions, and required
          alt text before publish. Later: usage tracing (where an image is referenced) and orphan cleanup.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/50 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">Buckets</div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-semantic-text-primary/80">
              <li>`public-media` (published, long cache)</li>
              <li>`product-media`, `blog-media`</li>
              <li>`draft-media` (private, signed URLs)</li>
            </ul>
          </div>
          <div className="rounded-xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/50 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">Guardrails</div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-semantic-text-primary/80">
              <li>≤25MB, ≤2500px</li>
              <li>Auto WebP (SVG allowed for vectors)</li>
              <li>Alt text required</li>
            </ul>
          </div>
        </div>
      </div>
    </AdminPageLayout>
  )
}

