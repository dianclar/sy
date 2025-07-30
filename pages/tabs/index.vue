<template>
	<view>
		<!-- 页面滑块 -->
		<swiper
		:style="{height:iheight+'px',width:'100%'}"
		vertical
		@change="swiperChange"
		:circular="onoff">
			<!-- 滑块项 -->
			<swiper-item
			:style="{height:iheight+'px'}"
			v-for="(item,index) in swiper"
			:key="index">
			<!-- 项内容 -->
				<image
				:src="item.skus[0].resources[0].resPath"
				:style="{height:iheight+'px',width:'100%'}"
				@click="()=>{
					show=true
					this.item=item
					setTitle()
				}"></image>
			</swiper-item>
		</swiper>
		<!-- 弹出信息页 -->
		<u-popup
		:show="show"
		mode="bottom"
		@close="show=false
			this.item.title='首页'
			setTitle()">
			<!-- 弹出内容 -->
			<view style="text-align: center;">
				<image :src="item.skus[0].resources[0].resPath"></image>
				<view>{{item.title}}</view>
				<u-button text="分享" open-type="share"></u-button>
				<u-button text="收藏"></u-button>
				<view>${{item.skus[0].originalPrice}}</view>
				<u-button text="购买"></u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import swiper from "../../uni_modules/uview-ui/libs/config/props/swiper";
	import{page}from"@/utils/api/goods.js"
	export default{
		data(){
			return{
				all:[],//全部数据
				swiper:[],//显示数据
				current: 1,//请求次数
				iheight:"",//项高
				icurrent: 0,//浏览位置记录
				scurrent:0,//滑块位置纪录
				onoff:false,//是否循环
				show:false,//弹出
				item:""
			}
		},
		onLoad() {
			this.getData()
			this.iheight = uni.getSystemInfoSync().windowHeight//屏幕高度
		},
		methods:{
			getData(){
				page({//请求后端首页数据接口
				    current: this.current,
				    size: 39
				}).then(res=>{
					//冻结、往后添加、转换数据
					this.all = Object.freeze(this.all.concat(this.convert(res.data.records)))
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
			getShow(){//更新显示项
				this.swiper[this.scurrent] = this.all[this.icurrent]//当前项
				this.swiper[this.sc(this.scurrent+1)] = this.all[this.icurrent+1]//下一项
				this.swiper[this.sc(this.scurrent+2)] = this.all[this.icurrent-1]//最后一项（上一项）
			},
			swiperChange(e){//每次滑动执行
				if(this.sc(this.scurrent+1)==e.detail.current){//判断滑动方向
					this.icurrent++//往下浏览
				}else{
					this.icurrent--//往上浏览
				}
				this.scurrent=e.detail.current//记录当前位置
				this.getShow()//更新显示项
				if(this.icurrent>=this.all.length*0.8){//浏览80%重新请求数据
					this.current++//记录请求次数
					this.getData()
				}else if(this.icurrent>0){//上一项为最后一项
					this.onoff=true
				}else{//开始时禁止上拉
					this.onoff=false
				}
			},
			sc(num){//位置下标为012012...循环
				if(num==3){
					return 0
				}else if(num==4){
					return 1
				}else{
					return num
				}
			},
			setTitle(){
				uni.setNavigationBarTitle({//设置标题
					title:this.item.title
				})
			}
		}
	}
</script>

<style>

</style>