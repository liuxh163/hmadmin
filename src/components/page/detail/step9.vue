<template>
    <div>
        <div style="min-height: 300px;">
            <el-button style='margin-left: 10px; margin-top: 20px;;' type="primary" @click="dialog = !dialog">添加</el-button>

            <el-row :gutter="20" style="margin-bottom: 40px;">
                <el-col class='card' :span="4" v-for="(expert, index) in prdinfo.experts" :key="index">
                    <el-card :body-style="{ padding: '0px' }">
                        <div id="imgarea" class="imgarea">
                            <img :src="expert.picFileId" class="image">
                        </div>
                        <div style="padding: 14px;">
                            <span>{{expert.name}}</span>
                            <span>{{expert.desc}}</span>
                            <div class="bottom clearfix">
                                <el-button type="text" class="button1" @click="editImage(expert)">编辑</el-button>
                                <el-button type="text" class="button2" @click="deleteImage(expert)">删除</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>

            <el-dialog title="专家" :visible.sync="dialog">
                <el-form :model="form" label-width="80px" style='margin-right: 30px;'>
                    <el-form-item label="名字">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="图片">
                        <el-upload class="avatar-uploader" :action="uploadUrl" :headers="headers" :show-file-list="false"
                            :on-success="handleSuccess" :before-upload="onBeforeUpload" name="filex">
                            <img v-if="form.picFileId" :src="form.picFileId" class="avatar">
                            <div v-else> <i class="el-icon-upload"></i>
                                <div class="el-upload__text">点击上传</em></div>
                                <div class="el-upload__tip" slot="tip">图片尺寸建议比例1:0.52，只能上传jpg文件</div>
                            </div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="详情" style='width: 85%;'>
                        <vue-editor useCustomImageHandler @imageAdded="imageAdd" v-model="form.desc" placeholder="详情" />
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="editCancel">取 消</el-button>
                    <el-button type="primary" @click="editOK">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'
    import {
        VueEditor
    } from 'vue2-editor'
    import {
        interfaces
    } from '../../../service/interfaces'

    export default {
        name: 'baseinfo',
        data: function() {
            return {
                dialog: false,
                form: {
                    name: '',
                    picFileId: "",
                    desc: '',
                },
                headers: {
                    hmtoken: localStorage.getItem('hmtoken'),
                },
                uploadUrl: interfaces.uplaod,
            }
        },
        computed: {
            ...mapState([
                'prdinfo'
            ]),
        },
        components: {
            VueEditor
        },
        created: function() {
            var area = document.getElementsByClassName("imgarea");
            for (var i = 0; i < area.length; ++i) {
                var width = getComputedStyle(area[i], null)['width'];
                area[i].style.height = parseInt(parseInt(width) * 0.526) + "px";
            }
        },
        mounted() {
            window.onresize = function() {
                var area = document.getElementsByClassName("imgarea");
                for (var i = 0; i < area.length; ++i) {
                    var width = getComputedStyle(area[i], null)['width'];
                    area[i].style.height = parseInt(parseInt(width) * 0.526) + "px";
                }
            }
        },
        methods: {
            editImage: function(expert) {
                this.form.name = expert.name;
                this.form.picFileId = expert.picFileId;
                this.form.desc = expert.desc;

                this.dialog = !this.dialog;
            },
            deleteImage: function(expert) {
                for (let i = 0; i < this.experts.length; i++) {
                    if (this.experts[i].id === expert.id) {
                        this.experts.splice(i, 1);
                    }
                }
            },
            onBeforeUpload(file) {
                //                 const isJPG = file.type === 'image/jpeg';
                //                 const isLt2M = file.size / 1024 / 1024 < 2;
                // 
                //                 if (!isJPG) {
                //                     this.$message.error('上传头像图片只能是 JPG 格式!');
                //                 }
                //                 if (!isLt2M) {
                //                     this.$message.error('上传头像图片大小不能超过 2MB!');
                //                 }
                //                 return isJPG && isLt2M;

                return true;
            },
            handleSuccess(res, file) {
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
            },
            editCancel() {
                this.dialog = !this.dialog;
                this.form.name = "";
                this.form.picFileId = "";
                this.form.desc = "";
            },
            editOK() {
                this.dialog = !this.dialog;
                this.prdinfo.experts.unshift({
                    name: this.form.name,
                    picFileId: this.form.picFileId,
                    desc: this.form.desc
                })
                this.form.name = "";
                this.form.picFileId = "";
                this.form.desc = "";
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
        }
    }
</script>

<style scoped>
    .card {
        margin-top: 20px;
    }

    .imgarea {
        width: 100%;
        height: 100px;
    }

    .image {
        width: 100%;
        height: 100%;
    }

    .bottom {
        margin-left: 10px;
        margin-right: 10px;
        margin-top: 13px;
        line-height: 12px;
    }

    .button1 {
        padding: 0;
        float: left;
    }

    .button2 {
        color: red;
        padding: 0;
        float: right;
    }

    .button3 {
        margin-left: 40px;
        color: red;
        padding: 0;
        float: left;
    }

    .button4 {
        margin-left: 40px;
        color: green;
        padding: 0;
        float: left;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .avatar {
        width: auto;
        height: auto;
        max-width: 100%;
    }
</style>
