import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type MinimalProduct = { id: string; handle: string; title: string }

type Params<T extends MinimalProduct> = {
  products: T[]
  routeHandle?: string
  loading: boolean
}

export function useProductSelection<T extends MinimalProduct>({ products, routeHandle, loading }: Params<T>) {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // Route -> selection
  useEffect(() => {
    if (!routeHandle || !products.length) return
    const match = products.find((p) => p.handle === routeHandle)
    setSelectedId(match ? match.id : null)
  }, [routeHandle, products])

  // Selection -> route
  useEffect(() => {
    if (!selectedId) return
    const selectedProduct = products.find((p) => p.id === selectedId)
    if (!selectedProduct) return
    const target = `/admin/products/${selectedProduct.handle}`
    if (window.location.pathname !== target) {
      navigate(target, { replace: true })
    }
    sessionStorage.setItem('admin:lastProductHandle', selectedProduct.handle)
    sessionStorage.setItem('admin:lastProductTitle', selectedProduct.title)
  }, [selectedId, products, navigate])

  const product = useMemo(
    () => (selectedId ? products.find((p) => p.id === selectedId) ?? null : null),
    [selectedId, products],
  )

  const hasSelection = !!product && !loading

  return { selectedId, setSelectedId, product, hasSelection }
}

export default useProductSelection
