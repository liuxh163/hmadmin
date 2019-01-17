<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> 注册人员</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table :data="users" border class="table" style="width: 100%">
                <el-table-column prop="userName" label="名字" sortable width="120"></el-table-column>
                <el-table-column prop="telephone" label="电话" width="120"></el-table-column>
                <el-table-column :prop="gender(gender)" label="性别" width="100" align="center"></el-table-column>
                <el-table-column prop="hmCoins" label="海马金" sortable align="center" width='100'></el-table-column>
                <el-table-column prop="address" label="地址" sortable align="center"></el-table-column>

                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button v-if='scope.row.status == "01"' type="text" style='margin-right: 15px;' class='button3'
                            @click="changeStatus(scope.$index, scope.row.id, scope.row.status)">停用</el-button>
                        <el-button v-else type="text" style='margin-right: 15px;' class='button4' @click="changeStatus(scope.$index, scope.row.id, scope.row.status)">启用</el-button>
                        <!-- <router-link :to="{path: '/users/detail', query:{id:scope.row.id}}" style='margin-right: 15px;'>
                            <el-button type="text" icon="el-icon-edit">查看</el-button>
                        </router-link> -->
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import {
        interfaces
    } from '../../service/interfaces'

    export default {
        name: 'users',
        data() {
            return {
                users: [],
            }
        },
        methods: {
            gender(value) {
                if (value == "01") {
                    return "男";
                } else {
                    return "女";
                }
            },
            getUsers() {
                console.log("用户列表获取:");
                let t = this;
                this.fetch({
                    url: interfaces.users,
                    method: 'GET',
                }).then((res) => {
                    if (res.data && res.success == true) {
                        t.users = res.data.users;
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
            changeStatus(index, id, status) {
                var url;
                if (status == "01") {
                    url = interfaces.users + "/" + id + "/halt";
                } else {
                    url = interfaces.users + "/" + id + "/awaken";
                }
                let t = this
                this.fetch({
                    url: url,
                    method: "PUT",
                }).then((res) => {
                    if (res.data && res.success == true) {
                        //更新人员状态
                        if (status == "01") {
                            t.users[index].status = "02";
                        } else {
                            t.users[index].status = "01";
                        }
                    } else {
                        let msg = "服务器繁忙，请稍后再试";
                        if (res.message) {
                            console.log("exception：" + res.errcode + "..." + res.message);
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
            this.getUsers();
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

    .button3 {
        color: red;
        padding: 0;
    }

    .button4 {
        color: green;
        padding: 0;
    }
</style>
