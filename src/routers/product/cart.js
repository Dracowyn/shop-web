const Cart = [
	{
		path: 'cart/index',
		name: 'CartIndex',
		component: () => import('@/views/product/cart/Index.vue'),
		meta: {
			title: '购物车',
			auth: true
		}
	},
	{
		path: 'cart/confirm',
		name: 'CartConfirm',
		component: () => import('@/views/product/cart/Confirm.vue'),
		meta: {
			title: '确认订单',
			auth: true
		}
	}
]

export default Cart;