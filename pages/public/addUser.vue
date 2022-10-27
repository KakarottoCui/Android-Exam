<template>
	<view class="u-p-25">

		<u-form :model="form" ref="uForm">
			<view class="u-p-20 u-font-40" style="color: #2979ff;">新增{{typeStr[type]}}</view>
			<u-form-item label="昵称" label-width="150" prop="nickName">
				<u-input v-model="form.nickName" placeholder="请填写昵称" />
			</u-form-item>
			<u-form-item label="姓名" label-width="150" prop="userName">
				<u-input v-model="form.userName" placeholder="请填写姓名"  />
			</u-form-item>
			<u-form-item v-if="type==2" label="班级" label-width="150" prop="userClass">
				<u-input v-model="form.userClass" placeholder="请输入班级"  />
			</u-form-item>
			<u-form-item label="密码" label-width="150" prop="passWord">
				<u-input v-model="form.passWord" placeholder="请输入密码" type="password"/>
			</u-form-item>
			
			<u-button type="primary" class="u-m-t-50" @click="submit"    :ripple="true">提交
				 </u-button>
		</u-form>
	</view>
</template>

<script>
	import appRequest from "@/common/appRequestUrl.js";
	export default {
		data() {
			return {
				uid: 0,
				form: {
					type:0,
					uid: "",
					nickName: "",
					userName: '',
					userClass: '',
					passWord: ''
				},
				user: "",
				rules: {
					nickName: [{
						required: true,
						message: '请填写昵称',
						trigger: ['change', 'blur']
					}],
					userName: [{
						required: true,
						message: '请填写姓名',
						trigger: ['change', 'blur']
					}],
					userClass:[{
						required: true,
						message: '请填写班级',
						trigger: ['change', 'blur']
					}],
					passWord:[{
						required: true,
						message: '请填写密码',
						trigger: ['change', 'blur']
					}]
				},
				typeStr:['管理员','教师','学生'],
				type:0
			}
		},
		onLoad: function(option) {
			if (option.uid) {
				this.form.uid = option.uid;
				this.uid = option.uid;
				this.getUserInfo();
			}
			this.type = option.type || 1;
			this.form.type = this.type;
		
		},
		onShow() {
			// this.user = appRequest.getUserInfo();
			// if(!this.user){
			// 	uni.switchTab({
			// 		url:"../index/index"
			// 	})
			// }
		},
		methods: {
			checkboxGroupChange(detail){
				this.form.rightAns = detail.join('');
			},
			clickType(index) {
				this.type = index;
				this.form.type = index;
				if(this.type == 2){
					this.form.ansA = '正确';
					this.form.ansB = '错误';
				}
			},
			submit() {
				let _this = this;
				this.$refs.uForm.validate(valid => {
					if (valid) {
						_this.form.passWord = btoa(_this.form.passWord);
						appRequest.request({
							method: "POST",
							url: _this.form.uid ? appRequest.urlMap.editExamUser : appRequest.urlMap
								.addExamUser,
							data: _this.form,
							success: function(res) {
								if (res.data.code == 200) {
									uni.showModal({
										title: "成功",
										content: "人员提交成功",
										showCancel: false,
										success: function(res) {
											if (res.confirm) {
												uni.navigateBack({
													
												})
											}
										}
									})
								} else {
									_this.$api.msg('保存失败，可能为昵称重复');
								}
							},
							fail: function(res) {
								_this.$api.msg("请求异常");
							}
						})


					} else {
						_this.$api.msg('验证异常');
					}
				});
			},
			getUserInfo() {
				let _this = this;
				appRequest.request({
					method: "POST",
					url: appRequest.urlMap.findExamUser,
					data: {
						uid: _this.uid,
						validFlag: 1
					},
					success: function(res) {
						if (res.data.code == 200) {
							_this.form = res.data.data;
							_this.type = _this.form.type;
						} else {
							_this.$api.msg('人员获取失败');
						}
					},
					fail: function(res) {
						_this.$api.msg("请求异常");
					}
				})
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style lang="scss">

</style>
