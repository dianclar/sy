<template>
	<view>
		<!-- 长列表 -->
		<view :style="{ height:iheigth * all.length + 'px'}" class="list">
			<!-- 可视区域 -->
			<view class="listi" :style="{top:top + 'px'}">
				<!-- 循环渲染 -->
				<view v-for="item in show" :key="item.id" :style="{height:iheigth+'px'}">
					<image :src="item.skus[0].resources[0].resPath" class="bgimg"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import{page}from"@/utils/api/goods.js"
	export default{
		data(){
			return{
				all:[],//所有数据
				show:[],//显示数据
				iheigth:"",//数据高度
				num:3,//预加载数
				top:"",//偏移量
				scroll:"",//滚动距离
				starti:"",//截取开始
				endi:"",//截取结束
				current: 1,//请求次数
				Time:""//节流防抖
			}
		},
		onLoad() {
			this.getData()
			this.iheigth=uni.getSystemInfoSync().windowHeight//获取窗口高度
		},
		onPageScroll(e) {
			this.scroll = e.scrollTop
			this.getShow()//显示数据
			//防抖
			// if(this.scroll >= this.iheigth * this.all.length * 0.8){
			// 	clearTimeout(this.Time) 
			// 	this.Time = setTimeout(()=>{
			// 		this.current++
			// 		this.getData()
			// 	},390)
			//节流
			if(this.scroll >= this.iheigth * this.all.length * 0.8){
				var now = Date.now()
				if(now-this.Time>=390){
					this.current++
					this.getData()
					this.Time = now
				}
			}
		},
		methods:{
			getData(){
				page({//请求后端首页数据接口
				    current: this.current,
				    size: 39
				}).then((data)=>{
					//冻结、往后添加、转换数据
					this.all = Object.freeze(this.all.concat(this.convert(data.data.records)))
					this.getShow()//显示数据
				})
			},
			convert(record){//转换数据
				record.forEach(item=>{
					(item.skus).forEach(skusi=>{
						skusi.resources=JSON.parse(skusi.resources)
					})
				})
				return record
			},
			getShow(){//计算显示数据
				this.starti=Math.floor(this.scroll/this.iheigth) 
				this.endi=this.starti+this.num
				this.show = this.all.slice(this.starti,this.endi)
				this.top = this.starti * this.iheigth
			}
		}
	}
</script>

<style>
	.list{
		position: relative;
	}
	.listi{
		position: absolute;
		width: 100%;
	}
	.bgimg{
		height: 100%;
		width: 100%;
	}
</style>