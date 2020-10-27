<template>
	<view class="content">
		<view class="ui-noData" v-if="orderList.length==0">没有需要维修的工单...</view>
		<view v-else class="ui-swiperContent">
			<uni-steps class="ui-step" :options="[{title: '待接单'}, {title: '已接单'}, {title: '待评价'}, {title: '已完成'}]" :active="0"></uni-steps>
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
										<uni-card title="待接单" note="true" v-for="(item,index) in orderList " :extra="item.createtime | renderTime"
										 :key="item.id">
											<view class="ui-item">业主名称: <span class="ui-span">{{item.userName}}</span></view>
											<view class="ui-item">报修住址: <span class="ui-span">{{item.buildName}}{{item.loucName}}层{{item.roomName}}室</span></view>
											<view class="ui-item">联系电话: <span class="ui-span">{{item.userTel}}</span></view>
											<view class="ui-item">报修项目: <span class="ui-span">{{item.repairName}}</span></view>
											<view class="ui-item">报修类型: <span class="ui-span">{{item.warrName}}</span></view>
											<view v-if="item.content" class="ui-item">报修描述: <span class="ui-span">{{item.content}}</span></view>
											<view class="ui-item ui-display">
												<image @click="preview(itemImg)" v-if="itemImg" v-for="(itemImg,index) in item.imgList" :key="index" :src="host+''+itemImg"
												 mode="aspectFill"></image>
											</view>
											<template v-slot:footer>
												<view class="footer-box">
													<uni-tag class="ui-tagfontSize" v-if="item.state==1" text="接单" type="primary" :circle="true" @click="getOrder(item.id)"></uni-tag>
													<uni-tag class="ui-tagfontSize" v-if="item.state==2" text="已接单" type="error" :circle="true"></uni-tag>
													<uni-tag class="ui-tagfontSize" v-if="item.state==3" text="待评价" type="warning" :circle="true"></uni-tag>
													<uni-tag class="ui-tagfontSize" v-if="item.state==4" text="已完成" type="success" :circle="true"></uni-tag>
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
	import Gallery from '../../components/m-gallery/m-gallery.vue'
	import MItem from "../../components/m-item/m-item.vue"
	import uniSteps from '../../components/uni-steps/uni-steps.vue'
	export default {
		components: {
			Gallery,
			MItem
		},
		data() {
			return {
				host: "",
				orderList: null,
				/* 加载配置项 */
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
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		onShow() {
			this.getList()
		},
		onLoad() {
			this.getList()
			const loginType = uni.getStorageSync('login_type')
			if (loginType === 'local') {
				this.login(uni.getStorageSync('username'))
				return
			}
			let uniIdToken = uni.getStorageSync('uniIdToken')
			if (uniIdToken) {
				this.login(uni.getStorageSync('username'))
			} else {
				this.guideToLogin()
			}
		},
		methods: {
			...mapMutations(['login']),
			handlePullDown() {
				this.currentPage = 1;
				this.getList();
				stopLoad ? stopLoad({
					isEnd: false
				}) : '';
			},
			handleLoadMore(stopLoad) {
				let obj = {
					currPage: ++this.currentPage,
					toatlNum: this.totalNum,
				};
				this.$api.getAllOrderList(obj).then(res => {
					uni.hideLoading();
					if (res.data.length == 0) {
						stopLoad ? stopLoad({
							isEnd: true
						}) : '';
						return
					}
					let orderList = res.data
					orderList.map((item, index) => {
						if (item.repimgs) {
							item['imgList'] = item.repimgs.split(",")
						}
					})
				})
				this.orderList = this.orderList.concat(orderList)
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
				this.host = this.$Host
				let obj = {
					currPage: this.currentPage,
					toatlNum: this.totalNum,
				}
				this.$api.getAllOrderList(obj).then(res => {
					uni.hideLoading();
					this.orderList = res.data
					this.orderList.map((item, index) => {
						if (item.repimgs) {
							item['imgList'] = item.repimgs.split(",")
						}
					})
				})
			},
			getOrder(data) {
				let that = this
				uni.showModal({
					content: "确认接单",
					showCancel: true,
					cancelText: "取消",
					cancelColor: "#c2c0b5",
					confirmText: "确定",
					confirmColor: "#007AFF",
					success: function(res) {
						if (res.confirm) {
							let obj = {
								orderId: data,
								workerId: uni.getStorageSync('clientmessageid')
							}
							that.$api.saveRecent(obj).then(res => {
								uni.hideLoading();
								if (res.code == 200) {
									uni.redirectTo({
										url: "../orderReceived/orderReceived"
									})
								}
							})
							return
						} else if (res.cancel) {

						}
					}
				})
			},

			changeItem(data) {
				this.current = data
			},
			guideToLogin() {
				uni.showModal({
					title: '未登录',
					content: '您未登录，需要登录后才能继续',
					/**
					 * 如果需要强制登录，不显示取消按钮
					 */
					showCancel: !this.forcedLogin,
					success: (res) => {
						if (res.confirm) {
							/**
							 * 如果需要强制登录，使用reLaunch方式
							 */
							if (this.forcedLogin) {
								uni.reLaunch({
									url: '../login/login'
								});
							} else {
								uni.navigateTo({
									url: '../login/login'
								});
							}
						}
					}
				});
			}
		}

	}
</script>

<style lang="less" scoped>
	.ui-step {
		padding: 20rpx 0;
		margin-top: 20rpx;
		display: block;
	}

	.footer-box {
		.ui-tagfontSize {

			font-size: 24px;
		}
	}

	.ui-noData {
		margin-top: 50rpx;
		margin-left: 20rpx;
		font-size: 26px;
		color: #333;
	}

	.content {
		display: flex;
		padding-bottom: 10rpx;

		.ui-swiperContent {
			flex: 1;
			overflow: scroll;
			display: flex;
			flex-direction: column;

			.uni-padding-wrap {
				flex: 1
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
