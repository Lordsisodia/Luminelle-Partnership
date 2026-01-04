import { NavLink } from 'react-router-dom'
import type { ComponentType } from 'react'
import { navSizing } from './AdminSideNav.tokens'

type BaseProps = {
  to: string
  label: string
  icon: ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
  onNavigate?: () => void
  inlineLabel?: boolean
  showLabel?: boolean
  badge?: string | null
  activeClassName?: string
}

export function NavRailItem({
  to,
  label,
  icon: Icon,
  onNavigate,
  inlineLabel = false,
  showLabel = false,
  badge,
  activeClassName,
}: BaseProps) {
  return (
    <NavLink
      to={to}
      end={to === '/admin'}
      onClick={onNavigate}
      aria-label={label}
      title={label}
      className={({ isActive }) =>
        [
          'relative group flex h-11 w-11 items-center justify-center rounded-2xl transition overflow-visible',
          isActive
            ? activeClassName ??
              'bg-white text-semantic-text-primary shadow-sm ring-1 ring-semantic-legacy-brand-blush/60'
            : 'text-semantic-text-primary/70 hover:bg-white/70 hover:text-semantic-text-primary',
        ].join(' ')
      }
    >
      <Icon className="h-4 w-4" aria-hidden />
      <span
        className={[
          'text-[11px] font-semibold uppercase tracking-[0.08em] text-semantic-text-primary/80 transition-all duration-200',
          inlineLabel
            ? showLabel
              ? 'opacity-100 ml-2'
              : 'opacity-0 pointer-events-none ml-2'
            : [
                'absolute left-full top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-semantic-legacy-brand-blush/60 bg-white',
                navSizing.popoutPadding,
                navSizing.popoutOffset,
                showLabel ? 'opacity-100 translate-x-0' : 'opacity-0 pointer-events-none -translate-x-1',
              ].join(' '),
        ].join(' ')}
      >
        {label}
      </span>
      {badge ? (
        <span className="absolute -right-1 -top-1 inline-flex min-w-5 items-center justify-center rounded-full bg-semantic-legacy-brand-cocoa px-1.5 py-0.5 text-[10px] font-semibold text-white shadow-sm">
          {badge}
        </span>
      ) : null}
    </NavLink>
  )
}
