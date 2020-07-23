// eslint-disable-next-line
const env = CURRENT_ENV
const config = {
    dev: {
        apiHost: 'http://qa-ywgk.yuwugongkai.com',
        apiPath: '/ywgk/api'
    },
    production: {
        apiHost: 'https://www.yuwugongkai.com',
        apiPath: '/ywgk/api'
    },
    auth: {
        apiHost: 'http://192.168.0.230:8088',
        apiPath: '/ywgk-auth/api'
    }
}
export default {
    ...config[env]
}
