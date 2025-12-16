import { useMemo } from 'react'
import { ProductPage } from '@/domains/products/ui/pages/ProductPage'

// This page renders the real PDP at a mobile width (inside an iframe).
// Draft overrides are applied by the PDP itself via `postMessage`.
export default function ProductPreviewFramePage() {
  // Constrain to mobile width even on desktop
  const wrapperStyle = useMemo(
    () => ({
      maxWidth: 340,
      minWidth: 340,
      minHeight: 844,
      margin: '0 auto',
      overflowX: 'hidden' as const,
    }),
    []
  )

  return (
    <div style={wrapperStyle} className="bg-white overflow-hidden">
      <ProductPage />
    </div>
  )
}
