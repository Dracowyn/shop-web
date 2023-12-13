import {createApp} from 'vue'
import App from './App.vue'

// 引入总路由
import Router from './routers/index';

// 引入VantUI
import Vant from 'vant';

// 引入组件样式
import 'vant/lib/index.css';
import Api from "@/api/index.js";

// 引入vue-cookies
import VueCookies from 'vue3-cookies'

// 引入utils
import Utils from "@/utils/utils.js";

const app = createApp(App)
	.use(Router)
	.use(Vant)
	.use(Api)
	.use(VueCookies)
	.use(Utils)
	.mount('#app')

app.$router.beforeEach(async (to,from,next) => {
	let auth = to.meta.auth === true;
	if (auth === true) {
		// 获取cookie的登录信息
		let business = app.$cookies.get('business') ? app.$cookies.get('business') : {};

		// 重定向登录页
		next('/business/base/login');
	} else {
		// 放行
		next();
	}
});