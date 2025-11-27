const items = [
  { label: '30 day money back guarantee' },
  { label: 'Free shipping on orders £20+' },
  { label: 'Buy 2, save 10% • Shop now', href: '/product/shower-cap' },
]

export const TrustBar = () => (
  <div className="overflow-hidden bg-brand-blush text-brand-cocoa">
    <div className="relative">
      <div
        className="flex min-w-max items-center gap-6 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] md:text-xs"
        style={{ animation: 'marquee 18s linear infinite' }}
      >
        {[...items, ...items].map((item, idx) => (
          <span key={`${item.label}-${idx}`} className="inline-flex items-center gap-2 whitespace-nowrap">
            {item.href ? (
              <a href={item.href} className="underline decoration-brand-cocoa/50 underline-offset-4 hover:text-brand-cocoa/80">
                {item.label}
              </a>
            ) : (
              item.label
            )}
            <span className="h-1 w-1 rounded-full bg-brand-cocoa/35" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  </div>
)
