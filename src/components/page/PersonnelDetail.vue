<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 翻译人员</el-breadcrumb-item>
				<el-breadcrumb-item>详情</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="form-box">
				<el-form ref="form" :model="form" label-width="80px">
					<el-form-item label="姓名">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="学籍">
						<el-input v-model="form.university"></el-input>
					</el-form-item>
					<el-form-item label="简介">
						<el-input type="textarea" rows="5" v-model="form.desc"></el-input>
					</el-form-item>

					<el-form-item label="头像">
						<el-upload class="avatar-uploader" action="http://admin-demo.zhiyu365.cn/acaeva/file/uploadfile" :data={source:temp}
						 :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
							<img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							<div class="el-upload__tip" slot="tip">图片尺寸建议比例1；4.18，如160*666像素，只能上传jpg文件，且不超过2M</div>
						</el-upload>
					</el-form-item>
                    
                    <el-form-item label="文字翻译">
                    	<el-switch v-model="form.translator"></el-switch>
                    </el-form-item>
                    <el-form-item v-show="form.translator" label="费用" style="width: 300px;">
                    	<el-input placeholder="0" :number="true" v-model="form.translatorCost"><template slot="append">千字</template></el-input>
                    </el-form-item>
                    <el-form-item label="陪同">
                    	<el-switch v-model="form.accompany"></el-switch>
                    </el-form-item>
                    <el-form-item v-show="form.accompany" label="费用" style="width: 300px;">
                    	<el-input placeholder="0" :number="true" v-model="form.accompanyCost"><template slot="append">人/天</template></el-input>
                    </el-form-item>
                    <el-form-item label="专业">
                    	<el-switch v-model="form.specialty"></el-switch>
                    </el-form-item>
                    <el-form-item v-show="form.specialty" label="费用" style="width: 300px;">
                    	<el-input placeholder="0" :number="true" v-model="form.specialtyCost"><template slot="append">千字</template></el-input>
                    </el-form-item>
				</el-form>
			</div>
            
            <el-button style="margin-top: 12px; margin-left: 50px" @click.native.prevent="submit">提交</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'personneldetail',
		data: function() {
			return {
				form: {
					name: '',
					university: "",
					desc: '',
                    imageUrl: '',
					translator: true,
                    translatorCost: 0,
                    accompany: true,
                    accompanyCost: 0,
                    specialty: true,
                    specialty: 0,
				},
			}
		},
		methods: {
			handleAvatarSuccess(res, file) {
				this.form.imageUrl = URL.createObjectURL(file.raw);
				console.log(this.form.imageUrl);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
            submit() {
                
            }
		},
		watch: {

		}
	}
</script>

<style scoped>
	.container {
		margin-left: 50px;
		margin-right: 50px;
	}

	avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}

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
