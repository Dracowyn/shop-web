import {createApp} from 'vue'
import App from './App.vue'

// 引入总路由
import Router from './routers/index';

// 引入VantUI
import Vant from 'vant';

// 引入组件样式
import 'vant/lib/index.css';
import Api from "@/api/index.js";

const app = createApp(App)
	.use(Router)
	.use(Vant)
	.use(Api)
	.mount('#app')

app.$router.beforeEach((to, from, next) => {
	let auth = to.meta.auth === true;
	if (auth === true) {
		// 获取cookie的登录信息

		// 重定向登录页
		next('/business/base/login');
	} else {
		// 放行
		next();
	}
});