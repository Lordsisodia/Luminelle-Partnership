import React from 'react'

export type DeviceMode = 'phone' | 'tablet' | 'desktop'

export function DeviceToggle({
  device,
  onChange,
  showLabels = false,
}: {
  device: DeviceMode
  onChange: (d: DeviceMode) => void
  showLabels?: boolean
}) {
  const btn = (id: DeviceMode, label: string, shortcut: string, icon: React.ReactNode) => (
    <button
      type="button"
      onClick={() => onChange(id)}
      aria-pressed={device === id}
      aria-label={label}
      aria-keyshortcuts={shortcut}
      title={showLabels ? label : `${label} (${shortcut})`}
      className={[
        'inline-flex items-center justify-center rounded-full transition',
        showLabels ? 'gap-1 px-3 py-1 text-[11px] font-semibold' : 'h-7 w-7',
        'hover:bg-brand-porcelain/70',
        device === id
          ? 'bg-brand-porcelain/80 text-semantic-legacy-brand-cocoa'
          : 'text-semantic-text-primary/55 hover:text-semantic-text-primary/80',
        'focus:outline-none focus:ring-2 focus:ring-semantic-legacy-brand-cocoa/30',
      ].join(' ')}
    >
      {icon}
      {showLabels ? label : null}
    </button>
  )

  return (
    <div role="group" aria-label="Preview device" className="inline-flex items-center justify-center gap-1.5">
      {btn(
        'phone',
        'Phone',
        '1',
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="6" y="2" width="12" height="20" rx="3" />
          <circle cx="12" cy="18" r="1" />
        </svg>,
      )}
      {btn(
        'tablet',
        'Tablet',
        '2',
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <circle cx="12" cy="18" r="1" />
        </svg>,
      )}
      {btn(
        'desktop',
        'Desktop',
        '3',
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="12" rx="1.5" />
          <path d="M9 20h6m-8-4h10" />
        </svg>,
      )}
    </div>
  )
}

export default DeviceToggle
