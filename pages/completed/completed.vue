<template>
	<view class="content">
			<view class="ui-noData" v-if="list.length==0">暂无业主评价工单...</view>
		<view v-else class="ui-swiperContent">
			<uni-steps  class="ui-step" :options="[{title: '待接单'}, {title: '已接单'}, {title: '待评价'}, {title: '已完成'}]" :active="3"></uni-steps>
			
			<view class="uni-padding-wrap">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper class="swiper" :current="current" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
						 :duration="duration">
							<swiper-item style="overflow-y: scroll;">
								<k-scroll-view ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip" :loadTip="loadTip"
								 :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height" :bottom="bottom"
								 :autoPullUp="autoPullUp" @onPullDown="handlePullDown" @onPullUp="handleLoadMore">
								
								<view class="swiper-item uni-bg-red">
									<uni-card @click="hrefTo(item.id)" title="已完成工单" note="true" v-for="(item,index) in list " :extra="item.receivetime | renderTime"
									 :key="item.id">
										<view class="ui-item">业主名称: <span class="ui-span">{{item.userName}}</span></view>
										
										<view class="ui-item">联系电话: <span class="ui-span">{{item.userTel}}</span></view>
										<view class="ui-item">报修住址: <span class="ui-span">{{item.buildName}}{{item.loucName}}层{{item.roomName}}室</span></view>
										<view class="ui-item">报修项目: <span class="ui-span">{{item.repairName}}</span></view>
										<view class="ui-item">报修类型: <span class="ui-span">{{item.warrName}}</span></view>

										<view v-if="item.content" class="ui-item">报修描述: <span class="ui-span">{{item.content}}</span></view>
										<view class="ui-item" v-if="item.repImgArr">报修图片:</view>
										<view class="ui-item ui-display">
											<image @click="preview(itemImg)" v-if="itemImg" v-for="(itemImg,index) in item.repImgArr" :key="index" :src="host+''+itemImg" mode="aspectFill"></image>
										</view>
										<view class="cell_dashed">
										</view>
										<view class="ui-item">维修人: <span class="ui-span">{{item.maintName}}</span></view>
										<view v-if="item.receivetext&&item.receivetext!='undefined'" class="ui-item">维修描述: <span class="ui-span">{{item.receivetext}}</span></view>
										<view class="ui-item">维修时间: <span class="ui-span">{{item.receivetime | renderTime}}</span></view>
										<view class="ui-item" v-if="item.okImgArr">维修图片:</view>
										<view class="ui-item ui-display">
											<image @click="preview(itemImg)" v-if="itemImg" v-for="(itemImg,index) in item.okImgArr" :key="index" :src="host+''+itemImg" mode="aspectFill"></image>
										</view>
										<view class="cell_dashed">
										</view>
										<view class="ui-item">业主评价: <span class="ui-span">{{item.evaluatetext}}</span></view>
										<view class="ui-item">评分:<span class="ui-span">{{item.satisName}}</span></view>
										<template v-slot:footer>
											<view class="footer-box">
												<uni-tag v-if="item.state==1" text="接单" type="primary" :circle="true"  @click="getOrder(item.id)"></uni-tag>
												<uni-tag v-if="item.state==2" text="处理工单" type="error" :circle="true" ></uni-tag>
												<uni-tag v-if="item.state==3" text="待评价" type="warning" :circle="true" ></uni-tag>
												<uni-tag v-if="item.state==4" text="已完成" type="success" :circle="true" ></uni-tag>
											</view>
										</template>
									</uni-card>
								</view>
									</k-scroll-view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import uniRate from '../../components/uni-rate/uni-rate.vue'
	import Avatar from "../../components/m-avatar/m-avatar"
	import UserList from "../../components/my-list/my-list.vue"
	
	export default {
		components: {
			Avatar,
			UserList,
	
			uniRate
		},
		data() {
			return {
				// list: [{
				// 		title: "个人信息",
				// 		icon: "icon-gerenxinxi",
				// 		path: "../personalInformation/personalInformation"
				// 	},
				// 	{
				// 		title: "我的报修",
				// 		icon: "icon-baoxiu",
				// 		path: `../myRepair/myRepair?id=${uni.getStorageSync("clientmessageid")}`
				// 	},
				// 	{
				// 		title: "我的建议",
				// 		icon: "icon-yiban",
				// 		path: `../mySuggest/mySuggest?id=${uni.getStorageSync("clientmessageid")}`
				// 	},
				// 	{
				// 		title: "修改密码",
				// 		icon: "icon-xiugaimima",
				// 		path: "../changePassword/changePassword"
				// 	},
				// ],
				list: null,
				host:null,
				totalNum: 5,
				currentPage: 1,
				refreshType: 'custom',
				refreshTip: '正在下拉',
				loadTip: '获取更多数据',
				loadingTip: '正在加载中...',
				emptyTip: '--我是有底线的--',
				touchHeight: 50,
				height: 0,
				bottom: 50,
				autoPullUp: true,
				stopPullDown: true,
			}
		},

		computed: {
			...mapState(['hasLogin', 'forcedLogin'])
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
		onLoad() {
			this.getList()
			this.host = this.$Host
		},
		onShow() {
			this.getList()
			this.host = this.$Host
		},
		methods: {
			...mapMutations(['logout']),
			handlePullDown(){
				this.currentPage = 1;
				this.getList();
				stopLoad ? stopLoad({
					isEnd: false
				}) : '';
			},
			/* 上拉加载 */
			handleLoadMore(stopLoad){
				let obj = {
					currPage: ++this.currentPage,
					toatlNum: this.totalNum,
					id: uni.getStorageSync("clientmessageid"),
					state: 4
				};
				this.$api.getOrderListByMaint(obj).then(res => {
					uni.hideLoading();
					
					if(res.data.length==0){
						stopLoad ? stopLoad({
							isEnd: true
						}) : '';
						return
					}
					res.data.map((item, index) => {
						if (item.repimgs != null) {
							item['repImgArr'] = item.repimgs.split(",")
						}
					})
					res.data.map((item, index) => {
						if (item.okimgs != null) {
							item['okImgArr'] = item.okimgs.split(",")
						}
					})
					this.list = this.list.concat(res.data)
				})
			},
			toPersonal() {
				uni.navigateTo({
					url: "../personal/personal"
				})
			},
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
			getList() {
				let obj = {
					currPage: this.currentPage,
					toatlNum: this.totalNum,
					id: uni.getStorageSync("clientmessageid"),
					state: 4
				};
				this.$api.getOrderListByMaint(obj).then(res => {
					 uni.hideLoading();
					console.log(res)
					res.data.map((item, index) => {
						if (item.repimgs != null) {
							item['repImgArr'] = item.repimgs.split(",")
						}
					})
					res.data.map((item, index) => {
						if (item.okimgs != null) {
							item['okImgArr'] = item.okimgs.split(",")
						}
					})
					this.list = res.data

				})
			},
			bindLogin() {
				uni.navigateTo({
					url: '../login/login',
				});
			},
			bindLogout() {

				// uni.removeStorageSync('clientname')
				// uni.removeStorageSync('clienttype')
				// uni.removeStorageSync('clientmessageid')
				uni.clearStorageSync()
				const loginType = uni.getStorageSync('login_type')
				console.log(loginType)
				this.logout();
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '../login/login',
					});
				}
				return
				// if (loginType === 'local') {
				// 	this.logout();
				// 	if (this.forcedLogin) {
				// 		uni.reLaunch({
				// 			url: '../login/login',
				// 		});
				// 	}
				// 	return
				// }

				// uniCloud.callFunction({
				// 	name: 'user-center',
				// 	data: {
				// 		action: 'logout'
				// 	},
				// 	success: (e) => {

				// 		console.log('logout success', e);

				// 		if (e.result.code == 0) {
				// 			this.logout();
				// 			uni.removeStorageSync('uniIdToken')
				// 			uni.removeStorageSync('username')
				// 			/**
				// 			 * 如果需要强制登录跳转回登录页面
				// 			 */
				// 			if (this.forcedLogin) {
				// 				uni.reLaunch({
				// 					url: '../login/login',
				// 				});
				// 			}
				// 		} else {
				// 			uni.showModal({
				// 				content: e.result.msg
				// 			})
				// 			console.log('登出失败', e);
				// 		}

				// 	},
				// 	fail(e) {
				// 		uni.showModal({
				// 			content: JSON.stringify(e)
				// 		})
				// 	}
				// })


			}
		}
	}
</script>

<style scoped lang="less">
	 // .status_bar {
	 //      height: var(--status-bar-height);
	 //      width: 100%;
	 //  }
	 .ui-step{
	 	padding: 20rpx 0;
	 	margin-top: 20rpx;
	 	display: block;
	 }
	.ui-noData{
		margin-top:50rpx;
		margin-left:20rpx;
		font-size: 26px;
		color: #333;
	}
	.cell_dashed{
		height: 2rpx;
	  border-bottom:1px dashed #ccc;
	}
	.footer-box {
		display: flex;
		justify-content: flex-end;
	}

	.content {
		display: flex;
padding-bottom: 10rpx;
		.ui-swiperContent {
			flex: 1;
			overflow: scroll;
			display: flex;
			flex-direction: column;
			.uni-padding-wrap{
				flex:1
			}
			.uni-padding-wrap,
			.page-section,
			.page-section-spacing,
			.swiper {
				height: 100%;
				overflow: scroll;

				.ui-display {
					display: flex;
					image {
						width: 25%;
						padding: 0 8rpx;
						height: 155rpx;
					}
				}

				.uni-tag {
					height: 50rpx;
				width: 90%;
				text-align: center;
				}

				.ui-span {
					margin-left: 20rpx;
				}

				.ui-item {
					padding: 10rpx 0;
				}
			}
		}
	}

	.swiper-item {
		overflow-y: scroll;
	}

	.ui-lineBtn {
		display: flex;
		justify-content: space-around;
	}

	.ui-mItem {
		background: #fff;
		padding-bottom: 40rpx;
	}

	.main-Gallery {
		height: 400rpx;
	}

	.hello {
		display: flex;
		flex: 1;
		flex-direction: column;
	}

	.title {
		color: #8f8f94;
		margin-top: 25px;
	}

	.ul {
		font-size: 15px;
		color: #8f8f94;
		margin-top: 25px;
	}

	.ul>view {
		line-height: 25px;
	}
</style>
