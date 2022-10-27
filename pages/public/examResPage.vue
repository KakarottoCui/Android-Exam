<template>
	<view>
		
		<view class="shadow-border" style="background-color: white;border-radius: 15rpx;">
			<view class="">
				<view class="shadow-border card-view" style="margin: 0;">
					<view class="card-view-top">
						<view><u-icon style="margin-right: 10rpx;" name="file-text-fill" color="#2979ff"></u-icon><text>{{paperData.paperName}}</text></view>
					</view>
					<view class="u-border-bottom"></view>
					<view class="card-view-bottom u-m-b-0">
						 <view><u-icon style="margin-right: 10rpx;" name="clock-fill" color="#2979ff"></u-icon> <text class="u-tips-color">总分： 100</text></text> </view>
						 <view><u-icon style="margin-right: 10rpx;" name="checkmark-circle-fill" color="#71d5a1"></u-icon> <text class="u-tips-color"> 得分：{{testData.score}}</text> </view>
						 <view><u-icon style="margin-right: 10rpx;" name="close-circle-fill" color="#dd6161"></u-icon> <text class="u-tips-color">及格分：{{paperData.passScore}}</text> </view>
					</view>
				</view>
			</view>	
		</view>
		
		<view class="" style="background-color: white;border-radius: 15rpx;padding-bottom: 20rpx;">
			<u-tabs-swiper @change="tabsChange" :current="current" ref="tabs" :list="list" :is-scroll="false">
			</u-tabs-swiper>
		</view>
		<view class="u-p-l-10 u-p-r-10">

			<view v-if="questionList.length==0" style="padding-top: 300rpx;">
				<u-empty text="暂无数据" mode="list"></u-empty>

			</view>
			<view v-for="(item,index) in questionList" :key="index" class="shadow-border card-view">
				<view class="card-view-top">
					<view>
						<u-icon style="margin-right: 10rpx;" name="file-text-fill" color="#2979ff"></u-icon>
						<text>{{item.context}}</text>
					</view>
					<view><text class="u-tips-color">{{typeStr[item.type]}}</text></view>
				</view>
				<view class="u-border-bottom" style="justify-content: flex-start;"></view>
				<view v-if="item.ansA">
					<view class="card-view-bottom u-m-b-20 u-m-r-20" style="justify-content: flex-start;">
						<view>A：</view>
						<view><text class="u-tips-color">{{item.ansA}}</text></view>
					</view>
					<view class="u-border-bottom"></view>
				</view>
				<view v-if="item.ansB">
					<view class="card-view-bottom u-m-b-20 u-m-r-20" style="justify-content: flex-start;">
						<view>B：</view>
						<view><text class="u-tips-color">{{item.ansB}}</text></view>
					</view>
					<view class="u-border-bottom"></view>
				</view>
				<view v-if="item.ansC">
					<view class="card-view-bottom u-m-b-20 u-m-r-20" style="justify-content: flex-start;">
						<view>C：</view>
						<view><text class="u-tips-color">{{item.ansC}}</text></view>
					</view>
					<view class="u-border-bottom"></view>
				</view>
				<view v-if="item.ansD">
					<view class="card-view-bottom u-m-b-20 u-m-r-20" style="justify-content: flex-start;">
						<view>D：</view>
						<view><text class="u-tips-color">{{item.ansD}}</text></view>
					</view>
					<view class="u-border-bottom"></view>
				</view>
				<view v-if="item.rightAns">
					<view class="card-view-bottom u-m-b-20">
						<view>答案：</view>
						<view style="color: #71d5a1;"><text class="">{{item.rightAns}}</text></view>
					</view>
					<view class="u-border-bottom"></view>
				</view>
				<view v-if="item.memo">
					<view class="card-view-bottom u-m-b-20">
						<view>答案解析：</view>
						<view><text class="u-tips-color">{{item.memo}}</text></view>
					</view>
					<view class="u-border-bottom"></view>
				</view>
				<view v-if="item.userAns">
					<view class="card-view-bottom u-m-b-20">
						<view>考生作答：</view>
						<view class="u-tips-color"><text class="">{{item.userAns}}</text></view>
						<view><text class="">{{item.userAns == item.rightAns ? '答对':'答错'}}</text></view>
					</view>
					<view class="u-border-bottom"></view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import appRequest from "@/common/appRequestUrl.js";
	export default {
		data() {
			return {
				user: "",
				pid: [],
				paperData: "",
				testData:"",
				questionList: '',
				typeStr: ['单选题', '多选题', '判断题'],
				list: [{
					name: '单选题'
				}, {
					name: '多选题'
				}, {
					name: '判断题'
				}],
				current: 0
			};
		},
		onLoad: function(option) {
			if (option.tid) {
				this.tid = option.tid;
				this.pid = option.pid;
				this.getPaperInfo();
				this.getQuestionInfo();
				this.getTestdata();
			}

		},
		onShow() {
			this.getQuestionInfo();
		},
		methods: {
			toQuestionAdd(qid) {
				let _this = this;
				uni.navigateTo({
					url: "./addQuestion?type=" + _this.current + "&pid=" + _this.pid + (qid ? ("&qid=" + qid) : "")
				})
			},
			tabsChange(index) {
				this.current = index;
				this.getQuestionInfo();
			},
			getTestdata(){
				let _this = this;
				appRequest.request({
					method: "POST",
					url: appRequest.urlMap.findExamTest,
					data: {
						tid: _this.tid,
						validFlag: 1
					},
					success: function(res) {
						if (res.data.code == 200) {
							_this.testData = res.data.data;
						} else {
							_this.$api.msg('获取失败');
						}
					},
					fail: function(res) {
						_this.$api.msg("请求异常");
					}
				})
			},
			getPaperInfo() {

				let _this = this;
				appRequest.request({
					method: "POST",
					url: appRequest.urlMap.findExamPaper,
					data: {
						pid: _this.pid,
						validFlag: 1
					},
					success: function(res) {
						if (res.data.code == 200) {
							_this.paperData = res.data.data;
						} else {
							_this.$api.msg('试卷获取失败');
						}
					},
					fail: function(res) {
						_this.$api.msg("请求异常");
					}
				})
			},
			getQuestionInfo() {

				let _this = this;
				appRequest.request({
					method: "POST",
					url: appRequest.urlMap.queryListWithAns,
					data: {
						tid: _this.tid,
						validFlag: 1,
						type: _this.current
					},
					success: function(res) {
						if (res.data.code == 200) {
							_this.questionList = res.data.data;
						} else {
							_this.$api.msg('试卷获取失败');
						}
					},
					fail: function(res) {
						_this.$api.msg("请求异常");
					}
				})
			},
			delQuestion(qid){
				let _this = this;
				uni.showModal({
					content:"是否删除？",
					success(res) {
						if(res.confirm){
							_this.editQuestion(qid);
						}
					}
				})
			},
			editQuestion(qid){
				let _this = this;
				appRequest.request({
					method: "POST",
					url: appRequest.urlMap.editExamQuestion,
					data: {
						qid: qid,
						validFlag: 0
					},
					success: function(res) {
						if (res.data.code == 200) {
							_this.getQuestionInfo();
						} else {
							_this.$api.msg('试卷获取失败');
						}
					},
					fail: function(res) {
						_this.$api.msg("请求异常");
					}
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
