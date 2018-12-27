import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	routes: [{
			path: '/',
			redirect: '/mainpage'
		},
		{
			path: '/',
			component: resolve => require(['../components/common/Home.vue'], resolve),
			meta: {
				title: '自述文件'
			},
			children: [{
					path: '/mainpage',
					component: resolve => require(['../components/page/MainPage.vue'], resolve),
					meta: {
						title: '首页'
					}
				},
				{
					path: '/products',
					component: resolve => require(['../components/page/Products.vue'], resolve),
					meta: {
						title: '产品信息'
					}
				},
				{
					path: '/product/detail',
					component: resolve => require(['../components/page/ProductDetail.vue'], resolve),
					meta: {
						title: '产品详情'
					},
					children: [{
						path: '',
						component: resolve => require(['../components/page/detail/step1.vue'], resolve),
						meta: {
							title: '基本信息'
						}
					}, {
						path: '/detail/step1',
						component: resolve => require(['../components/page/detail/step1.vue'], resolve),
						meta: {
							title: '基本信息'
						}
					}, {
						path: '/detail/step2',
						component: resolve => require(['../components/page/detail/step2.vue'], resolve),
						meta: {
							title: '行程亮点'
						}
					}, {
						path: '/detail/step3',
						component: resolve => require(['../components/page/detail/step3.vue'], resolve),
						meta: {
							title: '体检介绍'
						}
					}, {
						path: '/detail/step4',
						component: resolve => require(['../components/page/detail/step4.vue'], resolve),
						meta: {
							title: '轻松行程'
						}
					}, {
						path: '/detail/step5',
						component: resolve => require(['../components/page/detail/step5.vue'], resolve),
						meta: {
							title: '费用说明'
						}
					}, {
						path: '/detail/step6',
						component: resolve => require(['../components/page/detail/step6.vue'], resolve),
						meta: {
							title: '预定须知'
						}
					}]
				},
                {
                	path: '/personnel',
                	component: resolve => require(['../components/page/Personnel.vue'], resolve),
                	meta: {
                		title: '翻译服务'
                	}
                },
                {
                	path: '/personnel/detail',
                	component: resolve => require(['../components/page/PersonnelDetail.vue'], resolve),
                	meta: {
                		title: '翻译人员'
                	}
                },
                {
                	path: '/forum',
                	component: resolve => require(['../components/page/Forum.vue'], resolve),
                	meta: {
                		title: '论坛服务'
                	}
                },
                {
                	path: '/forum/detail',
                	component: resolve => require(['../components/page/ForumDetail.vue'], resolve),
                	meta: {
                		title: '帖子详情'
                	}
                },
				{
					path: '/dashboard',
					component: resolve => require(['../components/page/Dashboard.vue'], resolve),
					meta: {
						title: '系统首页'
					}
				},
				{
					path: '/icon',
					component: resolve => require(['../components/page/Icon.vue'], resolve),
					meta: {
						title: '自定义图标'
					}
				},
				{
					path: '/table',
					component: resolve => require(['../components/page/BaseTable.vue'], resolve),
					meta: {
						title: '基础表格'
					}
				},
				{
					path: '/tabs',
					component: resolve => require(['../components/page/Tabs.vue'], resolve),
					meta: {
						title: 'tab选项卡'
					}
				},
				{
					path: '/form',
					component: resolve => require(['../components/page/BaseForm.vue'], resolve),
					meta: {
						title: '基本表单'
					}
				},
				{
					// 富文本编辑器组件
					path: '/editor',
					component: resolve => require(['../components/page/VueEditor.vue'], resolve),
					meta: {
						title: '富文本编辑器'
					}
				},
				{
					// markdown组件
					path: '/markdown',
					component: resolve => require(['../components/page/Markdown.vue'], resolve),
					meta: {
						title: 'markdown编辑器'
					}
				},
				{
					// 图片上传组件
					path: '/upload',
					component: resolve => require(['../components/page/Upload.vue'], resolve),
					meta: {
						title: '文件上传'
					}
				},
				{
					// vue-schart组件
					path: '/charts',
					component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
					meta: {
						title: 'schart图表'
					}
				},
				{
					// 拖拽列表组件
					path: '/drag',
					component: resolve => require(['../components/page/DragList.vue'], resolve),
					meta: {
						title: '拖拽列表'
					}
				},
				{
					// 权限页面
					path: '/permission',
					component: resolve => require(['../components/page/Permission.vue'], resolve),
					meta: {
						title: '权限测试',
						permission: true
					}
				},
				{
					path: '/404',
					component: resolve => require(['../components/page/404.vue'], resolve),
					meta: {
						title: '404'
					}
				},
				{
					path: '/403',
					component: resolve => require(['../components/page/403.vue'], resolve),
					meta: {
						title: '403'
					}
				}
			]
		},
		{
			path: '/login',
			component: resolve => require(['../components/page/Login.vue'], resolve)
		},
		{
			path: '*',
			redirect: '/404'
		}
	]
})
