// eslint-disable-next-line
const env = CURRENT_ENV
const config = {
    dev: {
        apiHost: 'http://qa-ywgk.yuwugongkai.com',
        apiPath: '/ywgk/api',
        yangguangApiHost: 'http://120.78.190.101:8113',
        yangguangApiPath: '/sunjail'
    },
    production: {
        apiHost: 'https://www.yuwugongkai.com',
        apiPath: '/ywgk/api',
        yangguangApiHost: 'https://sunjail-api.yuwugongkai.com',
        yangguangApiPath: '/sunjail'
    },
    auth: {
        apiHost: 'http://192.168.0.230:8088',
        apiPath: '/ywgk-auth/api'
    }
}
export default {
    ...config[env]
}
