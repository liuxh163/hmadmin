<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <!-- <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item> -->
                <el-form-item prop="telephone">
                    <el-input v-model="ruleForm.telephone" placeholder="telephone">
                        <el-button slot="prepend" icon="el-icon-phone"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {
        interfaces
    } from '../../service/interfaces'
    import axios from 'axios'

    export default {
        data: function() {
            return {
                ruleForm: {
                    telephone: "13718863263",
                    username: 'admin',
                    password: 'admin'
                },
                rules: {
                    telephone: [{
                        required: true,
                        message: '请输入手机号',
                        trigger: 'blur'
                    }],
                    username: [{
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }]
                }
            }
        },
        methods: {
            //             注册: {
            //                 "success": true,
            //                 "status": 200,
            //                 "errcode": "",
            //                 "message": "",
            //                 "data": {
            //                     "id": 3
            //                 }
            //             }

            submitForm(formName) {
                console.log("管理员登录: " + this.ruleForm.telephone);
                let t = this;
                this.fetch({
                    url: interfaces.admin + "/login",
                    method: "PUT",
                    data: {
                        telephone: t.ruleForm.telephone,
                        password: t.ruleForm.password
                    }
                }).then((res) => {
                    if (res.data && res.success == true) {
                        localStorage.setItem('ms_username',this.ruleForm.telephone);
                        localStorage.setItem('hmtoken', res.data.accessToken);
                        axios.defaults.headers.common['hmtoken'] = res.data.accessToken;
                        this.$router.push('/');
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
                    console.log('error：' + res);
                    this.$message({
                        showClose: true,
                        message: '服务器繁忙，请稍后再试',
                        type: 'error'
                    });
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url(../../assets/login-bg.jpg);
        background-size: 100%;
    }

    .ms-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 350px;
        margin: -190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
    }

    .ms-content {
        padding: 30px 30px;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }

    .login-tips {
        font-size: 12px;
        line-height: 30px;
        color: #fff;
    }
</style>
