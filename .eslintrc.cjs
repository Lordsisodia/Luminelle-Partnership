module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.app.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignores: [
    'node_modules',
    'dist',
    'build',
    'coverage',
    '.siso-app-factory',
    'docs',
    'server',
    'components-library',
  ],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['@/state/*', '@/sections/*', '@/layouts/*', '@/components/*', '@/cart/*', '@/products/*', '@/shared/*', '@/shop/*'],
            message: 'Use domain or shared aliases (e.g., @shop/*, @account/*, @ui/*) instead of legacy paths.',
          },
        ],
      },
    ],
    'react/prop-types': 'off',
    'react-refresh/only-export-components': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-useless-escape': 'off',
    'no-empty': 'off',
  },
}
