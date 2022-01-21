// eslint-disable-next-line
const env = CURRENT_ENV
const config = {
    dev: {
        apiHost: 'http://qa-ywgk.yuwugongkai.com',
        apiPath: '/ywgk/api',
        yangguangApiHost: 'http://120.78.190.101:8113',
        yangguangApiPath: '/sunjail',
        opeartionApiHost: 'http://39.104.161.9:9999',
        opeartionApiPath: '/problem',
        publicApiHost: 'http://qa-auth-api.yuwugongkai.com',
        gkConferenceHost: 'http://qa-convention-api.yuwugongkai.com',
        gkConferenceClientKey: '8adabdb81bc84fc987cec5e569383635',
        gkWorkApi: '/gkWorkApi', // 本地启服务用
        // gkWorkApi: 'https://139.159.158.173/api', // 国科运维测试环境打包用
        downloadApkUrl: 'https://www.yuwugongkai.com/app/yuwutong_g.apk?from=wechat' // 国科服务 app（新疆版 qa环境发版使用)
    },
    production: {
        apiHost: 'https://www.yuwugongkai.com',
        apiPath: '/ywgk/api',
        yangguangApiHost: 'https://sunjail-api.yuwugongkai.com',
        yangguangApiPath: '/sunjail',
        opeartionApiHost: 'http://39.104.161.9:9999',
        opeartionApiPath: '/problem',
        publicApiHost: 'https://auth-api.yuwugongkai.com',
        gkConferenceHost: 'https://convention-api.yuwugongkai.com',
        gkConferenceClientKey: '4953a771a7ed4da1a5700933a4c83570',
        gkWorkApi: 'https://rongyun.yuwugongkai.com:11451/api',
        downloadApkUrl: 'https://www.yuwugongkai.com/app/yuwutong_f.apk?from=wechat' // 国科服务 app
    },
    auth: {
        apiHost: 'http://192.168.0.230:8088',
        apiPath: '/ywgk-auth/api'
    }
}
export default {
    ...config[env]
}
