<template>
	<view class="ui-overflow">
		<view class="ui-container">
			
			<view class="ui-left">
				<image class="ui-img" src="../../static/img/logo.jpg" mode=""></image>
				<text class="ui-textl">XXXXXX</text>
			</view>img/
			<view class="ui-right" v-for="item in mydata">
				<text class="ui-textr">{{item}}</text>
				<image class="ui-img" src="../../static/img/logo.jpg" mode=""></image>
			</view>
		</view>
		<view class="ui-inputBtn">
			<textarea ref="textInput" class="ui-input" type="text" v-model="textareaValue" /></textarea><button class="ui-btb" size="mini" type="default" @click="sendData">发送</button>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				mydata:["你好！"],
				textareaValue:""
			}
		},
		methods: {
			onNavigationBarButtonTap(e){
				 uni.navigateTo({  
				      url: '/pages/telephoneNumber/telephoneNumber'  
				    });  
			},
			sendData(){
				if(this.textareaValue=="")return;
				this.mydata.push(this.textareaValue);
				console.log(this.textareaValue)
				this.textareaValue=""
				
			}
		}
	}
</script>

<style>
	.ui-title{
		text-indent: 24rpx;
		margin-bottom: 16rpx;
	}
	.ui-inputBtn{
		width: 90%;
		margin: 0 auto;
		margin-top: 16rpx;
	}
	body{
		height: 100%;
	}
	.ui-btb{
		display: inline-block;
		width: 18%;
		margin-left: 6px;
	}
	.ui-input{
		border:1px solid #f1f1f1;
		border-radius: 6rpx;
		background-color: #fff;
		display: inline-block;
		height: 100%;
		width: 80%;
		text-indent: 12rpx;
		    line-height: 28px;
	}
	.ui-overflow{
		overflow: hidden;
		display: flex;
		flex-direction: column;
		height: 100%;
		padding-bottom: 16rpx;
	}
	.ui-right{
		text-align: right;
		margin-top: 20rpx;
		
		margin-bottom: 20rpx;
	}
	.ui-left{
	
		padding-top: 10px;
		vertical-align: baseline;
	}
	.ui-textr{
		background-color: #fff;
		margin-right: 10px;
		vertical-align: middle;
		padding: 6px;
		border-radius: 9px;
	  display: inline-block;
		max-width: 244px;
		text-align: left;
	}
		.ui-textl{
			  vertical-align: middle;
				background-color: rgba(103,191,114,.6);
				padding: 12rpx;
				border-radius: 16rpx;
				margin-left: 20rpx;
		}
	.text-border{
		
		background-color: #62d63ca3;
	}
.ui-container{
	width: 94%;
	padding: 20px;
	margin: 0 auto;
	min-height: 532px;
/* 	border: 1px solid #d6d6d6;
	border-radius: 12px; */
	flex:1;
	overflow-y: scroll;
	}
.ui-img{
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
	vertical-align: middle;
}
</style>
