import {POST} from "@/services/request.js"

const Order = {
	OrderCreate(data = {}) {
		return POST({
			url: '/product/order/create',
			params: data
		});
	}
}

export default Order;