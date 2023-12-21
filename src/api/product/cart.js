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
	},
	CartNumUpdate(data = {}) {
		return POST({
			url: '/product/cart/update',
			params: data
		});
	},
	CartDelete(data = {}) {
		return POST({
			url: '/product/cart/del',
			params: data
		});
	}
}

export default Cart;