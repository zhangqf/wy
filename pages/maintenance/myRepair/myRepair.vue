<template>
	<view class="content">
		<!-- 自定义底部按钮 -->
		<uni-card class="ui-card" note="true" v-for="(item,index) in list" key="item.id" :extra="item.createtime | renderTime" :key="item.id">
			
			<view class="ui-item" >报修人: <span class="ui-span">{{item.userName}}</span></view>
			<view class="ui-item" >报修日期: <span class="ui-span">{{item.createtime | renderTime}}</span></view>
			<view class="ui-item" >联系电话: <span class="ui-span">{{item.userTel}}</span></view>
			<view class="ui-item">报修类型: <span class="ui-span">{{item.warrName}}</span></view>
			<view class="ui-item">报修项目: <span class="ui-span">{{item.repairName}}</span></view>
			<view v-if="item.content" class="ui-item">报修描述: <span  class="ui-span">{{item.content}}</span></view>
			<view class="ui-item ui-display"  >
				<image v-if="itemImg" v-for="(itemImg,index) in item.imgList" :key="index" :src="host+''+itemImg" mode="aspectFill "></image>
			</view>
			<view class="cell_dashed">
			</view>
			<view class="ui-item" v-if="item.maintName">接单人: <span class="ui-span">{{item.maintName}}</span></view>
			<view class="ui-item" v-if="item.recetime">维修时间: <span class="ui-span">{{item.recetime | renderTime}}</span></view>
			<view class="ui-item" v-if="item.maintTel">联系电话: <span class="ui-span">{{item.maintTel}}</span></view>
			<view v-if="item.receivetext" class="ui-item">维修描述: <span class="ui-span">{{item.receivetext}}</span></view>
			<view class="ui-item" v-if="item.myokimg">维修图片: </view>
			<view class="ui-item ui-display">
				<image v-if="itemImg" v-for="(itemImg,index) in item.myokimg" :key="index" :src="host+''+itemImg" mode="aspectFill "></image>
			</view>
			<template v-slot:footer>
				<view class="footer-box">
					<view style="display: inline-block; margin-right: 12rpx;" >状态：</view>
					<uni-tag style="display: inline-block;" class="ui-tagborder" v-if="item.state==1" text="待接单" type="primary" :inverted="true"  size="small"></uni-tag>
					<uni-tag style="display: inline-block;" class="ui-tagborder" v-if="item.state==2" text="已接单" type="error" :inverted="true" size="small"></uni-tag>
					<uni-tag style="display: inline-block;" class="ui-tagborder" v-if="item.state==3" text="待评价" type="warning" :inverted="true" size="small" ></uni-tag>
					<uni-tag style="display: inline-block;" class="ui-tagborder" v-if="item.state==4" text="已完成" type="success" :inverted="true" size="small"></uni-tag>
				</view>
			</template>
			<!-- <view v-if="item.state==3" class="ui-comment">
					<view class="cell_dashed">
					</view>
					<view class="ui-item">评价</view>
					<textarea v-model="remark" placeholder="对维修人员的工作评价" />
					<view  class="ui-item">满意度</view>
					<uni-rate :margin="20" class="ui-rate" v-model="value" @change="onChange"/>
				 <button class="primary" @click="submit">提交</button>
			</view> -->
			<view v-if="item.state==4" class="ui-ratecontent">
				<view  class="cell_dashed">
				</view>
				<view  class="ui-item">评价：</view>
				<textarea v-model="item.evaluatetext" placeholder="" :disabled="true" />
				<view  class="ui-item ui-state4">满意度</view>
				<uni-rate :margin="20" class="ui-rate" :value="item.satisid" @change="onChange" :readonly="true"/>
			</view>
		</uni-card>
	
	</view>
</template>

<script>
	
	import uniTag from "../../components/uni-tag/uni-tag.vue"
	import uniCard from '../../components/uni-card/uni-card.vue'
	import uniList from '../../components/uni-list/uni-list.vue'
	import uniListItem from '../../components/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniCard,
			uniList,
			uniListItem,
			uniTag
		},
		filters:{
			 renderTime(date) {
					console.log(typeof date)
					if(date){
						let str = date.replace(/-/g, '/').replace('T', ' ').replace('.000+0000', '')
						console.log(new Date(str).toString())
						 var dates = new Date(new Date(str).toString())
						 var y = dates.getFullYear()
						       var m = dates.getMonth() + 1
						       m = m < 10 ? ('0' + m) : m
						       var d = dates.getDate()
						       d = d < 10 ? ('0' + d) : d
									 var h = dates.getHours() + 8
									 h = h < 10 ? ('0' + h) : h
									 var min = dates.getMinutes();
									 min = min < 10 ? ('0' + min) :min
									 var s = dates.getSeconds();
									 s = s < 10 ? ('0' + s) : s;
						       const time = y + '-' + m + '-' + d + '  '+h+":" + min + ':' + s
						       return time
						}
					}
			},
		data() {
			return {
				list: [],
				host:null,
				data:null
			};
		},
		methods:{
		},
		onLoad: function(options) {
			this.host = this.$Host
			let that = this
			let Obj = {
				currPage: 1,
				toatlNum: 50
			}
			this.$api.getOrderByManager(Obj).then(res => {
				console.log(res)
				 uni.hideLoading();
				that.list = res.data
				that.list.map((item,index)=>{
					if(item.repimgs){
						item['imgList'] = item.repimgs.split(",")
					}
				})
				console.log(that.list)
			})
		}
	}
</script>

<style lang="less" scoped>
	.ui-card{
		// margin: 0;
		flex:none;
	}
	textarea{
		border: 1px solid #d9d9d9;
		width: 644rpx;
		margin:12rpx auto;
		padding:16rpx;
		border-radius: 12rpx;
	}
	.cell_dashed{
		height: 2rpx;
	  border-bottom:1px dashed #ccc;
	}
	.ui-comment{
		width: 100%;
		background: #FFF;
		margin-bottom: 150rpx;
		.ui-item{
			width: 90%;
			margin: 0 auto;
		}
	}
	.cell_dashed{
		height: 2rpx;
	  border-bottom:1px dashed #ccc;
	}
	.footer-box{
		    // width: 155rpx;
		    // float: right;
				.ui-tagborder{
					border: none;
					font-weight: 700;
					font-size: 24px;
				}
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
	}
	.ui-item{
		padding: 10rpx 0;
	}
</style>
