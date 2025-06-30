import preact from '@astrojs/preact'
import sitemap from '@astrojs/sitemap'
import playformCompress from '@playform/compress'
import tailwindcss from '@tailwindcss/vite'
import robotsTxt from 'astro-robots-txt'
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: process.env.CI
    ? 'https://www.adrian-alvarez.dev'
    : 'http://localhost:4321',

  integrations: [
    sitemap(),
    robotsTxt({
      sitemap: 'https://www.adrian-alvarez.dev/sitemap-0.xml',
      host: 'adrian-alvarez.dev'
    }),
    playformCompress(),
    preact()
  ],

  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  },

  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: true
    }
  }
})
