import { useCallback, useMemo } from 'react'
import type { AdminProduct } from '../ui/cards/ProductCard'

const BENEFIT_COUNT = 4

export function useProductSpecs(product: AdminProduct | null, updateProduct: (updater: (p: AdminProduct) => AdminProduct) => void) {
  const parsedSpecs = useMemo(() => {
    if (!product) return {}
    try {
      const val = JSON.parse(product.specs_text)
      if (val && typeof val === 'object' && !Array.isArray(val)) return val
    } catch {
      /* ignore */
    }
    return {}
  }, [product])

  const careAndMaterials = (parsedSpecs as any).careAndMaterials ?? {}

  const careBullets = useMemo(() => {
    const raw = (parsedSpecs as any).care
    const arr = Array.isArray(raw) ? raw : []
    const normalized = arr.map((item: any) => ({
      title: typeof item?.title === 'string' ? item.title : '',
      body: typeof item?.body === 'string' ? item.body : '',
    }))
    while (normalized.length < 3) normalized.push({ title: '', body: '' })
    return normalized.slice(0, 3)
  }, [parsedSpecs])

  const updateCareBullet = useCallback(
    (index: number, field: 'title' | 'body', value: string) => {
      if (!product) return
      updateProduct((p) => {
        let specsObj: Record<string, any> = {}
        try {
          const parsed = JSON.parse(p.specs_text)
          if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) specsObj = parsed
        } catch {
          specsObj = {}
        }
        const current = Array.isArray(specsObj.care) ? specsObj.care.slice() : []
        while (current.length < 3) current.push({ title: '', body: '' })
        const next = current.slice(0, 3).map((item, idx) =>
          idx === index ? { ...item, [field]: value } : { title: item?.title ?? '', body: item?.body ?? '' },
        )
        return { ...p, specs_text: JSON.stringify({ ...specsObj, care: next }, null, 2) }
      })
    },
    [product, updateProduct],
  )

  const featureCalloutsHeading = useMemo(() => {
    const raw = (parsedSpecs as any).featureCallouts?.heading
    return {
      title: typeof raw?.title === 'string' ? raw.title : '',
      description: typeof raw?.description === 'string' ? raw.description : '',
    }
  }, [parsedSpecs])

  const updateFeatureHeading = useCallback(
    (field: 'title' | 'description', value: string) => {
      if (!product) return
      updateProduct((p) => {
        let specsObj: Record<string, any> = {}
        try {
          const parsed = JSON.parse(p.specs_text)
          if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) specsObj = parsed
        } catch {
          specsObj = {}
        }
        const existing = (specsObj.featureCallouts?.heading as any) ?? {}
        const next = { ...existing, [field]: value }
        return { ...p, specs_text: JSON.stringify({ ...specsObj, featureCallouts: { ...specsObj.featureCallouts, heading: next } }, null, 2) }
      })
    },
    [product, updateProduct],
  )

  const featurePills = useMemo(() => {
    const raw = (parsedSpecs as any).featureCallouts?.pills
    const arr = Array.isArray(raw) ? raw : []
    const normalized = arr.map((item: any) => ({
      title: typeof item?.title === 'string' ? item.title : '',
      subtext: typeof item?.subtext === 'string' ? item.subtext : '',
    }))
    while (normalized.length < 2) normalized.push({ title: '', subtext: '' })
    return normalized.slice(0, 2)
  }, [parsedSpecs])

  const updateFeaturePill = useCallback(
    (index: number, field: 'title' | 'subtext', value: string) => {
      if (!product) return
      updateProduct((p) => {
        let specsObj: Record<string, any> = {}
        try {
          const parsed = JSON.parse(p.specs_text)
          if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) specsObj = parsed
        } catch {
          specsObj = {}
        }
        const current = Array.isArray(specsObj.featureCallouts?.pills) ? specsObj.featureCallouts.pills.slice() : []
        while (current.length < 2) current.push({ title: '', subtext: '' })
        const next = current.slice(0, 2).map((item, idx) =>
          idx === index ? { ...item, [field]: value } : { title: item?.title ?? '', subtext: item?.subtext ?? '' },
        )
        const fc = specsObj.featureCallouts ?? {}
        return { ...p, specs_text: JSON.stringify({ ...specsObj, featureCallouts: { ...fc, pills: next } }, null, 2) }
      })
    },
    [product, updateProduct],
  )

  const howBullets = useMemo(() => {
    const raw = (parsedSpecs as any).how
    const arr = Array.isArray(raw) ? raw : []
    const normalized = arr.map((item: any) => ({
      title: typeof item?.title === 'string' ? item.title : '',
      body: typeof item?.body === 'string' ? item.body : '',
    }))
    while (normalized.length < 3) normalized.push({ title: '', body: '' })
    return normalized.slice(0, 3)
  }, [parsedSpecs])

  const updateHowBullet = useCallback(
    (index: number, field: 'title' | 'body', value: string) => {
      if (!product) return
      updateProduct((p) => {
        let specsObj: Record<string, any> = {}
        try {
          const parsed = JSON.parse(p.specs_text)
          if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) specsObj = parsed
        } catch {
          specsObj = {}
        }
        const currentHow = Array.isArray(specsObj.how) ? specsObj.how.slice() : []
        while (currentHow.length < 3) currentHow.push({ title: '', body: '' })
        const nextHow = currentHow.slice(0, 3).map((item, idx) =>
          idx === index ? { ...item, [field]: value } : { title: item?.title ?? '', body: item?.body ?? '' },
        )
        return {
          ...p,
          specs_text: JSON.stringify({ ...specsObj, how: nextHow }, null, 2),
        }
      })
    },
    [product, updateProduct],
  )

  const benefitBullets = useMemo(() => {
    const raw = (parsedSpecs as any).reasons
    const arr = Array.isArray(raw) ? raw : []
    const normalized = arr.map((item: any) => ({
      title: typeof item?.title === 'string' ? item.title : '',
      body: typeof item?.desc === 'string' ? item.desc : item?.body ?? '',
    }))
    while (normalized.length < BENEFIT_COUNT) normalized.push({ title: '', body: '' })
    return normalized.slice(0, BENEFIT_COUNT)
  }, [parsedSpecs])

  const updateBenefitBullet = useCallback(
    (index: number, field: 'title' | 'body', value: string) => {
      if (!product) return
      updateProduct((p) => {
        let specsObj: Record<string, any> = {}
        try {
          const parsed = JSON.parse(p.specs_text)
          if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) specsObj = parsed
        } catch {
          specsObj = {}
        }
        const current = Array.isArray(specsObj.reasons) ? specsObj.reasons.slice() : []
        while (current.length < BENEFIT_COUNT) current.push({ title: '', desc: '' })
        const next = current.slice(0, BENEFIT_COUNT).map((item, idx) =>
          idx === index ? { ...item, [field === 'body' ? 'desc' : field]: value } : { title: item?.title ?? '', desc: item?.desc ?? '' },
        )
        return { ...p, specs_text: JSON.stringify({ ...specsObj, reasons: next }, null, 2) }
      })
    },
    [product, updateProduct],
  )

  return {
    parsedSpecs,
    careAndMaterials,
    careBullets,
    updateCareBullet,
    featureCalloutsHeading,
    updateFeatureHeading,
    featurePills,
    updateFeaturePill,
    howBullets,
    updateHowBullet,
    benefitBullets,
    updateBenefitBullet,
  }
}

export default useProductSpecs
