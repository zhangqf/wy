<template>
	<view class="content">
		<text class="ui-chooserepair">选择维修师傅</text>
		<radio-group class="ui-radiobox" @change="radioChange">
			<label class="uni-list-cell uni-list-cell-pd ui-label" v-for="item in list" :key="item.id">
				<view class="ui-checked">
					<checkbox :value="item.id" :checked="itemId==item.id" />
				</view>
				<view class="ui-labelContent">
					<view class="ui-cardItem">
						<text class="ui-name"> {{item.name}}</text><text class="ui-right">{{item.phone}}</text>
					</view>
					<view class="ui-cardItem ui-tagfontSize">
						<text>性别：{{item.sex}}</text> <text class="ui-right"> 年龄：{{item.age}} </text>
						<text class="ui-right ui-red"> 总接单量：{{item.orderNum}}</text>
					</view>
					<view class="ui-cardItem ui-tagfontSize">
						专业技能：{{item.business}}
					</view>

					<view class="ui-cardItem">
						总评价 <text class="ui-comprehensiveSro ui-red">{{item.comprehensiveSro}}</text> 分
					</view>
				</view>
			</label>
		</radio-group>
		<view class="btn-row">
			<button type="primary" class="primary" @click="submit">确定</button>
		</view>
	</view>
</template>

<script>
	import uniCard from '@/components/uni-card/uni-card.vue'
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	export default {
		components: {
			uniCard,
			uniRate
		},
		data() {
			return {
				list: [],
				itemId: '',
			};
		},
		onLoad(options) {
			console.log(options)
			if(options.id!="undefined"){
				this.itemId = Number(options.id)
			}
			// this.getList();
		},
		onShow(options) {
			this.getList();
		},
		methods: {
			getList() {
				this.$api.getMaintList().then(res => {
					uni.hideLoading()
					this.list = res.data
				})
			},
			radioChange(evt) {
				console.log(evt)
				this.itemId = evt.detail.value
			},
			submit() {
				if (this.itemId != '') {
					// 根据id 找出维修师傅的name
					this.list.map((item,index)=>{
						if(item.id==this.itemId){
							this.name = item.name
						}
					})
					// 将id name 传给上级页面
					var pages = getCurrentPages();
					var prevPage = pages[pages.length - 2]; //上一个页面
					prevPage.setData({
						param: this.itemId,
						name:this.name
					});
					uni.navigateBack({
						delta: 1
					})

					// uni.navigateBack({
					// 	url: "/pages/reportRepair/reportRepair?id=${this.itemId}"
					// })
					return
				}
				wx.showToast({
					title: '请选择维修师傅',
					icon: 'none',
					duration: 2000
				});
			}

		}
	}
</script>

<style lang="less" scoped>
	.ui-chooserepair {
	margin: 0;
	font-weight: 400;
	font-size: 14px;
	color: rgba(69, 90, 100, .6);
	padding: 40rpx 30rpx 20rpx;

	}

	.ui-red {
		color: #e22424;
	}

	.ui-radiobox {
		width: 100%;
		margin: 0 auto;

		.ui-label {
			display: flex;
			align-items: center;
			background-color: #fff;
			padding: 2px 14px;
			margin: 8px 0;

			.ui-checked {
				display: inline-block;
				margin-left: 18rpx;
			}

			.ui-labelContent {
				margin-left: 20px;
				flex: 1;

				.ui-cardItem {
					margin: 10px 0;

					.ui-name {
						font-weight: 700;
					}

					.ui-rate {
						display: inline-block;

						margin-left: 36rpx;
					}

					.ui-comprehensiveSro {
						margin: 0 6px;
					}
				}

				.ui-tagfontSize {
					font-size: 16px;
				}

				.ui-right {
					margin-left: 40rpx;
				}
			}
		}

	}
</style>
