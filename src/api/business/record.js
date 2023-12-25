import {POST} from "@/services/request.js";

const Record = {
	RecordIndex(data) {
		return POST({
			url: "/business/record/index",
			params: data
		});
	},
}

export default Record;