<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> 论坛服务</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <router-link :to="{path: '/forum/create', query:{id:''}}">
                <el-button style='margin-left: 10px; margin-top: 20px; margin-bottom: 20px;' type="primary">发布帖子</el-button>
            </router-link>
            
            <el-tabs v-model="classifly" @tab-click="clickTab">
                <el-tab-pane :label="`发现`" name="Find">
                    <el-table :data="findForums" border class="table" style="width: 100%">
                        <el-table-column prop="createdAt" label="创建时间" sortable width="220"></el-table-column>
                        <el-table-column prop="title" label="标题"></el-table-column>
                        <el-table-column prop="viewNum" label="阅读数" sortable width="100" align="center"></el-table-column>
                        <el-table-column prop="commentNum" label="评论数" sortable width="100" align="center"></el-table-column>
                        <el-table-column prop="thumbNum" label="点赞数" sortable width="100" align="center"></el-table-column>
                        <el-table-column label="操作" width="180" align="center">
                            <template slot-scope="scope">
                                <router-link :to="{path: '/forum/detail', query:{id:scope.row.id}}" style='margin-right: 15px;'>
                                    <el-button type="text" icon="el-icon-edit">编辑</el-button>
                                </router-link>
                                <el-button type="text" icon="el-icon-delete" class="red" @click="deleteForum(scope.$index, scope.row.id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane :label="`说说`" name="Talk">
                    <template v-if="classifly === 'Talk'">
                        <el-table :data="talkForums" border class="table" style="width: 100%">
                            <el-table-column prop="createdAt" label="创建时间" sortable width="220"></el-table-column>
                            <el-table-column prop="title" label="标题"></el-table-column>
                            <el-table-column prop="viewNum" label="阅读数" sortable width="100" align="center"></el-table-column>
                            <el-table-column prop="commentNum" label="评论数" sortable width="100" align="center"></el-table-column>
                            <el-table-column prop="thumbNum" label="点赞数" sortable width="100" align="center"></el-table-column>
                            <el-table-column label="操作" width="180" align="center">
                                <template slot-scope="scope">
                                    <router-link :to="{path: '/forum/detail', query:{id:scope.row.id}}" style='margin-right: 15px;'>
                                        <el-button type="text" icon="el-icon-edit">编辑</el-button>
                                    </router-link>
                                    <el-button type="text" icon="el-icon-delete" class="red" @click="deleteForum(scope.$index, scope.row.id)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import {
        interfaces
    } from '../../service/interfaces'

    export default {
        name: 'forms',
        data() {
            return {
                classifly: 'Find',
                findForums: [],
                talkForums: [],
                findStatus: 0,
                talkStatus: 0,
                Find: "Find",
                Talk: "Talk",
            }
        },
        methods: {
            clickTab() {
                if (this.classifly == this.Find) {
                    if (this.findStatus < 1) {
                        this.getForums();
                    }
                } else if (this.classifly == this.Talk) {
                    if (this.talkStatus < 1) {
                        this.getForums();
                    }
                }
            },
            date(createTime) {
                return Date(createTime);
            },
            getForums() {
                console.log("getForums: " + this.classifly);
                var url;
                if (this.classifly == "Find") {
                    url = interfaces.forums + "/1/posts";
                } else {
                    url = interfaces.forums + "/2/posts";
                }
                let t = this;
                this.fetch({
                    url: url,
                    method: 'GET',
                    params: {
                        sort: "1",
                    }
                }).then((res) => {
                    if (res.data && res.success == true) {
                        if (t.classifly == t.Find) {
                            t.findForums = res.data.posts;
                            t.findStatus = t.findStatus + 1;
                        } else if (t.classifly == t.Talk) {
                            t.talkForums = res.data.posts;
                            t.talkStatus = t.talkStatus + 1;
                        }
                    } else {
                        let msg = "服务器繁忙，请稍后再试";
                        if (res.message) {
                            console.log("exception：" + res.message);
                            msg = res.message;
                        }
                        this.$message({
                            showClose: true,
                            message: msg,
                            type: 'error'
                        });
                    }
                }).catch((res) => {
                    console.log('error：' + res)
                    this.$message({
                        showClose: true,
                        message: '服务器繁忙，请稍后再试',
                        type: 'error'
                    });
                });
            },
            deleteForum(index, id) {
                let t = this
                this.fetch({
                    url: interfaces.forums + "/" + id,
                    method: 'DELETE',
                }).then((res) => {
                    if (res.data && res.success == true) {
                        if (t.classifly == t.Find) {
                            t.findForums.splice(index, 1);
                        } else if (t.classifly == t.Talk) {
                            t.findForums.splice(index, 1);
                        }
                    } else {
                        let msg = "服务器繁忙，请稍后再试";
                        if (res.message) {
                            console.log("exception：" + res.message);
                            msg = res.message;
                        }
                        this.$message({
                            showClose: true,
                            message: msg,
                            type: 'error'
                        });
                    }
                }).catch((res) => {
                    console.log('error：' + res)
                    this.$message({
                        showClose: true,
                        message: '服务器繁忙，请稍后再试',
                        type: 'error'
                    });
                });
            },
        },
        mounted() {
            this.getForums();
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
