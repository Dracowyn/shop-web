<script setup>
import {ref, getCurrentInstance} from "vue";
import {showNotify} from "vant";
const {proxy} = getCurrentInstance();

let mobile = ref('13800000000');
let password = ref('123456');

// 注册事件
const onRegister = async () => {
	if (!mobile.value.trim()) {
		showNotify({
			type: 'warning',
			message: '请输入手机号',
			duration:1500
		})
		return;
	}

	if (!password.value.trim()) {
		showNotify({
			type: 'warning',
			message: '请输入密码',
			duration:1500
		})
		return;
	}

	// 验证手机号格式
	if (!/^1[3456789]\d{9}$/.test(mobile.value)) {
		showNotify({
			type: 'warning',
			message: '手机号格式不正确',
			duration:1500
		})
		return;
	}

	let data = {
		mobile:mobile.value,
		password:password.value
	}

	// 发起请求
	let result = proxy.$api.register(data);

	if (result.code === 200) {
		showNotify({
			type: 'success',
			message: '注册成功',
			duration:1500
		})
		// 跳转到登录页面
		setTimeout(() => {
			proxy.$router.push('/business/base/login');
		}, 1500);
	} else {
		showNotify({
			type: 'warning',
			message: result.message,
			duration:1500
		})
	}
}

</script>
<template>
	<div class="limiter">
		<div class="container-login100" style="background-image: url('/assets/images/img-01.jpg');">
			<div class="wrap-login100 p-t-190 p-b-30">
				<form class="login100-form validate-form">
					<div class="login100-form-avatar">
						<img src="/assets/images/avatar-01.jpg" alt="AVATAR">
					</div>

					<span class="login100-form-title p-t-20 p-b-45">Hello</span>

					<div class="wrap-input100 validate-input m-b-10" data-validate="请输入用户名">
						<input class="input100" type="text" name="username" placeholder="用户名" autocomplete="off">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
                            <i class="fa fa-user"></i>
                        </span>
					</div>

					<div class="wrap-input100 validate-input m-b-10" data-validate="请输入密码">
						<input class="input100" type="password" name="pass" placeholder="密码">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
                            <i class="fa fa-lock"></i>
                        </span>
					</div>

					<div class="container-login100-form-btn p-t-10">
						<button class="login100-form-btn">注 册</button>
					</div>

					<div class="text-center w-full p-t-25 p-b-230">
						<a href="index.html#" class="txt1">忘记密码？</a>
					</div>

					<div class="text-center w-full">
						<router-link class="txt1" to="/business/base/login">
							立即登录
							<i class="fa fa-long-arrow-right"></i>
						</router-link>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<style>
@import url('/assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css');
@import url('/assets/css/util.css');
@import url('/assets/css/main.css');
</style>