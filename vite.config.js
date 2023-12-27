import {defineConfig, loadEnv} from "vite";
import vue from "@vitejs/plugin-vue";

// 引入path模块
import path from "path";

// https://vitejs.dev/config/
export default ({mode}) => {
	// 加载环境变量
	const env = loadEnv(mode, process.cwd());

	return defineConfig({
		// ...其他配置
		server: {
			proxy: {
				"/shop": {
					target: env.VITE_APP_SERVER_URL,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/shop/, ""),
				},
			},
		},
		plugins: [vue()],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "src"),
				vue: "vue/dist/vue.esm-bundler.js",
			},
		},
		esbuild: {
			// 去除console和debugger
			drop: ['console', 'debugger'],
		}
	});
};
