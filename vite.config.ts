import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { globSync } from "glob";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({
      exclude: ["**/*.stories.tsx", "**/*.stories.ts"],
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: "./src/main.ts",
      formats: ["es"],
      name: "index",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      input: Object.fromEntries(
        globSync([
          "src/components/**/index.tsx",
          "src/hooks/**/index.ts",
          "src/main.ts",
        ]).map((file) => {
          const entryName = path.relative(
            "src",
            file.slice(0, file.length - path.extname(file).length)
          );
          const entryUrl = fileURLToPath(new URL(file, import.meta.url));
          return [entryName, entryUrl];
        })
      ),
      output: {
        entryFileNames: "[name].js",
        assetFileNames: "assets/[name][extname]",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    copyPublicDir: false,
  },
});
