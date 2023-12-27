export default [
	{
		path: 'product/index',
		name: 'ProductIndex',
		component: () => import('@/views/product/product/Index.vue'),
		meta: {
			title: '商品列表',
		}
	},
	{
		path: 'product/info',
		name: 'ProductInfo',
		component: () => import('@/views/product/product/Info.vue'),
		meta: {
			title: '商品详情',
		}
	},
	{
		path: 'product/type',
		name: "ProductType",
		component: () => import('@/views/product/product/Type.vue'),
		meta: {
			title: '商品分类',
		}
	}
];