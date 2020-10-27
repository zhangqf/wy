<template>
	<view>
	<uni-grid :column="4" :show-border="false" :square="false">
		<uni-grid-item class="ui-gridItems" v-for="(item,index) in itemList" :key="index">
			<view class="ui-href" @click="hrefTo(item.path)">
					<image class="ui-image" :src="item.url" mode=""></image>
					<text class="ui-text">{{item.text}}</text>
				
			</view>
		</uni-grid-item>
	</uni-grid>
	</view>
</template>

<script> 
	import uniGrid from "../uni-grid/uni-grid.vue"
	import uniGridItem from '../uni-grid-item/uni-grid-item.vue'

	export default {
		components:{
			uniGrid,
			uniGridItem,
		},
		props:{
			itemList:{
				type:Array,
				default:null
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			hrefTo(data){
				console.log(data)
				if(data ==""){
					uni.showModal({
						content:"敬请期待！",
						showCancel:true,
						cancelText:"取消",
						cancelColor:"#c2c0b5",
						confirmText:"确定",
						confirmColor:"#007AFF"
						})
					return
				}
				uni.navigateTo({
					url:data
				});
			}
		}
	}
</script>

<style scoped>
	.ui-href{
		    display: flex;
		    flex-direction: column;
	}
	.ui-gridItems{
		margin-top: 40rpx;
	}
.ui-image{
	width: 80rpx;
	height: 80rpx;
	margin: 0 auto;
}
.ui-text{
	font-size: 25rpx;
	text-align: center;
}
</style>
