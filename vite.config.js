import { resolve, parse } from "path";

import { defineConfig } from "vite";
import vitePluginPugStatic from "@macropygia/vite-plugin-pug-static";
import globule from "globule";
import browserslistToEsbuild from "browserslist-to-esbuild";

import postcss from "postcss";
import postcssLogical from "postcss-logical";
import autoprefixer from "autoprefixer";

import viteCompression from "vite-plugin-compression";

const inputs = {};
const documents = globule.find([`./app/**/*.pug`], {
  ignore: [`./app/**/_*.pug`],
});
documents.forEach((document) => {
  const fileName = document.replace(`./app/`, "");
  const key = parse(document).name;
  inputs[key] = resolve(__dirname, "app", fileName);
});

export default defineConfig({
  root: "app",
  css: {
    devSourcemap: true, // this one
    postcss: {
      plugins: [postcssLogical(["padding-inline", "margin-inline", "inset"]), autoprefixer()],
    },
  },
  server: {
    host: true,
    port: 3000,
  },
  esbuild: {
    supported: {
      "top-level-await": true,
    },
  },
  build: {
    // sourcemap: true,
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    minify: false,
    target: browserslistToEsbuild(),
    rollupOptions: {
      input: { ...inputs },
      output: {
        entryFileNames: `assets/js/[name].js`,
        chunkFileNames: `assets/js/[name].js`,
        assetFileNames: (assetInfo) => {
          if (/\.(gif|jpeg|jpg|png|svg|webp)$/.test(assetInfo.name)) {
            return "assets/images/[name].[ext]";
          }
          if (/\.css$/.test(assetInfo.name)) {
            return "assets/css/[name].[ext]";
          }
          return "assets/[name].[ext]";
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "app"),
      "@:js": resolve(__dirname, "app/assets/js"),
      "@:sass": resolve(__dirname, "app/assets/sass"),
    },
  },
  plugins: [
    vitePluginPugStatic(() => {
      const options = {
        compileDebug: true,
        basedir: "app",
      };
      return {
        buildOptions: options,
        serveOptions: options,
      };
    }),
    viteCompression({
      algorithm: "brotliCompress",
      filter: (file) => ["js", "css"].some((ext) => file.endsWith(ext)),
    }),
  ],
});
