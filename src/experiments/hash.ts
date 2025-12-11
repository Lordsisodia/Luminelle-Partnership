// Lightweight deterministic hash for bucketing (murmur-inspired, 32-bit)
export function hashString(input: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  // Force unsigned 32-bit
  return h >>> 0
}

export function pickVariant(key: string, variants: { variant: string; weight: number }[]) {
  const total = variants.reduce((acc, v) => acc + v.weight, 0)
  if (total <= 0) return variants[0]?.variant ?? 'control'
  const h = hashString(key) % total
  let sum = 0
  for (const v of variants) {
    sum += v.weight
    if (h < sum) return v.variant
  }
  return variants[variants.length - 1]?.variant ?? 'control'
}
