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
	{
		path: 'order/refund',
		name: 'OrderRefund',
		component: () => import('@/views/product/order/Refund.vue'),
		meta: {
			title: '申请退款',
			auth: true
		}
	}
]

export default Order;