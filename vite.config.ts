import { fileURLToPath, URL } from "url";
import WindiCSS from "vite-plugin-windicss";
import components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
  plugins: [
    WindiCSS(),
    vue({
      template: { transformAssetUrls },
    }),

    quasar({
      sassVariables: "src/quasar-variables.sass",
    }),
    components({
      dirs: ["src/base", "src/components", "src/layouts"],
      dts: true,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: "happy-dom",
  },
});
