// Prototype-only UI component (not imported). For reference when wiring into app.
import React, { useState } from 'react'

type Props = {
  onSubmit: (email: string, consent: boolean) => void
  onClose: () => void
  defaultConsent?: boolean
}

export const ExitIntentModal: React.FC<Props> = ({ onSubmit, onClose, defaultConsent = true }) => {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(defaultConsent)
  const disableSubmit = !email || !consent

  return (
    <div style={backdrop}>
      <div style={card}>
        <button aria-label="Close" onClick={onClose} style={closeBtn}>×</button>
        <h3 style={{ marginTop: 0 }}>Save your cart for later</h3>
        <p style={{ color: '#4b5563' }}>We’ll email you a link to pick up where you left off.</p>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />
        <label style={{ display: 'flex', gap: 8, alignItems: 'flex-start', color: '#4b5563', fontSize: 14 }}>
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
          <span>Remember my cart and email me recovery reminders. You can opt out anytime.</span>
        </label>
        <button disabled={disableSubmit} onClick={() => onSubmit(email, consent)} style={submit(disableSubmit)}>
          Send me the link
        </button>
      </div>
    </div>
  )
}

const backdrop: React.CSSProperties = {
  position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'grid', placeItems: 'center', padding: 16, zIndex: 50,
}

const card: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  maxWidth: 420,
  background: '#fff',
  borderRadius: 16,
  padding: 24,
  boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
}

const input: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 10,
  border: '1px solid #e5e7eb',
  marginTop: 8,
  marginBottom: 12,
  fontSize: 15,
}

const closeBtn: React.CSSProperties = {
  position: 'absolute', top: 10, right: 12, background: 'transparent', border: 'none', fontSize: 20, cursor: 'pointer',
}

function submit(disabled: boolean): React.CSSProperties {
  return {
    width: '100%',
    padding: '12px 14px',
    borderRadius: 12,
    border: '1px solid #111',
    background: disabled ? '#d1d5db' : '#111',
    color: disabled ? '#6b7280' : '#fff',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: 600,
  }
}
