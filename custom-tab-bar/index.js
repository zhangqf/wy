Component({
	options: {
		multipleSlots: true // 在组件定义时的选项中启用多slot支持
	},
	data: {
		selected: 0,
		color: "#7a7e83",
		selctedColor: "#3cc51f",
		list: [{
			pagePath: "/pages/main/main",
			text: "首页",
			iconPath: "/static/img/home.png",
			selectedIconPath: "/static/img/homeHL.png"
		},{
				pagePath: "/pages/user/user",
				text: "我的",
				iconPath: "/static/img/user.png",
				selectedIconPath: "/static/img/userHL.png"
			}]
	},
	attached() {
		console.log(wx.getStorageSync("username"))
		// if (wx.getStorageSync("soleType") == 1) {
		// 	console.log(213)
		// 	this.data.list.splice(1, 1, {
		// 		pagePath: "/pages/user/user",
		// 		text: "我的",
		// 		iconPath: "/static/img/user.png",
		// 		selectedIconPath: "/static/img/userHL.png"
		// 	})
		// 	this.setData({
		// 		list: this.data.list
		// 	})
		// }
		// if (wx.getStorageSync("soleType") == 2) {
		// 	console.log(this.data.list)
		// 	let arr = [];
		// 	Object.assign(arr, this.data.list)
		// 	console.log(arr)
		// 	this.data.list.splice(1, 1, {
		// 		pagePath: "/pages/maintenance/user/user",
		// 		text: "我的",
		// 		iconPath: "/static/img/user.png",
		// 		selectedIconPath: "/static/img/userHL.png"
		// 	})
		// 	this.setData({
		// 		list: this.data.list
		// 	})
		// 	console.log(this.data.list)

		// }
	},
	methods: {
		switchTab(e) {
			const data = e.currentTarget.dataset
			const url = data.path
			wx.switchTab({
				url
			})
			console.log(data)
			this.setData({
				selected: data.index
			})
		}
	}
})
