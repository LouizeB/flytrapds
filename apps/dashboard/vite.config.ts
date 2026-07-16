import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@louizeb/flytrap-ui/styles": new URL("../../packages/ui/src/styles/globals.css", import.meta.url).pathname,
      "@louizeb/flytrap-ui": new URL("../../packages/ui/src/index.ts", import.meta.url).pathname,
    },
  },
});
