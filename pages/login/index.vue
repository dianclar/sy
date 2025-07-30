<template>
	<view>
		<button @click="login">login</button>
		<navigator url="/pages/login/phone">phone</navigator>
	</view>
</template>

<script>
	import { data } from "../../uni_modules/uview-ui/libs/mixin/mixin"
import{loginByWechat,register}from "@/pages/login/index"
	export default{
		methods:{
			login(){
				uni.getUserProfile({//获取用户信息
					desc:"xmmn",
					success(user){
						uni.login({//获取用户登录凭证
							success(login) {
								loginByWechat(login).then(res=>{//传递给后端接口
									if(res.code==60003){//没有注册
										register({//请求注册接口
											unionId:res.data.unionId,
											openId:res.data.openId,
											sessionKey:res.data.sessionKey,
											signature:user.signature,
											rawData:user.rawData,
											encryptedData:user.encryptedData,
											iv:user.iv
										}).then(data=>{
											uni.setStorage({//储存token
												key:"token",
												data:data.data.token
											})
											if(!data.data.member.mobile){//绑定手机
												uni.showModal({//弹窗
													title:"绑定手机",
													content:"根据国家规定，请您绑定手机",
													confirmText:"去绑定",
													success(phone){
														if(phone.confirm){//确定
															uni.navigateTo({
																url:"/pages/login/phone"
															})
														}
													}
												})
											}
										})
									}
								})
							}
						})
					}
				})
			}
		}
	}
</script>

<style>
</style>