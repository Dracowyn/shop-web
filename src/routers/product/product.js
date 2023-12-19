export default [
	{
		path:'product/index',
		name:'ProductIndex',
		component:() => import('@/views/product/product/Index.vue')
	},
	{
		path:'product/info',
		name:'ProductInfo',
		component:() => import('@/views/product/product/Info.vue')
	},
	{
		path:'product/type',
		name:"ProductType",
		component:() => import('@/views/product/product/Type.vue')
	}
];