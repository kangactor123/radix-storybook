/// <reference types="vite/client" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";
import { fileURLToPath } from "url";
import { globSync } from "glob";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({ exclude: ["**/*.stories.tsx", "**/*.stories.ts"] }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      formats: ["es"],
      name: "index",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      input: Object.fromEntries(
        globSync([
          "src/components/**/index.tsx",
          "src/hooks/**/index.ts",
          "src/main.ts",
        ]).map((file) => {
          // This remove `src/` as well as the file extension from each
          // file, so e.g. src/nested/foo.js becomes nested/foo
          const entryName = path.relative(
            "src",
            file.slice(0, file.length - path.extname(file).length)
          );
          // This expands the relative paths to absolute paths, so e.g.
          // src/nested/foo becomes /project/src/nested/foo.js
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
          "react/jsx-runtime": "react/jsx-runtime",
        },
      },
    },
    copyPublicDir: false,
  },
});
