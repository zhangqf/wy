<template>
	<view class="content">
		<uni-card  v-for="(items,index) in list" :key="items.id" :title="items.carNo" :extra="items.state==2?'固定车辆':'临时车辆'" :is-shadow="true" 
		 mode="basic">
				<view class="weight" v-if="items.clientname!=undefined">车主姓名:{{items.clientname}}</view>
				<view v-if="items.applyName!=undefined">申请人：{{items.applyName}}</view>
				<view v-if="items.carName!=undefined">车名：{{items.carName}}</view>
				<view v-if="items.carNo!=undefined">车位号：{{items.carNo}}</view>
				<view v-if="items.applyTel!=undefined">联系电话：{{items.applyTel}}</view>
			  <view v-if="items.buildName!=undefined">单元号：{{items.buildName}}</view>
			
			  <view v-if="items.loucName!=undefined">楼层：{{items.loucName}}</view>
			  <view v-if="items.roomName!=undefined">房间号：{{items.roomName}}</view>
				<view v-if="items.startTime!=undefined">开始时间：{{items.startTime}}</view>
				<view v-if="items.endTime!=undefined">结束时间：{{items.endTime}}</view>
				
				<view v-if="items.clientType!=undefined">出生日期：{{items.clientType}}</view>
				<view v-if="items.birthday!=undefined">出生日期：{{items.birthday}}</view>
				<view v-if="items.gender!=undefined">性别：{{items.gender}}</view>
				<view v-if="items.phone!=undefined">联系电话：{{items.phone}}</view>
				<view v-if="items.carportNo!=undefined">车位号：{{items.carportNo}}</view>
				<view v-if="items.cbeginTime!=undefined">开始时间：{{items.cbeginTime}}</view>
				
				
				<view v-if="items.cendTime!=undefined">结束时间：{{items.cendTime}}</view>
		
		
		</uni-card>
	</view>
</template>

<script>
	import uniCard from '@/components/uni-card/uni-card.vue'
	export default {
		components: {
			uniCard
		},
		data() {
			return {
				list: null
			};
		},
		onLoad(options) {
			let obj = {
				currPage: 1,
				toatlNum: 100,
				state: options.state,
			}
			console.log(obj)
			this.$api.getCarByManager(obj).then(res => {
				uni.hideLoading();
				console.log(res)
				this.list = res.data
			})
		}
	}
</script>

<style lang="less">
.weight{
	font-weight: 700;
}
</style>
