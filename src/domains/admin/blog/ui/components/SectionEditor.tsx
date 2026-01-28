/**
 * Improved Section Editor Component
 *
 * Features:
 * - Collapsible sections
 * - Drag-and-drop reordering
 * - Inline paragraph editing
 * - Rich text toolbar
 * - Live preview
 */

import { useState } from 'react'
import { GripVertical, ChevronDown, ChevronUp, Bold, Italic, Link as LinkIcon, Image as ImageIcon, Plus, Trash2 } from 'lucide-react'
import clsx from 'clsx'

interface Paragraph {
  id: string
  text: string
  type: 'text' | 'bullet' | 'numbered'
}

interface Section {
  id: string
  heading: string
  paragraphs: Paragraph[]
  imageUrl?: string
  imageCaption?: string
  expanded?: boolean
}

interface SectionEditorProps {
  sections: Section[]
  onChange: (sections: Section[]) => void
}

export function SectionEditor({ sections, onChange }: SectionEditorProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const updateSection = (index: number, updates: Partial<Section>) => {
    const newSections = [...sections]
    newSections[index] = { ...newSections[index], ...updates }
    onChange(newSections)
  }

  const updateParagraph = (sectionIndex: number, paragraphId: string, updates: Partial<Paragraph>) => {
    const newSections = [...sections]
    const section = { ...newSections[sectionIndex] }
    section.paragraphs = section.paragraphs.map(p =>
      p.id === paragraphId ? { ...p, ...updates } : p
    )
    newSections[sectionIndex] = section
    onChange(newSections)
  }

  const addParagraph = (sectionIndex: number) => {
    const newSections = [...sections]
    const section = { ...newSections[sectionIndex] }
    section.paragraphs = [
      ...section.paragraphs,
      { id: `p-${Date.now()}`, text: '', type: 'text' }
    ]
    newSections[sectionIndex] = section
    onChange(newSections)
  }

  const removeParagraph = (sectionIndex: number, paragraphId: string) => {
    const newSections = [...sections]
    const section = { ...newSections[sectionIndex] }
    section.paragraphs = section.paragraphs.filter(p => p.id !== paragraphId)
    newSections[sectionIndex] = section
    onChange(newSections)
  }

  const addSection = () => {
    onChange([
      ...sections,
      {
        id: `s-${Date.now()}`,
        heading: '',
        paragraphs: [{ id: `p-${Date.now()}`, text: '', type: 'text' }],
        expanded: true
      }
    ])
  }

  const removeSection = (index: number) => {
    onChange(sections.filter((_, i) => i !== index))
  }

  const toggleExpanded = (index: number) => {
    const newSections = [...sections]
    newSections[index] = { ...newSections[index], expanded: !newSections[index].expanded }
    onChange(newSections)
  }

  const moveSection = (fromIndex: number, toIndex: number) => {
    const newSections = [...sections]
    const [removed] = newSections.splice(fromIndex, 1)
    newSections.splice(toIndex, 0, removed)
    onChange(newSections)
  }

  const insertFormatting = (sectionIndex: number, paragraphId: string, format: 'bold' | 'italic' | 'link') => {
    const section = sections[sectionIndex]
    const paragraph = section.paragraphs.find(p => p.id === paragraphId)
    if (!paragraph) return

    let insertion = ''
    switch (format) {
      case 'bold':
        insertion = '**text**'
        break
      case 'italic':
        insertion = '*text*'
        break
      case 'link':
        insertion = '[text](url)'
        break
    }

    updateParagraph(sectionIndex, paragraphId, {
      text: paragraph.text + insertion
    })
  }

  return (
    <div className="space-y-4">
      {sections.map((section, sectionIndex) => (
        <div
          key={section.id}
          className={clsx(
            'rounded-xl border transition-all',
            section.expanded
              ? 'border-semantic-legacy-brand-blush/60 bg-white shadow-sm'
              : 'border-semantic-legacy-brand-blush/30 bg-semantic-legacy-brand-blush/20'
          )}
        >
          {/* Section Header - Always Visible */}
          <div className="flex items-center gap-2 border-b border-semantic-legacy-brand-blush/30 px-4 py-3">
            <button
              className="cursor-grab text-semantic-text-primary/40 hover:text-semantic-text-primary/60"
              draggable
              onDragStart={() => setDraggedIndex(sectionIndex)}
              onDragOver={(e) => {
                e.preventDefault()
                if (draggedIndex !== null && draggedIndex !== sectionIndex) {
                  moveSection(draggedIndex, sectionIndex)
                  setDraggedIndex(sectionIndex)
                }
              }}
              onDragEnd={() => setDraggedIndex(null)}
            >
              <GripVertical className="h-4 w-4" />
            </button>

            <input
              type="text"
              value={section.heading}
              onChange={(e) => updateSection(sectionIndex, { heading: e.target.value })}
              placeholder="Section heading"
              className={clsx(
                'flex-1 bg-transparent text-sm font-semibold outline-none placeholder:text-semantic-text-primary/40',
                !section.expanded && 'text-semantic-text-primary/70'
              )}
            />

            <button
              onClick={() => toggleExpanded(sectionIndex)}
              className="rounded-full p-1 text-semantic-text-primary/50 hover:bg-semantic-legacy-brand-blush/20"
            >
              {section.expanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>

            <button
              onClick={() => removeSection(sectionIndex)}
              className="rounded-full p-1 text-semantic-text-primary/40 hover:bg-red-50 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          {/* Section Content - Expandable */}
          {section.expanded && (
            <div className="space-y-3 p-4">
              {/* Paragraphs */}
              <div className="space-y-2">
                {section.paragraphs.map((paragraph, pIndex) => (
                  <div
                    key={paragraph.id}
                    className="group rounded-lg border border-semantic-legacy-brand-blush/30 bg-semantic-legacy-brand-blush/10 p-3"
                  >
                    {/* Paragraph Toolbar */}
                    <div className="mb-2 flex flex-wrap items-center gap-1">
                      <button
                        onClick={() => insertFormatting(sectionIndex, paragraph.id, 'bold')}
                        className="rounded px-2 py-1 text-xs font-bold text-semantic-text-primary/60 hover:bg-semantic-legacy-brand-blush/20"
                        title="Bold"
                      >
                        <Bold className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => insertFormatting(sectionIndex, paragraph.id, 'italic')}
                        className="rounded px-2 py-1 text-xs italic text-semantic-text-primary/60 hover:bg-semantic-legacy-brand-blush/20"
                        title="Italic"
                      >
                        <Italic className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => insertFormatting(sectionIndex, paragraph.id, 'link')}
                        className="rounded px-2 py-1 text-xs text-semantic-text-primary/60 hover:bg-semantic-legacy-brand-blush/20"
                        title="Link"
                      >
                        <LinkIcon className="h-3 w-3" />
                      </button>

                      <div className="ml-auto flex items-center gap-1">
                        <select
                          value={paragraph.type}
                          onChange={(e) => updateParagraph(sectionIndex, paragraph.id, { type: e.target.value as Paragraph['type'] })}
                          className="rounded border border-semantic-legacy-brand-blush/30 bg-white px-2 py-1 text-xs text-semantic-text-primary/70"
                        >
                          <option value="text">Paragraph</option>
                          <option value="bullet">Bullet List</option>
                          <option value="numbered">Numbered List</option>
                        </select>
                        <button
                          onClick={() => removeParagraph(sectionIndex, paragraph.id)}
                          className="rounded p-1 text-semantic-text-primary/40 hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    {/* Paragraph Textarea */}
                    <textarea
                      value={paragraph.text}
                      onChange={(e) => updateParagraph(sectionIndex, paragraph.id, { text: e.target.value })}
                      placeholder={
                        paragraph.type === 'text'
                          ? 'Write your paragraph here... Use **bold** or *italic* for formatting'
                          : paragraph.type === 'bullet'
                          ? 'Enter bullet points (one per line)'
                          : 'Enter numbered items (one per line)'
                      }
                      rows={paragraph.type === 'text' ? 3 : 4}
                      className="w-full rounded-lg border border-semantic-legacy-brand-blush/30 bg-white px-3 py-2 text-sm outline-none focus:border-semantic-legacy-brand-cocoa/50 focus:ring-1 focus:ring-semantic-legacy-brand-cocoa/30"
                    />
                  </div>
                ))}

                {/* Add Paragraph Button */}
                <button
                  onClick={() => addParagraph(sectionIndex)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-semantic-legacy-brand-blush/40 py-2 text-sm text-semantic-text-primary/60 hover:border-semantic-legacy-brand-cocoa/40 hover:bg-semantic-legacy-brand-cocoa/5 hover:text-semantic-legacy-brand-cocoa"
                >
                  <Plus className="h-4 w-4" />
                  Add paragraph
                </button>
              </div>

              {/* Image Option */}
              <div className="rounded-lg border border-semantic-legacy-brand-blush/20 bg-semantic-legacy-brand-blush/5 p-3">
                <label className="flex items-center gap-2 text-sm text-semantic-text-primary/70">
                  <ImageIcon className="h-4 w-4" />
                  <span>Section image (optional)</span>
                </label>
                <div className="mt-2 grid gap-2 md:grid-cols-2">
                  <input
                    type="text"
                    value={section.imageUrl || ''}
                    onChange={(e) => updateSection(sectionIndex, { imageUrl: e.target.value })}
                    placeholder="Image URL"
                    className="rounded-lg border border-semantic-legacy-brand-blush/30 bg-white px-3 py-2 text-sm outline-none focus:border-semantic-legacy-brand-cocoa/50"
                  />
                  <input
                    type="text"
                    value={section.imageCaption || ''}
                    onChange={(e) => updateSection(sectionIndex, { imageCaption: e.target.value })}
                    placeholder="Image caption"
                    className="rounded-lg border border-semantic-legacy-brand-blush/30 bg-white px-3 py-2 text-sm outline-none focus:border-semantic-legacy-brand-cocoa/50"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Add Section Button */}
      <button
        onClick={addSection}
        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-semantic-legacy-brand-blush/40 py-4 text-sm font-semibold text-semantic-text-primary/60 hover:border-semantic-legacy-brand-cocoa/40 hover:bg-semantic-legacy-brand-cocoa/5 hover:text-semantic-legacy-brand-cocoa"
      >
        <Plus className="h-5 w-5" />
        Add section
      </button>

      {/* Formatting Help */}
      <div className="rounded-lg border border-semantic-legacy-brand-blush/20 bg-semantic-legacy-brand-blush/5 p-3 text-xs text-semantic-text-primary/60">
        <p className="font-semibold text-semantic-text-primary/70">Formatting tips:</p>
        <ul className="mt-1 space-y-1 pl-4">
          <li><code>**bold**</code> for <strong>bold text</strong></li>
          <li><code>*italic*</code> for <em>italic text</em></li>
          <li><code>[text](url)</code> for links</li>
          <li><code>`code`</code> for inline code</li>
        </ul>
      </div>
    </div>
  )
}
