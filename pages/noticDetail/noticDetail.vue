<template>
	<view class="content">
		
			<header>
				{{list.noticename}}
			</header>
			<view class="ui-border"></view>
			<view class="ui-container" v-html="list.content">
				
			</view>
		<!-- 	<uni-card :title="list.noticename" >
				<view v-html="list.content">
				</view>
			</uni-card> -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:null,
			}
		},
		async onLoad(options) {
			console.log(options)
			const {data} = await this.$api.getNoticeById({id:options.id})
			uni.hideLoading();
			this.list = data;
			console.log(this.list)
			// this.list = data.data;
		},
		methods: {
		}
	}
</script>

<style lang="less" scoped>
.content{
	background-color: #fff;
	header{
		line-height: 120rpx;
		text-align: center;
		color: #ff1010;
		font-size: 24px;
	}
	.ui-border{
		height: 1px;
		width: 96%;
		background: #8F8F94;
		margin: 0 auto;
	}
	.ui-container{
		width: 90%;
		margin: 20rpx auto;
	}
}
</style>
