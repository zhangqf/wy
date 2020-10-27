<template>
	<view class="content">
		<view class="ui-car" @click="lookParkingPlace">
			
			<image class="ui-imgw" :src="src1" alt="">
			<text class="gradient">查看固定车位</text>
		</view>
		<view class="ui-car" @click="lookTemporaryParkingSpace">
			
			<image class="ui-imgw" :src="src2" alt="">
			<text class="gradient">查看临时车位</text>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				src1:require("@/static/img/gdcw.jpg"),
				src2:require("@/static/img/lscw.jpg"),
			}
		},
		methods: {
			lookParkingPlace() {
				console.log(123)
				uni.navigateTo({
					url: "../parkingDetail/parkingDetail?state=1"
				})
			},
			lookTemporaryParkingSpace() {
				uni.navigateTo({
					url: "../parkingDetail/parkingDetail?state=2"
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.ui-imgw{
		width: 74%;
	}
	.content{
		width: 96%;
	}
	.ui-car{
		width: 100%;
		margin-top: 40rpx;
	}
	.gradient {
		width: 100%;
		margin: 0 auto;
		text-align: center;
		background: -webkit-linear-gradient(left, #083f96, #E6D205 25%, #147B96 50%, #E6D205 75%, #054496);
		color: transparent;
		-webkit-background-clip: text;
		background-size: 200% 100%;
		animation: masked-animation 2s infinite linear;

	}

	@-webkit-keyframes masked-animation {
		0% {
			background-position: 0 0;
		}

		100% {
			background-position: -100% 0;
		}

	}

	.content {
		display: flex;
		
	}

	.ui-car {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		margin-bottom: 16rpx;

		text {
			margin-bottom: 10rpx;
			font-size: 18px;
		}
	}
</style>
