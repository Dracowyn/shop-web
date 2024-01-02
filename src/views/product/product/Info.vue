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

// 加入购物车
const CartAdd = async () => {
	if (!business || JSON.stringify(business) === '{}') {
		proxy.$showNotify({
			type: 'warning',
			message: '请先登录',
			duration: 1500,
			onClose: () => {
				proxy.$router.push('/business/base/login');
			}
		});
		return;
	}

	let data = {
		proid: proId.value,
		busid: business.id,
	}

	let result = await proxy.$api.CartAdd(data);

	if (result.code === 1) {
		proxy.$showConfirmDialog({
			title: result.msg,
			message: '加入购物车成功，是否前往购物车？',
		}).then(() => {
			proxy.$router.push('/product/cart/index?action=cart');
		}).catch(() => {
		});
	} else {
		proxy.$showNotify({
			type: 'warning',
			message: result.msg,
			duration: 1500,
		});
	}
}

// 立即购买
const BuyNow = () => {
	if (!business || JSON.stringify(business) === '{}') {
		proxy.$showNotify({
			type: 'warning',
			message: '请先登录',
			duration: 1500,
			onClose: () => {
				proxy.$router.push('/business/base/login');
			}
		});
		return;
	}

	proxy.$router.push({
		path: '/product/cart/confirm',
		query: {
			proid: proId.value,
			action: 'buy'
		}
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
		<div class="price"><em>￥</em>{{ info.price }}库存：{{ info.stock }} 件</div>
	</div>

	<div class="detailbox_2" v-html="info.content">
	</div>

	<van-action-bar>
		<van-action-bar-icon icon="chat-o" text="客服" color="#ee0a24"/>
		<van-action-bar-icon icon="cart-o" text="购物车" to="/product/cart/index"/>
		<van-action-bar-icon :icon="info.is_star ? 'star' : 'star-o'" :text="info.is_star ? '已收藏' : '收藏'"
							 color="#ff5000" @click="getStar"/>
		<van-action-bar-button type="warning" text="加入购物车" @click="CartAdd" :disabled="info.stock <= 0"/>
		<van-action-bar-button type="danger" text="立即购买" @click="BuyNow" :disabled="info.stock <= 0"/>
	</van-action-bar>
</template>

<style>

</style>