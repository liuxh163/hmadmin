<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 帖子</el-breadcrumb-item>
				<el-breadcrumb-item>详情</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="userinfo">
				<a class='avatar'><img :src='avatar'></a>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'forumdetail',
		data: function() {
			return {
				avatar: "https://avatars.githubusercontent.com/u/19181780?v=3",

			}
		},
		methods: {

		},
		watch: {

		}
	}
</script>

<style scoped>
	.container {
		margin-left: 50px;
		margin-right: 50px;
        height: 100%;
        overflow-y: scroll;
	}

	.userinfo {
		display: block;
	}

	.avatar {
		float: left;
		display: inline-block;
		width: 70px;
		height: 70px;
		margin-right: 10px;
	}

	img {
        width: 100%;
        height: 100%;
        border: none;
    }
</style>
