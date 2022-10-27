const baseUrl = "http://192.168.1.9:9091/mobileExam";

const urlMap = {
	login: baseUrl + "/login",
	logout: baseUrl + "/logout",
	
	findExamHisList: baseUrl + "/examHis/queryList",
	findExamHis: baseUrl + "/examHis/queryObject",
	addExamHis: baseUrl + "/examHis/addExamHis",
	editExamHis: baseUrl + "/examHis/editExamHis",
	addExamHisList: baseUrl +"/examHis/addExamHisList",
	
	findExamLoginList: baseUrl + "/examLogin/queryList",
	findExamLogin: baseUrl + "/examLogin/queryObject",
	addExamLogin: baseUrl + "/examLogin/addExamLogin",
	editExamLogin: baseUrl + "/examLogin/editExamLogin",
	
	findExamPaperList: baseUrl + "/examPaper/queryList",
	findExamPaper: baseUrl + "/examPaper/queryObject",
	addExamPaper: baseUrl + "/examPaper/addExamPaper",
	editExamPaper: baseUrl + "/examPaper/editExamPaper",
	queryListWithNum: baseUrl + "/examPaper/queryListWithNum",
	
	findExamQuestionList: baseUrl + "/examQuestion/queryList",
	findExamQuestion: baseUrl + "/examQuestion/queryObject",
	addExamQuestion: baseUrl + "/examQuestion/addExamQuestion",
	editExamQuestion: baseUrl + "/examQuestion/editExamQuestion",
	queryListForExam: baseUrl + "/examQuestion/queryListForExam",
	queryListWithAns:  baseUrl + "/examQuestion/queryListWithAns",
	
	findExamTestList: baseUrl + "/examTest/queryList",
	findExamTest: baseUrl + "/examTest/queryObject",
	addExamTest: baseUrl + "/examTest/addExamTest",
	editExamTest: baseUrl + "/examTest/editExamTest",
	
	findExamUserList: baseUrl + "/examUser/queryList",
	findExamUser: baseUrl + "/examUser/queryObject",
	addExamUser: baseUrl + "/examUser/addExamUser",
	editExamUser: baseUrl + "/examUser/editExamUser"
}

const getUserInfo = function() {
	try {
		//用户类型，0管理员，1教师，2考生
		const value = uni.getStorageSync('user');
		console.log(JSON.stringify(value));
		return value ? value : false;
	} catch (e) {
		return false;
	}
}

const request = function(requestOpt) {
	try {
		requestOpt = requestOpt || {};
		if (!requestOpt.url) {
			requestFail();
			return;
		}
		var token = "";
		try {
			const value = uni.getStorageSync('user');
			if (value) {
				token = value.token;
			}
		} catch (e) {
			token = "";
		}
		requestOpt.data = requestOpt.data || {};
		requestOpt.data['token'] = token;
		requestOpt.method = requestOpt.method || 'POST';
		requestOpt.header = requestOpt.header || {
			// 'content-type': 'application/x-www-form-urlencoded',
			'token': token
		};
		requestOpt.timeout = requestOpt.timeout || 30000;
		requestOpt.responseType = requestOpt.responseType || 'text';
		requestOpt.dataType = requestOpt.dataType || "json";
		requestOpt.sslVerify = requestOpt.sslVerify || true;
		requestOpt.success = requestOpt.success || function(res) {};
		requestOpt.fail = requestOpt.fail || function(res) {};
		requestOpt.complete = requestOpt.complete || function(res) {};
		uni.showLoading({
			title: "加载中"
		});

		uni.request({
			url: requestOpt.url,
			data: requestOpt.data,
			method: requestOpt.method,
			responseType: requestOpt.responseType,
			sslVerify: requestOpt.sslVerify,
			timeout: requestOpt.timeout,
			dataType: requestOpt.dataType,
			header: requestOpt.header,
			success: function(res) {
				requestOpt.success(res);
				if(res.data.code == 401){
					uni.showToast({
						title:"未登录",
						icon:'none'
					})
					uni.removeStorageSync('user');
				}
			},
			fail: function(res) {
				requestOpt.fail(res);
			},
			complete: function(res) {
				uni.hideLoading();
			}
		});
	} catch (e) {
		//TODO handle the exception
		uni.hideLoading();
		uni.showToast({
			icon: "none",
			title: "请求异常"
		})
	}
}

const goodsCache = {
	save: function(item) {
		try {
			uni.setStorageSync('selGoods', item);
		} catch (e) {

		}
	},
	getCache: function() {
		try {
			const value = uni.getStorageSync('selGoods');
			if (value) {
				return value;
				uni.removeStorageSync('selGoods');
			}
		} catch (e) {}
		return false;
	}
}

export default {
	getUserInfo,
	baseUrl,
	request,
	urlMap,
	goodsCache
}
