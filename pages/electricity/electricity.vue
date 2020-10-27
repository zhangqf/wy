<template>
	<view class="content">
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					单元号
				</view>
				<view ref="buildingPick" class="uni-list-cell-db">
					<picker @change="bindPickerChange" :value="buildIndex" :data-id="buidlList[buildIndex].id" :range="buidlList"
					 range-key="name">
						<view class="uni-input">{{buidlList[buildIndex].name}}</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					楼层数
				</view>
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChangefloor" :value="floorIndex" :data-id="floorNoList[floorIndex].loucengID" :range="floorNoList"
					 range-key="loucengNO">
						<view class="uni-input" :data-id="floorNoList[floorIndex].loucengID">{{floorNoList[floorIndex].loucengNO}}</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					房间号
				</view>
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChangeRoom" :value="roomIndex" :data-id="roomNameNoList[roomIndex].roomID" :range="roomNameNoList" range-key="roomNo">
						<view class="uni-input" :data-id="roomNameNoList[roomIndex].roomID" >{{roomNameNoList[roomIndex].roomNo}}</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					表类型
				</view>
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChangeMeter" :value="index" :range="hydropowerMeter" range-key="name">
						<view class="uni-input">{{hydropowerMeter[index].name}}</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					表编号
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" type="text" v-model="meterNo" placeholder="请填写仪表编号  例:001">
				</view>
			</view>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					使用量
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" type="number" v-model="meterResult" placeholder="请填写表的读数">
				</view>
			</view>
		</view>
		<!-- 		<view class="cu-bar bg-white margin-top">
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
					<view class="cu-tag bg-red" style="width: 40rpx;
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
		 -->
		<view class="uni-list" style="margin-bottom: 40px;">
			<view class="uni-list-cell" style="height: 50px;">
				<view class="uni-list-cell-left">
					备注
				</view>
				<view class="uni-list-cell-db">

				</view>
			</view>
			<textarea class="uni-textarea" type="text" placeholder="请填写表的读数" maxlength="500" v-model="remark"></textarea>
		</view>
		<button class="ui-btn color cu-btn bg-green margin-tb-sm lg" style="width: 80%;" @click="addMeter()">提交</button>
	</view>
</template>
<script>
	import host from '../../common/config.js'
	export default {
		components: {

		},
		data() {
			return {
				imgList: [],
				floorNoList: [{
					"loucengNO": "请先选择单元号"
				}],
				buidlList: [{
					"name": "请选择单元号"
				}],
				hydropowerMeter: [{
					name: "水表"
				}, {
					name: "电表"
				}, {
					name: "燃气表"
				}],
				meterResult:'',
				index: 0,
				buildIndex: 0,
				floorIndex: 0,
				roomIndex: 0,
				buildId: '',
				clientID: '',
				louID: '',
				meterNo: '',
				meterResult: '',
				propertyID: '',
				remark: '',
				roomID: '',
				metertype:'水表',
				roomNameNoList: [{
					"roomNo": "请选择房间号"
				}]
			};
		},
		onLoad() {
			this.getBuildAll()
		},
		methods: {

			deleteImage: function(e) {

				let imageArr = this.$data.imgList;
				imageArr.splice(e, 1);
			},
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
			// 选择单元号
			bindPickerChange: function(e) {
				console.log(e)
				this.floorIndex= 0,
				this.roomIndex= 0,
				this.floorNoList=[{
					"loucengNO": "请选择楼层"
				}]
				this.roomNameNoList= [{
					"roomNo": "请选择房间号"
				}]
				this.buildIndex = e.detail.value
				// this.buildId = e.target.dataset.id;
				this.buildId = this.buidlList[this.buildIndex].id;
				if (this.buildId != '') {
					this.getBuildAllfloor(this.buildId)
				}
			},
			// 获取楼层
			bindPickerChangefloor(e) {
				this.floorIndex = e.detail.value
				// this.louID = e.target.dataset.id
				this.louID = this.floorNoList[this.floorIndex].loucengID
				this.getRoom(this.louID)
			},
			addMeter() {
				let flag = true
				if(this.buildId==""){
					uni.showToast({
						  icon:"none",
					    title: '请选择单元号',
					    duration: 2000,
							
					});
				 return flag = false	
				 
				}
				if(this.louID==""){
					uni.showToast({
					    title: '请选择楼层号',
					    duration: 2000,
							icon:"none"
					});
					return flag = false
				}
				if(this.roomID==""){
					uni.showToast({
					    title: '请选择房间号',
					    duration: 2000,
							icon:"none"
					});
					return flag = false
				}
				if(this.meterNo==""){
					uni.showToast({
					    title: '仪表编号不能为空',
					    duration: 2000,
							icon:"none"
					});
					return flag = false
				}
				if(this.meterResult==""){
					uni.showToast({
					    title: '使用量不能为空',
					    duration: 2000,
							icon:"none"
					});
					return flag = false
				}
				let data = {
					buildID: this.buildId,
					clientID: this.clientID,
					louID: this.louID,
					meterNo: this.meterNo,
					meterResult: this.meterResult,
					metertype: this.metertype,
					propertyID: uni.getStorageSync("clientmessageid"),
					remark: this.remark,
					roomID: this.roomID,
				}				
				if(flag){
					this.$api.addMeter(data).then(res=>{
						
						uni.hideLoading();
						uni.showToast({
						    title: res.data,
						    duration: 1000
						});
						setTimeout(function(){
							uni.navigateBack({
							    delta: 1
							})
						},1000)
					})
				}
				
			},
			bindPickerChangeMeter(e) {
				console.log(e)
				this.index = e.detail.value
				this.metertype = this.hydropowerMeter[this.index].name
			},
			bindPickerChangeRoom: function(e) {
				this.roomIndex = e.detail.value
				this.roomID = e.target.dataset.id
				console.log(e)
				this.getCilentByRoom(e.target.dataset.id)
			},
			// 获取单元号
			getBuildAll() {
				this.$api.getBuildByAll().then(res => {
					uni.hideLoading()
					
					this.fetchData(res.data);
				})
			},
			// 获取单元号下的楼层
			getBuildAllfloor(data) {
				this.$api.getLouByBuild(data).then(res => {
					uni.hideLoading();
					console.log(res)
					if (res.data.length != 0) {
						this.floorNoList = this.floorNoList.concat(res.data)
					} 

				})
			},
			// 获取楼层下的房间
			getRoom(data) {
				this.$api.getRoomByLouC(data).then(res => {

					uni.hideLoading()

					if (res.data.length == 0) {
						this.roomNameNoList = [{
							"roomNo": "暂无数据"
						}]
					} else {
						this.roomNameNoList = res.data
						this.roomID = this.roomNameNoList[0].roomID
						this.clientID = res.data[0].clientMessageId
					}
				})
			},
			// 根据房间号获取业主id
			getCilentByRoom(data) {

				this.$api.getCilentByRoom(data).then(res => {

					uni.hideLoading()
					this.clientID = res.data.clientmessageid
				})
			},
			// 处理数据
			fetchData(data) {
				let buildNameList = [];
				let buidlList = [];
				data.map((item, index) => {
					buildNameList.push(item.buildingName)
					let buildListObj = {};
					buildListObj['name'] = item.buildingName
					buildListObj['id'] = item.buildingID
					buidlList.push(buildListObj)
				})
				this.buidlList = this.buidlList.concat(buidlList);
				
			}
		}
	}
</script>

<style lang="less" scoped>
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
		margin-right: 19upx;
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
		margin-right: 32rpx;
	}

	.cu-bar .action:first-child {
		margin-left: 32rpx;
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

	.cu-bar .action:last-child {
		margin-right: 32rpx;
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

	.cu-form-group {
		background: #fff;
		padding: 12rpx 30rpx;
		text-indent: 24rpx;
	}

	.bg-white {
		background-color: #ffffff;
		color: #666666;
	}

	.margin-top {
		margin-top: 16px;
	}

	.cu-bar .action:last-child {
		margin-right: 32rpx;
	}

	.cu-bar .action:first-child {
		margin-left: 32rpx;
		font-size: 16px;
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

	.cu-bar .action:first-child {
		margin-left: 32rpx;
		font-size: 16px;
	}

	.ui-btn.color {
		background-color: rgb(20, 50, 112);
		color: #fff;
	}

	.ui-btn {
		width: 90%;
	}

	.uni-textarea {
		width: 92%;
		margin: 10px auto;
	}

	.uni-view {
		font-size: 15px;
		line-height: 1.8;
	}

	.uni-list-cell::after {
		position: absolute;
		z-index: 3;
		right: 0;
		bottom: 0;
		left: 16px;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.uni-list-cell-left {
		white-space: nowrap;
		font-size: 15px;
		padding: 0 16px;
	}

	.uni-list-cell-db,
	.uni-list-cell-right {
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		flex: 1;
	}

	.uni-picker-container {
		display: none;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		box-sizing: border-box;
		z-index: 999;
		font-size: 16px;
	}

	.uni-input {
		height: 27px;
		padding: 8px 13px;
		line-height: 27px;
		font-size: 15px;
		background: #FFF;
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		flex: 1;
	}

	.uni-picker {
		display: block;
		cursor: pointer;
	}

	.uni-list::before {
		position: absolute;
		z-index: 10;
		right: 0;
		top: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.uni-list:after {
		position: absolute;
		z-index: 10;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.content {
		padding-top: 12px;

		.uni-list {
			margin-bottom: 12px;
			font-size: 15px;
			line-height: 1.8;
			background-color: #FFFFFF;
			position: relative;
			width: 100%;
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			-webkit-flex-direction: column;
			flex-direction: column;

		}

		.uni-list-cell {
			position: relative;
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-box-orient: horizontal;
			-webkit-box-direction: normal;
			-webkit-flex-direction: row;
			flex-direction: row;
			-webkit-box-pack: justify;
			-webkit-justify-content: space-between;
			justify-content: space-between;
			-webkit-box-align: center;
			-webkit-align-items: center;
			align-items: center;
		}

		.uni-input {
			background: #fff;
			padding: 15px;

		}
	}
</style>
