/* eslint-disable import/no-duplicates */
import main from '@/app/common/main'
// 导入第三级菜单
// import third from '@/app/common/third'

let routes = [
    {
        path: '/',
        component: main,
        redirect: '/index',
        children: [
            {
                path: '/index',
                name: '目录',
                component: resolve => require(['@/app/common/index'], resolve)
            },
            {
                path: '/error',
                name: '出错了',
                component: resolve => require(['@/app/common/error'], resolve)
            },
            {
                path: '/net-error',
                name: '连接失败',
                component: resolve => require(['@/app/common/net-error'], resolve)
            }
        ]
    },
    {
        path: '/law',
        component: main,
        name: '法律法规1',
        children: [
            {
                path: '/law/list',
                name: '法律法规',
                component: resolve => require(['@/app/page/law/law-list'], resolve)
            },
            {
                path: '/law/detail/:id',
                name: '法律法规详情',
                component: resolve => require(['@/app/page/law/law-detail'], resolve)
            },
            {
                path: '/law/detail-new',
                name: '中华人民共和国人民刑法',
                component: resolve => require(['@/app/page/law/detail'], resolve)
            }
        ]
    },
    {
        path: '/news',
        component: main,
        children: [
            {
                path: '/news/detail/:id',
                name: '新闻详情',
                component: resolve => require(['@/app/page/news/news-detail'], resolve)
            }
        ]
    },
    {
        path: '/prison',
        component: main,
        children: [
            {
                path: '/prison/detail/:id',
                name: '监狱详情',
                component: resolve => require(['@/app/page/prison/prison-detail'], resolve)
            },
            {
                path: '/affairs/detail/:id',
                name: '狱务公开详情',
                component: resolve => require(['@/app/page/prison/affairs-detail'], resolve)
            }
        ]
    },
    {
        path: '/guidance',
        component: main,
        children: [
            {
                path: '/guidance/guidance-detail',
                name: '自启动权限设置引导',
                component: resolve => require(['@/app/page/guidance/guidance-detail'], resolve)
            }
        ]
    },
    {
        path: '/meeting-notification',
        component: main,
        children: [
            {
                path: '/meeting-notification/detail',
                name: '会见告知书详情页',
                component: resolve => require(['@/app/page/meeting-notification'], resolve)
            }
        ]
    },
    {
        path: '/download',
        name: '国科服务APP下载',
        component: resolve => require(['@/app/page/download'], resolve)
    },
    {
        path: '/provice-notice',
        name: 'ProvinceNotice',
        component: resolve => require(['@/app/page/province-notices'], resolve)
    },
    {
        path: '/operations',
        component: main,
        name: '国科运维',
        children: [
            {
                path: '/operations/list',
                name: '国科运维',
                component: resolve => require(['@/app/page/operations/index'], resolve)
            },
            {
                path: '/operations/detail',
                name: '国科运维详情',
                component: resolve => require(['@/app/page/operations/detail'], resolve)
            },
            {
                path: '/operations/add',
                name: '国科运维',
                component: resolve => require(['@/app/page/operations/add'], resolve)
            },
            {
                path: '/operations/reply/:id',
                name: '国科运维',
                component: resolve => require(['@/app/page/operations/reply'], resolve)
            }
        ]
    },
    {
        path: '*',
        redirect: '/'
    }
]

export default routes
