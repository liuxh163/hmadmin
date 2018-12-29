<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> 产品</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="country">
                <el-tab-pane :label="`日本`" name="Japan">
                    <el-button style='margin-left: 10px; margin-top: 20px;;' type="primary" @click="dialogForm = !dialogForm">添加</el-button>
                    <div style="margin-bottom: 20px; margin-left: 10px;" class="el-upload__tip">图片尺寸建议比例1:0.52，如950*500像素，只能上传jpg文件，且不超过2M</div>

                    <ImageList :data="images" :editDialog='dialogForm' :editForm='form' @edit="editImage" @delete="deleteImage"></ImageList>

                    <el-table :data="Japan" border class="table" style="width: 100%">
                        <el-table-column prop="name" label="名称" sortable width="260"></el-table-column>
                        <el-table-column prop="desc" label="描述"></el-table-column>
                        <el-table-column prop="original" label="价格" width="100"></el-table-column>
                        <el-table-column prop="discounted" label="海马价" width="100"></el-table-column>
                        <el-table-column prop="cagegory" label="标签" width="180" align="center">
                            <template slot-scope="scope">
                                <el-select v-module='category' placeholder="产品分类" class="handle-select mr10">
                                    <el-option key="hot" label="热" value="hot"></el-option>
                                    <el-option key="recommend" label="推荐" value="recommend"></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="180" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane :label="`韩国`" name="Korea">
                    <template v-if="country === 'Korea'">
                        <el-table :data="Korea" :show-header="false" style="width: 100%">
                            <el-table-column prop="name" label="姓名" width="120"></el-table-column>
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="date" width="150"></el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger">删除全部</el-button>
                        </div>
                    </template>
                </el-tab-pane>
                <el-tab-pane :label="`泰国`" name="Thailand">
                    <template v-if="country === 'Thailand'">
                        <el-table :data="Thailand" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="date" width="150"></el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button @click="handleRestore(scope.$index)">还原</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger">清空回收站</el-button>
                        </div>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import ImageList from '@/components/common/ImageList'

    export default {
        name: 'tabs',
        data() {
            return {
                country: 'Japan',
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
                }, ],
                Japan: [{
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: "hot"
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: "recommend"
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: "hot"
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: ""
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: "hot"
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: ""
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: "hot"
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: "recommend"
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: "hot"
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: "recommend"
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: "hot"
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: ""
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: "hot"
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: ""
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: "hot"
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: "recommend"
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: "hot"
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: "recommend"
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: "hot"
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: ""
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: "hot"
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: ""
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: "hot"
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: "recommend"
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: "hot"
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: "recommend"
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: "hot"
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: ""
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: "hot"
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: ""
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: "hot"
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: "recommend"
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: "hot"
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: "recommend"
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: "hot"
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: ""
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: "hot"
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: ""
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: "hot"
                }, {
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: "recommend"
                }],
                Korea: [{
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: "hot"
                }],
                Thailand: [{
                    name: '健康大阪6天5夜行 感受不一样的大阪',
                    desc: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                    original: '30000',
                    discounted: '4600',
                    category: "recommend"
                }],
                category: '',

            }
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
            },
            handleEdit(index, row) {
                this.$router.push('/product/detail');
                //             	this.idx = index;
                //             	const item = this.tableData[index];
                //             	this.form = {
                //             		name: item.name,
                //             		date: item.date,
                //             		address: item.address
                //             	}
                //             	this.editVisible = true;
            },
        },
        components: {
            ImageList
        },
    }
</script>

<style>
    .table {
        width: 100%;
        font-size: 14px;
    }

    .red {
        color: #ff0000;
    }
</style>
