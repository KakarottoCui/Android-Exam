<template>  
    <view class="container">  
		
		<view class="user-section">
			<image class="bg" src="/static/user-bg.jpg"></image>
			<view class="user-info-box">
				<view class="portrait-box">
					<image style="background-color: white;" class="portrait" :src="getHead()"></image>
				</view>
				<view class="info-box" >
					<text class="username">{{ user.nickName || '游客'}}</text>
					<view class="info-box" v-if="user.userName">
						<text class="username">姓名：<text class="u-tips-color">{{  user.userName }}</text></text>
					</view>
					<view class="info-box" v-if="user.userClass">
						<text class="username">班级：<text class="u-tips-color">{{  user.userClass }}</text></text>
					</view>
				</view>
				
				
			</view>
		</view>
		
		
		<view class="u-flex u-direction-row u-row-center" v-if="!user">
			<view class="container">
				<view class="list-cell " style="text-align: center;">
					<text class="cell-tit" style="color: #909399;">游客无法享受购物的快乐</text>
				</view>
				<view class="list-cell log-out-btn" @click="toLogin">
					<text class="cell-tit">前往登录</text>
				</view>
			</view>
		</view>
		
		
		
		<view v-if="user"
			class="cover-container"
			:style="[{
				transform: coverTransform,
				transition: coverTransition
			}]"
			@touchstart="coverTouchstart"
			@touchmove="coverTouchmove"
			@touchend="coverTouchend"
		>
			<image class="arc" src="/static/arc.png"></image>
			
			<view v-if="user.type != 2">
				<view class="tj-sction u-p-t-20 u-font-30" style="color: #2979ff;">
					管理专区
				</view>
				<view class="" style="background-color: white;">
					<view @click="jumpToAddUser(2)" class="u-p-20 u-border-bottom">添加学生</view>
					<view   @click="jumpToAddUser(1)" v-if="user.type==0" class="u-p-20 u-border-bottom">添加教师</view>
					<view  @click="jumpToUsrList"  class="u-p-20">人员管理</view>
					
				</view>
			</view>
			
			
			
			
			<!-- 浏览历史 -->
			<view class="history-section icon">
				<view class="sec-header">
					<text>其他功能</text>
				</view>

				<list-cell icon="icon-shezhi1" iconColor="#e07472" title="设置" border="" @eventClick="navTo('/pages/set/set')"></list-cell>
				<list-cell icon="icon-share" iconColor="#3f80de" title="退出登录" border="" @eventClick="toLogout"></list-cell>
			</view>
		</view>
			
		
    </view>  
</template>  
<script>  
	import listCell from '@/components/mix-list-cell';
	import appRequest from "@/common/appRequestUrl.js";
    import {  
        mapState 
    } from 'vuex';  
	let startY = 0, moveY = 0, pageAtTop = true;
    export default {
		components: {
			listCell
		},
		data(){
			return {
				picUrl:appRequest.getPicById,
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				user:"",
				current:"",
			}
		},
		onLoad(){
			
			
		},
		onShow() {
			this.user = appRequest.getUserInfo();
			if(!this.user){
				uni.redirectTo({
					url:"../public/login"
				})
			}
		},
		// #ifndef MP
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (this.user) {
				this.navTo('/pages/set/set');
			}else{
				this.navTo("/pages/public/login")
			}
			
			// else if(index === 1){
			// 	// #ifdef APP-PLUS
			// 	const pages = getCurrentPages();
			// 	const page = pages[pages.length - 1];
			// 	const currentWebview = page.$getAppWebview();
			// 	currentWebview.hideTitleNViewButtonRedDot({
			// 		index
			// 	});
			// 	// #endif
			// 	uni.navigateTo({
			// 		url: '/pages/notice/notice'
			// 	})
			// }
		},
		// #endif
        computed: {
			...mapState(['hasLogin','userInfo'])
		},
        methods: {
			jumpToUsrList(){
				uni.navigateTo({
					url:"../public/userList"
				})
			},
			jumpToAddUser(type){
				uni.navigateTo({
					url:"../public/addUser?type="+type
				})
			},
			toLogout(){
				uni.showModal({
				    content: '确定要退出登录么',
				    success: (e)=>{
				    	if(e.confirm){
							uni.clearStorage();
				    		uni.switchTab({
				    			url:"../index/index"
				    		})
				    	}
				    }
				});
			},
			toLogin(){
				uni.navigateTo({
					url:"../public/login"
				})
			},
			goodsChange(item,type){
				let _this = this;
				
				switch (type){
					case 0://店铺上下架
						item['type'] = 1;
						item.stat = item.stat == 0 ? 1:0;
						break;
					case 1://管理员审核
						item['type'] = 1;
						item.stat = item.stat == 1 ? 3:1;
						break;
					case 2:
						item['type'] = 0;//管理员删除
						break;		
					default:
						break;
				}
				
				appRequest.request({
					method: "POST",
					url: appRequest.saveGoods,
					data:{
						data:JSON.stringify(item)
					},
					success: function(res) {
						_this.$api.msg(res.data.msg);
						_this.getStoreGoods();
					},
					fail: function(res) {
						_this.$api.msg("请求异常");
					}
				})
			},
			showAddGoods(){
				uni.navigateTo({
					url:"../public/addGoods"
				});
			},
			getStoreGoods(){
				let _this = this;
				appRequest.request({
					method: "POST",
					url: appRequest.getGoodsByStore,
					success: function(res) {
						if(res.data.code == 200){
							_this.storeGoods = res.data.data
						}else{
							
						}
				
					},
					fail: function(res) {
						_this.$api.msg("请求异常");
						item.stat = item.stat == 0 ? 1:0;
					}
				})
			},
			storeChange:function(item,type){
				
				switch (type){
					case 0: //店铺审核
					
						item.stat = item.stat == 0 ? 1:0;
						this.checkStore(item);
					
						break;
					default:
						break;
				}
			},
			checkStore:function(item){
				
				let _this = this;
				appRequest.request({
					method: "POST",
					url: appRequest.setUncheckStore,
					data:{
						data:JSON.stringify(item)
					},
					success: function(res) {
						
						if(res.data.code == 200){
							_this.getUnchecked();
						}else{
							_this.$api.msg(res.data.msg);
							item.stat = item.stat == 0 ? 1:0;
						}
				
					},
					fail: function(res) {
						_this.$api.msg("请求异常");
						item.stat = item.stat == 0 ? 1:0;
					}
				})
			},
			getUnchecked(){
				let _this = this;
				appRequest.request({
					method: "POST",
					url: appRequest.getUncheckStore,
					success: function(res) {
						
						if(res.data.code == 200){
							_this.unCheckList = res.data.data
							_this.unCheckList.map(function(obj,index,arr){
								obj['checked'] = obj.stat == 1;
							})
						}else{
							_this.$api.msg(res.data.msg);
						}
				
					},
					fail: function(res) {
						_this.$api.msg("请求异常");
					}
				})
			},getGoods(){
				let _this = this;
				appRequest.request({
					method: "POST",
					url: appRequest.getGoods,
					data:{
						data:JSON.stringify({
							validFlag:1
						})
					},
					success: function(res) {
						
						if(res.data.code == 200){
							_this.goodsList = res.data.data;
						}else{
							_this.$api.msg(res.data.msg);
						}
				
					},
					fail: function(res) {
						_this.$api.msg("请求异常");
					}
				})
			},
			change(index) {
				this.current = index;
				if(this.user.type == 3){
					if(index == 0){
						this.getUnchecked();
					}else{
						this.getGoods();
					}
				}else if(this.user.type == 2){
					if(index == 0){
						this.getStoreGoods();
					}else{
						uni.navigateTo({
							url:"/pages/order/order?index=1"
						})
					}
				}
			},
			getHead:function(){
				switch (this.user.type){
					case 2:
						return '/static/user.jpg';
						break;
					case 1:
						return '/static/store.png';
						break;
					case 0:
						return '/static/admin.png';
						break;		
					default:
						return '/static/missing-face.png';
						break;
				}
			},
			
			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			navTo(url){
				if(!this.user){
					url = '/pages/public/login';
				}
				uni.navigateTo({  
					url
				})  
			}, 
	
			/**
			 *  会员卡下拉和回弹
			 *  1.关闭bounce避免ios端下拉冲突
			 *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
			 *    transition设置0.1秒延迟，让css来过渡这段空窗期
			 *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
			 */
			coverTouchstart(e){
				if(pageAtTop === false){
					return;
				}
				this.coverTransition = 'transform .1s linear';
				startY = e.touches[0].clientY;
			},
			coverTouchmove(e){
				moveY = e.touches[0].clientY;
				let moveDistance = moveY - startY;
				if(moveDistance < 0){
					this.moving = false;
					return;
				}
				this.moving = true;
				if(moveDistance >= 80 && moveDistance < 100){
					moveDistance = 80;
				}
		
				if(moveDistance > 0 && moveDistance <= 80){
					this.coverTransform = `translateY(${moveDistance}px)`;
				}
			},
			coverTouchend(){
				if(this.moving === false){
					return;
				}
				this.moving = false;
				this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
				this.coverTransform = 'translateY(0px)';
			}
        }  
    }  
</script>  
<style lang='scss'>
	%flex-center {
	 display:flex;
	 flex-direction: column;
	 justify-content: center;
	 align-items: center;
	}
	%section {
	  display:flex;
	  justify-content: space-around;
	  align-content: center;
	  background: #fff;
	  border-radius: 10upx;
	}

	.user-section{
		height: 520upx;
		padding: 100upx 30upx 0;
		position:relative;
		.bg{
			position:absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
			opacity: .7;
		}
	}
	.user-info-box{
		height: 180upx;
		display:flex;
		align-items:center;
		position:relative;
		z-index: 1;
		.portrait{
			width: 130upx;
			height: 130upx;
			border:5upx solid #fff;
			border-radius: 50%;
		}
		.username{
			font-size: $font-lg + 6upx;
			color: $font-color-dark;
			margin-left: 20upx;
		}
	}

	.vip-card-box{
		display:flex;
		flex-direction: column;
		color: #f7d680;
		height: 240upx;
		background: linear-gradient(left, rgba(0,0,0,.7), rgba(0,0,0,.8));
		border-radius: 16upx 16upx 0 0;
		overflow: hidden;
		position: relative;
		padding: 20upx 24upx;
		.card-bg{
			position:absolute;
			top: 20upx;
			right: 0;
			width: 380upx;
			height: 260upx;
		}
		.b-btn{
			position: absolute;
			right: 20upx;
			top: 16upx;
			width: 132upx;
			height: 40upx;
			text-align: center;
			line-height: 40upx;
			font-size: 22upx;
			color: #36343c;
			border-radius: 20px;
			background: linear-gradient(left, #f9e6af, #ffd465);
			z-index: 1;
		}
		.tit{
			font-size: $font-base+2upx;
			color: #f7d680;
			margin-bottom: 28upx;
			.yticon{
				color: #f6e5a3;
				margin-right: 16upx;
			}
		}
		.e-b{
			font-size: $font-sm;
			color: #d8cba9;
			margin-top: 10upx;
		}
	}
	.cover-container{
		background: $page-color-base;
		margin-top: -150upx;
		padding: 0 30upx;
		position:relative;
		background: #f5f5f5;
		padding-bottom: 20upx;
		.arc{
			position:absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}
	}
	.tj-sction{
		@extend %section;
		.tj-item{
			@extend %flex-center;
			flex-direction: column;
			height: 140upx;
			font-size: $font-sm;
			color: #75787d;
		}
		.num{
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 8upx;
		}
	}
	.order-section{
		@extend %section;
		padding: 28upx 0;
		margin-top: 20upx;
		.order-item{
			@extend %flex-center;
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			font-size: $font-sm;
			color: $font-color-dark;
		}
		.yticon{
			font-size: 48upx;
			margin-bottom: 18upx;
			color: #fa436a;
		}
		.icon-shouhoutuikuan{
			font-size:44upx;
		}
	}
	.history-section{
		padding: 30upx 0 0;
		margin-top: 20upx;
		background: #fff;
		border-radius:10upx;
		.sec-header{
			display:flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
			margin-left: 30upx;
			.yticon{
				font-size: 44upx;
				color: #5eba8f;
				margin-right: 16upx;
				line-height: 40upx;
			}
		}
		.h-list{
			white-space: nowrap;
			padding: 30upx 30upx 0;
			image{
				display:inline-block;
				width: 160upx;
				height: 160upx;
				margin-right: 20upx;
				border-radius: 10upx;
			}
		}
	}
	.list-cell{
		display:flex;
		align-items:baseline;
		padding: 20upx $page-row-spacing;
		line-height:60upx;
		position:relative;
		background: #fff;
		justify-content: center;
		&.log-out-btn{
			margin-top: 40upx;
			.cell-tit{
				color: $uni-color-primary;
				text-align: center;
				margin-right: 0;
			}
		}
		&.cell-hover{
			background:#fafafa;
		}
		&.b-b:after{
			left: 30upx;
		}
		&.m-t{
			margin-top: 16upx; 
		}
		.cell-more{
			align-self: baseline;
			font-size:$font-lg;
			color:$font-color-light;
			margin-left:10upx;
		}
		.cell-tit{
			flex: 1;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			margin-right:10upx;
		}
		.cell-tip{
			font-size: $font-base;
			color: $font-color-light;
		}
		switch{
			transform: translateX(16upx) scale(.84);
		}
	}
	
</style>