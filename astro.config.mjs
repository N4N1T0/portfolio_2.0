import preact from '@astrojs/preact'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import robotsTxt from 'astro-robots-txt'
import { defineConfig } from 'astro/config'

import vercel from '@astrojs/vercel'

const SITE_URL = 'https://www.adrian-alvarez.com'

export default defineConfig({
  site: SITE_URL,

  trailingSlash: 'always',

  integrations: [
    sitemap({
      filter: (page) =>
        page !== `${SITE_URL}/` &&
        !page.includes('/404') &&
        !page.includes('/rss.xml'),
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es',
          en: 'en'
        }
      }
    }),
    robotsTxt({
      sitemap: `${SITE_URL}/sitemap-index.xml`,
      host: new URL(SITE_URL).host
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
