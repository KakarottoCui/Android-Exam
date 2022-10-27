<template>
	<view>
		
		<view class="shadow-border" style="background-color: white;border-radius: 15rpx;padding-bottom: 20rpx;">
			<u-tabs-swiper ref="tabs" :list="list" :is-scroll="false"></u-tabs-swiper>
		</view>	
		<view class="u-p-l-10 u-p-r-10">
			<view class="shadow-border card-view">
				<view class="card-view-top">
					<view><u-icon style="margin-right: 10rpx;" name="file-text-fill" color="#2979ff"></u-icon><text>这是一个考试嗷嗷</text></view><view><u-button type="warning" size="mini">发布</u-button></view>
				</view>
				<view class="u-border-bottom"></view>
				<view class="card-view-bottom">
					 <view><u-icon style="margin-right: 10rpx;" name="clock-fill" color="lightgray"></u-icon> <text class="u-tips-color">2022-10-15 00:15</text> </view>
					 <view><u-button type="primary" size="mini">编辑试卷</u-button></view>
					 <view><u-button type="success" size="mini">编辑试题</u-button></view>
				</view>
			</view>
			
			<view class="shadow-border card-view">
				<view class="card-view-top">
					<view><u-icon style="margin-right: 10rpx;" name="file-text-fill" color="#2979ff"></u-icon><text>这是一个考试嗷嗷</text></view><view><u-button type="error" size="mini">撤回</u-button></view>
				</view>
				<view class="u-border-bottom"></view>
				<view class="card-view-bottom">
					 <view><u-icon style="margin-right: 10rpx;" name="clock-fill" color="lightgray"></u-icon> <text class="u-tips-color">2022-10-15 00:15</text> </view>
					 <view><u-button type="success" size="mini">添加考生</u-button></view>
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
				user:"",
				paperList:[],
				selType:0,
				list: [{
						name: '待发布'
					}, {
						name: '已发布'
					}]
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
			this.getPaperInfo();
		},
		methods: {
			
			getPaperList() {

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
							_this.form = res.data;
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
	page {
		background: #f5f5f5;
	}
</style>
