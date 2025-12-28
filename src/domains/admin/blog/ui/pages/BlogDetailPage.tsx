import { useMemo, useState } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import AdminPageLayout from '@admin/shared/ui/layouts/AdminPageLayout'
import { Button } from '@ui-kit/components/Button'
import { blogPosts } from '@/content/blog'

export default function BlogDetailPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { slug } = useParams<'slug'>()
  const post = useMemo(() => blogPosts.find((p) => p.slug === slug), [slug])
  const backHref = `/admin/blogs${location.search || ''}`

  if (!post) return <Navigate to={backHref} replace />

  const [draft, setDraft] = useState<any>(() => ({
    ...post,
    sections: post.sections ? post.sections.map((s) => ({ ...s, paragraphs: [...(s.paragraphs || [])] })) : [],
    faqs: post.faqs ? post.faqs.map((f) => ({ ...f })) : [],
    productCard: post.productCard ? { ...post.productCard } : undefined,
    primaryKeyword: (post as any).primaryKeyword || '',
    secondaryKeywords: (post as any).secondaryKeywords || [],
  }))

  const updateSection = (idx: number, field: 'heading' | 'paragraphs', value: string) => {
    setDraft((d) => {
      const sections = [...(d.sections || [])]
      const current = sections[idx] || { heading: '', paragraphs: [] }
      sections[idx] =
        field === 'paragraphs'
          ? { ...current, paragraphs: value.split('\n').filter((p) => p.trim()) }
          : { ...current, heading: value }
      return { ...d, sections }
    })
  }

  const addSection = () =>
    setDraft((d) => ({
      ...d,
      sections: [...(d.sections || []), { heading: 'New section', paragraphs: [''] }],
    }))

  const removeSection = (idx: number) =>
    setDraft((d) => {
      const sections = [...(d.sections || [])]
      sections.splice(idx, 1)
      return { ...d, sections }
    })

  const updateFaq = (idx: number, field: 'question' | 'answer', value: string) => {
    setDraft((d) => {
      const faqs = [...(d.faqs || [])]
      const current = faqs[idx] || { question: '', answer: '' }
      faqs[idx] = { ...current, [field]: value }
      return { ...d, faqs }
    })
  }

  const addFaq = () =>
    setDraft((d) => ({
      ...d,
      faqs: [...(d.faqs || []), { question: 'Question', answer: 'Answer' }],
    }))

  const removeFaq = (idx: number) =>
    setDraft((d) => {
      const faqs = [...(d.faqs || [])]
      faqs.splice(idx, 1)
      return { ...d, faqs }
    })

  return (
    <AdminPageLayout
      title={post.title}
      subtitle={`/${post.slug}`}
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => navigate(backHref)}>
            Back
          </Button>
          <Button variant="secondary" size="sm">
            Save
          </Button>
          <Button variant="secondary" size="sm">
            Publish
          </Button>
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

          <section className="overflow-hidden rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white shadow-sm">
            <div className="rounded-t-2xl bg-brand-porcelain px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-semantic-text-primary">
              Body
            </div>
            <div className="p-4 space-y-6">
              <div className="space-y-3">
                <div className="text-sm font-semibold text-semantic-text-primary">Sections</div>
                {draft.sections?.map((section, idx) => (
                  <div key={idx} className="rounded-xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/60 p-3 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <label className="flex-1 space-y-1 text-sm text-semantic-text-primary/80">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-semantic-text-primary/60">
                          Heading
                        </span>
                        <input
                          className="w-full rounded-lg border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm font-semibold"
                          value={section.heading || ''}
                          onChange={(e) => updateSection(idx, 'heading', e.target.value)}
                          placeholder="Section heading"
                        />
                      </label>
                      <button
                        onClick={() => removeSection(idx)}
                        className="rounded-full border border-semantic-legacy-brand-blush/60 px-3 py-1 text-xs font-semibold text-semantic-text-primary hover:bg-brand-porcelain"
                      >
                        Remove
                      </button>
                    </div>
                    <label className="space-y-1 text-sm text-semantic-text-primary/80">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-semantic-text-primary/60">
                        Paragraphs
                      </span>
                      <textarea
                        className="w-full rounded-lg border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm"
                        rows={4}
                        value={section.paragraphs && section.paragraphs.length ? section.paragraphs.join('\n') : ''}
                        onChange={(e) => updateSection(idx, 'paragraphs', e.target.value)}
                        placeholder="One per line"
                      />
                    </label>
                  </div>
                ))}
                <button
                  onClick={addSection}
                  className="inline-flex items-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-3 py-1.5 text-sm font-semibold text-semantic-text-primary hover:bg-brand-porcelain"
                >
                  + Add section
                </button>
              </div>

              <div className="space-y-3">
                <div className="text-sm font-semibold text-semantic-text-primary">FAQs</div>
                {draft.faqs?.map((faq, idx) => (
                  <div key={idx} className="rounded-xl border border-semantic-legacy-brand-blush/60 bg-brand-porcelain/60 p-3 space-y-2">
                    <label className="space-y-1 text-sm text-semantic-text-primary/80">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-semantic-text-primary/60">
                        Question
                      </span>
                      <input
                        className="w-full rounded-lg border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm font-semibold"
                        value={faq.question}
                        onChange={(e) => updateFaq(idx, 'question', e.target.value)}
                        placeholder="FAQ question"
                      />
                    </label>
                    <label className="space-y-1 text-sm text-semantic-text-primary/80">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-semantic-text-primary/60">
                        Answer
                      </span>
                      <textarea
                        className="w-full rounded-lg border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm"
                        rows={3}
                        value={faq.answer}
                        onChange={(e) => updateFaq(idx, 'answer', e.target.value)}
                        placeholder="FAQ answer"
                      />
                    </label>
                    <div className="flex justify-end">
                      <button
                        onClick={() => removeFaq(idx)}
                        className="rounded-full border border-semantic-legacy-brand-blush/60 px-3 py-1 text-xs font-semibold text-semantic-text-primary hover:bg-brand-porcelain"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={addFaq}
                  className="inline-flex items-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white px-3 py-1.5 text-sm font-semibold text-semantic-text-primary hover:bg-brand-porcelain"
                >
                  + Add FAQ
                </button>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-semibold text-semantic-text-primary">Product CTA (optional)</div>
                <div className="grid gap-2 md:grid-cols-2">
                  <label className="space-y-1 text-sm text-semantic-text-primary/80">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-semantic-text-primary/60">Title</span>
                    <input
                      className="w-full rounded-lg border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm"
                      placeholder="CTA title"
                      value={draft.productCard?.title || ''}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, productCard: { ...(d.productCard || {}), title: e.target.value } }))
                      }
                    />
                  </label>
                  <label className="space-y-1 text-sm text-semantic-text-primary/80">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-semantic-text-primary/60">Price</span>
                    <input
                      className="w-full rounded-lg border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm"
                      placeholder="Price"
                      value={draft.productCard?.price || ''}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, productCard: { ...(d.productCard || {}), price: e.target.value } }))
                      }
                    />
                  </label>
                  <label className="space-y-1 text-sm text-semantic-text-primary/80">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-semantic-text-primary/60">Badge</span>
                    <input
                      className="w-full rounded-lg border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm"
                      placeholder="Badge"
                      value={draft.productCard?.badge || ''}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, productCard: { ...(d.productCard || {}), badge: e.target.value } }))
                      }
                    />
                  </label>
                  <label className="space-y-1 text-sm text-semantic-text-primary/80">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-semantic-text-primary/60">Link</span>
                    <input
                      className="w-full rounded-lg border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm"
                      placeholder="Link"
                      value={draft.productCard?.href || ''}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, productCard: { ...(d.productCard || {}), href: e.target.value } }))
                      }
                    />
                  </label>
                  <label className="space-y-1 text-sm text-semantic-text-primary/80">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-semantic-text-primary/60">Image</span>
                    <input
                      className="w-full rounded-lg border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm"
                      placeholder="Image"
                      value={draft.productCard?.image || ''}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, productCard: { ...(d.productCard || {}), image: e.target.value } }))
                      }
                    />
                  </label>
                  <label className="space-y-1 text-sm text-semantic-text-primary/80">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-semantic-text-primary/60">Caption</span>
                    <input
                      className="w-full rounded-lg border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm"
                      placeholder="Caption"
                      value={draft.productCard?.caption || ''}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, productCard: { ...(d.productCard || {}), caption: e.target.value } }))
                      }
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-semibold text-semantic-text-primary">Keywords</div>
                <label className="space-y-1 text-sm text-semantic-text-primary/80">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-semantic-text-primary/60">
                    Primary keyword
                  </span>
                  <input
                    className="w-full rounded-lg border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm"
                    placeholder="Primary keyword"
                    value={draft.primaryKeyword || ''}
                    onChange={(e) => setDraft((d) => ({ ...d, primaryKeyword: e.target.value }))}
                  />
                </label>
                <label className="space-y-1 text-sm text-semantic-text-primary/80">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-semantic-text-primary/60">
                    Secondary keywords
                  </span>
                  <input
                    className="w-full rounded-lg border border-semantic-legacy-brand-blush/60 bg-white px-3 py-2 text-sm"
                    placeholder="Comma separated"
                    value={(draft.secondaryKeywords || []).join(', ')}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, secondaryKeywords: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) }))
                    }
                  />
                </label>
              </div>
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
