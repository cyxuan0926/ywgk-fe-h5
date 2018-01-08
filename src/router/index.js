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
                name: '主页',
                component: resolve => require(['@/app/test/test'], resolve),
                alias: '/index'
            }
        ]
    },
    {
        path: '/test',
        component: main,
        hidden: true,
        name: '用户',
        children: [
            {
                path: '/test/test',
                name: '测试',
                component: resolve => require(['@/app/test/test'], resolve)
            }
        ]
    },
    {
        path: '/page',
        component: main,
        children: [
            {
                path: '/page/readme',
                name: 'readme',
                component: resolve => require(['@/app/page/readme'], resolve)
            },
            {
                path: '/shopping/setting',
                name: '店铺设置',
                component: resolve => require(['@/app/page/readme'], resolve)
            },
            {
                path: '/shopping/template',
                name: '模板',
                component: resolve => require(['@/app/test/test'], resolve)
            }
        ]
    }
]

export default routes
