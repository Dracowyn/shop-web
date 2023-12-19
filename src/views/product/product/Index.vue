<script setup>
// 商品列表页面
import {getCurrentInstance, ref, reactive} from "vue";

const {proxy} = getCurrentInstance();
const typeId = ref(proxy.$route.query.typeid ? proxy.$route.query.typeid : 0);
const flag = ref(0);
const flagOption = reactive([
	{text: '全部', value: 0},
	{text: '新品', value: 1},
	{text: '热卖', value: 2},
	{text: '推荐', value: 3},
]);
const orderBy = ref('create_time');
const orderByOption = reactive([
	{text: '默认排序', value: 'create_time'},
	{text: '库存排序', value: 'stock'},
	{text: '价格排序', value: 'price'},
]);


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
		getProductData();
	}, 1500);
}

// 获取数据方法
const getProductData = async () => {
	let data = {
		typeid: typeId.value,
		page: page.value,
		limit: limit.value,
		flag: flag.value,
		orderBy: orderBy.value,
	}

	let result = await proxy.$api.ProductIndex(data);

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
	console.log(resultData)

	list.value = list.value.concat(resultData.list);
	listCount.value = resultData.count;

	if (list.value.length >= listCount.value) {
		finished.value = true;
		loading.value = false;

	}
}

const onChange = () => {
	onRefresh();
}

const onBack = () => {
	proxy.$router.go(-1);
}

</script>

<template>
	<van-sticky z-index="100">
		<van-nav-bar
			title="商品列表"
			left-text="返回"
			left-arrow
			@click-left="onBack"
		/>

		<van-dropdown-menu>
			<van-dropdown-item v-model="flag" :options="flagOption" @change="onChange"/>
			<van-dropdown-item v-model="orderBy" :options="orderByOption" @change="onChange"/>
		</van-dropdown-menu>
	</van-sticky>

	<div class="mainWarp" style="background: #f3f3f3">
		<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
			<van-list
				v-model:loading="loading"
				:finished="finished"
				finished-text="没有更多了"
				@load="onLoad"
			>
				<ul class="proul">
					<li v-for="item in list" :key="item.id">
						<router-link :to="{path:'/product/product/info',query:{proid:item.id}}">
							<img :src="item.thumb_cdn" height="120" alt="product"/>
						</router-link>
						<router-link :to="{path:'/product/product/info',query:{proid:item.id}}">
							<p class="tit">
								{{ item.name }}
							</p>
						</router-link>
						<div class="price">
							<p>￥ {{ item.price }}</p>
						</div>
					</li>
				</ul>
			</van-list>
		</van-pull-refresh>
	</div>
</template>

<style>
@import "/public/assets/css/banner.css";
</style>