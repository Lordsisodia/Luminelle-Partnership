import { useMemo } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import AdminPageLayout from '@admin/ui/layouts/AdminPageLayout'
import { blogPosts } from '@/content/blog'

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = useMemo(() => blogPosts.find((p) => p.slug === slug), [slug])

  if (!post) return <Navigate to="/admin/blogs" replace />

  return (
    <AdminPageLayout
      title={post.title}
      subtitle={`/${post.slug}`}
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <button className="rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-3 py-1.5 text-xs font-semibold text-semantic-text-primary">
            Save
          </button>
          <button className="rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-3 py-1.5 text-xs font-semibold text-semantic-text-primary">
            Publish
          </button>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[420px,1fr]">
        <div className="rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-3 shadow-sm">
          <div className="mb-3 inline-flex items-center rounded-full bg-brand-porcelain px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-semantic-text-primary">
            Preview
          </div>
          <div className="overflow-hidden rounded-[24px] border border-semantic-legacy-brand-blush/60 shadow-sm">
            <iframe
              title="Blog preview"
              src={`/blog/${post.slug}`}
              className="h-[900px] w-full"
              style={{ minWidth: 360, maxWidth: 420 }}
            />
          </div>
        </div>

        <div className="space-y-6">
          <section className="overflow-hidden rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white shadow-sm">
            <div className="rounded-t-2xl bg-brand-porcelain px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-semantic-text-primary">
              Hero
            </div>
            <div className="p-4">
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <label className="space-y-1 text-sm text-semantic-text-primary/80">
                  <span>Title</span>
                  <input className="w-full rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm" defaultValue={post.title} />
                </label>
              <label className="space-y-1 text-sm text-semantic-text-primary/80">
                <span>Subtitle</span>
                <input className="w-full rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm" defaultValue={post.subtitle} />
              </label>
              <label className="space-y-1 text-sm text-semantic-text-primary/80">
                <span>Primary tag</span>
                <input className="w-full rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm" defaultValue={post.tag} />
              </label>
              <label className="space-y-1 text-sm text-semantic-text-primary/80">
                <span>Slug</span>
                <input className="w-full rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm" defaultValue={post.slug} />
              </label>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white shadow-sm">
            <div className="rounded-t-2xl bg-brand-porcelain px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-semantic-text-primary">
              Meta
            </div>
            <div className="p-4 grid gap-3 md:grid-cols-3">
              <label className="space-y-1 text-sm text-semantic-text-primary/80">
                <span>Status</span>
                <select className="w-full rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm" defaultValue="published">
                  <option value="draft">Draft</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </label>
              <label className="space-y-1 text-sm text-semantic-text-primary/80">
                <span>Publish at</span>
                <input className="w-full rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm" type="date" defaultValue={post.date} />
              </label>
              <label className="space-y-1 text-sm text-semantic-text-primary/80">
                <span>Read time</span>
                <input className="w-full rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm" defaultValue={post.readTime} />
              </label>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white shadow-sm">
            <div className="rounded-t-2xl bg-brand-porcelain px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-semantic-text-primary">
              Hero media
            </div>
            <div className="p-4 grid gap-3 md:grid-cols-2">
              <label className="space-y-1 text-sm text-semantic-text-primary/80">
                <span>Cover image</span>
                <input className="w-full rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm" defaultValue={post.cover} />
              </label>
              <label className="space-y-1 text-sm text-semantic-text-primary/80">
                <span>OG image</span>
                <input className="w-full rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm" defaultValue={post.ogImage || ''} />
              </label>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white shadow-sm">
            <div className="rounded-t-2xl bg-brand-porcelain px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-semantic-text-primary">
              SEO
            </div>
            <div className="p-4 space-y-3">
              <label className="space-y-1 text-sm text-semantic-text-primary/80">
                <span>Meta title</span>
                <input className="w-full rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm" defaultValue={post.title} />
              </label>
              <label className="space-y-1 text-sm text-semantic-text-primary/80">
                <span>Meta description</span>
                <textarea className="w-full rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm" rows={3} defaultValue={post.teaser} />
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-dashed border-semantic-legacy-brand-blush/60 bg-brand-porcelain/60 p-4 text-sm text-semantic-text-primary/80">
            Body blocks and inline media editing will live here next (from blog body/sections).
          </section>
        </div>
      </div>
    </AdminPageLayout>
  )
}
