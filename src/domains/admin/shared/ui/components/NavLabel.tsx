import { navSizing } from './AdminSideNav.tokens'

interface NavLabelProps {
  label: string
  showLabel: boolean
  inlineLabel: boolean
}

export function NavLabel({ label, showLabel, inlineLabel }: NavLabelProps) {
  const baseClasses = 'text-[11px] font-semibold uppercase tracking-[0.08em] text-semantic-text-primary/80 transition-all duration-200'

  // Inline label mode (for drawer)
  if (inlineLabel) {
    return (
      <span
        className={[
          baseClasses,
          'ml-2',
          showLabel ? 'opacity-100' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      >
        {label}
      </span>
    )
  }

  // Popout label mode (for desktop rail)
  return (
    <span
      className={[
        baseClasses,
        'absolute left-full top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-semantic-legacy-brand-blush/60 bg-white',
        navSizing.popoutPadding,
        navSizing.popoutOffset,
        showLabel ? 'opacity-100 translate-x-0' : 'opacity-0 pointer-events-none -translate-x-1',
      ].join(' ')}
    >
      {label}
    </span>
  )
}
