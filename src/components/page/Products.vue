<template>
	<div class="">
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-lx-copy"></i> 产品</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<el-tabs v-model="country">
				<el-tab-pane :label="`日本`" name="Japan">
					<el-upload action="http://admin-demo.zhiyu365.cn/acaeva/file/uploadfile" :data={source:temp} list-type="picture-card"
					 :on-success="handleSuccess" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-remove="beforeRemove"
					 :before-upload="onBeforeUpload" multiple :limit="9" :file-list="fileList_first" :on-exceed="handleExceed">
						<i class="el-icon-plus"></i>
					</el-upload>
					<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1Mb</div>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>

					<el-table :data="Japan" border class="table" style="width: 100%">
						<el-table-column prop="name" label="名称" sortable width="260"></el-table-column>
						<el-table-column prop="desc" label="描述"></el-table-column>
						<el-table-column prop="original" label="价格" width="100"></el-table-column>
						<el-table-column prop="discounted" label="海马价" width="100"></el-table-column>
						<el-table-column prop="cagegory" label="标签" width="180" align="center">
							<template slot-scope="scope">
								<el-select v-module='category' placeholder="产品分类" class="handle-select mr10">
									<el-option key="hot" label="热" value="hot"></el-option>
									<el-option key="recommend" label="推荐" value="recommend"></el-option>
								</el-select>
							</template>
						</el-table-column>
						<el-table-column label="操作" width="180" align="center">
							<template slot-scope="scope">
								<el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
								<el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-tab-pane>
				<el-tab-pane :label="`韩国`" name="Korea">
					<template v-if="country === 'Korea'">
						<el-table :data="Korea" :show-header="false" style="width: 100%">
							<el-table-column prop="name" label="姓名" width="120"></el-table-column>
							<el-table-column>
								<template slot-scope="scope">
									<span class="message-title">{{scope.row.title}}</span>
								</template>
							</el-table-column>
							<el-table-column prop="date" width="150"></el-table-column>
							<el-table-column width="120">
								<template slot-scope="scope">
									<el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
						<div class="handle-row">
							<el-button type="danger">删除全部</el-button>
						</div>
					</template>
				</el-tab-pane>
				<el-tab-pane :label="`泰国`" name="Thailand">
					<template v-if="country === 'Thailand'">
						<el-table :data="Thailand" :show-header="false" style="width: 100%">
							<el-table-column>
								<template slot-scope="scope">
									<span class="message-title">{{scope.row.title}}</span>
								</template>
							</el-table-column>
							<el-table-column prop="date" width="150"></el-table-column>
							<el-table-column width="120">
								<template slot-scope="scope">
									<el-button @click="handleRestore(scope.$index)">还原</el-button>
								</template>
							</el-table-column>
						</el-table>
						<div class="handle-row">
							<el-button type="danger">清空回收站</el-button>
						</div>
					</template>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'tabs',
		data() {
			return {
				country: 'Japan',
				dialogImageUrl: '',
				dialogVisible: false,
				fileList_first: [{
					name: 'food.jpeg',
					url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
				}, {
					name: 'food2.jpeg',
					url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
				}],
				Japan: [{
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: "hot"
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: "recommend"
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: "hot"
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: ""
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: "hot"
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: ""
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: "hot"
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: "recommend"
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: "hot"
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: "recommend"
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: "hot"
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: ""
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: "hot"
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: ""
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: "hot"
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: "recommend"
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: "hot"
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: "recommend"
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: "hot"
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: ""
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: "hot"
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: ""
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: "hot"
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: "recommend"
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: "hot"
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: "recommend"
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: "hot"
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: ""
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: "hot"
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: ""
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: "hot"
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: "recommend"
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: "hot"
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: "recommend"
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: "hot"
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: ""
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: "hot"
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: ""
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: "hot"
				}, {
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: "recommend"
				}],
				Korea: [{
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: "hot"
				}],
				Thailand: [{
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: "recommend"
				}],
                category: '',
                
			}
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
			},
            handleEdit(index, row) {
                this.$router.push('/product/detail');
//             	this.idx = index;
//             	const item = this.tableData[index];
//             	this.form = {
//             		name: item.name,
//             		date: item.date,
//             		address: item.address
//             	}
//             	this.editVisible = true;
            },
		},
		computed: {

		}
	}
</script>

<style>
	.table {
		width: 100%;
		font-size: 14px;
	}

	.red {
		color: #ff0000;
	}
</style>
