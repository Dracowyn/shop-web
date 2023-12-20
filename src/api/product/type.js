import {POST} from "@/services/request.js";

const TypeController = {
	TypeIndex(data) {
		return POST({
			url: "/type/index",
			params: data
		});
	},
	TypeProduct(data) {
		return POST({
			url: "/type/product",
			params: data
		});
	}
}

export default TypeController;