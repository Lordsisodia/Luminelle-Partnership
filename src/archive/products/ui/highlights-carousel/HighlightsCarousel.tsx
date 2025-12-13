import React from 'react'

type Item = { src: string; title?: string; badge?: string; description?: string }

const HighlightsCarousel: React.FC<{ items?: Item[]; count?: number; active?: number; onSelect?: (i: number) => void }> = ({ items = [], count = 0, active = 0, onSelect = () => {} }) => {
  void items; void count; void active; void onSelect
  return null
}

export { HighlightsCarousel }
export default HighlightsCarousel
