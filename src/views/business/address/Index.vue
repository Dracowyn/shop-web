<script setup>
import {getCurrentInstance, reactive, ref, onMounted} from 'vue';

const {proxy} = getCurrentInstance();
const list = ref([]);
const selectedAddressId = ref(0);

const business = reactive(proxy.$cookies.get('business') ? proxy.$cookies.get('business') : {});

const action = ref(proxy.$route.query.action ? proxy.$route.query.action : '');
const addressId = ref(proxy.$cookies.get('address') ? proxy.$cookies.get('address').id : selectedAddressId);

const getData = async () => {
	let data = {
		busid: business.id
	}

	let result = await proxy.$api.getAddressData(data);

	if (result.code === 0) {
		proxy.$showNotify({
			type: 'warning',
			message: result.msg,
			duration: 1500
		});
	}

	let addressList = [];

	for (let item of result.data) {
		addressList.push({
			id: item.id,
			name: item.consignee,
			tel: item.mobile,
			address: item.region_text + ' ' + item.address,
			isDefault: item.status === '1'
		});

		if (item.status === '1') {
			selectedAddressId.value = item.id;
		}
	}

	list.value = addressList;

}

onMounted(() => {
	getData();
})

const toSelect = async (info) => {
	let data = {
		id: info.id,
		busid: business.id
	}

	let result = await proxy.$api.AddressSelected(data);

	if (result.code === 1) {
		await getData();
	} else {
		proxy.$showNotify({
			type: 'warning',
			message: result.msg,
			duration: 1500
		});
	}
}

const toAdd = () => {
	proxy.$router.push('/business/address/add');
}

const toEdit = (info) => {
	proxy.$router.push({path: '/business/address/edit', query: {id: info.id}});
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

const onSelected = (info) => {
	let data = {
		id: info.id,
		mobile: info.tel,
		consignee: info.name
	}

	proxy.$cookies.set('address', data);

	proxy.$router.back();
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
	<!--从订单确认页面跳转过来的-->
	<van-address-list
		v-model="addressId"
		:list="list"
		default-tag-text="默认"
		@add="toAdd"
		@edit="toEdit"
		@select="onSelected"
		@delete="toDelete"
		v-if="action === 'order'"
	/>
	<van-address-list
		v-model="selectedAddressId"
		:list="list"
		default-tag-text="默认"
		@add="toAdd"
		@edit="toEdit"
		@select="toSelect"
		@delete="toDelete"
		v-else
	/>
</template>