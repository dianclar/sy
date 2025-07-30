<template>
	<view>
		<button @click="a">1</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				lastime:0
			}
		},
		methods:{
			a(){
				var now = Date.now()
				if(now-this.lastime>=1000){
					this.b()
					this.lastime = now
				}
			},
			b(){
				console.log(1)
			}
		},
	}
</script>