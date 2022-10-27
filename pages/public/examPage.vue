<template>
	<view class="examdetail">
		<view class="u-m-r-30" style="display: flex;justify-content: center;">
			<view class=" u-p-10" type="default"><view><u-button type="success" size="medium" @click="examsubmit">提交</u-button></view></view>
		</view>
		<view class="examtypes">
			<swiper class="examtypes-swiper" :current="currentindexpage" @change="change">
				<template v-for="(itemcard,indexcard) in examdata.examlist">
					<swiper-item v-if="itemcard.type == 0">
						<view class="swiper-item">
								<view class="exam-type">
									{{indexcard+1}}.{{itemcard.realType == 2 ? '判断':'单选'}}题（{{itemcard.score}}分）
								</view>
								<view class="exam-content">
									{{itemcard.examcontent}}
								</view>
								<view class="exam-optionlist">
									<!-- 考试解析选择 -->
									<view v-show="analysis" :class="{ examactive: analysislist[indexcard].answer == index }" v-for="(city, index) in itemcard.optionlist"
									 class="exam-option_item">
										<view class="exam-option_item_option">
											{{index == 0?'A':''}}
											{{index == 1?'B':''}}
											{{index == 2?'C':''}}
											{{index == 3?'D':''}}
										</view>
										<view class="exam-option_item_text">
											{{city.name}}
										</view>
									</view>
									<!-- 正常考试 -->
									<view v-show="!analysis" @click="changChecked(index,itemcard.type)" :class="{ examactive: city.checked }"
									 v-for="(city, index) in itemcard.optionlist" class="exam-option_item">
										<view class="exam-option_item_option">
											{{index == 0?'A':''}}
											{{index == 1?'B':''}}
											{{index == 2?'C':''}}
											{{index == 3?'D':''}}
										</view>
										<view class="exam-option_item_text">
											{{city.name}}
										</view>
									</view>
								</view>
								<!-- 考试解析 -->
								<view v-if="analysis" class="examdetail-analysis">
									<view class="examdetail-analysis_title" :class="{exammistake:analysislist[indexcard].judge == false}">
										回答{{analysislist[indexcard].judge ? '正确' : '错误'}}，得分{{analysislist[indexcard].score}}
									</view>
									<view class="examdetail-analysis_content">
										<view class="examdetail-analysis_content_op">
											<text class="title">参考答案：</text><text class="text answer">{{analysislist[indexcard].solution}}</text>
										</view>
										<view class="examdetail-analysis_content_op">
											<text class="title">本题解析：</text><text class="text">讲座概要、专题内容、拓展阅读文献、教学课件和教学视频等组成的教学内容体系。学生可以根据自己的学习兴趣，由浅入深地进行拓展学习。通过学术讲座、学术沙龙、学术讨论等展学习。通过学术讲座、学术沙龙、学术讨论等形式，使学生掌握较扎实的课程与教学的基础理论知识和其他相本课程对每个专题的讲座内容进行系统整理，形成了由讲座概要、专题内容、拓展阅读文献、教学课件和教学视频等组成的教学内容体系。学生可以根据自己的学习兴趣，由浅入深地进行拓展学习。通过学术讲座、学术沙龙、学术讨论等形式，使学生掌握较扎实的课程与教学的基础理论知识和其他相</text>
										</view>
									</view>
								</view>
						</view>
					</swiper-item>
					<swiper-item v-if="itemcard.type == 1">
						<view class="swiper-item">
								<view class="exam-type">
									{{indexcard+1}}.多选题（{{itemcard.score}}分）
								</view>
								<view class="exam-content">
									{{itemcard.examcontent}}
								</view>
								<view class="exam-optionlist">
									<!-- 考试解析选择 -->
									<view v-show="analysis" :class="{ examactive: analysislist[indexcard].answer[index] == index }" v-for="(city, index) in itemcard.optionlist"
									 class="exam-option_item">
										<view class="exam-option_item_option">
											{{index == 0?'A':''}}
											{{index == 1?'B':''}}
											{{index == 2?'C':''}}
											{{index == 3?'D':''}}
										</view>
										<view class="exam-option_item_text">
											{{city.name}}
										</view>
									</view>
									<!-- 正常考试 -->
									<view v-show="!analysis" @click="changChecked(index,itemcard.type)" :class="{ examactive: city.checked }"
									 v-for="(city, index) in itemcard.optionlist" class="exam-option_item">
										<view class="exam-option_item_option">
											{{index == 0?'A':''}}
											{{index == 1?'B':''}}
											{{index == 2?'C':''}}
											{{index == 3?'D':''}}
										</view>
										<view class="exam-option_item_text">
											{{city.name}}
										</view>
									</view>
								</view>
								<!-- 考试解析 -->
								<view v-if="analysis" class="examdetail-analysis">
									<view class="examdetail-analysis_title" :class="{exammistake:analysislist[indexcard].judge == false}">
										回答{{analysislist[indexcard].judge ? '正确' : '错误'}}，得分{{analysislist[indexcard].score}}
									</view>
									<view class="examdetail-analysis_content">
										<view class="examdetail-analysis_content_op">
											<text class="title">参考答案：</text><text class="text answer">
												<template v-for="items in analysislist[indexcard].solution">
													{{items}}、
												</template>
											</text>
										</view>
										<view class="examdetail-analysis_content_op">
											<text class="title">本题解析：</text><text class="text">本课程对每个专题的讲座内容进行系统整理，形成了由讲座概要、专题内容、拓展阅读文献、教学课件和教学视频等组成的教学内容体系。学生可以根据自己的学习兴趣，由浅入深地进行拓展学习。通过学术讲座、学术沙龙、学术讨论等形式，使学生掌握较扎实的课程与教学的基础理论知识和其他相</text>
										</view>
									</view>
								</view>
						</view>
					</swiper-item>
					
				</template>
			</swiper>

		</view>
		<!-- 倒计时 -->
		<view class="exam-countdown">
			<!-- <view v-if="!analysis" class="exam-coundown_time" :class="{coundown_end:coundown_end}">
				倒计时：<tui-countdown :time="endtimeconfig.time" @end="endtime" @time="time"
					:borderColor="endtimeconfig.borderColor" :size="endtimeconfig.size" :color="endtimeconfig.color"
					:colonColor="endtimeconfig.colonColor" :hours="false" :returnTime="true"></tui-countdown>
			</view> -->
			<view class="exam-coundown_page">
				<view @click="pageswitch(0)" class="exam-page_btn">
					上一题
				</view>
				<view v-if="!analysis" class="exam-page_length" @click="card_off">
					题卡（{{currentindexpage + 1}}/{{examdata.examlist.length}}）
				</view>
				<view v-else class="exam-page_length" @click="card_off">
					题卡（{{currentindexpage + 1}}/{{analysislist.length}}）
				</view>
				<view @click="pageswitch(1)" class="exam-page_btn">
					下一题
				</view>
			</view>
		</view>
		<!-- 题卡 -->
		<view backgroundColor="#24222200" mode="bottom" :visible="examvisible" @close="card_off">
			<view class="exam-card">
				<view class="exam-card_title">
					题卡
				</view>
				<!-- 正常考试 -->
				<view v-if="!analysis" class="exam-card_list">
					<view @click="selectexam(index)" class="exam-card_item" v-for="(item,index) in examdata.examlist"
						:class="{'exam-card_blue':answerlist[index],'exam-card_bluecur':answerlist[index] && index == currentindex,'exam-card_graycur':answerlist[index] == undefined && index == currentindex}">
						{{index + 1 }}
					</view>
				</view>
				<!-- 答题解析 -->
				<view v-else class="exam-card_list">
					<view @click="selectexam(index)" class="exam-card_item" v-for="(aitem,index) in analysislist"
						:class="{'exam-card_blue':aitem.type, 'exam-card_bluecur':aitem.type && index == currentindex, 'exam-card_red':!aitem.type, 'exam-card_redcur':!aitem.type && index == currentindex}">
						{{index + 1 }}
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
				examvisible: false, // 答题卡显示隐藏
				analysis: '', // 是否是答题解析
				analysislist: [{
						"index": 0,
						"answer": 0,
						"solution": "B",
						"score": 0,
						"type": 0,
						"judge": false
					},
					{
						"index": 1,
						"answer": [0, 1],
						"solution": ["A", "B"],
						"score": 2,
						"type": 1,
						"judge": true
					},
					{
						"index": 2,
						"answer": 0,
						"solution": "A",
						"score": 2,
						"type": 0,
						"judge": true
					},
					{
						"index": 3,
						"answer": [0, 1],
						"solution": ["C", "D"],
						"score": 0,
						"type": 1,
						"judge": false
					},
					{
						"index": 4,
						"answer": "使学生掌握较扎实的课程与教学的基础理论知识和其他相。",
						"solution": "讲座概要、专题内容、拓展阅读文献、通过学术讲座、学术沙龙、学术讨论等形式，使学生掌握较扎实的课程与教学的基础理论知识和其他相。",
						"score": 0,
						"type": 2,
					},
					{
						"index": 5,
						"answer": "使学生掌握较扎实的课程与教学的基础理论知识和其他相。",
						"solution": "讲座概要、专题内容、拓展阅读文献、通过学术讲座、学术沙龙、学术讨论等形式，使学生掌握较扎实的课程与教学的基础理论知识和其他相。",
						"score": 0,
						"type": 2
					}
				], // 答题解析答案
				headline: {
					headline: '2010新人入职培训结业考试',
					gobackurl: '', // 返回页面
					tabbar: false, // 是否是tab页
					stop: true //是否阻止返回
				}, // 标题
				currentindexpage: 0, // 手动滑屏下标
				currentindex: 0, // 手动切换题目下标
				coundown_end: false, // 倒计时结束class控制
				answerlist: [], // 记录答案
				currlist: [], // 最终答案, // 配置倒计时
				questionList:[],
				examdata: {
					"examtype": "0", // 考试类型
					"examlength": 6, // 考试题数
					"examtime": 40, // 考试时间
					"creditnum": 2, // 学分
					"anewnum": 1, // 重考次数
					"examtitle": "新人入职培训结业考试", // 考试标题
					"examlist":[]
				}, // 考试数据
				tid:"",
				pid:"",
				paperData:"",
				testData:"",
				score:0
			};
		},
		onLoad(detail) {
			
			this.analysis = false;
			this.tid = detail.tid;
			this.pid = detail.pid;
			this.getPaperData();
			// 取消
			uni.$on("btncancel", res => {
				if (res == 0) {
					// 取消
					this.submitconfig.submitmodal = false
				} else {
					// 提前交卷
					this.submitconfig.submitmodal = false
					this.submitanswer()
					this.gotoexamresult()
				}
			})
			// 确认
			uni.$on("btnaffirm", res => {
				if (res == 0) {
					// 确认
					this.submitconfig.submitmodal = false
					this.submitanswer()
					this.gotoexamresult()
				} else {
					// 继续答题
					this.submitconfig.submitmodal = false
				}
			})
			// 我知道了
			uni.$on("btngot", res => {
				if (res == 2) {
					this.submitconfig.submitmodal = false
					this.gotoexamresult()
				}
			})
			// 监听页面返回
			// uni.$on("goback", res => {
			// 	console.log("页面返回")
			// 	this.examsubmit()
			// 	// return
			// })
		},
		onBackPress(e) {
			// if (e.from == "backbutton") {
			// 	this.examsubmit()
			// 	return true
			// }
		},
		// 监听页面卸载
		onUnload() {
			uni.$off("btncancel")
			uni.$off("btnaffirm")
			uni.$off("btngot")
		},
		components: {

		},
		methods: {
			getQuestionList(){
				let _this = this;
				appRequest.request({
					method: "POST",
					url: appRequest.urlMap.queryListForExam,
					data: {
						pid: _this.pid,
						validFlag: 1
					},
					success: function(res) {
						if (res.data.code == 200) {
							_this.questionList = res.data.data;
							var list = _this.formatQuestion();
							
							_this.examdata = {
								"examtype": "0", // 考试类型
								"examlength": _this.questionList.length, // 考试题数
								"examtime": 40, // 考试时间
								"creditnum": 2, // 学分
								"anewnum": 1, // 重考次数
								"examtitle": _this.paperData.paperName, // 考试标题
								"examlist":list
							}; // 考试数据
							
							console.log(JSON.stringify(_this.examdata));
							
						} else {
							_this.$api.msg('试卷获取失败');
						}
					},
					fail: function(res) {
						_this.$api.msg("请求异常");
					}
				})
				
			},
			getPaperData(){
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
							_this.getQuestionList();
						} else {
							_this.$api.msg('试卷获取失败');
						}
					},
					fail: function(res) {
						_this.$api.msg("请求异常");
					}
				})
			},
			formatQuestion(){
				var resList = [];
				var _this = this;
				var scoreName = ['singleScore','multiScore','judgeScore']
				for(var i=0;i<this.questionList.length;i++){
					var obj = this.questionList[i];
					var optionlist = [];
					optionlist.push({name:obj.ansA,checked: false});
					optionlist.push({name:obj.ansB,checked: false});
					if(obj.type<2){
						optionlist.push({name:obj.ansC,checked: false});
						optionlist.push({name:obj.ansD,checked: false});
					}
					
					var res = {
						id:obj.uid,
						type:obj.type==1?1:0,
						realType:obj.type,
						score:_this.paperData[scoreName[obj.type]],
						examcontent:obj.context,
						optionlist:optionlist
					}
					resList.push(res);
				}
				
				return resList;
				
			},
			// 提交按钮点击弹出选择框
			examsubmit() {
				console.log("提交")
				// console.log(this.examdata.examlength);
				// console.log(this.answerlist);
				let currlist = []
				this.answerlist.forEach((item, index) => {
					if (item) {
						currlist.push(item)
					}
				})
				this.currlist = currlist;
				// console.log(currlist);
				// console.log(this.examdata.examlength, this.currlist.length);
				if (this.examdata.examlength == this.currlist.length) {
					var hisList = [];
					this.score = 0
					for(let i = 0;i<this.questionList.length;i++){
						var obj = this.questionList[i];
						var usrRes = "";
						if(obj.type == 1){
							for(var j = 0;j<this.currlist[i].answer.length;j++){
								usrRes +=this.getResByNum(this.currlist[i].answer[j]);
							}
						}else{
							usrRes =this.getResByNum(this.currlist[i].answer);
						}
						var scoreNameList = ['single','multi','judge'];
						if(usrRes == obj.rightAns){
							this.score += this.paperData[scoreNameList[obj.type]+'Score'];
						}
						
						hisList.push({userAns:usrRes,rightAns:obj.rightAns,tid:this.tid,pid:this.pid,res:usrRes == obj.rightAns?1:0,qid:obj.qid});
					}
					this.editExamTest(this.score,hisList);
				
				} else if (this.examdata.examlength > this.currlist.length) {
					let undone = this.examdata.examlength - this.currlist.length
					uni.showModal({
						content:"还有"+undone+"道题未完成",
						success(res) {
							if(res.confirm){
								
							}
						}
					})
					
				}
			},
			getResByNum(num){
				let usrRes = ""
				switch (num){
					case 0:
						usrRes+='A';
						break;
					case 1:
					usrRes+='B';
						break;
					case 2:
					usrRes+='C';
						break;
					case 3:
					usrRes+='D';
						break;
					default:
						break;
				}
				return usrRes;
			},
			// 卡片滑动
			change(e) {
				const {
					current
				} = e.detail
				console.log(current)
				this.currentindex = current
				this.currentindexpage = current
			},
			editExamTest(score,hisList){
				let _this = this;
				appRequest.request({
					method: "POST",
					url: appRequest.urlMap.editExamTest,
					data: {
						tid:_this.tid,
						score:score,
						state:score < _this.paperData.passScore ? 2:1
					},
					success: function(res) {
						if (res.data.code == 200) {
							_this.addExamHisList(hisList)
						} else {
							_this.$api.msg('提交失败');
						}
					},
					fail: function(res) {
						_this.$api.msg("请求异常");
					}
				})
			},
			addExamHisList(hisList){
				let _this = this;
				appRequest.request({
					method: "POST",
					url: appRequest.urlMap.addExamHisList,
					data: hisList,
					success: function(res) {
						if (res.data.code == 200) {
							
							uni.showModal({
								content:"提交成功，你获得了"+_this.score+"分，成绩"+(_this.score > _this.paperData.passScore ? '合格':'不合格'),
								showCancel:false,
								success(res) {
									if(res.confirm){
										uni.navigateBack({
											
										})
									}
								}
							})
							
							
						} else {
							_this.$api.msg('提交失败');
						}
					},
					fail: function(res) {
						_this.$api.msg("请求异常");
					}
				})
			},
			// 单选
			changChecked(index, type) {
				// console.log(index, type);
				// console.log(this.currentindex);
				if (type == 0) {
					if (this.examdata.examlist[this.currentindex].optionlist[index].checked) {
						this.examdata.examlist[this.currentindex].optionlist[index].checked = false;
						this.answerlist[this.currentindexpage] = undefined
						return
					}
					this.examdata.examlist[this.currentindex].optionlist.forEach((item, index) => {
						item.checked = false;
					})
					this.examdata.examlist[this.currentindex].optionlist[index].checked = !this.examdata.examlist[this
						.currentindex].optionlist[index].checked;
					this.answerlist[this.currentindexpage] = ({
						"index": this.currentindexpage,
						"answer": index
					})
				} else if (type == 1) {
					this.examdata.examlist[this.currentindex].optionlist[index].checked = !this.examdata.examlist[this
						.currentindex].optionlist[index].checked
					let indexarr = []
					this.examdata.examlist[this.currentindex].optionlist.forEach((item, index) => {
						if (item.checked) {
							indexarr.push(index)
						}
					})
					// console.log(indexarr);
					if (indexarr.length == 0) {
						this.answerlist[this.currentindexpage] = undefined
					} else {
						this.answerlist[this.currentindexpage] = ({
							"index": this.currentindexpage,
							"answer": indexarr
						})
					}

				}
				// console.log(this.answerlist);
			},
			// textarea输入
			valuecontent() {
				if (this.examdata.examlist[this.currentindex].answer.trim().length == 0) {
					this.answerlist[this.currentindexpage] = undefined
					return;
				} else {
					this.answerlist[this.currentindexpage] = ({
						"index": this.currentindexpage,
						"answer": this.examdata.examlist[this.currentindex].answer
					})
				}
			},
			// 题卡切换
			pageswitch(index) {
				// console.log(this.currentindexpage);
				if (index) {
					let curlength = this.analysis ? this.analysislist.length : this.examdata.examlength
					if (this.currentindexpage < curlength - 1) {
						this.currentindexpage = this.currentindexpage + 1
					}
				} else {
					if (this.currentindexpage > 0) {
						this.currentindexpage = this.currentindexpage - 1
					}
				}
			},
			// 倒计时结束
			endtime() {
				console.log("结束");
				this.coundown_end = true
				this.endtimeconfig.color = "#FF4545"
				this.endtimeconfig.colonColor = "#FF4545"
				// 提交答案
				this.submitanswer()
				// 通知用户
				this.submitconfig = {
					"submitmodal": true,
					"title": "温馨提示",
					"content": "考试时间到，系统已自动交卷",
					"backgroundColor": "#ffffff",
					"radius": "10rpx",
					"submitbtngot": "我知道了",
					"type": 2
				}
			},
			// 倒计时剩余时间
			time(time) {
				// console.log(time.seconds)
				this.residuetime = this.examdata.examtime - time.seconds
			},
			// 提交试卷答案
			submitanswer() {
				console.log("提交试卷答案")
				console.log(this.currlist)
			},
			// 跳转到考试结果
			gotoexamresult() {
				let result = {
					"title": this.examdata.examtitle,
					"submittime": new Date().getTime(),
					"resultnum": 90,
					"subjective": 3,
					"objective": 3,
					"residuetime": this.residuetime,
					"accuracy": 90,
					"jige": 60,
					"msg": "待测评"
				};
				result = JSON.stringify(result)
				uni.redirectTo({
					url: `/pages/examresult/examresult?result=${result}`
				});
			},
			// 关闭题卡
			card_off() {
				this.examvisible = !this.examvisible
			},
			// 选题卡选题
			selectexam(index) {
				this.examvisible = false;
				this.currentindexpage = index
			}
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
	}

	.examdetail {
		width: 100%;
		height: 100%;

		.exam-submit {
			width: 70rpx;
			height: 70rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: $mk-base-color;
			margin: 0;
			padding: 0;
			background-color: #FFFFFF;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 28rpx;
		}

		.examtypes {
			width: 100%;
			height: 80%;

			.examtypes-swiper {
				height: 100%;
				width: 100%;

				.swiper-item {
					width: 92%;
					padding: 0 30rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #909090;
					height: 100%;

					.exam-type {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #909090;
						padding-top: 44rpx;
					}

					.exam-content {
						width: 100%;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #202020;
						line-height: 44rpx;
						margin-top: 40rpx;
					}

					.exam-optionlist {
						padding-top: 44rpx;
						display: flex;
						flex-direction: column;
						padding-bottom: 15rpx;

						.exam-option_item {
							margin-bottom: 24rpx;
							width: 100%;
							min-height: 98rpx;
							background: #F6F6F6;
							border-radius: 10rpx;
							display: flex;
							justify-content: flex-start;
							align-items: center;
							box-sizing: border-box;
							border: 2rpx solid #FFFFFF;

							.exam-option_item_option {
								width: 48rpx;
								height: 48rpx;
								background: #F6F6F6;
								border: 2rpx solid #B2B2B2;
								border-radius: 50%;
								display: flex;
								justify-content: center;
								align-items: center;
								margin-left: 30rpx;

							}

							.exam-option_item_text {
								margin-left: 44rpx;
								width: 535rpx;
								padding: 30rpx 0;
							}
						}

						.examactive {
							background: #F6F6F6;
							border: 2rpx solid $mk-base-color;

							.exam-option_item_option {
								background-color: $mk-base-color;
								color: #FFFFFF;
								border: 2rpx solid $mk-base-color;
							}
						}
					}

					.exam-input {
						width: 100%;
						// height: 800rpx;
						background: #F6F6F6;
						box-sizing: border-box;
						border-radius: 10rpx;
						margin-top: 44rpx;
						margin-bottom: 44rpx;

						textarea {
							width: 94%;
							// height: 760rpx;
							padding: 20rpx 3%;
						}

						.textarea {
							width: 94%;
							padding: 20rpx 3%;
						}
					}

					.examdetail-analysis {
						width: 690rpx;

						.examdetail-analysis_title {
							width: 100%;
							font-size: 20rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: $mk-base-color;
							line-height: 44rpx;
						}

						.exammistake {
							color: $uni-color-error;
						}

						.examdetail-analysis_content {
							width: 92%;
							// height: 212rpx;
							background: #EEEEEE;
							border-radius: 10rpx;
							margin-top: 23rpx;
							padding: 4%;

							.examdetail-analysis_content_op {
								width: 100%;
								display: flex;
								justify-content: flex-start;
								font-size: 20rpx;
								color: #202020;

								.title {
									width: 18%;
								}

								.text {
									width: 82%;
									font-size: 20rpx;
									font-family: PingFang SC;
									font-weight: 500;
									line-height: 30rpx;

								}

								.answer {
									color: $mk-base-color;
								}

							}
						}
					}
				}


			}


		}

		.exam-countdown {
			position: fixed;
			bottom: 0;
			width: 100%;
			display: flex;
			flex-direction: column;
			// border-top: 2rpx solid #000000;

			.exam-coundown_time {
				width: 100%;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				font-weight: bold;
				text-align: center;
				color: $mk-base-color;
				margin: 22rpx 0;
				display: flex;
				justify-content: center;
			}

			.coundown_end {
				color: $uni-color-error;
			}

			.exam-coundown_page {
				width: 100%;
				display: flex;
				justify-content: space-around;
				align-items: center;
				margin: 22rpx 0 36rpx 0;

				.exam-page_length {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #202020;
				}

				.exam-page_btn {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #909090;
				}
			}
		}

		.exam-card {
			position: relative;
			width: 100%;
			height: 980rpx;
			background: #FFFFFF;
			border-radius: 30rpx 30rpx 0px 0px;
			display: flex;
			flex-direction: column;
			align-items: center;

			.exam-card_title {
				width: 92%;
				padding: 0 4%;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #202020;
				padding: 43rpx 0;
			}

			.exam-card_list {
				width: 92%;
				padding: 0 4%;
				display: flex;
				justify-content: flex-start;
				flex-wrap: wrap;

				.exam-card_item {
					width: 80rpx;
					height: 80rpx;
					color: #909090;
					border-radius: 50%;
					margin: 17rpx;
					border: 2rpx solid #B2B2B2;
					display: flex;
					justify-content: center;
					align-items: center;
					box-sizing: border-box;
				}

				.exam-card_blue {
					background: rgba($color: $mk-base-color, $alpha: 0.15);
					border: 2rpx solid rgba($color: $mk-base-color, $alpha: 0.15);
					color: $mk-base-color;
				}

				.exam-card_bluecur {
					background: rgba($color: $mk-base-color, $alpha: 0.35);
					border: 2rpx solid rgba($color: $mk-base-color, $alpha: 0.35);
					color: $mk-base-color;
				}

				.exam-card_graycur {
					background: #F0F0F0;
				}

				.exam-card_red {
					background: rgba($color: $uni-color-error, $alpha: 0.15);
					border: 2rpx solid rgba($color: $uni-color-error, $alpha: 0.15);
					color: $uni-color-error;
				}

				.exam-card_redcur {
					background: rgba($color: $uni-color-error, $alpha: 0.35);
					border: 2rpx solid rgba($color: $uni-color-error, $alpha: 0.35);
					color: $uni-color-error;
				}
			}

			.exam-card_off {
				position: absolute;
				bottom: 0;
				width: 100%;
				height: 98rpx;
				background: #FFFFFF;
				color: #202020;
				font-size: 32rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-top: 2rpx solid #EEEEEE;
			}
		}
	}
</style>
