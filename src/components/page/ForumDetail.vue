<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 帖子</el-breadcrumb-item>
                <el-breadcrumb-item>详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="userinfo">
                <a class='avatar'><img :src='avatar'></a>
                <a class="author">{{author}}</a>
                <span class='time'>{{time}}</span>
            </div>
            <div class="article-container">
                <h1 class="title">{{title}}</h1>
                <div class="counts">
                    <span style="font-size: 13px;">阅读 {{read}}</span>
                    <span style="margin-left: 10px; font-size: 13px;">评论 {{comment}}</span>
                    <span style="margin-left: 10px; font-size: 13px;">喜欢 {{like}}</span>
                </div>
                <div id="content" class="content" v-html="content">
                    {{content}}
                </div>
            </div>
            <div class="comment-container">
                <div class="comment-head">
                    {{comment}}条评论
                </div>
                <ul style="list-style: none;">
                    <li v-for="(comment,index) in comments" :key="index">
                        <div class="comment-item">
                            <div class="content">
                                <div class="meta-top">
                                    <a class="reply-avatar"><img :src='comment.iconPath'></a>
                                    <a class="reply-author">{{comment.userName}}</a>
                                    <span class="reply-time">
                                        {{comment.createdAt}}
                                    </span>
                                </div>
                                <p class="comment-content">{{comment.content}}</p>
                                <div class="comment-footer text-right"><a href="javascript:;" class="reply">屏蔽</a></div>
                                <div class="reply-list">
                                    <ul style="list-style: none;">
                                        <li v-for="(reply,index) in comment.replyList" :key="index">
                                            <div class="reply-item">
                                                <p class="reply-content">
                                                    <a class="reply-user link-light">{{reply.userName}}</a>
                                                    ：@{{comment.userName}} {{reply.content}}
                                                </p>
                                                <div class="reply-footer text-right">
                                                    <a href="javascript:;" class="reply">屏蔽</a>
                                                    <span class="reply-time pull-left">{{reply.createdAt}}</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        interfaces
    } from '../../service/interfaces'

    export default {
        name: 'forumdetail',
        data: function() {
            return {
                id: "",
                avatar: "",
                author: "",
                time: "",
                title: "",
                read: 0,
                comment: 0,
                like: 0,
                content: '',
                comments: []
            }
        },
        methods: {
            getDetail() {
                console.log("获取帖子详情: " + this.id);
                let t = this;
                this.fetch({
                    url: interfaces.posts + "/" + t.id,
                    method: 'GET',
                }).then((res) => {
                    if (res.data && res.success == true) {
                        //填写数据
                        t.time = res.data.createdAt;
                        t.title = res.data.title;
                        t.read = res.data.viewNum;
                        t.comment = res.data.commentNum;
                        t.like = res.data.thumbNum;
                        t.content = res.data.content;

                        this.getCommnets();
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
                    //                     res.data = {
                    //                         id: "3",
                    //                         avatar: "https://avatars.githubusercontent.com/u/19181780?v=3",
                    //                         author: "mixm",
                    //                         time: "2018-10-11",
                    //                         title: "docker 实践杂记",
                    //                         read: 8995,
                    //                         comment: 75,
                    //                         like: 13,
                    //                         content: '<div class="markdown-content"><h3>一,  私有docker镜像仓库的搭建</h3> <p > registry 增加认证机制 < /p> <pre > < code > mkdir / opt / registry / authdocker run--entrypoint htpasswd registry: 2 - Bbn username password & gt;/opt/registry / auth / htpasswddocker run - d - p 5000: 5000--restart = always--name registry\ -	v / opt / registry / auth: /auth \ -	e "REGISTRY_AUTH=htpasswd"\ -	e "REGISTRY_AUTH_HTPASSWD_REALM=Registry Realm"\ -	e REGISTRY_AUTH_HTPASSWD_PATH = /auth/htpasswd\registry: 2docker login localhost: 5000 <	/code></pre >	<	p > 使用https传输 < /p> <	pre > < code > docker run - d - p 5000: 5000--restart = always--name registry\ -	v / opt / registry / auth: /auth \ -	e "REGISTRY_AUTH=htpasswd"\ -	e "REGISTRY_AUTH_HTPASSWD_REALM=Registry Realm"\ -	e REGISTRY_AUTH_HTPASSWD_PATH = /auth/htpasswd\ -	v / opt / registry / certs: /certs \ -	v / opt / registry / data: /var/lib / registry -	e REGISTRY_HTTP_TLS_CERTIFICATE = /certs/domain.crt\ -	e REGISTRY_HTTP_TLS_KEY = /certs/domain.key\registry: 2docker login myregistrydomain.com: 5000 <	/code></pre >	<	h3 > 二,github添加钩子的两种方法 < /h3> <h4 > 1,是在jenkins任务中勾选 触发远程构建(例如, 使用脚本) 添加token,组成url,到github中添加webhook url,用户名和密码为jenkins的用户,在用户设置里可获取.url格式如下: < /h4> <	pre > < code > https: //jenkins_username:token@jenkins_domain/job/jenkins_job_name/build?token=jenkins_job_token	<	/code></pre >	<	h4 > 2,第二种是在github中添加jenkins service,得到url,会自动添加到webhooks,而在jenkins任务中由于添加了github plugin,只需要勾选 Build when a change is pushed to GitHub即可 < /h4> <p > 另外需要在全局中添认证github,此处可以借助github设置的token,并有repo相关的权限,将这个token添加到jenkins 认证里以secret text的形式. < /p> <h3 > 三,科学上网shadowsocks docker中运行. < /h3> <pre > < code > docker run - d - p 2016: 2016--restart = always oddrationale / docker - shadowsocks - s 0.0 .0 .0 -	p 2016 - k 密码 - m aes - 256 - cfb <	/code></pre >	<	h3 > 四,docker - compose安装 < /h3> <pre > < code > apt - get install python - pip python - devpip install - U docker - composechmod + x / usr / local / bin / docker - compose </code></pre ><h3 > 五,获取docker 容器IP < /h3> <pre > < code > docker inspect--format = "{{.NetworkSettings.IPAddress}}"$CONTAINER_ID </code></pre ><h3 > 六,在Jenkins容器内运行了Docker命令方法: < /h3> <	ul >	<	li > DooD（ Docker - outside - of -Docker） 特权模式 这里存在一个重大的安全问题： Jenkins用户对宿主具有root权限， 比如Jenkins可以创建装载宿主任意目录的容器。 因此， 务必确保这个容器只对受信用户访问， 并考虑使用VM来将Jekins与宿主其他部分隔离开。 <	/li> <	li > Docker in Docker（ DinD） DinD并不比使用特权模式的容器安全性高， 不过确实能避免使用sudo。 DinD最主要的劣势是你无法重用宿主缓存的镜像（ 不过如果需要为测试容器提供一个与宿主隔离的干净环境， 这将很有用）。 <	/li> <	li > 使用HTTPS与Docker后台程序通讯 通过HTTPS暴露socket不需要sudo并且可以使用宿主的镜像， 但因为打开了端口增加了攻击面， 可以说是最不安全的。 < /li> <	/ul> <	h3 > 七,jenkins 相关插件简介 < /h3> <h4 > 1,Docker build step plugin < /h4> <p > 对应配置面板: execute Docker commond作用: 可以添加Docker命令到构建步骤中； < /p> <	h4 > 2,CloudBees Docker Build and Publish plugin < /h4> <p > 对应配置面板: Docker build and publish作用: 提供通过Dockerfile构建工程的能力并将制作好的镜像发布到Docker仓库中； < /p> <	h4 > 3,Docker Plugin < /h4> <p > 作用: 可以使用Docker主机动态分配的容器作为Jenkins的从节点； < /p> <	h4 > 4,Kubernetes Plugin < /h4> <p > 作用： 通过由Kubernetes管理的多个Docker主机系统来动态分配的容器作为Jenkins的从节点；Kubernetes Plugin依赖了Docker Plugin < /p> <h4 > 5,Docker Commons Plugin < /h4> <p > 作用: 为其他与Docker相关的插件提供API； 其它docker插件依赖于它.CloudBees Docker Build and Publish plugin和Docker build step plugin都依赖了Docker commons Plugin < /p> <h3 > 八,jenkins 在容器中运行,挂载卷权限问题. < /h3> <pre > < code > sudo chown - R 1000: 1000 /	var / run / docker.socksudo chown - R 1000: 1000 /	var / jenkins_home <	/code></pre >	<	h3 > 九,Docker数据卷的备份和还原(利用数据卷容器来备份、 恢复、 迁移数据卷) < /h3> <h4 > 1,数据备份 < /h4> <pre > < code > $ docker run--volumes - from[container name] - v $(pwd): /backup ubuntu tar cvf /backup / backup.tar[		container data volume] <	/code></pre >	<	p > 上面的命令创建了一个容器， 该容器同时挂载了两个数据卷， 第一个数据卷是通过容器间接挂载的， 第二个容器是通过 - v选项指定的， 容器启动后就可以直接访问这两个容器， 这样就可以实现在该容器中将一个数据卷的数据拷贝到另一个数据卷中， 从而实现备份的目的。 <	/p> <	h4 > 2,数据还原 如果要恢复数据到一个容器， 首先创建一个带有空数据卷的容器[container name]。 < /h4> <pre > < code > $ docker run - itd - v / dbdata--name[container name] ubuntu / bin / bash$ docker run--volumes - from[container name] - v $(pwd): /backup ubuntu tar xvf /backup / backup.tar <	/code></pre >	<	p > 原理与数据备份一致， 只需要将压缩命令换成解压缩命令即可： < /p> <	/div>',
                    //                         comments: [{
                    //                             avatar: "https://avatars.githubusercontent.com/u/19181780?v=3",
                    //                             author: "mixm",
                    //                             time: "2018-10-11",
                    //                             content: "123",
                    //                             replyList: [{
                    //                                 author: "mixm",
                    //                                 content: "345",
                    //                                 time: "2018-10-11"
                    //                             }, {
                    //                                 author: "mixm",
                    //                                 content: "345",
                    //                                 time: "2018-10-11"
                    //                             }, {
                    //                                 author: "mixm",
                    //                                 content: "345",
                    //                                 time: "2018-10-11"
                    //                             }, {
                    //                                 author: "mixm",
                    //                                 content: "345",
                    //                                 time: "2018-10-11"
                    //                             }, {
                    //                                 author: "mixm",
                    //                                 content: "345",
                    //                                 time: "2018-10-11"
                    //                             }, {
                    //                                 author: "mixm",
                    //                                 content: "345",
                    //                                 time: "2018-10-11"
                    //                             }, {
                    //                                 author: "mixm",
                    //                                 content: "345",
                    //                                 time: "2018-10-11"
                    //                             }]
                    //                         }, {
                    //                             avatar: "https://avatars.githubusercontent.com/u/19181780?v=3",
                    //                             author: "mixm",
                    //                             time: "2018-10-11",
                    //                             content: "123",
                    //                             replyList: [{
                    //                                 author: "mixm",
                    //                                 content: "345",
                    //                                 time: "2018-10-11"
                    //                             }, {
                    //                                 author: "mixm",
                    //                                 content: "345",
                    //                                 time: "2018-10-11"
                    //                             }, {
                    //                                 author: "mixm",
                    //                                 content: "345",
                    //                                 time: "2018-10-11"
                    //                             }, {
                    //                                 author: "mixm",
                    //                                 content: "345",
                    //                                 time: "2018-10-11"
                    //                             }, {
                    //                                 author: "mixm",
                    //                                 content: "345",
                    //                                 time: "2018-10-11"
                    //                             }, {
                    //                                 author: "mixm",
                    //                                 content: "345",
                    //                                 time: "2018-10-11"
                    //                             }, {
                    //                                 author: "mixm",
                    //                                 content: "345",
                    //                                 time: "2018-10-11"
                    //                             }]
                    //                         }, {
                    //                             avatar: "https://avatars.githubusercontent.com/u/19181780?v=3",
                    //                             author: "mixm",
                    //                             time: "2018-10-11",
                    //                             content: "123",
                    //                             replyList: [{
                    //                                 author: "mixm",
                    //                                 content: "345",
                    //                                 time: "2018-10-11"
                    //                             }, {
                    //                                 author: "mixm",
                    //                                 content: "345",
                    //                                 time: "2018-10-11"
                    //                             }, {
                    //                                 author: "mixm",
                    //                                 content: "345",
                    //                                 time: "2018-10-11"
                    //                             }, {
                    //                                 author: "mixm",
                    //                                 content: "345",
                    //                                 time: "2018-10-11"
                    //                             }, {
                    //                                 author: "mixm",
                    //                                 content: "345",
                    //                                 time: "2018-10-11"
                    //                             }, {
                    //                                 author: "mixm",
                    //                                 content: "345",
                    //                                 time: "2018-10-11"
                    //                             }, {
                    //                                 author: "mixm",
                    //                                 content: "345",
                    //                                 time: "2018-10-11"
                    //                             }]
                    //                         }, {
                    //                             avatar: "https://avatars.githubusercontent.com/u/19181780?v=3",
                    //                             author: "mixm",
                    //                             time: "2018-10-11",
                    //                             content: "123",
                    //                             replyList: [{
                    //                                 author: "mixm",
                    //                                 content: "345",
                    //                                 time: "2018-10-11"
                    //                             }, {
                    //                                 author: "mixm",
                    //                                 content: "345",
                    //                                 time: "2018-10-11"
                    //                             }, {
                    //                                 author: "mixm",
                    //                                 content: "345",
                    //                                 time: "2018-10-11"
                    //                             }, {
                    //                                 author: "mixm",
                    //                                 content: "345",
                    //                                 time: "2018-10-11"
                    //                             }, {
                    //                                 author: "mixm",
                    //                                 content: "345",
                    //                                 time: "2018-10-11"
                    //                             }, {
                    //                                 author: "mixm",
                    //                                 content: "345",
                    //                                 time: "2018-10-11"
                    //                             }, {
                    //                                 author: "mixm",
                    //                                 content: "345",
                    //                                 time: "2018-10-11"
                    //                             }]
                    //                         }, {
                    //                             avatar: "https://avatars.githubusercontent.com/u/19181780?v=3",
                    //                             author: "mixm",
                    //                             time: "2018-10-11",
                    //                             content: "123",
                    //                             replyList: [{
                    //                                 author: "mixm",
                    //                                 content: "345",
                    //                                 time: "2018-10-11"
                    //                             }, {
                    //                                 author: "mixm",
                    //                                 content: "345",
                    //                                 time: "2018-10-11"
                    //                             }, {
                    //                                 author: "mixm",
                    //                                 content: "345",
                    //                                 time: "2018-10-11"
                    //                             }, {
                    //                                 author: "mixm",
                    //                                 content: "345",
                    //                                 time: "2018-10-11"
                    //                             }, {
                    //                                 author: "mixm",
                    //                                 content: "345",
                    //                                 time: "2018-10-11"
                    //                             }, {
                    //                                 author: "mixm",
                    //                                 content: "345",
                    //                                 time: "2018-10-11"
                    //                             }, {
                    //                                 author: "mixm",
                    //                                 content: "345",
                    //                                 time: "2018-10-11"
                    //                             }]
                    //                         }]
                    //                     }
                    //                     //填写数据
                    //                     t.id = res.data.id;
                    //                     t.avatar = res.data.avatar;
                    //                     t.author = res.data.author;
                    //                     t.time = res.data.createdAt;
                    //                     t.title = res.data.title;
                    //                     t.read = res.data.viewNum;
                    //                     t.comment = res.data.commentNum;
                    //                     t.like = res.data.thumbNum;
                    //                     t.comment = res.data.content;
                    //                     t.comments = res.data.comments;
                });
            },
            getCommnets() {
                console.log("获取帖子评价列表: " + this.id);
                let t = this;
                this.fetch({
                    url: interfaces.comments,
                    method: 'GET',
                    params: {
                        target: "02",
                        targetId: this.id,
//                         page: 1,
//                         number: 20
                    }
                }).then((res) => {
                    if (res.data && res.success == true) {
                        //填写数据
                        t.comments = res.data;
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
        created() {
            this.id = this.$route.query.id;
            this.avatar = this.$route.query.iconPath;
            this.author = this.$route.query.userName;
            console.log(this.id + "..." + this.avatar + "..." + this.author);
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
        height: 100%;
        overflow-y: scroll;
    }

    .userinfo {
        display: block;
        margin-left: -20px;
    }

    .avatar {
        float: left;
        display: inline-block;
        width: 50px;
        height: 50px;
        margin-right: 10px;
    }

    img {
        width: 100%;
        height: 100%;
        border: none;
    }

    .author {
        display: block;
        font-size: 20px;
        color: steelblue;
    }

    .time {
        position: relative;
        top: 2px;
        margin-top: 3px;
        font-size: 14px;
    }

    .article-container {
        display: block;
    }

    .title {
        word-break: break-all;
        font-size: 2.2em;
        font-weight: bold;
        line-height: 1.5;
        margin-top: 20px;
        margin-bottom: 10px;
        font-family: inherit;
    }

    .content {
        font-size: 16px;
        font-weight: normal;
        line-height: 1.7;
    }

    .comment-container {
        margin-top: 40px;
        margin-bottom: 30px;
        font-size: 13px;
    }

    .comment-head {
        margin-bottom: 25px;
        border-top-width: 1px;
        border-top-style: solid;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        line-height: 52px;
        font-size: 12px;
        border-color: #d9d9d9;
    }

    .reply-avatar {
        float: left;
        display: inline-block;
        width: 40px;
        height: 40px;
        margin-right: 10px;
    }

    img {
        width: 100%;
        height: 100%;
        border: none;
    }

    .reply-author {
        display: block;
        font-size: 14px;
        color: #4094c7;
    }

    .reply-time {
        position: relative;
        top: 2px;
        margin-top: 3px;
        font-size: 12px;
    }

    .comment-item {
        margin-bottom: 20px;
        border-color: #d9d9d9;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        font-size: 16px;
        line-height: 1.5;
    }

    .meta-top {
        padding-top: 10px;
        margin: 0 0 10px;
    }

    .comment-content {
        word-break: break-all;
        word-wrap: break-word;
        margin: 0 0 10px;
    }

    .comment-footer {
        margin-bottom: 10px;

    }

    .text-right {
        text-align: right;
    }

    a {
        margin-left: 14px;
        font-size: 12px;
        color: #999;
    }

    .reply-list {
        margin-bottom: 30px;
        margin-top: 10px;
        border-top-width: 1px;
        border-top-style: dashed;
        border-color: #d9d9d9;
        font-size: 13px;
    }

    .reply-item {
        border-color: #d9d9d9;
        padding: 15px 0px 15px 10px;
        border-bottom-width: 1px;
        border-bottom-style: dashed;
        border-left-width: 3px;
        border-left-style: solid;
        font-size: 13px;
    }

    p {
        margin: 0 0 10px;
        display: block;
    }

    .link-light {
        color: #4094c7;
    }

    .reply-footer {
        margin-bottom: 10px;
    }

    .pull-left {
        float: left !important;
        margin-left: 20px;
    }
</style>
