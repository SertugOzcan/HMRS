import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: 9085,
    strictPort: true,
  },
  server: {
    host: true,
    strictPort: true,
    port: 9085,
    origin: "http://0.0.0.0:9085",
  },
});
