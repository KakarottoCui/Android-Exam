<template>
	<view class="u-p-l-10 u-p-r-10">
		<view class="u-p-20" style="display: flex;justify-content: space-between;background-color: white;">
			<view>总计：<text class="u-tips-color">{{userList.length}}</text>人</view>
			<view><u-button @click="jumpToAddUser(user.type==0?1:2)" type="success" size="mini">添加新{{user.type==0?'用户':'学生'}}</u-button></view>
		</view>
		<view v-for="(item,index) in userList" :key="index" class="shadow-border card-view">
			<view class="card-view-top">
				<view><u-icon style="margin-right: 10rpx;" name="account-fill" color="#2979ff"></u-icon><text>{{item.userName}}</text></view><view>昵称:<text class="u-tips-color">{{item.nickName}}</text></view>
			</view>
			<view class="u-border-bottom"></view>
			<view class="card-view-bottom">
				 <view><u-icon style="margin-right: 10rpx;" name="home-fill" color="#71d5a1"></u-icon>班级:<text class="u-tips-color">{{item.userClass||'无'}}</text> </view>
				 <view v-if="pid"><u-button type="success" size="mini" @click="addUserByPaper(item.uid)">添加考生</u-button></view>
				 <view v-if="(!pid && item.type==2) || (user.type == 0 && item.type!=0) "><u-button @click="jumpToEditUser(item.uid)"  type="primary" size="mini">修改信息</u-button></view>
				 <view v-if="(!pid && item.type==2) || (user.type == 0 && item.type!=0)"><u-button @click="delUser(item.uid)"  type="error" size="mini">删除人员</u-button></view>
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
				pid: "",
				userList:[],
				paperName:""
			};
		},
		onLoad: function(option) {
			if (option.pid) {
				this.pid = option.pid;
				this.paperName = option.paperName;
				this.getAllUser();
			}
			this.user = appRequest.getUserInfo();
			if(!this.user){
				uni.redirectTo({
					url:"../public/login"
				})
			}
		
		},
		onShow() {
			this.user = appRequest.getUserInfo();
			
			this.getAllUser();
		},
		methods:{
			jumpToEditUser(uid){
				uni.navigateTo({
					url:"addUser?uid="+uid
				})
			},
			jumpToAddUser(type){
				uni.navigateTo({
					url:"addUser?type="+type
				})
			},delUser(uid){
				let _this = this;
				uni.showModal({
					content:"是否删除?",
					success(res) {
						if(res.confirm){
							_this.delUser2(uid);
						}
					}
				})
			},
			delUser2(uid){
				let _this = this;
				appRequest.request({
					method: "POST",
					url: appRequest.urlMap.editExamUser,
					data: {
						uid:uid,
						validFlag:0
					},
					success: function(res) {
						if (res.data.code == 200) {
							_this.$api.msg('删除成功');
							_this.getAllUser();
						} else {
							_this.$api.msg('人员添加失败');
						}
					},
					fail: function(res) {
						_this.$api.msg("请求异常");
					}
				})
			},
			addUserByPaper(uid){
				let _this = this;
				var tstObj = {
					pid:_this.pid,
					paperName:_this.paperName,
					uid:uid,
					state:0,
					score:0
				}
				appRequest.request({
					method: "POST",
					url: appRequest.urlMap.addExamTest,
					data: tstObj,
					success: function(res) {
						if (res.data.code == 200) {
							uni.navigateBack({
								
							})
						} else {
							_this.$api.msg('人员添加失败');
						}
					},
					fail: function(res) {
						_this.$api.msg("请求异常");
					}
				})
			},
			getAllUser(){
				let _this = this;
				appRequest.request({
					method: "POST",
					url: appRequest.urlMap.findExamUserList,
					data: {
						validFlag: 1
					},
					success: function(res) {
						if (res.data.code == 200) {
							_this.userList = res.data.data;
						} else {
							_this.$api.msg('人员获取失败');
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
	page,
	.content {
		height: 100%;
		background-color: #f8f8f8;
	}
	
</style>
