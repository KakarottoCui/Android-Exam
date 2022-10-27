<template>
	<view class="">
		<u-subsection v-if="user.type==0 || user.type==1" :list="list0" :current="current" @change="sectionChange"></u-subsection>
		<view v-if="current==0">
			<u-tabs-swiper @change="tabsChange($event,'testView')" :current="testView" ref="tabs" :list="list" :is-scroll="false"></u-tabs-swiper>
			
			<view v-for="(item,index) in testList" :key="index" v-if="testView == item.state">
				<view class="shadow-border card-view">
					<view class="card-view-top">
						<view><u-icon style="margin-right: 10rpx;" :name="dealString(item,'icon')" :color="dealString(item,'color')"></u-icon>{{item.paperName}}<text></text></view><view><text class="u-tips-color">{{ dealString(item,'title') }}</text></view>
					</view>
					<view class="u-border-bottom"></view>
					<view class="card-view-bottom">
						 <view><u-icon style="margin-right: 10rpx;" name="clock-fill" color="lightgray"></u-icon> <text class="u-tips-color">{{item.createTime}}</text> </view>
						 <view><u-button :type="dealString(item,'btn')" size="mini" @click="jumpToExam(item)" >{{dealString(item,'btnText')}}</u-button> </view>
					</view>
				</view>
				
			</view>
			<view v-if="testList.length == 0" style="padding-top: 300rpx;">
				<u-empty text="暂无数据" mode="list"></u-empty>
			</view>
		</view>
		
		<view v-if="current==1">
			<u-tabs-swiper @change="tabsChange($event,'paperView')" :current="paperView" ref="tabs" :list="list1" :is-scroll="false"></u-tabs-swiper>
			
			<view class="u-flex u-flex-row" style="background-color: white;justify-content: flex-end;">
				<view class="u-p-15">
					<u-button type="success" size="mini" @click="jumpToAddPaper()">新增试卷</u-button>
				</view>
			</view>
			
			<view v-for="(item,index) in paperList">
				<view v-if="item.state == 0" class="shadow-border card-view">
					<view class="card-view-top">
						<view><u-icon style="margin-right: 10rpx;" name="file-text-fill" color="#2979ff"></u-icon><text>{{item.paperName}}</text></view><view><u-button @click="changePaperState(item,1)" type="warning" size="mini">发布</u-button></view>
					</view>
					<view class="u-border-bottom"></view>
					<view class="card-view-bottom">
						 <view><u-icon style="margin-right: 10rpx;" name="clock-fill" color="lightgray"></u-icon> <text class="u-tips-color">{{item.createTime}}</text> </view>
						 <!-- <view><u-button type="primary" size="mini" @click="jumpToEditPaper(item)">编辑试卷</u-button></view>
						 --><view>
						 		<view class="mybtn-blue" @click="jumpToEditPaper(item)">编辑试卷</view>
						 </view>
						 <view><u-button type="success" size="mini" @click="jumpToEditQuestion(item)">编辑试题</u-button></view>
						
					</view>
				</view>
				
				<view v-if="item.state == 1" class="shadow-border card-view">
					<view class="card-view-top">
						<view><u-icon style="margin-right: 10rpx;" name="file-text-fill" color="#2979ff"></u-icon><text>{{item.paperName}}</text></view><view><u-button @click="changePaperState(item,0)" type="error" size="mini">撤回</u-button></view>
					</view>
					<view class="u-border-bottom"></view>
					
					<view>
						<view class="card-view-bottom u-m-b-20 u-m-r-20" style="justify-content: space-between;">
							<view><u-icon style="margin-right: 10rpx;" name="clock-fill" color="#2979ff"></u-icon>待考：<text class="u-tips-color">{{item.unStartNum}}</text></view>
							<view><u-icon style="margin-right: 10rpx;" name="checkmark-circle-fill" color="#71d5a1"></u-icon>合格：<text class="u-tips-color">{{item.passNum}}</text></text></view>
							<view><u-icon style="margin-right: 10rpx;" name="close-circle-fill" color="#dd6161"></u-icon>不合格：<text class="u-tips-color">{{item.failNum}}</text></text></view>
							
						</view>
						<view class="u-border-bottom"></view>
					</view>
					
					<view class="u-flex u-row-between u-p-t-20">
						 <view><u-button type="primary" @click="jumpToUserInfo(item)" size="mini">考试明细</u-button></view>
						 <view><u-button type="success" @click="jumptoAddUser(item)" size="mini">添加考生</u-button></view>
					</view>
				</view>
				
			</view>
			<view v-if="paperList.length==0" style="padding-top: 300rpx;">
				<u-empty text="暂无数据" mode="list"></u-empty>
				
			</view>
			
		</view>
		
	</view>
</template>

<script>
	import appRequest from "@/common/appRequestUrl.js";
	export default {
		data() {
			return {
				picUrl:appRequest.getPicById,
				sizeCalcState: false,
				tabScrollTop: 0,
				currentId: 1,
				testList:[],
				paperList:[],
				list: [{
						name: '等待考试'
					}, {
						name: '考试合格'
					}, {
						name: '考试不合格'
					}],	
				list0: [
					{
						name: '考试记录'
					}, 
					{
						name: '试卷管理'
					}
				],list01: [
					{
						name: '考试记录'
					}
				],list1: [
					{
						name: '未发布'
					}, 
					{
						name: '已发布'
					}
				],
				current: 0,
				testView:0,
				paperView:0,
				user:""
			}
		},
		onLoad(options){
			
			
		},onShow:function(){
			
			this.user = appRequest.getUserInfo();
			if(!this.user){
				uni.redirectTo({
					url:"../public/login"
				})
			}
			this.getTest();
			// try {
			// 	const value = uni.getStorageSync('currId');
			// 	if (value) {
			// 		this.tabtap({id:value });
			// 	}else{
			// 		this.tabtap({id:1 });
			// 	}
			// 	uni.removeStorageSync('storage_key');
			// } catch (e) {
			// 	// error
			// }
		},
		methods: {
			jumpToUserInfo(item){
				uni.navigateTo({
					url:"../public/examUserList?pid="+item.pid
				});
			},
			jumpToExam(item){
				if(item.state == 0){
					uni.navigateTo({
						url:"../public/examPage?pid="+item.pid+"&tid="+item.tid
					});
				}else{
					uni.navigateTo({
						url:"../public/examResPage?pid="+item.pid+"&tid="+item.tid
					});
				}
				
			},
			jumpToEditQuestion(item){
				uni.navigateTo({
					url:"../public/questionList?pid="+item.pid
				});
			},
			jumpToAddPaper(item){
				uni.navigateTo({
					url:"../public/addPaper"
				});
			},jumpToEditPaper(item){
				uni.navigateTo({
					url:"../public/addPaper?pid="+item.pid
				});
			},jumptoAddUser(item){
				uni.navigateTo({
					url:"../public/userList?pid="+item.pid+"&paperName="+item.paperName
				});
			},
			changePaperState(item,state){
				let _this = this;
				if(state==1){
					if(item.singleCount < item.singleNum){
						_this.$api.msg("选择题数量不足，无法发布");
						return;
					}
					if(item.multiCount < item.multiNum){
						_this.$api.msg("填空题数量不足，无法发布");
						return;
					}
					if(item.judgeCount < item.judgeNum){
						_this.$api.msg("判断题数量不足，无法发布");
						return;
					}
				}
				appRequest.request({
					method: "POST",
					url: appRequest.urlMap.editExamPaper,
					data:{
						state:state,
						pid:item.pid
					},
					success: function(res) {
						if(res.data.code == 200){
							_this.$api.msg("修改成功");
							_this.getPaper(_this.paperView);
						}else{
							_this.$api.msg(res.data.msg);
						}
				
					},
					fail: function(res) {
						_this.$api.msg("请求异常");
					}
				})
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
			tabsChange(index,name) {
				this[name] = index;
				if(name=='testView'){
					this.getTest(index);
				}else{
					this.getPaper(index);
				}
			},
			sectionChange(index){
				this.current = index;
				if(index==0){
					this.getTest(0);
				}else{
					this.getPaper(0);
				}
			},
			toGoodsInfo(item){
				appRequest.goodsCache.save(item);
				uni.navigateTo({
					url:"../product/product"
				})
			},getTest(state){
				let _this = this;
				appRequest.request({
					method: "POST",
					url: appRequest.urlMap.findExamTestList,
					data:{
						state:state,
						uid:_this.user.uid,
						validFlag:1
					},
					success: function(res) {
						
						if(res.data.code == 200){
							_this.testList = res.data.data;
						}else{
							_this.$api.msg(res.data.msg);
						}
				
					},
					fail: function(res) {
						_this.$api.msg("请求异常");
					}
				})
			},getPaper(state){
				let _this = this;
				appRequest.request({
					method: "POST",
					url: appRequest.urlMap.queryListWithNum,
					data:{
						state:state,
						validFlag:1
					},
					success: function(res) {
						
						if(res.data.code == 200){
							_this.paperList = res.data.data;
						}else{
							_this.$api.msg(res.data.msg);
						}
				
					},
					fail: function(res) {
						_this.$api.msg("请求异常");
					}
				})
			},
			//一级分类点击
			tabtap(item){
				if(!this.sizeCalcState){
					this.calcSize();
				}
				
				this.currentId = item.id;
				this.slist=[{name:"全部商品",id:item.id}]
				this.getGoods(item.id)
				// let index = this.slist.findIndex(sitem=>sitem.pid === item.id);
				// this.tabScrollTop = this.slist[index].top;
			},
			//右侧栏滚动
			asideScroll(e){
				if(!this.sizeCalcState){
					this.calcSize();
				}
				let scrollTop = e.detail.scrollTop;
				let tabs = this.slist.filter(item=>item.top <= scrollTop).reverse();
				if(tabs.length > 0){
					this.currentId = tabs[0].pid;
				}
			},
			//计算右侧栏每个tab的高度等信息
			calcSize(){
				let h = 0;
				this.slist.forEach(item=>{
					let view = uni.createSelectorQuery().select("#main-" + item.id);
					view.fields({
						size: true
					}, data => {
						item.top = h;
						h += data.height;
						item.bottom = h;
					}).exec();
				})
				this.sizeCalcState = true;
			},
			navToList(sid, tid){
				
			}
		}
	}
</script>

<style lang='scss'>
	page,
	.content {
		height: 100%;
		background-color: #f8f8f8;
	}

	.content {
		display: flex;
	}
	.left-aside {
		flex-shrink: 0;
		width: 200upx;
		height: 100%;
		background-color: #fff;
	}
	.f-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100upx;
		font-size: 28upx;
		color: $font-color-base;
		position: relative;
		&.active{
			color: $base-color;
			background: #f8f8f8;
			&:before{
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				height: 36upx;
				width: 8upx;
				background-color: $base-color;
				border-radius: 0 4px 4px 0;
				opacity: .8;
			}
		}
	}

	.right-aside{
		flex: 1;
		overflow: hidden;
		padding-left: 20upx;
	}
	.s-item{
		display: flex;
		align-items: center;
		height: 70upx;
		padding-top: 8upx;
		font-size: 28upx;
		color: $font-color-dark;
	}
	.t-list{
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		background: #fff;
		padding-top: 12upx;
		&:after{
			content: '';
			flex: 99;
			height: 0;
		}
	}
	.t-item{
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 176upx;
		font-size: 26upx;
		color: #666;
		padding-bottom: 20upx;
		
		image{
			width: 140upx;
			height: 140upx;
		}
	}
	.mybtn-blue{
		font-size: 12px;border-radius:5px;padding:0 11px;background-color: #2979ff;height: 27px;width: auto;line-height: 27px;color:white;
	}
</style>
