<template>
	<view class="content ui-bg">
		<!-- <h4>客服电话</h4>
		<view class="ui-telcontainer" v-for="item in telList" >
			<text>{{item.name}}</text><a class="telList" :href="'tel:'+item.tel">{{item.tel}}</a>
		</view> -->
		<scroll-view scroll-y class="indexes" :scroll-into-view="'indexes-'+ listCurID" :style="[{height:'calc(100vh - '+ CustomBar + 'px - 50px)'}]"
		 :scroll-with-animation="true" :enable-back-to-top="true">
			<view class="cu-list menu-avatar no-padding">
				<view class="cu-item" v-for="(items,sub) in telList" :key="sub">
					<view class="cu-avatar round lg">{{items.name[0]}}</view>
					<view class="contents">
						<view class="text-grey"><text class="text-abc">{{items.name}}</text></view>
						<view class="text-gray text-sm">
							{{items.orgName}}-{{items.tel}}
						</view>
					</view>
					<view class="action">
						<a :href="'tel:'+items.tel" class="iconfont icon-dianhua ui-iconfontsize" @click = "makePhone(items.tel)"></a>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				telList: [{
					"tel": "13271685352",
					"name": "李工",
					"orgName": "天佑物业",

				}, {
					"tel": "16897293644",
					"name": "刘工",
					"orgName": "天佑物业",
				}, {
					"tel": "18896553562",
					"name": "王师傅",
					"orgName": "天佑物业",
				}, {
					"tel": "13919634726",
					"name": "客服",
					"orgName": "天佑物业",
				}]
			}
		},
		methods: {
			makePhone(params){
				uni.makePhoneCall({
				    phoneNumber: params
				});
			}
		}
	}
</script>

<style>
		
	.ui-iconfontsize{
		font-size: 24px;
		color: #0086B3;
		margin-right: 28rpx;
	}
	.cu-list.menu-avatar>.cu-item {
	    position: relative;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    padding-right: 5px;
	    height: 77px;
	    background-color: #ffffff;
	    -webkit-box-pack: end;
	    -webkit-justify-content: flex-end;
	    justify-content: flex-end;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    align-items: center;
	}
	.cu-list>.cu-item {
	    -webkit-transition: all .6s ease-in-out 0s;
	    transition: all .6s ease-in-out 0s;
	    -webkit-transform: translateX(0px);
	    transform: translateX(0px);
	}
	list.menu>.cu-item:after {
	    position: absolute;
	    top: 0;
	    left: 0;
	    box-sizing: border-box;
	    width: 200%;
	    height: 200%;
	    border-bottom: 0.5px solid #ddd;
	    border-radius: inherit;
	    content: " ";
	    -webkit-transform: scale(.5);
	    transform: scale(.5);
	    -webkit-transform-origin: 0 0;
	    transform-origin: 0 0;
	    pointer-events: none;
			}
			.cu-list.menu-avatar>.cu-item>.cu-avatar {
			    position: absolute;
			    left: 16px;
					}
					.cu-avatar.lg {
    width: 52px;
    height: 52px;
    font-size: 2em;
}
.round {
    border-radius: 2760px;
}
.cu-avatar {
    font-variant: small-caps;
    margin: 0;
    padding: 0;
    display: -webkit-inline-box;
    display: -webkit-inline-flex;
    display: inline-flex;
    text-align: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    background-color: #103d9a;
    color: #ffffff;
    white-space: nowrap;
    position: relative;
    width: 35px;
    height: 35px;
    background-size: cover;
    background-position: center;
    vertical-align: middle;
    font-size: 1.5em;
		
}
.cu-list.menu-avatar>.cu-item .contents {
    position: absolute;
    left: 80px;
    width: calc(100% - 52px - 33px - 66px - 11px);
    line-height: 1.6em;
}
.cu-list.menu-avatar>.cu-item .contents>uni-view:first-child {
    font-size: 16px;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
}
.text-grey, .line-grey, .lines-grey {
    color: #8799a3;
}
.cu-list.menu-avatar>.cu-item:after, .cu-list.menu>.cu-item:after {
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    width: 200%;
    height: 200%;
    border-bottom: 0.5px solid #ddd;
    border-radius: inherit;
    content: " ";
    -webkit-transform: scale(.5);
    transform: scale(.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    pointer-events: none;
}
	body {
		height: 100%;
	}

	.ui-bg {
		height: 100%;
		/* background-image: radial-gradient(circle, red, yellow, green); */
	}

	h4 {
		text-indent: 10px;
		padding: 10px;
		color: #fff;
		font-size: 26px;
	}

	.ui-telcontainer {
		width: 80%;
		margin: 0 auto;
		margin-bottom: 10px;
	}

	.telList {
		text-decoration: none;
		display: block;
		padding: 6px;
		border: 1px solid #007AFF;
		border-radius: 6px;
		background-image: linear-gradient(to bottom, rgba(255, 0, 0, 0), rgba(255, 0, 0, 1));
		color: #fff;

	}

	.photo_icon {
		font-size: 40upx;
		color: #0081FF;
		margin-right: 60upx;
	}


	.indexes {
		position: relative;
	}

	.indexBar {
		position: fixed;
		right: 0px;
		bottom: 300upx;
		padding: 20upx 20upx 20upx 60upx;
		display: flex;
		align-items: center;
	}

	.indexBar .indexBar-box {
		width: 40upx;
		height: auto;
		background: #fff;
		display: flex;
		flex-direction: column;
		box-shadow: 0 0 20upx rgba(0, 0, 0, 0.1);
		border-radius: 10upx;
	}

	.text-abc {
		color: #555555
	}

	.indexBar-item {
		flex: 1;
		width: 40upx;
		height: 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24upx;
		color: #888;
	}

	movable-view.indexBar-item {
		width: 40upx;
		height: 40upx;
		z-index: 9;
		position: relative;
	}

	movable-view.indexBar-item::before {
		content: "";
		display: block;
		position: absolute;
		left: 0;
		bottom: 0upx;
		height: 20upx;
		width: 4upx;
		background-color: #f37b1d;
	}

	.indexToast {
		position: fixed;
		top: 0;
		right: 80upx;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		width: 100upx;
		height: 100upx;
		border-radius: 10upx;
		margin: auto;
		color: #fff;
		line-height: 100upx;
		text-align: center;
		font-size: 48upx;
	}
</style>
