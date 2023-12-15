const Address = [
	{
		path:'address/index',
		name:'AddressIndex',
		component:()=>import('@/components/business/address/index.vue'),
		meta: {
			auth:true
		}
	},
	{
		path: 'address/add',
		name: 'AddressAdd',
		component: () => import('@/components/business/address/add.vue'),
		meta: {
			auth: true
		}
	},
	{
		path: 'address/edit',
		name: 'AddressEdit',
		component: () => import('@/components/business/address/edit.vue'),
		meta: {
			auth: true
		}
	}
]

export default Address;