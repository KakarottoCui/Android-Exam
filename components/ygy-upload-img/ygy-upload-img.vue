<template>
	<view>
		<view class="ygy-upload-img-container">
			<view class="title">{{title}}</view>
			<view class="content">
				<view class="ygy-img" :style="{width:size+'rpx',height:size+'rpx'}" v-for="(item, index) in imgList"
					:key="index" @click="perviewImg(index)">
					<image :style="{width:size+'rpx',height:size+'rpx'}" :src="item" v-if="item"></image>
					<view class="ygy-icon-close" @click.stop="handleRemove(index)">
						<text class="iconfont icon-close-circle-fill" :style="iconCloseStyle"></text>
					</view>
				</view>
				<view class="ygy-img-add" :style="{width:size+'rpx',height:size+'rpx'}" @click="chooseImage"
					v-show="imgList.length<num">
					<text class="iconfont icon-jiahao" :style="iconAddStyle"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'ygy-upload-img',
		props: {
			title: {
				required: false,
				default: "上传图片:"
			},
			num: {
				required: false,
				default: 3
			},
			size: {
				required: false,
				default: 150
			},
			iconAddStyle: {
				required: false,
				default: () => {
					return {
						fontSize: '130rpx'
					}
				}
			},
			iconCloseStyle: {
				required: false,
				default: () => {
					return {
						fontSize: '50rpx'
					}
				}
			},
		},

		data() {
			return {
				imgList: [],
				imgBase64List: []
			};
		},
		methods: {
			chooseImage() {
				uni.chooseImage({
					count: this.num,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: async (res) => {
						for (var i = 0; i < res.tempFilePaths.length; i++) {
							this.imgList.push(res.tempFilePaths[i]);
							let data = await this.detailImage(res.tempFilePaths[i]);
							this.imgBase64List.push(data);
						}
						this.$emit('saveImg', this.imgBase64List);
					}
				})
			},
			perviewImg(index) {
				let urls = [];
				if (index != -1) {
					urls[0] = this.imgList[index];
				} else {
					urls = this.imgList;
				}
				uni.previewImage({
					urls: urls
				});
			},
			handleRemove(index) {
				let il = [],
					ibl = [];
				for (var i = 0; i < this.imgList.length; i++) {
					if (i != index) {
						il.push(this.imgList[i]);
						ibl.push(this.imgBase64List[i]);
					}
				}
				this.imgList = il;
				this.imgBase64List = ibl;
				this.$emit('saveImg', this.imgBase64List);
			},
			detailImage(path) {
				// #ifdef APP-PLUS
				return new Promise((resolve, reject) => {
					plus.io.resolveLocalFileSystemURL(path, function(entry) {
						entry.file(function(file) {
							var fileReader = new plus.io.FileReader();
							//alert("getFile:" + JSON.stringify(file));
							fileReader.readAsDataURL(file);
							fileReader.onloadend = function(evt) {
								// base64字符串
								resolve(evt.target.result);
							}
						})
					})
				})
				// #endif

				// #ifdef H5
				return new Promise((resolve, reject) => {
					uni.request({
						url: path,
						method: 'GET',
						responseType: 'arraybuffer',
						success: res => {
							let base64 = uni.arrayBufferToBase64(res.data); //把arraybuffer转成base64
							base64 = 'data:image/jpeg;base64,' + base64 //不加上这串字符，在页面无法显示的
							resolve(base64)
						},
						fail: err => {
							reject(err)
						}
					})
				})
				// #endif
			}
		}
	}
</script>

<style scoped>
	@import url("./iconfont/iconfont.css");

	.ygy-upload-img-container {
		/* margin: 5rpx; */
	}

	.title {
		margin: 15rpx 0;
		white-space: nowrap;
	}

	.content::after {
		content: '';
		display: block;
		clear: both;
	}

	.ygy-img {
		overflow: hidden;
		float: left;
		position: relative;
		height: 100rpx;
		width: 100rpx;
		margin: 5rpx;
		border: 1px solid #eee;
		border-radius: 5px;
	}


	.ygy-img-add {
		float: left;
		margin: 5rpx;
		height: 100rpx;
		width: 100rpx;
		background-color: #eee;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.ygy-img-add>text {
		font-size: 80rpx;
		color: #fff;
	}

	.ygy-img>image {
		height: 100rpx;
		width: 100rpx;
	}

	.ygy-icon-close {
		width: 20rpx;
		height: 20rpx;
		position: absolute;
		right: 0rpx;
		top: 0rpx;
		color: #fa3534;
	}

	.ygy-icon-close>text {
		position: absolute;
		right: 0rpx;
		top: 0rpx;
		color: #fa3534;
	}
</style>
