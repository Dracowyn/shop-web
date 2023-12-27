<script setup>
import {getCurrentInstance, ref, reactive, onMounted} from "vue";

const {proxy} = getCurrentInstance()
const business = reactive(proxy.$cookies.get("business") ? proxy.$cookies.get("business") : {})

const orderId = ref(proxy.$route.query.orderid ? proxy.$route.query.orderid : 0);

const orderData = ref({});
const productList = ref([]);

// 评价内容
const evaluationContent = ref('');

// 评价星级
const evaluationStar = ref(5);

// 评价图片
const evaluationImages = ref([]);

const getOrderData = async () => {
	let data = {
		busid: business.id,
		orderid: orderId.value,
	}

	let result = await proxy.$api.OrderInfo(data);

	if (result.code === 1) {
		orderData.value = result.data;
		productList.value = result.data.order_product;
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

const onSubmit = async () => {
	proxy.$showConfirmDialog({
		title: "提示",
		message: "是否确认提交评论？",
	}).then(async () => {
		// 创建 FormData 对象
		let formData = new FormData();

		// 遍历 evaluationImages 数组并添加每个文件到 formData
		evaluationImages.value.forEach((image, index) => {
			if (image.file) {
				formData.append(`images[${index}]`, image.file);
			}
		});

		// 添加其他表单数据
		formData.append('busid', business.id);
		formData.append('orderid', orderId.value);
		formData.append('content', evaluationContent.value);
		formData.append('score', evaluationStar.value);

		// 发送请求
		let result = await proxy.$api.OrderEvaluation(formData);

		// 处理响应
		if (result.code === 1) {
			proxy.$showNotify({
				type: 'success',
				message: result.msg,
				duration: 1500,
				onClose: () => {
					proxy.$router.back();
				}
			});
		} else {
			proxy.$showNotify({
				type: 'warning',
				message: result.msg,
				duration: 1500,
				onClose: () => {
					proxy.$router.back();
				}
			});
		}
	}).catch(() => {
	})
}
</script>

<template>
	<van-nav-bar
		title="订单评价"
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
		<span class="indent-details-text5">{{ orderData.amount }}</span>
	</div>
	<div class="indent-details-box2">
		<span class="indent-details-text4 tcolor-grey">商品总价</span>
		<span class="indent-details-text5 tcolor-black">{{ orderData.amount }}</span>
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
	<van-form @submit="onSubmit" v-if="orderData.status !== '4'">
		<van-cell-group>
			<van-field
				v-model="evaluationContent"
				rows="2"
				label="评价内容"
				type="textarea"
				placeholder="请输入评价内容"
			/>
			<van-field name="rate" label="评分">
				<template #input>
					<van-rate v-model="evaluationStar"/>
				</template>
			</van-field>
			<van-field name="uploader" label="评价图片">
				<template #input>
					<van-uploader v-model="evaluationImages"/>
				</template>
			</van-field>
		</van-cell-group>
		<div style="margin: 16px;">
			<van-button round block type="primary" native-type="submit">
				提交
			</van-button>
		</div>
	</van-form>

</template>

<style>
@import "/assets/css/indent-details.css";
.indent-details-box2,.indent-details-box3 {
	float: unset;
}
</style>