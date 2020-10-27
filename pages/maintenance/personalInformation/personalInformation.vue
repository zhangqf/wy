<template>
	<view class="content">
		<view class="ui-content">
			<Avatar :img="host+''+list.icon"></Avatar>
		</view>
	<uni-card :title="list.userName">
		<view class="ui-item" ><span>用户名称</span> <span class="ui-span">{{list.name}}</span></view>
		<view class="ui-item"><span>性别 </span><span class="ui-span">{{list.sex}}</span></view>
	<view class="ui-item"><span>联系电话</span> <span class="ui-span">{{list.phone}}</span></view>
	<view class="ui-item"><span>年龄</span> <span class="ui-span">{{list.age}}</span></view>
	
	</uni-card>
	</view>
</template>

<script>
	import Avatar from "../../components/m-avatar/m-avatar"
	export default {
		components:{Avatar},
		data() {
			return {
				list:{},
				host:null
			};
		},
	 async onLoad(options) {
		 console.log(options)
	const {data} =	await	this.$api.getManagerById(options);
	this.host = this.$Host
	uni.hideLoading();
	console.log(data)
	this.list = data
	}	
	}
</script>

<style lang="less" scoped>
	.uni-card{
		flex:none
	}
	.ui-content{
		padding: 30rpx 0;
	}
.content{
		padding-bottom: 300rpx;
	}
	.ui-display{
		display: flex;
		image{
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
	.ui-span{
		margin-left: 20rpx;
		color: #a9a9a9;
	}
	.ui-item{
		padding: 20rpx 10rpx;
		border-bottom: 2rpx dashed  #c9c9c9;
		display: flex;
		justify-content: space-between;
		color: #696969;
	}
</style>
