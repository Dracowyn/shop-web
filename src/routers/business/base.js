const Base = [
	{
		path: 'base/index',
		name: 'BaseIndex',
		component: () => import('@/views/business/base/Index.vue'),
		meta: {
			auth: true
		}
	},
	{
		path: 'base/register',
		name: 'BaseRegister',
		component: () => import('@/views/business/base/Register.vue')
	},
	{
		path: 'base/login',
		name: 'BaseLogin',
		component: () => import('@/views/business/base/Login.vue')
	},
	{
		path: 'base/profile',
		name: 'BaseProfile',
		component: () => import('@/views/business/base/Profile.vue'),
		meta: {
			auth: true
		}
	},
	{
		path: 'base/email',
		name: 'BaseEmail',
		component: () => import('@/views/business/base/Email.vue'),
		meta: {
			auth: true
		}
	},
	{
		path: 'base/collection',
		name: 'baseCollection',
		component: () => import('@/views/business/base/Collection.vue'),
		meta: {
			auth: true
		}
	},
	{
		path: 'base/order',
		name: 'BaseOrder',
		component: () => import('@/views/business/base/Order.vue'),
		meta: {
			auth: true
		}
	},
];

export default Base;