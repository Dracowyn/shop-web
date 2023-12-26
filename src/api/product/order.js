import {POST} from "@/services/request.js"

const Order = {
	OrderCreate(data = {}) {
		return POST({
			url: '/product/order/create',
			params: data
		});
	},
	OrderIndex(data = {}) {
		return POST({
			url: '/product/order/index',
			params: data
		});
	},
	OrderInfo(data = {}) {
		return POST({
			url: '/product/order/info',
			params: data
		});
	}
}

export default Order;