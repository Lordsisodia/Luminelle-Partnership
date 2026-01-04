import { TextInput } from '@admin/catalog/ui/components/FormPrimitives'

export type EssentialItem = { title: string; body: string }

export default function EssentialsSection({
  id,
  items,
  onChange,
  highlight = false,
  activeAnchorId,
  onPreviewClick,
}: {
  id?: string
  items: EssentialItem[]
  onChange: (index: number, field: 'title' | 'body', value: string) => void
  highlight?: boolean
  activeAnchorId?: string
  onPreviewClick?: () => void
}) {
  const activeSectionClass =
    'ring-2 ring-semantic-legacy-brand-cocoa/15 ring-offset-2 ring-offset-brand-porcelain shadow-sm'
  const missingTitles = items.filter((i) => !i.title.trim()).length
  const missingBodies = items.filter((i) => !i.body.trim()).length
  return (
    <section
      id={id}
      className={`scroll-mt-24 space-y-4 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5 transition-shadow ${
        highlight ? activeSectionClass : ''
      }`}
    >
      <div className="h-9 -mx-5 -mt-5 mb-4 rounded-t-2xl bg-semantic-legacy-brand-blush px-4 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary">
          Materials, care & fit
        </span>
        <div className="hidden sm:flex items-center gap-2 text-[11px] font-semibold text-semantic-text-primary/70">
          <button
            type="button"
            onClick={onPreviewClick}
            className="inline-flex items-center rounded-full border border-semantic-legacy-brand-blush/60 bg-white/80 px-3 py-1 text-[11px] font-semibold text-semantic-text-primary shadow-sm transition hover:bg-white"
          >
            View in preview
          </button>
        </div>
      </div>
      <p className="text-sm text-semantic-text-primary/75">Quick references before you add it to your cart.</p>
      <div className="space-y-3">
        {items.map((item, idx) => {
          const itemId = id ? `${id}-item-${idx + 1}` : undefined
          const isActive = Boolean(itemId && activeAnchorId === itemId)
          return (
            <div
              key={idx}
              id={itemId}
              className={`scroll-mt-24 space-y-2 rounded-xl border border-semantic-legacy-brand-blush/50 bg-brand-porcelain/40 p-3 ${
                isActive ? activeSectionClass : ''
              }`}
            >
              <span className="inline-flex items-center rounded-full bg-semantic-legacy-brand-blush px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-semantic-text-primary">
                Point {idx + 1}
              </span>
              <TextInput value={item.title} onChange={(v) => onChange(idx, 'title', v)} placeholder="Title" />
              <TextInput value={item.body} onChange={(v) => onChange(idx, 'body', v)} placeholder="Subtext" />
            </div>
          )
        })}
      </div>
    </section>
  )
}
