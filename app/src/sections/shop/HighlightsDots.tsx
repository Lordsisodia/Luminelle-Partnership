type DotsProps = {
  count: number
  active: number
  onSelect: (i: number) => void
}

export const HighlightsDots = ({ count, active, onSelect }: DotsProps) => (
  <div className="mt-3 flex items-center justify-center gap-3">
    {Array.from({ length: count }).map((_, i) => (
      <button
        key={i}
        aria-label={`Go to highlight ${i + 1}`}
        aria-current={i === active}
        onClick={() => onSelect(i)}
        className={`h-2 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cocoa ${
          i === active ? 'w-8 bg-brand-cocoa' : 'w-3 bg-brand-cocoa/30 hover:bg-brand-cocoa/60'
        }`}
      />
    ))}
  </div>
)
