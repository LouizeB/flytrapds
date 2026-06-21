import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Static landing page for the Flytrap design system.
// Deploys to Vercel as a static build (outDir: dist).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
