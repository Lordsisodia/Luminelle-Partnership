import type { CSSProperties, ReactNode } from 'react'

type TabletMockupProps = {
  scale?: number
  bezel?: number
  radius?: number
  shadow?: boolean | string
  screenBg?: string
  showCameraDot?: boolean

  style?: CSSProperties
  className?: string
  frameStyle?: CSSProperties
  screenStyle?: CSSProperties
  children?: ReactNode
}

// “iPad-ish” viewport used by the admin tablet preview mode.
// Keep in sync with DEVICE_VIEWPORTS.tablet in IPhonePreviewCard.tsx.
const TABLET_SCREEN = {
  width: 820,
  height: 1180,
}

export function TabletMockup({
  scale = 0.42,
  bezel = 18,
  radius = 30,
  shadow = true,
  screenBg = '#fff',
  showCameraDot = true,
  style,
  className,
  frameStyle,
  screenStyle,
  children,
}: TabletMockupProps) {
  const outerWidth = TABLET_SCREEN.width + bezel * 2
  const outerHeight = TABLET_SCREEN.height + bezel * 2

  const wrapperStyle: CSSProperties = {
    boxSizing: 'border-box',
    display: 'inline-block',
    position: 'relative',
    width: outerWidth * scale,
    height: outerHeight * scale,
    ...style,
  }

  const scaledInnerStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
  }

  const outerShadow =
    typeof shadow === 'string'
      ? shadow
      : shadow
        ? '0 14px 34px rgba(0,0,0,0.26), 0 2px 6px rgba(0,0,0,0.18)'
        : 'none'

  const frameBoxStyle: CSSProperties = {
    width: outerWidth,
    height: outerHeight,
    borderRadius: radius + bezel,
    background: 'linear-gradient(135deg, #f2f2f2 0%, #d9d9d9 30%, #bdbdbd 100%)',
    padding: bezel,
    boxSizing: 'border-box',
    boxShadow: outerShadow,
    position: 'relative',
    overflow: 'hidden',
    ...frameStyle,
  }

  const screenBoxStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    borderRadius: radius,
    position: 'relative',
    overflow: 'hidden',
    background: screenBg,
    boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)',
    ...screenStyle,
  }

  return (
    <div className={className} style={wrapperStyle}>
      <div style={scaledInnerStyle}>
        <div style={frameBoxStyle} aria-label="Tablet mockup">
          {showCameraDot ? (
            <div
              aria-hidden
              style={{
                position: 'absolute',
                top: 8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 8,
                height: 8,
                borderRadius: 9999,
                background: '#151515',
                boxShadow: '0 0 0 2px rgba(255,255,255,0.15)',
                opacity: 0.55,
              }}
            />
          ) : null}
          <div style={screenBoxStyle}>
            <div style={{ position: 'absolute', inset: 0 }}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TabletMockup
