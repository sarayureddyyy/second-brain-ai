import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Root asset paths keep direct SPA routes such as /app/dashboard working
  // after the host rewrites them back to index.html.
  base: "/",
});
