import js from '@eslint/js'
import ts from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import path from 'node:path'

const appRoot = process.cwd()
const domainRoot = path.join(appRoot, 'src', 'domains')
const platformRoot = path.join(domainRoot, 'platform')
const allowedCrossDomainPrefixes = ['@platform', '@ui-kit', '@client', '@admin', '@creator', '@blog', '@lib', '@utils', '@layouts', '@content', '@ui', '@/']

export default [
  {
    ignores: [
      'node_modules',
      'dist',
      'build',
      'coverage',
      '.siso-app-factory',
      'docs',
      'server',
      'components-library',
      'api',
    ],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        React: 'readonly',
        ScrollBehavior: 'readonly',
        ScrollLogicalPosition: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': ts,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...ts.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-useless-escape': 'off',
      'no-empty': 'off',
      'no-extra-boolean-cast': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react-refresh/only-export-components': 'off',
      // Enforce domain boundaries: no cross-domain imports except via platform/UI-kit/approved roots.
      'no-restricted-imports': [
        'error',
        {
          paths: [],
          patterns: [
            {
              group: ['@domains/*', '@/domains/*'],
              message: 'Use domain aliases (@client, @admin, @creator, @blog) or @platform; avoid cross-domain deep imports.',
            },
          ],
        },
      ],
    },
  },
]
