/* eslint-disable import/no-duplicates */
import axios from 'axios'
import resCode from './resCode'
import store from '@/store'
import ulrs from './urls'
import qs from 'qs'

let state = ''
// const baseUrl = 'https://www.yuwugongkai.com/ywgk/api'
// const baseUrl = 'http://120.78.190.101:8081/ywgk/api' // 测试
// const baseUrl = 'http://120.79.251.238:8021/ywgk/api' // 演示
// const baseUrl = 'http://120.78.190.101:8085/ywgk-auth/api'
// axios.defaults.baseURL = 'http://39.108.185.51:8081/ywgk'

const proxyBaseUrl = ulrs.apiPath
const yangguangBaseUrl = `${ ulrs.yangguangApiHost }${ ulrs.yangguangApiPath }`
export const opeartionBaseUrl = `${ ulrs.opeartionApiHost }${ ulrs.opeartionApiPath }`
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
        return axios.get(`${ proxyBaseUrl }/laws/list`, { params: { jailId: 2 } }).then(res => res.code === 200 && res.data)
        // return axios.get('https://www.yuwugongkai.com/ywgk/api/laws/list', { params: { jailId: 2 } }).then(res => res.code === 200 && res.data)
    },
    getLawRelated: (params) => {
        return axios.get(`${ proxyBaseUrl }/laws/related`, { params: { prisonerId: params } }).then(res => res && res.data)
    },
    getLawDetail: params => {
        return axios.get(`${ proxyBaseUrl }/laws/details`, { params: { id: params } }).then(res => res && res.data)
    },
    getNewsDetail: params => {
        return axios.get(`${ proxyBaseUrl }/news/details?id=${ params }`).then(res => res)
    },
    getPrisonDetail: params => {
        return axios.get(`${ proxyBaseUrl }/jails/details?id=${ params }`).then(res => res)
    },
    testPost: params => { // post请求
        return axios.post(`${ proxyBaseUrl }/testUrl`, params).then(res => res)
    },
    getweixinConfig: params => {
        return axios.get(`${ proxyBaseUrl }/wx/sign`, { params }).then(res => res)
    },
    getAffairsDetail: id => axios.get(`${ yangguangBaseUrl }/contents/getContents/${ id }`),
    // 国科运维 - 查询工单
    getOperationsList: params => axios.get(`${ opeartionBaseUrl }/resource/problem/searchProblem`, { params }),
    // 国科运维 - 创建工单
    addOperations: data => axios.post(`${ opeartionBaseUrl }/resource/problem/saveProblem`, data),
    // 国科运维 - 添加回复
    addReplys: data => axios.post(`${ opeartionBaseUrl }/resource/problem/saveReply`, data),
    // 国科运维 - 添加评价
    addEvaluates: data => axios.post(`${ opeartionBaseUrl }/resource/problem/saveEvaluate`, data),
    // 国科运维 - 查询省市区街道
    getDivisionCode: pid => axios.get(`${ opeartionBaseUrl }/search/code/native?parentId=${ pid }`),
    // 国科运维 - 图片上传
    uploadOperationsFile: data => axios.post(`${ opeartionBaseUrl }/saveImg`, data, {
        headers: { 'content-type': 'multipart/form-data' }
    }),
    // 国科会务 - 手机号发送验证码
    sendVerificationCode: phoneNumber => axios.post(`${ ulrs.publicApiHost }/sms/verification-codes`, { phoneNumber }),
    // 国科会务 - 手机号注册
    signupRegister: data => axios.post(`${ ulrs.publicApiHost }/users/of-mobile`, {
        ...data,
        group: 'customer',
        source: '1'
    }),
    // 国科会务 - 登录
    signupLogin: data => axios.post(`${ ulrs.publicApiHost }/oauth/token`, qs.stringify(data), {
        auth: {
            username: 'convention.admin',
            password: ulrs.gkConferenceClientKey
        },
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }),
    // 国科会务 - 报名
    signupApply: (data, token) => axios.post(`${ ulrs.gkConferenceHost }/conventionPersonInfo/h5/apply`, data, {
        headers: {
            Authorization: token
        }
    }),
    // 国科会务 - 查询会议详情
    getConferenceDetail: id => axios.get(`${ ulrs.gkConferenceHost }/conventionInfo/getDetails/${ id }`)
}
