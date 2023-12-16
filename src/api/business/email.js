import {POST} from "@/services/request.js";

const Email = {
	EmailSend(data) {
		return POST({
			url: "/business/email/send",
			params: data
		});
	},
	EmailCheck(data) {
		return POST({
			url: "/business/email/check",
			params: data
		});
	}
}

export default Email;