import type { ReactNode } from 'react'

type ProductsLayoutProps = {
  previewSlot?: ReactNode
  children: ReactNode
}

// Two-column layout with optional sticky preview on the left (desktop only).
export default function ProductsLayout({ previewSlot, children }: ProductsLayoutProps) {
  if (!previewSlot) {
    return <div className="space-y-6">{children}</div>
  }

  return (
    <div className="grid gap-6 xl:gap-0 xl:grid-cols-[minmax(0,clamp(420px,30vw,640px))_1px_minmax(0,1fr)]">
      <div className="hidden xl:block pr-4">{previewSlot}</div>
      <div className="hidden xl:block bg-semantic-legacy-brand-blush/30" />
      <div className="space-y-6 xl:pl-4">{children}</div>
    </div>
  )
}
