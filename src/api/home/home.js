import {POST} from "@/services/request.js";

const Home = {
	HomeIndex(data) {
		return POST({
			url: "/index/index",
			params: data
		});
	},
	HomeNews(data) {
		return POST({
			url: "/index/new",
			params: data
		});
	},
	HomeHot(data) {
		return POST({
			url: "/index/hot",
			params: data
		});
	}
}

export default Home;