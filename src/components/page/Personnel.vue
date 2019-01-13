<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> 翻译人员</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="country" @tab-click="clickTab">
                <el-tab-pane :label="`日本`" name="Japan">
                    <router-link :to="{path: '/personnel/detail', query:{id:'', nation:getNationFromCountry()}}">
                        <el-button style='margin-left: 10px; margin-top: 20px; margin-bottom: 20px;' type="primary">添加人员</el-button>
                    </router-link>
                    <el-table :data="JapanPsn" border class="table" style="width: 100%">
                        <el-table-column prop="name" label="名字" sortable></el-table-column>
                        <el-table-column prop="university" label="学籍"></el-table-column>
                        <el-table-column prop="classify" label="分类"></el-table-column>
                        <el-table-column prop="score" label="评级" width="240" align="center" sortable>
                            <template slot-scope="scope">
                                <el-rate v-model="scope.row.score" disabled show-score text-color="#ff9900">
                                </el-rate>
                            </template>
                        </el-table-column>
                        <el-table-column prop="cagegory" label="标签" width="180" align="center">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.category" placeholder="产品分类" class="handle-select mr10">
                                    <el-option v-for="item in cagegories" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="180" align="center">
                            <template slot-scope="scope">
                                <el-button v-if='scope.row.status == "01"' type="text" style='margin-right: 15px;'
                                    class='button3' @click="changeStatus(scope.$index, scope.row.id, scope.row.status)">停用</el-button>
                                <el-button v-else type="text" style='margin-right: 15px;' class='button4' @click="changeStatus(scope.$index, scope.row.id, scope.row.status)">启用</el-button>
                                <router-link :to="{path: '/personnel/detail', query:{id:scope.row.id}}" style='margin-right: 15px;'>
                                    <el-button type="text" icon="el-icon-edit">编辑</el-button>
                                </router-link>
                                <!-- <el-button type="text" icon="el-icon-delete" class="red" @click="deletePsn(scope.$index, scope.row.id)">删除</el-button> -->
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane :label="`韩国`" name="Korea">
                    <template v-if="country === 'Korea'">
                        <router-link :to="{path: '/personnel/detail', query:{id:'', nation:getNationFromCountry()}}">
                            <el-button style='margin-left: 10px; margin-top: 20px; margin-bottom: 20px;' type="primary">添加人员</el-button>
                        </router-link>
                        <el-table :data="KoreaPsn" border class="table" style="width: 100%">
                            <el-table-column prop="name" label="名字" sortable></el-table-column>
                            <el-table-column prop="university" label="学籍"></el-table-column>
                            <el-table-column prop="classify" label="分类"></el-table-column>
                            <el-table-column prop="score" label="评级" width="240" align="center" sortable>
                                <template slot-scope="scope">
                                    <el-rate v-model="scope.row.score" disabled show-score text-color="#ff9900">
                                    </el-rate>
                                </template>
                            </el-table-column>
                            <el-table-column prop="cagegory" label="标签" width="180" align="center">
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.category" placeholder="产品分类" class="handle-select mr10">
                                        <el-option v-for="item in cagegories" :key="item.value" :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="180" align="center">
                                <template slot-scope="scope">
                                    <el-button v-if='scope.row.status == "01"' type="text" style='margin-right: 15px;'
                                        class='button3' @click="changeStatus(scope.$index, scope.row.id, scope.row.status)">停用</el-button>
                                    <el-button v-else type="text" style='margin-right: 15px;' class='button4' @click="changeStatus(scope.$index, scope.row.id, scope.row.status)">启用</el-button>
                                    <router-link :to="{path: '/personnel/detail', query:{id:scope.row.id}}" style='margin-right: 15px;'>
                                        <el-button type="text" icon="el-icon-edit">编辑</el-button>
                                    </router-link>
                                    <!-- <el-button type="text" icon="el-icon-delete" class="red" @click="deletePsn(scope.$index, scope.row.id)">删除</el-button> -->
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-tab-pane>
                <el-tab-pane :label="`泰国`" name="Thailand">
                    <template v-if="country === 'Thailand'">
                        <router-link :to="{path: '/personnel/detail', query:{id:'', nation:getNationFromCountry()}}">
                            <el-button style='margin-left: 10px; margin-top: 20px; margin-bottom: 20px;' type="primary">添加人员</el-button>
                        </router-link>
                        <el-table :data="ThailandPsn" border class="table" style="width: 100%">
                            <el-table-column prop="name" label="名字" sortable></el-table-column>
                            <el-table-column prop="university" label="学籍"></el-table-column>
                            <el-table-column prop="classify" label="分类"></el-table-column>
                            <el-table-column prop="score" label="评级" width="240" align="center" sortable>
                                <template slot-scope="scope">
                                    <el-rate v-model="scope.row.score" disabled show-score text-color="#ff9900">
                                    </el-rate>
                                </template>
                            </el-table-column>
                            <el-table-column prop="cagegory" label="标签" width="180" align="center">
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.category" placeholder="产品分类" class="handle-select mr10">
                                        <el-option v-for="item in cagegories" :key="item.value" :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="180" align="center">
                                <template slot-scope="scope">
                                    <el-button v-if='scope.row.status == "01"' type="text" style='margin-right: 15px;'
                                        class='button3' @click="changeStatus(scope.$index, scope.row.id, scope.row.status)">停用</el-button>
                                    <el-button v-else type="text" style='margin-right: 15px;' class='button4' @click="changeStatus(scope.$index, scope.row.id, scope.row.status)">启用</el-button>
                                    <router-link :to="{path: '/personnel/detail', query:{id:scope.row.id}}" style='margin-right: 15px;'>
                                        <el-button type="text" icon="el-icon-edit">编辑</el-button>
                                    </router-link>
                                    <!-- <el-button type="text" icon="el-icon-delete" class="red" @click="deletePsn(scope.$index, scope.row.id)">删除</el-button> -->
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
        name: 'personnel',
        data() {
            return {
                country: 'Japan',
                Japan: "Japan",
                Korea: "Korea",
                Thailand: "Thailand",
                japanStatus: 0,
                koreaStatus: 0,
                thailandStatus: 0,
                JapanPsn: [],
                KoreaPsn: [],
                ThailandPsn: [],
                cagegories: [{
                    value: '03',
                    label: '无'
                }, {
                    value: '02',
                    label: '最热'
                }, {
                    value: '01',
                    label: '推荐'
                }],
            }
        },
        methods: {
            clickTab() {
                if (this.country == this.Japan) {
                    if (this.japanStatus < 1) {
                        this.getPersons();
                    }
                } else if (this.country == this.Korea) {
                    if (this.koreaStatus < 1) {
                        this.getPersons();
                    }
                } else if (this.country == this.Thailand) {
                    if (this.thailandStatus < 1) {
                        this.getPersons();
                    }
                }
            },
            getNationFromCountry() {
                if (this.country == this.Japan) {
                    return "01";
                } else if (this.country == this.Korea) {
                    return "02";
                } else if (this.country == this.Thailand) {
                    return "03";
                }
            },
            getTypeDes(type) {
                var des = "";
                if (type.indexOf("01") != -1) {
                    des = "文字翻译 ";
                }
                if (type.indexOf("02") != -1) {
                    des += "陪同翻译 ";
                }
                if (type.indexOf("03") != -1) {
                    des += "地面接待 ";
                }
                return des;
            },
            getPersons() {
                console.log("getPersons: " + this.country);
                let t = this;
                this.fetch({
                    url: interfaces.personnel,
                    method: 'GET',
                    params: {
                        nation: this.getNationFromCountry(),
                    }
                }).then((res) => {
                    if (res.data && res.success == true) {
                        if (t.country == t.Japan) {
                            t.JapanPsn = res.data.servants;
                            t.japanStatus = t.japanStatus + 1;
                            for (var i = 0; i < t.JapanPsn.length; ++i) {
                                t.JapanPsn[i].classify = t.getTypeDes(t.JapanPsn[i].type);
                            }
                        } else if (t.country == t.Korea) {
                            t.KoreaPsn = res.data.servants;
                            t.koreaStatus = t.koreaStatus + 1;
                            for (var i = 0; i < t.KoreaPsn.length; ++i) {
                                t.KoreaPsn[i].classify = t.getTypeDes(t.KoreaPsn[i].type);
                            }
                        } else {
                            t.ThailandPsn = res.data.servants;
                            t.thailandStatus = t.thailandStatus + 1;
                            for (var i = 0; i < t.ThailandPsn.length; ++i) {
                                t.ThailandPsn[i].classify = t.getTypeDes(t.ThailandPsn[i].type);
                            }
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
            changeStatus(index, id, status) {
                var url;
                if (status == "01") {
                    url = interfaces.personnel + "/" + id + "/halt";
                } else {
                    url = interfaces.personnel + "/" + id + "/awaken";
                }
                let t = this
                this.fetch({
                    url: url,
                    method: "PUT",
                }).then((res) => {
                    if (res.data && res.success == true) {
                        //更新服务人员状态
                        if (t.country == t.Japan) {
                            if (status == "01") {
                                t.JapanPsn[index].status = "02";
                            } else {
                                t.JapanPsn[index].status = "01";
                            }
                        } else if (t.country == t.Korea) {
                            if (status == "01") {
                                t.KoreaPsn[index].status = "02";
                            } else {
                                t.KoreaPsn[index].status = "01";
                            }
                        } else if (t.country == t.Thailand) {
                            if (status == "01") {
                                t.ThailandPsn[index].status = "02";
                            } else {
                                t.ThailandPsn[index].status = "01";
                            }
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
            deletePsn(index, id) {
                let t = this
                this.fetch({
                    url: interfaces.personnel + "/" + id,
                    method: 'DELETE',
                }).then((res) => {
                    if (res.data && res.success == true) {
                        if (t.country == t.Japan) {
                            t.JapanPsn.splice(index, 1);
                        } else if (t.country == t.Korea) {
                            t.KoreaPsn.splice(index, 1);
                        } else if (t.country == t.Thailand) {
                            t.ThailandPsn.splice(index, 1);
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
            this.getPersons();
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
