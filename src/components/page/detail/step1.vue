<template>
    <div>
        <div>
            <el-form ref="form" :model="prdinfo" label-width="100px" width='100%'>
                <el-form-item label="名称" style='width: 600px'>
                    <el-input type="textarea" rows="5" v-model="prdinfo.desc"></el-input>
                </el-form-item>

                <el-form-item label="成人费用" style="width: 300px;">
                    <el-input placeholder="0" :number="true" v-model="prdinfo.adultPrice"><template slot="append">/ 人</template></el-input>
                </el-form-item>
                <el-form-item label="妇女费用" style="width: 300px;">
                    <el-input placeholder="0" :number="true" v-model="prdinfo.womenPrice"><template slot="append">/ 人</template></el-input>
                </el-form-item>
                <el-form-item label="公司费用" style="width: 300px;">
                    <el-input placeholder="0" :number="true" v-model="prdinfo.companyPrice"><template slot="append">/ 人</template></el-input>
                </el-form-item>
                <el-form-item label="小孩费用" style="width: 300px;">
                    <el-input placeholder="0" :number="true" v-model="prdinfo.childPrice"><template slot="append">/ 人</template></el-input>
                </el-form-item>

                <el-form-item label="活动标签">
                    <el-tag :key='tag.id' v-for="tag in tags" closable @close="deleteTag(tag.name)">
                        {{tag.name}}
                    </el-tag>
                    <el-button icon="el-icon-plus" size="large" @click.native="showTagDialog()" style="vertical-align: middle;margin: 10px;"></el-button>
                </el-form-item>

                <el-form-item label="法律保障">
                    <el-switch v-model="prdinfo.legalProtection"></el-switch>
                </el-form-item>
                <el-form-item label="先行赔付">
                    <el-switch v-model="prdinfo.advanceCompensation"></el-switch>
                </el-form-item>
                <el-form-item label="支持分期">
                    <el-switch v-model="prdinfo.installment"></el-switch>
                </el-form-item>
                <el-form-item v-show="prdinfo.installment" label="分期最低支付" style="width: 300px;">
                    <el-input placeholder="0" :number="true" v-model="prdinfo.lowsetCost"><template slot="append">/ 人</template></el-input>
                </el-form-item>
                <el-form-item label="出行卡">
                    <el-switch v-model="prdinfo.travelCard"></el-switch>
                </el-form-item>

                <el-form-item label="宣传图">
                    <el-button style='margin-left: 10px; margin-top: 10px;;' type="primary" @click="newImage">添加</el-button>
                    <div style="margin-bottom: 10px; margin-left: 10px;margin-top: 10px;" class="el-upload__tip">图片尺寸建议比例1:0.52，如950*500像素，只能上传jpg文件，且不超过2M</div>

                    <ImageList style='margin-left: -50px;' :data="images" :showDialog='showDialog' :editForm='form'
                        @edit="editImage" @change="changeStatusImage" @delete="deleteImage"></ImageList>
                </el-form-item>
            </el-form>
            <!-- 弹框 -->
            <el-dialog title="添加标签" :visible.sync="dialogTag" top="15%" width='25%'>
                <el-form :model="tagForm">
                    <el-form-item>
                        <el-input v-model="tagForm.name" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click.native="dialogTag = !dialogTag">取 消</el-button>
                    <el-button type="primary" @click.native="addTag(tagForm.name)">添加</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'
    import ImageList from '@/components/common/ImageList'
    import {
        interfaces
    } from '../../../service/interfaces'

    export default {
        name: 'product-baseinfo',
        computed: {
            ...mapState([
                'prdinfo'
            ]),
        },
        components: {
            ImageList
        },
        data: function() {
            return {
                id: "",
                tags: [],
                images: [],
                //图片处理
                showDialog: false,
                form: {
                    id: "",
                    url: '',
                    content: '',
                },
                //标签处理
                dialogTag: false,
                tagForm: {
                    name: ""
                },
            }
        },
        mounted() {
            if (this.id == "" || this.id == undefined) {
                return;
            }
            this.getTags();
            this.getImages();
        },
        methods: {
            ...mapMutations([
                'setPrdInfo', "setPrdTags"
            ]),
            getTags() {
                console.log("获取产品标签: " + this.id);
                let t = this;
                this.fetch({
                    url: interfaces.tags + "?target=01&targetId=" + this.id,
                    method: 'GET',
                }).then((res) => {
                    if (res.data && res.success == true) {
                        console.log("tags: " + JSON.stringify(res.data.tags));
                        this.tags = res.data.tags;
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
            showTagDialog() {
                if (this.tags != undefined && this.tags.length >= 10) {
                    this.$message({
                        message: '最多设置5个标签',
                        type: 'warning'
                    });
                    return;
                } else {
                    this.dialogTag = !this.dialogTag;
                    this.tagForm.name = '';
                }
            },
            addTag(tag) {
                console.log(tag);
                if (this.tags == undefined) {
                    this.tags = [];
                }

                if (tag && tag.trim().length !== 0) {
                    var isExist = false;
                    tag = tag.trim();
                    for (var i = 0; i < this.tags.length; i++) {
                        if (this.tags[i] == tag) {
                            isExist = true;
                            break
                        }
                    }
                    if (isExist) {
                        this.$message({
                            message: '该标签已存在',
                            type: 'warning'
                        });
                    } else {
                        let t = this
                        this.fetch({
                            url: interfaces.tags + "?target=01&targetId=" + this.id,
                            method: 'POST',
                            data: {
                                name: tag
                            }
                        }).then((res) => {
                            if (res.data && res.success == true) {
                                t.dialogFormVisible = false;
                                t.dialogFormFenLeiVisible = false;
                                t.tags.push({
                                    name: tag
                                });
                                t.dialogTag = !t.dialogTag;
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
                    }
                } else {
                    this.$message({
                        message: '标签不能为空',
                        type: 'warning'
                    });
                }
            },
            deleteTag(value) {
                var index = tags.indexOf(value);
                this.tags.splice(index, 1);
            },
            getImages() {
                let t = this
                this.fetch({
                    url: interfaces.carousels + "?location=05",
                    method: 'GET',
                    data : {
                        status: "01,02",
                        productId: this.id
                    }
                }).then((res) => {
                    if (res.status == '200' && res.success == true) {
                        t.images = [];
                        for (var i = 0; i < res.data.carousels.length; ++i) {
                             t.images.push({
                                 id: res.data.carousels[i].id,
                                 url: res.data.carousels[i].picFileId,
                                 status: res.data.carousels[i].status,
                                 content: res.data.carousels[i].name
                             });
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
            newImage() {
                this.form.id = '';
                this.form.url = '';
                this.form.content = '';

                this.showDialog = !this.showDialog
            },
            editImage() {
                var url, method, status;
                if (this.form.id == '') {
                    method = "POST";
                    status = "02";
                    url = interfaces.carousels;
                } else {
                    url = interfaces.carousels + "/" + this.form.id;
                    method = "PUT";
                    for (let i = 0; i < this.images.length; i++) {
                        if (this.images[i].id === this.form.id) {
                            status = this.images[i].status;
                        }
                    }
                }

                var body = {
                    name: this.form.content,
                    desc: this.form.content,
                    location: "05",
                    productId: this.id,
                    picFileId: this.form.url,
                    status: status,
                    target: "",
                    targetId: 0
                }
                console.log("body:" + JSON.stringify(body));
                let t = this;
                this.fetch({
                    url: url,
                    method: method,
                    data: body
                }).then((res) => {
                    if (res.data && res.success == true) {
                        if (t.form.id == '') {
                            //新建轮播图，添加到最后
                            t.images.unshift({
                                id: res.data.id,
                                url: t.form.url,
                                content: t.form.content
                            });
                        } else {
                            //更新轮播图
                            for (let i = 0; i < t.images.length; i++) {
                                if (t.images[i].id === res.data.id) {
                                    t.images[i].url = t.form.url;
                                    t.images[i].content = t.form.content;
                                }
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
            deleteImage(image) {
                let t = this
                this.fetch({
                    url: interfaces.carousels + "/" + image.id,
                    method: 'DELETE',
                }).then((res) => {
                    if (res.data && res.success == true) {
                        for (let i = 0; i < this.images.length; i++) {
                            if (this.images[i].id === image.id) {
                                this.images.splice(i, 1);
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
            changeStatusImage(image) {
                var url;
                if (image.status == "01") {
                    url = interfaces.carousels + "/" + image.id + "/halt";
                } else {
                    url = interfaces.carousels + "/" + image.id + "/awaken";
                }
                let t = this
                this.fetch({
                    url: url,
                    method: "PUT",
                }).then((res) => {
                    if (res.data && res.success == true) {
                        //更新轮播图
                        for (let i = 0; i < t.images.length; i++) {
                            if (t.images[i].id === res.data.id) {
                                if (image.status == "01") {
                                    t.images[i].status = "02";
                                } else {
                                    t.images[i].status = "01";
                                }
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
            }
        },
        created() {
            this.id = this.$route.query.id;
        },
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
