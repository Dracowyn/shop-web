<script setup>
import {getCurrentInstance, ref} from 'vue';
import {areaList} from '@vant/area-data';

const {proxy} = getCurrentInstance();
const business = ref(proxy.$cookies.get('business') ? proxy.$cookies.get('business') : {})
const showRegion = ref(false);
const avatar = ref([
	{
		url: business.value.avatar
	}
]);

// 表单提交
const onSubmit = (value) => {
	console.log(value)
}

const onRegionConfirm = () => {

}

// 返回事件
const onBack = () => {
	proxy.$router.go(-1);
}
</script>
<template>
	<van-sticky z-index="100">
		<van-nav-bar
			title="基本资料"
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

	<div class="form">
		<van-form @submit="onSubmit">
			<!-- 手机号 -->
			<van-field
				v-model="business.mobile"
				name="mobile"
				label="手机号"
				placeholder="手机号"
				readonly
				label-align="right"
				colon
			/>

			<van-field
				v-model="business.nickname"
				name="nickname"
				label="昵称"
				placeholder="昵称"
				:rules="[{ required: true, message: '请填写昵称' }]"
				label-align="right"
				colon
			/>

			<van-field
				v-model="business.email"
				name="email"
				label="邮箱"
				placeholder="邮箱"
				:rules="[{ required: true, message: '请填写邮箱' }]"
				label-align="right"
				colon
			/>

			<van-field
				v-model="business.password"
				type="password"
				name="password"
				label="密码"
				placeholder="密码为空默认不修改"
				label-align="right"
				colon
			/>

			<van-field name="gender" label="性别" label-align="right" colon>
				<template #input>
					<van-radio-group v-model="business.gender" direction="horizontal">
						<van-radio name="0">保密</van-radio>
						<van-radio name="1">男</van-radio>
						<van-radio name="2">女</van-radio>
					</van-radio-group>
				</template>
			</van-field>

			<van-field
				v-model="business.region_text"
				is-link
				readonly
				name="area"
				label="地区选择"
				placeholder="选择省市区"
				@click="showRegion = true"
				label-align="right"
				colon
			/>

			<!-- 弹出层+省市区的组件 -->
			<van-popup v-model:show="showRegion" round position="bottom">
				<van-area
					:area-list="areaList"
					@confirm="onRegionConfirm"
					@cancel="showRegion = false"
				/>
			</van-popup>

			<van-field name="avatar" label="头像" label-align="right" colon>
				<template #input>
					<van-uploader v-model="avatar" :max-count="1"/>
				</template>
			</van-field>

			<div style="margin: 16px;">
				<van-button round block type="primary" native-type="submit">
					提交
				</van-button>
			</div>
		</van-form>

	</div>
</template>
<style>
@import url('/assets/css/profile.css');
</style>