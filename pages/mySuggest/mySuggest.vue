<template>
	<view class="content">
		<k-scroll-view v-if="roleType==1" ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip" :loadTip="loadTip"
		 :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height" :bottom="bottom"
		 :autoPullUp="autoPullUp" @onPullDown="handlePullDown" @onPullUp="handleLoadMore">
			<uni-card :title="item.comName" note="true" v-for="(item,index) in list" :extra="item.createtime | renderTime" :key="item.id">
				<view class="ui-item">联系电话: <span class="ui-span">{{item.comTel}}</span></view>
				<view v-if="item.content" class="ui-item">建议内容: <span class="ui-span">{{item.content}}</span></view>
				<view class="ui-item ui-display">
					<image @click="preview(itemImg)" v-if="itemImg" v-for="(itemImg,index) in item.imgList" :key="index" :src="host+''+itemImg" mode="aspectFill "></image>
				</view>
				<template v-slot:footer>
					<view class="footer-box">
						<uni-tag class="ui-tagborder" v-if="item.state==0" text="异常" type="error" :inverted="true" size="small"></uni-tag>
						<uni-tag class="ui-tagborder" v-if="item.state==1" text="待受理" type="warning" :inverted="true" size="small"></uni-tag>
						<uni-tag class="ui-tagborder" v-if="item.state==2" text="已受理" type="success" :inverted="true" size="small"></uni-tag>
					</view>
				</template>
			</uni-card>
		</k-scroll-view>
		<k-scroll-view v-else ref="k-scroll-view" :refreshType="refreshType" :refreshTip="refreshTip" :loadTip="loadTip"
		 :loadingTip="loadingTip" :emptyTip="emptyTip" :touchHeight="touchHeight" :height="height" :bottom="bottom"
		 :autoPullUp="autoPullUp" @onPullDown="handlePullDowns" @onPullUp="handleLoadMores">
			<uni-card class="ui-card" :title="item.comName" note="true" v-for="(item,index) in list" :extra="item.createtime | renderTime"
			 :key="item.id">
				<view class="ui-item">联系电话: <span class="ui-span">{{item.comTel}}</span></view>
				<view v-if="item.content" class="ui-item">建议内容: <span class="ui-span">{{item.content}}</span></view>
				<view class="ui-item ui-display">
					<image @click="preview(itemImg)" v-if="itemImg" v-for="(itemImg,index) in item.imgList" :key="index" :src="host+''+itemImg" mode="aspectFill "></image>
				</view>
				<template v-slot:footer>
					<view class="footer-box">
						<uni-tag class="ui-tagborder" v-if="item.state==0" text="异常" type="error" :inverted="true" size="small"></uni-tag>
						<uni-tag class="ui-tagborder" v-if="item.state==1" text="待受理" type="warning" :inverted="true" size="small"></uni-tag>
						<uni-tag class="ui-tagborder" v-if="item.state==2" text="已受理" type="success" :inverted="true" size="small"></uni-tag>
					</view>
				</template>
			</uni-card>
		</k-scroll-view>
	</view>
</template>

<script>
	import uniCard from '../../components/uni-card/uni-card.vue'
	export default {
		components: {
			uniCard
		},
		data() {
			return {
				list: [],
				host: null,
				roleType: '',
				myId: '',
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
		methods: {
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
			handlePullDowns(stopLoad){
				let Obj = {
					id: this.myID,
					currPage: 1,
					toatlNum: this.totalNum,
				}
				this.$api.getComplaintByManage(Obj).then(res => {
					console.log(res)
					uni.hideLoading();
					let listlast = res.data
					listlast.map((item, index) => {
						if (item.repimgs) {
							item['imgList'] = item.repimgs.split(",")
						}
						// this.list.push(item)
					})
					
					this.list = listlast
					
				})
				stopLoad ? stopLoad({
					isEnd: false
				}) : '';
			},
			handlePullDown(stopLoad){
				let Obj = {
						id: this.myID,
						currPage: 1,
						toatlNum: this.totalNum,
					}
					this.$api.getOrderByClientId(Obj).then(res => {
						console.log(res)
						uni.hideLoading();
						let listlast = res.data
						listlast.map((item, index) => {
							if (item.repimgs) {
								item['imgList'] = item.repimgs.split(",")
							}
							// this.list.push(item)
						})
						
						this.list = listlast
						
					})
					stopLoad ? stopLoad({
						isEnd: false
					}) : '';			
			},
			handleLoadMores(stopLoad) {
				
				let Obj = {
					id: this.myID,
					currPage: ++this.currentPage,
					toatlNum: this.totalNum,
				}
				this.$api.getComplaintByManage(Obj).then(res => {
					console.log(res)
					uni.hideLoading();
					let listlast = res.data

					if (listlast.length == 0) {
						stopLoad ? stopLoad({
							isEnd: true
						}) : '';
						return
					}
					listlast.map((item, index) => {
						if (item.repimgs) {
							item['imgList'] = item.repimgs.split(",")
						}
						// this.list.push(item)
					})
				
					this.list = this.list.concat(listlast)
				
				})
			},
			handleLoadMore(stopLoad) {
				let Obj = {
					id: this.myID,
					currPage: ++this.currentPage,
					toatlNum: this.totalNum,
				}
				this.$api.getOrderByClientId(Obj).then(res => {
					console.log(res)
					uni.hideLoading();
					let listlast = res.data

					if (listlast.length == 0) {
						stopLoad ? stopLoad({
							isEnd: true
						}) : '';
						return
					}
					listlast.map((item, index) => {
						if (item.repimgs) {
							item['imgList'] = item.repimgs.split(",")
						}
						// this.list.push(item)
					})
				
					this.list = this.list.concat(listlast)
					
				})
			}
		},
		onLoad: function(options) {
			console.log(options)
			let that = this
			this.host = this.$Host
			this.myId = options.id
			this.roleType = uni.getStorageSync("soleType")
			let Obj = {
				id: options.id,
				currPage: this.currentPage,
				toatlNum: this.totalNum
			};
			if (uni.getStorageSync('soleType') == 1) {
				this.$api.getComplaintByClientId(Obj).then(res => {
					console.log(res)
					uni.hideLoading();
					that.list = res.data
					that.list.map((item, index) => {
						if (item.imgs) {
							item['imgList'] = item.imgs.split(",")
						}
					})
				})
			}
			if (uni.getStorageSync('soleType') == 2) {
				this.$api.getComplaintByManage(Obj).then(res => {
					console.log(res)
					uni.hideLoading();
					that.list = res.data
					that.list.map((item, index) => {
						if (item.imgs) {
							item['imgList'] = item.imgs.split(",")
						}
					})
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.uni-card {
		flex: none
	}
	.content{
		padding-bottom: 0;
	}
	.footer-box {
		width: 18%;
		float: right;

		.ui-tagborder {
			width: 100%;
			border: none;
			font-weight: 700;
			font-size: 24px;
		}
	}

	.ui-display {
		display: flex;

		image {
			width: 25%;
			padding: 0 8rpx;
			height: 155rpx;
		}
	}

	.uni-tag {
		float: right;
		width: 16%;
		text-align: right;
	}

	.ui-span {
		margin-left: 20rpx;
	}

	.ui-item {
		padding: 10rpx 0;
	}
</style>
