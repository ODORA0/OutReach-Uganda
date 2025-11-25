import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        programs: resolve(__dirname, 'programs.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        getInvolved: resolve(__dirname, 'get-involved.html'),
        donate: resolve(__dirname, 'donate.html'),
        contact: resolve(__dirname, 'contact.html'),
        pitchDeck: resolve(__dirname, 'pitch-deck.html'),
      },
    },
  },
})
