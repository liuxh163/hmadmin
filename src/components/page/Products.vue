<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> 产品</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="country" @tab-click="clickTab">
                <el-tab-pane :label="`日本`" name="Japan">
                    <el-button style='margin-left: 10px; margin-top: 20px;;' type="primary" @click="newImage">添加轮播图</el-button>
                    <div style="margin-bottom: 20px; margin-left: 10px;" class="el-upload__tip">图片尺寸建议比例1:0.52，如950*500像素，只能上传jpg文件，且不超过2M</div>

                    <ImageList :data="imagesJapan" :showDialog='showDialog' :editForm='form' @edit="editImage" @change="changeStatusImage"
                        @delete="deleteImage"></ImageList>
                    <router-link :to="{path: '/product/detail', query:{id:'', nation:getNationFromCountry()}}">
                        <el-button style='margin-left: 10px; margin-top: 20px; margin-bottom: 20px;' type="primary">添加新产品</el-button>
                    </router-link>
                    <el-table :data="JapanPrd" border class="table" style="width: 100%">
                        <el-table-column prop="name" label="名称" sortable width="260"></el-table-column>
                        <el-table-column prop="desc" label="描述"></el-table-column>
                        <el-table-column prop="original" label="价格" sortable width="100"></el-table-column>
                        <el-table-column prop="discounted" label="海马价" sortable width="100"></el-table-column>
                        <el-table-column prop="cagegory" label="标签" width="160" align="center">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.category" placeholder="产品分类" class="handle-select mr10"
                                    @change="changeProperty($event, scope.row.id, property.category)">
                                    <el-option v-for="item in cagegories" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column prop="mainpage" label="首页展示" width="120" align="center">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.mainpage" placeholder="首页" class="handle-select mr10"
                                    @change="changeProperty($event, scope.row.id, property.mainpage)">
                                    <el-option v-for="item in mainPage" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="220" align="center">
                            <template slot-scope="scope">
                                <el-button v-if='scope.row.status == "01"' type="text" style='margin-right: 15px;'
                                    class='button3' @click="changeStatusPrd(scope.$index, scope.row.id, scope.row.status)">停用</el-button>
                                <el-button v-else type="text" style='margin-right: 15px;' class='button4' @click="changeStatus(scope.$index, scope.row.id, scope.row.status)">启用</el-button>
                                <router-link :to="{path: '/product/detail', query:{id:scope.row.id}}" style='margin-right: 15px;'>
                                    <el-button type="text" icon="el-icon-edit">编辑</el-button>
                                </router-link>
                                <el-button type="text" icon="el-icon-delete" class="red" @click="deletePrd(scope.$index, scope.row.id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane :label="`韩国`" name="Korea">
                    <template v-if="country === 'Korea'">
                        <el-button style='margin-left: 10px; margin-top: 20px;;' type="primary" @click="newImage">添加</el-button>
                        <div style="margin-bottom: 20px; margin-left: 10px;" class="el-upload__tip">图片尺寸建议比例1:0.52，如950*500像素，只能上传jpg文件，且不超过2M</div>

                        <ImageList :data="imagesKorea" :showDialog='showDialog' :editForm='form' @edit="editImage"
                            @change="changeStatusImage" @delete="deleteImage"></ImageList>

                        <router-link :to="{path: '/product/detail', query:{id:'', nation:getNationFromCountry()}}">
                            <el-button style='margin-left: 10px; margin-top: 20px; margin-bottom: 20px;' type="primary">添加新产品</el-button>
                        </router-link>
                        <el-table :data="KoreaPrd" border class="table" style="width: 100%">
                            <el-table-column prop="name" label="名称" sortable width="260"></el-table-column>
                            <el-table-column prop="desc" label="描述"></el-table-column>
                            <el-table-column prop="original" label="价格" sortable width="100"></el-table-column>
                            <el-table-column prop="discounted" label="海马价" sortable width="100"></el-table-column>
                            <el-table-column prop="cagegory" label="标签" width="160" align="center">
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.category" placeholder="产品分类" class="handle-select mr10"
                                        @change="changeProperty($event, scope.row.id, property.category)">
                                        <el-option v-for="item in cagegories" :key="item.value" :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column prop="mainpage" label="首页展示" width="120" align="center">
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.mainpage" placeholder="首页" class="handle-select mr10"
                                        @change="changeProperty($event, scope.row.id, property.mainpage)">
                                        <el-option v-for="item in mainPage" :key="item.value" :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="220" align="center">
                                <template slot-scope="scope">
                                    <el-button v-if='scope.row.status == "01"' type="text" style='margin-right: 15px;'
                                        class='button3' @click="changeStatusPrd(scope.$index, scope.row.id, scope.row.status)">停用</el-button>
                                    <el-button v-else type="text" style='margin-right: 15px;' class='button4' @click="changeStatus(scope.$index, scope.row.id, scope.row.status)">启用</el-button>
                                    <router-link :to="{path: '/product/detail', query:{id:scope.row.id}}" style='margin-right: 15px;'>
                                        <el-button type="text" icon="el-icon-edit">编辑</el-button>
                                    </router-link>
                                    <el-button type="text" icon="el-icon-delete" class="red" @click="deletePrd(scope.$index, scope.row.id)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-tab-pane>
                <el-tab-pane :label="`泰国`" name="Thailand">
                    <template v-if="country === 'Thailand'">
                        <el-button style='margin-left: 10px; margin-top: 20px;;' type="primary" @click="newImage">添加</el-button>
                        <div style="margin-bottom: 20px; margin-left: 10px;" class="el-upload__tip">图片尺寸建议比例1:0.52，如950*500像素，只能上传jpg文件，且不超过2M</div>

                        <ImageList :data="imagesThailand" :showDialog='showDialog' :editForm='form' @edit="editImage"
                            @change="changeStatusImage" @delete="deleteImage"></ImageList>

                        <router-link :to="{path: '/product/detail', query:{id:'', nation:getNationFromCountry()}}">
                            <el-button style='margin-left: 10px; margin-top: 20px; margin-bottom: 20px;' type="primary">添加新产品</el-button>
                        </router-link>
                        <el-table :data="ThailandPrd" border class="table" style="width: 100%">
                            <el-table-column prop="name" label="名称" sortable width="260"></el-table-column>
                            <el-table-column prop="desc" label="描述"></el-table-column>
                            <el-table-column prop="original" label="价格" sortable width="100"></el-table-column>
                            <el-table-column prop="discounted" label="海马价" sortable width="100"></el-table-column>
                            <el-table-column prop="cagegory" label="标签" width="160" align="center">
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.category" placeholder="产品分类" class="handle-select mr10"
                                        @change="changeProperty($event, scope.row.id, property.category)">
                                        <el-option v-for="item in cagegories" :key="item.value" :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column prop="mainpage" label="首页展示" width="120" align="center">
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.mainpage" placeholder="首页" class="handle-select mr10"
                                        @change="changeProperty($event, scope.row.id, property.mainpage)">
                                        <el-option v-for="item in mainPage" :key="item.value" :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="220" align="center">
                                <template slot-scope="scope">
                                    <el-button v-if='scope.row.status == "01"' type="text" style='margin-right: 15px;'
                                        class='button3' @click="changeStatusPrd(scope.$index, scope.row.id, scope.row.status)">停用</el-button>
                                    <el-button v-else type="text" style='margin-right: 15px;' class='button4' @click="changeStatus(scope.$index, scope.row.id, scope.row.status)">启用</el-button>
                                    <router-link :to="{path: '/product/detail', query:{id:scope.row.id}}" style='margin-right: 15px;'>
                                        <el-button type="text" icon="el-icon-edit">编辑</el-button>
                                    </router-link>
                                    <el-button type="text" icon="el-icon-delete" class="red" @click="deletePrd(scope.$index, scope.row.id)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import ImageList from '@/components/common/ImageList'
    import {
        interfaces
    } from '../../service/interfaces'

    export default {
        name: 'products',
        data() {
            return {
                Japan: "Japan",
                Korea: "Korea",
                Thailand: "Thailand",
                country: 'Japan',
                showDialog: false,
                form: {
                    id: "",
                    url: '',
                    content: '',
                },
                property: {
                    category: "category",
                    mainpage: "mainpage"
                },
                japanStatus: 0,
                koreaStatus: 0,
                thailandStatus: 0,
                imagesJapan: [],
                imagesKorea: [],
                imagesThailand: [],
                JapanPrd: [],
                KoreaPrd: [],
                ThailandPrd: [],
                cagegories: [{
                    value: '',
                    label: '无'
                }, {
                    value: 'hot',
                    label: '热'
                }, {
                    value: 'recommend',
                    label: '推荐'
                }],
                mainPage: [{
                    value: 'yes',
                    label: '是'
                }, {
                    value: 'no',
                    label: '否'
                }],
            }
        },
        components: {
            ImageList
        },
        methods: {
            clickTab() {
                if (this.country == this.Japan) {
                    if (this.japanStatus < 1) {
                        this.getImages();
                    }

                    if (this.japanStatus < 10) {
                        this.getProducts();
                    }
                } else if (this.country == this.Korea) {
                    if (this.koreaStatus < 1) {
                        this.getImages();
                    }

                    if (this.koreaStatus < 10) {
                        this.getProducts();
                    }
                } else if (this.country == this.Thailand) {
                    if (this.thailandStatus < 1) {
                        this.getImages();
                    }

                    if (this.thailandStatus < 10) {
                        this.getProducts();
                    }
                }
            },
            getImages() {
                console.log("getImages: " + this.country);
                let t = this;
                this.fetch({
                    url: interfaces.carousels,
                    method: 'GET',
                    params: {
                        location: t.getLocationFromCountry(),
                    },
                    body : {
                        status: "01,02",
                    }
                }).then((res) => {
                    if (res.data && res.success == true) {
                        if (t.country == t.Japan) {
                            t.imagesJapan = res.data.carousels;
                            t.japanStatus = t.japanStatus + 1;
                        } else if (t.country == t.Korea) {
                            t.imagesKorea = res.data.carousels;
                            t.koreaStatus = t.koreaStatus + 1;
                        } else {
                            t.imagesThailand = res.data.carousels;
                            t.thailandStatus = t.thailandStatus + 1;
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
                var params, method, status;
                if (this.form.id == '') {
                    params = {}
                    method = "POST";
                    status = "02";
                } else {
                    params = {
                        id: this.form.id,
                    }
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
                    location: this.getLocationFromCountry(),
                    productId: "",
                    picPath: this.form.url,
                    status: status,
                    target: "",
                    targetId: ""
                }
                console.log("body:" + JSON.stringify(body));
                
                let t = this
                this.fetch({
                    url: interfaces.carousels,
                    method: method,
                    params: params,
                    data: body
                }).then((res) => {
                    if (res.data && res.success == true) {
                        if (t.form.id == '') {
                            //新建轮播图，添加到最后
                            if (t.country == t.Japan) {
                                t.imagesJapan.push({
                                    id: res.data.id,
                                    url: t.form.url,
                                    content: t.form.content
                                });
                            } else if (t.country == t.Korea) {
                                t.imagesKorea.push({
                                    id: res.data.id,
                                    url: t.form.url,
                                    content: t.form.content
                                });
                            } else {
                                t.imagesThailand.push({
                                    id: res.data.id,
                                    url: t.form.url,
                                    content: t.form.content
                                });
                            }
                        } else {
                            //更新轮播图
                            if (t.country == t.Japan) {
                                for (let i = 0; i < t.imagesJapan.length; i++) {
                                    if (t.imagesJapan[i].id === res.data.id) {
                                        t.imagesJapan[i].url = t.form.url;
                                        t.imagesJapan[i].content = t.form.content;
                                    }
                                }
                            } else if (t.country == t.Korea) {
                                for (let i = 0; i < t.imagesKorea.length; i++) {
                                    if (t.imagesKorea[i].id === res.data.id) {
                                        t.imagesKorea[i].url = t.form.url;
                                        t.imagesKorea[i].content = t.form.content;
                                    }
                                }
                            } else {
                                for (let i = 0; i < t.imagesThailand.length; i++) {
                                    if (t.imagesThailand[i].id === res.data.id) {
                                        t.imagesThailand[i].url = t.form.url;
                                        t.imagesThailand[i].content = t.form.content;
                                    }
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
                    url: interfaces.carousels + "/:id",
                    method: 'DELETE',
                    params: {
                        id: image.id
                    }
                }).then((res) => {
                    if (res.data && res.success == true) {
                        if (t.country == t.Japan) {
                            for (let i = 0; i < this.imagesJapan.length; i++) {
                                if (this.imagesJapan[i].id === image.id) {
                                    this.imagesJapan.splice(i, 1);
                                }
                            }
                        } else if (t.country == t.Korea) {
                            for (let i = 0; i < this.imagesKorea.length; i++) {
                                if (this.imagesKorea[i].id === image.id) {
                                    this.imagesKorea.splice(i, 1);
                                }
                            }
                        } else {
                            for (let i = 0; i < this.imagesThailand.length; i++) {
                                if (this.imagesThailand[i].id === image.id) {
                                    this.imagesThailand.splice(i, 1);
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
                        if (t.country == t.Japan) {
                            for (let i = 0; i < t.imagesJapan.length; i++) {
                                if (t.imagesJapan[i].id === image.id) {
                                    if (image.status == "01") {
                                        t.imagesJapan[i].status = "02";
                                    } else {
                                        t.imagesJapan[i].status = "01";
                                    }    
                                }
                            }
                        } else if (t.country == t.Korea) {
                            for (let i = 0; i < t.imagesKorea.length; i++) {
                                if (t.imagesKorea[i].id === image.id) {
                                    if (image.status == "01") {
                                        t.imagesKorea[i].status = "02";
                                    } else {
                                        t.imagesKorea[i].status = "01";
                                    }  
                                }
                            }
                        } else {
                            for (let i = 0; i < t.imagesThailand.length; i++) {
                                if (t.imagesThailand[i].id === image.id) {
                                    if (image.status == "01") {
                                        t.imagesThailand[i].status = "02";
                                    } else {
                                        t.imagesThailand[i].status = "01";
                                    }  
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
            getProducts() {
                console.log("getProducts: " + this.country);
                let t = this;
                this.fetch({
                    url: interfaces.products,
                    method: 'GET',
                    params: {
                        sort: "1",
                        nation: t.getNationFromCountry(),
                    }
                }).then((res) => {
                    if (res.data && res.success == true) {
                        if (t.country == t.Japan) {
                            t.JapanPrd = res.data.products;
                            t.japanStatus = t.japanStatus + 10;
                        } else if (t.country == t.Korea) {
                            t.KoreaPrd = res.data.products;
                            t.koreaStatus = t.koreaStatus + 10;
                        } else {
                            t.ThailandPrd = res.data.products;
                            t.thailandStatus = t.thailandStatus + 10;
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
            getLocationFromCountry() {
                if (this.country == this.Japan) {
                    return "02";
                } else if (this.country == this.Korea) {
                    return "03";
                } else if (this.country == this.Thailand) {
                    return "04";
                }
            },
            getNationFromCountry() {
                if (this.country == this.Japan) {
                    return "01";
                } else if (this.country == this.Korea) {
                    return "02";
                } else if (this.country == this.Thailand) {
                    return "03";
                }
            },
            changeProperty(value, index, type) {
                console.log("changeProperty: " + value + "   " + index + "   " + type);
                let t = this
                let data = new FormData();
                data.append('id', index);
                if (type == t.property.category) {
                    data.append("category", value);
                } else {
                    data.append("mainpage", value);
                }
                this.fetch({
                    url: interfaces.products,
                    method: 'POST',
                    data: data
                }).then((res) => {
                    if (res.data && res.success == true) {

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
            changeStatusPrd(prd) {
                var url;
                if (prd.status == "01") {
                    url = interfaces.carousels + "/" + prd.id +"/halt";
                } else {
                    url = interfaces.carousels + "/" + prd.id +"/awaken";
                }
                let t = this
                this.fetch({
                    url: url,
                    method: "PUT",
                }).then((res) => {
                    if (res.data && res.success == true) {
                        //更新轮播图
                        if (t.country == t.Japan) {
                            for (let i = 0; i < t.JapanPrd.length; i++) {
                                if (t.JapanPrd[i].id === prd.id) {
                                    if (prd.status == "01") {
                                        t.JapanPrd[i].status = "02";
                                    } else {
                                        t.JapanPrd[i].status = "01";
                                    }
                                        
                                }
                            }
                        } else if (t.country == t.Korea) {
                            for (let i = 0; i < t.KoreaPrd.length; i++) {
                                if (t.KoreaPrd[i].id === prd.id) {
                                    if (prd.status == "01") {
                                        t.KoreaPrd[i].status = "02";
                                    } else {
                                        t.KoreaPrd[i].status = "01";
                                    }
                                        
                                }
                            }
                        } else {
                            for (let i = 0; i < t.ThailandPrd.length; i++) {
                                if (t.ThailandPrd[i].id === prd.id) {
                                    if (prd.status == "01") {
                                        t.ThailandPrd[i].status = "02";
                                    } else {
                                        t.ThailandPrd[i].status = "01";
                                    }
                                        
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
            deletePrd(index, id) {
                let t = this
                this.fetch({
                    url: interfaces.products + "/" + id,
                    method: 'DELETE',
                }).then((res) => {
                    if (res.data && res.success == true) {
                        if (t.country == t.Japan) {
                            t.JapanPrd.splice(index, 1);
                        } else if (t.country == t.Korea) {
                            t.KoreaPrd.splice(index, 1);
                        } else if (t.country == t.Thailand) {
                            t.ThailandPrd.splice(index, 1);
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
        },
        mounted() {
            this.getImages();
            this.getProducts();
        }
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
    
    .button3 {
        color: red;
        padding: 0;
    }
    
    .button4 {
        color: green;
        padding: 0;
    }
</style>
