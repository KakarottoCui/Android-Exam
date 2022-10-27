<template>
	<view>
		
		<view class="shadow-border card-view">
			<view class="card-view-top">
				<view><u-icon style="margin-right: 10rpx;" name="file-text-fill" color="#2979ff"></u-icon><text>{{paperData.paperName}}</text></view><view></view>
			</view>
			<view class="u-border-bottom"></view>
			
			<view>
				<view class="card-view-bottom u-m-b-20 u-m-r-20" style="justify-content: space-between;">
					<view><u-icon style="margin-right: 10rpx;" name="clock-fill" color="#2979ff"></u-icon>待考：<text class="u-tips-color">{{paperData.unStartNum}}</text></view>
					<view><u-icon style="margin-right: 10rpx;" name="checkmark-circle-fill" color="#71d5a1"></u-icon>合格：<text class="u-tips-color">{{paperData.passNum}}</text></text></view>
					<view><u-icon style="margin-right: 10rpx;" name="close-circle-fill" color="#dd6161"></u-icon>不合格：<text class="u-tips-color">{{paperData.failNum}}</text></text></view>
					
				</view>
				<view class="u-border-bottom"></view>
			</view>
			
			<view class="card-view-bottom">
				 <view>总分：<text class="u-tips-color">{{paperData.score}}</text></text></view>
				 <view>及格分：<text class="u-tips-color">{{paperData.passScore}}</text></text></view>
				 
			</view>
		</view>
		
		<u-tabs-swiper @change="tabsChange($event,'testView')" :current="current" ref="tabs" :list="list" :is-scroll="false"></u-tabs-swiper>
		
		<view v-for="(item,index) in testList" :key="index" v-if="current == item.state">
			<view class="shadow-border card-view">
				<view class="card-view-top">
					<view><u-icon style="margin-right: 10rpx;" :name="dealString(item,'icon')" :color="dealString(item,'color')"></u-icon>{{item.paperName}}<text></text></view><view><text class="u-tips-color">{{ dealString(item,'title') }}</text></view>
				</view>
				<view class="u-border-bottom"></view>
				<view>
					<view class="card-view-bottom u-m-b-20 u-m-r-20" style="justify-content: space-between;">
						<view><u-icon style="margin-right: 10rpx;" name="account-fill" color="#2979ff"></u-icon>考生：<text class="u-tips-color">{{item.userName}}</text></view>
						<view v-if="item.nickName"><u-icon style="margin-right: 10rpx;" name="account" color="#2979ff"></u-icon>昵称：<text class="u-tips-color">{{item.nickName}}</text></view>
						
					</view>
					<view class="u-border-bottom"></view>
				</view>
				<view class="card-view-bottom">
					 <view><u-icon style="margin-right: 10rpx;" name="clock-fill" color="lightgray"></u-icon> <text class="u-tips-color">{{item.createTime}}</text> </view>
					 <view v-if="item.state!=0"><u-button :type="dealString(item,'btn')" size="mini" @click="jumpToExam(item)" >{{dealString(item,'btnText')}}</u-button> </view>
				</view>
			</view>
			
		</view>
		<view v-if="testList.length == 0" style="padding-top: 300rpx;">
			<u-empty text="暂无数据" mode="list"></u-empty>
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
				testList:[],
				questionList: '',
				typeStr: ['单选题', '多选题', '判断题'],
				list: [{
						name: '等待考试'
					}, {
						name: '考试合格'
					}, {
						name: '考试不合格'
					}],
				current: 0
			};
		},
		onLoad: function(option) {
			if (option.pid) {
				this.pid = option.pid;
				this.getPaperInfo();
				this.getTestdata();
			}

		},
		onShow() {
			//this.getQuestionInfo();
		},
		methods: {
			jumpToExam(item){
				uni.navigateTo({
					url:"../public/examResPage?pid="+item.pid+"&tid="+item.tid
				});
				
			},
			dealString(item,name){
				let obj = {};
				switch(item.state){
					case 0:
						obj.color = '#2979ff';
						obj.text = '待考';
						obj.icon = 'file-text-fill';
						obj.btn = 'primary';
						obj.btnText = '开始考试';
						obj.title = '待考试';
					break;
					case 1:
						obj.color='#71d5a1';
						obj.text = '合格';
						obj.icon = 'checkmark-circle-fill';
						obj.btn = 'success';
						obj.btnText = '查看记录';
						obj.title = item.score+'分(合格)';
					break;
					case 2:
						obj.color='#dd6161';
						obj.text = '不合格';
						obj.icon = 'close-circle-fill';
						obj.btn = 'error';
						obj.btnText = '查看记录';
						obj.title = item.score+'分(不合格)';
					break;
				}
				return obj[name];
			},
			toQuestionAdd(qid) {
				let _this = this;
				uni.navigateTo({
					url: "./addQuestion?type=" + _this.current + "&pid=" + _this.pid + (qid ? ("&qid=" + qid) : "")
				})
			},
			tabsChange(index) {
				this.current = index;
				this.getTestdata();
			},
			getTestdata(){
				let _this = this;
				appRequest.request({
					method: "POST",
					url: appRequest.urlMap.findExamTestList,
					data: {
						pid: _this.pid,
						state:_this.current,
						validFlag: 1
					},
					success: function(res) {
						if (res.data.code == 200) {
							_this.testList = res.data.data;
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

		}
	}
</script>

<style lang="scss">

</style>
