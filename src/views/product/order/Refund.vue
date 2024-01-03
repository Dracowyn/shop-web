<script setup>
import {getCurrentInstance, ref, reactive, onMounted} from "vue";

const {proxy} = getCurrentInstance()
const business = reactive(proxy.$cookies.get("business") ? proxy.$cookies.get("business") : {})

const orderId = ref(proxy.$route.query.orderid ? proxy.$route.query.orderid : 0);

const orderData = ref({});
const productList = ref([]);

// 订单总价
const orderTotal = ref(0.00);
// 应付金额
const orderPay = ref(0.00);

// 申请退款原因
const refundReason = ref('');
// 申请退款选项
const refundType = ref(1);

const getOrderData = async () => {
	let data = {
		busid: business.id,
		orderid: orderId.value,
	}

	let result = await proxy.$api.OrderInfo(data);

	if (result.code === 1) {
		orderData.value = result.data;
		productList.value = result.data.order_product;
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


const onSubmit = async (code) => {
	proxy.$showConfirmDialog({
		title: "提示",
		message: "是否确认申请退货？",
	}).then(async () => {
		let data = {
			busid: business.id,
			orderid: orderId.value,
			type: refundType.value,
			reason: refundReason.value,
		}

		let result = await proxy.$api.OrderRejected(data);

		if (result.code === 0) {
			proxy.$showNotify({
				type: 'warning',
				message: result.msg,
				duration: 1500,
			});
		} else {
			proxy.$showNotify({
				type: 'success',
				message: result.msg,
				duration: 1500,
				onClose: () => {
					onRefresh();
				}
			});
		}
	}).catch(() => {
	})
}

const onBack = () => {
	proxy.$router.back();
}

// 刷新页面
const onRefresh = () => {
	proxy.$router.go(0);
}

</script>

<template>
	<van-nav-bar
		title="订单详情"
		left-text="返回"
		left-arrow
		@click-left="onBack"
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

	<!--订单编号部分-->
	<div class="indent-details-box3">
		<p>订单编号:{{ orderId }}</p>
		<p>下单时间:{{ orderData.createtime_text }}</p>
		<p>订单状态：{{ orderData.status_text }}</p>
		<p v-if="orderData.remark">订单备注：{{ orderData.remark }}</p>
	</div>

	<van-form
		v-if="orderData.status !== '-3' && orderData.status !== '-2' && orderData.status !== '-1'"
		@submit="onSubmit"
	>
		<van-field
			v-model="refundReason"
			rows="1"
			autosize
			label="退款原因"
			placeholder="请输入退款原因"
		/>
		<!--申请退款选项-->
		<van-field name="refundType" label="退款选项">
			<template #input>
				<van-radio-group v-model="refundType" direction="horizontal">
					<van-radio name="1">仅退款</van-radio>
					<van-radio name="2">退货退款</van-radio>
				</van-radio-group>
			</template>
		</van-field>

		<!--提交申请-->
		<van-button
			type="primary"
			text="提交申请"
			round
			block
			native-type="submit"
		/>
	</van-form>
</template>

<style>
@import "/assets/css/indent-details.css";
.van-cell-group {
	background-image: unset;
}
</style>