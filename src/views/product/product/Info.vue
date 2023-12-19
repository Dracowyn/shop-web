<script setup>
import {getCurrentInstance, ref, reactive, onMounted} from "vue";

const {proxy} = getCurrentInstance();
const proId = ref(proxy.$route.query.proid ? proxy.$route.query.proid : 0);
const info = ref({});

const business = reactive(proxy.$cookies.get('business') ? proxy.$cookies.get('business') : {});

onMounted(() => {
	getProductInfo();
})

const getProductInfo = async () => {
	let data = {
		proid: proId.value,
		busid: business.id,
	}

	let result = await proxy.$api.ProductInfo(data);

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

	info.value = result.data;
}

// 判断是否收藏商品
const getStar = () => {
	if (info.value.is_star) {
		proxy.$showConfirmDialog({
			title: '提示',
			message: '确定取消收藏该商品吗？',
		}).then(onStar);
	} else {
		onStar();
	}
}

// 收藏商品
const onStar = async () => {
	let data = {
		proid: proId.value,
		busid: business.id,
	}

	let result = await proxy.$api.ProductCollection(data);

	if (result.code === 0) {
		proxy.$showNotify({
			type: 'warning',
			message: result.msg,
			duration: 1500,
		});

		return;
	}
	info.value.is_star = result.data.is_star;
	proxy.$showNotify({
		type: 'success',
		message: result.msg,
		duration: 1500,
	});
}

const onBack = () => {
	proxy.$router.go(-1);
}

</script>

<template>
	<van-sticky z-index="100">
		<van-nav-bar
			title="详情"
			left-text="返回"
			left-arrow
			@click-left="onBack"/>
	</van-sticky>

	<div class="aui-m-slider">
		<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
			<van-swipe-item v-for="(image,index) in info.thumbs_cdn" :key="index">
				<img :src="image" alt=""/>
			</van-swipe-item>
		</van-swipe>
	</div>

	<div class="detailbox">
		<h4>{{ info.name }}</h4>
		<div class="price"><em>￥</em>{{ info.price }}<font>库存：{{ info.stock }} 件</font></div>
	</div>

	<div class="detailbox_2" v-html="info.content">
	</div>

	<van-action-bar>
		<van-action-bar-icon icon="chat-o" text="客服" color="#ee0a24"/>
		<van-action-bar-icon icon="cart-o" text="购物车"/>
		<van-action-bar-icon icon="star" text="已收藏" color="#ff5000" v-if="info.is_star === 1" @click="getStar"/>
		<van-action-bar-icon icon="star" text="收藏" v-if="info.is_star === 0" @click="getStar"/>
		<van-action-bar-button type="warning" text="加入购物车"/>
		<van-action-bar-button type="danger" text="立即购买"/>
	</van-action-bar>
</template>

<style>

</style>