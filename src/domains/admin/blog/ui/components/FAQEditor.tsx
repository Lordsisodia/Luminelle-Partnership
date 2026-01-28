/**
 * Improved FAQ Editor Component
 *
 * Features:
 * - Collapsible FAQ items
 * - Live character counts
 * - Quick templates
 * - Drag-and-drop reordering
 */

import { useState } from 'react'
import { GripVertical, ChevronDown, ChevronUp, Plus, Trash2, Lightbulb } from 'lucide-react'
import clsx from 'clsx'

interface FAQ {
  id: string
  question: string
  answer: string
  expanded?: boolean
}

interface FAQEditorProps {
  faqs: FAQ[]
  onChange: (faqs: FAQ[]) => void
}

const FAQ_TEMPLATES = [
  {
    question: 'How do I keep hair frizz-free in the shower?',
    answer: 'Use a satin-lined waterproof cap, angle spray away from your hair, finish with cool water, and remove front-to-back after blotting excess moisture.'
  },
  {
    question: 'How often should I wash my shower cap?',
    answer: 'Rinse after each use and hand wash weekly with mild soap. Air dry completely before storing to prevent odor and maintain the waterproof seal.'
  },
  {
    question: 'Will this work for my hair type?',
    answer: 'Yes! Our shower caps are designed for all hair types including silk presses, curly hair, braids, locs, and protective styles.'
  }
]

export function FAQEditor({ faqs, onChange }: FAQEditorProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [showTemplates, setShowTemplates] = useState(false)

  const updateFAQ = (index: number, field: 'question' | 'answer', value: string) => {
    const newFAQs = [...faqs]
    newFAQs[index] = { ...newFAQs[index], [field]: value }
    onChange(newFAQs)
  }

  const addFAQ = (template?: { question: string; answer: string }) => {
    onChange([
      ...faqs,
      {
        id: `faq-${Date.now()}`,
        question: template?.question || '',
        answer: template?.answer || '',
        expanded: true
      }
    ])
    setShowTemplates(false)
  }

  const removeFAQ = (index: number) => {
    onChange(faqs.filter((_, i) => i !== index))
  }

  const toggleExpanded = (index: number) => {
    const newFAQs = [...faqs]
    newFAQs[index] = { ...newFAQs[index], expanded: !newFAQs[index].expanded }
    onChange(newFAQs)
  }

  const moveFAQ = (fromIndex: number, toIndex: number) => {
    const newFAQs = [...faqs]
    const [removed] = newFAQs.splice(fromIndex, 1)
    newFAQs.splice(toIndex, 0, removed)
    onChange(newFAQs)
  }

  return (
    <div className="space-y-3">
      {/* FAQ Items */}
      {faqs.map((faq, index) => (
        <div
          key={faq.id}
          className={clsx(
            'rounded-xl border transition-all',
            faq.expanded
              ? 'border-semantic-legacy-brand-blush/60 bg-white shadow-sm'
              : 'border-semantic-legacy-brand-blush/30 bg-semantic-legacy-brand-blush/20'
          )}
        >
          {/* FAQ Header */}
          <div
            className="flex items-start gap-2 border-b border-semantic-legacy-brand-blush/30 px-4 py-3 cursor-pointer"
            onClick={() => toggleExpanded(index)}
          >
            <button
              className="cursor-grab text-semantic-text-primary/40 hover:text-semantic-text-primary/60 mt-0.5"
              draggable
              onDragStart={(e) => {
                e.stopPropagation()
                setDraggedIndex(index)
              }}
              onDragOver={(e) => {
                e.preventDefault()
                e.stopPropagation()
                if (draggedIndex !== null && draggedIndex !== index) {
                  moveFAQ(draggedIndex, index)
                  setDraggedIndex(index)
                }
              }}
              onDragEnd={(e) => {
                e.stopPropagation()
                setDraggedIndex(null)
              }}
            >
              <GripVertical className="h-4 w-4" />
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-semantic-text-primary/60">
                  Q{index + 1}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFAQ(index)
                  }}
                  className="rounded-full p-1 text-semantic-text-primary/40 hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
              <p className="mt-1 text-sm text-semantic-text-primary font-medium truncate">
                {faq.question || <span className="text-semantic-text-primary/40 italic">No question yet...</span>}
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleExpanded(index)
              }}
              className="rounded-full p-1 text-semantic-text-primary/50 hover:bg-semantic-legacy-brand-blush/20"
            >
              {faq.expanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* FAQ Content - Expandable */}
          {faq.expanded && (
            <div className="space-y-3 p-4">
              {/* Question Input */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-[0.18em] text-semantic-text-primary/60">
                    Question
                  </label>
                  <span className={clsx(
                    'text-xs',
                    faq.question.length > 100 ? 'text-amber-500' : 'text-semantic-text-primary/40'
                  )}>
                    {faq.question.length}/100
                  </span>
                </div>
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                  placeholder="Ask a question your readers might have..."
                  className="w-full rounded-lg border border-semantic-legacy-brand-blush/30 bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-semantic-legacy-brand-cocoa/50 focus:ring-1 focus:ring-semantic-legacy-brand-cocoa/30"
                  maxLength={150}
                />
              </div>

              {/* Answer Input */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-[0.18em] text-semantic-text-primary/60">
                    Answer
                  </label>
                  <span className={clsx(
                    'text-xs',
                    faq.answer.length > 300 ? 'text-amber-500' : 'text-semantic-text-primary/40'
                  )}>
                    {faq.answer.length}/300
                  </span>
                </div>
                <textarea
                  value={faq.answer}
                  onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                  placeholder="Provide a clear, concise answer..."
                  rows={4}
                  className="w-full rounded-lg border border-semantic-legacy-brand-blush/30 bg-white px-3 py-2 text-sm outline-none focus:border-semantic-legacy-brand-cocoa/50 focus:ring-1 focus:ring-semantic-legacy-brand-cocoa/30"
                  maxLength={500}
                />
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Add FAQ Section */}
      <div className="relative">
        <button
          onClick={() => setShowTemplates(!showTemplates)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-semantic-legacy-brand-blush/40 py-3 text-sm font-semibold text-semantic-text-primary/60 hover:border-semantic-legacy-brand-cocoa/40 hover:bg-semantic-legacy-brand-cocoa/5 hover:text-semantic-legacy-brand-cocoa"
        >
          <Plus className="h-4 w-4" />
          Add FAQ
        </button>

        {/* FAQ Templates Dropdown */}
        {showTemplates && (
          <div className="absolute z-10 mt-2 w-full rounded-xl border border-semantic-legacy-brand-blush/60 bg-white shadow-lg">
            <div className="flex items-center gap-2 border-b border-semantic-legacy-brand-blush/20 px-4 py-2">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-semibold text-semantic-text-primary">Quick Templates</span>
            </div>
            <div className="max-h-64 overflow-y-auto p-2">
              <button
                onClick={() => addFAQ()}
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-semantic-text-primary/70 hover:bg-semantic-legacy-brand-blush/10"
              >
                + Blank FAQ
              </button>
              {FAQ_TEMPLATES.map((template, tIndex) => (
                <button
                  key={tIndex}
                  onClick={() => addFAQ(template)}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-semantic-text-primary/70 hover:bg-semantic-legacy-brand-blush/10"
                >
                  {template.question}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SEO Tips */}
      {faqs.length > 0 && (
        <div className="rounded-lg border border-semantic-legacy-brand-blush/20 bg-semantic-legacy-brand-blush/5 p-3">
          <p className="text-xs font-semibold text-semantic-text-primary/70">FAQ SEO Tips:</p>
          <ul className="mt-1 space-y-1 text-xs text-semantic-text-primary/60">
            <li>• Keep questions under 100 characters for optimal display</li>
            <li>• Use natural language that matches how people search</li>
            <li>• Include relevant keywords in questions and answers</li>
            <li>• 3-5 FAQs is optimal for most blog posts</li>
          </ul>
        </div>
      )}
    </div>
  )
}
