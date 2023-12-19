import {POST} from "@/services/request.js";

const Collection = {
	CollectionIndex(data) {
		return POST({
			url: "/business/collection/index",
			params: data
		});
	},
}

export default Collection;