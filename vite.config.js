import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  build: {
    outDir: 'dist',
  },
  alias: {
    '/@/components': path.resolve(__dirname, 'src/components'),
  },
})
