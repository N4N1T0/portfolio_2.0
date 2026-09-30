import tsParser from '@typescript-eslint/parser'
import eslintPluginAstro from 'eslint-plugin-astro'

export default [
  ...eslintPluginAstro.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: { parser: tsParser }
  },
  {
    // Starwind components export their tailwind-variants alongside the markup
    files: ['src/components/ui/**/*.astro'],
    rules: { 'astro/no-exports-from-components': 'off' }
  }
]
