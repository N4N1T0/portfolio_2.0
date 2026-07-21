import preact from '@astrojs/preact'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import robotsTxt from 'astro-robots-txt'
import { defineConfig } from 'astro/config'

import vercel from '@astrojs/vercel'

export default defineConfig({
  site: process.env.CI
    ? 'https://www.adrian-alvarez.com'
    : 'http://localhost:4321',

  integrations: [
    sitemap(),
    robotsTxt({
      sitemap: 'https://www.adrian-alvarez.com/sitemap-0.xml',
      host: 'adrian-alvarez.com'
    }),
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
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false
    }
  },

  adapter: vercel()
})
