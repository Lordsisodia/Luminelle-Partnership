// Ready-to-integrate Tailwind plugin. Expects generated colors map at src/theme/tailwind-colors.js
// Usage (example):
// const tokens = require('./src/theme/tailwind-colors')
// plugins: [require('./path/to/tailwind-plugin')(tokens.semanticColors)]

const plugin = require('tailwindcss/plugin')

module.exports = (semanticColors) =>
  plugin(function ({ addBase, addUtilities }) {
    // Base: expose CSS vars (assumes generated.css already imported in your CSS entry)
    addBase({})

    // Map semantic colors to utilities for convenience
    const util = {
      '.text-primary': { color: 'var(--text-primary)' },
      '.text-muted': { color: 'var(--text-muted)' },
      '.text-inverse': { color: 'var(--text-inverse)' },
      '.bg-canvas': { backgroundColor: 'var(--bg-canvas)' },
      '.bg-surface': { backgroundColor: 'var(--bg-surface)' },
      '.bg-subtle': { backgroundColor: 'var(--bg-subtle)' },
      '.bg-hero-gradient': { backgroundImage: 'var(--bg-heroGradient)' },
      '.border-subtle': { borderColor: 'var(--border-subtle)' },
      '.bg-cta': { backgroundColor: 'var(--accent-cta)' },
      '.text-cta': { color: 'var(--accent-ctaText)' },
      '.bg-badge': { backgroundColor: 'var(--accent-badge)' },
      '.text-success': { color: 'var(--state-success)' },
      '.text-warning': { color: 'var(--state-warning)' },
      '.text-danger': { color: 'var(--state-danger)' },
    }

    // Also add CSS variable aliases from semantic map (dot paths -> vars)
    const flatten = (obj, prefix = '') =>
      Object.entries(obj).reduce((acc, [k, v]) => {
        const key = prefix ? `${prefix}-${k}` : k
        if (v && typeof v === 'object') Object.assign(acc, flatten(v, key))
        else acc[`--${key}`] = v
        return acc
      }, {})

    addUtilities(util, { variants: ['responsive', 'hover'] })
    addBase({ ':root': flatten(semanticColors) })
  })
