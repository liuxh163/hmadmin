<template>
    <div>
        <div>
            <el-form ref="form" :model="prdinfo" label-width="80px" width="100%">
                <el-form-item label="亮点介绍" style='width: 85%;'>
                    <!-- <quill-editor ref="textEditor" v-model="prdinfo.feature" @change="onEditorChange($event)" :options="editorOption"></quill-editor> -->
                    <vue-editor useCustomImageHandler @imageAdded="imageAdd" v-model="prdinfo.feature" placeholder="行程亮点" />
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    //     import 'quill/dist/quill.core.css';
    //     import 'quill/dist/quill.snow.css';
    //     import 'quill/dist/quill.bubble.css';
    //     import {
    //         quillEditor
    //     } from 'vue-quill-editor';
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
        name: 'product-feature',
        data: function() {
            return {
                content: '',
                //                 editorOption: {
                //                     placeholder: '行程亮点'
                //                 }
            }
        },
        computed: {
            ...mapState([
                'prdinfo'
            ]),
        },
        components: {
            // quillEditor,
            VueEditor
        },
        methods: {
            //             onEditorChange({
            //                 editor,
            //                 html,
            //                 text
            //             }) {
            //                 this.prdinfo.feature = html;
            //                 console.log("feature: " + this.prdinfo.feature);
            //             }
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

</style>
