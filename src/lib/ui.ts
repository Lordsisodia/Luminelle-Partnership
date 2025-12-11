export const cn = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(' ')
export type VariantProps<T> = T extends (...args: any) => infer R ? R : never
export const buttonVariants = () => ''
