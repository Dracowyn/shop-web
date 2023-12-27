import {createApp} from 'vue'
import App from './App.vue'

// 引入总路由
import Router from './routers/index';

// 引入VantUI
import Vant from 'vant';

// 引入API
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

app.$router.beforeEach(async (to, from, next) => {
	let auth = to.meta.auth === true;
	if (auth === true) {
		// 获取cookie的登录信息
		let business = app.$cookies.get('business') ? app.$cookies.get('business') : {};

		if (!business || JSON.stringify(business) === '{}') {
			app.$showNotify({
				type: 'warning',
				message: '请先登录',
				duration: 1500
			});

			// 重定向登录页
			next('/business/base/login');
			return;
		}

		// 获取ID和手机号
		let id = business.id ?? 0;
		let mobile = business.mobile ?? 0;

		// 封装数据
		let data = {
			id: id,
			mobile: mobile
		};

		// 发送请求
		let result = await app.$api.check(data);
		// 判断是否登录
		if (result.code === 0) {
			app.$cookies.remove('business');
			app.$showNotify({
				type: 'warning',
				message: result.msg,
				duration: 1500
			});
			// 重定向登录页
			next('/business/base/login');
			return;
		}

		// 保存用户信息
		app.$cookies.set('business',result.data);
		// 放行
		next();

	} else {
		// 放行
		next();
	}
});