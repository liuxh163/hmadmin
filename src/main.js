import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import '../static/css/icon.css';
import "babel-polyfill";
import store from './store/store.js'

import {
    ip,
    port
} from './service/server'
// axios导入
import axios from 'axios'
// axios定义
axios.defaults.withCredentials = true
axios.defaults.timeout = 15000
axios.defaults.baseURL = 'http://' + ip + ':' + port
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.common['hmtoken'] = localStorage.getItem('hmtoken')
// axios.defaults.headers.common['hmtoken'] = '3443a800-11b6-11e9-8b67-5777d365f015';
// http response 拦截器
axios.interceptors.response.use(
    response => {
        // console.log("interceptors response");
        return response
    },
    error => {
        console.log('interceptors error:' + error)
        return Promise.reject(error)
    })

Vue.use(ElementUI, {
    size: 'small'
});
Vue.prototype.$axios = axios;

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
})

Vue.prototype.fetch = function(options) {
    return new Promise((resolve, reject) => {
        //                 const instance = axios.create({ // instance创建一个axios实例，可以自定义配置，可在 axios文档中查看详情
        //                     // 所有的请求都会带上这些配置，比如全局都要用的身份信息等。
        //                     headers: {
        //                         'Content-Type': 'application/json;charset=UTF-8;'
        //                     },
        //                     timeout: 50 * 1000 // 20秒超时
        //                 })
        //                 instance(options)
        //                     .then(response => { // then 请求成功之后进行什么操作
        //                         if (response.data.status == 200) {} else {}
        //                         resolve(response.data) // 把请求到的数据发到引用请求的地方
        //                     })
        //                     .catch(error => {
        //                         console.log('interceptors error:' + error)
        //                         reject(error)
        //                     })

        axios.request(options)
            .then(response => { // then 请求成功之后进行什么操作
                if (response.data.status == 200) {} else {}
                resolve(response.data) // 把请求到的数据发到引用请求的地方
            })
            .catch(error => {
                console.log('interceptors error:' + error)
                reject(error)
            })
    })
}

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
