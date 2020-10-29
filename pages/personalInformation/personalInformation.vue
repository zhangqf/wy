<template>
	<view class="content">
		<view class="" v-if="roleType==1">
			<view class="ui-personalinformationcontent" >
				<view class="ui-item"><span>用户名称</span> <span class="ui-span">{{list.clientname}}</span></view>
				<view class="ui-item"><span>用户角色</span> <span class="ui-span">{{list.clientType}}</span></view>
				<view class="ui-item"><span>性别 </span><span class="ui-span">{{list.gender}}</span></view>
				<view class="ui-item"><span>联系电话</span> <span class="ui-span">{{list.phone}}</span></view>
				<view class="ui-item"><span>楼栋</span> <span class="ui-span">{{list.buildingName}}</span></view>
				<view class="ui-item"><span>层高</span> <span class="ui-span">{{list.loucengCount}}</span></view>
				<view class="ui-item"><span>房号</span> <span class="ui-span">{{list.roomNo}}</span></view>
				<view class="ui-item"><span>建筑面积 </span><span class="ui-span">{{list.roomArea}}</span></view>
			</view>
		</view>
	

		<view v-else-if="roleType==3">
			<view class="ui-content">
				<Avatar v-if="list.icon==null|list.icon==''"></Avatar>
				<Avatar v-else :img="host+''+list.icon"></Avatar>
				<view class="ui-titlename">{{list.name}}</view>
			</view>
			<view class="ui-personalinformationcontent">

				<!-- <view class="ui-item"><span class="ui-information">用户名称</span> <span class="ui-span">{{list.name}}</span></view> -->
				<view class="ui-item"><span class="ui-information">年龄</span> <span class="ui-span">{{list.age}}</span></view>
				<view class="ui-item"><span class="ui-information">性别 </span><span class="ui-span">{{list.sex}}</span></view>
				<view class="ui-item"><span class="ui-information">联系电话</span> <span class="ui-span">{{list.phone}}</span></view>
				<view class="ui-item"><span class="ui-information">专业技能</span> <span class="ui-span">{{list.business}}</span></view>
				<view class="ui-item"><span class="ui-information">接单量</span> <span class="ui-span">{{list.orderNum}}</span></view>
				
				<view class="ui-item"><span class="ui-information">用户评价</span> <span class="ui-span">{{list.comprehensiveSro}}条</span></view>
			</view>
		</view>

		<view v-else>
			<view class="ui-content">
				<Avatar v-if="list.icon==null|list.icon==''"></Avatar>
				<Avatar v-else :img="host+''+list.icon"></Avatar>
				<view class="ui-titlename">{{list.name}}</view>
			</view>
			<view class="ui-personalinformationcontent">
				<view class="ui-item"><span>用户名称</span> <span class="ui-span">{{list.name}}</span></view>
				<view class="ui-item"><span>性别 </span><span class="ui-span">{{list.sex}}</span></view>
				<view class="ui-item"><span>联系电话</span> <span class="ui-span">{{list.phone}}</span></view>
				<view class="ui-item"><span>年龄</span> <span class="ui-span">{{list.age}}</span></view>
			</view>
		</view>
	</view>
</template>

<script>
	import Avatar from "../../components/m-avatar/m-avatar"
	export default {
		components: {
			Avatar
		},
		data() {
			return {
				list: {},
				roleType: '',
				host: null
			};
		},
		async onLoad(options) {
			console.log(options)
			console.log(wx.getStorageSync('soleType'))
			this.roleType = uni.getStorageSync('soleType');
			if (uni.getStorageSync('soleType') == 1) {

				const {
					data
				} = await this.$api.selCilentById(options.id);
				uni.hideLoading();
				console.log(data)
				this.list = data
			}
			if (uni.getStorageSync('soleType') == 2) {

				const {
					data
				} = await this.$api.getManagerById(options);
				this.host = this.$Host
				uni.hideLoading();
				console.log(data)
				this.list = data
			}
			if (uni.getStorageSync('soleType') == 3) {

				const {
					data
				} = await this.$api.getMaintById(options);
				this.host = this.$Host
				uni.hideLoading();
				console.log(data)
				this.list = data
			}

		},
		// methods:{
		// 	getList(){
		// 		let obj = {
		// 			id:uni.getStorageSync("clientmessageid"),
		// 			};
		// 		this.$api.getMaintById(obj).then(res=>{
		// 			 uni.hideLoading();
		// 			 console.log(res)
		// 			this.list = res.data
		// 		})
		// 	},
		// }
	}
</script>

<style lang="less">
	.ui-titlename{
		text-align: center;
		font-weight: 700;
		font-size: 16px;
	}
	.ui-personalinformationcontent{
		margin: 0 auto;
		// width: 90%;
		padding: 0 8rpx;
	}
	.ui-information{
		width: 180rpx;
	}
	.content {
		padding-bottom: 300rpx;
	}

	.ui-content {
		padding: 30rpx 0;
	}

	.ui-display {
		display: flex;

		image {
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

	.ui-span {
		margin-left: 20rpx;
		color: #a9a9a9;
	}

	.ui-item {
		padding: 20rpx 40rpx;
	
		display: flex;
		justify-content: space-between;
		color: #696969;
		margin: 8rpx 0;
		background: #fff;
	}
</style>
