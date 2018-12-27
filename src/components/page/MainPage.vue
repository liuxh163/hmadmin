<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 首页</el-breadcrumb-item>
				<el-breadcrumb-item>轮播图</el-breadcrumb-item>
			</el-breadcrumb>
		</div>


		<el-upload action="http://admin-demo.zhiyu365.cn/acaeva/file/uploadfile" :data={source:temp}
		 list-type="picture-card" :on-success="handleSuccess" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
		 :before-remove="beforeRemove" :before-upload="onBeforeUpload" multiple :limit="9" :file-list="fileList" :on-exceed="handleExceed">
			<i class="el-icon-plus"></i>
		</el-upload>
		<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1Mb</div>
		<el-dialog :visible.sync="dialogVisible">
			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dialogImageUrl: '',
				dialogVisible: false,
				fileList: [{
					name: 'food.jpeg',
					url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
				}, {
					name: 'food2.jpeg',
					url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
				}]
			};
		},
		methods: {
			onBeforeUpload(file) {
				// 				const isIMAGE = file.type === 'image/jpeg' || 'image/gif' || 'image/png';
				// 				const isLt1M = file.size / 1024 / 1024 < 1;
				// 
				// 				if (!isIMAGE) {
				// 					this.$message.error('上传文件只能是图片格式!');
				// 				}
				// 				if (!isLt1M) {
				// 					this.$message.error('上传文件大小不能超过 1MB!');
				// 				}
				// 				return isIMAGE && isLt1M;
			},
			handleSuccess(response, file, fileList) {
				// this.fileList = fileList;
			},
			handleRemove(file, fileList) {
				// this.fileList = fileList;
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 9 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			}
		}
	}
</script>


<style scoped>
	.uploadCss {
		width: 100%;
		height: 50%;
	}
</style>
