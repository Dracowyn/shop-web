<template>
	<div class="limiter">
		<div class="container-login100" style="background-image: url('/assets/images/img-01.jpg');">
			<div class="wrap-login100 p-t-190 p-b-30">
				<van-form class="login100-form validate-form" @submit="onLogin">
					<div class="login100-form-avatar">
						<img src="/assets/images/avatar-01.jpg" alt="AVATAR">
					</div>

					<span class="login100-form-title p-t-20 p-b-45">Hello</span>

					<div class="wrap-input100 validate-input m-b-10" data-validate="请输入手机号">
						<input class="input100" type="text" v-model="mobile" placeholder="手机号" autocomplete="off">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
                            <i class="fa fa-user"></i>
                        </span>
					</div>

					<div class="wrap-input100 validate-input m-b-10" data-validate="请输入密码">
						<input class="input100" type="password" v-model="password" placeholder="密码">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
                            <i class="fa fa-lock"></i>
                        </span>
					</div>

					<div class="container-login100-form-btn p-t-10">
						<button class="login100-form-btn">注 册</button>
					</div>

					<div class="text-center w-full p-t-25">
						<router-link class="txt1" to="/business/base/register">
							立即注册
							<i class="fa fa-long-arrow-right"></i>
						</router-link>
					</div>
				</van-form>
			</div>
		</div>
	</div>
</template>
<script setup>
import {ref} from 'vue';

// 定义变量
const mobile = ref('');
const password = ref('');

// 登录事件
const onLogin = () => {

}
</script>

<style>
@import url('/assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css');
@import url('/assets/css/util.css');
@import url('/assets/css/main.css');
</style>