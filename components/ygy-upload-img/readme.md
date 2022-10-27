### 属性说明
| 属性           | 说明                       |
| -------------- | -------------------------- |
| title          | 组件标题                   |
| size           | 图片显示，上传按钮尺寸大小 |
| num            | 上传图片最多数量           |
| iconAddStyle   | 加号样式                   |
| iconCloseStyle | 关闭图标样式               |
|                |                            |



### 使用说明
```vue
<template>
	<view class="content">
		<view class="item">
			<ygy-upload-img :title="info.title" :size="info.size" :num="info.num" :iconAddStyle="info.iconAddStyle"
				:iconCloseStyle="info.iconCloseStyle" @saveImg="getImgList"></ygy-upload-img>
		</view>

		<view class="item">
			<ygy-upload-img 
			 title="上传图片1" :size="150" :num="5" @saveImg="getImgList"></ygy-upload-img>
		</view>

	</view>
</template>

<script>
	import ygyUploadImg from '../../components/ygy-upload-img/ygy-upload-img.vue'
	export default {
		components: {
			ygyUploadImg
		},
		data() {
			return {
				title: 'Hello',
				info: {
					title: '上传图片：',
					size: 200,
					num: 3,
					iconAddStyle: { //加号样式
						fontSize: '200rpx',
						color: "#42b983"
					},
					iconCloseStyle: { //关闭图标样式
						fontSize: '60rpx',
						color: "#f40"
					}
				},
				imgList: []
			}
		},
		onLoad() {
			
		},
		methods: {
			getImgList(arr) {
				console.log(arr)
			}
		}
	}
</script>

<style>
	.content {
		width: 750rpx;
		/* height: 500rpx; */

	}

	.item {
		border: 1px solid #eee;
		margin: 20rpx 0;
	}
</style>

```