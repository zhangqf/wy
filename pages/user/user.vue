<template>
	<view class="content">
		<!-- <view class="btn-row">
			<button v-if="!hasLogin" type="primary" class="primary" @tap="bindLogin">登录</button>
			<button v-if="hasLogin" type="default" @tap="bindLogout">退出登录</button>
		</view> -->
		<view class="ui-header">
			<Avatar v-if="img==null||img==''"></Avatar>
			<Avatar v-else :img="host+''+img"></Avatar>
			<view class="ui-text">{{userName!=null?userName:'username'}}</view>
		</view>
		<view  class="ui-userList">
			<UserList :list="list"></UserList>
		</view>
		<!-- <view v-else class="ui-userList">
			
			<ul class="ui-listcontent">
				<li class="ui-listContentLi" >
					<span>联系电话</span>
					<text>{{list.phone}}</text>
					
				</li>
				<li class="ui-listContentLi" >
					<span>性 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</span>
					<text>{{list.sex}}</text>
					
				</li>
				<li class="ui-listContentLi" >
					<span>年 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄</span>
					<text>{{list.age}}</text>
					
				</li>
			</ul>
		
		</view> -->
		<view class="btn-row">
			<!-- <button v-if="!roleType" style="margin-bottom: 20rpx;" type="default" class="ui-blue" @tap="herfTo()">修改密码</button> -->
			<button type="default" class="ui-red" @tap="bindLogout">退出</button>
		</view>
	</view>
</template>
<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import Avatar from "../../components/m-avatar/m-avatar"
	import UserList from "../../components/my-list/my-list.vue"

	export default {
		components: {
			Avatar,
			UserList
		},
		data() {
			return {
				userName: null,
				img: null,
				host: null,
				
				roleType:true,
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
			this.userName = uni.getStorageSync("username");
			this.img = uni.getStorageSync("icon")
			this.host = this.$Host;
			console.log(uni.getStorageSync('soleType'))
			if(uni.getStorageSync('soleType')==2){
				this.list=this.list.concat(
					{
						title: "我的抄表",
						icon: "icon-shuidianbiaochaobiao",
						path: `../myelectricity/myelectricity?id=${uni.getStorageSync("clientmessageid")}`
					},
				)
				
			}
			if(uni.getStorageSync('soleType')==3){
				console.log(12132)
				this.list.splice(1,2)
			}
			 
		},
		onShow(){
			if(typeof this.$mp.page.getTabBar === 'function' && this.$mp.page.getTabBar()){
			
				this.$mp.page.getTabBar().setData({
					selected:1
				})
			}
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
			herfTo(){
				uni.navigateTo({
					url:"../changePassword/changePassword"
				})
			},
			// getList(){
			// 	let obj = {
			// 		id:uni.getStorageSync("clientmessageid"),
			// 		};
			// 	this.$api.getMaintById(obj).then(res=>{
			// 		 uni.hideLoading();
			// 		 console.log(res)
			// 		this.list = res.data
			// 	})
			// },
			
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
	.ui-red {
		color: #ff512f;
	}

	.ui-header {
		background-color: #143270;
		padding: 60rpx 0 40rpx 0;
		color: #fff;
	}

	.ui-text {
		margin-top: 40rpx;
		text-align: center;
	}

	.ui-userList {
		margin: 32rpx 0;
		background-color: #fff;
	}
	
	.ui-listContentLi{
		position: relative;
		width: 96%;
		height: 100rpx;
		margin: 0 auto;
		display: flex;
		
		align-items: center;
		color: #7d7d7d;
		line-height: 28px;
		border-bottom: 2rpx solid #e7e7e7;
		span{
			width: 150rpx;
			text-align:right;
			margin-right: 40rpx;
			margin-left: 20rpx;
		}
	}
	.ui-listContentLi:last-child{
		border-bottom: none;
	}
	.ui-listcontent{
		width: 100%;
	}
</style>
