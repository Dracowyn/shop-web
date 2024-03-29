<script setup>
import {getCurrentInstance, ref, reactive, computed} from 'vue';
import Footer from "@/components/common/Footer.vue";

const {proxy} = getCurrentInstance();
const business = reactive(proxy.$cookies.get('business') ? proxy.$cookies.get('business') : {});
const action = ref(proxy.$route.query.action ? proxy.$route.query.action : '');

const list = ref([]);
const page = ref(1);
const limit = ref(10);
const listCount = ref(0);

// 刷新
const refreshing = ref(false);
const loading = ref(false);
const finished = ref(false);

// 复选框
const checkedArr = ref([]);
const checked = ref(false);
const checkboxGroup = ref(null);

// 总价
const totalPrice = computed(() => {
	let total = 0;
	if (list.value.length > 0) {
		for (let item of list.value) {
			if (checkedArr.value.includes(item.id)) {
				total += parseFloat(item.total);
			}
		}
	}
	return total * 100;
})

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
		getCartData();
	}, 1500);
}

// 获取数据方法
const getCartData = async () => {
	let data = {
		busid: business.id,
		page: page.value,
		limit: limit.value
	}

	let result = await proxy.$api.CartIndex(data);

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

	listCount.value = resultData.count;
	list.value = list.value.concat(resultData.list);

	if (listCount.value === list.value.length) {
		finished.value = true;
		loading.value = false;
	}
}

// 购物车的商品到商品结算
const onSubmit = () => {
	if (checkedArr.value.length <= 0) {
		proxy.$showNotify({
			type: 'warning',
			message: '请选择商品',
			duration: 1500,
		});
		return;
	}
	proxy.$router.push({
		path: '/product/cart/confirm',
		query: {
			cartids: checkedArr.value.join(',')
		}
	});
}

// 更改商品数量
const onChange = (id, nums) => {
	let data = {
		proid: id,
		nums: nums,
		busid: business.id,
	}
	proxy.$api.CartNumUpdate(data);

	// 在刷新之前价格都需要更新
	for (let item of list.value) {
		item.total = (item.price * item.nums).toFixed(2);
	}

}

// 删除购物车商品
const onDelete = (proId) => {
	proxy.$showConfirmDialog({
		title: '提示',
		message: '确定删除该商品吗？',
	}).then(async () => {
		let data = {
			busid: business.id,
			proid: proId,
		}

		let result = await proxy.$api.CartDelete(data);

		if (result.code === 0) {
			proxy.$showNotify({
				type: 'warning',
				message: result.msg,
				duration: 1500,
			});
			return;
		} else {
			proxy.$showNotify({
				type: 'success',
				message: result.msg,
				duration: 1500,
			});
		}

		// 删除成功后，需要更新购物车列表
		list.value = [];
		page.value = 1;
		loading.value = true;
		refreshing.value = true;
		await onLoad();
	}).catch(() => {
	});
}

// 选择
const onCheck = () => {
	checked.value = checkedArr.value.length === list.value.length;
}


// 全选
const onCheckAll = () => {
	checkboxGroup.value.toggleAll();
}

const onBack = () => {
	proxy.$router.go(-1);
}

</script>

<template>
	<van-sticky z-index="100">
		<van-nav-bar title="购物车" left-text="返回" left-arrow @click-left="onBack" v-if="action === 'cart'"/>
		<van-nav-bar title="购物车" v-else/>
	</van-sticky>

	<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
		<van-list
			v-model="loading"
			:finished="finished"
			finished-text="没有更多了"
			@load="onLoad"
		>
			<!--复选框-->
			<van-checkbox-group v-model="checkedArr" ref="checkboxGroup">
				<van-swipe-cell v-for="item in list" :key="item.id">
					<!--商品卡片-->
					<van-card
						:price="item.total"
						:title="item.product.name"
						class="goods-card"
					>
						<template #thumb>
							<van-checkbox :name="item.id" @click="onCheck"></van-checkbox>
							<img :src="item.product.thumb_cdn" :alt="item.product.name">
						</template>
						<!--商品数量-->
						<template #num>
							<van-stepper
								v-model="item.nums"
								:min="1"
								:max="item.product.stock"
								@change="onChange(item.product.id,item.nums)"
								theme="round"
								button-size="22"
								disable-input
							/>
						</template>
						<!--商品描述-->
						<template #desc>
							<span>商品单价：￥{{ item.price }}</span>
						</template>
					</van-card>
					<template #right>
						<van-button square text="删除" type="danger" class="delete-button"
									@click="onDelete(item.product.id)"/>
					</template>
				</van-swipe-cell>
			</van-checkbox-group>
		</van-list>
	</van-pull-refresh>

	<van-submit-bar :price="totalPrice" :class="action ? '':'submit-bar'" button-text="提交订单" @submit="onSubmit">
		<van-checkbox v-model="checked" @click="onCheckAll">全选</van-checkbox>
	</van-submit-bar>

	<Footer v-if="!action"/>
</template>

<style>
.submit-bar {
	bottom: 50px;
}

.bar {
	bottom: 55px;
}

.goods-card {
	margin: 0;
	background-color: #fff;
}

.delete-button {
	height: 100%;
}

.van-card__thumb {
	display: flex;
	width: auto;
}

.van-card__thumb img {
	width: 88px;
	margin-left: 5px;
}
</style>