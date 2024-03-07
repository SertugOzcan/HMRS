import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  preview: {
    port: 9085,
    strictPort: true,
  },
  server: {
    host: true,
    strictPort: true,
    port: 9085,
  },
});
