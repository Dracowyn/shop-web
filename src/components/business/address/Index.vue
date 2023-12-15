<script setup>
import {getCurrentInstance,reactive,ref} from 'vue';

const {proxy} = getCurrentInstance();
const list = reactive([]);
const selectedAddressId = ref(0);

const toAdd = () => {
	proxy.$router.push('/business/address/add');
}

const toEdit = (id) => {
	proxy.$router.push({ name: 'AddressEdit', params: { id: id } });
}

const toDelete = (id) => {
	proxy.$showDialog({
		title: '提示',
		message: '确定要删除该收货地址吗？',
		showCancelButton: true
	}).then(() => {
		proxy.$showNotify({
			type: 'success',
			message: '删除成功',
			duration: 1500
		});
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
	</van-sticky>
	<van-address-list
		v-model="selectedAddressId"
		:list="list"
		default-tag-text="默认"
		@add="toAdd"
		@edit="toEdit"
		@delete="toDelete"
	/>
</template>