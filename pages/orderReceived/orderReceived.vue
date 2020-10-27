<template>
	<view class="content">
		<view class="ui-noData" v-if="orderList.length==0">无已接工单</view>

		<view v-else class="ui-swiperContent">
			<uni-steps class="ui-step" :options="[{title: '待接单'}, {title: '已接单'}, {title: '待评价'}, {title: '已完成'}]" :active="1"></uni-steps>


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
										<uni-card @click="hrefTo(item.id)" title="已接工单" note="true" v-for="(item,index) in orderList " :extra="item.createtime | renderTime"
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
													<uni-tag class="ui-tagfontSize" v-if="item.state==2" text="处理工单" type="error" :circle="true"></uni-tag>
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
	export default {
		data() {
			return {
				orderList: null,
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
			};
		},
		onLoad() {
			this.getList()
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
		onShow() {
			this.getList()
		},
		methods: {
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
					state: 2
				};
				this.$api.getOrderListByMaint(obj).then(res => {
					uni.hideLoading();
					
					if(res.data.length==0){
						stopLoad ? stopLoad({
							isEnd: true
						}) : '';
						return
					}
					this.orderList = res.data.concat(this.orderList)
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
					state: 2
				};
				this.$api.getOrderListByMaint(obj).then(res => {
					uni.hideLoading();
					this.orderList = res.data
				})
			},
			hrefTo(data) {
				uni.redirectTo({
					url: `../orderReceivedDetail/orderReceivedDetail?id=${data}`
				})
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
			display: flex;
			flex-direction: column;

			overflow: scroll;

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
