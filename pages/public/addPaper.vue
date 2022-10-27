<template>
	<view class="u-p-25">

		<u-form :model="form" ref="uForm">
			<u-form-item label="试卷名称" label-width="150" prop="paperName">
				<u-input v-model="form.paperName" placeholder="请填写试卷名称" />
			</u-form-item>
			<u-form-item label="试卷简介" label-position="top" label-width="150" prop="memo">
				<u-input v-model="form.memo" placeholder="请填写试卷简介" type="textarea"/>
			</u-form-item>
			<u-form-item label="通过分数" label-width="150" prop="passScore">
				<u-input v-model="form.passScore" placeholder="通过分数(满分100)" type="digit" />
			</u-form-item>
			<u-form-item label="单选数量" label-width="150" prop="singleNum">
				<u-input v-model="form.singleNum" placeholder="请填写单选题数量" type="digit" />
			</u-form-item>
			<u-form-item label="单选分值" label-width="150" prop="singleScore">
				<u-input v-model="form.singleScore" placeholder="每道单选题分值" type="digit" />
			</u-form-item>
			<u-form-item label="多选数量" label-width="150" prop="multiNum">
				<u-input v-model="form.multiNum" placeholder="请填写多选题数量" type="digit" />
			</u-form-item>
			<u-form-item label="多选分值" label-width="150" prop="multiScore">
				<u-input v-model="form.multiScore" placeholder="每道多选题分值" type="digit" />
			</u-form-item>
			<u-form-item label="判断数量" label-width="150" prop="judgeNum">
				<u-input v-model="form.judgeNum" placeholder="请填写判断题数量" type="digit" />
			</u-form-item>
			<u-form-item label="判断分值" label-width="150" prop="judgeScore">
				<u-input v-model="form.judgeScore" placeholder="每道判断题分值" type="digit" />
			</u-form-item>
			<view style="margin-top: 30rpx;"><text class="u-tips-color" >{{tips }}</text></view>
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
				pid:0,
				form: {
					paperName: "",
					memo: "",
					passScore: 60,
					singleNum: 5,
					singleScore: 10,
					multiNum: 2,
					multiScore: 10,
					judgeNum: 3,
					judgeScore: 10,
					state:0,
					score:100
				},
				user:"",
				rules: {
				paperName: [
					{
								required: true,
								message: '请填写试卷名称',
								trigger: ['change','blur']
					}
				],memo: [{
								required: true,
								message: '请填写试卷简介',
								trigger: ['change','blur']
					}
				],judgeScore:[{
								validator: function(rule,value,callback){
									return value>0;
								},
								message: '请填写完整',
								trigger: ['change','blur']
					}],judgeNum:[{
								validator: function(rule,value,callback){
									return value>0;
								},
								message: '请填写完整',
								trigger: ['change','blur']
					}],singleScore:[{
								validator: function(rule,value,callback){
									return value>0;
								},
								message: '请填写完整',
								trigger: ['change','blur']
					}],singleNum:[{
								validator: function(rule,value,callback){
									return value>0;
								},
								message: '请填写完整',
								trigger: ['change','blur']
					}],multiScore:[{
								validator: function(rule,value,callback){
									return value>0;
								},
								message: '请填写完整',
								trigger: ['change','blur']
					}],multiNum:[{
								validator: function(rule,value,callback){
									return value>0;
								},
								message: '请填写完整',
								trigger: ['change','blur']
					}],passScore:[{
								validator: function(rule,value,callback){
									return value>0;
								},
								message: '请填写完整',
								trigger: ['change','blur']
					}]
				},tips:"请确保 单选分值*单选数量 + 多选分值*多选数量 + 判断分值*判断数量 = 100"
			}
		},
		onLoad:function(option) {
			if(option.pid){
				this.pid = option.pid;
				this.getPaperInfo();
			}
			
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
			checkPoint(){
				return (this.form.singleNum*this.form.singleScore + this.form.multiNum*this.form.multiScore + this.form.judgeNum*this.form.judgeScore )== 100 ;
			},
			submit(){
				let _this = this;
				this.$refs.uForm.validate(valid => {
					if (valid) {
						
						if(!_this.checkPoint()){
							_this.$api.msg('试卷总分不等于100分，请修改。');
							return;
						}
						
						appRequest.request({
							method: "POST",
							url: _this.form.pid ? appRequest.urlMap.editExamPaper : appRequest.urlMap.addExamPaper,
							data:_this.form,
							success: function(res) {
								if (res.data.code == 200) {
									uni.showModal({
										title:"成功",
										content:"试卷提交成功",
										showCancel:false,
										success:function(res){
											if(res.confirm){
												uni.navigateBack({
													
												})
											}
										}
									})({
										
									})
								} else {
									_this.$api.msg('保存失败');
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
			confirm(e) {
				this.selName = e[0].label;
				this.form.typeFK = e[0].value;
			},
			numCheck(){
				return [{
								required: true,
								message: '未填写完整，请检查',
								trigger: ['change','blur']
					},
					{
								type: "integer",
								message: '格式异常，仅能为整数',
								trigger: ['change','blur']
					}
				]
			},
			getPaperInfo() {

				let _this = this;
				appRequest.request({
					method: "POST",
					url: appRequest.urlMap.findExamPaper,
					data:{
						pid:_this.pid,
						validFlag:1
					},
					success: function(res) {
						if (res.data.code == 200) {
							_this.form = res.data.data;
						} else {
							_this.$api.msg('试卷获取失败');
						}
					},
					fail: function(res) {
						_this.$api.msg("请求异常");
					}
				})
			}
		},onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style lang="scss">

</style>
