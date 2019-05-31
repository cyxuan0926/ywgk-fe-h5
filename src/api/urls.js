// eslint-disable-next-line
const env = CURRENT_ENV
const config = {
    dev: {
        apiHost: 'http://120.79.251.238:8021',
        apiPath: '/ywgk/api'
    },
    production: {
        apiHost: 'https://www.yuwugongkai.com',
        apiPath: '/ywgk/api'
    }
}
export default {
    ...config[env]
}
