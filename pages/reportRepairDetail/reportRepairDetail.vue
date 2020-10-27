<template>
	<view class="content">
		<uni-steps class="ui-step" :options="[{title: '待接单'}, {title: '已接单'}, {title: '待评价'}, {title: '已完成'}]" :active="list.state-1"></uni-steps>
		<uni-card :title="list.userName" note="true" :extra="list.createtime">
			<view class="ui-item">联系电话: <span class="ui-span">{{list.userTel}}</span></view>
			<view class="ui-item">报修住址: <span class="ui-span">{{list.buildName}}{{list.loucName}}层{{list.roomName}}室</span></view>
			<view class="ui-item">报修类型: <span class="ui-span">{{list.warrName}}</span></view>
			<view class="ui-item">报修项目: <span class="ui-span">{{list.repairName}}</span></view>
			
			<view v-if="list.content" class="ui-item">报修描述: <span class="ui-span">{{list.content}}</span></view>
			<view class="ui-item" v-if="list.myimgList">故障图片: </view>
			<view class="ui-item ui-display">
				<image @click="preview(itemImg)" v-if="list.myimgList" v-for="(itemImg,index) in list.myimgList" :key="index" :src="host+''+itemImg"
				 mode="aspectFill "></image>
			</view>
			<view class="cell_dashed">
			</view>
			<view class="ui-item" v-if="list.maintName">接单人: <span class="ui-span">{{list.maintName}}</span></view>
			<view class="ui-item" v-if="list.recetime">维修时间: <span class="ui-span">{{list.recetime}}</span></view>
			<view class="ui-item" v-if="list.maintTel">联系电话: <span class="ui-span">{{list.maintTel}}</span></view>
			<view v-if="list.receivetext" class="ui-item">维修描述: <span class="ui-span">{{list.receivetext}}</span></view>
			<view class="ui-item" v-if="list.myokimg">维修图片: </view>
			<view class="ui-item ui-display">
				<image @click="preview(itemImg)" v-if="itemImg" v-for="(itemImg,index) in list.myokimg" :key="index" :src="host+''+itemImg"
				 mode="aspectFill "></image>
			</view>
			<template v-slot:footer>
				<view class="footer-box">
					<uni-tag class="ui-tagborder" v-if="list.state==1" text="待接单" type="primary" :inverted="true" size="small"></uni-tag>
					<uni-tag class="ui-tagborder" v-if="list.state==2" text="已接单" type="error" :inverted="true" size="small"></uni-tag>
					<uni-tag class="ui-tagborder" v-if="list.state==3" text="待评价" type="warning" :inverted="true" size="small"></uni-tag>
					<uni-tag class="ui-tagborder" v-if="list.state==4" text="已完成" type="success" :inverted="true" size="small"></uni-tag>
				</view>
			</template>
		</uni-card>
		<view v-if="list.state==3" class="ui-comment">
			<view class="cell_dashed">
			</view>
			<view class="ui-item">评价</view>
			<textarea v-model="remark" placeholder="对维修人员的工作评价" />
			<view  class="ui-item">满意度</view>
			<uni-rate :margin="20" class="ui-rate" v-model="value" @change="onChange"/>
		 <button class="primary" @click="submit">提交</button>
	</view>
	<view v-if="list.state==4" class="ui-ratecontent">
		<view  class="cell_dashed">
		</view>
		<view  class="ui-item">评价：</view>
		<textarea v-model="list.evaluatetext" placeholder="" :disabled="true" />
		<view  class="ui-item ui-state4">满意度</view>
		<uni-rate :margin="20" class="ui-rate" v-model="list.satisid" @change="onChange" :readonly="true"/>
	</view>
	</view>
</template>

<script>

	import fuckTextarea from '../../components/fuck-textarea/fuck-textarea.vue'
	import uniCard from '../../components/uni-card/uni-card.vue'
	import uniRate from '../../components/uni-rate/uni-rate.vue'
	import uniSteps from '../../components/uni-steps/uni-steps.vue'
	export default {
		
		data() {
			return {
				list:{},
				host:null,
				remark:null,
				rate:null,
				rateList:null,
			
			};
		},
		components: {
			uniCard,
			uniRate,
			fuckTextarea,
			uniSteps
		},
		onLoad(options) {
			console.log(options)
			let Obj = {
				id:options.id
			};
			
			this.$api.getOrderById(Obj).then(res=>{
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
			preview(data){
								let images=[];
								images.push(this.$Host+''+data)
				        uni.previewImage({
				            urls: images,
				            longPressActions: {
				                itemList: ['发送给朋友', '保存图片', '收藏'],
				                success: function(data) {
				                    console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
				                },
				                fail: function(err) {
				                    console.log(err.errMsg);
				                }
				            }
				        });
				   
				
			},
			
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
	.ui-step{
		padding: 20rpx 0;
		margin-top: 20rpx;
		display: block;
	}
	.uni-card{
		flex:none
	}
	.footer-box{
		    width: 18%;
		    float: right;
				.ui-tagborder{
					width: 100%;
					border: none;
					font-weight: 700;
					font-size: 24px;
				}
	}
	.ui-state4{
		display: inline-block;
		margin-top: 40rpx;
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
