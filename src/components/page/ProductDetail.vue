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
                <el-step title="体验注意事项" description=""></el-step>
                <el-step title="轻松行程" description=""></el-step>
                <el-step title="费用说明" description=""></el-step>
                <el-step title="预定须知" description=""></el-step>
                <el-step title="医院介绍" description=""></el-step>
                <el-step title="基础项目" description=""></el-step>
                <el-step title="专家团队" description=""></el-step>
                <el-step title="运行活动" description=""></el-step>
            </el-steps>
            
            <div v-if="step == 1">
                <step1></step1>
            </div>
            <div v-else-if="step == 2">
                <step2></step2>
            </div>
            <div v-else-if="step == 3">
                <step3></step3>
            </div>
            <div v-else-if="step == 4">
                <step4></step4>
            </div>
            <div v-else-if="step == 5">
                <step5></step5>
            </div>
            <div v-else-if="step == 6">
                <step6></step6>
            </div>
            <div v-else-if="step == 7">
                <step7></step7>
            </div>
            <div v-else-if="step == 8">
                <step8></step8>
            </div>
            <div v-else-if="step == 9">
                <step9></step9>
            </div>
            <div v-else-if="step == 10">
                <step10></step10>
            </div>
            
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
    import step1 from '@/components/page/detail/step1'
    import step2 from '@/components/page/detail/step2'
    import step3 from '@/components/page/detail/step3'
    import step4 from '@/components/page/detail/step4'
    import step5 from '@/components/page/detail/step5'
    import step6 from '@/components/page/detail/step6'
    import step7 from '@/components/page/detail/step7'
    import step8 from '@/components/page/detail/step8'
    import step9 from '@/components/page/detail/step9'
    import step10 from '@/components/page/detail/step10'


    export default {
        name: 'productdetail',
        data: function() {
            return {
                isRouter: false,
                step: 1,
                preStep: false,
                nextStep: true,
                publish: true,
                id: "",
                nation: ""
            }
        },
        components: {
            step1, step2, step3, step4, step5, step6, step7, step8, step9, step10
        },
        methods: {
            ...mapMutations([
                'setPrdInfo', "setPrdTags"
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
                        this.publish = true;
                        break;
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                        this.preStep = true;
                        this.nextStep = true;
                        this.publish = true;
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
                console.log("发布产品: " + this.prdinfo.id);
                var data = this.prdinfo;
                var method, url, type;
                if (this.id == '' || this.id == undefined) {
                    type = "01";
                    url = interfaces.products;
                    method = "POST";
                    data.status = "02";
                    data.nation = this.nation;
                    delete data.id;
                } else {
                    type = "02";
                    url = interfaces.products + "/" + data.id;
                    method = "PUT";
                }
                console.log("data:" + JSON.stringify(data));
                let t = this;
                this.fetch({
                    url: url,
                    method: method,
                    data: data
                }).then((res) => {
                    if (res.data && res.success == true) {
                        var message;
                        if (type == '01') {
                            message = "产品创建成功"
                        } else {
                            message = "更新产品成功"
                        }
                        this.$message({
                            showClose: true,
                            message: message,
                            type: 'success'
                        });
                        // this.$router.go(-1);
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
            getDetail() {
                console.log("getDetail: " + this.id);
                let t = this;
                this.fetch({
                    url: interfaces.products + "/" + this.id,
                    method: 'GET',
                }).then((res) => {
                    if (res.data && res.success == true) {
                        //填写数据
                        this.setPrdInfo(res.data);
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
            console.log("id: " + this.id);
            if (this.id != '' && this.id != undefined) {
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
