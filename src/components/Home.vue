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
		<li>
			<div class="con">
				<a href="detail.html">
					<img src="/assets/images/4.jpg">
					<p><span>￥</span>288</p>
				</a>
			</div>
		</li>
		<li>
			<div class="con">
				<a href="detail.html">
					<img src="/assets/images/5.jpg">
					<p><span>￥</span>198</p>
				</a>
			</div>
		</li>
		<li>
			<div class="con">
				<a href="detail.html">
					<img src="/assets/images/6.jpg">
					<p><span>￥</span>2368</p>
				</a>
			</div>
		</li>
		<li>
			<div class="con">
				<a href="detail.html">
					<img src="/assets/images/7.jpg">
					<p><span>￥</span>688</p>
				</a>
			</div>
		</li>
	</ul>

	<div class="clear"></div>
	<div class="contitbox">
		<p>热销</p>
	</div>
	<div class="clear"></div>
	<ul class="proul_2">
		<li>
			<div class="con">
				<a href="detail.html">
					<img src="/assets/images/12.jpg">
					<p><span>￥</span>288</p>
				</a>
			</div>
		</li>
		<li>
			<div class="con">
				<a href="detail.html">
					<img src="/assets/images/13.jpg">
					<p><span>￥</span>198</p>
				</a>
			</div>
		</li>
		<li>
			<div class="con">
				<a href="detail.html">
					<img src="/assets/images/14.jpg">
					<p><span>￥</span>2368</p>
				</a>
			</div>
		</li>
		<li>
			<div class="con">
				<a href="detail.html">
					<img src="/assets/images/14.jpg">
					<p><span>￥</span>688</p>
				</a>
			</div>
		</li>
		<li>
			<div class="con">
				<a href="detail.html">
					<img src="/assets/images/12.jpg">
					<p><span>￥</span>688</p>
				</a>
			</div>
		</li>
		<li>
			<div class="con">
				<a href="detail.html">
					<img src="/assets/images/13.jpg">
					<p><span>￥</span>688</p>
				</a>
			</div>
		</li>
	</ul>
	<div class="clear"></div>
	<div class="h54"></div>
	<div class="clear"></div>
	<Footer/>
</template>
<script setup>
import Footer from './common/Footer.vue';
import {getCurrentInstance, onMounted, ref} from 'vue';

const {proxy} = getCurrentInstance();
const recommendData = ref([]);
const typeData = ref([]);


onMounted(() => {
	getHomeData();
});

const getHomeData = async () => {
	let result = await proxy.$api.ControllerIndex();

	if (result.code === 1) {
		recommendData.value = result.data.recommendData;
		typeData.value = result.data.typeData;
	}
}

</script>

<style>
@import url('/assets/css/banner.css');
</style>