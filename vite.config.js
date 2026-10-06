import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  plugins: [react(), {
    name: "local-billing-api",
    configureServer(server) {
      // Only server configuration reads these variables; secrets never enter the browser bundle.
      Object.assign(process.env, loadEnv(mode, process.cwd(), ""));
      server.middlewares.use("/api/billing", async (req, res) => {
        try {
          const { default: handler } = await import("./api/billing.js");
          await handler(req, res);
        } catch {
          res.statusCode = 503;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Billing is being set up. Please try again later." }));
        }
      });
    },
  }],
  // Root asset paths keep direct SPA routes such as /app/dashboard working
  // after the host rewrites them back to index.html.
  base: "/",
}));
