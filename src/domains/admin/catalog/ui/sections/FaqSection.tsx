import { TextInput } from '@admin/catalog/ui/components/FormPrimitives'

export type FaqItem = { q: string; a: string }

export default function FaqSection({
  id,
  items,
  onChange,
  highlight = false,
  activeAnchorId,
}: {
  id?: string
  items: FaqItem[]
  onChange: (index: number, field: 'q' | 'a', value: string) => void
  highlight?: boolean
  activeAnchorId?: string
}) {
  const activeSectionClass =
    'ring-2 ring-semantic-legacy-brand-cocoa/15 ring-offset-2 ring-offset-brand-porcelain shadow-sm'
  const missingQuestions = items.filter((i) => !i.q.trim()).length
  const missingAnswers = items.filter((i) => !i.a.trim()).length
  return (
    <section
      id={id}
      className={`scroll-mt-24 space-y-4 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-white p-5 transition-shadow ${
        highlight ? activeSectionClass : ''
      }`}
    >
      <div className="h-9 -mx-5 -mt-5 mb-4 rounded-t-2xl bg-semantic-legacy-brand-blush px-4 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-semantic-text-primary">
          Questions & answers
        </span>
        <div className="hidden sm:flex items-center gap-2 text-[11px] font-semibold text-semantic-text-primary/70">
          <span className="text-semantic-text-primary/60">{items.length} Q&A</span>
          {missingQuestions ? (
            <span className="text-semantic-legacy-brand-cocoa">{missingQuestions} missing questions</span>
          ) : null}
          {missingAnswers ? (
            <span className="text-semantic-legacy-brand-cocoa">{missingAnswers} missing answers</span>
          ) : null}
        </div>
      </div>
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
                Q&A {idx + 1}
              </span>
              <TextInput value={item.q} onChange={(v) => onChange(idx, 'q', v)} placeholder="Question" />
              <TextInput value={item.a} onChange={(v) => onChange(idx, 'a', v)} placeholder="Answer" />
            </div>
          )
        })}
      </div>
    </section>
  )
}
