import request from '@/common/request.js'
module.exports = {
	// 登录
	login(data) {
		return request(`/api/ownerLogin?phone=${data.phone}&password=${data.password}&code=${data.code}`, 'POST');
	},
	// 修改密码
	editClientPwd(data){
		return request(`/api/editClientPwd?id=${data.id}&oldPwd=${data.oldPwd}&nowPwd=${data.nowPwd}`,'POST',data)
	},

	// 获取报修项目
	getReports(){
		return request("/api/getReports","GET");
	},
	// 获取报修类型
	getWarrs(){
		return request("/api/getWarrs","GET")
	},
	// 提交报修工单
	saveWorkOrder(data){
		return request("/api/saveWorkOrder","POST", data)
	},
	// 提交建议
	saveComplaint(data){
		return request("/api/saveComplaint","POST", data)
	},
	// 报修工单列表
	getOrderByClientId(data){
		return request("/api/getOrderByClientId","GET", data)
	},
	// 建议列表
	getComplaintByClientId(data){
		return request("/api/getComplaintByClientId","GET",data)
	},
	// 广告
	getAdvers(){
		return request("/api/getAdvers","GET")
	},
	// 公告列表
	getNoticeList(data){
		return request("/api/getNoticeList","GET",data)
	},
	// 申请车位
	saveApplyCar(data){
		return request("/api/saveApplyCar","POST",data)
	},
	// 报修工单详情
	getOrderById(data){
		return request("/api/getOrderById","GET",data)
	},
	// 满意度数
	getSatis(){
		return request("/api/getSatis","GET")
	},
	// 报修评价
	saveSatis(data){
		return request(`/api/saveSatis?orderId=${data.orderId}&remark=${data.remark}&satisId=${data.satisId}&serviceSro=${data.serviceSro}
		&professionalSro=${data.professionalSro}&maintenanceSro=${data.maintenanceSro}&comprehensiveSro=${data.comprehensiveSro}&maintid=${data.maintid}`,"POST")
	},
	// 公告详情
	getNoticeById(data){
		return request("/api/getNoticeById","GET",data)
	},
	// 业主详情
	selCilentById(data){
		return request(`/api/selCilentById?id=${data}`,"GET")
	},
	// 获取维修工人
	getMaintList(){
		return request(`/api/getMaintList`,"GET")
	},
	
	
	
	/* 物业管理员详细信息 */
	getManagerById(data){
		return request(`/api/getManagerById?id=${data.id}`,'GET',)
	},
	// 小区所有报修工单
	getOrderByManager(data){
		return request(`/api/getOrderByManager?currPage=${data.currPage}&&toatlNum=${data.toatlNum}`,"GET")
	},
	// 业主建议列表
	getComplaintByManage(data){
		return request(`/api/getComplaintByManage?currPage=${data.currPage}&&toatlNum=${data.toatlNum}`,'GET')
	},
	editManagerPwd(data){
		return request(`/api/editManagerPwd?id=${data.id}&&oldPwd=${data.oldPwd}&&nowPwd=${data.nowPwd}`,'POST',data)
	},
	// 小区单元号
	getBuildByAll(){
		return request('/api/getBuildByAll','GET')
	},
	// 小区楼层
	getLouByBuild(data){
		return request(`/api/getLouByBuild?id=${data}`,'GET')
	},
	// 房间号
	getRoomByLouC(data){
		return request(`/api/getRoomByLouC?id=${data}`,'GET')
	},
	// 提交抄表
	addMeter(data){
		return request(`/api/addMeter`,'POST',data)
	},
	// 我的抄表
	getMeterListByID(data){
		return request(`/api/getMeterListByID?currPage=${data.currPage}&toatlNum=${data.totalNum}&id=${data.id}`,'GET',data)
	},
	// 获取业主id
	getCilentByRoom(data){
		return request(`/api/getCilentByRoom`,'POST',{id:data})
	},
	// 所有车位
	getCarByManager(data){
		return request(`/api/getCarByManager?currPage=${data.currPage}&&toatlNum=${data.toatlNum}&&state=${data.state}`,'GET')
	},
	
	
		
		
	// 所有工单
	getAllOrderList(data){
		return request("/api/getAllOrderList","get",data)
	},
	// 维修接单
	saveRecent(data){
		return request(`/api/saveRecent?orderId=${data.orderId}&&workerId=${data.workerId}`,"post")
	},
	// 报修工单列表
	getOrderListByMaint(data){
		return request('/api/getOrderListByMaint','get',data)
	},
	// 完成维修
	saveReceives(data){
		return request(`/api/saveReceives?orderId=${data.orderId}&remark=${data.remark}&receImgs=${data.receImgs}&isTimeout=${data.isTimeout}`,'post')
	},
	/* 获取维修工信息 */
	getMaintById(data){
		return request('/api/getMaintById',"get",data)
	},
	// 修改密码
	editMaintPwd(data){
		return request(`/api/editMaintPwd?id=${data.id}&&oldPwd=${data.oldPwd}&&nowPwd=${data.nowPwd}`,'POST',data)
	},
}
