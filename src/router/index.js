import main from '@/app/common/main'
// 导入第三级菜单
// import third from '@/app/common/third'

let routes = [
    {
        path: '/',
        component: main,
        redirect: '/law/list'
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
            }
        ]
    },
    {
        path: '*',
        redirect: '/'
    }
]

export default routes
