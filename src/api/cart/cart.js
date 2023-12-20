import {POST} from "@/services/request.js";

const Cart = {
	CartAdd(data = {}) {
		return POST({
			url: '/product/cart/add',
			params: data
		});
	},
	CartIndex(data = {}) {
		return POST({
			url: '/product/cart/index',
			params: data
		});
	}
}

export default Cart;