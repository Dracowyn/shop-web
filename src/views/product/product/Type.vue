<script setup>
import {getCurrentInstance, reactive, ref, onMounted} from 'vue';
import Footer from "@/components/common/Footer.vue";

const {proxy} = getCurrentInstance();

const active = ref(15);

const typeData = ref();
const getTypeData = async () => {
	let result = await proxy.$api.TypeIndex();
	if (result.code === 1) {
		typeData.value = result.data;
	}
}

onMounted(() => {
	getTypeData();
});


</script>

<template>
	<van-sticky z-index="100">
		<van-nav-bar
			title="商品分类"
			fixed
		/>
	</van-sticky>
	<div style="height: 46px;"></div>
	<Footer/>
</template>

<style>
@import "/public/assets/css/typelist.css";
</style>