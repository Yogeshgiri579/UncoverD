import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    host: "localhost",
    port: 5174,
  },
  plugins: [
    tailwindcss(),
    react(),
    viteTsconfigPaths(),
  ],
});
