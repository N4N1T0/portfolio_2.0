import tailwindcss from "@tailwindcss/vite";
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

import preact from '@astrojs/preact';

export default defineConfig({
	vite: {
    plugins: [tailwindcss()]
  },

  integrations: [preact()]
})