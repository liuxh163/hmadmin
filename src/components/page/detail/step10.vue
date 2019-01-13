<template>
    <div>
        <div>
            <el-form ref="form" :model="prdinfo" label-width="80px" width="100%">
                <el-form-item label="运营活动" style='width: 85%;'>
                    <vue-editor useCustomImageHandler @imageAdded="imageAdd" v-model="prdinfo.operations" placeholder="运营活动" />
                </el-form-item>
            </el-form>
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
        methods: {
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
