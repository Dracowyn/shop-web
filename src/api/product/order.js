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
	},
	OrderPay(data = {}) {
		return POST({
			url: '/product/order/pay',
			params: data
		});
	},
	OrderCancel(data = {}) {
		return POST({
			url: '/product/order/cancel',
			params: data
		});
	},
	OrderRejected(data = {}) {
		return POST({
			url: '/product/order/rejected',
			params: data
		});
	},
	OrderConfirm(data = {}) {
		return POST({
			url: '/product/order/confirm',
			params: data
		});
	},
}

export default Order;