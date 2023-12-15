<script setup>
import {getCurrentInstance, reactive} from "vue";
import {areaList} from "@vant/area-data";

const {proxy} = getCurrentInstance();
const business = reactive(proxy.$cookies.get('business') ? proxy.$cookies.get('business') : {});

const onSave = async (value) => {
	// 组装数据
	let data = {
		busid: business.id,
		consignee: info.name,
		mobile: info.tel,
		code: info.areaCode,
		address: info.addressDetail,
		status: info.isDefault === true ? 1 : 0
	}

	let result = await proxy.$api.address(data);

	if (result.code === 1) {
		proxy.$showNotify({
			type: 'success',
			message: result.msg,
			duration: 1500,
			onClose: () => {
				proxy.$router.go(-1);
			}
		});
	} else {
		proxy.$showNotify({
			type: 'warning',
			message: result.msg,
			duration: 1500
		});
	}
}

const onBack = () => {
	proxy.$router.go(-1);
}
</script>

<template>
	<van-sticky z-index="100">
		<van-nav-bar
			title="新增收货地址"
			left-text="返回"
			left-arrow
			@click-left="onBack"
		/>
	</van-sticky>
	<van-address-edit
		:area-list="areaList"
		show-set-default
		:area-columns-placeholder="['请选择', '请选择', '请选择']"
		@save="onSave"
	/>
</template>

<style scoped>

</style>