<script setup>
import {getCurrentInstance, reactive, ref} from "vue";

const {proxy} = getCurrentInstance();
const business = reactive(proxy.$cookies.get('business') ? proxy.$cookies.get('business') : {});
const verifyCode = ref('');

const onBack = () => {
	proxy.$router.go(-1);
}


// 保存邮箱
const onSubmit = async (info) => {
	let data = {
		busid: business.id,
		email: info.email,
		code: verifyCode.value.trim()
	}

	let result = await proxy.$api.EmailCheck(data);

	if (result.code === 1) {
		proxy.$showNotify({
			type: 'success',
			message: result.msg,
			duration: 1500,
			onClose: () => {
				proxy.$router.go(-1);
			}
		});
	} else {
		proxy.$showNotify({
			type: 'warning',
			message: result.msg,
			duration: 1500
		});
	}
}

// 发送验证码后，倒计时
const time = ref(60 * 1000);
const showBtn = ref(true);
const showTime = ref(false);
const countDownRef = ref(null);
const reSend = ref(false);

// 发送邮件
const sendMail = async () => {
	let data = {
		busid: business.id,
		email: business.email
	}

	let result = await proxy.$api.EmailSend(data);

	if (result.code === 1) {
		proxy.$showNotify({
			type: 'success',
			message: result.msg,
			duration: 1500
		});
		onSend();
	} else {
		proxy.$showNotify({
			type: 'warning',
			message: result.msg,
			duration: 1500
		});
	}
}

const onSend = () => {
	showBtn.value = false;
	showTime.value = true;
	reSend.value = false;
	countDownRef.value.start();
}

const onFinish = () => {
	showTime.value = false;
	reSend.value = true;
}

</script>

<template>
	<van-sticky z-index="100">
		<van-nav-bar
			title="验证邮箱地址"
			left-text="返回"
			left-arrow
			@click-left="onBack"
		/>
	</van-sticky>
	<div class="user">
		<div class="user-image">
			<img :src="business.avatar" alt="">
		</div>
	</div>
	<van-form @submit="onSubmit" class="form">
		<van-cell-group inset>
			<van-field
				v-model="business.email"
				name="email"
				label="邮箱"
				placeholder="邮箱"
				readonly
				:rules="[{ required: true, message: '请填写邮箱' }]"
				label-align="right"
				colon
			/>
			<van-field
				v-model="verifyCode"
				center
				clearable
				label="验证码"
				placeholder="请输入验证码"
				:rules="[{ required: true, message: '请填写验证码' }]"
				label-align="right"
				colon
			>
				<template #button>
					<van-button size="small" type="primary" v-show="showBtn" @click="sendMail">发送验证码
					</van-button>
					<van-button size="small" type="primary" v-show="reSend" @click="sendMail">重新发送</van-button>
					<div id="countDown" v-show="showTime" class="van-button van-button--primary van-button--small">
						<div class="van-button__content">
							重新发送(
							<van-count-down format="ss" :auto-start="false" :time="time"
											style="color: white;font-size: unset;line-height: unset;"
											@finish="onFinish"
											ref="countDownRef"/>
							s)
						</div>
					</div>
				</template>
			</van-field>
		</van-cell-group>
		<div style="margin: 16px;">
			<van-button round block type="primary" native-type="submit">
				提交
			</van-button>
		</div>
	</van-form>
</template>

<style>
@import url('/assets/css/profile.css');
</style>
