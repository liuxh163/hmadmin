<template>
	<div>
		<div class="form-box">
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="名称">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="描述">
					<el-input type="textarea" rows="5" v-model="form.desc"></el-input>
				</el-form-item>

				<el-form-item label="费用" style="width: 300px;">
					<el-input placeholder="0" :number="true" v-model="form.cost"><template slot="append">人</template></el-input>
				</el-form-item>

				<el-form-item label="活动标签">
					<el-tag v-for="tag in form.tags" :closable="true" type="primary" @close="deleteTag(tag)">
						{{tag.name}}
					</el-tag>
					<el-button icon="el-icon-plus" size="large" @click.native="addTagDialog" style="vertical-align: middle;margin: 10px;"></el-button>
				</el-form-item>

				<el-form-item label="法律保障">
					<el-switch v-model="form.legalProtection"></el-switch>
				</el-form-item>
				<el-form-item label="先行赔付">
					<el-switch v-model="form.advanceCompensation"></el-switch>
				</el-form-item>
				<el-form-item label="支持分期">
					<el-switch v-model="form.installment"></el-switch>
				</el-form-item>
				<el-form-item v-show="form.installment" label="分期最低支付" style="width: 300px;">
					<el-input placeholder="0" :number="true" v-model="form.lowsetCost"><template slot="append">人</template></el-input>
				</el-form-item>
				<el-form-item label="出行卡">
					<el-switch v-model="form.travelCard"></el-switch>
				</el-form-item>

				<el-form-item label="宣传图">
					<el-upload action="http://admin-demo.zhiyu365.cn/acaeva/file/uploadfile" :data={source:temp} list-type="picture-card"
					 :on-success="handleSuccess" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-remove="beforeRemove"
					 :before-upload="onBeforeUpload" multiple :limit="9" :file-list="fileList" :on-exceed="handleExceed">
						<i class="el-icon-plus"></i>
					</el-upload>
					<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1Mb</div>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'baseinfo',
		data: function() {
			return {
				form: {
					name: '',
					desc: '',
					cost: 0,
					legalProtection: true,
					advanceCompensation: true,
					installment: true,
					lowsetCost: 0,
					travelCard: true,
					tags: [{
						"name": "123"
					}, {
						"name": "123"
					}, {
						"name": "123"
					}],
				},
				dialogFormVisible: false,
				dialogForm: {
					name: ''
				},
				dialogImageUrl: '',
				dialogVisible: false,
				fileList: [{
					name: 'food.jpeg',
					url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
				}, {
					name: 'food2.jpeg',
					url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
				}]
			}
		},
		methods: {
			deleteTag(tag) {
				var index = this.form.tags.indexOf(tag);
				this.form.tags.splice(index, 1);
			},
			addTagDialog() {
				if (this.form.tags.length >= 5) {
					this.$message({
						message: '最多设置5个标签',
						type: 'warning'
					});
				} else {
					this.dialogFormVisible = true;
					this.dialogForm = {};
				}
			},
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
			},
			onSubmit() {
				this.$message.success('提交成功！');
			}
		}
	}
</script>

<style scoped>
	.el-tag {
		padding: 10px 15px;
		margin: 10px;
		vertical-align: middle;
		height: auto;
	}

	.el-tag:first-child {
		margin-left: 0;
	}
</style>
