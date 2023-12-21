<script setup>
import {getCurrentInstance, ref, reactive} from "vue";

const {proxy} = getCurrentInstance();

const business = reactive(proxy.$cookies.get('business') ? proxy.$cookies.get('business') : {});

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
		getCollectionData();
	}, 1500);
}

// 获取数据方法
const getCollectionData = async () => {
	let data = {
		busid: business.id,
		page: page.value,
		limit: limit.value,
	}

	let result = await proxy.$api.CollectionIndex(data);

	if (result.code === 0) {
		proxy.$showNotify({
			type: 'warning',
			message: result.msg,
			duration: 1500,
			onClose: () => {
				finished.value = true;
			}
		});
		return;
	}

	finished.value = false;
	loading.value = false;

	let resultData = result.data;

	list.value = list.value.concat(resultData.list);
	listCount.value = resultData.count;

	if (list.value.length >= listCount.value) {
		finished.value = true;
		loading.value = false;
	}
}

const onStar = async (info) => {
	proxy.$showConfirmDialog({
		title: '提示',
		message: '确定取消收藏该商品吗？',
	}).then(async () => {
		let data = {
			proid: info,
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
		proxy.$showNotify({
			type: 'success',
			message: result.msg,
			duration: 1500,
			onClose: () => {
				onRefresh();
			}
		});
	}).catch(() => {
	})
}

const onBack = () => {
	proxy.$router.go(-1);
}

</script>

<template>
	<van-sticky z-index="100">
		<van-nav-bar
			title="收藏列表"
			left-text="返回"
			left-arrow
			@click-left="onBack"
		/>
	</van-sticky>
	<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
		<van-list
			v-model:loading="loading"
			:finished="finished"
			finished-text="没有更多了"
			@load="onLoad"
		>
			<van-swipe-cell v-for="item in list" :key="item.id">
				<van-card
					:price="item.product.price"
					:desc="item.product.content_text"
					:title="item.product.name"
					:thumb="item.product.thumb_cdn"
					:thumb-link="'/product/product/info?proid='+item.product.id"
				>
				</van-card>
				<template #right>
					<van-button square text="删除" type="danger" class="delete-button"
								@click="onStar(item.product.id)"/>
				</template>
			</van-swipe-cell>
		</van-list>
	</van-pull-refresh>

</template>

<style scoped>

</style>