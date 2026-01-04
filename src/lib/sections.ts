import { content } from '@platform/content'
import type { SectionsDTO } from '@platform/content/ports'

export type Sections = SectionsDTO

export const fetchSections = async (): Promise<Sections> => {
  return await content.sections.getLandingSections()
}
