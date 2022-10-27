import appRequest from "@/common/appRequestUrl.js"

const getUserInfo = function(code){
	
	wx.getUserProfile({
		desc: '用于学生身份认证', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
		success: (res) => {
			console.log(JSON.stringify(res));
			appRequest.request({
				method: "GET",
				data: {
					code: code,
					enData: res.encryptedData,
					iv:res.iv,
					userInfo:res.userInfo
				},
				url: appRequest.loginCheck,
				success: function(res) {
				
				
					console.log(res.data);
				
					
				},
				fail: function(res) {
				
				}
			})
		}
	})
	

}

const login = function(){
	
	wx.login({
		success(res) {
			if (res.code) {
				//发起网络请求
				getUserInfo(res.code);
	
	
			} else {
				console.log('登录失败！' + res.errMsg)
			}
		}
	})
	
}

export default {
	login
}

