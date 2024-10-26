import { defineConfig } from "vite"

import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [],
  base: '/dean-home-page/',
  css: {
    postcss: {
      plugins: [
        autoprefixer({}) // add options if needed
      ],
    }
  }
})