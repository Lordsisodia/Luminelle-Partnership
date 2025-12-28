import { TextInput } from '@admin/catalog/ui/components/FormPrimitives'

export type FeaturedTikTokHeading = {
  eyebrow?: string
  title?: string
  description?: string
}

export default function FeaturedTikTokSection({
  id,
  heading,
  onChange,
  highlight = false,
}: {
  id?: string
  heading: FeaturedTikTokHeading
  onChange: (field: 'eyebrow' | 'title' | 'description', value: string) => void
  highlight?: boolean
}) {
  const activeSectionClass =
    'ring-2 ring-semantic-legacy-brand-cocoa/15 ring-offset-2 ring-offset-brand-porcelain shadow-sm'

  const missingTitle = !String(heading.title ?? '').trim()
  const missingDesc = !String(heading.description ?? '').trim()

  return (
    <section
      id={id}
      className={`scroll-mt-24 space-y-4 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5 transition-shadow ${
        highlight ? activeSectionClass : ''
      }`}
    >
      <div className="h-9 -mx-5 -mt-5 mb-4 rounded-t-2xl bg-semantic-legacy-brand-blush px-4 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary">
          Featured TikTok
        </span>
        <div className="hidden sm:flex items-center gap-2 text-[11px] font-semibold text-semantic-text-primary/70">
          {missingTitle ? <span className="text-semantic-legacy-brand-cocoa">Missing title</span> : null}
          {missingDesc ? <span className="text-semantic-legacy-brand-cocoa">Missing description</span> : null}
        </div>
      </div>

      <p className="text-sm text-semantic-text-primary/75">
        Heading for the creator video carousel section.
      </p>

      <div className="space-y-2 rounded-xl border border-semantic-legacy-brand-blush/50 bg-brand-porcelain/40 p-3">
        <span className="inline-flex items-center rounded-full bg-semantic-legacy-brand-blush px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-semantic-text-primary">
          Heading
        </span>
        <TextInput
          value={String(heading.eyebrow ?? '')}
          onChange={(v) => onChange('eyebrow', v)}
          placeholder="Eyebrow (optional)"
        />
        <TextInput
          value={String(heading.title ?? '')}
          onChange={(v) => onChange('title', v)}
          placeholder="Title"
        />
        <TextInput
          value={String(heading.description ?? '')}
          onChange={(v) => onChange('description', v)}
          placeholder="Description"
        />
      </div>
    </section>
  )
}

