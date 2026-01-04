type TrustStripProps = {
  badges: { label: string; icon?: string; tooltip?: string }[]
  background?: string
}

export function TrustStrip({ badges, background = '#fff7f3' }: TrustStripProps) {
  return (
    <div className="w-full" style={{ background }}>
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-2 px-4 py-3">
        {badges.map((badge) => (
          <span
            key={badge.label}
            className="inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-sm font-semibold text-semantic-text-primary shadow-sm"
          >
            {badge.icon ? <span aria-hidden>★</span> : null}
            {badge.label}
          </span>
        ))}
      </div>
    </div>
  )
}

export default TrustStrip
