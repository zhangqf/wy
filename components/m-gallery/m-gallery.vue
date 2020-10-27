<template>
	<view>
		<swiper class="ui-gallery" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true" >
			<swiper-item v-for="(item,index) in galleryLIst" :key="item.index" @click="herfTo(galleryLIst[index].url)">
				<view class="swiper-item" >
					<image class="ui-galleryImage" :src="host+''+item.icon" mode="" ></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props:{
			host:{
				type:String,
				default:""
			},
			galleryLIst:{
				type:Array,
				default:null
			}
		},
		methods:{
			herfTo(item){
				console.log(item)
				uni.navigateTo({
					url:`../../pages/webview/webview`
				})
			}
		}
	}
</script>

<style>
	.ui-gallery{
		height: 400rpx;
	}
	
.ui-galleryImage{
	width: 100%;
}
</style>
