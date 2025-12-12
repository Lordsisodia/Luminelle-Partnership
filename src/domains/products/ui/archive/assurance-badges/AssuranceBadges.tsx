export const AssuranceBadges = () => {
  const items = [
    { title: 'Waterproof', desc: 'Moisture‑guard lining' },
    { title: 'Comfort Fit', desc: 'Soft, secure band' },
    { title: 'Easy Returns', desc: 'Hassle‑free policy' },
  ]
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {items.map((it, i) => (
        <div key={i} className="rounded-2xl border border-brand-blush/60 bg-brand-blush/20 p-4 text-center">
          <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-cocoa ring-1 ring-brand-blush">✓</div>
          <div className="font-heading text-brand-cocoa">{it.title}</div>
          <div className="text-sm text-brand-cocoa/70">{it.desc}</div>
        </div>
      ))}
    </div>
  )
}

