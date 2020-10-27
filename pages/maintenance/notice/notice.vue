<template>
	<view class="content">
		
		<view v-for="(item,index) in list.data" :key="index">
			
			<view class="ui-noticeContent" @click="herfTo(item.id)">
			<text class="iconfont icon-iconxx2 myicon"></text>
			{{item.noticename}}</view>
			<!-- <uni-card thumbnail="">
				<view >{{item.noticename}}
				</view>
			</uni-card> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:null,
			}
		},
		async onLoad() {
			let obj = {
				currPage:1,
				toatlNum:50,
			}
			this.list = await this.$api.getNoticeList(obj)
			uni.hideLoading();
			console.log(this.list)
			// this.list = data.data;
		},
		methods: {
			herfTo(data){
				uni.navigateTo({
					url:`../noticDetail/noticDetail?id=${data}`
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.myicon{
		color: #8799a3;
		font-size: 26px;
		margin-right: 20rpx;
	}
.uni-card{
	border:1px solid #f10;
}
.ui-noticeContent{
	width: 94%;
	background: #fff;
	padding: 14rpx;
	line-height: 75rpx;
	margin: 10rpx auto;
	text-indent: 32rpx;
	color:#8799a3;
	display: flex;
	align-items: center;
}
</style>
