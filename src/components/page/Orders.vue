<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> 订单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table :data="orderList" border class="table" style="width: 100%">
                <el-table-column prop="number" label="订单号" width="200" align="center" sortable></el-table-column>
                <el-table-column prop="desc" label="产品名称" sortable align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.desc }}</span>
                        <el-button type="text" style='margin-left: 15px;' class='button3' @click="showProductDialog(scope.$index, scope.row.number)">调整</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="realPrice" label="价格" width="100" align="center" sortable></el-table-column>
                <el-table-column prop="prepayPrice" label="预付款" width="100" align="center" sortable></el-table-column>
                <el-table-column prop="peoples" label="陪同人员" width="120" align="center" sortable>
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ persons(scope.row.peoples) }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="earliestAt" label="开始时间" width="170" align="center" sortable></el-table-column>
                <el-table-column prop="latestAt" label="结束时间" width="170" align="center" sortable> </el-table-column>
                <el-table-column prop="status" label="订单状态" width="80" align="center" sortable>
                    <template slot-scope="scope">
                        <el-button v-if='scope.row.status == "02"' type="text" style='margin-right: 15px;' class='button3'
                            @click="showTimeDialog(scope.$index, scope.row.number)">待确认</el-button>
                        <el-button v-else-if='scope.row.status == "03"' type="text" style='margin-right: 15px;' class='button4'>已确认</el-button>
                        <el-button v-else-if='scope.row.status == "04"' type="text" style='margin-right: 15px;' class='button4'>已付款</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog title="调整产品" :visible.sync="prdDialog">
            <div>选择产品</div>
            <el-form :model="prdForm">
                <template slot-scope="scope">
                    <el-select v-model="prdForm.prdID" placeholder="选择产品" @change='changePrd($event, prdForm.prdID)'>
                        <el-option v-for="item in productList" :key="item.id" :label="item.desc" :value="item.id">
                        </el-option>
                    </el-select>
                </template>
            </el-form>
            </br>
            <div>选择附加项</div>
            <el-table :data="peoples" border class="table" style="width: 100%">
                <el-table-column prop="name" label="名字" width="200" sortable align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.firstName + scope.row.lastName }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="attendants" label="附加项目">
                    <template slot-scope="scope">
                        <el-tag :key="tag.targetId" v-for="tag in scope.row.attendants" closable :disable-transitions="false"
                            @close="handleCloseTag(scope.$index, tag.targetId)">
                            {{tag.name}}
                        </el-tag>
                        <el-select v-model="prdForm.attendantID" placeholder="选择检查" @change='changeAttendant($event, scope.$index)'>
                            <el-option v-for="aitem in attendantLists" :key="aitem.id" :label="aitem.name" :value="aitem.id">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editCancel">取 消</el-button>
                <el-button type="primary" @click="editOK">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="确认时间" :visible.sync="timeDialog">
            <el-date-picker v-model="timeConfirm" type="datetime" placeholder="选择出行日期时间" default-time="12:00:00"
                @change="changeStatus">
            </el-date-picker>
        </el-dialog>
    </div>
</template>

<script>
    import {
        interfaces
    } from '../../service/interfaces'

    export default {
        name: 'orders',
        inject: ['reload'],
        data() {
            return {
                orderList: [],
                peoples: [{
                    attendants: []
                }],
                productList: [],
                attendantLists: [],

                prdDialog: false,
                prdForm: {
                    order: null, //当前订单数据
                    prdID: "", //替换后的产品
                    attendantID: "", //替换后的附加项ID
                },

                timeDialog: false,
                timeConfirm: null,
                timeForm: {
                    orderIndex: "",
                    orderNumber: ""
                },
            }
        },
        methods: {
            //获取订单列表
            getOrderList() {
                let t = this;
                this.fetch({
                    url: interfaces.orders,
                    method: 'GET',
                }).then((res) => {
                    if (res.data && res.success == true) {
                        t.orderList = res.data;
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
            //获取订单所在国家的所有产品
            getProducts(index) {
                let t = this;
                this.fetch({
                    url: interfaces.nationProducts,
                    method: 'GET',
                    params: {
                        id: t.prdForm.order.goods[0].targetId,
                    }
                }).then((res) => {
                    if (res.data && res.success == true) {
                        t.productList = res.data.products;
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
            persons: function(peoples) {
                var person = '';
                for (var i = 0; i < peoples.length; ++i) {
                    if (i != 0) {
                        person += "; "
                    }
                    person += peoples[i].firstName + peoples[i].lastName;
                }
                return person;
            },

            //弹出修改产品框
            showProductDialog(index, number) {
                this.productList = [];
                this.prdDialog = !this.prdDialog;
                this.prdForm.order = this.orderList[index];
                this.peoples = this.orderList[index].peoples;
                this.prdForm.prdID = this.orderList[index].goods[0].targetId;
                console.error("order: " + JSON.stringify(this.prdForm.order));
                console.error("peoples: " + JSON.stringify(this.peoples));
                this.getProducts(index);
            },
            //获取所有附加项数据
            changePrd(index, prdID) {
                console.error(index + "..." + prdID + "...");
                for(var i = 0; i < this.peoples.length; ++i) {
                    this.peoples[i].attendants = [];
                }
                
                for (var i = 0; i < this.productList.length; ++i) {
                    if (this.productList[i].id == prdID) {
                        this.attendantLists = this.productList[i].attendants;
                        this.prdForm.prdID = prdID;

                        console.error("prdID: " + JSON.stringify(this.prdForm.prdID));
                        console.error("attendantLists: " + JSON.stringify(this.attendantLists));
                    }
                }
            },
            //更改附加项数据
            changeAttendant(id, index) {
                console.error("选中附加项：" + id + "..." + index);

                var has = false;
                for (var i = 0; i < this.peoples[index].attendants.length; ++i) {
                    if (this.peoples[index].attendants[i].targetId == id) {
                        has = true;
                    }
                }
                if (has == false) {
                    for (var i = 0; i < this.attendantLists.length; ++i) {
                        if (this.attendantLists[i].id == id) {
                            this.peoples[index].attendants.push({
                                targetId: id + "",
                                name: this.attendantLists[i].name,
                            });
                        }
                    }
                }
                console.error("peoples: " + JSON.stringify(this.peoples));
            },
            //删除附加项
            handleCloseTag(index, id) {
                console.error(index + "..." + id);
                for (var i = 0; i < this.peoples[index].attendants.length; ++i) {
                    if (this.peoples[index].attendants[i].targetId = id) {
                        this.peoples[index].attendants.splice(i, 1);
                    }
                }

                console.error("peoples: " + JSON.stringify(this.peoples));
            },
            editCancel() {
                this.prdDialog = !this.prdDialog;

                this.prdForm.orderIndex = "";
                this.prdForm.prdID = "";
            },
            editOK() {
                this.prdDialog = !this.prdDialog;
                this.changeProdcut();
            },
            changeProdcut() {
                var body = {
                    number: this.prdForm.order.number,
                    targetId: this.prdForm.prdID,
                    peoples: this.peoples,
                };

                let t = this
                this.fetch({
                    url: interfaces.modifyOrder,
                    method: "POST",
                    data: body
                }).then((res) => {
                    if (res.data && res.success == true) {
                        t.reload();
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

                    this.prdForm.order = null;
                    this.prdForm.prdID = "";
                }).catch((res) => {
                    console.log('error：' + res)
                    this.$message({
                        showClose: true,
                        message: '服务器繁忙，请稍后再试',
                        type: 'error'
                    });

                    this.prdForm.order = null;
                    this.prdForm.prdID = "";
                });
            },

            //确认出行时间
            changeStatus() {
                this.timeDialog = !this.timeDialog;

                var body = {
                    number: this.timeForm.orderNumber,
                    confirmAt: this.timeConfirm,
                }

                let t = this
                this.fetch({
                    url: interfaces.confirmOrder,
                    method: "POST",
                    data: body
                }).then((res) => {
                    if (res.data && res.success == true) {
                        t.orderList[t.timeForm.orderIndex].status = "03";
                        // t.reload();
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

            showTimeDialog(index, number) {
                this.timeDialog = !this.timeDialog;
                this.timeConfirm = null;
                this.timeForm.orderIndex = index;
                this.timeForm.orderNumber = number;
            },


        },
        mounted() {
            this.getOrderList();
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

    .el-select .el-input__inner {
        width: 600px;
    }
</style>
