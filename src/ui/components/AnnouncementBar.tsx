type AnnouncementBarProps = {
  message: string
  severity?: 'info' | 'warn' | 'error'
  ctaLabel?: string
  ctaHref?: string
  dismissible?: boolean
}

const severityBg: Record<NonNullable<AnnouncementBarProps['severity']>, string> = {
  info: '#eef6ff',
  warn: '#fff4e5',
  error: '#ffe9e6',
}

export function AnnouncementBar({
  message,
  severity = 'info',
  ctaLabel,
  ctaHref,
  dismissible,
}: AnnouncementBarProps) {
  const bg = severityBg[severity] ?? severityBg.info
  return (
    <div className="w-full" style={{ background: bg }}>
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-2 text-sm font-semibold text-semantic-text-primary">
        <span>{message}</span>
        <div className="flex items-center gap-2">
          {ctaLabel ? (
            <a
              href={ctaHref || '#'}
              className="text-sm font-semibold text-semantic-legacy-brand-cocoa underline underline-offset-4"
            >
              {ctaLabel}
            </a>
          ) : null}
          {dismissible ? (
            <span className="cursor-default text-xs text-semantic-text-primary/60" aria-hidden>
              ×
            </span>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default AnnouncementBar
