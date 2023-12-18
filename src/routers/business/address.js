const Address = [
	{
		path:'address/index',
		name:'AddressIndex',
		component:()=>import('@/views/business/address/index.vue'),
		meta: {
			auth:true
		}
	},
	{
		path: 'address/add',
		name: 'AddressAdd',
		component: () => import('@/views/business/address/add.vue'),
		meta: {
			auth: true
		}
	},
	{
		path: 'address/edit',
		name: 'AddressEdit',
		component: () => import('@/views/business/address/edit.vue'),
		meta: {
			auth: true
		}
	}
]

export default Address;