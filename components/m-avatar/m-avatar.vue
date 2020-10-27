<template>
	<view>
		<image class="ui-avatar" :src="img" mode=""></image>
	</view>
</template>

<script>
	export default {
		props:{
			img:{
				type:String,
				default:"../../static/img/logo.jpg"
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.ui-avatar{
		width:180rpx;
		height: 180rpx;
		margin: 0 auto;
		display: block;
		border-radius: 50%;
	}
</style>
