// Prototype-only UI component (not imported). For reference when wiring into app.
import React from 'react'

type Props = {
  lastUpdated?: string
  onGoToCart: () => void
  onCheckout: () => void
  onDismiss: () => void
  adjustments?: { variantId: string; reason: string }[]
}

export const RestoreBanner: React.FC<Props> = ({ lastUpdated, onGoToCart, onCheckout, onDismiss, adjustments = [] }) => {
  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 12, background: '#fff7ed', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontWeight: 600, color: '#7c2d12' }}>Cart restored{lastUpdated ? ` · ${lastUpdated}` : ''}</div>
      {adjustments.length > 0 && (
        <div style={{ color: '#7c2d12', fontSize: 14 }}>
          We adjusted a few items ({adjustments.length}). Review before checkout.
        </div>
      )}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button onClick={onGoToCart} style={btn('outline')}>View cart</button>
        <button onClick={onCheckout} style={btn('solid')}>Go to checkout</button>
        <button onClick={onDismiss} style={btn('ghost')}>Dismiss</button>
      </div>
    </div>
  )
}

function btn(kind: 'solid' | 'outline' | 'ghost') {
  if (kind === 'solid') return { background: '#111', color: '#fff', padding: '10px 14px', borderRadius: 10, border: '1px solid #111' }
  if (kind === 'outline') return { background: '#fff', color: '#111', padding: '10px 14px', borderRadius: 10, border: '1px solid #111' }
  return { background: 'transparent', color: '#6b7280', padding: '10px 14px', borderRadius: 10, border: '1px solid transparent' }
}
