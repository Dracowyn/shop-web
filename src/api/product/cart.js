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
	},
	CartInfo(data = {}) {
		return POST({
			url: '/product/cart/info',
			params: data
		});
	},
	AddressDefault(data = {}) {
		return POST({
			url: '/business/address/default',
			params: data
		});
	},
}

export default Cart;