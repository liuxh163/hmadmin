<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 翻译人员</el-breadcrumb-item>
                <el-breadcrumb-item>详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="姓名" style='width: 400px'>
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="学籍" style='width: 400px'>
                        <el-input v-model="form.university"></el-input>
                    </el-form-item> -->
                    <el-form-item label="简介" style='width: 85%;'>
                        <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
                    </el-form-item>

                    <el-form-item label="头像">
                        <el-upload class="avatar-uploader" :action="uploadUrl" :headers="headers" :show-file-list="false"
                            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" name="filex">
                            <img v-if="form.picFileId" :src="form.picFileId" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            <div class="el-upload__tip" slot="tip">图片尺寸建议比例1；4.18，如160*666像素，且不超过2M</div>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="个人标签">
                        <el-tag :key='tag.id' v-for="tag in tags" closable @close="deleteTag(tag.name)">
                            {{tag.name}}
                        </el-tag>
                        <el-button icon="el-icon-plus" size="large" @click.native="showTagDialog()" style="vertical-align: middle;margin: 10px;"></el-button>
                    </el-form-item>
                    
                    <el-form-item label="评分" style='width: 400px'>
                        <el-input type='number' step="0.1" min="0" max="5" v-model="form.score"></el-input>
                    </el-form-item>

                    <el-form-item label="文字翻译">
                        <el-switch v-model="form.liter"></el-switch>
                    </el-form-item>
                    <el-form-item v-show="form.liter" label="费用" style="width: 300px;">
                        <el-input placeholder="0" :number="true" v-model="form.literPrice"><template slot="append">千字</template></el-input>
                    </el-form-item>
                    <el-form-item label="陪同翻译">
                        <el-switch v-model="form.follow"></el-switch>
                    </el-form-item>
                    <el-form-item v-show="form.follow" label="费用" style="width: 300px;">
                        <el-input placeholder="0" :number="true" v-model="form.followPrice"><template slot="append">人/天</template></el-input>
                    </el-form-item>
                    <el-form-item label="地面接待">
                        <el-switch v-model="form.recep"></el-switch>
                    </el-form-item>
                    <el-form-item v-show="form.recep" label="费用" style="width: 300px;">
                        <el-input placeholder="0" :number="true" v-model="form.recepPrice"><template slot="append">人/天</template></el-input>
                    </el-form-item>
                    <el-form-item label="服务介绍" style='width: 85%;'>
                        <vue-editor useCustomImageHandler @imageAdded="imageAdd" v-model="form.intro" placeholder="服务介绍" />
                    </el-form-item>
                    <el-form-item label="车型" style='width: 85%;'>
                        <vue-editor useCustomImageHandler @imageAdded="imageAdd" v-model="form.car" placeholder="车型" />
                    </el-form-item>
                    <el-form-item label="费用说明" style='width: 85%;'>
                        <vue-editor useCustomImageHandler @imageAdded="imageAdd" v-model="form.feedesc" placeholder="费用说明" />
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

            <el-button style="margin-top: 12px; margin-left: 50px" @click.native.prevent="submit">提交</el-button>
        </div>
    </div>
</template>

<script>
    import {
        interfaces
    } from '../../service/interfaces'
    import {
        VueEditor
    } from 'vue2-editor'

    export default {
        name: 'personneldetail',
        data: function() {
            return {
                uploadUrl: interfaces.uplaod,
                form: {
                    id: "",
                    name: '',
                    university: "",
                    desc: '',
                    picFileId: '',
                    nation: "",
                    liter: true,
                    literPrice: 0,
                    follow: true,
                    followPrice: 0,
                    recep: true,
                    recepPrice: 0,
                    score: 0,
                    type: "",
                    service: "02", //未知数据
                    intro: "",
                    car: "",
                    feedesc: "",
                    status: "",
                },
                headers: {
                    hmtoken: localStorage.getItem('hmtoken'),
                },
                //标签处理
                tags: [],
                dialogTag: false,
                tagForm: {
                    name: ""
                },
            }
        },
        components: {
            VueEditor
        },
        methods: {
            handleAvatarSuccess(res, file) {
                if (res.data && res.success == true) {
                    this.form.picFileId = res.data.files[0].path;
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
                console.log("file: " + JSON.stringify(res));

                console.log(this.form.picFileId);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                console.log(file.type + "..." + file.size);
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                    return false;
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                    return false;
                }
                return isJPG && isLt2M;
            },
            imageAdd(file, Editor, cursorLocation, resetUploader) {
                var formData = new FormData();
                formData.append('filex', file)

                console.log("图片上传: " + file.name);
                let t = this;
                this.fetch({
                    url: interfaces.uplaod,
                    method: "POST",
                    data: formData
                }).then((res) => {
                    if (res.data && res.success == true) {
                        let url = res.data.files[0].path;
                        Editor.insertEmbed(cursorLocation, 'image', url);
                        resetUploader();
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
            getDetail() {
                console.log("getDetail: " + this.form.id);
                let t = this;
                this.fetch({
                    url: interfaces.personnel + "/" + t.form.id,
                    method: 'GET',
                }).then((res) => {
                    if (res.data && res.success == true) {
                        //填写数据
                        t.form = res.data;
                        if (res.data.type.indexOf("01") != -1) {
                            t.form.liter = true;
                        } else {
                            t.form.liter = false;
                        }

                        if (res.data.type.indexOf("02") != -1) {
                            t.form.follow = true;
                        } else {
                            t.form.follow = false;
                        }

                        if (res.data.type.indexOf("03") != -1) {
                            t.form.recep = true;
                        } else {
                            t.form.recep = false;
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
            submit() {
                console.log("创建服务人员: " + this.form.id);
                var data = this.form;
                data.type = "";
                if (this.form.liter == true) {
                    if (data.type != '') {
                        data.type += ",";
                    }
                    data.type += "01"
                }
                if (this.form.follow == true) {
                    if (data.type != '') {
                        data.type += ",";
                    }
                    data.type += "02"
                }
                if (this.form.recep == true) {
                    if (data.type != '') {
                        data.type += ",";
                    }
                    data.type += "03";
                }

                var method, url, type;
                if (this.form.id == '' || this.form.id == undefined) {
                    type = "01";
                    url = interfaces.personnel;
                    method = "POST";
                    data.status = "02";
                    delete this.form.id;
                } else {
                    type = "02";
                    url = interfaces.personnel + "/" + this.form.id;
                    method = "PUT";
                }
                console.log("data:" + JSON.stringify(data));
                let t = this;
                this.fetch({
                    url: url,
                    method: method,
                    data: data
                }).then((res) => {
                    if (res.data && res.success == true) {
                        var message;
                        if (type == '01') {
                            message = "创建服务人员成功"
                        } else {
                            message = "更新服务人员成功"
                        }
                        this.$message({
                            showClose: true,
                            message: message,
                            type: 'success'
                        });
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
                    console.log('error：' + res);
                    this.$message({
                        showClose: true,
                        message: '服务器繁忙，请稍后再试',
                        type: 'error'
                    });
                });
            },
            getTags() {
                let t = this;
                this.fetch({
                    url: interfaces.tags + "?target=03&targetId=" + this.form.id,
                    method: 'GET',
                }).then((res) => {
                    if (res.data && res.success == true) {
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
                        message: '最多设置10个标签',
                        type: 'warning'
                    });
                    return;
                } else {
                    this.dialogTag = !this.dialogTag;
                    this.tagForm.name = '';
                }
            },
            addTag(tag) {
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
                            url: interfaces.tags + "?target=03&targetId=" + this.form.id,
                            method: 'POST',
                            data: {
                                name: tag
                            }
                        }).then((res) => {
                            if (res.data && res.success == true) {
                                t.dialogFormVisible = false;
                                t.dialogFormFenLeiVisible = false;
                                t.tags.push({
                                    id: res.data.id,
                                    name: tag
                                });
                                t.dialogTag = !t.dialogTag;
                            } else {
                                let msg = "服务器繁忙，请稍后再试";
                                if (res.message) {
                                    msg = res.message;
                                }
                                console.log("exception：" + res.errcode + "..." + res.message);
                                this.$message({
                                    showClose: true,
                                    message: msg,
                                    type: 'error'
                                });
                            }
                        }).catch((res) => {
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
            deleteTag(tag) {
                 let t = this
                this.fetch({
                    url: interfaces.tags + "/" + tag.id,
                    method: 'DELETE',
                }).then((res) => {
                    if (res.data && res.success == true) {
                        var index;
                        for (var i = 0; i < this.tags.length; ++i) {
                            if (this.tags[i].id == tag.id) {
                                index = i;
                            }
                        }
                        this.tags.splice(index, 1);
                    } else {
                        let msg = "服务器繁忙，请稍后再试";
                        if (res.message) {
                            msg = res.message;
                        }
                        console.log("exception：" + res.errcode + "..." + res.message);
                        this.$message({
                            showClose: true,
                            message: msg,
                            type: 'error'
                        });
                    }
                }).catch((res) => {
                    this.$message({
                        showClose: true,
                        message: '服务器繁忙，请稍后再试',
                        type: 'error'
                    });
                });
            },
        },
        created() {
            this.form.id = this.$route.query.id;
            this.form.nation = this.$route.query.nation;
        },
        mounted() {
            if (this.form.id != '') {
                this.getDetail();
                this.getTags();
            }
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
