<template>
	<div class="">
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-lx-copy"></i> 翻译人员</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<el-tabs v-model="country">
				<el-tab-pane :label="`日本`" name="Japan">
					<el-table :data="Japan" border class="table" style="width: 100%">
						<el-table-column prop="name" label="名字" sortable></el-table-column>
						<el-table-column prop="university" label="学籍"></el-table-column>
						<el-table-column prop="classify" label="分类"></el-table-column>
						<el-table-column prop="score" label="评级" width="240" align="center" sortable>
							<template slot-scope="scope">
								<el-rate v-model="score" disabled show-score text-color="#ff9900" score-template="{value}">
								</el-rate>
							</template>
						</el-table-column>
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
				Japan: [{
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
					category: "hot"
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
					category: "recommend"
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
					category: "hot"
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
					category: ""
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
					category: "hot"
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
					category: ""
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
					category: "hot"
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 2,
					category: "recommend"
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
					category: "hot"
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
					category: "recommend"
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
					category: "hot"
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
					category: ""
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
					category: "hot"
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
					category: ""
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
					category: "hot"
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
					category: "recommend"
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
					category: "hot"
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
					category: "recommend"
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
					category: "hot"
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
					category: ""
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
					category: "hot"
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
					category: ""
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
					category: "hot"
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
					category: "recommend"
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
					category: "hot"
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
					category: "recommend"
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
					category: "hot"
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
					category: ""
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
					category: "hot"
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
					category: ""
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
					category: "hot"
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
					category: "recommend"
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
					category: "hot"
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
					category: "recommend"
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
					category: "hot"
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
					category: ""
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
					category: "hot"
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
					category: ""
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
					category: "hot"
				}, {
					name: '健康大阪',
					university: '东京大学',
					classify: "专业、陪同、文翻",
					score: 4.5,
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
			handleEdit(index, row) {
				this.$router.push('/personnel/detail');
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
