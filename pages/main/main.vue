<template>
	<view class="content">
		<Gallery :galleryLIst="galleryLIst" :host="host" class="main-Gallery"></Gallery>
		<MItem class="ui-mItem" :itemList="itemList"></MItem>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<view class="bock-icon "></view>
				<text class="margin-left-xs">第三方</text>
			</view>
		</view>
		<view class="categoryList padding-top-xs bg-white">

			
			<block v-for="(item2, index2) in thirdParty" :key="index2">
				<view class="category-info">
					<div @tap="_toHref()">
						<image :src="item2.url" class="category-image"></image>
						<view class="category-text">{{item2.name}}</view>
					</div>
				</view>
			</block>
		

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

	export default {
		components: {
			Gallery,
			MItem
		},
		data() {
			return {
				galleryLIst: [],
				thirdParty: [{
					name: "更多",
					url: require("../../static/img/gd.png"),
					path: ""
				}, ],
				itemList: [
				],
				host: "",
			}
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		onShow() {
			if (typeof this.$mp.page.getTabBar === 'function' && this.$mp.page.getTabBar()) {
				this.$mp.page.getTabBar().setData({
					selected: 0
				})
			}
			this.getRoleTypeContent()
		},
		onLoad() {
			this.getRoleTypeContent()
			this.host = this.$Host
			//轮播图
			this.$api.getAdvers().then(res => {
				console.log(res)
				uni.hideLoading();
				this.galleryLIst = res.data
			})
			// 判断本地是否有用户信息 没有重新登录
			const loginType = uni.getStorageSync('login_type')
			if (loginType === 'local') {
				this.login(uni.getStorageSync('username'))
				return
			}
			let uniIdToken = uni.getStorageSync('username')
			if (uniIdToken) {
				this.login(uni.getStorageSync('username'))
				
			} else {
				this.guideToLogin()
			}
		},
		methods: {
			...mapMutations(['login']),
			getRoleTypeContent(){
				if(wx.getStorageSync('soleType')==1){
					this.itemList = [{
							url: require("../../static/img/tcw.png"),
							text: "停车",
							path: "../parking/parking"
						},
				
						{
							url: require("../../static/img/jf.png"),
							text: "缴费",
							path: ""
						},
						{
							url: require("../../static/img/index_inspection.png"),
							text: "报修",
							path: "../reportRepair/reportRepair"
						},
						{
							url: require("../../static/img/index_complaint.png"),
							text: "建议",
							path: "../suggest/suggest"
						},
						{
							url: require("../../static/img/index_notice.png"),
							text: "公告",
							path: "../notice/notice"
						},
						{
							url: require("../../static/img/kf.png"),
							text: "客服",
							path: "../telephoneNumber/telephoneNumber"
						},
						// {
						// 	url: require("../../static/img/index_openDoor.png"),
						// 	text: "智能开锁",
						// 	path: "parking"
						// },
						]
				}
				if(wx.getStorageSync('soleType')==2){
					this.itemList =[
						{
							url:require("../../static/img/tcw.png"),
							text:"停车",
							path:"../maintenance/parking/parking"
						},
						{
							url:require("../../static/img/index_inspection.png"),
							text:"报修",
							path:"../myRepair/myRepair"
						},
						{
							url:require("../../static/img/index_complaint.png"),
							text:"建议",
							path:"../mySuggest/mySuggest"
						},
						{
							url:require("../../static/img/index_notice.png"),
							text:"公告",
							path:"../notice/notice"
						},
						{
							url:require("../../static/img/electricity.png"),
							text:"智能抄表",
							path:"../electricity/electricity"
						},
						// {
						// 	url:require("../../static/img/index_openDoor.png"),
						// 	text:"智能开锁",
						// 	path:"parking"
						// }
					]
				}
				if(wx.getStorageSync('soleType')==3){
				
						this.itemList = [{
								url: require("../../static/img/djd.png"),
								text: "工单大厅",
								path: "../workHall/workHall"
							},
							{
								url: require("../../static/img/yjd.png"),
								text: "已接单",
								path: "../orderReceived/orderReceived"
							},
							{
								url: require("../../static/img/dpj.png"),
								text: "待评价",
								path: "../toBeEvaluated/toBeEvaluated"
							},
							{
								url: require("../../static/img/ywc.png"),
								text: "已完成",
								path: "../completed/completed"
							},
						]
					
				}
			},
			_toHref() {
				uni.showModal({
					content: "敬请期待！",
					showCancel: true,
					cancelText: "取消",
					cancelColor: "#c2c0b5",
					confirmText: "确定",
					confirmColor: "#007AFF"
				})
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
						} else {
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
					},

				});
			}
		}

	}
</script>

<style>
	.cu-bar {
		margin-top: 35rpx;
	}

	.bg-white {
		background-color: #fff;
	}

	.category-info {
		display: inline-block;
		text-align: center;
		position: relative;
		margin-top: 20rpx;
		height: 130rpx;
		width: 25%;
	}

	.category-image {
		width: 80rpx;
		height: 80rpx;
	}

	.category-text {
		font-size: 25rpx;
		width: 100%;
		/* line-height: 30rpx */
	}

	.categoryList {
		width: 100%;
		height: 360upx;
		/* border-bottom:20rpx solid #f4f4f4; */
	}

	.margin-left-xs {
		color: #808080;
	}

	.action {
		display: flex;
		min-height: 110rpx;
		line-height: 80rpx;
		align-items: center;
		border-bottom: 1px solid #e6e6e6;
	}

	.bock-icon {
		height: 50upx;
		width: 14upx;
		line-height: 110rpx;
		background-color: rgb(20, 50, 112);
		margin-left: 20rpx;
		margin-right: 20rpx;
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
