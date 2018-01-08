import axios from 'axios'
import resCode from './resCode'

let state = ''
const baseUrl = '/baseUrl'
axios.defaults.baseURL = 'http://localhost:7777'
const handleApiErr = (res) => {
    let prev = resCode[res.status === 200 ? res.data.code : res.status]
    if (!prev) return res.data
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
        if (error.response) {
            if (state && history.state.key !== state.key) return
            return handleApiErr(error.response)
        }
    }
)

export const apiList = {
    otherType: params => { // 其他请求方式
        let str = params.method === 'get' ? 'params' : 'data'
        return axios({ method: params.method, url: `${ params.url }`, [str]: params.options }).then(res => res)
    },
    testGet: params => { // get请求
        return axios.get(`${ baseUrl }/testUrl`, { params: params }).then(res => res)
    },
    testPost: params => { // post请求
        return axios.post(`${ baseUrl }/testUrl`, params).then(res => res)
    }
}
