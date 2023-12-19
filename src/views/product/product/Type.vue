<script setup>
import {getCurrentInstance, reactive, ref, onMounted} from 'vue';
import Footer from "@/components/common/Footer.vue";

const {proxy} = getCurrentInstance();

const activeIndex = ref(15);

const typeList = ref([]);
const typeId = ref(0);

onMounted(() => {
	getTypeData();
});

const getTypeData = async () => {
	let result = await proxy.$api.TypeIndex();
	let TypeData = [];
	for (let item of result.data) {
		TypeData.push({
			text: item.name,
			id: item.id
		});
	}
	typeList.value = TypeData;

}

//
const onClickNav = (index) => {
	activeIndex.value = index;
	typeId.value = typeList.value[index].id;
}


</script>

<template>
	<van-sticky z-index="100">
		<van-nav-bar
			title="商品分类"
			fixed
		/>
	</van-sticky>
	<div style="height: 46px;"></div>
	<van-tree-select
		v-model:main-active-index="activeIndex"
		height="86vh"
		:items="typeList"
		@click-nav="onClickNav"
	>
	</van-tree-select>
	<Footer/>
</template>

<style>
@import "/public/assets/css/typelist.css";
</style>