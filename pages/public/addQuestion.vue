<template>
	<view class="u-p-25">

		<u-form :model="form" ref="uForm" label-position="top">
			<view class="u-p-20 u-font-40" style="color: #2979ff;">{{typeStr[type]}}</view>
			<u-form-item label="题干" label-width="150" prop="context">
				<u-input v-model="form.context" placeholder="请填写试卷简介" type="textarea"/>
			</u-form-item>
			<u-form-item label="选项A" label-width="150" prop="ansA">
				<u-input v-model="form.ansA" :disabled='type==2' placeholder="选项A内容" type="textarea" />
			</u-form-item>
			<u-form-item label="选项B" label-width="150" prop="ansB">
				<u-input v-model="form.ansB" :disabled='type==2' placeholder="选项B内容" type="textarea" />
			</u-form-item>
			<u-form-item v-if="type<2" label="选项C" label-width="150" prop="ansC">
				<u-input v-model="form.ansC" placeholder="选项C内容" type="textarea" />
			</u-form-item>
			<u-form-item v-if="type<2"label="选项D" label-width="150" prop="ansD">
				<u-input v-model="form.ansD" placeholder="选项D内容" type="textarea" />
			</u-form-item>
			<u-form-item label="答案" label-width="150" prop="rightAns">
				<u-checkbox-group :max="type==1?4:1" @change="checkboxGroupChange">
					<u-checkbox v-model="item.checked" v-for="(item, index) in (type == 2 ? checkboxList2:checkboxList)" :key="index" :name="item.name">
						{{ item.name }}
					</u-checkbox>
				</u-checkbox-group>
			</u-form-item>
			<u-form-item label="答案解析" label-width="150" >
				<u-input v-model="form.memo" placeholder="请填写判断题数量" type="textarea" />
			</u-form-item>
			
			<u-button type="primary" class="u-m-t-50" @click="submit"    :ripple="true">提交
				 </u-button>
		</u-form>
		<u-action-sheet @click="clickType" :tips="tips" :cancel-btn="false" :list="list2" v-model="show"></u-action-sheet>
	</view>
</template>

<script>
	import appRequest from "@/common/appRequestUrl.js";
	export default {
		data() {
			return {
				qid: 0,
				tips: {
					text: '请选择新增题目类型',
					color: '#2979ff',
					fontSize: 45
				},
				form: {
					type:0,
					context: "",
					memo: "",
					ansA: '',
					ansB: '',
					ansC: '',
					ansD: '',
					rightAns: '',
					pid: ''
				},
				user: "",
				rules: {
					context: [{
						required: true,
						message: '请填写题干',
						trigger: ['change', 'blur']
					}],
					memo: [{
						required: true,
						message: '请填写答案解析',
						trigger: ['change', 'blur']
					}],
					ansA:[{
						required: true,
						message: '请填写选项A',
						trigger: ['change', 'blur']
					}],
					ansB:[{
						required: true,
						message: '请填写选项B',
						trigger: ['change', 'blur']
					}],
					ansC:[{
						required: true,
						message: '请填写选项C',
						trigger: ['change', 'blur']
					}],
					ansD:[{
						required: true,
						message: '请填写选项D',
						trigger: ['change', 'blur']
					}],rightAns:[{
						required: true,
						message: '请填写答案',
						trigger: ['change', 'blur']
					}]
				},
				list2: [{
					text: '单选题'
				}, {
					text: '多选题'
				}, {
					text: '判断题'
				}],
				show: true,
				typeStr:['单选题','多选题','判断题'],
				type:0,
				checkboxList: [
					{
						name: 'A',
						checked: false,
						disabled: false
					},
					{
						name: 'B',
						checked: false,
						disabled: false
					},
					{
						name: 'C',
						checked: false,
						disabled: false
					},
					{
						name: 'D',
						checked: false,
						disabled: false
					}
				],checkboxList2: [
					{
						name: 'A',
						checked: false,
						disabled: false
					},
					{
						name: 'B',
						checked: false,
						disabled: false
					}
				]
			}
		},
		onLoad: function(option) {
			if (option.qid) {
				this.qid = option.qid;
				this.form.qid = option.qid;
				this.getQuestionInfo();
				this.show=false;
			}
			if (option.pid) {
				this.form.pid = option.pid;
			}
			if (option.type) {
				this.type = option.type;
				this.show=false;
				this.clickType(this.type);
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
						appRequest.request({
							method: "POST",
							url: _this.form.qid ? appRequest.urlMap.editExamQuestion : appRequest.urlMap
								.addExamQuestion,
							data: _this.form,
							success: function(res) {
								if (res.data.code == 200) {
									uni.showModal({
										title: "成功",
										content: "试题提交成功",
										showCancel: false,
										success: function(res) {
											if (res.confirm) {
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
			getQuestionInfo() {
				let _this = this;
				appRequest.request({
					method: "POST",
					url: appRequest.urlMap.findExamQuestion,
					data: {
						qid: _this.qid,
						validFlag: 1
					},
					success: function(res) {
						if (res.data.code == 200) {
							_this.form = res.data.data;
							_this.type = _this.form.type;
							var list = _this.type == 2 ?_this.checkboxList2:_this.checkboxList;
							for(let i = 0;i<list.length;i++){
								if(_this.form.rightAns.indexOf(list[i].name) > -1){
									list[i].checked = true;
								}
							}
						} else {
							_this.$api.msg('试题获取失败');
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
