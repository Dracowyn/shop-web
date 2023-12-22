<script setup>
import {getCurrentInstance, ref, reactive, onMounted, computed} from 'vue';

const {proxy} = getCurrentInstance();
const business = reactive(proxy.$cookies.get('business') ? proxy.$cookies.get('business') : {});

const cartIds = ref(proxy.$route.query.cartids ? proxy.$route.query.cartids : 0);
const proId = ref(proxy.$route.query.proid ? proxy.$route.query.proid : 0);
let action = proxy.$route.query.action ? proxy.$route.query.action : '';

const addressInfo = ref(proxy.$cookies.get('address') ? proxy.$cookies.get('address') : {});
const cartList = ref([]);
const content = ref();

onMounted(() => {
	if (JSON.stringify(addressInfo.value) === '{}') {
		getAddressDefault();
	}
	if (action === 'buy') {
		getProductData();
	} else {
		getCartData();
	}
})

// 获取数据方法
const getCartData = async () => {
	let data = {
		busid: business.id,
		cartids: cartIds.value,
	}

	let result = await proxy.$api.CartInfo(data);

	if (result.code === 1) {
		cartList.value = result.data;
	} else {
		proxy.$showNotify({
			type: 'warning',
			message: result.msg,
			duration: 1500,
			onClose: () => {
				proxy.$router.back();
			}
		})
	}
}

// 获取单个商品数据
const getProductData = async () => {
	let data = {
		proid: proId.value,
		busid: business.id,
	}

	let result = await proxy.$api.ProductInfo(data);

	if (result.code === 1) {
		cartList.value = [{
			id: result.data.id,
			nums: 1,
			price: result.data.price,
			total: result.data.price,
			product: result.data,
		}];
	}
}

const getAddressDefault = async () => {
	let data = {
		busid: business.id,
	}

	let result = await proxy.$api.AddressDefault(data);

	if (result.code === 1) {
		addressInfo.value = result.data;
	}
}

const total = computed(() => {
	let total = 0;
	if (cartList.value.length > 0) {
		for (let item of cartList.value) {
			total += parseFloat(item.total);
		}
	}
	return total * 100;
})

const toAddress = () => {
	proxy.$router.push({
		path: '/business/address/index',
		query: {
			action: 'order'
		}
	});
}

const onSubmit = () => {
	proxy.$showConfirmDialog({
		title: '提示',
		message: '确定提交订单吗？',
	}).then(() => {
		if (action === 'buy') {
			let data = {
				proid: proId.value,
				busid: business.id,
				addressid: addressInfo.value.id,
				content: content.value,
				nums: 1,
			}
			submitOrder(data);
		} else {
			let data = {
				busid: business.id,
				cartids: cartIds.value,
				addressid: addressInfo.value.id,
				content: content.value,
			}
			submitOrder(data);
		}
		async function submitOrder(data) {
			let result = await proxy.$api.OrderCreate(data);

			if (result.code === 1) {
				proxy.$showNotify({
					type: 'success',
					message: result.msg,
					duration: 1500,
					onClose: () => {
						proxy.$cookies.remove('address');
						proxy.$router.push('/business/base/order')
					}
				})
			} else {
				proxy.$showNotify({
					type: 'warning',
					message: result.msg,
					duration: 1500,
				});
			}
		}
	}).catch(() => {
	});
}

const onBack = () => {
	proxy.$cookies.remove('address');
	proxy.$router.back();
}

</script>

<template>
	<van-sticky z-index="100">
		<van-nav-bar title="确认订单" left-text="返回" left-arrow @click-left="onBack"/>
	</van-sticky>

	<van-contact-card type="add" @click="toAddress" v-if="JSON.stringify(addressInfo) === '{}'"/>
	<van-contact-card type="edit" :tel="addressInfo.mobile" :name="addressInfo.consignee" @click="toAddress" v-else/>

	<van-card
		v-for="item in cartList"
		:key="item.id"
		:num="item.nums"
		:price="item.total"
		:title="item.product.name"
		:thumb="item.product.thumb_cdn"
	>
		<template #desc>
			￥ {{ item.price }}
		</template>
	</van-card>

	<van-cell-group>
		<van-field
			v-model="content"
			label="订单备注"
			type="textarea"
			rows="5"
			placeholder="请输入订单备注"
			label-width="4.5em"
			maxlength="100"
			autosize
			show-word-limit
			colon
		/>
	</van-cell-group>

	<van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit"/>
</template>

<style>

</style>