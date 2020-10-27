import Vue from 'vue'
import App from './App'

import store from './store'


import api from './api/index.js'

// import './style/iconfont.css'

import host from "./common/config.js"


Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$Host = host
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
