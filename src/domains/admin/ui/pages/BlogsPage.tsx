import { AdminPageLayout } from '@admin/ui/layouts'

export default function BlogsPage() {
  return (
    <AdminPageLayout
      title="Blogs"
      subtitle="Planned: blog editor with blocks, SEO, and scheduling (cms_blogs + cms_blog_blocks)."
    >
      <div className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5">
        <div className="text-sm font-semibold text-semantic-text-primary">Not wired yet</div>
        <p className="mt-2 text-sm text-semantic-text-primary/70">
          This will include a list view with filters (status/author), and an editor that supports a limited block set
          (headings, paragraphs, lists, images, and YouTube embeds).
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/50 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">Editor</div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-semantic-text-primary/80">
              <li>Hero image picker + alt rules</li>
              <li>Structured blocks in `cms_blog_blocks`</li>
              <li>SEO + canonical URL</li>
            </ul>
          </div>
          <div className="rounded-xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/50 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-semantic-text-primary/60">Publishing</div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-semantic-text-primary/80">
              <li>Draft preview tokens</li>
              <li>Publish scheduling (`publish_at`)</li>
              <li>Rollback via `cms_versions`</li>
            </ul>
          </div>
        </div>
      </div>
    </AdminPageLayout>
  )
}

