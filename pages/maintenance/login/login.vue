<template>
	<view class="content">
		<mImage class="ui-image"></mImage>
		<view class="input-group">

			<view class="input-row input-width border">
				<text class="title">账号：</text>
				<m-input class="m-input" type="text" clearable focus v-model="username" placeholder="请输入账号"></m-input>
			</view>
			<view class="input-row input-width">
				<text class="title">密码：</text>
				<m-input class="m-input" type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="bindLogin">登录</button>
		</view>
		<!-- <view class="action-row">
			<navigator url="../reg/reg">注册账号</navigator>
			<text>|</text>
			<navigator url="../pwd/pwd">忘记密码</navigator>
		</view> -->
		<!-- <view class="oauth-row" v-if="hasProvider" v-bind:style="{top: positionTop + 'px'}">
			<view class="oauth-image" v-for="provider in providerList" :key="provider.value">
				<image :src="provider.image" @tap="oauth(provider.value)"></image> -->
				<!-- #ifdef MP-WEIXIN -->
				<!-- <button class="btn-color" v-if="!isDevtools" open-type="getUserInfo" @getuserinfo="getUserInfo"></button> -->
				<!-- #endif -->
			<!-- </view> -->
		<!-- </view> -->
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import mInput from '../../components/m-input.vue'
	import mImage from '../../components/m-avatar/m-avatar.vue'
	export default {
		components: {
			mInput,
			mImage
		},
		data() {
			return {
				providerList: [],
				hasProvider: false,
				username: '',
				password: '',
				positionTop: 0,
				isDevtools: false,
			}
		},
		computed: mapState(['forcedLogin']),
		methods: {
			...mapMutations(['login','getUserInfo']),
			initProvider() {
				const filters = ['weixin', 'qq', 'sinaweibo'];
				uni.getProvider({
					service: 'oauth',
					success: (res) => {
						if (res.provider && res.provider.length) {
							for (let i = 0; i < res.provider.length; i++) {
								if (~filters.indexOf(res.provider[i])) {
									this.providerList.push({
										value: res.provider[i],
										image: '../../static/img/' + res.provider[i] + '.png'
									});
								}
							}
							this.hasProvider = true;
						}
					},
					fail: (err) => {
						console.error('获取服务供应商失败：' + JSON.stringify(err));
					}
				});
			},
			initPosition() {
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 * 反向使用 top 进行定位，可以避免此问题。
				 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			bindLogin() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (this.username.length < 3) {
					uni.showToast({
						icon: 'none',
						title: '账号最短为 3 个字符'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				/**
				 * 下面简单模拟下服务端的处理
				 * 检测用户账号密码是否在已注册的用户列表中
				 * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
				 */
				const data = {
					username: this.username,
					password: this.password
				};
				let _self = this;
				console.log(342)
				// uni.request({
				// 	url:"https://47.114.4.78:10000/api/ownerLogin",
				// 	method:"POST",
				// 	data:data,
				// 	success(res) {
				// 		console.log(res)
				// 	}
				// })
				
				this.$api.login({
					phone: _self.username,
					password: _self.password,
				}).then(res=>{
					console.log(res)
					if(res.code==200){
						 uni.hideLoading();
						uni.setStorageSync('uniIdToken', res.data.id)
						uni.setStorageSync('clientmessageid', res.data.id)
						uni.setStorageSync('username', res.data.name)
						uni.setStorageSync('icon', res.data.icon)
						uni.setStorageSync('login_type', 'online')
						uni.setStorageSync('soleType', res.data.soleType)
						_self.toMain(_self.username);
						console.log(res.data)
						console.log(_self.getUserInfo)
						_self.getUserInfo(res.data)
						console.log(_self.$store.getters.icon)
					}else{
						
						uni.showModal({
							content: res.msg
						})
						uni.hideLoading();
					}
				})

				// uni.request({
				// 	name: 'user-center',
				// 	data: {
				// 		action: 'login',
				// 		params: data
				// 	},
				// 	success: (e) => {

				// 		console.log('login success', e);

				// 		if (e.result.code == 0) {
				// 			uni.setStorageSync('uniIdToken', e.result.token)
				// 			uni.setStorageSync('username', e.result.username)
				// 			uni.setStorageSync('login_type', 'online')
				// 			_self.toMain(_self.username);
				// 		} else {
				// 			uni.showModal({
				// 				content: e.result.msg
				// 			})
				// 			console.log('登录失败', e);
				// 		}

				// 	},
				// 	fail(e) {
				// 		uni.showModal({
				// 			content: JSON.stringify(e)
				// 		})
				// 	}
				// })
			},
			// oauth(value) {
			// 	console.log('三方登录只演示登录api能力，暂未关联云端数据');
			// 	uni.login({
			// 		provider: value,
			// 		success: (res) => {
			// 			uni.getUserInfo({
			// 				provider: value,
			// 				success: (infoRes) => {
			// 					/**
			// 					 * 实际开发中，获取用户信息后，需要将信息上报至服务端。
			// 					 * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
			// 					 */
			// 					this.loginLocal(infoRes.userInfo.nickName);
			// 				},
			// 				fail() {
			// 					uni.showToast({
			// 						icon: 'none',
			// 						title: '登陆失败'
			// 					});
			// 				}
			// 			});
			// 		},
			// 		fail: (err) => {
			// 			console.error('授权登录失败：' + JSON.stringify(err));
			// 		}
			// 	});
			// },
			// getUserInfo({
			// 	detail
			// }) {
			// 	console.log('三方登录只演示登录api能力，暂未关联云端数据');
			// 	if (detail.userInfo) {
			// 		this.loginLocal(detail.userInfo.nickName);
			// 	} else {
			// 		uni.showToast({
			// 			icon: 'none',
			// 			title: '登陆失败'
			// 		});
			// 	}
			// },
			loginLocal(nickName) {
				uni.setStorageSync('login_type', 'local')
				uni.setStorageSync('username', nickName)
				this.toMain(nickName);
			},
			toMain(userName) {
				this.login(userName);
				/**
				 * 强制登录时使用reLaunch方式跳转过来
				 * 返回首页也使用reLaunch方式
				 */
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '../main/main',
					});
				} else {
					uni.navigateBack();
				}

			}
		},
		onReady() {
			this.initPosition();
			this.initProvider();
			// #ifdef MP-WEIXIN
			this.isDevtools = uni.getSystemInfoSync().platform === 'devtools';
			// #endif
		}
	}
</script>

<style scoped>
	.content{
		background: #fff;
	}
	.title{
		text-align: center;
	}
	.input-row{
		display: flex;
		align-items: center;
	}
	.m-input{
		height: 100rpx;
		line-height: 100rpx;
	}
	.ui-image {
		margin-top: 60rpx;
		margin-bottom: 60rpx;
	}

	.action-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #007aff;
		padding: 0 10px;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.oauth-image {
		position: relative;
		width: 50px;
		height: 50px;
		border: 1px solid #dddddd;
		border-radius: 50px;
		margin: 0 20px;
		background-color: #ffffff;
	}

	.oauth-image image {
		width: 30px;
		height: 30px;
		margin: 10px;
	}

	.oauth-image button {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
	.input-width{    
		
    margin: 0 auto;}
</style>
