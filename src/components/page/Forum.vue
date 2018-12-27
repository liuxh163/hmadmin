<template>
	<div class="">
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-lx-copy"></i> 论坛服务</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<el-tabs v-model="classifly">
				<el-tab-pane :label="`发现`" name="Find">
					<el-table :data="Find" border class="table" style="width: 100%">
                        <el-table-column prop="date" label="时间" sortable width="120"></el-table-column>
						<el-table-column prop="title" label="标题"></el-table-column>
						<el-table-column prop="read" label="阅读数" sortable width="100" align="center"></el-table-column>
                        <el-table-column prop="comment" label="评论数" sortable width="100" align="center"></el-table-column>
                        <el-table-column prop="like" label="点赞数" sortable width="100" align="center"></el-table-column>
						<el-table-column label="操作" width="180" align="center">
							<template slot-scope="scope">
								<el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
								<el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-tab-pane>
				<el-tab-pane :label="`说说`" name="Talk">
					<template v-if="classifly === 'Talk'">
						<el-table :data="Talk" :show-header="false" style="width: 100%">
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
			</el-tabs>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'tabs',
		data() {
			return {
				classifly: 'Find',
				Find: [{
                    date: '2018-01-10',
					title: '健康大阪6天5夜行 感受不一样的大阪',
					read: 30100,
					comment: 4600,
					like: 1200
				},{
                    date: '2018-01-11',
                    title: '健康大阪6天5夜行 感受不一样的大阪',
                    read: 30000,
                    comment: 4600,
                    like: 1200
				}, {
                    date: '2018-01-10',
					title: '健康大阪6天5夜行 感受不一样的大阪',
					read: 30100,
					comment: 4600,
					like: 1200
				},{
                    date: '2018-01-11',
                    title: '健康大阪6天5夜行 感受不一样的大阪',
                    read: 30000,
                    comment: 4600,
                    like: 1210
				}, {
                    date: '2018-01-10',
					title: '健康大阪6天5夜行 感受不一样的大阪',
					read: 30100,
					comment: 4600,
					like: 1200
				},{
                    date: '2018-01-15',
                    title: '健康大阪6天5夜行 感受不一样的大阪',
                    read: 30000,
                    comment: 4630,
                    like: 1200
				}, {
                    date: '2018-01-10',
					title: '健康大阪6天5夜行 感受不一样的大阪',
					read: 30100,
					comment: 460,
					like: 1200
				},{
                    date: '2018-01-11',
                    title: '健康大阪6天5夜行 感受不一样的大阪',
                    read: 3000,
                    comment: 4600,
                    like: 1200
				}],
				Talk: [{
					name: '健康大阪6天5夜行 感受不一样的大阪',
					desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
					original: '30000',
					discounted: '4600',
					category: "hot"
				}],
			}
		},
		methods: {
            handleEdit(index, row) {
                this.$router.push('/forum/detail');
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
