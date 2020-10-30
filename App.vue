<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		onLaunch: function() {
			let uniIdToken = uni.getStorageSync('uniIdToken')
			if (uniIdToken) {
				this.login(uni.getStorageSync('username'))
			}
			console.log('App Launch');
		},
		
		onShow: function() {
			console.log('App Show');
			// if(uni.getStorageSync('soleType')==3){
			// 	uni.showModal({
			// 		title: '订阅消息',
			// 		content: '是否订阅消息',
			// 		success: (res) => {
			// 			if (res.confirm) {
			// 				uni.requestSubscribeMessage({
			// 					tmplIds: ['FTy336_vGTj_BrwDwwl6ieuk-SqIYO4pE07VGDU4iIw'],
			// 					success (res) {
									
			// 						 if (res['FTy336_vGTj_BrwDwwl6ieuk-SqIYO4pE07VGDU4iIw'] === 'accept') {
			// 							  wx.showToast({
			// 							    title: '订阅OK！',
			// 							    duration: 1000,
			// 							    success(data) {
													
			// 							    }
			// 							  })
			// 						 }
			// 					}
			// 				})	
			// 			} else {
							
			// 			}
			// 		},
			// 	});
				
				
				
			// 	var _this = this;
			// 	    //判断是否已经订阅
			// 	    wx.getSetting({
			// 	      withSubscriptions: true,
			// 	      success(res) {
			// 					console.log(res)
			// 	        var itemSettings = res.subscriptionsSetting.itemSettings;
			// 					console.log(itemSettings)
			// 					if (itemSettings==undefined) {
			// 						uni.showModal({
			// 							title: '订阅消息',
			// 							content: '是否订阅消息（取消后，得不到新订单通知）',
			// 							success: (res) => {
			// 								if (res.confirm) {
			// 									uni.requestSubscribeMessage({
			// 										tmplIds: ['FTy336_vGTj_BrwDwwl6ieuk-SqIYO4pE07VGDU4iIw'],
			// 										success (res) {
			// 											console.log(res)
			// 											 if (res['FTy336_vGTj_BrwDwwl6ieuk-SqIYO4pE07VGDU4iIw'] === 'accept') {
															 
			// 											 }
			// 										}
			// 									})	
			// 								} else {
													
			// 								}
			// 							},
			// 						});
			// 					}
			// 	        if (itemSettings) {
			// 	          if (itemSettings['FTy336_vGTj_BrwDwwl6ieuk-SqIYO4pE07VGDU4iIw']=='accept') {
			// 							uni.showModal({
			// 								title: '订阅消息',
			// 								content: '是否订阅消息',
			// 								success: (res) => {
			// 									if (res.confirm) {
			// 										uni.requestSubscribeMessage({
			// 											tmplIds: ['FTy336_vGTj_BrwDwwl6ieuk-SqIYO4pE07VGDU4iIw'],
			// 											success (res) {
															
			// 												 if (res['FTy336_vGTj_BrwDwwl6ieuk-SqIYO4pE07VGDU4iIw'] === 'accept') {
			// 													  wx.showToast({
			// 													    title: '订阅OK！',
			// 													    duration: 1000,
			// 													    success(data) {
																			
			// 													    }
			// 													  })
			// 												 }
			// 											}
			// 										})	
			// 									} else {
			// 										uni.requestSubscribeMessage({
			// 											tmplIds: ['FTy336_vGTj_BrwDwwl6ieuk-SqIYO4pE07VGDU4iIw'],
			// 											success (res) {
															
			// 												 if (res['FTy336_vGTj_BrwDwwl6ieuk-SqIYO4pE07VGDU4iIw'] === 'accept') {
																 
			// 												 }
			// 											}
			// 										})			
			// 									}
			// 								},
			// 							});
			// 	          }else{
			// 							uni.showModal({
			// 								title: '订阅消息',
			// 								content: '是否订阅消息（取消后，得不到新订单通知）',
			// 								success: (res) => {
			// 									if (res.confirm) {
			// 										uni.requestSubscribeMessage({
			// 											tmplIds: ['FTy336_vGTj_BrwDwwl6ieuk-SqIYO4pE07VGDU4iIw'],
			// 											success (res) {
			// 												console.log(res)
			// 												 if (res['FTy336_vGTj_BrwDwwl6ieuk-SqIYO4pE07VGDU4iIw'] === 'accept') {
			// 													  wx.showToast({
			// 													    title: '订阅OK！',
			// 													    duration: 1000,
			// 													    success(data) {
																			
			// 													    }
			// 													  })
			// 												 }
			// 											}
			// 										})	
			// 									} else {
														
			// 									}
			// 								},
			// 							});
			// 						}
			// 	        }
			// 	      }
			// 	})
				
				
			// }
			
		},
		onHide: function() {
			console.log('App Hide');
		},
		methods: {
			...mapMutations(['login']),
		}
	}
</script>

<style>
	/* 头条小程序需要把 iconfont 样式放到组件外 */
	@import "components/m-icon/m-icon.css";
	@import 'style/iconfont.css';
	@import "style/common.css";
  /* @import 'style/iconfont.css' */
	/*每个页面公共css */
	*{
		padding: 0;
		margin: 0;
	}
	.uni-picker-container {
		font-size: 32px;
	}

	page {
		min-height: 100%;
		display: flex;
		font-size: 16px;
	}

	/* #ifdef MP-BAIDU */
	page {
		width: 100%;
		height: 100%;
		display: block;
	}

	swan-template {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* 原生组件模式下需要注意组件外部样式 */
	custom-component {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	/* #ifdef MP-ALIPAY */
	page {
		min-height: 100vh;
	}

	/* #endif */

	/* 原生组件模式下需要注意组件外部样式 */
	m-input {
		width: 100%;
		/* min-height: 100%; */
		display: flex;
		flex: 1;
	}

	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #efeff4;
		padding-bottom: 100rpx;
		/* padding: 10px; */
	}

	.input-group {
		background-color: #ffffff;
		margin-top: 20px;
		position: relative;
	}

	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #efefef;
	}

	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #efefef;
	}

	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
		font-size: 14px;
		line-height: 40px;
	}

	.input-row .title {
		width: 100px;
		padding-left: 15px;
	}

	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 8px;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #efefef;
	}

	.btn-row {
		margin-top: 45px;
		padding: 10px;
	}

	.ui-red {
		color: #ff512f;
	}

	button.primary {
		background-color: #143270;
		font-size: 16px;
		letter-spacing: 10px;
		padding: 4px 0;
	}

	button.primary:hover {
		background: #143270;
	}
</style>
