import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductPage from '@client/shop/products/ui/pages/ProductPage'

type PreviewDevice = 'phone' | 'tablet' | 'desktop'

// This page renders the real PDP at a mobile width (inside an iframe).
// Draft overrides are applied by the PDP itself via `postMessage`.
export default function ProductPreviewFramePage() {
  const [params] = useSearchParams()
  const deviceParam = params.get('device')
  const device: PreviewDevice = deviceParam === 'tablet' || deviceParam === 'desktop' || deviceParam === 'phone' ? deviceParam : 'phone'

  const preset = useMemo(() => {
    switch (device) {
      case 'tablet':
        return { width: 820, minHeight: 1180 }
      case 'desktop':
        return { width: 1280, minHeight: 900 }
      case 'phone':
      default:
        return { width: 390, minHeight: 844 }
    }
  }, [device])

  // Constrain to mobile width even on desktop
  const wrapperStyle = useMemo(
    () => ({
      maxWidth: preset.width,
      minWidth: preset.width,
      minHeight: preset.minHeight,
      margin: '0 auto',
      overflowX: 'hidden' as const,
    }),
    [preset.minHeight, preset.width]
  )

  return (
    <div style={wrapperStyle} className="bg-white overflow-hidden">
      <ProductPage />
    </div>
  )
}
