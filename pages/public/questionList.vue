<template>
	<view>
		<view class="shadow-border" style="background-color: white;border-radius: 15rpx;padding-bottom: 20rpx;">
			<u-tabs-swiper @change="tabsChange" :current="current" ref="tabs" :list="list" :is-scroll="false">
			</u-tabs-swiper>
		</view>
		<view class="u-p-l-10 u-p-r-10">

			<view v-if="current==0" class="shadow-border"
				style="justify-content:space-between;display: flex;   background-color: white;margin: 20rpx;padding: 20rpx;border-radius: 15rpx;">
				<view>
					<u-icon style="margin-right: 15rpx;" name="star-fill" color="#2979ff" size="30"></u-icon>单选需求：<text
						class="u-font-30  u-tips-color">{{paperData.singleNum}}</text>
				</view>
				<view>已添加：<text class="u-m-l-15 u-tips-color">{{questionList.length}}</text></view>
				<view>
					<u-button type="success" size="mini" @click="toQuestionAdd()">新增单选</u-button>
				</view>
			</view>

			<view v-if="current==1" class="shadow-border"
				style="justify-content:space-between;display: flex;   background-color: white;margin: 20rpx;padding: 20rpx;border-radius: 15rpx;">
				<view>
					<u-icon style="margin-right: 15rpx;" name="star-fill" color="#2979ff" size="30"></u-icon>多选需求：<text
						class="u-font-30  u-tips-color">{{paperData.multiNum}}</text>
				</view>
				<view>已添加：<text class="u-m-l-15 u-tips-color">{{questionList.length}}</text></view>
				<view>
					<u-button type="success" size="mini" @click="toQuestionAdd()">新增多选</u-button>
				</view>
			</view>

			<view v-if="current==2" class="shadow-border"
				style="justify-content:space-between;display: flex;   background-color: white;margin: 20rpx;padding: 20rpx;border-radius: 15rpx;">
				<view>
					<u-icon style="margin-right: 15rpx;" name="star-fill" color="#2979ff" size="30"></u-icon>判断需求：<text
						class="u-font-30  u-tips-color">{{paperData.judgeNum}}</text>
				</view>
				<view>已添加：<text class="u-m-l-15 u-tips-color">{{questionList.length}}</text></view>
				<view>
					<u-button type="success" size="mini" @click="toQuestionAdd()">新增判断</u-button>
				</view>
			</view>
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

				<view class="card-view-bottom">
					<view>
						<u-button type="error" size="mini" @click="delQuestion(item.qid)">删除试题</u-button>
					</view>
					<view>
						<u-button type="primary" size="mini" @click="toQuestionAdd(item.qid)">编辑试题</u-button>
					</view>
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
			if (option.pid) {
				this.pid = option.pid;
				this.getPaperInfo();
				this.getQuestionInfo();
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
					url: appRequest.urlMap.findExamQuestionList,
					data: {
						pid: _this.pid,
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
