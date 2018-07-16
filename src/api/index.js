import axios from 'axios'
import resCode from './resCode'

let state = ''
// const baseUrl = 'https://www.yuwugongkai.com/ywgk/api'
const baseUrl = '/ywgk/api' // 测试
// const baseUrl = 'http://123.57.7.159:8083/ywgk-demo/api' // 演示
// axios.defaults.baseURL = 'http://39.108.185.51:8081/ywgk'
const handleApiErr = (res) => {
    if (!res.status) {
        return res.message
    }
    let prev = resCode[res.status === 200 ? res.data.code : res.status]
    if (!prev) {
        console.log(res)
        return res.data ? (res.data.msg ? res.data.msg : res.data) : (res.message ? res.message : '')
    }
    prev.do && prev.do(res.data)
    if (prev.next !== false) return res.data
}

axios.interceptors.request.use(
    config => {
        state = history.state
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

axios.interceptors.response.use(
    response => {
        if (state && history.state.key !== state.key) return
        return handleApiErr(response)
    },
    error => {
        if (state && history.state.key !== state.key) return
        if (error.response) {
            console.log(error.response.status)
            return handleApiErr(error.response)
        }
        else if (error.request) {
            console.log(error.request)
        }
        else {
            console.log('Error', error.message)
        }
        console.log(error.config)
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
        return axios.get(`${ baseUrl }/laws/related`, { params: { prisonerId: params } }).then(res => {
            if (typeof res === 'string') return res
            return res.code === 200 && res.data
        })
    },
    getLawDetail: params => {
        return axios.get(`${ baseUrl }/laws/details`, { params: { id: params } }).then(res => res.code === 200 && res.data)
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
