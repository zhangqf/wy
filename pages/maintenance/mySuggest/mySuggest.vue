<template>
	<view class="content">
		<uni-card class="ui-card" :title="item.comName" note="true" v-for="(item,index) in list" :extra="item.createtime | renderTime" :key="item.id">
			<view class="ui-item" >联系电话: <span class="ui-span">{{item.comTel}}</span></view>
			<view v-if="item.content" class="ui-item">建议内容: <span  class="ui-span">{{item.content}}</span></view>
			<view class="ui-item ui-display"  >
				<image v-if="itemImg" v-for="(itemImg,index) in item.imgList" :key="index" :src="host+''+itemImg" mode="aspectFill "></image>
			</view>
			<template v-slot:footer>
				<view class="footer-box">
					<uni-tag class="ui-tagborder" v-if="item.state==0" text="异常" type="error" :inverted="true"  size="small"></uni-tag>
					<uni-tag class="ui-tagborder" v-if="item.state==1" text="待受理" type="warning" :inverted="true" size="small"></uni-tag>
					<uni-tag class="ui-tagborder" v-if="item.state==2" text="已受理" type="success" :inverted="true" size="small" ></uni-tag>
				</view>
			</template>
		</uni-card>
	</view>
</template>

<script>
	import uniCard from '../../components/uni-card/uni-card.vue'
	export default {
		components:{uniCard},
		data() {
			return {
				list: [],
				host:null,
			};
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
		onLoad: function(options) {
			console.log(options)
			let that = this
			this.host = this.$Host
			let Obj = {
				currPage: 1,
				toatlNum: 100
			};
			this.$api.getComplaintByManage(Obj).then(res => {
				console.log(res)
				uni.hideLoading();
				that.list = res.data
				that.list.map((item,index)=>{
					if(item.imgs){
						item['imgList'] = item.imgs.split(",")
					}
				})
			})
		}
	}
</script>

<style lang="less" scoped>
	.ui-card{
		// margin: 0;
		flex:none;
	}
	.footer-box{
		    width: 18%;
		    float: right;
				.ui-tagborder{
					border: none;
					font-weight: 700;
					font-size: 24px;
					width: 100%;
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
