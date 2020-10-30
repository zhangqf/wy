let url_config = ""

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    // url_config = 'http://192.168.0.21:10000/'
		// url_config = 'https://192.168.1.10:10000'
		 // url_config = 'http://47.114.4.78:10000/'
		 // url_config = 'http://zhongyudz.cn/'
		  url_config = 'https://zhongyudz.cn:10000'
		 
}else{
    // 生产环境
    url_config = 'http://zhongyudz.cn'
}

export default url_config

