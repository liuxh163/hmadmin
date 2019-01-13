<template>
    <div>
        <div>
            <el-form ref="form" :model="form" label-width="100px" width='100%'>
                <el-form-item label="名称" style='width: 600px'>
                    <el-input type="textarea" rows="5" v-model="form.title"></el-input>
                </el-form-item>

                <el-form-item label="地点" style='width: 600px'>
                    <el-input type="textarea" rows="5" v-model="form.location"></el-input>
                </el-form-item>

                <el-form-item label="内容" style='width: 85%;'>
                    <quill-editor ref="textEditor" v-model="form.content" @change="onEditorChange($event)" :options="editorOption"></quill-editor>
                </el-form-item>
            </el-form>
            
            <el-button style="margin-top: 12px; margin-left: 50px" @click.native.prevent="createForum">发布</el-button>
        </div>
    </div>
</template>

<script>
    import {
        interfaces
    } from '../../service/interfaces'
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import {
        quillEditor
    } from 'vue-quill-editor';

    export default {
        name: 'craeteforum',
        data: function() {
            return {
                form: {
                    title: '',
                    content: '',
                    location: ''
                },
                editorOption: {
                    placeholder: '行程亮点'
                }
            }
        },
        components: {
            quillEditor
        },
        methods: {
            createForum() {
                let t = this
                this.fetch({
                    url: interfaces.forums + "/1/posts",
                    method: 'POST',
                    data: this.form
                }).then((res) => {
                    if (res.data && res.success == true) {
//                         if (t.form.id == '') {
//                             //新建轮播图，添加到最后
//                             t.images.push({
//                                 id: res.data.targetId,
//                                 url: res.data.picture_path,
//                                 content: res.data.description
//                             });
//                         } else {
//                             //更新轮播图
//                             for (let i = 0; i < t.images.length; i++) {
//                                 if (t.images[i].id === res.data.targetId) {
//                                     t.images[i].url = res.data.picture_path;
//                                     t.images[i].content = res.data.description;
//                                 }
//                             }
//                         }
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
            onEditorChange({
                editor,
                html,
                text
            }) {
                this.form.content = html;
                console.log("content: " + this.form.content);
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
