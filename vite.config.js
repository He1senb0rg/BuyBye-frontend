import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, 'app'),
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        includePaths: ['node_modules']
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'app')
    }
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
})