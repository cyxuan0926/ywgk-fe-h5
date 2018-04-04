import main from '@/app/common/main'
// 导入第三级菜单
// import third from '@/app/common/third'

let routes = [
    {
        path: '/',
        component: main,
        hidden: true,
        children: [
            {
                path: '/',
                name: '法律法规',
                component: resolve => require(['@/app/page/law-list'], resolve),
                alias: '/index'
            },
            {
                path: '/law-detail',
                name: '法律法规详情',
                component: resolve => require(['@/app/page/law-detail'], resolve)
            }
        ]
    },
    {
        path: '*',
        redirect: '/'
    }
]

export default routes
