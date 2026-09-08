import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  compilers: {
    css: (text: string) => [...text.matchAll(/(?<=@)import[^;]+/gu)].join('\n')
  },
  treatConfigHintsAsErrors: true
}

export default config
