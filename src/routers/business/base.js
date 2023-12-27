const Base = [
	{
		path: 'base/index',
		name: 'BaseIndex',
		component: () => import('@/views/business/base/Index.vue'),
		meta: {
			auth: true,
			title: '个人中心',
		}
	},
	{
		path: 'base/register',
		name: 'BaseRegister',
		component: () => import('@/views/business/base/Register.vue'),
		meta: {
			title: '注册',
		}
	},
	{
		path: 'base/login',
		name: 'BaseLogin',
		component: () => import('@/views/business/base/Login.vue'),
		meta: {
			title: '登录',
		}
	},
	{
		path: 'base/profile',
		name: 'BaseProfile',
		component: () => import('@/views/business/base/Profile.vue'),
		meta: {
			auth: true,
			title: '基本资料',
		}
	},
	{
		path: 'base/email',
		name: 'BaseEmail',
		component: () => import('@/views/business/base/Email.vue'),
		meta: {
			auth: true,
			title: '修改邮箱',
		}
	},
	{
		path: 'base/collection',
		name: 'baseCollection',
		component: () => import('@/views/business/base/Collection.vue'),
		meta: {
			auth: true,
			title: '我的收藏',
		}
	},
	{
		path: 'base/order',
		name: 'BaseOrder',
		component: () => import('@/views/business/base/Order.vue'),
		meta: {
			auth: true,
			title: '我的订单',
		}
	},
	{
		path: 'base/record',
		name: 'BaseRecord',
		component: () => import('@/views/business/base/Record.vue'),
		meta: {
			auth: true,
			title: '消费记录',
		}
	}
];

export default Base;