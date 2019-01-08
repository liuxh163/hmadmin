<template>
    <div>
        <div>
            <el-form ref="form" :model="prdinfo" label-width="80px" width="100%">
                <el-form-item label="医院介绍" style='width: 85%;'>
                    <quill-editor ref="textEditor" v-model="prdinfo.hospital" @change="onEditorChange($event)" :options="editorOption"></quill-editor>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import {
        quillEditor
    } from 'vue-quill-editor';
    import {
        mapState,
        mapMutations
    } from 'vuex'

    export default {
        name: 'baseinfo',
        data: function() {
            return {
                content: '',
                editorOption: {
                    placeholder: '医院介绍'
                }
            }
        },
        computed: {
            ...mapState([
                'prdinfo'
            ]),
        },
        components: {
            quillEditor
        },
        methods: {
            onEditorChange({
                editor,
                html,
                text
            }) {
                this.prdinfo.hospital = html;
                console.log("hospital: " + this.prdinfo.hospital);
            }
        }
    }
</script>

<style scoped>

</style>
