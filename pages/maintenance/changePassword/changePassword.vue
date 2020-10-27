<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border">
				<text class="title">旧&nbsp;&nbsp;密&nbsp;&nbsp;码：</text>
				<m-input type="password" focus clearable v-model="oldpassword" placeholder="请输入旧密码"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">密 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
			<view class="input-row">
				<text class="title">确认密码：</text>
				<m-input type="password" displayable v-model="confirmPassword" placeholder="请确认密码"></m-input>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="register">确定</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import service from '../../service.js';
	import mInput from '../../components/m-input.vue';

	export default {
		components: {
			mInput
		},
		data() {
			return {
				oldpassword: '',
				password: '',
				confirmPassword: ''
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin'])
		},
		methods: {
			...mapMutations(['logout']),
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
			},
			register() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				// if (this.username.length < 3) {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '账号最短为 3 个字符'
				// 	});
				// 	return;
				// }
				if (this.oldpassword.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
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
				if (this.password !== this.confirmPassword) {
					uni.showToast({
						icon: 'none',
						title: '两次密码输入不一致'
					});
					return;
				}

				const data = {
					id:uni.getStorageSync("clientmessageid"),
					oldPwd: this.oldpassword,
					nowPwd: this.password
				}
				this.$api.editManagerPwd(data).then(res=>{
					console.log(res)
					if(res.code==200){
						uni.showToast({
							 title: '修改成功',
							  icon: 'success',
							  duration: 2000
						})
						this.bindLogout()
					}
				})
				// uniCloud.callFunction({
				// 	name: 'user-center',
				// 	data: {
				// 		action: 'register',
				// 		params: data
				// 	},
				// 	success(e) {
				// 		console.log("修改成功", e);

				// 		if (e.result.code === 0) {
				// 			uni.showToast({
				// 				title: '修改成功'
				// 			});
				// 			uni.setStorageSync('uniIdToken', e.result.token)
				// 			uni.setStorageSync('username', e.result.username)
				// 			uni.reLaunch({
				// 				url: '../main/main',
				// 			});
				// 		} else {
				// 			uni.showModal({
				// 				content: JSON.stringify(e.result),
				// 				showCancel: false
				// 			})
				// 		}
				// 	},
				// 	fail(e) {
				// 		uni.showModal({
				// 			content: JSON.stringify(e),
				// 			showCancel: false
				// 		})
				// 	}
				// })
			}
		}
	}
</script>

<style scoped>
.input-row{
	height: 100rpx;
	line-height: 100rpx;
}
.input-row .title{
	
}
</style>
