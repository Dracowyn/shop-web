import {POST} from "@/services/request.js";

const Home = {
	HomeIndex(data) {
		return POST({
			url: "/index/index",
			params: data
		});
	}
}

export default Home;