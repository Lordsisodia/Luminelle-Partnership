import React from 'react'

const BundleCards: React.FC<{ count?: number; active?: number; onSelect?: (i: number) => void }> = ({ count = 0, active = 0, onSelect = () => {} }) => {
  void count; void active; void onSelect
  return null
}

export { BundleCards }
export default BundleCards
