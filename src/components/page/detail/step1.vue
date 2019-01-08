<template>
    <div>
        <div >
            <el-form ref="form" :model="prdinfo" label-width="100px" width='100%'>
                <el-form-item label="名称" style='width: 600px'>
                    <el-input type="textarea" rows="5" v-model="prdinfo.desc"></el-input>
                </el-form-item>

                <el-form-item label="费用" style="width: 300px;">
                    <el-input placeholder="0" :number="true" v-model="prdinfo.cost"><template slot="append">/ 人</template></el-input>
                </el-form-item>

                <el-form-item label="活动标签">
                    <el-tag v-for="tag in prdinfo.tags" closable @close="deleteTag(tag.name, prdinfo.tags)">
                        {{tag.name}}
                    </el-tag>
                    <el-button icon="el-icon-plus" size="large" @click.native="showTagDialog(prdinfo.tags)" style="vertical-align: middle;margin: 10px;"></el-button>
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

                    <ImageList style='margin-left: -50px;' :data="prdinfo.images" :showDialog='showDialog' :editForm='form' @edit="editImage"
                        @delete="deleteImage"></ImageList>
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
                    <el-button type="primary" @click.native="addTag(tagForm.name, prdinfo.tags)">添加</el-button>
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
        name: 'baseinfo',
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
        methods: {
            showTagDialog(tags) {
                if (tags.length >= 5) {
                    this.$message({
                        message: '最多设置5个标签',
                        type: 'warning'
                    });
                } else {
                    this.dialogTag = !this.dialogTag;
                    this.tagForm.name = '';
                }
            },
            addTag(tag, tags) {
                console.log(tag);
                if (tag && tag.trim().length !== 0) {
                    var isExist = false;
                    tag = tag.trim();
                    for (var i = 0; i < tags.length; i++) {
                        if (tags[i] == tag) {
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
                        this.dialogFormVisible = false;
                        this.dialogFormFenLeiVisible = false;
                        tags.push({
                            name: tag
                        });
                        this.dialogTag = !this.dialogTag;
                    }
                } else {
                    this.$message({
                        message: '标签不能为空',
                        type: 'warning'
                    });
                }
            },
            deleteTag(value, tags) {
                var index = tags.indexOf(value);
                tags.splice(index, 1);
            },
            newImage() {
                this.form.id = '';
                this.form.url = '';
                this.form.content = '';

                this.showDialog = !this.showDialog
            },
            editImage() {
                let t = this
                this.fetch({
                    url: interfaces.carousels + "?location=01&carousel_id=" + t.form.id,
                    method: 'POST',
                }).then((res) => {
                    if (res.data && res.success == true) {
                        if (t.form.id == '') {
                            //新建轮播图，添加到最后
                            t.images.push({
                                id: res.data.targetId,
                                url: res.data.picture_path,
                                content: res.data.description
                            });
                        } else {
                            //更新轮播图
                            for (let i = 0; i < t.images.length; i++) {
                                if (t.images[i].id === res.data.targetId) {
                                    t.images[i].url = res.data.picture_path;
                                    t.images[i].content = res.data.description;
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
                    if (t.form.id == '') {
                        //新建轮播图，添加到最后
                        t.images.push({
                            id: "res.data.targetId",
                            url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
                            content: t.form.content
                        });
                    } else {
                        //更新轮播图
                        for (let i = 0; i < t.images.length; i++) {
                            if (t.images[i].id === t.form.id) {
                                t.images[i].url =
                                    "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100";
                                t.images[i].content = t.form.content;
                            }
                        }
                    }
                });
            },
            deleteImage(image) {
                let t = this
                this.fetch({
                    url: interfaces.carousels + "?location=01&carousel_id=" + image.id,
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
                    for (let i = 0; i < this.images.length; i++) {
                        if (this.images[i].id === image.id) {
                            this.images.splice(i, 1);
                        }
                    }
                });
            },
            onSubmit() {
                this.$message.success('提交成功！');
            }
        }
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
