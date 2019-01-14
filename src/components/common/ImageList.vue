<template>
    <div>
        <el-row :gutter="20" style="margin-bottom: 40px;">
            <el-col class='card' :span="4" v-for="(image, index) in images" :key="index">
                <el-card :body-style="{ padding: '0px' }">
                    <div id="imgarea" class="imgarea">
                        <img :src="image.url" class="image">
                    </div>
                    <div style="padding: 14px;">
                        <span>{{image.content}}</span>
                        <div class="bottom clearfix">
                            <el-button type="text" class="button1" @click="editImage(image)">编辑</el-button>
                            <el-button v-if='image.status == "01"' type="text" class='button3' @click="changeStatusImage(image)">{{image.status == "01" ? "停用" : "启用"}}</el-button>
                            <el-button v-else type="text" class='button4' @click="changeStatusImage(image)">{{image.status == "01" ? "停用" : "启用"}}</el-button>
                            <el-button type="text" class="button2" @click="deleteImage(image)">删除</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <el-dialog title="轮播图" :visible.sync="dialog">
            <el-form :model="form" label-width="80px" style='margin-right: 30px;'>
                <el-form-item label="描述">
                    <el-input v-model="form.content"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <el-upload class="avatar-uploader" :action="uploadUrl" :headers="headers" :show-file-list="false"
                        :on-success="handleSuccess" :before-upload="onBeforeUpload" name="filex">
                        <img v-if="form.url" :src="form.url" class="avatar">
                        <div v-else> <i class="el-icon-upload"></i>
                            <div class="el-upload__text">点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">图片尺寸建议比例1:0.52，只能上传jpg文件</div>
                        </div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editCancel">取 消</el-button>
                <el-button type="primary" @click="editOK">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        interfaces
    } from '../../service/interfaces'
    export default {
        props: {
            data: {
                type: Array,
                default: function() {
                    return [{
                        id: "轮播图ID",
                        url: require('@/assets/login-bg.jpg'),
                        status: "轮播图状态",
                        content: '描述信息',
                    }]
                }
            },
            showDialog: {
                type: Boolean,
                default: false
            },
            editForm: {
                type: Object,
                default: function() {
                    return {
                        id: "轮播图ID",
                        url: require('@/assets/login-bg.jpg'),
                        content: '描述信息',
                    }
                }
            }
        },
        data() {
            return {
                images: [],
                dialog: false,
                form: {
                    id: "",
                    url: '',
                    content: '',
                },
                headers: {
                    hmtoken: localStorage.getItem('hmtoken'),
                },
                uploadUrl: interfaces.uplaod,
            };
        },
        created: function() {
        },
        watch: {
            data: function() {
                this.images = this.data.slice(0, this.data.length);
                this.form = this.editForm;
            },
        },
        mounted() {
            let t = this;
            t.$watch('showDialog', e => {
                t.dialog = true
            })
            this.images = this.data.slice(0, this.data.length);
            this.form = this.editForm;

            window.onresize = function() {
                var area = document.getElementsByClassName("imgarea");
                for (var i = 0; i < area.length; ++i) {
                    var width = getComputedStyle(area[i], null)['width'];
                    area[i].style.height = parseInt(parseInt(width) * 0.526) + "px";
                }
            }
        },
        methods: {
            editImage: function(image) {
                this.form.id = image.id;
                this.form.url = image.url;
                this.form.content = image.content;

                this.dialog = !this.dialog;
            },
            changeStatusImage: function(image) {
                this.$emit('change', image)
            },
            deleteImage: function(image) {
                this.$emit('delete', image)
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
                    this.form.url = res.data.files[0].path;
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
                this.form.id = "";
                this.form.url = "";
                this.form.content = "";
            },
            editOK() {
                this.dialog = !this.dialog;
                this.$emit('edit')
            }
        },
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
