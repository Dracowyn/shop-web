const Order = [
	{
		path: 'order/detail',
		name: 'OrderDetail',
		component: () => import('@/views/product/order/Detail.vue'),
		meta: {
			title: '订单详情',
			auth: true
		}
	},
]

export default Order;