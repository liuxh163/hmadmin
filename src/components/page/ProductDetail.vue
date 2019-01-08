<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 产品</el-breadcrumb-item>
                <el-breadcrumb-item>详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">

            <el-steps :active="step" class="step" align-center>
                <el-step title="基本信息" description=""></el-step>
                <el-step title="行程亮点" description=""></el-step>
                <el-step title="体验介绍" description=""></el-step>
                <el-step title="轻松行程" description=""></el-step>
                <el-step title="费用说明" description=""></el-step>
                <el-step title="预定须知" description=""></el-step>
                <el-step title="医院介绍" description=""></el-step>
                <el-step title="基础项目" description=""></el-step>
                <el-step title="可选项目" description=""></el-step>
                <el-step title="专家团队" description=""></el-step>
            </el-steps>

            <transition name="fade">
                <router-view class="view"></router-view>
            </transition>

            <el-button style="margin-top: 12px; margin-left: 50px" v-show="preStep" @click.native.prevent="handlePreStep">上一步</el-button>
            <el-button style="margin-top: 12px; margin-left: 50px;" v-show="nextStep" @click.native.prevent="handleNextStep">下一步</el-button>
            <el-button style="margin-top: 12px; margin-left: 50px" v-show="publish" @click.native.prevent="handlePublish">发布</el-button>
        </div>
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


    export default {
        name: 'productdetail',
        data: function() {
            return {
                isRouter: false,
                step: 1,
                preStep: false,
                nextStep: true,
                publish: false,
                id: "",
                nation: ""
            }
        },
        methods: {
            ...mapMutations([
                'setPrdInfo'
            ]),
            handlePreStep() {
                console.log('handlePreStep');
                this.$router.go(-1);
                this.step--;
                this.goStep(this.step);
                $('html,body').animate({
                    scrollTop: 0
                }, 500);
            },
            handleNextStep() {
                console.log('handleNextStep');
                this.$router.push('/detail/step' + (this.step + 1));
                var _this = this;
                setTimeout(function() {
                    if (_this.isRouter) {
                        _this.step++;
                        _this.goStep(_this.step);
                    }
                })
                $('html,body').animate({
                    scrollTop: 0
                }, 500);
            },
            goStep(n) {
                console.log("step:" + n);
                switch (n) {
                    case 1:
                        this.preStep = false;
                        this.nextStep = true;
                        this.publish = false;
                        break;
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                        this.preStep = true;
                        this.nextStep = true;
                        this.publish = false;
                        break;
                    case 7:
                    case 8:
                    case 9:
                        this.preStep = true;
                        this.nextStep = true;
                        this.publish = true;
                        break;
                    case 10:
                        this.preStep = true;
                        this.nextStep = false;
                        this.publish = true;
                        break;
                }
            },
            handlePublish: function() {
                console.log('发布');
            },
            getDetail() {
                console.log("getDetail: " + this.id);
                let t = this;
                this.fetch({
                    url: interfaces.products + "/" + this.id,
                    method: 'GET',
                }).then((res) => {
                    if (res.data && res.success == true) {
                        //填写数据
                        this.prdinfo = res.data;
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
                    res = {
                        data: {
                            desc: '这事测试数据',
                            cost: 1000,
                            legalProtection: true,
                            advanceCompensation: true,
                            installment: true,
                            lowsetCost: 3990,
                            travelCard: true,
                            tags: [{
                                name: "123"
                            }, {
                                name: "333"
                            }],
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
                            }]
                        }
                    };
                    this.setPrdInfo(res.data);
                });
            }
        },
        watch: {
            '$route': function(to, from) {
                this.isRouter = true;
            }
        },
        created() {
            this.id = this.$route.query.id;
            this.nation = this.$route.query.nation;
        },
        computed: {
            ...mapState([
                'prdinfo'
            ]),
        },
        mounted() {
            if (this.id != '') {
                this.getDetail();
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
</style>
