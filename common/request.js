import host from './config.js'
const header = {}
const request = (url = '', method = 'POST', data = {}) => {
	// header['content-type'] = "application/x-www-form-urlencoded";
	return new Promise((resolve, reject) => {
		uni.request({
			method: method,
			url: host + url,
			data: data,
			header: header,
			dataType: 'json'
		}).then((response) => {
			console.log(response)
			let [error, res] = response||[];
			// 登录过期
			if (res.code == 10086) {
				uni.showToast({
					title: '登录过期,请重新登录',
					duration: 2000
				});
			};
			uni.showLoading({
			    title: '加载中'
			});
			resolve(res.data);
		}).catch((error) => {
			let [err, res] = error || [];
			reject(err);
		});
	});
}
export default request
