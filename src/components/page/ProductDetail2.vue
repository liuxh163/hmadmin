<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 产品</el-breadcrumb-item>
                <el-breadcrumb-item>详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-form ref="form" :model="prdinfo" label-width="100px" width='100%'>
                <el-form-item label="名称" style='width: 600px'>
                    <el-input type="textarea" rows="2" v-model="prdinfo.desc"></el-input>
                </el-form-item>

                <el-form-item label="费用" style='width: 200px'>
                    <el-form-item label="成人" style="width: 300px;">
                        <el-input placeholder="0" :number="true" v-model="prdinfo.adultPrice"><template slot="append">/
                                人</template></el-input>
                    </el-form-item>
                    <el-form-item label="陪同" style="width: 300px;">
                        <el-input placeholder="0" :number="true" v-model="prdinfo.followPrice"><template slot="append">/
                                人</template></el-input>
                    </el-form-item>
                    <el-form-item label="妇女" style="width: 300px;">
                        <el-input placeholder="0" :number="true" v-model="prdinfo.womenPrice"><template slot="append">/
                                人</template></el-input>
                    </el-form-item>
                    <el-form-item label="小孩" style="width: 300px;">
                        <el-input placeholder="0" :number="true" v-model="prdinfo.childPrice"><template slot="append">/
                                人</template></el-input>
                    </el-form-item>
                </el-form-item>


                <el-form-item label="活动标签">
                    <el-tag :key='tag.id' v-for="tag in tags" closable @close="deleteTag(tag)">
                        {{tag.name}}
                    </el-tag>
                    <el-button icon="el-icon-plus" size="large" @click.native="showTagDialog()" style="vertical-align: middle;margin: 10px;"></el-button>
                </el-form-item>

                <el-form-item label="首页图">
                    <el-upload class="avatar-uploader" :action="uploadUrl" :headers="headers" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" name="filex">
                        <!-- <img v-if="coverPath" :src="coverPath" class="avatar"> -->
                        <img v-if="prdinfo.coverPic && prdinfo.coverPic.length > 0" :src="prdinfo.coverPic[0].path"
                            class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <div class="el-upload__tip" slot="tip">图片尺寸建议比例1；4.18，如160*666像素，且不超过2M</div>
                    </el-upload>
                </el-form-item>

                <el-form-item label="宣传图">
                    <el-button style='margin-left: 10px; margin-top: 10px;;' type="primary" @click="newImage">添加</el-button>
                    <div style="margin-bottom: 10px; margin-left: 10px;margin-top: 10px;" class="el-upload__tip">图片尺寸建议比例1:0.52，如950*500像素，只能上传jpg文件，且不超过2M</div>

                    <ImageList style='margin-left: -50px;' :data="images" :showDialog='showDialog' :editForm='form'
                        @edit="editImage" @change="changeStatusImage" @delete="deleteImage"></ImageList>
                </el-form-item>
            </el-form>

            <el-container style="height: 600px; border: 1px solid #eee; margin-left: 40px; margin-right: 40px;">
                <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                    <el-menu :default-active="units[unitIndex].key" class="el-menu-vertical-demo" v-for="unit in units"
                        :key="unit.key" @select='selectUnit(unit.key)'>
                        <el-menu-item :index="unit.key">
                            <i v-show="(unit.key == 'add-unit'?false:true)" class="el-icon-circle-close-outline"
                                v-on:click.stop="deleteUnit(unit.key)"></i>
                            <span slot="title">{{unit.name}}</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>

                <el-container>
                    <vue-editor style='margin-right: 20px; margin-left: 40px; height: 550px;' useCustomImageHandler
                        @imageAdded="imageAdd" v-model="units[unitIndex].value" placeholder="填写内容" />
                </el-container>
            </el-container>

            <el-button style="margin-top: 30px; margin-left: 20px" v-show="publish" @click.native.prevent="handlePublish">发布</el-button>
        </div>

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
        <el-dialog title="设置子项名称和内容" :visible.sync="dialogUnit" top="15%" width='25%'>
            <el-form :model="unitForm">
                <el-form-item label="名称">
                    <el-input v-model="unitForm.key" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="基本内容">
                    <el-input v-model="unitForm.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click.native="dialogUnit = !dialogUnit">取 消</el-button>
                <el-button type="primary" @click.native="addUnit(unitForm.key, unitForm.name)">添加</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'
    import $ from 'jquery'
    import ImageList from '@/components/common/ImageList'
    import {
        interfaces
    } from '../../service/interfaces'
    import {
        VueEditor
    } from 'vue2-editor'


    export default {
        name: 'productdetail',
        data: function() {
            return {
                publish: true,
                id: "",
                nation: "",
                prdinfo: { // 产品信息
                    id: "",
                    nation: '',
                    desc: '',
                    adultPrice: 0,
                    womenPrice: 0,
                    childPrice: 0,
                    followPrice: 0,
                    coverId: 0,
                    coverpic: [],
                    feature: "",
                    detail: "",
                    routine: "",
                    fee: "",
                    notice: "",
                    hospital: "",
                    item: "",
                    experts: [],
                    operations: [],
                    status: ""
                },
                //子项
                units: [{
                    key: 'add-unit',
                    name: "--> 新增子项 <--",
                    value: ""
                }],
                unitIndex: 0,
                dialogUnit: false,
                unitForm: {
                    name: "",
                    key: "",
                },
                //标签
                tags: [],
                dialogTag: false,
                tagForm: {
                    name: ""
                },
                //轮播图
                images: [],
                showDialog: false,
                form: {
                    id: "",
                    url: '',
                    content: '',
                },

                //首页图处理
                uploadUrl: interfaces.uplaod,
                headers: {
                    hmtoken: localStorage.getItem('hmtoken'),
                },
            }
        },
        components: {
            ImageList,
            VueEditor
        },
        methods: {
            handlePublish: function() {
                console.log("发布产品: " + this.prdinfo.id);
                var data = this.deepClone(this.prdinfo);
                // var data = this.prdinfo;

                var method, url, type;
                if (this.id == '' || this.id == undefined) {
                    type = "01";
                    url = interfaces.products;
                    method = "POST";
                    data.status = "02";
                    data.nation = this.nation;
                    delete data.id;
                } else {
                    type = "02";
                    url = interfaces.products + "/" + data.id;
                    method = "PUT";
                }
                data.contents = this.deepClone(this.units);
                data.contents.splice(data.contents.length - 1, 1);
                data.contents.splice(data.contents.length - 1, 1);
                data.contents.splice(data.contents.length - 1, 1);
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
                            message = "产品创建成功"
                            this.getDetail();
                        } else {
                            message = "更新产品成功"
                        }
                        this.$message({
                            showClose: true,
                            message: message,
                            type: 'success'
                        });
                        // this.$router.go(-1);
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
                console.log("getDetail: " + this.id);
                let t = this;
                this.fetch({
                    url: interfaces.productDetail,
                    method: 'GET',
                    params: {
                        id: this.id,
                    }
                }).then((res) => {
                    if (res.data && res.success == true) {
                        this.prdinfo = res.data;
                        this.units = [];
                        for(var i = 0; i < res.data.contents.length; ++i) {
                            this.units.push({
                                key: res.data.contents[i].name,
                                name: res.data.contents[i].name,
                                value: res.data.contents[i].value
                            });
                        }
                        this.units.push({
                            key: "hospital-old",
                            name: "医院信息",
                            value: this.prdinfo.hospital
                        });
                        this.units.push({
                            key: "item-old",
                            name: "基础项",
                            value: this.prdinfo.item
                        });
                        this.units.push({
                            key: 'add-unit',
                            name: "--> 新增子项 <--",
                            value: ""
                        });
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
            getTags() {
                let t = this;
                this.fetch({
                    url: interfaces.tags + "?target=01&targetId=" + this.id,
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
            getImages() {
                let t = this
                this.fetch({
                    url: interfaces.carousels,
                    method: 'GET',
                    params: {
                        location: "05",
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
            },
            handleAvatarSuccess(res, file) {
                if (res.data && res.success == true) {
                    this.prdinfo.coverPic.push({
                        path: res.data.files[0].path
                    });
                    this.prdinfo.coverId = res.data.files[0].id;
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
            beforeAvatarUpload(file) {
                //                 const isJPG = file.type === 'image/jpeg';
                //                 const isLt2M = file.size / 1024 / 1024 < 2;
                //                 console.log(file.type + "..." + file.size);
                //                 if (!isJPG) {
                //                     this.$message.error('上传头像图片只能是 JPG 格式!');
                //                     return false;
                //                 }
                //                 if (!isLt2M) {
                //                     this.$message.error('上传头像图片大小不能超过 2MB!');
                //                     return false;
                //                 }
                //                 return isJPG && isLt2M;
                return true;
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
            selectUnit(index) {
                if (index == "add-unit") {
                    this.dialogUnit = !this.dialogUnit;
                    return;
                }
                for (var i = 0; i < this.units.length; ++i) {
                    if (this.units[i].key == index) {
                        this.unitIndex = i;
                    }
                }
            },
            addUnit(key, name) {
                if (this.units == undefined) {
                    this.units = [];
                }

                if (key && key.trim().length !== 0) {
                    var isExist = false;
                    key = key.trim();
                    for (var i = 0; i < this.units.length; i++) {
                        if (this.units[i].key == key) {
                            isExist = true;
                            break
                        }
                    }
                    if (isExist) {
                        this.$message({
                            message: '该子项名称已存在',
                            type: 'warning'
                        });
                    } else {
                        this.units.splice(this.units.length - 1, 0, {
                            key: key,
                            name: key,
                            value: name
                        });
                        this.unitIndex = this.units.length - 2;
                        this.dialogUnit = !this.dialogUnit;
                    }
                } else {
                    this.$message({
                        message: '子项名称不能为空',
                        type: 'warning'
                    });
                }
            },
            deleteUnit(index) {
                if (index == "add-unit") {
                    return;
                }
                for (var i = 0; i < this.units.length; ++i) {
                    if (this.units[i].key == index) {
                        this.units.splice(i, 1);
                    }
                }
            },
            //深度克隆
            deepClone(obj) {
                var _tmp, result;
                _tmp = JSON.stringify(obj);
                result = JSON.parse(_tmp);
                return result;
            },
        },
        created() {
            this.id = this.$route.query.id;
            this.nation = this.$route.query.nation;
        },
        mounted() {
            console.log("id: " + this.id);
            if (this.id != 0 && this.id != undefined) {
                this.getDetail();
                this.getTags();
                this.getImages();
            }
        }
    }
</script>

<style scoped>
    .container {
        margin-left: 50px;
        margin-right: 50px;
    }

    .view {
        margin-top: 50px;
        margin-left: 80px;
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

    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>
