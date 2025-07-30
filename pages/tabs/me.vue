<template>
	<view class="me">
		<view class="me-bg" @click="login">
			<image src="/static/logo.png" class="me-img"></image>
			<view class="me-text">登录</view>
		</view>
		<view @click="sy">sy</view>
	</view>
</template>

<script>
	export default{
		methods:{
			login(){
				uni.navigateTo({
					url:"/pages/login/index"
				})
			},
			sy(){
				uni.navigateTo({
					url:"/pages/tabs/new_file"
				})
			}
		}
	}
</script>

<style>
	.me{

	}
	.me-bg{
		display: flex;
		align-items: center;
		width: 750rpx;
		height: 281rpx;
		border: 1px solid #707070;
		background:url("/static/logo.png")no-repeat;
		background-size: 100%;
	}
	.me-img{
		width: 141rpx;
		height: 141rpx;
		border-radius: 50%;
		background-color: #fff;
	}
</style>