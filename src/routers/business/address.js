const Address = [
	{
		path:'address/index',
		name:'AddressIndex',
		component:()=>import('@/views/business/address/Index.vue'),
		meta: {
			auth:true,
			title:'收货地址',
		}
	},
	{
		path: 'address/add',
		name: 'AddressAdd',
		component: () => import('@/views/business/address/Add.vue'),
		meta: {
			auth: true,
			title: '添加收货地址',
		}
	},
	{
		path: 'address/edit',
		name: 'AddressEdit',
		component: () => import('@/views/business/address/Edit.vue'),
		meta: {
			auth: true,
			title: '修改收货地址',
		}
	}
]

export default Address;