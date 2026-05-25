import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteTsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    host: "localhost",
    port: 5174,
  },
  plugins: [
    tailwindcss(),
    tanstackStart(),
    react(),
    viteTsconfigPaths(),
  ],
});

