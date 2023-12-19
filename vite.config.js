import {defineConfig} from "vite";
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
	server: {
		proxy: {
			//设置代理请求 当代理商识别你的请求如果前缀是 /api的话 就会自动转移
			"/shop": {
				target: "http://shop.example.com/shop",
				changeOrigin: true, //跨域
				//替换掉api前缀 防止多个api地址
				rewrite: (path) => path.replace(/^\/shop/, ""),
			},
		},
		hmr: {
			overlay: false,
		},
	},
	plugins: [vue()],
});
