import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  compilers: {
    css: (text: string) => [...text.matchAll(/(?<=@)import[^;]+/gu)].join('\n')
  },
  ignoreDependencies: ['@tailwindcss/typography', 'lefthook'],
  ignore: ['./src/components/ui/**'],
  treatConfigHintsAsErrors: true
}

export default config
