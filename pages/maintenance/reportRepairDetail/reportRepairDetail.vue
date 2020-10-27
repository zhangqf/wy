<template>
	<view class="content">
		<uni-card v-for="(item,index) in list" :title="item.userName" note="true" :extra="item.createtime">
			<view class="ui-item">联系电话: <span class="ui-span">{{item.userTel}}</span></view>
			<view class="ui-item">报修类型: <span class="ui-span">{{item.warrName}}</span></view>
			<view class="ui-item">报修项目: <span class="ui-span">{{item.repairName}}</span></view>
			<view v-if="item.content" class="ui-item">报修描述: <span class="ui-span">{{item.content}}</span></view>
			<view class="ui-item" v-if="item.myimgList">故障图片: </view>
			<view class="ui-item ui-display">
				<image v-if="item.myimgList" v-for="(itemImg,index) in item.myimgList" :key="index" :src="host+''+itemImg" mode="aspectFill "></image>
			</view>
			<view class="cell_dashed">
			</view>
			<view class="ui-item" v-if="item.maintName">接单人: <span class="ui-span">{{item.maintName}}</span></view>
			<view class="ui-item" v-if="item.recetime">维修时间: <span class="ui-span">{{item.recetime}}</span></view>
			<view class="ui-item" v-if="item.maintTel">联系电话: <span class="ui-span">{{item.maintTel}}</span></view>
			<view v-if="item.receivetext" class="ui-item">维修描述: <span class="ui-span">{{item.receivetext}}</span></view>
			<view class="ui-item" v-if="item.myokimg">维修图片: </view>
			<view class="ui-item ui-display">
				<image v-if="itemImg" v-for="(itemImg,index) in item.myokimg" :key="index" :src="host+''+itemImg" mode="aspectFill "></image>
			</view>
			<template v-slot:footer>
				<view class="footer-box">
					<uni-tag v-if="item.state==1" text="待接单" type="primary" :inverted="true" size="small"></uni-tag>
					<uni-tag v-if="item.state==2" text="已接单" type="error" :inverted="true" size="small"></uni-tag>
					<uni-tag v-if="item.state==3" text="待评价" type="warning" :inverted="true" size="small"></uni-tag>
					<uni-tag v-if="item.state==4" text="已完成" type="success" :inverted="true" size="small"></uni-tag>
				</view>
			</template>
		</uni-card>
		<view v-if="item.state==3" class="ui-comment">
			<view class="cell_dashed">
			</view>
			<view class="ui-item">评价</view>

			<textarea v-model="remark" placeholder="对维修人员的工作评价" />
			<view  class="ui-item">满意度</view>
			<uni-rate :margin="20" class="ui-rate" v-model="value" @change="onChange"/>
		 <button class="primary" @click="submit">提交</button>
	</view>
	<view v-if="item.state==4" class="ui-ratecontent">
		<view  class="cell_dashed">
		</view>
		<view  class="ui-item">评价：</view>
		<textarea v-model="item.evaluatetext" placeholder="" :disabled="true" />
		<view  class="ui-item ui-state4">满意度</view>
		<uni-rate :margin="20" class="ui-rate" v-model="item.satisid" @change="onChange" :readonly="true"/>
	</view>
	</view>
</template>

<script>
	import fuckTextarea from '@/components/fuck-textarea/fuck-textarea.vue'
	import uniCard from '@/components/uni-card/uni-card.vue'
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	export default {
		components: {uniCard,uniRate,fuckTextarea},
		data() {
			return {
				list:null,
				host:null,
				remark:null,
				rate:null,
				rateList:null
			};
		},
		onLoad(options) {
			console.log(options)
			let Obj = {
				currPage:1,
				toatlNum:100,
			};
			
			this.$api.getOrderByManager(Obj).then(res=>{
				console.log(res)
				uni.hideLoading();
				this.list = res.data
				this.host = this.$Host
				if(res.data.repimgs!=null){
					this.list['myimgList'] = this.list.repimgs.split(",")
				}
				console.log(12)
				if(this.list.okimgs!=null){
					this.list['myokimg'] = this.list.okimgs.split(",")
				}
			});
			this.$api.getSatis().then(res=>{
				uni.hideLoading();
				this.rateList = res.data;
			})
		},
		methods:{
			submit(){
				if(this.rate==null){
					wx.showToast({
						title: "请为维修员评分",
						icon: 'none',
						duration: 2000
					});
					return
				}		
				
				let obj = {
					orderId:Number(this.list.id),
					remark:this.remark,
					satisId:this.rate
				};
				console.log("bb")
				this.$api.saveSatis(obj).then(res=>{
					console.log(res)
					if(res.code==200){
						uni.redirectTo({
							url:`../myRepair/myRepair?id=${uni.getStorageSync("clientmessageid")}`
						})
					}
				})
			},
			onChange(e){
				this.rate = e.value;
			}
		}
	}
</script>

<style lang="less" scoped>
	.footer-box{
		    width: 155rpx;
		    float: right;
	}
	.ui-state4{
		display: inline-block;
		margin-top: 20rpx;
	}
	.ui-ratecontent{
		width: 100%;
		background: #FFF;
		margin-bottom: 150rpx;
		padding: 20px;
		box-sizing: border-box;
		.ui-rate{
			display: inline-block;
				margin-top: 20rpx;
		}
	}
	.ui-rate{
		width: 80%;
		margin: 20rpx 0 50rpx;
		padding-left: 150rpx;
		display: block;
	}
	button.primary {
		width: 80%;
		
		margin: 20rpx auto;
		background-color: #143270;
		color: #fff;
	}
	
	button.primary:hover {
		background: #143270;
	}
	.ui-comment{
		width: 100%;
		background: #FFF;
		margin-bottom: 150rpx;
		.ui-item{
			width: 90%;
			margin: 0 auto;
		}
	}
	textarea{
		border: 1px solid #d9d9d9;
		width: 644rpx;
		margin:12rpx auto;
		padding:16rpx;
		border-radius: 12rpx;
	}
	.cell_dashed{
		height: 2rpx;
	  border-bottom:1px dashed #ccc;
	}
	
.ui-display{
		display: flex;
		image{
			width: 25%;
			padding: 0 8rpx;
			height: 155rpx;
		}
	}
	.uni-tag {
		float: right;
		width: 16%;
		text-align: right;
	}
	.ui-span{
		margin-left: 20rpx;
	}
	.ui-item{
		padding: 10rpx 0;
	}
</style>
