import React from 'react'

const StepsCarousel: React.FC<{ items?: any[]; count?: number; active?: number; onSelect?: (i: number) => void }> = ({ items = [], count = 0, active = 0, onSelect = () => {} }) => {
  void items; void count; void active; void onSelect
  return null
}

export { StepsCarousel }
export default StepsCarousel
