import { useState } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import AdminPageLayout from '@admin/shared/ui/layouts/AdminPageLayout'
import { Button } from '@ui-kit/components/Button'
import { useBlogPost, useUpdateBlogPost, useUpdateBlogPostStatus } from '../../application'
import { SectionEditor, FAQEditor } from '../components'

// Types for our improved editor
interface Paragraph {
  id: string
  text: string
  type: 'text' | 'bullet' | 'numbered'
}

interface Section {
  id: string
  heading: string
  paragraphs: Paragraph[]
  imageUrl?: string
  imageCaption?: string
  expanded?: boolean
}

interface FAQ {
  id: string
  question: string
  answer: string
  expanded?: boolean
}

interface ProductCard {
  title?: string
  price?: string
  badge?: string
  href?: string
  image?: string
  caption?: string
}

export default function BlogDetailPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { slug } = useParams<'slug'>()

  // Fetch post from Supabase
  const { data: post, isLoading, error } = useBlogPost(undefined, slug || undefined)

  const updatePost = useUpdateBlogPost()
  const updateStatus = useUpdateBlogPostStatus()

  const backHref = `/admin/blogs${location.search || ''}`

  if (isLoading) {
    return (
      <AdminPageLayout title="Loading..." subtitle="">
        <div className="flex items-center justify-center p-12">
          <div className="text-semantic-text-primary/60">Loading post...</div>
        </div>
      </AdminPageLayout>
    )
  }

  if (error || !post) {
    return <Navigate to={backHref} replace />
  }

  // Convert legacy content to new section format
  const convertToSections = (post: any): Section[] => {
    if (!post.content) return []
    return post.content.map((section: any, idx: number) => ({
      id: section.id || `s-${idx}`,
      heading: section.heading || '',
      paragraphs: (section.paragraphs || []).map((p: string, pIdx: number) => ({
        id: `p-${idx}-${pIdx}`,
        text: p,
        type: 'text' as const
      })),
      imageUrl: section.imageUrl,
      imageCaption: section.imageCaption,
      expanded: true
    }))
  }

  // Convert legacy FAQs to new format
  const convertToFAQs = (post: any): FAQ[] => {
    if (!post.faqs) return []
    return post.faqs.map((faq: any, idx: number) => ({
      id: faq.id || `faq-${idx}`,
      question: faq.question || '',
      answer: faq.answer || '',
      expanded: idx < 2
    }))
  }

  const [sections, setSections] = useState<Section[]>(() => convertToSections(post))
  const [faqs, setFaqs] = useState<FAQ[]>(() => convertToFAQs(post))
  const [productCard, setProductCard] = useState<ProductCard | null>(() => post.product_card || null)

  // Convert new section format back to legacy format for saving
  const convertSectionsToLegacy = (sections: Section[]) => {
    return sections.map(section => ({
      heading: section.heading,
      paragraphs: section.paragraphs.map(p => p.text),
      ...(section.imageUrl && { imageUrl: section.imageUrl }),
      ...(section.imageCaption && { imageCaption: section.imageCaption })
    }))
  }

  // Convert new FAQ format back to legacy format for saving
  const convertFAQsToLegacy = (faqs: FAQ[]) => {
    return faqs.map(faq => ({
      question: faq.question,
      answer: faq.answer
    }))
  }

  const handleSave = () => {
    const updates: any = {
      id: post.id,
      content: convertSectionsToLegacy(sections),
      faqs: convertFAQsToLegacy(faqs),
    }

    if (productCard && productCard.title) {
      updates.product_card = {
        title: productCard.title,
        ...(productCard.price && { price: productCard.price }),
        ...(productCard.badge && { badge: productCard.badge }),
        ...(productCard.href && { href: productCard.href }),
        ...(productCard.image && { image: productCard.image }),
        ...(productCard.caption && { caption: productCard.caption }),
      }
    }

    updatePost.mutate(updates)
  }

  const handlePublish = () => {
    updateStatus.mutate({
      id: post.id,
      status: 'published',
    })
  }

  return (
    <AdminPageLayout
      title={post.title}
      subtitle={`/${post.slug}`}
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => navigate(backHref)}>
            Back
          </Button>
          <Button variant="secondary" size="sm" onClick={handleSave} disabled={updatePost.isPending}>
            {updatePost.isPending ? 'Saving...' : 'Save'}
          </Button>
          <Button variant="secondary" size="sm" onClick={handlePublish} disabled={updateStatus.isPending}>
            {updateStatus.isPending ? 'Publishing...' : 'Publish'}
          </Button>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[420px,1fr]">
        {/* Preview */}
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

        {/* Editor */}
        <div className="space-y-6">
          {/* Hero Section */}
          <section className="overflow-hidden rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white shadow-sm">
            <div className="rounded-t-2xl bg-brand-porcelain px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-semantic-text-primary">
              Hero
            </div>
            <div className="p-4">
              <div className="grid gap-3 md:grid-cols-2">
                <label className="space-y-1 text-sm text-semantic-text-primary/80">
                  <span>Title</span>
                  <input className="w-full rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm" defaultValue={post.title} />
                </label>
                <label className="space-y-1 text-sm text-semantic-text-primary/80">
                  <span>Subtitle</span>
                  <input className="w-full rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm" defaultValue={post.subtitle || ''} />
                </label>
                <label className="space-y-1 text-sm text-semantic-text-primary/80">
                  <span>Primary tag</span>
                  <input className="w-full rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm" defaultValue={post.category?.name || ''} />
                </label>
                <label className="space-y-1 text-sm text-semantic-text-primary/80">
                  <span>Slug</span>
                  <input className="w-full rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm" defaultValue={post.slug} />
                </label>
              </div>
            </div>
          </section>

          {/* Meta Section */}
          <section className="overflow-hidden rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white shadow-sm">
            <div className="rounded-t-2xl bg-brand-porcelain px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-semantic-text-primary">
              Meta
            </div>
            <div className="p-4 grid gap-3 md:grid-cols-3">
              <label className="space-y-1 text-sm text-semantic-text-primary/80">
                <span>Status</span>
                <select className="w-full rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm" defaultValue={post.status}>
                  <option value="draft">Draft</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </label>
              <label className="space-y-1 text-sm text-semantic-text-primary/80">
                <span>Publish at</span>
                <input className="w-full rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm" type="date" defaultValue={post.published_at?.split('T')[0] || ''} />
              </label>
              <label className="space-y-1 text-sm text-semantic-text-primary/80">
                <span>Read time</span>
                <input className="w-full rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm" defaultValue={post.read_time_minutes || ''} />
              </label>
            </div>
          </section>

          {/* Hero Media */}
          <section className="overflow-hidden rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white shadow-sm">
            <div className="rounded-t-2xl bg-brand-porcelain px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-semantic-text-primary">
              Hero media
            </div>
            <div className="p-4 grid gap-3 md:grid-cols-2">
              <label className="space-y-1 text-sm text-semantic-text-primary/80">
                <span>Cover image</span>
                <input className="w-full rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm" defaultValue={post.cover_image_url || ''} />
              </label>
              <label className="space-y-1 text-sm text-semantic-text-primary/80">
                <span>OG image</span>
                <input className="w-full rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm" defaultValue={post.og_image_url || ''} />
              </label>
            </div>
          </section>

          {/* SEO */}
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
                <textarea className="w-full rounded-xl border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm" rows={3} defaultValue={post.excerpt || ''} />
              </label>
            </div>
          </section>

          {/* Body - New Section Editor */}
          <section className="overflow-hidden rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white shadow-sm">
            <div className="rounded-t-2xl bg-brand-porcelain px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-semantic-text-primary">
              Body
            </div>
            <div className="p-4 space-y-6">
              <div className="space-y-3">
                <div className="text-sm font-semibold text-semantic-text-primary">Sections</div>
                <SectionEditor sections={sections} onChange={setSections} />
              </div>

              <div className="space-y-3">
                <div className="text-sm font-semibold text-semantic-text-primary">FAQs</div>
                <FAQEditor faqs={faqs} onChange={setFaqs} />
              </div>

              <div className="space-y-2">
                <div className="text-sm font-semibold text-semantic-text-primary">Product CTA (optional)</div>
                <div className="grid gap-2 md:grid-cols-2">
                  <label className="space-y-1 text-sm text-semantic-text-primary/80">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-semantic-text-primary/60">Title</span>
                    <input
                      className="w-full rounded-lg border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm"
                      placeholder="CTA title"
                      value={productCard?.title || ''}
                      onChange={(e) => setProductCard(c => ({ ...(c || {}), title: e.target.value }))}
                    />
                  </label>
                  <label className="space-y-1 text-sm text-semantic-text-primary/80">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-semantic-text-primary/60">Price</span>
                    <input
                      className="w-full rounded-lg border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm"
                      placeholder="Price"
                      value={productCard?.price || ''}
                      onChange={(e) => setProductCard(c => ({ ...(c || {}), price: e.target.value }))}
                    />
                  </label>
                  <label className="space-y-1 text-sm text-semantic-text-primary/80">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-semantic-text-primary/60">Badge</span>
                    <input
                      className="w-full rounded-lg border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm"
                      placeholder="Badge"
                      value={productCard?.badge || ''}
                      onChange={(e) => setProductCard(c => ({ ...(c || {}), badge: e.target.value }))}
                    />
                  </label>
                  <label className="space-y-1 text-sm text-semantic-text-primary/80">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-semantic-text-primary/60">Link</span>
                    <input
                      className="w-full rounded-lg border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm"
                      placeholder="Link"
                      value={productCard?.href || ''}
                      onChange={(e) => setProductCard(c => ({ ...(c || {}), href: e.target.value }))}
                    />
                  </label>
                  <label className="space-y-1 text-sm text-semantic-text-primary/80">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-semantic-text-primary/60">Image</span>
                    <input
                      className="w-full rounded-lg border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm"
                      placeholder="Image"
                      value={productCard?.image || ''}
                      onChange={(e) => setProductCard(c => ({ ...(c || {}), image: e.target.value }))}
                    />
                  </label>
                  <label className="space-y-1 text-sm text-semantic-text-primary/80">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-semantic-text-primary/60">Caption</span>
                    <input
                      className="w-full rounded-lg border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm"
                      placeholder="Caption"
                      value={productCard?.caption || ''}
                      onChange={(e) => setProductCard(c => ({ ...(c || {}), caption: e.target.value }))}
                    />
                  </label>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AdminPageLayout>
  )
}
