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
						 <view><u-icon style="margin-right: 10rpx;" name="clock-fill" color="#2979ff"></u-icon> <text class="u-tips-color">{{paperData.unStartNum}}待考</text></text> </view>
						 <view><u-icon style="margin-right: 10rpx;" name="checkmark-circle-fill" color="#71d5a1"></u-icon> <text class="u-tips-color">{{paperData.passNum}}合格</text> </view>
						 <view><u-icon style="margin-right: 10rpx;" name="close-circle-fill" color="#dd6161"></u-icon> <text class="u-tips-color">{{paperData.failNum}}不合格</text> </view>
						 <view><u-button type="success" size="mini" @click="toAddPage(paperData.pid,paperData.paperName)">新增待考</u-button></view>
					</view>
				</view>
			</view>	
		</view>
		
		<view class="" style="background-color: white;border-radius: 15rpx;">
			<u-tabs-swiper @change="tabsChange" :current="current" ref="tabs" :list="list" :is-scroll="false">
			</u-tabs-swiper>
		</view>
		<view class="u-p-l-10 u-p-r-10">

			
			<view v-if="testList.length==0" style="padding-top: 300rpx;">
				<u-empty text="暂无数据" mode="list"></u-empty>

			</view>
			<view v-for="(item,index) in testList" :key="index" class="shadow-border card-view">
				<view class="card-view-top">
					<view>
						<u-icon style="margin-right: 10rpx;" name="file-text-fill" color="#2979ff"></u-icon>
						<text>{{item.paperName}}</text>
					</view>
					<view><text class="u-tips-color">{{item.userName}}</text></view>
				</view>
				<view class="u-border-bottom" style="justify-content: flex-start;"></view>

				<view class="card-view-bottom">
					<view>分数：<text class="u-tips-color">{{item.state == 0 ? '待考': item.score}}</text></view>
					<view v-if="item.state>0">
						<u-button type="primary" size="mini" @click="delQuestion(item.qid)">查看明细</u-button>
					</view>
					<view>
						<u-button type="error" size="mini" @click="delQuestion(item.qid)">删除考试</u-button>
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
				testList: '',
				typeStr: ['待考', '合格', '不合格'],
				list: [{
					name: '待考'
				}, {
					name: '合格'
				}, {
					name: '不合格'
				}],
				current: 0
			};
		},
		onLoad: function(option) {
			if (option.pid) {
				this.pid = option.pid;
				this.getPaperInfo();
				this.getTestInfo();
			}

		},
		onShow() {
			this.getTestInfo();
		},
		methods: {
			toAddPage(pid,paperName) {
				let _this = this;
				uni.navigateTo({
					url: "./userList?pid="+pid+"&paperName="+paperName
				});
			},
			tabsChange(index) {
				this.current = index;
				this.getTestInfo();
			},
			getPaperInfo() {

				let _this = this;
				appRequest.request({
					method: "POST",
					url: appRequest.urlMap.queryListWithNum,
					data: {
						pid: _this.pid,
						validFlag: 1
					},
					success: function(res) {
						if (res.data.code == 200) {
							_this.paperData = res.data.data[0];
						} else {
							_this.$api.msg('试卷获取失败');
						}
					},
					fail: function(res) {
						_this.$api.msg("请求异常");
					}
				})
			},
			getTestInfo() {

				let _this = this;
				appRequest.request({
					method: "POST",
					url: appRequest.urlMap.findExamTestList,
					data: {
						pid: _this.pid,
						validFlag: 1,
						state: _this.current
					},
					success: function(res) {
						if (res.data.code == 200) {
							_this.testList = res.data.data;
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
							_this.getTestInfo();
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
