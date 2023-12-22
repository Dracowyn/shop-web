<script setup>
import Footer from '../../../components/common/Footer.vue';
import {getCurrentInstance, ref} from 'vue';

const {proxy} = getCurrentInstance();
const business = ref(proxy.$cookies.get('business') ? proxy.$cookies.get('business') : {});

const toProfile = () => {
	proxy.$router.push('/business/base/profile');
}

const toAddress = () => {
	proxy.$router.push('/business/address/index');
}

const toEmail = () => {
	proxy.$router.push('/business/base/email');
}

const toCollection = () => {
	proxy.$router.push('/business/base/collection');
}

const toOrder = () => {
	proxy.$router.push('/business/base/order');
}

// 注销登录
const toLogout = () => {
	proxy.$showConfirmDialog({
		title: '注销登录',
		message: '确定要注销登录吗？',
	}).then(() => {
		proxy.$cookies.remove('business');
		proxy.$router.push('/business/base/login');
	}).catch(() => {

	});
}
</script>
<template>
	<div class="myBox">
		<div class="L"><img :src="business.avatar" alt="avatar"/></div>
		<div class="C">
			<div class="tit">{{ business.nickname ? business.nickname : business.mobile_text }}</div>
			<div class="sub" v-if="business.email">{{ business.email }}</div>
		</div>
	</div>
	<div class="clear"></div>
	<div class="allkbox"></div>
	<div class="myboxcon" @click="toProfile">
		<p>基本资料</p>
		<img src="/assets/images/go.png" alt="基本资料">
	</div>
	<div class="myboxcon" @click="toEmail">
		<p>邮箱认证</p>
		<img src="/assets/images/go.png" alt="邮箱认证">
	</div>
	<div class="myboxcon" @click="toAddress">
		<p>我的收货地址</p>
		<img src="/assets/images/go.png" alt="我的收货地址">
	</div>
	<div class="myboxcon" @click="toCollection">
		<p>我的收藏</p>
		<img src="/assets/images/go.png" alt="我的收藏">
	</div>
	<div class="myboxcon" @click="toOrder">
		<p>我的订单</p>
		<img src="/assets/images/go.png" alt="我的订单">
	</div>
	<div class="myboxcon">
		<p>消费记录</p>
		<img src="/assets/images/go.png" alt="消费记录">
	</div>
	<div class="myboxcon">
		<p>充值记录</p>
		<img src="/assets/images/go.png" alt="充值记录">
	</div>
	<div class="myboxcon" @click="toLogout">
		<p>注销</p>
		<img src="/assets/images/go.png" alt="注销登录">
	</div>

	<div class="clear"></div>
	<div class="h54"></div>
	<div class="clear"></div>
	<Footer/>
</template>

<style>
@import url('/assets/css/style.css');
</style>