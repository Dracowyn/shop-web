<script setup>
import {getCurrentInstance, onMounted, ref, reactive} from 'vue';
import {areaList} from "@vant/area-data";

const {proxy} = getCurrentInstance();

const business = reactive(proxy.$cookies.get('business') ? proxy.$cookies.get('business') : {});
const id = ref(proxy.$route.query.id ? proxy.$route.query.id : 0);
const info = ref({});

// 获取收货地址
const getInfo = async () => {
	let data = {
		busid: business.id,
		id: id.value,
	}

	let result = await proxy.$api.AddressInfo(data);

	if (result.code === 0) {
		proxy.$showNotify({
			type: 'warning',
			message: result.msg,
			duration: 1500,
			onClose: () => {
				proxy.$router.go(-1);
			}
		});
		return;
	}

	let address = result.data;

	info.value = {
		name: address.consignee,
		tel: address.mobile,
		areaCode: address.district ? address.district : (address.city ? address.city : address.province),
		addressDetail: address.address,
		isDefault: address.status === 1
	}
}

onMounted(() => {
	getInfo();
});

// 保存收货地址
const onSave = async (value) => {
}

// 删除收货地址
const onDelete = (info) => {
	proxy.$showConfirmDialog({
		title: '提示',
		message: '确定要删除该收货地址吗？',
	}).then(async () => {
		let data = {
			busid: business.id,
			id: id.value
		}

		let result = await proxy.$api.AddressDel(data)

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
	}).catch(() => {
		proxy.$showNotify({
			type: 'warning',
			message: '取消删除',
			duration: 1500
		});
	});
}

const onBack = () => {
	proxy.$router.go(-1);
}
</script>

<template>
	<van-sticky z-index="100">
		<van-nav-bar
			title="收货地址"
			left-text="返回"
			left-arrow
			@click-left="onBack"
		/>
		<van-address-edit
			:address-info="info"
			:area-list="areaList"
			show-delete
			show-set-default
			:area-columns-placeholder="['请选择', '请选择', '请选择']"
			@save="onSave"
			@delete="onDelete"
		/>
	</van-sticky>
</template>
