<template>
	<view>
		<ul class="ui-listcontent">
			<li class="ui-listContentLi" v-for="(item,index) in list" :key="index" @click="toHref(item.path)">
				<i class="iconfont color" :class="item.icon"></i>
				<text>{{item.title}}</text>
				<i class="iconfont icon-yousanjiao iconRight"></i>
			</li>
		</ul>
	</view>
</template>
<script>
	export default {
		props:{
			list:{
				type:Array,
				default:null
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			toHref(data){
				uni.navigateTo({
					url:data
				})
			}
		}
	}
</script>

<style>	
.color{
	color: #143270;
	font-weight: 600;
}
.icon-yousanjiao.iconRight{
	font-size: 12px;
	position: absolute;
	right: 0;
}
.ui-listContentLi{
	position: relative;
	width: 100%;
	height: 100rpx;
	display: flex;
	align-items: center;
	color: #7d7d7d;
	line-height: 28px;
	border-bottom: 2rpx solid #e7e7e7;
}
.ui-listContentLi:last-child{
	border-bottom: none;
}
.ui-listcontent{
	width: 100%;
}
i{
	font-size: 26px;
	margin-left: 30rpx;
	margin-right: 30rpx;
	
}
</style>
