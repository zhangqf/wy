<template>
	<view class="content">
		<view class="ui-parkingHeader">
			申请临时车位
		</view>
		<view class="ui-parkingGroup">
			<view class="ui-parkingTitle">
				车号
			</view>
			<input class="ui-parkingInput" type="text" v-model="carNo" placeholder="请输入车牌号" />
		</view>
		<view class="ui-parkingGroup">
			<view class="ui-parkingTitle">
				车主
			</view>
			<input class="ui-parkingInput" type="text" v-model="carName" placeholder="请输入车主姓名" />
		</view>
		<view class="ui-parkingGroup">
			<view class="ui-parkingTitle">
				电话
			</view>
			<input class="ui-parkingInput" type="text" v-model="caeTel" placeholder="请输入车主电话号码" />
		</view>
		
		<view class="ui-parkingGroup">
			<view class="ui-parkingTitle">
				开始
			</view>
			<!-- <picker class="ui-parkingInput" mode="time" :value="time" start="00:00" end="23:59" @change="bindTimeChange">
				<view class="uni-input" :class="time==null?'ui-parkingTime':''" placeholder="请选择停车时长">{{time==null?'请选择停车时长':time}}</view>
			</picker> -->
			<hTimePicker class="ui-parkingInput" sTime="0" cTime="23" interval="1" @changeTime="changeStarTime">
			  <view slot="pCon" class="changeTime">
			    {{startTime==null?"选择开始时间":startTime}}
			  </view>
			</hTimePicker>
		</view>
		<view class="ui-parkingGroup">
			<view class="ui-parkingTitle">
				结束
			</view>
			<hTimePicker class="ui-parkingInput" sTime="0" cTime="23" interval="1" @changeTime="changeEndTime">
			  <view slot="pCon" class="changeTime">
			    {{endTime==null?"选择结束时间":endTime}}
			  </view>
			</hTimePicker>
		</view>
		<view class="ui-parkingTextareaGroup">
			<view class="ui-parkingTextareaTitle">
				事由
			</view>
			<textarea class="ui-parkingTextarea" type="text" v-model="remark" placeholder="请输入事由" />
		</view>
		<button class="primary" @tap="submit">提交</button>
	
	</view>
</template>


<script>
	import GoodDatePicker from '../../components/xiaomiaogu-good-date-picker/xiaomiaogu-good-date-picker.vue';
	import hTimePicker from "@/components/h-timePicker/h-timePicker.vue";
	export default {
		components: {
			GoodDatePicker,hTimePicker 
		},
		data() {
			return {
				  time: null,
					startTime:null,
					endTime:null,
					caeTel:null,
					carName:null,
					carNo:null,
					remark:null
			}
		},
		methods: {
			checkPhone(){ 
			    var phone = document.getElementById('phone').value;
			    if(!(/^1[3456789]\d{9}$/.test(phone))){ 
			        alert("手机号码有误，请重填");  
			        return false; 
			    } 
			},
			submit(){
				let msg = '';
				if(this.carNo==null){
					msg = "请填写车牌号"
				}else if(this.carName==null){
					msg = "请填写车主名称"
				}else	if(this.caeTel==null){
					msg = "请填写车主电话"
				}else if(this.carNo==null){
					msg = "请填写车牌号"
				}else if(this.remark==null){
					msg = "请填写事由"
				}else if(this.startTime==null){
					msg = "请填选择开始时间"
				}else if(this.endTime==null){
					msg = "请填选择结束时间"
				}
				if(msg!=""){
					uni.showToast({
						title:msg,
						icon:'none',
						duration:2000
					});
				}
				else if(!/^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/.test(this.carNo)){
					uni.showToast({
						title:'车牌号不正确',
						icon:'none',
						duration:2000
					});
				}else if(!(/^1[3456789]\d{9}$/.test(this.caeTel))){
					uni.showToast({
						title:"电话号码不正确",
						icon:'none',
						duration:2000
					});
				}
				else{
					let obj = {
						applyId:uni.getStorageSync("clientmessageid"),
						caeTel:this.caeTel,
						carName:this.carName,
						carNo:this.carNo,
						remark:this.remark,
						endTime:this.endTime,
						startTime:this.startTime,
					};
					this.$api.saveApplyCar(obj).then(res=>{
						console.log(res)
						uni.hideLoading();
						uni.showToast({
							title:res.data,
							icon:'none',
							duration:2000
						});
						uni.switchTab({
							url:"../main/main"
						})
					})
				}				
			},
			bindTimeChange: function(e) {
				this.time = e.target.value
			},
			changeStarTime(time,timeStamp){
				this.startTime = time
			},
			changeEndTime(time,timeStamp){
				this.endTime = time
			}
			
		}
	}
</script>
<style scoped>
	.primary{
		color: #fff;
		width: 80%;
		margin-top: 120rpx;
	}
	.ui-parkingGroup {
		display: flex;
		align-items: center;
		background-color: #fff;
		padding-left: 24rpx;
		border-bottom: 1rpx solid #eef1ef;
	}
	.ui-parkingTextareaTitle{
		height: 100rpx;
		line-height: 100rpx;
		padding-left: 34rpx;
	}
	.ui-parkingTextareaGroup{
		display: flex;
		flex-direction: column;
		align-items:flex-start;
		background-color: #fff;
		border-bottom: 1rpx solid #eef1ef;
		padding-bottom: 100rpx;
	}
	.ui-parkingTitle {
		padding-left: 10rpx;
	}
	.ui-parkingTextarea{
		height: 200rpx;
		width: 90%;
		margin:0 auto;
		border: 2rpx solid #e6e6e6;
		border-radius: 16rpx;
		padding: 18rpx;
		text-indent: 32rpx;
	}
	.ui-parkingHeader {
		color: #8F8F94;
		padding: 36rpx;
	}
	.ui-parkingContent {
		background-color: #fff;
	}
	.ui-parkingTime{
		color: #808080;
	}
	.ui-parkingInput {
		color: #464646;
		width: 80%;
		height: 100rpx;
		line-height: 100rpx;
		padding-left: 40rpx;
	}
	
</style>
