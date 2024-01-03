<script setup>
import {getCurrentInstance, ref, reactive, onMounted} from "vue";

const {proxy} = getCurrentInstance()
const business = reactive(proxy.$cookies.get("business") ? proxy.$cookies.get("business") : {})

const orderId = ref(proxy.$route.query.orderid ? proxy.$route.query.orderid : 0);

const expressData = ref({});

const getExpressData = async () => {
	let data = {
		busid: business.id,
		orderid: orderId.value,
	}

	let result = await proxy.$api.OrderExpress(data);

	if (result.code === 1) {
		expressData.value = result.data;
	} else {
		proxy.$showNotify({
			type: 'danger',
			message: result.msg,
			duration: 1500,
			onClose: () => {
				proxy.$router.back();
			}
		})
	}
}

const onCopy = () => {
	proxy.$showNotify({
		type: 'success',
		message: '复制成功',
		duration: 1500,
	})
}

onMounted(() => {
	getExpressData();
})

const onBack = () => {
	proxy.$router.back();
}
</script>

<template>
	<van-nav-bar
		title="物流信息"
		left-text="返回"
		left-arrow
		@click-left="onBack"
	/>
	<van-cell-group>
		<van-cell title="物流公司" :value="expressData.express" />
		<van-cell title="物流单号" :value="expressData.expresscode" />
		<van-cell title="订单编号" :value="expressData.code" />
		<van-cell title="订单状态" :value="expressData.status_text" />
		<van-cell title="订单备注" :value="expressData.remark" />
	</van-cell-group>
</template>

<style scoped>

</style>