type CareItem = { icon?: string; title: string; body: string }

type Props = { items: CareItem[]; label?: string }

const Icon = ({ name }: { name?: string }) => {
  if (name === 'Shield')
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /></svg>
  if (name === 'RefreshCcw')
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M3 2v6h6" /><path d="m3 8 3-3a9 9 0 1 1-2.83 9.17" /></svg>
  if (name === 'Feather')
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M20 6 9 17l-5.5-5.5" /><path d="M4 10l-2 2" /><path d="m14 4-2 2" /></svg>
  return null
}

export const CareSection = ({ items, label = 'Care & materials' }: Props) => (
  <div className="rounded-3xl border border-semantic-accent-cta/60 bg-white/95 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-semantic-accent-cta/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-semantic-text-primary">
      {label}
    </div>
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div
          key={item.title}
          id={`pdp-care-item-${idx + 1}`}
          className="scroll-mt-24 flex gap-3 rounded-2xl border border-semantic-legacy-brand-blush/60 bg-semantic-legacy-brand-blush/10 p-4 shadow-[0_8px_18px_rgba(0,0,0,0.04)]"
        >
          <span className="mt-0.5 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-semantic-text-primary shadow-soft">
            <Icon name={item.icon} />
          </span>
          <div>
            <p className="font-heading text-base font-semibold text-semantic-text-primary">{item.title}</p>
            <p className="mt-1 text-[14px] leading-snug text-semantic-text-primary/80 whitespace-pre-line">{item.body}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)
