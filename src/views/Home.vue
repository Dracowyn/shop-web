<script setup>
import Footer from '../components/common/Footer.vue';
import {getCurrentInstance, onMounted, ref} from 'vue';

const {proxy} = getCurrentInstance();
const recommendData = ref([]);
const typeData = ref([]);
const newData = ref([]);
const hotData = ref([]);


onMounted(() => {
	getHomeData();
	getNewData();
	getHotData();
});

const getHomeData = async () => {
	let result = await proxy.$api.HomeIndex();

	if (result.code === 1) {
		recommendData.value = result.data.recommendData;
		typeData.value = result.data.typeData;
	}
}

const getNewData = async () => {
	let result = await proxy.$api.HomeNews();

	if (result.code === 1) {
		newData.value = result.data;
	}
}

const getHotData = async () => {
	let result = await proxy.$api.HomeHot();

	if (result.code === 1) {
		hotData.value = result.data;
	}
}

</script>

<template>
	<div class="aui-m-slider">
		<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
			<van-swipe-item v-for="item in recommendData" :key="item.id">
				<van-image
					:src="item.thumb_cdn"
				/>
			</van-swipe-item>
		</van-swipe>
	</div>
	<div class="clear"></div>
	<div class="lqgwBox">
		<ul>
			<li v-for="item in typeData">
				<router-link :to="{path:'/product/product/index',query:{typeid:item.id}}">
					<img :src="item.thumb_cdn" alt="product">
					<p>{{ item.name }}</p>
				</router-link>
			</li>
		</ul>
	</div>
	<div class="clear"></div>

	<div class="clear"></div>
	<div class="contitbox">
		<p>新品</p>
	</div>
	<div class="clear"></div>
	<ul class="proul">
		<li v-for="item in newData" :key="item.id">
			<div class="con">
				<router-link :to="{path:'/product/product/info',query:{proid:item.id}}">
					<img :src="item.thumb_cdn">
					<p><span>￥</span>{{ item.price }}</p>
				</router-link>
			</div>
		</li>
	</ul>

	<div class="clear"></div>
	<div class="contitbox">
		<p>热销</p>
	</div>
	<div class="clear"></div>
	<ul class="proul_2">
		<li v-for="item in hotData" :key="item.id">
			<div class="con">
				<router-link :to="{path:'/product/product/info',query:{proid:item.id}}">
					<img :src="item.thumb_cdn">
					<p><span>￥</span>{{ item.price }}</p>
				</router-link>
			</div>
		</li>
	</ul>
	<div class="clear"></div>
	<div class="h54"></div>
	<div class="clear"></div>
	<Footer/>
</template>

<style>
@import url('/assets/css/banner.css');
</style>