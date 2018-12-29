<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 首页</el-breadcrumb-item>
                <el-breadcrumb-item>轮播图</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-button style='margin-left: 10px; margin-top: 20px;;' type="primary" @click="dialogForm = !dialogForm">添加</el-button>
        <div slot="tip" style="margin-bottom: 20px; margin-left: 10px;" class="el-upload__tip">图片尺寸建议比例1:0.52，如950*500像素，只能上传jpg文件，且不超过2M</div>

        <ImageList :data="images" :editDialog='dialogForm' :editForm='form' @edit="editImage" @delete="deleteImage"></ImageList>
        
    </div>
</template>

<script>
    import ImageList from '@/components/common/ImageList'

    export default {
        data() {
            return {
                dialogForm: false,
                form: {
                    id: "",
                    url: '',
                    content: '',
                },
                images: [{
                    id: "1",
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                    content: "Lorem y dummy t",
                }, {
                    id: "2",
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                    content: "Lorem y dummy t",
                }, {
                    id: "3",
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                    content: "Lorem y dummy t",
                }, {
                    id: "4",
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                    content: "Lorem y dummy t",
                }, {
                    id: "5",
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                    content: "Lorem y dummy t",
                }, {
                    id: "6",
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                    content: "Lorem y dummy t",
                }, {
                    id: "7",
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                    content: "Lorem y dummy t",
                }, {
                    id: "8",
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                    content: "Lorem y dummy t",
                }, ]
            };
        },
        components: {
            ImageList
        },
        methods: {
            editImage(image) {
                this.dialogForm = !this.dialogForm;
                
            },
            deleteImage(image) {
                for (let i = 0; i < this.images.length; i++) {
                    if (this.images[i].id === image.id) {
                        this.images.splice(i, 1);
                    }
                }
            }
        },
    }
</script>


<style scoped>
    
</style>
