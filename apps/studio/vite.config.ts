import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@flytrap/ui/styles": new URL("../../packages/ui/src/styles/globals.css", import.meta.url).pathname,
      "@flytrap/ui": new URL("../../packages/ui/src/index.ts", import.meta.url).pathname,
    },
  },
  build: {
    chunkSizeWarningLimit: 650,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("/recharts/") || id.includes("/d3-")) return "charts";
        },
      },
    },
  },
});
