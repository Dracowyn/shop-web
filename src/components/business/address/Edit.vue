<script setup>
import {getCurrentInstance} from 'vue';

const {proxy} = getCurrentInstance();

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
</template>
