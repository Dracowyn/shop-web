import {POST} from "@/services/request.js";

const Base = {
	register(data) {
		return POST({
			url: "/business/base/register",
			params: data
		});
	},
	login(data) {
		return POST({
			url: "/business/base/login",
			params: data
		});
	},
	profile(data) {
		return POST({
			url: "/business/base/profile",
			params: data
		});
	}
}

export default Base;