import type { PropsWithChildren, ReactNode } from 'react'

import { cn } from '@/domains/shared/utils/cn'

type SectionHeaderProps = PropsWithChildren<{
  title: string
  subtitle?: string
  icon?: ReactNode
  className?: string
}>

export default function SectionHeader({ title, subtitle, icon, className }: SectionHeaderProps) {
  return (
    <div className={cn('flex items-start gap-3', className)}>
      {icon ? (
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-siso-orange">{icon}</div>
      ) : null}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-siso-text-muted">{title}</p>
        {subtitle ? <p className="text-xs text-siso-text-muted">{subtitle}</p> : null}
      </div>
    </div>
  )
}

