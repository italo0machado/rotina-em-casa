import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@blossom-carousel/react': path.resolve(__dirname, 'node_modules/@blossom-carousel/react/dist/blossom-carousel-react.js')
    }
  },
  optimizeDeps: {
    include: ['@blossom-carousel/react', '@blossom-carousel/core']
  }
})