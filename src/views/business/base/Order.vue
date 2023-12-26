<script setup>
import {getCurrentInstance, ref, reactive} from "vue";

const {proxy} = getCurrentInstance()
const business = reactive(proxy.$cookies.get("business") ? proxy.$cookies.get("business") : {})

const list = ref([]);
const page = ref(1);
const limit = ref(10);
const listCount = ref(0);

// 刷新
const refreshing = ref(false);
const loading = ref(false);
const finished = ref(false);

const active = ref("")
const statusList = reactive([
	{
		text: "全部",
		name: "",
	},
	{
		text: "待付款",
		name: 0,
	},
	{
		text: "待发货",
		name: 1,
	},
	{
		text: "待收货",
		name: 2,
	},
	{
		text: "待评价",
		name: 3,
	},
	{
		text: "已完成",
		name: 4,
	},
	{
		text: "售后",
		name: -1,
	},
])

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
		getOrderData();
	}, 1500);
}

// 获取数据方法
const getOrderData = async () => {
	let data = {
		busid: business.id,
		page: page.value,
		limit: limit.value,
		status: active.value
	}

	let result = await proxy.$api.OrderIndex(data);

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

	listCount.value = result.data.count;
	list.value = list.value.concat(result.data.list);

	if (listCount.value === list.value.length) {
		finished.value = true;
		loading.value = false;
	}

}

const onClickTab = () => {
	onRefresh();
}

const onBack = () => {
	proxy.$router.back();
}

const toDetail = (code) => {
	proxy.$router.push({
		path: "/product/order/detail",
		query: {
			orderid: code
		}
	})
}

// 支付订单
const toPay = async (code) => {
	proxy.$showConfirmDialog({
		title: "提示",
		message: "是否确认支付？",
	}).then(async () => {
		let data = {
			busid: business.id,
			orderid: code,
		}

		let result = await proxy.$api.OrderPay(data);

		if (result.code === 0) {
			proxy.$showNotify({
				type: 'warning',
				message: result.msg,
				duration: 1500,
			});
		} else {
			proxy.$showNotify({
				type: 'success',
				message: result.msg,
				duration: 1500,
				onClose: () => {
					toDetail(code);
				}
			});
		}
	}).catch(() => {
	})
}

// 取消订单
const toCancel = async (code) => {
	proxy.$showConfirmDialog({
		title: "提示",
		message: "是否确认取消订单？",
	}).then(async () => {
		let data = {
			busid: business.id,
			orderid: code,
		}

		let result = await proxy.$api.OrderCancel(data);

		if (result.code === 0) {
			proxy.$showNotify({
				type: 'warning',
				message: result.msg,
				duration: 1500,
			});
		} else {
			proxy.$showNotify({
				type: 'success',
				message: result.msg,
				duration: 1500,
				onClose: () => {
					onRefresh();
				}
			});
		}
	}).catch(() => {
	})
}

// 申请退货
const toRejected = async (code) => {
	proxy.$showConfirmDialog({
		title: "提示",
		message: "是否确认申请退货？",
	}).then(async () => {
		proxy.$showConfirmDialog({
			title: "退款方式",
			message: "请选择退款方式，刷新页面取消操作",
			confirmButtonText: "退货退款",
			cancelButtonText: "仅退款",
		}).then(async () => {
			let data = {
				busid: business.id,
				orderid: code,
				type: 2,
			}

			let result = await proxy.$api.OrderRejected(data);

			if (result.code === 0) {
				proxy.$showNotify({
					type: 'warning',
					message: result.msg,
					duration: 1500,
				});
			} else {
				proxy.$showNotify({
					type: 'success',
					message: result.msg,
					duration: 1500,
					onClose: () => {
						onRefresh();
					}
				});
			}
		}).catch(async () => {
			let data = {
				busid: business.id,
				orderid: code,
				type: 1,
			}

			let result = await proxy.$api.OrderRejected(data);

			if (result.code === 0) {
				proxy.$showNotify({
					type: 'warning',
					message: result.msg,
					duration: 1500,
				});
			} else {
				proxy.$showNotify({
					type: 'success',
					message: result.msg,
					duration: 1500,
					onClose: () => {
						onRefresh();
					}
				});
			}
		})

	}).catch(() => {
	})
}

// 确认收货
const toConfirm = async (code) => {
	proxy.$showConfirmDialog({
		title: "提示",
		message: "是否确认收货？",
	}).then(async () => {
		let data = {
			busid: business.id,
			orderid: code,
		}

		let result = await proxy.$api.OrderConfirm(data);

		if (result.code === 0) {
			proxy.$showNotify({
				type: 'warning',
				message: result.msg,
				duration: 1500,
			});
		} else {
			proxy.$showNotify({
				type: 'success',
				message: result.msg,
				duration: 1500,
				onClose: () => {
					onRefresh();
				}
			});
		}
	}).catch(() => {
	})
}

</script>

<template>
	<van-sticky z-index="100">
		<van-nav-bar
			title="我的订单"
			left-text="返回"
			left-arrow
			@click-left="onBack"
		/>
		<van-tabs v-model:active="active" @click-tab="onClickTab">
			<van-tab
				v-for="(item, index) in statusList"
				:key="index"
				:title="item.text"
				:name="item.name"
			/>
		</van-tabs>
	</van-sticky>

	<div class="list-box">
		<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
			<van-list
				v-model:loading="loading"
				:finished="finished"
				finished-text="没有更多了"
				@load="onLoad"
			>
				<div class="list">
					<div class="item" v-for="item in list" :key="item.id">
						<div class="header">
							<div class="left">
								<span>订单号：{{ item.code }}</span>
							</div>
							<div class="right">
								<span>订单状态：{{ item.status_text }}</span>
							</div>
						</div>
						<div class="content">
							<van-card
								v-for="product in item.order_product"
								:key="product.id"
								:num="product.nums"
								:price="product.total"
								:title="product.product.name"
								:thumb="product.product.thumb_cdn"
							>
								<template #desc>
									<span>商品单价：￥{{ product.price }}</span>
								</template>
							</van-card>
						</div>
						<div class="footer">
							<div class="date">下单时间：{{ item.createtime_text }}</div>
							<div class="btn">
								<van-button
									size="mini"
									type="primary"
									@click="toDetail(item.code)"
									text="订单详情"
								/>
								<van-button
									v-if="item.status === '0'"
									size="mini"
									type="success"
									@click="toPay(item.code)"
									text="确认支付"
								/>
								<van-button
									v-if="item.status === '0'"
									size="mini"
									type="warning"
									@click="toCancel(item.code)"
									text="取消订单"
								/>
								<van-button
									v-if="item.status === '3'"
									size="mini"
									type="success"
									@click="toRate(item.code)"
									text="去评价"
								/>
								<van-button
									v-if="item.expresscode"
									size="mini"
									type="warning"
									@click="toExpressPage(item.code)"
									text="物流信息"
								/>
								<van-button
									v-if="item.status === '2'"
									size="mini"
									type="success"
									@click="toConfirm(item.code)"
									text="确认收货"
								/>
								<van-button
									v-if="item.status === '4'"
									size="mini"
									type="success"
									@click="toEvaluationPage(item.code)"
									text="评价详情"
								/>
								<van-button
									v-if="item.status > 0 && item.status !== '4'"
									size="mini"
									type="danger"
									@click="toRejected(item.code)"
									text="申请退货"
								/>
								<van-button
									v-if="item.status === '-3'"
									size="mini"
									type="danger"
									@click="toRefundgoods(item.code)"
									text="待退货"
								/>
								<van-button
									v-if="item.status < 0"
									size="mini"
									type="danger"
									@click="toRefundgoods(item.code)"
									text="退货详情"
								/>
							</div>
						</div>
					</div>
				</div>
			</van-list>
		</van-pull-refresh>
	</div>
</template>

<style>
.list-box {
	background: #ccc;
}

.list-box .header {
	display: flex;
	justify-content: space-between;
	/* padding: 0 10px; */
}

.list .item .left span {
	font-size: 14px;
	font-weight: bold;
}

.item {
	padding: 5px 5px 3px;
	background: #fff;
	margin-bottom: 5px;
}

.item .header .left {
	font-size: 13px;
}

.item .footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
}

.item .footer .date {
	font-weight: bold;
}
</style>