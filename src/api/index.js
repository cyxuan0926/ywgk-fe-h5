import axios from 'axios'
import resCode from './resCode'
import store from '@/store'

let state = ''
// const baseUrl = 'https://www.yuwugongkai.com/ywgk/api'
// const baseUrl = 'http://120.78.190.101:8081/ywgk/api' // 测试
const baseUrl = 'http://120.78.190.101:8083/ywgk-demo/api' // 演示
// const baseUrl = 'http://120.78.190.101:8085/ywgk-auth/api' // 认证授权
// const baseUrl = 'http://120.78.190.101:8083/ywgk-demo/api' // 演示
// const baseUrl = 'http://120.78.190.101:8085/ywgk-auth/api'
// axios.defaults.baseURL = 'http://39.108.185.51:8081/ywgk'
const handleApiErr = (res) => {
    if (res.status && res.status >= 500) {
        router.replace({ path: '/net-error', query: { r: router.currentRoute.fullPath } })
        return
    }
    let prev = resCode[res.status === 200 ? res.data.code : res.status]
    if (!prev) {
        return res.data ? (res.data.msg ? res.data.msg : res.data) : (res.message ? res.message : '')
    }
    prev.do && prev.do(res)
    if (prev.next !== false) return res.data
}

axios.interceptors.request.use(
    config => {
        state = history.state
        store.dispatch('showLoading')
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

axios.interceptors.response.use(
    response => {
        store.dispatch('hideLoading')
        if (state && history.state.key !== state.key) return
        return handleApiErr(response)
    },
    error => {
        store.dispatch('hideLoading')
        if (state && history.state.key !== state.key) return
        if (error.response) {
            return handleApiErr(error.response)
        }
        return handleApiErr(error)
    }
)

export const apiList = {
    otherType: params => { // 其他请求方式
        let str = params.method === 'get' ? 'params' : 'data'
        return axios({ method: params.method, url: `${ params.url }`, [str]: params.options }).then(res => res)
    },
    getLawList: params => {
        return axios.get(`${ baseUrl }/laws/list`, { params: { jailId: 2 } }).then(res => res.code === 200 && res.data)
        // return axios.get('https://www.yuwugongkai.com/ywgk/api/laws/list', { params: { jailId: 2 } }).then(res => res.code === 200 && res.data)
    },
    getLawRelated: (params) => {
        return axios.get(`${ baseUrl }/laws/related`, { params: { prisonerId: params } }).then(res => res && res.data)
    },
    getLawDetail: params => {
        return axios.get(`${ baseUrl }/laws/details`, { params: { id: params } }).then(res => res && res.data)
    },
    getNewsDetail: params => {
        return axios.get(`${ baseUrl }/news/details?id=${ params }`).then(res => res)
    },
    getPrisonDetail: params => {
        return axios.get(`${ baseUrl }/jails/details?id=${ params }`).then(res => res)
    },
    testPost: params => { // post请求
        return axios.post(`${ baseUrl }/testUrl`, params).then(res => res)
    }
}
