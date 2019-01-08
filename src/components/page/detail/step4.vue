<template>
    <div>
        <div>
            <el-form ref="form" :model="prdinfo" label-width="80px" width="100%">
                <el-form-item label="轻松行程" style='width: 85%;'>
                    <quill-editor ref="textEditor" v-model="prdinfo.routine" @change="onEditorChange($event)" :options="editorOption"></quill-editor>
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
                    placeholder: '轻松行程'
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
                this.prdinfo.routine = html;
                console.log("routine: " + this.prdinfo.routine);
            }
        }
    }
</script>

<style scoped>

</style>
