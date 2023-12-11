import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// 引入path模块
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      vue: "vue/dist/vue.esm-bundler.js", // 定义vue的别名，如果使用其他的插件，可能会用到别名
    },
  },
  plugins: [vue()],
});
