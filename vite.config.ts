import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@ui': path.resolve(__dirname, 'src/ui'),
      '@ui-lib': path.resolve(__dirname, '../components-library/packages/ui/dist'),
      '@landing': path.resolve(__dirname, 'src/domains/landing'),
      '@cart': path.resolve(__dirname, 'src/domains/cart'),
      '@checkout': path.resolve(__dirname, 'src/domains/checkout'),
      '@products': path.resolve(__dirname, 'src/domains/products'),
      '@shared': path.resolve(__dirname, 'src/domains/shared'),
      '@blog': path.resolve(__dirname, 'src/domains/blog'),
      '@admin': path.resolve(__dirname, 'src/domains/admin'),
      '@auth': path.resolve(__dirname, 'src/domains/auth'),
      '@account': path.resolve(__dirname, 'src/domains/account'),
      '@content': path.resolve(__dirname, 'src/content'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@lib': path.resolve(__dirname, 'src/lib'),
    },
  },
  build: {
    chunkSizeWarningLimit: 900,
  },
  server: {
    port: 5173,
    host: true,
    allowedHosts: ['choir-holly-assist-cases.trycloudflare.com', 'localhost'],
  },
})
