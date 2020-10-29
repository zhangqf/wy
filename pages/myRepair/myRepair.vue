<template>
	<view class="content">
		<k-scroll-view v-if="roleType==1" ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip" :loadTip="loadTip"
		 :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height" :bottom="bottom"
		 :autoPullUp="autoPullUp" @onPullDown="handlePullDown" @onPullUp="handleLoadMore">
			<!-- 自定义底部按钮 -->
			<uni-card @click="herfTo(item.id)" :title="item.userName" note="true" v-for="(item,index) in list" :extra="item.createtime | renderTime"
			 :key="item.id">
				<view class="ui-item">联系电话: <span class="ui-span">{{item.userTel}}</span></view>
				<view class="ui-item">报修住址: <span class="ui-span">{{item.buildName}}{{item.loucName}}层{{item.roomName}}室</span></view>
				<view class="ui-item">报修类型: <span class="ui-span">{{item.warrName}}</span></view>
				<view class="ui-item">报修项目: <span class="ui-span">{{item.repairName}}</span></view>
				<view class="ui-item">预约时间: <span class="ui-span">{{item.startTime | renderTime}}</span></view>
				<view class="ui-item">完成时间: <span class="ui-span">{{item.endTime | renderTime}}</span></view>
				<view v-if="item.content" class="ui-item">报修描述: <span class="ui-span">{{item.content}}</span></view>
				<view class="ui-item ui-display">
					<image @click="preview(itemImg)" v-if="itemImg" v-for="(itemImg,indexs) in item.imgList" :key="indexs" :src="host+''+itemImg"
					 mode="aspectFill "></image>
				</view>
				<template v-slot:footer>
					<view class="footer-box">
						<uni-tag class="ui-tagborder" v-if="item.state==1" text="待接单" type="primary" :inverted="true" size="small"></uni-tag>
						<uni-tag class="ui-tagborder" v-if="item.state==2" text="已接单" type="error" :inverted="true" size="small"></uni-tag>
						<uni-tag class="ui-tagborder" v-if="item.state==3" text="待评价" type="warning" :inverted="true" size="small"></uni-tag>
						<uni-tag class="ui-tagborder" v-if="item.state==4" text="已完成" type="success" :inverted="true" size="small"></uni-tag>
					</view>
				</template>
			</uni-card>
		</k-scroll-view>

		<k-scroll-view v-else ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip" :loadTip="loadTip"
		 :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height" :bottom="bottom"
		 :autoPullUp="autoPullUp" @onPullDown="handlePullDowns" @onPullUp="handleLoadMores">
			<uni-card class="ui-card manageCard" note="true" v-for="(item,indexq) in list" key="item.id" :extra="item.createtime | renderTime"
			 :key="item.id">
				<view class="ui-item">报修人: <span class="ui-span">{{item.userName}}</span></view>
				<view class="ui-item">报修日期: <span class="ui-span">{{item.createtime | renderTime}}</span></view>
				<view class="ui-item">报修住址: <span class="ui-span">{{item.buildName}}{{item.loucName}}层{{item.roomName}}室</span></view>

				<view class="ui-item">联系电话: <span class="ui-span">{{item.userTel}}</span></view>
				<view class="ui-item">报修类型: <span class="ui-span">{{item.warrName }}</span></view>
				<view class="ui-item">报修项目: <span class="ui-span">{{item.repairName}}</span></view>
				<view v-if="item.content" class="ui-item">报修描述: <span class="ui-span">{{item.content}}</span></view>
				<view class="ui-item ui-display">
					<image @click="preview(itemImg)" v-if="itemImg" v-for="(itemImg,indexss) in item.imgList" :key="indexss" :src="host+''+itemImg"
					 mode="aspectFill "></image>
				</view>
				<view class="cell_dashed">
				</view>
				<view class="ui-item" v-if="item.maintName">接单人: <span class="ui-span">{{item.maintName}}</span></view>
				<view class="ui-item" v-if="item.recetime">维修时间: <span class="ui-span">{{item.recetime | renderTime}}</span></view>
				<view class="ui-item" v-if="item.maintTel">联系电话: <span class="ui-span">{{item.maintTel}}</span></view>
				<view v-if="item.receivetext" class="ui-item">维修描述: <span class="ui-span">{{item.receivetext}}</span></view>
				<view class="ui-item" v-if="item.myokimg">维修图片: </view>
				<view class="ui-item ui-display">
					<image v-if="itemImg" v-for="(itemImg,index) in item.myokimg" :key="index" :src="host+''+itemImg" mode="aspectFill "></image>
				</view>
				<template v-slot:footer>
					<view class="footer-boxs">
						<view style="display: inline-block; margin-right: 12rpx;">状态：</view>
						<uni-tag style="display: inline-block;" class="ui-tagborder" v-if="item.state==1" text="待接单" type="primary"
						 :inverted="true" size="small"></uni-tag>
						<uni-tag style="display: inline-block;" class="ui-tagborder" v-if="item.state==2" text="已接单" type="error"
						 :inverted="true" size="small"></uni-tag>
						<uni-tag style="display: inline-block;" class="ui-tagborder" v-if="item.state==3" text="待评价" type="warning"
						 :inverted="true" size="small"></uni-tag>
						<uni-tag style="display: inline-block;" class="ui-tagborder" v-if="item.state==4" text="已完成" type="success"
						 :inverted="true" size="small"></uni-tag>
					</view>
				</template>
				<!-- <view v-if="item.state==3" class="ui-comment">
					<view class="cell_dashed">
					</view>
					<view class="ui-item">评价</view>
					<textarea v-model="remark" placeholder="对维修人员的工作评价" />
					<view  class="ui-item">满意度</view>
					<uni-rate :margin="20" class="ui-rate" v-model="value" @change="onChange"/>
				 <button class="primary" @click="submit">提交</button>
			</view> -->
				<view v-if="item.state==4" class="ui-ratecontent">
					<view class="cell_dashed">
					</view>
					<view class="ui-item">评价：</view>
					<textarea v-model="item.evaluatetext" placeholder="" :disabled="true" />
					<view>
						<view  class="ui-item ui-state4">服务态度</view>
						<uni-rate :margin="20" class="ui-rate ui-state4  ui-leftmargin" :value="item.serviceSro" @change="onChange" :readonly="true"/>
					</view>
				<view>
					<view  class="ui-item ui-state4">专业技术</view>
					<uni-rate :margin="20" class="ui-rate ui-state4 ui-leftmargin" :value="item.professionalSro" @change="onChange" :readonly="true"/>
				</view>
					<view>
						<view  class="ui-item ui-state4">维修效率</view>
						<uni-rate :margin="20" class="ui-rate ui-state4 ui-leftmargin" :value="item.maintenanceSro" @change="onChange" :readonly="true"/>
					</view>
					<view>
						<view  class="ui-item ui-state4">综合评分</view>
						<uni-rate :margin="20" class="ui-rate ui-state4 ui-leftmargin" :value="item.comprehensiveSro" @change="onChange" :readonly="true"/>
					</view>
					
			</view>
		</uni-card>
		 	</k-scroll-view>
	</view>
</template>

<script>
	import kScrollView from '@/components/k-scroll-view/k-scroll-view.vue';
	import uniTag from "../../components/uni-tag/uni-tag.vue"
	import uniCard from '../../components/uni-card/uni-card.vue'
	import uniList from '../../components/uni-list/uni-list.vue'
	import uniListItem from '../../components/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniCard,
			uniList,
			uniListItem,
			uniTag,
			kScrollView
		},
		filters:{
			 renderTime(date) {
					console.log(typeof date)
					if(date){
						let str = date.replace(/-/g, '/').replace('T', ' ').replace('.000+0000', '')
						console.log(new Date(str).toString())
						 var dates = new Date(new Date(str).toString())
						 var y = dates.getFullYear()
						       var m = dates.getMonth() + 1
						       m = m < 10 ? ('0' + m) : m
						       var d = dates.getDate()
						       d = d < 10 ? ('0' + d) : d
									 var h = dates.getHours() + 8
									 h = h < 10 ? ('0' + h) : h
									 var min = dates.getMinutes();
									 min = min < 10 ? ('0' + min) :min
									 var s = dates.getSeconds();
									 s = s < 10 ? ('0' + s) : s;
						       const time = y + '-' + m + '-' + d + '  '+h+":" + min + ':' + s
						       return time
						
					}
			}
		},
		data() {
			return {
				list: [],
				host:null,
				data:null,
				roleType:'',
				refreshType: 'custom',
				refreshTip: '正在下拉',
				loadTip: '获取更多数据',
				loadingTip: '正在加载中...',
				emptyTip: '--我是有底线的--',
				touchHeight: 50,
				height: 0,
				bottom: 50,
				autoPullUp: true,
				stopPullDown:true, 
				currentPage:1,
				totalNum : 5,
				myID:"",
			};
		},
		methods:{
			preview(data) {
				let images = [];
				images.push(this.$Host + '' + data)
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
			herfTo(data){
				console.log(data)
				uni.navigateTo({
					url:`../reportRepairDetail/reportRepairDetail?id=${data}`
				})
			},
			handlePullDown(stopLoad){
				let Obj = {
					id: this.myID,
					currPage: 1,
					toatlNum: this.totalNum,
				}
				this.$api.getOrderByClientId(Obj).then(res => {
					console.log(res)
					 uni.hideLoading();
					 
					let listlast = res.data()
						
					if(listlast.length==0){
						stopLoad ? stopLoad({ isEnd: true }) : '';
						return
					}
					listlast.map((item,index)=>{
						if(item.repimgs){
							item['imgList'] = item.repimgs.split(",")
						}
						
					})
					
					 this.list = listlast
					
				})
				stopLoad ? stopLoad({
					isEnd: false
				}) : '';
			},
			handlePullDowns(stopLoad){
				let Obj = {
					id: this.myID,
					currPage:1,
					toatlNum: this.totalNum,
				}
				this.$api.getOrderByManager(Obj).then(res => {
					console.log(res)
					 uni.hideLoading();
					
					let listlast = res.data.reverse()
					if(listlast.length==0){
						stopLoad ? stopLoad({ isEnd: true }) : '';
						return
					}
					listlast.map((item,index)=>{
						if(item.repimgs){
							item['imgList'] = item.repimgs.split(",")
						}
					})
					this.list =listlast				
				})
				stopLoad ? stopLoad({
					isEnd: false
				}) : '';
			},
			handleLoadMores(stopLoad){
				let Obj = {
					id: this.myID,
					currPage: ++this.currentPage,
					toatlNum: this.totalNum,
				}
				this.$api.getOrderByManager(Obj).then(res => {
					console.log(res)
					 uni.hideLoading();
					if(res.data.length==0){
						stopLoad ? stopLoad({
							isEnd: true
						}) : '';
						return
					}
					let listlast = res.data.reverse()
					if(listlast.length==0){
						stopLoad ? stopLoad({ isEnd: true }) : '';
						return
					}
					listlast.map((item,index)=>{
						if(item.repimgs){
							item['imgList'] = item.repimgs.split(",")
						}
					})
					this.list = this.list.concat(listlast)
				
				})
			},
			handleLoadMore(stopLoad){
				let Obj = {
					id: this.myID,
					currPage: ++this.currentPage,
					toatlNum: this.totalNum,
				}
				this.$api.getOrderByClientId(Obj).then(res => {
					console.log(res)
					if(res.data.length==0){
						stopLoad ? stopLoad({
							isEnd: true
						}) : '';
						return
					}
					 uni.hideLoading();
					
					let listlast = res.data.reverse()
						if(listlast.length==0){
							stopLoad ? stopLoad({ isEnd: true }) : '';
							return
						}
					if(listlast.length==0){
						return
					}
					listlast.map((item,index)=>{
						if(item.repimgs){
							item['imgList'] = item.repimgs.split(",")
						}
						// this.list.push(item)
					})
					console.log(listlast)
					 this.list = this.list.concat(listlast)
					// this.list.push(listlast)
					console.log(this.list)
				})
			}
		},
		onLoad: function(options) {
			this.roleType = uni.getStorageSync("soleType");
			this.host = this.$Host
			this.myID = options.id
			let that = this
			console.log(options)
			let Obj = {
				id: options.id,
				currPage: 1,
				toatlNum: 5
			}
			if(uni.getStorageSync('soleType')==1){
				this.$api.getOrderByClientId(Obj).then(res => {
					console.log(res)
					 uni.hideLoading();
					that.list = res.data.reverse()
					that.list.map((item,index)=>{
						if(item.repimgs){
							item['imgList'] = item.repimgs.split(",")
						}
					})
					console.log(that.list)
				})
			}
		  if(uni.getStorageSync('soleType')==2){
				this.$api.getOrderByManager(Obj).then(res => {
					console.log(res)
					 uni.hideLoading();
					 
					that.list = res.data.reverse()
					that.list.map((item,index)=>{
						if(item.repimgs){
							item['imgList'] = item.repimgs.split(",")
						}
					})
					console.log(that.list)
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.ui-state4{
		display: inline-block;
	}
	.ui-leftmargin{
		margin-left: 32rpx;
	}
	.content{
		padding-bottom: 0;
	}
		.manageCard{
		// flex:none;
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
		.ui-comment{
			width: 100%;
			background: #FFF;
			margin-bottom: 150rpx;
			.ui-item{
				width: 90%;
				margin: 0 auto;
			}
		}
		.footer-boxs{
			    // width: 155rpx;
			    // float: right;
					.ui-tagborder{
						border: none;
						font-weight: 700;
						font-size: 24px;
			}
		}
	}
	.uni-card{
		overflow: visible;
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
