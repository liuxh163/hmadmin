<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 首页</el-breadcrumb-item>
                <el-breadcrumb-item>轮播图</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-button style='margin-left: 10px; margin-top: 20px;;' type="primary" @click="newImage">添加</el-button>
        <div slot="tip" style="margin-bottom: 20px; margin-left: 10px;" class="el-upload__tip">图片尺寸建议比例1:0.52，如950*500像素，只能上传jpg文件，且不超过2M</div>

        <ImageList :data="images" :showDialog='showDialog' :editForm='form' @edit="editImage" @change="changeStatusImage"
            @delete="deleteImage"></ImageList>

    </div>
</template>

<script>
    import ImageList from '@/components/common/ImageList'
    import {
        interfaces
    } from '../../service/interfaces'

    export default {
        data() {
            return {
                showDialog: false,
                form: {
                    id: "",
                    url: '',
                    content: '',
                },
                images: []
            };
        },
        components: {
            ImageList
        },
        methods: {
            getImages() {
                let t = this
                this.fetch({
                    url: interfaces.carousels + "?location=01",
                    method: 'GET',
                    data : {
                        status: "01,02",
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
                    location: "01",
                    productId: "",
                    picFileId: this.form.url,
                    status: status,
                    target: "",
                    targetId: 0
                }
                console.log("body:" + JSON.stringify(body));
                let t = this
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
        mounted() {
            this.getImages();
        },
        created() {
        }
    }
</script>


<style scoped>

</style>
