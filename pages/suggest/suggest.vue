<template>
	<view class="content">
		<view class="block__title">建议信息</view>
		<view class="cu-form-group">
			<textarea id="context" :value="context" @input="bindInput" placeholder="请输入建议内容"></textarea>
		</view>

		<view class="cu-bar bg-white margin-top">
			<view class="action">
				图片上传
			</view>
			<view class="action">
				{{imgList.length}}/4
			</view>
		</view>
		<view v-show="isShow" class="progress-box">
			<progress :percent="percent" stroke-width="3" />
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-for="(img,index) in imgList" :key="index" bindtap="ViewImage" :data-url="imgList[imageIndex]">
					<image :src='imgList[index]' mode='aspectFill'></image>
					<view class="cu-tag bg-red" style="    width: 40rpx;
    height: 40rpx;" @tap="deleteImage(index)" :data-index="imageIndex">
						<image class="ui-picturecancle" style="    width: 80%;
    height: 80%;" src="../../static/img/picturecancle.png"
						 mode="aspectFit"></image>
					</view>
				</view>
				<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
					<image class="" style="height: 130rpx;margin-top: 20rpx;
    width: 130rpx;" src="../../static/img/pictureupload.png"
					 mode="aspectFit"></image>
				</view>
			</view>
		</view>
		<view class="button_up_blank"></view>
		<view class="flex flex-direction">
			<button class="ui-btn color cu-btn bg-green margin-tb-sm lg" style="width: 80%;" @click="bindOwner()">提交</button>
		</view>
	</view>
</template>

<script>
	import host from '../../common/config.js'
	export default {
		data() {
			return {
				imgList: [],
				imageIndex: 0,
				index: null,
				complaintIndex: 0,
				roomCloums: [],
				roomIdArr: [],
				roomName: "请选择",
				roomId: '',
				roomShow: false,
				columns: ['报修', '建议', '其他'],
				typeCds: ['809001', '809002'],
				typeName: '请选择',
				typeCd: '',
				typeShow: false,
				photoList: [],
				tel: '',
				context: '',
				complaintName: '',
				userId: '',
				storeId: '',
				photos: [],
				communityId: "",
				isShow: false
			};
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {

		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			ChooseImage: function(e) {
				let that = this;
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						console.log(JSON.stringify(res.tempFilePaths));
						that.$data.imgList.push(res.tempFilePaths[0]);
						const uper = uni.uploadFile({
							url: host + "/api/upload", //仅为示例，非真实的接口地址
							filePath: res.tempFilePaths[0],
							name: 'file',
							formData: {
								'user': 'test'
							},
							success: (uploadFileRes) => {
								that.isShow = false
								that.photos.push(JSON.parse(uploadFileRes.data).data.fileUrl)
								console.log(that.photos)
							}
						});
						uper.onProgressUpdate(function(res) {
							// 进度条等于 上传到的进度
							that.isShow = true
							that.percent = res.progress
							console.log('上传进度' + res.progress)
							console.log('已经上传的数据长度' + res.totalBytesSent)
							console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend)
						})
					}
				});
			},
			deleteImage: function(e) {
				console.log(e);
				let imageArr = this.$data.imgList;
				imageArr.splice(e, 1);
			},
			_changeComplaint: function(e) {
				this.typeName = this.columns[e.detail.value];
				this.typeCd = this.typeCds[e.detail.value];
			},
			_changeRoom: function(e) {
				this.roomName = this.roomCloums[e.detail.value];
				this.roomId = this.roomIdArr[e.detail.value];
			},
			bindInput: function(e) {
				console.log('数据监听', e);
				switch (e.target.id) {
					case "complaintName":
						this.$data.complaintName = e.detail.value;
						break;
					case "tel":
						this.$data.tel = e.detail.value;
						break;
					case "context":
						this.$data.context = e.detail.value;
						break;
				}
				console.log(this);
			},
			bindOwner: function(e) {

				let obj = {
					"imgs": '',
					"content": this.context,
					"userid": uni.getStorageSync("clientmessageid"),
				};
				let _photos = this.photos;
				let photos = [];
				_photos.forEach(function(_item) {
					photos.push(_item);
				});
				let msg = "";
				console.log(photos)
				obj.imgs = photos.join(",")
				if (obj.context == "") {
					msg = "请填写报修内容";
				}
					
				if (msg != "") {
					wx.showToast({
						title: msg,
						icon: 'none',
						duration: 2000
					});
				} else {
					console.log("提交数据", obj);
					this.$api.saveComplaint(obj).then(res => {
						uni.hideLoading();
						if (res.code == 200) {
							uni.redirectTo({
							    url: `../mySuggest/mySuggest?id=${uni.getStorageSync("clientmessageid")}`
							});
						} else {
							wx.showToast({
								title: res.msg,
								icon: 'none',
								duration: 2000
							});
						}
					})
					// wx.redirectTo({
					// 	url: '/pages/repairDispatchFinish/repairDispatchFinish',
					// })
				}
			},
			onChange: function(e) {
				console.log(e);
			},
			onTypeConfirm: function(e) {
				console.log("onConfirm", e);
				this.typeName = e.detail.value;
				this.typeCd = e.detail.index ? '809001' : '809002';
				this.typeShow = false;
			},
			onTypeCancel: function(e) {
				this.typeShow = false;
			},
			chooseType: function(e) {
				this.typeShow = true;
			},
			onRoomConfirm: function(e) {
				console.log("onConfirm", e);
				this.roomName = e.detail.value;
				this.roomId = this.roomIdArr[e.detail.index];
				this.roomShow = false;
			},
			onRoomCancel: function(e) {
				this.roomShow = false;
			},
			chooseRoom: function(e) {
				this.roomShow = true;
			},
			afterRead: function(event) {
				const {
					file
				} = event.detail;

				let _that = this;

				const {
					photoList = []
				} = this;
				photoList.push(file);
				this.photoList = photoList; // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式

				factory.base64.urlTobase64(file.path).then(function(_baseInfo) {
					_that.photos.push(_baseInfo);
				});
				console.log("data信息：", this);
			},
			removePhoto: function(e) {
				console.log(e.detail.index);
				let _photoList = [];
				this.photoList.forEach(function(item, index) {
					if (index != e.detail.index) {
						_photoList.push(item);
					}
				});
				let _photos = [];
				this.photos.forEach(function(item, index) {
					if (index != e.detail.index) {
						_photos.push(item);
					}
				});
				this.photos = _photos;
				this.photoList = _photoList;
			}
		}
	};
</script>
<style>
	.ui-parkingUpload {
		width: 100%;
	}

	.ui-picturecancle {
		width: 80%;
		height: 80%;
		margin: 0 auto;
		padding: 4rpx;
		width: 80%;
		height: 80%;
	}

	.fontcolorwhite {
		color: #fff;
		width: 20rpx;
		height: 20rpx;
		font-size: 26px;
	}

	.bg-red {
		background-color: #e54d42;
		color: #ffffff;

	}

	.bg-img {
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}

	.cuIcon-cameraadd:before {
		content: "\e724";
	}

	.grid.col-4.grid-square>uni-view {
		padding-bottom: calc((100% - 33px)/4);
		height: 0;
		width: calc((100% - 33px)/4);
	}

	.grid.grid-square>uni-view {
		margin-right: 11px;
		margin-bottom: 11px;
		border-radius: 3px;
		position: relative;
		overflow: hidden;
	}

	.cu-tag {
		font-size: 24upx;
		vertical-align: middle;
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		padding: 0upx 16upx;
		height: 48upx;
		font-family: Helvetica Neue, Helvetica, sans-serif;
		white-space: nowrap;
	}

	.cu-tag:not([class*="bg"]):not([class*="line"]) {
		background-color: #f1f1f1;
	}

	.grid {
		display: flex;
		flex-wrap: wrap;
	}

	.grid.grid-square {
		overflow: hidden;
		width: 100%;
	}

	.grid.grid-square .cu-tag {
		position: absolute;
		right: 0;
		top: 0;
		border-bottom-left-radius: 3px;
		padding: 3px 6px;
		height: auto;
		background-color: rgba(0, 0, 0, 0.3);
	}

	.grid.grid-square>view>text[class*="cuIcon-"] {
		font-size: 52upx;
		position: absolute;
		color: #8799a3;
		margin: auto;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.solids::after {
		border: 4px solid #eee;
		content: " ";
		width: 200%;
		height: 200%;
		position: absolute;
		top: 0;
		left: 0;
		border-radius: inherit;
		-webkit-transform: scale(0.5);
		transform: scale(0.5);
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		pointer-events: none;
		box-sizing: border-box;
	}

	.uni-image>img {
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
	}

	.grid.grid-square>view {
		margin-right: 20upx;
		margin-bottom: 20upx;
		border-radius: 6upx;
		position: relative;
		overflow: hidden;
	}

	.grid.grid-square>view.bg-img image {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
	}

	.grid.col-1.grid-square>view {
		padding-bottom: 100%;
		height: 0;
		margin-right: 0;
	}

	.grid.col-2.grid-square>view {
		padding-bottom: calc((100% - 20upx)/2);
		height: 0;
		width: calc((100% - 20upx)/2);
	}

	.grid.col-3.grid-square>view {
		padding-bottom: calc((100% - 40upx)/3);
		height: 0;
		width: calc((100% - 40upx)/3);
	}

	.grid.col-4.grid-square>view {
		padding-bottom: calc((100% - 60upx)/4);
		height: 0;
		width: calc((100% - 60upx)/4);
	}

	.grid.col-5.grid-square>view {
		padding-bottom: calc((100% - 80upx)/5);
		height: 0;
		width: calc((100% - 80upx)/5);
	}

	.grid.col-2.grid-square>view:nth-child(2n),
	.grid.col-3.grid-square>view:nth-child(3n),
	.grid.col-4.grid-square>view:nth-child(4n),
	.grid.col-5.grid-square>view:nth-child(5n) {
		margin-right: 0;
	}

	.grid.col-1>view {
		width: 100%;
	}

	.grid.col-2>view {
		width: 50%;
	}

	.grid.col-3>view {
		width: 33.33%;
	}

	.grid.col-4>view {
		width: 25%;
	}

	.grid.col-5>view {
		width: 20%;
	}

	.grid.grid-square {
		overflow: hidden;
	}

	.cu-bar .action:last-child {
		margin-right: 16px;
	}

	.cu-bar .action:first-child {
		margin-left: 16px;
		font-size: 16px;
	}

	.cu-form-group {
		background-color: #ffffff;
		padding: 0.5px 16px;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		min-height: 55px;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
	}

	.cu-bar {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		position: relative;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		min-height: 55px;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
	}

	.margin-top {
		margin-top: 16px;
	}

	.bg-white {
		background-color: #ffffff;
		color: #666666;
	}

	/* .content {
		padding: 0 36rpx;
	} */

	.cu-form-group {
		background: #fff;
		padding: 12rpx 30rpx;
		text-indent: 24rpx;
	}

	.ui-btn.color {
		background-color: rgb(20, 50, 112);
		color: #fff;
	}

	.block__title {
		margin: 0;
		font-weight: 400;
		font-size: 14px;
		color: rgba(69, 90, 100, .6);
		padding: 40rpx 30rpx 20rpx;
	}

	.button_up_blank {
		height: 40rpx;
	}

	.uploader-container {
		margin: 0 10px;
	}

	.aku_photo_view {
		background-color: #FFF;
		padding: 40rpx 0 40rpx 40rpx;
	}

	.aku_photo_view text {
		font-size: 30rpx;
		color: #8a8a8a
	}

	.ui-wh {
		width: 40rpx;
		height: 40rpx;
	}
</style>
