export const stripFrontmatter = (markdown: string) => {
  // Removes YAML frontmatter blocks like:
  // ---
  // key: value
  // ---
  //
  // from the beginning of a markdown file.
  return markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').trim()
}

