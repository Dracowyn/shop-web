const Cart = [
	{
		path: 'cart/index',
		name: 'CartIndex',
		component: () => import('@/views/product/cart/index.vue'),
		meta: {
			title: '购物车',
			auth: true
		}
	},
	{
		path: 'cart/confirm',
		name: 'CartConfirm',
		component: () => import('@/views/product/cart/confirm.vue'),
		meta: {
			title: '确认订单',
			auth: true
		}
	}
]

export default Cart;