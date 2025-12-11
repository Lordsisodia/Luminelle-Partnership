// Style Dictionary config (not wired). Mirrors our desired outputs: CSS vars + Tailwind map.
const path = require('path')

module.exports = {
  source: ['docs/future features/design-token-engine/code/tokens.default.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'docs/future features/design-token-engine/code/generated/',
      files: [
        {
          destination: 'generated.css',
          format: 'css/variables',
          options: { selector: ':root' },
        },
      ],
    },
    tailwind: {
      transforms: ['attribute/cti', 'name/cti/kebab', 'color/css'],
      buildPath: 'docs/future features/design-token-engine/code/generated/',
      files: [
        {
          destination: 'tailwind-colors.js',
          format: 'javascript/module',
          filter: (token) => token.path[0] === 'semantic',
          options: {
            outputReferences: true,
            showFileHeader: false,
            moduleName: 'semanticColors',
          },
        },
      ],
    },
    json: {
      transformGroup: 'js',
      buildPath: 'docs/future features/design-token-engine/code/generated/',
      files: [
        {
          destination: 'tokens.resolved.json',
          format: 'json',
        },
      ],
    },
  },
}
