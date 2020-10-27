import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: false,
		userName: "",
		clientname:"",
		clienttype:"",
		phone:"",
		certificatetype:"",
		certificateno:"",
		gender:"",
		birthday:"",
		nation:"",
		address:"",
		company:"123",
	},
	getters:{
		phone:state=>{ return state.phone},
		clientname:state=>{return state.clientname},
		clienttype:state=>{return state.clienttype},
		certificatetype:state=>{return state.certificatetype},
		certificateno:state=>{return state.certificateno},
		gender:state=>{return state.gender},
		birthday:state=>{return state.birthday},
		nation:state=>{return state.nation},
		address:state=>{return state.address},
		company:state=>{return state.company},
	},
	actions:{
		getUserInfo({commit}){
			commit("getUserInfo")
		}
	},
	mutations: {
		login(state, userName) {
			console.log(userName)
			state.userName = userName || '新用户';
			state.hasLogin = true;
			state.forcedLogin = true;
		},
		getUserInfo(state,data){
			state.phone=data.phone;
			state.clientname=data.clientname;
			state.clienttype=data.clienttype;
			state.certificatetype=data.certificatetype;
			state.certificateno=data.certificateno;
			state.gender=data.gender;
			state.birthday=data.birthday;
			state.nation=data.nation;
			state.address=data.address;
			state.company=data.company;
		},
		logout(state) {
			state.userName = "";
			state.hasLogin = false;
			state.phone="";
			state.clientname="";
			state.clienttype="";
			state.certificatetype="";
			state.certificateno="";
			state.gender="";
			state.birthday="";
			state.nation="";
			state.address="";
			state.company="";
		}
	}
})

export default store
