<template>
	<view>
		phone
		<input type="number" placeholder="phone" v-model="form.phone">
		<input type="text" placeholder="验证码" v-model="form.code"/>
		<button @click="code">{{yzm}}</button>
		<button @click="yes">提交</button>
	</view>
</template>

<script>
	import{sendRegisterOrLoginCaptcha,loginByMobile}from"@/utils/api/login"
	import {encrypt} from "@/utils/aes"
	export default{
		data(){
			return{
				form:{
					phone:"",
					code:""
				},
				yzm:"验证码",
				time:10
			}
		},
		methods:{
			code(){
				var thar = this;
				//定义手机号格式
				var reg = /^1[3-9]\d{9}$/
				if(reg.test(this.form.phone)){//校验手机号格式
					sendRegisterOrLoginCaptcha({//请求后端验证码接口
						mobile:encrypt(this.form.phone)//使用res加密
					}).then(data=>{
						if(data.code == "200"){//成功
							uni.showToast({//提示
								title:"已发送",
								icon:"none"
							});
							var times = setInterval(()=>{//显示倒计时
								if(thar.time==0){
									clearInterval(times);
									thar.yzm="验证码";
									thar.time=60//恢复倒计时
								}else{
									thar.yzm=thar.time
									thar.time--
								}
							},1000)
						}else{
							uni.showToast({//提示
								title:"发送失败",
								icon:"none"
							})
						}
					})
				}else{
					uni.showToast({//提示
						title:"手机号格式错误",
						icon:"none"
					})
				}
			},
			yes(){
				loginByMobile({
					mobile:encrypt(this.form.phone),
					captcha:this.form.code
				}).then(data=>{
					if(data.code == "200"){
						uni.switchTab({
							url:"/pages/tabs/index"
						})
					}
				})
			}
		}
	}
</script>

<style>
</style>