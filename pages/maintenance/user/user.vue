<template>
	<view class="content">
		<!-- <view class="btn-row">
			<button v-if="!hasLogin" type="primary" class="primary" @tap="bindLogin">登录</button>
			<button v-if="hasLogin" type="default" @tap="bindLogout">退出登录</button>
		</view> -->
		<view class="ui-header">
			<Avatar :img="host+''+img"></Avatar>
			<view class="ui-text">{{userName==null?"userName":userName}}</view>
		</view>
		<view class="ui-userList">
			<UserList :list="list"></UserList>
		</view>
		<view class="btn-row">
			<button type="default" class="ui-red" @tap="bindLogout">退1出</button>
		</view>
	</view>
</template>
<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import Avatar from "@/components/m-avatar/m-avatar"
	import UserList from "@/components/my-list/my-list.vue"

	export default {
		components: {
			Avatar,
			UserList
		},
		onShow() {
			console.log(1230000)
			if (typeof this.$mp.page.getTabBar === 'function' && this.$mp.page.getTabBar()) {
				console.log(this.$mp)
				this.$mp.page.getTabBar().setData({
					selected: 1
				})
			}
		},
		data() {
			return {
				userName: null,
				img: null,
				host: null,
				list: [{
						title: "个人信息",
						icon: "icon-gerenxinxi",
						path: `../personalInformation/personalInformation?id=${uni.getStorageSync("clientmessageid")}`
					},
					{
						title: "我的报修",
						icon: "icon-baoxiu",
						path: `../myRepair/myRepair?id=${uni.getStorageSync("clientmessageid")}`
					},
					{
						title: "我的建议",
						icon: "icon-yiban",
						path: `../mySuggest/mySuggest?id=${uni.getStorageSync("clientmessageid")}`
					},
					{
						title: "修改密码",
						icon: "icon-xiugaimima",
						path: "../changePassword/changePassword"
					},
				],
			}
		},

		computed: {
			...mapState(['hasLogin', 'forcedLogin'])
		},
		onLoad() {
			this.userName = uni.getStorageSync("username")
			this.img = uni.getStorageSync("icon")
			this.host = this.$Host
		},
		onShow() {
			this.userName = uni.getStorageSync("username")
			this.img = uni.getStorageSync("icon")
			this.host = this.$Host
		},
		methods: {
			...mapMutations(['logout']),
			bindLogin() {
				uni.navigateTo({
					url: '../login/login',
				});
			},
			bindLogout() {
				let that = this
				// uni.removeStorageSync('clientname')
				// uni.removeStorageSync('clienttype')
				// uni.removeStorageSync('clientmessageid')
				uni.showModal({
					content: "是否退出！",
					showCancel: true,
					cancelText: "取消",
					cancelColor: "#c2c0b5",
					confirmText: "确定",
					confirmColor: "#007AFF",
					success: function(res) {
						if (res.confirm) {
							uni.clearStorageSync()
							const loginType = uni.getStorageSync('login_type')
							console.log(loginType)
							that.logout();
							if (that.forcedLogin) {
								uni.reLaunch({
									url: '../login/login',
								});
							}
							return
						} else if (res.cancel) {

						}
					}
				})
				// uni.clearStorageSync()
				// const loginType = uni.getStorageSync('login_type')
				// console.log(loginType)
				// this.logout();
				// if (this.forcedLogin) {
				// 	uni.reLaunch({
				// 		url: '../login/login',
				// 	});
				// }
				// return
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

<style scoped>
	.ui-red {
		color: #ff512f;
	}

	.ui-header {
		background-color: #fff;
		padding: 60rpx 0 40rpx 0;
	}

	.ui-text {
		margin-top: 40rpx;
		text-align: center;
	}

	.ui-userList {
		margin: 32rpx 0;
		background-color: #fff;
	}
</style>
