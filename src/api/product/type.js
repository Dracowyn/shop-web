import {POST} from "@/services/request.js";

const TypeController = {
	TypeIndex(data) {
		return POST({
			url: "/type/index",
			params: data
		});
	}
}

export default TypeController;