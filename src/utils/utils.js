import {showNotify} from "vant";

export default {
	install(app) {
		// 定义全局
		app.config.globalProperties.$showNotify = showNotify
	}
}