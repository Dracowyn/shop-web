import {POST} from "@/services/request.js";

const Controller = {
	ControllerIndex(data) {
		return POST({
			url: "/index/index",
			params: data
		});
	}
}

export default Controller;