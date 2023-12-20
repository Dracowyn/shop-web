const Cart = [
	{
		path: 'cart/index',
		name: 'CartIndex',
		component: () => import('@/views/product/cart/index.vue'),
		meta: {
			title: '购物车',
			auth: true
		}
	}
]

export default Cart;