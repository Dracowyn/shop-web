<script setup>
import {getCurrentInstance, ref, reactive, onMounted, computed} from 'vue';

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
		getRecordData();
	}, 1500);
};

// 获取数据方法
const getRecordData = async () => {
	let data = {
		busid: business.id,
		page: page.value,
		limit: limit.value,
	}

	let result = await proxy.$api.RecordIndex(data);

	if (result.code === 0) {
		proxy.$showNotify({
			type: 'warning',
			message: result.msg,
			duration: 1500,
		})
	}

	finished.value = false;
	loading.value = false;

	listCount.value = result.data.count;
	list.value = list.value.concat(result.data.list);

	if (listCount.value === list.value.length) {
		finished.value = true;
		loading.value = false;
	}
}

const onBack = () => {
	proxy.$router.back();
}

</script>

<template>
	<van-sticky z-index="100">
		<van-nav-bar
			title="消费记录"
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
			<div v-for="item of list">
				<van-cell-group>
					<van-cell
						:title="item.content"
						:label="item.createtime_text"
					/>
				</van-cell-group>
			</div>
		</van-list>

	</van-pull-refresh>

</template>

<style scoped>

</style>