import {
    HANDLECOLLAPSE
} from './types'

import getters from './getters'

// vuex状态属性
const state = {
    collaspsed: false
}

// 设置状态属性的变化
const mutations = {
    [HANDLECOLLAPSE](state) {
        state.collaspsed = !state.collaspsed
    }
}

export default {
    state,
    mutations,
    getters
}
