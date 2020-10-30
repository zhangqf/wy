<template>
	<view class="content" v-if="isloading">
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
			<view class="ui-item" style="width: 90%">评价</view>
			<textarea v-model="remark" placeholder="对维修人员的工作评价" />
			<view class="rate-box">
				<view  class="ui-item">服务态度</view>
				<uni-rate :margin="20" class="ui-rate" v-model="serviceSro" @change="onChangeserviceSro"/>
			</view>
			<view class="rate-box">
				<view  class="ui-item ">专业技术</view>
				<uni-rate :margin="20" class="ui-rate" v-model="professionalSro" @change="onChangeprofessionalSro"/>
			</view>
			
			<view class="rate-box">
				<view  class="ui-item ">维修效率</view>
				<uni-rate :margin="20" class="ui-rate" v-model="maintenanceSro" @change="onChangemaintenanceSro"/>
			</view>
		
			<view class="rate-box">
				<view  class="ui-item ">综合评价</view>
				<uni-rate :margin="20" class="ui-rate" v-model="comprehensiveSro" :readonly="true"/>
			</view>
	
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
				serviceSro:null,
				professionalSro:null,
				maintenanceSro:null,
				comprehensiveSro:null,
				isloading:false,
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
				this.isloading = true
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
				// if(this.rate==null){
				// 	wx.showToast({
				// 		title: "请为维修员评分",
				// 		icon: 'none',
				// 		duration: 2000
				// 	});
				// 	return
				// }		
				if(this.remark==null){
					wx.showToast({
						title: "请填写评价",
						icon: 'none',
						duration: 2000
					});
					return
				}	
				if(this.serviceSro==null){
					wx.showToast({
						title: "请为维修员服务态度评分",
						icon: 'none',
						duration: 2000
					});
					return
				}	
				if(this.professionalSro==null){
					wx.showToast({
						title: "请为维修员专业技术评分",
						icon: 'none',
						duration: 2000
					});
					return
				}	
				if(this.maintenanceSro==null){
					wx.showToast({
						title: "请为维修员维修效率评分",
						icon: 'none',
						duration: 2000
					});
					return
				}	
				
				let obj = {
					orderId:Number(this.list.id),
					remark:this.remark,
					satisId:this.comprehensiveSro,
					serviceSro:this.serviceSro,
					professionalSro:this.professionalSro,
					maintenanceSro:this.maintenanceSro,
					comprehensiveSro:this.comprehensiveSro,
					maintid:this.list.maintid
				};
				this.$api.saveSatis(obj).then(res=>{
					console.log(res)
					if(res.code==200){
						uni.redirectTo({
							url:`../myRepair/myRepair?id=${uni.getStorageSync("clientmessageid")}`
						})
					}
				})
			},
			// 四舍五入 向下向上取整
			floorOrceil(num){
				return String(num).substring(String(num).indexOf('.')+1,String(num).indexOf('.')+2)>=5?Math.ceil(num):Math.floor(num)
			},
			onChangeserviceSro(e){
				this.serviceSro = e.value
				this.professionalSro==null?0:this.professionalSro
				this.maintenanceSro==null?0:this.maintenanceSro
				this.comprehensiveSro =this.floorOrceil((this.serviceSro +  this.professionalSro +this.maintenanceSro)/15*5)
					
			},
			onChangeprofessionalSro(e){
				this.professionalSro = e.value
				this.serviceSro==null?0:this.serviceSro
				this.maintenanceSro==null?0:this.maintenanceSro
				this.comprehensiveSro = this.floorOrceil((this.serviceSro +  this.professionalSro +this.maintenanceSro)/15*5)
				
					
			},
			onChangemaintenanceSro(e){
				this.maintenanceSro = e.value
				this.serviceSro==null?0:this.serviceSro
				this.maintenanceSro==null?0:this.maintenanceSro
				this.comprehensiveSro = this.floorOrceil((this.serviceSro +  this.professionalSro +this.maintenanceSro)/15*5)
	
			},
			onChange(e){
				this.rate = e.value;
				this.serviceSro = e.serviceSro==undefined?0:e.serviceSro;
				
				this.professionalSro = e.professionalSro==undefined?0:e.professionalSro;
				
				this.maintenanceSro = e.maintenanceSro==undefined?0:e.maintenanceSro;
				
		
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
		margin: 20rpx 0 50rpx;
		display: inline-block;
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
.rate-box{
	width: 90%;
	margin: 0 auto;
	.ui-item{
		display: inline-block;
		margin-right: 18rpx;
		width: 128rpx;
	}
	.ui-rate{
		vertical-align: -4px;
	}
}
</style>
