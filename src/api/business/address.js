import {POST} from "@/services/request.js";


const Address = {
	getAddressData(data) {
		return POST({
			url: "/business/address/index",
			params: data
		});
	},
	AddressAdd(data) {
		return POST({
			url: "/business/address/add",
			params: data
		});
	},
	AddressInfo(data) {
		return POST({
			url: "/business/address/info",
			params: data
		});
	},
	AddressEdit(data) {
		return POST({
			url: "/business/address/edit",
			params: data
		});
	},
	AddressDel(data) {
		return POST({
			url: "/business/address/del",
			params: data
		});
	},
	AddressSelected(data) {
		return POST({
			url: "/business/address/selected",
			params: data
		});
	}
}
export default Address;