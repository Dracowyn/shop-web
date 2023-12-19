import {POST} from "@/services/request";

export default {
	ProductIndex(data = {}) {
		return POST({
			url: '/product/product/index',
			params: data
		});
	},
	ProductInfo(data = {}) {
		return POST({
			url: '/product/product/info',
			params: data
		});
	},
	ProductCollection(data = {}) {
		return POST({
			url: '/product/product/collection',
			params: data
		});
	},
	TypeIndex(data = {}) {
		return POST({
			url: '/product/type/index',
			params: data
		});
	},
	TypeProduct(data = {}) {
		return POST({
			url: '/product/type/product',
			params: data
		});
	}
}