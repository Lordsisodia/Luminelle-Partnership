type AvatarProps = {
  name: string
  size?: number
}

function hash(str: string) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i)
  return Math.abs(h)
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/)
  return (parts[0]?.[0] || '').concat(parts[1]?.[0] || '').toUpperCase() || 'U'
}

export const Avatar = ({ name, size = 40 }: AvatarProps) => {
  const h = hash(name)
  const hue = h % 360
  const hue2 = (hue + 40) % 360
  const bg = `linear-gradient(135deg, hsl(${hue} 70% 85%), hsl(${hue2} 70% 90%))`
  const style: React.CSSProperties = {
    width: size,
    height: size,
    backgroundImage: bg,
  }
  return (
    <div
      className="flex items-center justify-center rounded-full text-sm font-semibold text-semantic-text-primary"
      aria-label={`${name} avatar`}
      style={style}
    >
      {initials(name)}
    </div>
  )
}
