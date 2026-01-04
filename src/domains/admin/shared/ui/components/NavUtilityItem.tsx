import type { ComponentType } from 'react'
import { NavLink } from 'react-router-dom'
import { navSizing } from './AdminSideNav.tokens'

type Props = {
  to: string
  label: string
  icon: ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
  onNavigate?: () => void
  showLabel: boolean
  inlineLabel?: boolean
}

export function NavUtilityItem({
  to,
  label,
  icon: Icon,
  onNavigate,
  showLabel,
  inlineLabel = false,
}: Props) {
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      aria-label={label}
      title={label}
      className={({ isActive }) =>
        [
          'relative group flex items-center rounded-2xl',
          navSizing.transition,
          'overflow-visible',
          'h-11 w-11 justify-center',
          isActive
            ? 'bg-white text-semantic-text-primary shadow-sm ring-1 ring-semantic-legacy-brand-blush/60'
            : 'text-semantic-text-primary/70 hover:bg-white/70 hover:text-semantic-text-primary',
        ].join(' ')
      }
    >
      <Icon className="h-4 w-4 shrink-0" aria-hidden />
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
    </NavLink>
  )
}
