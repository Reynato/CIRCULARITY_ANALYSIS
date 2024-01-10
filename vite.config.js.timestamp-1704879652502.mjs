// vite.config.js
import { resolve, parse } from "path";
import { defineConfig } from "file:///Users/itoh/Desktop/CIRCULARITY_ANALYSIS/node_modules/vite/dist/node/index.js";
import vitePluginPugStatic from "file:///Users/itoh/Desktop/CIRCULARITY_ANALYSIS/node_modules/@macropygia/vite-plugin-pug-static/dist/index.js";
import globule from "file:///Users/itoh/Desktop/CIRCULARITY_ANALYSIS/node_modules/globule/lib/globule.js";
import browserslistToEsbuild from "file:///Users/itoh/Desktop/CIRCULARITY_ANALYSIS/node_modules/browserslist-to-esbuild/src/index.js";
import postcss from "file:///Users/itoh/Desktop/CIRCULARITY_ANALYSIS/node_modules/postcss/lib/postcss.mjs";
import postcssLogical from "file:///Users/itoh/Desktop/CIRCULARITY_ANALYSIS/node_modules/postcss-logical/dist/index.mjs";
import autoprefixer from "file:///Users/itoh/Desktop/CIRCULARITY_ANALYSIS/node_modules/autoprefixer/lib/autoprefixer.js";
import viteCompression from "file:///Users/itoh/Desktop/CIRCULARITY_ANALYSIS/node_modules/vite-plugin-compression/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/itoh/Desktop/CIRCULARITY_ANALYSIS";
var inputs = {};
var documents = globule.find([`./app/**/*.pug`], {
  ignore: [`./app/**/_*.pug`]
});
documents.forEach((document) => {
  const fileName = document.replace(`./app/`, "");
  const key = parse(document).name;
  inputs[key] = resolve(__vite_injected_original_dirname, "app", fileName);
});
var vite_config_default = defineConfig({
  root: "app",
  css: {
    devSourcemap: true,
    postcss: {
      plugins: [postcssLogical(["padding-inline", "margin-inline", "inset"]), autoprefixer()]
    }
  },
  server: {
    host: true,
    port: 3e3
  },
  esbuild: {
    supported: {
      "top-level-await": true
    }
  },
  build: {
    outDir: resolve(__vite_injected_original_dirname, "dist"),
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
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "app"),
      "@:js": resolve(__vite_injected_original_dirname, "app/assets/js"),
      "@:sass": resolve(__vite_injected_original_dirname, "app/assets/sass")
    }
  },
  plugins: [
    vitePluginPugStatic(() => {
      const options = {
        compileDebug: true,
        basedir: "app"
      };
      return {
        buildOptions: options,
        serveOptions: options
      };
    }),
    viteCompression({
      algorithm: "brotliCompress",
      filter: (file) => ["js", "css"].some((ext) => file.endsWith(ext))
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvaXRvaC9EZXNrdG9wL0NJUkNVTEFSSVRZX0FOQUxZU0lTXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvaXRvaC9EZXNrdG9wL0NJUkNVTEFSSVRZX0FOQUxZU0lTL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9pdG9oL0Rlc2t0b3AvQ0lSQ1VMQVJJVFlfQU5BTFlTSVMvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyByZXNvbHZlLCBwYXJzZSB9IGZyb20gXCJwYXRoXCI7XG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgdml0ZVBsdWdpblB1Z1N0YXRpYyBmcm9tIFwiQG1hY3JvcHlnaWEvdml0ZS1wbHVnaW4tcHVnLXN0YXRpY1wiO1xuaW1wb3J0IGdsb2J1bGUgZnJvbSBcImdsb2J1bGVcIjtcbmltcG9ydCBicm93c2Vyc2xpc3RUb0VzYnVpbGQgZnJvbSBcImJyb3dzZXJzbGlzdC10by1lc2J1aWxkXCI7XG5cbmltcG9ydCBwb3N0Y3NzIGZyb20gXCJwb3N0Y3NzXCI7XG5pbXBvcnQgcG9zdGNzc0xvZ2ljYWwgZnJvbSBcInBvc3Rjc3MtbG9naWNhbFwiO1xuaW1wb3J0IGF1dG9wcmVmaXhlciBmcm9tIFwiYXV0b3ByZWZpeGVyXCI7XG5cbmltcG9ydCB2aXRlQ29tcHJlc3Npb24gZnJvbSBcInZpdGUtcGx1Z2luLWNvbXByZXNzaW9uXCI7XG5cbmNvbnN0IGlucHV0cyA9IHt9O1xuY29uc3QgZG9jdW1lbnRzID0gZ2xvYnVsZS5maW5kKFtgLi9hcHAvKiovKi5wdWdgXSwge1xuICBpZ25vcmU6IFtgLi9hcHAvKiovXyoucHVnYF0sXG59KTtcbmRvY3VtZW50cy5mb3JFYWNoKChkb2N1bWVudCkgPT4ge1xuICBjb25zdCBmaWxlTmFtZSA9IGRvY3VtZW50LnJlcGxhY2UoYC4vYXBwL2AsIFwiXCIpO1xuICBjb25zdCBrZXkgPSBwYXJzZShkb2N1bWVudCkubmFtZTtcbiAgaW5wdXRzW2tleV0gPSByZXNvbHZlKF9fZGlybmFtZSwgXCJhcHBcIiwgZmlsZU5hbWUpO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHJvb3Q6IFwiYXBwXCIsXG4gIGNzczoge1xuICAgIGRldlNvdXJjZW1hcDogdHJ1ZSwgLy8gdGhpcyBvbmVcbiAgICBwb3N0Y3NzOiB7XG4gICAgICBwbHVnaW5zOiBbcG9zdGNzc0xvZ2ljYWwoW1wicGFkZGluZy1pbmxpbmVcIiwgXCJtYXJnaW4taW5saW5lXCIsIFwiaW5zZXRcIl0pLCBhdXRvcHJlZml4ZXIoKV0sXG4gICAgfSxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogdHJ1ZSxcbiAgICBwb3J0OiAzMDAwLFxuICB9LFxuICBlc2J1aWxkOiB7XG4gICAgc3VwcG9ydGVkOiB7XG4gICAgICBcInRvcC1sZXZlbC1hd2FpdFwiOiB0cnVlLFxuICAgIH0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgLy8gc291cmNlbWFwOiB0cnVlLFxuICAgIG91dERpcjogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiZGlzdFwiKSxcbiAgICBlbXB0eU91dERpcjogdHJ1ZSxcbiAgICBtaW5pZnk6IGZhbHNlLFxuICAgIHRhcmdldDogYnJvd3NlcnNsaXN0VG9Fc2J1aWxkKCksXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgaW5wdXQ6IHsgLi4uaW5wdXRzIH0sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6IGBhc3NldHMvanMvW25hbWVdLmpzYCxcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6IGBhc3NldHMvanMvW25hbWVdLmpzYCxcbiAgICAgICAgYXNzZXRGaWxlTmFtZXM6IChhc3NldEluZm8pID0+IHtcbiAgICAgICAgICBpZiAoL1xcLihnaWZ8anBlZ3xqcGd8cG5nfHN2Z3x3ZWJwKSQvLnRlc3QoYXNzZXRJbmZvLm5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJhc3NldHMvaW1hZ2VzL1tuYW1lXS5bZXh0XVwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoL1xcLmNzcyQvLnRlc3QoYXNzZXRJbmZvLm5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJhc3NldHMvY3NzL1tuYW1lXS5bZXh0XVwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gXCJhc3NldHMvW25hbWVdLltleHRdXCI7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHJlc29sdmUoX19kaXJuYW1lLCBcImFwcFwiKSxcbiAgICAgIFwiQDpqc1wiOiByZXNvbHZlKF9fZGlybmFtZSwgXCJhcHAvYXNzZXRzL2pzXCIpLFxuICAgICAgXCJAOnNhc3NcIjogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiYXBwL2Fzc2V0cy9zYXNzXCIpLFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICB2aXRlUGx1Z2luUHVnU3RhdGljKCgpID0+IHtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIGNvbXBpbGVEZWJ1ZzogdHJ1ZSxcbiAgICAgICAgYmFzZWRpcjogXCJhcHBcIixcbiAgICAgIH07XG4gICAgICByZXR1cm4ge1xuICAgICAgICBidWlsZE9wdGlvbnM6IG9wdGlvbnMsXG4gICAgICAgIHNlcnZlT3B0aW9uczogb3B0aW9ucyxcbiAgICAgIH07XG4gICAgfSksXG4gICAgdml0ZUNvbXByZXNzaW9uKHtcbiAgICAgIGFsZ29yaXRobTogXCJicm90bGlDb21wcmVzc1wiLFxuICAgICAgZmlsdGVyOiAoZmlsZSkgPT4gW1wianNcIiwgXCJjc3NcIl0uc29tZSgoZXh0KSA9PiBmaWxlLmVuZHNXaXRoKGV4dCkpLFxuICAgIH0pLFxuICBdLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTBTLFNBQVMsU0FBUyxhQUFhO0FBRXpVLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8seUJBQXlCO0FBQ2hDLE9BQU8sYUFBYTtBQUNwQixPQUFPLDJCQUEyQjtBQUVsQyxPQUFPLGFBQWE7QUFDcEIsT0FBTyxvQkFBb0I7QUFDM0IsT0FBTyxrQkFBa0I7QUFFekIsT0FBTyxxQkFBcUI7QUFYNUIsSUFBTSxtQ0FBbUM7QUFhekMsSUFBTSxTQUFTLENBQUM7QUFDaEIsSUFBTSxZQUFZLFFBQVEsS0FBSyxDQUFDLGdCQUFnQixHQUFHO0FBQUEsRUFDakQsUUFBUSxDQUFDLGlCQUFpQjtBQUM1QixDQUFDO0FBQ0QsVUFBVSxRQUFRLENBQUMsYUFBYTtBQUM5QixRQUFNLFdBQVcsU0FBUyxRQUFRLFVBQVUsRUFBRTtBQUM5QyxRQUFNLE1BQU0sTUFBTSxRQUFRLEVBQUU7QUFDNUIsU0FBTyxPQUFPLFFBQVEsa0NBQVcsT0FBTyxRQUFRO0FBQ2xELENBQUM7QUFFRCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNO0FBQUEsRUFDTixLQUFLO0FBQUEsSUFDSCxjQUFjO0FBQUEsSUFDZCxTQUFTO0FBQUEsTUFDUCxTQUFTLENBQUMsZUFBZSxDQUFDLGtCQUFrQixpQkFBaUIsT0FBTyxDQUFDLEdBQUcsYUFBYSxDQUFDO0FBQUEsSUFDeEY7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsV0FBVztBQUFBLE1BQ1QsbUJBQW1CO0FBQUEsSUFDckI7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFFTCxRQUFRLFFBQVEsa0NBQVcsTUFBTTtBQUFBLElBQ2pDLGFBQWE7QUFBQSxJQUNiLFFBQVE7QUFBQSxJQUNSLFFBQVEsc0JBQXNCO0FBQUEsSUFDOUIsZUFBZTtBQUFBLE1BQ2IsT0FBTyxFQUFFLEdBQUcsT0FBTztBQUFBLE1BQ25CLFFBQVE7QUFBQSxRQUNOLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQixDQUFDLGNBQWM7QUFDN0IsY0FBSSxpQ0FBaUMsS0FBSyxVQUFVLElBQUksR0FBRztBQUN6RCxtQkFBTztBQUFBLFVBQ1Q7QUFDQSxjQUFJLFNBQVMsS0FBSyxVQUFVLElBQUksR0FBRztBQUNqQyxtQkFBTztBQUFBLFVBQ1Q7QUFDQSxpQkFBTztBQUFBLFFBQ1Q7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsTUFDN0IsUUFBUSxRQUFRLGtDQUFXLGVBQWU7QUFBQSxNQUMxQyxVQUFVLFFBQVEsa0NBQVcsaUJBQWlCO0FBQUEsSUFDaEQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxvQkFBb0IsTUFBTTtBQUN4QixZQUFNLFVBQVU7QUFBQSxRQUNkLGNBQWM7QUFBQSxRQUNkLFNBQVM7QUFBQSxNQUNYO0FBQ0EsYUFBTztBQUFBLFFBQ0wsY0FBYztBQUFBLFFBQ2QsY0FBYztBQUFBLE1BQ2hCO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxnQkFBZ0I7QUFBQSxNQUNkLFdBQVc7QUFBQSxNQUNYLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLEVBQUUsS0FBSyxDQUFDLFFBQVEsS0FBSyxTQUFTLEdBQUcsQ0FBQztBQUFBLElBQ2xFLENBQUM7QUFBQSxFQUNIO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
