<script setup>
import {getCurrentInstance, ref, reactive, onMounted} from "vue";

const {proxy} = getCurrentInstance()
const business = reactive(proxy.$cookies.get("business") ? proxy.$cookies.get("business") : {})

const orderId = ref(proxy.$route.query.orderid ? proxy.$route.query.orderid : 0);
const addressInfo = ref({});
const orderData = ref({});
const productList = ref([]);

// 订单总价
const orderTotal = ref(0.00);
// 应付金额
const orderPay = ref(0.00);

const getOrderData = async () => {
	let data = {
		busid: business.id,
		orderid: orderId.value,
	}

	let result = await proxy.$api.OrderInfo(data);

	if (result.code === 1) {
		orderData.value = result.data;
		productList.value = result.data.order_product;
		addressInfo.value = result.data.address;
		orderTotal.value = result.data.amount;
		orderPay.value = result.data.amount;
	} else {
		proxy.$showNotify({
			type: 'warning',
			message: result.msg,
			duration: 1500,
			onClose: () => {
				proxy.$router.back();
			}
		})
	}
}

onMounted(() => {
	getOrderData();
})

const onBack = () => {
	proxy.$router.back();
}


</script>

<template>
	<van-nav-bar
		title="订单详情"
		left-text="返回"
		left-arrow
		@click-left="onBack"
	/>
	<van-contact-card
		type="edit"
		:tel="addressInfo.mobile"
		:name="addressInfo.consignee"
		:editable="false"
	/>
	<van-card
		v-for="item in productList"
		:key="item.id"
		:num="item.nums"
		:price="item.total"
		:title="item.product.name"
		:thumb="item.product.thumb_cdn"
		style="margin-bottom: 15px"
	>
		<template #desc>
			￥ {{ item.price }}
		</template>
	</van-card>
	<div class="indent-details-box2">
		<span class="indent-details-text4">应付总额</span>
		<span class="indent-details-text5">{{ orderTotal }}</span>
	</div>
	<div class="indent-details-box2">
		<span class="indent-details-text4 tcolor-grey">商品总价</span>
		<span class="indent-details-text5 tcolor-black">{{ orderTotal }}</span>
	</div>
	<div class="indent-details-box2">
		<span class="indent-details-text4 tcolor-grey">运费</span>
		<span class="indent-details-text5 tcolor-black">￥0.00</span>
	</div>
	<div class="indent-details-box2">
		<span class="indent-details-text4 tcolor-grey">税费</span>
		<span class="indent-details-text5 tcolor-black">￥0.00</span>
	</div>
	<div class="indent-details-box2">
		<span class="indent-details-text4 tcolor-grey">发票信息</span>
		<span class="indent-details-text5 tcolor-black">不需要发票</span>
	</div>

	<!--订单编号部分-->
	<div class="indent-details-box3">
		<p>订单编号:{{ orderId }}</p>
		<p>订单状态:{{ orderData.status_text }}</p>
		<p>下单时间:{{ orderData.createtime_text }}</p>
		<p v-if="orderData.remark">订单备注：{{ orderData.remark }}</p>
	</div>
</template>

<style>
@import "/assets/css/indent-details.css";
</style>