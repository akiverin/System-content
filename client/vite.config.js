import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:5050/",
      // "/api": {
      //   target: "http://localhost:5050/",
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, ""),
      // },
    },
  },
  resolve: {
    extensions: [".jsx", ".js"],
    alias: {
      "@": resolve(__dirname, "src"),
      "@assets": resolve(__dirname, "src/assets"),
      "@styles": resolve(__dirname, "src/styles"),
      "@components": resolve(__dirname, "src/components"),
      "@pages": resolve(__dirname, "src/pages"),
      "@redux": resolve(__dirname, "src/redux"),
    },
  },
});
