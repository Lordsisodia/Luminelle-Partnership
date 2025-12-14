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
      '@creators': path.resolve(__dirname, 'src/domains/creators'),
      '@brand': path.resolve(__dirname, 'src/domains/brand'),
      '@cart': path.resolve(__dirname, 'src/domains/cart'),
      '@checkout': path.resolve(__dirname, 'src/domains/checkout'),
      '@products': path.resolve(__dirname, 'src/domains/products'),
      '@shared': path.resolve(__dirname, 'src/domains/shared'),
      '@blog': path.resolve(__dirname, 'src/domains/blog'),
      '@admin': path.resolve(__dirname, 'src/domains/admin'),
      '@auth': path.resolve(__dirname, 'src/domains/auth'),
      '@account': path.resolve(__dirname, 'src/domains/account'),
      '@rewards': path.resolve(__dirname, 'src/domains/rewards'),
      '@content': path.resolve(__dirname, 'src/content'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      // Force a single React copy when consuming local builds (e.g., @ui-lib dist)
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      'react/jsx-runtime': path.resolve(__dirname, 'node_modules/react/jsx-runtime'),
    },
    // Avoid duplicate React copies when consuming local packages (e.g., @ui-lib dist)
    dedupe: ['react', 'react-dom'],
  },
  build: {
    chunkSizeWarningLimit: 900,
  },
  server: {
    port: 5174,
    host: true,
    strictPort: true,
    hmr: {
      port: 5174,
      host: 'localhost',
      clientPort: 5174,
    },
    allowedHosts: ['choir-holly-assist-cases.trycloudflare.com', 'localhost', '127.0.0.1'],
  },
})
