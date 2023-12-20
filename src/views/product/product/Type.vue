<script setup>
import {getCurrentInstance, reactive, ref, onMounted} from 'vue';
import Footer from "@/components/common/Footer.vue";

const {proxy} = getCurrentInstance();

const activeIndex = ref(0);

const typeList = ref([]);
const typeId = ref(0);

const list = ref([]);
const page = ref(1);
const limit = ref(10);
const listCount = ref(0);

// 刷新
const refreshing = ref(false);
const loading = ref(false);
const finished = ref(false);
// 下拉刷新
const onRefresh = () => {
	list.value = [];
	page.value = 1;
	loading.value = true;
	refreshing.value = true;
	onLoad();
};

// 上拉加载
const onLoad = async () => {
	if (!refreshing.value && list.value.length < listCount.value) {
		page.value = page.value + 1;
	}

	if (refreshing.value) {
		setTimeout(() => {
			refreshing.value = false
		}, 1500);
	}
	setTimeout(() => {
		getTypeProductData();
	}, 1500);
}

// 获取数据方法
const getTypeProductData = async () => {
	let data = {
		typeid: typeId.value,
		page: page.value,
		limit: limit.value
	}

	let result = await proxy.$api.TypeProduct(data);

	if (result.code === 0) {
		finished.value = true;
	} else {
		finished.value = false;
		loading.value = false;

		listCount.value = result.data.count;
		list.value = list.value.concat(result.data.list);

		if (listCount.value === list.value.length) {
			finished.value = true;
			loading.value = false;
		}
	}
}

onMounted(() => {
	getTypeData();
	getTypeProductData();
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
	// 使activeIndex设置为第一个ID
	typeId.value = typeList.value[0].id;
}

//
const onClickNav = (index) => {
	activeIndex.value = index;
	typeId.value = typeList.value[index].id;
	onRefresh();
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
		<template #content>
			<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
				<van-list
					v-model="loading"
					:finished="finished"
					finished-text="没有更多了"
					@load="onLoad"
				>
					<div class="aui-flex-links">
						<router-link
							:to="{ path: '/product/product/info', query: { proid: item.id } }"
							class="aui-flex-links-item"
							v-for="item in list"
							:key="item.id"
						>
							<div class="aui-flex-links-img">
								<img :src="item.thumb_cdn" alt="product"/>
							</div>
							<div class="aui-flex-links-text">{{ item.name }}</div>
						</router-link>
					</div>
				</van-list>
			</van-pull-refresh>
		</template>
	</van-tree-select>
	<Footer/>
</template>

<style>
@import "/public/assets/css/typelist.css";
</style>